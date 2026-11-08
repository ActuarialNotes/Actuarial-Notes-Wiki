import { Calculator, ListChecks } from 'lucide-react'

/**
 * The grade a written answer's own record points to, and why — the final
 * figure compared (lib/numericCheck.ts) or the checklist's ticks counted
 * (lib/essayChecklist.ts). It sits in the grade control, above the buttons it
 * outlines, and decides nothing: the reader still taps the grade.
 */
export function GradeSuggestion({ title, body, from }: { title: string; body: string; from: 'figure' | 'checklist' }) {
  const Icon = from === 'figure' ? Calculator : ListChecks
  return (
    <div className="space-y-1" role="note" aria-label="Suggested grade">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Icon aria-hidden="true" className="h-4 w-4" />
        {title}
      </p>
      <p className="text-sm leading-relaxed text-foreground">{body}</p>
    </div>
  )
}
