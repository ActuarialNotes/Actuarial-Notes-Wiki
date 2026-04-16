import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ExamSyllabus } from '@/data/examSyllabus'
import type { QuizSession } from '@/lib/supabase'

interface SubtopicProgress {
  name: string
  totalQuestions: number
  correctCount: number
  sessionCount: number
  strengthPct: number
  level: 'not-started' | 'beginner' | 'learning' | 'practiced' | 'strong'
}

function computeSubtopicProgress(
  sessions: QuizSession[],
  subtopicName: string,
  examTopic: string,
): SubtopicProgress {
  const relevant = sessions.filter(
    s => s.topic === examTopic && s.subtopic === subtopicName,
  )

  if (relevant.length === 0) {
    return { name: subtopicName, totalQuestions: 0, correctCount: 0, sessionCount: 0, strengthPct: 0, level: 'not-started' }
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

  return { name: subtopicName, totalQuestions, correctCount, sessionCount: relevant.length, strengthPct, level }
}

const LEVEL_LABEL: Record<SubtopicProgress['level'], string> = {
  'not-started': 'Not Started',
  'beginner': 'Beginner',
  'learning': 'Learning',
  'practiced': 'Practiced',
  'strong': 'Strong',
}

const LEVEL_BAR_COLOR: Record<SubtopicProgress['level'], string> = {
  'not-started': 'bg-muted-foreground/20',
  'beginner': 'bg-red-400',
  'learning': 'bg-orange-400',
  'practiced': 'bg-yellow-400',
  'strong': 'bg-green-500',
}

const LEVEL_TEXT_COLOR: Record<SubtopicProgress['level'], string> = {
  'not-started': 'text-muted-foreground',
  'beginner': 'text-red-500',
  'learning': 'text-orange-500',
  'practiced': 'text-yellow-600',
  'strong': 'text-green-600',
}

function StrengthBar({ pct, level }: { pct: number; level: SubtopicProgress['level'] }) {
  return (
    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${LEVEL_BAR_COLOR[level]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

interface Props {
  syllabus: ExamSyllabus
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
              const subtopicProgressList = topic.subtopics.map(st =>
                computeSubtopicProgress(sessions, st.name, syllabus.examTopic),
              )
              const attempted = subtopicProgressList.filter(s => s.level !== 'not-started')
              const topicAvg = attempted.length > 0
                ? Math.round(attempted.reduce((sum, s) => sum + s.strengthPct, 0) / attempted.length)
                : 0
              const topicLevel: SubtopicProgress['level'] =
                attempted.length === 0 ? 'not-started' :
                topicAvg >= 80 ? 'strong' :
                topicAvg >= 60 ? 'practiced' :
                topicAvg >= 40 ? 'learning' : 'beginner'

              return (
                <div key={topic.name} className="space-y-2">
                  {/* Top-level topic row */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold w-48 shrink-0">{topic.name}</span>
                    <StrengthBar pct={topicAvg} level={topicLevel} />
                    <span className={`text-xs font-medium w-16 text-right shrink-0 ${LEVEL_TEXT_COLOR[topicLevel]}`}>
                      {topicLevel === 'not-started' ? '—' : `${topicAvg}%`}
                    </span>
                  </div>

                  {/* Subtopic rows */}
                  <div className="space-y-1.5 pl-3 border-l-2 border-border ml-1">
                    {subtopicProgressList.map(sp => (
                      <div key={sp.name} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-44 shrink-0">{sp.name}</span>
                        <StrengthBar pct={sp.strengthPct} level={sp.level} />
                        <div className="flex items-center gap-1.5 w-36 justify-end shrink-0">
                          <span className={`text-xs font-medium ${LEVEL_TEXT_COLOR[sp.level]}`}>
                            {LEVEL_LABEL[sp.level]}
                          </span>
                          {sp.totalQuestions > 0 && (
                            <span className="text-xs text-muted-foreground">
                              · {sp.totalQuestions}Q
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
