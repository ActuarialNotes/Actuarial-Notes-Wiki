import type { Question } from '@/lib/parser'
import type { MasteryState } from '@/lib/mastery'

interface Response {
  chosen: string | null
}

interface TopicCoverageChartProps {
  questions: Question[]
  responses: Record<string, Response>
  masteryBySubtopic?: Map<string, MasteryState>
}

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New',
  learning: 'Learning',
  strong: 'Strong',
  forgotten: 'Forgotten',
}

const STATE_BADGE_CLASSES: Record<MasteryState, string> = {
  new: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700',
  learning: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800',
  strong: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800',
  forgotten: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800',
}

interface SubtopicStat {
  name: string
  correct: number
  total: number
}

export function TopicCoverageChart({ questions, responses, masteryBySubtopic }: TopicCoverageChartProps) {
  const statsBySubtopic = new Map<string, SubtopicStat>()

  for (const q of questions) {
    const key = q.subtopic
    if (!statsBySubtopic.has(key)) {
      statsBySubtopic.set(key, { name: key, correct: 0, total: 0 })
    }
    const stat = statsBySubtopic.get(key)!
    stat.total += 1
    const resp = responses[q.id]
    if (resp?.chosen === q.answer) stat.correct += 1
  }

  const stats = [...statsBySubtopic.values()].sort((a, b) => a.name.localeCompare(b.name))

  if (stats.length === 0) return null

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Topic Coverage</h2>
      <div className="space-y-2">
        {stats.map(stat => {
          const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0
          return (
            <div key={stat.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-foreground truncate">{stat.name}</span>
                  {masteryBySubtopic?.has(stat.name) && (() => {
                    const state = masteryBySubtopic.get(stat.name)!
                    return (
                      <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-medium ${STATE_BADGE_CLASSES[state]}`}>
                        {STATE_LABEL[state]}
                      </span>
                    )
                  })()}
                </div>
                <span className="text-muted-foreground shrink-0 tabular-nums ml-4">
                  {stat.correct}/{stat.total}
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-foreground transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
