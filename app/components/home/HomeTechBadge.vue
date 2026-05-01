<script setup>
import { computed } from 'vue'
import { getTechIcon } from './portfolioContent'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const iconSrc = computed(() => getTechIcon(props.name))
const initials = computed(() =>
  props.name
    .split(/[\s.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <span
    class="inline-flex min-h-8 items-center gap-2 rounded-lg border border-brdr bg-bg-ter px-3 py-1.5 text-xs font-semibold text-fg-prim shadow-sm"
    :class="compact ? 'px-2 py-1 text-tiny' : ''"
  >
    <img
      v-if="iconSrc"
      :src="iconSrc"
      alt=""
      aria-hidden="true"
      class="size-4 shrink-0"
      loading="lazy"
    />
    <span
      v-else
      class="inline-flex size-4 shrink-0 items-center justify-center rounded-sm bg-acc-prim text-[0.55rem] font-bold text-bg-prim"
      aria-hidden="true"
    >
      {{ initials }}
    </span>
    <span>{{ name }}</span>
  </span>
</template>
