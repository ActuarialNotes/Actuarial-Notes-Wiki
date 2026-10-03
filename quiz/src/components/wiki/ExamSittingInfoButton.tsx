import { useEffect, useMemo, useRef, useState } from 'react'
import { ExternalLink, Info, X } from 'lucide-react'
import { ExamLogo } from '@/components/ExamLogo'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { useExamVersion } from '@/hooks/useExamVersion'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { examAbout, sittingDetailsFor } from '@/data/examSittingDetails'
import { sittingVersionLabel, type ExamSitting } from '@/data/examSittings'
import { sittingTimeline } from '@/lib/sittingTimeline'
import { SittingTimeline } from '@/components/SittingTimeline'
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
    : `About ${examLabel}`

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
  Project: 'Remote project',
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
  // exam's page and the documents its facts were read from — each once.
  const sources = [
    ...(details?.sources ?? []),
    ...(about ? [about.source, ...(about.factSources ?? [])] : []),
  ].filter((s, i, all) => all.findIndex(o => o.url === s.url) === i)


  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-[80] flex justify-center overflow-y-auto p-4 paper-scrim"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exam-sitting-info-title"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
        {/* `m-auto`, not `items-center`: a panel taller than the screen
            (PCPA's) then scrolls from its top instead of losing it. */}
        <div className="relative z-10 m-auto flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-card p-5 shadow-2xl">
          <header className="flex items-start gap-3">
            <ExamLogo examKey={progressKey} size="md" />
            <div className="min-w-0 flex-1">
              <h2 id="exam-sitting-info-title" className="text-base font-semibold leading-tight">
                {sitting ? `${sittingVersionLabel(sitting)} sitting` : examLabel}
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {sitting ? `${examLabel} · ${FORMAT_LABEL[sitting.format]}` : 'No sitting on file'}
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
              {about?.noSittings ?? `No upcoming sitting of ${examLabel} has been published yet.`}
            </p>
          )}

          {details?.notes && details.notes.length > 0 && (
            <ul className="space-y-1.5 rounded-lg bg-muted/50 p-3 text-xs leading-relaxed">
              {details.notes.map(n => <li key={n}>{n}</li>)}
            </ul>
          )}

          {about && about.facts.length > 0 && (
            <section>
              <h3 className="mb-2 text-xs font-medium text-muted-foreground">The exam</h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                {about.facts.map(f => (
                  <div key={f.label} className="contents">
                    <dt className="text-muted-foreground">{f.label}</dt>
                    <dd className="min-w-0">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
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
