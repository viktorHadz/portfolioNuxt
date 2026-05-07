<script setup>
defineProps({
  colour: {
    type: String,
    default: 'text-bg-sec',
  },
  position: {
    type: String,
    default: 'bottom', // 'top' or 'bottom'
  },
  flip: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="pointer-events-none absolute inset-x-0 z-10 h-12 overflow-hidden sm:h-16 md:h-20 lg:h-24"
    :class="position === 'top' ? 'top-0 -translate-y-px' : 'bottom-0 translate-y-px'"
    aria-hidden="true"
  >
    <svg
      class="block h-full w-full"
      :class="[colour, flip ? '-scale-x-100' : '']"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <path
        v-if="position === 'bottom'"
        fill="currentColor"
        d="M0 70C180 38 360 36 540 62C740 92 900 92 1080 52C1240 16 1360 26 1440 48V120H0V70Z"
      />

      <path
        v-else
        fill="currentColor"
        d="M0 0H1440V48C1360 26 1240 16 1080 52C900 92 740 92 540 62C360 36 180 38 0 70V0Z"
      />
    </svg>
  </div>
</template>
