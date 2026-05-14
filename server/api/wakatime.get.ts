import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const cacheFile = resolve(process.cwd(), '.data/wakatime.json')
const cacheVersion = 6
const refreshMs = 1000 * 60 * 60 * 24
const retryMs = 1000 * 60 * 30
const token = process.env.WAKATIME_KEY || ''
const shortDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
})
const fullDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
})
const month = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' })
const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' })

type WakaTimeStat = {
    id: number
    name: string
    value: number | string
    unit: string
    extra: { value: string; unit: string } | null
}
type WakaTimeLanguage = { name: string; hours: number; percent: number }
type WakaTimeDay = { label: string; hours: number }
type WakaTimeData = {
    version: number
    year: number
    consistencyStats: WakaTimeStat[]
    timeStats: WakaTimeStat[]
    languageStats: WakaTimeLanguage[]
    currentWeek: WakaTimeDay[]
    topEditor: string
    updatedAt: string
    updatedLabel: string
}
type WakaTimeBreakdown = { name: string; total_seconds: number }
type WakaTimeSummaryDay = {
    grand_total?: { total_seconds?: number; text?: string }
    languages?: WakaTimeBreakdown[]
    editors?: WakaTimeBreakdown[]
    range?: { date?: string }
}
type WakaTimeSummariesResponse = {
    data?: WakaTimeSummaryDay[]
    daily_average?: { seconds_including_other_language?: number }
    error?: string
    message?: string
}
type RefreshState = {
    wakatimeRefreshStarted?: boolean
    wakatimeRefreshTimer?: ReturnType<typeof setTimeout>
}

let refreshPromise: Promise<WakaTimeData> | null = null

startRefreshLoop()

export default defineEventHandler(() => getWakaTimeData())

async function getWakaTimeData() {
    const cached = await readCache()

    if (!isValidCache(cached)) return refreshWakaTimeData()
    if (isStale(cached.updatedAt)) refreshWakaTimeData(true).catch(() => {})

    return cached
}

async function refreshWakaTimeData(force = false) {
    if (!token) {
        throw createError({ statusCode: 500, statusMessage: 'Missing WAKATIME_KEY' })
    }

    if (!refreshPromise) {
        refreshPromise = updateWakaTimeData(force).finally(() => {
            refreshPromise = null
        })
    }

    return refreshPromise
}

async function updateWakaTimeData(force: boolean) {
    const cached = await readCache()

    if (!force && isValidCache(cached) && !isStale(cached.updatedAt)) return cached

    try {
        const data = formatWakaTimeData(await requestWakaTime())

        await mkdir(resolve(process.cwd(), '.data'), { recursive: true })
        await writeFile(cacheFile, JSON.stringify(data), 'utf8')

        return data
    } catch (error) {
        if (cached) return cached
        throw error
    }
}

async function requestWakaTime(): Promise<WakaTimeSummariesResponse> {
    const { start, end } = getCurrentYearRange()
    const response = await fetch(
        `https://wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`,
        { headers: { Authorization: `Basic ${Buffer.from(token).toString('base64')}` } },
    )
    const payload = (await response.json()) as WakaTimeSummariesResponse

    if (!response.ok) {
        throw createError({
            statusCode: response.status || 500,
            statusMessage: payload.error || payload.message || 'WakaTime request failed',
        })
    }

    return payload
}

