<script setup>
defineProps({
  variant: {
    type: String,
    validator: (value) =>
      ['primary', 'secondary', 'tertiary', 'oxiliary'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  bold: {
    type: String,
  },
})
</script>

<template>
  <!-- primary -->
  <button
    v-if="variant === 'primary'"
    :disabled="disabled"
    class="group border-brdr hover:border-acc-prim active:border-acc-prim text-fg-prim hover:text-acc-prim active:text-acc-prim relative rounded-xl border-2 bg-transparent px-4 py-3 text-sm font-bold tracking-wide uppercase shadow-[0_4px_0_rgba(0,0,0,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_0_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
  >
    <span class="relative z-10">
      <slot></slot>
    </span>
  </button>

  <!-- secondary -->
  <button
    v-else-if="variant === 'secondary'"
    :disabled="disabled"
    class="group border-brdr hover:border-acc-sec active:border-acc-sec text-fg-prim hover:text-acc-sec active:text-acc-sec relative rounded-xl border-2 bg-transparent px-4 py-3 text-sm font-bold tracking-wide uppercase shadow-[0_4px_0_rgba(0,0,0,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_0_rgba(0,0,0,0.3)] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <span class="relative z-10">
      <slot></slot>
    </span>
  </button>

  <!-- tertiary -->
  <button
    v-else-if="variant === 'tertiary'"
    :disabled="disabled"
    class="text-fg-prim hover:text-acc-prim cursor-pointer rounded-lg p-2 capitalize drop-shadow-lg transition-all duration-150 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <slot></slot>
  </button>
  <!-- Oxiliary -->
  <button
    v-else-if="variant === 'oxiliary'"
    :disabled="disabled"
    class="hover:text-acc-sec group"
  >
    <div class="flex items-center font-bold">
      <slot></slot>
      <slot name="icon">
        <svg
          class="size-6 transition-transform duration-300 group-hover:translate-x-6"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 12h15m-6-6 6 6-6 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </slot>
    </div>
  </button>
  <button v-else :disabled="disabled">
    <slot></slot>
  </button>
</template>
