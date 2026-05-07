<script setup>
defineProps({
  ringRotate: {
    type: Number,
    default: 0,
  },
  ringWidth: {
    type: Number,
    default: 4,
  },
})

const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
const ringId = `ring-${uid}`
const shineId = `shine-${uid}`
</script>

<template>
  <svg viewBox="0 0 138 138" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle
      cx="69"
      cy="69"
      :r="56 - ringWidth / 2"
      fill="var(--bg-primary)"
      :stroke="`url(#${ringId})`"
      :stroke-width="ringWidth"
    />

    <circle
      cx="69"
      cy="69"
      :r="47 - ringWidth / 2"
      :stroke="`url(#${shineId})`"
      :stroke-width="ringWidth"
      opacity="0.8"
    />

    <slot />

    <defs>
      <radialGradient
        :id="ringId"
        cx="110"
        cy="110"
        r="120"
        gradientUnits="userSpaceOnUse"
        :gradientTransform="`rotate(${ringRotate} 69 69)`"
      >
        <stop stop-color="var(--acc-primary)" />
        <stop offset="0.55" stop-color="var(--tv-body-soft)" />
        <stop offset="0.75" stop-color="var(--bg-tertiary)" />
        <stop offset="1" stop-color="var(--bg-secondary)" />
      </radialGradient>

      <linearGradient
        :id="shineId"
        x1="34"
        y1="20"
        x2="112"
        y2="118"
        gradientUnits="userSpaceOnUse"
        :gradientTransform="`rotate(${ringRotate} 69 69)`"
      >
        <stop stop-color="#303030" />
        <stop offset="0.25" stop-color="#303030" stop-opacity="0" />
        <stop offset="0.5" stop-color="#303030" stop-opacity="0" />
        <stop offset="0.75" stop-color="#303030" />
        <stop offset="1" stop-color="#303030" />
      </linearGradient>
    </defs>
  </svg>
</template>
