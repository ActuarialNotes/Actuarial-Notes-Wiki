// Practice's search (docs/redesign-spec.md §7a): a field under the top row
// that searches questions only, opening on the exam the page shows. What it
// finds is laid over the page, under the field, as Learn's search is; nothing
// navigates until a question is opened or a quiz is started. The results are a
// chunk of their own (PracticeSearchPanel), fetched when the field is first used.

import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { SearchBackdrop } from '@/components/FloatingSearchBar'
import { useSearchTracking } from '@/hooks/useSearchTracking'
import type { Question } from '@/lib/parser'
import { cn } from '@/lib/utils'

const loadPanel = () => import('@/components/practice/PracticeSearchPanel')
const PracticeSearchPanel = lazy(loadPanel)

export function PracticeSearch({ exam, questions, className }: {
  /** The bank the page shows (a question's `exam`), which the Exam filter starts on. */
  exam: string
  questions: Question[]
  className?: string
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useSearchTracking(query)

  const open = active && query.trim() !== ''
  const dismiss = () => {
    setQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setQuery('')
      setActive(false)
      inputRef.current?.blur()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {open && <SearchBackdrop onDismiss={dismiss} />}
      <div className={cn('relative', open && 'z-50', className)} data-testid="practice-search">
        <label className="flex h-12 items-center gap-3 rounded-full border border-border bg-ground pl-4 pr-1.5 text-base transition-colors focus-within:border-foreground hover:border-foreground">
          <Search className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            aria-label="Search questions"
            placeholder="Search questions"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => { setActive(true); void loadPanel() }}
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
            className="h-full w-0 min-w-0 flex-1 bg-transparent text-[16px] text-foreground outline-none placeholder:text-foreground [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear"
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            </button>
          )}
        </label>

        {open && (
          <div
            role="region"
            aria-label="Search results"
            data-testid="practice-search-results"
            className="absolute inset-x-0 top-full mt-2 flex max-h-[min(70dvh,34rem)] flex-col rounded-2xl border-[1.5px] border-foreground bg-ground"
          >
            <Suspense fallback={<p className="px-4 py-6 text-[16px]" aria-live="polite">Searching…</p>}>
              <PracticeSearchPanel query={query} exam={exam} questions={questions} />
            </Suspense>
          </div>
        )}
      </div>
    </>
  )
}
