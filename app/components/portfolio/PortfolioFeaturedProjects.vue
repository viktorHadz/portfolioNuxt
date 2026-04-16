<script setup>
import { portfolioContent } from './portfolioContent'
import ProjectPreview from './PortfolioProjectPreview.vue'
</script>

<template>
  <section
    id="featured-work"
    class="bg-bg-prim py-20 text-fg-prim sm:py-28"
    aria-labelledby="featured-work-title"
  >
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <header class="max-w-3xl">
        <p class="text-sm font-bold text-acc-prim uppercase">Featured work</p>
        <h2
          id="featured-work-title"
          class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
        >
          Live products, paid client work, and the stack behind them
        </h2>
        <p class="mt-4 text-base leading-7 text-fg-sec sm:text-lg">
          These are not toy screenshots. They are projects shaped around real workflows, real
          clients, and software that has to behave once it is online.
        </p>
      </header>

      <ProjectPreview :projects="portfolioContent.featuredProjects" />
    </div>
  </section>
</template>
