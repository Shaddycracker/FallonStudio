import { supabase } from "@/utils/supabase"

export interface Feedback {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
}

export async function getAllFeedback(): Promise<Feedback[]> {
  const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("timestamp", { ascending: false })

  if (error) {
    console.error("Error fetching feedback from Supabase:", error)
    return []
  }

  return data as Feedbanck[]
}

export async function createFeedback(input: Omit<Feedback, "id" | "timestamp">): Promise<Feedback | null> {
  const { data, error } = await supabase
      .from("feedback")
      .insert([input])
      .select()
      .single()

  if (error) {
    console.error("Error inserting feedback into Supabase:", error)
    return null
  }

  return data as Feedback
}
