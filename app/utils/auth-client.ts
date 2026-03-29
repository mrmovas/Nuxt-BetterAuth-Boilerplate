import { createAuthClient } from "better-auth/vue"
import { inferAdditionalFields } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
    baseURL: import.meta.env.NUXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000/api/auth", // The base URL of your auth server

    plugins: [
        inferAdditionalFields({
            user: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                country: { type: "string" },
                phoneNumer: { type: "string" },
                role: { type: ["user", "admin"] },
            }
        })
    ]
})