function formatWakaTimeData(payload: WakaTimeSummariesResponse): WakaTimeData {
    const days = Array.isArray(payload.data) ? payload.data : []
    const firstDate = days[0]?.range?.date
    const lastDate = days.at(-1)?.range?.date

    if (!firstDate || !lastDate) {
        throw createError({ statusCode: 502, statusMessage: 'WakaTime summaries missing' })
    }

    const languageTotals = new Map<string, number>()
    const editorTotals = new Map<string, number>()
    let totalSeconds = 0
    let activeDays = 0
    let bestDay = { date: firstDate, totalSeconds: 0 }

    for (const day of days) {
        const date = day.range?.date
        const seconds = day.grand_total?.total_seconds || 0

        if (!date) continue

        totalSeconds += seconds
        if (seconds > 0) activeDays += 1
        if (seconds > bestDay.totalSeconds) bestDay = { date, totalSeconds: seconds }

        addTotals(languageTotals, day.languages)
        addTotals(editorTotals, day.editors)
    }

    const year = toDate(firstDate).getUTCFullYear()
    const dailyAverageSeconds =
        payload.daily_average?.seconds_including_other_language ||
        totalSeconds / Math.max(days.length, 1)
    const languages = Array.from(languageTotals.entries())
        .filter(([name]) => name !== 'Other')
        .sort((a, b) => b[1] - a[1])
    const languageSeconds = languages.reduce((total, [, seconds]) => total + seconds, 0)
    const topEditor =
        Array.from(editorTotals.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown'
    const updatedAt = new Date().toISOString()

    return {
        version: cacheVersion,
        year,
        consistencyStats: buildConsistencyStats(days),
        timeStats: [
            {
                id: 1,
                name: 'TOTAL TIME',
                value: Math.round(totalSeconds / 3600),
                unit: 'hrs',
                extra: { value: formatDayBreakdown(totalSeconds), unit: '' },
            },
            {
                id: 2,
                name: 'DAILY AVG',
                value: formatHours(dailyAverageSeconds),
                unit: 'hrs',
                extra: null,
            },
            {
                id: 3,
                name: 'BEST DAY',
                value: formatHours(bestDay.totalSeconds),
                unit: 'hrs',
                extra: { value: shortDate.format(toDate(bestDay.date)), unit: '' },
            },
            {
                id: 4,
                name: 'ACTIVE DAYS',
                value: activeDays,
                unit: 'days',
                extra: {
                    value: `${Math.round((activeDays / Math.max(days.length, 1)) * 100)}% of days`,
                    unit: '',
                },
            },
        ],
        languageStats: languages
            .slice(0, 5)
            .map(([name, seconds]) => ({
                name,
                hours: Math.round(seconds / 3600),
                percent: languageSeconds ? Math.round((seconds / languageSeconds) * 100) : 0,
            })),
        currentWeek: buildCurrentWeek(days),
        topEditor,
        updatedAt,
        updatedLabel: fullDate.format(toDate(updatedAt.slice(0, 10))),
    }
}

function buildConsistencyStats(days: WakaTimeSummaryDay[]) {
    let currentStreak = 0
    let longestStreak = 0
    let streak = 0
    let latestActiveIndex = -1
    const months = new Map<string, number>()

    for (const [index, day] of days.entries()) {
        const date = day.range?.date
        const seconds = day.grand_total?.total_seconds || 0

        if (!date) continue

        months.set(date.slice(0, 7), (months.get(date.slice(0, 7)) || 0) + seconds)
        streak = seconds > 0 ? streak + 1 : 0
        longestStreak = Math.max(longestStreak, streak)

        if (seconds > 0) latestActiveIndex = index
    }

    for (let index = latestActiveIndex; index >= 0; index -= 1) {
        if ((days[index]?.grand_total?.total_seconds || 0) <= 0) break
        currentStreak += 1
    }

    const peakMonth = Array.from(months.entries()).sort(
        (a, b) => b[1] - a[1] || b[0].localeCompare(a[0]),
    )[0]

    return [
        { id: 1, name: 'CURRENT STREAK', value: currentStreak, unit: 'days', extra: null },
        { id: 2, name: 'LONGEST STREAK', value: longestStreak, unit: 'days', extra: null },
        {
            id: 3,
            name: 'PEAK MONTH',
            value: peakMonth ? month.format(toDate(`${peakMonth[0]}-01`)) : '-',
            unit: '',
            extra: peakMonth ? { value: `${Math.round(peakMonth[1] / 3600)} hrs`, unit: '' } : null,
        },
    ]
}

function addTotals(target: Map<string, number>, items: WakaTimeBreakdown[] | undefined) {
    for (const item of items || []) {
        const name = normalizeName(item.name)

        target.set(name, (target.get(name) || 0) + item.total_seconds)
    }
}

function buildCurrentWeek(days: WakaTimeSummaryDay[]) {
    const totals = new Map<string, number>()
    const end = new Date()

    for (const day of days) {
        const date = day.range?.date

        if (!date) continue

        totals.set(date, day.grand_total?.total_seconds || 0)
    }

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(end)

        date.setUTCDate(end.getUTCDate() - 6 + index)

        return {
            label: weekday.format(date),
            hours: Number(((totals.get(toDateString(date)) || 0) / 3600).toFixed(1)),
        }
    })
}

function getCurrentYearRange() {
    const today = new Date()
    const year = today.getUTCFullYear()

    return { start: `${year}-01-01`, end: toDateString(today) }
}

function formatHours(seconds: number) {
    return Number((seconds / 3600).toFixed(1)).toString()
}

function formatDayBreakdown(seconds: number) {
    const totalHours = Math.round(seconds / 3600)
    const days = Math.floor(totalHours / 24)
    const hours = totalHours % 24

    return `${days}d ${hours} hrs`
}

function normalizeName(value: string) {
    if (value === 'Vue.js') return 'Vue'

    return value
}

function toDate(value: string) {
    return new Date(`${value}T00:00:00Z`)
}

function toDateString(value: Date) {
    return value.toISOString().slice(0, 10)
}

function startRefreshLoop() {
    const state = globalThis as RefreshState

    if (state.wakatimeRefreshStarted) return

    state.wakatimeRefreshStarted = true
    scheduleNextRefresh().catch(() => {})
}

async function scheduleNextRefresh(delay?: number) {
    const state = globalThis as RefreshState
    const nextDelay = delay ?? (await getRefreshDelay())

    clearTimeout(state.wakatimeRefreshTimer)

    state.wakatimeRefreshTimer = setTimeout(async () => {
        try {
            await refreshWakaTimeData()
            await scheduleNextRefresh()
        } catch {
            await scheduleNextRefresh(retryMs)
        }
    }, nextDelay)
}

async function getRefreshDelay() {
    const cached = await readCache()

    if (!isValidCache(cached) || isStale(cached.updatedAt)) return 0

    return Math.max(0, new Date(cached.updatedAt).getTime() + refreshMs - Date.now())
}

async function readCache(): Promise<WakaTimeData | null> {
    try {
        return JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch {
        return null
    }
}

function isValidCache(cached: WakaTimeData | null): cached is WakaTimeData {
    return cached?.version === cacheVersion && Number.isFinite(new Date(cached.updatedAt).getTime())
}

function isStale(updatedAt: string) {
    return Date.now() - new Date(updatedAt).getTime() >= refreshMs
}
