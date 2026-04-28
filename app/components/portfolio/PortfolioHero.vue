<script setup>
import HeroMench from '@/components/Hero/HeroMench.vue'
import HeroSpeedLines from '@/components/Hero/HeroSpeedLines.vue'
import TheButton from '@/components/TheButton.vue'
import { portfolioContent } from './portfolioContent'
import Dividers from '../Decor/Dividers.vue'
import HeroIcons from '../Hero/HeroIcons.vue'
import ThePortal from '../Hero/ThePortal.vue'

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
  <section class="relative isolate min-h-dvh overflow-hidden bg-bg-prim text-fg-prim">
    <HeroSpeedLines />

    <div
      class="absolute inset-0 bg-stars opacity-50"
      aria-hidden="true"
    />

    <div
      class="relative z-10 mx-auto flex min-h-dvh max-w-screen-2xl flex-col justify-center px-6 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-16 lg:px-20 lg:py-24"
    >
      <div class="z-20 mx-auto max-w-4xl text-center">
        <p
          class="mb-5 flex flex-wrap items-center justify-center gap-3 font-mono text-xs font-bold text-acc-prim uppercase sm:mb-7 sm:text-sm"
        >
          <Dividers />
          <span>{{ heroData.eyebrow[0] }}</span>
          <Dividers />
          <span>{{ yrsCoded }}+ {{ heroData.eyebrow[1] }}</span>
        </p>

        <h1
          class="text-5xl leading-none font-bold tracking-tight text-fg-prim sm:text-6xl md:text-7xl xl:text-8xl"
        >
          <span class="block">
            Practical
            <span class="text-grad">software</span>
          </span>
          <span class="block">people rely on</span>
        </h1>

        <p
          class="mx-auto mt-5 max-w-2xl text-sm leading-6 text-fg-sec sm:text-base sm:leading-7 lg:text-lg"
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

      <div
        class="mt-10 translate-x-12 translate-y-22 overflow-visible sm:mt-12 lg:mt-44 lg:translate-y-0"
      >
        <div class="relative mx-auto max-w-7xl overflow-visible pt-8 sm:pt-12">
          <HeroIcons />
          <div class="relative mx-auto max-w-225">
            <ThePortal class="w-sm place-self-center sm:w-3/5 lg:w-xl xl:w-2xl" />
            <HeroMench
              class="absolute inset-x-0 -bottom-12 -left-44 z-30 mx-auto w-sm sm:right-0 sm:-bottom-12 sm:w-3/5 lg:right-32 lg:-bottom-20 lg:w-xl xl:-left-44 xl:w-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
