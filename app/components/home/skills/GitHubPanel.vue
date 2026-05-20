<script setup lang="ts">
import GitHubIcon from './art/GitHubIcon.vue'

type GitHubDay = { date: string; count: number; level: number }
type GitHubWeek = { start: string; end: string; total: number; days: GitHubDay[] }
type GitHubData = {
  profile: { login: string; url: string }
  range: { start: string; end: string }
  totalContributions: number
  stats: { id: string; label: string; value: number }[]
  weeks: GitHubWeek[]
  updatedAt: string
}

type ActiveDay = { date: string; count: number; total: number; x: number; y: number }

const { data, error } = await useFetch<GitHubData>('/api/github', { key: 'github' })

const github = computed(() => data.value)
const activeDay = ref<ActiveDay | null>(null)

const number = new Intl.NumberFormat('en-GB')

const fullDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const shortDate = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const status = computed(() => {
  if (!github.value) return ''

  if (!activeDay.value) {
    return `${number.format(github.value.totalContributions)} contributions in the last 12 months`
  }

  return `${number.format(activeDay.value.count)} contributions on ${formatFullDate(activeDay.value.date)} • ${number.format(activeDay.value.total)} that week`
})

const popoverStyle = computed(() => {
  if (!activeDay.value) return {}

  return {
    left: `${activeDay.value.x}px`,
    top: `${activeDay.value.y}px`,
    transform: 'translate(-50%, calc(-100% - 10px))',
  }
})

function cellClass(level: number) {
  return ['bg-bg-prim', 'bg-grad-4', 'bg-grad-3', 'bg-grad-2', 'bg-acc-prim'][level] || 'bg-bg-prim'
}

function setActive(day: GitHubDay, total: number, el: HTMLElement) {
  const rect = el.getBoundingClientRect()

  activeDay.value = {
    date: day.date,
    count: day.count,
    total,
    x: rect.left + rect.width / 2,
    y: rect.top,
  }
}

function showDay(day: GitHubDay, total: number, event: PointerEvent) {
  if (event.pointerType !== 'mouse') return

  setActive(day, total, event.currentTarget as HTMLElement)
}

function showFocusedDay(day: GitHubDay, total: number, event: FocusEvent) {
  const el = event.currentTarget as HTMLElement

  if (!el.matches(':focus-visible')) return

  setActive(day, total, el)
}

function toggleDay(day: GitHubDay, total: number, event: MouseEvent) {
  if (activeDay.value?.date === day.date) {
    clearActive()
    return
  }

  setActive(day, total, event.currentTarget as HTMLElement)
}

function clearActive() {
  activeDay.value = null
}

function formatFullDate(value: string) {
  return fullDate.format(new Date(`${value}T00:00:00Z`))
}

function formatShortDate(value: string) {
  return shortDate.format(new Date(`${value}T00:00:00Z`))
}
</script>

