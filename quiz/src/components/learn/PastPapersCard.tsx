// A concept on the past papers (roadmap L22, L23; lib/conceptPapers.ts): how
// many of an exam's papers tested it, drawn as one square a paper, and under
// that the examiners' own sentences about where candidates lost credit, each
// linked to its question.
//
// Everything is read off the question bank the concept's Practice button has
// already loaded. A concept on no paper, with no such sentence, draws nothing.

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MarkdownText } from '@/components/MarkdownText'
import { OUTLINE_CARD } from '@/components/ui/OutlineCard'
import { useQuestionBank } from '@/hooks/usePractice'
import { cn } from '@/lib/utils'
import {
  conceptExaminerNotes,
  conceptPaperSeries,
  seriesSpan,
  type ConceptNote,
  type PaperSeries,
} from '@/lib/conceptPapers'
import { questionExamName, questionNumber, questionRoute } from '@/lib/seoQuestions'

/** How many notes show before the rest are asked for. */
const NOTES_SHOWN = 3

function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`
}

function seriesHeadline(series: PaperSeries): string {
  const papers = series.papers.length
  return `On ${series.on} of ${papers} ${questionExamName(series.exam)} ${papers === 1 ? 'paper' : 'papers'} from ${seriesSpan(series)}`
}

function seriesDetail(series: PaperSeries): string {
  const count = series.questions === 1
    ? `1 question, on ${series.last}.`
    : `${series.questions} questions, the last on ${series.last}.`
  if (series.typicalPoints === null) return count
  return `${count} Usually ${plural(series.typicalPoints, 'point', 'points')} a question.`
}

function noteSource(note: ConceptNote): string {
  const n = questionNumber(note.questionId)
  const question = `Question ${n ?? note.questionId}${note.part ? ` (${note.part})` : ''}`
  return note.sitting ? `${questionExamName(note.exam)} ${note.sitting}, ${question}` : question
}

function Series({ series }: { series: PaperSeries }) {
  return (
    <div data-testid="past-papers-series">
      <p className="text-[17px] font-semibold leading-snug">{seriesHeadline(series)}</p>
      <ul className="mt-3 flex gap-1" aria-label="Papers">
        {series.papers.map(paper => {
          const on = paper.questionIds.length > 0
          const label = on
            ? `${paper.sitting}: ${plural(paper.questionIds.length, 'question', 'questions')}`
            : `${paper.sitting}: not on this paper`
          return (
            <li
              key={paper.sitting}
              title={label}
              aria-label={label}
              data-on={on ? '' : undefined}
              className={cn(
                'aspect-square min-w-0 max-w-6 flex-1 rounded-[5px] border',
                on ? 'border-foreground bg-foreground' : 'border-border',
              )}
            />
          )
        })}
      </ul>
      <p className="mt-3 text-[15px] leading-snug">{seriesDetail(series)}</p>
    </div>
  )
}

export function PastPapersCard({ concept, className }: { concept: string; className?: string }) {
  const bank = useQuestionBank()
  const series = useMemo(() => (bank ? conceptPaperSeries(bank, concept) : []), [bank, concept])
  const notes = useMemo(() => (bank ? conceptExaminerNotes(bank, concept) : []), [bank, concept])
  const [all, setAll] = useState(false)

  if (series.length === 0 && notes.length === 0) return null
  const shown = all ? notes : notes.slice(0, NOTES_SHOWN)

  return (
    <section
      aria-label="On past papers"
      data-testid="past-papers-card"
      className={cn(OUTLINE_CARD, 'p-5', className)}
    >
      <h2 className="text-sm font-semibold">On past papers</h2>
      {series.length > 0 && (
        <div className="mt-3 flex flex-col gap-5">
          {series.map(s => <Series key={s.exam} series={s} />)}
        </div>
      )}

      {notes.length > 0 && (
        <div className={series.length > 0 ? 'mt-5 border-t border-border pt-4' : 'mt-3'}>
          <h3 className="text-[17px] font-semibold leading-snug">Where candidates lost credit</h3>
          <ul className="mt-1 flex flex-col">
            {shown.map(note => (
              <li
                key={`${note.questionId}#${note.part ?? ''}`}
                data-testid="examiner-note"
                className="border-b border-border py-3 last:border-b-0 last:pb-0"
              >
                <MarkdownText className="text-[15px] leading-relaxed">{note.passages.join('\n\n')}</MarkdownText>
                <Link
                  to={questionRoute(note.questionId)}
                  className="mt-1.5 inline-flex min-h-8 items-center text-sm font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {noteSource(note)}
                </Link>
              </li>
            ))}
          </ul>
          {notes.length > NOTES_SHOWN && !all && (
            <button
              type="button"
              onClick={() => setAll(true)}
              className="mt-3 inline-flex h-10 items-center rounded-full border border-border px-4 text-sm font-semibold transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Show all {notes.length}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
