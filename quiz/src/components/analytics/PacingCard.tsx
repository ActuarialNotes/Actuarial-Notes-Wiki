import { DIFFICULTY_ORDER } from '@/lib/accuracyTrend'
import { DIFFICULTY_LABEL } from '@/lib/difficultyBreakdown'
import { MIN_TIMED_ANSWERS, clock, paceRatio, type PaceReading, type PacingResult } from '@/lib/performanceAnalytics'
import { cn } from '@/lib/utils'

/** A bar's full width is this many times the allowance, so the allowance line sits at its middle. */
const SCALE = 2

function tone(ratio: number | null): string {
  if (ratio === null) return 'bg-muted-foreground/40'
  return ratio <= 100 ? 'bg-green-500/70' : ratio <= 120 ? 'bg-amber-500/80' : 'bg-red-500/70'
}

function textTone(ratio: number): string {
  return ratio <= 100 ? 'text-green-600 dark:text-green-400' : ratio <= 120 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
}

function verdict(ratio: number): string {
  if (ratio === 100) return 'Right on the exam’s pace'
  return ratio < 100 ? `${100 - ratio}% under the exam’s pace` : `${ratio - 100}% over the exam’s pace`
}

/** One pace as a bar against the allowance line. */
function PaceBar({ reading, allowed, thick }: { reading: PaceReading; allowed: number; thick?: boolean }) {
  const ratio = paceRatio(reading, allowed)
  const width = ratio === null ? 0 : Math.min(100, ratio / SCALE)
  return (
    <span className={cn('relative block rounded-full bg-muted', thick ? 'h-2' : 'h-1.5')} aria-hidden="true">
      <span className={cn('block h-full rounded-full', tone(ratio))} style={{ width: `${width}%` }} />
      <span className="absolute -top-1 -bottom-1 left-1/2 w-px bg-foreground/50" />
    </span>
  )
}

/**
 * **Pacing**: the median time a question (or point, on a paper marked by the
 * point) took over the span, against what the real sitting allows
 * (`lib/quizTiming.ts`), overall and by difficulty. The line on each bar is the
 * exam's pace; green is inside it, amber up to a fifth over, red beyond.
 */
export function PacingCard({ result }: { result: PacingResult }) {
  const { overall, allowed, pace, byDifficulty } = result
  const unit = pace.per === 'point' ? 'point' : 'question'
  const ratio = paceRatio(overall, allowed)

  return (
    <section className="min-w-0 rounded-xl bg-card shadow-sm px-5 pt-5 pb-4" aria-labelledby="pacing-heading">
      <h3 id="pacing-heading" className="text-sm font-semibold text-muted-foreground">Pacing</h3>
      {overall.median === null ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Your pace shows after {MIN_TIMED_ANSWERS} timed answers. The exam allows {clock(allowed)} a {unit}.
        </p>
      ) : (
        <>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-black tabular-nums leading-none">{clock(overall.median)}</span>
            <span className="text-sm text-muted-foreground">a {unit}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Median of {overall.answered} · the exam allows {clock(allowed)}
            {ratio !== null && <> · <span className={cn('font-semibold', textTone(ratio))}>{verdict(ratio)}</span></>}
          </p>
          <div className="mt-3"><PaceBar reading={overall} allowed={allowed} thick /></div>
          <dl className="mt-4 space-y-2.5">
            {DIFFICULTY_ORDER.map(d => {
              const r = byDifficulty[d]
              return (
                <div key={d} className="grid grid-cols-[4.5rem_1fr_3rem] items-center gap-3 text-xs">
                  <dt className="text-muted-foreground">{DIFFICULTY_LABEL[d]}</dt>
                  <PaceBar reading={r} allowed={allowed} />
                  <dd
                    className={cn('text-right font-semibold tabular-nums', r.median === null && 'text-muted-foreground')}
                    title={r.median === null ? `${r.answered} timed — too few to read a pace` : `Median of ${r.answered}`}
                  >
                    {r.median === null ? '—' : clock(r.median)}
                  </dd>
                </div>
              )
            })}
          </dl>
        </>
      )}
    </section>
  )
}
