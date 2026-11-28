import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TutorCharacter, type TutorMood } from '@/components/tutor/TutorCharacter'
import { TutorPanel } from '@/components/tutor/TutorPanel'
import { TutorPractice } from '@/components/tutor/TutorPractice'
import { useAuth } from '@/hooks/useAuth'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useIsReadingPdf } from '@/hooks/usePdfReader'
import { useTutorEngine } from '@/hooks/useTutorEngine'
import { useQuizStore, recordReviewAnswers } from '@/stores/quizStore'
import { useTutorStore, type ItemStep } from '@/stores/tutorStore'
import { questionCredit, type SelfGrade } from '@/lib/parser'
import { isQuizInProgress } from '@/lib/quizResume'
import { trackTutorAnswer, trackTutorOffer } from '@/lib/analytics'
import { bankRounds } from '@/lib/tutor/bank'
import { hostsConceptPopup, isQuietSurface, studyGuideHref, tutorPlace } from '@/lib/tutor/context'
import { conceptModel } from '@/lib/tutor/log'
import { BUBBLE_SECONDS, READ_DWELL_SECONDS, nextOffer } from '@/lib/tutor/moments'
import { afterReadingLine, reasonOf, tutorSays, type TutorAct, type TutorLine } from '@/lib/tutor/says'
import { pickItem } from '@/lib/tutor/scheduler'
import { elapsedDays, type Confidence } from '@/lib/tutor/memory'
import { tutorCharacter } from '@/lib/tutor/character'

// The Tutor, running (docs/tutor.md): the reader's own character in the
// corner — the one they dress in the Gem Shop. Tapped, it says one thing about
// what is on screen and offers at most one thing to do about it
// (lib/tutor/says.ts); that thing is one past-paper part, answered in the
// bubble grown to a panel, or a page to read. Around that: watching what is on
// screen, the one moment it speaks unasked (a syllabus page just read), and
// banking answers into the rest of the app. A lazy chunk: `TutorHost` loads it
// only for an account the Tutor is open to.

/** A page left counts for an after-reading offer this long. */
const LEFT_PAGE_MINUTES = 5
/** How often the moments are looked at, besides on every change of screen. */
const MOMENT_TICK_MS = 20_000
/** Answers banked in one go, at most. */
const BANK_EVERY = 5

