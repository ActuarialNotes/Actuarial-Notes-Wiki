import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Play, Wrench } from 'lucide-react'
import conceptTools from '@/data/conceptTools.json'
import { toolsForConcept, type ConceptToolIndex } from '@/lib/conceptTools'
import { questionCountFor } from '@/lib/conceptQuestionCounts'
import { latestMasteryStates } from '@/lib/mastery'
import { TOOLS_ENABLED } from '@/lib/featureFlags'
import { useAuth } from '@/hooks/useAuth'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useConceptQuestionCounts } from '@/hooks/useConceptQuestionCounts'
import { MasteryBadge } from '@/components/MasteryBadge'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/lib/utils'

/** At most this many tools are offered; a concept rarely has more than one. */
const MAX_TOOLS = 2

/**
 * What to do with a concept once it has been read (docs/design-review.md §5.6):
 * the bar at the foot of a concept page, in the popup and on the page's own
 * address alike.
 *
 * - **Practice** opens the concept's questions, the action menu's Start Quiz
 *   row brought into view. A concept with no questions shows none.
 * - **Open in <tool>** where a calculator names this concept as its method
 *   (`lib/conceptTools.ts`).
 * - The reader's level on the concept, which opens Learning Progress. Signed
 *   out there is no level to show.
 *
 * A concept with none of the three draws nothing.
 */
export function ConceptNextSteps({ concept, className }: { concept: string; className?: string }) {
  const { user } = useAuth()
  const { records } = useConceptMastery()
  const closePopup = useConceptPopup(s => s.close)
  const counts = useConceptQuestionCounts()
  const [showQuestions, setShowQuestions] = useState(false)
  const [showProgress, setShowProgress] = useState(false)

  const questions = questionCountFor(counts?.all, concept)
  // A page opened from its own tool (Learn the method) doesn't offer that tool back.
  const { pathname } = useLocation()
  const tools = useMemo(
    () => (TOOLS_ENABLED
      ? toolsForConcept(conceptTools as ConceptToolIndex, concept).filter(t => t.path !== pathname).slice(0, MAX_TOOLS)
      : []),
    [concept, pathname],
  )
  const level = useMemo(
    () => (user ? latestMasteryStates(records, new Date()).get(concept.toLowerCase()) ?? 'new' : null),
    [user, records, concept],
  )

  if (questions === 0 && tools.length === 0 && !level) return null

  return (
    <>
      <nav
        aria-label="Next steps"
        data-testid="concept-next-steps"
        className={cn('not-prose flex flex-wrap items-center gap-2 border-t border-border/60 pt-4', className)}
      >
        {questions > 0 && (
          <button
            type="button"
            onClick={() => setShowQuestions(true)}
            className={buttonVariants({ size: 'sm' })}
          >
            <Play className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            Practice
            <span className="ml-1.5 font-normal tabular-nums opacity-80">
              {questions} {questions === 1 ? 'question' : 'questions'}
            </span>
          </button>
        )}
        {tools.map(tool => (
          <Link
            key={tool.path}
            to={tool.path}
            // Leaving for the tool takes the popup's stack with it.
            onClick={() => closePopup()}
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            <Wrench className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            Open in {tool.name}
          </Link>
        ))}
        {level && (
          <button
            type="button"
            onClick={() => setShowProgress(true)}
            aria-label={`Learning Progress for ${concept}`}
            className="ml-auto inline-flex h-9 items-center gap-1 rounded-full pl-1 pr-0.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <MasteryBadge state={level} />
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        )}
      </nav>
      {showQuestions && <ConceptQuestionsModal conceptName={concept} onClose={() => setShowQuestions(false)} />}
      {showProgress && <LearningProgressModal conceptName={concept} onClose={() => setShowProgress(false)} />}
    </>
  )
}
