import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: process.env.NODE_ENV !== 'production' },

    modules: ['@nuxtjs/sitemap', '@nuxt/eslint'],
    css: ['~/assets/css/main.css'],

    site: {
        url: process.env.NUXT_SITE_URL || 'https://bitsbyvik.com',
        name: 'Bits By Vik',
        description:
            'Portfolio of Viktor Hadzhiyski, a London full-stack developer building production-ready apps, websites, and tools with Go, Vue, React, Node, SQL, and Nuxt.',
        seoImage: '/og-image-bits-by-vik.png',
        indexable: true,
    },

    app: {
        head: {
            htmlAttrs: { lang: 'en-GB' },
            meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
            link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
        },
    },

    nitro: {
        prerender: {
            routes: ['/robots.txt'],
        },
    },

    sitemap: {
        zeroRuntime: true,
        discoverImages: false,
        defaults: { changefreq: 'monthly', priority: 0.7 },
    },

    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            include: [
                'gsap',
                'gsap/MorphSVGPlugin',
                'gsap/ScrollTrigger',
                'gsap/MotionPathPlugin',
                '@heroicons/vue/24/outline',
                'gsap/DrawSVGPlugin',
            ],
        },
    },
})
