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

// Match a session to a subtopic by checking both the subtopic field and the
// tags array (which now stores all subtopics from a mixed quiz).
function computeConceptProgress(
  sessions: QuizSession[],
  subtopicName: string,
  examTopic: string,
): ConceptProgress {
  const lower = subtopicName.toLowerCase()
  const relevant = sessions.filter(
    s =>
      s.topic === examTopic &&
      (s.subtopic?.toLowerCase() === lower ||
        s.tags?.some(t => t.toLowerCase() === lower)),
  )

  if (relevant.length === 0) {
    return { name: subtopicName, totalQuestions: 0, correctCount: 0, strengthPct: 0, level: 'not-started' }
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

  return { name: subtopicName, totalQuestions, correctCount, strengthPct, level }
}

const LEVEL_LABEL: Record<ConceptProgress['level'], string> = {
  'not-started': 'New',
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

interface Props {
  syllabus: WikiExamSyllabus
  sessions: QuizSession[]
  subtopics: string[]  // all known subtopics for this exam, from useSubtopics()
}

export function TopicProgressSection({ syllabus, sessions, subtopics }: Props) {
  const hasAnySessions = sessions.some(s => s.topic === syllabus.examTopic)

  const progressList = subtopics.map(st =>
    computeConceptProgress(sessions, st, syllabus.examTopic),
  )

  const practiced = progressList.filter(c => c.level !== 'not-started')
  const notStarted = progressList.filter(c => c.level === 'not-started')

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
          <div className="space-y-4">
            {practiced.length > 0 && (
              <div className="space-y-2">
                {practiced
                  .sort((a, b) => b.strengthPct - a.strengthPct)
                  .map(cp => (
                    <div key={cp.name} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-44 shrink-0 truncate" title={cp.name}>
                        {cp.name}
                      </span>
                      <StrengthBar pct={cp.strengthPct} level={cp.level} />
                      <div className="flex items-center gap-1.5 w-36 justify-end shrink-0">
                        <span className={`text-xs font-medium ${LEVEL_TEXT_COLOR[cp.level]}`}>
                          {LEVEL_LABEL[cp.level]}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          · {cp.totalQuestions}Q
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {notStarted.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide pt-1">
                  Not Started
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {notStarted.map(cp => (
                    <span
                      key={cp.name}
                      className="text-xs text-muted-foreground border border-border rounded px-2 py-0.5"
                    >
                      {cp.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
