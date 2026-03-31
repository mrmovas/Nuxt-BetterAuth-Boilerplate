<script setup lang="ts">
const { user } = useAuth()

const memberSince = computed(() => {
    if (!user.value?.createdAt) return '—'
    const date = new Date(user.value.createdAt)
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
})

// SHARED STYLES
const inputClass  = 'w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-[#f0f0f0] font-mono text-sm px-3.5 py-2.5 outline-none focus:border-[var(--color-accent)] transition-colors'
const labelClass  = 'text-[11px] text-[var(--color-muted)] uppercase tracking-wider'
const btnPrimary  = 'cursor-pointer font-mono text-sm bg-[var(--color-accent)] text-[var(--color-bg)] font-medium rounded px-5 py-2.5 hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'
const btnSecondary = 'cursor-pointer font-mono text-sm bg-transparent text-[#f0f0f0] border border-[var(--color-border)] rounded px-4 py-2 hover:border-[#f0f0f0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
</script>

<template>
    <div>
        <p class="text-[11px] text-[var(--color-muted)] uppercase tracking-wider mb-5">Account</p>
        <dl class="grid gap-y-3 gap-x-4" style="grid-template-columns: 140px 1fr">
            <dt :class="labelClass + ' pt-0.5'">Name</dt>
            <dd class="text-[#f0f0f0] text-sm">{{ user?.name }}</dd>

            <dt :class="labelClass + ' pt-0.5'">Email</dt>
            <dd class="text-[#f0f0f0] text-sm">{{ user?.email }}</dd>

            <dt :class="labelClass + ' pt-0.5'">Email verified</dt>
            <dd class="text-sm">
                <span v-if="user?.emailVerified" class="text-[var(--color-ok)]">✓ Verified</span>
                <span v-else class="flex items-center gap-2">
                    <span class="text-[var(--color-danger)]">✗ Not verified</span>
                </span>
            </dd>

            <dt :class="labelClass + ' pt-0.5'">Country</dt>
            <dd class="text-[#f0f0f0] text-sm">{{ user?.country || '—' }}</dd>

            <dt :class="labelClass + ' pt-0.5'">Phone</dt>
            <dd class="text-[#f0f0f0] text-sm">{{ user?.phoneNumber || '—' }}</dd>

            <dt :class="labelClass + ' pt-0.5'">User ID</dt>
            <dd class="text-[12px] text-[var(--color-muted)] break-all font-mono">{{ user?.id }}</dd>

            <dt :class="labelClass + ' pt-0.5'">Member since</dt>
            <dd class="text-[#f0f0f0] text-sm">{{ memberSince }}</dd>
        </dl>
    </div>
</template>