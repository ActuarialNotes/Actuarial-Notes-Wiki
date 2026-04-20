import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, filterQuestions } from '@/lib/parser'
import type { Question, Difficulty } from '@/lib/parser'
import { useSubtopics } from '@/hooks/useSubtopics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LatexText } from '@/components/LatexText'
import { ExplanationPanel } from '@/components/ExplanationPanel'

const EXAMS = [
  { value: '', label: 'All Exams' },
  { value: 'Probability', label: 'Exam P' },
  { value: 'Financial Mathematics', label: 'Exam FM' },
]

const DIFFICULTIES: { value: Difficulty | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200',
}

interface QuestionRowProps {
  question: Question
  selected: boolean
  onToggleSelect: (id: string) => void
}

function QuestionRow({ question, selected, onToggleSelect }: QuestionRowProps) {
  const [expanded, setExpanded] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div
      className={`border rounded-lg p-4 space-y-2 transition-colors ${
        selected ? 'border-primary bg-primary/5' : 'hover:bg-accent/30'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center flex-wrap gap-2 min-w-0">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect(question.id)}
            aria-label={`Select question ${question.id}`}
            className="h-4 w-4 shrink-0 rounded border-input accent-primary cursor-pointer"
          />
          <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border shrink-0">
            {question.id}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full border bg-background shrink-0">
            {question.topic}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full border bg-background shrink-0">
            {question.subtopic}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 capitalize ${DIFFICULTY_COLORS[question.difficulty]}`}>
            {question.difficulty}
          </span>
          {question.author && (
            <span className="text-xs text-muted-foreground shrink-0">by {question.author}</span>
          )}
          {question.year && (
            <span className="text-xs text-muted-foreground shrink-0">{question.year}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className="text-sm text-muted-foreground leading-relaxed">
        {expanded ? (
          <LatexText>{question.stem}</LatexText>
        ) : (
          <LatexText>
            {question.stem.slice(0, 160) + (question.stem.length > 160 ? '…' : '')}
          </LatexText>
        )}
      </div>

      {expanded && (
        <div className="pt-2 space-y-1">
          {question.options.map(opt => {
            const isCorrect = showAnswer && opt.key === question.answer
            return (
              <div
                key={opt.key}
                className={`flex gap-2 text-sm rounded px-2 py-1 ${
                  isCorrect ? 'bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-200' : ''
                }`}
              >
                <span className="font-medium text-muted-foreground shrink-0">{opt.key})</span>
                <span><LatexText>{opt.text}</LatexText></span>
              </div>
            )
          })}

          <div className="pt-2">
            {!showAnswer ? (
              <button
                type="button"
                onClick={() => setShowAnswer(true)}
                className="text-xs px-3 py-1 rounded-md border border-input hover:bg-accent transition-colors"
              >
                Show answer
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowAnswer(false)}
                className="text-xs px-3 py-1 rounded-md border border-input hover:bg-accent transition-colors"
              >
                Hide answer
              </button>
            )}
          </div>

          {showAnswer && (
            <ExplanationPanel
              explanation={question.explanation}
              wikiLinks={question.wiki_link}
              isCorrect
            />
          )}
        </div>
      )}
    </div>
  )
}

