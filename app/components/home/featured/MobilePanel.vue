<script setup>
import { computed } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
  activeProject: {
    type: String,
    required: true,
  },
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
  <div v-if="currentProject" class="relative mx-auto max-w-md md:max-w-3xl">
    <div class="absolute inset-x-8 top-24 bottom-10 rounded-full bg-acc-prim/10 blur-3xl" />

    <article
      class="relative overflow-hidden rounded-3xl border border-acc-prim/60 bg-bg-prim/90 p-5 shadow-2xl md:p-6"
    >
      <div class="absolute top-4 right-4 flex gap-2">
        <span class="size-2 rounded-full bg-acc-prim" />
        <span class="size-2 rounded-full bg-fg-ter/30" />
        <span class="size-2 rounded-full bg-fg-ter/30" />
      </div>

      <div class="relative grid min-h-96 gap-5 md:grid-cols-2 md:items-center">
        <div class="flex min-h-96 flex-col">
          <p class="text-grad-bottom font-mono text-sm font-bold tracking-widest uppercase">
            Project:{{ currentProject.channel }}
          </p>

          <h2 class="mt-3 line-clamp-2 text-3xl leading-none font-black text-acc-prim">
            {{ currentProject.title }}
          </h2>

          <p class="mt-2 text-sm font-bold text-fg-prim uppercase">
            {{ currentProject.eyebrow }}
          </p>

          <hr class="mt-2 border-acc-prim/60 lg:w-40" />

          <p class="mt-5 line-clamp-3 text-base leading-snug text-fg-sec">
            {{ currentProject.blurb }}
          </p>

          <div class="mt-5 flex flex-col gap-3">
            <span
              v-for="highlight in currentProject.highlights"
              :key="highlight"
              class="flex items-start gap-3 text-sm font-bold text-fg-sec"
            >
              <CheckCircleIcon class="mt-px size-5 shrink-0 text-acc-prim" />
              <span class="line-clamp-2">{{ highlight }}</span>
            </span>
          </div>

          <div class="mt-auto grid grid-cols-3 gap-3 pt-5">
            <span
              v-for="stack in currentProject.stack"
              :key="stack"
              class="rounded-lg border border-acc-prim/50 bg-bg-sec/80 px-2 py-2 text-center text-sm font-bold text-fg-sec"
            >
              {{ stack }}
            </span>
          </div>
        </div>

        <div
          class="relative order-first flex min-h-48 items-center justify-center md:order-0 md:min-h-96"
        >
          <div class="absolute size-48 rounded-full border border-fg-ter/10" />
          <div class="absolute size-36 rounded-full border border-fg-ter/10" />
          <div class="absolute size-28 rounded-full bg-acc-prim/20 blur-2xl" />

          <component
            :is="currentProject.preview"
            class="relative size-32 text-acc-prim drop-shadow-lg md:size-40"
          />
        </div>
      </div>

      <div class="mt-5 border-t border-fg-ter/10 pt-4">
        <p class="text-center font-mono text-xs font-bold tracking-widest text-acc-prim uppercase">
          Projects
        </p>

        <div class="mt-3 grid grid-cols-4 gap-3">
          <button
            v-for="project in projects"
            :key="project.id"
            class="rounded-full border px-3 py-3 font-mono text-lg font-black transition"
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
</template>
