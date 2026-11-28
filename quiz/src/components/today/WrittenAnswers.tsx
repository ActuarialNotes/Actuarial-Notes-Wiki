// **Written answers** (Analytics, docs/answer-checking.md "Feedback across
// attempts"): over the overlay's span, the share of written-part points the
// reader kept, by kind of part and by command word, and for one of those the
// parts it lost with every attempt at each and the examiners' own sentences on
// where candidates lost credit there. The figures are `lib/writtenFeedback.ts`;
// the grades are `written_part_grades`, read by `useWrittenGrades`.

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  keptChange, lostParts, namedWords, writtenSummary,
  type GradeRecord, type GroupFilter, type GroupRow, type LostPart, type WrittenSummary,
} from '@/lib/writtenFeedback'
import type { PartKind } from '@/lib/tutor/items'
import { ANSWER_FILL, type AnswerState } from '@/lib/answerState'
import { questionRoute } from '@/lib/seoQuestions'
import { formatScore } from '@/lib/quizScore'
import type { Question, SelfGrade } from '@/lib/parser'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { OutlineCard } from '@/components/ui/OutlineCard'
import { MarkdownText } from '@/components/MarkdownText'

const SECTION = 'flex flex-col gap-3.5 border-t border-border pt-6'
const DASH = '–'

const GRADE_WORD: Record<SelfGrade, string> = { correct: 'Full', partial: 'Partial', incorrect: 'None' }
const GRADE_STATE: Record<SelfGrade, AnswerState> = { correct: 'correct', partial: 'partial', incorrect: 'incorrect' }

/** Which group's parts are open: a kind of part, or a command word. */
export type WrittenGroup = { kind: PartKind; label: string } | { word: string; label: string }

function Dots({ grades }: { grades: readonly SelfGrade[] }) {
  return (
    <span aria-hidden="true" className="flex w-[70px] shrink-0 justify-end gap-1">
      {grades.map((g, i) => (
        <span key={i} className={cn('h-2.5 w-2.5 rounded-full', ANSWER_FILL[GRADE_STATE[g]])} />
      ))}
    </span>
  )
}

/** "1.25 points lost", "1 point lost". */
function pointsLostLabel(lost: number): string {
  return `${formatScore(lost)} ${lost === 1 ? 'point' : 'points'} lost`
}

function rowLabel(row: GroupRow): string {
  const parts = `${row.attempts} ${row.attempts === 1 ? 'part' : 'parts'}`
  if (row.kept === null) return `${row.label}: no parts graded`
  return `${row.label}: ${row.kept}% of points kept over ${parts}, ${pointsLostLabel(row.lost)}. Latest grades ${row.recent.map(g => GRADE_WORD[g]).join(', ')}.`
}

function GroupButton({ row, onOpen }: { row: GroupRow; onOpen: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        disabled={row.attempts === 0}
        aria-label={rowLabel(row)}
        className="grid w-full grid-cols-[minmax(0,1fr)_auto_44px_16px] items-center gap-x-3 py-1 text-left disabled:opacity-50"
      >
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[15px] font-semibold">{row.label}</span>
          <span className="text-sm tabular-nums">
            {row.attempts} {row.attempts === 1 ? 'part' : 'parts'}
            {row.attempts > 0 && <> · {pointsLostLabel(row.lost)}</>}
          </span>
        </span>
        <Dots grades={row.recent} />
        <span className="text-right text-[15px] font-bold tabular-nums">{row.kept === null ? DASH : `${row.kept}%`}</span>
        {row.attempts > 0 ? <ChevronRight aria-hidden="true" className="h-4 w-4" /> : <span />}
      </button>
    </li>
  )
}

export interface WrittenAnswersProps {
  rows: readonly GradeRecord[]
  questions: ReadonlyMap<string, Question>
  today: string
  span: number
  onOpen: (group: WrittenGroup) => void
}

