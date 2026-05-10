<script setup>
defineProps({
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  slotX: {
    type: Number,
    default: 0,
  },
  slotY: {
    type: Number,
    default: 0,
  },
  scale: {
    type: Number,
    default: 1,
  },
})
</script>

<template>
  <g :transform="`translate(${x} ${y}) scale(${scale})`">
    <circle r="42" fill="var(--bg-primary)" stroke="var(--acc-primary)" stroke-opacity=".5" />
    <circle r="36" fill="var(--bg-tertiary)" stroke="var(--bg-primary)" stroke-width="2" />
  </g>
  <g :transform="`translate(${slotX} ${slotY})`">
    <slot />
  </g>
</template>
