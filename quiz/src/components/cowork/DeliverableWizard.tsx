import { Check, RotateCcw } from 'lucide-react'
import {
  chosenOption,
  nextStep,
  visibleSteps,
  wizardProgress,
  type WizardAnswers,
  type WizardStep,
} from '@/lib/coworkDeliverables'
import { NavProgressBar } from '@/components/NavProgressBar'
import { cn } from '@/lib/utils'

/**
 * The **scoping flow** — one question at a time, with the answers already given
 * standing above it.
 *
 * One question at a time is the point, not a layout choice. Each answer changes
 * what the next question can sensibly ask (a pensions deliverable is never
 * asked which auto coverage it covers), so a form showing every field at once
 * would be showing fields that do not apply and cannot know it yet.
 *
 * An answered question stays on screen as a row that can be pressed to change
 * it. Changing an earlier answer drops the answers it unlocked — that is
 * `answerStep` in the engine, not this component — so the flow can be walked
 * backwards without leaving a deliverable carrying an assumption its scoping no
 * longer asks for.
 */

export interface DeliverableWizardProps {
  steps: WizardStep[]
  answers: WizardAnswers
  onAnswer: (stepId: string, optionId: string) => void
  onUnanswer: (stepId: string) => void
}

export function DeliverableWizard({ steps, answers, onAnswer, onUnanswer }: DeliverableWizardProps) {
  const answered = visibleSteps(steps, answers).filter(step => answers[step.id] !== undefined)
  const current = nextStep(steps, answers)
  const progress = wizardProgress(steps, answers)

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1.5 flex items-baseline justify-between text-xs text-muted-foreground">
          <span>Scoping</span>
          <span className="tabular-nums">
            {progress.answered} of {progress.total}
          </span>
        </div>
        {/* No `onScrub`: a scoping flow is not a position in a document, it is a
            sequence of decisions — there is nowhere to drag to. */}
        <NavProgressBar current={progress.answered} total={progress.total} />
      </div>

      {answered.length > 0 && (
        <ul className="space-y-1.5">
          {answered.map(step => {
            const option = chosenOption(step, answers)
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => onUnanswer(step.id)}
                  data-sound="select"
                  className="group flex w-full items-start gap-2.5 rounded-lg border bg-card px-3 py-2 text-left transition-colors hover:bg-accent/50"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted-foreground">{step.question}</span>
                    <span className="block text-sm font-medium text-foreground">{option?.label}</span>
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    Change
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {current ? (
        <div className="rounded-xl border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground">{current.question}</h3>
          {current.help && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{current.help}</p>}
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {current.options.map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => onAnswer(current.id, option.id)}
                data-sound="select"
                className={cn(
                  'rounded-lg border px-3 py-2.5 text-left transition-colors',
                  'hover:border-ring hover:bg-accent/50',
                )}
              >
                <span className="block text-sm font-medium text-foreground">{option.label}</span>
                {option.detail && (
                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{option.detail}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">Scoping complete</p>
          <p className="mt-1 text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-200/80">
            Attach the sources this work is built on, and the assumptions register fills in from them.
          </p>
        </div>
      )}
    </div>
  )
}
