import { createAuthClient } from "better-auth/vue"
import { inferAdditionalFields } from 'better-auth/client/plugins'

const backendUrl = 'http://localhost:4000'

export const authClient = createAuthClient({
    baseURL: `${backendUrl}/api/auth`, // The base URL of your auth server

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