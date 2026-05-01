<script setup>
import ProjectPage from '../../components/home/ProjectPage.vue'
import { getProjectById } from '../../components/home/portfolioContent'

const project = getProjectById('survey-generator')
</script>

<template>
  <ProjectPage :project="project" />
</template>
