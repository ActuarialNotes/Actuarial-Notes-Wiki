import { useEffect, useState } from 'react'
import { Palette, Trophy, Swords } from 'lucide-react'
import { InfoBanner, InfoFinePrint, NEUTRAL_BANNER, Stat } from '@/components/ui/InfoSheet'
import { useXp, type XpView } from '@/hooks/useXp'
import { useQuests } from '@/hooks/useQuests'
import { QUESTS_ENABLED, LEAGUES_ENABLED } from '@/lib/featureFlags'
import { CharacterSkinSelector } from '@/components/MascotWidget'
import { QuestsPanel } from '@/components/QuestsPanel'
import { DailyGoalPicker } from '@/components/DailyGoalPicker'
import { LeaderboardPanel, type LeagueExamOption } from '@/components/LeaderboardPanel'
import type { QuestContext } from '@/lib/quests'

// Level badge (roadmap P1.2). Replaces the character icon in the Dashboard header
// with a compact ring showing the current level and today's daily-goal progress.
// Clicking it opens a popup whose header carries the level + level-progress bar,
// with two tabs — Quests (today's board plus the daily goal, formatted as a
// quest, roadmap P1.4) and League (per-exam weekly league, roadmap P4.1) —
// consolidating what used to be separate header badges/cards.

interface LevelBadgeProps {
  /** Diameter in px (matches the mascot icon it replaces). */
  size?: number
  /** Current avatar url — passed through to the character selector in the popup. */
  avatarUrl: string
  /** Personalization signals for the daily-quest board (Quests tab). */
  questContext?: QuestContext
  /** Active exams for the Leaderboard tab's exam selector (progress key + label). */
  leagueExams?: LeagueExamOption[]
  /** The exam to default the Leaderboard tab to (the Dashboard's active exam). */
  activeExamId?: string | null
}

type PopupTab = 'quests' | 'leaderboard'

const DEFAULT_TAB: PopupTab = QUESTS_ENABLED ? 'quests' : 'leaderboard'

export function LevelBadge({ size = 36, avatarUrl, questContext, leagueExams = [], activeExamId }: LevelBadgeProps) {
  const xp = useXp()
  // Read the quest board here too so the ring can show a "collect me" dot even
  // while the popup is closed (the old QuestBadge did this in the same spot).
  const quests = useQuests(QUESTS_ENABLED ? questContext : undefined)
  const claimableCount = QUESTS_ENABLED ? quests.claimable.length : 0
  const [open, setOpen] = useState(false)

  if (xp.loading) {
    return (
      <div
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full bg-muted animate-pulse"
        aria-hidden="true"
      />
    )
  }

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={e => { e.stopPropagation(); setOpen(true) }}
        aria-label={`Level ${xp.level}, ${xp.earnedToday} of ${xp.target} daily XP. View progress, quests and leaderboard.`}
        title={`Level ${xp.level} · ${xp.earnedToday}/${xp.target} XP today`}
        className="relative rounded-full transition-transform duration-150 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-primary block"
      >
        <LevelRing size={size} level={xp.level} ratio={xp.ratio} met={xp.met} />
        {claimableCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-emerald-500 px-[3px] text-[9px] font-bold leading-none text-white tabular-nums">
            {claimableCount}
          </span>
        )}
      </button>
      {open && (
        <LevelPopup
          xp={xp}
          avatarUrl={avatarUrl}
          questContext={questContext}
          leagueExams={leagueExams}
          activeExamId={activeExamId}
          claimableCount={claimableCount}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

/** The badge itself: a filled disc, a daily-goal progress ring, and the level. */
function LevelRing({ size, level, ratio, met }: { size: number; level: number; ratio: number; met: boolean }) {
  const stroke = Math.max(3, Math.round(size * 0.09))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - Math.min(1, Math.max(0, ratio)))
  const cx = size / 2
  const cy = size / 2
  const color = met ? '#22c55e' : 'hsl(var(--foreground))'
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="hsl(var(--muted))" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--muted-foreground))" strokeOpacity={0.25} strokeWidth={stroke} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dashoffset 300ms ease-out' }}
      />
      <text
        x={cx} y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.44}
        fontWeight={800}
        fill="hsl(var(--foreground))"
      >
        {level}
      </text>
    </svg>
  )
}

