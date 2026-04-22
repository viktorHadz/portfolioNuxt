<script setup lang="ts">
import HeroRings from '@/components/HeroRings.vue'
import HeroMench2 from './HeroMench2.vue'
</script>

<template>
  <div class="flex flex-col px-6 py-24 lg:flex-row">
    <div class="flex-1">
      <div class="flex items-center tracking-wider">
        <h2 class="mr-4 text-grad text-lg font-bold uppercase">full-stack developer</h2>
        <div class="relative w-16">
          <span class="block h-px w-full bg-linear-to-r from-acc-prim to-transparent" />
          <span class="absolute top-1/2 left-0 size-2 -translate-y-1/2 rounded-full bg-acc-prim" />
          <span
            class="absolute top-1/2 left-5 size-1.5 -translate-y-1/2 rounded-full bg-acc-prim"
          />
        </div>
      </div>

      <h1 class="mt-2 text-6xl font-bold tracking-tight">
        I build practical
        <div>software that</div>
        <span class="text-grad">people can rely on</span>
      </h1>
      <p class="mt-6 text-lg/loose">
        Vue and React UI, Go, Node and Express backends, auth, databases, automation and deployment
        work that keeps paid production projects running.
      </p>
    </div>
    <div class="flex-1">
      <HeroMench2 />
      <HeroRings class="" />
    </div>
  </div>
</template>
