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
type TooltipState = {
  day: GitHubDay
  total: number
  left: number
  top: number
  below: boolean
}

const { data, error } = await useFetch<GitHubData>('/api/github', { key: 'github' })
const github = computed(() => data.value)
const activeDay = ref<{ date: string; count: number; total: number } | null>(null)
const heatmapRef = ref<HTMLElement | null>(null)
const tooltip = ref<TooltipState | null>(null)
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

  return activeDay.value
    ? `${number.format(activeDay.value.count)} contributions on ${formatFullDate(activeDay.value.date)} • ${number.format(activeDay.value.total)} that week`
    : `${number.format(github.value.totalContributions)} contributions in the last 12 months`
})

function cellClass(level: number) {
  return ['bg-bg-prim', 'bg-grad-4', 'bg-grad-3', 'bg-grad-2', 'bg-acc-prim'][level] || 'bg-bg-prim'
}

function setActive(day: GitHubDay, total: number) {
  activeDay.value = { date: day.date, count: day.count, total }
}

function clearActive() {
  activeDay.value = null
  tooltip.value = null
}

function showTooltip(event: Event, day: GitHubDay, total: number) {
  const target = event.currentTarget

  if (!(target instanceof HTMLElement)) return

  const cellRect = target.getBoundingClientRect()
  const left = Math.min(Math.max(cellRect.left + cellRect.width / 2, 96), window.innerWidth - 96)
  const below = cellRect.top < 88

  setActive(day, total)
  tooltip.value = {
    day,
    total,
    left,
    top: below ? cellRect.bottom + 12 : cellRect.top - 12,
    below,
  }
}

function toggleTooltip(event: MouseEvent, day: GitHubDay, total: number) {
  if (tooltip.value?.day.date === day.date) {
    clearActive()
    return
  }

  showTooltip(event, day, total)
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target

  if (target instanceof Node && heatmapRef.value?.contains(target)) return

  clearActive()
}

function formatFullDate(value: string) {
  return fullDate.format(new Date(`${value}T00:00:00Z`))
}

function formatShortDate(value: string) {
  return shortDate.format(new Date(`${value}T00:00:00Z`))
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <section class="w-full lg:max-w-xl xl:max-w-2xl">
    <div
      v-if="github"
      class="rounded-xl border border-acc-prim/20 bg-bg-sec/60 p-4 shadow-xl shadow-black/15 sm:p-5"
    >
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="font-mono text-xs font-bold tracking-wide text-acc-ter uppercase">
            GitHub activity
          </p>
          <p class="mt-2 text-sm leading-6 text-fg-sec">{{ status }}</p>
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

        <div
          ref="heatmapRef"
          class="mt-4 overflow-x-auto pb-2 scrollbar-heatmap"
          @scroll="clearActive"
        >
          <div class="min-w-max" @mouseleave="clearActive">
            <div class="flex gap-0.5">
              <div
                v-for="week in github.weeks"
                :key="week.start"
                class="grid grid-rows-7 gap-0.5 lg:gap-1"
              >
                <button
                  v-for="day in week.days"
                  :key="day.date"
                  type="button"
                  class="size-3 rounded-sm border border-brdr/60 lg:size-3.5"
                  :class="cellClass(day.level)"
                  :aria-label="`${day.count} contributions on ${day.date}`"
                  :aria-pressed="tooltip?.day.date === day.date"
                  @click="toggleTooltip($event, day, week.total)"
                  @mouseenter="showTooltip($event, day, week.total)"
                  @focus="showTooltip($event, day, week.total)"
                  @blur="clearActive"
                />
              </div>
            </div>
          </div>
        </div>

        <Transition name="heatmap-tip">
          <div
            v-if="tooltip"
            class="pointer-events-none fixed z-20 min-w-44 rounded-lg border border-acc-prim/25 bg-bg-sec/95 px-3 py-2 shadow-xl shadow-black/25 backdrop-blur-sm"
            :style="{
              left: `${tooltip.left}px`,
              top: `${tooltip.top}px`,
              transform: tooltip.below ? 'translateX(-50%)' : 'translate(-50%, -100%)',
            }"
          >
            <span
              class="absolute left-1/2 size-2 -translate-x-1/2 rotate-45 bg-bg-sec"
              :class="
                tooltip.below
                  ? '-top-1 border-t border-l border-acc-prim/25'
                  : '-bottom-1 border-r border-b border-acc-prim/25'
              "
            />
            <p class="font-mono text-tiny font-bold tracking-wide text-acc-ter uppercase">
              {{ formatFullDate(tooltip.day.date) }}
            </p>
            <p class="mt-2 text-lg leading-none font-bold text-fg-prim">
              {{ number.format(tooltip.day.count) }}
              <span class="text-sm text-fg-sec">contributions</span>
            </p>
            <p class="mt-1 text-tiny text-fg-ter uppercase">
              Week total {{ number.format(tooltip.total) }}
            </p>
          </div>
        </Transition>

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
  </section>
</template>

<style scoped>
.heatmap-tip-enter-active,
.heatmap-tip-leave-active {
  transition: opacity 160ms ease;
}

.heatmap-tip-enter-from,
.heatmap-tip-leave-to {
  opacity: 0;
}
</style>
