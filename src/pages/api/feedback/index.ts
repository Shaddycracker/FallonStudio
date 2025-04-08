import type { NextApiRequest, NextApiResponse } from "next"
import { createFeedback, getAllFeedback } from "@/lib/feedback"
import { verifyToken } from "@/lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const token = req.headers.authorization?.split(" ")[1] || req.cookies.token

        if (!token) {
            return res.status(401).json({ error: "Authentication required" })
        }

        const user = await verifyToken(token)
        if (!user) {
            return res.status(401).json({ error: "Invalid or expired token" })
        }

        const feedbacks = await getAllFeedback()
        return res.status(200).json(feedbacks)
    }

    if (req.method === "POST") {
        const { name, email, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Name, email, and message are required" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" })
        }

        const newFeedback = await createFeedback({ name, email, message })
        if (!newFeedback) {
            return res.status(500).json({ error: "Failed to create feedback" })
        }

        return res.status(201).json(newFeedback)
    }

    return res.status(405).json({ error: "Method not allowed" })
}
