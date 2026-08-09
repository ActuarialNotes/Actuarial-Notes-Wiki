import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
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
  Target,
  TrendingUp,
  Trophy,
  X,
} from 'lucide-react'
import { useOnboardingTour } from '@/hooks/useOnboardingTour'
import { useAuth } from '@/hooks/useAuth'
import { useQuizStore } from '@/stores/quizStore'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useCollect } from '@/hooks/useCollect'
import { wikiRoute } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'

// The concept the tour walks the user through collecting. It must have a
// wiki-link on the Exam P syllabus page (data-wikiref below) and a page to
// read; the collect gate builds a comprehension check from it either way.
const TOUR_CONCEPT = 'Calculus'

// Route to the Exam P study guide — used as a fallback if the user lands on a
// concept step without having tapped into the exam first.
const EXAM_P_ROUTE = wikiRoute({ kind: 'exam', name: 'Exam P-1 (SOA)' })

// How long a step waits for its target to appear before it stops pretending
// there's something to tap. `optionalTarget` steps move on; the rest surface a
// Next button so a missing element can never strand the tour.
const TARGET_GRACE_MS = 4000

// The shorter grace for a target that *was* on screen and then left it (the
// modal it lived in closed, the user scrolled the screen away). We already know
// the step's UI exists, so waiting the full grace just leaves a dead card up.
const TARGET_LOST_MS = 900

// How far a tracked element may jump before the ring re-mounts at the new spot
// instead of gliding there through the CSS position transition. A ring sliding
// across the screen past unrelated controls is the "mismatched border" — a
// short hop (a list growing by a row) still animates.
const SPOTLIGHT_JUMP_PX = 120

interface TourStep {
  icon: ComponentType<{ className?: string }>
  title: string
  body: string
  // Page the step belongs to. If the user isn't there yet, we navigate here.
  path?: string
  // Predicate for "already on the right page" (defaults to exact path match).
  match?: (pathname: string) => boolean
  // CSS selector for the element to spotlight. A function is re-evaluated while
  // the step is live, so a step can follow the UI (e.g. from the answer list to
  // the Confirm button once an answer is picked).
  target?: string | (() => string)
  // 'tap'    — advance when the user taps the highlighted element.
  // 'watch'  — spotlight the target but advance when `watch()` becomes true
  //            (e.g. the user has actually answered a question).
  // 'manual' — advance via the Next / primary button. A manual step may still
  //            carry a target: it gets a spotlight, but tapping it doesn't
  //            advance the tour.
  advance: 'tap' | 'watch' | 'manual'
  // Polled predicate for 'watch' steps.
  watch?: () => boolean
  // Skip the step entirely when it's already satisfied — replaying the tour
  // shouldn't ask you to collect a card you collected months ago.
  skipIf?: () => boolean
  // The target is genuinely optional (it depends on app state we don't
  // control). Move on instead of stalling when it never shows up.
  optionalTarget?: boolean
  // Side effect to run as the step opens — used to clear leftover UI (the
  // docked concept popup) that would otherwise cover the next screen.
  onEnter?: () => void
  // Restrict a step to signed-in / signed-out visitors.
  authOnly?: boolean
  guestOnly?: boolean
  // Primary button label for manual steps (defaults to "Next").
  cta?: string
  // Where the final primary button sends the user.
  ctaRoute?: string
}

const onExam = (p: string) => p.startsWith('/wiki/exam')
const onFlashcards = (p: string) => p.startsWith('/flashcards')
const inQuiz = (p: string) => p === '/quiz'
const afterQuiz = (p: string) => p === '/review'

// Has the tour concept been collected yet? The collect gate persists to the
// collected-cards store, so this is what "the check was passed" looks like.
const collectedTourConcept = () =>
  useCollectedCards
    .getState()
    .cards.some(c => c.name.toLowerCase() === TOUR_CONCEPT.toLowerCase())

// Whether the tour concept was already in the deck when *this run* of the tour
// began. The three collect steps only have a screen to point at for someone who
// doesn't own the card yet, so on a replay they're stepped over — but they must
// not vanish mid-run just because the visitor has now collected it, or Back
// would bounce straight off them. Set once per run, in the component below.
let hadCardAtStart = false
const alreadyOwnedTourCard = () => hadCardAtStart

