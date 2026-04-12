import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { QuizMode, Difficulty } from '@/lib/parser'

const EXAMS = [
  { value: 'Probability', label: 'Exam P — Probability' },
  { value: 'Financial Mathematics', label: 'Exam FM — Financial Mathematics' },
]

const MODES: { value: QuizMode; label: string; description: string }[] = [
  { value: 'random', label: 'Random', description: 'Mix of questions across topics' },
  { value: 'topic', label: 'Topic', description: 'Questions in order by topic' },
  { value: 'exam', label: 'Exam Sim', description: 'Timed — no explanations until the end' },
]

const DIFFICULTIES: { value: Difficulty | ''; label: string }[] = [
  { value: '', label: 'All Levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [topic, setTopic] = useState(EXAMS[0].value)
  const [mode, setMode] = useState<QuizMode>('random')
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')

  function handleStart() {
    const params = new URLSearchParams({ topic, mode })
    if (difficulty) params.set('difficulty', difficulty)
    navigate(`/quiz?${params.toString()}`)
  }

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
        <CardHeader>
          <CardTitle>Configure Your Quiz</CardTitle>
          <CardDescription>Choose an exam and style, then start</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Exam selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Exam</label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {EXAMS.map(exam => (
                <button
                  key={exam.value}
                  type="button"
                  onClick={() => setTopic(exam.value)}
                  className={`px-4 py-3 rounded-lg border text-left text-sm transition-colors ${
                    topic === exam.value
                      ? 'border-primary bg-primary/5 text-primary font-medium'
                      : 'border-input hover:bg-accent'
                  }`}
                >
                  {exam.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Mode</label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {MODES.map(m => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMode(m.value)}
                  className={`px-3 py-3 rounded-lg border text-left text-sm transition-colors ${
                    mode === m.value
                      ? 'border-primary bg-primary/5 text-primary font-medium'
                      : 'border-input hover:bg-accent'
                  }`}
                >
                  <div className="font-medium">{m.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.description}</div>
                </button>
              ))}
            </div>
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

          <Button onClick={handleStart} className="w-full" size="lg">
            Start Quiz
          </Button>
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
