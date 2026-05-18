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
import PreviewVariant from './skills/GraphicVariant.vue'

const featuredRoot = ref(null)
const refTV = ref(null)
const screenContent = ref(null)
const activeProject = ref('invoice-and-go')
let featureCtx

const currentProject = computed(() =>
  tvProjects.find((project) => project.id === activeProject.value),
)

function handleTvOnOff(payload) {
  refTV.value?.flipTvPower(payload, screenContent.value)
}

function handleProjectChange(payload) {
  if (payload === activeProject.value) return

  const changeProject = () => (activeProject.value = payload)

  if (
    !window.matchMedia('(min-width: 1024px)').matches ||
    !screenContent.value ||
    !refTV.value?.changeChannel
  ) {
    changeProject()
    return
  }

  refTV.value.changeChannel(screenContent.value, changeProject)
}

onMounted(async () => {
  if (
    !featuredRoot.value ||
    !window.matchMedia('(min-width: 1024px)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }

  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  featureCtx = gsap.context(() => {
    const entryTargets = ['.featured-head', '.featured-tv', '.featured-remote']

    gsap.set('.featured-head', { autoAlpha: 0 })
    gsap.set('.featured-tv', { xPercent: -140, autoAlpha: 0 })
    gsap.set('.featured-remote', { xPercent: 140, autoAlpha: 0 })

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
      .to('.featured-head', { autoAlpha: 1, duration: 0.3, ease: 'none' })
      .to('.featured-tv', { xPercent: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' }, 0.08)
      .to(
        '.featured-remote',
        { xPercent: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' },
        0.16,
      )
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
    class="relative overflow-hidden bg-bg-sec px-2 py-20 sm:px-8 md:py-16 lg:py-36"
    aria-labelledby="featured-work-title"
  >
    <BackgroundArt />

    <div class="relative z-10 mx-auto max-w-7xl">
      <HeaderBlock
        class="featured-head ml-2 max-w-xl text-left sm:ml-0 lg:absolute lg:-top-24 lg:right-0 lg:text-left"
      />

      <MobilePanel
        class="mt-10 lg:hidden"
        :projects="tvProjects"
        :active-project="activeProject"
        @change-project="handleProjectChange"
      />

      <div class="hidden justify-between gap-24 pt-28 lg:flex">
        <div class="featured-tv relative flex">
          <TvSet ref="refTV" class="lg:w-150 xl:w-3xl" />

          <div
            ref="screenContent"
            class="absolute top-[24%] left-[8%] h-[57%] w-[75%] overflow-hidden"
          >
            <div v-if="currentProject" class="relative grid h-full grid-cols-5 items-start gap-4">
              <div class="z-20 col-span-3 min-w-0 px-2">
                <h2 class="text-2xl leading-none font-bold text-acc-prim xl:text-3xl 2xl:text-4xl">
                  {{ currentProject.title }}
                </h2>

                <p class="mt-1 text-sm font-bold text-fg-prim uppercase xl:text-base">
                  {{ currentProject.eyebrow }}
                </p>

                <hr class="mt-1 mr-24 text-fg-ter" />

                <p class="mt-4 text-base leading-snug text-fg-sec xl:text-lg">
                  {{ currentProject.blurb }}
                </p>

                <div class="mt-4 flex flex-col gap-4">
                  <span
                    v-for="highlight in currentProject.highlights"
                    :key="highlight"
                    class="flex items-center gap-2 text-xs font-medium text-fg-sec xl:text-base"
                  >
                    <CheckCircleIcon class="size-6 shrink-0 text-fg-prim xl:size-7" />
                    {{ highlight }}
                  </span>
                </div>

                <div class="mt-6 flex w-full gap-4">
                  <span
                    v-for="stack in currentProject.stack"
                    :key="stack"
                    class="rounded-lg border border-brdr-subtle bg-bg-sec/80 px-3 py-1 text-sm font-bold text-fg-sec xl:px-4 xl:py-2 xl:text-base"
                  >
                    {{ stack }}
                  </span>
                </div>

                <NuxtLink
                  :to="currentProject.path"
                  class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-fg-prim uppercase transition hover:text-acc-prim-light"
                >
                  Open project
                </NuxtLink>
              </div>
              <div class="relative col-span-1 flex h-full items-center justify-center">
                <PreviewVariant :project="currentProject" />
              </div>
            </div>
          </div>
        </div>

        <div class="featured-remote z-10 mr-20 flex flex-col items-center justify-end">
          <RemoteControl
            :active-project="activeProject"
            class="flex max-w-full place-self-center lg:min-w-56 xl:min-w-64"
            @switch-tv="handleTvOnOff"
            @change-project="handleProjectChange"
          />
        </div>
      </div>
    </div>
  </section>
</template>