export default function Browse() {
  const navigate = useNavigate()
  const { byTopic: subtopicsByTopic, loading: subtopicsLoading } = useSubtopics()

  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState('')
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')
  const [authorSearch, setAuthorSearch] = useState('')
  const [yearSearch, setYearSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchAllQuestions()
      .then(raw => setAllQuestions(parseAllQuestions(raw)))
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load questions'))
      .finally(() => setLoading(false))
  }, [])

  // Reset subtopics when topic changes
  useEffect(() => {
    setSelectedSubtopics([])
  }, [topic])

  function toggleSubtopic(subtopic: string) {
    setSelectedSubtopics(prev =>
      prev.includes(subtopic) ? prev.filter(s => s !== subtopic) : [...prev, subtopic]
    )
  }

  function toggleSelectQuestion(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function clearFilters() {
    setSearch('')
    setTopic('')
    setSelectedSubtopics([])
    setDifficulty('')
    setAuthorSearch('')
    setYearSearch('')
    setSelectedIds(new Set())
  }

  const parsedYear = yearSearch ? parseInt(yearSearch, 10) : undefined
  const validYear = parsedYear && !isNaN(parsedYear) ? parsedYear : undefined

  const filtered = useMemo(() => filterQuestions(allQuestions, {
    topic: topic || undefined,
    subtopics: selectedSubtopics.length ? selectedSubtopics : undefined,
    difficulty: difficulty || undefined,
    author: authorSearch || undefined,
    year: validYear,
    search: search || undefined,
  }), [allQuestions, topic, selectedSubtopics, difficulty, authorSearch, validYear, search])

  const subtopics = topic ? (subtopicsByTopic[topic] ?? []) : []

  const hasFilters = search || topic || selectedSubtopics.length || difficulty || authorSearch || yearSearch

  function handleStartQuiz() {
    const params = new URLSearchParams({ mode: 'quiz', reveal: 'during' })

    if (selectedIds.size > 0) {
      // Handoff via sessionStorage to avoid URL length issues with large selections
      const ids = [...selectedIds]
      const storageTopic = allQuestions.find(q => selectedIds.has(q.id))?.topic ?? 'Probability'
      try {
        sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(ids))
      } catch {
        // fall back to URL when sessionStorage unavailable
        params.set('ids', ids.join(','))
      }
      params.set('selection', 'stored')
      params.set('topic', storageTopic)
      navigate(`/quiz?${params.toString()}`)
      return
    }

    if (topic) params.set('topic', topic)
    else params.set('topic', 'Probability')
    if (selectedSubtopics.length) params.set('subtopics', selectedSubtopics.join(','))
    if (difficulty) params.set('difficulty', difficulty)
    navigate(`/quiz?${params.toString()}`)
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Question Browser</h1>
        <p className="text-muted-foreground">Search and filter all practice questions</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Filters</CardTitle>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Free text search */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Search</label>
            <Input
              placeholder="Search question text or ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Exam */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Exam</label>
            <div className="flex flex-wrap gap-2">
              {EXAMS.map(exam => (
                <button
                  key={exam.value}
                  type="button"
                  onClick={() => setTopic(exam.value)}
                  className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                    topic === exam.value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-input hover:bg-accent'
                  }`}
                >
                  {exam.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subtopics — only shown when a specific exam is selected */}
          {topic && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">
                  Topics
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {selectedSubtopics.length === 0 ? '(all)' : `${selectedSubtopics.length} selected`}
                  </span>
                </label>
                {selectedSubtopics.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedSubtopics([])}
                    className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              {subtopicsLoading && subtopics.length === 0 ? (
                <p className="text-xs text-muted-foreground">Loading topics…</p>
              ) : subtopics.length === 0 ? (
                <p className="text-xs text-muted-foreground">No topics available.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {subtopics.map(subtopic => (
                    <button
                      key={subtopic}
                      type="button"
                      onClick={() => toggleSubtopic(subtopic)}
                      className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${
                        selectedSubtopics.includes(subtopic)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input hover:bg-accent'
                      }`}
                    >
                      {subtopic}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Difficulty */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Difficulty</label>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(d => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDifficulty(d.value)}
                  className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                    difficulty === d.value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-input hover:bg-accent'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Author and Year */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Author</label>
              <Input
                placeholder="e.g. SOA"
                value={authorSearch}
                onChange={e => setAuthorSearch(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Year</label>
              <Input
                placeholder="e.g. 2023"
                value={yearSearch}
                onChange={e => setYearSearch(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {loading ? 'Loading questions…' : `${filtered.length} question${filtered.length !== 1 ? 's' : ''} found`}
            {selectedIds.size > 0 && (
              <span className="ml-2 text-foreground font-medium">
                · {selectedIds.size} selected
                <button
                  type="button"
                  onClick={() => setSelectedIds(new Set())}
                  className="ml-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-normal"
                >
                  clear
                </button>
              </span>
            )}
          </p>
          {!loading && filtered.length > 0 && (
            <button
              type="button"
              onClick={handleStartQuiz}
              className="text-xs px-3 py-1.5 rounded-md border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {selectedIds.size > 0
                ? `Start quiz with ${selectedIds.size} selected`
                : 'Start quiz with this selection'}
            </button>
          )}
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading && (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="border rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2 mt-2" />
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && !error && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No questions match your filters.
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="space-y-2">
            {filtered.map(q => (
              <QuestionRow
                key={q.id}
                question={q}
                selected={selectedIds.has(q.id)}
                onToggleSelect={toggleSelectQuestion}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
