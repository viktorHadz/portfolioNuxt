<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PortfolioHero from './PortfolioHero.vue'
import PortfolioProofStrip from './PortfolioProofStrip.vue'
import PortfolioFeaturedProjects from './PortfolioFeaturedProjects.vue'
import PortfolioCapabilityMap from './PortfolioCapabilityMap.vue'
import PortfolioProcess from './PortfolioProcess.vue'
import PortfolioArchive from './PortfolioArchive.vue'
import PortfolioContact from './PortfolioContact.vue'

const title = 'Home'
const description =
  'Portfolio of Viktor Hadzhiyski, featuring projects in Go, SQL, Express, Node, Vue, Nuxt, React and work around networks, automation and deployment.'
const canonical = withSiteUrl('/')

useSeoMeta({
  title,
  ogTitle: `${title} | Bits By Vik`,
  description,
  ogDescription: description,
  ogUrl: canonical,
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
})

const portfolioRoot = ref(null)
let gsapContext
let reduceMotionQuery

onMounted(async () => {
  const { default: gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  gsap.registerPlugin(ScrollTrigger)
  reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  gsapContext = gsap.context(() => {
    if (reduceMotionQuery.matches) {
      gsap.set(
        [
          '.portfolio-reveal',
          '.portfolio-capability',
          '.portfolio-process-card',
          '.portfolio-archive-item',
          '.portfolio-journey-card',
        ],
        { autoAlpha: 1, y: 0 },
      )
      return
    }

    gsap.to('.portfolio-portal-ring', {
      rotation: 360,
      transformOrigin: '50% 50%',
      repeat: -1,
      ease: 'none',
      duration: 34,
      stagger: 3,
    })

    gsap.to('.portfolio-contact-signal', {
      rotation: 360,
      transformOrigin: '78% 47%',
      repeat: -1,
      ease: 'none',
      duration: 42,
    })

    gsap.utils.toArray('.portfolio-reveal').forEach((element) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
          },
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
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
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
})

onBeforeUnmount(() => {
  gsapContext?.revert()
})
</script>

<template>
  <main
    ref="portfolioRoot"
    class="portfolio-view min-h-screen bg-bg-prim"
  >
    <PortfolioHero />
    <PortfolioProofStrip />
    <PortfolioFeaturedProjects />
    <PortfolioCapabilityMap />
    <PortfolioProcess />
    <PortfolioArchive />
    <PortfolioContact />
  </main>
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
