<script setup lang="ts">
import { computed, useId } from 'vue'

type PlanetColors = {
  gradientFrom: string
  gradientTo: string
  stroke: string
  detailFill: string
  detailStroke: string
}

const props = withDefaults(
  defineProps<{
    id?: string
    size?: string
    colors?: Partial<PlanetColors>
    opacity?: number
  }>(),
  {
    id: undefined,
    size: 'size-4',
    opacity: 1,
  },
)

const uid = useId()

const gradientId = computed(() => (props.id ? `${props.id}-gradient` : `planet-gradient-${uid}`))

const palette = computed<PlanetColors>(() => ({
  gradientFrom: props.colors?.gradientFrom ?? 'color(display-p3 .6392 .851 .1255)',
  gradientTo: props.colors?.gradientTo ?? 'color(display-p3 .3388 .451 .0665)',
  stroke: props.colors?.stroke ?? 'color(display-p3 .4231 .5365 .1464)',
  detailFill: props.colors?.detailFill ?? 'color(display-p3 .4203 .5164 .1858)',
  detailStroke: props.colors?.detailStroke ?? 'color(display-p3 .1725 .1725 .1725)',
}))
</script>

<template>
  <div
    :id="id"
    :class="size"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 12"
      :opacity="opacity"
    >
      <circle
        cx="4.3"
        cy="4.3"
        r="4.3"
        :fill="`url(#${gradientId})`"
        :stroke="palette.stroke"
        stroke-opacity="1"
        stroke-width=".3"
        transform="rotate(119.7 4.5 5.5)scale(1 .999956)skewX(-.5)"
      />

      <path
        :fill="palette.detailFill"
        fill-opacity=".5"
        d="M4.2 5.8q0 1.2-.1.5-.2-.3-.3 0c-.1.3-.9.6-1 .4-.3 0-.6-1.1-.5-1.3.6-1 1.8-.8 1.9.4m2.5-2.6q-.1.7-.8.6c-.5-.2-.5-1 0-1.1q.6 0 .8.5M4.4 7.6q.2.8 0 .3l-.2-.4q0-.3.2.1m2.3-.3q.1.5-.4.7-1 .1-.5-1c.3-.4.9-.2 1 .3m2.5-1.9c-.3 1.2-1.7 1.2-1.8 0-.1-1 1-1.4 1.6-.6z"
      />

      <path
        :stroke="palette.detailStroke"
        stroke-opacity=".6"
        stroke-width=".1"
        d="M4.1 6.3v-.1L4 6h-.1l-.1.2-.2.1-.6.3h-.2l-.2-.2-.2-1v-.1q.5-.7 1-.6.6.2.7 1zm2.6-3q-.1.6-.8.4l-.3-.5q0-.4.3-.4h.5q.3.2.3.4ZM4.4 7.8v-.4zm2.3-.2h-.2l-.2.2q-.5.1-.6-.1l.1-.7q.3-.3.5-.2t.4.4zm2.5-2.3q-.2.8-.9.8t-.7-.8.4-1q.5-.1 1 .4l.2.4z"
      />

      <defs>
        <linearGradient
          :id="gradientId"
          x1="8.6"
          x2="0"
          y1="4.3"
          y2="4.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop :stop-color="palette.gradientFrom" />
          <stop
            offset="1"
            :stop-color="palette.gradientTo"
          />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
