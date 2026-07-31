// The study-plan explainer slides. The modal that used to wrap them (opened
// from per-card info buttons) is gone — DashboardGuideModal now renders the
// slides directly behind the Dashboard's "?" button. Kept as separate exports
// so the remaining ones stay available to it.

import { DECAY_DAYS_LEVEL1, DECAY_DAYS_LEVEL2, DECAY_DAYS_LEVEL3 } from '@/lib/mastery'

const LEVELS: { key: string; label: string; desc: string; color: string }[] = [
  {
    key: 'new',
    label: 'New',
    desc: "Not yet attempted.",
    color: 'bg-muted text-muted-foreground',
  },
  {
    key: 'level1',
    label: 'Level 1',
    desc: 'First correct answer. Still fragile; return on a later day to advance.',
    color: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/20 dark:text-green-500 dark:border-green-900',
  },
  {
    key: 'level2',
    label: 'Level 2',
    desc: 'Answered correctly on at least two separate days.',
    color: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800',
  },
  {
    key: 'level3',
    label: 'Level 3',
    desc: 'Mastered. Answered correctly on at least three separate days.',
    color: 'bg-green-200 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-700',
  },
  {
    key: 'forgotten',
    label: 'Forgotten',
    desc: 'Decayed after 7 days without a correct answer, or 3 wrong answers in a row. Re-earn it.',
    color: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/40',
  },
]

export function SpacedRepetitionSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Instead of cramming, we revisit each concept at growing intervals: short gaps at first, then longer ones as the concept sticks.
      </p>
      <div className="flex items-center gap-1.5 flex-wrap">
        {['Day 1', 'Day 3', 'Day 7', 'Day 14', 'Day 30'].map((d, i, arr) => (
          <span key={d} className="flex items-center gap-1.5">
            <span className="text-sm font-medium px-2 py-0.5 rounded-md bg-muted/40">{d}</span>
            {i < arr.length - 1 && <span className="text-muted-foreground text-sm">›</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ForgettingCurveSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Without practice, recall drops over time. If a concept goes untouched, its level decays one rung at a time:
      </p>
      <ul className="text-sm text-muted-foreground space-y-1 pl-1">
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
    </div>
  )
}

export function LevellingSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Each concept moves through a ladder of states based on your quiz performance.
      </p>
      <div className="space-y-1.5">
        {LEVELS.map(l => (
          <div key={l.key} className="flex items-start gap-2">
            <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md border shrink-0 mt-0.5 ${l.color}`}>
              {l.label}
            </span>
            <span className="text-sm text-muted-foreground">{l.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
