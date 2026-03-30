<script setup lang="ts">
const { login } = useAuth()
const { isValidEmail, isValidPassword, passwordRequirements } = useValidation()

const emit = defineEmits<{
    go: [tab: 'login' | 'register' | 'reset-password']
    error: [message: string]
    success: [message: string]
}>()

const email    = ref('')
const password = ref('')
const loading  = ref(false)

const inputClass = 'w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-[#f0f0f0] font-mono text-sm px-3.5 py-2.5 outline-none focus:border-[var(--color-accent)] transition-colors'
const labelClass = 'text-[11px] text-[var(--color-muted)] uppercase tracking-wider'
const btnPrimary = 'w-full mt-1 cursor-pointer font-mono text-sm bg-[var(--color-accent)] text-[var(--color-bg)] font-medium rounded px-5 py-3 hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'

async function handleLogin() {
    loading.value = true
    emit('error', '')
    try {
        await login({ email: email.value, password: password.value })
    } catch (e: any) {
        emit('error', e.message || 'Login failed')
    } finally {
        loading.value = false
    }
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
        </div>

        <div class="flex flex-col gap-1.5">
            <label :class="labelClass" for="login-password">Password</label>
            <input
                id="login-password" v-model="password" type="password"
                placeholder="••••••••" required autocomplete="current-password"
                :class="inputClass"
            >
            <div v-if="password && !isValidPassword(password)" class="text-[var(--color-danger)] text-[13px]">
                <p>Password must meet the following requirements:</p>
                <ul class="list-disc list-inside">
                    <li v-for="(req, index) in passwordRequirements(password)" :key="index">{{ req }}</li>
                </ul>
            </div>
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