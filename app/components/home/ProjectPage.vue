<script setup>
import { computed } from 'vue'
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  RectangleStackIcon,
} from '@heroicons/vue/24/outline'
import { useHead, useSeoMeta, withSiteUrl } from '#imports'
import { allProjects } from './portfolioContent'
import TheButton from '../TheButton.vue'
import HomeTechBadge from './HomeTechBadge.vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const imagePath = computed(() => props.project.image || '')
const canonical = withSiteUrl(props.project.path)
const title = computed(() => props.project.seoTitle || `${props.project.name}`)
const description = computed(
  () =>
    props.project.seoDescription ||
    props.project.result ||
    props.project.summary ||
    props.project.problem,
)
const imageUrl = withSiteUrl(imagePath)
const primaryStack = computed(() => props.project.stack.slice(0, 3).join(' / '))
const sections = computed(() => {
  if (props.project.problem || props.project.built || props.project.result) {
    return [
      { label: 'Problem', body: props.project.problem },
      { label: 'What I built', body: props.project.built },
      { label: 'Result', body: props.project.result },
      { label: 'Access', body: props.project.access },
    ].filter((section) => section.body)
  }

  return [
    { label: 'Overview', body: props.project.summary },
    {
      label: 'Build shape',
      body: `A focused ${props.project.eyebrow.toLowerCase()} built with ${props.project.stack.slice(0, 3).join(', ')} around a clear user workflow and production-minded delivery.`,
    },
    {
      label: 'What it shows',
      body: `This project shows ${props.project.responsibilities.slice(0, 3).join(', ').toLowerCase()} work in a compact, reviewable build.`,
    },
  ]
})
const projectFacts = computed(() => [
  { label: 'Type', value: props.project.eyebrow },
  { label: 'Main stack', value: primaryStack.value },
  { label: 'Scope', value: props.project.responsibilities.slice(0, 3).join(', ') },
  { label: 'Status', value: props.project.liveUrl ? 'Live project' : 'Source available' },
])
const projectSignals = computed(() =>
  [
    {
      label: 'Core work',
      body: `${props.project.responsibilities.slice(0, 3).join(', ')} across ${primaryStack.value}.`,
    },
    {
      label: 'Review path',
      body: props.project.liveUrl
        ? 'Live project and source code are available for review.'
        : 'Source code is available for review on GitHub.',
    },
    {
      label: 'Project signal',
      body: props.project.access || props.project.seoDescription || props.project.summary,
    },
  ].filter((item) => item.body),
)
const relatedProjects = computed(() =>
  allProjects.filter((project) => project.id !== props.project.id).slice(0, 3),
)

function openExternal(url) {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'article',
  ogUrl: canonical,
  ogImage: computed(() => (props.project.image ? imageUrl.value : undefined)),
  twitterCard: computed(() => (props.project.image ? 'summary_large_image' : 'summary')),
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
})
</script>

