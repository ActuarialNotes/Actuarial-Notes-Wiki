import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface QuizSession {
  id: string
  user_id: string
  topic: string | null
  subtopic: string | null
  tags: string[] | null
  mode: 'topic' | 'random' | 'exam'
  total_questions: number
  correct_count: number
  time_taken_seconds: number | null
  completed_at: string
}

export interface QuestionResponse {
  id: string
  session_id: string
  user_id: string
  question_id: string
  chosen_answer: string | null
  correct_answer: string
  is_correct: boolean
  time_spent_seconds: number | null
  answered_at: string
}
