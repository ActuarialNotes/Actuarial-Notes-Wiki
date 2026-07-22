import { useEffect, useMemo, useState, type ComponentType } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  FlipHorizontal,
  GraduationCap,
  Layers,
  LayoutGrid,
  Lock,
  LogIn,
  MousePointerClick,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react'
import { useOnboardingTour } from '@/hooks/useOnboardingTour'
import { useAuth } from '@/hooks/useAuth'
import { useQuizStore } from '@/stores/quizStore'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { wikiRoute } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'

// The concept the tour walks the user through collecting. It must have a
// wiki-link on the Exam P syllabus page (data-wikiref below) and a page to
// read; the collect gate builds a comprehension check from it either way.
const TOUR_CONCEPT = 'Calculus'

// Route to the Exam P study guide — used as a fallback if the user lands on a
// concept step without having tapped into the exam first.
const EXAM_P_ROUTE = wikiRoute({ kind: 'exam', name: 'Exam P-1 (SOA)' })

interface TourStep {
  icon: ComponentType<{ className?: string }>
  title: string
  body: string
  // Page the step belongs to. If the user isn't there yet, we navigate here.
  path?: string
  // Predicate for "already on the right page" (defaults to exact path match).
  match?: (pathname: string) => boolean
  // CSS selector for the element to spotlight and wait for a tap on.
  target?: string
  // 'tap'    — advance when the user taps the highlighted element.
  // 'watch'  — spotlight the target but advance when `watch()` becomes true
  //            (e.g. the user has actually answered a question).
  // 'manual' — advance via the Next / primary button.
  advance: 'tap' | 'watch' | 'manual'
  // Polled predicate for 'watch' steps.
  watch?: () => boolean
  // Primary button label for manual steps (defaults to "Next").
  cta?: string
  // Where the final primary button sends the user.
  ctaRoute?: string
}

const onExam = (p: string) => p.startsWith('/wiki/exam')
const onFlashcards = (p: string) => p.startsWith('/flashcards')

// Has the tour concept been collected yet? The collect gate persists to the
// collected-cards store, so this is what "the check was passed" looks like.
const collectedTourConcept = () =>
  useCollectedCards
    .getState()
    .cards.some(c => c.name.toLowerCase() === TOUR_CONCEPT.toLowerCase())

