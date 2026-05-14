<template>
  <div class="relative">
    <!-- outer border -->
    <div
      class="bg-bg-sec p-8"
      style="
        clip-path: polygon(
          0 0,
          100% 0,
          100% 100%,
          36px 100%,
          36px calc(100% - 36px),
          0 calc(100% - 36px)
        );
        border-radius: 16px 16px 16px 0;
        border: 1px solid rgb(163 230 53 / 0.35);
      "
    >
      <slot />
    </div>

    <!-- inverted corner -->
    <div
      class="absolute bottom-0 left-0 size-9 rounded-tr-lg border-t border-r border-acc-prim/40"
    />
  </div>
</template>
