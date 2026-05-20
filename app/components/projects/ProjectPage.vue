<script setup>
import { computed } from 'vue'
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  Square3Stack3DIcon,
} from '@heroicons/vue/24/outline'
import { useHead, useRoute, useSeoMeta, withSiteUrl } from '#imports'
import { allProjects, isFeaturedProject } from '~/data/portfolio/projects'

const props = defineProps({ project: { type: Object, required: true } })

const site = useSiteConfig()
const route = useRoute()
const featuredProject = computed(() => (isFeaturedProject(props.project) ? props.project : null))
const canonical = withSiteUrl(props.project.path)
const title = computed(() => props.project.seoTitle || props.project.name)
const socialTitle = computed(() => `${title.value} | ${site.name || 'Bits By Vik'}`)
const description = computed(
  () => featuredProject.value?.intro || props.project.seoDescription || props.project.summary,
)
const seoImagePath = computed(
  () =>
    route.meta.sitemap?.images?.[0]?.loc ||
    props.project.image ||
    site.seoImage ||
    '/og-image-bits-by-vik.png',
)
const socialImage = withSiteUrl(seoImagePath)
const primaryStack = computed(() => props.project.stack.slice(0, 3).join(' / '))
const sections = computed(() => {
  if (featuredProject.value) return featuredProject.value.storySections
  if (props.project.storySections?.length) return props.project.storySections

  return [
    { title: 'Overview', body: props.project.summary },
    {
      title: 'Build shape',
      body: `A focused ${props.project.eyebrow.toLowerCase()} built with ${props.project.stack.slice(0, 3).join(', ')} around a clear user workflow and production-minded delivery.`,
    },
    {
      title: 'What it shows',
      body: `This project shows ${props.project.responsibilities.slice(0, 3).join(', ').toLowerCase()} work in a compact, reviewable build.`,
    },
  ]
})
const projectFacts = computed(() => {
  if (featuredProject.value) return featuredProject.value.facts
  if (props.project.facts?.length) return props.project.facts

  return [
    { label: 'Type', value: props.project.eyebrow },
    { label: 'Main stack', value: primaryStack.value },
    { label: 'Scope', value: props.project.responsibilities.slice(0, 3).join(', ') },
    { label: 'Status', value: props.project.liveUrl ? 'Live project' : 'Source available' },
  ]
})
const projectSignals = computed(() => [
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
  { label: 'Project signal', body: props.project.seoDescription || props.project.summary },
])
const detailHeading = computed(() =>
  featuredProject.value?.pageVariant === 'marketing'
    ? 'How the site guides people and stays reliable'
    : 'How the work is shaped and why it matters',
)
const proofPoints = computed(
  () => featuredProject.value?.proofPoints || props.project.proofPoints || [],
)
const relatedProjects = computed(() =>
  allProjects.filter((project) => project.id !== props.project.id).slice(0, 3),
)
const structuredData = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: props.project.name,
        url: canonical.value,
        description: description.value,
      },
      {
        '@type': 'CreativeWork',
        name: props.project.name,
        url: canonical.value,
        description: description.value,
        genre: props.project.eyebrow,
        image: socialImage.value,
        sameAs: [props.project.liveUrl, props.project.gitHub].filter(Boolean),
      },
    ],
  }),
)

function openExternal(url) {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

if (import.meta.server) {
  useSeoMeta({
    title,
    ogTitle: socialTitle,
    twitterTitle: socialTitle,
    description,
    ogDescription: description,
    twitterDescription: description,
    ogType: 'website',
    ogUrl: canonical,
    ogImage: socialImage,
    ogImageAlt: computed(() => props.project.imageAlt || `${props.project.name} project preview`),
    twitterCard: 'summary_large_image',
    twitterImage: socialImage,
  })
}

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [
    { key: 'project-structured-data', type: 'application/ld+json', innerHTML: structuredData },
  ],
})
</script>

