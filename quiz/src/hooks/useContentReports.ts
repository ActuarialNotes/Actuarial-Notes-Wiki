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
// follow-up. The account identity never reaches the log: a report is credited
// to the reader's display name, or to nobody if they report anonymously.

import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { REPORT_MAX_LENGTH, reportCreditName, type ReportCategory } from '@/lib/reportIssue'

export interface ContentReportDraft {
  contentPath: string
  body: string
  category?: ReportCategory
  /** Leave the credit off: the log entry is authored `human:anon`. */
  anonymous: boolean
}

export interface UseContentReportsResult {
  submit: (draft: ContentReportDraft) => Promise<void>
  submitting: boolean
  error: string | null
  submitted: boolean
  reset: () => void
  canReport: boolean
  /**
   * The name a non-anonymous report is credited to — the one the modal shows
   * the reader before they consent, and the one `submit` sends. Null when the
   * account has no name to credit, in which case every report is anonymous.
   */
  creditName: string | null
}

export function useContentReports(): UseContentReportsResult {
  const { user } = useAuth()
  const creditName = reportCreditName(user?.user_metadata)
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
        reporter_name: draft.anonymous ? null : creditName,
        body: body.slice(0, REPORT_MAX_LENGTH),
        severity: draft.category ?? null,
      })
      if (insertError) throw insertError
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send that report. Try again.')
    } finally {
      setSubmitting(false)
    }
  }, [user, creditName])

  return { submit, submitting, error, submitted, reset, canReport: Boolean(user), creditName }
}
