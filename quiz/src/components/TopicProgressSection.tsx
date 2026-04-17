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
    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden min-w-0">
      <div
        className={`h-full rounded-full transition-all ${LEVEL_BAR_COLOR[level]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

interface Props {
  syllabus: WikiExamSyllabus
  sessions: QuizSession[]
}

export function TopicProgressSection({ syllabus, sessions }: Props) {
  const hasAnySessions = sessions.some(s => s.topic === syllabus.examTopic)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{syllabus.examLabel} — Topics Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasAnySessions ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Start practicing to track your progress
          </p>
        ) : (
          <div className="space-y-5">
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

              return (
                <div key={topic.name} className="space-y-2">
                  {/* Top-level topic row */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold w-48 shrink-0">
                      {topic.name}
                      {topic.weight && (
                        <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                          {topic.weight}
                        </span>
                      )}
                    </span>
                    <StrengthBar pct={topicAvg} level={topicLevel} />
                    <span className={`text-xs font-medium w-16 text-right shrink-0 ${LEVEL_TEXT_COLOR[topicLevel]}`}>
                      {topicLevel === 'not-started' ? '—' : `${topicAvg}%`}
                    </span>
                  </div>

                  {/* Concept rows */}
                  {topic.concepts.length > 0 && (
                    <div className="space-y-1.5 pl-3 border-l-2 border-border ml-1">
                      {conceptProgressList.map(cp => (
                        <div key={cp.name} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-44 shrink-0 truncate" title={cp.name}>
                            {cp.name}
                          </span>
                          <StrengthBar pct={cp.strengthPct} level={cp.level} />
                          <div className="flex items-center gap-1.5 w-36 justify-end shrink-0">
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
