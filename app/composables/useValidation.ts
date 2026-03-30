import { parsePhoneNumberWithError } from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'


export const useValidation = () => {
    const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email)

    const isValidPassword = (password: string): boolean => {
        return password.length >= 8
            && /[A-Z]/.test(password)
            && /[a-z]/.test(password)
            && /[0-9]/.test(password)
            && /[^A-Za-z0-9]/.test(password)
    }

    const passwordRequirements = (password: string): string[] => {
        const requirements = []

        if (password.length < 8) requirements.push("At least 8 characters")
        if (!/[A-Z]/.test(password)) requirements.push("At least one uppercase letter")
        if (!/[a-z]/.test(password)) requirements.push("At least one lowercase letter")
        if (!/[0-9]/.test(password)) requirements.push("At least one number")
        if (!/[^A-Za-z0-9]/.test(password)) requirements.push("At least one special character")
        return requirements
    }

    const isPhoneValid = (country: string, phone: string): boolean => {
        try {
            return parsePhoneNumberWithError(phone, country as CountryCode).isValid()
        } catch (e) {
            return false
        }
    }

    return {
        isValidEmail,
        isValidPassword,
        passwordRequirements,
        isPhoneValid
    }
}