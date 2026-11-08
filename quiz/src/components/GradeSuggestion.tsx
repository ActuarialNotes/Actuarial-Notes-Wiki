import { Calculator } from 'lucide-react'
import { numericCheckMessage, type NumericCheck } from '@/lib/numericCheck'

/**
 * What the numeric check made of a calculation part (lib/numericCheck.ts):
 * the grade the figures point to and the two figures it compared. It sits in
 * the grade control, above the buttons it outlines, and decides nothing — the
 * reader still taps the grade.
 */
export function GradeSuggestion({ check }: { check: NumericCheck }) {
  const { title, body } = numericCheckMessage(check)
  return (
    <div className="space-y-1" role="note" aria-label="Suggested grade">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Calculator aria-hidden="true" className="h-4 w-4" />
        {title}
      </p>
      <p className="text-sm leading-relaxed text-foreground">{body}</p>
    </div>
  )
}
