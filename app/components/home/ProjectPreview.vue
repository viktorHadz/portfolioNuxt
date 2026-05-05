<script setup>
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { navigateTo } from '#imports'
import TheButton from '../TheButton.vue'
import HomeTechBadge from './HomeTechBadge.vue'

gsap.registerPlugin(Flip)

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
})

const gridSlot = reactive({})
const activeId = ref(props.projects[0]?.id)

props.projects.forEach((project, index) => {
  gridSlot[project.id] = index === 0 ? 'main' : `sm-${index}`
})

const slotClass = {
  main: 'col-start-1 col-span-3 row-start-1 row-span-3 z-10 cursor-default',
  'sm-1': 'col-start-1 row-start-4 cursor-pointer p-1',
  'sm-2': 'col-start-2 row-start-4 cursor-pointer p-1',
  'sm-3': 'col-start-3 row-start-4 cursor-pointer p-1',
}

const activeProject = computed(
  () => props.projects.find((project) => project.id === activeId.value) ?? props.projects[0],
)

function setActive(item, event) {
  if (item.id === activeId.value) return
  if (event?.detail) event.currentTarget?.blur()

  const state = Flip.getState('.cell')

  const clickedSlot = gridSlot[item.id]
  gridSlot[activeId.value] = clickedSlot
  gridSlot[item.id] = 'main'
  activeId.value = item.id

  nextTick(() => {
    Flip.from(state, {
      duration: 0.3,
      absolute: true,
      ease: 'power1.inOut',
    })
  })
}

function openExternal(url) {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

function openProject(path) {
  navigateTo(path)
}
</script>

<template>
  <section
    v-if="projects.length"
    class="project-preview mt-10"
    aria-label="Featured project preview"
  >
    <div class="grid gap-4 lg:grid-cols-[1fr_0.6fr]">
      <article class="z-20 h-136 overflow-hidden rounded-lg sm:h-160 lg:h-152">
        <div class="grid h-full grid-cols-3 grid-rows-4 gap-2">
          <button
            v-for="item in projects"
            :key="item.id"
            type="button"
            :data-flip-id="item.id"
            class="cell group min-w-0 overflow-hidden rounded-lg bg-bg-sec text-left ring-2 ring-transparent ring-offset-transparent will-change-transform ring-inset focus:outline-none focus-visible:ring-acc-prim"
            :class="[
              slotClass[gridSlot[item.id]],
              item.id === activeId ? '' : 'hover:ring-acc-prim/70',
            ]"
            @mousedown.prevent
            @click="setActive(item, $event)"
          >
            <div class="flex h-full flex-col">
              <div
                class="flex min-h-8 items-center justify-between rounded-t-lg bg-bg-prim px-2 py-1.5 sm:min-h-9"
              >
                <span class="truncate text-tiny font-bold text-fg-ter uppercase">
                  {{ item.name }}
                </span>
                <div
                  class="flex gap-2"
                  aria-hidden="true"
                >
                  <span class="size-2 rounded-sm bg-red" />
                  <span class="size-2 rounded-sm bg-green" />
                </div>
              </div>

              <div class="relative min-h-0 flex-1 overflow-hidden rounded-b-lg">
                <img
                  v-if="item.image"
                  class="absolute inset-0 size-full object-cover"
                  :src="item.image"
                  :alt="item.imageAlt"
                />

                <div
                  v-else
                  class="grid h-full place-items-center p-4 text-center text-sm font-bold text-acc-prim"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </button>
        </div>
      </article>

      <aside
        v-if="activeProject"
        class="pannelShadow z-10 flex flex-col overflow-hidden rounded-lg bg-bg-sec ring-4 ring-acc-prim/50 lg:h-152"
      >
        <div class="flex justify-between bg-bg-prim px-4 py-3">
          <div>
            <h3 class="text-xl leading-tight font-bold text-fg-prim sm:text-2xl">
              {{ activeProject.name }}
            </h3>
            <p class="text-xs font-bold text-acc-prim uppercase">
              {{ activeProject.eyebrow }}
            </p>
          </div>
          <div
            class="flex gap-3"
            aria-hidden="true"
          >
            <span class="mt-1 size-3 rounded-full bg-red" />
            <span class="mt-1 size-3 rounded-full bg-green" />
          </div>
        </div>

        <div class="flex min-h-0 flex-1 flex-col justify-between gap-5 overflow-y-auto p-4">
          <div class="space-y-5">
            <p class="text-sm leading-6 text-fg-sec">
              {{ activeProject.summary }}
            </p>

            <section class="rounded-lg bg-bg-ter p-3">
              <h4 class="text-xs font-bold text-acc-prim uppercase">Outcome</h4>
              <p class="mt-1 text-sm leading-6 text-fg-sec">
                {{ activeProject.outcome }}
              </p>
            </section>

            <section class="rounded-lg bg-bg-ter p-3">
              <h4 class="text-xs font-bold text-acc-prim uppercase">Build</h4>
              <p class="mt-1 text-sm leading-6 text-fg-sec">
                {{ activeProject.build }}
              </p>
            </section>

            <section>
              <h4 class="text-xs font-bold text-acc-prim uppercase">Stack</h4>
              <div class="mt-2 flex flex-wrap gap-2">
                <HomeTechBadge
                  v-for="tech in activeProject.stack"
                  :key="tech"
                  :name="tech"
                  compact
                />
              </div>
            </section>
          </div>

          <div class="grid grid-cols-3 gap-2 pt-2">
            <TheButton
              v-if="activeProject.liveUrl"
              variant="primary"
              size="compact"
              block
              @click="openExternal(activeProject.liveUrl)"
            >
              Visit
            </TheButton>

            <TheButton
              variant="secondary"
              size="compact"
              block
              @click="openExternal(activeProject.gitHub)"
            >
              GitHub
            </TheButton>

            <TheButton
              variant="tertiary"
              color
              size="compact"
              block
              @click="openProject(activeProject.path)"
            >
              See More
            </TheButton>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.project-preview {
  overflow-anchor: none;
}
/*
.pannelShadow {
  box-shadow:
    0 0 0 1px hsl(228 10% 20%),
    0 10px 50px -10px hsl(77 64% 57% / 0.25);
}
*/
</style>
