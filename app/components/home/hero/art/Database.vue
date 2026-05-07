<script setup>
import IconBadge from './IconBadge.vue'
</script>

<template>
  <IconBadge :ring-rotate="90">
    <g transform="translate(0,-4)">
      <g stroke="#1B1F2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path
          fill="var(--border-strong)"
          d="M42 54c0-7.1 12.1-12.9 27-12.9S96 46.9 96 54v35.2c0 7.1-12.1 12.9-27 12.9s-27-5.8-27-12.9z"
        />
        <path
          d="M42 54c0 7.1 12.1 12.9 27 12.9S96 61.1 96 54M42 65.7c0 7.1 12.1 12.9 27 12.9s27-5.8 27-12.9M42 77.4c0 7.1 12.1 12.9 27 12.9s27-5.8 27-12.9"
        />
      </g>
      <path
        fill="#A0A3AB"
        d="M73 42.6c-.9-.1-1.8-.1-2.7-.1-8.1 0-16.7.8-23.8 6.4-1.6 1.4-3.3 3.9-2.8 6.6.5 2.7 2.4 4.3 4.1 5.5 3.6 2.4 7.6 3.6 11.6 4.5.8.2 1.7.4 2.6.5-.9-.4-1.7-.7-2.5-1.1-3.6-1.6-7.4-3.4-10.3-5.9-1.4-1.2-2.6-2.7-2.8-4.1-.2-1.3.7-2.7 2-3.9 5.8-4.6 14.1-6.5 21.9-8 .9-.2 1.8-.3 2.7-.4z"
      />
    </g>
  </IconBadge>
</template>
