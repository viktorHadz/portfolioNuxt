<script setup>
defineProps({ txt: { type: String, default: '' } })
</script>
<template>
  <div class="flex items-center gap-4 font-mono text-sm font-bold text-acc-sec uppercase">
    <LineStart class="size-5" />
    <span>{{ txt }}</span>
  </div>
</template>
