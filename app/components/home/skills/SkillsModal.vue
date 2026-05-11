<script setup lang="ts">
import { ArrowRightIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { getProjectById } from '~/data/portfolio/projects'
import type { PortfolioProject } from '~/data/portfolio/projects'
import type { SkillCardContent } from '~/data/portfolio/skills'

const props = defineProps<{
  card: SkillCardContent | null
}>()

const emit = defineEmits<{
  close: []
}>()

const proofProjects = computed(
  () =>
    props.card?.proof
      .map((id) => getProjectById(id))
      .filter((project): project is PortfolioProject => project !== null) || [],
)

watch(
  () => props.card,
  (card) => {
    if (!import.meta.client) return

    const overflow = card ? 'hidden' : ''

    document.documentElement.style.overflow = overflow
    document.body.style.overflow = overflow
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (!import.meta.client) return

  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade" appear>
      <div
        v-if="card"
        class="fixed inset-0 z-modal flex bg-black/70 px-4 pt-24 pb-4 sm:items-center sm:justify-center sm:p-4"
        @click.self="emit('close')"
      >
        <div
          class="max-h-full w-full max-w-xl self-end overflow-y-auto rounded-2xl border border-brdr bg-bg-sec shadow-2xl shadow-black/40 sm:max-w-2xl sm:self-auto"
        >
          <div class="border-b border-brdr bg-bg-prim/50 px-5 py-5 sm:px-6">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <p class="font-mono text-tiny font-bold tracking-wide text-acc-ter uppercase">
                  Capability details
                </p>
                <h3 class="mt-2 text-2xl leading-tight font-bold text-acc-prim">
                  {{ card.title.join(' ') }}
                </h3>
                <p class="mt-3 text-sm leading-6 text-fg-sec">{{ card.blurb }}</p>
              </div>

              <button
                type="button"
                class="rounded-lg border border-brdr bg-bg-prim p-2 text-fg-sec hover:border-acc-prim/40 hover:text-acc-prim"
                @click="emit('close')"
              >
                <span class="sr-only">Close modal</span>
                <XMarkIcon class="size-5" />
              </button>
            </div>
          </div>

          <div class="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6 sm:py-6">
            <section class="rounded-xl border border-brdr bg-bg-prim/60 p-4">
              <p class="font-mono text-tiny font-bold tracking-wide text-acc-prim uppercase">
                What I build
              </p>
              <p class="mt-3 text-sm leading-6 text-fg-sec">{{ card.what }}</p>
            </section>

            <section class="rounded-xl border border-brdr bg-bg-prim/60 p-4">
              <p class="font-mono text-tiny font-bold tracking-wide text-acc-prim uppercase">
                How I approach it
              </p>
              <p class="mt-3 text-sm leading-6 text-fg-sec">{{ card.how }}</p>
            </section>

            <section class="rounded-xl border border-brdr bg-bg-prim/60 p-4 sm:col-span-2">
              <p class="font-mono text-tiny font-bold tracking-wide text-acc-prim uppercase">
                Core stack
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <TechBadge v-for="tech in card.tech" :key="tech" :name="tech" compact />
              </div>
            </section>

            <section
              v-if="proofProjects.length"
              class="rounded-xl border border-brdr bg-bg-prim/60 p-4 sm:col-span-2"
            >
              <p class="font-mono text-tiny font-bold tracking-wide text-acc-prim uppercase">
                Related work
              </p>
              <div class="mt-3 flex flex-col gap-2">
                <NuxtLink
                  v-for="project in proofProjects"
                  :key="project.id"
                  :to="project.path"
                  class="flex items-center justify-between rounded-lg border border-brdr bg-bg-sec/80 px-3 py-3 transition-colors duration-200 hover:border-acc-prim/40 hover:text-acc-prim"
                >
                  <span>
                    <span class="block text-sm font-bold text-fg-prim">{{ project.name }}</span>
                    <span class="block text-xs leading-5 text-fg-sec">{{ project.eyebrow }}</span>
                  </span>
                  <ArrowRightIcon class="size-4 shrink-0 text-acc-prim" />
                </NuxtLink>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
