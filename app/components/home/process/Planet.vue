<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    size?: string
    opacity?: number
  }>(),
  {
    id: undefined,
    size: 'size-4',
    opacity: 1,
  },
)
</script>

<template>
  <div
    :id="id"
    :class="size"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="5"
        cy="5"
        rx="5"
        ry="5"
        transform="rotate(180 5 5)"
        fill="url(#paint0_linear_1513_768)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1513_768"
          x1="5"
          y1="1.96891"
          x2="5"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stop-color="#A5E519"
            style="
              stop-color: #a5e519;
              stop-color: color(display-p3 0.6471 0.898 0.098);
              stop-opacity: 1;
            "
          />
          <stop
            offset="0.5"
            stop-color="#AFD84B"
            style="
              stop-color: #afd84b;
              stop-color: color(display-p3 0.6863 0.8471 0.2941);
              stop-opacity: 1;
            "
          />
          <stop
            offset="1"
            stop-color="#708835"
            style="
              stop-color: #708835;
              stop-color: color(display-p3 0.4381 0.5328 0.2072);
              stop-opacity: 1;
            "
          />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
