import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Loader2, Play, X } from 'lucide-react'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { fetchWikiFile, fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question, Difficulty } from '@/lib/parser'
import { hrefToEntryRef, wikiRoute } from '@/lib/wikiRoutes'
import { LatexText } from '@/components/LatexText'
import { ExplanationPanel } from '@/components/ExplanationPanel'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { useQuestionAttempts, type QuestionAttemptSummary } from '@/hooks/useQuestionAttempts'
import { type MasteryState } from '@/lib/mastery'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

function linkMatchesConcept(link: string, conceptName: string): boolean {
  const lower = conceptName.toLowerCase()
  const ref = hrefToEntryRef(link)
  if (ref?.name.toLowerCase() === lower) return true
  const lastSegment = link.split('/').filter(Boolean).pop()
  return !!lastSegment && lastSegment.replace(/-/g, ' ').toLowerCase() === lower
}

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800',
  hard: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
}

const MASTERY_BADGE: Record<MasteryState, { label: string; className: string }> = {
  new:      { label: 'New',      className: 'bg-muted text-muted-foreground border' },
  level1:   { label: 'Level 1',  className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800 border' },
  level2:   { label: 'Level 2',  className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800 border' },
  level3:   { label: 'Level 3',  className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800 border' },
  forgotten: { label: 'Forgotten', className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800 border' },
}

type TabMode = 'definition' | 'questions' | 'syllabus'
type FilterMode = 'all' | 'new' | 'attempted'
type ConceptFilter = 'study-plan' | 'entire-syllabus'

function QuestionItem({
  question,
  attemptSummary,
  selected,
  onToggle,
}: {
  question: Question
  attemptSummary: QuestionAttemptSummary | undefined
  selected: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const hasAttempted = !!attemptSummary
  const hasCorrect = hasAttempted && attemptSummary.correct_count > 0

  return (
    <div
      className={`border rounded-lg p-4 space-y-2 transition-colors cursor-pointer ${
        selected
          ? 'border-primary/60 bg-primary/5'
          : hasAttempted
          ? hasCorrect
            ? 'border-green-200 dark:border-green-800 hover:bg-accent/30'
            : 'border-orange-200 dark:border-orange-800 hover:bg-accent/30'
          : 'hover:bg-accent/30'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="mt-0.5 shrink-0">
          <div
            className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-colors ${
              selected ? 'bg-primary border-primary' : 'border-input bg-background'
            }`}
          >
            {selected && (
              <svg className="h-2.5 w-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 12 12">
                <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 min-w-0">
            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border shrink-0">
              {question.id}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full border bg-background shrink-0">
              {question.subtopic}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 capitalize ${DIFFICULTY_COLORS[question.difficulty]}`}>
              {question.difficulty}
            </span>
            {hasAttempted && (
              <span
                title={hasCorrect ? `Correct (${attemptSummary.correct_count}/${attemptSummary.attempt_count} attempts)` : `Attempted (${attemptSummary.attempt_count}× — not yet correct)`}
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border shrink-0 ${
                  hasCorrect
                    ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800'
                    : 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800'
                }`}
              >
                {hasCorrect && <CheckCircle2 className="h-3 w-3" />}
                {hasCorrect ? 'Correct' : 'Attempted'}
              </span>
            )}
          </div>

          <div className="text-sm text-muted-foreground leading-relaxed mt-2">
            {expanded ? (
              <LatexText>{question.stem}</LatexText>
            ) : (
              <LatexText>
                {question.stem.slice(0, 160) + (question.stem.length > 160 ? '…' : '')}
              </LatexText>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {expanded && (
        <div className="pt-2 space-y-1 pl-7" onClick={e => e.stopPropagation()}>
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
            <button
              type="button"
              onClick={() => setShowAnswer(v => !v)}
              className="text-xs px-3 py-1 rounded-md border border-input hover:bg-accent transition-colors"
            >
              {showAnswer ? 'Hide answer' : 'Show answer'}
            </button>
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

interface Props {
  conceptName: string
  masteryState: MasteryState
  onClose: () => void
  syllabus?: WikiExamSyllabus
  allConcepts?: { name: string; state: MasteryState }[]
  studyPlanConcepts?: { name: string; state: MasteryState }[]
  initialConceptIndex?: number
  initialFilter?: ConceptFilter
  quizFrom?: string
}

export function ConceptDetailModal({
  conceptName,
  masteryState,
  onClose,
  syllabus,
  allConcepts,
  studyPlanConcepts,
  initialConceptIndex,
  initialFilter,
  quizFrom,
}: Props) {
  const [content, setContent] = useState<string | null>(null)
  const [contentStatus, setContentStatus] = useState<'loading' | 'error' | 'idle'>('loading')
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [questionsError, setQuestionsError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabMode>('definition')
  const [filter, setFilter] = useState<FilterMode>('all')
  const [conceptFilter, setConceptFilter] = useState<ConceptFilter>(
    initialFilter ?? (studyPlanConcepts ? 'study-plan' : 'entire-syllabus')
  )
  const [localIndex, setLocalIndex] = useState(initialConceptIndex ?? 0)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const { byQuestionId } = useQuestionAttempts()

  const effectiveConcepts = conceptFilter === 'study-plan'
    ? (studyPlanConcepts ?? allConcepts)
    : allConcepts

  const currentConceptName = effectiveConcepts?.[localIndex]?.name ?? conceptName
  const currentMasteryState = effectiveConcepts?.[localIndex]?.state ?? masteryState

  useEffect(() => {
    let cancelled = false
    setContentStatus('loading')
    setContent(null)
    fetchWikiFile(`Concepts/${currentConceptName}.md`)
      .then(raw => {
        if (cancelled) return
        setContent(raw)
        setContentStatus('idle')
      })
      .catch(() => {
        if (cancelled) return
        setContentStatus('error')
      })
    return () => { cancelled = true }
  }, [currentConceptName])

  useEffect(() => {
    let cancelled = false
    setQuestionsLoading(true)
    setQuestionsError(null)
    fetchAllQuestions()
      .then(raw => {
        if (cancelled) return
        const all = parseAllQuestions(raw)
        setQuestions(all.filter(q => q.wiki_link.some(link => linkMatchesConcept(link, currentConceptName))))
      })
      .catch(err => {
        if (cancelled) return
        setQuestionsError(err instanceof Error ? err.message : 'Failed to load questions')
      })
      .finally(() => { if (!cancelled) setQuestionsLoading(false) })
    return () => { cancelled = true }
  }, [currentConceptName])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    setActiveTab('definition')
    setFilter('all')
    setSelectedIds(new Set())
  }, [localIndex])

  useEffect(() => {
    const newList = conceptFilter === 'study-plan' ? (studyPlanConcepts ?? allConcepts) : allConcepts
    const idx = newList?.findIndex(c => c.name.toLowerCase() === currentConceptName.toLowerCase()) ?? -1
    setLocalIndex(Math.max(0, idx))
  // conceptFilter change is the trigger; currentConceptName captured at switch time
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conceptFilter])

  const navigate = useNavigate()
  const openAt = useConceptPopup(s => s.openAt)
  const badge = MASTERY_BADGE[currentMasteryState] ?? MASTERY_BADGE.new

  function openInStudyGuide() {
    openAt([{ kind: 'concept', name: currentConceptName }], 0, null)
    navigate(syllabus?.fileName
      ? wikiRoute({ kind: 'exam', name: syllabus.fileName })
      : '/wiki'
    )
    onClose()
  }

  const syllabusTopics = syllabus?.topics ?? []
  const conceptInSyllabus = syllabusTopics.some(t =>
    t.concepts.some(c => c.name.toLowerCase() === currentConceptName.toLowerCase())
  )

  const canPrev = !!effectiveConcepts && localIndex > 0
  const canNext = !!effectiveConcepts && localIndex < (effectiveConcepts?.length ?? 1) - 1
  const showFooterNav = !!effectiveConcepts && effectiveConcepts.length > 1

  const newCount = questions.filter(q => !byQuestionId.get(q.id)).length
  const attemptedCount = questions.filter(q => !!byQuestionId.get(q.id)).length

  const filteredQuestions = questions.filter(q => {
    const attempt = byQuestionId.get(q.id)
    if (filter === 'new') return !attempt
    if (filter === 'attempted') return !!attempt
    return true
  })

  // Sync selected IDs when filtered questions change (select all by default)
  useEffect(() => {
    if (!questionsLoading) {
      setSelectedIds(new Set(filteredQuestions.map(q => q.id)))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsLoading, filter, currentConceptName])

  const allSelected = filteredQuestions.length > 0 && filteredQuestions.every(q => selectedIds.has(q.id))
  const someSelected = filteredQuestions.some(q => selectedIds.has(q.id)) && !allSelected

  const toggleSelectAll = () => {
    if (allSelected || someSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredQuestions.map(q => q.id)))
    }
  }

  const toggleQuestion = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedQuestions = useMemo(
    () => filteredQuestions.filter(q => selectedIds.has(q.id)),
    [filteredQuestions, selectedIds],
  )

  function handleStartQuiz() {
    if (selectedQuestions.length === 0) return
    try {
      sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(selectedQuestions.map(q => q.id)))
    } catch { /* ignore */ }
    onClose()
    navigate('/quiz?selection=stored' + (quizFrom ? `&from=${quizFrom}` : ''))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Concept: ${currentConceptName}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-2xl flex flex-col gap-2 my-8">
        {/* Viewing filter — floats above the card */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/50 shrink-0">
          <span className="text-xs text-muted-foreground shrink-0">Viewing:</span>
          <div className="relative">
            <select
              value={studyPlanConcepts ? conceptFilter : 'entire-syllabus'}
              onChange={e => studyPlanConcepts && setConceptFilter(e.target.value as ConceptFilter)}
              disabled={!studyPlanConcepts}
              className="appearance-none text-xs border rounded-md pl-2.5 pr-6 py-1 bg-background hover:bg-accent transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-default disabled:opacity-80"
            >
              {studyPlanConcepts && (
                <option value="study-plan">
                  Study Plan — {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                </option>
              )}
              <option value="entire-syllabus">Entire Syllabus</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground ml-auto tabular-nums">
            {effectiveConcepts?.length ?? 0} concepts
          </span>
        </div>

        {/* Card */}
        <div className="w-full bg-card border rounded-xl shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 border-b shrink-0">
          <span className="flex-1 min-w-0 flex items-center gap-2 truncate">
            <span className="font-semibold text-base truncate">{currentConceptName}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${badge.className}`}>
              {badge.label}
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b shrink-0">
          {(['definition', 'questions', 'syllabus'] as TabMode[]).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'questions'
                ? `Questions (${questions.length})`
                : tab === 'definition'
                ? 'Definition'
                : 'Syllabus'}
            </button>
          ))}
        </div>

        {/* Definition tab */}
        {activeTab === 'definition' && (
          <div className="px-4 sm:px-6 pt-5 pb-6">
            {contentStatus === 'loading' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4 justify-center">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading concept…
              </div>
            )}
            {contentStatus === 'error' && (
              <p className="text-sm text-muted-foreground py-2">
                Couldn't load <span className="font-medium">{currentConceptName}</span>.
              </p>
            )}
            {content !== null && (
              <WikiArticle
                markdown={content}
                sourcePath={`Concepts/${currentConceptName}.md`}
              />
            )}
          </div>
        )}

        {/* Questions tab */}
        {activeTab === 'questions' && (
          <div className="p-4 space-y-3">
            {/* Toolbar: filter pills + select-all + start quiz */}
            <div className="flex items-center gap-2 flex-wrap">
              {!questionsLoading && filteredQuestions.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={handleStartQuiz}
                    disabled={selectedIds.size === 0}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                  >
                    <Play className="h-3 w-3" />
                    Start Quiz
                  </button>
                  <div className="flex items-center gap-1 ml-auto flex-wrap">
                    {(['all', 'new', 'attempted'] as FilterMode[]).map(mode => {
                      const label = mode === 'all'
                        ? `All (${questions.length})`
                        : mode === 'new'
                        ? `New (${newCount})`
                        : `Attempted (${attemptedCount})`
                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setFilter(mode)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            filter === mode
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border text-muted-foreground hover:text-foreground hover:bg-accent'
                          }`}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Select-all toolbar */}
            {!questionsLoading && filteredQuestions.length > 0 && (
              <div className="flex items-center gap-3 py-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    role="checkbox"
                    aria-checked={allSelected ? true : someSelected ? 'mixed' : false}
                    tabIndex={0}
                    onClick={toggleSelectAll}
                    onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') toggleSelectAll() }}
                    className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      allSelected || someSelected ? 'bg-primary border-primary' : 'border-input bg-background'
                    }`}
                  >
                    {allSelected && (
                      <svg className="h-2.5 w-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    )}
                    {someSelected && (
                      <div className="h-0.5 w-2 bg-primary-foreground rounded" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {selectedIds.size} / {filteredQuestions.length} selected
                  </span>
                </label>
              </div>
            )}

            {questionsLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4 justify-center">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading questions…
              </div>
            )}
            {questionsError && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {questionsError}
              </div>
            )}
            {!questionsLoading && !questionsError && filteredQuestions.length === 0 && (
              <div className="text-center py-6 text-muted-foreground text-sm">
                {filter === 'all'
                  ? 'No questions found for this concept.'
                  : filter === 'new'
                  ? "No new questions — you've attempted all of them."
                  : 'No attempted questions yet.'}
              </div>
            )}
            {!questionsLoading && filteredQuestions.map(q => (
              <QuestionItem
                key={q.id}
                question={q}
                attemptSummary={byQuestionId.get(q.id)}
                selected={selectedIds.has(q.id)}
                onToggle={() => toggleQuestion(q.id)}
              />
            ))}
          </div>
        )}

        {/* Syllabus tab */}
        {activeTab === 'syllabus' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                {syllabus ? `${syllabus.examLabel} · ${syllabus.examTopic}` : 'No syllabus available'}
              </p>
              <button
                type="button"
                onClick={openInStudyGuide}
                className="text-xs flex items-center gap-1 border rounded-md px-2.5 py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
                title="Open in Study Guide"
              >
                <BookOpen className="h-3 w-3" />
                Open in Study Guide
              </button>
            </div>

            {!syllabus && (
              <p className="text-sm text-muted-foreground">No syllabus context available.</p>
            )}
            {syllabus && !conceptInSyllabus && (
              <p className="text-sm text-muted-foreground">Concept not found in any syllabus topic.</p>
            )}

            {syllabusTopics.map(topic => (
              <div key={topic.name} className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">{topic.name}</h3>
                  {topic.weight && (
                    <span className="text-xs text-muted-foreground">{topic.weight}</span>
                  )}
                </div>
                <div className="space-y-1 pl-3 border-l-2 border-border">
                  {topic.concepts.map(c => {
                    const isCurrent = c.name.toLowerCase() === currentConceptName.toLowerCase()
                    return (
                      <div
                        key={c.name}
                        className={`text-sm py-0.5 px-1 rounded ${
                          isCurrent
                            ? 'bg-primary/10 text-foreground font-medium'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {c.name}
                        {isCurrent && (
                          <span className="ml-2 text-xs text-primary">(current)</span>
                        )}
                        {isCurrent && c.excerpt && (
                          <p className="text-xs text-muted-foreground mt-0.5 italic leading-snug font-normal">{c.excerpt}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Previous / Next navigation — bottom of card */}
        {showFooterNav && (
          <div className="flex items-stretch border-t h-10 shrink-0 bg-muted/10 mt-auto">
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => setLocalIndex(i => i - 1)}
              className="flex items-center justify-center gap-1.5 px-4 text-xs font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>
            <span className="flex-1 flex items-center justify-center text-xs text-muted-foreground tabular-nums">
              {localIndex + 1} of {effectiveConcepts!.length}
            </span>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setLocalIndex(i => i + 1)}
              className="flex items-center justify-center gap-1.5 px-4 text-xs font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        </div>
      </div>
    </div>
  )
}
