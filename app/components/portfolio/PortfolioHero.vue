<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import TheButton from '../TheButton.vue'
import HeroMench from '../HeroMench.vue'
import { portfolioContent } from './portfolioContent'

const { hero } = portfolioContent
const heroRoot = ref(null)
let context

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(async () => {
  const { default: gsap } = await import('gsap')

  context = gsap.context(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(
        [
          '[data-hero="kicker"]',
          '[data-hero="title"]',
          '[data-hero="copy"]',
          '[data-hero="actions"]',
          '[data-hero="visual"]',
          '[data-hero="portal-glow"]',
          '[data-hero="portal-ring"]',
          '[data-hero="mench"]',
        ],
        { autoAlpha: 1, clearProps: 'transform' },
      )
      return
    }

    const heroCopy = [
      ['[data-hero="kicker"]', { autoAlpha: 0, y: 12 }, 0.16],
      ['[data-hero="title"]', { autoAlpha: 0, y: 18 }, '-=0.28'],
      ['[data-hero="copy"]', { autoAlpha: 0, y: 16 }, '-=0.28'],
      ['[data-hero="actions"]', { autoAlpha: 0, y: 14 }, '-=0.24'],
    ]

    const intro = gsap.timeline({ defaults: { duration: 0.65, ease: 'power3.out' } })
    heroCopy.forEach(([selector, fromVars, position]) => {
      intro.fromTo(selector, fromVars, { autoAlpha: 1, y: 0 }, position)
    })

    intro
      .fromTo(
        '[data-hero="visual"]',
        { autoAlpha: 0, scale: 0.88, x: 20 },
        { autoAlpha: 1, scale: 1, x: 0, duration: 0.72 },
        0.34,
      )
      .fromTo(
        '[data-hero="portal-glow"]',
        { autoAlpha: 0, scale: 0.55 },
        { autoAlpha: 0.9, scale: 1, duration: 0.75, ease: 'power2.out' },
        '<',
      )
      .fromTo(
        '[data-hero="portal-ring"]',
        { autoAlpha: 0, rotation: -32, scale: 0.62, transformOrigin: '50% 50%' },
        {
          autoAlpha: 1,
          rotation: 0,
          scale: 1,
          duration: 0.95,
          ease: 'back.out(1.7)',
          stagger: 0.08,
        },
        '<0.06',
      )
      .fromTo(
        '[data-hero="mench"]',
        { autoAlpha: 0, y: 18, scale: 0.92 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.72 },
        '-=0.42',
      )
      .call(() => {
        gsap.to('[data-hero="portal-ring"]', {
          rotation: '+=360',
          transformOrigin: '50% 50%',
          repeat: -1,
          ease: 'none',
          duration: 28,
        })

        gsap.to('[data-hero="mench"]', {
          y: -10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          duration: 3.6,
        })
      })

    gsap.utils.toArray('[data-hero="wave"]').forEach((wave, index) => {
      const dashCycle = 96
      const start = Number(wave.getAttribute('stroke-dashoffset') ?? 0)
      const direction = index % 2 === 0 ? -1 : 1

      gsap.fromTo(
        wave,
        { attr: { 'stroke-dashoffset': start } },
        {
          attr: { 'stroke-dashoffset': start + direction * dashCycle },
          repeat: -1,
          ease: 'none',
          duration: [5.8, 7.2, 6.4][index] ?? 6.4,
        },
      )
    })
  }, heroRoot.value)
})

onBeforeUnmount(() => {
  context?.revert()
})
</script>

