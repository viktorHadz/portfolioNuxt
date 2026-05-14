<script setup>
defineProps({ cssClass: { type: String, default: '' } })
</script>

<template>
  <div class="relative">
    <div
      class="border-2 border-acc-prim/35 bg-bg-sec [--cut:20px] sm:border-4 sm:[--cut:36px]"
      :class="cssClass"
      style="
        clip-path: polygon(
          0 0,
          100% 0,
          100% calc(100% - var(--cut)),
          calc(100% - var(--cut)) calc(100% - var(--cut)),
          calc(100% - var(--cut)) 100%,
          var(--cut) 100%,
          var(--cut) calc(100% - var(--cut)),
          0 calc(100% - var(--cut))
        );
        border-radius: 16px 16px 0 0;
      "
    >
      <slot />
    </div>

    <!-- inverted corner -->
    <div
      class="absolute bottom-0 left-0 size-5 rounded-tr border-t-2 border-r-2 border-acc-prim/40 sm:size-9 sm:border-t-4 sm:border-r-4 lg:rounded-tr-lg"
    />
    <div
      class="absolute right-0 bottom-0 size-5 rounded-tl border-t-2 border-l-2 border-acc-prim/40 sm:size-9 sm:border-t-4 sm:border-l-4 lg:rounded-tl-lg"
    />
  </div>
</template>
