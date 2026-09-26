import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CalendarClock,
  Circle,
  FileDiff,
  Globe,
  HelpCircle,
  ImageOff,
  Link2Off,
  MessageCircle,
  Puzzle,
  ScanSearch,
  Send,
  Sigma,
  Type,
  Wrench,
  X,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { Button } from '@/components/ui/button'
import { CheckMark } from '@/components/CheckMark'
import { NavProgressBar } from '@/components/NavProgressBar'
import { useContentReports } from '@/hooks/useContentReports'
import {
  REPORT_MAX_LENGTH,
  REPORT_STEPS,
  canContinue,
  reportCategoriesFor,
  reportCategory,
  type ReportCategory,
  type ReportDraft,
  type ReportStep,
} from '@/lib/reportIssue'
import { cn } from '@/lib/utils'

/**
 * "Report an issue" — the reader's way into the fact-check record.
 *
 * A student working a question line by line is the best-placed error detector
 * this project has, so the form asks them for as little as it can: three pages,
 * one decision each. What kind of problem it is; what's wrong, in their own
 * words; and whether their name goes on it. The last page shows the report
 * exactly as it will be published and says what happens to it next — it is
 * appended to the page's *public* fact-check log and read in full by the next
 * review — and Send stays off until the reader has agreed to that. A reader
 * deciding whether to put their name on something should know where it goes
 * before it goes there, not find out from the thank-you.
 *
 * The categories, the steps and the credit name are data, in `lib/reportIssue.ts`.
 */

interface ReportIssueModalProps {
  open: boolean
  onClose: () => void
  /** Repo-relative vault path, e.g. `questions/exam-5/cas5-2013f-009.md`. */
  contentPath: string
  contentName?: string
}

const CATEGORY_ICONS: Record<ReportCategory, LucideIcon> = {
  'wrong answer': XCircle,
  'solution error': Calculator,
  mistranscribed: FileDiff,
  incorrect: Sigma,
  missing: Puzzle,
  outdated: CalendarClock,
  typo: Type,
  unclear: HelpCircle,
  display: ImageOff,
  'broken link': Link2Off,
  other: MessageCircle,
}

const STEP_TITLES: Record<ReportStep, string> = {
  category: "What's wrong?",
  details: 'Describe the problem',
  send: 'Review and send',
}

/** The three pages as chapters of the footer bar, so it reads as a stepper. */
const STEP_SEGMENTS = [
  { start: 1, label: 'Kind of problem' },
  { start: 2, label: 'Description' },
  { start: 3, label: 'Send' },
]

/** Past this many characters the count appears; below it, it's only noise. */
const SHOW_COUNT_FROM = REPORT_MAX_LENGTH - 500

// Anonymous by default: the log is a public repository, so putting a name on
// a report is the thing a reader opts into, not out of.
const EMPTY_DRAFT: ReportDraft = { category: null, body: '', anonymous: true, consent: false }

