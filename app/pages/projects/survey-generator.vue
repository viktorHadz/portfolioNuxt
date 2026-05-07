<script setup>
import ProjectPage from '~/components/projects/ProjectPage.vue'
import { getProjectById } from '~/data/portfolio/projects'

const project = getProjectById('survey-generator')
</script>

<template>
  <ProjectPage :project="project" />
</template>
