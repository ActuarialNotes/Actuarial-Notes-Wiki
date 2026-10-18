import { useMemo, useState } from 'react'
import { BookOpen, HelpCircle, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarkdownText } from '@/components/MarkdownText'
import { useTutorStore } from '@/stores/tutorStore'
import type { TutorEngine } from '@/hooks/useTutorEngine'
import type { TutorActions } from '@/components/tutor/actions'
import type { TutorPlace } from '@/lib/tutor/context'
import { examHistory } from '@/lib/tutor/context'
import type { TutorItem } from '@/lib/tutor/items'
import { conceptNotes } from '@/lib/tutor/examinerNotes'
import { confusionOptions } from '@/lib/tutor/diagnosis'
import { conceptModel } from '@/lib/tutor/log'
import { daysFromTo, dueDay } from '@/lib/tutor/memory'
import { siblingsOf } from '@/lib/tutor/scheduler'
import { PHASES } from '@/lib/tutor/journey'
import { examDateLine, formatMinutes, historyLine, phaseLine, planLine } from '@/lib/tutor/copy'
import type { MasteryState } from '@/lib/mastery'

// The panel's first view (docs/tutor.md §8): a card about what is on screen,
// then today. On a concept from the syllabus the card is the concept — its
// level, when it is next due, how often CAS has asked about it, where
// candidates lose points on it — and its one primary action is *Check
// yourself*; anywhere else the primary action is the day's session.

const LEVEL_LABEL: Record<MasteryState, string> = {
  new: 'New',
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3',
  forgotten: 'Forgotten',
}

const NO_ITEMS: TutorItem[] = []

interface Props {
  engine: TutorEngine
  actions: TutorActions
  place: TutorPlace
}

function ConceptCard({ engine, actions, name }: { engine: TutorEngine; actions: TutorActions; name: string }) {
  const [confusedOpen, setConfusedOpen] = useState(false)
  const items = useMemo(() => engine.byConcept.get(name.toLowerCase()) ?? NO_ITEMS, [engine.byConcept, name])
  const c = conceptModel(engine.model, name)
  const level = engine.ladder.get(name.toLowerCase()) ?? 'new'
  const history = useMemo(() => examHistory(items, engine.items), [items, engine.items])
  const notes = useMemo(() => conceptNotes(items, 3), [items])
  const siblings = siblingsOf(engine.syllabus, name)
  const options = confusionOptions(
    name,
    engine.syllabus,
    engine.foundations.get(name.toLowerCase()) ?? [],
    new Set(items.map(i => i.kind)),
  )

  let due = 'Not checked yet'
  if (c?.memory) {
    const days = daysFromTo(engine.today, dueDay(c.memory, engine.examDate.day))
    due = days <= 0 ? 'Due for a check now' : days === 1 ? 'Next check tomorrow' : `Next check in ${days} days`
  }

  return (
    <section className="space-y-3 rounded-xl bg-muted/60 p-4" aria-label={`On screen: ${name}`}>
      <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">On screen</p>
        <h3 className="text-base font-semibold leading-snug">{name}</h3>
        <p className="text-xs text-muted-foreground">
          {/* The ladder's level, once it has one — a check banked a moment ago may not be there yet. */}
          {level !== 'new' || !c?.memory ? `${LEVEL_LABEL[level]} · ` : ''}{due}
        </p>
      </div>
      {historyLine(history) && <p className="text-sm">{historyLine(history)}</p>}
      {siblings.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Named on one syllabus line with {siblings.slice(0, 4).join(', ')}{siblings.length > 4 ? '…' : ''} — the exam asks you to tell them apart.
        </p>
      )}
      {notes.length > 0 && (
        <details className="group text-sm">
          <summary className="cursor-pointer select-none font-medium">Where candidates lose points</summary>
          <ul className="mt-2 space-y-2">
            {notes.map(n => (
              <li key={`${n.itemId}:${n.text.slice(0, 24)}`}>
                <MarkdownText className="text-sm leading-relaxed text-foreground">{n.text}</MarkdownText>
                {n.sitting && <span className="text-xs text-muted-foreground">Examiners’ report, {n.sitting}</span>}
              </li>
            ))}
          </ul>
        </details>
      )}
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">No past-paper part is tagged with this concept yet.</p>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="flex-1" onClick={() => actions.startSession({ concepts: [name] })}>
            <Play className="h-4 w-4" /> Check yourself
          </Button>
          <Button variant="outline" className="flex-1" aria-expanded={confusedOpen} onClick={() => setConfusedOpen(v => !v)}>
            <HelpCircle className="h-4 w-4" /> I’m confused
          </Button>
        </div>
      )}
      {confusedOpen && (
        <div className="space-y-1.5" role="group" aria-label="What’s confusing?">
          <p className="text-sm font-medium">What’s confusing about it?</p>
          {options.map(o => (
            <button
              key={o.reason}
              type="button"
              onClick={() => { setConfusedOpen(false); actions.confused(name, o.reason, o.concepts) }}
              className="block w-full rounded-lg bg-background px-3 py-2 text-left text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {o.label}
              {o.concepts && o.concepts.length > 0 && (
                <span className="block text-xs text-muted-foreground">{o.concepts.slice(0, 3).join(', ')}{o.concepts.length > 3 ? '…' : ''}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export function TutorNowView({ engine, actions, place }: Props) {
  const minutes = useTutorStore(s => s.settings.sessionMinutes)
  const inSyllabus = place.concept
    ? engine.syllabus.some(c => c.name.toLowerCase() === place.concept!.toLowerCase())
    : false
  const otherExamPage = place.surface === 'exam' && place.examPage !== engine.exam.pageFile
  const conceptOnScreen = place.surface === 'concept' && inSyllabus && place.concept
  const quietPhase = engine.phase === 'exam'

  return (
    <div className="space-y-4">
      {conceptOnScreen && <ConceptCard engine={engine} actions={actions} name={place.concept!} />}
      {(otherExamPage || (place.surface === 'concept' && place.concept && !inSyllabus)) && (
        <p className="rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground">
          The Tutor covers {engine.exam.label} for now. It follows you here, quietly.
        </p>
      )}

      <section className="space-y-3" aria-label="Today">
        <div className="space-y-0.5">
          <h3 className="text-base font-semibold">Today</h3>
          <p className="text-sm text-muted-foreground">{PHASES[engine.phase].purpose} {phaseLine(engine.phase, engine.daysLeft)}</p>
        </div>
        {!engine.ready ? (
          <p className="text-sm text-muted-foreground">Reading the {engine.exam.label} papers…</p>
        ) : (
          <>
            <p className="text-sm">{planLine(engine.plan)}</p>
            {engine.plan.newConcepts.length > 0 && (
              <ul className="space-y-1">
                {engine.plan.newConcepts.slice(0, 3).map(n => (
                  <li key={n}>
                    <button
                      type="button"
                      onClick={() => actions.read(n)}
                      className="inline-flex items-center gap-1.5 text-sm text-foreground underline-offset-2 hover:underline"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" /> {n}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {!quietPhase && (
              <Button
                className="w-full"
                variant={conceptOnScreen ? 'outline' : 'default'}
                onClick={() => actions.startSession()}
              >
                Start a {formatMinutes(minutes)} session
              </Button>
            )}
          </>
        )}
        <p className="text-xs text-muted-foreground">{examDateLine(engine.examDate, engine.today)}</p>
      </section>
    </div>
  )
}
