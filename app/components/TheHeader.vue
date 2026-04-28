<script setup>
import GrouchyHead from '@/components/Hero/GrouchyHead.vue'

const nav = [
  ['01', 'Work', '#featured-work'],
  ['02', 'Archive', '#archive'],
  ['03', 'Contact', '#contact'],
]

function scrollTo(e) {
  const href = e.currentTarget.getAttribute('href')
  if (!href?.startsWith('#')) return
  const target = document.querySelector(href)
  if (target) {
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

const hidden = ref(false)
let lastY = 0

function onScroll() {
  const y = window.scrollY
  hidden.value = y > lastY && y > 80
  lastY = y
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-bg-prim/95 px-4 py-5 backdrop-blur-sm transition-transform duration-300 sm:px-8 lg:px-20"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <NuxtLink
      to="/"
      class="relative flex items-center gap-3"
      aria-label="Bits by Vik home"
    >
      <span
        aria-hidden="true"
        class="absolute top-1/2 left-7 h-px w-72 -translate-y-1/2 bg-linear-to-r from-acc-sec to-transparent blur-sm"
      />
      <GrouchyHead class="relative z-10 size-8 shrink-0 sm:size-11" />
      <span class="text-md relative z-10 leading-none font-bold uppercase sm:text-2xl">
        Bits
        <span class="text-acc-prim">by</span>
        Vik
      </span>
    </NuxtLink>

    <nav class="hidden gap-5 font-mono text-sm uppercase sm:flex sm:gap-10 lg:gap-24 lg:text-base">
      <a
        v-for="[num, label, href] in nav"
        :key="href"
        :href="href"
        class="text-fg-prim hover:text-acc-prim"
        @click="scrollTo"
      >
        <span class="text-fg-ter">{{ num }}</span>
        {{ label }}
      </a>
    </nav>

    <div class="flex items-center gap-3 font-mono text-xs tracking-tighter text-acc-prim uppercase">
      <div class="relative z-10 mr-2 flex items-center justify-center">
        <div class="absolute size-4 shrink-0 rounded-full bg-acc-prim opacity-90 blur-md" />
        <div
          class="absolute size-2 shrink-0 animate-pulse rounded-full bg-acc-prim shadow-2xl/50 shadow-acc-prim motion-reduce:animate-none"
        />
      </div>
      <span class="relative z-10">Available for work</span>
    </div>
  </header>
</template>
