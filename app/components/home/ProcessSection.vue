<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  ArrowTrendingUpIcon,
  BoltIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ClockIcon,
  FireIcon,
  StarIcon,
} from '@heroicons/vue/24/outline'
import cssIcon from '~/assets/icons/tech/css3.svg'
import goIcon from '~/assets/icons/tech/go.svg'
import htmlIcon from '~/assets/icons/tech/html5.svg'
import javascriptIcon from '~/assets/icons/tech/javascript.svg'
import pythonIcon from '~/assets/icons/tech/python.svg'
import sqliteIcon from '~/assets/icons/tech/sqlite.svg'
import typescriptIcon from '~/assets/icons/tech/typescript.svg'
import vueIcon from '~/assets/icons/tech/vue-js.svg'
import VsCodeIcon from './process/art/VsCodeIcon.vue'
import InvertedBorder from './process/InvertedBorder.vue'
import ArchiveArtStats from './archive/art/ArchiveArtStats.vue'

type WakaTimeData = {
  year: number
  updatedLabel: string
  topEditor: string
  consistencyStats: {
    id: number
    name: string
    value: number | string
    unit: string
    extra: { value: string; unit: string } | null
  }[]
  timeStats: {
    id: number
    name: string
    value: number | string
    unit: string
    extra: { value: string; unit: string } | null
  }[]
  languageStats: { name: string; hours: number; percent: number }[]
  currentWeek: { label: string; hours: number }[]
}

const { data: wakatime } = await useFetch<WakaTimeData>('/api/wakatime', { key: 'wakatime' })
const currentYear = new Date().getUTCFullYear()
const statIcons: Record<string, Component> = {
  'TOTAL TIME': ClockIcon,
  'DAILY AVG': ArrowTrendingUpIcon,
  'BEST DAY': StarIcon,
  'ACTIVE DAYS': CalendarIcon,
  'CURRENT STREAK': FireIcon,
  'LONGEST STREAK': BoltIcon,
  'PEAK MONTH': CalendarDaysIcon,
}
const languageMeta: Record<string, { icon: string | null; barClass: string; textClass: string }> = {
  CSS: { icon: cssIcon, barClass: 'bg-sky-400', textClass: 'text-sky-300' },
  Go: { icon: goIcon, barClass: 'bg-acc-ter', textClass: 'text-acc-ter' },
  HTML: { icon: htmlIcon, barClass: 'bg-orange-400', textClass: 'text-orange-300' },
  JavaScript: { icon: javascriptIcon, barClass: 'bg-yellow', textClass: 'text-yellow' },
  Python: { icon: pythonIcon, barClass: 'bg-blue', textClass: 'text-blue' },
  SQL: { icon: sqliteIcon, barClass: 'bg-purple', textClass: 'text-purple' },
  SQLite: { icon: sqliteIcon, barClass: 'bg-purple', textClass: 'text-purple' },
  TypeScript: { icon: typescriptIcon, barClass: 'bg-blue', textClass: 'text-blue' },
  Vue: { icon: vueIcon, barClass: 'bg-green', textClass: 'text-green' },
}
const weekDays = computed(() => wakatime.value?.currentWeek || [])
const chartMax = computed(() => {
  const peak = Math.max(...weekDays.value.map((day) => day.hours), 0)

  if (!peak) return 4

  return Math.min(24, Math.max(4, Math.ceil((peak * 1.15) / 2) * 2))
})
const chartTicks = computed(() =>
  Array.from({ length: 5 }, (_, index) =>
    Number((chartMax.value - (chartMax.value / 4) * index).toFixed(1)),
  ),
)
const languageStats = computed(() =>
  (wakatime.value?.languageStats || []).map((lang, index) => ({
    ...lang,
    ...(languageMeta[lang.name] || {
      icon: null,
      barClass: index % 2 ? 'bg-acc-ter' : 'bg-acc-prim',
      textClass: index % 2 ? 'text-acc-ter' : 'text-acc-prim',
    }),
  })),
)

function barHeight(hours: number) {
  return `${(hours / chartMax.value) * 100}%`
}

function formatChartHours(hours: number) {
  return `${hours.toFixed(1)} hrs`
}

function formatTick(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1)
}
</script>

