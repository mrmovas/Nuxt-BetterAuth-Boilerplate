<script setup lang="ts">
const { requestPasswordReset, resetPassword } = useAuth()
const { isValidEmail, isValidPassword, passwordRequirements } = useValidation()

const props = defineProps<{
    resetToken: string
}>()

const emit = defineEmits<{
    go: [tab: 'login' | 'register' | 'reset-password']
    error: [message: string]
    success: [message: string]
}>()

const email    = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading  = ref(false)
const isResendCooldown = ref(false)
const resendCountdown = ref(0)

const inputClass = 'w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-[#f0f0f0] font-mono text-sm px-3.5 py-2.5 outline-none focus:border-[var(--color-accent)] transition-colors'
const labelClass = 'text-[11px] text-[var(--color-muted)] uppercase tracking-wider'
const btnPrimary = 'w-full mt-1 cursor-pointer font-mono text-sm bg-[var(--color-accent)] text-[var(--color-bg)] font-medium rounded px-5 py-3 hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'

async function handleRequestReset() {
    if (isResendCooldown.value) return

    loading.value = true
    emit('error', '')
    emit('success', '')
    try {
        await requestPasswordReset(email.value)
        emit('success', 'If that email exists, a reset link has been sent! Check your inbox.')

        // Start cooldown
        isResendCooldown.value = true
        resendCountdown.value = 60

        const timer = setInterval(() => {
            resendCountdown.value--
            if (resendCountdown.value <= 0) {
                isResendCooldown.value = false
                clearInterval(timer)
            }
        }, 1000)
    } catch (e: any) {
        emit('error', e.message || 'Failed to send reset email')
    } finally {
        loading.value = false
    }
}

async function handleResetPassword() {
    loading.value = true
    emit('error', '')
    emit('success', '')
    try {
        const result = await resetPassword(props.resetToken, password.value)
        if(!result.success) return emit('error', result.message)
        emit('success', result.message)
        password.value = ''
        emit('go', 'login')
    } catch (e: any) {
        emit('error', e.message || 'Failed to reset password')
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <!-- Request reset link -->
    <form v-if="!resetToken" class="flex flex-col gap-4" @submit.prevent="handleRequestReset">
        <h1 class="font-serif text-[28px] mb-2">Reset your password.</h1>

        <div class="flex flex-col gap-1.5">
            <label :class="labelClass" for="reset-email">Email</label>
            <input id="reset-email" v-model="email" type="email" placeholder="Email address" required autocomplete="email" :class="inputClass">
        </div>
        <p v-if="email && !isValidEmail(email)" class="text-[var(--color-danger)] text-[13px]">
            Please enter a valid email address
        </p>

        <button type="submit" :disabled="(!isValidEmail(email) || loading) || isResendCooldown" :class="btnPrimary">
            {{ isResendCooldown ? `Resend in ${resendCountdown}s` : loading ? 'Sending…' : 'Send reset link →' }}
        </button>

        <p class="text-center text-[var(--color-muted)] text-[13px]">
            Remembered it?
            <a href="#" class="text-[var(--color-accent)] hover:underline" @click.prevent="emit('go', 'login')">Sign in</a>
        </p>
    </form>

    <!-- Set new password (token present) -->
    <form v-else class="flex flex-col gap-4" @submit.prevent="handleResetPassword">
        <h1 class="font-serif text-[28px] mb-2">Choose a new password.</h1>

        <div class="flex flex-col gap-1.5">
            <label :class="labelClass" for="new-password">New password</label>
            <input id="new-password" v-model="password" type="password" placeholder="Create a new password" required autocomplete="new-password" :class="inputClass">
            <div v-if="password && !isValidPassword(password)" class="text-[var(--color-danger)] text-[13px] mt-1">
                <p>Password must meet the following requirements:</p>
                <ul class="list-disc list-inside">
                    <li v-for="(req, index) in passwordRequirements(password)" :key="index">{{ req }}</li>
                </ul>
            </div>
        </div>

        <div class="flex flex-col gap-1.5">
            <label :class="labelClass" for="confirm-password">Confirm password</label>
            <input id="confirm-password" v-model="confirmPassword" type="password" placeholder="Confirm your password" required autocomplete="new-password" :class="inputClass">
            <p v-if="confirmPassword && password !== confirmPassword" class="text-[var(--color-danger)] text-[13px]">
                Passwords do not match
            </p>
        </div>

        <button type="submit" :disabled="!isValidPassword(password) || password !== confirmPassword || loading" :class="btnPrimary">
            {{ loading ? 'Resetting…' : 'Reset password →' }}
        </button>

        <p class="text-center text-[var(--color-muted)] text-[13px]">
            Remembered it?
            <a href="#" class="text-[var(--color-accent)] hover:underline" @click.prevent="emit('go', 'login')">Sign in</a>
        </p>
    </form>
</template>