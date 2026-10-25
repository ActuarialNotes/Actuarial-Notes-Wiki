import { useMemo, type ReactNode } from 'react'
import type { Question } from '@/lib/parser'
import {
  QUESTION_FACETS,
  facetOptions,
  ticksFor,
  toggleLevel,
  type FacetOption,
  type FacetSelection,
  type QuestionFacet,
} from '@/lib/questionFilters'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'

interface QuestionFilterBarProps {
  /** The questions being filtered — before any of these facets narrow them. */
  pool: Question[]
  selection: FacetSelection
  onToggle: (facet: QuestionFacet, value: string) => void
  /** The facets to offer, in this order. All six by default. */
  facets?: readonly QuestionFacet[]
  /**
   * A concept every question in the pool is tagged with — the concept whose
   * questions these are. Offering it as a Concepts option would narrow nothing.
   */
  omitConcept?: string
  /** A surface's own controls, drawn at the end of the row. */
  children?: ReactNode
}

const DROPDOWN_LABEL: Record<Exclude<QuestionFacet, 'difficulty'>, string> = {
  type: 'Type',
  concept: 'Concepts',
  source: 'Source',
  exam: 'Exam',
  sitting: 'Sitting',
}

const EMPTY_TITLE: Record<Exclude<QuestionFacet, 'difficulty'>, string> = {
  type: 'No questions to filter by type',
  concept: 'These questions are tagged with no other concept',
  source: 'No questions to filter by source',
  exam: 'No questions to filter by exam',
  sitting: 'None of these questions names the sitting it was set on',
}

/**
 * The filter row every list of questions carries: the Difficulty dropdown (all
 * three levels ticked until one is unticked), then the Type, Concepts, Source,
 * Exam and Sitting dropdowns. What each filter
 * means — and the counts beside every option — is `lib/questionFilters.ts`;
 * this only draws it, so a list can't offer a different set of filters from
 * the next.
 *
 * Source, Exam and Sitting are always on screen. A pool from a single exam
 * still shows the Exam filter (with that exam named on it once chosen), and a
 * pool with no dated questions shows Sitting disabled rather than dropping it
 * — a filter that comes and goes with the pool reads as one that's missing.
 */
export function QuestionFilterBar({
  pool,
  selection,
  onToggle,
  facets = QUESTION_FACETS,
  omitConcept,
  children,
}: QuestionFilterBarProps) {
  const options = useMemo(() => {
    const byFacet = {} as Record<QuestionFacet, FacetOption[]>
    for (const facet of facets) byFacet[facet] = facetOptions(pool, facet, selection)
    if (byFacet.concept && omitConcept) {
      // A label is rebuilt from a link (hyphens read as spaces), so compare
      // loosely: "Bühlmann-Straub Credibility" is the same concept either way.
      const loose = (name: string) => name.toLowerCase().replace(/-/g, ' ')
      const omit = loose(omitConcept)
      byFacet.concept = byFacet.concept.filter(o => loose(o.value) !== omit)
    }
    return byFacet
  }, [pool, selection, facets, omitConcept])

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {facets.map(facet => {
        if (facet === 'difficulty') {
          const opts = options.difficulty
          const levels = opts.map(o => o.value)
          const counts = new Map(opts.map(o => [o.value, o.count]))
          // Every level opens ticked. The store holds that as "none chosen", so
          // a tick is flipped by working out the stored set it should become and
          // toggling whatever differs (the parent's toggle flips one value).
          const toggleLevelTick = (value: string) => {
            const current = selection.difficulty
            const next = toggleLevel(current, value, levels)
            for (const v of new Set([...current, ...next])) {
              if (current.has(v) !== next.has(v)) onToggle('difficulty', v)
            }
          }
          return (
            <MultiSelectDropdown
              key="difficulty"
              label="Difficulty"
              options={opts}
              selected={ticksFor(selection.difficulty, levels)}
              onToggle={toggleLevelTick}
              getCount={value => counts.get(value) ?? 0}
              allByDefault
            />
          )
        }
        const opts = options[facet]
        // Concepts is a refinement, not a filter every list must show: a
        // concept's own questions often carry no other concept to pick.
        if (facet === 'concept' && opts.length === 0) return null
        const counts = new Map(opts.map(o => [o.value, o.count]))
        return (
          <MultiSelectDropdown
            key={facet}
            label={DROPDOWN_LABEL[facet]}
            options={opts}
            selected={selection[facet]}
            onToggle={value => onToggle(facet, value)}
            getCount={value => counts.get(value) ?? 0}
            emptyTitle={EMPTY_TITLE[facet]}
          />
        )
      })}
      {children}
    </div>
  )
}
