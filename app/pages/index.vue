<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ArchiveSection from '~/components/home/ArchiveSection.vue'
import ContactSection from '~/components/home/ContactSection.vue'
import FeaturedSection from '~/components/home/FeaturedSection.vue'
import HeroSection from '~/components/home/HeroSection.vue'
import StatsSection from '~/components/home/StatsSection.vue'
import SkillsSection from '~/components/home/SkillsSection.vue'

definePageMeta({ sitemap: { images: [{ loc: '/og-image-bits-by-vik.png' }] } })

const site = useSiteConfig()
const title = 'Viktor Hadzhiyski | Full-Stack Developer in London'
const socialTitle = `${title} | ${site.name || 'Bits By Vik'}`
const description =
  'Portfolio of Viktor Hadzhiyski, a London full-stack developer and software engineer building production-ready apps with Go, Vue, React, Node, SQL, and Nuxt.'
const canonical = withSiteUrl('/')
const socialImage = withSiteUrl(site.seoImage || '/og-image-bits-by-vik.png')

if (import.meta.server) {
  useSeoMeta({
    title,
    ogTitle: socialTitle,
    twitterTitle: socialTitle,
    description,
    ogDescription: description,
    twitterDescription: description,
    ogType: 'website',
    ogUrl: canonical,
    ogImage: socialImage,
    ogImageAlt: 'Bits By Vik portfolio preview',
    twitterCard: 'summary_large_image',
    twitterImage: socialImage,
  })
}

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [
    {
      key: 'home-structured-data',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            name: 'Viktor Hadzhiyski',
            url: canonical.value,
            jobTitle: 'Full-stack developer',
            sameAs: ['https://github.com/viktorHadz'],
          },
          { '@type': 'WebSite', name: site.name || 'Bits By Vik', url: canonical.value },
        ],
      }),
    },
  ],
})

const portfolioRoot = ref(null)
let gsapContext

async function initPortfolioReveal() {
  const { default: gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  gsap.registerPlugin(ScrollTrigger)
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  gsapContext = gsap.context(() => {
    if (reduceMotionQuery.matches) {
      gsap.set(
        [
          '.portfolio-reveal',
          '.portfolio-capability',
          '.portfolio-process-card',
          '.portfolio-archive-item',
          '.portfolio-journey-card',
          '.portfolio-journey-date',
        ],
        { autoAlpha: 1, y: 0, scale: 1 },
      )
      return
    }

    gsap.utils.toArray('.portfolio-reveal').forEach((element) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 84%', once: true },
        },
      )
    })

    gsap.utils
      .toArray(
        '.portfolio-capability, .portfolio-process-card, .portfolio-archive-item, .portfolio-journey-card',
      )
      .forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          },
        )
      })

    gsap.utils.toArray('.portfolio-process-path').forEach((path) => {
      gsap.fromTo(
        path,
        { autoAlpha: 0.2, strokeDashoffset: 120 },
        {
          autoAlpha: 1,
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: path.closest('section'),
            start: 'top 72%',
            end: 'bottom 42%',
            scrub: true,
          },
        },
      )
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, portfolioRoot.value)
}

onMounted(() => {
  initPortfolioReveal().catch(() => {})
})

onBeforeUnmount(() => {
  gsapContext?.revert()
})
</script>

<template>
  <div>
    <main ref="portfolioRoot" class="portfolio-view min-h-screen bg-bg-prim">
      <HeroSection />
      <FeaturedSection />
      <SkillsSection />
      <StatsSection />
      <ArchiveSection />
      <ContactSection />
    </main>
  </div>
</template>

<style scoped>
.portfolio-view {
  scroll-margin-top: 5rem;
}

:deep(#featured-work),
:deep(#contact) {
  scroll-margin-top: 5.5rem;
}

@media (prefers-reduced-motion: reduce) {
  :deep(*) {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
