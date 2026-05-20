<script setup lang="ts">
defineProps<{ positions: string[] }>()
</script>

<template>
  <div
    v-for="position in positions"
    :key="position"
    :class="['absolute font-mono text-sm text-fg-ter/20', position]"
  >
    +
  </div>
</template>
