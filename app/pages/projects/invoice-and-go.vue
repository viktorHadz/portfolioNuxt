<script setup>
import ProjectPage from '~/components/projects/ProjectPage.vue'
import { getProjectById } from '~/data/portfolio/projects'

const project = getProjectById('invoice-and-go')

definePageMeta({
  sitemap: {
    images: [{ loc: '/seo/projects/invoice-and-go.webp' }],
  },
})
</script>

<template>
  <ProjectPage :project="project" />
</template>
