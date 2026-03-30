<script setup lang="ts">
const { login, resendEmailVerification } = useAuth()
const { isValidEmail, isValidPassword, passwordRequirements } = useValidation()

const emit = defineEmits<{
    go: [tab: 'login' | 'register' | 'reset-password']
    error: [message: string]
    success: [message: string]
}>()

const email    = ref('')
const password = ref('')
const loading  = ref(false)
const showResendVerificationButton = ref(false)
const isResendCooldown = ref(false)
const resendCountdown = ref(0)


const inputClass = 'w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-[#f0f0f0] font-mono text-sm px-3.5 py-2.5 outline-none focus:border-[var(--color-accent)] transition-colors'
const labelClass = 'text-[11px] text-[var(--color-muted)] uppercase tracking-wider'
const btnPrimary = 'w-full mt-1 cursor-pointer font-mono text-sm bg-[var(--color-accent)] text-[var(--color-bg)] font-medium rounded px-5 py-3 hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'

async function handleLogin() {
    loading.value = true
    emit('error', '')
    emit('success', '')
    try {
        const result = await login({ email: email.value, password: password.value })
        if (!result.success) {
            emit('error', result.message)
            if(result.code === 'EMAIL_NOT_VERIFIED') {
                showResendVerificationButton.value = true
            }
        } else {
            emit('success', result.message)
            email.value = ''
            password.value = ''
            navigateTo('/') // Redirect to home or dashboard after successful login
        }
    } catch (e: any) {
        emit('error', e.message || 'Login failed')
    } finally {
        loading.value = false
    }
}

const handleResendClick = () => {
    if (isResendCooldown.value) return

    // Emit the event
    resendEmailVerification(email.value)

    // Start cooldown
    isResendCooldown.value = true
    resendCountdown.value = 30

    const timer = setInterval(() => {
        resendCountdown.value--
        if (resendCountdown.value <= 0) {
            isResendCooldown.value = false
            clearInterval(timer)
        }
    }, 1000)
}
</script>

<template>
    <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <h1 class="font-serif text-[28px] mb-2">Welcome back.</h1>

        <div class="flex flex-col gap-1.5">
            <label :class="labelClass" for="login-email">Email</label>
            <input
                id="login-email" v-model="email" type="email"
                placeholder="you@example.com" required autocomplete="email"
                :class="inputClass"
            >
            <p v-if="email && !isValidEmail(email)" class="text-[var(--color-danger)] text-[13px]">
                Please enter a valid email address
            </p>
            <button
                v-if="showResendVerificationButton"
                :disabled="isResendCooldown"
                class="block text-center hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                :class="{
                    'text-[var(--color-accent)]': !isResendCooldown,
                    'text-gray-400': isResendCooldown,
                }"
                @click="handleResendClick"
            >
                    {{ isResendCooldown ? `Resend in ${resendCountdown}s` : 'Resend verification email' }}
            </button>
        </div>

        <div class="flex flex-col gap-1.5">
            <label :class="labelClass" for="login-password">Password</label>
            <input
                id="login-password" v-model="password" type="password"
                placeholder="••••••••" required autocomplete="current-password"
                :class="inputClass"
            >
                <p v-if="password && password.length < 8" class="text-[var(--color-danger)] text-[13px]">
                    Password must be at least 8 characters.
                </p>
        </div>

        <button type="submit" :disabled="!isValidEmail(email) || !isValidPassword(password) || loading" :class="btnPrimary">
            {{ loading ? 'Signing in…' : 'Sign in →' }}
        </button>

        <p class="text-center text-[var(--color-muted)] text-[13px]">
            Forgot your password?
            <a href="#" class="text-[var(--color-accent)] hover:underline" @click.prevent="emit('go', 'reset-password')">Reset it</a>
        </p>
        <p class="text-center text-[var(--color-muted)] text-[13px]">
            Don't have an account?
            <a href="#" class="text-[var(--color-accent)] hover:underline" @click.prevent="emit('go', 'register')">Sign up</a>
        </p>
    </form>
</template>