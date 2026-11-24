// You, the profile (docs/redesign-spec.md §7b.1): the reader's character, name
// and level; the streak and gems; a Today card with the daily goal and the
// day's quests; and the rows that lead on to League, Settings, Store, Community
// (for the accounts that have it) and Help.
//
// A visitor's level, streak, goal and quests are kept in the browser, so the
// screen works without an account; what an account holds (a name, the Pro
// tag, gems, the league) is replaced by Sign in.

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Flame, Gem } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useXp } from '@/hooks/useXp'
import { useStreak } from '@/hooks/useStreak'
import { useGems } from '@/hooks/useGems'
import { useQuests } from '@/hooks/useQuests'
import { useLeague } from '@/hooks/useLeague'
import { useCommunityAccess } from '@/hooks/useCommunityAccess'
import { useSubscription } from '@/hooks/useSubscription'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { usePageLabel } from '@/hooks/useBack'
import { useExamProgress } from '@/contexts/examProgress'
import { LEAGUES_ENABLED, QUESTS_ENABLED, STREAK_ENABLED, XP_ENABLED } from '@/lib/featureFlags'
import { todaysPlanConcepts } from '@/lib/examMenu'
import { serializeAvatar } from '@/lib/avatar'
import { decayIfStale } from '@/lib/mastery'
import { playSound } from '@/lib/soundEngine'
import { localDayKey } from '@/lib/streak'
import type { QuestContext } from '@/lib/quests'
import { SETTINGS_PATH, leaguePath, leagueRowValue, readerName } from '@/lib/you'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { CheckMark } from '@/components/CheckMark'
import { CharacterSkinSelector } from '@/components/MascotWidget'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { OUTLINE_TILE, OUTLINE_TILE_PRESSABLE } from '@/components/ui/OutlineCard'
import { GoalSheet, HelpSheet, QuestSheet } from '@/components/you/YouSheets'
import { Meter, Row, YouScreen } from '@/components/you/rows'
import { cn } from '@/lib/utils'

const TILE = cn(OUTLINE_TILE, 'flex min-w-0 flex-1 basis-0 items-center gap-3 px-4 py-3.5')

/**
 * What the day's quests are drawn from, for a reader who opens You before
 * Today: the concepts at Forgotten, and today's concepts from the paced plan
 * Today last kept (Pro). Today hands the board the same two facts.
 */
function useQuestContext(isPro: boolean, ready: boolean): QuestContext | undefined {
  const { records, loading } = useConceptMastery()
  const { examRows, loadingExams } = useExamProgress()
  const { activeKey, loading: examLoading } = useExamInFocus()
  return useMemo(() => {
    if (!ready || loading || loadingExams || examLoading) return undefined
    const now = new Date()
    const cache = isPro ? examRows.find(r => r.exam_id === activeKey)?.study_plan_cache : null
    return {
      forgottenDue: records.filter(r => decayIfStale(r, now).state === 'forgotten').length,
      planConcepts: todaysPlanConcepts(cache, localDayKey(now)) ?? [],
    }
  }, [ready, loading, loadingExams, examLoading, isPro, examRows, activeKey, records])
}

