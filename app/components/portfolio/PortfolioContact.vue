<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { portfolioContent } from './portfolioContent'

const activeJourneyYear = ref(null)
const sectionRoot = ref(null)
let gsapContext

function toggleJourneyPopover(year) {
  activeJourneyYear.value = activeJourneyYear.value === year ? null : year
}

function closeJourneyPopover() {
  activeJourneyYear.value = null
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function roundedPoint(value) {
  return Number(value.toFixed(1))
}

function createContactRoutePath(points, width, height) {
  if (points.length === 0) return ''

  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]
  const arrowSize = clamp(Math.min(width, height) * 0.025, 10, 16)
  const path = [`M ${roundedPoint(firstPoint.x)} ${roundedPoint(firstPoint.y)}`]

  points.slice(1).forEach((point) => {
    path.push(`H ${roundedPoint(point.x)}`)
    path.push(`V ${roundedPoint(point.y)}`)
  })

  if (points.length > 1) {
    path.push(`M ${roundedPoint(lastPoint.x - arrowSize)} ${roundedPoint(lastPoint.y - arrowSize)}`)
    path.push(`L ${roundedPoint(lastPoint.x)} ${roundedPoint(lastPoint.y)}`)
    path.push(`L ${roundedPoint(lastPoint.x + arrowSize)} ${roundedPoint(lastPoint.y - arrowSize)}`)
  }

  return path.join(' ')
}

