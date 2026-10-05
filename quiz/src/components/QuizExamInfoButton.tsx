import { useEffect, useMemo, useRef, useState } from 'react'
import { ExternalLink, Info, X } from 'lucide-react'
import { ExamLogo } from '@/components/ExamLogo'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { examAbout } from '@/data/examSittingDetails'
import type { Question } from '@/lib/parser'
import {
  formatExamLength,
  formatExamUnits,
  formatUnitTime,
  formatYearSpan,
  quizBankInfo,
} from '@/lib/quizBankInfo'
import { cn } from '@/lib/utils'

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
        className={cn(
          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          open && 'bg-accent text-foreground',
        )}
      >
        <Info className="h-4 w-4" aria-hidden />
      </button>
      {open && (
        <QuizExamInfoDialog
          exam={exam}
          examLabel={examLabel}
          progressKey={progressKey}
          wikiExamId={wikiExamId}
          questions={questions}
          onClose={close}
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
}: {
  exam: string
  examLabel: string
  progressKey: string
  wikiExamId?: string
  questions: readonly Question[]
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

  const info = useMemo(() => quizBankInfo(questions, exam), [questions, exam])
  const about = examAbout(progressKey, wikiExamId)
  const { sources, pace } = info

  // Where the questions came from, largest share of the bank's story first:
  // the exam's own papers, the body's samples, then what joined from elsewhere.
  const sourceRows: { label: string; value: string }[] = []
  if (sources.pastPapers > 0) {
    const span = formatYearSpan(sources.firstYear, sources.lastYear)
    sourceRows.push({
      label: 'Past papers',
      // The span is kept on one line: a break after its dash reads as a range
      // with no end.
      value: `${sources.pastPapers.toLocaleString()} from ${plural(sources.sittings, 'sitting')}${span ? `, ${span.replace('–', '\u2060–\u2060')}` : ''}`,
    })
  }
  if (sources.samples > 0) {
    sourceRows.push({
      label: 'Sample questions',
      value: sources.samplePublisher
        ? `${sources.samples.toLocaleString()} published by the ${sources.samplePublisher}`
        : sources.samples.toLocaleString(),
    })
  }
  if (sources.carried > 0) {
    sourceRows.push({ label: 'Moved here', value: `${sources.carried.toLocaleString()} from other exams’ papers` })
  }
  if (sources.vault > 0) {
    sourceRows.push({ label: 'Actuarial Notes', value: `${sources.vault.toLocaleString()} written for this site` })
  }

  // The real paper: the pace table where the exam has one (it is what a timed
  // quiz counts down by); otherwise what the examining body publishes.
  const examRows: { label: string; value: string }[] = pace
    ? [
        { label: 'Length', value: formatExamLength(pace.minutes) },
        { label: pace.per === 'point' ? 'Points' : 'Questions', value: formatExamUnits(pace) },
        { label: pace.per === 'point' ? 'Time per point' : 'Time per question', value: formatUnitTime(pace) },
      ]
    : (about?.facts ?? []).filter(f => f.label === 'Length' || f.label === 'Questions')

  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-[80] flex justify-center overflow-y-auto p-4 paper-scrim"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-exam-info-title"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
        <div className="relative z-10 m-auto flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-card p-5 shadow-2xl">
          <header className="flex items-start gap-3">
            <ExamLogo examKey={progressKey} size="md" />
            <div className="min-w-0 flex-1">
              <h2 id="quiz-exam-info-title" className="text-base font-semibold leading-tight">
                {examLabel} question bank
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{plural(info.total, 'question')}</p>
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

          {examRows.length > 0 && <FactList title="The exam" rows={examRows} />}

          {sourceRows.length > 0 && <FactList title="Where the questions come from" rows={sourceRows} />}

          {info.offSyllabus > 0 && (
            <p className="rounded-lg bg-muted/50 p-3 text-xs leading-relaxed">
              {plural(info.offSyllabus, 'more question')} {info.offSyllabus === 1 ? 'is' : 'are'} kept
              for the record — no longer on the syllabus, so left out of quizzes. Search finds them.
            </p>
          )}

          {about && (
            <footer className="flex flex-wrap gap-x-4 gap-y-1.5 border-t pt-3">
              <a
                href={about.source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" aria-hidden />
                {about.source.label}
              </a>
            </footer>
          )}
        </div>
      </div>
    </OverlayPortal>
  )
}

function FactList({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-medium text-muted-foreground">{title}</h3>
      {/* A fixed label column, so the two lists' values line up. */}
      <dl className="grid grid-cols-[8rem_1fr] gap-x-3 gap-y-1.5 text-sm">
        {rows.map(r => (
          <div key={r.label} className="contents">
            <dt className="text-muted-foreground">{r.label}</dt>
            <dd className="min-w-0">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
