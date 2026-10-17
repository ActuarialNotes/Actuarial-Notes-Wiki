import { useState } from 'react'
import { CalendarCheck, ChevronDown, Circle } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { MasteryBadge } from '@/components/MasteryBadge'
import { ExamWeightLabel } from '@/components/ExamWeightLabel'
import { parseExamWeight } from '@/lib/examWeight'
import type { MasteryState } from '@/lib/mastery'
import type { ConceptGroup } from '@/lib/quizBuilder'
import { cn } from '@/lib/utils'

// ─── Collapsible learning-objective group (mirrors example callout style) ─────

/** Marks a concept the day's study plan has scheduled. */
function TodayChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary',
        className,
      )}
    >
      <CalendarCheck className="h-3 w-3 shrink-0" aria-hidden />
      Today
    </span>
  )
}

/**
 * The By Topic source on the quiz builder: the exam's concepts under their
 * learning objectives, each objective a collapsible group.
 */
export function ConceptGroupList({
  loading,
  groups,
  selected,
  today,
  onToggle,
  onSelectAll,
  levels,
  isPro,
}: {
  /** Still loading, with no concepts to show yet. */
  loading: boolean
  groups: ConceptGroup[]
  selected: string[]
  /** Concepts today's plan schedules, lower-cased. */
  today: Set<string>
  onToggle: (concept: string) => void
  onSelectAll: (group: { subtopics: string[] }, e: React.MouseEvent) => void
  levels: Map<string, MasteryState>
  isPro: boolean
}) {
  return (
    <div className="space-y-2">
      {loading ? (
        <p className="text-xs text-muted-foreground px-1">Loading concepts…</p>
      ) : (
        <>
          {groups.map(group => (
            <GroupSection
              key={group.name}
              group={group}
              selectedSubtopics={selected}
              todaySubtopics={today}
              onToggle={onToggle}
              onSelectAll={onSelectAll}
              conceptLevelMap={isPro ? levels : undefined}
              isPro={isPro}
            />
          ))}
        </>
      )}
    </div>
  )
}

function GroupSection({
  group,
  selectedSubtopics,
  todaySubtopics,
  onToggle,
  onSelectAll,
  conceptLevelMap,
  isPro,
}: {
  group: { name: string; weight?: string; subtopics: string[] }
  selectedSubtopics: string[]
  todaySubtopics: Set<string>
  onToggle: (subtopic: string) => void
  onSelectAll: (group: { subtopics: string[] }, e: React.MouseEvent) => void
  conceptLevelMap?: Map<string, MasteryState>
  isPro?: boolean
}) {
  const selectedCount = group.subtopics.filter(s => selectedSubtopics.includes(s)).length
  const allSelected = selectedCount === group.subtopics.length
  const someSelected = selectedCount > 0
  // A group that already holds restored selections opens itself, so returning to
  // the builder shows what's picked rather than a wall of collapsed rows.
  const [open, setOpen] = useState(someSelected)
  const examPercentage = parseExamWeight(group.weight)

  const rowBg = allSelected
    ? 'bg-primary/10 group-hover:bg-primary/15'
    : someSelected
    ? 'bg-primary/5 group-hover:bg-primary/10'
    : 'group-hover:bg-accent/30'

  return (
    <div className="overflow-hidden rounded-lg bg-background">
      <div className="relative">
        {/* Share of the exam, drawn as the row itself: the fill reaches the
            group's percentage while collapsed and runs the full width when
            expanded — the same background the study guide's learning
            objectives use, in the exam's own colour (`--exam-accent-muted`,
            scoped by the builder; card grey where no exam is in scope). The
            selection tints below are translucent and sit on top, so a picked
            group still shows its weight. */}
        {examPercentage !== null && (
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 bg-[color:var(--exam-accent-muted,hsl(var(--card)))] transition-all duration-300"
            style={{ width: open ? '100%' : `${Math.min(100, examPercentage)}%` }}
          />
        )}
        <div className="relative flex items-stretch group">
          {/* Select-all checkmark circle */}
          <button
            type="button"
            role="checkbox"
            aria-checked={allSelected ? true : someSelected ? 'mixed' : false}
            data-sound="tick"
            onClick={e => onSelectAll(group, e)}
            className={cn(
              'flex shrink-0 items-center justify-center px-3 transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
              rowBg,
            )}
            aria-label={allSelected ? `Deselect all ${group.name}` : `Select all ${group.name}`}
          >
            {allSelected ? (
              <CheckMark className="h-5 w-5" />
            ) : someSelected ? (
              <CheckMark className="h-5 w-5 text-green-500/40" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground/60" />
            )}
          </button>

          {/* Expand/collapse button */}
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className={cn(
              'flex-1 py-3 pr-3 text-left transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
              rowBg,
            )}
            aria-expanded={open}
          >
            <div className="flex w-full items-center gap-2">
              <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground">
                {group.name}
              </span>
              {/* The precise reading of what the fill behind the row shows. */}
              {group.weight && <ExamWeightLabel weight={group.weight} />}
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
              />
            </div>
          </button>
        </div>
      </div>

      <div hidden={!open} className="bg-card pb-1 pt-1">
        <div className="flex flex-col">
          {group.subtopics.map(subtopic => {
            const isSelected = selectedSubtopics.includes(subtopic)
            const isToday = todaySubtopics.has(subtopic)
            const conceptLevel = conceptLevelMap?.get(subtopic)
            return (
              <button
                key={subtopic}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                data-sound="tick"
                onClick={() => onToggle(subtopic)}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                  isSelected
                    ? 'bg-primary/10 text-primary hover:bg-primary/15'
                    : 'text-foreground hover:bg-accent/40',
                )}
              >
                {isSelected ? (
                  <CheckMark className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                )}
                <span className="min-w-0 flex-1 text-sm font-medium leading-snug">
                  {subtopic}
                </span>
                {/* Both signals, not one or the other. These used to be an
                    if/else on mastery, and `conceptLevelMap` has an entry for
                    every concept — so a Pro user, the only kind with a
                    study plan, could never see which concepts were in it. */}
                {isToday && <TodayChip />}
                {isPro && conceptLevel !== undefined && (
                  <MasteryBadge state={conceptLevel} compact />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