export function ReportIssueModal({ open, onClose, contentPath, contentName }: ReportIssueModalProps) {
  const { submit, submitting, error, submitted, reset, canReport, creditName } = useContentReports()
  const [stepIndex, setStepIndex] = useState(0)
  const [draft, setDraft] = useState<ReportDraft>(EMPTY_DRAFT)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const headingId = useId()
  const bodyId = useId()

  const step = REPORT_STEPS[stepIndex]
  const categories = useMemo(() => reportCategoriesFor(contentPath), [contentPath])
  const chosen = reportCategory(draft.category)
  // No name on the account means nothing to credit, whatever the box says.
  const anonymous = draft.anonymous || !creditName

  useEffect(() => {
    if (!open) return
    reset()
    setStepIndex(0)
    setDraft(EMPTY_DRAFT)
  }, [open, reset])

  // Esc closes the report and only the report. It is opened from the Fact
  // Check sheet, which binds Esc on the window too — so this listens in the
  // capture phase, ahead of it, and stops the key there; otherwise one press
  // would close the record behind the report as well.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      e.preventDefault()
      e.stopPropagation()
      onClose()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open, onClose])

  // Focus follows the page: into the text box on the page that is one, onto
  // the new heading otherwise, so a screen reader hears which page this is.
  useEffect(() => {
    if (!open || submitted || !canReport) return
    if (step === 'details') bodyRef.current?.focus()
    else headingRef.current?.focus()
  }, [open, step, submitted, canReport])

  if (!open) return null

  function update(patch: Partial<ReportDraft>) {
    setDraft((d) => {
      const nextDraft = { ...d, ...patch }
      // Consent is to *this* report. Change what it says and it is asked again.
      if (patch.body !== undefined || patch.category !== undefined) nextDraft.consent = false
      return nextDraft
    })
  }

  function goNext() {
    if (canContinue(step, draft)) setStepIndex((i) => Math.min(i + 1, REPORT_STEPS.length - 1))
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0))
  }

  function send() {
    if (!canContinue('send', draft) || !draft.category || submitting) return
    void submit({ contentPath, body: draft.body, category: draft.category, anonymous })
  }

  const title = !canReport ? 'Report an issue' : submitted ? 'Report sent' : STEP_TITLES[step]
  const showSteps = canReport && !submitted

  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-[130] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4 paper-scrim"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-card shadow-2xl sm:rounded-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
        >
          <div className="flex items-start justify-between gap-3 px-5 pt-5">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">
                Report an issue · {contentName ?? contentPath}
              </p>
              <h2
                ref={headingRef}
                id={headingId}
                tabIndex={-1}
                className="mt-0.5 text-base font-semibold outline-none"
              >
                {title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-sound="tap"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-4">
            {!canReport ? (
              <p className="py-4 text-sm text-muted-foreground">
                Sign in to report an issue with this page.
              </p>
            ) : submitted ? (
              <div className="space-y-3 py-4 text-center">
                <CheckMark className="mx-auto h-8 w-8" />
                <p className="text-sm text-muted-foreground">
                  Thank you. It will be added to this page's public fact-check log and read in
                  full at the next review.
                </p>
              </div>
            ) : step === 'category' ? (
              <div className="grid gap-1.5 sm:grid-cols-2">
                {categories.map((option) => {
                  const Icon = CATEGORY_ICONS[option.value]
                  const selected = draft.category === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      data-sound="select"
                      onClick={() => {
                        update({ category: option.value })
                        setStepIndex(1)
                      }}
                      className={cn(
                        'flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        selected ? 'bg-accent' : 'bg-muted/50 hover:bg-accent',
                      )}
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium leading-snug">{option.label}</span>
                        <span className="block text-xs text-muted-foreground">{option.hint}</span>
                      </span>
                      {selected && <CheckMark className="mt-0.5 h-4 w-4" />}
                    </button>
                  )
                })}
              </div>
            ) : step === 'details' ? (
              <div>
                {chosen && <CategoryPill category={chosen.value} label={chosen.label} />}
                <label htmlFor={bodyId} className="sr-only">
                  Describe the problem
                </label>
                <textarea
                  id={bodyId}
                  ref={bodyRef}
                  value={draft.body}
                  onChange={(e) => update({ body: e.target.value.slice(0, REPORT_MAX_LENGTH) })}
                  onKeyDown={(e) => {
                    // ⌘/Ctrl+Enter moves on; a plain Enter is a new line.
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault()
                      goNext()
                    }
                  }}
                  rows={6}
                  placeholder={chosen?.prompt ?? 'What looks wrong?'}
                  className="mt-3 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
                />
                {draft.body.length >= SHOW_COUNT_FROM && (
                  <p className="mt-1 text-right text-xs tabular-nums text-muted-foreground">
                    {draft.body.length}/{REPORT_MAX_LENGTH}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* The report exactly as it will appear in the log — what the
                    reader is agreeing to publish, not a description of it. */}
                <figure className="rounded-lg bg-muted/60 p-3">
                  {chosen && <CategoryPill category={chosen.value} label={chosen.label} />}
                  <blockquote className="mt-2 line-clamp-5 whitespace-pre-wrap break-words text-sm">
                    {draft.body.trim()}
                  </blockquote>
                  <figcaption className="mt-2 text-xs text-muted-foreground">
                    — {anonymous ? 'Anonymous' : creditName}
                  </figcaption>
                </figure>

                <CheckRow
                  checked={anonymous}
                  disabled={!creditName}
                  onToggle={() => update({ anonymous: !draft.anonymous })}
                  detail={creditName ? undefined : 'No display name is set on your account'}
                >
                  Report anonymously
                </CheckRow>

                <section aria-label="What happens next">
                  <h3 className="mb-2 text-xs font-medium text-muted-foreground">What happens next</h3>
                  <ol className="space-y-2.5">
                    <NextStep icon={Globe} title="It's published">
                      Added to this page's public fact-check log on GitHub. Your email and account
                      are never included, so leave out anything private.
                    </NextStep>
                    <NextStep icon={ScanSearch} title="It's reviewed">
                      The next fact-check review reads it in full and checks it against the source.
                    </NextStep>
                    <NextStep icon={Wrench} title="It's fixed if it holds up">
                      A confirmed problem is corrected, and shows up in this page's Fact Check record.
                    </NextStep>
                  </ol>
                </section>

                <CheckRow checked={draft.consent} onToggle={() => update({ consent: !draft.consent })}>
                  I agree to this report being published as shown
                </CheckRow>

                {error && (
                  <p className="text-xs text-destructive" role="alert">{error}</p>
                )}
              </div>
            )}
          </div>

          {showSteps && (
            <NavProgressBar
              current={stepIndex + 1}
              total={REPORT_STEPS.length}
              segments={STEP_SEGMENTS}
              label={`Step ${stepIndex + 1} of ${REPORT_STEPS.length}`}
            />
          )}
          <div className="flex items-center justify-between gap-2 px-5 py-3">
            {showSteps && stepIndex > 0 ? (
              <Button type="button" variant="ghost" onClick={goBack} data-sound="tap">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : showSteps ? (
              <Button type="button" variant="ghost" onClick={onClose} data-sound="tap">
                Cancel
              </Button>
            ) : <span />}
            {!showSteps ? (
              <Button type="button" onClick={onClose} data-sound="tap">
                Close
              </Button>
            ) : step === 'send' ? (
              <Button
                type="button"
                onClick={send}
                disabled={submitting || !canContinue('send', draft)}
                data-sound="tap"
              >
                <Send className="mr-2 h-4 w-4" />
                {submitting ? 'Sending…' : 'Send report'}
              </Button>
            ) : (
              <Button type="button" onClick={goNext} disabled={!canContinue(step, draft)} data-sound="tap">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}

function CategoryPill({ category, label }: { category: ReportCategory; label: string }) {
  const Icon = CATEGORY_ICONS[category]
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {label}
    </span>
  )
}

/** A checkbox drawn with the app's check mark — the same row the quiz settings menu ticks. */
function CheckRow({
  checked,
  onToggle,
  disabled,
  detail,
  children,
}: {
  checked: boolean
  onToggle: () => void
  disabled?: boolean
  /** A line under the label, for why a locked row is locked. */
  detail?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      data-sound="tick"
      onClick={onToggle}
      className={cn(
        'flex w-full items-start gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5 text-left text-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        disabled ? 'cursor-not-allowed opacity-60' : 'hover:bg-accent',
      )}
    >
      {checked ? (
        <CheckMark className="mt-0.5 h-4 w-4" />
      ) : (
        <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" aria-hidden />
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-medium leading-snug">{children}</span>
        {detail && <span className="block text-xs text-muted-foreground">{detail}</span>}
      </span>
    </button>
  )
}

function NextStep({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      <p className="min-w-0 text-sm">
        <span className="font-medium">{title}.</span>{' '}
        <span className="text-muted-foreground">{children}</span>
      </p>
    </li>
  )
}
