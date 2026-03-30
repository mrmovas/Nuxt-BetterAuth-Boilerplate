<script setup lang="ts">
const config = useRuntimeConfig()
const route  = useRoute()

definePageMeta({
    middleware: 'guest',
    layout: 'auth',
})

useSeoMeta({
    title: 'Sign in',
    ogTitle: `Sign in · ${config.public.appName}`,
    ogUrl: `${config.public.appUrl}/auth`,
    robots: 'noindex, nofollow',
})

// TAB ROUTING
type Tab = 'login' | 'register' | 'reset-password'
const activeTab  = ref<Tab>((route.query.tab as Tab) || 'login')
const resetToken = ref((route.query.token as string) || '')

// UI ALERTS
const errorMessage   = ref('')
const successMessage = ref('')

// Sync tab with URL query param
watch(() => route.query.tab, (val) => {
    activeTab.value = (val as Tab) || 'login'
})

// Navigate to a tab and clear messages
function goTo(tab: Tab) {
    activeTab.value = tab
    resetToken.value = '' // Clear reset token when switching tabs
    navigateTo({ query: { tab } }, { replace: true })
}

onMounted(() => {
    if (route.query.passwordChanged === 'true') {
        successMessage.value = 'Password changed successfully. Please log in.'
        navigateTo({ query: { tab: 'login' } }, { replace: true })
    }
    if (route.query.emailVerified === 'true') {
        successMessage.value = 'Email verified successfully. Please log in.'
        navigateTo({ query: { tab: 'login' } }, { replace: true })
    }
    if (resetToken.value) activeTab.value = 'reset-password'
})
</script>

<template>
    <div class="min-h-screen flex flex-col">
    <main class="flex-1 flex justify-center items-center px-5 py-16">
    <div class="w-full max-w-[440px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-10">

        <!-- Alerts -->
        <AuthAlertBox v-if="errorMessage" type="error" :message="errorMessage" class="mb-4" />
        <AuthAlertBox v-if="successMessage" type="success" :message="successMessage" class="mb-4" />

        <!-- Forms -->
        <AuthLoginForm
            v-if="activeTab === 'login'"
            @go="goTo"
            @error="errorMessage = $event"
            @success="successMessage = $event"
        />
        <AuthRegisterForm
            v-else-if="activeTab === 'register'"
            @go="goTo"
            @error="errorMessage = $event"
            @success="successMessage = $event"
        />
        <AuthResetPasswordForm
            v-else-if="activeTab === 'reset-password'"
            :reset-token="resetToken"
            @go="goTo"
            @error="errorMessage = $event"
            @success="successMessage = $event"
        />

        <NuxtLink to="/" class="block text-center text-[var(--color-accent)] text-[13px] text-[var(--color-accent)] hover:underline mt-6">← Back to home</NuxtLink>

    </div>
    </main>
    </div>
</template>