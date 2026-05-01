<script setup>
import ProjectPage from '../../components/home/ProjectPage.vue'
import { getProjectById } from '../../components/home/portfolioContent'

const project = getProjectById('watch-maker')
</script>

<template>
  <ProjectPage :project="project" />
</template>
