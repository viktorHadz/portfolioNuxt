<script setup lang="ts">
defineProps<{ cols: number; rows: number; colsClass: string; rowsClass: string }>()
</script>

<template>
  <div :class="['absolute inset-0 grid opacity-[0.03]', colsClass]">
    <span v-for="i in cols" :key="`v-${i}`" class="border-l border-fg-ter" />
  </div>

  <div :class="['absolute inset-0 grid opacity-[0.03]', rowsClass]">
    <span v-for="i in rows" :key="`h-${i}`" class="border-t border-fg-ter" />
  </div>
</template>
