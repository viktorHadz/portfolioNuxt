<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { portfolioContent } from './portfolioContent'
import PortfolioTechBadge from './PortfolioTechBadge.vue'
import FormMan from '../Decor/FormMan.vue'

let gsapContext

onMounted(async () => {
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  if (reduceMotionQuery.matches) {
    return
  }

  const { default: gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  gsap.registerPlugin(ScrollTrigger)
})

onBeforeUnmount(() => {
  gsapContext?.revert()
})
</script>

<template>
  <section
    ref="capabilityMap"
    class="portfolio-capability-map relative isolate bg-bg-sec py-20 text-fg-prim sm:py-28"
    aria-labelledby="capability-map-title"
  >
    <DecorField />

    <div class="relative mx-auto max-w-7xl px-6 sm:px-8">
      <div class="portfolio-reveal sm:flex">
        <header class="max-w-2xl sm:mt-16">
          <p class="text-sm font-bold text-acc-prim uppercase">Capability map</p>
          <h2
            id="capability-map-title"
            class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
          >
            A full-stack route through strange dimensions
          </h2>
          <p class="mt-4 text-base leading-7 text-fg-sec sm:text-lg">
            Interfaces, data, trust, and deployment tuned into one navigable system.
          </p>
        </header>
        <FormMan class="mt-6 max-w-md" />
      </div>

      <div class="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        <article
          v-for="(capability, index) in portfolioContent.capabilities"
          :key="capability.title"
          class="portfolio-capability group relative flex h-full flex-col overflow-hidden rounded-lg border border-brdr bg-bg-prim/75 p-5 shadow-lg shadow-black/10"
        >
          <span
            class="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-acc-prim via-acc-sec to-acc-ter opacity-80"
            aria-hidden="true"
          />
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-bold text-acc-ter uppercase">
                {{ capability.signal }}
              </p>
              <h3 class="mt-3 text-2xl font-bold">
                {{ capability.title }}
              </h3>
            </div>
            <p class="font-mono text-2xl leading-none font-bold text-acc-sec">
              {{ String(index + 1).padStart(2, '0') }}
            </p>
          </div>

          <p class="mt-3 text-sm leading-6 text-fg-sec">
            {{ capability.summary }}
          </p>

          <div class="mt-5 flex flex-wrap gap-2">
            <PortfolioTechBadge
              v-for="skill in capability.skills"
              :key="skill"
              :name="skill"
              compact
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.capability-portal-svg {
  min-height: 21rem;
  overflow: visible;
}

.capability-node-label {
  fill: var(--fg-primary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0;
}

.capability-readout span {
  border: 1px solid rgba(163, 217, 32, 0.26);
  border-radius: 8px;
  background: rgba(13, 13, 13, 0.66);
  color: var(--fg-secondary);
  padding: 0.7rem 0.75rem;
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .capability-probe-orbit,
  .capability-portal-core,
  .capability-morph-line {
    transform: none !important;
  }
}
</style>
