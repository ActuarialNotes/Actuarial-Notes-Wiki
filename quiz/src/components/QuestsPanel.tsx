import { useState } from 'react'
import { ChevronLeft, ChevronRight, Gem, Loader2 } from 'lucide-react'
import { useQuests } from '@/hooks/useQuests'
import { KIND_STYLE, CollectButton } from '@/components/QuestsCard'
import { PERFECT_QUIZ_MIN, type QuestKind } from '@/data/quests'
import type { QuestContext, QuestProgressView } from '@/lib/quests'

// Quests tab body for the Level popup (roadmap P1.4, folded into the Level badge
// for P4.1). Non-modal: it renders inside the already-open popup, with an
// in-place list → detail drill-down. Shares the styling/collect button with
// QuestsCard.

/** Longer, quest-detail copy for what each kind actually counts. */
const KIND_DETAIL: Record<QuestKind, string> = {
  correct: 'Counts every question you answer correctly today, across any quiz and any difficulty.',
  hard_correct: 'Counts correct answers on hard-difficulty questions only.',
  revive: 'Counts correct answers on concepts that had decayed to Forgotten — a great way to shore up fading topics before they slip further.',
  level_up: 'Counts concepts that climb up the mastery ladder today (e.g. New → L1, L1 → L2, L2 → L3).',
  perfect_quiz: `Counts a quiz of ${PERFECT_QUIZ_MIN}+ questions where you answered every single one correctly.`,
  concept_correct: 'Counts correct answers on this quest’s concept, pulled from today’s study plan.',
}

export function QuestsPanel({ context }: { context?: QuestContext }) {
  const { board, completedCount, totalCount, claimable, claimableGems, claimableXp, claim, loading } =
    useQuests(context)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [claiming, setClaiming] = useState(false)

  const collect = (ids?: readonly string[]) => {
    if (claiming) return
    setClaiming(true)
    void claim(ids).finally(() => setClaiming(false))
  }

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (board.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-muted-foreground">
        Today’s quests appear once your study data has loaded.
      </p>
    )
  }

  // Look up the selected quest from the live board so the detail view reflects a
  // collect that happens while it's open.
  const selected = selectedId ? (board.find(v => v.quest.id === selectedId) ?? null) : null

  if (selected) {
    return (
      <QuestDetail
        view={selected}
        claiming={claiming}
        onCollect={() => collect([selected.quest.id])}
        onBack={() => setSelectedId(null)}
      />
    )
  }

  const allDone = totalCount > 0 && completedCount === totalCount

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs tabular-nums text-muted-foreground">
          {allDone ? `${completedCount}/${totalCount} · all done!` : `${completedCount}/${totalCount} completed`}
        </p>
      </div>

      {claimable.length > 0 && (
        <div className="mb-3 flex items-center justify-between gap-2 rounded-xl bg-emerald-500/10 px-3 py-2">
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            {claimable.length} quest{claimable.length > 1 ? 's' : ''} ready to collect
          </span>
          <CollectButton gems={claimableGems} xp={claimableXp} busy={claiming} onClick={() => collect()} />
        </div>
      )}

      <div className="space-y-1">
        {board.map(view => (
          <QuestRow key={view.quest.id} view={view} onClick={() => setSelectedId(view.quest.id)} />
        ))}
      </div>
    </div>
  )
}

function QuestRow({ view, onClick }: { view: QuestProgressView; onClick: () => void }) {
  const { quest, earned, target, ratio, done, claimed, claimable } = view
  const { Icon, accent, chip } = KIND_STYLE[quest.kind]
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-muted/60"
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${chip}`}>
        <Icon className={`h-5 w-5 ${accent}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className={`truncate text-sm font-semibold ${claimed ? 'text-muted-foreground line-through decoration-2' : ''}`}>
            {quest.title}
          </p>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{earned}/{target}</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-[width] duration-300 ${done ? 'bg-green-500' : 'bg-primary'}`}
            style={{ width: `${Math.round(ratio * 100)}%` }}
          />
        </div>
      </div>
      {claimable ? (
        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-label="Ready to collect" />
      ) : (
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  )
}

function QuestDetail({
  view,
  claiming,
  onCollect,
  onBack,
}: {
  view: QuestProgressView
  claiming: boolean
  onCollect: () => void
  onBack: () => void
}) {
  const { quest, earned, target, ratio, done, claimed, claimable } = view
  const { Icon, accent, chip } = KIND_STYLE[quest.kind]

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-3 flex items-center gap-1 rounded-md py-1 pr-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> All quests
      </button>

      <div className="mb-4 flex flex-col items-center gap-2 text-center">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${chip}`}>
          <Icon className={`h-7 w-7 ${accent}`} />
        </div>
        <h3 className="text-lg font-bold tracking-tight">{quest.title}</h3>
        <p className="text-sm text-muted-foreground">{quest.description}</p>
      </div>

      <div className="mb-4 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium tabular-nums">{earned}/{target}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-[width] duration-300 ${done ? 'bg-green-500' : 'bg-primary'}`}
            style={{ width: `${Math.round(ratio * 100)}%` }}
          />
        </div>
      </div>

      <div className="mb-4 rounded-xl bg-muted/40 p-3">
        <p className="text-xs text-muted-foreground">{KIND_DETAIL[quest.kind]}</p>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-xl bg-muted/30 px-3 py-2.5">
        <span className="inline-flex items-center gap-2 text-sm font-semibold tabular-nums">
          <Gem className="h-4 w-4 text-emerald-500" />
          {quest.gems}
          <span className="font-medium text-muted-foreground">+{quest.xp} XP</span>
        </span>
        {claimable ? (
          <button
            type="button"
            disabled={claiming}
            onClick={onCollect}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:opacity-60"
          >
            {claiming ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Gem className="h-3.5 w-3.5" />}
            Collect
          </button>
        ) : claimed ? (
          <span className="text-xs font-medium text-muted-foreground">Collected</span>
        ) : (
          <span className="text-xs font-medium text-muted-foreground">In progress</span>
        )}
      </div>
    </div>
  )
}
