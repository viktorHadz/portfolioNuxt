<script setup>
import { ArrowRightStartOnRectangleIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'
import { portfolioContent } from './portfolioContent'
import PortfolioTechBadge from './PortfolioTechBadge.vue'
</script>

<template>
  <section
    class="relative isolate bg-bg-sec py-20 text-fg-prim sm:py-28"
    aria-labelledby="archive-title"
  >
    <DecorField />

    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <header class="portfolio-reveal flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div class="max-w-3xl">
          <p class="text-sm font-bold text-acc-prim uppercase">Project archive</p>
          <h2
            id="archive-title"
            class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
          >
            More shipped pieces in orbit
          </h2>
        </div>
      </header>

      <div class="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="project in portfolioContent.archiveProjects"
          :key="project.id"
          class="portfolio-archive-item flex overflow-hidden rounded-lg border border-brdr bg-bg-prim shadow-lg shadow-black/10"
        >
          <div class="p-5">
            <h3 class="text-2xl font-bold">{{ project.name }}</h3>
            <p class="mt-3 text-sm leading-6 text-fg-sec">
              {{ project.summary }}
            </p>
            <div class="mt-5 flex flex-wrap gap-2">
              <PortfolioTechBadge
                v-for="tech in project.stack"
                :key="tech"
                :name="tech"
                compact
              />
            </div>
            <div class="mt-6 flex flex-wrap gap-2 place-self-end">
              <NuxtLink
                :to="project.path"
                class="inline-flex min-h-10 items-center gap-2 rounded-lg border border-brdr px-4 py-2 text-xs font-bold text-fg-prim hover:border-acc-prim"
              >
                <GlobeAltIcon class="size-4" />
                Visit
              </NuxtLink>
              <NuxtLink
                :to="project.gitHub"
                class="inline-flex min-h-10 items-center gap-2 rounded-lg border border-brdr px-4 py-2 text-xs font-bold text-fg-prim hover:border-acc-prim"
              >
                <GittHubIco class="size-4" />

                GitHub
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
        </article>
      </div>
    </div>
  </section>
</template>
