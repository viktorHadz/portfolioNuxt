<script setup lang="ts">
import BackgroundBracket from '../../background/BackgroundBracket.vue'
import BackgroundDotMatrix from '../../background/BackgroundDotMatrix.vue'
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    <!-- scan lines -->
    <div class="absolute inset-0 opacity-[0.04]">
      <div
        v-for="i in 12"
        :key="`line-${i}`"
        class="absolute h-px bg-fg-ter"
        :style="{ top: `${i * 8}%`, left: `${(i % 2) * 10}%`, width: `${30 + (i % 3) * 20}%` }"
      />
    </div>
    <!-- calibration circles -->
    <div class="absolute top-[25%] left-[3%] size-168 rounded-full border border-fg-ter/10" />
    <div class="absolute top-[30%] left-[8%] size-128 rounded-full border border-fg-ter/10" />
    <div class="absolute top-[35%] left-[13%] size-88 rounded-full border border-fg-ter/10" />
    <div class="absolute top-[42%] left-[18%] size-48 rounded-full border border-fg-ter/10" />
    <!-- crosshair -->
    <div class="absolute top-[51%] left-[24%] h-px w-20 bg-fg-ter/10" />
    <div class="absolute top-[47%] left-[28%] h-20 w-px bg-fg-ter/10" />
    <!-- ui brackets -->
    <BackgroundBracket corner="tl" class="absolute top-[3%] left-[3%] lg:top-[12%]" />
    <BackgroundBracket corner="bl" class="absolute top-[95%] left-[4%]" />
    <BackgroundBracket corner="tr" class="absolute top-[10%] right-[2%]" />
    <BackgroundBracket corner="br" class="absolute right-[6%] bottom-[1%] lg:bottom-[4%]" />
    <!-- waveform snippets -->
    <div class="absolute top-[22%] left-[18%] flex gap-1 opacity-20">
      <span class="h-px w-8 bg-fg-ter" />
      <span class="mt-2 h-px w-14 bg-fg-ter" />
      <span class="mt-1 h-px w-6 bg-fg-ter" />
    </div>
    <div class="absolute right-[18%] bottom-[24%] flex gap-1 opacity-20">
      <span class="mt-1 h-px w-10 bg-fg-ter" />
      <span class="h-px w-16 bg-fg-ter" />
      <span class="mt-2 h-px w-5 bg-fg-ter" />
    </div>
    <!-- tiny crosses -->
    <div
      v-for="i in 8"
      :key="`cross-${i}`"
      class="absolute text-fg-ter/20"
      :style="{ top: `${12 + i * 10}%`, left: `${8 + (i % 4) * 22}%` }"
    >
      +
    </div>
    <!-- words -->
    <div
      class="absolute top-[4%] left-[5%] font-mono text-xs tracking-widest text-fg-ter/40 lg:top-[13%]"
    >
      SIGNAL
    </div>
    <div
      class="absolute top-[24%] left-[4%] font-mono text-xs tracking-widest text-fg-ter/20 lg:top-[26%]"
    >
      VHF 02
    </div>
    <div
      class="absolute right-[10%] bottom-[2%] font-mono text-xs tracking-widest text-fg-ter/40 lg:bottom-[5%]"
    >
      CALIBRATE
    </div>
    <div class="absolute top-[44%] right-[10%] font-mono text-xs tracking-widest text-fg-ter/20">
      LIVE
    </div>
    <!-- dotted matrices -->
    <BackgroundDotMatrix
      class="absolute top-[3%] right-[20%] grid-cols-4 gap-2 opacity-20 lg:top-[5%]"
      :count="16"
    />
    <BackgroundDotMatrix
      class="absolute bottom-[18%] left-[6%] grid-cols-4 gap-2 opacity-20"
      :count="16"
    />
  </div>
</template>
