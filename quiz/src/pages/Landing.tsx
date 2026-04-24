import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress, EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useSubtopics } from '@/hooks/useSubtopics'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { filterQuestions } from '@/lib/parser'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { QuizMode, Difficulty } from '@/lib/parser'

const EXAMS = [
  { value: 'Probability', label: 'Exam P — Probability' },
  { value: 'Financial Mathematics', label: 'Exam FM — Financial Mathematics' },
]

// Question counts that mirror each real exam
const MOCK_EXAM_QUESTIONS: Record<string, number> = {
  'Probability': 30,
  'Financial Mathematics': 35,
}

const DIFFICULTIES: { value: Difficulty | ''; label: string }[] = [
  { value: '', label: 'All Levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const examProgress = useExamProgress()
  const { byTopic: subtopicsByTopic, loading: subtopicsLoading } = useSubtopics()
  const { questions: allQuestions } = useAllQuestions()

  const inProgressExams = EXAMS.filter(e => {
    const examId = Object.entries(EXAM_ID_TO_TOPIC).find(([, t]) => t === e.value)?.[0]
    return examId ? examProgress[examId] === 'in_progress' : false
  })
  const otherExams = EXAMS.filter(e => !inProgressExams.includes(e))
  const hasInProgress = inProgressExams.length > 0

  const [topic, setTopic] = useState('')
  const [mode, setMode] = useState<QuizMode>('quiz')
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')
  const [showOther, setShowOther] = useState(!hasInProgress)

  // Quiz-specific options
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([])
  const [count, setCount] = useState<number>(10)
  const [reveal, setReveal] = useState<'during' | 'end'>('during')

  // Pre-select first in-progress exam when progress loads
  useEffect(() => {
    if (inProgressExams.length > 0) {
      setTopic(inProgressExams[0].value)
      setShowOther(false)
    }
  }, [examProgress.P, examProgress.FM])  // eslint-disable-line react-hooks/exhaustive-deps

  // Reset subtopic selection when exam topic or mode changes — mock-exam ignores
  // subtopic filters, so leaving stale chips selected is misleading.
  useEffect(() => {
    setSelectedSubtopics([])
  }, [topic, mode])

  // Compute available question count for the current filters
  const availableCount = useMemo(() => {
    if (!topic) return 0
    return filterQuestions(allQuestions, {
      topic,
      ...(selectedSubtopics.length > 0 && { subtopics: selectedSubtopics }),
      ...(difficulty && { difficulty }),
    }).length
  }, [allQuestions, topic, selectedSubtopics, difficulty])

  // Clamp count when available pool shrinks
  useEffect(() => {
    if (availableCount > 0 && count > availableCount) {
      setCount(availableCount)
    }
  }, [availableCount, count])

  function toggleSubtopic(subtopic: string) {
    setSelectedSubtopics(prev =>
      prev.includes(subtopic) ? prev.filter(s => s !== subtopic) : [...prev, subtopic]
    )
  }

  function handleStart() {
    const params = new URLSearchParams({ topic, mode })
    if (difficulty) params.set('difficulty', difficulty)

    if (mode === 'quiz') {
      if (selectedSubtopics.length > 0) params.set('subtopics', selectedSubtopics.join(','))
      params.set('count', String(count))
      params.set('reveal', reveal)
    } else {
      // mock-exam: fixed question count mirroring real exam, reveal only at end
      params.set('count', String(MOCK_EXAM_QUESTIONS[topic] ?? 30))
    }

    navigate(`/quiz?${params.toString()}`)
  }

  const subtopics = subtopicsByTopic[topic] ?? []
  const mockExamCount = MOCK_EXAM_QUESTIONS[topic] ?? 30
  const examLabel = topic === 'Probability' ? 'Exam P' : 'Exam FM'
  const examLabelColor = topic === 'Probability' ? 'text-[hsl(221,83%,53%)]' : 'text-[hsl(243,75%,59%)]'
  const hasTopic = topic !== ''

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Actuarial Quiz</h1>
        <p className="text-muted-foreground text-lg">
          Practice questions for SOA Exam P and Exam FM
        </p>
        {!user && (
          <p className="text-sm text-muted-foreground">
            <a href="/auth" className="text-primary hover:underline">Sign in</a> to save your progress and track performance
          </p>
        )}
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          {!hasTopic && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Exam</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(hasInProgress ? inProgressExams : EXAMS).map(exam => (
                  <button
                    key={exam.value}
                    type="button"
                    onClick={() => setTopic(exam.value)}
                    className="px-4 py-3 rounded-lg border border-input text-left text-sm transition-colors hover:bg-accent"
                  >
                    {exam.label}
                  </button>
                ))}
              </div>

              {hasInProgress && otherExams.length > 0 && (
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => setShowOther(v => !v)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-3 h-3 transition-transform ${showOther ? 'rotate-90' : ''}`}
                    >
                      <polyline points="6 4 12 10 6 16" />
                    </svg>
                    Other exams
                  </button>
                  {showOther && (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mt-2">
                      {otherExams.map(exam => (
                        <button
                          key={exam.value}
                          type="button"
                          onClick={() => setTopic(exam.value)}
                          className="px-4 py-3 rounded-lg border border-input text-left text-sm transition-colors hover:bg-accent"
                        >
                          {exam.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {hasTopic && (
            <>
              <button
                type="button"
                onClick={() => setTopic('')}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <span aria-hidden="true">←</span>
                <span className={`font-medium ${examLabelColor}`}>{examLabel}</span>
                <span>· change</span>
              </button>

          {/* Mode selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('quiz')}
                className={`px-3 py-3 rounded-lg border text-left text-sm transition-colors ${
                  mode === 'quiz'
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-input hover:bg-accent'
                }`}
              >
                <div className="font-medium">Quiz</div>
                <div className="text-xs text-muted-foreground mt-0.5">Choose topics, count &amp; reveal</div>
              </button>
              <button
                type="button"
                onClick={() => setMode('mock-exam')}
                className={`px-3 py-3 rounded-lg border text-left text-sm transition-colors ${
                  mode === 'mock-exam'
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-input hover:bg-accent'
                }`}
              >
                <div className="font-medium">Mock Exam</div>
                <div className="text-xs text-muted-foreground mt-0.5">Mirrors real exam, answers at end</div>
              </button>
            </div>
          </div>

          {/* ── Quiz mode options ──────────────────────────────────── */}
          {mode === 'quiz' && (
            <>
              {/* Topics */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Topics
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {selectedSubtopics.length === 0 ? '(all included)' : `${selectedSubtopics.length} selected`}
                  </span>
                </label>
                {subtopicsLoading && subtopics.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Loading topics…</p>
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

              {/* Number of questions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Number of Questions</label>
                  <span className="text-sm font-medium tabular-nums">
                    {availableCount > 0
                      ? count >= availableCount
                        ? `All (${availableCount})`
                        : count
                      : '—'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={availableCount > 0 ? availableCount : 1}
                  value={availableCount > 0 ? Math.min(count, availableCount) : 1}
                  onChange={e => setCount(Number(e.target.value))}
                  disabled={availableCount === 0}
                  className="w-full accent-foreground"
                />
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
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

              {/* Reveal answers */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Reveal Answers</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReveal('during')}
                    className={`px-3 py-2.5 rounded-lg border text-left text-sm transition-colors ${
                      reveal === 'during'
                        ? 'border-primary bg-primary/5 text-primary font-medium'
                        : 'border-input hover:bg-accent'
                    }`}
                  >
                    <div className="font-medium text-sm">After each question</div>
                    <div className="text-xs text-muted-foreground mt-0.5">See explanation immediately</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReveal('end')}
                    className={`px-3 py-2.5 rounded-lg border text-left text-sm transition-colors ${
                      reveal === 'end'
                        ? 'border-primary bg-primary/5 text-primary font-medium'
                        : 'border-input hover:bg-accent'
                    }`}
                  >
                    <div className="font-medium text-sm">At the end</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Review all after finishing</div>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── Mock Exam mode info ────────────────────────────────── */}
          {mode === 'mock-exam' && (
            <>
              <div className="rounded-lg border bg-muted/40 px-4 py-3 space-y-1">
                <p className="text-sm font-medium">{mockExamCount} questions</p>
                <p className="text-xs text-muted-foreground">
                  Distributed across all {examLabel} topics to mirror the real exam.
                  Answers and explanations are revealed at the end.
                </p>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
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
            </>
          )}

              <Button onClick={handleStart} className="w-full" size="lg">
                Start {mode === 'mock-exam' ? 'Mock Exam' : 'Quiz'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {user && (
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            View Dashboard
          </Button>
        </div>
      )}
    </div>
  )
}
