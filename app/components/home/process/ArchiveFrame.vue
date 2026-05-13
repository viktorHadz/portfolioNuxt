<!-- ArchiveLogoFrame.vue -->
<template>
  <div class="relative grid size-14 shrink-0 place-items-center">
    <svg
      class="pointer-events-none absolute inset-0 size-full"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 146 146"
      aria-hidden="true"
    >
      <!-- body -->
      <path
        fill="var(--bg-primary, #111116)"
        d="M144.5 25.8H1.5l-.1 102c0 9.3 7.4 16.7 16.6 16.7h109.8c9.1 0 16.6-7.4 16.6-16.6z"
      />

      <!-- top bar -->
      <path
        fill="var(--bg-secondary, #171a20)"
        d="M144.5 29.2H1.5V18.5A16.5 16.5 0 0 1 18 1.8h109.8c9.2 0 16.6 7.5 16.6 16.7z"
      />

      <!-- dark outer cut -->
      <path
        stroke="var(--tv-outline, #0c0e14)"
        stroke-width="2.8"
        d="M144.5 127.8c0 9.2-7.5 16.7-16.7 16.7H18c-9.2 0-16.6-7.5-16.6-16.7V18C1.4 8.8 9 1.4 18.1 1.4h109.8c9.2 0 16.6 7.4 16.6 16.6z"
      />

      <!-- grey bevel -->
      <path
        stroke="#59595a"
        stroke-width="3.6"
        d="M127.8 142.6H18c-8.2 0-14.8-6.6-14.8-14.8V18a15 15 0 0 1 15-14.8H128c8.2 0 14.8 6.6 14.8 14.8v109.8c0 8.2-6.7 14.8-14.9 14.8Z"
      />

      <!-- window dots -->
      <circle cx="17.1" cy="17" r="4" fill="#ce3a32" />
      <circle cx="28.1" cy="16.8" r="4" fill="#ffeb58" />
      <circle cx="39.1" cy="16.8" r="4" fill="#3db54e" />
    </svg>

    <div class="relative z-10 grid size-14 place-items-center text-acc-prim">
      <slot />
    </div>
  </div>
</template>
