type loginParams = {
    email: string
    password: string
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



export const useAuth = () => {
    const session = authClient.useSession()

    const user = computed(() => session.value.data?.user)
    const isLoggedIn = computed(() => !!session.value.data)
    const isPending = computed(() => session.value.isPending)

    /**
     * Logs out the current user and redirects to the login page
     */
    const logout = async () => {
        await authClient.signOut()
        await navigateTo('/auth')
    }

    /**
     * 
     * @param params - The login parameters
     * Logs in the user with the provided email and password
     */
    const login = async (params: loginParams) => {
        await authClient.signIn.email(params);
    }

    /**
     * 
     * @param params - The registration parameters
     * Registers a new user with the provided information
     */
    const register = async (params: registerParams) => {
        await authClient.signUp.email(params);
    };

    /**
     * @param email - The email address of the user requesting a password reset
     * Sends a password reset email to the provided email address if it exists in the system
     */
    const requestPasswordReset = async (email: string) => {
        await authClient.requestPasswordReset({
            email, 
            redirectTo: "/auth?activeTab=reset-password"
        });
    }

    /**
     * @param token - The password reset token
     * @param newPassword - The new password for the user
     * Resets the user's password with the provided token and new password
     */
    const resetPassword = async (token: string, newPassword: string) => {
        await authClient.resetPassword({
            newPassword,
            token
        });
    }

    /**
     * Changes the current user's password
     * @param currentPassword 
     * @param newPassword 
     */
    const changePassword = async (currentPassword: string, newPassword: string) => {
        await authClient.changePassword({
            currentPassword,
            newPassword,
            revokeOtherSessions: true
        });
    }

    return {
        session,
        user,
        isLoggedIn,
        isPending,
        logout,
        login,
        register,
        requestPasswordReset,
        resetPassword,
        changePassword
    }
}