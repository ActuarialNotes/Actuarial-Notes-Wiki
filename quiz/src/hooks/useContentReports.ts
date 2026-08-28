// The human write path into VERIFY: a reader tells us a page is wrong.
//
// Reports land in `content_reports` (supabase/migrations/20260823_content_reports.sql)
// and `scripts/sync_reports.py` appends each one to the target page's
// append-only sidecar log before the next fact-check sweep, where the agent
// reads it in full. So this is not a support ticket that disappears into an
// inbox — what a reader writes here becomes part of the page's permanent record.
//
// Signed-in only. Not for gatekeeping: an anonymous write path on a table whose
// contents get committed to a public repo is an open door, and the reporter's
// account is also the only way to come back to them if the report needs a
// follow-up. The name credited in the log is the one they choose here, never
// their account identity.

import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export const REPORT_SEVERITIES = ['wrong answer', 'typo', 'unclear', 'other'] as const
export type ReportSeverity = (typeof REPORT_SEVERITIES)[number]

/** Mirrors the CHECK constraint on `content_reports.body`. */
export const REPORT_MAX_LENGTH = 4000

export interface ContentReportDraft {
  contentPath: string
  locus?: string
  body: string
  severity?: ReportSeverity
  /** How the reporter wants to be credited in the public log. */
  reporterName?: string
}

export interface UseContentReportsResult {
  submit: (draft: ContentReportDraft) => Promise<void>
  submitting: boolean
  error: string | null
  submitted: boolean
  reset: () => void
  canReport: boolean
}

export function useContentReports(): UseContentReportsResult {
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const reset = useCallback(() => {
    setError(null)
    setSubmitted(false)
  }, [])

  const submit = useCallback(async (draft: ContentReportDraft) => {
    if (!user) {
      setError('Sign in to report an issue.')
      return
    }
    const body = draft.body.trim()
    if (!body) {
      setError('Tell us what looks wrong.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const { error: insertError } = await supabase.from('content_reports').insert({
        content_path: draft.contentPath,
        user_id: user.id,
        reporter_name: draft.reporterName?.trim() || null,
        locus: draft.locus?.trim() || null,
        body: body.slice(0, REPORT_MAX_LENGTH),
        severity: draft.severity ?? null,
      })
      if (insertError) throw insertError
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send that report. Try again.')
    } finally {
      setSubmitting(false)
    }
  }, [user])

  return { submit, submitting, error, submitted, reset, canReport: Boolean(user) }
}