/** The section on Analytics' main view. */
export function WrittenAnswersSection({ rows, questions, today, span, onOpen }: WrittenAnswersProps) {
  const summary = useMemo(() => writtenSummary(rows, questions, today, { span }), [rows, questions, today, span])
  const change = keptChange(summary)
  return (
    <section aria-labelledby="written-answers-title" data-testid="written-answers" className={SECTION}>
      <div className="flex items-baseline gap-2.5">
        <h3 id="written-answers-title" className="min-w-0 flex-1 text-base font-semibold">Written answers</h3>
        <span className="text-[28px] font-bold leading-none tabular-nums">{summary.kept === null ? DASH : `${summary.kept}%`}</span>
      </div>
      {summary.attempts === 0 ? (
        <p className="text-[15px] leading-normal">
          No written parts graded in the past {span} days.
        </p>
      ) : (
        <>
          <p className="text-[15px] leading-normal">
            Points kept on {summary.attempts} written {summary.attempts === 1 ? 'part' : 'parts'}
            {change ? `, ${change}` : ''}.
          </p>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">By kind of part</h4>
            <ul className="flex flex-col gap-2.5">
              {summary.byKind.map(row => (
                <GroupButton key={row.key} row={row} onOpen={() => onOpen({ kind: row.key as PartKind, label: row.label })} />
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">By command word</h4>
            <ul className="flex flex-col gap-2.5">
              {summary.byWord.map(row => (
                <GroupButton key={row.key} row={row} onOpen={() => onOpen({ word: row.key, label: row.label })} />
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  )
}

function filterFor(group: WrittenGroup, summary: WrittenSummary): GroupFilter {
  return 'kind' in group ? { kind: group.kind } : { word: group.word, named: namedWords(summary) }
}

function partName(part: LostPart): string {
  const where = part.facts.sitting ?? 'Undated'
  return part.facts.partLabel ? `${where} · Part ${part.facts.partLabel.toUpperCase()}` : where
}

function PartCard({ part }: { part: LostPart }) {
  const { facts, attempts, notes } = part
  return (
    <OutlineCard className="flex flex-col gap-3" data-testid="written-lost-part">
      <div className="flex items-baseline gap-2">
        <span className="min-w-0 flex-1 text-sm font-semibold">{partName(part)}</span>
        <Link to={questionRoute(facts.questionId)} className="shrink-0 text-sm font-semibold underline underline-offset-4">
          Open question
        </Link>
      </div>
      {facts.prompt && <MarkdownText inline className="text-[15px] leading-normal">{facts.prompt}</MarkdownText>}
      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm" aria-label={`Your grades: ${attempts.map(a => GRADE_WORD[a.grade]).join(', then ')}`}>
        <span className="font-semibold" aria-hidden="true">Your grades</span>
        {attempts.map((a, i) => (
          <span key={i} aria-hidden="true" className="flex items-center gap-1.5">
            {i > 0 && <span>→</span>}
            <span className={cn('h-2.5 w-2.5 rounded-full', ANSWER_FILL[GRADE_STATE[a.grade]])} />
            {GRADE_WORD[a.grade]}
          </span>
        ))}
      </p>
      {notes.length > 0 && (
        <div className="flex flex-col gap-1.5 border-l-2 border-foreground pl-3">
          <span className="text-sm font-semibold">From the examiners' report</span>
          {notes.map((n, i) => (
            <MarkdownText key={i} className="text-[15px] leading-normal [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">{n}</MarkdownText>
          ))}
        </div>
      )}
    </OutlineCard>
  )
}

export interface WrittenGroupViewProps extends Omit<WrittenAnswersProps, 'onOpen'> {
  group: WrittenGroup
  onBack: () => void
  /** Starts a quiz on these questions. */
  onPractice: (questionIds: string[]) => void
}

/** One group's lost parts, in place of Analytics' main view. */
export function WrittenGroupView({ rows, questions, today, span, group, onBack, onPractice }: WrittenGroupViewProps) {
  const parts = useMemo(() => {
    const summary = writtenSummary(rows, questions, today, { span })
    return lostParts(rows, questions, today, filterFor(group, summary), { span })
  }, [rows, questions, today, span, group])
  const ids = useMemo(() => [...new Set(parts.map(p => p.facts.questionId))], [parts])

  return (
    <div data-testid="written-group" className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <button type="button" onClick={onBack} aria-label="Back to Analytics" className="-ml-2 rounded-full p-2 hover:bg-muted">
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <h3 className="min-w-0 flex-1 text-xl font-bold">{group.label}</h3>
      </div>
      <p className="text-[15px] leading-normal">
        {parts.length === 0
          ? `Every part here graded in the past ${span} days got full credit.`
          : `${parts.length} ${parts.length === 1 ? 'part' : 'parts'} lost credit in the past ${span} days.`}
      </p>
      <ul className="flex flex-col gap-3">
        {parts.map(p => <li key={p.facts.key}><PartCard part={p} /></li>)}
      </ul>
      {ids.length > 0 && (
        <Button size="main" className="w-full" onClick={() => onPractice(ids)}>
          Practice {ids.length === 1 ? 'this question' : `these ${ids.length}`}
        </Button>
      )}
    </div>
  )
}
