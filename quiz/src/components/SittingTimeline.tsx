import { CheckMark } from '@/components/CheckMark'
import { formatStepDate, stepCountdown, type SittingStep } from '@/lib/sittingTimeline'
import { cn } from '@/lib/utils'

/**
 * The sitting's dates, top to bottom, on one rule: a check on what has passed,
 * a filled dot on what is happening today, a ring on what comes next — which
 * alone carries a countdown — and a hollow dot on everything after.
 *
 * Two surfaces draw a sitting with it — the study guide's info panel
 * (`components/wiki/ExamSittingInfoButton.tsx`) and the Store's registration
 * sheet — so a deadline reads the same on both. It is its own module so the
 * Store's chunk and the exam page's share only this, not the info panel.
 */
export function SittingTimeline({ steps, today }: { steps: SittingStep[]; today: string }) {
  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const countdown = stepCountdown(step, today)
        const last = i === steps.length - 1
        return (
          <li key={`${step.kind}|${step.date}|${step.label}`} className={cn('relative flex gap-3', !last && 'pb-4')}>
            {!last && <span className="absolute left-2 top-5 bottom-0 w-px -translate-x-1/2 bg-border" aria-hidden />}
            <span className="flex h-5 w-4 shrink-0 items-center justify-center">
              <StepMarker state={step.state} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className={cn('text-sm font-medium', step.state === 'done' && 'text-muted-foreground')}>
                  {step.label}
                  <span className="sr-only">{STATE_SR[step.state]}</span>
                </span>
                {countdown && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {countdown}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground tabular-nums">
                {formatStepDate(step)}
                {step.note && <> · {step.note}</>}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/** Drawn only — the state is read out in the step's label (`STATE_SR`). */
function StepMarker({ state }: { state: SittingStep['state'] }) {
  if (state === 'done') return <CheckMark className="h-4 w-4" />
  if (state === 'now') return <span className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" aria-hidden />
  if (state === 'next') return <span className="h-3 w-3 rounded-full border-2 border-primary bg-card" aria-hidden />
  return <span className="h-2.5 w-2.5 rounded-full border-2 border-muted-foreground/40 bg-card" aria-hidden />
}

const STATE_SR: Record<SittingStep['state'], string> = {
  done: ' (passed)',
  now: ' (today)',
  next: ' (next)',
  later: '',
}
