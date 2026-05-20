<script setup lang="ts">
import BackgroundBracket from '../background/BackgroundBracket.vue'
import BackgroundDotMatrix from '../background/BackgroundDotMatrix.vue'
import BackgroundGrid from '../background/BackgroundGrid.vue'
import BackgroundPluses from '../background/BackgroundPluses.vue'

const plusPositions = [
  'top-24 left-1/2',
  'right-24 bottom-48 hidden lg:block',
  'bottom-24 left-24 hidden lg:block',
]
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
    <BackgroundGrid cols-class="grid-cols-6" rows-class="grid-rows-5" :cols="6" :rows="5" />

    <BackgroundBracket corner="tl" class="absolute top-24 left-6 sm:left-10" />
    <BackgroundBracket corner="br" class="absolute right-6 bottom-8 sm:right-10" />

    <!-- top-right label -->
    <div class="absolute top-12 right-16 hidden items-center gap-3 md:flex">
      <span class="size-1.5 rounded-full bg-acc-prim" />
    </div>

    <!-- subtle dotted matrix -->
    <BackgroundDotMatrix
      class="absolute top-16 right-56 hidden grid-cols-5 gap-2 opacity-15 lg:grid"
      :count="20"
    />

    <!-- tiny ui markers -->
    <div
      v-for="i in 8"
      :key="`zero-${i}`"
      class="absolute text-fg-ter/10"
      :style="{ top: `${12 + i * 10}%`, left: `${8 + (i % 4) * 22}%` }"
    >
      0001 00
    </div>
    <div
      v-for="i in 10"
      :key="`zero-1-${i}`"
      class="absolute text-fg-ter/10"
      :style="{ top: `${0 + i * 10}%`, left: `${12 + (i % 4) * 22}%` }"
    >
      00
    </div>

    <BackgroundPluses :positions="plusPositions" />
  </div>
</template>
