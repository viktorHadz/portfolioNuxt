<template>
  <div
    class="pattern pointer-events-none absolute inset-0"
    aria-hidden="true"
  />
</template>
<style scoped>
.pattern {
  background:
    linear-gradient(
      135deg,
      transparent 0 44%,
      rgba(163, 217, 32, 0.03) 44% 45%,
      transparent 45% 100%
    ),
    linear-gradient(
      45deg,
      transparent 0 44%,
      rgba(255, 235, 88, 0.03) 44% 45%,
      transparent 45% 100%
    );
  background-size:
    100px 100px,
    100px 100px;
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 86%, transparent);
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 86%, transparent);
}
</style>
