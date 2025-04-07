import type { NextApiRequest, NextApiResponse } from "next"
import { verifyToken } from "@/lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow GET requests
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    try {
        const authHeader = req.headers.authorization
        const token = authHeader?.split(" ")[1] || req.cookies.token

        if (!token) {
            return res.status(401).json({ error: "Authentication required" })
        }

        const user = await verifyToken(token)

        if (!user) {
            return res.status(401).json({ error: "Invalid or expired token" })
        }

        return res.status(200).json({ valid: true })
    } catch (error) {
        console.error("Token verification error:", error)
        return res.status(401).json({ error: "Authentication failed" })
    }
}

