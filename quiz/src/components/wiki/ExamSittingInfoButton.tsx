import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ExternalLink, Info, X } from 'lucide-react'
import { ExamLogo } from '@/components/ExamLogo'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { useExamVersion } from '@/hooks/useExamVersion'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { examAbout, sittingDetailsFor } from '@/data/examSittingDetails'
import { sittingVersionLabel, type ExamSitting } from '@/data/examSittings'
import { sittingTimeline } from '@/lib/sittingTimeline'
import { SittingDates, SittingStatus } from '@/components/SittingTimeline'
import { Group, GroupRow } from '@/components/ui/GroupedList'
import { examAccentStyle } from '@/lib/examColors'
import { aboutRows, sourceRows } from '@/lib/sittingInfo'
import { todayISO } from '@/lib/studyPlan'
import { inkToolTile } from '@/components/ui/ink'

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
        className={inkToolTile(open)}
      >
        <Info className="h-[18px] w-[18px]" aria-hidden />
        <span aria-hidden>Info</span>
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


  const [allSources, setAllSources] = useState(false)
  const { shown: shownSources, hidden: hiddenSources } = sourceRows(sources, allSources)
  const facts = about ? aboutRows(about.facts) : []

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
            (PCPA's) then scrolls from its top instead of losing it. The sheet
            is `bg-background` so its groups (`bg-card`) read as cards on it. */}
        <div
          className="relative z-10 m-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-background p-4 shadow-2xl"
          style={examAccentStyle(progressKey)}
        >
          <header className="flex items-center gap-3 px-1 pt-1">
            <ExamLogo examKey={progressKey} size="md" />
            <div className="min-w-0 flex-1">
              <h2 id="exam-sitting-info-title" className="text-base font-semibold leading-tight">
                {examLabel}
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {sitting ? `${sittingMonthYear(sitting)} sitting · ${FORMAT_LABEL[sitting.format]}` : 'No sitting on file'}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {sitting ? (
            <>
              <SittingStatus steps={steps} today={today} examKey={progressKey} />
              <SittingDates
                steps={steps}
                today={today}
                windowNote={details?.windowNote}
                footer={details?.notes?.map(n => <p key={n}>{n}</p>)}
              />
            </>
          ) : (
            <p className="rounded-xl bg-card px-3.5 py-3 text-sm">
              {about?.noSittings ?? `No upcoming sitting of ${examLabel} has been published yet.`}
            </p>
          )}

          {facts.length > 0 && (
            <Group label="The exam">
              {facts.map(f => (
                <GroupRow
                  key={f.label}
                  label={f.label}
                  value={f.inline ? f.value : undefined}
                  detail={f.inline ? undefined : f.value}
                />
              ))}
            </Group>
          )}

          {sources.length > 0 && (
            <Group label="Sources">
              {shownSources.map(s => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-3.5 py-2.5 text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
                >
                  {s.publisher && (
                    <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md bg-muted px-1 text-[9px] font-extrabold tracking-wide text-muted-foreground">
                      {s.publisher}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">{s.title}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                </a>
              ))}
              {hiddenSources > 0 && (
                <button
                  type="button"
                  onClick={() => setAllSources(true)}
                  className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
                >
                  <span className="min-w-0 flex-1">{hiddenSources} more</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden />
                </button>
              )}
            </Group>
          )}
        </div>
      </div>
    </OverlayPortal>
  )
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** "November 2026" — the subtitle has room the version menu's "Nov 2026" doesn't. */
function sittingMonthYear(sitting: ExamSitting): string {
  const [year, month] = sitting.startDate.split('-').map(Number)
  return `${MONTH_NAMES[month - 1]} ${year}`
}
