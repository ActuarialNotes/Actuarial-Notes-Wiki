import { useEffect, useMemo, useRef, useState } from 'react'
import { CalendarDays, ChevronDown, ExternalLink, Info, X } from 'lucide-react'
import { ExamVersionMenu } from '@/components/wiki/ExamVersionMenu'
import { LABELLED_HEADER_BUTTON } from '@/components/wiki/ExamSyllabusButton'
import { ExamLogo } from '@/components/ExamLogo'
import { INFO_CLOSE, InfoSheet } from '@/components/ui/InfoSheet'
import { GROUP_ACTION_ROW, PublisherChip } from '@/components/ui/infoRows'
import { useExamVersion } from '@/hooks/useExamVersion'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { examAbout, sittingDetailsFor } from '@/data/examSittingDetails'
import { sittingVersionLabel, type ExamSitting } from '@/data/examSittings'
import { sittingTimeline } from '@/lib/sittingTimeline'
import { SittingDates, SittingStatus } from '@/components/SittingTimeline'
import { Group, GroupRow } from '@/components/ui/GroupedList'
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
  labelled = false,
}: {
  progressKey: string
  /** The study guide's own id (`6u-1`) — Exam 6's two guides share a key. */
  wikiExamId: string
  examLabel: string
  /** The exam page's own header: an outlined button that says "Dates and fees". */
  labelled?: boolean
}) {
  const { selected } = useExamVersion(progressKey)
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // The labelled button is named by the words on it, then the sitting.
  const label = labelled
    ? (selected ? `Dates and fees, ${sittingVersionLabel(selected)} sitting` : 'Dates and fees')
    : selected
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
        className={labelled ? LABELLED_HEADER_BUTTON : inkToolTile(open)}
      >
        {labelled ? <CalendarDays aria-hidden /> : <Info className="h-[18px] w-[18px]" aria-hidden />}
        <span aria-hidden>{labelled ? 'Dates and fees' : 'Info'}</span>
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
    <InfoSheet onClose={onClose} labelledBy="exam-sitting-info-title">
          <header className="flex items-center gap-3">
            <ExamLogo examKey={progressKey} size="md" />
            <div className="min-w-0 flex-1">
              <h2 id="exam-sitting-info-title" className="text-[20px] font-bold leading-tight">
                {examLabel}
              </h2>
              <p className="mt-0.5 text-[13px]">
                {sitting ? `${sittingMonthYear(sitting)} sitting · ${FORMAT_LABEL[sitting.format]}` : 'No sitting on file'}
              </p>
            </div>
            {/* Which sitting the panel describes, chosen here. */}
            <div className="shrink-0">
              <ExamVersionMenu progressKey={progressKey} layer="z-[90]" />
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={INFO_CLOSE}
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          {sitting ? (
            <>
              <SittingStatus steps={steps} today={today} />
              <SittingDates
                steps={steps}
                today={today}
                windowNote={details?.windowNote}
                footer={details?.notes?.map(n => <p key={n}>{n}</p>)}
              />
            </>
          ) : (
            <p className="rounded-[18px] border border-border px-3.5 py-3 text-[15px]">
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
                  className={GROUP_ACTION_ROW}
                >
                  {s.publisher && <PublisherChip>{s.publisher}</PublisherChip>}
                  <span className="min-w-0 flex-1">{s.title}</span>
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                </a>
              ))}
              {hiddenSources > 0 && (
                <button
                  type="button"
                  onClick={() => setAllSources(true)}
                  className={GROUP_ACTION_ROW}
                >
                  <span className="min-w-0 flex-1">{hiddenSources} more</span>
                  <ChevronDown className="h-4 w-4 shrink-0" aria-hidden />
                </button>
              )}
            </Group>
          )}
    </InfoSheet>
  )
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** "November 2026" — the subtitle has room the version menu's "Nov 2026" doesn't. */
function sittingMonthYear(sitting: ExamSitting): string {
  const [year, month] = sitting.startDate.split('-').map(Number)
  return `${MONTH_NAMES[month - 1]} ${year}`
}
