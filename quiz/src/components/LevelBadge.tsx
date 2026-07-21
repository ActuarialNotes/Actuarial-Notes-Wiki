import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Palette, Trophy, Swords } from 'lucide-react'
import { useXp, type XpView } from '@/hooks/useXp'
import { useQuests } from '@/hooks/useQuests'
import { QUESTS_ENABLED, LEAGUES_ENABLED } from '@/lib/featureFlags'
import { CharacterSkinSelector } from '@/components/MascotWidget'
import { QuestsPanel } from '@/components/QuestsPanel'
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
  const color = met ? '#22c55e' : '#8b5cf6'
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
  const navigate = useNavigate()
  const [tab, setTab] = useState<PopupTab>(DEFAULT_TAB)
  const [showCharacter, setShowCharacter] = useState(false)
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
        className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Popup — centered on all screen sizes */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[66] w-[calc(100vw-2rem)] max-w-[360px] bg-card rounded-2xl shadow-2xl p-4 outline-none text-left"
        role="dialog"
        aria-modal="true"
        aria-label="Your progress, quests and league"
        onClick={e => e.stopPropagation()}
      >
        {/* Header — level number with the level-progress bar beside it. */}
        <div className="mb-4 flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-sm font-extrabold tabular-nums text-violet-600 dark:text-violet-400">
            {xp.level}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold">Level {xp.level}</p>
              <p className="text-xs text-muted-foreground tabular-nums">{xp.totalXp} XP total</p>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex-1">
                <ProgressBar ratio={levelRatio} color="#8b5cf6" />
              </div>
              <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                {xp.xpIntoLevel}/{xp.xpForLevel}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 -mt-0.5 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        {visibleTabs.length > 1 && (
          <div className="mb-4 flex gap-1 rounded-xl bg-muted/50 p-1">
            {visibleTabs.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors ${
                  tab === t.id
                    ? 'bg-card text-foreground shadow-sm'
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
          {QUESTS_ENABLED && (
            <div className={tab === 'quests' ? '' : 'hidden'}>
              <QuestsPanel context={questContext} xp={xp} />
            </div>
          )}
          {LEAGUES_ENABLED && (
            <div className={tab === 'leaderboard' ? '' : 'hidden'}>
              <LeaderboardPanel exams={leagueExams} initialExamId={activeExamId} />
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-3 flex items-center justify-between gap-2 pt-3">
          <button
            type="button"
            onClick={() => setShowCharacter(true)}
            className="flex items-center gap-1.5 text-xs text-primary hover:underline"
          >
            <Palette className="h-3.5 w-3.5" /> Change character
          </button>
          <button
            type="button"
            onClick={() => { navigate('/settings'); onClose() }}
            className="text-xs text-muted-foreground hover:text-foreground hover:underline"
          >
            Change goal
          </button>
        </div>
      </div>

      {showCharacter && (
        <CharacterSkinSelector currentAvatarUrl={avatarUrl} onClose={() => setShowCharacter(false)} />
      )}
    </>
  )
}
