import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TickBox } from '@/components/ui/TickBox'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { LevelSquare } from '@/components/LevelSquare'
import { useIsReadingPdf } from '@/hooks/usePdfReader'
import type { MasteryState } from '@/lib/mastery'
import type { Difficulty } from '@/lib/parser'
import type { ConceptGroup } from '@/lib/quizBuilder'
import { DIFFICULTY_LEVELS, toggleDifficultyLevel } from '@/lib/quizDifficulty'
import type { RevealMode } from '@/lib/revealMode'
import { topicTick } from '@/lib/practiceHome'
import { cn } from '@/lib/utils'

/**
 * A Practice popup that ends in its own Start (docs/redesign-spec.md §7a.2,
 * canvas `Setup`): the quiz's setup, a Practice Exam, a past paper. Black,
 * with the popup's one filled button held at its foot while the rest scrolls.
 */
export function StartPopup({
  title,
  onClose,
  startLabel,
  startDisabled,
  onStart,
  emptyNote,
  focus,
  children,
}: {
  title: string
  onClose: () => void
  /** Absent for a popup with nothing to start (a paper not added yet). */
  startLabel?: string
  startDisabled?: boolean
  onStart?: () => void
  /** Said above Start when there is nothing to start. */
  emptyNote?: string
  /** The section (`data-sheet-section`) to open scrolled to. */
  focus?: string
  children: ReactNode
}) {
  const titleId = useId()
  const bodyRef = useRef<HTMLDivElement>(null)
  // Opened from one pill, the sheet opens at that pill's section.
  useEffect(() => {
    if (!focus) return
    bodyRef.current?.querySelector<HTMLElement>(`[data-sheet-section="${focus}"]`)
      ?.scrollIntoView({ block: 'start' })
  }, [focus])
  // While a document opened from the popup is being read, Esc is the reader's.
  const readingPdf = useIsReadingPdf()
  return (
    <Popup onClose={onClose} suspended={readingPdf} labelledBy={titleId} layer="z-[60]" className="gap-0 !pb-0 sm:max-w-lg">
      <div ref={bodyRef} data-quiz-setup-sheet className="flex flex-col gap-[18px] pt-2">
        <div className="flex items-center gap-3">
          <PopupTitle id={titleId} className="min-w-0 flex-1 truncate">{title}</PopupTitle>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
      <div className="sticky bottom-0 mt-[18px] flex flex-col gap-2 bg-ground pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
        {startDisabled && emptyNote && <p className="text-center text-[15px]">{emptyNote}</p>}
        {startLabel && onStart && (
          <Button size="main" data-sound="begin" onClick={onStart} disabled={startDisabled} className="w-full rounded-full">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-current">
              <path d="M7 4l13 8-13 8z" />
            </svg>
            {startLabel}
          </Button>
        )}
      </div>
    </Popup>
  )
}

/** A section of a Practice popup: a 15px bold heading over its choices. */
export function PopupSection({
  title, section, aside, children,
}: {
  title: string
  /** The name `StartPopup`'s `focus` opens at. */
  section?: string
  aside?: ReactNode
  children: ReactNode
}) {
  const id = useId()
  return (
    <section aria-labelledby={id} data-sheet-section={section} className="flex scroll-mt-2 flex-col">
      <div className="flex min-h-[28px] items-baseline justify-between gap-3">
        <h3 id={id} className="text-[15px] font-bold">{title}</h3>
        {aside && <span className="text-[15px]">{aside}</span>}
      </div>
      {children}
    </section>
  )
}

const ROW_FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'

/**
 * The topics: one checkbox a learning objective, with how many questions it
 * holds. The chevron unfolds its concepts, each a checkbox of its own.
 */
