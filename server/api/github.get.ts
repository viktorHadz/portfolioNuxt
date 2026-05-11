import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const cacheFile = resolve(process.cwd(), '.data/github.json')
const cacheVersion = 2
const refreshMs = 1000 * 60 * 60 * 24
const login = process.env.PORTFOLIO_GITHUB_USER || 'viktorHadz'
const token = process.env.GITHUB_TOKEN || process.env.GITHUB_STATS_TOKEN || ''
const levels = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
}
const query = `
  query GitHubActivity($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login
      url
      repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
        totalCount
      }
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

type GitHubDay = { date: string; count: number; level: number }
type GitHubWeek = { start: string; end: string; total: number; days: GitHubDay[] }
type GitHubData = {
    version: number
    profile: { login: string; url: string }
    range: { start: string; end: string }
    totalContributions: number
    stats: { id: string; label: string; value: number }[]
    weeks: GitHubWeek[]
    updatedAt: string
}

let refreshPromise: Promise<GitHubData> | null = null

startRefreshLoop()

export default defineEventHandler(() => getGitHubData())

async function getGitHubData() {
    const cached = await readCache()

    if (!isValidCache(cached)) return refreshGitHubData()
    if (isStale(cached.updatedAt)) refreshGitHubData(true).catch(() => {})

    return cached
}

async function refreshGitHubData(force = false) {
    if (!token) {
        throw createError({ statusCode: 500, statusMessage: 'Missing GitHub token' })
    }

    if (!refreshPromise) {
        refreshPromise = updateGitHubData(force).finally(() => {
            refreshPromise = null
        })
    }

    return refreshPromise
}

async function updateGitHubData(force: boolean) {
    const cached = await readCache()

    if (!force && isValidCache(cached) && !isStale(cached.updatedAt)) return cached

    try {
        const data = formatGitHubData(await requestGitHub())

        await mkdir(resolve(process.cwd(), '.data'), { recursive: true })
        await writeFile(cacheFile, JSON.stringify(data), 'utf8')

        return data
    } catch (error) {
        if (cached) return cached
        throw error
    }
}

async function requestGitHub() {
    const to = new Date()
    const from = new Date(to)

    from.setUTCDate(from.getUTCDate() - 364)

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'User-Agent': 'bits-by-vik',
        },
        body: JSON.stringify({
            query,
            variables: {
                login,
                from: `${from.toISOString().slice(0, 10)}T00:00:00Z`,
                to: `${to.toISOString().slice(0, 10)}T23:59:59Z`,
            },
        }),
    })
    const payload = await response.json()

    if (!response.ok || payload.errors?.length) {
        throw createError({
            statusCode: response.status || 500,
            statusMessage: payload.errors?.[0]?.message || 'GitHub request failed',
        })
    }

    return payload.data.user
}

function formatGitHubData(user) {
    const days = user.contributionsCollection.contributionCalendar.weeks.flatMap(
        ({ contributionDays }) =>
            contributionDays.map((day) => ({
                date: day.date,
                count: day.contributionCount,
                level: levels[day.contributionLevel] || 0,
            })),
    )

    return {
        version: cacheVersion,
        profile: { login: user.login, url: user.url },
        range: { start: days[0].date, end: days.at(-1).date },
        totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
        stats: [
            {
                id: 'commits',
                label: 'Commits',
                value: user.contributionsCollection.totalCommitContributions,
            },
            {
                id: 'active-days',
                label: 'Active days',
                value: days.filter((day) => day.count > 0).length,
            },
            { id: 'repositories', label: 'Repositories', value: user.repositories.totalCount },
        ],
        weeks: buildWeeks(days),
        updatedAt: new Date().toISOString(),
    }
}

function buildWeeks(days) {
    const weeks: GitHubWeek[] = []

    for (let index = 0; index < days.length; index += 7) {
        const weekDays = days.slice(index, index + 7)

        weeks.push({
            start: weekDays[0].date,
            end: weekDays.at(-1)?.date || weekDays[0].date,
            total: weekDays.reduce((total, day) => total + day.count, 0),
            days: weekDays,
        })
    }

    return weeks
}

function startRefreshLoop() {
    const state = globalThis as { githubRefreshStarted?: boolean }

    if (state.githubRefreshStarted) return

    state.githubRefreshStarted = true
    refreshGitHubData().catch(() => {})

    const timer = setInterval(() => {
        refreshGitHubData(true).catch(() => {})
    }, refreshMs)

    timer.unref?.()
}

async function readCache() {
    try {
        return JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch {
        return null
    }
}

function isValidCache(cached: GitHubData | null): cached is GitHubData {
    return cached?.version === cacheVersion
}

function isStale(updatedAt: string) {
    return Date.now() - new Date(updatedAt).getTime() >= refreshMs
}
