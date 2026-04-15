<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import OrbitPlanet from './OrbitPlanet.vue'

gsap.registerPlugin(MotionPathPlugin)

const props = defineProps({
  strokeColor: String,
  strokeOpacity: Number,
  spinSpeed: {
    type: Array,
    default: () => [5, 5, 5, 4, 4, 4],
    validator: (v) => Array.isArray(v) && v.length >= 6 && v.every((n) => typeof n === 'number'),
  },
})

const ORIGIN = [0.5, 0.5]

function orbit(target, path, { duration = 5, offset = 0 } = {}) {
  return gsap.to(target, {
    duration,
    repeat: -1,
    ease: 'none',
    motionPath: {
      path,
      align: path,
      alignOrigin: ORIGIN,
      start: offset,
      end: offset + 1,
    },
  })
}

const planets = [
  {
    id: 'out-1',
    size: 'size-6',
    path: '#large-inner',
    duration: props.spinSpeed[0],
    offset: 0,
    opacity: 0.7,
  },
  {
    id: 'out-2',
    size: 'size-7',
    path: '#large-inner',
    duration: props.spinSpeed[1],
    offset: 0.5,
    opacity: 0.7,
  },
  {
    id: 'out-3',
    size: 'size-9',
    path: '#large-inner',
    duration: props.spinSpeed[2],
    offset: 0.2,
    opacity: 0.7,
  },

  {
    id: 'mid-1',
    size: 'size-6',
    path: '#medium-inner',
    duration: props.spinSpeed[3],
    offset: 0,
    opacity: 0.7,
  },
  {
    id: 'mid-2',
    size: 'size-6',
    path: '#medium-inner',
    duration: props.spinSpeed[4],
    offset: 0.5,
    opacity: 0.7,
  },

  {
    id: 'in-1',
    size: 'size-6',
    path: '#small-inner',
    duration: props.spinSpeed[5],
    offset: 0,
    opacity: 0.7,
  },
]

onMounted(() => {
  planets.forEach((p) => {
    orbit(`#${p.id}`, p.path, {
      duration: p.duration,
      offset: p.offset,
    })
    gsap.fromTo(
      '#coreGlow',
      {
        duration: 2,
        scale: 0.5,
        opacity: 0.3,
        yoyo: true,
        repeat: -1,
        transformOrigin: '50% 50%',
      },
      {
        duration: 2,
        scale: 1.2,
        opacity: 0.5,
        yoyo: true,
        repeat: -1,
        transformOrigin: '50% 50%',
      },
    )
  })
})
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 314 343"
  >
    <g id="projects">
      <g id="core">
        <g
          id="coreGlow"
          filter="url(#filter2_f_1359_1003)"
        >
          <ellipse
            cx="152.9"
            cy="125.3"
            fill="color(display-p3 1 .9216 .3451)"
            fill-opacity=".1"
            rx="21.6"
            ry="21.8"
          />
        </g>
        <ellipse
          id="Ellipse 93"
          cx="152.9"
          cy="125.3"
          fill="color(display-p3 1 .9216 .3451)"
          fill-opacity=".2"
          rx="13.5"
          ry="13.7"
        />
        <ellipse
          id="Ellipse 90"
          cx="152.9"
          cy="125.3"
          fill="color(display-p3 1 .947 .5577)"
          fill-opacity="1"
          rx="11.4"
          ry="11.6"
        />
        <ellipse
          id="Ellipse 91"
          cx="152.9"
          cy="125.3"
          fill="color(display-p3 1 .9216 .3451)"
          fill-opacity="1"
          rx="8.9"
          ry="9"
        />
        <ellipse
          id="Ellipse 92"
          cx="3.2"
          cy="2.1"
          fill="color(display-p3 .9926 .9679 .7863)"
          fill-opacity="1"
          rx="3.2"
          ry="2.1"
          transform="rotate(20.4 -252.4 476)scale(.999975 1)skewY(.4)"
        />
      </g>
      <g
        id="paths"
        fill-opacity="1"
      >
        <path
          id="small-inner"
          fill="none"
          :stroke="strokeColor"
          :stroke-opacity="strokeOpacity"
          d="M167.1 152 c-23.4 14.3-49.5 14.1-58.4-.5 c-8.7-14.8 3.1-38.4 26.5-53 c23.6-14.7 50-14.6 59 .1 c8.6 14.8-3.2 38.4-26.6 53"
        />

        <path
          id="medium-inner"
          fill="none"
          :stroke="strokeColor"
          :stroke-opacity="strokeOpacity"
          d="M183.3 179.8 c-44 27-93 26.7-109.9-.9 c-16.8-27.5 5-72 48.6-99.6 l1-.6 c44.3-27.6 94-27.5 110.9.2 c16.9 27.8-5.3 72.7-49.6 100.3 l-1 .6"
        />
        <path
          id="large-inner"
          fill="none"
          :stroke="strokeColor"
          :stroke-opacity="strokeOpacity"
          d="M209 33.8 c-29-.1-63.2 9.9-95.3 30 a188 188 0 0 0-69.4 72.6 c-13 26.3-14.8 52.6-2.6 72.6 s36.2 30.2 65.4 30.2 c29 .1 63.2-9.9 95.3-30 32.2-20 56.3-46.3 69.4-72.6 c13-26.4 14.8-52.6 2.6-72.6 S238.1 33.8 209 33.8"
        />
      </g>
    </g>
  </svg>

  <OrbitPlanet
    v-for="p in planets"
    :key="p.id"
    :id="p.id"
    :size="p.size"
    :colors="p.colors"
    :opacity="p.opacity"
  />
</template>
<style scoped></style>
