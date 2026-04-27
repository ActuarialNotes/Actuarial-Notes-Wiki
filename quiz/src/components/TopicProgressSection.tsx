import { useState } from 'react'
import { ChevronDown, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { QuizSession } from '@/lib/supabase'

interface ConceptProgress {
  name: string
  totalQuestions: number
  correctCount: number
  strengthPct: number
  level: 'not-started' | 'beginner' | 'learning' | 'practiced' | 'strong'
}

function computeConceptProgress(
  sessions: QuizSession[],
  conceptName: string,
  examTopic: string,
): ConceptProgress {
  const relevant = sessions.filter(
    s => s.topic === examTopic && s.subtopic === conceptName,
  )

  if (relevant.length === 0) {
    return { name: conceptName, totalQuestions: 0, correctCount: 0, strengthPct: 0, level: 'not-started' }
  }

  const totalQuestions = relevant.reduce((sum, s) => sum + s.total_questions, 0)
  const correctCount = relevant.reduce((sum, s) => sum + s.correct_count, 0)
  const accuracy = totalQuestions > 0 ? correctCount / totalQuestions : 0
  const volumeFactor = Math.min(1, totalQuestions / 20)
  const strengthPct = Math.round(accuracy * 70 + volumeFactor * 30)

  const level =
    strengthPct >= 80 ? 'strong' :
    strengthPct >= 60 ? 'practiced' :
    strengthPct >= 40 ? 'learning' : 'beginner'

  return { name: conceptName, totalQuestions, correctCount, strengthPct, level }
}

const LEVEL_LABEL: Record<ConceptProgress['level'], string> = {
  'not-started': 'Not Started',
  'beginner': 'Beginner',
  'learning': 'Learning',
  'practiced': 'Practiced',
  'strong': 'Strong',
}

const LEVEL_BAR_COLOR: Record<ConceptProgress['level'], string> = {
  'not-started': 'bg-muted-foreground/20',
  'beginner': 'bg-red-400',
  'learning': 'bg-orange-400',
  'practiced': 'bg-yellow-400',
  'strong': 'bg-green-500',
}

const LEVEL_TEXT_COLOR: Record<ConceptProgress['level'], string> = {
  'not-started': 'text-muted-foreground',
  'beginner': 'text-red-500',
  'learning': 'text-orange-500',
  'practiced': 'text-yellow-600',
  'strong': 'text-green-600',
}

function StrengthBar({ pct, level }: { pct: number; level: ConceptProgress['level'] }) {
  return (
    <div
      className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden min-w-0"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${LEVEL_LABEL[level]} – ${Math.round(pct)}%`}
    >
      <div
        className={`h-full rounded-full transition-all ${LEVEL_BAR_COLOR[level]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function InfoPanel() {
  return (
    <div className="mt-2 rounded-md border bg-muted/50 p-3 text-xs text-muted-foreground space-y-2">
      <p className="font-medium text-foreground">How progress is tracked</p>
      <p>
        Each topic's <span className="font-medium">strength score</span> combines accuracy (70%) and
        volume (30%, maxing out at 20 questions attempted).
      </p>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-20 shrink-0 text-muted-foreground">Not Started</span>
          <span>No questions attempted yet</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20 shrink-0 text-red-500 font-medium">Beginner</span>
          <span>Strength &lt; 40%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20 shrink-0 text-orange-500 font-medium">Learning</span>
          <span>Strength 40–59%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20 shrink-0 text-yellow-600 font-medium">Practiced</span>
          <span>Strength 60–79%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20 shrink-0 text-green-600 font-medium">Strong</span>
          <span>Strength ≥ 80%</span>
        </div>
      </div>
      <p>
        The topic-level % is the average strength across all <em>attempted</em> concepts in that topic.
        The exam weight range (e.g. 23–30%) is the SOA's published weighting for that section.
      </p>
    </div>
  )
}

interface Props {
  syllabus: WikiExamSyllabus
  sessions: QuizSession[]
}

export function TopicProgressSection({ syllabus, sessions }: Props) {
  const hasAnySessions = sessions.some(s => s.topic === syllabus.examTopic)
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set())
  const [showInfo, setShowInfo] = useState(false)

  const toggle = (name: string) =>
    setOpenTopics(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">{syllabus.examLabel} — Topics Progress</CardTitle>
          <button
            onClick={() => setShowInfo(v => !v)}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="How progress tracking works"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
        {showInfo && <InfoPanel />}
      </CardHeader>
      <CardContent>
        {!hasAnySessions ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Start practicing to track your progress
          </p>
        ) : (
          <div className="space-y-1">
            {syllabus.topics.map(topic => {
              const conceptProgressList = topic.concepts.map(c =>
                computeConceptProgress(sessions, c.name, syllabus.examTopic),
              )
              const attempted = conceptProgressList.filter(c => c.level !== 'not-started')
              const topicAvg = attempted.length > 0
                ? Math.round(attempted.reduce((sum, c) => sum + c.strengthPct, 0) / attempted.length)
                : 0
              const topicLevel: ConceptProgress['level'] =
                attempted.length === 0 ? 'not-started' :
                topicAvg >= 80 ? 'strong' :
                topicAvg >= 60 ? 'practiced' :
                topicAvg >= 40 ? 'learning' : 'beginner'

              const isOpen = openTopics.has(topic.name)

              return (
                <div key={topic.name}>
                  {/* Collapsible topic header */}
                  <button
                    className="flex items-center gap-2 w-full py-2 text-left hover:bg-muted/40 rounded-md px-1 -mx-1 transition-colors"
                    onClick={() => toggle(topic.name)}
                    aria-expanded={isOpen}
                  >
                    <ChevronDown
                      className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
                    />
                    <span className="text-sm font-semibold min-w-0 truncate">
                      {topic.name}
                      {topic.weight && (
                        <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                          {topic.weight}
                        </span>
                      )}
                    </span>
                    <StrengthBar pct={topicAvg} level={topicLevel} />
                    <span className={`text-xs font-medium shrink-0 text-right w-10 ${LEVEL_TEXT_COLOR[topicLevel]}`}>
                      {topicLevel === 'not-started' ? '—' : `${topicAvg}%`}
                    </span>
                  </button>

                  {/* Concept rows — shown only when expanded */}
                  {isOpen && topic.concepts.length > 0 && (
                    <div className="space-y-1.5 pl-5 border-l-2 border-border ml-2 mb-2">
                      {conceptProgressList.map(cp => (
                        <div key={cp.name} className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground min-w-0 flex-1 truncate" title={cp.name}>
                            {cp.name}
                          </span>
                          <StrengthBar pct={cp.strengthPct} level={cp.level} />
                          <div className="flex items-center gap-1 shrink-0">
                            <span className={`text-xs font-medium ${LEVEL_TEXT_COLOR[cp.level]}`}>
                              {LEVEL_LABEL[cp.level]}
                            </span>
                            {cp.totalQuestions > 0 && (
                              <span className="text-xs text-muted-foreground">
                                · {cp.totalQuestions}Q
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
