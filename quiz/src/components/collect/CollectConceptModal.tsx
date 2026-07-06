import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Check, Loader2, Lock, Play, Sparkles, X } from 'lucide-react'
import { useCollect } from '@/hooks/useCollect'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath } from '@/lib/wikiRoutes'
import { stripFrontmatter } from '@/components/wiki/WikiArticle'
import { cleanWikiLinks } from '@/lib/wikiParser'
import { MarkdownText } from '@/components/MarkdownText'
import { CollectCard3D } from '@/components/collect/CollectCard3D'
import { LearningProgressPanel } from '@/components/wiki/LearningProgressModal'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { COMPREHENSION_CHECKS, type ComprehensionCheck } from '@/data/comprehensionChecks'
import { trackConceptCollected } from '@/lib/analytics'

type Phase = 'question' | 'spinning' | 'flash' | 'done'

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
  let i = 0
  for (; i < lines.length; i++) {
    const t = lines[i]!.trim()
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
  const def = out.join(' ')
  // A paragraph ending in a colon is introducing an enumeration — fold the
  // list that follows in, otherwise the "definition" is a dangling teaser
  // that never says what it's a list of (e.g. "...must satisfy:" with the
  // actual axioms left off).
  if (!/:\s*$/.test(def)) return def
  const items: string[] = []
  for (; i < lines.length; i++) {
    const t = lines[i]!.trim()
    if (!t) { if (items.length) break; else continue }
    const m = t.match(/^(?:[*+-]|\d+\.) (.+)/)
    if (!m) break
    items.push(m[1]!)
  }
  return items.length ? `${def} ${items.join(', ')}.` : def
}