// The guided journey mirrors the real study loop:
// study guide → meet a concept → collect it (comprehension gate) →
// flashcards & daily packs → level up with a quiz → log in to keep it all.
const BASE_STEPS: TourStep[] = [
  {
    icon: GraduationCap,
    title: 'Welcome to Actuarial Notes',
    body: 'Here\'s the whole study loop in about 2 minutes — follow the highlights and tap where they point.',
    advance: 'manual',
  },
  // ── Meet a concept ──
  {
    icon: BookOpen,
    title: 'Open a study guide',
    body: 'Every exam is a syllabus of bite-size concepts. Tap Exam P-1 to open one.',
    path: '/wiki',
    target: '[data-tour="exam-p"]',
    advance: 'tap',
  },
  {
    icon: MousePointerClick,
    title: 'Meet a concept',
    body: 'Tap "Calculus" — concepts open in a popup you can read without losing your place.',
    path: EXAM_P_ROUTE,
    match: onExam,
    target: '[data-wikiref="concept:calculus"]',
    advance: 'tap',
  },
  // ── Collect it (the comprehension gate) ──
  {
    icon: Lock,
    title: 'Collect the card',
    body: 'Concepts start locked. Tap the lock to collect this one into your deck.',
    match: onExam,
    target: '[data-tour="collect-card"]',
    advance: 'tap',
  },
  {
    icon: Sparkles,
    title: 'Pass the quick check',
    body: 'Answer the short comprehension check — get it right and the card is yours.',
    match: onExam,
    target: '[data-tour="collect-options"]',
    advance: 'watch',
    watch: collectedTourConcept,
  },
  {
    icon: Layers,
    title: 'Your first card!',
    body: 'Nice — that\'s collected. Tap View Flashcard to open your deck.',
    match: onExam,
    target: '[data-tour="collect-view-flashcard"]',
    advance: 'tap',
  },
  // ── Flashcards & daily packs ──
  {
    icon: FlipHorizontal,
    title: 'Flip through your deck',
    body: 'This is your flashcard deck. Tap a card to flip it and see the explanation.',
    path: '/flashcards',
    match: onFlashcards,
    target: '[data-tour="flip-card"]',
    advance: 'tap',
  },
  {
    icon: LayoutGrid,
    title: 'Grab a daily pack',
    body: 'You don\'t have to collect cards one by one. Open the Gallery from the flashcard toolbar for ready-made packs — today\'s study plan, plus a pack for every exam and topic.',
    match: onFlashcards,
    advance: 'manual',
  },
  // ── Level up with a quiz ──
  {
    icon: Trophy,
    title: 'Turn study into points',
    body: 'Quizzes are where you earn XP and level up. Tap the Quiz tab to try one.',
    match: onFlashcards,
    target: '[data-tour="nav-quiz"]',
    advance: 'tap',
  },
  {
    icon: Play,
    title: 'Start a quiz',
    body: 'Tap Exam P-1 to choose your topics.',
    path: '/',
    match: p => p === '/',
    target: '[data-tour="quiz-exam-p"]',
    advance: 'tap',
  },
  {
    icon: Play,
    title: 'Start the quiz',
    body: 'Pick a question count, then tap Start Quiz.',
    match: p => p === '/',
    target: '[data-tour="start-quiz"]',
    advance: 'tap',
  },
  {
    icon: MousePointerClick,
    title: 'Answer a question',
    body: 'Pick an answer and confirm — you\'ll get a full explanation, and every question you answer earns XP.',
    match: p => p === '/quiz',
    path: '/quiz',
    target: '[data-tour="answer-options"]',
    advance: 'watch',
    watch: () => Object.keys(useQuizStore.getState().responses).length > 0,
  },
  {
    icon: X,
    title: 'Quit the quiz',
    body: 'Normally you\'d keep going — for the tour, tap Quit quiz.',
    match: p => p === '/quiz',
    target: '[data-tour="quit-quiz"]',
    advance: 'tap',
  },
  {
    icon: RotateCcw,
    title: 'Finish & level up',
    body: 'Tap Finish quiz to bank your XP and see your results.',
    match: p => p === '/quiz',
    target: '[data-tour="dialog-finish"]',
    advance: 'tap',
  },
  // ── Log in ──
  {
    icon: LogIn,
    title: 'Log in to keep it all',
    body: 'That XP levels you up and fuels daily goals, streaks and quests. Sign in to save your cards, progress and study history across devices.',
    advance: 'manual',
    cta: 'Log in',
    ctaRoute: '/auth',
  },
]

