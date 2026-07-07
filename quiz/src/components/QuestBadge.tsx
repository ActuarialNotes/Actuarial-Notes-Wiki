import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Gem, Loader2, Swords, X } from 'lucide-react'
import { useQuests } from '@/hooks/useQuests'
import { KIND_STYLE, CollectButton } from '@/components/QuestsCard'
import { PERFECT_QUIZ_MIN, type QuestKind } from '@/data/quests'
import type { QuestContext, QuestProgressView } from '@/lib/quests'

// Header "challenge icon" for today's daily quests (roadmap P1.4). Sits next to
// the level ring in the Dashboard header — a compact entry point that replaces
// the old always-expanded QuestsCard section. Clicking it opens a popup listing
// today's board; clicking a quest in that list drills into a detail view with
// the full description, progress, and reward.

/** Longer, quest-detail copy for what each kind actually counts. */
const KIND_DETAIL: Record<QuestKind, string> = {
  correct: 'Counts every question you answer correctly today, across any quiz and any difficulty.',
  hard_correct: 'Counts correct answers on hard-difficulty questions only.',
  revive: 'Counts correct answers on concepts that had decayed to Forgotten — a great way to shore up fading topics before they slip further.',
  level_up: 'Counts concepts that climb up the mastery ladder today (e.g. New → L1, L1 → L2, L2 → L3).',
  perfect_quiz: `Counts a quiz of ${PERFECT_QUIZ_MIN}+ questions where you answered every single one correctly.`,
  concept_correct: 'Counts correct answers on this quest’s concept, pulled from today’s study plan.',
}

export function QuestBadge({ context, size = 32 }: { context?: QuestContext; size?: number }) {
  const { board, completedCount, totalCount, claimable, claimableGems, claimableXp, claim, loading } =
    useQuests(context)
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [claiming, setClaiming] = useState(false)

  if (loading || board.length === 0) return null

  // Look up the selected quest from the live board (rather than holding a
  // snapshot) so the detail popup reflects a collect that happens while it's
  // open, instead of freezing on the state it was opened with.
  const selected = selectedId ? (board.find(v => v.quest.id === selectedId) ?? null) : null

  const collect = (ids?: readonly string[]) => {
    if (claiming) return
    setClaiming(true)
    void claim(ids).finally(() => setClaiming(false))
  }

  const close = () => { setOpen(false); setSelectedId(null) }

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={e => { e.stopPropagation(); setOpen(true) }}
        aria-label={`Daily quests, ${completedCount} of ${totalCount} complete. View challenges.`}
        title={`Daily quests · ${completedCount}/${totalCount}`}
        className="relative flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-150 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={{ width: size, height: size }}
      >
        <Swords style={{ width: size * 0.5, height: size * 0.5 }} />
        {claimable.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-emerald-500 px-[3px] text-[9px] font-bold leading-none text-white tabular-nums">
            {claimable.length}
          </span>
        )}
      </button>

      {open && !selected && (
        <QuestListPopup
          board={board}
          completedCount={completedCount}
          totalCount={totalCount}
          claimable={claimable}
          claimableGems={claimableGems}
          claimableXp={claimableXp}
          claiming={claiming}
          onCollectAll={() => collect()}
          onSelect={v => setSelectedId(v.quest.id)}
          onClose={close}
        />
      )}

      {open && selected && (
        <QuestDetailPopup
          view={selected}
          claiming={claiming}
          onCollect={() => collect([selected.quest.id])}
          onBack={() => setSelectedId(null)}
          onClose={close}
        />
      )}
    </div>
  )
}

function QuestListPopup({
  board,
  completedCount,
  totalCount,
  claimable,
  claimableGems,
  claimableXp,
  claiming,
  onCollectAll,
  onSelect,
  onClose,
}: {
  board: QuestProgressView[]
  completedCount: number
  totalCount: number
  claimable: QuestProgressView[]
  claimableGems: number
  claimableXp: number
  claiming: boolean
  onCollectAll: () => void
  onSelect: (v: QuestProgressView) => void
  onClose: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const allDone = totalCount > 0 && completedCount === totalCount

  return (
    <>
      <div className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        className="fixed left-1/2 top-1/2 z-[66] w-[calc(100vw-2rem)] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-card p-4 text-left shadow-2xl outline-none"
        role="dialog"
        aria-modal="true"
        aria-label="Daily quests"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Swords className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Daily quests</p>
              <p className="text-xs tabular-nums text-muted-foreground">
                {allDone ? `${completedCount}/${totalCount} · all done!` : `${completedCount}/${totalCount} completed`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {claimable.length > 0 && (
          <div className="mb-3 flex items-center justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              {claimable.length} quest{claimable.length > 1 ? 's' : ''} ready to collect
            </span>
            <CollectButton gems={claimableGems} xp={claimableXp} busy={claiming} onClick={onCollectAll} />
          </div>
        )}

        <div className="space-y-1">
          {board.map(view => (
            <QuestListRow key={view.quest.id} view={view} onClick={() => onSelect(view)} />
          ))}
        </div>
      </div>
    </>
  )
}

function QuestListRow({ view, onClick }: { view: QuestProgressView; onClick: () => void }) {
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

function QuestDetailPopup({
  view,
  claiming,
  onCollect,
  onBack,
  onClose,
}: {
  view: QuestProgressView
  claiming: boolean
  onCollect: () => void
  onBack: () => void
  onClose: () => void
}) {
  const { quest, earned, target, ratio, done, claimed, claimable } = view
  const { Icon, accent, chip } = KIND_STYLE[quest.kind]

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      <div className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        className="fixed left-1/2 top-1/2 z-[66] w-[calc(100vw-2rem)] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-card p-4 text-left shadow-2xl outline-none"
        role="dialog"
        aria-modal="true"
        aria-label={quest.title}
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 rounded-md py-1 pr-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> All quests
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 flex flex-col items-center gap-2 text-center">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${chip}`}>
            <Icon className={`h-7 w-7 ${accent}`} />
          </div>
          <h2 className="text-lg font-bold tracking-tight">{quest.title}</h2>
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

        <div className="mb-4 rounded-xl border bg-muted/40 p-3">
          <p className="text-xs text-muted-foreground">{KIND_DETAIL[quest.kind]}</p>
        </div>

        <div className="flex items-center justify-between gap-2 rounded-xl border bg-muted/30 px-3 py-2.5">
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
    </>
  )
}
