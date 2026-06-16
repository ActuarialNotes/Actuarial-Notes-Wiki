import { useState, useEffect, useCallback, useRef } from 'react'
import { Check, Circle, Gem, X, Loader2, Lock, LockOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { todayISO } from '@/lib/studyPlan'
import type { MasteryState } from '@/lib/mastery'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CeremonyConcept {
  name: string
  target: MasteryState
}

interface Props {
  concepts: CeremonyConcept[]
  gemsEarnedToday: number
  onClose: () => void
}

type Phase = 'ticking' | 'complete' | 'unlocking' | 'claiming' | 'claimed'

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New', level1: 'Level 1', level2: 'Level 2', level3: 'Level 3', forgotten: 'Forgotten',
}

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(from: number, to: number, durationMs: number, active: boolean): number {
  const [value, setValue] = useState(from)
  useEffect(() => {
    if (!active) { setValue(from); return }
    setValue(from)
    if (from === to) return
    let raf: number
    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / durationMs, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
  return value
}

// ── Confetti system ────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  '#10b981', '#06b6d4', '#f59e0b', '#8b5cf6',
  '#ec4899', '#3b82f6', '#f97316', '#a3e635',
]

interface Particle {
  x: number; y: number; vx: number; vy: number
  color: string; w: number; h: number; rotation: number; rotSpeed: number; opacity: number
}

function launchConfetti(canvas: HTMLCanvasElement, originX: number, originY: number, count = 130): () => void {
  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  ctx.scale(dpr, dpr)

  const particles: Particle[] = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2
    const speed = 4 + Math.random() * 10
    return {
      x: originX, y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      w: 6 + Math.random() * 7,
      h: 3 + Math.random() * 4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 14,
      opacity: 1,
    }
  })

  let raf: number
  const animate = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    let alive = false
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.22
      p.vx *= 0.985
      p.rotation += p.rotSpeed
      if (p.y > window.innerHeight * 0.65) p.opacity -= 0.024
      else if (p.y < 0) p.opacity -= 0.015
      if (p.opacity <= 0) continue
      alive = true
      ctx.save()
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.fillStyle = p.color
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.beginPath()
      ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
    if (alive) {
      raf = requestAnimationFrame(animate)
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
  }
  raf = requestAnimationFrame(animate)
  return () => cancelAnimationFrame(raf)
}

// ── Component ─────────────────────────────────────────────────────────────────

