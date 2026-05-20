<script setup lang="ts">
import PageTransition from './components/PageTransition.vue'
import SiteHeader from './components/SiteHeader.vue'

const site = useSiteConfig()
const siteName = site.name || 'Bits By Vik'
const defaultTitle = `${siteName} | Developer Portfolio`
const defaultDescription =
  site.description ||
  'Portfolio of Viktor Hadzhiyski, a London full-stack developer building production-ready apps, websites, and tools with Go, Vue, React, Node, SQL, and Nuxt.'
const socialImage = withSiteUrl(site.seoImage || '/og-image-bits-by-vik.png')
const robots =
  site.indexable === false ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'

if (import.meta.server) {
  useSeoMeta({
    ogTitle: defaultTitle,
    description: defaultDescription,
    ogDescription: defaultDescription,
    ogSiteName: siteName,
    ogType: 'website',
    ogImage: socialImage,
    ogImageAlt: 'Bits By Vik portfolio preview',
    twitterCard: 'summary_large_image',
    twitterTitle: defaultTitle,
    twitterDescription: defaultDescription,
    twitterImage: socialImage,
    robots,
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
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} | ${siteName}` : defaultTitle),
})
</script>

<template>
  <PageTransition />
  <NuxtLayout>
    <SiteHeader />
    <NuxtPage />
  </NuxtLayout>
</template>