<template>
  <section
    class="relative overflow-hidden bg-bg-sec py-20 text-fg-prim sm:py-28"
    aria-labelledby="process-title"
  >
    <SectionDivider colour="text-bg-prim" position="top" />
    <div class="mx-auto max-w-7xl px-6 py-20 sm:px-12">
      <div class="relative flex flex-col items-center justify-between sm:flex-row">
        <header class="portfolio-reveal z-10 max-w-xl">
          <div class="flex items-center gap-2">
            <LineStart class="size-5" />
            <p class="text-sm font-bold text-acc-prim uppercase">Build log</p>
          </div>

          <h2
            id="process-title"
            class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
          >
            Hours in the
            <span class="text-grad-top text-shadow-lg/20 text-shadow-acc-prim/50">chair</span>
          </h2>
          <p class="mt-4 text-base leading-7 text-fg-sec sm:text-lg">
            A live look at the coding time behind the projects - weekly hours, yearly totals, and
            the languages I've been working in.
          </p>

          <div class="mt-4 ml-2 flex items-center gap-4">
            <div class="relative z-10 mr-2 flex items-center justify-center">
              <div class="absolute size-4 shrink-0 rounded-full bg-acc-prim opacity-90 blur-sm" />
              <div
                class="absolute size-2 shrink-0 rounded-full bg-acc-prim shadow-xl/50 shadow-acc-prim"
              />
            </div>
            <p class="text-lg">
              Updated from
              <span class="text-acc-prim">WakaTime</span>
            </p>
          </div>
        </header>

        <SpeedLines />

        <div class="flex-1">
          <div class="relative z-20 size-100 place-self-end opacity-80">
            <ArchiveArtStats class="absolute size-100" />
          </div>
        </div>
      </div>

      <!-- Stats -->
      <InvertedBorder css-class="p-4 lg:p-8 bg-bg-ter">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-[40%_60%]">
          <!-- Stats left -->
          <div>
            <div class="flex items-center gap-2 font-mono text-xs font-bold text-fg-sec uppercase">
              <span class="size-2 bg-acc-prim" />
              <span>{{ wakatime?.year || currentYear }}</span>
              <span>Round-up</span>
            </div>
            <!-- consistencyStats -->
            <div class="mt-4 grid grid-cols-2 gap-3 text-fg-prim md:grid-cols-3">
              <div
                v-for="stat in wakatime?.consistencyStats || []"
                :key="stat.id"
                class="flex h-full flex-col justify-between rounded-lg border border-brdr-subtle bg-bg-sec p-4"
              >
                <div class="flex items-center gap-2 text-fg-sec">
                  <component :is="statIcons[stat.name]" class="size-5" />
                  <p class="font-mono text-xs tracking-tighter text-fg-sec uppercase">
                    {{ stat.name }}
                  </p>
                </div>

                <p class="mt-3 text-lg leading-none font-bold text-acc-prim">
                  {{ stat.value }} {{ stat.unit }}
                </p>

                <p v-if="stat.extra" class="mt-2 text-sm text-fg-sec">
                  {{ stat.extra.value }}{{ stat.extra.unit }}
                </p>
              </div>
            </div>

            <hr class="my-4 text-brdr-subtle" />

            <div class="flex items-center gap-2 font-mono text-xs font-bold text-fg-sec uppercase">
              <span class="size-2 bg-acc-prim" />
              <span>Current week</span>
              <span>Daily hours</span>
            </div>
            <div v-if="wakatime" class="mt-5 rounded-lg border border-brdr-subtle bg-bg-sec p-4">
              <div class="mb-3 flex items-center justify-between text-xs text-fg-sec">
                <p>Current week from WakaTime totals</p>
                <span class="font-mono uppercase">Hours</span>
              </div>

              <div class="grid grid-cols-[1rem_1fr] gap-3">
                <div
                  class="flex h-56 flex-col justify-between text-right font-mono text-tiny text-fg-ter"
                >
                  <span v-for="tick in chartTicks" :key="tick" class="leading-none">
                    {{ formatTick(tick) }}
                  </span>
                </div>

                <div>
                  <div class="relative h-56 border-b border-brdr-subtle">
                    <div class="pointer-events-none absolute inset-0 grid grid-rows-4">
                      <div v-for="line in 4" :key="line" class="border-t border-brdr-subtle/70" />
                    </div>

                    <div class="absolute inset-x-0 bottom-0 grid h-full grid-cols-7 gap-4 pt-4">
                      <div
                        v-for="day in weekDays"
                        :key="day.label"
                        class="group flex flex-col items-center justify-end"
                      >
                        <span
                          class="pointer-events-none mb-2 rounded border border-brdr bg-bg-sec px-2 py-1 font-mono text-tiny text-fg-prim opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          {{ formatChartHours(day.hours) }}
                        </span>

                        <div class="flex h-full w-full items-end justify-center">
                          <div
                            class="w-full max-w-7 rounded-t-sm border border-b-0 border-brdr-subtle/70 bg-linear-to-t from-grad-4 via-grad-2 to-acc-prim"
                            :style="{ height: barHeight(day.hours) }"
                            :title="formatChartHours(day.hours)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-3 grid grid-cols-7 gap-4 font-mono text-xs text-fg-sec">
                    <span v-for="day in weekDays" :key="day.label">{{ day.label }}</span>
                  </div>
                </div>
              </div>
            </div>

            <p v-else class="mt-6 text-sm text-fg-sec">WakaTime data is unavailable right now.</p>
          </div>

          <!-- Stats right -->
          <div>
            <div class="flex items-center gap-2 font-mono text-xs font-bold text-fg-sec uppercase">
              <span class="size-2 bg-acc-prim" />
              <span>{{ wakatime?.year || currentYear }}</span>
              <span>Round-up</span>
            </div>
            <!-- Top -->
            <!-- timeStats -->
            <div class="mt-4 grid grid-cols-2 gap-3 text-fg-prim sm:grid-cols-4">
              <div
                v-for="stat in wakatime?.timeStats || []"
                :key="stat.id"
                class="flex h-full flex-col justify-between rounded-lg border border-brdr-subtle bg-bg-sec p-4"
              >
                <div class="flex items-center gap-2 text-fg-sec">
                  <component :is="statIcons[stat.name]" class="size-5" />

                  <span class="line-clamp-1 font-mono text-xs tracking-tighter uppercase">
                    {{ stat.name }}
                  </span>
                </div>

                <p class="mt-3 text-lg leading-none font-bold text-acc-prim">
                  {{ stat.value }} {{ stat.unit }}
                </p>

                <p v-if="stat.extra" class="mt-2 text-sm text-fg-sec">
                  {{ stat.extra.value }}{{ stat.extra.unit }}
                </p>
              </div>
            </div>

            <hr class="my-4 text-brdr-subtle" />

            <!-- Bottom -->
            <div class="flex items-center gap-2 font-mono text-xs font-bold text-fg-sec uppercase">
              <span class="size-2 bg-acc-prim" />
              <span>Language mix</span>
            </div>
            <div class="mt-5 rounded-lg border border-brdr-subtle bg-bg-sec p-4">
              <div class="mt-3 grid grid-cols-[6fr_1fr_1fr] items-center gap-4 text-xs text-fg-sec">
                <p>What I spent the year reaching for</p>
                <span class="font-mono uppercase">Hours</span>
                <span class="font-mono uppercase">Percent</span>
              </div>

              <div class="mt-5 space-y-4">
                <div
                  v-for="lang in languageStats"
                  :key="lang.name"
                  class="grid grid-cols-[6rem_1fr_4.5rem_3rem] items-center gap-4 text-sm"
                >
                  <div class="flex items-center gap-2 text-xs text-fg-prim lg:text-base">
                    <img
                      v-if="lang.icon"
                      :src="lang.icon"
                      :alt="lang.name"
                      class="size-5"
                      loading="lazy"
                    />
                    <span>{{ lang.name }}</span>
                  </div>

                  <div class="h-3 overflow-hidden rounded-sm bg-bg-ter">
                    <div
                      class="h-full rounded-sm"
                      :class="lang.barClass"
                      :style="{ width: `${lang.percent}%` }"
                    />
                  </div>

                  <span class="font-mono font-bold" :class="lang.textClass">
                    {{ lang.hours }} hrs
                  </span>

                  <span class="text-right font-mono text-xs text-fg-sec">{{ lang.percent }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hoz divider -->
        <hr class="my-4 text-brdr-subtle" />

        <!-- Bottom -->
        <div
          class="mb-4 flex flex-col items-center justify-between gap-8 text-sm text-fg-sec lg:flex-row lg:items-start"
        >
          <div>
            Source: WakaTime API
            <span v-if="wakatime?.updatedLabel">• Updated {{ wakatime.updatedLabel }}</span>
          </div>
          <div class="flex gap-2">
            <p>Top Editor:</p>
            <span class="text-acc-ter">{{ wakatime?.topEditor || 'Unavailable' }}</span>
            <VsCodeIcon v-if="wakatime?.topEditor === 'VS Code'" class="size-5" />
          </div>
        </div>
      </InvertedBorder>
    </div>
  </section>
</template>
