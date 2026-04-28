<script setup>
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

import BubDev from '@/components/Hero/hics/BubDev.vue'
import BubSoft from '@/components/Hero/hics/BubSoft.vue'
import DB from '@/components/Hero/hics/DB.vue'
import EX from '@/components/Hero/hics/EX.vue'
import Go from '@/components/Hero/hics/Go.vue'
import Node from '@/components/Hero/hics/Node.vue'
import React from '@/components/Hero/hics/React.vue'
import TabCode from '@/components/Hero/hics/TabCode.vue'
import TabDiagram from '@/components/Hero/hics/TabDiagram.vue'
import TabIde from '@/components/Hero/hics/TabIde.vue'
import TabTerm from '@/components/Hero/hics/TabTerm.vue'
import Twind from '@/components/Hero/hics/Twind.vue'
import Vue from '@/components/Hero/hics/Vue.vue'

const icons = [
  [TabCode, 'hidden left-3/4 bottom-0 w-24 sm:block lg:w-32'],
  [TabIde, 'hidden left-32 bottom-6 w-24 rotate-6 md:block lg:w-28'],
  [TabTerm, 'right-12 -top-24 w-24 sm:w-28'],
  [TabDiagram, 'hidden left-3/4 bottom-1/3 w-32 rotate-6 xl:block'],
  [BubSoft, 'hidden left-1/5 top-1/3 w-32 lg:block'],
  [BubDev, 'hidden left-1/4 top-0 w-28 -rotate-6 lg:block'],
  [React, 'left-22 top-12 w-12 sm:w-20'],
  [Node, 'left-7/12 -top-18 w-16 rotate-6 sm:w-18'],
  [Vue, 'left-0 bottom-1/3 w-16 sm:w-22'],
  [EX, 'hidden left-3/4 top-0 w-16 sm:block lg:w-20'],
  [Twind, 'hidden right-12 top-1/3 w-16 sm:block lg:w-22'],
  [Go, 'left-1/4 -top-32 w-14 sm:w-20 '],
  [DB, 'hidden left-1/3 top-11/12 w-14 sm:block lg:w-22'],
]

let iconFloatTween
let iconEntryTl

function floatIcons() {
  iconFloatTween?.kill()

  iconFloatTween = gsap.to('.hero-icon-inner', {
    x: -5,
    y: -10,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
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
    .timeline({ delay: 1 })
    .fromTo(
      '.hero-icon-inner',
      { autoAlpha: 0, scale: 0.2 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.62,
        ease: 'back.out',
        stagger: 0.1,
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
          class="h-auto w-full"
        />
      </div>
    </div>
  </div>
</template>
