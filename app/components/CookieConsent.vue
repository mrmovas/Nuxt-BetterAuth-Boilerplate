<script setup lang="ts">
const cookie = useCookie('cookie_consent', {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    path: '/',
})

const accepted = computed(() => cookie.value === 'true')

function accept() {
    cookie.value = 'true'
}
</script>



<template>
    <Transition name="cookie-banner">
        <div v-if="!accepted" class="fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-4 bg-white/80 backdrop-blur-md px-5 py-3.5 border border-gray-200/60 rounded-2xl shadow-lg w-max max-w-[calc(100vw-2rem)]">
            <div class="flex items-start gap-2.5 text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4m0-4h.01"/>
                </svg>
                <p class="m-0 text-sm leading-relaxed whitespace-nowrap">
                    This site uses essential cookies to keep you logged in and functional.
                </p>
            </div>
            <a href="/privacy" class="text-sm text-gray-600 underline underline-offset-2">Learn more</a>
            <button class="text-sm font-medium bg-black text-white rounded-lg px-4 py-1.5 cursor-pointer whitespace-nowrap hover:bg-gray-800 transition-colors flex-shrink-0" @click="accept">
                I understand
            </button>
        </div>
    </Transition>
</template>