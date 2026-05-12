<script setup>
import BubbleDev from './art/BubbleDev.vue'
import BubbleSoftware from './art/BubbleSoftware.vue'
import Database from './art/Database.vue'
import Express from './art/Express.vue'
import Go from './art/Go.vue'
import Node from './art/Node.vue'
import React from './art/React.vue'
import Tailwind from './art/Tailwind.vue'
import TerminalTab from './art/TerminalTab.vue'
import Vue from './art/Vue.vue'

defineProps({
  active: {
    type: Boolean,
    default: true,
  },
})

const entered = ref(false)

const icons = [
  [TerminalTab, 'hidden sm:block left-[75%] top-[40%] w-16 lg:w-20'],
  [
    BubbleDev,
    'hidden sm:block left-[20%] md:left-[25%] top-[10%] sm:top-[20%] lg:top-[15%] sm:w-24 lg:w-32 -rotate-12',
  ],
  [BubbleSoftware, 'hidden sm:block left-[20%]  top-[55%] lg:top-[50%] sm:w-26 lg:w-34 -rotate-8'],
  [Tailwind, 'left-10 sm:left-[15%] lg:left-[10%] top-0 w-10 sm:w-14 md:w-20'],
  [React, '-left-[5%] sm:left-[0%] top-[35%] w-10 sm:w-14 md:w-20'],
  [Vue, 'left-[0%]  md:left-[10%] bottom-0 lg:bottom-[25%] w-10 sm:w-14 md:w-20'],
  [Go, 'left-[45%] sm:left-[60%] top-[0%] lg:top-[5%] w-10 sm:w-14 md:w-20'],
  [Node, 'left-[80%] top-[15%] lg:top-0 w-10 sm:w-14 md:w-20'],
  [Express, 'left-[90%] top-[45%] lg:top-[30%] w-10 sm:w-14 md:w-20'],
  [Database, 'left-[90%] md:left-[80%] top-[80%] lg:top-[65%] w-10 sm:w-14 md:w-20'],
]

function playEntry() {
  if (entered.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    entered.value = true
    return
  }

  requestAnimationFrame(() => {
    entered.value = true
  })
}

defineExpose({
  playEntry,
})
</script>

<template>
  <div class="pointer-events-none absolute inset-0 z-40 overflow-visible" aria-hidden="true">
    <div
      v-for="(icon, index) in icons"
      :key="index"
      class="hero-icon absolute"
      :class="[icon[1], entered && 'hero-icon-enter']"
      :style="{ '--icon-delay': `${index * 70}ms` }"
    >
      <component :is="icon[0]" class="h-auto w-full" />
    </div>
  </div>
</template>

<style scoped>
.hero-icon {
  opacity: 0;
  transform: translate3d(0, 0.875rem, 0) scale(0.88);
}

.hero-icon-enter {
  animation: hero-icon-in 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.15) both;
  animation-delay: var(--icon-delay);
}

@keyframes hero-icon-in {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-icon,
  .hero-icon-enter {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
