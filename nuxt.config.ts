import tailwindcss from "@tailwindcss/vite";



export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },


    css: [ './app/assets/main.css' ],
    vite: {
        plugins: [
            tailwindcss(),
        ]
    },


    // Runtime config – public values are exposed to the client
    runtimeConfig: {
        //apiSecret: '123', // outside of public, only available on the server
        public: {
            appName: 'auth.',
            appDescription: 'A production-ready authentication frontend built with Nuxt, TypeScript, and Tailwind CSS. Designed to seamlessly integrate with my backend template, Express-BetterAuth-Boilerplate — including signup, login, email verification, password reset, and session management — following best practices and a clean architecture. ',
            appURL: 'http://localhost:3000', // change before deploying
            backendURL: 'http://localhost:4000', // your Express backend
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
