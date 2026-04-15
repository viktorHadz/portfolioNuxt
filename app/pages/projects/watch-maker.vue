<script setup>
import PortfolioProjectPage from '../../components/portfolio/PortfolioProjectPage.vue'
import { getProjectById } from '../../components/portfolio/portfolioContent'

const project = getProjectById('watch-maker')
</script>

<template>
  <PortfolioProjectPage :project="project" />
</template>
