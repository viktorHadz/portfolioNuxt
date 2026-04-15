import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    modules: ['@nuxtjs/sitemap', '@nuxt/eslint'],
    css: ['~/assets/css/main.css'],

    app: {
        head: {
            htmlAttrs: {
                lang: 'en-GB',
            },
            meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
            link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
        },
    },

    sitemap: {
        defaults: {
            changefreq: 'monthly',
            priority: 0.7,
        },
    },

    // TODO: Remove vue devtools before launching Prod
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
                'gsap',
                'gsap/ScrollTrigger',
                'gsap/MotionPathPlugin',
                '@heroicons/vue/24/outline',
            ],
        },
    },
})
