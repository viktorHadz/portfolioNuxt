<script setup>
import ProjectPage from '~/components/projects/ProjectPage.vue'
import { getProjectById } from '~/data/portfolio/projects'

const project = getProjectById('survey-generator')

definePageMeta({
  sitemap: {
    images: [{ loc: '/seo/projects/survey-generator.webp' }],
  },
})
</script>

<template>
  <ProjectPage :project="project" />
</template>
