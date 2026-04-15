<template>
  <div
    class="capability-field pointer-events-none absolute inset-0"
    aria-hidden="true"
  />
</template>
<style scoped>
.capability-field {
  background:
    linear-gradient(rgba(74, 164, 255, 0) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 163, 255, 0) 1px, transparent 1px),
    linear-gradient(
      135deg,
      transparent 0 44%,
      rgba(163, 217, 32, 0.06) 44% 45%,
      transparent 45% 100%
    ),
    linear-gradient(
      45deg,
      transparent 0 52%,
      rgba(255, 235, 88, 0.06) 52% 53%,
      transparent 53% 100%
    );
  background-size:
    56px 56px,
    56px 56px,
    220px 220px,
    260px 260px;
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 86%, transparent);
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 86%, transparent);
}
</style>
