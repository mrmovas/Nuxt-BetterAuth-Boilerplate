<script setup lang="ts">
import { parsePhoneNumberWithError, getCountries, getCountryCallingCode } from 'libphonenumber-js'

const { register } = useAuth()
const { isValidEmail, isValidPassword, passwordRequirements } = useValidation()

const emit = defineEmits<{
    go: [tab: 'login' | 'register' | 'reset-password']
    error: [message: string]
    success: [message: string]
}>()

const firstName       = ref('')
const lastName        = ref('')
const email           = ref('')
const password        = ref('')
const confirmPassword = ref('')
const country         = ref('')
const phoneNumber     = ref('')
const loading         = ref(false)

const inputClass = 'w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded text-[#f0f0f0] font-mono text-sm px-3.5 py-2.5 outline-none focus:border-[var(--color-accent)] transition-colors'
const labelClass = 'text-[11px] text-[var(--color-muted)] uppercase tracking-wider'
const btnPrimary = 'w-full mt-1 cursor-pointer font-mono text-sm bg-[var(--color-accent)] text-[var(--color-bg)] font-medium rounded px-5 py-3 hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'

// Country list
const countries = getCountries()
    .map(code => ({
        code,
        dial: `+${getCountryCallingCode(code)}`,
        flag: [...code].map(x => String.fromCodePoint(0x1F1A5 + x.charCodeAt(0))).join('')
    }))
    .sort((a, b) => a.code.localeCompare(b.code))

const phoneValid = computed<boolean | null>(() => {
    if (!country.value || !phoneNumber.value) return null
    try { return parsePhoneNumberWithError(phoneNumber.value, country.value as any).isValid() }
    catch { return false }
})

async function handleRegister() {
    if (password.value !== confirmPassword.value) return
    loading.value = true
    emit('error', '')
    emit('success', '')
    try {
        const result = await register({
            firstName: firstName.value,
            lastName: lastName.value,
            name: `${firstName.value} ${lastName.value}`,
            email: email.value,
            password: password.value,
            country: country.value,
            phoneNumber: phoneNumber.value,
        })

        if(!result.success) return emit('error', result.message)

        emit('success', result.message)
        emit('go', 'login')
    } catch (e: any) {
        emit('error', e.message || 'Registration failed')
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
        <h1 class="font-serif text-[28px] mb-2">Create an account.</h1>

        <!-- First & Last name -->
        <div class="flex gap-3">
            <div class="flex flex-col gap-1.5 flex-1">
                <label :class="labelClass" for="firstName">First name</label>
                <input id="firstName" v-model="firstName" type="text" placeholder="First name" required autocomplete="given-name" :class="inputClass">
            </div>
            <div class="flex flex-col gap-1.5 flex-1">
                <label :class="labelClass" for="lastName">Last name</label>
                <input id="lastName" v-model="lastName" type="text" placeholder="Last name" required autocomplete="family-name" :class="inputClass">
            </div>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-1.5">
            <label :class="labelClass" for="reg-email">Email</label>
            <input id="reg-email" v-model="email" type="email" placeholder="Email address" required autocomplete="email" :class="inputClass">
            <p v-if="email && !isValidEmail(email)" class="text-[var(--color-danger)] text-[13px]">
                Please enter a valid email address
            </p>
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-1.5">
            <label :class="labelClass" for="reg-password">Password</label>
            <input id="reg-password" v-model="password" type="password" placeholder="Create a password" required autocomplete="new-password" :class="inputClass">
            <div v-if="password && !isValidPassword(password)" class="text-[var(--color-danger)] text-[13px]">
                <p>Password must meet the following requirements:</p>
                <ul class="list-disc list-inside">
                    <li v-for="(req, index) in passwordRequirements(password)" :key="index">{{ req }}</li>
                </ul>
            </div>
        </div>

        <!-- Confirm Password -->
        <div class="flex flex-col gap-1.5">
            <label :class="labelClass" for="confirm-password">Confirm password</label>
            <input id="confirm-password" v-model="confirmPassword" type="password" placeholder="Confirm your password" required autocomplete="new-password" :class="inputClass">
            <p v-if="confirmPassword && password !== confirmPassword" class="text-[var(--color-danger)] text-[13px]">
                Passwords do not match
            </p>
        </div>

        <!-- Country & Phone -->
        <div class="flex gap-3">
            <div class="flex flex-col gap-1.5 flex-1">
                <label :class="labelClass" for="country">Country</label>
                <select id="country" v-model="country" required :class="inputClass + ' cursor-pointer'">
                    <option value="" disabled>Select country…</option>
                    <option v-for="c in countries" :key="c.code" :value="c.code">
                        {{ c.code }} {{ c.flag }} ({{ c.dial }})
                    </option>
                </select>
            </div>
            <div class="flex flex-col gap-1.5 flex-1">
                <label :class="labelClass" for="phone">Phone</label>
                <input id="phone" v-model="phoneNumber" type="tel" placeholder="Phone number" required autocomplete="tel" :class="inputClass">
                <p v-if="phoneNumber && phoneValid === false" class="text-[var(--color-danger)] text-[13px]">
                    Please enter a valid phone number
                </p>
            </div>
        </div>

        <button
            type="submit"
            :disabled="!isValidEmail(email) || !isValidPassword(password) || password !== confirmPassword || !phoneValid || loading"
            :class="btnPrimary"
        >
            {{ loading ? 'Creating account…' : 'Create account →' }}
        </button>

        <p class="text-center text-[var(--color-muted)] text-[13px]">
            Already have an account?
            <a href="#" class="text-[var(--color-accent)] hover:underline" @click.prevent="emit('go', 'login')">Sign in</a>
        </p>
    </form>
</template>