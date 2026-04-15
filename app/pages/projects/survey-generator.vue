<script setup>
import PortfolioProjectPage from '../../components/portfolio/PortfolioProjectPage.vue'
import { getProjectById } from '../../components/portfolio/portfolioContent'

const project = getProjectById('survey-generator')
</script>

<template>
  <PortfolioProjectPage :project="project" />
</template>
