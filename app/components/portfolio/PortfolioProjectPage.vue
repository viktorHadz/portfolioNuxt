<script setup>
import { computed } from 'vue'
import { useHead, useSeoMeta, withSiteUrl } from '#imports'
import { allProjects } from './portfolioContent'
import PortfolioTechBadge from './PortfolioTechBadge.vue'

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
const sections = computed(() => {
  if (props.project.problem || props.project.built || props.project.result) {
    return [
      { label: 'Problem', body: props.project.problem },
      { label: 'What I built', body: props.project.built },
      { label: 'Result', body: props.project.result },
    ].filter((section) => section.body)
  }

  return [
    { label: 'Overview', body: props.project.summary },
    {
      label: 'Build shape',
      body: `A focused ${props.project.stack.slice(0, 3).join(', ')} project built around a clear user workflow and production-minded delivery.`,
    },
  ]
})
const relatedProjects = computed(() =>
  allProjects.filter((project) => project.id !== props.project.id).slice(0, 3),
)

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
      <section class="px-6 pt-20 pb-14 sm:px-8 sm:pt-28">
        <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <NuxtLink
              to="/"
              class="inline-flex min-h-10 items-center text-sm font-bold text-acc-prim uppercase"
            >
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
          </div>

          <figure
            v-if="project.image"
            class="overflow-hidden rounded-lg border border-brdr bg-bg-sec"
          >
            <img
              :src="project.image"
              :alt="project.imageAlt"
              class="aspect-video w-full object-cover"
            />
          </figure>
          <div
            v-else
            class="grid min-h-72 place-items-center rounded-lg border border-brdr bg-bg-sec p-6"
          >
            <p class="text-center text-lg font-bold text-acc-prim">
              {{ project.eyebrow }}
            </p>
          </div>
        </div>
      </section>

      <section class="bg-bg-sec px-6 py-16 sm:px-8 sm:py-20">
        <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_22rem]">
          <div class="grid gap-5">
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
            <h2 class="text-lg font-bold">Project stack</h2>
            <div class="mt-4 flex flex-wrap gap-2">
              <PortfolioTechBadge
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
          </aside>
        </div>
      </section>

      <section class="px-6 py-16 sm:px-8 sm:py-20">
        <div class="mx-auto max-w-7xl">
          <h2 class="text-2xl font-bold">More project pages</h2>
          <div class="mt-6 grid gap-4 md:grid-cols-3">
            <NuxtLink
              v-for="related in relatedProjects"
              :key="related.id"
              :to="related.path"
              class="rounded-lg border border-brdr bg-bg-sec p-5 hover:border-acc-prim"
            >
              <p class="text-xs font-bold text-acc-sec uppercase">
                {{ related.category }}
              </p>
              <h3 class="mt-3 text-xl font-bold">{{ related.name }}</h3>
              <p class="mt-2 text-sm leading-6 text-fg-sec">
                {{ related.seoDescription || related.summary }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>
