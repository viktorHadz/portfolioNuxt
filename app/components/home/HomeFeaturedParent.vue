<script setup>
const refTV = ref(null)

function handleTvOnOff(payload) {
  refTV.value?.switchTvOnOff(payload)
}
</script>

<template>
  <section
    id="featured-work"
    class="bg-bg-sec px-6 py-6 sm:px-8 sm:py-8 md:py-12 lg:py-28"
    aria-labelledby="featured-work-title"
  >
    <div class="flex max-w-7xl justify-between place-self-center">
      <div class="mt-12 flex items-center lg:mt-40">
        <FeaturedTV ref="refTV" class="min-w-2xl" />
      </div>
      <div class="flex flex-col items-center justify-center">
        <FeaturedHeader />

        <FeaturedRemote
          class="mt-12 flex max-w-60 min-w-12 place-self-center lg:mt-20"
          @switch-tv="handleTvOnOff"
        />
      </div>
    </div>
  </section>
</template>
