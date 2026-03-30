<template>
    <div class="bg-[var(--color-bg)] text-[#f0f0f0] min-h-screen flex flex-col text-sm leading-relaxed">
        <AppNavBar />
        <div class="flex-1 flex flex-col">
            <slot />
            <CookieConsent />
        </div>
        <AppFooter />
    </div>
</template>