<script setup>
import ProjectPage from '~/components/projects/ProjectPage.vue'
import { getProjectById } from '~/data/portfolio/projects'

const project = getProjectById('sam-creations')

definePageMeta({
  sitemap: {
    images: [{ loc: '/seo/projects/sam-creations.webp' }],
  },
})
</script>

<template>
  <ProjectPage :project="project" />
</template>
