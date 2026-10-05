import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarkdownText } from '@/components/MarkdownText'
import { SelfGradeButtons } from '@/components/SelfGradeButtons'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { stemPreview } from '@/lib/questionPreview'
import type { Part, SelfGrade } from '@/lib/parser'

interface GradePartsDialogProps {
  /** The written parts left ungraded when the reader pressed Next. */
  parts: Part[]
  /** Grades given so far, by part label — including any given in here. */
  grades: Record<string, SelfGrade | undefined>
  onGrade: (partLabel: string, grade: SelfGrade) => void
  /** The question has this one part, so it is "your answer", not "Part A". */
  isOnlyPart: boolean
  /** What moving on means here: "Next Question", "Finish Quiz", … */
  continueLabel: string
  /** Move on — every part graded, or the grading skipped. */
  onContinue: () => void
  /** Stay on the question, to read the sample answer again. */
  onCancel: () => void
}

function pointsLabel(points: number): string {
  return `${points} pt${points !== 1 ? 's' : ''}`
}

/**
 * Asked when the reader leaves a question with written parts still ungraded:
 * the grade buttons for each, right here, so marking yourself doesn't mean
 * closing a dialog and scrolling back to find them. Moving on is held until
 * every part has a grade; "Skip grading" moves on without, and Esc or the
 * backdrop goes back to the answers.
 */
export function GradePartsDialog({
  parts,
  grades,
  onGrade,
  isOnlyPart,
  continueLabel,
  onContinue,
  onCancel,
}: GradePartsDialogProps) {
  // Paper: the panel sliding in.
  useSoundOnMount('open')
  const panelRef = useRef<HTMLDivElement>(null)

  // Focus moves into the dialog once, as it opens — not on every render, or
  // grading a part would pull focus off the button just pressed.
  useEffect(() => {
    panelRef.current?.focus()
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  const remaining = parts.filter(p => grades[p.label] === undefined).length
  const title = parts.length > 1
    ? 'Grade your answers'
    : isOnlyPart ? 'Grade your answer' : `Grade Part ${parts[0]?.label.toUpperCase()}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 paper-scrim"
      onClick={onCancel}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="grade-parts-title"
        tabIndex={-1}
        className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-card text-card-foreground shadow-2xl p-5 sm:p-6 space-y-5 focus:outline-none"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="Back to the answer"
          className="absolute top-4 right-4 rounded-full p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-1 pr-8">
          <h2 id="grade-parts-title" className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            Mark yourself against the sample answer before moving on.
          </p>
        </div>

        <ul className="space-y-5">
          {parts.map(part => {
            const name = isOnlyPart ? 'Your answer' : `Part ${part.label.toUpperCase()}`
            const preview = part.stem ? stemPreview(part.stem, 140) : ''
            return (
              <li key={part.label} className="space-y-2.5">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">
                    {name}
                    {part.points > 0 && (
                      <span className="ml-1.5 font-normal text-muted-foreground">{pointsLabel(part.points)}</span>
                    )}
                  </p>
                  {preview && !isOnlyPart && (
                    <MarkdownText inline className="line-clamp-2 text-sm text-muted-foreground">
                      {preview}
                    </MarkdownText>
                  )}
                </div>
                <SelfGradeButtons
                  value={grades[part.label] ?? null}
                  onChange={grade => onGrade(part.label, grade)}
                  prompt={null}
                  label={isOnlyPart ? 'Grade for your answer' : `Grade for ${name}`}
                />
              </li>
            )
          })}
        </ul>

        <div className="flex flex-wrap justify-end gap-2 pt-1">
          <Button variant="outline" size="lg" onClick={onContinue}>
            Skip grading
          </Button>
          <Button
            size="lg"
            onClick={onContinue}
            disabled={remaining > 0}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            {continueLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