onMounted(async () => {
  const { default: gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  gsap.registerPlugin(ScrollTrigger)
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  gsapContext = gsap.context(() => {
    function setupContactRoute({ animate = true } = {}) {
      const contactRoute = sectionRoot.value?.querySelector('[data-contact-route]')

      if (!contactRoute) return

      const routeSvg = contactRoute.querySelector('[data-contact-route-svg]')
      const routePaths = gsap.utils.toArray(
        '[data-contact-route-path], [data-contact-route-shadow]',
        contactRoute,
      )
      const routeNodes = gsap.utils.toArray('[data-contact-route-node]', contactRoute)
      let routeLength = 1

      const getNodeCenter = (node) => {
        const routeBox = contactRoute.getBoundingClientRect()
        const nodeBox = node.getBoundingClientRect()
        return {
          x: nodeBox.left - routeBox.left + nodeBox.width / 2,
          y: nodeBox.top - routeBox.top + nodeBox.height / 2,
        }
      }

      const measureContactRoute = () => {
        if (!routeSvg || routeNodes.length === 0) return

        const routeBox = contactRoute.getBoundingClientRect()
        if (routeBox.width === 0 || routeBox.height === 0) return

        const points = routeNodes.map(getNodeCenter)
        const pathDefinition = createContactRoutePath(points, routeBox.width, routeBox.height)

        routeSvg.setAttribute('viewBox', `0 0 ${routeBox.width} ${routeBox.height}`)
        routePaths.forEach((path) => path.setAttribute('d', pathDefinition))

        routeLength = routePaths[0]?.getTotalLength() || 1
        gsap.set(routePaths, {
          strokeDasharray: routeLength,
          strokeDashoffset: animate ? routeLength : 0,
        })
      }

      measureContactRoute()

      if (!animate) {
        gsap.set(routeNodes, { autoAlpha: 1, y: 0, scale: 1 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRoute,
          start: 'top 78%',
          once: true,
          invalidateOnRefresh: true,
          onRefreshInit: measureContactRoute,
        },
      })

      tl.fromTo(
        routePaths,
        { strokeDashoffset: () => routeLength },
        { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' },
        0,
      )

      routeNodes.forEach((node, i) => {
        const at = routeNodes.length <= 1 ? 0.3 : 0.3 + (i / (routeNodes.length - 1)) * 0.8
        tl.fromTo(
          node,
          { autoAlpha: 0, y: 12, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' },
          at,
        )
      })
    }

    if (reduceMotionQuery.matches) {
      setupContactRoute({ animate: false })
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
      transformOrigin: '50% 50%',
      repeat: -1,
      ease: 'none',
      duration: 100,
    })

    setupContactRoute()

    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, sectionRoot.value)
})

onBeforeUnmount(() => {
  gsapContext?.revert()
})
</script>

<template>
  <section
    id="contact"
    ref="sectionRoot"
    class="relative isolate overflow-hidden bg-bg-prim py-20 text-fg-prim sm:py-28"
    aria-labelledby="contact-title"
  >
    <div
      class="absolute inset-0 bg-stars opacity-50"
      aria-hidden="true"
    />
    <svg
      class="pointer-events-none absolute top-0 left-0 h-full w-full opacity-45"
      viewBox="0 0 1200 780"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 600 C320 460 480 580 650 380 C775 230 900 240 1200 160"
        stroke="#4aa3ff"
        stroke-width="1.5"
        stroke-dasharray="6 14"
        fill="none"
      />
    </svg>

    <svg
      class="pointer-events-none absolute inset-0 h-full w-full opacity-45"
      viewBox="0 0 1200 780"
      aria-hidden="true"
    >
      <g
        class="portfolio-contact-signal"
        fill="none"
      >
        <circle
          class="portfolio-portal-ring"
          cx="940"
          cy="370"
          r="170"
          stroke="#a3d920"
          stroke-width="2"
          stroke-dasharray="18 16"
        />
        <circle
          class="portfolio-portal-ring"
          cx="940"
          cy="370"
          r="250"
          stroke="#ffeb58"
          stroke-width="1.5"
          stroke-dasharray="8 14"
        />
      </g>
    </svg>

    <div class="relative mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-2">
      <div class="portfolio-reveal">
        <p class="text-sm font-bold text-acc-prim uppercase">Journey route</p>
        <h2 class="mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl">
          From automation to live client software
        </h2>

        <div
          data-contact-route
          class="portfolio-contact-route relative mt-10"
        >
          <svg
            data-contact-route-svg
            class="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              data-contact-route-shadow
              stroke="#020617"
              stroke-width="10"
              stroke-linecap="round"
              stroke-linejoin="round"
              opacity="0.48"
              fill="none"
            />
            <path
              data-contact-route-path
              stroke="#4aa3ff"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
          </svg>

          <ol class="relative z-20 grid gap-12 py-8 sm:gap-14">
            <li
              v-for="(item, index) in portfolioContent.journey"
              :key="item.year"
              data-contact-route-item
              class="group relative grid min-h-44 items-center sm:min-h-32"
              :class="
                index % 2 === 0
                  ? 'justify-items-start pr-12 sm:pr-20'
                  : 'justify-items-end pl-12 sm:pl-20'
              "
            >
              <button
                type="button"
                data-contact-route-node
                class="portfolio-journey-date relative z-30 inline-flex h-16 w-28 items-center justify-center rounded-lg border border-acc-ter/60 bg-bg-sec/70 text-2xl font-bold text-acc-prim shadow-xl shadow-black/15 backdrop-blur-sm transition-colors duration-200 hover:border-acc-prim hover:text-acc-sec focus-visible:border-acc-sec focus-visible:outline-none"
                :aria-expanded="activeJourneyYear === item.year"
                :aria-controls="`journey-popover-${item.year}`"
                :aria-describedby="`journey-popover-${item.year}`"
                @click="toggleJourneyPopover(item.year)"
                @keydown.escape="closeJourneyPopover"
              >
                {{ item.year }}
              </button>

              <div
                :id="`journey-popover-${item.year}`"
                data-contact-route-popover
                role="tooltip"
                class="pointer-events-none invisible absolute top-20 z-50 w-[min(18rem,calc(100vw-3rem))] rounded-lg border border-brdr bg-bg-sec/95 p-4 opacity-0 shadow-2xl shadow-black/25 backdrop-blur-md transition-opacity duration-200 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 sm:top-1/2 sm:w-72 sm:-translate-y-1/2"
                :class="[
                  index % 2 === 0 ? 'left-0 sm:left-36' : 'right-0 sm:right-36',
                  activeJourneyYear === item.year ? 'pointer-events-auto visible opacity-100' : '',
                ]"
              >
                <p class="text-xs font-bold text-acc-ter uppercase">{{ item.year }}</p>
                <h3 class="mt-2 text-lg font-bold">{{ item.title }}</h3>
                <p class="mt-2 text-sm leading-6 text-fg-sec">{{ item.body }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <aside
        class="portfolio-contact-panel relative isolate self-start rounded-lg border border-brdr bg-bg-sec/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-8 lg:sticky lg:top-28"
      >
        <DecorField />
        <p class="text-sm font-bold text-acc-sec uppercase">Contact</p>
        <h2
          id="contact-title"
          class="mt-3 text-2xl leading-tight font-bold text-balance sm:text-3xl"
        >
          {{ portfolioContent.contact.heading }}
        </h2>
        <p class="mt-5 text-base leading-7 text-fg-sec">
          {{ portfolioContent.contact.body }}
        </p>

        <div class="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <button
            v-for="action in portfolioContent.contact.actions"
            :key="action"
            type="button"
            class="inline-flex min-h-11 items-center justify-between rounded-lg border border-brdr bg-bg-prim px-4 py-3 text-sm font-bold text-fg-sec"
          >
            <span>{{ action }}</span>
          </button>
        </div>
      </aside>
    </div>
  </section>
</template>
