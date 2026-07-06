import { Check } from 'lucide-react'
import { useXp } from '@/hooks/useXp'

// The daily-goal progress ring (roadmap P1.2). Shows XP earned today against the
// selected goal, with the current level in the middle, on the Dashboard stat grid
// next to the streak/readiness tiles. Filling the ring is the daily habit signal.

interface RingProps {
  /** 0..1 fill. */
  ratio: number
  /** Whether the goal is met (switches to a check + accent colour). */
  met: boolean
  /** Big number rendered in the centre (the level). */
  centerLabel: string | number
}

function GoalRing({ ratio, met, centerLabel }: RingProps) {
  const size = 64
  const stroke = 7
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - Math.min(1, Math.max(0, ratio)))
  const cx = size / 2
  const cy = size / 2
  const color = met ? '#22c55e' : '#8b5cf6'
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={stroke} />
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
      {met ? (
        <Check x={cx - 10} y={cy - 10} width={20} height={20} stroke="#22c55e" strokeWidth={3} />
      ) : (
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize={16} fontWeight={800} fill="currentColor">
          {centerLabel}
        </text>
      )}
    </svg>
  )
}

/**
 * Dashboard variant — a daily-goal ring tile matching the streak/readiness tiles
 * in the header grid. The ring fills with today's XP; the centre shows the level
 * (or a check once the goal is met).
 */
export function DailyGoalStat() {
  const { level, earnedToday, target, ratio, met, loading } = useXp()
  if (loading) return null

  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl bg-violet-500/10"
      title={
        met
          ? `Daily goal reached — ${earnedToday} XP today (Level ${level})`
          : `${earnedToday} / ${target} XP today · Level ${level}`
      }
    >
      <GoalRing ratio={ratio} met={met} centerLabel={level} />
      <span className="text-xs text-muted-foreground">
        {met ? 'goal reached' : `${earnedToday}/${target} XP`}
      </span>
    </div>
  )
}
