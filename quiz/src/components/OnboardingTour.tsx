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
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { useOnboardingTour } from '@/hooks/useOnboardingTour'
import { useAuth } from '@/hooks/useAuth'
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
  // 'tap' steps advance when the user taps the highlighted element.
  // 'manual' steps advance via the Next / primary button.
  advance: 'tap' | 'manual'
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
    title: 'Learn how to use Actuarial Notes',
    body: 'Take a quick interactive tour — just follow the green highlights and tap where they point.',
    advance: 'manual',
  },
  // ── Study guide ──
  {
    icon: BookOpen,
    title: 'Open a study guide',
    body: 'Tap the Exam P-1 study guide to see the concepts it covers.',
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
    body: 'Tap “Add to Flashcards” to save this concept so you can review it later.',
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
    body: 'Tap the card to flip it and reveal the full explanation on the back.',
    path: '/flashcards',
    match: p => p.startsWith('/flashcards'),
    target: '[data-tour=”flip-card”]',
    advance: 'tap',
  },
  {
    icon: SlidersHorizontal,
    title: 'Change what\'s on the card',
    body: 'Tap “Back content” to switch between showing the definition, equations, or images on the back of each card.',
    match: p => p.startsWith('/flashcards'),
    target: '[data-tour=”card-content”]',
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
    body: 'Select a question count, then tap Start Quiz.',
    match: p => p === '/',
    target: '[data-tour=”start-quiz”]',
    advance: 'tap',
  },
  {
    icon: RotateCcw,
    title: 'Answer a question',
    body: 'Pick an answer — you\'ll get an instant worked explanation. Then tap Finish Quiz.',
    match: p => p === '/quiz',
    path: '/quiz',
    target: '[data-tour=”finish-quiz”]',
    advance: 'tap',
  },
  // ── Log in ──
  {
    icon: LogIn,
    title: 'Log in to track your progress',
    body: 'Sign in to save your mastery, streaks, and study progress across all your devices.',
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

    if (!current.target) {
      setTargetRect(null)
      return
    }

    let cancelled = false
    let pollTimer = 0
    let raf = 0
    let el: HTMLElement | null = null
    let lastRect: DOMRect | null = null

    const onTap = () => {
      if (!cancelled) next()
    }

    const loop = () => {
      if (cancelled) return
      if (el && !document.body.contains(el)) {
        // Element went away (e.g. menu closed) — drop it and resume polling.
        el.removeEventListener('click', onTap, true)
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
      const found = document.querySelector<HTMLElement>(current.target!)
      if (found) {
        el = found
        found.addEventListener('click', onTap, true)
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
      cancelAnimationFrame(raf)
      if (el) el.removeEventListener('click', onTap, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, safeStep, location.pathname])

  if (!active || !current) return null

  const Icon = current.icon
  const isTap = current.advance === 'tap'
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
          className="onboarding-roll-in pointer-events-auto w-full max-w-md rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-2xl"
        >
          <div className="flex items-start gap-3 p-4 pr-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
              <Icon className="h-5 w-5" />
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-semibold leading-snug">{current.title}</h2>
              <p className="mt-1 text-[13px] leading-relaxed text-emerald-50/90">{current.body}</p>
            </div>

            <button
              type="button"
              onClick={finish}
              aria-label="Dismiss tour"
              title="Dismiss"
              className="-mr-1 -mt-1 shrink-0 rounded-full p-1 text-emerald-50/70 transition-colors hover:bg-white/10 hover:text-white"
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
                  className="rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-emerald-50/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Back
                </button>
              )}
              {isTap ? (
                <span className="inline-flex items-center gap-2">
                  <span className="text-[12px] font-medium text-emerald-50/80">Tap the highlight</span>
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-emerald-50/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Skip
                  </button>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handlePrimary}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-[13px] font-semibold text-emerald-700 shadow-sm transition-transform hover:bg-emerald-50 active:scale-95"
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