// The concept popup is a docked reader that deliberately survives navigation,
// so it follows the tour out of the study guide and covers the next screen.
// Steps that leave the wiki close it (and any collect modal) on the way out.
const closeReaders = () => {
  useCollect.getState().close()
  useConceptPopup.getState().close()
}

// Is this element genuinely *on screen*, not merely present in the DOM? Being
// in the document isn't enough to earn a ring: the flashcards controls bar, the
// concept popup and the collect modal all leave their buttons mounted while an
// overlay covers them, and a ring drawn around something the visitor can't see
// is the tour's worst failure — a border floating over blank space.
//
// Three tests, cheapest first: a real box, mostly inside the viewport, and a
// hit test that lands on the element rather than on whatever is stacked above
// it. The tour's own card and ring are skipped in that stack, so a target the
// card sits over still counts (the card flips to the top of the screen for it).
function isSpotlightable(el: HTMLElement, r: DOMRect): boolean {
  if (r.width < 4 || r.height < 4) return false

  const visibleW = Math.min(r.right, window.innerWidth) - Math.max(r.left, 0)
  const visibleH = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0)
  if (visibleW <= 0 || visibleH <= 0) return false
  if (visibleW * visibleH < r.width * r.height * 0.5) return false

  const style = getComputedStyle(el)
  if (style.visibility === 'hidden' || style.opacity === '0') return false

  // Sample the centre and four inset corners: a single centre probe misses on
  // ring-shaped targets (an icon button's padding, a grid's gutters).
  const points: [number, number][] = [
    [0.5, 0.5],
    [0.2, 0.2],
    [0.8, 0.2],
    [0.2, 0.8],
    [0.8, 0.8],
  ]
  for (const [fx, fy] of points) {
    const x = r.left + r.width * fx
    const y = r.top + r.height * fy
    if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) continue
    for (const node of document.elementsFromPoint(x, y)) {
      if (node.closest('[data-tour-chrome]')) continue
      if (node === el || el.contains(node)) return true
      break
    }
  }
  return false
}

