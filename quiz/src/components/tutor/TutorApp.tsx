import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TutorCharacter, type TutorMood } from '@/components/tutor/TutorCharacter'
import { TutorPanel } from '@/components/tutor/TutorPanel'
import type { TutorActions } from '@/components/tutor/actions'
import { useAuth } from '@/hooks/useAuth'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useIsReadingPdf } from '@/hooks/usePdfReader'
import { useTutorEngine } from '@/hooks/useTutorEngine'
import { useExamProgress } from '@/contexts/examProgress'
import { useQuizStore, recordReviewAnswers } from '@/stores/quizStore'
import { useTutorStore, type SessionFocus } from '@/stores/tutorStore'
import { isQuizInProgress } from '@/lib/quizResume'
import { trackTutorAnswer, trackTutorConfused, trackTutorOffer, trackTutorSession } from '@/lib/analytics'
import { bankRounds } from '@/lib/tutor/bank'
import { hostsConceptPopup, isQuietSurface, studyGuideHref, tutorPlace } from '@/lib/tutor/context'
import { conceptModel } from '@/lib/tutor/log'
import { BUBBLE_SECONDS, READ_DWELL_SECONDS, nextOffer } from '@/lib/tutor/moments'
import { offerLine } from '@/lib/tutor/copy'
import { elapsedDays } from '@/lib/tutor/memory'
import { tutorCharacter } from '@/lib/tutor/character'

// The Tutor, running (docs/tutor.md): the reader's own character in the
// corner — the one they dress in the Gem Shop — its bubble and its
// panel, and the four things that happen around them — watching what is on
// screen, deciding when a moment is worth a bubble, banking answers into the
// rest of the app, and carrying out what the views ask for. A lazy chunk:
// `TutorHost` loads it only for an account the Tutor is open to.

/** A page left counts for an after-reading offer this long. */
const LEFT_PAGE_MINUTES = 5
/** How often the moments are looked at, besides on every change of screen. */
const MOMENT_TICK_MS = 20_000
/** Answers banked in one go, at most. */
const BANK_EVERY = 5

function isTyping(): boolean {
  const el = document.activeElement as HTMLElement | null
  if (!el) return false
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable
}

function inFocusMode(): boolean {
  return !!document.querySelector('.concept-popup-aside[data-focus="true"]')
}

