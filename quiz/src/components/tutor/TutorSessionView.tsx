import { useCallback, useEffect, useMemo } from 'react'
import { BookOpen, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TutorPractice } from '@/components/tutor/TutorPractice'
import { TutorCharacter } from '@/components/tutor/TutorCharacter'
import { useTutorStore, type TutorSession } from '@/stores/tutorStore'
import type { TutorEngine } from '@/hooks/useTutorEngine'
import type { SelfGrade } from '@/lib/parser'
import type { Confidence } from '@/lib/tutor/memory'
import { conceptModel, introducedOn } from '@/lib/tutor/log'
import { extraPractice, kindPractice, nextStep, pickItem, type SchedulerInput, type StepReason, type TutorStep } from '@/lib/tutor/scheduler'
import { formatMinutes } from '@/lib/tutor/copy'
import type { TutorActions } from '@/components/tutor/actions'
import type { TutorCharacter as Character } from '@/lib/tutor/character'

// A practice session (docs/tutor.md §6): the scheduler's next step, one at a
// time. A focused session (Check yourself, a finding's button) serves its
// concepts first and then carries on with the day's plan; the plan's work done,
// or the session's minutes spent, it says so and offers extra practice —
// still spaced, never a repeat of this morning.

interface Props {
  engine: TutorEngine
  actions: TutorActions
  character: Character
}

function reasonFor(engine: TutorEngine, concept: string): StepReason {
  const c = conceptModel(engine.model, concept)
  if (c?.sureWrong) return 'sure-wrong'
  if (c?.confusion) return 'confused'
  if (engine.model.relearn.some(r => r.concepts.some(n => n.toLowerCase() === concept.toLowerCase()))) return 'relearn'
  return c?.memory ? 'due' : 'new'
}

export function TutorSessionView({ engine, actions, character }: Props) {
  const session = useTutorStore(s => s.session)
  const minutesTarget = useTutorStore(s => s.settings.sessionMinutes)
  const setCurrent = useTutorStore(s => s.setCurrent)
  const skipRead = useTutorStore(s => s.skipRead)
  const setExtra = useTutorStore(s => s.setExtra)
  const itemById = useMemo(() => new Map(engine.items.map(i => [i.id, i])), [engine.items])

  const computeNext = useCallback((): TutorStep => {
    const s = useTutorStore.getState().session as TutorSession
    const input: SchedulerInput = {
      ...engine.base,
      served: s.served,
      skipRead: s.skipRead,
      introducedToday: introducedOn(engine.model, engine.now),
    }
    // A focused session's concepts first, each once.
    const servedConcepts = new Set(
      s.served.flatMap(id => itemById.get(id)?.concepts ?? []).map(c => c.toLowerCase()),
    )
    for (const concept of s.focus?.concepts ?? []) {
      if (servedConcepts.has(concept.toLowerCase())) continue
      const item = pickItem(input, concept, { onlyKind: s.focus?.kind ?? null })
      if (item) return { type: 'item', item, concept, reason: reasonFor(engine, concept) }
    }
    // A session on one kind of part (the weakest kind, §7.3) serves that kind
    // until the minutes are spent.
    if (s.focus?.kind && (s.focus.concepts.length === 0 || s.extra)) {
      if (s.minutes >= minutesTarget && !s.extra) return { type: 'done' }
      return kindPractice(input, s.focus.kind)
    }
    if (s.extra) return extraPractice(input)
    if (s.minutes >= minutesTarget) return { type: 'done' }
    return nextStep(input)
  }, [engine, itemById, minutesTarget])

  // The first step, once the bank is in — and again when a page sent off to be
  // read comes back read.
  const current = session?.current ?? null
  const readConcept = current?.type === 'read' ? current.concept : null
  const readNow = readConcept ? !!conceptModel(engine.model, readConcept)?.lastReadAt : false
  // A part marked and then left (the panel closed before Next) was recorded on
  // the way out: coming back, it's done with.
  const answeredAlready = current?.type === 'item' && !!session?.currentAt
    && (engine.model.items.get(current.item.id)?.lastAt ?? '') >= session.currentAt
  useEffect(() => {
    if (!engine.ready || !session) return
    if (!current || (current.type === 'read' && readNow) || answeredAlready) setCurrent(computeNext())
  }, [engine.ready, session, current, readNow, answeredAlready, computeNext, setCurrent])

  if (!session) return null
  if (!engine.ready || !current) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-sm text-muted-foreground">
        <TutorCharacter avatarUrl={character.avatarUrl} size={48} mood="thinking" />
        Reading the {engine.exam.label} papers…
      </div>
    )
  }

  const next = () => setCurrent(computeNext())

  function graded(item: Extract<TutorStep, { type: 'item' }>, grade: SelfGrade, confidence: Confidence | null, answer: string, seconds: number) {
    actions.answer(item, grade, confidence, answer, seconds)
  }

  const progress = Math.min(1, session.minutes / minutesTarget)

  return (
    <div className="space-y-4">
      <div className="space-y-1.5" aria-live="polite">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{session.answered === 0 ? 'Just started' : `${session.answered} answered`}</span>
          <span>{formatMinutes(session.minutes)} of {formatMinutes(minutesTarget)}{session.extra ? ' · extra' : ''}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
          <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {current.type === 'read' && (
        <section className="space-y-3 rounded-xl bg-muted/60 p-4">
          <p className="text-xs font-medium text-muted-foreground">New concept</p>
          <h3 className="text-base font-semibold">{current.concept}</h3>
          <p className="text-sm text-muted-foreground">
            Read it before you're asked about it — try its worked example with the answer folded away. The check
            comes when you're back.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" onClick={() => actions.read(current.concept)}>
              <BookOpen className="h-4 w-4" /> Open the page
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => { skipRead(current.concept); next() }}>
              I know it — check me
            </Button>
          </div>
        </section>
      )}

      {current.type === 'item' && (
        <TutorPractice
          key={current.item.id}
          item={current.item}
          concept={current.concept}
          reason={current.reason}
          conceptItems={engine.byConcept.get(current.concept.toLowerCase()) ?? []}
          onGraded={(g, c, a, s) => graded(current, g, c, a, s)}
          onNext={next}
          onRead={actions.read}
        />
      )}

      {current.type === 'done' && (
        <section className="space-y-3 py-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Check className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="text-base font-semibold">
            {session.minutes >= minutesTarget && !session.extra ? `That's your ${formatMinutes(minutesTarget)}.` : 'Today’s plan is done.'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {session.answered === 0
              ? 'Nothing is due right now.'
              : `${session.answered} answered. What you missed comes back — later today if you keep going, tomorrow if not.`}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="flex-1" onClick={() => { setExtra(); setCurrent(null) }}>
              Keep going
            </Button>
            <Button className="flex-1" onClick={actions.endSession}>End session</Button>
          </div>
        </section>
      )}
    </div>
  )
}
