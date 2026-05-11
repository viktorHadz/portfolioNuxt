<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href || undefined"
    :target="href ? target : undefined"
    :rel="href && target === '_blank' ? 'noopener noreferrer' : undefined"
    :type="href ? undefined : 'button'"
    class="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brdr bg-transparent px-4 py-3 text-sm font-bold tracking-wide text-fg-prim uppercase shadow-[0_4px_0_rgba(0,0,0,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_0_rgba(0,0,0,0.3)] active:translate-y-0.5"
    :class="
      variant === 'secondary'
        ? 'hover:border-acc-sec hover:text-acc-sec active:border-acc-sec active:text-acc-sec'
        : 'hover:border-acc-prim hover:text-acc-prim active:border-acc-prim active:text-acc-prim active:shadow-sm'
    "
  >
    <slot name="left" />
    <slot />
    <slot name="right" />
  </component>
</template>
