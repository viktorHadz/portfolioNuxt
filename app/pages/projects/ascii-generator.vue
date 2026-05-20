<script setup>
import ProjectPage from '~/components/projects/ProjectPage.vue'
import TheAscii from '~/components/projects/ASCII/DemoProject.vue'
import { getProjectById } from '~/data/portfolio/projects'

const project = getProjectById('ascii-generator')

definePageMeta({
  sitemap: {
    images: [{ loc: '/seo/projects/ascii-generator.webp' }],
  },
})
</script>

<template>
  <ProjectPage :project="project">
    <template #demo>
      <ClientOnly>
        <TheAscii />
      </ClientOnly>
    </template>
  </ProjectPage>
</template>