// The guided journey mirrors the real study loop:
// study guide → meet a concept → collect it (comprehension gate) →
// flashcards & daily packs → level up with a quiz → mastery → keep it all.
const BASE_STEPS: TourStep[] = [
  {
    icon: GraduationCap,
    title: 'Welcome to Actuarial Notes',
    body: 'The loop is simple: collect concepts, quiz them, level them up. Here it is in about 2 minutes — follow the highlights and tap where they point.',
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
    body: 'Concepts start locked, and a locked concept can\'t level up. Tap the lock to collect this one into your deck.',
    // The collect steps live wherever the concept was opened from, so `match`
    // stays broad — but a visitor who has wandered onto another exam page has
    // nothing to tap, and `path` is where the step can find its screen again.
    path: EXAM_P_ROUTE,
    match: onExam,
    target: '[data-tour="collect-card"]',
    advance: 'tap',
    skipIf: alreadyOwnedTourCard,
  },
  {
    icon: Sparkles,
    title: 'Pass the quick check',
    body: 'Answer the short comprehension check — get it right and the card is yours.',
    path: EXAM_P_ROUTE,
    match: onExam,
    target: '[data-tour="collect-options"]',
    advance: 'watch',
    watch: collectedTourConcept,
    skipIf: alreadyOwnedTourCard,
    optionalTarget: true,
  },
  {
    icon: Layers,
    title: 'Your first card!',
    body: 'Nice — that\'s collected, and Calculus can now climb the mastery ladder. Tap View Flashcard to open your deck.',
    path: EXAM_P_ROUTE,
    match: onExam,
    target: '[data-tour="collect-view-flashcard"]',
    advance: 'tap',
    skipIf: alreadyOwnedTourCard,
    optionalTarget: true,
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
    onEnter: closeReaders,
  },
  {
    icon: LayoutGrid,
    title: 'Grab a daily pack',
    body: 'You don\'t have to collect cards one by one. Open the card controls, then tap + for search and ready-made packs — one for every exam and topic.',
    path: '/flashcards',
    match: onFlashcards,
    // The + lives in the controls bar, which is collapsed in study view — point
    // at the handle that reveals it until the bar is actually open.
    target: () =>
      document.querySelector('[data-tour="add-flashcards-btn"]')
        ? '[data-tour="add-flashcards-btn"]'
        : '[data-tour="flashcard-controls-toggle"]',
    advance: 'manual',
  },
  // ── Level up with a quiz ──
  {
    icon: Trophy,
    title: 'Turn study into points',
    body: 'Quizzes are where concepts level up and you earn XP. Tap the Quiz tab to try one.',
    path: '/flashcards',
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
    icon: Lock,
    title: 'Unlock before you drill',
    body: 'Any still-locked concept in the quiz is listed here — collect the ones you want to level up, then tap Start Quiz to begin.',
    match: inQuiz,
    target: '[data-tour="gate-start-quiz"]',
    advance: 'tap',
    optionalTarget: true,
  },
  {
    icon: MousePointerClick,
    title: 'Answer a question',
    body: 'Tap an answer, then tap it again (or Confirm Answer) to lock it in. You get a full explanation either way, and every question earns XP.',
    match: inQuiz,
    path: '/quiz',
    target: () =>
      document.querySelector('[data-tour="confirm-answer"]')
        ? '[data-tour="confirm-answer"]'
        : '[data-tour="answer-options"]',
    advance: 'watch',
    watch: () => Object.keys(useQuizStore.getState().responses).length > 0,
  },
  {
    icon: X,
    title: 'Quit the quiz',
    body: 'Normally you\'d keep going — for the tour, tap Quit quiz.',
    match: inQuiz,
    target: '[data-tour="quit-quiz"]',
    advance: 'tap',
  },
  {
    icon: RotateCcw,
    title: 'Finish & level up',
    body: 'Tap Finish quiz to bank your XP and see your results.',
    match: inQuiz,
    target: '[data-tour="dialog-finish"]',
    advance: 'tap',
    optionalTarget: true,
  },
  // ── The loop, closed ──
  {
    icon: TrendingUp,
    title: 'How mastery works',
    body: 'Each concept climbs New → 1 → 2 → 3 as you answer its questions correctly. Leave one alone too long and it fades to Forgotten — that\'s what tomorrow\'s review is for.',
    match: afterQuiz,
    advance: 'manual',
  },
  {
    icon: Target,
    title: 'Your daily plan lives here',
    body: 'The Dashboard picks what to study each day, tracks your streak and daily goal, and scores how exam-ready you are. Start here every session.',
    path: '/dashboard',
    match: p => p.startsWith('/dashboard'),
    advance: 'manual',
    authOnly: true,
    onEnter: closeReaders,
  },
  {
    icon: LogIn,
    title: 'Log in to keep it all',
    body: 'Signing in saves your cards, mastery and study history across devices — and unlocks the daily plan, streaks and quests.',
    advance: 'manual',
    guestOnly: true,
    cta: 'Log in',
    ctaRoute: '/auth',
  },
]

