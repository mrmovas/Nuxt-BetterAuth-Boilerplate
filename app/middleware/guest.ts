export default defineNuxtRouteMiddleware(async () => {
    const session = authClient.useSession()

    if(session.value.data) return navigateTo('/')
})
