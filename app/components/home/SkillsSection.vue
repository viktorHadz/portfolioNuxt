<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import FormCharacter from './skills/FormCharacter.vue'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import CardAuth from './skills/art/CardAuth.vue'
import CardBackendData from './skills/art/CardBackendData.vue'
import CardDeployOps from './skills/art/CardDeployOps.vue'
import CardUiUx from './skills/art/CardUiUx.vue'

let gsapContext
const extraInfo = [{}, {}, {}, {}, {}]
// opens a popover with further info for each
const cardData = [
  {
    id: 1,
    eyebrow: 'Application core',
    title: ['backend & ', 'data'],
    graphic: CardBackendData,
    blurb: 'APIs, databases, schemas and integrations that power my software.',
    data: extraInfo[0],
  },
  {
    id: 2,
    eyebrow: 'Trust layer',
    title: ['auth & ', 'security'],
    graphic: CardAuth,
    blurb: 'Authentication, authorization, sessions and data protection patterns.',
    data: extraInfo[1],
  },
  {
    id: 3,
    eyebrow: 'Ship & maintain',
    title: ['deployment & ', 'ops'],
    graphic: CardDeployOps,
    blurb: 'CI/CD, testing, servers, monitoring and logging that keep production stable.',
    data: extraInfo[2],
  },
  {
    id: 4,
    eyebrow: 'Interface systems',
    title: ['interface & ', 'UX'],
    graphic: CardUiUx,
    blurb: 'Component-driven UI/UX optimized for performance and user-first flow.',
    data: extraInfo[3],
  },
]
const graphicRefs = ref({})

function setGraphicRef(id, el) {
  if (el) graphicRefs.value[id] = el
}

function handleCardEnter(id) {
  graphicRefs.value[id]?.play?.()
}

function handleCardLeave(id) {
  graphicRefs.value[id]?.reverse?.()
}

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
    class="portfolio-capability-map relative isolate bg-bg-prim py-20 text-fg-prim sm:py-28"
    aria-labelledby="capability-map-title"
  >
    <div class="absolute inset-0 bg-stars opacity-50" aria-hidden="true" />
    <SectionDivider position="top" colour="text-bg-sec" :flip="true" />

    <div class="relative mx-auto max-w-7xl px-6 sm:px-8">
      <div class="portfolio-reveal">
        <header class="max-w-2xl sm:mt-16">
          <div class="flex items-center gap-2">
            <LineStart class="size-5" />
            <p class="text-sm font-bold text-acc-prim uppercase">Capability map</p>
          </div>
          <h2
            id="capability-map-title"
            class="mt-3 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            A holistic aproach to
            <span class="text-grad-top">development</span>
          </h2>
          <p class="mt-4 text-base leading-7 text-fg-sec sm:text-lg">
            A deeper overview of my capabilities. From building unique interfaces to designing
            robust systems and shipping scalable software.
          </p>
        </header>
        <div class="mt-6 flex w-full flex-col-reverse justify-between lg:flex-row">
          <div class="mt-12 flex w-full flex-col gap-6">
            <div class="flex-1 rounded border border-acc-prim/20">github</div>
            <div class="flex-1 rounded border border-acc-prim/20">heatmap</div>
          </div>
          <FormCharacter class="max-w-lg" />
        </div>
      </div>
      <div class="mt-12 grid grid-flow-row auto-rows-max gap-4 lg:grid-flow-col">
        <article
          v-for="card in cardData"
          :key="card.id"
          class="group relative flex min-h-96 flex-col overflow-hidden rounded-xl border border-fg-ter/20 bg-bg-sec/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-acc-prim/40 hover:bg-bg-ter/60"
          @mouseenter="handleCardEnter(card.id)"
          @mouseleave="handleCardLeave(card.id)"
        >
          <div
            class="pointer-events-none absolute inset-0 bg-radial from-transparent from-65% to-acc-prim/10 opacity-0 transition duration-300 group-hover:opacity-100"
          />

          <div class="relative flex items-start justify-between gap-4">
            <div>
              <p class="font-mono text-xs font-bold tracking-wide text-sky-300 uppercase">
                {{ card.eyebrow }}
              </p>

              <h3 class="mt-3 text-2xl leading-none font-bold tracking-tight uppercase">
                {{ card.title[0] }}
                <br />
                {{ card.title[1] }}
              </h3>
            </div>

            <span class="font-mono text-xl font-bold text-acc-prim">0{{ card.id }}</span>
          </div>

          <div
            class="relative mt-5 grid min-h-36 place-items-center rounded-lg border border-fg-ter/10 bg-bg-prim/70 p-3"
          >
            <div class="absolute inset-0 bg-stars opacity-20" aria-hidden="true" />
            <component
              :is="card.graphic"
              :ref="(el) => setGraphicRef(card.id, el)"
              class="relative h-full w-full"
            />
          </div>

          <p class="relative mt-5 text-sm leading-6 text-fg-sec">
            {{ card.blurb }}
          </p>

          <button
            class="relative mt-auto flex items-center gap-2 pt-6 text-left font-bold text-acc-prim capitalize transition-colors duration-300 group-hover:text-acc-prim-light"
            type="button"
          >
            Explore
            <ArrowRightIcon
              class="size-4 transition-transform duration-300 group-hover:translate-x-2"
            />
          </button>
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
