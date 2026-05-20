<script setup>
import ProjectPage from '~/components/projects/ProjectPage.vue'
import { getProjectById } from '~/data/portfolio/projects'

const project = getProjectById('ido-group-bg')

definePageMeta({
  sitemap: {
    images: [{ loc: '/seo/projects/ido-group-bg.webp' }],
  },
})
</script>

<template>
  <ProjectPage :project="project" />
</template>
