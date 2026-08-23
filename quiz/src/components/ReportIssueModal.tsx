import { useEffect, useState } from 'react'
import { X, Send, CheckCircle2 } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { Button } from '@/components/ui/button'
import {
  useContentReports,
  REPORT_SEVERITIES,
  REPORT_MAX_LENGTH,
  type ReportSeverity,
} from '@/hooks/useContentReports'
import { cn } from '@/lib/utils'

/**
 * "Report an issue" — the reader's way into the validation record.
 *
 * A student working a question line by line is the best-placed error detector
 * this project has. What they write here is appended verbatim to the page's
 * append-only log and read in full by the next validation sweep, so the modal
 * says that plainly rather than implying a ticket queue. It also says the part
 * people would otherwise find out afterwards: the words become public.
 */

interface ReportIssueModalProps {
  open: boolean
  onClose: () => void
  /** Repo-relative vault path, e.g. `questions/exam-5/cas5-2013f-009.md`. */
  contentPath: string
  contentName?: string
  /** Pre-fill the locus, e.g. `option C` when opened from an option row. */
  defaultLocus?: string
}

export function ReportIssueModal({
  open,
  onClose,
  contentPath,
  contentName,
  defaultLocus,
}: ReportIssueModalProps) {
  const { submit, submitting, error, submitted, reset, canReport } = useContentReports()
  const [severity, setSeverity] = useState<ReportSeverity>('wrong answer')
  const [locus, setLocus] = useState(defaultLocus ?? '')
  const [body, setBody] = useState('')
  const [reporterName, setReporterName] = useState('')

  useEffect(() => {
    if (!open) return
    reset()
    setLocus(defaultLocus ?? '')
    setBody('')
  }, [open, defaultLocus, reset])

  if (!open) return null

  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-[130] flex items-end justify-center bg-black/40 sm:items-center"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-background p-5 shadow-xl sm:rounded-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Report an issue with this page"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-semibold">Report an issue</h2>
              <p className="truncate text-xs text-muted-foreground">
                {contentName ?? contentPath}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-sound="tap"
              className="rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {submitted ? (
            <div className="space-y-3 py-4 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-green-600 dark:text-green-400" />
              <p className="text-sm font-medium">Thank you — that's on the record.</p>
              <p className="text-xs text-muted-foreground">
                Your report is added to this page's validation log and read in full during the
                next review pass.
              </p>
              <Button onClick={onClose} className="mt-2" data-sound="tap">Close</Button>
            </div>
          ) : !canReport ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Sign in to report an issue with this page.
            </p>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                void submit({ contentPath, locus, body, severity, reporterName })
              }}
            >
              <fieldset>
                <legend className="mb-1.5 text-xs font-medium text-muted-foreground">
                  What kind of problem?
                </legend>
                <div className="flex flex-wrap gap-1.5">
                  {REPORT_SEVERITIES.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSeverity(option)}
                      data-sound="tap"
                      aria-pressed={severity === option}
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors',
                        severity === option
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/70',
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="report-locus" className="mb-1 block text-xs font-medium text-muted-foreground">
                  Where on the page? <span className="font-normal">(optional)</span>
                </label>
                <input
                  id="report-locus"
                  value={locus}
                  onChange={(e) => setLocus(e.target.value)}
                  maxLength={200}
                  placeholder="option C, the explanation, the formula block…"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label htmlFor="report-body" className="mb-1 block text-xs font-medium text-muted-foreground">
                  What looks wrong?
                </label>
                <textarea
                  id="report-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value.slice(0, REPORT_MAX_LENGTH))}
                  rows={5}
                  required
                  placeholder="Be as specific as you can — the number you got, the step that doesn't follow, the source you checked against."
                  className="w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm"
                />
                <p className="mt-1 text-right text-[11px] text-muted-foreground">
                  {body.length}/{REPORT_MAX_LENGTH}
                </p>
              </div>

              <div>
                <label htmlFor="report-name" className="mb-1 block text-xs font-medium text-muted-foreground">
                  Credit this to <span className="font-normal">(optional)</span>
                </label>
                <input
                  id="report-name"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  maxLength={60}
                  placeholder="Anonymous"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                />
              </div>

              {/*
                Said before submitting, not after: the log is a public git
                repository, and a reporter deciding what to write should know
                that while they are writing it.
              */}
              <p className="rounded-lg bg-muted px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
                Your report is appended to this page's public validation log, credited to the
                name above (or “anon”). Your account and email are never included. Please don't
                include anything private.
              </p>

              {error && (
                <p className="text-xs text-red-600 dark:text-red-400" role="alert">{error}</p>
              )}

              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={onClose} data-sound="tap">
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting || !body.trim()} data-sound="tap">
                  <Send className="mr-1.5 h-3.5 w-3.5" />
                  {submitting ? 'Sending…' : 'Send report'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </OverlayPortal>
  )
}
