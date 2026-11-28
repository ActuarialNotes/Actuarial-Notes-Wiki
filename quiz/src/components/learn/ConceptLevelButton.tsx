// A concept's level as a button (docs/redesign-spec.md §7.2): the level square
// and "Level 2", opening Learning Progress. It replaces the Learning Progress
// row of the menu a concept's title used to open.

import { useMemo, useState } from 'react'
import { LevelSquare } from '@/components/LevelSquare'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import { cn } from '@/lib/utils'

/** The reader's level on a concept today; New with no record. */
export function useConceptLevel(conceptName: string): MasteryState {
  const { records } = useConceptMastery()
  return useMemo(() => {
    const lower = conceptName.toLowerCase()
    const record = records.find(r => r.concept_slug.toLowerCase() === lower)
    return record ? decayIfStale(record, new Date()).state : 'new'
  }, [records, conceptName])
}

export function ConceptLevelButton({ conceptName, examFile, className }: { conceptName: string; examFile?: string | null; className?: string }) {
  const level = useConceptLevel(conceptName)
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${MASTERY_LABEL[level]}. Open Learning Progress`}
        data-testid="concept-level"
        className={cn(
          'inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-foreground px-3.5 text-[15px] font-semibold text-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
      >
        <LevelSquare state={level} size="sm" decorative />
        {MASTERY_LABEL[level]}
      </button>
      {open && <LearningProgressModal conceptName={conceptName} examFile={examFile} onClose={() => setOpen(false)} />}
    </>
  )
}
