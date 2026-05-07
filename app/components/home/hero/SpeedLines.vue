<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: true,
  },
})

const colors = ['var(--acc-primary)', 'var(--acc-secondary)', 'var(--acc-tertiary)']

const streaks = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  style: {
    left: `${12 + ((i * 19) % 78)}%`,
    top: `${6 + ((i * 29) % 88)}%`,
    width: `${4 + ((i * 7) % 10)}%`,
    '--line-color': colors[i % colors.length],
    '--line-delay': `-${(i % 9) * 0.35}s`,
    '--line-duration': `${1.9 + (i % 6) * 0.35}s`,
    '--line-height': `${1 + (i % 4 ? 1 : 0)}px`,
    '--line-opacity': `${0.18 + (i % 4) * 0.14}`,
    '--line-shift': `${40 + (i % 5) * 14}px`,
    '--line-tail': `${1.45 + (i % 3) * 0.3}`,
  },
}))
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 overflow-hidden"
    :class="{ 'hero-speed-lines-paused': !props.active }"
  >
    <span
      v-for="streak in streaks"
      :key="streak.id"
      class="hero-speed-line absolute"
      :style="streak.style"
    />
  </div>
</template>

<style scoped>
.hero-speed-line {
  height: var(--line-height);
  color: var(--line-color);
  transform: translate3d(calc(var(--line-shift) * -1), 0, 0);
  animation: hero-speed-line var(--line-duration) linear var(--line-delay) infinite;
}

.hero-speed-lines-paused .hero-speed-line {
  animation-play-state: paused;
}

.hero-speed-line::before,
.hero-speed-line::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, currentColor 78%, transparent), transparent);
}

.hero-speed-line::before {
  opacity: var(--line-opacity);
}

.hero-speed-line::after {
  opacity: calc(var(--line-opacity) * 0.35);
  transform: scaleX(var(--line-tail));
}

@keyframes hero-speed-line {
  from {
    transform: translate3d(calc(var(--line-shift) * -1), 0, 0);
    opacity: 0;
  }

  12% {
    opacity: 1;
  }

  to {
    transform: translate3d(var(--line-shift), 0, 0);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-speed-line {
    animation: none;
    transform: none;
    opacity: 1;
  }
}
</style>
