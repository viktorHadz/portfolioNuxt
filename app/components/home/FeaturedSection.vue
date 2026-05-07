<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import BackgroundArt from './featured/BackgroundArt.vue'
import HeaderBlock from './featured/HeaderBlock.vue'
import MobilePanel from './featured/MobilePanel.vue'
import RemoteControl from './featured/RemoteControl.vue'
import TvSet from './featured/TvSet.vue'
import { tvProjects } from './featured/projects'

const featuredRoot = ref(null)
const headerWrap = ref(null)
const tvWrap = ref(null)
const remoteWrap = ref(null)
const refTV = ref(null)
const screenContent = ref(null)
const activeProject = ref('invoice-and-go')
let featureCtx

const currentProject = computed(() => tvProjects.find((project) => project.id === activeProject.value))

function isDesktop() {
  return window.matchMedia('(min-width: 1024px)').matches
}

function handleTvOnOff(payload) {
  refTV.value?.flipTvPower(payload, screenContent.value)
}

function handleProjectChange(payload) {
  if (payload === activeProject.value) return

  if (!isDesktop() || !refTV.value?.changeChannel || !screenContent.value) {
    activeProject.value = payload
    return
  }

  refTV.value.changeChannel(screenContent.value, () => {
    activeProject.value = payload
  })
}

onMounted(async () => {
  if (
    !featuredRoot.value ||
    !headerWrap.value ||
    !tvWrap.value ||
    !remoteWrap.value ||
    !isDesktop() ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }

  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  featureCtx = gsap.context(() => {
    const entryTargets = [headerWrap.value, tvWrap.value, remoteWrap.value]
    const sectionWidth = () => featuredRoot.value?.getBoundingClientRect().width || 0

    gsap.set(headerWrap.value, { autoAlpha: 0 })
    gsap.set(tvWrap.value, { x: () => -sectionWidth(), autoAlpha: 0 })
    gsap.set(remoteWrap.value, { x: sectionWidth, autoAlpha: 0 })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: featuredRoot.value,
          start: 'top 75%',
          once: true,
          invalidateOnRefresh: true,
        },
        onStart: () => gsap.set(entryTargets, { willChange: 'transform, opacity' }),
        onComplete: () => gsap.set(entryTargets, { clearProps: 'willChange' }),
      })
      .to(headerWrap.value, { autoAlpha: 1, duration: 0.3, ease: 'none' })
      .to(tvWrap.value, { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }, 0.08)
      .to(remoteWrap.value, { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }, 0.16)
  }, featuredRoot.value)
})

onUnmounted(() => {
  featureCtx?.revert()
  featureCtx = null
})
</script>

<template>
  <section
    id="featured-work"
    ref="featuredRoot"
    class="relative overflow-hidden bg-bg-sec px-6 py-20 sm:px-8 md:py-16 lg:py-36"
    aria-labelledby="featured-work-title"
  >
    <BackgroundArt />

    <div class="relative z-10 mx-auto max-w-7xl">
      <div
        ref="headerWrap"
        class="mx-auto max-w-xl text-center lg:absolute lg:-top-3 lg:right-0 lg:text-left"
      >
        <HeaderBlock />
      </div>

      <MobilePanel
        class="mt-10 lg:hidden"
        :projects="tvProjects"
        :active-project="activeProject"
        @change-project="handleProjectChange"
      />

      <div class="hidden justify-between gap-24 pt-28 lg:flex">
        <div ref="tvWrap" class="relative flex">
          <TvSet ref="refTV" class="min-w-2xl xl:w-3xl 2xl:w-4xl" />

          <div
            ref="screenContent"
            class="absolute top-[30%] left-[17%] h-[50%] w-[59%] overflow-hidden 2xl:top-[32%]"
          >
            <div v-if="currentProject" class="grid h-full grid-cols-5 items-start gap-4">
              <div class="col-span-4 min-w-0 px-2">
                <p
                  class="mt-2 font-mono text-xs font-bold tracking-widest text-acc-sec uppercase xl:text-sm 2xl:text-base"
                >
                  CH:{{ currentProject.channel }}
                </p>

                <h2
                  class="mt-2 text-2xl leading-none font-black text-acc-prim xl:text-3xl 2xl:text-4xl"
                >
                  {{ currentProject.title }}
                </h2>

                <p class="text-sm font-bold text-fg-prim uppercase xl:text-base 2xl:text-lg">
                  {{ currentProject.eyebrow }}
                </p>

                <hr class="mt-px mr-24 text-acc-prim/60" />

                <p class="mt-4 text-base leading-snug text-fg-sec xl:text-lg 2xl:text-xl">
                  {{ currentProject.blurb }}
                </p>

                <div class="mt-4 flex flex-col gap-2">
                  <span
                    v-for="highlight in currentProject.highlights"
                    :key="highlight"
                    class="flex items-center gap-2 text-xs font-bold text-fg-sec xl:text-base 2xl:text-lg"
                  >
                    <CheckCircleIcon class="size-6 shrink-0 text-acc-prim xl:size-7 2xl:size-8" />
                    {{ highlight }}
                  </span>
                </div>

                <div class="mt-6 flex w-full justify-around gap-4">
                  <span
                    v-for="stack in currentProject.stack"
                    :key="stack"
                    class="rounded-lg border border-acc-prim/40 bg-bg-sec/80 px-3 py-1 text-sm font-bold text-fg-sec xl:px-4 xl:py-2 xl:text-base 2xl:text-lg"
                  >
                    {{ stack }}
                  </span>
                </div>
              </div>

              <div class="relative col-span-1 flex h-full items-center justify-center">
                <div class="absolute size-40 rounded-full bg-acc-prim/20 blur-2xl" />

                <component
                  :is="currentProject.preview"
                  class="absolute size-32 text-acc-prim drop-shadow-lg xl:size-36"
                />
              </div>
            </div>
          </div>
        </div>

        <div ref="remoteWrap" class="z-10 mr-20 flex flex-col items-center justify-end">
          <RemoteControl
            class="flex max-w-full place-self-center lg:min-w-56 xl:min-w-64"
            @switch-tv="handleTvOnOff"
            @change-project="handleProjectChange"
          />
        </div>
      </div>
    </div>
  </section>
</template>
