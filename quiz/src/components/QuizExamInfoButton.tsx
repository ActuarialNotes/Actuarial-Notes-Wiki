import { useEffect, useMemo, useRef, useState } from 'react'
import { ExternalLink, Info, ListChecks, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Group, GroupRow } from '@/components/ui/GroupedList'
import { INFO_CLOSE, InfoSheet } from '@/components/ui/InfoSheet'
import { GROUP_ACTION_ROW, PublisherChip, RowChevron, RowTile } from '@/components/ui/infoRows'
import { useNavigate } from 'react-router-dom'
import { ExamLogo } from '@/components/ExamLogo'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { examAbout } from '@/data/examSittingDetails'
import { getPassRateLookup } from '@/data/pastExams'
import type { Question } from '@/lib/parser'
import {
  bankMix,
  formatExamLength,
  formatExamUnits,
  formatUnitTime,
  quizBankInfo,
  splitSourceLabel,
  type BankMixPart,
} from '@/lib/quizBankInfo'
import { inkToolTile } from '@/components/ui/ink'

/**
 * **About this bank** — the quiz builder's info button, in the sticky header
 * where the study guide keeps its sitting info button.
 *
 * The study guide's panel is about a *sitting* (registration, the window,
 * results); this one is about what a quiz on the exam is drawn from and timed
 * against: how many questions the bank holds, where they came from (the exam's
 * released papers, the body's published samples, the vault's own), and the
 * real paper's length and pace — the figures the Timed setting budgets by. The
 * facts are `lib/quizBankInfo.ts`'s, read off the bank itself.
 */
export function QuizExamInfoButton({
  exam,
  examLabel,
  progressKey,
  wikiExamId,
  questions,
}: {
  /** The bank's exam name — what a question's `exam` field holds. */
  exam: string
  examLabel: string
  progressKey: string
  /** The study guide's own id, for an exam key two guides share (Exam 6). */
  wikiExamId?: string
  /** The exam's whole bank, off-syllabus questions included. */
  questions: readonly Question[]
}) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const label = `About the ${examLabel} question bank`

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
        <QuizExamInfoDialog
          exam={exam}
          examLabel={examLabel}
          progressKey={progressKey}
          wikiExamId={wikiExamId}
          questions={questions}
          onClose={close}
          onBrowse={() => { setOpen(false); navigate(`/search?tab=questions&exam=${encodeURIComponent(exam)}`) }}
        />
      )}
    </>
  )
}

function plural(n: number, word: string): string {
  return `${n.toLocaleString()} ${word}${n === 1 ? '' : 's'}`
}

function QuizExamInfoDialog({
  exam,
  examLabel,
  progressKey,
  wikiExamId,
  questions,
  onClose,
  onBrowse,
}: {
  exam: string
  examLabel: string
  progressKey: string
  wikiExamId?: string
  questions: readonly Question[]
  onClose: () => void
  /** Closes the sheet and opens the question search panel. */
  onBrowse?: () => void
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

  const info = useMemo(() => quizBankInfo(questions, exam), [questions, exam])
  const about = examAbout(progressKey, wikiExamId)
  // Where the exam's published pass rates are looked up — a fact about the
  // exam, so it lives here rather than over the past-paper shelf.
  const passRates = getPassRateLookup(exam)
  const { pace } = info
  const mix = bankMix(info)
  const mixTotal = mix.reduce((n, p) => n + p.count, 0)

  // The real paper: the pace table where the exam has one (it is what a timed
  // quiz counts down by); otherwise what the examining body publishes.
  const examRows: { label: string; value: string }[] = pace
    ? [
        { label: 'Length', value: formatExamLength(pace.minutes) },
        { label: pace.per === 'point' ? 'Points' : 'Questions', value: formatExamUnits(pace) },
        { label: pace.per === 'point' ? 'Time per point' : 'Time per question', value: formatUnitTime(pace) },
      ]
    : (about?.facts ?? []).filter(f => f.label === 'Length' || f.label === 'Questions')

  const page = about ? splitSourceLabel(about.source.label) : null

  return (
    <InfoSheet onClose={onClose} labelledBy="quiz-exam-info-title">
      <header className="flex items-center gap-3">
        <ExamLogo examKey={progressKey} size="md" />
        <h2 id="quiz-exam-info-title" className="min-w-0 flex-1 text-[20px] font-bold leading-tight">
          {examLabel} question bank
        </h2>
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

      <section className="rounded-[18px] border border-border px-4 py-3.5" aria-label="Where the questions come from">
        <p className="text-[22px] font-bold leading-tight tabular-nums">{plural(info.total, 'question')}</p>
        {mix.length > 0 && (
          <>
            <div className="mt-3 flex h-2.5 gap-0.5" aria-hidden>
              {mix.map(part => (
                <span
                  key={part.key}
                  className={cn('min-w-2.5 rounded-full', MIX_FILL[part.key])}
                  style={{ flexGrow: part.count / mixTotal, flexBasis: 0 }}
                />
              ))}
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-3.5 gap-y-1 text-[13px]">
              {mix.map(part => (
                <li key={part.key} className="flex items-center gap-1.5">
                  <span className={cn('h-2 w-2 shrink-0 rounded-full', MIX_FILL[part.key])} aria-hidden />
                  {part.label} <span className="font-semibold tabular-nums">{part.count.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {onBrowse && info.total > 0 && (
        <Group>
          <button type="button" onClick={onBrowse} className={GROUP_ACTION_ROW}>
            <RowTile><ListChecks className="h-3.5 w-3.5" /></RowTile>
            <span className="min-w-0 flex-1">Browse questions</span>
            <RowChevron />
          </button>
        </Group>
      )}

      {examRows.length > 0 && (
        <Group label="The exam">
          {examRows.map(r => <GroupRow key={r.label} label={r.label} value={r.value} />)}
        </Group>
      )}

      {(about || passRates) && (
        <Group label="Sources">
          {about && page && (
            <a href={about.source.url} target="_blank" rel="noreferrer" className={GROUP_ACTION_ROW}>
              {page.publisher && <PublisherChip>{page.publisher}</PublisherChip>}
              <span className="min-w-0 flex-1">{page.title}</span>
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            </a>
          )}
          {passRates && (
            <a href={passRates.url} target="_blank" rel="noreferrer" title={passRates.label} className={GROUP_ACTION_ROW}>
              {page?.publisher && <PublisherChip>{page.publisher}</PublisherChip>}
              <span className="min-w-0 flex-1">Pass rates</span>
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            </a>
          )}
        </Group>
      )}
    </InfoSheet>
  )
}

/** Each piece of the mix, in neutral shades: its own papers solid, the record an empty outline. */
const MIX_FILL: Record<BankMixPart['key'], string> = {
  pastPapers: 'bg-foreground',
  samples: 'bg-level-2',
  carried: 'bg-level-1',
  vault: 'bg-ground ring-[1.5px] ring-inset ring-foreground',
  offSyllabus: 'bg-ground ring-[1.5px] ring-inset ring-border',
}
