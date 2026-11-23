import type { ReactNode } from 'react'
import type { SelfGrade } from '@/lib/parser'
import { gradePoints } from '@/lib/gradeWords'
import { cn } from '@/lib/utils'

// Full / Partial / None in the answer colours (docs/redesign-spec.md §5.2,
// lib/answerState.ts): each outlined in its colour, filled once picked.
const GRADES: Record<SelfGrade, { label: string; edge: string; solid: string; share: number }> = {
  correct: { label: 'Full', edge: 'border-answer-correct', solid: 'bg-answer-correct border-answer-correct text-ground', share: 1 },
  partial: { label: 'Partial', edge: 'border-answer-partial', solid: 'bg-answer-partial border-answer-partial text-ground', share: 0.5 },
  incorrect: { label: 'None', edge: 'border-answer-incorrect', solid: 'bg-answer-incorrect border-answer-incorrect text-ground', share: 0 },
}

interface SelfGradeButtonsProps {
  value: SelfGrade | null
  onChange: (grade: SelfGrade) => void
  /** The question above the buttons; null leaves it off (the grading popup names the part itself). */
  prompt?: string | null
  /** An accessible name for the group when there is no visible prompt. */
  label?: string
  /**
   * The grade the numeric check points to (lib/numericCheck.ts), outlined
   * until the reader picks one. Only ever a hint: nothing is chosen for them.
   */
  suggested?: SelfGrade | null
  /** Said between the prompt and the buttons: why a grade is suggested (`GradeSuggestion`). */
  hint?: ReactNode
  /** What the part is worth, so each button says the points it gives. */
  points?: number
}

/**
 * Full / Partial / None: how a reader marks a written answer against the
 * sample answer. Big targets on purpose: this is tapped once per part on a
 * phone, usually with the sample answer still being read above it.
 */
export function SelfGradeButtons({
  value,
  onChange,
  prompt = 'How did you do on this part?',
  label,
  suggested = null,
  hint,
  points,
}: SelfGradeButtonsProps) {
  const worth = points !== undefined && points > 0 ? points : null
  return (
    <div className="space-y-3" role="group" aria-label={prompt ?? label ?? 'Grade your answer'}>
      {prompt && <p className="text-base font-bold text-foreground">{prompt}</p>}
      {hint}
      <div className="flex gap-2">
        {(['correct', 'partial', 'incorrect'] as const).map(grade => {
          const active = value === grade
          const cfg = GRADES[grade]
          const hinted = value === null && suggested === grade
          return (
            <button
              key={grade}
              type="button"
              onClick={() => onChange(grade)}
              aria-pressed={active}
              className={cn(
                'flex h-16 min-w-0 flex-1 flex-col items-center justify-center gap-px rounded-[18px] border-2 px-1 text-center transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground',
                active ? cfg.solid : cn(cfg.edge, 'text-foreground hover:bg-foreground/10'),
                hinted && 'outline-dashed outline-2 outline-offset-[3px] outline-foreground',
              )}
            >
              <span className="text-base font-bold leading-tight">
                {cfg.label}{hinted && <span className="sr-only"> (suggested)</span>}
              </span>
              {worth !== null && <span className="text-[13px] leading-tight">{gradePoints(worth, cfg.share)}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
