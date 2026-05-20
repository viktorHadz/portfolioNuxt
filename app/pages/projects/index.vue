<script setup>
import {
  ArrowLeftIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from '@heroicons/vue/24/outline'
import ManFloppy from '~/components/home/archive/ManFloppy.vue'
import { allProjects } from '~/data/portfolio/projects'

definePageMeta({
  sitemap: {
    images: [{ loc: '/og-image-bits-by-vik.png' }],
  },
})

const site = useSiteConfig()
const title = 'Projects by Viktor Hadzhiyski'
const socialTitle = `${title} | ${site.name || 'Bits By Vik'}`
const description =
  'Projects by Viktor Hadzhiyski, a London full-stack developer building production apps, marketing sites, and tools with Go, Vue, React, Node, and Nuxt.'
const canonical = withSiteUrl('/projects')
const socialImage = withSiteUrl(site.seoImage || '/og-image-bits-by-vik.png')
const pageIntro =
  'Every project page lives here, from production client work to smaller experiments, tools, and side builds that shape my portfolio.'
const actionClass =
  'inline-flex min-h-10 items-center gap-2 rounded-lg border border-brdr px-3 text-xs font-bold text-fg-prim transition hover:border-acc-prim hover:text-acc-prim'

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
    ogImageAlt: 'Bits By Vik projects overview',
    twitterCard: 'summary_large_image',
    twitterImage: socialImage,
  })
}

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [
    {
      key: 'projects-structured-data',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'Featured work and smaller projects',
            url: canonical.value,
            description: pageIntro,
          },
          {
            '@type': 'ItemList',
            itemListElement: allProjects.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'CreativeWork',
                name: project.name,
                url: withSiteUrl(project.path).value,
              },
            })),
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <main class="min-h-screen bg-bg-prim text-fg-prim">
    <section class="relative isolate overflow-hidden px-6 pt-20 pb-14 sm:px-8 sm:pt-28">
      <div class="absolute inset-0 bg-stars opacity-50" />

      <div
        class="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center"
      >
        <div>
          <NuxtLink
            to="/"
            class="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-acc-prim uppercase"
          >
            <ArrowLeftIcon class="size-4" />
            Back to portfolio
          </NuxtLink>

          <p class="mt-8 text-sm font-bold text-acc-ter uppercase">All projects</p>
          <h1
            class="mt-4 max-w-4xl text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl"
          >
            Featured work and smaller projects
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-8 text-fg-sec sm:text-lg">
            Every project page lives here, from production client work to smaller experiments,
            tools, and side builds that shape my portfolio.
          </p>
        </div>

        <div class="relative mx-auto w-full max-w-md">
          <div class="pointer-events-none absolute inset-0 grid place-items-center">
            <div class="size-72 rounded-full border border-acc-prim/10 sm:size-96" />
            <div
              class="absolute size-56 rounded-full border border-dashed border-acc-prim/15 sm:size-80"
            />
          </div>

          <ManFloppy class="relative z-10 w-full" />
        </div>
      </div>
    </section>

    <section class="bg-bg-sec px-6 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-7xl">
        <div class="grid gap-4">
          <article
            v-for="project in allProjects"
            :key="project.id"
            class="group overflow-hidden rounded-lg border border-brdr bg-bg-prim p-5 transition hover:border-acc-prim"
          >
            <div class="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div class="min-w-0 flex-1">
                <NuxtLink
                  :to="project.path"
                  class="text-2xl leading-tight font-bold tracking-tight text-fg-prim transition group-hover:text-acc-prim"
                >
                  {{ project.name }}
                </NuxtLink>
                <p class="mt-3 text-sm leading-6 text-acc-ter">
                  {{ project.eyebrow }}
                </p>
                <p class="mt-3 max-w-3xl text-sm leading-6 text-fg-sec">
                  {{ project.seoDescription || project.summary }}
                </p>
              </div>

              <div class="flex flex-wrap gap-2 lg:justify-end">
                <NuxtLink :to="project.path" :class="actionClass">
                  <ArrowRightStartOnRectangleIcon class="size-4" />
                  Project
                </NuxtLink>

                <NuxtLink
                  v-if="project.liveUrl"
                  :to="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="actionClass"
                >
                  <ArrowTopRightOnSquareIcon class="size-4" />
                  Live
                </NuxtLink>

                <NuxtLink
                  :to="project.gitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="actionClass"
                >
                  <CodeBracketIcon class="size-4" />
                  Code
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
