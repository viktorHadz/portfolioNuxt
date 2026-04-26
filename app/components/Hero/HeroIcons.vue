<script setup>
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

import BubDev from '@/components/Hero/hics/BubDev.vue'
import BubSoft from '@/components/Hero/hics/BubSoft.vue'
import DB from '@/components/Hero/hics/DB.vue'
import EX from '@/components/Hero/hics/EX.vue'
import Go from '@/components/Hero/hics/Go.vue'
import Node from '@/components/Hero/hics/Node.vue'
import ReactIcon from '@/components/Hero/hics/React.vue'
import TabCode from '@/components/Hero/hics/TabCode.vue'
import TabDiagram from '@/components/Hero/hics/TabDiagram.vue'
import TabIde from '@/components/Hero/hics/TabIde.vue'
import TabTerm from '@/components/Hero/hics/TabTerm.vue'
import Twind from '@/components/Hero/hics/Twind.vue'
import VueIcon from '@/components/Hero/hics/Vue.vue'

const icons = [
  [ReactIcon, 'left-2/5 top-1/5 w-12 -rotate-6 sm:w-14'],
  [Node, 'left-7/12 top-1/6 w-14 rotate-6 sm:w-16'],
  [TabCode, 'hidden left-3/4 top-1/6 w-24 -rotate-3 sm:block lg:w-28'],
  [VueIcon, 'left-1/4 top-2/5 w-16 sm:w-20'],
  [EX, 'hidden left-3/4 top-1/3 w-14 sm:block lg:w-16'],
  [TabIde, 'hidden left-5/12 top-1/2 w-24 rotate-6 md:block lg:w-32'],
  [BubDev, 'hidden left-1/3 top-7/12 w-28 -rotate-6 lg:block'],
  [Twind, 'hidden left-5/6 top-7/12 w-16 sm:block lg:w-20'],
  [Go, 'left-1/4 top-3/4 w-14 sm:w-16'],
  [TabTerm, 'left-5/6 top-3/4 w-24 sm:w-28'],
  [BubSoft, 'hidden left-1/3 top-11/12 w-32 -rotate-12 lg:block'],
  [DB, 'hidden left-7/12 top-11/12 w-14 sm:block lg:w-20'],
  [TabDiagram, 'hidden left-3/4 top-11/12 w-32 rotate-6 xl:block'],
]

let iconFloatTween
let iconEntryTl

function floatIcons() {
  iconFloatTween?.kill()

  iconFloatTween = gsap.to('.hero-icon-inner', {
    x: (index) => (index % 2 ? 5 : -5),
    y: -10,
    duration: (index) => 5 + (index % 3) * 0.35,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.08,
  })
}

function playIconsEntry() {
  iconFloatTween?.kill()
  iconEntryTl?.kill()

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set('.hero-icon-inner', { autoAlpha: 1 })
    return
  }

  iconEntryTl = gsap
    .timeline()
    .fromTo(
      '.hero-icon-inner',
      { autoAlpha: 0, scale: 0.2 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.62,
        ease: 'back.out(1.8)',
        stagger: 0.05,
      },
    )
    .add(floatIcons)
}

defineExpose({
  playIconsEntry,
  floatIcons,
})

onMounted(() => {
  playIconsEntry()
})

onUnmounted(() => {
  iconEntryTl?.kill()
  iconFloatTween?.kill()
})
</script>

<template>
  <div class="pointer-events-none absolute inset-0 z-40 overflow-visible">
    <div
      v-for="(icon, index) in icons"
      :key="index"
      class="hero-icon absolute -translate-x-1/2 -translate-y-1/2"
      :class="icon[1]"
      aria-hidden="true"
    >
      <div class="hero-icon-inner will-change-transform">
        <component
          :is="icon[0]"
          class="h-auto w-full drop-shadow-xl"
        />
      </div>
    </div>
  </div>
</template>
