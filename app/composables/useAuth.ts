import { authClient } from '~/lib/auth'

type loginParams = {
    email: string
    password: string
    rememberMe?: boolean
}

type registerParams = {
    firstName: string
    lastName: string
    name: string
    email: string
    password: string
    country: string
    phoneNumber: string
}

type authReturnType = {
    success: boolean,
    code: string,
    message: string
}



export const useAuth = () => {
    const { $authSession } = useNuxtApp()

    /**
     * Logs out the current user and redirects to the login page
     */
    const logout = async (path?: string) => {
        await authClient.signOut()
        await navigateTo(path || '/')
    }

    /**
     * 
     * @param params - The login parameters
     * Logs in the user with the provided email and password
     */
    const login = async (params: loginParams): Promise<authReturnType> => {
        const result = await authClient.signIn.email(params);
        return {
            success: !result.error,
            code: result.error ? result.error.code as string : '',
            message: result.error ? result.error.message as string : 'Login successful'
        }
    }

    /**
     * 
     * @param params - The registration parameters
     * Registers a new user with the provided information
     */
    const register = async (params: Omit<registerParams, 'name'>): Promise<authReturnType> => {
        const result = await authClient.signUp.email({
            ...params, 
            name: `${params.firstName} ${params.lastName}`
        } as registerParams);
        return {
            success: !result.error,
            code: result.error ? result.error.code as string : '',
            message: result.error ? result.error.message as string : 'Registration successful, verification email has been sent to your inbox'
        }
    }

    /**
     * @param email - The email address of the user requesting a new verification email
     * Resends the email verification email to the provided email address if it exists in the system and is not already verified
     */
    const resendEmailVerification = async (email: string) => {
        await authClient.sendVerificationEmail({
            email,
            callbackURL: `${window.location.origin}/auth?emailVerified=true`
        });
    }

    /**
     * @param email - The email address of the user requesting a password reset
     * Sends a password reset email to the provided email address if it exists in the system
     */
    const requestPasswordReset = async (email: string) => {
        await authClient.requestPasswordReset({
            email, 
            redirectTo: `${window.location.origin}/auth?tab=reset-password`
        });
    }

    /**
     * @param token - The password reset token
     * @param newPassword - The new password for the user
     * Resets the user's password with the provided token and new password
     */
    const resetPassword = async (token: string, newPassword: string): Promise<authReturnType> => {
        const result = await authClient.resetPassword({
            newPassword,
            token
        });
        return {
            success: !result.error,
            code: result.error ? result.error.code as string : '',
            message: result.error ? result.error.message as string : 'Password reset successful, you can now log in with your new password'
        }
    }

    /**
     * Changes the current user's password
     * @param currentPassword 
     * @param newPassword 
     */
    const changePassword = async (currentPassword: string, newPassword: string): Promise<authReturnType> => {
        const result = await authClient.changePassword({
            currentPassword,
            newPassword,
            revokeOtherSessions: true
        });
        return {
            success: !result.error,
            code: result.error ? result.error.code as string : '',
            message: result.error ? result.error.message as string : 'Password changed successfully'
        }
    }

    return {
        user: $authSession.user,
        isLoggedIn: $authSession.isLoggedIn,
        isPending: $authSession.isPending,
        logout,
        login,
        register,
        resendEmailVerification,
        requestPasswordReset,
        resetPassword,
        changePassword
    }
}