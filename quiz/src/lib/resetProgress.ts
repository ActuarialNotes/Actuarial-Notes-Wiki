// Clears quiz history and learning progress, either for a single exam or for
// every exam at once. Used by the "Progress & Data" controls in Settings.
//
// quiz_sessions cascades to question_responses; concept_mastery and
// daily_completions are the source of the "Learning Progress" view and the
// heatmap's plan-completion coloring, so both must be cleared for the heatmap
// and mastery state to reset. study_plan_cache is derived from mastery, so
// it's cleared (not the whole exam_progress row, which also holds the user's
// manually-set exam status/target date).

import { supabase } from '@/lib/supabase'
import { EXAM_ID_TO_LABEL } from '@/lib/examIds'
import { clearLocalMastery } from '@/lib/localMasteryStore'
import { LAST_SESSION_KEY, readLastSession } from '@/stores/quizStore'

function clearLastSessionLocal(examLabel?: string): void {
  try {
    if (!examLabel) {
      localStorage.removeItem(LAST_SESSION_KEY)
      return
    }
    const session = readLastSession()
    if (session?.questions?.[0]?.exam === examLabel) {
      localStorage.removeItem(LAST_SESSION_KEY)
    }
  } catch { /* ignore */ }
}

/**
 * Resets quiz history and learning progress for the given user.
 * Pass `examId` (e.g. "P" or "FM") to scope the reset to one exam, or
 * `null` to reset every exam.
 *
 * Returns an error message on failure, or `null` on success.
 */
export async function resetProgressData(userId: string, examId: string | null): Promise<string | null> {
  const examLabel = examId !== null ? EXAM_ID_TO_LABEL[examId] : undefined

  let masteryQuery = supabase.from('concept_mastery').delete().eq('user_id', userId)
  let completionsQuery = supabase.from('daily_completions').delete().eq('user_id', userId)
  let progressQuery = supabase.from('exam_progress').update({ study_plan_cache: null }).eq('user_id', userId)

  if (examId !== null) {
    masteryQuery = masteryQuery.eq('exam_id', examId)
    completionsQuery = completionsQuery.eq('exam_id', examId)
    progressQuery = progressQuery.eq('exam_id', examId)
  }

  // Skip the quiz_sessions delete for an unknown exam id rather than risk
  // deleting sessions for every exam.
  if (examId === null || examLabel) {
    let sessionsQuery = supabase.from('quiz_sessions').delete().eq('user_id', userId)
    if (examLabel) sessionsQuery = sessionsQuery.eq('exam', examLabel)
    const { error: sessionsError } = await sessionsQuery
    if (sessionsError) return sessionsError.message
  }

  const { error: masteryError } = await masteryQuery
  if (masteryError) return masteryError.message

  const { error: completionsError } = await completionsQuery
  if (completionsError) return completionsError.message

  const { error: progressError } = await progressQuery
  if (progressError) return progressError.message

  clearLocalMastery(examId ?? undefined)
  clearLastSessionLocal(examLabel)
  return null
}
