import { useState } from 'react'
import { playSound } from '@/lib/soundEngine'
import { ChevronLeft, Gem, Loader2 } from 'lucide-react'
import { GroupSurface } from '@/components/ui/GroupedList'
import { GROUP_ACTION_ROW, RowChevron } from '@/components/ui/infoRows'
import { useQuests } from '@/hooks/useQuests'
import { CollectButton } from '@/components/QuestsCard'
import { KIND_STYLE } from '@/components/questKindStyle'
import { PERFECT_QUIZ_MIN, type QuestKind } from '@/data/quests'
import type { QuestContext, QuestProgressView } from '@/lib/quests'

// Quests tab body for the Level popup (roadmap P1.4, folded into the Level badge
// for P4.1). Non-modal: it renders inside the already-open popup, with an
// in-place list → detail drill-down. Shares the styling/collect button with
// QuestsCard.

/** Longer, quest-detail copy for what each kind actually counts. */
const KIND_DETAIL: Record<QuestKind, string> = {
  correct: 'Counts every question you answer correctly today, across any quiz and any difficulty.',
  hard_correct: 'Counts correct answers on hard questions only.',
  revive: 'Counts correct answers on concepts at Forgotten.',
  level_up: 'Counts concepts that go up a level today, such as New to Level 1 or Level 2 to Level 3.',
  perfect_quiz: `Counts a quiz of ${PERFECT_QUIZ_MIN}+ questions where you answered every single one correctly.`,
  concept_correct: 'Counts correct answers on this quest’s concept, pulled from today’s study plan.',
}

export function QuestsPanel({ context }: { context?: QuestContext }) {
  const { board, claimable, claimableGems, claimableXp, claim, loading } =
    useQuests(context)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [claiming, setClaiming] = useState(false)

  const collect = (ids?: readonly string[]) => {
    if (claiming) return
    playSound('reward')
    setClaiming(true)
    void claim(ids).finally(() => setClaiming(false))
  }

  // Look up the selected quest from the live board so the detail view reflects a
  // collect that happens while it's open. (Detail is a full drill-down — the
  // daily goal isn't shown there.)
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

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : board.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">
          Today’s quests appear once your progress has loaded.
        </p>
      ) : (
        <GroupSurface>
          {claimable.length > 0 && (
            <div className="flex items-center gap-3 bg-emerald-500/10 px-3.5 py-2.5">
              <span className="min-w-0 flex-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {claimable.length} ready
              </span>
              <CollectButton gems={claimableGems} xp={claimableXp} busy={claiming} onClick={() => collect()} />
            </div>
          )}
          {board.map(view => (
            <QuestRow key={view.quest.id} view={view} onClick={() => setSelectedId(view.quest.id)} />
          ))}
        </GroupSurface>
      )}
    </div>
  )
}

function QuestRow({ view, onClick }: { view: QuestProgressView; onClick: () => void }) {
  const { quest, earned, target, claimed, claimable } = view
  const { Icon, accent, chip } = KIND_STYLE[quest.kind]
  return (
    <button type="button" onClick={onClick} className={GROUP_ACTION_ROW}>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${chip}`}>
        <Icon className={`h-4 w-4 ${accent}`} />
      </span>
      <span className={`min-w-0 flex-1 truncate ${claimed ? 'text-muted-foreground line-through decoration-2' : ''}`}>
        {quest.title}
      </span>
      {claimable && <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-label="Ready to collect" />}
      <span className="shrink-0 tabular-nums text-muted-foreground">{earned}/{target}</span>
      <RowChevron />
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
