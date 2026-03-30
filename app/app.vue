<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()

useSeoMeta({
    titleTemplate: (title) => title ? `${title} · ${config.public.appName}` : 'Auth.',
    description: config.public.appDescription as string,

    // Open Graph
    ogType: 'website',
    ogSiteName: config.public.appName as string,
    ogTitle: config.public.appName as string,
    ogDescription: config.public.appDescription as string,
    ogImage: `${config.public.appURL}/og-image.png`,
    ogUrl: config.public.appURL as string,

    // Twitter Card / X Card
    twitterCard: 'summary_large_image',
    //twitterSite: "" // Twitter username of the website (e.g. @username)
    twitterTitle: config.public.appName as string,
    twitterDescription: config.public.appDescription as string,
    twitterImage: `${config.public.appURL}/og-image.png`,

    // Bots
    robots: 'index, follow',
})

useHead({
    link: [
        { rel: 'canonical', href: computed(() => `${config.public.appURL}${route.path}`) },
    ],
})

</script>



<template>
    <NuxtLayout>
        <NuxtRouteAnnouncer />
        <NuxtPage />
    </NuxtLayout>
</template>