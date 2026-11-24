// Practice's search (docs/redesign-spec.md §7a): a field under the top row
// that searches questions only, opening on the exam the page shows. Its panel
// opens as soon as the field is entered, on that exam's questions and their
// filters, and typing narrows them; it is laid over the page, under the field,
// as Learn's search is, and nothing navigates until a question is opened or a
// quiz is started. The results are a chunk of their own (PracticeSearchPanel),
// fetched when the field is first used.
//
// The page under the panel is held still while it is open, and the panel is
// as tall as the room between the field and the foot of the screen (or the
// keyboard), so there is one thing to scroll. What was typed and filtered is
// kept for this history entry: coming Back from a question finds the panel as
// it was left.

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { SearchBackdrop } from '@/components/FloatingSearchBar'
import { handleResultKeys } from '@/components/search/resultKeys'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useSearchTracking } from '@/hooks/useSearchTracking'
import type { Question } from '@/lib/parser'
import { cn } from '@/lib/utils'

const loadPanel = () => import('@/components/practice/PracticeSearchPanel')
const PracticeSearchPanel = lazy(loadPanel)

const MEMORY_KEY = 'actuarial_practice_search'

/** What the panel held when it was left, for the history entry it was left on. */
export interface PracticeSearchMemory {
  /** The history entry it was left on (`entryId`). */
  entry: string
  exam: string
  query: string
  /** Each filter's chosen values, by the filter's name. */
  facets: Record<string, string[]>
}

/**
 * A name for the history entry the page is on. The router gives every entry a
 * key but the one a visit starts on, which is known by its place in the
 * history instead (the `idx` the router stamps on its state).
 */
function entryId(key: string): string {
  if (key !== 'default') return key
  const idx = (window.history.state as { idx?: unknown } | null)?.idx
  return `first:${typeof idx === 'number' ? idx : 0}`
}

function readMemory(entry: string, exam: string): PracticeSearchMemory | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(MEMORY_KEY) ?? 'null') as PracticeSearchMemory | null
    if (!value || value.entry !== entry || value.exam !== exam || typeof value.query !== 'string') return null
    return { ...value, facets: value.facets && typeof value.facets === 'object' ? value.facets : {} }
  } catch {
    return null
  }
}

function writeMemory(memory: PracticeSearchMemory | null): void {
  try {
    if (memory) sessionStorage.setItem(MEMORY_KEY, JSON.stringify(memory))
    else sessionStorage.removeItem(MEMORY_KEY)
  } catch { /* not kept */ }
}

/** The least room the panel is given, however little the screen has left. */
const MIN_PANEL_HEIGHT = 220

export function PracticeSearch({ exam, questions, className }: {
  /** The bank the page shows (a question's `exam`), which the Exam filter starts on. */
  exam: string
  questions: Question[]
  className?: string
}) {
  const { key } = useLocation()
  const [entry] = useState(() => entryId(key))
  const [memory] = useState(() => readMemory(entry, exam))
  const [query, setQuery] = useState(memory?.query ?? '')
  const [open, setOpen] = useState(memory !== null)
  const facetsRef = useRef<Record<string, string[]>>(memory?.facets ?? {})
  const inputRef = useRef<HTMLInputElement>(null)
  const fieldRef = useRef<HTMLLabelElement>(null)
  useSearchTracking(query)
  useBodyScrollLock(open)

  useEffect(() => {
    if (open) void loadPanel()
  }, [open])

  // Kept as it changes, so leaving by a question's link has nothing to save.
  const remember = useCallback((nextQuery: string) => {
    writeMemory({ entry, exam, query: nextQuery, facets: facetsRef.current })
  }, [entry, exam])
  const onFacets = useCallback((facets: Record<string, string[]>) => {
    facetsRef.current = facets
    writeMemory({ entry, exam, query: inputRef.current?.value ?? '', facets })
  }, [entry, exam])

  const dismiss = useCallback(() => {
    setQuery('')
    setOpen(false)
    facetsRef.current = {}
    writeMemory(null)
    inputRef.current?.blur()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, dismiss])

  // The room under the field, down to the foot of what can be seen: the
  // screen's, or the keyboard's top when one is up.
  const [room, setRoom] = useState<number | null>(null)
  useEffect(() => {
    if (!open) return
    const measure = () => {
      const field = fieldRef.current
      if (!field) return
      const view = window.visualViewport
      const foot = view ? view.offsetTop + view.height : window.innerHeight
      setRoom(Math.max(MIN_PANEL_HEIGHT, Math.floor(foot - field.getBoundingClientRect().bottom - 20)))
    }
    measure()
    window.addEventListener('resize', measure)
    window.visualViewport?.addEventListener('resize', measure)
    window.visualViewport?.addEventListener('scroll', measure)
    return () => {
      window.removeEventListener('resize', measure)
      window.visualViewport?.removeEventListener('resize', measure)
      window.visualViewport?.removeEventListener('scroll', measure)
    }
  }, [open])

  return (
    <>
      {open && <SearchBackdrop onDismiss={dismiss} />}
      <div
        className={cn('relative', open && 'z-50', className)}
        data-testid="practice-search"
        onKeyDown={e => handleResultKeys(e, inputRef.current)}
      >
        <label
          ref={fieldRef}
          className={cn(
            'flex h-12 items-center gap-3 rounded-full border bg-ground pl-4 pr-1.5 text-base transition-colors focus-within:border-foreground hover:border-foreground',
            open ? 'border-foreground' : 'border-border',
          )}
        >
          <Search className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            aria-label="Search questions"
            placeholder="Search questions"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); remember(e.target.value) }}
            onFocus={() => { setOpen(true); remember(query) }}
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
            className="h-full w-0 min-w-0 flex-1 bg-transparent text-[16px] text-foreground outline-none placeholder:text-foreground [&::-webkit-search-cancel-button]:hidden"
          />
          {open && (
            <button
              type="button"
              // With words in the field it empties it; with none it closes the panel.
              aria-label={query ? 'Clear' : 'Close'}
              onClick={() => {
                if (!query) { dismiss(); return }
                setQuery('')
                remember('')
                inputRef.current?.focus()
              }}
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
            style={{ maxHeight: room ?? undefined }}
            className="absolute inset-x-0 top-full mt-2 flex max-h-[min(70dvh,34rem)] flex-col rounded-2xl border-[1.5px] border-foreground bg-ground"
          >
            <Suspense fallback={<p className="px-4 py-6 text-[16px]" aria-live="polite">Loading the questions…</p>}>
              <PracticeSearchPanel
                query={query}
                exam={exam}
                questions={questions}
                initialFacets={memory?.facets}
                onFacets={onFacets}
              />
            </Suspense>
          </div>
        )}
      </div>
    </>
  )
}
