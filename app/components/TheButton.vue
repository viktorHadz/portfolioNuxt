<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    validator: (v) => ['primary', 'secondary', 'tertiary', 'oxiliary'].includes(v),
  },
  size: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'compact'].includes(v),
  },
  block: Boolean,
  disabled: Boolean,
  href: String,
  target: String,
})

const accentMap = {
  primary:
    'hover:border-acc-prim active:border-acc-prim hover:text-acc-prim active:text-acc-prim active:shadow-sm',
  secondary: 'hover:border-acc-sec active:border-acc-sec hover:text-acc-sec active:text-acc-sec',
  tertiary: 'hover:border-acc-ter active:border-acc-ter hover:text-acc-ter active:text-acc-ter',
}

const sizeMap = {
  compact: 'min-h-9 rounded-lg px-2 py-1.5 text-tiny',
  default: 'rounded-xl px-4 py-3 text-sm',
}

const isBoxed = computed(() => props.variant in accentMap)

const buttonClass = computed(() => {
  const width = props.block ? 'w-full text-center' : ''

  if (isBoxed.value) {
    return [
      'group relative border-2 border-brdr bg-transparent font-bold tracking-wide text-fg-prim uppercase shadow-[0_4px_0_rgba(0,0,0,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_0_rgba(0,0,0,0.3)] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50',
      accentMap[props.variant],
      sizeMap[props.size],
      width,
    ]
  }

  if (props.variant === 'oxiliary') {
    return ['group hover:text-acc-sec', width]
  }

  return width
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href ? target : undefined"
    :rel="href && target === '_blank' ? 'noopener noreferrer' : undefined"
    :type="href ? undefined : 'button'"
    :disabled="href ? undefined : disabled"
    :class="buttonClass"
  >
    <span
      v-if="isBoxed"
      class="relative z-10"
    >
      <slot />
    </span>

    <div
      v-else-if="variant === 'oxiliary'"
      class="flex items-center font-bold"
    >
      <slot />
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

    <slot v-else />
  </component>
</template>
