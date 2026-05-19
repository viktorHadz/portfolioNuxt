<script setup>
import SateliteDish from '../contact/SateliteDish.vue'

const contactLinks = [
  {
    no: '01',
    title: 'Direct message',
    text: 'The fastest way to get in touch.',
    icon: 'message',
    href: 'mailto:your@email.com',
  },
  {
    no: '02',
    title: 'View GitHub',
    text: 'Explore code, tools, and experiments.',
    icon: 'github',
    href: 'https://github.com/viktorHadz',
    external: true,
  },
  {
    no: '03',
    title: 'Download CV',
    text: 'My experience, skills, and background.',
    icon: 'cv',
    href: '/Viktor-Hadzhiyski-CV.pdf',
    download: true,
  },
]

const contactMeta = ['Based in London', 'Available for hire', 'Reply within 24hrs']
</script>

<template>
  <section
    id="contact"
    class="relative isolate overflow-hidden bg-bg-sec py-20 text-fg-prim sm:py-28"
    aria-labelledby="contact-title"
  >
    <SectionDivider position="top" colour="text-bg-prim" />

    <div
      class="relative mx-auto grid max-w-7xl items-start gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-12"
    >
      <div class="portfolio-reveal min-w-0">
        <HandleBar txt="Jourey route" />
        <h2
          id="contact-title"
          class="mt-3 max-w-xl text-3xl leading-none font-bold tracking-tighter text-balance sm:text-5xl lg:text-6xl"
        >
          Let's build something
          <br />
          that
          <span class="text-grad-top text-shadow-lg/20 text-shadow-acc-prim/50">ships</span>
        </h2>
        <SateliteDish
          class="z-10 mx-auto mt-8 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:mx-0 lg:mt-10 xl:max-w-3xl"
        />
      </div>

      <aside
        class="portfolio-contact-panel relative w-full max-w-xl min-w-0 justify-self-center lg:justify-self-end lg:pt-10 xl:pt-16"
      >
        <div class="pointer-events-none absolute inset-0 bg-stars opacity-25" />

        <!-- top rail -->
        <div
          class="relative mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p
            class="flex items-center gap-3 font-mono text-xs font-bold tracking-widest text-acc-sec uppercase"
          >
            <span class="size-2 rounded-full bg-acc-sec shadow-lg shadow-acc-sec/40" />
            <span>Transmission hub</span>
          </p>

          <div
            class="relative w-fit px-6 py-2 font-mono text-xs font-bold tracking-wider text-fg-sec uppercase"
          >
            <span class="absolute top-0 left-0 size-3 border-t border-l border-brdr" />
            <span class="absolute top-0 right-0 size-3 border-t border-r border-brdr" />
            <div class="flex items-center">
              <div class="mr-2 size-2 bg-acc-prim" />
              Link: Active
            </div>
          </div>
        </div>

        <!-- action stack -->
        <div class="relative grid gap-3">
          <a
            v-for="link in contactLinks"
            :key="link.title"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noreferrer' : undefined"
            :download="link.download ? '' : undefined"
            class="group relative flex flex-col items-start gap-4 overflow-hidden rounded-lg border border-brdr bg-bg-prim p-4 text-left transition duration-300 hover:border-acc-prim/60 sm:flex-row sm:items-center sm:gap-5 xl:p-5"
          >
            <span
              class="relative grid size-12 shrink-0 place-items-center rounded-lg border border-brdr bg-bg-sec text-acc-prim transition duration-300 group-hover:border-acc-prim/60 group-hover:bg-acc-prim/10 sm:size-16 xl:size-18"
            >
              <!-- message -->
              <svg
                v-if="link.icon === 'message'"
                viewBox="0 0 48 48"
                class="size-8 sm:size-9 xl:size-10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M11 12.5h26a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4H23l-8.5 6v-6H11a4 4 0 0 1-4-4v-15a4 4 0 0 1 4-4Z"
                  fill="currentColor"
                />
                <path
                  d="M17 24h2M24 24h2M31 24h2"
                  stroke="#101114"
                  stroke-width="4"
                  stroke-linecap="round"
                />
              </svg>

              <!-- github -->
              <svg
                v-else-if="link.icon === 'github'"
                viewBox="0 0 48 48"
                class="size-9 sm:size-10 xl:size-11"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M24 5.5C13.5 5.5 5 14 5 24.7c0 8.5 5.5 15.7 13 18.3 1 .2 1.3-.4 1.3-1v-3.5c-5.3 1.2-6.4-2.3-6.4-2.3-.9-2.2-2.1-2.8-2.1-2.8-1.7-1.2.1-1.2.1-1.2 1.9.2 3 2 3 2 1.7 3 4.5 2.1 5.5 1.6.2-1.2.7-2.1 1.2-2.5-4.2-.5-8.7-2.1-8.7-9.5 0-2.1.8-3.8 2-5.2-.2-.5-.9-2.5.2-5.1 0 0 1.7-.5 5.3 2a18.6 18.6 0 0 1 9.8 0c3.7-2.5 5.3-2 5.3-2 1.1 2.6.4 4.6.2 5.1a7.4 7.4 0 0 1 2 5.2c0 7.4-4.5 9-8.7 9.5.7.6 1.3 1.8 1.3 3.6V42c0 .6.3 1.2 1.3 1A19.2 19.2 0 0 0 43 24.7C43 14 34.5 5.5 24 5.5Z"
                  clip-rule="evenodd"
                />
              </svg>

              <!-- cv -->
              <svg
                v-else
                viewBox="0 0 48 48"
                class="size-8 sm:size-9 xl:size-10"
                fill="none"
                aria-hidden="true"
              >
                <path d="M13 6h16l8 8v28H13V6Z" fill="currentColor" />
                <path d="M29 6v9h8" stroke="#101114" stroke-width="3" stroke-linejoin="round" />
                <path
                  d="M18 23h16M18 30h16M18 36h11"
                  stroke="#101114"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </span>

            <span class="min-w-0 flex-1">
              <span class="block font-mono text-xs font-bold text-acc-prim sm:text-sm">
                {{ link.no }}
              </span>

              <span
                class="mt-1 block text-xl leading-tight font-bold tracking-tight text-fg-prim transition duration-300 group-hover:text-acc-prim sm:mt-2 sm:text-2xl xl:text-3xl"
              >
                {{ link.title }}
              </span>

              <span
                class="mt-2 block text-xs leading-5 text-fg-sec sm:mt-3 sm:text-sm sm:leading-6"
              >
                {{ link.text }}
              </span>
            </span>

            <span
              class="grid size-10 shrink-0 place-items-center self-end rounded-full border border-brdr bg-bg-sec text-acc-prim transition duration-300 group-hover:translate-x-1 group-hover:border-acc-prim/70 group-hover:bg-acc-prim/10 sm:size-12 sm:self-auto xl:size-14"
            >
              <svg
                viewBox="0 0 24 24"
                class="size-5 sm:size-6 xl:size-7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        <!-- bottom status rail -->
        <div
          class="relative mt-4 flex flex-col items-center justify-center gap-3 rounded-lg border border-brdr bg-bg-prim px-5 py-4 font-mono text-xs font-bold tracking-wider text-fg-sec uppercase sm:flex-row sm:flex-wrap sm:gap-x-5 xl:gap-x-6"
        >
          <span class="absolute top-3 left-3 size-3 border-t border-l border-acc-prim" />
          <span class="absolute right-3 bottom-3 size-3 border-r border-b border-acc-prim" />

          <template v-for="(item, index) in contactMeta" :key="item">
            <span class="text-center">{{ item }}</span>
            <span
              v-if="index < contactMeta.length - 1"
              class="hidden size-1.5 rounded-full bg-acc-prim sm:block"
            />
          </template>
        </div>
      </aside>
    </div>
  </section>
</template>
