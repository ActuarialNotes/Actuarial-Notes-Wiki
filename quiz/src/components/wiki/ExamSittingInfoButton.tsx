import { useEffect, useMemo, useRef, useState } from 'react'
import { ExternalLink, Info, X } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { useExamVersion } from '@/hooks/useExamVersion'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { examAbout, sittingDetailsFor } from '@/data/examSittingDetails'
import { sittingVersionLabel, type ExamSitting } from '@/data/examSittings'
import {
  formatStepDate,
  sittingTimeline,
  stepCountdown,
  type SittingStep,
} from '@/lib/sittingTimeline'
import { todayISO } from '@/lib/studyPlan'
import { cn } from '@/lib/utils'

/**
 * **About this sitting** — the study guide's info button, in the sticky header
 * beside the version menu it describes.
 *
 * The version menu says *which* sitting the page is being read for; this says
 * what that sitting asks of a candidate and when: registration opening and
 * closing, the window (PCPA's project window, with the exam deadline that
 * gates it), and results. Every date is the publisher's — transcribed into
 * `data/examSittingDetails.ts` with the page it came from, which the panel
 * links — laid out as a timeline with today placed on it by
 * `lib/sittingTimeline.ts`, so the one thing that matters next carries its
 * countdown.
 *
 * Both this and the menu read `useExamVersion`, so switching the version
 * switches what this panel describes. An exam with no sitting on file still
 * gets the button: the panel says so and hands over the publisher's page,
 * rather than the header dropping a control the reader expects to find.
 */
export function ExamSittingInfoButton({
  progressKey,
  wikiExamId,
  examLabel,
}: {
  progressKey: string
  /** The study guide's own id (`6u-1`) — Exam 6's two guides share a key. */
  wikiExamId: string
  examLabel: string
}) {
  const { selected } = useExamVersion(progressKey)
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const label = selected
    ? `About the ${sittingVersionLabel(selected)} sitting`
    : `About ${examLabel}'s sittings`

  function close() {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        title={label}
        className={cn(
          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring not-prose',
          open && 'bg-accent text-foreground',
        )}
      >
        <Info className="h-4 w-4" aria-hidden />
      </button>
      {open && (
        <ExamSittingInfoDialog
          progressKey={progressKey}
          wikiExamId={wikiExamId}
          examLabel={examLabel}
          sitting={selected}
          onClose={close}
        />
      )}
    </>
  )
}

const FORMAT_LABEL: Record<ExamSitting['format'], string> = {
  CBT: 'Computer-based',
  'P/P': 'Paper and pencil',
}

function ExamSittingInfoDialog({
  progressKey,
  wikiExamId,
  examLabel,
  sitting,
  onClose,
}: {
  progressKey: string
  wikiExamId: string
  examLabel: string
  sitting: ExamSitting | null
  onClose: () => void
}) {
  useSoundOnMount('open')
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => { closeRef.current?.focus() }, [])
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      e.preventDefault()
      onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const today = todayISO()
  const details = sitting ? sittingDetailsFor(progressKey, sitting) : null
  const about = examAbout(progressKey, wikiExamId)
  const steps = useMemo(
    () => (sitting ? sittingTimeline(sitting, details?.milestones ?? [], today) : []),
    [sitting, details, today],
  )

  // The publisher's pages, sitting first: the dates' own sources, then the
  // exam's page if it isn't one of them already.
  const sources = [
    ...(details?.sources ?? []),
    ...(about && !details?.sources.some(s => s.url === about.source.url) ? [about.source] : []),
  ]

  const title = sitting ? `${sittingVersionLabel(sitting)} sitting` : 'No sitting on file'

  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 paper-scrim sm:items-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exam-sitting-info-title"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
        <div className="relative z-10 my-8 flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-card p-5 shadow-2xl">
          <header className="flex items-start gap-3">
            <ExamLogo examKey={progressKey} size="md" />
            <div className="min-w-0 flex-1">
              <h2 id="exam-sitting-info-title" className="text-base font-semibold leading-tight">{title}</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {examLabel}
                {sitting && ` · ${FORMAT_LABEL[sitting.format]}`}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {sitting ? (
            <SittingTimeline steps={steps} today={today} />
          ) : (
            <p className="text-sm">
              No upcoming sitting of {examLabel} has been published yet.
            </p>
          )}

          {about && about.facts.length > 0 && (
            <section>
              <h3 className="mb-2 text-xs font-medium text-muted-foreground">The exam</h3>
              <dl className="space-y-1.5 text-sm">
                {about.facts.map(f => (
                  <div key={f.label} className="flex items-baseline justify-between gap-4">
                    <dt className="shrink-0 text-muted-foreground">{f.label}</dt>
                    <dd className="min-w-0 text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {details?.notes && details.notes.length > 0 && (
            <ul className="space-y-1.5 rounded-lg bg-muted/50 p-3 text-xs leading-relaxed">
              {details.notes.map(n => <li key={n}>{n}</li>)}
            </ul>
          )}

          {sources.length > 0 && (
            <footer className="flex flex-wrap gap-x-4 gap-y-1.5 border-t pt-3">
              {sources.map(s => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="h-3 w-3" aria-hidden />
                  {s.label}
                </a>
              ))}
            </footer>
          )}
        </div>
      </div>
    </OverlayPortal>
  )
}

/**
 * The sitting's dates, top to bottom, on one rule: a check on what has passed,
 * a filled dot on what is happening today, a ring on what comes next — which
 * alone carries a countdown — and a hollow dot on everything after.
 */
function SittingTimeline({ steps, today }: { steps: SittingStep[]; today: string }) {
  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const countdown = stepCountdown(step, today)
        const last = i === steps.length - 1
        return (
          <li key={`${step.kind}|${step.date}|${step.label}`} className={cn('relative flex gap-3', !last && 'pb-4')}>
            {!last && <span className="absolute left-2 top-5 bottom-0 w-px -translate-x-1/2 bg-border" aria-hidden />}
            <span className="flex h-5 w-4 shrink-0 items-center justify-center">
              <StepMarker state={step.state} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className={cn('text-sm font-medium', step.state === 'done' && 'text-muted-foreground')}>
                  {step.label}
                  <span className="sr-only">{STATE_SR[step.state]}</span>
                </span>
                {countdown && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {countdown}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground tabular-nums">
                {formatStepDate(step)}
                {step.note && <> · {step.note}</>}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/** Drawn only — the state is read out in the step's label (`STATE_SR`). */
function StepMarker({ state }: { state: SittingStep['state'] }) {
  if (state === 'done') return <CheckMark className="h-4 w-4" />
  if (state === 'now') return <span className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" aria-hidden />
  if (state === 'next') return <span className="h-3 w-3 rounded-full border-2 border-primary bg-card" aria-hidden />
  return <span className="h-2.5 w-2.5 rounded-full border-2 border-muted-foreground/40 bg-card" aria-hidden />
}

const STATE_SR: Record<SittingStep['state'], string> = {
  done: ' (passed)',
  now: ' (today)',
  next: ' (next)',
  later: '',
}
