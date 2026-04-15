<script setup>
import { portfolioContent } from './portfolioContent'
</script>

<template>
  <section
    class="relative isolate border-y border-brdr bg-bg-sec text-fg-prim"
    aria-label="Portfolio proof points"
  >
    <DecorField />
    <div class="mx-auto grid max-w-7xl gap-3 px-6 py-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
      <article
        v-for="stat in portfolioContent.stats"
        :key="stat.label"
        class="portfolio-reveal flex min-h-32 flex-col justify-between rounded-lg border border-brdr bg-bg-prim/40 p-5 text-center sm:min-h-36 lg:text-left"
      >
        <p class="text-2xl leading-none font-bold text-acc-prim sm:text-3xl">
          {{ stat.value }}
        </p>
        <p class="mx-auto mt-5 max-w-52 text-sm leading-6 text-balance text-fg-sec lg:mx-0">
          {{ stat.label }}
        </p>
      </article>
    </div>
  </section>
</template>
