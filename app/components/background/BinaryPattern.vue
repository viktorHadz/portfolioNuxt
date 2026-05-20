<script setup lang="ts">
const props = withDefaults(defineProps<{ seed: string; count?: number }>(), { count: 18 })

const offset = Array.from(props.seed).reduce((total, char) => total + char.charCodeAt(0), 0) % 7

const words = ['01', '001', '1010', '0101', '110', '0001', '10']
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
    <span
      v-for="i in props.count"
      :key="`${props.seed}-${i}`"
      class="absolute font-mono text-xs tracking-widest text-fg-ter/10"
      :style="{
        top: `${6 + (((i + offset) * 13) % 82)}%`,
        left: `${4 + (((i + offset * 2) * 17) % 88)}%`,
      }"
    >
      {{ words[(i + offset) % words.length] }}
    </span>
  </div>
</template>