export default function TutorApp() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { updateTargetDate } = useExamProgress()
  const load = useTutorStore(s => s.load)
  // Signed out happens only in the preview build: a guest's record.
  useEffect(() => { load(user?.id ?? 'guest') }, [user?.id, load])

  const engine = useTutorEngine()
  const { exam } = engine

  // ── What is on screen ────────────────────────────────────────────────────
  const popupConcept = useConceptPopup(s => {
    if (!s.open) return null
    const page = s.pages[s.pageIndex]
    return page && page.kind === 'concept' ? page.name : null
  })
  const quizInProgress = useQuizStore(s => isQuizInProgress(s))
  const pdfOpen = useIsReadingPdf()
  const place = useMemo(
    () => tutorPlace({ pathname, popupConcept, quizInProgress, pdfOpen }),
    [pathname, popupConcept, quizInProgress, pdfOpen],
  )

  const settings = useTutorStore(s => s.settings)
  const panelOpen = useTutorStore(s => s.panelOpen)
  const bubble = useTutorStore(s => s.bubble)
  const pendingCount = useTutorStore(s => s.pending.length)
  const append = useTutorStore(s => s.append)

  const inSyllabus = useCallback(
    (name: string) => engine.syllabus.some(c => c.name.toLowerCase() === name.toLowerCase()),
    [engine.syllabus],
  )
  const servable = useCallback(
    (name: string) => (engine.byConcept.get(name.toLowerCase())?.length ?? 0) > 0,
    [engine.byConcept],
  )

  // ── Reading: a syllabus page open long enough, then left (M1, M6) ────────
  const reading = useRef<{ concept: string; since: number } | null>(null)
  const [leftPage, setLeftPage] = useState<{ concept: string; seconds: number; at: number } | null>(null)
  useEffect(() => {
    const concept = place.surface === 'concept' ? place.concept : null
    const prev = reading.current
    if (prev && prev.concept !== concept) {
      const seconds = Math.round((Date.now() - prev.since) / 1000)
      if (seconds >= READ_DWELL_SECONDS && inSyllabus(prev.concept)) {
        append({ t: 'read', at: new Date().toISOString(), concept: prev.concept, seconds })
        setLeftPage({ concept: prev.concept, seconds, at: Date.now() })
      }
      reading.current = null
    }
    if (concept && reading.current?.concept !== concept) reading.current = { concept, since: Date.now() }
  }, [place.surface, place.concept, inSyllabus, append])

  // ── Moments: is now worth a bubble? ──────────────────────────────────────
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setTick(t => t + 1), MOMENT_TICK_MS)
    return () => window.clearInterval(id)
  }, [])
  const quietSurface = isQuietSurface(place, { pdfOpen })
  useEffect(() => {
    if (!engine.ready) return
    const fresh = leftPage && Date.now() - leftPage.at < LEFT_PAGE_MINUTES * 60_000 ? leftPage : null
    const offer = nextOffer({
      now: new Date(),
      model: engine.model,
      quiet: settings.quiet || settings.hidden,
      blocked: quietSurface || isTyping() || inFocusMode() || engine.phase === 'exam',
      busy: panelOpen || bubble !== null,
      leftPage: fresh,
      servable,
      waiting: engine.plan.relearn + engine.plan.due,
      nextNew: engine.plan.newConcepts[0] ?? null,
    })
    if (!offer) return
    useTutorStore.getState().showBubble(offer)
    trackTutorOffer({ kind: offer.kind, exam: exam.label, response: 'shown' })
    if (offer.kind === 'post-read') setLeftPage(null)
  }, [tick, leftPage, engine.ready, engine.model, engine.plan, engine.phase, settings.quiet, settings.hidden, quietSurface, panelOpen, bubble, servable, exam.label])

  // A bubble folds into the dot on its own.
  useEffect(() => {
    if (!bubble) return
    const id = window.setTimeout(() => useTutorStore.setState({ bubble: null }), BUBBLE_SECONDS * 1000)
    return () => window.clearTimeout(id)
  }, [bubble])

  // ── Banking answers into mastery, XP, the streak … (lib/tutor/bank.ts) ──
  const recordsRef = useRef(engine.records)
  recordsRef.current = engine.records
  const flush = useCallback(async () => {
    const batch = useTutorStore.getState().takePending()
    if (batch.length === 0) return
    for (const round of bankRounds(batch)) {
      try {
        await recordReviewAnswers(user?.id ?? null, round.questions, round.responses, recordsRef.current, round.manualGrades)
      } catch (err) {
        console.warn('Tutor: banking answers failed:', err)
      }
    }
  }, [user?.id])
  useEffect(() => { if (pendingCount >= BANK_EVERY) void flush() }, [pendingCount, flush])
  useEffect(() => { if (!panelOpen) void flush() }, [panelOpen, flush])
  useEffect(() => {
    const onHide = () => { if (document.visibilityState === 'hidden') void flush() }
    const onPageHide = () => { void flush() }
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', onPageHide)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', onPageHide)
    }
  }, [flush])

  // ── The character's face: the account's own (lib/tutor/character.ts) ────
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined
  const character = useMemo(() => tutorCharacter(avatarUrl), [avatarUrl])
  const [pleased, setPleased] = useState(false)
  useEffect(() => {
    if (!pleased) return
    const id = window.setTimeout(() => setPleased(false), 1200)
    return () => window.clearTimeout(id)
  }, [pleased])
  const mood: TutorMood = pleased ? 'pleased' : !engine.ready ? 'thinking' : settings.quiet ? 'quiet' : 'idle'

  // ── What the views can ask for ───────────────────────────────────────────
  const actions = useMemo<TutorActions>(() => {
    const store = useTutorStore.getState
    const open = (concept: string, also?: string) => {
      store().closePanel()
      if (hostsConceptPopup(pathname)) {
        const popup = useConceptPopup.getState()
        popup.openAt([{ kind: 'concept', name: concept }], 0, pathname)
        if (also) useConceptPopup.getState().pushPage(0, { kind: 'concept', name: also })
      } else {
        navigate(studyGuideHref(exam.pageFile, concept))
      }
    }
    const startSession = (focus: SessionFocus | null = null) => store().startSession(focus)
    return {
      startSession,
      endSession: () => {
        const s = store().session
        if (s) trackTutorSession({ exam: exam.label, items: s.answered, minutes: Math.round(s.minutes), phase: engine.phase })
        store().endSession()
        useTutorStore.setState({ view: 'now' })
        // After the card on screen has unmounted — a part marked but not yet
        // moved on from is recorded on the way out — bank the lot.
        window.setTimeout(() => { void flush() }, 0)
      },
      read: concept => open(concept),
      compare: (a, b) => open(a, b),
      answer: (step, grade, confidence, answer, seconds) => {
        const { item } = step
        const before = conceptModel(engine.model, step.concept)
        const at = new Date()
        store().recordAnswer(
          { item, grade, answer, seconds },
          {
            t: 'answer', at: at.toISOString(), item: item.id, question: item.questionId, concepts: item.concepts,
            kind: item.kind, points: item.points, difficulty: item.difficulty, grade, confidence, seconds,
          },
        )
        trackTutorAnswer({
          exam: exam.label,
          kind: item.kind,
          grade,
          confidence: confidence ?? 'none',
          relearn: step.reason === 'relearn',
          days_since_last: before?.lastAnswerAt ? Math.round(elapsedDays(before.lastAnswerAt, at)) : -1,
        })
        if (step.reason === 'relearn' && grade === 'correct') setPleased(true)
      },
      confused: (concept, reason, concepts) => {
        store().flagConfusion(concept, reason)
        trackTutorConfused({ exam: exam.label, reason })
        if (reason === 'meaning') open(concept)
        else if (reason === 'difference') open(concept, concepts?.[0])
        else if (reason === 'calculation') startSession({ concepts: [concept], kind: 'calculation' })
        else if (reason === 'when') startSession({ concepts: [concept], kind: 'judgment' })
        else startSession({ concepts: [...(concepts ?? []).slice(0, 2), concept] })
      },
      setExamDate: day => updateTargetDate(exam.progressKey, day),
    }
  }, [pathname, navigate, exam, engine.model, engine.phase, flush, updateTargetDate])

  function acceptBubble() {
    const b = useTutorStore.getState().bubble
    if (!b) return
    useTutorStore.getState().answerBubble('accepted')
    trackTutorOffer({ kind: b.kind, exam: exam.label, response: 'accepted' })
    if ((b.kind === 'post-read' || b.kind === 'reading-streak') && b.concept) {
      const s = useTutorStore.getState().session
      if (s?.current?.type === 'read' && s.current.concept.toLowerCase() === b.concept.toLowerCase()) {
        useTutorStore.getState().openPanel()
      } else {
        actions.startSession({ concepts: [b.concept] })
      }
    } else {
      useTutorStore.getState().openPanel('now')
    }
  }

  function declineBubble() {
    const b = useTutorStore.getState().bubble
    if (!b) return
    useTutorStore.getState().answerBubble('declined')
    trackTutorOffer({ kind: b.kind, exam: exam.label, response: 'declined' })
  }

  const waiting = engine.ready ? engine.plan.relearn + engine.plan.due : 0

  if (settings.hidden) {
    return (
      <button
        type="button"
        onClick={() => useTutorStore.getState().setSettings({ hidden: false })}
        aria-label="Show the Tutor"
        title="Show the Tutor"
        className="paper-chrome-tutor tutor-dock fixed right-0 z-[45] flex h-12 w-5 items-center justify-center rounded-l-xl bg-card shadow-md ring-1 ring-border transition-colors hover:bg-accent"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden="true" />
        {waiting > 0 && <span className="sr-only">{waiting} waiting</span>}
      </button>
    )
  }

  return (
    <>
      {/* On a phone the open panel is a sheet over the bottom edge: the character steps aside. */}
      <div className={`paper-chrome-tutor tutor-dock pointer-events-none fixed right-4 z-[45] flex items-end gap-2 ${panelOpen ? 'max-sm:hidden' : ''}`}>
        {bubble && !panelOpen && (
          <div
            role="status"
            className="tutor-bubble pointer-events-auto mb-1 w-[min(17rem,calc(100vw-6rem))] space-y-2 rounded-2xl rounded-br-md bg-popover p-3 text-sm text-popover-foreground shadow-lg ring-1 ring-border"
          >
            <p>{offerLine(bubble, engine.plan)}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={acceptBubble}
                className="h-8 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {bubble.kind === 'arrival' ? 'Show me' : 'Yes'}
              </button>
              <button
                type="button"
                onClick={declineBubble}
                className="h-8 rounded-lg px-3 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Not now
              </button>
            </div>
          </div>
        )}
        <button
          type="button"
          data-sound={panelOpen ? 'close' : 'open'}
          onClick={() => (panelOpen ? useTutorStore.getState().closePanel() : useTutorStore.getState().openPanel())}
          aria-expanded={panelOpen}
          aria-label={waiting > 0 ? `Tutor — ${waiting} waiting` : 'Tutor'}
          title="Tutor"
          className="pointer-events-auto relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-card shadow-lg ring-1 ring-border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:scale-100"
        >
          <TutorCharacter avatarUrl={character.avatarUrl} size={44} mood={mood} />
          {waiting > 0 && !panelOpen && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground"
            >
              {waiting > 99 ? '99+' : waiting}
            </span>
          )}
        </button>
      </div>
      {panelOpen && <TutorPanel engine={engine} actions={actions} place={place} character={character} />}
    </>
  )
}
