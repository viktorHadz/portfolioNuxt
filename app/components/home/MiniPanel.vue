<script setup></script>

<template>
  <div class="shrink-0 overflow-hidden rounded-md border border-brdr">
    <div
      class="flex items-center justify-between gap-2 border-b border-brdr bg-bg-prim px-2 py-1.5"
    >
      <div
        class="flex gap-1.5"
        aria-hidden="true"
      >
        <span class="size-1.5 rounded-sm bg-red" />
        <span class="size-1.5 rounded-sm bg-acc-sec" />
        <span class="size-1.5 rounded-sm bg-acc-ter" />
      </div>

      <span class="truncate text-tiny font-bold text-fg-ter uppercase">
        {{ item.id }}
      </span>
    </div>

    <div
      class="h-18 w-30 bg-bg-ter bg-cover bg-center bg-no-repeat"
      :style="item.image ? { backgroundImage: `url(${item.image})` } : {}"
    />
  </div>
</template>
