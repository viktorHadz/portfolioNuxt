<script setup>
import { archiveProjects } from '~/data/portfolio/projects'
import ArchiveOrbitCard from './archive/ArchiveOrbitCard.vue'
import ManFloppy from './archive/ManFloppy.vue'
import sadFaceArt from './archive/art/ArchiveArtSadFace.vue'
import {
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from '@heroicons/vue/24/outline'
import asciiArt from './archive/art/ArchiveArtAscii.vue'
import fuklaArt from './archive/art/ArchiveArtFukla.vue'
import surveyArt from './archive/art/ArchiveArtSurvey.vue'
import cprintArt from './archive/art/ArchiveArtCprint.vue'

const actionClass =
  'inline-flex min-h-10 items-center gap-2 rounded-lg border border-brdr px-3 text-xs font-bold text-fg-prim transition hover:border-acc-prim hover:text-acc-prim'

const orbitArtById = {
  'ascii-generator': asciiArt,
  'survey-generator': surveyArt,
  fukla: fuklaArt,
  cprint: cprintArt,
}

function getOrbitMeta(project) {
  return project.year || project.date?.slice(0, 4) || '2023'
}

function getOrbitArt(id) {
  return orbitArtById[id]
}

function getCoreStack(project) {
  return project.stack[1] ? `${project.stack[0]} + ${project.stack[1]}` : project.stack[0]
}

function findArchiveProject(id) {
  const project = archiveProjects.find((entry) => entry.id === id)
  if (!project) throw new Error(`Missing archive project: ${id}`)
  return project
}

function createOrbitProject(id, position, left = false) {
  const project = findArchiveProject(id)

  return {
    id: project.id,
    title: project.name,
    copy: project.eyebrow,
    meta: getOrbitMeta(project),
    art: getOrbitArt(id),
    position,
    left,
  }
}

const orbitItems = [
  createOrbitProject('ascii-generator', 'lg:-left-8 lg:top-2', true),
  createOrbitProject('survey-generator', 'lg:-right-0 lg:top-6'),
  createOrbitProject('fukla', 'lg:-left-10 lg:bottom-16', true),
  createOrbitProject('cprint', 'lg:-right-24 lg:top-52'),

  {
    id: 'project-purgatory',
    title: 'Project Purgatory',
    copy: 'Million dollar start up',
    meta: 'WIP',
    art: sadFaceArt,
    position: 'lg:-right-6 lg:bottom-16',
  },
]
</script>

<template>
  <section
    id="archive"
    class="relative isolate overflow-hidden bg-bg-prim py-20 text-fg-prim sm:py-44"
    aria-labelledby="archive-title"
  >
    <div class="absolute inset-0 bg-stars opacity-50" />
    <SectionDivider colour="text-bg-sec" position="top" flip />

    <div class="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8">
      <div class="grid gap-12 md:grid-cols-12 lg:items-center">
        <header class="portfolio-reveal md:col-span-4">
          <HandleBar txt="Project archive" />

          <h2
            id="archive-title"
            class="mt-3 text-5xl leading-none font-bold tracking-tighter text-balance sm:text-6xl lg:text-7xl"
          >
            Archive
            <br />
            <span class="text-grad-top text-shadow-lg/20 text-shadow-acc-prim/50">projects</span>
          </h2>

          <p class="mt-5 max-w-sm text-base leading-7 text-fg-sec">
            Ideas I couldn't let go of. Smaller builds, experiments, and client pieces that shaped
            the work that matters.
          </p>
          <TheButton href="/projects" class="mt-8">Browse projects</TheButton>
        </header>

        <div class="portfolio-reveal md:col-span-8">
          <div
            class="relative mx-auto aspect-square w-full max-w-md overflow-hidden sm:max-w-lg lg:aspect-auto lg:min-h-135 lg:max-w-none lg:overflow-visible"
          >
            <div class="pointer-events-none absolute inset-0 grid place-items-center">
              <div class="size-72 rounded-full border border-acc-prim/10 sm:size-96 lg:size-120" />
              <div
                class="absolute size-56 rounded-full border border-dashed border-acc-prim/15 sm:size-80 lg:size-96"
              />
              <div
                class="absolute h-px w-11/12 rotate-12 bg-linear-to-r from-transparent via-acc-prim/20 to-transparent lg:w-160"
              />
              <div
                class="absolute h-px w-10/12 -rotate-24 bg-linear-to-r from-transparent via-acc-prim/10 to-transparent lg:w-150"
              />
            </div>

            <ManFloppy
              class="pointer-events-none absolute top-1/2 left-1/2 z-20 w-11/12 max-w-sm -translate-x-1/2 -translate-y-1/2 sm:max-w-md xl:max-w-lg"
            />

            <div class="relative z-30 hidden min-h-135 lg:block">
              <ArchiveOrbitCard
                v-for="item in orbitItems"
                :key="item.id"
                :title="item.title"
                :copy="item.copy"
                :meta="item.meta"
                :art="item.art"
                :left="item.left"
                class="absolute"
                :class="item.position"
                :aria-hidden="Boolean(item.art)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="project in archiveProjects"
          :key="project.id"
          class="portfolio-archive-item group relative overflow-hidden rounded-xl border border-acc-prim/20 bg-bg-sec/60 p-4 shadow-xl shadow-black/15 hover:border-acc-prim/60"
        >
          <div
            class="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full border border-acc-prim/10"
          />
          <div
            class="pointer-events-none absolute top-8 -right-8 size-20 rounded-full border border-dashed border-acc-prim/10"
          />

          <div class="relative flex h-full flex-col">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="mt-3 text-2xl leading-tight font-bold tracking-tight">
                  {{ project.name }}
                </h3>
              </div>

              <div
                class="grid size-12 shrink-0 place-items-center rounded-lg border border-brdr bg-bg-sec text-acc-prim"
              >
                <component :is="getOrbitArt(project.id)" class="size-10" />
              </div>
            </div>

            <p class="mt-4 text-sm leading-6 text-pretty text-fg-sec">
              {{ project.seoDescription || project.summary }}
            </p>

            <dl class="mt-5 grid gap-2 border-y border-brdr py-4 text-xs">
              <div class="flex justify-between gap-4">
                <dt class="font-bold text-fg-ter uppercase">Focus</dt>
                <dd class="text-right text-fg-sec">{{ project.eyebrow }}</dd>
              </div>

              <div class="flex justify-between gap-4">
                <dt class="font-bold text-fg-ter uppercase">Core</dt>
                <dd class="text-right text-fg-sec">
                  {{ getCoreStack(project) }}
                </dd>
              </div>
            </dl>

            <div class="mt-5 flex flex-wrap gap-2">
              <TechBadge v-for="tech in project.stack" :key="tech" :name="tech" compact />
            </div>

            <div class="mt-auto flex flex-wrap gap-2 pt-6">
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
                v-if="project.gitHub"
                :to="project.gitHub"
                target="_blank"
                rel="noopener noreferrer"
                :class="actionClass"
              >
                <CodeBracketIcon class="size-4" />
                Code
              </NuxtLink>

              <NuxtLink :to="project.path" :class="actionClass">
                <ArrowRightStartOnRectangleIcon class="size-4" />
                More Info
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
