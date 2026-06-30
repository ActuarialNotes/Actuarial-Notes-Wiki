import { useMemo } from 'react'

// A flashy, colourful 3D-looking flashcard showing a concept name. Pure CSS —
// no WebGL — so it stays light and renders crisply everywhere. The colour
// gradient is derived deterministically from the concept name so the same
// concept always yields the same card.

interface CollectCard3DProps {
  name: string
  // 'idle' tilts gently on hover; 'spin' accelerates into a fast spin used by
  // the collection animation; 'won' settles flat and glowing.
  phase?: 'idle' | 'spin' | 'won'
  size?: 'md' | 'lg'
  className?: string
}

// Pleasant, high-contrast gradient pairs (start, mid, end) — vivid enough to
// feel collectible without clashing with either theme.
const GRADIENTS: [string, string, string][] = [
  ['#6366f1', '#8b5cf6', '#ec4899'], // indigo → violet → pink
  ['#0ea5e9', '#3b82f6', '#6366f1'], // sky → blue → indigo
  ['#10b981', '#14b8a6', '#06b6d4'], // emerald → teal → cyan
  ['#f59e0b', '#f97316', '#ef4444'], // amber → orange → red
  ['#ec4899', '#d946ef', '#a855f7'], // pink → fuchsia → purple
  ['#14b8a6', '#22c55e', '#84cc16'], // teal → green → lime
  ['#f43f5e', '#fb7185', '#f59e0b'], // rose → coral → amber
  ['#8b5cf6', '#6366f1', '#0ea5e9'], // violet → indigo → sky
]

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function CollectCard3D({ name, phase = 'idle', size = 'lg', className = '' }: CollectCard3DProps) {
  const [c0, c1, c2] = useMemo(() => GRADIENTS[hashString(name) % GRADIENTS.length], [name])

  const dims = size === 'lg' ? 'w-52 h-72 sm:w-60 sm:h-80' : 'w-36 h-48'
  const phaseClass =
    phase === 'spin' ? 'collect-card-spin' : phase === 'won' ? 'collect-card-won' : 'collect-card-idle'

  return (
    <div className={`collect-card-scene ${dims} ${className}`} aria-hidden="true">
      <div className={`collect-card-3d ${phaseClass}`}>
        <div
          className="collect-card-face"
          style={{ background: `linear-gradient(135deg, ${c0} 0%, ${c1} 50%, ${c2} 100%)` }}
        >
          {/* Glossy sheen sweep */}
          <span className="collect-card-sheen" />
          {/* Holographic frame */}
          <span className="collect-card-frame" />
          {/* Concept name */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
              Flashcard
            </span>
            <span className="mt-2 text-xl sm:text-2xl font-extrabold leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
              {name}
            </span>
            <span className="mt-3 h-px w-10 bg-white/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
