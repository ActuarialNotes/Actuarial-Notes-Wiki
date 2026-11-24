import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { AnswerDot } from '@/components/AnswerDot'
import { ExamLogo } from '@/components/ExamLogo'
import { PaperPopup, PaperResultBar } from '@/components/practice/PaperPopup'
import { PracticeHeader } from '@/components/practice/PracticeHeader'
import { GROUND } from '@/components/ui/OutlineCard'
import { usePageLabel } from '@/hooks/useBack'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useExamPassRates } from '@/hooks/useExamPassRates'
import { useQuizBuilderSettings } from '@/hooks/useQuizBuilderSettings'
import { useQuizExamScreen } from '@/hooks/useQuizExamScreen'
import { ANSWER_LABEL, ANSWER_STATES } from '@/lib/answerState'
import { loadPaperResults, paperKey } from '@/lib/paperResults'
import { filterQuestions } from '@/lib/parser'
import { applyPassRates } from '@/lib/passRates'
import { buildPastExamRows, examSourceLabel, formatPassRate, type PastExamRow } from '@/lib/pastExams'
import { foldPapers, rowDuration } from '@/lib/practiceHome'
import { papersFilter, quizExamFor, quizLaunchUrl, shelfPdfLinks } from '@/lib/quizBuilder'
import { estimateSeconds } from '@/lib/quizSetup'
import { formatPace, paceForExam } from '@/lib/quizTiming'
import { cn } from '@/lib/utils'

// Past papers (docs/redesign-spec.md §7a.3, canvas `Papers`): one row per
// sitting of the exam in focus, newest first, the older ones under one row. A
// paper already sat shows its last result as a small bar in the answer
// colours (lib/paperResults.ts). A row opens the paper's popup: its size, the
// pass rate where one is published, its documents and Start Practice Exam.
// A paper not added yet stays listed, dimmed, and opens the same popup with
// no Start.

const ROW =
  'flex min-h-[60px] w-full items-center gap-3.5 border-b border-border text-left ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'

export default function PastPapers() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { topic } = useQuizExamScreen()
  const { questions, loading } = useAllQuestions()
  const exam = quizExamFor(topic)
  const examLabel = exam?.label ?? topic
  const settings = useQuizBuilderSettings('mock-exam')

  const livePassRates = useExamPassRates(topic)
  const rows = useMemo(
    () => (topic ? applyPassRates(buildPastExamRows(questions, topic), livePassRates) : []),
    [questions, topic, livePassRates],
  )
  const title = examSourceLabel(rows)
  usePageLabel(title)

  const [results] = useState(loadPaperResults)
  const fold = useMemo(() => foldPapers(rows), [rows])
  const [olderOpen, setOlderOpen] = useState(false)
  const [openKey, setOpenKey] = useState<string | null>(() => searchParams.get('paper'))
  const open = rows.find(r => r.key === openKey) ?? null

  const openPool = useMemo(
    () => (open ? filterQuestions(questions, papersFilter(topic, { year: open.year, session: open.session })) : []),
    [open, questions, topic],
  )

  if (!topic) return <Navigate to="/?exams=1" replace />
  // An exam with no released sittings has no shelf: its sample set is a row on Practice.
  if (!loading && questions.length > 0 && rows.length === 0) {
    return <Navigate to={`/?topic=${encodeURIComponent(topic)}`} replace />
  }

  const pace = paceForExam(topic)
  const anyResult = rows.some(r => results[paperKey(topic, r.year, r.session)])

  function start(row: PastExamRow) {
    navigate(quizLaunchUrl(
      { kind: 'exam', exam: topic, sitting: { year: row.year, session: row.session }, levels: null, count: openPool.length },
      { mode: 'mock-exam', reveal: settings.reveal, links: settings.conceptLinks ? '1' : '0', timed: settings.timed },
    ))
  }

  const paperRow = (row: PastExamRow) => {
    const result = results[paperKey(topic, row.year, row.session)]
    return (
      <li key={row.key}>
        <button
          type="button"
          aria-haspopup="dialog"
          data-testid="paper-row"
          onClick={() => setOpenKey(row.key)}
          className={cn(ROW, !row.available && 'opacity-50')}
        >
          <span className="min-w-0 flex-1 text-[17px] font-semibold">{row.label}</span>
          {!row.available && <span className="shrink-0 text-[15px]">Not added yet</span>}
          {result && <PaperResultBar result={result} className="w-24 shrink-0" />}
          <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
        </button>
      </li>
    )
  }

  const seconds = open ? estimateSeconds(openPool, openPool.length) : null
  const rate = open ? formatPassRate(open.effectivePassRate ?? open.passRate) : null
  const documents = open
    ? [shelfPdfLinks(topic, { year: open.year, session: open.session }, rows.length).reportLink]
        .filter((l): l is { url: string; label: string } => !!l)
    : []

  return (
    <div className={cn(GROUND, 'min-h-full')} data-testid="past-papers">
      <div className="mx-auto flex w-full max-w-xl flex-col px-5 pb-10 pt-3 lg:pt-8">
        <PracticeHeader
          title={title}
          lead={exam && <ExamLogo examKey={exam.progressKey} size="md" />}
        />

        <ul className="mt-5 flex flex-col" aria-label={`${examLabel} ${title.toLowerCase()}`}>
          {fold.recent.map(paperRow)}
          {fold.older.length > 0 && (
            <li>
              <button
                type="button"
                aria-expanded={olderOpen}
                onClick={() => setOlderOpen(v => !v)}
                className={cn(ROW, 'min-h-[56px] text-base font-semibold')}
              >
                <span className="min-w-0 flex-1">{fold.olderLabel}</span>
                <span className="shrink-0 font-bold tabular-nums">{fold.older.length}</span>
                <ChevronDown
                  className={cn('h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none', olderOpen && 'rotate-180')}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </button>
              {olderOpen && <ul className="flex flex-col">{fold.older.map(paperRow)}</ul>}
            </li>
          )}
        </ul>

        {anyResult && (
          <ul aria-hidden="true" className="mt-6 flex flex-wrap gap-x-[18px] gap-y-2 text-sm">
            {ANSWER_STATES.map(state => (
              <li key={state} className="flex items-center gap-[7px]">
                <AnswerDot state={state} decorative />
                {ANSWER_LABEL[state]}
              </li>
            ))}
          </ul>
        )}
      </div>

      {open && (
        <PaperPopup
          title={open.label}
          questionCount={openPool.length}
          duration={seconds === null ? null : rowDuration(seconds)}
          passRate={rate ? { label: open.effectivePassRate !== undefined ? 'Effective pass rate' : 'Pass rate', value: rate } : null}
          result={results[paperKey(topic, open.year, open.session)]}
          documents={documents}
          documentSubtitle={`${examLabel} · ${open.label}`}
          settings={settings}
          timedPace={pace ? formatPace(pace) : undefined}
          canStart={openPool.length > 0}
          onStart={() => start(open)}
          onClose={() => setOpenKey(null)}
        />
      )}
    </div>
  )
}
