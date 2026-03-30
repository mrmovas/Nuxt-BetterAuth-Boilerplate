<script setup lang="ts">
    defineProps<{
        type: 'error' | 'success'
        message: string
    }>()
</script>

<template>
    <div
        class="rounded px-4 py-3 text-sm font-mono border"
        :class="{
            'bg-[var(--color-danger)]/10 border-[var(--color-danger)] text-[var(--color-danger)]': type === 'error',
            'bg-[var(--color-ok)]/10 border-[var(--color-ok)] text-[var(--color-ok)]': type === 'success',
        }"
    >
        <slot>{{ message }}</slot>
    </div>
</template>