export function TopicChoices({
  loading, groups, selected, counts, levels, today, onToggleTopic, onToggleConcept,
}: {
  loading: boolean
  groups: readonly ConceptGroup[]
  /** The concepts picked; none means every topic. */
  selected: readonly string[]
  counts: ReadonlyMap<string, number>
  levels: ReadonlyMap<string, MasteryState>
  /** The concepts in today's session. */
  today: ReadonlySet<string>
  onToggleTopic: (name: string) => void
  onToggleConcept: (concept: string) => void
}) {
  const [open, setOpen] = useState<string | null>(null)
  if (loading) return <p className="py-3 text-[15px]">Loading topics…</p>
  return (
    <div className="flex flex-col">
      {groups.map(group => {
        const tick = topicTick(group.subtopics, selected)
        const isOpen = open === group.name
        return (
          <div key={group.name} className="border-b border-border">
            <div className="flex items-stretch">
              <button
                type="button"
                role="checkbox"
                aria-checked={tick === 'all' ? true : tick === 'some' ? 'mixed' : false}
                data-sound="tick"
                onClick={() => onToggleTopic(group.name)}
                className={cn('flex min-h-[52px] min-w-0 flex-1 items-center gap-3.5 py-2 text-left', ROW_FOCUS)}
              >
                <TickBox state={tick} />
                <span className="min-w-0 flex-1 text-base font-medium leading-snug">{group.name}</span>
                <span className="shrink-0 text-[15px] tabular-nums">{counts.get(group.name) ?? 0}</span>
              </button>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-label={`${group.name}: ${isOpen ? 'hide' : 'show'} concepts`}
                onClick={() => setOpen(isOpen ? null : group.name)}
                className={cn('flex w-11 shrink-0 items-center justify-end', ROW_FOCUS)}
              >
                <ChevronDown className={cn('h-4 w-4 transition-transform motion-reduce:transition-none', !isOpen && '-rotate-90')} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
            {isOpen && (
              <div className="flex flex-col pb-2 pl-[38px]">
                {group.subtopics.map(concept => {
                  const on = selected.length === 0 || selected.includes(concept)
                  const level = levels.get(concept)
                  return (
                    <button
                      key={concept}
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      data-sound="tick"
                      onClick={() => onToggleConcept(concept)}
                      className={cn('flex min-h-[44px] items-center gap-3 py-1.5 text-left', ROW_FOCUS)}
                    >
                      <TickBox state={on ? 'all' : 'none'} />
                      <span className="min-w-0 flex-1 text-[15px] leading-snug">{concept}</span>
                      {level !== undefined && <LevelSquare state={level} size="sm" today={today.has(concept)} />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const LEVEL_NAME: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

/**
 * Difficulty: three buttons, any combination, filled when in. It is a filter,
 * so each says how many questions it holds. The last one in can't be taken out.
 */
export function DifficultyButtons({
  levels, counts, onChange,
}: {
  levels: readonly Difficulty[]
  counts?: Record<Difficulty, number>
  onChange: (next: Difficulty[]) => void
}) {
  return (
    <div role="group" aria-label="Difficulty" className="mt-2 flex gap-2">
      {DIFFICULTY_LEVELS.map(level => {
        const on = levels.includes(level)
        return (
          <button
            key={level}
            type="button"
            role="checkbox"
            aria-checked={on}
            data-sound="tick"
            onClick={() => onChange(toggleDifficultyLevel([...levels], level))}
            className={cn(
              'flex h-14 min-w-0 flex-1 flex-col items-center justify-center gap-px rounded-2xl border-[1.5px] border-foreground transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground',
              on ? 'bg-foreground text-ground' : 'hover:bg-foreground/10',
            )}
          >
            <span className="text-[15px] font-bold">{LEVEL_NAME[level]}</span>
            {counts && <span className="text-[13px] tabular-nums">{counts[level]}</span>}
          </button>
        )
      })}
    </div>
  )
}

/**
 * How it is sat: three labelled switches. Remembered apart for a quiz and for
 * a Practice Exam (`useQuizBuilderSettings`).
 */
export function SittingSwitches({
  reveal, onRevealChange, timed, onTimedChange, timedPace, conceptLinks, onConceptLinksChange, rule = true,
}: {
  reveal: RevealMode
  onRevealChange: (next: RevealMode) => void
  timed: boolean
  onTimedChange: (next: boolean) => void
  /** The exam's pace: "6:00 per question". */
  timedPace?: string
  conceptLinks: boolean
  onConceptLinksChange: (next: boolean) => void
  /** A hairline above the switches; off when what is above ends in one. */
  rule?: boolean
}) {
  return (
    <div data-sheet-section="sitting" className={cn('flex scroll-mt-2 flex-col', rule && 'border-t border-border pt-1.5')}>
      <SwitchRow label="Timed" aside={timedPace} on={timed} onToggle={() => onTimedChange(!timed)} />
      <SwitchRow
        label="Show answers after each question"
        on={reveal === 'during'}
        onToggle={() => onRevealChange(reveal === 'during' ? 'end' : 'during')}
      />
      <SwitchRow label="Tap concepts to read them" on={conceptLinks} onToggle={() => onConceptLinksChange(!conceptLinks)} />
    </div>
  )
}

function SwitchRow({
  label, aside, on, onToggle,
}: {
  label: string
  aside?: string
  on: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      data-sound="tick"
      onClick={onToggle}
      className={cn('flex min-h-[52px] w-full items-center gap-3.5 text-left', ROW_FOCUS)}
    >
      <span className="min-w-0 flex-1 text-base font-medium leading-snug">{label}</span>
      {aside && <span className="shrink-0 text-sm tabular-nums">{aside}</span>}
      <span
        aria-hidden="true"
        className={cn(
          'flex h-8 w-[52px] shrink-0 rounded-full border-[1.5px] border-foreground p-[3px] transition-colors',
          on ? 'justify-end bg-foreground' : 'justify-start bg-ground',
        )}
      >
        <span className={cn('h-[23px] w-[23px] rounded-full', on ? 'bg-ground' : 'bg-foreground')} />
      </span>
    </button>
  )
}
