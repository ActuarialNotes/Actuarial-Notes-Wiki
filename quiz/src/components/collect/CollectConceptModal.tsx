import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Check, Loader2, Lock, Sparkles, X } from 'lucide-react'
import { useCollect } from '@/hooks/useCollect'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath } from '@/lib/wikiRoutes'
import { stripFrontmatter } from '@/components/wiki/WikiArticle'
import { CollectCard3D } from '@/components/collect/CollectCard3D'

type Phase = 'question' | 'spinning' | 'flash' | 'distill' | 'done'

const BREADCRUMB_RE = /^\[\[[^\]|]*(?:\|[^\]]+)?\]\][^\n]* \/ [^\n]*\n?/

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

// First real prose paragraph of a concept page — its working definition.
function extractDefinition(markdown: string): string {
  const cleaned = stripFrontmatter(markdown).replace(BREADCRUMB_RE, '')
  const lines = cleaned.split('\n')
  const out: string[] = []
  let started = false
  for (const line of lines) {
    const t = line.trim()
    if (!started) {
      if (t && !t.startsWith('#') && !/^[*+-] /.test(t) && !/^\d+\. /.test(t) && !t.startsWith('>')) {
        started = true
        out.push(t)
      }
    } else {
      if (t === '' || /^[*+-] /.test(t) || /^\d+\. /.test(t) || t.startsWith('>') || t.startsWith('#')) break
      out.push(t)
    }
  }
  return out.join(' ')
}

