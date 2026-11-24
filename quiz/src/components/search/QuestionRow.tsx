// A question as a row of search results, and the count stepper beside the
// Practice button: drawn by the one search's page (pages/Search.tsx) and by
// Practice's own search (components/practice/PracticeSearchPanel.tsx).

import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react'
import { AnswerDot } from '@/components/AnswerDot'
import { MarkdownText } from '@/components/MarkdownText'
import { QuestionInfoButton } from '@/components/QuestionInfoButton'
import { INK_MARK } from '@/components/SearchHighlight'
import { TickBox } from '@/components/ui/TickBox'
import { ATTEMPT_DOT_LABEL, attemptDot, questionMetaLine, type QuestionResult } from '@/lib/oneSearch'
import type { Question } from '@/lib/parser'
import { matchedRun, questionPreview } from '@/lib/questionPreview'
import { cn } from '@/lib/utils'

export const ROW_FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'
/** A row shows two lines of a question, so the preview is cut to about that much. */
const PREVIEW_CHARS = 72
/** Rows parted by hairlines, the first with none above it. */
export const ROW_RULE = 'border-t border-border first:border-t-0'

/** How many questions to draw: a minus, the count and a plus, as one outlined pill. */
export function PracticeCount({ count, most, onChange }: { count: number; most: number; onChange: (next: number) => void }) {
  const step = cn(
    'flex h-full w-11 items-center justify-center transition-colors enabled:hover:bg-foreground/10 disabled:opacity-40',
    ROW_FOCUS,
  )
  return (
    <div role="group" aria-label="How many questions" className="flex h-[58px] shrink-0 items-center overflow-hidden rounded-full border-[1.5px] border-foreground">
      <button type="button" aria-label="One question fewer" disabled={count <= 1} onClick={() => onChange(count - 1)} className={cn(step, 'rounded-l-full')}>
        <Minus className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
      </button>
      <span aria-live="polite" aria-label={`${count} questions`} className="min-w-[2.5ch] text-center text-[17px] font-bold tabular-nums">
        {count}
      </span>
      <button type="button" aria-label="One question more" disabled={count >= most} onClick={() => onChange(count + 1)} className={cn(step, 'rounded-r-full')}>
        <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  )
}

/** Two lines of the question, with the match marked (lib/questionPreview.ts). */
function Preview({ result, query }: { result: QuestionResult; query: string }) {
  const text = questionPreview(result.question, query, PREVIEW_CHARS) || result.question.id
  const run = matchedRun(text, query)
  // A match inside a formula is left to the formula: cutting `$…$` in two to
  // mark it would print both halves as raw LaTeX.
  const inMath = run ? (text.slice(0, run.index).match(/(?<!\\)\$/g)?.length ?? 0) % 2 === 1 : false
  if (!run || inMath) return <MarkdownText inline>{text}</MarkdownText>
  const before = text.slice(0, run.index)
  const after = text.slice(run.index + run.length)
  // The renderer drops a piece's outer spaces, so the ones beside the mark are written here.
  return (
    <>
      {before.trim() && <MarkdownText inline>{before}</MarkdownText>}
      {/\s$/.test(before) && ' '}
      <mark className={INK_MARK}>{text.slice(run.index, run.index + run.length)}</mark>
      {/^\s/.test(after) && ' '}
      {after.trim() && <MarkdownText inline>{after}</MarkdownText>}
    </>
  )
}

/** The keyboard's and the sticky rows' margins: a row brought into view clears the field above and the button below. */
export const ROW_SCROLL = 'scroll-mt-36 scroll-mb-28'

/**
 * The whole question, opened under its row: the stem with its tables and
 * figures, the options, each part's prompt. Never an answer.
 */
function FullQuestion({ question }: { question: Question }) {
  const options = (list: Question['options']) => list.length > 0 && (
    <ul className="mt-2 flex flex-col gap-1.5">
      {list.map(o => (
        <li key={o.key} className="flex gap-2 text-[15px] leading-snug">
          <span className="shrink-0 font-semibold">{o.key})</span>
          <MarkdownText inline className="min-w-0">{o.text}</MarkdownText>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="flex flex-col gap-3 pb-4 pl-9 pr-1 text-[15px] leading-relaxed" data-testid="search-question-full">
      {question.stem.trim() && <MarkdownText className="min-w-0">{question.stem}</MarkdownText>}
      {options(question.options)}
      {(question.parts ?? []).map(part => (
        <div key={part.label} className="flex gap-2">
          <span className="shrink-0 font-semibold">{part.label})</span>
          <div className="min-w-0 flex-1">
            <MarkdownText className="min-w-0">{part.stem}</MarkdownText>
            {options(part.options)}
          </div>
        </div>
      ))}
      <Link
        to={`/wiki/question/${encodeURIComponent(question.id)}`}
        className={cn('inline-flex h-10 items-center gap-1.5 self-start rounded-full border-[1.5px] border-foreground px-4 text-[14px] font-bold transition-colors hover:bg-foreground/10', ROW_FOCUS)}
      >
        Open question
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </div>
  )
}

/**
 * A question among the results. Pressing the row ticks it for practice; the
 * chevron opens the whole question under it, which is where its own page is
 * linked from; Info says where it came from.
 */
export const QuestionRow = memo(function QuestionRow({
  result,
  query,
  dot,
  picked,
  onTogglePick,
}: {
  result: QuestionResult
  query: string
  /** The reader's record on it; null when there is no record to read (signed out). */
  dot: ReturnType<typeof attemptDot> | null
  /** Whether it is ticked for practice. */
  picked: boolean
  onTogglePick: (id: string) => void
}) {
  const [infoOpen, setInfoOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { question } = result
  const Chevron = expanded ? ChevronUp : ChevronDown
  return (
    <li className={ROW_RULE} data-testid="search-question">
      <div className="flex items-start gap-0.5">
        <button
          type="button"
          role="checkbox"
          aria-checked={picked}
          aria-label={`Pick for practice: ${questionMetaLine(result)}`}
          data-sound="tick"
          data-result
          onClick={() => onTogglePick(question.id)}
          className={cn('-ml-1 flex min-w-0 flex-1 items-start gap-3 rounded-lg py-3 pl-1 text-left', ROW_FOCUS, ROW_SCROLL)}
        >
          <TickBox state={picked ? 'all' : 'none'} className="mt-0.5" />
          {dot === 'untried' ? (
            <span
              role="img"
              aria-label={ATTEMPT_DOT_LABEL.untried}
              className="mt-[7px] box-border h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-foreground"
            />
          ) : dot ? (
            <span role="img" aria-label={ATTEMPT_DOT_LABEL[dot]} className="mt-[7px] flex shrink-0">
              <AnswerDot state={dot} decorative />
            </span>
          ) : null}
          <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
            {!expanded && <span className="line-clamp-2 text-[16px] leading-[1.45]"><Preview result={result} query={query} /></span>}
            <span className="truncate text-[14px]">{questionMetaLine(result)}</span>
          </span>
        </button>
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={expanded ? 'Show less of the question' : 'Show the whole question'}
          title={expanded ? 'Show less' : 'Show the whole question'}
          onClick={() => setExpanded(v => !v)}
          className={cn('mt-1 flex h-11 w-10 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-foreground/10', ROW_FOCUS)}
        >
          <Chevron className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
        </button>
        <QuestionInfoButton
          question={question}
          open={infoOpen}
          onOpenChange={setInfoOpen}
          className="mt-1 shrink-0 px-2 text-foreground sm:px-2"
        />
      </div>
      {expanded && <FullQuestion question={question} />}
    </li>
  )
})
