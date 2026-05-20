<script setup lang="ts">
defineProps<{ count: number }>()
</script>

<template>
  <div class="grid">
    <span v-for="i in count" :key="i" class="size-1 rounded-full bg-fg-ter" />
  </div>
</template>