<template>
  <main class="min-h-screen bg-bg-prim text-fg-prim">
    <article>
      <section class="relative isolate overflow-hidden px-6 pt-20 pb-14 sm:px-8 sm:pt-28">
        <DecorField />

        <div class="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <NuxtLink
              to="/"
              class="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-acc-prim uppercase"
            >
              <ArrowLeftIcon class="size-4" />
              Back to portfolio
            </NuxtLink>
            <p class="mt-8 text-sm font-bold text-acc-ter uppercase">
              {{ project.category }}
            </p>
            <h1
              class="mt-4 max-w-4xl text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl"
            >
              {{ project.name }}
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-8 text-fg-sec sm:text-lg">
              {{ description }}
            </p>

            <div class="mt-7 flex flex-wrap gap-3">
              <TheButton
                v-if="project.liveUrl"
                variant="primary"
                @click="openExternal(project.liveUrl)"
              >
                Visit Site
              </TheButton>
              <TheButton
                variant="secondary"
                @click="openExternal(project.gitHub)"
              >
                View Code
              </TheButton>
            </div>

            <dl class="mt-8 grid gap-3 sm:grid-cols-2">
              <div
                v-for="fact in projectFacts"
                :key="fact.label"
                class="rounded-lg border border-brdr bg-bg-sec/70 p-4"
              >
                <dt class="text-tiny font-bold text-fg-ter uppercase">{{ fact.label }}</dt>
                <dd class="mt-2 text-sm leading-5 font-bold text-fg-prim">{{ fact.value }}</dd>
              </div>
            </dl>
          </div>

          <div>
            <figure
              class="overflow-hidden rounded-lg border border-brdr bg-bg-sec shadow-2xl shadow-black/25"
            >
              <div class="flex min-h-10 items-center justify-between border-b border-brdr px-3">
                <div
                  class="flex gap-1.5"
                  aria-hidden="true"
                >
                  <span class="size-2 rounded-sm bg-red" />
                  <span class="size-2 rounded-sm bg-acc-sec" />
                  <span class="size-2 rounded-sm bg-acc-ter" />
                </div>
                <span class="truncate text-tiny font-bold text-fg-ter uppercase">
                  {{ project.eyebrow }}
                </span>
              </div>

              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.imageAlt"
                class="aspect-video w-full object-cover"
              />
              <div
                v-else
                class="grid min-h-72 place-items-center p-6"
              >
                <p class="text-center text-lg font-bold text-acc-prim">
                  {{ project.eyebrow }}
                </p>
              </div>
            </figure>

            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex min-h-20 items-center justify-between gap-4 rounded-lg border border-brdr bg-bg-sec/70 p-4 hover:border-acc-prim"
              >
                <span>
                  <span class="block text-tiny font-bold text-fg-ter uppercase">Live path</span>
                  <span class="mt-1 block text-sm font-bold text-fg-prim">Open project</span>
                </span>
                <ArrowTopRightOnSquareIcon class="size-5 text-acc-prim" />
              </a>
              <a
                :href="project.gitHub"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex min-h-20 items-center justify-between gap-4 rounded-lg border border-brdr bg-bg-sec/70 p-4 hover:border-acc-sec"
              >
                <span>
                  <span class="block text-tiny font-bold text-fg-ter uppercase">Source</span>
                  <span class="mt-1 block text-sm font-bold text-fg-prim">Read the code</span>
                </span>
                <CodeBracketIcon class="size-5 text-acc-sec" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-bg-sec px-6 py-16 sm:px-8 sm:py-20">
        <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_22rem]">
          <div class="grid gap-5">
            <header>
              <p class="text-sm font-bold text-acc-prim uppercase">Project brief</p>
              <h2 class="mt-3 text-3xl font-bold">
                What changed, what shipped, and why it matters
              </h2>
            </header>

            <section
              v-for="section in sections"
              :key="section.label"
              class="rounded-lg border border-brdr bg-bg-prim p-5 sm:p-6"
            >
              <h2 class="text-sm font-bold text-acc-prim uppercase">
                {{ section.label }}
              </h2>
              <p class="mt-3 text-base leading-8 text-fg-sec">
                {{ section.body }}
              </p>
            </section>
          </div>

          <aside class="self-start rounded-lg border border-brdr bg-bg-prim p-5">
            <div class="flex items-center gap-3">
              <RectangleStackIcon class="size-6 text-acc-prim" />
              <h2 class="text-lg font-bold">Project stack</h2>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              <HomeTechBadge
                v-for="tech in project.stack"
                :key="tech"
                :name="tech"
                compact
              />
            </div>

            <h2 class="mt-8 text-lg font-bold">Responsibilities</h2>
            <ul class="mt-4 grid gap-2">
              <li
                v-for="item in project.responsibilities"
                :key="item"
                class="border-b border-brdr pb-2 text-sm text-fg-sec last:border-b-0 last:pb-0"
              >
                {{ item }}
              </li>
            </ul>

            <h2 class="mt-8 text-lg font-bold">Signals</h2>
            <div class="mt-4 grid gap-3">
              <section
                v-for="signal in projectSignals"
                :key="signal.label"
                class="border-b border-brdr pb-3 last:border-b-0 last:pb-0"
              >
                <h3 class="text-tiny font-bold text-acc-sec uppercase">{{ signal.label }}</h3>
                <p class="mt-1 text-sm leading-6 text-fg-sec">{{ signal.body }}</p>
              </section>
            </div>
          </aside>
        </div>
      </section>

      <section class="px-6 py-16 sm:px-8 sm:py-20">
        <div class="mx-auto max-w-7xl">
          <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p class="text-sm font-bold text-acc-prim uppercase">Keep browsing</p>
              <h2 class="mt-3 text-2xl font-bold">More project pages</h2>
            </div>
            <NuxtLink
              to="/#archive-title"
              class="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-acc-prim uppercase"
            >
              Full archive
              <ArrowTopRightOnSquareIcon class="size-4" />
            </NuxtLink>
          </div>
          <div class="mt-6 grid gap-4 md:grid-cols-3">
            <NuxtLink
              v-for="related in relatedProjects"
              :key="related.id"
              :to="related.path"
              class="group overflow-hidden rounded-lg border border-brdr bg-bg-sec hover:border-acc-prim"
            >
              <div class="aspect-16/10 overflow-hidden bg-bg-ter">
                <img
                  v-if="related.image"
                  :src="related.image"
                  :alt="related.imageAlt"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div class="p-5">
                <p class="text-xs font-bold text-acc-sec uppercase">
                  {{ related.category }}
                </p>
                <h3 class="mt-3 text-xl font-bold">{{ related.name }}</h3>
                <p class="mt-2 text-sm leading-6 text-fg-sec">
                  {{ related.seoDescription || related.summary }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>
