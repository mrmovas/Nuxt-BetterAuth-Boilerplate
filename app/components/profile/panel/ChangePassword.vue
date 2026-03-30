<script setup lang="ts">
const { changePassword, logout } = useAuth()
const { isValidPassword, passwordRequirements } = useValidation()

const currentPassword   = ref('')
const newPassword       = ref('')
const passwordLoading   = ref(false)
const passwordError     = ref('')
const passwordSuccess   = ref('')

async function handleChangePassword() {
    passwordError.value   = ''
    passwordSuccess.value = ''
    passwordLoading.value = true
    try {
        const result = await changePassword(currentPassword.value, newPassword.value)
        if(!result.success) return passwordError.value = result.message
        passwordSuccess.value = result.message
        currentPassword.value = ''
        newPassword.value     = ''
        logout()
    } catch (e: any) {
        passwordError.value = e.message || 'Failed to change password.'
    } finally {
        passwordLoading.value = false
    }
}

// SHARED STYLES
const inputClass  = 'w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-[#f0f0f0] font-mono text-sm px-3.5 py-2.5 outline-none focus:border-[var(--color-accent)] transition-colors'
const labelClass  = 'text-[11px] text-[var(--color-muted)] uppercase tracking-wider'
const btnPrimary  = 'cursor-pointer font-mono text-sm bg-[var(--color-accent)] text-[var(--color-bg)] font-medium rounded px-5 py-2.5 hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'
const btnSecondary = 'cursor-pointer font-mono text-sm bg-transparent text-[#f0f0f0] border border-[var(--color-border)] rounded px-4 py-2 hover:border-[#f0f0f0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
</script>


<template>
    <div>
        <p class="text-[11px] text-[var(--color-muted)] uppercase tracking-wider mb-5">Change password</p>

        <div v-if="passwordError" class="mb-4 rounded px-4 py-3 text-sm font-mono border bg-[var(--color-danger)]/10 border-[var(--color-danger)] text-[var(--color-danger)]">
            {{ passwordError }}
        </div>
        <div v-if="passwordSuccess" class="mb-4 rounded px-4 py-3 text-sm font-mono border bg-[var(--color-ok)]/10 border-[var(--color-ok)] text-[var(--color-ok)]">
            {{ passwordSuccess }}
        </div>

        <form class="flex flex-col gap-4" @submit.prevent="handleChangePassword">
            <div class="flex flex-col gap-1.5">
                <label :class="labelClass" for="current-password">Current password</label>
                <input
                    id="current-password"
                    v-model="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    autocomplete="current-password"
                    :class="inputClass"
                >
            </div>
            <div class="flex flex-col gap-1.5">
                <label :class="labelClass" for="new-password">New password</label>
                <input
                    id="new-password"
                    v-model="newPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    autocomplete="new-password"
                    :class="inputClass"
                >
            </div>
            <div v-if="newPassword && !isValidPassword(newPassword)" class="text-[var(--color-danger)] text-[13px]">
                <p>Password must meet the following requirements:</p>
                <ul class="list-disc list-inside">
                    <li v-for="(req, index) in passwordRequirements(newPassword)" :key="index">{{ req }}</li>
                </ul>
            </div>
            <button
                type="submit"
                :disabled="!currentPassword || !newPassword || passwordLoading || !isValidPassword(newPassword)"
                :class="btnPrimary"
            >
                {{ passwordLoading ? 'Saving…' : 'Update password →' }}
            </button>
        </form>
    </div>
</template>