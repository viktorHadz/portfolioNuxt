<script setup>
import OrbitSystem from '../Decor/OrbitSystem.vue'
import { portfolioContent } from './portfolioContent'
</script>

<template>
  <section
    class="relative overflow-hidden bg-bg-prim py-20 text-fg-prim sm:py-28"
    aria-labelledby="process-title"
  >
    <div
      class="bg-stars absolute inset-0 opacity-40"
      aria-hidden="true"
    />

    <div class="pointer-events-none absolute inset-x-0 top-24 h-130 w-full sm:bottom-0">
      <OrbitSystem
        stroke-color="white"
        :stroke-opacity="0.02"
        :spin-speed="[20, 20, 20, 16, 16, 12]"
      />
    </div>

    <div class="mx-auto max-w-7xl px-6 sm:px-12">
      <header class="portfolio-reveal max-w-3xl">
        <p class="text-sm font-bold text-acc-prim uppercase">Build process</p>
        <h2
          id="process-title"
          class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
        >
          How an idea becomes something usable
        </h2>
      </header>

      <ol class="mt-14 grid gap-5 sm:gap-12 md:grid-cols-2">
        <li
          v-for="step in portfolioContent.processSteps"
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
