<script setup>
import gsap from 'gsap'
import { homeContent } from '~/data/portfolio/home'
import Character from './hero/Character.vue'
import IconCloud from './hero/IconCloud.vue'
import BinaryPattern from '../background/BinaryPattern.vue'

const heroRoot = useTemplateRef('heroRoot')
const iconCloud = useTemplateRef('iconCloud')
const heroActive = ref(true)
const portalPulse = ref(false)

let ctx
let entryTl
let heroTrigger

const heroData = homeContent.hero
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
  const entryTargets = ['.hero-portal-svg', '.hero-character-body']

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    portalPulse.value = false
    gsap.set(entryTargets, { opacity: 1 })
    iconCloud.value?.playEntry()
    return
  }

  entryTl?.kill()
  portalPulse.value = false
  gsap.set('.hero-portal-svg', { opacity: 0, scale: 0.2, rotate: -45, transformOrigin: '50% 50%' })
  gsap.set('.hero-character-body', { opacity: 0, y: 90, transformOrigin: '58% 72%' })

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
    .to('.hero-portal-svg', { opacity: 1, scale: 1, rotation: 0, duration: 0.75, ease: 'back' }, 0)
    .to('.hero-character-body', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.72)
    .call(() => (portalPulse.value = true))
    .call(() => iconCloud.value?.playEntry(), undefined, '>-0.05')
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
    <SpeedLines :active="heroActive" />

    <div class="absolute inset-0 bg-stars opacity-50" aria-hidden="true" />

    <div
      class="relative z-10 mx-auto flex min-h-dvh max-w-screen-2xl flex-col items-center justify-center px-6 pt-36 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:px-20 lg:pt-24 lg:pb-32"
    >
      <div class="relative z-20 max-w-4xl text-center">
        <p
          class="flex flex-wrap items-center justify-center gap-3 font-mono text-xs font-bold text-acc-prim uppercase sm:text-sm"
        >
          <DividerMarks />
          <span>Viktor Hadzhiyski</span>
          <DividerMarks />
          <span>{{ yrsCoded }}+ {{ heroData.eyebrow[1] }}</span>
          <DividerMarks class="hidden md:block" />
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

      <BinaryPattern seed="skills-section" :count="30" />
      <div class="relative mt-10 flex w-full max-w-7xl justify-center overflow-visible">
        <IconCloud ref="iconCloud" :active="heroActive" />

        <Character
          :active="heroActive"
          :portal-pulse="portalPulse"
          class="relative z-30 w-sm max-w-full -translate-x-12 overflow-visible sm:w-3/5 lg:w-xl xl:w-2xl"
        />
      </div>
    </div>
    <SectionDivider position="bottom" colour="text-bg-sec" />
  </section>
</template>
