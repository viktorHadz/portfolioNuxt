<script setup>
import { portfolioContent } from './portfolioContent'
</script>

<template>
  <section
    id="contact"
    class="relative isolate overflow-hidden bg-bg-prim py-20 text-fg-prim sm:py-28"
    aria-labelledby="contact-title"
  >
    <div
      class="bg-stars absolute inset-0 opacity-50"
      aria-hidden="true"
    />
    <svg
      class="pointer-events-none absolute inset-0 h-full w-full opacity-45"
      viewBox="0 0 1200 780"
      aria-hidden="true"
    >
      <g
        class="portfolio-contact-signal"
        fill="none"
      >
        <circle
          class="portfolio-portal-ring"
          cx="940"
          cy="370"
          r="170"
          stroke="#a3d920"
          stroke-width="2"
          stroke-dasharray="18 16"
        />
        <circle
          class="portfolio-portal-ring"
          cx="940"
          cy="370"
          r="94"
          stroke="#ffeb58"
          stroke-width="1.5"
          stroke-dasharray="8 14"
        />
        <path
          d="M130 600 C320 460 480 580 650 380 C775 230 900 240 1080 160"
          stroke="#4aa3ff"
          stroke-width="1.5"
          stroke-dasharray="6 14"
        />
      </g>
    </svg>

    <div class="relative mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-2">
      <div class="portfolio-reveal">
        <p class="text-sm font-bold text-acc-prim uppercase">Journey route</p>
        <h2 class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl">
          From automation to live client software
        </h2>

        <div class="relative mt-10">
          <div
            class="absolute top-0 bottom-0 left-4 w-px bg-brdr"
            aria-hidden="true"
          />
          <ol class="space-y-5">
            <li
              v-for="item in portfolioContent.journey"
              :key="item.year"
              class="relative grid gap-4 pl-12"
            >
              <div
                class="absolute top-5 left-0 size-8 rounded-lg shadow-lg"
                aria-hidden="true"
              >
                <p class="text-sm font-bold text-acc-prim">{{ item.year }}</p>
              </div>
              <article class="rounded-lg border border-brdr bg-bg-sec/80 p-5">
                <h3 class="mt-2 text-xl font-bold">{{ item.title }}</h3>
                <p class="mt-2 text-sm leading-6 text-fg-sec">
                  {{ item.body }}
                </p>
              </article>
            </li>
          </ol>
        </div>
      </div>

      <aside
        class="portfolio-contact-panel relative isolate self-start rounded-lg border border-brdr bg-bg-sec/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-8 lg:sticky lg:top-28"
      >
        <DecorField />
        <p class="text-sm font-bold text-acc-sec uppercase">Contact</p>
        <h2
          id="contact-title"
          class="mt-3 text-2xl leading-tight font-bold text-balance sm:text-3xl"
        >
          {{ portfolioContent.contact.heading }}
        </h2>
        <p class="mt-5 text-base leading-7 text-fg-sec">
          {{ portfolioContent.contact.body }}
        </p>

        <div class="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <button
            v-for="action in portfolioContent.contact.actions"
            :key="action"
            type="button"
            class="inline-flex min-h-11 items-center justify-between rounded-lg border border-brdr bg-bg-prim px-4 py-3 text-sm font-bold text-fg-sec"
          >
            <span>{{ action }}</span>
          </button>
        </div>
      </aside>
    </div>
  </section>
</template>