export function StudyPlanCompletionCeremony({ concepts, gemsEarnedToday, onClose }: Props) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [phase, setPhase] = useState<Phase>('ticking')
  const [tapped, setTapped] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lockRef = useRef<HTMLDivElement>(null)
  const cancelConfetti = useRef<(() => void) | null>(null)
  const mounted = useRef(true)
  const bonusGems = gemsEarnedToday

  useEffect(() => {
    return () => {
      mounted.current = false
      cancelConfetti.current?.()
    }
  }, [])

  const fireAt = useCallback((x: number, y: number, count?: number) => {
    cancelConfetti.current?.()
    if (canvasRef.current) {
      cancelConfetti.current = launchConfetti(canvasRef.current, x, y, count)
    }
  }, [])

  // Tick concepts in one by one, then fire confetti and transition to 'complete'
  useEffect(() => {
    if (phase !== 'ticking') return
    if (visibleCount < concepts.length) {
      const delay = visibleCount === 0 ? 500 : 360
      const t = setTimeout(() => setVisibleCount(v => v + 1), delay)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setPhase('complete')
      fireAt(window.innerWidth / 2, window.innerHeight * 0.42)
    }, 750)
    return () => clearTimeout(t)
  }, [visibleCount, concepts.length, phase, fireAt])

  // Animate gem count from gemsEarnedToday → gemsEarnedToday*2 in claimed phase
  const displayGems = useCountUp(bonusGems, bonusGems * 2, 1400, phase === 'claimed')

  const handleLockTap = useCallback(async () => {
    if (tapped) return
    setTapped(true)

    // Fire confetti from lock position
    const rect = lockRef.current?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2
    fireAt(x, y, 180)

    setPhase('unlocking')
    await new Promise<void>(r => setTimeout(r, 720))
    if (!mounted.current) return

    setPhase('claiming')
    try {
      if (bonusGems > 0) {
        await supabase.rpc('award_gems', { p_amount: bonusGems })
        if (!mounted.current) return
        window.dispatchEvent(new CustomEvent('gems-awarded', { detail: { amount: bonusGems } }))
        try {
          localStorage.setItem(`actuarial_bonus_claimed_${todayISO()}`, '1')
        } catch { /* ignore */ }
      }
    } catch (e) {
      console.warn('bonus gem claim failed:', e)
    }
    if (!mounted.current) return
    setPhase('claimed')
  }, [tapped, bonusGems, fireAt])

  return (
    <>
      {/* Confetti canvas — floats above the modal overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 70 }}
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 ceremony-overlay-in"
        style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
      >
        <div className="relative bg-background rounded-2xl shadow-2xl border w-full max-w-sm overflow-hidden">

          {/* Close / skip — hidden once claimed */}
          {phase !== 'claimed' && (
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <div className="p-6 pt-5">

            {/* Header */}
            <div className="text-center mb-4">
              {phase === 'claimed' ? (
                <h2 className="text-xl font-bold ceremony-celebration-in">Bonus claimed! 🎉</h2>
              ) : phase === 'complete' || phase === 'claiming' || phase === 'unlocking' ? (
                <h2 className="text-xl font-bold ceremony-celebration-in">Plan complete! 🎉</h2>
              ) : (
                <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                  Completing today's plan…
                </h2>
              )}
            </div>

            {/* ── Ticking phase: concept list ───────────────────────── */}
            {phase === 'ticking' && (
              <ul className="space-y-1.5 mb-5">
                {concepts.slice(0, visibleCount).map(c => (
                  <li
                    key={c.name}
                    className="ceremony-concept-in flex items-center gap-2.5 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-950/25 border border-green-200 dark:border-green-800"
                  >
                    <span className="study-plan-check-in shrink-0" style={{ animationDelay: '100ms' }}>
                      <Check className="h-4 w-4 text-green-500" />
                    </span>
                    <span className="text-sm flex-1 min-w-0 truncate font-medium text-green-800 dark:text-green-200">
                      {c.name}
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400 shrink-0 font-medium">
                      {STATE_LABEL[c.target]}
                    </span>
                  </li>
                ))}
                {concepts.slice(visibleCount).map(c => (
                  <li
                    key={c.name}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-border opacity-25"
                  >
                    <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm flex-1 min-w-0 truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      → {STATE_LABEL[c.target]}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* ── Complete phase: the lock unlock CTA ───────────────── */}
            {phase === 'complete' && (
              <div className="text-center space-y-2 ceremony-celebration-in">

                {/* Concept summary strip */}
                <div className="flex items-center justify-center gap-1.5 text-green-500 mb-4">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {concepts.length} concept{concepts.length !== 1 ? 's' : ''} completed
                  </span>
                </div>

                {bonusGems > 0 ? (
                  <div
                    ref={lockRef}
                    className="cursor-pointer select-none py-2"
                    onClick={() => { void handleLockTap() }}
                    role="button"
                    aria-label="Tap to unlock 2× gem bonus"
                  >
                    {/* 2× Gem Bonus label */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Gem className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold text-emerald-400 tracking-wide">
                        2× Gem Bonus
                      </span>
                      <Gem className="h-4 w-4 text-emerald-400" />
                    </div>

                    {/* Lock with pulsing rings */}
                    <div className="relative flex items-center justify-center mb-6">
                      <div className="lock-pulse-ring absolute" />
                      <div className="lock-pulse-ring absolute" style={{ animationDelay: '0.8s' }} />
                      <div className="h-24 w-24 rounded-full bg-amber-500/10 border-2 border-amber-400/70 flex items-center justify-center lock-float">
                        <Lock className="h-12 w-12 text-amber-400" />
                      </div>
                    </div>

                    {/* Pulsing hint */}
                    <p className="text-sm font-medium text-muted-foreground tap-pulse">
                      Tap to unlock
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mt-2">Great work completing today's plan!</p>
                    <Button onClick={onClose} className="w-full mt-2" size="sm">Done</Button>
                  </>
                )}
              </div>
            )}

            {/* ── Unlocking phase: lock pops open ───────────────────── */}
            {phase === 'unlocking' && (
              <div className="text-center py-6 ceremony-celebration-in">
                <div className="flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-emerald-500/15 border-2 border-emerald-400/60 flex items-center justify-center lock-open-burst">
                    <LockOpen className="h-12 w-12 text-emerald-400" />
                  </div>
                </div>
              </div>
            )}

            {/* ── Claiming phase: loading ───────────────────────────── */}
            {phase === 'claiming' && (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-500" />
              </div>
            )}

            {/* ── Claimed phase: celebration ────────────────────────── */}
            {phase === 'claimed' && (
              <div className="text-center space-y-4">
                <div className="flex justify-center py-1">
                  <Gem key="gem-celebrate" className="h-16 w-16 text-emerald-500 gem-celebrate" />
                </div>
                <div className="ceremony-bonus-count-in">
                  <p className="text-4xl font-bold text-emerald-500 tabular-nums">
                    +{bonusGems}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">gems added to your balance</p>
                </div>
                <div className="flex items-center justify-center gap-2 py-1">
                  <Gem className="h-5 w-5 text-emerald-500" />
                  <span className="text-xl font-bold tabular-nums">{displayGems}</span>
                  <span className="text-sm text-muted-foreground">gems today</span>
                </div>
                <Button onClick={onClose} className="w-full" size="sm">
                  Done
                </Button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
