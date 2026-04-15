<script setup>
import PortfolioProjectPage from '../../components/portfolio/PortfolioProjectPage.vue'
import { getProjectById } from '../../components/portfolio/portfolioContent'

const project = getProjectById('ido-group-bg')
</script>

<template>
  <PortfolioProjectPage :project="project" />
</template>
