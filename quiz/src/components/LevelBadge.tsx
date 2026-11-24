import { Link } from 'react-router-dom'
import { useXp } from '@/hooks/useXp'
import { useQuests } from '@/hooks/useQuests'
import { QUESTS_ENABLED } from '@/lib/featureFlags'
import { YOU_PATH } from '@/lib/you'
import type { QuestContext } from '@/lib/quests'

// The level badge on Today: a ring showing the reader's level and how far
// today's daily goal has come, with a count of the quests ready to collect.
// It is the way to You (docs/redesign-spec.md §7b) until Phase F adds the
// profile button; the popup it used to open (level, quests, league) is the
// profile and the league's own screen now.

interface LevelBadgeProps {
  /** Diameter in px. */
  size?: number
  /** What today's quests are drawn from; passing it lets Today seed the day's board. */
  questContext?: QuestContext
}

export function LevelBadge({ size = 36, questContext }: LevelBadgeProps) {
  const xp = useXp()
  const quests = useQuests(QUESTS_ENABLED ? questContext : undefined)
  const claimableCount = QUESTS_ENABLED ? quests.claimable.length : 0

  if (xp.loading) {
    return (
      <div
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full bg-muted animate-pulse"
        aria-hidden="true"
      />
    )
  }

  const ready = claimableCount > 0
    ? ` ${claimableCount} ${claimableCount === 1 ? 'quest' : 'quests'} to collect.`
    : ''
  return (
    <Link
      to={YOU_PATH}
      aria-label={`You. Level ${xp.level}, ${xp.earnedToday} of ${xp.target} XP today.${ready}`}
      data-testid="today-you"
      className="relative block shrink-0 rounded-full outline-none transition-transform duration-150 active:scale-90 focus-visible:ring-2 focus-visible:ring-primary"
    >
      <LevelRing size={size} level={xp.level} ratio={xp.ratio} />
      {claimableCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-foreground px-[3px] text-[9px] font-bold leading-none text-ground tabular-nums" aria-hidden="true">
          {claimableCount}
        </span>
      )}
    </Link>
  )
}

/** The badge itself: a disc, the daily goal's ring around it, and the level. */
function LevelRing({ size, level, ratio }: { size: number; level: number; ratio: number }) {
  const stroke = Math.max(3, Math.round(size * 0.09))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - Math.min(1, Math.max(0, ratio)))
  const cx = size / 2
  const cy = size / 2
  // Green is for answers (docs/redesign-spec.md §2.1): a met goal is a full ring.
  const color = 'hsl(var(--foreground))'
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
