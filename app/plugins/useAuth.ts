export default defineNuxtPlugin(() => {
    const session = authClient.useSession()

    const user = computed(() => session.value.data?.user)
    const isLoggedIn = computed(() => !!session.value.data)
    const isPending = computed(() => session.value.isPending)

    return {
        provide: {
            authSession: { session, user, isLoggedIn, isPending }
        }
    }
})