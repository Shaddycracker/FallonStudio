"use client"

import { useState, useEffect } from "react"
import { Box, Card, CardContent, Typography, CircularProgress, Alert, Chip, Paper } from "@mui/material"
import { formatDate } from "@/lib/utils"

interface Feedback {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
}

const AdminView = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const response = await fetch("/api/feedback")

        if (!response.ok) {
          throw new Error("Failed to load feedback")
        }

        const data = await response.json()
        setFeedbacks(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching feedback:", err)
        setError("Failed to load feedback. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadFeedback()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper elevation={3} className="p-6">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Admin View - Submitted Feedback
      </Typography>

      {error ? (
        <Alert severity="error" className="mt-4">
          {error}
        </Alert>
      ) : feedbacks.length === 0 ? (
        <Alert severity="info" className="mt-4">
          No feedback submissions yet.
        </Alert>
      ) : (
          <Box sx={{ mt: 4 }}>
            <Box
                sx={{
                  display: "grid",
                  gap: 3,
                  gridTemplateColumns: "repeat(12, 1fr)", // to mimic xs={12}
                }}
            >
              {feedbacks.map((feedback) => (
                  <Box
                      key={feedback.id}
                      sx={{
                        gridColumn: "span 12", // xs=12 equivalent
                      }}
                  >
                    <Card variant="outlined" className="hover:shadow-md transition-shadow">
                      <CardContent>
                        <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              mb: 1,
                            }}
                        >
                          <Typography variant="h6" component="div">
                            {feedback.name}
                          </Typography>
                          <Chip
                              label={formatDate(feedback.timestamp)}
                              size="small"
                              color="primary"
                              variant="outlined"
                          />
                        </Box>
                        <Typography color="text.secondary" gutterBottom>
                          {feedback.email}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2, whiteSpace: "pre-wrap" }}>
                          {feedback.message}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
              ))}
            </Box>
          </Box>

      )}
    </Paper>
  )
}

export default AdminView

