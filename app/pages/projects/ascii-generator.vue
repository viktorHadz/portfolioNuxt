<script setup>
import ProjectPage from '../../components/home/ProjectPage.vue'
import { getProjectById } from '../../components/home/portfolioContent'

const project = getProjectById('ascii-generator')
</script>

<template>
  <ProjectPage :project="project" />
</template>
