<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from '#imports'
import gsap from 'gsap'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

const FULL_SCREEN = 'M0 0H477V458H0Z'

const router = useRouter()
const root = ref(null)
const shape = ref(null)
const target = ref(null)

let timeline
let stopBefore
let stopAfter
let portalShape = ''

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function cover() {
  timeline?.kill()
  gsap.killTweensOf([root.value, shape.value])
  gsap.set(root.value, { autoAlpha: 1, display: 'block' })
  shape.value?.removeAttribute('transform')
  gsap.set(shape.value, { clearProps: 'transform' })
  gsap.set(shape.value, {
    attr: { d: FULL_SCREEN },
    autoAlpha: 1,
    rotation: 0,
    scale: 1,
    x: 0,
    y: 0,
    transformOrigin: '50% 50%',
    svgOrigin: '238.5 229',
  })
}

function reveal() {
  cover()

  if (prefersReducedMotion()) {
    timeline = gsap.to(root.value, {
      autoAlpha: 0,
      duration: 0.18,
      ease: 'power1.out',
      onComplete: () => gsap.set(root.value, { display: 'none' }),
    })
    return
  }

  timeline = gsap
    .timeline({ onComplete: () => gsap.set(root.value, { display: 'none' }) })
    .to(shape.value, {
      morphSVG: portalShape || target.value,
      scale: 0.72,
      duration: 0.48,
      ease: 'power3.inOut',
      transformOrigin: '50% 50%',
      svgOrigin: '238.5 229',
    })
    .to(
      shape.value,
      {
        autoAlpha: 0,
        rotation: 180,
        scale: 0.08,
        duration: 0.34,
        ease: 'power3.in',
        transformOrigin: '50% 50%',
        svgOrigin: '238.5 229',
      },
      '>-0.04',
    )
}

onMounted(() => {
  portalShape = target.value?.getAttribute('d') ?? ''

  reveal()

  stopBefore = router.beforeEach(cover)

  stopAfter = router.afterEach(reveal)
})

onBeforeUnmount(() => {
  timeline?.kill()
  stopBefore?.()
  stopAfter?.()
})
</script>

