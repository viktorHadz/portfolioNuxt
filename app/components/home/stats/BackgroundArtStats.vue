<script setup lang="ts">
import BackgroundBracket from '../../background/BackgroundBracket.vue'
import BackgroundDotMatrix from '../../background/BackgroundDotMatrix.vue'
import BackgroundGrid from '../../background/BackgroundGrid.vue'
import BackgroundPluses from '../../background/BackgroundPluses.vue'

const plusPositions = [
  'top-24 left-8',
  'top-16 left-80 hidden lg:block',
  'top-64 right-8 hidden md:block',
  'right-24 bottom-52 hidden md:block',
  'bottom-40 left-40 hidden lg:block',
]
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    <BackgroundGrid cols-class="grid-cols-8" rows-class="grid-rows-6" :cols="8" :rows="6" />

    <BackgroundBracket corner="tl" class="absolute top-40 left-6 sm:left-10" />
    <BackgroundBracket corner="bl" class="absolute bottom-8 left-6 sm:left-10" />
    <BackgroundBracket corner="tr" class="absolute top-12 right-6 sm:right-10" />
    <BackgroundBracket corner="br" class="absolute right-6 bottom-8 sm:right-10" />

    <!-- top-left telemetry -->
    <div class="absolute top-16 left-12 sm:left-12 lg:left-32">
      <div class="mt-3 font-mono text-xs tracking-[0.22em] text-fg-ter/35">
        SYS_01
        <span class="ml-3 text-acc-prim/80">ACTIVE</span>
      </div>
    </div>

    <!-- top-right sync -->
    <div class="absolute top-40 right-10 flex items-center gap-3 sm:right-10 lg:right-12">
      <span class="font-mono text-xs tracking-[0.22em] text-fg-ter/40">SYNC</span>
      <span class="size-1.5 rounded-full bg-acc-sec" />
    </div>

    <!-- top-right dotted matrix -->
    <BackgroundDotMatrix
      class="absolute top-40 right-1/2 hidden grid-cols-12 gap-2 opacity-20 lg:grid"
      :count="48"
    />

    <!-- top-right telemetry arcs -->
    <div
      class="absolute top-20 -right-32 hidden size-96 rounded-full border border-fg-ter/8 md:block"
    />
    <div
      class="absolute top-32 -right-20 hidden size-72 rounded-full border border-dashed border-fg-ter/10 md:block"
    />

    <!-- left ruler cluster -->
    <div class="absolute top-1/2 left-6 hidden h-80 w-20 lg:block">
      <div class="absolute inset-y-0 left-0 w-px bg-fg-ter/10" />

      <div class="flex h-full flex-col justify-between">
        <span
          v-for="i in 21"
          :key="`tick-left-${i}`"
          class="h-px bg-fg-ter/20"
          :class="i % 4 === 0 ? 'w-4' : 'w-2'"
        />
      </div>

      <div
        class="absolute inset-y-0 left-5 flex flex-col justify-between font-mono text-xs text-fg-ter/25"
      >
        <span>100</span>
        <span>80</span>
        <span>60</span>
        <span>40</span>
        <span>20</span>
        <span>0</span>
      </div>

      <div class="absolute top-40 left-3 flex items-center gap-2">
        <span class="border-y-4 border-r-4 border-y-transparent border-r-acc-prim" />
      </div>
    </div>

    <!-- right-side data readout -->
    <div class="absolute right-8 bottom-12 text-right sm:right-10 lg:right-12">
      <div class="font-mono text-xs tracking-[0.2em] text-fg-ter/35">LOG_STREAM</div>
      <div class="mt-2 font-mono text-xs tracking-[0.2em] text-acc-prim/85">OK</div>
    </div>

    <!-- lower-left dotted matrix -->
    <BackgroundDotMatrix
      class="absolute bottom-16 left-8 hidden grid-cols-6 gap-3 opacity-15 sm:grid lg:left-12"
      :count="30"
    />

    <!-- bottom-center histogram, centered by layout instead of left percentage -->
    <div class="absolute inset-x-0 bottom-8 hidden justify-center opacity-18 xl:flex">
      <div>
        <div class="relative h-28 w-80">
          <div class="absolute inset-x-0 bottom-0 h-px bg-fg-ter/20" />
          <div class="absolute inset-y-0 left-0 w-px bg-fg-ter/10" />
          <div class="absolute inset-y-0 right-0 w-px bg-fg-ter/10" />

          <div class="absolute inset-x-3 bottom-2 flex items-end gap-2">
            <span
              v-for="(h, i) in [
                10, 18, 12, 8, 14, 42, 66, 54, 48, 72, 40, 22, 12, 34, 76, 46, 30, 56, 36, 28, 24,
                40,
              ]"
              :key="`hist-${i}`"
              class="w-2 bg-fg-ter/45"
              :style="{ height: `${h}px` }"
            />
          </div>
        </div>

        <div
          class="mt-3 flex items-center gap-4 font-mono text-xs tracking-[0.18em] text-fg-ter/30"
        >
          <span>HOURS</span>
          <span class="h-px w-14 bg-fg-ter/20" />
          <span>00</span>
          <span>06</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
      </div>
    </div>

    <!-- small right-side dots -->
    <BackgroundDotMatrix
      class="absolute top-80 right-10 hidden grid-cols-3 gap-2 opacity-20 md:grid lg:right-14"
      :count="6"
    />

    <!-- tiny crosses, fixed anchored positions -->
    <BackgroundPluses :positions="plusPositions" />
  </div>
</template>