<template>
  <main class="min-h-screen bg-bg-prim text-fg-prim">
    <article>
      <section class="relative isolate overflow-hidden px-6 pt-20 pb-14 sm:px-8 sm:pt-28">
        <div class="absolute inset-0 bg-stars opacity-50" />

        <div
          class="relative z-10 mx-auto mb-20 grid max-w-7xl gap-10 lg:mb-40 lg:grid-cols-[1fr_0.82fr]"
        >
          <div>
            <NuxtLink
              to="/"
              class="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-acc-prim uppercase"
            >
              <ArrowLeftIcon class="size-4" />
              Back to portfolio
            </NuxtLink>
            <HandleBar :txt="project.category" class="mt-8" />

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
              <TheButton variant="secondary" @click="openExternal(project.gitHub)">
                View Code
              </TheButton>
            </div>

            <dl class="mt-8 grid gap-6 sm:grid-cols-2">
              <div
                v-for="fact in projectFacts"
                :key="fact.label"
                class="rounded-lg bg-bg-sec/60 p-4 ring-2 ring-brdr-subtle"
              >
                <dt class="text-tiny font-bold text-fg-ter uppercase">{{ fact.label }}</dt>
                <dd class="mt-2 text-sm leading-5 font-bold text-fg-prim">{{ fact.value }}</dd>
              </div>
            </dl>
          </div>

          <div>
            <figure
              class="overflow-hidden rounded-lg bg-bg-sec/60 shadow-2xl ring-4 shadow-black/25 ring-brdr-subtle"
            >
              <div
                class="flex min-h-10 items-center justify-between border-b-2 border-brdr-subtle px-3"
              >
                <div class="flex gap-1.5" aria-hidden="true">
                  <span class="size-2 rounded-sm bg-red" />
                  <span class="size-2 rounded-sm bg-yellow" />
                  <span class="size-2 rounded-sm bg-acc-prim" />
                </div>
                <span class="truncate text-tiny font-bold text-fg-sec uppercase">
                  {{ project.eyebrow }}
                </span>
              </div>

              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.imageAlt"
                class="aspect-video w-full object-cover"
              />
              <div v-else class="grid min-h-72 place-items-center p-6">
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
                class="group flex min-h-20 items-center justify-between gap-4 rounded-lg bg-bg-sec/60 p-4 ring-2 ring-brdr hover:ring-acc-prim"
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
                class="group flex min-h-20 items-center justify-between gap-4 rounded-lg bg-bg-sec/60 p-4 ring-2 ring-brdr-subtle hover:ring-acc-sec/80"
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
        <SectionDivider colour="text-bg-sec" position="bottom" class="mt-20" />
      </section>

      <section class="relative isolate overflow-hidden bg-bg-sec px-6 pt-20 pb-14 sm:px-8 sm:py-28">
        <div class="mx-auto mb-20 grid max-w-7xl gap-8 lg:mb-36 lg:grid-cols-[1fr_22rem]">
          <div class="grid gap-5">
            <header>
              <HandleBar txt="Project brief" />
              <h2 class="mt-3 text-3xl font-bold">
                {{ detailHeading }}
              </h2>
            </header>

            <section
              v-for="section in sections"
              :key="section.title"
              class="rounded-lg bg-bg-prim p-5 ring-2 ring-brdr-subtle sm:p-6"
            >
              <h2 class="text-sm font-bold text-acc-prim uppercase">
                {{ section.title }}
              </h2>
              <p class="mt-3 text-base leading-8 text-fg-sec">
                {{ section.body }}
              </p>
            </section>
          </div>

          <aside class="self-start rounded-lg bg-bg-prim p-5 ring-2 ring-brdr-subtle">
            <div class="flex items-center gap-3">
              <Square3Stack3DIcon class="size-6 text-acc-prim" />
              <h2 class="text-lg font-bold">Project stack</h2>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              <TechBadge v-for="tech in project.stack" :key="tech" :name="tech" compact />
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

            <template v-if="proofPoints.length">
              <h2 class="mt-8 text-lg font-bold">Proof points</h2>
              <ul class="mt-4 grid gap-3">
                <li
                  v-for="point in proofPoints"
                  :key="point"
                  class="flex items-start gap-3 border-b border-brdr pb-3 text-sm leading-6 text-fg-sec last:border-b-0 last:pb-0"
                >
                  <CheckCircleIcon class="mt-0.5 size-5 shrink-0 text-acc-prim" />
                  <span>{{ point }}</span>
                </li>
              </ul>
            </template>

            <template v-else>
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
            </template>
          </aside>
        </div>
        <SectionDivider colour="text-bg-prim" position="bottom" :flip="true" />
      </section>

      <section v-if="$slots.demo" class="bg-bg-prim px-6 py-16 sm:px-8 sm:py-20">
        <div class="mx-auto max-w-7xl">
          <header class="max-w-3xl">
            <p class="text-3xl font-bold text-acc-prim uppercase">Project demo</p>
            <p class="mt-3 text-base leading-8 text-fg-sec">
              An interactive slice of the project, embedded directly for you to try.
            </p>
          </header>

          <div class="mt-6 rounded-lg border border-brdr bg-bg-sec/60 p-4 sm:p-6">
            <slot name="demo" />
          </div>
        </div>
      </section>

      <section class="relative px-6 py-16 sm:px-8 sm:py-20">
        <div class="absolute inset-0 bg-stars opacity-50" />
        <div class="isolate mx-auto max-w-7xl">
          <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p class="text-sm font-bold text-acc-prim uppercase">Keep browsing</p>
              <h2 class="mt-3 text-2xl font-bold">More project pages</h2>
            </div>
            <NuxtLink
              to="/projects"
              class="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-acc-prim uppercase"
            >
              All projects
              <ArrowTopRightOnSquareIcon class="size-4" />
            </NuxtLink>
          </div>
          <div class="mt-6 grid gap-6 md:grid-cols-3">
            <NuxtLink
              v-for="related in relatedProjects"
              :key="related.id"
              :to="related.path"
              class="group overflow-hidden rounded-lg bg-bg-sec ring-2 ring-brdr hover:ring-acc-prim"
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
