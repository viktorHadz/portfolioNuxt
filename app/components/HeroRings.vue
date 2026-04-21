<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

function orbit(target, path, { duration = 6, offset = 0 } = {}) {
  return gsap.to(target, {
    duration,
    repeat: -1,
    ease: 'none',
    motionPath: {
      path,
      align: path,
      alignOrigin: [0.5, 0.5],
      start: offset,
      end: offset + 1,
    },
  })
}

const hsla = (h, s, l, a) => `hsla(${h}, ${s}%, ${l}%, ${a})`

const ringPaths = {
  outer: 'M666.1.5a492 492 0 1 1 0 984 492 492 0 0 1 0-984Z',
  mid: 'M666.5 84.5a408 408 0 1 1 0 816 408 408 0 0 1 0-816Z',
  inner: 'M666.6 204.5a287.5 287.5 0 1 1 0 575 287.5 287.5 0 0 1 0-575Z',
  diagonal:
    'M1188 230.5c53.9-5 94.4-1.7 118.5 10a42 42 0 0 1 23.1 22.7 47 47 0 0 1-2 33.4c-9.7 25.8-36.2 58.2-79 95.7-85.6 74.8-229.2 163.2-399 245.8-170 82.5-352.3 152.4-506.9 194.2-77.3 21-144.4 34-198.3 38.9-54 5-94.5 1.6-118.6-10a42 42 0 0 1-23.1-22.7 47 47 0 0 1 2-33.4c9.7-25.9 36.2-58.2 79-95.7 85.6-74.8 229.2-163.2 399-245.8 170-82.5 352.3-152.4 506.9-194.3 77.2-20.9 144.4-34 198.3-38.8Z',
}

const rings = [
  {
    id: 'outer',
    d: ringPaths.outer,
    color: { h: 210, s: 100, l: 65 },
    gradient: { x1: 666, y1: 980, x2: 666, y2: 0 },
    lineStops: [
      [0, 0.6],
      [20, 0.5],
      [60, 0.6],
      [75, 0],
      [100, 0.6],
    ],
    glowStops: [
      [0, 0.8],
      [20, 0.3],
      [60, 0.3],
      [75, 0],
      [100, 0.3],
    ],
    lineWidth: 1,
    glowWidth: 3,
    orb: {
      id: 'orb-outer',
      path: '#path-outer',
      duration: 12,
      offset: 0.4,
      glowFill: hsla(210, 100, 65, 0.9),
      coreFill: '#fff',
    },
  },
  {
    id: 'mid',
    d: ringPaths.mid,
    color: { h: 53, s: 100, l: 67 },
    gradient: { x1: 666, y1: 900, x2: 666, y2: 84 },
    lineStops: [
      [0, 0.8],
      [25, 0],
      [50, 0.8],
    ],
    glowStops: [
      [0, 0.35],
      [25, 0],
      [50, 0.35],
    ],
    lineWidth: 1,
    glowWidth: 3,
    orb: {
      id: 'orb-mid',
      path: '#path-mid',
      duration: 10,
      offset: 0.2,
      glowFill: hsla(53, 100, 67, 0.9),
      coreFill: '#fff',
    },
  },
  {
    id: 'inner',
    d: ringPaths.inner,
    color: { h: 77, s: 64, l: 57 },
    gradient: { x1: 666, y1: 780, x2: 666, y2: 204 },
    lineStops: [
      [0, 0.5],
      [50, 0],
      [80, 0.5],
    ],
    glowStops: [
      [0, 0.8],
      [50, 0],
      [80, 0.8],
    ],
    lineWidth: 1.3,
    glowWidth: 2,
    orb: {
      id: 'orb-inner',
      path: '#path-inner',
      duration: 8,
      offset: 0,
      glowFill: hsla(77, 64, 57, 0.95),
      coreFill: 'hsla(70, 100%, 92%, 1)',
    },
  },
  {
    id: 'diagonal',
    d: ringPaths.diagonal,
    color: { h: 77, s: 64, l: 57 },
    gradient: { x1: 0, y1: 860, x2: 1330, y2: 230 },
    lineStops: [
      [0, 1],
      [18, 0],
      [20, 0],
      [21, 1],
      [23, 0],
      [25, 0],
      [26, 1],
      [27, 0],
      [80, 0],
      [91, 1],
    ],
    glowStops: [[0, 0]],
    lineWidth: 1,
    glowWidth: 2,
    orb: {
      id: 'orb-diagonal',
      path: '#path-diagonal',
      duration: 6,
      offset: 0.1,
      glowFill: hsla(77, 64, 57, 0.95),
      coreFill: 'hsla(70, 100%, 92%, 1)',
    },
  },
]

onMounted(() => {
  rings.forEach((ring) => {
    orbit(`#${ring.orb.id}`, ring.orb.path, ring.orb)
  })
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1600 1200"
    fill="none"
    class="orbit-svg"
  >
    <defs>
      <filter
        id="ring-blur"
        x="-40%"
        y="-40%"
        width="180%"
        height="180%"
      >
        <feGaussianBlur stdDeviation="3.5" />
      </filter>

      <filter
        id="orb-blur"
        x="-400%"
        y="-400%"
        width="800%"
        height="800%"
      >
        <feGaussianBlur stdDeviation="6" />
      </filter>

      <template
        v-for="ring in rings"
        :key="`defs-${ring.id}`"
      >
        <template v-if="ring.gradient">
          <linearGradient
            v-for="kind in ['line', 'glow']"
            :id="`${kind}-${ring.id}`"
            :key="`${kind}-${ring.id}`"
            gradientUnits="userSpaceOnUse"
            :x1="ring.gradient.x1"
            :y1="ring.gradient.y1"
            :x2="ring.gradient.x2"
            :y2="ring.gradient.y2"
          >
            <stop
              v-for="[offset, alpha] in ring[`${kind}Stops`]"
              :key="`${kind}-${ring.id}-${offset}`"
              :offset="`${offset}%`"
              :stop-color="hsla(ring.color.h, ring.color.s, ring.color.l, alpha)"
            />
          </linearGradient>
        </template>

        <path
          :id="`path-${ring.id}`"
          :d="ring.d"
          fill="none"
          stroke="transparent"
          stroke-width="1"
        />
      </template>
    </defs>

    <g
      v-for="ring in rings"
      :id="`ring-${ring.id}`"
      :key="ring.id"
    >
      <path
        v-for="kind in ['glow', 'line']"
        :key="kind"
        :d="ring.d"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        :stroke="ring.gradient ? `url(#${kind}-${ring.id})` : ring[`${kind}Color`]"
        :stroke-width="ring[`${kind}Width`]"
        :filter="kind === 'glow' ? 'url(#ring-blur)' : null"
      />
    </g>

    <g
      v-for="ring in rings"
      :id="ring.orb.id"
      :key="ring.orb.id"
    >
      <circle
        :fill="ring.orb.glowFill"
        r="13"
        filter="url(#orb-blur)"
      />
      <circle
        :fill="ring.orb.coreFill"
        r="4.5"
      />
    </g>
  </svg>
</template>

<style scoped>
.orbit-svg {
  width: 100%;
  height: auto;
  overflow: visible;
  display: block;
}
</style>
