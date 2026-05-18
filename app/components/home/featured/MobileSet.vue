<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
const isTablet = ref(false)
let tabletQuery
const syncLayout = (event) => (isTablet.value = event?.matches ?? tabletQuery?.matches ?? false)
onMounted(() => {
  tabletQuery = window.matchMedia('(min-width: 768px)')
  syncLayout(tabletQuery)
  tabletQuery.addEventListener('change', syncLayout)
})

onUnmounted(() => tabletQuery?.removeEventListener('change', syncLayout))
</script>

<template>
  <div class="relative w-full" :style="{ aspectRatio: isTablet ? '512 / 305' : '305 / 512' }">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 305 512" :style="isTablet ? { position: 'absolute', top: '50%', left: '50%', width: 'auto', height: '167.869%', transform: 'translate(-50%, -50%) rotate(90deg)' } : { width: '100%', height: '100%' }">
      <defs>
        <path
          id="reuse-0"
          d="M275.52 25.72a8.17 8.17 0 0 1 8.16 8.17V472.4a8.17 8.17 0 0 1-8.16 8.17H26.22a8.17 8.17 0 0 1-8.17-8.17V33.9a8.17 8.17 0 0 1 8.17-8.17z"
        />
        <path
          id="reuse-1"
          fill="#1e1e21"
          d="M275.52 25.72a8.17 8.17 0 0 1 8.16 8.17V472.4a8.17 8.17 0 0 1-8.16 8.17H26.22a8.17 8.17 0 0 1-8.17-8.17V33.9a8.17 8.17 0 0 1 8.17-8.17z"
        />
      </defs>
      <path
        fill="#afd84b"
        d="M303.38 75.13c.9 0 1.62.72 1.62 1.62v17.58c0 .9-.73 1.62-1.62 1.62h-2.07V75.13zm0 28.17c.9 0 1.62.73 1.62 1.62v17.17c0 .9-.73 1.62-1.62 1.62h-2.07V103.3z"
      />
      <rect
        width="509.96"
        height="299.68"
        x="300.7"
        y="1.02"
        fill="#1e1e21"
        stroke="#afd84b"
        stroke-width="2.04"
        rx="29.6"
        transform="rotate(90 300.7 1.02)"
      />
      <rect
        width="502.82"
        height="292.48"
        x="297.11"
        y="4.59"
        fill="#2d2e32"
        stroke="#131315"
        stroke-width="1.02"
        rx="28.07"
        transform="rotate(90 297.11 4.6)"
      />
      <path
        fill="#4e5049"
        d="M283.68 25.72v454.85zM26.22 482.61a10.2 10.2 0 0 1-10.2-10.2V35.92a10.2 10.2 0 0 1 10.2-10.2c-3.38 0-6.12 3.65-6.12 8.16V472.4a6.1 6.1 0 0 0 6.12 6.13zM18.05 25.73h265.63zM283.68 472.4a10.2 10.2 0 0 1-10.2 10.21H26.22a10.2 10.2 0 0 1-10.2-10.2h4.08a6.1 6.1 0 0 0 6.12 6.12h249.3c4.5 0 8.16-2.74 8.16-6.13"
        mask="url(#path-5-outside-1_252_41)"
      />
      <mask id="path-7-inside-2_252_41" fill="#fff">
        <use href="#reuse-0" />
      </mask>
      <use href="#reuse-1" />
      <path
        class="hidden sm:block"
        fill="#131315"
        d="M275.52 21.64c6.76 0 12.25 5.48 12.25 12.25V472.4a10.2 10.2 0 0 1-10.21 10.21l-2.04-4.08c2.25 0 4.08-2.74 4.08-6.13V33.9a4.1 4.1 0 0 0-4.08-4.08zM26.22 482.61a10.2 10.2 0 0 1-10.2-10.2V31.84a10.2 10.2 0 0 1 10.2-10.21v8.17c-3.38 0-6.12 1.82-6.12 4.08V472.4a6.1 6.1 0 0 0 6.12 6.13zM16.02 31.85a10.2 10.2 0 0 1 10.2-10.21h249.3c6.76 0 12.25 5.48 12.25 12.25h-8.17a4.1 4.1 0 0 0-4.08-4.08H26.22c-3.38 0-6.12 1.82-6.12 4.08zM287.76 472.4a10.2 10.2 0 0 1-10.21 10.21H26.22a10.2 10.2 0 0 1-10.2-10.2h4.08a6.1 6.1 0 0 0 6.12 6.12h249.3c2.25 0 4.08-2.74 4.08-6.13z"
        mask="url(#path-7-inside-2_252_41)"
      />
      <path
        fill="#4e5049"
        d="M294.34 229.06V37.16a28.64 28.64 0 0 0-28.7-28.59h-5.99c15.7 0 30.6 12.94 30.8 28.59z"
      />
      <path
        fill="#1e1e21"
        stroke="#afd84b"
        stroke-width="1.5"
        d="M159.55 494.25c0 4.65-3.8 8.43-8.48 8.43a8.46 8.46 0 0 1-8.47-8.43 8.45 8.45 0 0 1 8.47-8.44 8.45 8.45 0 0 1 8.48 8.44Z"
        opacity=".76"
      />
      <path fill="#d9d9d9" d="M153.55 9.4a3.06 3.06 0 0 1 0 6.12h-28.31a3.06 3.06 0 0 1 0-6.12z" />
      <path
        fill="#494b50"
        d="M156.6 9.4v6.12zm-31.77 6.94a3.47 3.47 0 1 1 0-6.94h.4c-1.23 0-2.24 1.37-2.24 3.06 0 1.24 1 2.25 2.25 2.25zm-2.66-6.93h34.44zm34.44 3.05a3.9 3.9 0 0 1-3.88 3.88h-27.9a3.47 3.47 0 0 1-3.47-3.47l1.63-.4c0 1.23 1 2.24 2.25 2.24h28.3c1.7 0 3.07-1 3.07-2.25"
        mask="url(#path-11-outside-3_252_41)"
      />
      <rect
        width="5.31"
        height="34.03"
        x="156.61"
        y="9.8"
        fill="#1e1e21"
        stroke="#131315"
        stroke-width=".82"
        rx="2.65"
        transform="rotate(90 156.61 9.8)"
      />
      <path
        fill="#e3e7da"
        stroke="#4e5049"
        stroke-width=".41"
        d="M165.83 12.45a2.05 2.05 0 1 1-4.1 0 2.05 2.05 0 0 1 4.1 0Z"
      />
      <ellipse
        cx="175.26"
        cy="12.86"
        fill="#494b50"
        rx="3.88"
        ry="3.89"
        transform="rotate(90 175.26 12.86)"
      />
      <path
        fill="#1e1e21"
        stroke="#131315"
        stroke-width=".82"
        d="M179.16 12.45a3.48 3.48 0 1 1-6.96-.01 3.48 3.48 0 0 1 6.96.01Z"
      />
    </svg>
    <div class="absolute" :style="isTablet ? { top: '5.918%', left: '6.139%', width: '88.838%', height: '84.413%' } : { top: '5.023%', left: '5.918%', width: '84.413%', height: '88.838%' }">
      <slot />
    </div>
  </div>
</template>
