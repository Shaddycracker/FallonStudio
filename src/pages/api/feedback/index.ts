import type { NextApiRequest, NextApiResponse } from "next"
import { createFeedback, getAllFeedback } from "@/lib/feedback"
import { verifyToken } from "@/lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Handle GET request - get all feedback (protected)
    if (req.method === "GET") {
        try {
            // Check authentication
            const authHeader = req.headers.authorization
            const token = authHeader?.split(" ")[1] || req.cookies.token

            if (!token) {
                return res.status(401).json({ error: "Authentication required" })
            }

            const user = await verifyToken(token)

            if (!user) {
                return res.status(401).json({ error: "Invalid or expired token" })
            }

            const feedbacks = await getAllFeedback()
            return res.status(200).json(feedbacks)
        } catch (error) {
            console.error("Error fetching feedback:", error)
            return res.status(500).json({ error: "Failed to fetch feedback" })
        }
    }

    // Handle POST request - create new feedback (public)
    if (req.method === "POST") {
        try {
            const { name, email, message } = req.body

            // Validate input
            if (!name || !email || !message) {
                return res.status(400).json({ error: "Name, email, and message are required" })
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "Invalid email format" })
            }

            const newFeedback = await createFeedback({ name, email, message })
            return res.status(201).json(newFeedback)
        } catch (error) {
            console.error("Error creating feedback:", error)
            return res.status(500).json({ error: "Failed to create feedback" })
        }
    }

    // Handle unsupported methods
    return res.status(405).json({ error: "Method not allowed" })
}