export default function OnboardingTour() {
  const { active, expanded, step, dir, autoStart, expand, collapse, next, prev, goTo, finish } =
    useOnboardingTour()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  // Bumped whenever the spotlight moves to a different element. It keys the
  // ring's DOM node so a jump across the screen mounts in place instead of
  // sliding there through the CSS position transition.
  const [spotKey, setSpotKey] = useState(0)
  // The step asked for a target that never showed up — fall back to a Next
  // button so a missing element can't strand the visitor mid-tour.
  const [targetMissing, setTargetMissing] = useState(false)
  // The visitor has opened the tour at least once, so the launcher stops
  // inviting ("Take the tour") and starts resuming ("Resume tour").
  const openedOnce = useRef(false)
  // One "take me to this step's page" attempt per step — see the effect below.
  const navAttempt = useRef<{ step: number; tried: boolean }>({ step: -1, tried: false })

  // Auto-launch on a first-time visitor's first render.
  useEffect(() => {
    autoStart()
  }, [autoStart])

  // Snapshot "do they already own the tour card?" as each run of the tour
  // begins. Declared before the step-driving effect so the flag is set before
  // the first step consults it. See `hadCardAtStart`.
  const wasActive = useRef(false)
  useEffect(() => {
    if (active && !wasActive.current) hadCardAtStart = collectedTourConcept()
    wasActive.current = active
  }, [active])

  useEffect(() => {
    if (expanded) openedOnce.current = true
  }, [expanded])

  const steps = useMemo(
    () => BASE_STEPS.filter(s => (user ? !s.guestOnly : !s.authOnly)),
    [user],
  )

  const safeStep = Math.min(step, steps.length - 1)
  const current = steps[safeStep]
  const isLast = safeStep === steps.length - 1

  // Drive navigation + element spotlighting for the active step. A collapsed
  // tour is inert: no navigation, no spotlight, no tap listeners.
  useEffect(() => {
    if (!active || !expanded || !current) return

    // Drop any stale spotlight immediately — before the page-guard return below.
    // Without this the previous step's ring stays frozen on-screen while React
    // Router is transitioning to the new route.
    setTargetRect(null)
    setTargetMissing(false)

    const isLastStep = safeStep >= steps.length - 1

    let cancelled = false
    let graceTimer = 0
    let watchTimer = 0
    let raf = 0

    // Already done? Step over it in whichever direction the user was heading,
    // so Back doesn't bounce straight off a satisfied step.
    if (current.skipIf?.()) {
      if (dir === -1) {
        if (safeStep > 0) prev()
        else next()
      } else if (!isLastStep) {
        next()
      }
      return
    }

    current.onEnter?.()

    // One navigation attempt per step. The effect re-runs on every route change,
    // and a step whose page bounces it straight back (a quiz step with no quiz
    // running) would otherwise navigate in a loop.
    if (navAttempt.current.step !== safeStep) navAttempt.current = { step: safeStep, tried: false }
    const goToStepPage = (): boolean => {
      if (!current.path || location.pathname === current.path || navAttempt.current.tried) return false
      navAttempt.current.tried = true
      navigate(current.path)
      return true
    }

    // Make sure we're on the step's page before looking for its target.
    const onRightPage = current.match
      ? current.match(location.pathname)
      : current.path
      ? location.pathname === current.path
      : true
    if (!onRightPage) {
      if (goToStepPage()) return
      // Nowhere to navigate (or we already tried and the route bounced): don't
      // leave the visitor holding a card that describes a screen they can't
      // reach and offers only a greyed-out Skip. Surface a real Next.
      graceTimer = window.setTimeout(() => {
        if (!cancelled) setTargetMissing(true)
      }, TARGET_GRACE_MS)
      return () => {
        cancelled = true
        clearTimeout(graceTimer)
      }
    }

    if (!current.target) return
    const selectorFor = current.target
    const selector = () => (typeof selectorFor === 'function' ? selectorFor() : selectorFor)

    let el: HTMLElement | null = null
    let lastRect: DOMRect | null = null

    const isWatch = current.advance === 'watch'
    // Once per step: a watch condition and a vanishing target can both come
    // true in the same frame, and two advances would skip a step outright.
    let advanced = false
    const advance = () => {
      if (cancelled || advanced) return
      advanced = true
      if (isLastStep) finish()
      else next()
    }

    // 'watch' steps advance on a polled condition rather than a tap — but only
    // on a false → true transition. A condition that's *already* true when the
    // step opens means the visitor did the thing before arriving (they walked
    // Back into a step they'd finished), and firing on that would bounce them
    // straight forward again with no way to re-read the step.
    if (isWatch && current.watch && !current.watch()) {
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
    // Only 'tap' steps listen — a 'manual' step can carry a spotlight without
    // its target hijacking the Next button.
    const onDocClick =
      current.advance === 'tap'
        ? (e: MouseEvent) => {
            if (cancelled) return
            const t = e.target as HTMLElement | null
            if (t && t.closest(selector())) advance()
          }
        : null
    if (onDocClick) document.addEventListener('click', onDocClick, true)

    // Several copies of a target can be mounted at once (a bottom-nav tab and
    // its hidden sidebar twin, the inline gallery and the overlay one). Prefer
    // the one the visitor can actually see and touch; fall back to any in-
    // viewport match, then to any non-zero-sized one, so a target that is only
    // scrolled out of view still gets found — and scrolled to.
    const resolve = (): HTMLElement | null => {
      let visible: HTMLElement | null = null
      let onscreen: HTMLElement | null = null
      let offscreen: HTMLElement | null = null
      for (const c of document.querySelectorAll<HTMLElement>(selector())) {
        const r = c.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) continue
        if (isSpotlightable(c, r)) {
          visible = c
          break
        }
        const midX = (r.left + r.right) / 2
        const midY = (r.top + r.bottom) / 2
        if (midX >= 0 && midX <= window.innerWidth && midY >= 0 && midY <= window.innerHeight) {
          onscreen ??= c
        } else {
          offscreen ??= c
        }
      }
      return visible ?? onscreen ?? offscreen
    }

    // The step opened at this instant; `shownAt` is the last moment the ring was
    // genuinely on screen. Both feed the grace window below, which is re-armed
    // every time the target comes and goes — a one-shot timer left a step whose
    // target vanished after it appeared with no spotlight and no way forward.
    const openedAt = performance.now()
    let shownAt = 0
    let declaredMissing = false

    // One rAF loop does every job: re-resolve the target (it can appear late,
    // be replaced, or move to a better on-screen candidate), decide whether it
    // is actually visible, track its rect, and time out when it isn't.
    const loop = () => {
      if (cancelled) return
      raf = requestAnimationFrame(loop)

      const found = resolve()
      if (found !== el) {
        el = found
        lastRect = null
        // A jump to a different element mounts the ring in place rather than
        // sliding it there through the CSS position transition.
        setSpotKey(k => k + 1)
        setTargetRect(null)
        if (found) {
          const r = found.getBoundingClientRect()
          const offscreen = r.bottom < 0 || r.top > window.innerHeight
          if (offscreen) found.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
      }

      const rect = el?.getBoundingClientRect() ?? null
      const visible = !!el && !!rect && isSpotlightable(el, rect)

      if (visible && rect) {
        shownAt = performance.now()
        if (declaredMissing) {
          declaredMissing = false
          setTargetMissing(false)
        }
        if (
          !lastRect ||
          lastRect.top !== rect.top ||
          lastRect.left !== rect.left ||
          lastRect.width !== rect.width ||
          lastRect.height !== rect.height
        ) {
          if (
            lastRect &&
            (Math.abs(rect.left - lastRect.left) > SPOTLIGHT_JUMP_PX ||
              Math.abs(rect.top - lastRect.top) > SPOTLIGHT_JUMP_PX)
          ) {
            setSpotKey(k => k + 1)
          }
          lastRect = rect
          setTargetRect(rect)
        }
        return
      }

      // Not visible: drop the ring straight away rather than leaving it behind
      // over whatever is on screen now.
      if (lastRect) {
        lastRect = null
        setTargetRect(null)
      }
      if (declaredMissing) return

      const since = shownAt || openedAt
      if (performance.now() - since < (shownAt ? TARGET_LOST_MS : TARGET_GRACE_MS)) return

      // Out of grace. A step with a page of its own gets one shot at going
      // there (the visitor may have wandered onto a different exam); an
      // optional target on a guided step means the screen it described never
      // appeared, so move on; everything else swaps Skip for Next so the
      // visitor keeps control — a manual step is never auto-advanced out from
      // under someone reading it.
      if (goToStepPage()) return
      declaredMissing = true
      if (current.optionalTarget && current.advance !== 'manual') advance()
      else setTargetMissing(true)
    }
    loop()

    return () => {
      cancelled = true
      clearTimeout(graceTimer)
      clearTimeout(watchTimer)
      cancelAnimationFrame(raf)
      if (onDocClick) document.removeEventListener('click', onDocClick, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, expanded, safeStep, location.pathname])

  if (!active || !current) return null

  const Icon = current.icon

  // ── Collapsed: a small launcher parked in the bottom-right corner ──
  if (!expanded) {
    // Mid-tour is mid-tour whether the visitor minimised it a moment ago or the
    // tab was reloaded under them and the step came back from storage.
    const resumed = openedOnce.current || safeStep > 0
    const launcherLabel = resumed
      ? `Resume the getting started tour — step ${safeStep + 1} of ${steps.length}`
      : 'Take the getting started tour'
    return (
      // Deliberately narrow: a wide pill parked in this corner sits on top of
      // whatever control the page keeps there (the quiz's Confirm Answer button,
      // for one). Icon + dismiss only, so it stays out of the app's way.
      //
      // A page with a fixed bottom action bar publishes its height as
      // `--action-bar-height` (see hooks/useActionBarHeight); ride above it so
      // the launcher can't land on the bar's primary button. Absent on pages
      // without one, where the 0px fallback leaves the old resting place.
      <div
        className={cn(
          'fixed right-3 z-[140] md:right-4 print:hidden',
          'bottom-[calc(4rem+var(--action-bar-height,0px))]',
          'md:bottom-[calc(1rem+var(--action-bar-height,0px))]',
        )}
      >
        <div className="onboarding-launcher-in flex items-center gap-0.5 rounded-full bg-primary p-1 text-primary-foreground shadow-lg ring-1 ring-black/5">
          <button
            type="button"
            onClick={expand}
            aria-label={launcherLabel}
            title={resumed ? 'Resume tour' : 'Take the tour'}
            className="onboarding-launcher-pulse relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
          >
            <Icon className="h-4 w-4" />
            {resumed && (
              <span className="absolute -right-0.5 -top-0.5 min-w-[1rem] rounded-full bg-primary-foreground px-1 text-[9px] font-bold leading-4 tabular-nums text-primary">
                {safeStep + 1}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={finish}
            aria-label="Dismiss tour"
            title="Dismiss tour"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    )
  }

  // ── Expanded: the step card, anchored to the same corner ──
  const isGuided = (current.advance === 'tap' || current.advance === 'watch') && !targetMissing
  // A step that asked for a highlight and didn't get one explains itself.
  const showMissingHint = targetMissing && (!!current.target || current.advance !== 'manual')
  const primaryLabel = isLast ? current.cta ?? 'Done' : 'Next'
  const progressPct = ((safeStep + 1) / steps.length) * 100

  // Flip the card to the top of the screen when the spotlight would sit under
  // it. The card is anchored bottom-right, so only a target that overlaps that
  // corner box forces the move.
  const cardW = Math.min(384, window.innerWidth - 24)
  // The card now rides above any fixed action bar, so the box it occupies moves
  // up by the same amount — otherwise a target just under the bar wouldn't
  // trigger the flip it still needs.
  const actionBarH =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--action-bar-height')) || 0
  const cardBox = {
    left: window.innerWidth - 12 - cardW,
    top: window.innerHeight - 280 - actionBarH,
  }
  const placeTop =
    !!targetRect &&
    targetRect.bottom > cardBox.top &&
    targetRect.right > cardBox.left

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
          key={spotKey}
          data-tour-chrome
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
        data-tour-chrome
        className={cn(
          'pointer-events-none fixed z-[140] flex justify-end px-3 print:hidden',
          'inset-x-0 md:inset-x-auto md:right-4',
          placeTop
            ? 'top-3 md:top-4'
            : 'bottom-[calc(4rem+var(--action-bar-height,0px))] md:bottom-[calc(1rem+var(--action-bar-height,0px))]',
        )}
      >
        <div
          role="dialog"
          aria-label="Getting started tour"
          className="onboarding-roll-in pointer-events-auto w-full max-w-sm rounded-2xl bg-primary text-primary-foreground shadow-2xl"
        >
          <div className="flex items-start gap-3 p-4 pr-2.5">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
              <Icon className="h-5 w-5" />
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-semibold leading-snug">{current.title}</h2>
              <p className="mt-1 text-[13px] leading-relaxed text-primary-foreground/80">{current.body}</p>
              {/* The step wanted to point at something that isn't on this
                  screen. Say so plainly rather than leaving a card describing a
                  highlight the visitor is hunting for. */}
              {showMissingHint && (
                <p className="mt-1.5 text-[12px] leading-relaxed text-primary-foreground/55">
                  That isn't on this screen right now — carry on with Next.
                </p>
              )}
            </div>

            <div className="-mr-0.5 -mt-1 flex shrink-0 items-center gap-0.5">
              <button
                type="button"
                onClick={collapse}
                aria-label="Minimize tour"
                title="Minimize"
                className="rounded-full p-1 text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={finish}
                aria-label="Dismiss tour"
                title="Dismiss"
                className="rounded-full p-1 text-primary-foreground/60 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 px-4 pb-4">
            {/* A slim bar + counter reads better than a row of 17 dots, and
                leaves the buttons room to sit on one line. */}
            <button
              type="button"
              onClick={() => goTo(Math.max(0, safeStep - 1))}
              aria-label={`Step ${safeStep + 1} of ${steps.length}`}
              className="group flex min-w-0 flex-1 items-center gap-2"
              tabIndex={-1}
            >
              <span className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-white/25">
                <span
                  className="block h-full rounded-full bg-white transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </span>
              <span className="shrink-0 text-[11px] font-medium tabular-nums text-primary-foreground/70">
                {safeStep + 1}/{steps.length}
              </span>
            </button>

            <div className="flex shrink-0 items-center gap-1">
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
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-foreground px-3.5 py-1.5 text-[13px] font-semibold text-primary shadow-sm transition-all hover:opacity-90 active:scale-95"
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
