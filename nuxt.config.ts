import tailwindcss from "@tailwindcss/vite";



export default defineNuxtConfig({
    modules: ["nuxt-security"],
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },


    css: [ './app/assets/main.css' ],
    vite: {
        plugins: [
            tailwindcss(),
        ],
        optimizeDeps: {
            include: [
                'better-auth/vue',
                'better-auth/client/plugins',
            ]
        }
    },
    $development: {
        vite: {
            optimizeDeps: {
                include: [
                    '@vue/devtools-core',
                    '@vue/devtools-kit',
                ]
            }
        }
    },


    // Runtime config – public values are exposed to the client
    runtimeConfig: {
        //apiSecret: '123', // example: outside of public, only available on the server
        public: {
            appName: 'auth.',
            appDescription: 'A production-ready authentication frontend built with Nuxt, TypeScript, and Tailwind CSS. Designed to seamlessly integrate with my backend template, Express-BetterAuth-Boilerplate — including signup, login, email verification, password reset, and session management — following best practices and a clean architecture. ',
            appURL: process.env.NUXT_PUBLIC_APP_URL,
            backendURL: process.env.NUXT_PUBLIC_BACKEND_URL
        },
    },


    // Global SEO defaults (can be overridden per-page with useSeoMeta / useHead)
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            htmlAttrs: { lang: 'en' },
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
            ],
        },
    },
})
