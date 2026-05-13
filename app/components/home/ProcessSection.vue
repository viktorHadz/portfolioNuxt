<script setup>
import { homeContent } from '~/data/portfolio/home'
</script>

<template>
  <section
    class="relative overflow-hidden bg-bg-sec py-20 text-fg-prim sm:py-28"
    aria-labelledby="process-title"
  >
    <SectionDivider colour="text-bg-prim" position="top" />

    <div class="mx-auto max-w-7xl px-6 py-20 sm:px-12">
      <header class="portfolio-reveal max-w-3xl">
        <div class="flex items-center gap-2">
          <LineStart class="size-5" />
          <p class="text-sm font-bold text-acc-prim uppercase">More stats</p>
        </div>

        <h2
          id="process-title"
          class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
        >
          How an idea becomes something usable
        </h2>
      </header>

      <figure class="max-w-xl">
        <embed
          src="https://wakatime.com/share/@61af5c0f-9f7d-4430-810c-c2186bde6c24/a5a498f5-6c7b-4b56-bd1e-4b7190c4a0f7.svg"
        />
        <!-- Or get via json with 
         https://wakatime.com/share/@61af5c0f-9f7d-4430-810c-c2186bde6c24/ece4549c-cac4-41c2-820b-2e90f5712a45.json -->
      </figure>
      <ol class="mt-14 grid gap-5 sm:gap-12 md:grid-cols-2">
        <li
          v-for="step in homeContent.processSteps"
          :key="step.step"
          class="portfolio-process-card relative overflow-hidden rounded-lg border border-brdr bg-bg-sec/60 p-5 shadow-xl shadow-black/15 backdrop-blur-sm"
        >
          <span
            class="absolute top-5 right-5 size-3 animate-pulse rounded-sm bg-acc-prim shadow-lg"
            aria-hidden="true"
          />
          <p class="text-xs font-bold text-acc-ter uppercase">
            {{ step.signal }}
          </p>
          <p class="mt-6 text-sm font-bold text-acc-sec">{{ step.step }}</p>
          <h3 class="mt-3 text-xl font-bold">{{ step.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-fg-sec">{{ step.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