export default function You() {
  usePageLabel('You')
  const { user, loading: authLoading } = useAuth()
  const { isPro, loading: subLoading } = useSubscription()
  const xp = useXp()
  const streak = useStreak()
  const gems = useGems()
  const exam = useExamInFocus()
  const league = useLeague(user && LEAGUES_ENABLED ? exam.activeKey : null)
  const showCommunity = useCommunityAccess()
  const questContext = useQuestContext(isPro, !authLoading && !subLoading)
  const quests = useQuests(QUESTS_ENABLED ? questContext : undefined)

  const [sheet, setSheet] = useState<'goal' | 'help' | 'character' | null>(null)
  const [questId, setQuestId] = useState<string | null>(null)
  const [collecting, setCollecting] = useState(false)

  const name = readerName(user)
  // A visitor is drawn as the first free character, the fox.
  const avatarUrl = user
    ? ((user.user_metadata?.avatar_url as string | undefined) ?? '')
    : serializeAvatar({ type: 'animal', value: 'fox' })
  const levelRatio = xp.xpForLevel > 0 ? xp.xpIntoLevel / xp.xpForLevel : 0
  const openQuest = questId ? (quests.board.find(v => v.quest.id === questId) ?? null) : null
  const firstClaimable = quests.claimable[0]?.quest.id ?? null

  const collect = (id: string) => {
    if (collecting) return
    playSound('reward')
    setCollecting(true)
    void quests.claim([id]).finally(() => setCollecting(false))
  }

  const character = <AvatarDisplay avatarUrl={avatarUrl} initials={name.slice(0, 2).toUpperCase()} size={64} />
  const frame = 'flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-2 border-foreground'

  return (
    <YouScreen way="close" to="/dashboard" label="Today" testId="you">
      <div className="flex flex-col gap-[18px] px-5 pb-6 pt-1">
        {/* Who: the character, the name, the level. */}
        <div className="flex items-center gap-4">
          {user ? (
            <button
              type="button"
              onClick={() => setSheet('character')}
              aria-label="Change character"
              aria-haspopup="dialog"
              className={cn(frame, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground')}
            >
              {character}
            </button>
          ) : (
            <span className={frame} aria-hidden="true">{character}</span>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {user ? (
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="truncate text-2xl font-bold" data-testid="you-name">{name}</span>
                {isPro && (
                  <span className="shrink-0 rounded-[10px] bg-foreground px-[9px] py-0.5 text-[13px] font-bold text-ground">Pro</span>
                )}
              </span>
            ) : !authLoading ? (
              <Link
                to="/auth"
                state={{ from: '/you' }}
                className={cn(buttonVariants({ variant: 'edge' }), 'self-start')}
              >
                Sign in
              </Link>
            ) : null}
            {XP_ENABLED && (
              <span className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2.5 text-[15px]">
                <strong>Level {xp.level}</strong>
                <Meter ratio={levelRatio} label={`${xp.xpIntoLevel} of ${xp.xpForLevel} XP to Level ${xp.level + 1}`} />
                <span className="tabular-nums" aria-hidden="true">{xp.xpIntoLevel} / {xp.xpForLevel}</span>
              </span>
            )}
          </div>
        </div>

        {/* The streak, and gems. */}
        {(STREAK_ENABLED || user) && (
          <div className="flex gap-2.5">
            {STREAK_ENABLED && (
              <div className={TILE} data-testid="you-streak">
                <Flame className="h-6 w-6 shrink-0" strokeWidth={2} aria-hidden="true" />
                <span className="flex items-baseline gap-1.5">
                  <span className="text-[26px] font-bold leading-none tabular-nums">{streak.currentStreak}</span>
                  <span className="text-[15px]">{streak.currentStreak === 1 ? 'day' : 'days'}</span>
                </span>
              </div>
            )}
            {user && (
              <Link to="/store/gems" className={cn(TILE, OUTLINE_TILE_PRESSABLE)} aria-label={`${gems.balance} gems. Open the Gem Shop`} data-testid="you-gems">
                <Gem className="h-6 w-6 shrink-0" strokeWidth={2} aria-hidden="true" />
                <span className="flex items-baseline gap-1.5">
                  <span className="text-[26px] font-bold leading-none tabular-nums">{gems.balance}</span>
                  <span className="text-[15px]">{gems.balance === 1 ? 'gem' : 'gems'}</span>
                </span>
              </Link>
            )}
          </div>
        )}

        {/* Today: the daily goal, then the day's quests. */}
        {XP_ENABLED && (
          <section className={cn(OUTLINE_TILE, 'flex flex-col px-4 pb-1 pt-4')} aria-labelledby="you-today">
            <span className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 pb-3">
              <h2 id="you-today" className="text-[17px] font-bold">Today</h2>
              <Meter ratio={xp.ratio} />
              <button
                type="button"
                onClick={() => setSheet('goal')}
                aria-haspopup="dialog"
                aria-label={`Daily goal, ${xp.earnedToday} of ${xp.target} XP. Change`}
                className="flex h-9 items-center gap-1 rounded-sm text-[15px] font-semibold tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {xp.earnedToday} / {xp.target} XP
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </span>
            {QUESTS_ENABLED && quests.board.map(view => {
              const { quest, earned, target, ratio, claimed, claimable } = view
              return (
                <div
                  key={quest.id}
                  data-quest={quest.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3.5 border-t border-border py-3.5"
                >
                  <button
                    type="button"
                    onClick={() => setQuestId(quest.id)}
                    aria-haspopup="dialog"
                    aria-label={`${quest.title}: ${earned} of ${target}`}
                    className="flex min-w-0 flex-col gap-2 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="truncate text-[17px] font-medium">{quest.title}</span>
                    <Meter ratio={ratio} className="h-1.5 w-full" />
                  </button>
                  {claimable ? (
                    // One filled button a screen: the first quest to collect.
                    <Button
                      variant={quest.id === firstClaimable ? 'default' : 'edge'}
                      className="h-10 px-[18px] font-bold"
                      disabled={collecting}
                      data-sound="none"
                      onClick={() => collect(quest.id)}
                    >
                      Collect
                    </Button>
                  ) : claimed ? (
                    <CheckMark className="h-7 w-7 text-foreground" label="Collected" />
                  ) : (
                    <span className="min-w-9 text-right text-[15px] font-bold tabular-nums" aria-hidden="true">{earned}/{target}</span>
                  )}
                </div>
              )
            })}
          </section>
        )}

        {/* Onwards. */}
        <div className="flex flex-col divide-y divide-border">
          {LEAGUES_ENABLED && user && (
            <Row
              label="League"
              to={leaguePath(exam.activeKey)}
              value={league.loading || !exam.activeKey
                ? null
                : leagueRowValue({ optedIn: league.optedIn, tierLabel: league.tier.label, rank: league.selfRank })}
              testId="you-league"
            />
          )}
          <Row label="Settings" to={SETTINGS_PATH} testId="you-settings" />
          <Row label="Store" to="/store" testId="you-store" />
          {/* Preview, approved accounts (docs/community.md). */}
          {showCommunity && <Row label="Community" to="/community" testId="you-community" />}
          <Row label="Help" onClick={() => setSheet('help')} testId="you-help" />
        </div>
      </div>

      {sheet === 'goal' && <GoalSheet onClose={() => setSheet(null)} />}
      {sheet === 'help' && <HelpSheet onClose={() => setSheet(null)} />}
      {sheet === 'character' && user && (
        <CharacterSkinSelector currentAvatarUrl={avatarUrl} onClose={() => setSheet(null)} />
      )}
      {openQuest && (
        <QuestSheet
          view={openQuest}
          signedIn={!!user}
          busy={collecting}
          onCollect={() => collect(openQuest.quest.id)}
          onClose={() => setQuestId(null)}
        />
      )}
    </YouScreen>
  )
}
