import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookMarked, FileText, GraduationCap, Search } from 'lucide-react'
import {
  FloatingSearchBar,
  FloatingSearchInput,
  SearchBackdrop,
  SearchScopePill,
} from '@/components/FloatingSearchBar'
import { highlightMatch } from '@/components/SearchHighlight'
import { QuestionSearchRow } from '@/components/QuestionSearchRow'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { buildStudyIndex, searchBy, type StudyIndexEntry } from '@/lib/appSearch'
import { pathToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import type { Question } from '@/lib/parser'

/**
 * The **Dashboard's top bar** — a search bar, not a wordmark.
 *
 * Below `lg` this is the row the app header used to hold (the logo and the mode
 * pill), which said what the app is called to someone already inside it and
 * offered nothing to do. The bar answers the two questions the dashboard is
 * actually a doorway to — *where is that concept?* and *where is that
 * question?* — and carries the hamburger on its own line, so the phone still
 * spends one 3.5rem row on chrome. `lib/mobileNavHost.ts` is what tells
 * `Sidebar` to stand down on this route; the two have to move together.
 *
 * The scope pills are the button the reader asks with: **Concepts** (study
 * guides included), **Resources** and **Questions**. Concepts and resources are
 * matched against the bundled exam pages rather than the wiki index — see
 * `buildStudyIndex` — and questions against the bank the Dashboard has already
 * loaded, so the bar costs no extra fetch. Whatever the bundle can't answer,
 * the foot of the results hands to the Search page.
 */

type Scope = 'concepts' | 'resources' | 'questions'

const SCOPE_LABEL: Record<Scope, string> = {
  concepts: 'Concepts',
  resources: 'Resources',
  questions: 'Questions',
}

const SCOPE_PLACEHOLDER: Record<Scope, string> = {
  concepts: 'Search concepts and study guides',
  resources: 'Search resources',
  questions: 'Search questions',
}

const RESULT_LIMIT = 20

export function DashboardSearchBar({ questions }: { questions: Question[] }) {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<Scope>('concepts')
  const [active, setActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { syllabi } = useWikiSyllabus()
  const { openAt } = useConceptPopup()

  const studyIndex = useMemo(() => buildStudyIndex(syllabi), [syllabi])

  useEffect(() => {
    if (!active) return
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) dismiss()
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') dismiss()
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [active])

  function dismiss() {
    setQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  const pageResults = useMemo(() => {
    if (scope === 'questions') return []
    const pool = studyIndex.filter(e => (scope === 'resources' ? e.kind === 'resource' : e.kind !== 'resource'))
    return searchBy(pool, query, e => [e.name, ...e.exams], RESULT_LIMIT)
  }, [studyIndex, query, scope])

  const questionResults = useMemo(() => {
    if (scope !== 'questions') return []
    return searchBy(
      questions,
      query,
      q => [q.stem, q.topic, q.exam, q.id, ...(q.parts ?? []).map(p => p.stem)],
      RESULT_LIMIT,
    )
  }, [questions, query, scope])

  const hasQuery = query.trim().length > 0
  const isExpanded = active && hasQuery
  const resultCount = scope === 'questions' ? questionResults.length : pageResults.length

  function openEntry(entry: StudyIndexEntry) {
    dismiss()
    if (entry.kind === 'concept') {
      // The dashboard already mounts the concept popup, so a concept opens
      // where the reader is rather than sending them to the study guide.
      const ref: WikiEntryRef = { kind: 'concept', name: entry.name }
      openAt([ref], 0)
      return
    }
    navigate(wikiRoute(routeRefFor(entry)))
  }

  /** Where the whole index is searched — everything this bundle can't answer. */
  function seeAllInSearch() {
    const params = new URLSearchParams({ type: scope, q: query.trim() })
    dismiss()
    navigate(`/search?${params.toString()}`)
  }

  return (
    <>
      {isExpanded && <SearchBackdrop onDismiss={dismiss} />}

      <FloatingSearchBar ref={containerRef}>
        <>
          <FloatingSearchInput
            inputRef={inputRef}
            value={query}
            onChange={setQuery}
            onFocus={() => setActive(true)}
            onClear={dismiss}
            placeholder={SCOPE_PLACEHOLDER[scope]}
            ariaLabel="Search concepts, resources and questions"
            navCollapsed={active}
          />

          {active && (
            <div className="pb-3">
              {/* The scope pills — what the query is being asked of. Shown as
                  soon as the field takes focus, so the choice is visible before
                  a word is typed rather than arriving under the first result. */}
              <div className="flex flex-wrap gap-1.5 py-2.5">
                {(Object.keys(SCOPE_LABEL) as Scope[]).map(value => (
                  <SearchScopePill key={value} active={scope === value} onClick={() => setScope(value)}>
                    {SCOPE_LABEL[value]}
                  </SearchScopePill>
                ))}
              </div>

              {hasQuery && (
                <>
                  <div className="max-h-[50vh] overflow-y-auto">
                    {resultCount === 0 ? (
                      <p className="px-2 py-2 text-xs text-muted-foreground">No matches.</p>
                    ) : scope === 'questions' ? (
                      <ul className="divide-y">
                        {questionResults.map(q => (
                          <li key={q.id} className="py-1">
                            <QuestionSearchRow question={q} query={query} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="space-y-0.5">
                        {pageResults.map(entry => (
                          <li key={`${entry.kind}:${entry.name}`}>
                            <EntryRow entry={entry} query={query} onSelect={() => openEntry(entry)} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={seeAllInSearch}
                    className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                  >
                    <Search className="h-3.5 w-3.5 shrink-0" />
                    Search all {SCOPE_LABEL[scope].toLowerCase()} for “{query.trim()}”
                  </button>
                </>
              )}
            </div>
          )}
        </>
      </FloatingSearchBar>
    </>
  )
}

/** The route an exam page or a resource opens at. */
function routeRefFor(entry: StudyIndexEntry): WikiEntryRef {
  if (entry.kind === 'exam') return { kind: 'exam', name: entry.name }
  // A syllabus links a book by its repo path, which says which Resources/
  // folder it lives in; a bare `[[Name]]` falls back to the resource route.
  const fromTarget = entry.target ? pathToEntryRef(entry.target) : null
  return fromTarget ?? { kind: 'resource', name: entry.name }
}

function EntryRow({
  entry,
  query,
  onSelect,
}: {
  entry: StudyIndexEntry
  query: string
  onSelect: () => void
}) {
  const Icon = entry.kind === 'exam' ? GraduationCap : entry.kind === 'concept' ? FileText : BookMarked
  const iconColor =
    entry.kind === 'exam' ? 'text-teal-500' : entry.kind === 'concept' ? 'text-violet-500' : 'text-muted-foreground'

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/60"
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconColor}`} aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm">{highlightMatch(entry.name, query)}</span>
        {entry.exams.length > 0 && (
          <span className="block truncate text-[11px] text-muted-foreground">{entry.exams.join(' · ')}</span>
        )}
      </span>
    </button>
  )
}
