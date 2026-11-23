// A learning objective on the exam page (docs/redesign-spec.md §7.1): a card
// with its name, the reader's percentage and its share of the exam. Folded, it
// shows its concepts as level squares; opened, the syllabus's own sentences,
// each with the concepts it names as pills, ending in the page's one filled
// button, "Practice <objective>".

import { ChevronDown, ChevronUp } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LevelSquare, LevelSquares } from '@/components/LevelSquare'
import { MarkdownText } from '@/components/MarkdownText'
import { OUTLINE_CARD } from '@/components/ui/OutlineCard'
import type { ExamObjective, ObjectiveLine, ObjectivePill } from '@/lib/examPage'
import type { MasteryState } from '@/lib/mastery'
import { levelSquareLabel } from '@/lib/levelSquare'
import type { SyllabusObjective } from '@/lib/syllabusObjectives'
import { cn } from '@/lib/utils'
import { wikiRoute } from '@/lib/wikiRoutes'

const PILL =
  'inline-flex min-h-10 max-w-full items-center gap-2 rounded-full px-3.5 py-1.5 text-[15px] font-medium leading-tight text-foreground'

export interface PillState {
  state: MasteryState
  /** In today's session: the pill is outlined in the text colour. */
  today: boolean
  /** The vault has no page for it yet: drawn, not pressable. */
  missing: boolean
}

function ConceptPill({
  pill,
  look,
  from,
  onOpen,
}: {
  pill: ObjectivePill
  look: PillState
  /** The exam the concept is being read for: `?from=` on its page. */
  from: string
  /** A reading among the pills opens in the reader instead. */
  onOpen: (pill: ObjectivePill, e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  const edge = look.today ? 'border-2 border-foreground' : 'border border-border'
  const body = (
    <>
      <LevelSquare state={look.state} size="sm" decorative />
      <span className="min-w-0 break-words">{pill.name}</span>
    </>
  )
  if (look.missing) {
    return (
      <span className={cn(PILL, edge, 'opacity-60')} title="No page yet" data-pill={pill.name}>
        {body}
      </span>
    )
  }
  return (
    <Link
      to={pill.ref.kind === 'concept' ? `${wikiRoute(pill.ref)}?from=${encodeURIComponent(from)}` : wikiRoute(pill.ref)}
      onClick={e => onOpen(pill, e)}
      aria-label={`${pill.name}, ${levelSquareLabel(look.state, look.today)}`}
      data-pill={pill.name}
      data-wikiref={`${pill.ref.kind}:${pill.name.toLowerCase()}`}
      className={cn(
        PILL,
        edge,
        'transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      )}
    >
      {body}
    </Link>
  )
}

function Line({
  line,
  first,
  pillState,
  from,
  onOpen,
}: {
  line: ObjectiveLine
  first: boolean
  pillState: (name: string) => PillState
  from: string
  onOpen: (pill: ObjectivePill, e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2.5',
        // A top-level line opens a new stretch under a hairline; a nested one sits under its parent.
        line.depth === 0 ? cn('pt-4', !first && 'border-t border-border') : 'pt-1',
        line.depth === 1 && 'pl-5',
        line.depth === 2 && 'pl-10',
      )}
    >
      {line.text && (
        <p className={cn('m-0 flex gap-1.5 text-base leading-normal', line.kind === 'heading' && 'font-semibold')}>
          {line.kind === 'item' && <span className="shrink-0 tabular-nums">{line.marker ?? '•'}</span>}
          <MarkdownText inline className="min-w-0">{line.text}</MarkdownText>
        </p>
      )}
      {line.pills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {line.pills.map(pill => (
            <ConceptPill key={pill.name} pill={pill} look={pillState(pill.name)} from={from} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ObjectiveCard({
  objective,
  figures,
  open,
  onToggle,
  shown,
  onShowAll,
  pillState,
  from,
  onOpenPill,
  practice,
}: {
  objective: ExamObjective
  /** The reader's standing on it; null while the syllabus is loading. */
  figures: SyllabusObjective | null
  open: boolean
  onToggle: () => void
  /** How many of its lines are on screen (`linesShown`). */
  shown: number
  onShowAll: () => void
  pillState: (name: string) => PillState
  from: string
  onOpenPill: (pill: ObjectivePill, e: React.MouseEvent<HTMLAnchorElement>) => void
  /** The Practice button, when the bank has questions on this objective. */
  practice: ReactNode
}) {
  const Chevron = open ? ChevronUp : ChevronDown
  const hidden = objective.lines.length - shown
  return (
    <section
      className={cn(OUTLINE_CARD, 'flex flex-col px-5', open ? 'gap-[18px] pb-5 pt-[18px]' : 'py-[18px]')}
      data-objective={objective.name}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex flex-col gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-ground"
      >
        <span className="flex w-full items-baseline gap-2.5">
          <span className="min-w-0 flex-1 text-[19px] font-bold leading-snug">{objective.name}</span>
          {figures && <span className="shrink-0 text-[17px] font-bold tabular-nums">{figures.pct}%</span>}
          <Chevron className="h-4 w-4 shrink-0 self-center" strokeWidth={2.5} aria-hidden="true" />
        </span>
        {!open && figures && figures.states.length > 0 && (
          <LevelSquares states={figures.states} today={figures.today} size="sm" className="gap-1" />
        )}
        {objective.weight && <span className="text-sm">{objective.weight} of the exam</span>}
      </button>

      {open && (
        <>
          <div className="flex flex-col gap-4 border-t border-border">
            {objective.lines.slice(0, shown).map((line, i) => (
              <Line key={i} line={line} first={i === 0} pillState={pillState} from={from} onOpen={onOpenPill} />
            ))}
          </div>
          {hidden > 0 && (
            <button
              type="button"
              onClick={onShowAll}
              aria-expanded={false}
              className="-mb-1 flex h-12 items-center gap-2.5 border-t border-border text-left text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex-1">{hidden} more</span>
              <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            </button>
          )}
          {practice}
        </>
      )}
    </section>
  )
}