/** A slim labelled progress bar used inside the popup. */
function ProgressBar({ ratio, color }: { ratio: number; color: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, ratio * 100))}%`, backgroundColor: color, transition: 'width 300ms ease-out' }}
      />
    </div>
  )
}

function LevelPopup({
  xp,
  avatarUrl,
  questContext,
  leagueExams,
  activeExamId,
  claimableCount,
  onClose,
}: {
  xp: XpView
  avatarUrl: string
  questContext?: QuestContext
  leagueExams: LeagueExamOption[]
  activeExamId?: string | null
  claimableCount: number
  onClose: () => void
}) {
  const [tab, setTab] = useState<PopupTab>(DEFAULT_TAB)
  const [showCharacter, setShowCharacter] = useState(false)
  // "Change goal" swaps the tab body for the goal presets, in place.
  const [choosingGoal, setChoosingGoal] = useState(false)
  const levelRatio = xp.xpForLevel > 0 ? xp.xpIntoLevel / xp.xpForLevel : 0

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const tabs: { id: PopupTab; label: string; Icon: typeof Trophy; show: boolean; badge?: number }[] = [
    { id: 'quests', label: 'Quests', Icon: Swords, show: QUESTS_ENABLED, badge: claimableCount },
    { id: 'leaderboard', label: 'League', Icon: Trophy, show: LEAGUES_ENABLED },
  ]
  const visibleTabs = tabs.filter(t => t.show)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm paper-fade"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Popup — centered on all screen sizes */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[66] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-4 bg-background rounded-2xl shadow-2xl p-3 outline-none text-left paper-drop"
        role="dialog"
        aria-modal="true"
        aria-label="Your progress, quests and league"
        onClick={e => e.stopPropagation()}
      >
        {/* The banner: the level, its bar, and today's figures — the info
            popup's shape (`InfoSheet`), on the neutral wash: no exam scopes it. */}
        <InfoBanner
          tile={(
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-base font-extrabold tabular-nums text-background" aria-hidden>
              {xp.level}
            </span>
          )}
          eyebrow={`${xp.totalXp.toLocaleString()} XP total`}
          title={`Level ${xp.level}`}
          onClose={onClose}
          tint={NEUTRAL_BANNER}
          stats={[
            <Stat
              key="level"
              value={<>{xp.xpIntoLevel}<span className="text-xs font-medium text-muted-foreground">/{xp.xpForLevel}</span></>}
              label={`to level ${xp.level + 1}`}
            />,
            <Stat
              key="goal"
              value={<>{xp.earnedToday}<span className="text-xs font-medium text-muted-foreground">/{xp.target}</span></>}
              label="daily goal"
              tone={xp.met ? 'text-green-600 dark:text-green-400' : undefined}
            />,
            QUESTS_ENABLED ? <Stat key="quests" value={claimableCount} label="quests ready" /> : null,
          ]}
        >
          <div className="mx-3.5 mb-3">
            <ProgressBar ratio={levelRatio} color="hsl(var(--foreground))" />
          </div>
        </InfoBanner>

        {/* Tabs — a two-way switch, the chosen side filled (Ink's pick). */}
        {!choosingGoal && visibleTabs.length > 1 && (
          <div className="flex gap-1 rounded-xl bg-card p-1">
            {visibleTabs.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`relative flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 text-[13px] font-semibold transition-colors ${
                  tab === t.id
                    ? 'bg-pick text-pick-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <t.Icon className="h-3.5 w-3.5" />
                {t.label}
                {!!t.badge && t.badge > 0 && (
                  <span className="ml-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-emerald-500 px-[3px] text-[9px] font-bold leading-none text-white tabular-nums">
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Tab body — both panels stay mounted and are toggled with `hidden` so
            switching tabs never re-mounts (and never re-fetches). That keeps the
            content loaded and the size steady instead of flashing a loading
            spinner on each switch. A min-height stops short panels collapsing. */}
        <div className="max-h-[60vh] min-h-[16rem] overflow-y-auto">
          {choosingGoal && <DailyGoalPicker />}
          {QUESTS_ENABLED && (
            <div className={!choosingGoal && tab === 'quests' ? '' : 'hidden'}>
              <QuestsPanel context={questContext} />
            </div>
          )}
          {LEAGUES_ENABLED && (
            <div className={!choosingGoal && tab === 'leaderboard' ? '' : 'hidden'}>
              <LeaderboardPanel exams={leagueExams} initialExamId={activeExamId} />
            </div>
          )}
        </div>

        {/* Fine print: the two settings the popup reaches. */}
        <InfoFinePrint>
          <button
            type="button"
            onClick={() => setShowCharacter(true)}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Palette className="h-3.5 w-3.5" /> Change character
          </button>
          <button
            type="button"
            onClick={() => setChoosingGoal(c => !c)}
            aria-pressed={choosingGoal}
            className="transition-colors hover:text-foreground"
          >
            {choosingGoal ? 'Done' : 'Change goal'}
          </button>
        </InfoFinePrint>
      </div>

      {showCharacter && (
        <CharacterSkinSelector currentAvatarUrl={avatarUrl} onClose={() => setShowCharacter(false)} />
      )}
    </>
  )
}
