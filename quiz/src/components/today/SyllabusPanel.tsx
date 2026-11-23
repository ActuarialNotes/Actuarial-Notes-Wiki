// The syllabus on Today's desktop layout (docs/redesign-spec.md §4.1, §4.4):
// the bar with its percentage, then each learning objective with the reader's
// percentage, its share of the exam and its concepts as level squares, the
// ones in today's session outlined. On a phone this is the Syllabus tile, and
// the detail is the exam's page.

import { Link } from 'react-router-dom'
import { LevelSquareKey, LevelSquares } from '@/components/LevelSquare'
import type { SyllabusObjective } from '@/lib/syllabusObjectives'
import { cn } from '@/lib/utils'
import { GainMark, SyllabusBar } from './TodayTiles'

export type { SyllabusObjective }

export function SyllabusPanel({
  to, pct, gain, tick, objectives, className,
}: {
  to: string
  pct: number
  gain: number
  tick: number | null
  objectives: readonly SyllabusObjective[]
  className?: string
}) {
  return (
    <section aria-label="Syllabus" className={cn('flex flex-col gap-[22px]', className)}>
      <Link
        to={to}
        aria-label={`Syllabus: ${pct}% covered${tick !== null ? `, plan target ${tick}%` : ''}`}
        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <h2 className="text-xl font-bold">Syllabus</h2>
        <SyllabusBar pct={pct} gain={gain} tick={tick} thick />
        <span className="flex items-baseline gap-2 text-xl font-bold tabular-nums">
          {pct}%
          <GainMark gain={gain} className="text-sm" />
        </span>
      </Link>
      {objectives.map(o => (
        <div key={o.name} className="flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2.5">
            <span className="min-w-0 flex-1 text-base font-semibold">{o.name}</span>
            {o.weight && <span className="shrink-0 text-sm tabular-nums">{o.weight}</span>}
            <span className="w-11 shrink-0 text-right text-base font-bold tabular-nums">{o.pct}%</span>
          </div>
          <LevelSquares states={o.states} today={o.today} size="md" className="gap-1" />
        </div>
      ))}
      <LevelSquareKey />
    </section>
  )
}
