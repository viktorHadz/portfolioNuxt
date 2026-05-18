<script setup>
const uid = useId()
const gridId = `${uid}-pixel-grid`
const clipId = `${uid}-a-clip`
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 140 118">
    <defs>
      <pattern :id="gridId" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="3" height="3" fill="var(--acc-primary)" shape-rendering="crispEdges" />
      </pattern>

      <clipPath :id="clipId" clipPathUnits="userSpaceOnUse">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M132.7 106.8h7.3v10.7h-33.6v-10.7h7.4l-15.3-30H41.1l-15.1 30h7.6v10.7H0v-10.8h7.6L62 0h16.4zM70 14.4A162 162 0 0 1 63.6 31L47.2 64.4H93L76.8 31A129 129 0 0 1 72 19.8z"
        />
      </clipPath>
    </defs>

    <rect width="140" height="118" :fill="`url(#${gridId})`" :clip-path="`url(#${clipId})`" />
  </svg>
</template>
