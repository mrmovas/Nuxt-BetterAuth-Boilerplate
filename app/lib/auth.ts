import { createAuthClient } from "better-auth/vue"
import { inferAdditionalFields } from 'better-auth/client/plugins'

function createClient() {
    const config = useRuntimeConfig()
    
    return createAuthClient({
        baseURL: `${config.public.backendURL}/api/auth`,

        plugins: [
            inferAdditionalFields({
                user: {
                    firstName: { type: "string", input: true },
                    lastName: { type: "string", input: true },
                    country: { type: "string", input: true },
                    phoneNumber: { type: "string", input: true },
                    role: { type: ["user", "admin"], input: false },
                }
            })
        ]
    })
}

type AuthClient = ReturnType<typeof createClient>
let _client: AuthClient | null = null

export const authClient = new Proxy({} as AuthClient, {
    get(_, prop: string) {
        if (!_client) _client = createClient()
        return (_client as any)[prop]
    }
})