// Drop inline/block LaTeX and wiki-link syntax so a definition snippet reads
// as plain language.
function stripMarkup(text: string): string {
  return cleanWikiLinks(text)
    .replace(/\$\$?[^$]*\$\$?/g, ' … ')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Hide the concept's own name inside its definition so the prompt tests
// comprehension rather than word-matching.
function maskDefinition(def: string, name: string): string {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const masked = def.replace(new RegExp(escaped, 'gi'), ' ____ ')
  return stripMarkup(masked)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function CollectConceptModal() {
  const { ref, close } = useCollect()
  const { collect, isCollected } = useCollectedCards()
  const { addCard } = useFlashcards()
  const { syllabi } = useWikiSyllabus()
  const { play } = useSoundEffects()
  const navigate = useNavigate()

  const name = ref?.name ?? ''
  const alreadyCollected = ref ? isCollected(name) : false

  const [phase, setPhase] = useState<Phase>('question')
  const [def, setDef] = useState<string | null>(null)
  const [defError, setDefError] = useState(false)
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [selected, setSelected] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string | null>(null)
  const [showQuestions, setShowQuestions] = useState(false)
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
    setDef(null)
    setDefError(false)
    setShowQuestions(false)
    if (!ref) return
    // An authored comprehension check is self-contained — no wiki fetch needed
    // to build the question, so the question flow doesn't wait on one. The
    // definition is still fetched below (in the background) for the card's
    // flippable back side.
    setLoadState(alreadyCollected || COMPREHENSION_CHECKS[name] ? 'ready' : 'loading')
    let cancelled = false
    fetchWikiFile(entryRefToRepoPath(ref))
      .then(raw => {
        if (cancelled) return
        setDef(extractDefinition(raw))
        setLoadState(prev => (prev === 'loading' ? 'ready' : prev))
      })
      .catch(() => {
        if (cancelled) return
        setDefError(true)
        setLoadState(prev => (prev === 'loading' ? 'error' : prev))
      })
    return () => { cancelled = true }
  }, [ref, name]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Pool of all other concept names for plausible distractors.
  const allConceptNames = useMemo(() => {
    const set = new Set<string>()
    for (const s of syllabi) for (const t of s.topics) for (const c of t.concepts) set.add(c.name)
    return Array.from(set)
  }, [syllabi])

  // Authored comprehension check for this concept, if one exists. When present
  // it takes priority over the masked-definition fallback below.
  const check = useMemo<ComprehensionCheck | null>(
    () => (name ? COMPREHENSION_CHECKS[name] ?? null : null),
    [name],
  )

  // Fallback question for concepts without an authored check: mask the concept's
  // own name out of its definition and ask "which concept does this describe?".
  // This is the weaker "matching" check (the answer is the card title); authored
  // entries in comprehensionChecks.ts supersede it. See docs/flashcard-collection.md.
  const prompt = useMemo(() => {
    if (!def) return ''
    const masked = maskDefinition(def, name)
    // Keep it short — a basic comprehension check, not a wall of text.
    return masked.length > 240 ? masked.slice(0, 237).trimEnd() + '…' : masked
  }, [def, name])

  // Build the multiple-choice options once the question is ready. Frozen for the
  // lifetime of this concept so re-renders don't reshuffle under the user. For an
  // authored check the options are its four choices; otherwise the concept name
  // plus three distractor concept names.
  const options = useMemo(() => {
    if (check) return shuffle(check.options)
    if (!name) return []
    const distractors = shuffle(allConceptNames.filter(n => n.toLowerCase() !== name.toLowerCase())).slice(0, 3)
    return shuffle([name, ...distractors])
  }, [name, check, allConceptNames])

  // The correct answer text for whichever question style is active. For the
  // fallback the concept's own name is correct; for an authored check it's the
  // designated option.
  const correctAnswer = check ? check.options[check.correctIndex] : name

  const hasRealQuestion = check ? true : (!!prompt && options.length >= 2)

  // Reverse side of the card — the concept's definition only, no title/label
  // repeated (the front already carries the name). Wiki-link syntax is stripped
  // to plain text, but LaTeX is rendered (not dropped) so formulae read
  // correctly. KaTeX inherits the card's white text; wide display math scrolls
  // horizontally rather than overflowing the narrow card.
  const cardBack = def ? (
    <MarkdownText
      className="text-sm sm:text-base leading-relaxed text-white [&_.katex]:text-white [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden"
    >
      {cleanWikiLinks(def)}
    </MarkdownText>
  ) : (
    <p className="text-sm text-white/70">
      {defError ? 'Definition unavailable.' : 'Loading definition…'}
    </p>
  )

  const runCollectAnimation = useCallback(() => {
    play('correct')
    trackConceptCollected({ concept: name })
    if (prefersReducedMotion()) {
      collect(name)
      addCard({ kind: 'concept', name })
      setPhase('done')
      return
    }
    // 1) Card spins faster and faster.
    setPhase('spinning')
    after(1100, () => {
      // 2) The card grows and dissolves into a radial bloom of dominant light.
      // Matches the 560ms .collect-card-absorb duration so the card finishes
      // fading out before it unmounts, instead of popping off mid-fade.
      setPhase('flash')
      after(560, () => {
        // 3) Bloom fades → persist + light up the Flashcards tab, then hold on
        //    the "Collected!" screen so the player can view or continue.
        collect(name)
        addCard({ kind: 'concept', name })
        setPhase('done')
      })
    })
  }, [name, collect, addCard, play, after])

  function handleAnswer(opt: string) {
    if (phase !== 'question' || selected) return
    if (opt.toLowerCase() === correctAnswer.toLowerCase()) {
      setSelected(opt)
      runCollectAnimation()
    } else {
      play('wrong')
      setWrong(opt)
      after(600, () => setWrong(null))
    }
  }

  if (!ref) return null

  const inBloom = phase === 'flash'
  const showCard = phase === 'question' || phase === 'spinning' || phase === 'flash'
  // Drop the modal chrome (border/background/header) once the ceremony starts so
  // only the card + light remain on screen.
  const showChrome = phase === 'question'

  function handleViewFlashcard() {
    close()
    navigate(`/flashcards?highlight=${encodeURIComponent(name)}`)
  }

  return createPortal(
    <>
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

      {/* Modal card */}
      {showCard && (
        <div className={`relative z-[121] w-full text-card-foreground ${
          showChrome
            ? `rounded-2xl border bg-card shadow-2xl max-h-[88vh] flex flex-col overflow-hidden ${alreadyCollected ? 'max-w-lg' : 'max-w-md'}`
            : 'max-w-md flex flex-col items-center'
        }`}>
          {/* Header */}
          {showChrome && (
            <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Lock className="h-4 w-4 text-primary shrink-0" />
                <span className="font-semibold text-sm truncate">
                  {alreadyCollected ? 'Collected' : 'Collect'}
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
          <div className={`flex flex-col items-center gap-5 ${showChrome ? 'px-5 py-5' : 'py-5'} ${showChrome ? 'min-h-0 overflow-y-auto' : ''}`}>
            <CollectCard3D
              name={name}
              phase={phase === 'spinning' || phase === 'flash' ? 'spin' : alreadyCollected ? 'won' : 'idle'}
              size={alreadyCollected ? 'md' : 'lg'}
              className={phase === 'flash' ? 'collect-card-absorb z-[122]' : ''}
              flippable={phase === 'question'}
              back={cardBack}
            />

            {alreadyCollected ? (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    <Check className="h-4 w-4" /> Collected
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Quiz this concept to level it up.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQuestions(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  Start Quiz
                </button>
                {/* Combined view: the learning-progress graph lives with the card
                    now that the concept is collected and can level up. */}
                <div className="w-full border-t pt-4">
                  <LearningProgressPanel conceptName={name} />
                </div>
              </div>
            ) : phase === 'spinning' ? (
              <p className="text-sm font-medium text-muted-foreground animate-pulse">Collecting…</p>
            ) : phase === 'flash' ? null : loadState === 'loading' ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                <Loader2 className="h-4 w-4 animate-spin" /> Preparing your check…
              </div>
            ) : (
              <div className="w-full flex flex-col gap-3">
                {!hasRealQuestion && (
                  <p className="text-sm text-foreground text-center">
                    Tap to confirm you've read about this concept.
                  </p>
                )}
                {hasRealQuestion && !check && (
                  <p className="text-sm text-foreground text-center">Which concept does this describe?</p>
                )}

                {check ? (
                  <p className="px-1 text-base sm:text-lg leading-relaxed text-center font-medium text-foreground">
                    {check.question}
                  </p>
                ) : hasRealQuestion ? (
                  <blockquote className="rounded-lg bg-muted/60 px-3.5 py-3 text-base sm:text-lg leading-relaxed text-foreground/90 border-l-2 border-primary/50">
                    “{prompt}”
                  </blockquote>
                ) : null}

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

      {/* Done: hold on a confirmation screen with the collected card (still
          flippable) and let the player choose where to go next. */}
      {phase === 'done' && (
        <div className="collect-done-pop relative z-[121] w-full max-w-xs flex flex-col items-center gap-5 text-center">
          <CollectCard3D name={name} phase="won" size="lg" flippable back={cardBack} />
          <span className="inline-flex items-center gap-1.5 text-base font-bold text-primary">
            <Sparkles className="h-5 w-5" /> Collected!
          </span>
          <div className="w-full flex gap-2">
            <button
              type="button"
              onClick={handleViewFlashcard}
              className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors"
            >
              View Flashcard
            </button>
            <button
              type="button"
              onClick={close}
              className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
    {/* Rendered in its own stacking context so it layers above the collect
        dialog (z-[120]) instead of behind it. */}
    {showQuestions && (
      <div className="relative z-[130]">
        <ConceptQuestionsModal
          conceptName={name}
          onClose={() => setShowQuestions(false)}
          onQuizStart={close}
        />
      </div>
    )}
    </>,
    document.body,
  )
}
