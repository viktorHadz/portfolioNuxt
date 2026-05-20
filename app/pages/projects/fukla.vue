<script setup>
import ProjectPage from '~/components/projects/ProjectPage.vue'
import { getProjectById } from '~/data/portfolio/projects'

const project = getProjectById('fukla')

definePageMeta({ sitemap: { images: [{ loc: '/seo/projects/fukla.webp' }] } })
</script>

<template>
  <ProjectPage :project="project" />
</template>
