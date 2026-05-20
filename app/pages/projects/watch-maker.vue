<script setup>
import ProjectPage from '~/components/projects/ProjectPage.vue'
import { getProjectById } from '~/data/portfolio/projects'

const project = getProjectById('watch-maker')

definePageMeta({
  sitemap: {
    images: [{ loc: '/seo/projects/watch-maker.webp' }],
  },
})
</script>

<template>
  <ProjectPage :project="project" />
</template>
