// A concept's questions, over the page the reader is on
// (stores/practiceOverlay.ts): a search field, the filters with Concepts
// ticked on the concept, a box on each question to pick it, and the button
// that starts a quiz on the picked ones or on so many drawn at random. The
// list is Practice's search panel (PracticeSearchPanel).

import { useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import PracticeSearchPanel from '@/components/practice/PracticeSearchPanel'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { handleResultKeys } from '@/components/search/resultKeys'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { conceptLabel, type QuestionFacet } from '@/lib/questionFilters'

const FACETS: readonly QuestionFacet[] = ['concept', 'difficulty', 'type', 'source', 'exam', 'sitting']

export default function PracticeOverlay({ concept, onClose }: { concept: string; onClose: () => void }) {
  const { questions, error } = useAllQuestions()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [facets] = useState(() => ({ concept: [conceptLabel(concept)] }))
  const label = conceptLabel(concept)

  return (
    <Popup
      onClose={onClose}
      labelledBy="practice-overlay-title"
      full
      className="gap-0 overflow-hidden !px-0 !pb-0 sm:h-[85dvh] sm:max-w-xl sm:!p-0"
    >
      <div data-testid="practice-overlay" className="flex min-h-0 flex-1 flex-col pb-[env(safe-area-inset-bottom)] sm:pb-0" onKeyDown={e => handleResultKeys(e, inputRef.current)}>
        <div className="flex shrink-0 items-center gap-2 px-5 pt-1 sm:pt-5">
          <PopupTitle id="practice-overlay-title" className="min-w-0 flex-1 truncate">Practice {label}</PopupTitle>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-6 w-6" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
        <label className="mx-5 mt-3 flex h-12 shrink-0 items-center gap-3 rounded-full border border-border bg-ground px-4 text-base transition-colors focus-within:border-foreground hover:border-foreground">
          <Search className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            aria-label="Search questions"
            placeholder="Search questions"
            value={query}
            onChange={e => setQuery(e.target.value)}
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
            className="h-full w-0 min-w-0 flex-1 bg-transparent text-[16px] text-foreground outline-none placeholder:text-foreground [&::-webkit-search-cancel-button]:hidden"
          />
        </label>
        {error ? (
          <p className="px-5 py-6 text-[16px]">{error}</p>
        ) : (
          <PracticeSearchPanel
            query={query}
            exam=""
            questions={questions}
            initialFacets={facets}
            facetsShown={FACETS}
          />
        )}
      </div>
    </Popup>
  )
}
