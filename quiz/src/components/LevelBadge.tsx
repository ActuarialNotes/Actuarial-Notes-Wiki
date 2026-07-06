import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Palette, Zap, Sparkles, Target, Check } from 'lucide-react'
import { useXp, type XpView } from '@/hooks/useXp'
import { XP_CORRECT, XP_REVIVE_BONUS } from '@/lib/xp'
import { CharacterSkinSelector } from '@/components/MascotWidget'

// Level badge (roadmap P1.2). Replaces the character icon in the Dashboard header
// with a compact ring showing the current level and today's daily-goal progress.
// Clicking it opens a popup with the XP breakdown, how bonuses are earned, and a
// way to change character (the header was the only entry point to that selector).

interface LevelBadgeProps {
  /** Diameter in px (matches the mascot icon it replaces). */
  size?: number
  /** Current avatar url — passed through to the character selector in the popup. */
  avatarUrl: string
}

export function LevelBadge({ size = 36, avatarUrl }: LevelBadgeProps) {
  const xp = useXp()
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
        aria-label={`Level ${xp.level}, ${xp.earnedToday} of ${xp.target} daily XP. View progress.`}
        title={`Level ${xp.level} · ${xp.earnedToday}/${xp.target} XP today`}
        className="rounded-full transition-transform duration-150 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-primary block"
      >
        <LevelRing size={size} level={xp.level} ratio={xp.ratio} met={xp.met} />
      </button>
      {open && <XpPopup xp={xp} avatarUrl={avatarUrl} onClose={() => setOpen(false)} />}
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

function XpPopup({ xp, avatarUrl, onClose }: { xp: XpView; avatarUrl: string; onClose: () => void }) {
  const navigate = useNavigate()
  const [showCharacter, setShowCharacter] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const levelRatio = xp.xpForLevel > 0 ? xp.xpIntoLevel / xp.xpForLevel : 0

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
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[66] w-[calc(100vw-2rem)] max-w-[340px] bg-card border rounded-2xl shadow-2xl p-4 outline-none text-left"
        role="dialog"
        aria-modal="true"
        aria-label="Your XP and daily goal"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-sm font-extrabold tabular-nums text-violet-600 dark:text-violet-400">
              {xp.level}
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Level {xp.level}</p>
              <p className="text-xs text-muted-foreground tabular-nums">{xp.totalXp} XP total</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Level progress */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress to Level {xp.level + 1}</span>
            <span className="tabular-nums font-medium">{xp.xpIntoLevel}/{xp.xpForLevel} XP</span>
          </div>
          <ProgressBar ratio={levelRatio} color="#8b5cf6" />
        </div>

        {/* Today's daily goal */}
        <div className="rounded-xl border bg-muted/40 p-3 mb-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Target className="h-4 w-4 text-violet-500" /> Daily goal
            </span>
            {xp.met ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                <Check className="h-3.5 w-3.5" /> Reached
              </span>
            ) : (
              <span className="text-xs tabular-nums font-medium">{xp.earnedToday}/{xp.target} XP</span>
            )}
          </div>
          <ProgressBar ratio={xp.ratio} color={xp.met ? '#22c55e' : '#8b5cf6'} />
          <p className="text-xs text-muted-foreground">
            {xp.met
              ? `Nice — you hit your ${xp.goal.label} goal today.`
              : `${Math.max(0, xp.target - xp.earnedToday)} XP to go on your ${xp.goal.label} goal.`}
          </p>
        </div>

        {/* How XP is earned (bonuses) */}
        <div className="space-y-2 mb-1">
          <p className="text-xs font-medium text-muted-foreground">How you earn XP</p>
          <ul className="space-y-1.5 text-xs">
            <li className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>
                Correct answer:{' '}
                <span className="font-semibold tabular-nums">
                  {XP_CORRECT.easy}–{XP_CORRECT.hard} XP
                </span>{' '}
                <span className="text-muted-foreground">(harder questions pay more)</span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-violet-500 shrink-0" />
              <span>
                Reviving a fading concept:{' '}
                <span className="font-semibold tabular-nums">+{XP_REVIVE_BONUS} XP</span>{' '}
                <span className="text-muted-foreground">bonus</span>
              </span>
            </li>
          </ul>
        </div>

        {/* Footer actions */}
        <div className="mt-3 pt-3 border-t flex items-center justify-between gap-2">
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
