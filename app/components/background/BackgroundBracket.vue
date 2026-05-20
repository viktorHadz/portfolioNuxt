<script setup lang="ts">
const borderByCorner = {
  tl: 'border-t border-l',
  tr: 'border-t border-r',
  bl: 'border-b border-l',
  br: 'border-r border-b',
} as const

defineProps<{ corner: keyof typeof borderByCorner }>()
</script>

<template>
  <div :class="['size-5 border-fg-ter/40', borderByCorner[corner]]" />
</template>
