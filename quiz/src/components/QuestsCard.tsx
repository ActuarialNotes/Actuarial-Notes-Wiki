import { useState } from 'react'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Gem,
  HeartPulse,
  Loader2,
  Sparkles,
  Swords,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { useQuests } from '@/hooks/useQuests'
import type { QuestContext, QuestProgressView } from '@/lib/quests'
import type { QuestKind } from '@/data/quests'

// Per-kind icon + accent so the daily quests read at a glance. Colors echo the
// surfaces they relate to: hard questions burn amber, revivals use the
// mastery-decay red, level-ups the readiness green.
export const KIND_STYLE: Record<QuestKind, { Icon: typeof Target; accent: string; chip: string }> = {
  correct: { Icon: Target, accent: 'text-sky-500', chip: 'bg-sky-500/10' },
  hard_correct: { Icon: Zap, accent: 'text-amber-500', chip: 'bg-amber-500/10' },
  revive: { Icon: HeartPulse, accent: 'text-rose-500', chip: 'bg-rose-500/10' },
  level_up: { Icon: TrendingUp, accent: 'text-green-500', chip: 'bg-green-500/10' },
  perfect_quiz: { Icon: Sparkles, accent: 'text-violet-500', chip: 'bg-violet-500/10' },
  concept_correct: { Icon: BookOpen, accent: 'text-primary', chip: 'bg-primary/10' },
}

/** The emerald "collect rewards" pill shared by the header and quest rows. */
export function CollectButton({
  gems,
  xp,
  busy,
  onClick,
}: {
  gems: number
  xp: number
  busy: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={busy}
      onClick={e => {
        e.stopPropagation()
        onClick()
      }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:opacity-60"
    >
      {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Gem className="h-3.5 w-3.5" />}
      <span className="tabular-nums">{gems}</span>
      <span className="font-semibold opacity-90 tabular-nums">+{xp} XP</span>
    </button>
  )
}

function QuestRow({
  view,
  busy,
  onCollect,
}: {
  view: QuestProgressView
  busy: boolean
  onCollect: (id: string) => void
}) {
  const { quest, earned, target, ratio, done, claimed, claimable } = view
  const { Icon, accent, chip } = KIND_STYLE[quest.kind]
  return (
    <div className={`flex items-center gap-3 ${claimed ? 'opacity-60' : ''}`}>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${chip}`}>
        {done ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Icon className={`h-5 w-5 ${accent}`} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className={`truncate text-sm font-semibold ${claimed ? 'line-through decoration-2' : ''}`}>
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
      {claimable ? (
        <CollectButton gems={quest.gems} xp={quest.xp} busy={busy} onClick={() => onCollect(quest.id)} />
      ) : (
        <div className="flex shrink-0 flex-col items-end gap-0.5 text-xs font-semibold tabular-nums">
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <Gem className="h-3 w-3" />
            {quest.gems}
          </span>
          <span className="text-muted-foreground">+{quest.xp} XP</span>
        </div>
      )}
    </div>
  )
}

/**
 * Dashboard section for today's daily quests (roadmap P1.4). Collapsed by
 * default to a one-line summary — "X/3 completed" plus a collect button when
 * cleared quests are waiting — and expandable into the full board with
 * per-quest progress and collect buttons. Progress advances on quiz completion
 * (stores/quizStore.ts → lib/questStore.ts) and the board resets at the user's
 * local midnight. Pass the Dashboard's mastery/plan `context` so the board is
 * personalized (revive quests only when concepts are actually forgotten, a
 * focus quest from today's study plan).
 */
export function QuestsCard({ context }: { context?: QuestContext }) {
  const { board, completedCount, totalCount, allDone, claimable, claimableGems, claimableXp, claim, loading } =
    useQuests(context)
  const [expanded, setExpanded] = useState(false)
  const [claiming, setClaiming] = useState(false)
  if (loading || board.length === 0) return null

  const collect = (ids?: readonly string[]) => {
    if (claiming) return
    setClaiming(true)
    void claim(ids).finally(() => setClaiming(false))
  }

  return (
    <div className="rounded-2xl bg-card">
      {/* Header — always visible; the whole row toggles the section. */}
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-2 rounded-2xl p-5 text-left transition-colors hover:bg-muted/40"
      >
        <Swords className="h-4 w-4 shrink-0 text-primary" />
        <h2 className="text-sm font-bold tracking-tight">Daily quests</h2>
        <span className="min-w-0 flex-1 truncate text-xs font-medium tabular-nums text-muted-foreground">
          {allDone
            ? `${completedCount}/${totalCount} · all done!`
            : `${completedCount}/${totalCount} completed · resets at midnight`}
        </span>
        {!expanded && claimable.length > 0 && (
          <CollectButton gems={claimableGems} xp={claimableXp} busy={claiming} onClick={() => collect()} />
        )}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="space-y-3.5 px-5 pb-5">
          {board.map(view => (
            <QuestRow key={view.quest.id} view={view} busy={claiming} onCollect={id => collect([id])} />
          ))}
        </div>
      )}
    </div>
  )
}
