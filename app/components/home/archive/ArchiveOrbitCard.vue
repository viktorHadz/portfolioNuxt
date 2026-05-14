<script setup>
import ArchiveFrame from '../process/ArchiveFrame.vue'

defineProps({
  title: { type: String, required: true },
  copy: { type: String, required: true },
  meta: { type: String, required: true },
  icon: { type: String, default: '' },
  art: { type: [Object, Function], default: null },
  left: Boolean,
})
</script>

<template>
  <article
    class="pointer-events-none flex w-56 items-center gap-3 p-3"
    :class="left && 'flex-row-reverse'"
  >
    <div class="relative shrink-0">
      <span
        class="absolute -top-3 size-8 rounded-full border border-acc-prim/60 bg-bg-prim"
        :class="left ? '-right-3' : '-left-3'"
      />
      <span
        class="absolute -bottom-6 size-4 rounded-full border border-acc-prim/35 bg-bg-prim"
        :class="left ? '-left-1' : '-right-1'"
      />

      <ArchiveFrame>
        <component :is="art" v-if="art" class="mt-2 size-9" />
      </ArchiveFrame>
    </div>

    <div class="min-w-0 text-xs" :class="left && 'text-right'">
      <p class="font-mono font-bold text-acc-prim">
        {{ title }}
      </p>
      <p class="mt-1 text-fg-sec">
        {{ copy }}
      </p>
      <p class="text-fg-ter">
        {{ meta }}
      </p>
    </div>
  </article>
</template>