// Hide the concept's own name inside its definition so the prompt tests
// comprehension rather than word-matching. Also strips LaTeX/markdown noise so
// the snippet reads as plain language.
function maskDefinition(def: string, name: string): string {
  let masked = def
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  masked = masked.replace(new RegExp(escaped, 'gi'), ' ____ ')
  // Drop inline/blocks LaTeX and wiki-link syntax for readability.
  masked = masked
    .replace(/\$\$?[^$]*\$\$?/g, ' … ')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, a, b) => b || a)
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return masked
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Locate the visible Flashcards nav target (mobile bottom-nav or desktop
// sidebar item) so the distilled "drop" can fly into it.
function flashcardNavCenter(): { x: number; y: number } {
  const els = Array.from(document.querySelectorAll('[data-flashcard-nav]')) as HTMLElement[]
  for (const el of els) {
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    // Require the element to be genuinely on-screen — the desktop sidebar item
    // still has layout while translated off-canvas on mobile, so a width/visibility
    // check alone would send the drop off the left edge.
    const onScreen =
      r.width > 0 && r.height > 0 && el.offsetParent !== null &&
      cx >= 0 && cx <= window.innerWidth && cy >= 0 && cy <= window.innerHeight
    if (onScreen) return { x: cx, y: cy }
  }
  // Fallback: bottom-left, where the tab lives on both layouts.
  return { x: 48, y: window.innerHeight - 28 }
}

export function CollectConceptModal() {
  const { ref, close } = useCollect()
  const { collect, isCollected } = useCollectedCards()
  const { addCard } = useFlashcards()
  const { syllabi } = useWikiSyllabus()
  const { play } = useSoundEffects()

  const name = ref?.name ?? ''
  const alreadyCollected = ref ? isCollected(name) : false

  const [phase, setPhase] = useState<Phase>('question')
  const [def, setDef] = useState<string | null>(null)
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [selected, setSelected] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string | null>(null)
  const [dropStyle, setDropStyle] = useState<React.CSSProperties | null>(null)
  const timers = useRef<number[]>([])

  const after = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
  }, [])

  // Reset all transient state whenever a new concept opens.
  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('question')
    setSelected(null)
    setWrong(null)
    setDropStyle(null)
    setDef(null)
    if (!ref) return
    if (alreadyCollected) { setLoadState('ready'); return }
    setLoadState('loading')
    let cancelled = false
    fetchWikiFile(entryRefToRepoPath(ref))
      .then(raw => {
        if (cancelled) return
        setDef(extractDefinition(raw))
        setLoadState('ready')
      })
      .catch(() => { if (!cancelled) setLoadState('error') })
    return () => { cancelled = true }
  }, [ref, name]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Pool of all other concept names for plausible distractors.
  const allConceptNames = useMemo(() => {
    const set = new Set<string>()
    for (const s of syllabi) for (const t of s.topics) for (const c of t.concepts) set.add(c.name)
    return Array.from(set)
  }, [syllabi])

  // NOTE: this "which concept does this describe?" check is intentionally a
  // placeholder — it's too easy (the answer is the card title). Replacing it with
  // genuine authored/generated comprehension questions is its own task; see
  // docs/flashcard-collection.md.
  const prompt = useMemo(() => {
    if (!def) return ''
    const masked = maskDefinition(def, name)
    // Keep it short — a basic comprehension check, not a wall of text.
    return masked.length > 240 ? masked.slice(0, 237).trimEnd() + '…' : masked
  }, [def, name])

  // Build the multiple-choice options once the prompt is ready. Frozen for the
  // lifetime of this concept so re-renders don't reshuffle under the user.
  const options = useMemo(() => {
    if (!name) return []
    const distractors = shuffle(allConceptNames.filter(n => n.toLowerCase() !== name.toLowerCase())).slice(0, 3)
    return shuffle([name, ...distractors])
  }, [name, allConceptNames])

  const hasRealQuestion = !!prompt && options.length >= 2

  const runCollectAnimation = useCallback(() => {
    play('correct')
    if (prefersReducedMotion()) {
      collect(name)
      addCard({ kind: 'concept', name })
      setPhase('done')
      after(700, close)
      return
    }
    // 1) Card spins faster and faster.
    setPhase('spinning')
    after(1100, () => {
      // 2) The card grows and dissolves into a radial bloom of dominant light.
      setPhase('flash')
      after(520, () => {
        // 3) The light distils into a glowing drop that flies to the Flashcards
        //    tab. Target/offset are baked into CSS custom props so a single
        //    keyframe drives the flight (no cross-frame transition toggling).
        const target = flashcardNavCenter()
        const startX = window.innerWidth / 2
        const startY = window.innerHeight / 2
        setDropStyle({
          left: startX,
          top: startY,
          ['--dx' as string]: `${target.x - startX}px`,
          ['--dy' as string]: `${target.y - startY}px`,
        })
        setPhase('distill')
        after(820, () => {
          // 4) Drop lands → persist + light up the tab in sync.
          collect(name)
          addCard({ kind: 'concept', name })
          setPhase('done')
          after(520, close)
        })
      })
    })
  }, [name, collect, addCard, play, after, close])

  function handleAnswer(opt: string) {
    if (phase !== 'question' || selected) return
    if (opt.toLowerCase() === name.toLowerCase()) {
      setSelected(opt)
      runCollectAnimation()
    } else {
      play('wrong')
      setWrong(opt)
      after(600, () => setWrong(null))
    }
  }

  if (!ref) return null

  const inBloom = phase === 'flash' || phase === 'distill'
  // The card stays mounted through the flash so it visibly dissolves into the
  // bloom rather than cutting out. It's gone by the distil phase.
  const showCard = phase !== 'distill'
  // Drop the modal chrome (border/background/header) once the ceremony starts so
  // only the card + light remain on screen.
  const showChrome = phase === 'question'

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Collect ${name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => phase === 'question' && close()}
      />

      {/* Radial dominant bloom (white in dark mode / black in light mode via --foreground) */}
      {inBloom && (
        <div className="collect-bloom pointer-events-none absolute inset-0" />
      )}

      {/* Flying distilled drop */}
      {phase === 'distill' && dropStyle && (
        <div className="collect-drop pointer-events-none fixed z-[130]" style={dropStyle}>
          <span className="collect-drop-core" />
        </div>
      )}

      {/* Modal card */}
      {showCard && (
        <div className={`relative z-[121] w-full max-w-md text-card-foreground ${
          showChrome ? 'rounded-2xl border bg-card shadow-2xl overflow-hidden' : 'flex flex-col items-center'
        }`}>
          {/* Header */}
          {showChrome && (
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2 min-w-0">
                <Lock className="h-4 w-4 text-primary shrink-0" />
                <span className="font-semibold text-sm truncate">
                  {alreadyCollected ? 'Collected' : 'Collect this flashcard'}
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                className="text-muted-foreground hover:text-foreground p-1 -mr-1"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Body */}
          <div className={`flex flex-col items-center gap-5 ${showChrome ? 'px-5 py-5' : 'py-5'}`}>
            <CollectCard3D
              name={name}
              phase={phase === 'spinning' || phase === 'flash' ? 'spin' : phase === 'done' || alreadyCollected ? 'won' : 'idle'}
              className={phase === 'flash' ? 'collect-card-absorb z-[122]' : ''}
            />

            {alreadyCollected ? (
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <Check className="h-4 w-4" /> Already in your collection
                </span>
                <p className="text-xs text-muted-foreground">
                  You've unlocked this flashcard. Keep studying it in the Flashcards tab.
                </p>
              </div>
            ) : phase === 'done' ? (
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="inline-flex items-center gap-1.5 text-base font-bold text-primary">
                  <Sparkles className="h-5 w-5" /> Collected!
                </span>
              </div>
            ) : phase === 'spinning' ? (
              <p className="text-sm font-medium text-muted-foreground animate-pulse">Collecting…</p>
            ) : phase === 'flash' ? null : loadState === 'loading' ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                <Loader2 className="h-4 w-4 animate-spin" /> Preparing your check…
              </div>
            ) : (
              <div className="w-full flex flex-col gap-3">
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Quick comprehension check
                  </p>
                  <p className="text-sm text-foreground">
                    {hasRealQuestion
                      ? 'Which concept does this describe?'
                      : `Tap to confirm you've read about this concept.`}
                  </p>
                </div>

                {hasRealQuestion && (
                  <blockquote className="rounded-lg bg-muted/60 px-3.5 py-3 text-sm leading-relaxed text-foreground/90 border-l-2 border-primary/50">
                    “{prompt}”
                  </blockquote>
                )}

                <div className="grid gap-2">
                  {(hasRealQuestion ? options : [name]).map(opt => {
                    const isWrong = wrong === opt
                    const isChosen = selected === opt
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleAnswer(opt)}
                        disabled={!!selected}
                        className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                          isChosen
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                            : isWrong
                              ? 'border-destructive bg-destructive/10 text-destructive collect-shake'
                              : 'border-border hover:border-primary/60 hover:bg-accent'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>

                {wrong && (
                  <p className="text-xs text-center text-destructive">Not quite — give it another look and try again.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>,
    document.body,
  )
}
