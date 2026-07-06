import { CheckCircle2, Gem, HeartPulse, Sparkles, Swords, Target, TrendingUp, Zap } from 'lucide-react'
import { useQuests } from '@/hooks/useQuests'
import type { QuestProgressView } from '@/lib/quests'
import type { QuestKind } from '@/data/quests'

// Per-kind icon + accent so the three daily quests read at a glance. Colors
// echo the surfaces they relate to: hard questions burn amber, revivals use the
// mastery-decay red, level-ups the readiness green.
const KIND_STYLE: Record<QuestKind, { Icon: typeof Target; accent: string; chip: string }> = {
  correct: { Icon: Target, accent: 'text-sky-500', chip: 'bg-sky-500/10' },
  hard_correct: { Icon: Zap, accent: 'text-amber-500', chip: 'bg-amber-500/10' },
  revive: { Icon: HeartPulse, accent: 'text-rose-500', chip: 'bg-rose-500/10' },
  level_up: { Icon: TrendingUp, accent: 'text-green-500', chip: 'bg-green-500/10' },
  perfect_quiz: { Icon: Sparkles, accent: 'text-violet-500', chip: 'bg-violet-500/10' },
}

function QuestRow({ view }: { view: QuestProgressView }) {
  const { quest, earned, target, ratio, done } = view
  const { Icon, accent, chip } = KIND_STYLE[quest.kind]
  return (
    <div className={`flex items-center gap-3 ${done ? 'opacity-70' : ''}`}>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${chip}`}>
        {done ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Icon className={`h-5 w-5 ${accent}`} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className={`truncate text-sm font-semibold ${done ? 'line-through decoration-2' : ''}`}>
            {quest.title}
          </p>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
            {earned}/{target}
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground">{quest.description}</p>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-[width] duration-300 ${done ? 'bg-green-500' : 'bg-primary'}`}
            style={{ width: `${Math.round(ratio * 100)}%` }}
          />
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5 text-xs font-semibold tabular-nums">
        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
          <Gem className="h-3 w-3" />
          {quest.gems}
        </span>
        <span className="text-muted-foreground">+{quest.xp} XP</span>
      </div>
    </div>
  )
}

/**
 * Dashboard card listing today's rotating daily quests (roadmap P1.4): what to
 * clear, how far along each one is, and what it pays. Progress advances on quiz
 * completion (stores/quizStore.ts → lib/questStore.ts) and resets at the user's
 * local midnight.
 */
export function QuestsCard() {
  const { board, completedCount, totalCount, allDone, loading } = useQuests()
  if (loading || board.length === 0) return null

  return (
    <div className="rounded-2xl border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Swords className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold tracking-tight">Daily quests</h2>
        </div>
        <span className="text-xs font-medium tabular-nums text-muted-foreground">
          {allDone ? 'All done — see you tomorrow!' : `${completedCount}/${totalCount} · resets at midnight`}
        </span>
      </div>
      <div className="space-y-3.5">
        {board.map(view => (
          <QuestRow key={view.quest.id} view={view} />
        ))}
      </div>
    </div>
  )
}
