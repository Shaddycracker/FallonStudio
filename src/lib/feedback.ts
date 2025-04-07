import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Types
export interface Feedback {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
}

export interface FeedbackInput {
  name: string
  email: string
  message: string
}

// Path to the feedback data file
const DATA_PATH = process.env.DATA_PATH || path.join(process.cwd(), "data", "feedback.json")

// Initialize the data file
async function initDataFile(): Promise<void> {
  try {
    // Ensure directory exists
    const dir = path.dirname(DATA_PATH)
    await fs.mkdir(dir, { recursive: true })

    // Check if file exists, if not create it
    try {
      await fs.access(DATA_PATH)
    } catch (error) {
        // File doesn't exist, create it with an empty array
        console.log(`Creating data file at ${DATA_PATH}`)
        console.error("Data file not found, creating a new one.",error)
      await fs.writeFile(DATA_PATH, JSON.stringify([]))
    }
  } catch (error) {
    console.error("Error initializing data file:", error)
  }
}

// Get all feedback entries
export async function getAllFeedback(): Promise<Feedback[]> {
  await initDataFile()

  try {
    const data = await fs.readFile(DATA_PATH, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading feedback data:", error)
    return []
  }
}

// Create a new feedback entry
export async function createFeedback(input: FeedbackInput): Promise<Feedback> {
  await initDataFile()

  const newFeedback: Feedback = {
    id: uuidv4(),
    name: input.name,
    email: input.email,
    message: input.message,
    timestamp: new Date().toISOString(),
  }

  try {
    const feedbacks = await getAllFeedback()
    feedbacks.push(newFeedback)
    await fs.writeFile(DATA_PATH, JSON.stringify(feedbacks, null, 2))
    return newFeedback
  } catch (error) {
    console.error("Error saving feedback:", error)
    throw new Error("Failed to save feedback")
  }
}

