import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { filterQuestions } from '@/lib/parser'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { QuestionSearchRow } from '@/components/QuestionSearchRow'

export function QuizFloatingSearch() {
  const navigate = useNavigate()
  const { questions: allQuestions } = useAllQuestions()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!active) return
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [active])

  function closeDropdown() {
    setQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  function toggleSelect(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleStartQuiz() {
    const ids = [...selectedIds]
    const storageTopic = allQuestions.find(q => selectedIds.has(q.id))?.topic ?? 'Probability'
    try {
      sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(ids))
    } catch { /* ignore */ }
    navigate(`/quiz?mode=quiz&selection=stored&topic=${encodeURIComponent(storageTopic)}&reveal=during&from=browse`)
    setSelectedIds(new Set())
    closeDropdown()
  }

  const hasQuery = query.trim().length > 0
  const isExpanded = active && hasQuery

  const questionResults = useMemo(() => {
    const q = query.trim()
    if (!q) return []
    return filterQuestions(allQuestions, { search: q }).slice(0, 20)
  }, [allQuestions, query])

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onMouseDown={e => { e.preventDefault(); closeDropdown() }}
        />
      )}

      <div
        ref={containerRef}
        className="sticky top-14 lg:top-0 z-50 border-b bg-background/90 backdrop-blur-md"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Input row */}
          <div className="flex items-center gap-2 h-14">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setActive(true)}
              placeholder="Search questions…"
              className="flex-1 min-w-0 bg-transparent border-0 focus:outline-none text-[16px] sm:text-sm text-foreground placeholder:text-muted-foreground"
              aria-label="Search questions"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                type="button"
                onClick={closeDropdown}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Selection bar — shown when selections exist and dropdown is closed */}
          {!isExpanded && selectedIds.size > 0 && (
            <div className="flex items-center justify-between gap-3 border-t py-2">
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{selectedIds.size}</span> question{selectedIds.size !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedIds(new Set())}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  clear
                </button>
                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="px-4 py-1.5 rounded-full border border-primary bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Quiz →
                </button>
              </div>
            </div>
          )}

          {/* Dropdown — only when query is non-empty */}
          {isExpanded && (
            <div className="border-t pb-3">
              <div className="space-y-2 max-h-[50vh] overflow-y-auto pt-2">
                {questionResults.length === 0 ? (
                  <p className="text-xs text-muted-foreground px-2 py-2">No questions found.</p>
                ) : (
                  questionResults.map(q => (
                    <QuestionSearchRow
                      key={q.id}
                      question={q}
                      query={query}
                      selected={selectedIds.has(q.id)}
                      onToggleSelect={toggleSelect}
                    />
                  ))
                )}
              </div>

              {/* Start Quiz button — shown when questions are selected */}
              {selectedIds.size > 0 && (
                <div className="border-t mt-2 pt-2">
                  <button
                    type="button"
                    onClick={handleStartQuiz}
                    className="w-full px-4 py-2 rounded-md border border-primary bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Start Quiz with {selectedIds.size} selected →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
