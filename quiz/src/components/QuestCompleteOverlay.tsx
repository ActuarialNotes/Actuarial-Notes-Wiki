import { useEffect, useState } from 'react'
import { Gem, Loader2, Swords } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { questRewards } from '@/lib/quests'
import {
  claimQuestRewards,
  clearJustCompletedQuests,
  QUEST_COMPLETED_EVENT,
  readJustCompletedQuests,
} from '@/lib/questStore'
import type { QuestDef } from '@/data/quests'

/**
 * Celebration interstitial shown right after a quiz completes one or more daily
 * quests, before the student digs into the review screen: which quests cleared
 * and a prompt to collect the gems/XP. Quest progress is recorded
 * fire-and-forget while the app navigates to /review, so this reads the
 * day-keyed "just completed" marker questStore parks in localStorage (covering
 * completions that landed before mount) and listens for QUEST_COMPLETED_EVENT
 * (covering ones that land after). "Later" leaves the rewards claimable from
 * the Dashboard quests card.
 */
export function QuestCompleteOverlay() {
  const { user } = useAuth()
  const [quests, setQuests] = useState<QuestDef[]>(() => readJustCompletedQuests())
  const [claiming, setClaiming] = useState(false)

  useEffect(() => {
    const handler = () => setQuests(readJustCompletedQuests())
    window.addEventListener(QUEST_COMPLETED_EVENT, handler)
    return () => window.removeEventListener(QUEST_COMPLETED_EVENT, handler)
  }, [])

  if (quests.length === 0) return null

  const totals = questRewards(quests)

  const dismiss = () => {
    clearJustCompletedQuests()
    setQuests([])
  }

  const collect = () => {
    if (claiming) return
    setClaiming(true)
    void claimQuestRewards(user?.id ?? null, quests.map(q => q.id)).finally(() => {
      setClaiming(false)
      dismiss()
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Quest complete"
    >
      <div className="w-full max-w-sm space-y-4 rounded-2xl border bg-card p-6 shadow-2xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
            <Swords className="h-7 w-7 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {quests.length === 1 ? 'Quest complete!' : `${quests.length} quests complete!`}
          </h2>
        </div>

        <div className="space-y-2">
          {quests.map(q => (
            <div key={q.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{q.title}</p>
                <p className="truncate text-xs text-muted-foreground">{q.description}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                <Gem className="h-3.5 w-3.5" />
                {q.gems}
                <span className="font-semibold text-muted-foreground">+{q.xp} XP</span>
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          disabled={claiming}
          onClick={collect}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-60"
        >
          {claiming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gem className="h-4 w-4" />}
          Collect {totals.gems} gems + {totals.xp} XP
        </button>
        {!user && (
          <p className="text-center text-xs text-muted-foreground">
            You&apos;ll get the XP now — sign in to bank the gems too.
          </p>
        )}
        <button
          type="button"
          onClick={dismiss}
          className="w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Collect later
        </button>
      </div>
    </div>
  )
}
