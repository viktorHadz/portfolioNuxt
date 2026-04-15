<script setup>
import { portfolioContent } from './portfolioContent'
import PortfolioTechBadge from './PortfolioTechBadge.vue'
</script>

<template>
  <section
    id="featured-work"
    class="bg-bg-prim py-20 text-fg-prim sm:py-28"
    aria-labelledby="featured-work-title"
  >
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <header class="max-w-3xl">
        <p class="text-sm font-bold text-acc-prim uppercase">Featured work</p>
        <h2
          id="featured-work-title"
          class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
        >
          Live products, paid client work, and the stack behind them
        </h2>
        <p class="mt-4 text-base leading-7 text-fg-sec sm:text-lg">
          These are not toy screenshots. They are projects shaped around real workflows, real
          clients, and software that has to behave once it is online.
        </p>
      </header>

      <div class="mt-12 grid gap-6 lg:gap-8">
        <article
          v-for="project in portfolioContent.featuredProjects"
          :id="project.id"
          :key="project.id"
          class="grid gap-7 rounded-lg border border-brdr bg-bg-sec p-5 shadow-lg shadow-black/10 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)] lg:items-center lg:gap-8"
        >
          <div>
            <p class="text-sm font-bold text-acc-ter uppercase">
              {{ project.eyebrow }}
            </p>
            <h3 class="mt-3 text-2xl font-bold sm:text-3xl">
              {{ project.name }}
            </h3>

            <dl class="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              <div class="border-t border-brdr pt-4">
                <dt class="text-xs font-bold text-acc-prim uppercase">Problem</dt>
                <dd class="mt-2 text-base leading-7 text-fg-sec">
                  {{ project.problem }}
                </dd>
              </div>
              <div class="border-t border-brdr pt-4">
                <dt class="text-xs font-bold text-acc-prim uppercase">What I built</dt>
                <dd class="mt-2 text-base leading-7 text-fg-sec">
                  {{ project.built }}
                </dd>
              </div>
              <div class="border-t border-brdr pt-4">
                <dt class="text-xs font-bold text-acc-prim uppercase">Result</dt>
                <dd class="mt-2 text-base leading-7 text-fg-sec">
                  {{ project.result }}
                </dd>
              </div>
            </dl>

            <p
              v-if="project.access"
              class="mt-6 rounded-lg border border-acc-sec/40 bg-bg-prim px-4 py-3 text-sm leading-6 font-bold text-fg-prim"
            >
              {{ project.access }}
            </p>

            <div class="mt-6">
              <p class="text-sm font-bold text-fg-prim">Stack</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <PortfolioTechBadge
                  v-for="tech in project.stack"
                  :key="tech"
                  :name="tech"
                />
              </div>
            </div>
          </div>

          <aside
            class="overflow-hidden rounded-lg border border-brdr bg-bg-prim"
            :aria-label="`${project.name} app panel`"
          >
            <div class="flex items-center justify-between gap-3 border-b border-brdr px-4 py-3">
              <div
                class="flex gap-2"
                aria-hidden="true"
              >
                <span class="size-2 rounded-sm bg-red" />
                <span class="size-2 rounded-sm bg-acc-sec" />
                <span class="size-2 rounded-sm bg-acc-ter" />
              </div>
              <span class="truncate text-tiny font-bold text-fg-ter uppercase">
                {{ project.id }}
              </span>
            </div>

            <div class="p-4 sm:p-5">
              <div class="flex flex-wrap items-start justify-between gap-3 sm:items-center">
                <div>
                  <p class="mt-2 text-2xl leading-tight font-bold sm:mt-0">
                    {{ project.name }}
                  </p>
                </div>
                <div class="flex gap-2">
                  <NuxtLink
                    :to="project.path"
                    class="rounded-lg bg-acc-prim px-3 py-1.5 text-xs font-bold text-bg-prim"
                  >
                    More Info
                  </NuxtLink>
                  <NuxtLink
                    :to="project.path"
                    class="rounded-lg bg-acc-prim px-3 py-1.5 text-xs font-bold text-bg-prim"
                  >
                    Link
                  </NuxtLink>
                  <NuxtLink
                    :to="project.gitHub"
                    class="rounded-lg bg-acc-prim px-3 py-1.5 text-xs font-bold text-bg-prim"
                  >
                    GitHub
                  </NuxtLink>
                </div>
              </div>

              <div class="mt-5 grid grid-cols-2 border-y border-brdr">
                <div class="border-r border-brdr py-4 pr-3">
                  <p class="text-xs font-bold text-fg-ter uppercase">Scope</p>
                  <p class="mt-2 text-lg font-bold">
                    {{ project.responsibilities.length }}
                  </p>
                </div>
                <div class="py-4 pl-3">
                  <p class="text-xs font-bold text-fg-ter uppercase">Stack</p>
                  <p class="mt-2 text-lg font-bold">
                    {{ project.stack.length }}
                  </p>
                </div>
              </div>

              <div class="mt-5">
                <p class="text-sm font-bold text-fg-prim">Workflow modules</p>
                <ul class="mt-3 grid gap-2">
                  <li
                    v-for="item in project.responsibilities"
                    :key="item"
                    class="flex items-center justify-between gap-3 border-b border-brdr pb-2 last:border-b-0 last:pb-0"
                  >
                    <span class="text-sm text-fg-sec">{{ item }}</span>
                    <span class="size-2 shrink-0 rounded-sm bg-acc-ter" />
                  </li>
                </ul>
              </div>

              <div class="mt-5">
                <p class="text-sm font-bold text-fg-prim">Core tools</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.stack.slice(0, 4)"
                    :key="tech"
                    class="rounded-lg border border-brdr bg-bg-sec px-3 py-1.5 text-xs font-bold text-fg-sec"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </div>
  </section>
</template>
