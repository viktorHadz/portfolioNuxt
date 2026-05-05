<script setup>
import gsap from 'gsap'
import HeroMench from '@/components/Hero/HeroMench.vue'
import HeroSpeedLines from '@/components/Hero/HeroSpeedLines.vue'
import TheButton from '@/components/TheButton.vue'
import { portfolioContent } from './portfolioContent'
import Dividers from '../Decor/Dividers.vue'
import HeroIcons from '../Hero/HeroIcons.vue'

const heroRoot = useTemplateRef('heroRoot')
const heroActive = ref(true)

let ctx
let entryTl
let heroTrigger

const heroData = portfolioContent.hero
const { yrsCoded } = useTimeCoded()

function scrollTo(e) {
  const href = e.currentTarget.getAttribute('href')
  if (!href?.startsWith('#')) return

  const target = document.querySelector(href)

  if (target) {
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

function playEntry() {
  const entryTargets = [
    '.hero-portal-svg',
    '.hero-character-svg',
    '.portal-swirl-main',
    '.portal-rotator',
  ]

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(entryTargets, { autoAlpha: 1 })
    return
  }

  entryTl?.kill()

  entryTl = gsap.timeline({
    delay: 0.5,
    defaults: { overwrite: 'auto' },
    onStart: () => {
      gsap.set(entryTargets, { willChange: 'transform, opacity' })
    },
    onComplete: () => {
      gsap.set(entryTargets, { clearProps: 'willChange' })
    },
  })

  entryTl
    .fromTo(
      '.hero-portal-svg',
      { autoAlpha: 0, scale: 0.25, y: 34, rotate: -8, transformOrigin: '50% 50%' },
      { autoAlpha: 1, scale: 1, y: 0, rotate: 0, duration: 0.75, ease: 'back.out(1.8)' },
      0,
    )
    .fromTo(
      ['.portal-swirl-main', '.portal-rotator'],
      { autoAlpha: 0, scale: 0.45, transformOrigin: '50% 50%' },
      { autoAlpha: 1, scale: 1, duration: 0.62, ease: 'power3.out', stagger: 0.08 },
      0.12,
    )
    .fromTo(
      '.hero-character-svg',
      { autoAlpha: 0, y: 90, scale: 0.9, transformOrigin: '58% 72%' },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
      1,
    )
}

function setHeroActive(active) {
  heroActive.value = active
  entryTl?.[active ? 'resume' : 'pause']()
}

onMounted(async () => {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    // gsap.set(heroRoot.value, {
    //   rotation: 0.01,
    //   skewX: 0.1,
    //   transformOrigin: '50% 50%',
    // })
    playEntry()

    heroTrigger = ScrollTrigger.create({
      trigger: heroRoot.value,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: ({ isActive }) => setHeroActive(isActive),
    })

    setHeroActive(heroTrigger.isActive)
  }, heroRoot.value)
})

onUnmounted(() => {
  heroTrigger?.kill()
  ctx?.revert()

  ctx = null
  entryTl = null
  heroTrigger = null
})
</script>

<template>
  <section
    ref="heroRoot"
    class="relative isolate min-h-dvh overflow-hidden bg-bg-prim text-fg-prim"
  >
    <HeroSpeedLines :active="heroActive" />

    <div
      class="absolute inset-0 bg-stars opacity-50"
      aria-hidden="true"
    />

    <div
      class="relative z-10 mx-auto flex min-h-dvh max-w-screen-2xl flex-col items-center justify-center px-6 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-16 lg:px-20 lg:py-24"
    >
      <div class="relative z-20 max-w-4xl text-center">
        <p
          class="flex flex-wrap items-center justify-center gap-3 font-mono text-xs font-bold text-acc-prim uppercase sm:text-sm"
        >
          <Dividers />
          <span>{{ heroData.eyebrow[0] }}</span>
          <Dividers />
          <span>{{ yrsCoded }}+ {{ heroData.eyebrow[1] }}</span>
          <Dividers />
        </p>

        <h1
          class="my-5 text-5xl leading-none font-bold tracking-tight text-fg-prim sm:my-7 sm:text-6xl md:text-7xl xl:text-8xl"
        >
          <span class="block">
            Practical
            <span class="text-grad-top text-shadow-lg/20 text-shadow-acc-prim/50">software</span>
          </span>
          <span class="block">people rely on</span>
        </h1>

        <p
          class="mx-auto max-w-2xl text-sm leading-6 text-fg-sec sm:text-base sm:leading-7 lg:text-lg"
        >
          {{ heroData.subheadline }}
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <TheButton
            variant="primary"
            href="#featured-work"
            class="border-acc-prim text-acc-prim"
            @click="scrollTo"
          >
            View featured work →
          </TheButton>

          <TheButton
            variant="secondary"
            href="#contact"
            class="border-acc-sec text-acc-sec"
            @click="scrollTo"
          >
            Get in touch
          </TheButton>
        </div>
      </div>

      <div class="relative mt-10 flex w-full max-w-7xl justify-center overflow-visible">
        <HeroIcons :active="heroActive" />

        <HeroMench
          :active="heroActive"
          class="relative z-30 w-sm max-w-full -translate-x-12 overflow-visible sm:w-3/5 lg:w-xl xl:w-2xl"
        />
      </div>
    </div>
  </section>
</template>