<template>
  <section
    id="portfolio-top"
    ref="heroRoot"
    class="relative isolate min-h-svh overflow-hidden bg-bg-prim text-fg-prim lg:min-h-dvh"
    aria-labelledby="portfolio-hero-title"
  >
    <div
      class="bg-stars absolute inset-0 opacity-70"
      aria-hidden="true"
    />

    <!-- Moving Lines -->
    <svg
      class="pointer-events-none absolute inset-x-[-10%] top-10 h-[82%] w-[120%] opacity-45 sm:top-8 sm:h-[88%] lg:inset-0 lg:h-full lg:w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke-dasharray="24 72"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      >
        <path
          data-hero="wave"
          d="M-140 168 C100 112 260 214 440 168 S760 120 960 168 1240 220 1340 168"
          stroke-width="1"
          stroke="#a3d920"
          stroke-dashoffset="0"
        />
        <path
          data-hero="wave"
          d="M-140 350 C120 420 280 282 460 350 S780 418 980 350 1230 290 1340 350"
          stroke-width="1.4"
          stroke="#4aa3ff"
          stroke-dashoffset="32"
          opacity="0.75"
        />
        <path
          data-hero="wave"
          d="M-140 532 C140 462 290 606 500 532 S800 466 1010 532 1230 594 1340 532"
          stroke-width="1"
          stroke="#ffeb58"
          stroke-dashoffset="64"
          opacity="0.6"
        />
      </g>
    </svg>

    <div
      class="relative z-10 mx-auto grid min-h-svh w-full max-w-7xl items-center justify-items-center gap-8 px-6 pt-24 pb-14 text-center sm:px-8 sm:pt-28 lg:min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.92fr)] lg:justify-items-stretch lg:gap-14 lg:pb-16 lg:text-left"
    >
      <div class="max-w-2xl lg:max-w-none">
        <p
          data-hero="kicker"
          class="font-bold text-acc-prim uppercase"
        >
          {{ hero.eyebrow }}
        </p>
        <h1
          id="portfolio-hero-title"
          data-hero="title"
          class="mt-4 max-w-3xl text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
        >
          {{ hero.headline }}
        </h1>
        <p
          data-hero="copy"
          class="mx-auto mt-5 max-w-xl text-sm leading-7 text-fg-sec sm:text-base lg:mx-0"
        >
          {{ hero.subheadline }}
        </p>

        <div
          data-hero="actions"
          class="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start"
        >
          <TheButton
            variant="primary"
            @click="scrollToId('featured-work')"
          >
            {{ hero.primaryCta }}
          </TheButton>
          <TheButton
            variant="secondary"
            @click="scrollToId('contact')"
          >
            {{ hero.secondaryCta }}
          </TheButton>
        </div>
      </div>
      <!-- Portal Character  -->
      <div
        data-hero="visual"
        class="relative mx-auto w-[min(92vw,31rem)] sm:w-[min(84vw,35rem)] md:w-[min(70vw,38rem)] lg:w-full lg:max-w-xl xl:max-w-2xl"
      >
        <div class="relative aspect-square">
          <svg
            class="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <g
              fill="none"
              stroke-linecap="round"
              vector-effect="non-scaling-stroke"
            >
              <circle
                data-hero="portal-ring"
                cx="50"
                cy="50"
                r="31"
                stroke="#4aa3ff"
                stroke-dasharray="1.8 4.8"
                stroke-width="0.3"
                opacity="0.62"
              />
              <circle
                data-hero="portal-ring"
                cx="50"
                cy="50"
                r="37"
                stroke="#a3d920"
                stroke-dasharray="2.4 6"
                stroke-width="0.3"
                opacity="0.76"
              />
              <circle
                data-hero="portal-ring"
                cx="50"
                cy="50"
                r="43"
                stroke="#ffeb58"
                stroke-dasharray="3 7"
                stroke-width="0.3"
                opacity="0.54"
              />
            </g>
          </svg>
          <div
            data-hero="portal-glow"
            class="absolute inset-[18%] rounded-full bg-acc-prim/15 opacity-70 blur-2xl lg:opacity-90"
            aria-hidden="true"
          />

          <div class="absolute inset-0 grid place-items-center">
            <div
              data-hero="mench"
              class="h-[84%] w-[84%]"
            >
              <HeroMench class="h-full w-full drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
