import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { accuracyPercent } from '@/lib/accuracyTrend'
import type { SectionLeak } from '@/lib/performanceAnalytics'
import { formatMarks as marks, sectionQuizHref as quizHref } from '@/lib/analyticsSummary'

/** Judged sections listed before the rest fold away. */
const SHOWN = 5
/** Unjudged sections listed — the biggest unknowns. */
const SHOWN_UNJUDGED = 3

/**
 * **Where you're losing marks**: each syllabus section's accuracy weighed by
 * its share of the paper (`sectionLeaks`), so a weak heavy section outranks a
 * weak light one. A section with too few answers to judge is listed after, by
 * its share — the next biggest unknown. Every row starts a quiz on the section.
 */
export function SectionLeaksCard({ leaks, examLabel }: { leaks: SectionLeak[]; examLabel: string }) {
  const judged = leaks.filter(l => l.marksLost !== null)
  const unjudged = leaks.filter(l => l.marksLost === null)
  const most = Math.max(0, ...judged.map(l => l.marksLost!))

  return (
    <section className="min-w-0 rounded-xl bg-card shadow-sm px-5 pt-5 pb-3" aria-labelledby="leaks-heading">
      <h3 id="leaks-heading" className="text-sm font-semibold text-muted-foreground">Where you're losing marks</h3>
      {judged.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Answer three questions in a section to see what it costs you.
        </p>
      ) : (
        <ul className="mt-2 -mx-2">
          {judged.slice(0, SHOWN).map(l => (
            <li key={l.name}>
              <Link
                to={quizHref(examLabel, l)}
                className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent/40 active:bg-accent/60"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium" title={l.name}>{l.name}</span>
                  <span className="block text-xs text-muted-foreground tabular-nums">
                    {accuracyPercent(l)}% right of {l.answered} · {Math.round(l.share)}% of the exam
                  </span>
                  <span className="mt-1.5 block h-1 rounded-full bg-muted" aria-hidden="true">
                    <span
                      className="block h-full rounded-full bg-red-500/70"
                      style={{ width: `${most > 0 ? Math.max(2, (100 * l.marksLost!) / most) : 0}%` }}
                    />
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-sm font-semibold tabular-nums">−{marks(l.marksLost!)}</span>
                  <span className="block text-[11px] text-muted-foreground">of 100 marks</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                <span className="sr-only">Practise {l.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {unjudged.length > 0 && (
        <div className="mt-2 border-t border-border pt-2">
          <h4 className="text-xs font-semibold text-muted-foreground">Not practised enough to judge</h4>
          <ul className="mt-1 -mx-2">
            {unjudged.slice(0, SHOWN_UNJUDGED).map(l => (
              <li key={l.name}>
                <Link
                  to={quizHref(examLabel, l)}
                  className="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent/40 active:bg-accent/60"
                >
                  <span className="min-w-0 flex-1 truncate text-sm" title={l.name}>{l.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                    {l.answered > 0 ? `${l.answered} answered · ` : ''}{Math.round(l.share)}% of the exam
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  <span className="sr-only">Practise {l.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