export default function OnboardingTour() {
  const { active, step, autoStart, next, prev, goTo, finish } = useOnboardingTour()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

  // Auto-launch on a first-time visitor's first render.
  useEffect(() => {
    autoStart()
  }, [autoStart])

  // Logged-in visitors don't need the final "log in" prompt.
  const steps = useMemo(
    () => (user ? BASE_STEPS.filter(s => !s.ctaRoute) : BASE_STEPS),
    [user],
  )

  const safeStep = Math.min(step, steps.length - 1)
  const current = steps[safeStep]
  const isLast = safeStep === steps.length - 1

  // Drive navigation + element spotlighting for the active step.
  useEffect(() => {
    if (!active || !current) return

    // Drop any stale spotlight immediately — before the page-guard return below.
    // Without this the previous step's ring stays frozen on-screen while React
    // Router is transitioning to the new route.
    setTargetRect(null)

    // Make sure we're on the step's page before looking for its target.
    const onRightPage = current.match
      ? current.match(location.pathname)
      : current.path
      ? location.pathname === current.path
      : true
    if (!onRightPage) {
      if (current.path) navigate(current.path)
      return
    }

    if (!current.target) return

    let cancelled = false
    let pollTimer = 0
    let watchTimer = 0
    let raf = 0
    let el: HTMLElement | null = null
    let lastRect: DOMRect | null = null

    const isLastStep = safeStep >= steps.length - 1
    const isWatch = current.advance === 'watch'
    const advance = () => {
      if (cancelled) return
      if (isLastStep) finish()
      else next()
    }

    // 'watch' steps advance on a polled condition rather than a tap.
    if (isWatch && current.watch) {
      const checkWatch = () => {
        if (cancelled) return
        if (current.watch!()) advance()
        else watchTimer = window.setTimeout(checkWatch, 200)
      }
      checkWatch()
    }

    // For 'tap' steps, use a document-level capture listener rather than
    // attaching to the specific element. This survives element recreation
    // (e.g. ReactMarkdown re-creates anchors when its `components` prop
    // changes), which would otherwise silently detach an element listener.
    const onDocClick = !isWatch
      ? (e: MouseEvent) => {
          if (cancelled || !current.target) return
          const t = e.target as HTMLElement | null
          if (t && t.closest(current.target!)) advance()
        }
      : null
    if (onDocClick) document.addEventListener('click', onDocClick, true)

    const loop = () => {
      if (cancelled) return
      if (el && !document.body.contains(el)) {
        el = null
        poll()
        return
      }
      if (el) {
        const r = el.getBoundingClientRect()
        if (
          !lastRect ||
          lastRect.top !== r.top ||
          lastRect.left !== r.left ||
          lastRect.width !== r.width ||
          lastRect.height !== r.height
        ) {
          lastRect = r
          setTargetRect(r)
        }
      }
      raf = requestAnimationFrame(loop)
    }

    const poll = () => {
      if (cancelled) return
      // Prefer an element whose midpoint is in-viewport (e.g. bottom-nav tab over
      // a hidden sidebar copy). Fall back to any non-zero-sized match so the
      // spotlight still appears even if the element is partially off-screen.
      let onscreen: HTMLElement | null = null
      let offscreen: HTMLElement | null = null
      for (const c of document.querySelectorAll<HTMLElement>(current.target!)) {
        const r = c.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) continue
        const midX = (r.left + r.right) / 2
        const midY = (r.top + r.bottom) / 2
        if (midX >= 0 && midX <= window.innerWidth && midY >= 0 && midY <= window.innerHeight) {
          onscreen = c
          break
        }
        offscreen ??= c
      }
      const found = onscreen ?? offscreen
      if (found) {
        el = found
        found.scrollIntoView({ block: 'center', behavior: 'smooth' })
        loop()
      } else {
        pollTimer = window.setTimeout(poll, 150)
      }
    }
    poll()

    return () => {
      cancelled = true
      clearTimeout(pollTimer)
      clearTimeout(watchTimer)
      cancelAnimationFrame(raf)
      if (onDocClick) document.removeEventListener('click', onDocClick, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, safeStep, location.pathname])

  if (!active || !current) return null

  const Icon = current.icon
  const isGuided = current.advance === 'tap' || current.advance === 'watch'
  const primaryLabel = isLast ? current.cta ?? 'Done' : 'Next'

  // Place the card opposite the highlighted element so it never covers it.
  const placeTop = !!targetRect && targetRect.top + targetRect.height / 2 > window.innerHeight * 0.5

  function handlePrimary() {
    if (isLast) {
      finish()
      if (current!.ctaRoute) navigate(current!.ctaRoute)
      return
    }
    next()
  }

  return (
    <>
      {targetRect && (
        <div
          className="onboarding-spotlight"
          style={{
            left: targetRect.left - 6,
            top: targetRect.top - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
        />
      )}

      <div
        className={cn(
          'fixed inset-x-0 z-[63] flex justify-center px-3 pointer-events-none',
          placeTop ? 'top-3 md:top-4' : 'bottom-14 md:bottom-4',
        )}
      >
        <div
          role="dialog"
          aria-label="Getting started tour"
          className="onboarding-roll-in pointer-events-auto w-full max-w-md rounded-2xl bg-primary text-primary-foreground shadow-2xl"
        >
          <div className="flex items-start gap-3 p-4 pr-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
              <Icon className="h-5 w-5" />
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-semibold leading-snug">{current.title}</h2>
              <p className="mt-1 text-[13px] leading-relaxed text-primary-foreground/80">{current.body}</p>
            </div>

            <button
              type="button"
              onClick={finish}
              aria-label="Dismiss tour"
              title="Dismiss"
              className="-mr-1 -mt-1 shrink-0 rounded-full p-1 text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 px-4 pb-4">
            {/* Progress dots double as a step picker. */}
            <div className="flex items-center gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to step ${i + 1}`}
                  aria-current={i === safeStep}
                  onClick={() => goTo(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === safeStep ? 'w-5 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60',
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {safeStep > 0 && (
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Back
                </button>
              )}
              {isGuided ? (
                <button
                  type="button"
                  onClick={() => (isLast ? finish() : next())}
                  className="rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Skip
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePrimary}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary-foreground px-3.5 py-1.5 text-[13px] font-semibold text-primary shadow-sm transition-all hover:opacity-90 active:scale-95"
                >
                  {primaryLabel}
                  {isLast ? (
                    current.ctaRoute ? <LogIn className="h-3.5 w-3.5" /> : null
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
