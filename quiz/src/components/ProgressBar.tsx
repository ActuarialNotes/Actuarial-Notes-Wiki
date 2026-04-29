import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
  current: number   // 1-indexed
  total: number
  onNavigate?: (index: number) => void   // called with 0-based index
  flaggedIds?: string[]
  questionIds?: string[]
}

export function ProgressBar({ current, total, onNavigate, flaggedIds, questionIds }: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(100, (current / total) * 100) : 0

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-muted-foreground">
        {onNavigate ? (
          <select
            value={current - 1}
            onChange={e => onNavigate(Number(e.target.value))}
            className="bg-transparent border-none cursor-pointer focus:outline-none text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Navigate to question"
          >
            {Array.from({ length: total }, (_, i) => {
              const isFlagged = flaggedIds && questionIds && flaggedIds.includes(questionIds[i] ?? '')
              return (
                <option key={i} value={i}>
                  Question {i + 1} of {total}{isFlagged ? ' 🚩' : ''}
                </option>
              )
            })}
          </select>
        ) : (
          <span>Question {current} of {total}</span>
        )}
        <span>{Math.round(percentage)}%</span>
      </div>
      <Progress value={percentage} className="h-2 [&>div]:bg-foreground" />
    </div>
  )
}
