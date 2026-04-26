<script setup>
import HeroMench from '@/components/Hero/HeroMench.vue'
import HeroSpeedLines from '@/components/Hero/HeroSpeedLines.vue'
import TheButton from '@/components/TheButton.vue'
import { portfolioContent } from './portfolioContent'
import Dividers from '../Decor/Dividers.vue'

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
</script>

<template>
  <section
    class="relative isolate flex min-h-screen flex-col overflow-hidden bg-bg-prim pt-20 text-fg-prim lg:pt-24"
  >
    <HeroSpeedLines />
    <div
      class="absolute inset-0 bg-stars opacity-50"
      aria-hidden="true"
    />
    <div
      class="relative flex w-full flex-1 flex-col justify-center overflow-hidden px-6 pb-10 sm:px-8 lg:flex-row lg:items-center lg:px-20 lg:pb-0"
    >
      <div class="relative z-20 flex max-w-2xl flex-col py-14 sm:py-16 lg:py-0 lg:pb-20">
        <p class="mb-6 flex items-center gap-4 font-mono text-sm font-bold text-acc-prim uppercase">
          <Dividers />
          <span>{{ heroData.eyebrow[0] }}</span>
          <Dividers />
          <span class="text-acc-prim">{{ yrsCoded }}+ {{ heroData.eyebrow[1] }}</span>
        </p>

        <h1 class="text-5xl font-bold tracking-tight text-nowrap text-fg-prim sm:text-7xl">
          <span class="block">
            Practical
            <span class="text-grad">software</span>
          </span>
          people rely on
        </h1>

        <p class="mt-5 max-w-xl text-base leading-7 text-fg-sec sm:text-lg">
          {{ heroData.subheadline }}
        </p>

        <div class="mt-7 flex flex-wrap gap-3">
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

      <HeroMench class="z-10 w-full max-w-sm sm:max-w-md lg:max-w-2xl" />
    </div>
  </section>
</template>
