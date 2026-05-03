import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Loader2, Play, X } from 'lucide-react'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { fetchWikiFile, fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question, Difficulty } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
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
  new: { label: 'New', className: 'bg-muted text-muted-foreground border' },
  learning: { label: 'Learning', className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800 border' },
  strong: { label: 'Strong', className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800 border' },
  forgotten: { label: 'Forgotten', className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800 border' },
}

type TabMode = 'definition' | 'questions' | 'syllabus'
type FilterMode = 'all' | 'new' | 'attempted'

function QuestionItem({
  question,
  attemptSummary,
}: {
  question: Question
  attemptSummary: QuestionAttemptSummary | undefined
}) {
  const [expanded, setExpanded] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const hasAttempted = !!attemptSummary
  const hasCorrect = hasAttempted && attemptSummary.correct_count > 0

  return (
    <div
      className={`border rounded-lg p-4 space-y-2 transition-colors hover:bg-accent/30 ${
        hasAttempted
          ? hasCorrect
            ? 'border-green-200 dark:border-green-800'
            : 'border-orange-200 dark:border-orange-800'
          : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
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
  initialConceptIndex?: number
}

export function ConceptDetailModal({
  conceptName,
  masteryState,
  onClose,
  syllabus,
  allConcepts,
  initialConceptIndex,
}: Props) {
  const [content, setContent] = useState<string | null>(null)
  const [contentStatus, setContentStatus] = useState<'loading' | 'error' | 'idle'>('loading')
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [questionsError, setQuestionsError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabMode>('definition')
  const [filter, setFilter] = useState<FilterMode>('all')
  const [localIndex, setLocalIndex] = useState(initialConceptIndex ?? 0)
  const { byQuestionId } = useQuestionAttempts()

  const currentConceptName = allConcepts?.[localIndex]?.name ?? conceptName
  const currentMasteryState = allConcepts?.[localIndex]?.state ?? masteryState

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
  }, [localIndex])

  const navigate = useNavigate()
  const openAt = useConceptPopup(s => s.openAt)
  const badge = MASTERY_BADGE[currentMasteryState]

  function openInStudyGuide() {
    openAt([{ kind: 'concept', name: currentConceptName }], 0, null)
    navigate('/wiki')
    onClose()
  }

  const syllabusTopicsForCurrent = syllabus
    ? syllabus.topics.filter(t =>
        t.concepts.some(c => c.name.toLowerCase() === currentConceptName.toLowerCase())
      )
    : []

  const canPrev = !!allConcepts && localIndex > 0
  const canNext = !!allConcepts && localIndex < (allConcepts?.length ?? 1) - 1
  const showFooterNav = !!allConcepts && allConcepts.length > 1

  const newCount = questions.filter(q => !byQuestionId.get(q.id)).length
  const attemptedCount = questions.filter(q => !!byQuestionId.get(q.id)).length

  const filteredQuestions = questions.filter(q => {
    const attempt = byQuestionId.get(q.id)
    if (filter === 'new') return !attempt
    if (filter === 'attempted') return !!attempt
    return true
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Concept: ${currentConceptName}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-2xl bg-card border rounded-xl shadow-2xl flex flex-col my-8">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 border-b shrink-0">
          <span className="flex-1 min-w-0 flex items-center gap-2 truncate">
            <span className="font-semibold text-sm truncate">{currentConceptName}</span>
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
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
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
          <div className="px-4 sm:px-6 py-4">
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
            {/* Filter row */}
            <div className="flex items-center gap-2">
              {!questionsLoading && filteredQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    navigate('/quiz?ids=' + filteredQuestions.map(q => q.id).join(','))
                    onClose()
                  }}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
                >
                  <Play className="h-3 w-3" />
                  Start Quiz
                </button>
              )}
              <div className="flex items-center gap-1 ml-auto">
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
            </div>

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

            {syllabusTopicsForCurrent.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {syllabus ? 'Concept not found in any syllabus topic.' : 'No syllabus context available.'}
              </p>
            )}

            {syllabusTopicsForCurrent.map(topic => (
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
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer navigation */}
        {showFooterNav && (
          <div className="flex items-stretch border-t h-14 shrink-0 bg-background/60 rounded-b-xl overflow-hidden">
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => setLocalIndex(i => i - 1)}
              className="flex-1 flex items-center justify-center gap-2 px-4 text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>
            <span className="self-center px-3 text-xs text-muted-foreground tabular-nums shrink-0">
              {localIndex + 1} of {allConcepts!.length}
            </span>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setLocalIndex(i => i + 1)}
              className="flex-1 flex items-center justify-center gap-2 px-4 text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
