<script setup lang="ts">
import PageTransitionMorph from './components/Decor/PageTransitionMorph.vue'

const siteName = 'Bits By Vik'
const siteUrl = 'https://bitsbyvik.com'
const defaultTitle = 'Bits By Vik | Developer Portfolio'
const defaultDescription =
  'Portfolio of Viktor Hadzhiyski, featuring projects in Go, SQL, Express, Node, Vue, Nuxt, React and work around networks, automation and deployment.'

if (import.meta.server) {
  useSeoMeta({
    title: defaultTitle,
    ogTitle: defaultTitle,
    description: defaultDescription,
    ogDescription: defaultDescription,
    ogSiteName: siteName,
    ogType: 'website',
    ogImage: `${siteUrl}/og-image-bits-by-vik.png`,
    twitterCard: 'summary_large_image',
    twitterTitle: defaultTitle,
    twitterDescription: defaultDescription,
    twitterImage: `${siteUrl}/og.png`,
    // Control crawler behaviour on the site
    robots: 'index, follow',
  })
}

useHead({
  script: [
    {
      key: 'has-js-class',
      innerHTML: "document.documentElement.classList.add('has-js')",
      tagPosition: 'head',
    },
  ],
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} | Bits By Vik` : 'Bits By Vik | Developer Portfolio',
})
</script>

<template>
  <PageTransitionMorph />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
