<script setup>
import gsap from 'gsap'

const tvIsOn = ref(true)

const screen = '#screen-blackout'
const line = '#scanline'
const orb = '#power-orb'

let tvTl
const speakerSlots = [419.5, 444.9, 470.4, 495.8, 521.3, 546.7, 572.1]

const indicatorDots = [
  { x: 719.9, y: 201.1 },
  { x: 746.6, y: 189.3 },
  { x: 773, y: 201.1 },
]

const lineClosed = { x1: 355.5, x2: 355.5, y1: 414.5, y2: 414.5 }
const lineOpen = { x1: 53.5, x2: 657.5, y1: 414.5, y2: 414.5 }

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function resetFx() {
  gsap.set(screen, { autoAlpha: 0, scaleY: 1, transformOrigin: '50% 50%' })
  gsap.set(line, {
    autoAlpha: 0,
    scaleY: 1,
    strokeWidth: 5,
    transformOrigin: '50% 50%',
    attr: lineClosed,
  })

  gsap.set(orb, { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%' })
}

function playOn(contentEl) {
  tvTl?.kill()
  resetFx()

  if (contentEl) {
    gsap.set(contentEl, { autoAlpha: 0 })
  }

  tvTl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  tvTl
    .to(screen, { autoAlpha: 1, scaleY: 0, duration: 0.45, ease: 'expo.out' }, 0)
    .to(screen, { autoAlpha: 0, duration: 0.25, ease: 'sine.out' }, 0.42)
    .to(line, { autoAlpha: 1, attr: lineOpen, duration: 0.28, ease: 'power3.out' }, 0.12)
    .to(orb, { autoAlpha: 1, scale: 1, duration: 0.32, ease: 'expo.out' }, 0.18)
    .to(orb, { autoAlpha: 0, duration: 0.18, ease: 'sine.out' }, 0.42)
    .to(line, { scaleY: 50, duration: 0.38, ease: 'expo.inOut' }, 0.4)
    .to(line, { autoAlpha: 0, duration: 0.2, ease: 'sine.out' }, 0.7)

  if (contentEl) {
    tvTl.to(contentEl, { autoAlpha: 1, duration: 0.45, ease: 'sine.out' })
  }

  return tvTl
}

function playOff(contentEl) {
  tvTl?.kill()
  resetFx()

  gsap.set(screen, { autoAlpha: 1, scaleY: 0, transformOrigin: '50% 50%' })

  tvTl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  tvTl.set([line, orb], { autoAlpha: 0 }, 0)

  if (contentEl) {
    tvTl.to(contentEl, { autoAlpha: 0, duration: 0.15, ease: 'sine.out' }, 0)
  }

  tvTl.to(screen, { scaleY: 1, autoAlpha: 1, duration: 0.5, ease: 'expo.out' }, 0.08)

  return tvTl
}

function changeChannel(contentEl, onSwap) {
  if (typeof onSwap !== 'function') return

  if (!contentEl || !tvIsOn.value || prefersReducedMotion()) {
    onSwap()
    return
  }

  tvTl?.kill()
  resetFx()
  gsap.set(screen, { autoAlpha: 1, scaleY: 0, transformOrigin: '50% 50%' })

  tvTl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  tvTl
    .to(contentEl, { autoAlpha: 0, duration: 0.01, ease: 'sine.out' })
    .to(screen, { scaleY: 1, duration: 0.2, ease: 'expo.out' })
    .to(line, { autoAlpha: 1, attr: lineOpen, duration: 0.2, ease: 'power3.out' }, '=')
    .call(onSwap, undefined, 0.12)
    .to(screen, { scaleY: 0, duration: 0.1, ease: 'expo.in' })
    .to(line, { autoAlpha: 0, duration: 0.1, ease: 'sine.out' })
    .to(contentEl, { autoAlpha: 1, duration: 0.15, ease: 'sine.out' })

  return tvTl
}

function flipTvPower(payload = !tvIsOn.value, contentEl) {
  if (typeof payload !== 'boolean') return

  tvIsOn.value = payload

  if (payload) playOn(contentEl)
  else playOff(contentEl)
}

defineExpose({ changeChannel, flipTvPower })

onMounted(() => {
  resetFx()
})

onUnmounted(() => {
  tvTl?.kill()
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 798 800">
    <defs>
      <symbol id="speaker-slot" overflow="visible">
        <rect x="713.6" y="3.6" width="62.2" height="6" rx="3" fill="#51535d" />
        <rect x="713.6" width="62.2" height="7.2" rx="3.6" fill="#040406" />
        <rect x="713.6" y="2.4" width="62.2" height="4.8" rx="2.4" fill="#0f1014" />
      </symbol>

      <symbol id="dial-base" overflow="visible">
        <circle r="29.4" fill="#0a0b10" />
        <circle r="26.9" fill="#afd84b" />
        <circle r="24.4" fill="#0a0b10" />
        <circle r="21.8" fill="#404044" />
        <ellipse cy="1.3" rx="21.8" ry="20.6" fill="#262629" />
      </symbol>
    </defs>

    <!-- shadow -->
    <path
      fill="#131316"
      d="M396.8 799.9c210.6 0 381.4-12.4 381.4-27.7s-170.8-27.7-381.4-27.7C186 744.5 15.3 757 15.3 772.2s170.8 27.7 381.5 27.7"
    />

    <!-- feet -->
    <path
      fill="#191a20"
      d="M723.7 715.5h-69.2l1 2 26 49.6a9 9 0 0 0 7.8 5.1h26.5c5 0 9-4.6 9-10.2v-46.5z"
    />
    <path
      stroke="#08070a"
      stroke-width="2.5"
      d="M695.2 772.2h-6a9 9 0 0 1-7.8-5l-25.8-49.7-1-2h70.3V762c0 5.6-4.1 10.2-9.1 10.2zm-18.7-56.7 18.7 56.7"
    />

    <path
      fill="#191a20"
      d="M68 715.5h69.2l-1.1 2-25.8 49.6a9 9 0 0 1-7.9 5.1H75.9c-5 0-9-4.6-9-10.2v-46.5z"
    />
    <path
      stroke="#08070a"
      stroke-width="2.5"
      d="M96.5 772.2h5.9a9 9 0 0 0 7.9-5l25.8-49.7 1-2H66.8V762c0 5.6 4 10.2 9.1 10.2zm18.7-56.7-18.7 56.7"
    />

    <!-- antennas -->
    <path
      fill="#afd84b"
      stroke="#08070a"
      stroke-width="2"
      d="M292 3.4a8 8 0 0 1 8.5 7.6 8 8 0 0 1-7.4 8.6 8 8 0 0 1-8.5-7.6 8 8 0 0 1 7.4-8.6Z"
    />
    <path
      fill="#27272b"
      stroke="#08070a"
      stroke-width="2.5"
      d="m293.6 13.7.8-.7a5 5 0 0 1 6.9.8l57.4 71.7-10.7 9.3-55.3-74.1a5 5 0 0 1 1-7Z"
    />
    <path
      fill="#cde68e"
      d="M291.7 5a3 3 0 0 1 3.3 3 3 3 0 0 1-2.9 3.3 3 3 0 0 1-3.3-3 3 3 0 0 1 3-3.3"
    />

    <path
      fill="#afd84b"
      stroke="#08070a"
      stroke-width="2"
      d="M505.2 1c-4.9-.5-9.2 3.2-9.8 8.4-.5 5.1 3 9.7 7.8 10.3 4.9.5 9.2-3.2 9.8-8.3.5-5.2-3-9.8-7.8-10.3Z"
    />
    <path
      fill="#cde68e"
      d="M505.6 3.4c1.6 0 3 1.4 3 3.1s-1.3 3.3-3 3.3-3-1.3-3-3.1 1.3-3.2 3-3.3"
    />
    <path
      fill="#27272b"
      stroke="#08070a"
      stroke-width="2"
      d="m502.3 13.3-.7-.6c-2-1.8-5-1.6-6.7.5l-58 69.4 9.8 9.8 56.2-72a5.3 5.3 0 0 0-.6-7Z"
    />

    <!-- top cap -->
    <path
      fill="#27272b"
      stroke="#08070a"
      stroke-width="2"
      d="M396 70a113 113 0 0 1 81.6 34.6 71 71 0 0 1 13.8 20v.4l.1.1-1 .4 1-.4.5 1.4H301.4l.2-1.2 1 .2-1-.2v-.2l.5-1.6 1.8-4.5a55 55 0 0 1 10.4-14.4A115 115 0 0 1 396 70Z"
    />
    <path
      fill="#494a4f"
      d="M490.6 125.5s-3.1-9.3-13.7-20.2a114 114 0 0 0-81-34.3 112 112 0 0 0-80.9 34.3c-10.6 10.9-12.4 20.2-12.4 20.2S331 73.8 396 73.8c62 0 94.7 51.7 94.7 51.7"
    />

    <!-- TV body: removed covered duplicate rects -->
    <rect width="798" height="596" y="122.5" fill="#afd84b" rx="82" />
    <rect width="792" height="590" x="3" y="125.5" fill="#232427" rx="82" />
    <rect width="786" height="583.9" x="6" y="128.5" fill="#08070a" rx="82" />
    <rect width="779.8" height="578" x="9.1" y="131.5" fill="#27272b" rx="82" />

    <!-- power button -->
    <path
      fill="#afd84b"
      stroke="#0a0b10"
      stroke-width="2.2"
      d="M754.3 638.5h-19.1a11.4 11.4 0 1 0 0 22.9h19c6.4 0 11.5-5.2 11.5-11.5s-5-11.4-11.4-11.4Z"
    />
    <path
      fill="#8db234"
      d="M724.9 650.4c3 6.7 37 6.4 39.6 0a10 10 0 0 1-10 10h-19.4c-5.5 0-10-4.5-10.2-10"
    />
    <path
      fill="#cde68e"
      d="M734.3 648.7c3.6 0 6.5-1.5 6.5-3.5s-2.9-3.5-6.5-3.5c-3.5 0-6.4 1.6-6.4 3.5 0 2 2.9 3.5 6.4 3.5"
    />

    <!-- indicator dots -->
    <circle
      v-for="dot in indicatorDots"
      :key="`${dot.x}-${dot.y}`"
      :cx="dot.x"
      :cy="dot.y"
      r="2.2"
      fill="#afd84b"
    />

    <!-- top dial -->
    <g transform="translate(746.4 223.5)">
      <use href="#dial-base" />
      <line
        x1="0"
        y1="0"
        x2="19.8"
        y2="-14.3"
        stroke="#afd84b"
        stroke-width="3.4"
        stroke-linecap="round"
      />
    </g>

    <!-- lower dial -->
    <g transform="translate(746.7 319.35)">
      <use href="#dial-base" />
    </g>
    <path
      stroke="#afd84b"
      stroke-linecap="round"
      stroke-width="2.9"
      d="M747 285.1v1.6m.6 66.9v-1.7m-34.3-33h1.7m64.8-1.4h-1.6"
    />
    <rect x="745" y="294" width="3.5" height="25" fill="#afd84b" />

    <!-- speaker slots -->
    <use v-for="y in speakerSlots" :key="y" href="#speaker-slot" :transform="`translate(0 ${y})`" />

    <!-- divider -->
    <path
      fill="#0a0b10"
      d="M700.5 152.3h-1.1a39623 39623 0 0 0 0 533.5h1a47568 47568 0 0 0 1-266.8 38581 38581 0 0 0-1-266.7"
    />

    <!-- screen frame -->
    <rect width="647.8" height="533.5" x="29.7" y="153.3" fill="#494a4f" rx="52" />
    <rect width="632.8" height="521.2" x="37.2" y="159.5" fill="#15171c" rx="52" />

    <!-- right inner panel -->
    <path
      fill="#0d0e11"
      d="M442.1 210.6a52 52 0 0 1 52-51.1H618a52 52 0 0 1 52 52v387a52 52 0 0 1-52 52H487.5a52 52 0 0 1-52-52.9z"
    />

    <!-- bottom-left cutout -->
    <path
      fill="#1a1d23"
      d="M37.2 577.4c0-5 4-9 9-9h71.2a50 50 0 0 1 50 50v12.2a50 50 0 0 1-50 50H89.2a52 52 0 0 1-52-52z"
    />

    <!-- screen -->
    <rect width="610.6" height="490.6" x="49.8" y="170.7" fill="#15171c" rx="52" />
    <g id="turn-on-fx">
      <rect
        id="screen-blackout"
        x="51"
        y="170"
        width="609"
        height="489"
        rx="52"
        fill="var(--bg-primary)"
      />

      <line
        id="scanline"
        x1="51"
        y1="170"
        x2="51"
        y2="170"
        stroke="var(--acc-primary)"
        stroke-width="5"
        stroke-linecap="round"
      />
      <circle id="power-orb" cx="355.5" cy="414.5" r="72" fill="var(--acc-primary)" />
    </g>
    <rect
      width="610.6"
      height="490.6"
      x="49.8"
      y="170.7"
      stroke="#0e0f11"
      stroke-width="2"
      rx="52"
    />

    <!-- subtle top-left highlight -->
    <path
      opacity=".7"
      fill="#494a4f"
      d="M70.2 135.1c13.8-4 39.3-2.2 39.3-2.2s-26.4 1.6-39.3 6.7c-12.7 5.1-20.5 8-30.4 17.6a92 92 0 0 0-27.2 51.5c-1 7.8-1 6.6-1 6.6s-.9-14 1-22.6a70 70 0 0 1 22.2-38.3c11.5-11.2 18.8-14.5 35.4-19.3"
    />
  </svg>
</template>
