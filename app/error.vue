<script setup lang="ts">
import { computed } from 'vue'
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => Number(error?.statusCode || error?.status || 500))

const errorMeta = computed(() => {
    if (statusCode.value === 404) {
        return {
        title: 'This page does not exist.',
        subtitle: 'The link may be broken, outdated, or the page may have been moved.',
        accentClass: 'text-[var(--color-accent)]',
        }
    }

    if (statusCode.value === 401 || statusCode.value === 403) {
        return {
        title: 'Access denied.',
        subtitle: 'You may not have permission to view this content.',
        accentClass: 'text-[var(--color-danger)]',
        }
    }

    return {
        title: 'Something went wrong.',
        subtitle: 'An unexpected error occurred while loading this page.',
        accentClass: 'text-[var(--color-danger)]',
    }
})

const technicalMessage = computed(() => {
    return error?.statusMessage || error?.message || 'No additional details available.'
})

const clearAndGoHome = async () => {
    await clearError({ redirect: '/' })
}
</script>

<template>
    <main class="min-h-screen bg-[var(--color-bg)] text-[#f0f0f0] flex items-center justify-center px-5 py-12">
        <section class="w-full max-w-[760px] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-10">
            <p class="text-[11px] uppercase tracking-wider text-[var(--color-muted)]">Error</p>

            <div class="mt-4 flex items-start gap-5">
                <p class="font-serif text-[54px] leading-none text-[var(--color-muted)]">{{ statusCode }}</p>

                <div class="pt-1">
                    <h1 class="font-serif text-[34px] leading-tight" :class="errorMeta.accentClass">
                        {{ errorMeta.title }}
                    </h1>
                    <p class="mt-2 text-[15px] text-[var(--color-muted)]">
                        {{ errorMeta.subtitle }}
                    </p>
                </div>
            </div>

            <div class="mt-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]/50 p-4">
                <p class="text-[11px] uppercase tracking-wider text-[var(--color-muted)]">Details</p>
                <p class="mt-2 font-mono text-[13px] text-[#d5d5d5] break-words">{{ technicalMessage }}</p>
            </div>

            <div class="mt-8 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    class="cursor-pointer font-mono text-sm bg-[var(--color-accent)] text-[var(--color-bg)] font-medium rounded px-5 py-2.5 hover:opacity-85 transition-opacity"
                    @click="clearAndGoHome"
                >
                    Back to home
                </button>

                <button
                    type="button"
                    class="cursor-pointer font-mono text-sm bg-transparent text-[#f0f0f0] border border-[var(--color-border)] rounded px-4 py-2.5 hover:border-[#f0f0f0] transition-colors"
                    @click="reloadNuxtApp()"
                >
                    Try again
                </button>

                <NuxtLink
                    to="/auth"
                    class="text-[var(--color-accent)] no-underline hover:underline text-[13px]"
                >
                    Go to sign in
                </NuxtLink>
            </div>
        </section>
    </main>
</template>
