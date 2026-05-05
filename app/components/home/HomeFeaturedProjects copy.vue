<script setup>
import { portfolioContent } from './portfolioContent'
import ProjectPreview from './ProjectPreview.vue'
</script>

<template>
  <section
    id="featured-work"
    class="relative isolate bg-bg-sec py-20 text-fg-prim sm:py-28"
    aria-labelledby="featured-work-title"
  >
    <DecorField class="z-0" />

    <div class="z-10 mx-auto max-w-7xl">
      <header class="max-w-3xl">
        <div class="flex items-center gap-4 font-mono text-sm font-bold text-acc-prim uppercase">
          <DecorDividers />
          <span>Featured work</span>
        </div>
        <h2
          id="featured-work-title"
          class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
        >
          Production
          <span class="text-grad-bottom">work</span>
          and the
          <span class="text-grad-bottom">stack</span>
          behind it
        </h2>
        <p class="mt-4 text-base leading-7 text-fg-sec sm:text-lg">
          Find out a bit more about the client projects I have produced and the workflow behind it.
        </p>
      </header>

      <ProjectPreview :projects="portfolioContent.featuredProjects" />
    </div>
  </section>
</template>