<template>
  <section class="w-full lg:max-w-xl xl:max-w-2xl">
    <div
      v-if="github"
      class="rounded-xl bg-bg-sec/60 p-4 shadow-xl ring-4 shadow-black/15 ring-acc-prim/20 sm:p-5"
    >
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="font-mono text-xs font-bold tracking-wide text-acc-ter uppercase">
            GitHub activity
          </p>

          <p class="mt-2 text-sm leading-6 text-fg-sec">
            {{ status }}
          </p>
        </div>

        <TheButton :href="github.profile.url" target="_blank" class="text-xs!">
          <template #left>
            <GitHubIcon class="size-4" />
          </template>
          Profile
        </TheButton>
      </div>

      <div class="mt-5 grid grid-cols-3 gap-3">
        <article
          v-for="stat in github.stats"
          :key="stat.id"
          class="rounded-lg border border-brdr bg-bg-prim/80 p-2 text-center sm:p-4 sm:text-start"
        >
          <p class="font-mono text-tiny font-bold tracking-wide text-fg-ter uppercase">
            {{ stat.label }}
          </p>

          <p class="mt-2 text-xl leading-none font-bold text-fg-prim sm:text-3xl">
            {{ number.format(stat.value) }}
          </p>
        </article>
      </div>

      <div class="mt-5 rounded-lg border border-brdr bg-bg-prim/70 p-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <p class="font-mono text-tiny font-bold tracking-wide text-fg-ter uppercase">
            {{ formatShortDate(github.range.start) }} - {{ formatShortDate(github.range.end) }}
          </p>

          <div class="flex items-center gap-2 text-tiny text-fg-ter">
            <span>Less</span>
            <span class="size-3 rounded-sm border border-brdr/60 bg-bg-prim sm:size-3.5" />
            <span class="size-3 rounded-sm border border-brdr/60 bg-grad-4 sm:size-3.5" />
            <span class="size-3 rounded-sm border border-brdr/60 bg-grad-3 sm:size-3.5" />
            <span class="size-3 rounded-sm border border-brdr/60 bg-grad-2 sm:size-3.5" />
            <span class="size-3 rounded-sm border border-brdr/60 bg-acc-prim sm:size-3.5" />
            <span>More</span>
          </div>
        </div>

        <div class="mt-4 overflow-x-auto pb-2 scrollbar-heatmap" @scroll="clearActive">
          <div class="min-w-max pt-3" @mouseleave="clearActive">
            <div class="flex gap-0.5">
              <div
                v-for="week in github.weeks"
                :key="week.start"
                class="grid grid-rows-7 gap-1.5 lg:gap-1"
              >
                <button
                  v-for="day in week.days"
                  :key="day.date"
                  type="button"
                  class="size-4 rounded-sm border border-brdr/60 transition hover:border-acc-prim hover:ring-1 hover:ring-acc-prim/40 focus:ring-1 focus:ring-acc-prim focus:outline-none lg:size-3.5"
                  :class="cellClass(day.level)"
                  :aria-label="`${day.count} contributions on ${formatFullDate(day.date)}`"
                  :aria-pressed="activeDay?.date === day.date"
                  @click="toggleDay(day, week.total, $event)"
                  @pointerenter="showDay(day, week.total, $event)"
                  @focus="showFocusedDay(day, week.total, $event)"
                  @blur="clearActive"
                />
              </div>
            </div>
          </div>
        </div>

        <p class="mt-4 font-mono text-tiny text-fg-ter uppercase">
          Updated {{ formatFullDate(github.updatedAt.slice(0, 10)) }}
        </p>
      </div>
    </div>

    <div
      v-else-if="error"
      class="rounded-xl border border-rose-400/30 bg-bg-sec/60 p-4 shadow-xl shadow-black/15 sm:p-5"
    >
      <p class="font-mono text-tiny font-bold tracking-wide text-rose-300 uppercase">
        GitHub activity
      </p>

      <p class="mt-3 text-sm leading-6 text-rose-200">GitHub data is unavailable right now.</p>
    </div>

    <Teleport to="body">
      <Transition name="heatmap-tip">
        <div
          v-if="activeDay"
          class="pointer-events-none fixed z-50 w-44 rounded-lg border border-acc-prim/30 bg-bg-sec/95 px-3 py-2 shadow-xl shadow-black/40 backdrop-blur-sm"
          :style="popoverStyle"
        >
          <p class="font-mono text-tiny font-bold tracking-wide text-acc-ter uppercase">
            {{ formatFullDate(activeDay.date) }}
          </p>

          <p class="mt-2 text-lg leading-none font-bold text-fg-prim">
            {{ number.format(activeDay.count) }}
            <span class="text-sm text-fg-sec">contributions</span>
          </p>

          <p class="mt-1 text-tiny text-fg-ter uppercase">
            Week total {{ number.format(activeDay.total) }}
          </p>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.heatmap-tip-enter-active,
.heatmap-tip-leave-active {
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.heatmap-tip-enter-from,
.heatmap-tip-leave-to {
  opacity: 0;
}
</style>
