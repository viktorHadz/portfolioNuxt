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
    frame: 'md:-right-8 lg:-right-45',
    motif: 'rings',
    icon: 'md:size-28 lg:size-40',
  },
  scan: {
    frame: 'md:-right-8 lg:-right-46 lg:rotate-1',
    motif: 'scan',
    icon: 'md:size-24 lg:size-36',
  },
  radial: {
    frame: 'md:-right-6 lg:-right-40',
    motif: 'radial',
    icon: 'md:size-24 lg:size-36',
  },
  grid: {
    frame: 'md:-right-8 lg:-right-44 lg:-rotate-1',
    motif: 'grid',
    icon: 'md:size-28 lg:size-40',
  },
}

const variant = computed(
  () => previewVariants[props.project.previewVariant] ?? previewVariants.rings,
)
</script>

<template>
  <div class="absolute md:size-28 md:rounded-full md:bg-acc-prim/5 md:blur-2xl lg:size-40 lg:blur-3xl" />

  <div
    class="absolute flex md:size-52 md:items-center md:justify-center md:rounded-xl md:border md:border-brdr md:bg-bg-sec/40 lg:size-72 lg:rounded-2xl"
    :class="variant.frame"
  >
    <div class="absolute md:inset-4 md:rounded-lg md:border md:border-white/5 lg:inset-6 lg:rounded-xl" />

    <template v-if="variant.motif === 'rings'">
      <div class="absolute md:size-32 md:rounded-full md:border md:border-acc-prim/15 lg:size-44" />
      <div class="absolute md:size-40 md:rounded-full md:border md:border-dashed md:border-acc-prim/10 lg:size-52" />
    </template>

    <template v-else-if="variant.motif === 'scan'">
      <div class="absolute md:h-px md:w-36 md:bg-acc-prim/20 lg:w-48" />
      <div class="absolute md:h-36 md:w-px md:bg-acc-prim/10 lg:h-48" />
      <div class="absolute md:size-36 md:rounded-lg md:border md:border-dashed md:border-acc-prim/10 lg:size-48 lg:rounded-xl" />
    </template>

    <template v-else-if="variant.motif === 'radial'">
      <div class="absolute md:size-36 md:rounded-full md:border md:border-acc-sec/20 lg:size-48" />
      <div class="absolute md:size-24 md:rounded-full md:border md:border-acc-prim/15 lg:size-36" />
      <div class="absolute md:h-px md:w-40 md:bg-acc-sec/10 lg:w-56" />
    </template>

    <template v-else-if="variant.motif === 'grid'">
      <div class="absolute md:inset-7 md:grid md:grid-cols-3 md:grid-rows-3 md:gap-1.5 md:opacity-30 lg:inset-10 lg:gap-2">
        <div v-for="i in 9" :key="i" class="rounded border border-acc-prim/20" />
      </div>
    </template>

    <div class="absolute md:inset-3 lg:inset-4">
      <div class="absolute top-0 left-0 md:h-3 md:w-3 md:border-t md:border-l md:border-acc-prim/30 lg:h-4 lg:w-4" />
      <div class="absolute top-0 right-0 md:h-3 md:w-3 md:border-t md:border-r md:border-acc-prim/30 lg:h-4 lg:w-4" />
      <div class="absolute bottom-0 left-0 md:h-3 md:w-3 md:border-b md:border-l md:border-acc-prim/30 lg:h-4 lg:w-4" />
      <div class="absolute right-0 bottom-0 md:h-3 md:w-3 md:border-r md:border-b md:border-acc-prim/30 lg:h-4 lg:w-4" />
    </div>

    <component :is="project.preview" class="relative z-10 opacity-80" :class="variant.icon" />
  </div>
</template>
