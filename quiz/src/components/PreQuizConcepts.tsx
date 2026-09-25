// The concepts a quiz is about to introduce, shown inside the Quiz page before
// the first question. There is nothing to unlock here — a New concept's card is
// collected by answering one of its questions right (docs/flashcard-collection.md)
// — so the screen is a look ahead: each row opens the concept in the popup, the
// same split pane the study guide reads one in, so a reader can brush up before
// the questions start.

import { useEffect } from 'react'
import { FileText, Play, X } from 'lucide-react'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Props {
  /** New-state concept names in this quiz (slug form — matches the mastery key). */
  concepts: string[]
  /**
   * Lower-cased keys of the concepts today's study plan is asking for
   * (`planConceptKeys`). Those get the rainbow foil border: getting them right
   * is what moves today's plan forward.
   */
  planConcepts?: Set<string>
  /** Proceed into the questions. */
  onStart: () => void
  /** Leave the quiz entirely. */
  onQuit: () => void
}

export function PreQuizConcepts({ concepts, planConcepts, onStart, onQuit }: Props) {
  const openAt = useConceptPopup(s => s.openAt)
  const popupOpen = useConceptPopup(s => s.open)

  // The popup is mounted by this screen alone, so it must not outlive it: left
  // open, the store would pop it back up over the next page that mounts one
  // (the results screen does).
  useEffect(() => () => useConceptPopup.getState().close(), [])

  const refs: WikiEntryRef[] = concepts.map(name => ({ kind: 'concept' as const, name }))
  const isInPlan = (name: string) => planConcepts?.has(name.toLowerCase()) ?? false
  const highlightedCount = concepts.filter(isInPlan).length

  return (
    <>
      <div
        className="container max-w-lg mx-auto px-4 sm:px-6 py-8"
        // Below lg the popup docks as a bottom sheet; keep the list and the
        // Start button scrollable out from under it, as the Dashboard does.
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onQuit}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Quit quiz
          </Button>
        </div>

        <Card className="ring-1 ring-primary/10 shadow-sm">
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold leading-tight">New concepts in this quiz</h2>
              <p className="text-xs text-muted-foreground">
                Get one right to collect its card.
                {highlightedCount > 0 && " Outlined concepts are in today's study plan."}
              </p>
            </div>

            <ul className="space-y-1.5">
              {concepts.map((name, i) => {
                const highlight = isInPlan(name)
                return (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => openAt(refs, i)}
                      className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left hover:bg-accent/60 transition-colors${highlight ? ' plan-foil-ring' : ''}`}
                      title={highlight ? "In today's study plan" : undefined}
                    >
                      <FileText className="h-4 w-4 shrink-0 text-violet-500" aria-hidden="true" />
                      <span className="text-sm font-medium flex-1 min-w-0 truncate">{name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="pt-1">
              <Button
                onClick={onStart}
                size="lg"
                data-tour="gate-start-quiz"
                // The *second* Start Quiz, so the second half of the launch cue:
                // `begin` counted in and stopped on one note when the quiz was
                // opened, and this is the press that finishes the phrase.
                data-sound="launch"
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                <Play className="h-4 w-4 mr-1.5" />
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <ConceptPopup />
    </>
  )
}