<template>
  <div
    ref="root"
    class="page-transition-morph pointer-events-none fixed inset-0 z-100"
    aria-hidden="true"
  >
    <svg
      class="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 477 458"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient
          id="page-transition-glow"
          cx="58%"
          cy="48%"
          r="72%"
        >
          <stop
            offset="0"
            stop-color="#3fa22a"
          />
          <stop
            offset="0.18"
            stop-color="#19753a"
          />
          <stop
            offset="0.44"
            stop-color="#04483f"
          />
          <stop
            offset="0.72"
            stop-color="#03271a"
          />
          <stop
            offset="1"
            stop-color="#020807"
          />
        </radialGradient>
        <radialGradient
          id="page-transition-pocket"
          cx="28%"
          cy="22%"
          r="58%"
        >
          <stop
            offset="0"
            stop-color="#2585a6"
            stop-opacity="0.34"
          />
          <stop
            offset="0.34"
            stop-color="#1a7846"
            stop-opacity="0.2"
          />
          <stop
            offset="1"
            stop-color="#020807"
            stop-opacity="0"
          />
        </radialGradient>
        <pattern
          id="page-transition-stars"
          width="477"
          height="458"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="477"
            height="458"
            fill="url(#page-transition-glow)"
          />
          <rect
            width="477"
            height="458"
            fill="url(#page-transition-pocket)"
          />
          <circle
            cx="28"
            cy="39"
            r="0.8"
            fill="#eaff9c"
            opacity="0.82"
          />
          <circle
            cx="61"
            cy="314"
            r="0.55"
            fill="#ffffff"
            opacity="0.68"
          />
          <circle
            cx="92"
            cy="124"
            r="0.7"
            fill="#54d9ff"
            opacity="0.66"
          />
          <circle
            cx="128"
            cy="404"
            r="0.5"
            fill="#d7ff57"
            opacity="0.72"
          />
          <circle
            cx="174"
            cy="74"
            r="0.65"
            fill="#ffffff"
            opacity="0.56"
          />
          <circle
            cx="216"
            cy="244"
            r="0.85"
            fill="#eaff9c"
            opacity="0.8"
          />
          <circle
            cx="257"
            cy="36"
            r="0.45"
            fill="#54d9ff"
            opacity="0.7"
          />
          <circle
            cx="304"
            cy="352"
            r="0.7"
            fill="#ffffff"
            opacity="0.62"
          />
          <circle
            cx="348"
            cy="169"
            r="0.55"
            fill="#d7ff57"
            opacity="0.68"
          />
          <circle
            cx="404"
            cy="91"
            r="0.9"
            fill="#54d9ff"
            opacity="0.72"
          />
          <circle
            cx="439"
            cy="392"
            r="0.6"
            fill="#eaff9c"
            opacity="0.74"
          />
          <path
            d="M76 274h4M78 272v4M368 62h5M370.5 59.5v5M424 245h4M426 243v4"
            stroke="#d7ff57"
            stroke-width="0.7"
            stroke-linecap="round"
            opacity="0.48"
          />
          <path
            d="M42 356C132 301 198 386 292 302 348 252 389 270 454 224"
            fill="none"
            stroke="#54d9ff"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-dasharray="7 18"
            opacity="0.18"
          />
          <path
            d="M14 122C98 79 182 153 252 95 310 47 384 74 462 42"
            fill="none"
            stroke="#d7ff57"
            stroke-width="1"
            stroke-linecap="round"
            stroke-dasharray="5 16"
            opacity="0.16"
          />
        </pattern>
      </defs>
      <path
        ref="shape"
        fill="url(#page-transition-stars)"
        :d="FULL_SCREEN"
      />
      <path
        id="centralshape"
        ref="target"
        class="opacity-0"
        fill="none"
        d="M113 265.6c0-.4-2-3.6-4.4-7.2-14.8-22-25.6-48.8-25.6-75.6 0-11.7 1.1-24 3.6-35.4 4.3-20.2 14-40.3 25.5-57.3a194 194 0 0 1 81.4-66.4c13.3-5.7 27.8-9.6 42-11.9 2.9-.4 34.5-5.5 34.5 3.5 0 .6-1.5 2.5-3.3 4.4-6 6.1-16 8.6-23.7 11.6s-84 39.8-69.5 53.5c7.2 6.9 19.1-6.6 24.5-9.7a203 203 0 0 1 134-23.3A218 218 0 0 1 436.8 101c8 6.9 18 14.4 22.8 24l2.6 5.5-2 4.6c-2.8.6-6.2 1.6-8.9.7-1-.4-12-6.5-24.6-13.7-17-9.7-34.4-18.7-53.3-24.2-11.8-3.4-24-5.5-36-7.8H315a257 257 0 0 0-27.5 1s-16.5 2.2-16 9.4c.5 8 7.5.6 20.5 1l23.5.6a205 205 0 0 1 47.6 15.3 166 166 0 0 1 65.8 62.5c10.3 16.9 18.4 36 22 55.5 6 32.8 3 83-26.7 105.5-29.5 22.6-14.2 3.7-14.2-.3a65 65 0 0 1 3-8.9c1.7-4.2 4-11.3 5-15.7 2.4-10.2 3-20.7 4-31.1-1.3-12.3-2.1-25-5.5-37a129 129 0 0 0-43-63.8s-2.2-2.3-4-3c-3-1.3-6.6-.4-8.9 2.4-3.3 4 1.6 6.1 4.8 12.7a135 135 0 0 1 15.1 69.7A161 161 0 0 1 329.7 366c-23.5 22-53 36.9-84 44.8A140 140 0 0 1 206 414c-8.9-.3-19.9 0-27.8-4.9l-3.2-2v-2.4c0-8.7 28.5-10.3 34.5-12.2q15.7-5 30.4-12.2c23.8-12 47.3-30.2 61.3-53.2 2-3.4 3.7-6.6 3.7-7.2s0-9.5-2.4-14.8c-9.3-20-31.5 23.2-48 30a169 169 0 0 1-64.3 13.2 166 166 0 0 1-131.2-67 148 148 0 0 1-24.2-69.1c-1.6-14.7-.4-29.7 0-44.4l2.1-9.6c6.9-32.5 22.6-76.8 54.8-93.3a15 15 0 0 1 5.2-1.6c2.5 0 4.3 2.3 6 3.9l-1 3.1c-2 7.2-10 13.8-14.9 19a123 123 0 0 0-25.2 43c-5.5 15.5-6.1 33-4.7 49.2 2 20.7 9.3 41.8 21 59 2 3 25.4 31.6 29.7 27.3.8-.8-1.8-2.2-2.3-2.5l3-2c.4.4 4.5 3 4.5 2.3"
      />
    </svg>
  </div>
</template>

<style scoped>
.page-transition-morph {
  height: 100vh;
  height: 100dvh;
  width: 100vw;
}
</style>
