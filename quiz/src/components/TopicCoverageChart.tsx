import type { Question } from '@/lib/parser'

interface Response {
  chosen: string | null
}

interface TopicCoverageChartProps {
  questions: Question[]
  responses: Record<string, Response>
}

interface SubtopicStat {
  name: string
  correct: number
  total: number
}

export function TopicCoverageChart({ questions, responses }: TopicCoverageChartProps) {
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
                <span className="text-foreground truncate pr-4">{stat.name}</span>
                <span className="text-muted-foreground shrink-0 tabular-nums">
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
