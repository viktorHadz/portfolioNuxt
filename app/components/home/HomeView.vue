<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HomeFeaturedProjects from './HomeFeaturedProjects.vue'
import HomeSkills from './HomeSkills.vue'
import HomeProcess from './HomeProcess.vue'
import HomeArchive from './HomeArchive.vue'
import HomeContact from './HomeContact.vue'

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

onMounted(async () => {
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
  <TheHeader />
  <main
    ref="portfolioRoot"
    class="portfolio-view min-h-screen bg-bg-prim"
  >
    <HomeHero />
    <HomeFeaturedProjects />
    <HomeSkills />
    <HomeProcess />
    <HomeArchive />
    <HomeContact />
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
