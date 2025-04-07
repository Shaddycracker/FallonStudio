import type { NextApiRequest, NextApiResponse } from "next"
import { validateCredentials, createToken } from "@/lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" })
        }

        const isValid = await validateCredentials(username, password)

        if (!isValid) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const token = await createToken(username)

        // Set cookie for server-side auth
        res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24}`)

        return res.status(200).json({ token })
    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).json({ error: "Authentication failed" })
    }
}

