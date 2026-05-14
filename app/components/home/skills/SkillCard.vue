<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import type { Component } from 'vue'
import type { SkillCardContent } from '~/data/portfolio/skills'

const graphicRef = ref<{ play?: () => void; reverse?: () => void } | null>(null)

defineProps<{ card: SkillCardContent; graphic: Component }>()

defineEmits<{ open: [] }>()

function playGraphic() {
  graphicRef.value?.play?.()
}

function reverseGraphic() {
  graphicRef.value?.reverse?.()
}
</script>

<template>
  <article
    class="group relative flex min-h-96 flex-col overflow-hidden rounded-xl border border-fg-ter/20 bg-bg-sec/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-acc-prim/40 hover:bg-bg-ter/60"
    @mouseenter="playGraphic"
    @mouseleave="reverseGraphic"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-radial from-transparent from-65% to-acc-prim/10 opacity-0 transition duration-300 group-hover:opacity-100"
    />

    <div class="relative flex items-start justify-between gap-4">
      <div>
        <p class="font-mono text-xs font-bold tracking-wide text-acc-ter uppercase">
          {{ card.eyebrow }}
        </p>
        <h3 class="mt-3 text-xl font-bold tracking-tighter uppercase sm:text-2xl">
          <span class="lg:hidden">{{ card.title.join(' ') }}</span>
          <span class="hidden lg:block">
            {{ card.title[0] }}
            <br />
            {{ card.title[1] }}
          </span>
        </h3>
      </div>
      <span class="font-mono text-xl font-bold text-acc-prim">0{{ card.order }}</span>
    </div>

    <div
      class="relative mt-5 grid min-h-44 place-items-center rounded-lg border border-fg-ter/10 bg-bg-sec p-3 lg:min-h-48"
    >
      <div class="absolute inset-0 opacity-20" aria-hidden="true" />
      <component :is="graphic" ref="graphicRef" class="relative h-full w-full" />
    </div>

    <p class="relative mt-5 text-sm leading-6 text-fg-sec">
      {{ card.blurb }}
    </p>

    <button
      type="button"
      class="relative mt-auto inline-flex items-center gap-2 pt-6 text-left font-bold text-acc-prim transition-colors duration-300 group-hover:text-acc-prim-light"
      @click="$emit('open')"
    >
      Explore
      <ArrowRightIcon class="size-4 transition-transform duration-300 group-hover:translate-x-2" />
    </button>
  </article>
</template>
