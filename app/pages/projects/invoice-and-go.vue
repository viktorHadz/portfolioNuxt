<script setup>
import PortfolioProjectPage from '../../components/portfolio/PortfolioProjectPage.vue'
import { getProjectById } from '../../components/portfolio/portfolioContent'

const project = getProjectById('invoice-and-go')
</script>

<template>
  <PortfolioProjectPage :project="project" />
</template>
