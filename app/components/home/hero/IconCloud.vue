<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'

import BubbleDev from './art/BubbleDev.vue'
import BubbleSoftware from './art/BubbleSoftware.vue'
import CodeTab from './art/CodeTab.vue'
import Database from './art/Database.vue'
import DiagramTab from './art/DiagramTab.vue'
import Express from './art/Express.vue'
import Go from './art/Go.vue'
import IdeTab from './art/IdeTab.vue'
import Node from './art/Node.vue'
import React from './art/React.vue'
import Tailwind from './art/Tailwind.vue'
import TerminalTab from './art/TerminalTab.vue'
import Vue from './art/Vue.vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: true,
  },
})

const icons = [
  [
    CodeTab,
    'hidden sm:block left-[15%] sm:left-[20%] lg:left-[80%] top-[35%] lg:top-[90%] w-18 lg:w-24',
  ],
  [IdeTab, 'hidden sm:block left-[15%] md:left-[20%] top-[85%] w-16 lg:w-24 rotate-6'],
  [TerminalTab, 'hidden sm:block left-[75%] top-[30%] w-16 lg:w-20'],
  [DiagramTab, 'hidden sm:block lg:hidden left-[75%] top-[70%] w-18'],
  // Speech bubbles
  [BubbleDev, 'hidden lg:block left-[30%] top-[15%] w-32 -rotate-8 '],
  [BubbleSoftware, 'hidden lg:block left-[25%] top-[50%] w-34'],
  // Icons left
  [Go, 'left-10 sm:left-[15%] lg:left-[10%] top-0 lg:-top-[15%] w-14 lg:w-20'],
  [React, 'left-0 sm:left-[5%] lg:left-[0%] top-[35%] w-14 lg:w-18'],
  [Vue, 'left-[0%] sm:left-0 lg:left-[10%] bottom-0 lg:bottom-[25%] w-14 lg:w-20'],
  // Icons right
  [Node, 'left-[80%] top-[10%] lg:top-0 w-14 lg:w-18'],
  [Express, 'left-[90%] lg:left-[95%] top-[45%] lg:top-[30%] w-14 lg:w-18'],
  [Tailwind, 'left-[90%] top-[80%] lg:top-[65%] w-14 lg:w-20'],
  [Database, 'left-[45%] sm:left-[50%] top-[95%]  w-16 lg:w-22'],
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
