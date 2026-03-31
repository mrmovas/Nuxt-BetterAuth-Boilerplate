import { authClient } from '~/lib/auth'

export default defineNuxtRouteMiddleware(async (to) => {
    // Forward the browser's Cookie header on SSR; on CSR this returns {}.
    // credentials: 'include' handles cross-origin cookie sending in the browser.
    const headers = useRequestHeaders(['cookie'])
    type Session = (typeof authClient)['$Infer']['Session']
    const { data: sessionData } = await authClient.$fetch<Session | null>('/get-session', {
        headers,
        credentials: 'include',
    })

    const user = sessionData?.user

    const isProtected = to.meta.auth === true
    const isGuestOnly = to.meta.auth === 'guest'

    if (isProtected && !user) {
        return navigateTo('/auth')
    }

    if (isGuestOnly && user) {
        return navigateTo('/')
    }
})