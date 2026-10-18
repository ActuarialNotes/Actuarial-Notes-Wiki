import type { SelfGrade } from '@/lib/parser'
import type { Confidence } from '@/lib/tutor/memory'
import type { ConfusionReason } from '@/lib/tutor/log'
import type { TutorStep } from '@/lib/tutor/scheduler'
import type { SessionFocus } from '@/stores/tutorStore'

/** What the Tutor's views can ask the app to do — implemented once, in `TutorApp`. */
export interface TutorActions {
  startSession: (focus?: SessionFocus | null) => void
  endSession: () => void
  /** Open a concept's page to read, folding the panel away while it is read. */
  read: (concept: string) => void
  /** Open two concepts side by side — the popup's page stack. */
  compare: (a: string, b: string) => void
  answer: (step: Extract<TutorStep, { type: 'item' }>, grade: SelfGrade, confidence: Confidence | null, answer: string, seconds: number) => void
  /** "I'm confused": flag it, and do what that kind of confusion calls for. */
  confused: (concept: string, reason: ConfusionReason, concepts?: string[]) => void
  setExamDate: (day: string | null) => Promise<boolean>
}
