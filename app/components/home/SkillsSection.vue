<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { skillCards } from '~/data/portfolio/skills'
import FormCharacter from './skills/FormCharacter.vue'
import GitHubPanel from './skills/GitHubPanel.vue'
import SkillCard from './skills/SkillCard.vue'
import SkillsModal from './skills/SkillsModal.vue'
import CardAuth from './skills/art/CardAuth.vue'
import CardBackendData from './skills/art/CardBackendData.vue'
import CardDeployOps from './skills/art/CardDeployOps.vue'
import CardUiUx from './skills/art/CardUiUx.vue'

const activeCardId = ref<string | null>(null)

const cardGraphics = {
  'auth-security': CardAuth,
  'backend-data': CardBackendData,
  'deployment-ops': CardDeployOps,
  'interface-ux': CardUiUx,
}

const activeCard = computed(() => skillCards.find((card) => card.id === activeCardId.value) || null)

function openCard(id: string) {
  activeCardId.value = id
}

function closeCard() {
  activeCardId.value = null
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') closeCard()
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
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
            <p class="text-sm font-bold text-acc-prim uppercase">Skills map</p>
          </div>
          <h2
            id="capability-map-title"
            class="mt-3 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            A holistic approach to
            <span class="text-grad-top">development</span>
          </h2>
          <p class="mt-4 text-base leading-7 text-fg-sec sm:text-lg">
            A deeper overview of my capabilities. From building unique interfaces to designing
            robust systems and shipping scalable software.
          </p>
        </header>

        <div class="mt-8 flex w-full flex-col-reverse gap-8 lg:flex-row lg:items-end lg:gap-10">
          <GitHubPanel />
          <FormCharacter class="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-2xl" />
        </div>
      </div>

      <div class="mt-12 grid grid-flow-row auto-rows-max gap-4 lg:grid-flow-col">
        <SkillCard
          v-for="card in skillCards"
          :key="card.id"
          :card="card"
          :graphic="cardGraphics[card.id]"
          @open="openCard(card.id)"
        />
      </div>
    </div>

    <SkillsModal :card="activeCard" @close="closeCard" />
  </section>
</template>
