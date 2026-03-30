<script setup lang="ts">
definePageMeta({
    middleware: 'require-auth',
    layout: 'profile',
})

const config = useRuntimeConfig()
const { user, logout, changePassword } = useAuth()

useSeoMeta({
    title: 'Profile',
    ogTitle: `Profile · ${config.public.appName}`,
    robots: 'noindex, nofollow',
})

const profileOpen = ref(false)



</script>



<template>
    <main class="flex-1 flex flex-col items-center px-5 py-12 relative">
        <div class="w-full max-w-[640px] flex flex-col gap-10">
            <ProfileHeader :profileOpen="profileOpen" @update:profileOpen="profileOpen = $event" />
            <ProfilePanel :profileOpen="profileOpen" />
        </div>
    </main>
</template>