<script setup>
import { ArrowsPointingOutIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import SateliteDish from '../contact/SateliteDish.vue'
import { ChatBubbleLeftEllipsisIcon, DocumentTextIcon } from '@heroicons/vue/24/solid'
import GitHubIcon from './skills/art/GitHubIcon.vue'
import BackgroundArtContact from '../contact/BackgroundArtContact.vue'

const contactState = reactive({ open: false, pending: false, message: '' })
const contactLinks = [
  {
    no: '01',
    title: 'Direct message',
    text: 'The fastest way to get in touch.',
    icon: 'message',
    href: 'mailto:vikecah@gmail.com',
    modal: true,
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

function handleEscape(event) {
  if (event.key === 'Escape' && contactState.open) {
    contactState.open = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
})

async function submitContactForm(event) {
  const form = event.currentTarget
  if (!(form instanceof HTMLFormElement)) return

  contactState.pending = true
  contactState.message = ''
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: Object.fromEntries(new FormData(form).entries()),
    })
    contactState.message = 'Message sent. I will get back to you soon.'
    form.reset()
  } catch (error) {
    contactState.message =
      error?.data?.statusMessage || error?.message || 'Message failed. Please try again shortly.'
  } finally {
    contactState.pending = false
  }
}
</script>

<template>
  <section
    id="contact"
    class="relative isolate overflow-hidden bg-bg-sec py-20 text-fg-prim sm:py-28"
    aria-labelledby="contact-title"
  >
    <SectionDivider position="top" colour="text-bg-prim" />
    <BackgroundArtContact />
    <div
      class="relative mx-auto grid max-w-7xl items-start gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-12"
    >
      <div class="portfolio-reveal min-w-0">
        <HandleBar txt="Get in touch" />
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
            @click="
              link.modal &&
              ($event.preventDefault(), (contactState.open = true), (contactState.message = ''))
            "
          >
            <span
              class="relative grid size-12 shrink-0 place-items-center rounded-lg border border-brdr bg-bg-sec text-acc-prim transition duration-300 group-hover:border-acc-prim/60 group-hover:bg-acc-prim/10 sm:size-16 xl:size-18"
            >
              <!-- message -->
              <ChatBubbleLeftEllipsisIcon
                v-if="link.icon === 'message'"
                class="size-8 sm:size-9 xl:size-10"
              />

              <!-- github -->
              <GitHubIcon v-else-if="link.icon === 'github'" class="size-9 sm:size-10 xl:size-11" />

              <!-- cv -->
              <DocumentTextIcon v-else class="size-8 sm:size-9 xl:size-10" />
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
              class="flex size-10 shrink-0 items-center justify-center self-end rounded-full border border-brdr bg-bg-sec text-acc-prim transition duration-300 group-hover:border-acc-prim/70 group-hover:bg-acc-prim/10 sm:size-12 sm:self-auto xl:size-14"
            >
              <!-- message -->
              <ArrowsPointingOutIcon
                v-if="link.icon === 'message'"
                class="block size-5 origin-center transition duration-300 group-hover:scale-125 sm:size-6 xl:size-7"
              />

              <!-- github / external -->
              <svg
                v-else-if="link.icon === 'github'"
                class="block size-6 overflow-visible sm:size-7 xl:size-8"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g
                  class="transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path
                    d="M8.25 15.75 21 3m0 0h-5.25M21 3v5.25"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>

              <!-- cv / download -->
              <svg
                v-else
                class="block size-6 overflow-hidden sm:size-7 xl:size-8"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <g class="transition duration-500 group-hover:translate-y-6">
                  <path
                    d="M12 3v11m0 0 4-4m-4 4-4-4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>

                <path
                  d="M4 15v3.25A2.75 2.75 0 0 0 6.75 21h10.5A2.75 2.75 0 0 0 20 18.25V15"
                  stroke="currentColor"
                  stroke-width="1.5"
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
    <Teleport to="body">
      <div
        v-if="contactState.open"
        class="fixed inset-0 z-modal flex items-center justify-center bg-black/70 px-4 pt-4 pb-4 sm:p-4"
        @click.self="contactState.open = false"
      >
        <form
          class="max-h-full w-full max-w-xl self-auto overflow-y-auto rounded-2xl border border-brdr bg-bg-sec shadow-2xl shadow-black/40"
          @submit.prevent="submitContactForm"
        >
          <div
            class="flex items-start justify-between gap-4 border-b border-brdr bg-bg-prim/60 px-5 py-5 sm:px-6"
          >
            <div class="min-w-0">
              <p
                class="font-mono text-tiny font-bold tracking-wide text-acc-ter uppercase sm:text-xs"
              >
                Direct message
              </p>
              <h3 class="mt-2 text-2xl leading-tight font-bold text-fg-prim">
                Start the conversation
              </h3>
            </div>
            <button
              type="button"
              class="rounded-lg border border-brdr bg-bg-prim p-2 text-fg-sec hover:border-acc-prim/40 hover:text-acc-prim"
              @click="contactState.open = false"
            >
              <span class="sr-only">Close modal</span>
              <XMarkIcon class="size-5" />
            </button>
          </div>
          <div class="flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
            <p class="text-sm leading-6 text-fg-sec">
              Send the basics here and I will get in touch.
            </p>
            <input
              name="name"
              type="text"
              autocomplete="name"
              placeholder="Your name"
              required
              class="rounded-xl border border-brdr bg-bg-prim px-4 py-3 text-sm text-fg-prim outline-none placeholder:text-fg-ter focus:border-acc-prim"
            />
            <input
              autocomplete="email"
              name="email"
              type="email"
              placeholder="Your email"
              required
              class="rounded-xl border border-brdr bg-bg-prim px-4 py-3 text-sm text-fg-prim outline-none placeholder:text-fg-ter focus:border-acc-prim"
            />
            <textarea
              name="message"
              rows="6"
              placeholder="Tell me a little about it"
              required
              class="min-h-40 rounded-xl border border-brdr bg-bg-prim px-4 py-3 text-sm text-fg-prim outline-none placeholder:text-fg-ter focus:border-acc-prim"
            />
            <p v-if="contactState.message" class="text-sm text-fg-sec">
              {{ contactState.pending ? 'Sending...' : contactState.message }}
            </p>
            <button
              type="submit"
              :disabled="contactState.pending"
              class="inline-flex w-full items-center justify-center rounded-xl border-2 border-brdr px-4 py-3 text-sm font-bold tracking-wide text-fg-prim uppercase transition-all duration-200 ease-out hover:border-acc-prim hover:text-acc-prim disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ contactState.pending ? 'Sending...' : 'Send message' }}
            </button>
          </div>
        </form>
      </div>
    </Teleport>
  </section>
</template>
