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
  [TabCode, 'hidden sm:block left-[15%] lg:left-[75%] top-[35%] lg:top-[70%] w-18 lg:w-24'],
  [TabIde, 'hidden sm:block left-[15%] md:left-[20%] top-[85%] w-16 lg:w-24 rotate-6'],
  [TabTerm, 'hidden sm:block left-[85%] top-[25%] w-16 lg:w-24'],
  [TabDiagram, 'hidden sm:block lg:hidden left-[75%] top-[70%] w-18'],
  // Speech bubbles
  [BubDev, 'hidden lg:block left-[25%] top-[5%] w-32 -rotate-8 '],
  [BubSoft, 'hidden lg:block left-[20%] top-[33%] w-34'],
  // Icons left
  [Go, 'left-0 sm:left-[15%] lg:left-[10%] -top-[15%] w-14 lg:w-20'],
  [React, '-left-[10%] sm:left-[5%] lg:left-[0%] top-[15%] w-14 lg:w-18'],
  [Vue, '-left-[10%] sm:left-0  bottom-[25%] w-14 lg:w-20'],
  // Icons right
  [Node, 'left-[60%] -top-[4.5rem] w-14 lg:w-18'],
  [EX, 'left-[75%] top-0 w-14 lg:w-18'],
  [Twind, 'left-[75%] top-[45%] w-14 lg:w-20'],

  [DB, 'left-[33%] sm:left-[50%] top-[80%] lg:top-[90%] sm:bottom-0 w-16 lg:w-22'],
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
