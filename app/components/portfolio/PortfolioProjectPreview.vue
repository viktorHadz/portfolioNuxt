<script setup>
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { navigateTo } from '#imports'
import TheButton from '../TheButton.vue'
import PortfolioTechBadge from './PortfolioTechBadge.vue'

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
  main: 'col-start-1 col-span-3 row-start-1 row-span-3 z-1 cursor-default',
  'sm-1': 'col-start-1 row-start-4 cursor-pointer',
  'sm-2': 'col-start-2 row-start-4 cursor-pointer',
  'sm-3': 'col-start-3 row-start-4 cursor-pointer',
}

const activeProject = computed(
  () => props.projects.find((project) => project.id === activeId.value) ?? props.projects[0],
)

const activeSections = computed(() => [
  { label: 'Problem', body: activeProject.value?.problem },
  { label: 'Built', body: activeProject.value?.built },
  { label: 'Result', body: activeProject.value?.result },
  { label: 'Access', body: activeProject.value?.access },
])

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
    <div class="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.8fr)]">
      <article class="h-136 w-full overflow-hidden rounded-lg sm:h-160 lg:h-152">
        <div class="grid h-full grid-cols-3 grid-rows-4 place-items-stretch gap-2">
          <button
            v-for="item in projects"
            :key="item.id"
            type="button"
            :data-flip-id="item.id"
            class="cell group min-w-0 overflow-hidden rounded-lg border border-brdr bg-bg-sec text-left will-change-transform focus:outline-none focus-visible:border-acc-prim"
            :class="[
              slotClass[gridSlot[item.id]],
              item.id === activeId
                ? 'shadow-2xl shadow-black/30'
                : 'hover:border-acc-prim/80 hover:shadow-lg hover:shadow-black/20',
            ]"
            @mousedown.prevent
            @click="setActive(item, $event)"
          >
            <div class="flex h-full flex-col">
              <div
                class="flex min-h-8 items-center justify-between gap-2 border-b border-brdr bg-bg-sec px-2 py-1.5 sm:min-h-9"
              >
                <div
                  class="flex gap-1.5"
                  aria-hidden="true"
                >
                  <span class="size-1.5 rounded-sm bg-red" />
                  <span class="size-1.5 rounded-sm bg-acc-sec" />
                  <span class="size-1.5 rounded-sm bg-acc-ter" />
                </div>

                <span class="truncate text-tiny font-bold text-fg-sec uppercase">
                  {{ item.name }}
                </span>
              </div>

              <div class="relative min-h-0 flex-1 overflow-hidden bg-bg-ter">
                <img
                  v-if="item.image"
                  class="absolute inset-0 h-full w-full object-cover"
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
        class="flex w-full flex-col overflow-hidden rounded-lg border border-brdr bg-bg-prim shadow-2xl shadow-black/20 lg:h-152"
      >
        <div class="sticky top-0 border-b border-brdr bg-bg-sec px-4 py-3">
          <p class="text-tiny font-bold text-acc-sec uppercase">
            {{ activeProject.eyebrow }}
          </p>
          <h3 class="mt-2 text-xl leading-tight font-bold text-fg-prim sm:text-2xl">
            {{ activeProject.name }}
          </h3>
          <p class="mt-2 text-xs leading-5 text-fg-sec sm:text-sm sm:leading-6">
            {{ activeProject.seoDescription }}
          </p>
        </div>

        <div class="grid flex-1 gap-4 overflow-y-auto p-4">
          <div class="grid grid-cols-3 gap-1.5 sm:gap-2">
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
              More Info
            </TheButton>
          </div>

          <div class="grid gap-3">
            <section
              v-for="section in activeSections"
              :key="section.label"
              class="border-b border-brdr pb-3 last:border-b-0 last:pb-0"
            >
              <h4 class="text-tiny font-bold text-acc-prim uppercase">
                {{ section.label }}
              </h4>
              <p class="mt-1 text-xs leading-5 text-fg-sec sm:text-sm sm:leading-6">
                {{ section.body }}
              </p>
            </section>
          </div>

          <section>
            <h4 class="text-tiny font-bold text-acc-prim uppercase">Stack</h4>
            <div class="mt-2 flex flex-wrap gap-2">
              <PortfolioTechBadge
                v-for="tech in activeProject.stack"
                :key="tech"
                :name="tech"
                compact
              />
            </div>
          </section>

          <section>
            <h4 class="text-tiny font-bold text-acc-prim uppercase">Responsibilities</h4>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="item in activeProject.responsibilities"
                :key="item"
                class="rounded-lg border border-brdr bg-bg-sec px-2.5 py-1 text-xs font-bold text-fg-sec"
              >
                {{ item }}
              </span>
            </div>
          </section>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.project-preview {
  overflow-anchor: none;
}
</style>
