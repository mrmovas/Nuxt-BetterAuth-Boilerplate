import { until } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async () => {
    const { isLoggedIn, isPending } = useAuth()

    // If the auth status is still pending, we can choose to show a loading indicator or simply wait
    // For this example, we'll just wait until the status is resolved
    if(isPending.value) {
        await until(isPending).toBe(false, { timeout: 3000 })
    }

    if(isLoggedIn.value) return navigateTo('/')
})
