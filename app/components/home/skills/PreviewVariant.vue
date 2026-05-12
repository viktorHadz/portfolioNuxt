<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const previewVariants = {
  rings: {
    frame: '-right-45',
    motif: 'rings',
    icon: 'size-40',
  },
  scan: {
    frame: '-right-46 rotate-1',
    motif: 'scan',
    icon: 'size-36',
  },
  radial: {
    frame: '-right-40',
    motif: 'radial',
    icon: 'size-36',
  },
  grid: {
    frame: '-right-44 -rotate-1',
    motif: 'grid',
    icon: 'size-40',
  },
}

const variant = computed(
  () => previewVariants[props.project.previewVariant] ?? previewVariants.rings,
)
</script>

<template>
  <div class="absolute size-40 rounded-full bg-acc-prim/5 blur-3xl" />

  <div
    class="absolute flex size-72 items-center justify-center rounded-2xl border border-brdr bg-bg-sec/40"
    :class="variant.frame"
  >
    <div class="absolute inset-6 rounded-xl border border-white/5" />

    <template v-if="variant.motif === 'rings'">
      <div class="absolute size-44 rounded-full border border-acc-prim/15" />
      <div class="absolute size-52 rounded-full border border-dashed border-acc-prim/10" />
    </template>

    <template v-else-if="variant.motif === 'scan'">
      <div class="absolute h-px w-48 bg-acc-prim/20" />
      <div class="absolute h-48 w-px bg-acc-prim/10" />
      <div class="absolute size-48 rounded-xl border border-dashed border-acc-prim/10" />
    </template>

    <template v-else-if="variant.motif === 'radial'">
      <div class="absolute size-48 rounded-full border border-acc-sec/20" />
      <div class="absolute size-36 rounded-full border border-acc-prim/15" />
      <div class="absolute h-px w-56 bg-acc-sec/10" />
    </template>

    <template v-else-if="variant.motif === 'grid'">
      <div class="absolute inset-10 grid grid-cols-3 grid-rows-3 gap-2 opacity-30">
        <div v-for="i in 9" :key="i" class="rounded border border-acc-prim/20" />
      </div>
    </template>

    <div class="absolute inset-4">
      <div class="absolute top-0 left-0 h-4 w-4 border-t border-l border-acc-prim/30" />
      <div class="absolute top-0 right-0 h-4 w-4 border-t border-r border-acc-prim/30" />
      <div class="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-acc-prim/30" />
      <div class="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-acc-prim/30" />
    </div>

    <component :is="project.preview" class="relative z-10 opacity-80" :class="variant.icon" />
  </div>
</template>
