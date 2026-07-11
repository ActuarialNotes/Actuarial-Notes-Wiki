import { useState } from 'react'
import { ChevronDown, ChevronUp, Loader2, Minus, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLeague } from '@/hooks/useLeague'
import { formatWeekCountdown, tierByIndex, zoneForRank, type LeagueZone } from '@/lib/leagues'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { cn } from '@/lib/utils'

// Leaderboard tab body for the Level popup (roadmap P4.1). Leagues are per-exam,
// so it carries a compact exam selector (styled like the Dashboard exam pills,
// smaller) when more than one exam is active. Signed-in only; nothing is shared
// until the student explicitly joins the selected exam's league.

const RESULT_ACK_PREFIX = 'actuarial_league_result_ack_'

/** Result ack is keyed by exam + week so each exam's banner dismisses on its own. */
function ackKey(exam: string, week: string): string {
  return `${RESULT_ACK_PREFIX}${exam}_${week}`
}

function resultAcknowledged(exam: string, week: string): boolean {
  try {
    return localStorage.getItem(ackKey(exam, week)) === '1'
  } catch {
    return false
  }
}

function acknowledgeResult(exam: string, week: string): void {
  try {
    localStorage.setItem(ackKey(exam, week), '1')
  } catch {
    /* quota exceeded */
  }
}

export interface LeagueExamOption {
  id: string
  label: string
}

export function LeaderboardPanel({
  exams,
  initialExamId,
}: {
  exams: LeagueExamOption[]
  initialExamId?: string | null
}) {
  const { user } = useAuth()
  const [selectedExam, setSelectedExam] = useState<string | null>(
    initialExamId && exams.some(e => e.id === initialExamId) ? initialExamId : exams[0]?.id ?? null,
  )
  const league = useLeague(selectedExam)
  const [joining, setJoining] = useState(false)
  const [dismissedWeek, setDismissedWeek] = useState<string | null>(null)

  // Same identity derivation as the Dashboard header — this is what joining shares.
  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ??
    user?.email?.split('@')[0] ??
    'You'
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? ''
  const initials = displayName.slice(0, 2).toUpperCase()

  const handleJoin = async () => {
    setJoining(true)
    await league.join(displayName, avatarUrl)
    setJoining(false)
  }

  if (exams.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-muted-foreground">
        Start studying an exam to join its weekly league.
      </p>
    )
  }

  const showResult =
    league.lastResult &&
    selectedExam &&
    league.lastResult.week !== dismissedWeek &&
    !resultAcknowledged(selectedExam, league.lastResult.week)

  return (
    <div className="space-y-3">
      {/* Exam selector — mirrors the Dashboard exam pills, smaller. */}
      {exams.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {exams.map(e => (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedExam(e.id)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                e.id === selectedExam
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {e.label}
            </button>
          ))}
        </div>
      )}

      {league.loading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : !league.optedIn ? (
        <JoinPrompt
          displayName={displayName}
          avatarUrl={avatarUrl}
          initials={initials}
          joining={joining}
          onJoin={() => void handleJoin()}
        />
      ) : (
        <>
          {showResult && league.lastResult && selectedExam && (
            <ResultBanner
              result={league.lastResult.result}
              rank={league.lastResult.rank}
              tierLabel={league.tier.label}
              onDismiss={() => {
                acknowledgeResult(selectedExam, league.lastResult!.week)
                setDismissedWeek(league.lastResult!.week)
              }}
            />
          )}
          <Board board={league.board} tierIndex={league.tier.index} tierLabel={league.tier.label} />
          <p className="text-[11px] text-muted-foreground">
            Top finishers move up a league on Monday (00:00 UTC); the bottom — and anyone who
            ends the week with 0 XP — move down.
          </p>
        </>
      )}
    </div>
  )
}

// ── Opt-in pitch ─────────────────────────────────────────────────────────────

