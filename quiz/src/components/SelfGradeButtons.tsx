import type { SelfGrade } from '@/lib/parser'

const GRADES: Record<SelfGrade, { mark: string; label: string; active: string; inactive: string }> = {
  correct: {
    mark: '✓', label: 'Full credit',
    active: 'bg-green-600 hover:bg-green-700 text-white',
    inactive: 'bg-green-600/10 text-green-700 hover:bg-green-600/20 dark:text-green-400 dark:hover:bg-green-950',
  },
  partial: {
    mark: '~', label: 'Partial',
    active: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    inactive: 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 dark:text-yellow-400 dark:hover:bg-yellow-950',
  },
  incorrect: {
    mark: '✗', label: 'No credit',
    active: 'bg-red-600 hover:bg-red-700 text-white',
    inactive: 'bg-red-600/10 text-red-700 hover:bg-red-600/20 dark:text-red-400 dark:hover:bg-red-950',
  },
}

interface SelfGradeButtonsProps {
  value: SelfGrade | null
  onChange: (grade: SelfGrade) => void
  /** The question above the buttons; null leaves it off (the grading popup names the part itself). */
  prompt?: string | null
  /** An accessible name for the group when there is no visible prompt. */
  label?: string
}

/**
 * Full credit / Partial / No credit — how a reader marks a written answer
 * against the sample answer. Big targets on purpose: this is tapped once per
 * part on a phone, usually with the sample answer still being read above it.
 */
export function SelfGradeButtons({
  value,
  onChange,
  prompt = 'How did you do on this part?',
  label,
}: SelfGradeButtonsProps) {
  return (
    <div className="space-y-2.5" role="group" aria-label={prompt ?? label}>
      {prompt && <p className="text-base font-semibold text-foreground">{prompt}</p>}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {(['correct', 'partial', 'incorrect'] as const).map(grade => {
          const active = value === grade
          const cfg = GRADES[grade]
          return (
            <button
              key={grade}
              type="button"
              onClick={() => onChange(grade)}
              aria-pressed={active}
              className={[
                'flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-xl px-2 py-3',
                'sm:min-h-16 sm:flex-row sm:gap-2 sm:px-4',
                'text-base font-semibold leading-tight text-center transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                active ? `${cfg.active} shadow-sm` : cfg.inactive,
              ].join(' ')}
            >
              <span aria-hidden="true" className="text-2xl leading-none sm:text-xl">{cfg.mark}</span>
              <span>{cfg.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
