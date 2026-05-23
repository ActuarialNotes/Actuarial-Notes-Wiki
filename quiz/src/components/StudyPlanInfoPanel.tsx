// Explains how Actuarial Notes builds custom study plans: spaced repetition,
// the forgetting curve, and the concept levelling system.

import { X, Info, Repeat, TrendingDown, Sparkles } from 'lucide-react'
import { DECAY_DAYS_LEVEL1, DECAY_DAYS_LEVEL2, DECAY_DAYS_LEVEL3 } from '@/lib/mastery'

interface Props {
  open: boolean
  onClose: () => void
}

const LEVELS: { key: string; label: string; desc: string; color: string }[] = [
  {
    key: 'new',
    label: 'New',
    desc: "You haven't tried this concept yet.",
    color: 'bg-muted text-muted-foreground',
  },
  {
    key: 'level1',
    label: 'Level 1',
    desc: 'First correct answer — fragile, needs reinforcement soon.',
    color: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40',
  },
  {
    key: 'level2',
    label: 'Level 2',
    desc: 'Several correct answers across at least two days.',
    color: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/40',
  },
  {
    key: 'level3',
    label: 'Level 3',
    desc: 'Mastered — including at least one hard question.',
    color: 'bg-green-500/15 text-green-700 dark:text-green-300 border-green-500/40',
  },
  {
    key: 'forgotten',
    label: 'Forgotten',
    desc: 'Decayed from disuse or repeated wrong answers — re-earn it.',
    color: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/40',
  },
]

export function StudyPlanInfoPanel({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="How custom study plans work"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg bg-card border rounded-xl shadow-2xl flex flex-col my-12">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 border-b shrink-0">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span className="flex-1 font-semibold text-sm">How custom study plans work</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-6 text-sm leading-relaxed">
          {/* Spaced Repetition */}
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <Repeat className="h-4 w-4 text-primary shrink-0" />
              <h3 className="font-semibold">Spaced Repetition</h3>
            </div>
            <p className="text-muted-foreground">
              Instead of cramming, we revisit each concept at growing intervals — short gaps at first,
              then longer ones as the concept sticks. Every successful recall strengthens the memory,
              so the next review can safely wait longer.
            </p>
            <div className="flex items-center gap-1.5 pt-1 flex-wrap">
              {['Day 1', 'Day 3', 'Day 7', 'Day 14', 'Day 30'].map((d, i, arr) => (
                <span key={d} className="flex items-center gap-1.5">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md border bg-muted/40">
                    {d}
                  </span>
                  {i < arr.length - 1 && <span className="text-muted-foreground text-xs">›</span>}
                </span>
              ))}
            </div>
          </section>

          {/* Forgetting Curve */}
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-primary shrink-0" />
              <h3 className="font-semibold">The Forgetting Curve</h3>
            </div>
            <p className="text-muted-foreground">
              Without practice, recall drops sharply at first and then more slowly. If a concept goes
              untouched, its level decays one rung at a time:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 pl-1">
              <li>· Level 3 → Level 2 after {DECAY_DAYS_LEVEL3} days without a correct answer</li>
              <li>· Level 2 → Level 1 after {DECAY_DAYS_LEVEL2} more days</li>
              <li>· Level 1 → Forgotten after {DECAY_DAYS_LEVEL1} more days</li>
            </ul>
            <svg viewBox="0 0 200 60" className="w-full h-14 mt-1" aria-hidden="true">
              <path
                d="M 2 8 C 30 14, 50 38, 90 48 S 160 58, 198 58"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary/60"
              />
              <line x1="2" y1="58" x2="198" y2="58" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            </svg>
            <p className="text-xs text-muted-foreground">
              Your study plan re-injects forgotten and fragile concepts at the right moment to flatten the curve.
            </p>
          </section>

          {/* Levelling System */}
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <h3 className="font-semibold">The Concept Levelling System</h3>
            </div>
            <p className="text-muted-foreground">
              Each concept moves through a ladder of states. Answering questions correctly — and across
              multiple days, including at least one hard one — promotes a concept upward. Wrong streaks
              or disuse send it back down.
            </p>
            <div className="space-y-1.5 pt-1">
              {LEVELS.map(l => (
                <div key={l.key} className="flex items-start gap-2">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md border shrink-0 mt-0.5 ${l.color}`}>
                    {l.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{l.desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
