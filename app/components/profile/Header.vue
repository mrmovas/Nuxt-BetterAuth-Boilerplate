<script setup lang="ts">
const { user } = useAuth()

defineProps<{
    profileOpen: boolean
}>()

defineEmits<{
    'update:profileOpen': [boolean]
}>()
</script>


<template>
<div class="flex items-center justify-between">
    <NuxtLink to="/" class="flex items-center gap-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-2 hover:border-[var(--color-accent)] transition-colors cursor-pointer">
        <svg class="w-3.5 h-3.5 text-[var(--color-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="font-mono text-[13px] text-[#f0f0f0]">Back</span>
    </NuxtLink>

    <h1 class="font-serif text-[28px]">
        Hey, <em class="italic text-[var(--color-accent)]">{{ user?.firstName || user?.name?.split(' ')[0] }}.</em>
    </h1>

    <!-- Profile button -->
    <button
        class="flex items-center gap-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-2 hover:border-[var(--color-accent)] transition-colors cursor-pointer"
        @click="$emit('update:profileOpen', !profileOpen)"
    >
        <div class="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg)] text-xs font-bold select-none">
            {{ (user?.firstName?.[0] ?? user?.name?.[0] ?? '?').toUpperCase() }}
        </div>
        <span class="font-mono text-[13px] text-[#f0f0f0]">Profile</span>
        <svg
            class="w-3.5 h-3.5 text-[var(--color-muted)] transition-transform"
            :class="{ 'rotate-180': profileOpen }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    </button>
</div>
</template>