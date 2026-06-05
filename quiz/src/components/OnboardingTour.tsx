import { useEffect, useMemo, type ComponentType } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Layers,
  LogIn,
  MousePointerClick,
  Play,
  X,
} from 'lucide-react'
import { useOnboardingTour } from '@/hooks/useOnboardingTour'
import { useAuth } from '@/hooks/useAuth'

interface TourStep {
  icon: ComponentType<{ className?: string }>
  title: string
  body: string
  // Route the tour navigates to when this step becomes active. null = stay put.
  route: string | null
  // Primary button label (defaults to "Next").
  cta?: string
  // Where the primary button sends the user when finishing the tour.
  ctaRoute?: string
}

// The guided journey: study guides → concept popups → flashcards → quiz → log in.
const BASE_STEPS: TourStep[] = [
  {
    icon: GraduationCap,
    title: 'Learn how to use Actuarial Notes',
    body: 'Take a quick tour of how to study smarter here — it only takes about 30 seconds.',
    route: null,
  },
  {
    icon: BookOpen,
    title: 'Start with the Study Guides',
    body: 'Browse clear, concise notes for every concept on your exam syllabus. This is your home base.',
    route: '/wiki',
  },
  {
    icon: MousePointerClick,
    title: 'Open concept popups',
    body: 'Tap any highlighted concept link to read a focused explanation in a popup — without losing your place.',
    route: '/wiki',
  },
  {
    icon: Layers,
    title: 'Save & review flashcards',
    body: 'Add concepts to your flashcards from any popup, then review them all together right here.',
    route: '/flashcards',
  },
  {
    icon: Play,
    title: 'Test yourself with quizzes',
    body: 'Practice real exam-style questions and get instant, fully worked solutions to learn from.',
    route: '/',
  },
  {
    icon: LogIn,
    title: 'Log in to track your progress',
    body: 'Sign in to save your mastery, streaks, and study progress across all of your devices.',
    route: null,
    cta: 'Log in',
    ctaRoute: '/auth',
  },
]

export default function OnboardingTour() {
  const { active, step, autoStart, next, prev, goTo, finish } = useOnboardingTour()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Auto-launch on a first-time visitor's first render.
  useEffect(() => {
    autoStart()
  }, [autoStart])

  // Logged-in visitors don't need the final "log in" prompt; the tour ends on
  // the quiz step with a "Done" button instead.
  const steps = useMemo(
    () => (user ? BASE_STEPS.filter(s => !s.ctaRoute) : BASE_STEPS),
    [user],
  )

  const safeStep = Math.min(step, steps.length - 1)
  const current = steps[safeStep]
  const isLast = safeStep === steps.length - 1

  // Drive the route from the active step so each tip lands the user on the
  // matching page. Runs only while the tour is open.
  useEffect(() => {
    if (!active || !current?.route) return
    if (location.pathname !== current.route) {
      navigate(current.route)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, safeStep])

  if (!active || !current) return null

  const Icon = current.icon
  const primaryLabel = isLast ? current.cta ?? 'Done' : 'Next'

  function handlePrimary() {
    if (isLast) {
      finish()
      if (current.ctaRoute) navigate(current.ctaRoute)
      return
    }
    next()
  }

  return (
    <div className="fixed inset-x-0 bottom-14 md:bottom-4 z-[60] flex justify-center px-3 pointer-events-none">
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
                className={`h-1.5 rounded-full transition-all ${
                  i === safeStep ? 'w-5 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
                }`}
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
          </div>
        </div>
      </div>
    </div>
  )
}