function JoinPrompt({
  displayName,
  avatarUrl,
  initials,
  joining,
  onJoin,
}: {
  displayName: string
  avatarUrl: string
  initials: string
  joining: boolean
  onJoin: () => void
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Join a weekly league of up to 30 students studying this exam. Earn XP to climb the
        board — finish near the top and you&apos;re promoted to the next league.
      </p>
      <div className="flex items-center gap-2.5 rounded-xl bg-muted/40 p-3">
        <AvatarDisplay avatarUrl={avatarUrl} initials={initials} size={32} />
        <div className="min-w-0 text-xs">
          <p className="truncate font-semibold">{displayName}</p>
          <p className="text-muted-foreground">This is how you&apos;ll appear to your league</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Joining shares only your display name, avatar, and weekly XP with your league — never
        your email or study details. Leave anytime and the shared copies are deleted.
      </p>
      <button
        type="button"
        onClick={onJoin}
        disabled={joining}
        className="w-full rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {joining ? 'Joining…' : 'Join the league'}
      </button>
    </div>
  )
}

// ── Last week's result ───────────────────────────────────────────────────────

function ResultBanner({
  result,
  rank,
  tierLabel,
  onDismiss,
}: {
  result: 'promoted' | 'demoted' | 'stayed'
  rank: number | null
  tierLabel: string
  onDismiss: () => void
}) {
  const copy =
    result === 'promoted'
      ? `You were promoted to ${tierLabel}!`
      : result === 'demoted'
        ? `You dropped to ${tierLabel} — climb back this week.`
        : `You held your place in ${tierLabel}.`
  const Icon = result === 'promoted' ? ChevronUp : result === 'demoted' ? ChevronDown : Minus
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl p-3 text-xs font-medium',
        result === 'promoted' && 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
        result === 'demoted' && 'bg-red-500/10 text-red-700 dark:text-red-400',
        result === 'stayed' && 'bg-muted/60 text-muted-foreground',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="min-w-0 flex-1">
        {copy}
        {rank ? ` (finished #${rank})` : ''}
      </span>
      <button type="button" onClick={onDismiss} aria-label="Dismiss" className="shrink-0 opacity-60 hover:opacity-100">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

// ── The board ────────────────────────────────────────────────────────────────

const ZONE_LABEL: Record<Exclude<LeagueZone, 'safe'>, string> = {
  promotion: 'Promotion zone',
  demotion: 'Demotion zone',
}

function Board({
  board,
  tierIndex,
  tierLabel,
}: {
  board: { rank: number; displayName: string; avatarUrl: string; weeklyXp: number; isSelf: boolean }[]
  tierIndex: number
  tierLabel: string
}) {
  if (board.length === 0) {
    return (
      <p className="py-2 text-sm text-muted-foreground">
        Your {tierLabel} league forms as students join this week — earn XP to take the early lead.
      </p>
    )
  }

  const tier = tierByIndex(tierIndex)
  let prevZone: LeagueZone | null = null

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-xs font-semibold" style={{ color: tier.color }}>
          {tierLabel} League
        </p>
        <p className="text-[11px] tabular-nums text-muted-foreground">
          Resets in {formatWeekCountdown(new Date())}
        </p>
      </div>
      <ul className="space-y-0.5">
        {board.map(row => {
          const zone = zoneForRank(row.rank, board.length, tierIndex)
          const zoneChanged = zone !== prevZone && prevZone !== null
          const label = zone !== 'safe' && zone !== prevZone ? ZONE_LABEL[zone] : null
          prevZone = zone
          return (
            <li key={row.rank}>
              {label && (
                <p
                  className={cn(
                    'mb-1 mt-2 text-[10px] font-semibold uppercase tracking-wide',
                    zone === 'promotion'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-red-600 dark:text-red-400',
                  )}
                >
                  {label}
                </p>
              )}
              {!label && zoneChanged && <hr className="my-1.5 border-border" />}
              <div
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2 py-1.5',
                  row.isSelf && 'bg-primary/10',
                )}
              >
                <span className="w-5 shrink-0 text-right text-xs font-semibold tabular-nums text-muted-foreground">
                  {row.rank}
                </span>
                <AvatarDisplay
                  avatarUrl={row.avatarUrl}
                  initials={row.displayName.slice(0, 2).toUpperCase()}
                  size={28}
                />
                <span className={cn('min-w-0 flex-1 truncate text-sm', row.isSelf && 'font-semibold')}>
                  {row.displayName}
                  {row.isSelf && <span className="text-xs text-muted-foreground"> (you)</span>}
                </span>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                  {row.weeklyXp} XP
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
