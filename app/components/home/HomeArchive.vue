<script setup>
import {
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from '@heroicons/vue/24/outline'
import { portfolioContent } from './portfolioContent'
import HomeTechBadge from './HomeTechBadge.vue'

const archiveStats = [
  { value: `${portfolioContent.archiveProjects.length}`, label: 'archive builds' },
  { value: '3', label: 'problem spaces' },
  { value: 'Live + code', label: 'review paths' },
]
</script>

<template>
  <section
    id="archive"
    class="relative isolate overflow-hidden bg-bg-sec py-20 text-fg-prim sm:py-28"
    aria-labelledby="archive-title"
  >
    <DecorField />

    <div class="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
      <header class="portfolio-reveal flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div class="max-w-3xl">
          <p class="text-sm font-bold text-acc-prim uppercase">Project archive</p>
          <h2
            id="archive-title"
            class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
          >
            More shipped pieces in orbit
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-7 text-fg-sec">
            Smaller builds, experiments, and client pieces that show the same production habits from
            different angles.
          </p>
        </div>
      </header>

      <div class="portfolio-reveal mt-8 grid gap-3 sm:grid-cols-3">
        <div
          v-for="stat in archiveStats"
          :key="stat.label"
          class="rounded-lg border border-brdr bg-bg-prim/80 p-4"
        >
          <p class="text-2xl font-bold text-acc-sec">{{ stat.value }}</p>
          <p class="mt-1 text-xs font-bold text-fg-sec uppercase">{{ stat.label }}</p>
        </div>
      </div>

      <div class="mt-12 grid gap-5 lg:grid-cols-3">
        <article
          v-for="project in portfolioContent.archiveProjects"
          :key="project.id"
          class="portfolio-archive-item group flex overflow-hidden rounded-lg border border-brdr bg-bg-prim shadow-lg shadow-black/10"
        >
          <div class="flex w-full flex-col">
            <div class="flex flex-1 flex-col p-5">
              <h3 class="text-2xl font-bold">{{ project.name }}</h3>
              <p class="mt-3 text-sm leading-6 text-pretty text-fg-sec">
                {{ project.seoDescription || project.summary }}
              </p>

              <dl class="mt-5 grid gap-2 border-y border-brdr py-4 text-xs">
                <div class="flex justify-between gap-4">
                  <dt class="font-bold text-fg-ter uppercase">Focus</dt>
                  <dd class="text-right text-fg-sec">{{ project.eyebrow }}</dd>
                </div>
                <div class="flex justify-between gap-4">
                  <dt class="font-bold text-fg-ter uppercase">Core</dt>
                  <dd class="text-right text-fg-sec">
                    {{ project.stack.slice(0, 2).join(' + ') }}
                  </dd>
                </div>
              </dl>

              <div class="mt-5 flex flex-wrap gap-2">
                <HomeTechBadge
                  v-for="tech in project.stack"
                  :key="tech"
                  :name="tech"
                  compact
                />
              </div>

              <div class="mt-auto flex flex-wrap gap-2 pt-6">
                <NuxtLink
                  v-if="project.liveUrl"
                  :to="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex min-h-10 items-center gap-2 rounded-lg border border-brdr px-4 py-2 text-xs font-bold text-fg-prim hover:border-acc-prim"
                >
                  <ArrowTopRightOnSquareIcon class="size-4" />
                  Live
                </NuxtLink>
                <NuxtLink
                  :to="project.gitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex min-h-10 items-center gap-2 rounded-lg border border-brdr px-4 py-2 text-xs font-bold text-fg-prim hover:border-acc-prim"
                >
                  <CodeBracketIcon class="size-4" />
                  Code
                </NuxtLink>
                <NuxtLink
                  :to="project.path"
                  class="inline-flex min-h-10 items-center gap-2 rounded-lg border border-brdr px-4 py-2 text-xs font-bold text-fg-prim hover:border-acc-prim"
                >
                  <ArrowRightStartOnRectangleIcon class="size-4" />
                  More Info
                </NuxtLink>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
