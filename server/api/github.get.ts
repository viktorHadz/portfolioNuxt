import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const cacheFile = resolve(process.cwd(), '.data/github.json')
const cacheVersion = 2
const refreshMs = 1000 * 60 * 60 * 24
const retryMs = 1000 * 60 * 30
const login = process.env.PORTFOLIO_GITHUB_USER || 'viktorHadz'
const token = process.env.GITHUB_TOKEN || process.env.GITHUB_STATS_TOKEN || ''
const levels = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
} as const
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
type ContributionLevel = keyof typeof levels
type GitHubContributionDay = { date: string; contributionCount: number; contributionLevel: ContributionLevel }
type GitHubUser = {
    login: string
    url: string
    repositories: { totalCount: number }
    contributionsCollection: {
        totalCommitContributions: number
        contributionCalendar: { totalContributions: number; weeks: { contributionDays: GitHubContributionDay[] }[] }
    }
}
type GitHubResponse = { data?: { user?: GitHubUser | null }; errors?: { message: string }[] }
type RefreshState = {
    githubRefreshStarted?: boolean
    githubRefreshTimer?: ReturnType<typeof setTimeout>
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

async function requestGitHub(): Promise<GitHubUser> {
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
    const payload = await response.json() as GitHubResponse

    if (!response.ok || payload.errors?.length) {
        throw createError({
            statusCode: response.status || 500,
            statusMessage: payload.errors?.[0]?.message || 'GitHub request failed',
        })
    }

    if (!payload.data?.user) {
        throw createError({ statusCode: 502, statusMessage: 'GitHub user payload missing' })
    }

    return payload.data.user
}

function formatGitHubData(user: GitHubUser): GitHubData {
    const days = user.contributionsCollection.contributionCalendar.weeks.flatMap(
        ({ contributionDays }) =>
            contributionDays.map((day) => ({
                date: day.date,
                count: day.contributionCount,
                level: levels[day.contributionLevel] || 0,
            })),
    )
    const firstDay = days[0]
    const lastDay = days.at(-1)

    if (!firstDay || !lastDay) {
        throw createError({ statusCode: 502, statusMessage: 'GitHub contribution days missing' })
    }

    return {
        version: cacheVersion,
        profile: { login: user.login, url: user.url },
        range: { start: firstDay.date, end: lastDay.date },
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

function buildWeeks(days: GitHubDay[]): GitHubWeek[] {
    const weeks: GitHubWeek[] = []

    for (let index = 0; index < days.length; index += 7) {
        const weekDays = days.slice(index, index + 7)
        const firstDay = weekDays[0]

        if (!firstDay) continue

        weeks.push({
            start: firstDay.date,
            end: weekDays.at(-1)?.date || firstDay.date,
            total: weekDays.reduce((total, day) => total + day.count, 0),
            days: weekDays,
        })
    }

    return weeks
}

function startRefreshLoop() {
    const state = globalThis as RefreshState

    if (state.githubRefreshStarted) return

    state.githubRefreshStarted = true
    scheduleNextRefresh().catch(() => {})
}

async function scheduleNextRefresh(delay?: number) {
    const state = globalThis as RefreshState
    const nextDelay = delay ?? await getRefreshDelay()

    clearTimeout(state.githubRefreshTimer)

    state.githubRefreshTimer = setTimeout(async () => {
        try {
            await refreshGitHubData()
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

async function readCache(): Promise<GitHubData | null> {
    try {
        return JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch {
        return null
    }
}

function isValidCache(cached: GitHubData | null): cached is GitHubData {
    return cached?.version === cacheVersion && Number.isFinite(new Date(cached.updatedAt).getTime())
}

function isStale(updatedAt: string) {
    return Date.now() - new Date(updatedAt).getTime() >= refreshMs
}
