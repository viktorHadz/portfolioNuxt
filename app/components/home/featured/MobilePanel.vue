<script setup>
import { computed } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import PreviewVariant from '../skills/GraphicVariant.vue'
import MobileSet from './MobileSet.vue'

const props = defineProps({
  projects: { type: Array, required: true },
  activeProject: { type: String, required: true },
})

const emit = defineEmits(['changeProject'])

const currentProject = computed(() => {
  return props.projects.find((project) => project.id === props.activeProject) || props.projects[0]
})

function changeProject(projectId) {
  emit('changeProject', projectId)
}
</script>

<template>
  <MobileSet>
    <div v-if="currentProject" class="relative h-full w-full">
      <article class="relative flex h-full flex-col pt-3 pr-3 pl-3 sm:pt-2 sm:pr-2 sm:pl-4">
        <div class="relative grid flex-1 gap-2 overflow-clip md:grid-cols-5 md:gap-4">
          <div class="flex min-w-0 flex-col md:col-span-3 md:justify-center">
            <div class="relative">
              <div>
                <h2 class="text-xl leading-none font-black text-acc-prim md:text-2xl">
                  {{ currentProject.title }}
                </h2>
                <p class="text-xs font-bold text-fg-prim uppercase md:text-sm">
                  {{ currentProject.eyebrow }}
                </p>
              </div>
            </div>

            <hr class="mt-1 w-full border-brdr" />

            <p class="mt-3 line-clamp-3 text-sm leading-snug text-fg-sec md:text-sm">
              {{ currentProject.blurb }}
            </p>

            <div class="mt-3 flex flex-col gap-2">
              <span
                v-for="highlight in currentProject.highlights"
                :key="highlight"
                class="flex items-center gap-3 text-xs font-medium text-fg-sec md:text-xs"
              >
                <CheckCircleIcon class="size-4 shrink-0 text-acc-prim md:size-5" />
                <span class="line-clamp-2">{{ highlight }}</span>
              </span>
            </div>

            <div class="grid grid-cols-3 gap-2 pt-5">
              <span
                v-for="stack in currentProject.stack"
                :key="stack"
                class="rounded-lg border border-brdr bg-bg-ter py-1 text-center text-tiny font-bold text-fg-sec md:text-xs"
              >
                {{ stack }}
              </span>
            </div>
            <NuxtLink
              :to="currentProject.path"
              class="mt-3 inline-flex w-full items-center gap-2 font-bold text-acc-prim uppercase"
            >
              <TheButton class="flex-1! px-0! py-2! text-tiny!">Open project</TheButton>
            </NuxtLink>

            <div
              class="mt-4 flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-brdr bg-bg-ter/60 md:hidden"
            >
              <component :is="currentProject.preview" class="h-auto w-32 opacity-90 drop-shadow-lg" />
            </div>
          </div>

          <div class="relative hidden min-h-48 items-center justify-center md:col-span-2 md:flex">
            <PreviewVariant :project="currentProject" />
          </div>
        </div>

        <div class="mt-2 border-t border-brdr pt-2">
          <p
            class="text-center font-mono text-tiny font-bold tracking-widest text-acc-prim uppercase"
          >
            Projects
          </p>

          <div class="mt-2 grid grid-cols-4 gap-2">
            <button
              v-for="project in projects"
              :key="project.id"
              class="rounded-full border px-2 py-2 font-mono text-tiny font-black transition md:px-3"
              :class="
                project.id === activeProject
                  ? 'border-acc-prim bg-acc-prim/10 text-acc-prim'
                  : 'border-fg-ter/30 text-fg-ter hover:border-acc-prim/60 hover:text-acc-prim'
              "
              type="button"
              @click="changeProject(project.id)"
            >
              {{ project.channel }}
            </button>
          </div>
        </div>
      </article>
    </div>
  </MobileSet>
</template>
