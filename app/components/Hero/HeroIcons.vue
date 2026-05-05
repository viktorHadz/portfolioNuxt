<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
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

const props = defineProps({
  active: {
    type: Boolean,
    default: true,
  },
})

const icons = [
  [
    TabCode,
    'hidden sm:block left-[15%] sm:left-[20%] lg:left-[80%] top-[35%] lg:top-[90%] w-18 lg:w-24',
  ],
  [TabIde, 'hidden sm:block left-[15%] md:left-[20%] top-[85%] w-16 lg:w-24 rotate-6'],
  [TabTerm, 'hidden sm:block left-[75%] top-[30%] w-16 lg:w-20'],
  [TabDiagram, 'hidden sm:block lg:hidden left-[75%] top-[70%] w-18'],
  // Speech bubbles
  [BubDev, 'hidden lg:block left-[30%] top-[15%] w-32 -rotate-8 '],
  [BubSoft, 'hidden lg:block left-[25%] top-[50%] w-34'],
  // Icons left
  [Go, 'left-10 sm:left-[15%] lg:left-[10%] top-0 lg:-top-[15%] w-14 lg:w-20'],
  [React, 'left-0 sm:left-[5%] lg:left-[0%] top-[35%] w-14 lg:w-18'],
  [Vue, 'left-[0%] sm:left-0 lg:left-[10%] bottom-0 lg:bottom-[25%] w-14 lg:w-20'],
  // Icons right
  [Node, 'left-[80%] top-[10%] lg:top-0 w-14 lg:w-18'],
  [EX, 'left-[90%] lg:left-[95%] top-[45%] lg:top-[30%] w-14 lg:w-18'],
  [Twind, 'left-[90%] top-[80%] lg:top-[65%] w-14 lg:w-20'],
  [DB, 'left-[45%] sm:left-[50%] top-[95%]  w-16 lg:w-22'],
]

let iconFloatTween
let iconEntryTl

function setIconState(active = props.active) {
  iconEntryTl?.[active ? 'resume' : 'pause']()
  iconFloatTween?.[active ? 'resume' : 'pause']()
}

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

  setIconState()
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

  setIconState()
}

defineExpose({
  playIconsEntry,
  floatIcons,
})

onMounted(() => {
  playIconsEntry()
  setIconState()
})

watch(() => props.active, setIconState)

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
      class="hero-icon absolute"
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
