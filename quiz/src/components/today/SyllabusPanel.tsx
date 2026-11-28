// The syllabus on Today (docs/redesign-spec.md §4.1, §4.4): the bar with its
// percentage, then each learning objective with the reader's percentage, its
// share of the exam and its concepts as level squares, the ones in today's
// session outlined. A square names its concept when pointed at and opens it in
// the reader. On desktop this is drawn on the page; on a phone it is what the
// Syllabus tile opens (`SyllabusOverlay`), which is also what its heading
// opens on desktop.

import { AnimatedNumber } from '@/components/AnimatedNumber'
import { useEffect, useId, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, X } from 'lucide-react'
import { LevelSquareKey } from '@/components/LevelSquare'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { Popup } from '@/components/ui/Popup'
import type { LevelSquareSize } from '@/lib/levelSquare'
import type { SyllabusObjective } from '@/lib/syllabusObjectives'
import { cn } from '@/lib/utils'
import { ConceptSquares } from './ConceptSquares'
import { GainMark, SyllabusBar } from './TodayTiles'

export type { SyllabusObjective }

interface SyllabusProps {
  pct: number
  gain: number
  tick: number | null
  objectives: readonly SyllabusObjective[]
  /** Opens a concept in the reader. */
  onConcept: (name: string) => void
  /** The concept the reader is open on, lower-cased. */
  current?: string | null
}

function Objectives({
  objectives, onConcept, current, size,
}: Pick<SyllabusProps, 'objectives' | 'onConcept' | 'current'> & { size: LevelSquareSize }) {
  return (
    <>
      {objectives.map(o => (
        <section key={o.name} aria-label={o.name} className="flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2.5">
            <h3 className="min-w-0 flex-1 text-base font-semibold">{o.name}</h3>
            {o.weight && <span className="shrink-0 text-sm tabular-nums">{o.weight}</span>}
            <span className="w-11 shrink-0 text-right text-base font-bold tabular-nums">{o.pct}%</span>
          </div>
          <ConceptSquares names={o.names} states={o.states} today={o.today} current={current} onConcept={onConcept} size={size} />
        </section>
      ))}
      <LevelSquareKey />
    </>
  )
}

function barLabel(pct: number, tick: number | null): string {
  return `Syllabus: ${pct}% covered${tick !== null ? `, plan target ${tick}%` : ''}`
}

export function SyllabusPanel({
  pct, gain, tick, objectives, onConcept, current, onOpen, className,
}: SyllabusProps & {
  /** Opens the syllabus overlay. */
  onOpen: () => void
  className?: string
}) {
  return (
    <section aria-label="Syllabus" className={cn('flex flex-col gap-[22px]', className)}>
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={barLabel(pct, tick)}
        data-testid="today-syllabus"
        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <h2 className="text-xl font-bold">Syllabus</h2>
        <SyllabusBar pct={pct} gain={gain} tick={tick} thick />
        <span className="flex items-baseline gap-2 text-xl font-bold tabular-nums">
          <span><AnimatedNumber value={pct} />%</span>
          <GainMark gain={gain} className="text-sm" />
        </span>
      </button>
      <Objectives objectives={objectives} onConcept={onConcept} current={current} size="md" />
    </section>
  )
}

/**
 * The syllabus over Today: every learning objective with its concepts as
 * squares, large enough to press with a finger, and the way to the exam's
 * study guide.
 */
export function SyllabusOverlay({
  pct, gain, tick, objectives, onConcept, current, examLabel, guideTo, onClose,
}: SyllabusProps & {
  examLabel: string
  /** The exam's study guide. */
  guideTo: string
  onClose: () => void
}) {
  const titleId = useId()
  const bodyRef = useRef<HTMLDivElement>(null)

  // Keep the square of the concept being read in view. The reader's pane
  // mounts and slides up after the store opens, and the overlay shrinks to the
  // room above it, so look again once it has settled.
  useEffect(() => {
    if (!current) return
    const place = () => {
      bodyRef.current
        ?.querySelector<HTMLElement>('[data-concept-square][aria-current="true"]')
        ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
    const ids = [120, 600].map(ms => window.setTimeout(place, ms))
    return () => ids.forEach(id => window.clearTimeout(id))
  }, [current])

  return (
    <Popup onClose={onClose} labelledBy={titleId} aboveReader className="sm:max-w-[560px]">
      <div ref={bodyRef} data-testid="syllabus-overlay" className="flex flex-col gap-[22px]">
        <div className="flex items-center gap-3">
          <h2 id={titleId} className="min-w-0 flex-1 text-[22px] font-bold leading-tight">Syllabus</h2>
          <span className="flex items-baseline gap-2 text-[22px] font-bold tabular-nums">
            {pct}%
            <GainMark gain={gain} className="text-sm" />
          </span>
          <CloseButton onClose={onClose} />
        </div>
        <span role="img" aria-label={barLabel(pct, tick)} className="flex h-4 items-center">
          <SyllabusBar pct={pct} gain={gain} tick={tick} thick className="flex-1" />
        </span>
        <Objectives objectives={objectives} onConcept={onConcept} current={current} size="lg" />
        <Link to={guideTo} className={cn(buttonVariants({ variant: 'edge', size: 'lg' }), 'h-[52px] w-full gap-1.5 text-base')}>
          {examLabel} study guide
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
        </Link>
      </div>
    </Popup>
  )
}

/** The X at the head of an overlay on Today. */
export function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <X className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
    </button>
  )
}
