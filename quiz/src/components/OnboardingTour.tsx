import { useEffect, useMemo, useState, type ComponentType } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Eye,
  FlipHorizontal,
  GraduationCap,
  Layers,
  LogIn,
  MousePointerClick,
  Play,
  RotateCcw,
  Sigma,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { useOnboardingTour } from '@/hooks/useOnboardingTour'
import { useAuth } from '@/hooks/useAuth'
import { useQuizStore } from '@/stores/quizStore'
import { wikiRoute } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'

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

// The guided journey: study guides → concept popup → flashcards → quiz → log in.
const BASE_STEPS: TourStep[] = [
  {
    icon: GraduationCap,
    title: 'Welcome to Actuarial Notes',
    body: 'Follow the highlights and tap where they point — takes about 2 minutes.',
    advance: 'manual',
  },
  // ── Study guide ──
  {
    icon: BookOpen,
    title: 'Open a study guide',
    body: 'Tap Exam P-1 to see the syllabus.',
    path: '/wiki',
    target: '[data-tour=”exam-p”]',
    advance: 'tap',
  },
  // ── Concept popup ──
  {
    icon: MousePointerClick,
    title: 'Open a concept',
    body: 'Tap “Calculus” to open its explanation in a popup.',
    path: EXAM_P_ROUTE,
    match: onExam,
    target: '[data-wikiref=”concept:calculus”]',
    advance: 'tap',
  },
  {
    icon: Play,
    title: 'Open the actions menu',
    body: 'Tap the action button next to the concept name.',
    match: onExam,
    target: '[data-tour=”concept-action”]',
    advance: 'tap',
  },
  {
    icon: Layers,
    title: 'Add it to your flashcards',
    body: 'Tap “Add to Flashcards” to save this concept.',
    match: onExam,
    target: '[data-tour=”add-flashcard”]',
    advance: 'tap',
  },
  {
    icon: Eye,
    title: 'View your flashcards',
    body: 'Tap “view” to jump to your flashcard deck.',
    match: onExam,
    target: '[data-tour=”view-flashcards”]',
    advance: 'tap',
  },
  // ── Flashcards ──
  {
    icon: FlipHorizontal,
    title: 'Flip a card',
    body: 'Tap the card to flip it and see the explanation.',
    path: '/flashcards',
    match: p => p.startsWith('/flashcards'),
    target: '[data-tour=”flip-card”]',
    advance: 'tap',
  },
  {
    icon: SlidersHorizontal,
    title: 'Change what\'s on the card',
    body: 'Tap “Back content” to choose what shows on the back.',
    match: p => p.startsWith('/flashcards'),
    target: '[data-tour=”card-content”]',
    advance: 'tap',
  },
  {
    icon: Sigma,
    title: 'Show the math',
    body: 'Tap “Math” to show the key equations on the back.',
    match: p => p.startsWith('/flashcards'),
    target: '[data-tour=”card-math”]',
    advance: 'tap',
  },
  {
    icon: FlipHorizontal,
    title: 'There\'s the math',
    body: 'Equations are on the back now. Tap the Quiz tab to try a practice question.',
    match: p => p.startsWith('/flashcards'),
    target: '[data-tour=”nav-quiz”]',
    advance: 'tap',
  },
  // ── Quiz ──
  {
    icon: Play,
    title: 'Start a quiz',
    body: 'Tap Exam P-1 to choose your topics.',
    path: '/',
    match: p => p === '/',
    target: '[data-tour=”quiz-exam-p”]',
    advance: 'tap',
  },
  {
    icon: Play,
    title: 'Start the quiz',
    body: 'Pick a question count, then tap Start Quiz.',
    match: p => p === '/',
    target: '[data-tour=”start-quiz”]',
    advance: 'tap',
  },
  {
    icon: MousePointerClick,
    title: 'Answer a question',
    body: 'Pick an answer and confirm it — you\'ll get a full explanation right away.',
    match: p => p === '/quiz',
    path: '/quiz',
    target: '[data-tour=”answer-options”]',
    advance: 'watch',
    watch: () => Object.keys(useQuizStore.getState().responses).length > 0,
  },
  {
    icon: X,
    title: 'Quit the quiz',
    body: 'Normally you\'d keep going — for the tour, tap Quit quiz.',
    match: p => p === '/quiz',
    target: '[data-tour=”quit-quiz”]',
    advance: 'tap',
  },
  {
    icon: RotateCcw,
    title: 'Finish & grade',
    body: 'Tap Finish quiz to see your results.',
    match: p => p === '/quiz',
    target: '[data-tour=”dialog-finish”]',
    advance: 'tap',
  },
  // ── Log in ──
  {
    icon: LogIn,
    title: 'Log in to track your progress',
    body: 'Sign in to save your progress, streaks, and study history across devices.',
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
    const onTap = () => advance()

    // 'watch' steps advance on a polled condition rather than a tap.
    if (isWatch && current.watch) {
      const checkWatch = () => {
        if (cancelled) return
        if (current.watch!()) advance()
        else watchTimer = window.setTimeout(checkWatch, 200)
      }
      checkWatch()
    }

    const loop = () => {
      if (cancelled) return
      if (el && !document.body.contains(el)) {
        // Element went away (e.g. menu closed) — drop it and resume polling.
        if (!isWatch) el.removeEventListener('click', onTap, true)
        el = null
        lastRect = null
        setTargetRect(null)
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
      // An anchor may exist in more than one layout (e.g. the Quiz tab lives in
      // both the desktop sidebar and the mobile bottom nav). Pick the first
      // candidate that's actually visible (non-zero box).
      let found: HTMLElement | null = null
      for (const c of document.querySelectorAll<HTMLElement>(current.target!)) {
        const r = c.getBoundingClientRect()
        const midX = (r.left + r.right) / 2
        const midY = (r.top + r.bottom) / 2
        if (
          r.width > 0 && r.height > 0 &&
          midX >= 0 && midX <= window.innerWidth &&
          midY >= 0 && midY <= window.innerHeight
        ) { found = c; break }
      }
      if (found) {
        el = found
        if (!isWatch) found.addEventListener('click', onTap, true)
        const r = found.getBoundingClientRect()
        if (r.top < 64 || r.bottom > window.innerHeight - 64) {
          found.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
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
      if (el && !isWatch) el.removeEventListener('click', onTap, true)
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
          'fixed inset-x-0 z-[61] flex justify-center px-3 pointer-events-none',
          placeTop ? 'top-3 md:top-4' : 'bottom-14 md:bottom-4',
        )}
      >
        <div
          role="dialog"
          aria-label="Getting started tour"
          className="onboarding-roll-in pointer-events-auto w-full max-w-md rounded-2xl border border-primary/30 bg-primary text-primary-foreground shadow-2xl"
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