const NO_CONCEPTS: string[] = []

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
  const current = useTutorStore(s => s.current)
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
    })
    if (!offer) return
    useTutorStore.getState().showBubble(offer)
    trackTutorOffer({ kind: offer.kind, exam: exam.label, response: 'shown' })
    setLeftPage(null)
  }, [tick, leftPage, engine.ready, engine.model, engine.phase, settings.quiet, settings.hidden, quietSurface, panelOpen, bubble, servable, exam.label])

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
        await recordReviewAnswers(user?.id ?? null, round.questions, round.responses, recordsRef.current, round.manualGrades, { source: 'tutor', partLabels: round.partLabels })
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

  // ── The one thing it says (lib/tutor/says.ts) ────────────────────────────
  // After a quiz, the concepts it lost points on, in question order.
  const quizStatus = useQuizStore(s => s.status)
  const missed = useMemo(() => {
    if (place.surface !== 'review' || quizStatus !== 'complete') return NO_CONCEPTS
    const { questions, responses, manualGrades } = useQuizStore.getState()
    const lost = new Set(
      questions.filter(q => questionCredit(q, responses[q.id]?.chosen ?? '', manualGrades) < 1).map(q => q.id),
    )
    return [...new Set(engine.items.filter(i => lost.has(i.questionId)).flatMap(i => i.concepts))]
  }, [place.surface, quizStatus, engine.items])

  const today = engine.today
  const line = useMemo<TutorLine>(() => {
    if (bubble?.concept) return afterReadingLine(bubble.concept, reasonOf(engine.model, bubble.concept, today, engine.examDate.day))
    return tutorSays({
      place,
      ready: engine.ready,
      examLabel: exam.label,
      examPage: exam.pageFile,
      base: engine.base,
      findings: engine.findings,
      missed,
    })
  }, [bubble, place, engine.ready, engine.model, engine.base, engine.findings, engine.examDate.day, today, exam, missed])

  // A part marked and then left (the Tutor closed before Next) was recorded on
  // the way out: it's done with.
  useEffect(() => {
    if (panelOpen || !current) return
    if ((engine.model.items.get(current.step.item.id)?.lastAt ?? '') >= current.at) useTutorStore.getState().setCurrent(null)
  }, [panelOpen, current, engine.model])

  // Opened to say one thing about a page, it folds when the reader moves on.
  useEffect(() => {
    const s = useTutorStore.getState()
    if (s.panelOpen && !s.current) s.closePanel()
  }, [pathname])

  const read = useCallback((concept: string) => {
    useTutorStore.getState().closePanel()
    if (hostsConceptPopup(pathname)) {
      useConceptPopup.getState().openAt([{ kind: 'concept', name: concept }], 0, pathname)
    } else {
      navigate(studyGuideHref(exam.pageFile, concept))
    }
  }, [pathname, navigate, exam.pageFile])

  function doAct(act: TutorAct) {
    const b = useTutorStore.getState().bubble
    if (b) {
      useTutorStore.getState().answerBubble('accepted')
      trackTutorOffer({ kind: b.kind, exam: exam.label, response: 'accepted' })
    }
    if (act.type === 'read') return read(act.concept)
    const { served, setCurrent } = useTutorStore.getState()
    const item = (act.item ? engine.items.find(i => i.id === act.item) : null)
      ?? pickItem({ ...engine.base, served }, act.concept)
    if (item) setCurrent({ type: 'item', item, concept: act.concept, reason: act.reason })
  }

  function declineBubble() {
    const b = useTutorStore.getState().bubble
    if (!b) return
    useTutorStore.getState().answerBubble('declined')
    trackTutorOffer({ kind: b.kind, exam: exam.label, response: 'declined' })
  }

  function close() {
    useTutorStore.getState().closePanel()
    // After the card on screen has unmounted — a part marked but not yet
    // moved on from is recorded on the way out — bank the lot.
    window.setTimeout(() => { void flush() }, 0)
  }

  function recordAnswer(step: ItemStep, grade: SelfGrade, confidence: Confidence | null, answer: string, seconds: number) {
    const { item } = step
    const before = conceptModel(engine.model, step.concept)
    const at = new Date()
    useTutorStore.getState().recordAnswer(
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
  }

  // A quiz or a battle has the whole screen and its own clock: the Tutor isn't there.
  if (place.surface === 'quiz' || place.surface === 'battle') return null

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
      </button>
    )
  }

  const part = panelOpen ? current : null
  const speaking = !part && (panelOpen || bubble !== null)

  return (
    <>
      {/* On a phone an open part is a sheet over the bottom edge: the character steps aside. */}
      <div className={`paper-chrome-tutor tutor-dock pointer-events-none fixed right-4 z-[45] flex items-end gap-2 ${part ? 'max-sm:hidden' : ''}`}>
        {speaking && (
          <aside
            role="complementary"
            aria-label="Tutor"
            aria-live="polite"
            onKeyDown={e => {
              if (e.key !== 'Escape') return
              e.stopPropagation()
              if (bubble) declineBubble()
              else close()
            }}
            className="tutor-bubble pointer-events-auto mb-1 w-[min(18rem,calc(100vw-6rem))] space-y-3 rounded-2xl rounded-br-md bg-popover p-4 text-popover-foreground shadow-lg ring-1 ring-border"
          >
            <p className="text-sm leading-relaxed">{line.text}</p>
            {(line.act || bubble) && (
              <div className="flex flex-wrap gap-2">
                {line.act && (
                  <button
                    type="button"
                    onClick={() => doAct(line.act!)}
                    className="h-9 rounded-lg bg-primary px-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {line.act.label}
                  </button>
                )}
                {bubble && (
                  <button
                    type="button"
                    onClick={declineBubble}
                    className="h-9 rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Not now
                  </button>
                )}
              </div>
            )}
          </aside>
        )}
        <button
          type="button"
          data-sound={panelOpen ? 'close' : 'open'}
          onClick={() => (panelOpen ? close() : useTutorStore.getState().openPanel())}
          aria-expanded={panelOpen}
          aria-label="Tutor"
          title="Tutor"
          className="pointer-events-auto relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-card shadow-lg ring-1 ring-border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:scale-100"
        >
          <TutorCharacter avatarUrl={character.avatarUrl} size={44} mood={mood} />
        </button>
      </div>
      {part && (
        <TutorPanel character={character} onClose={close}>
          <TutorPractice
            key={part.step.item.id}
            item={part.step.item}
            concept={part.step.concept}
            reason={part.step.reason}
            conceptItems={engine.byConcept.get(part.step.concept.toLowerCase()) ?? []}
            onGraded={(grade, confidence, answer, seconds) => recordAnswer(part.step, grade, confidence, answer, seconds)}
            onNext={() => useTutorStore.getState().setCurrent(null)}
            onRead={read}
          />
        </TutorPanel>
      )}
    </>
  )
}
