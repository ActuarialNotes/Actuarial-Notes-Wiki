import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface TopicBadgeProps {
  label: string
  variant?: 'topic' | 'tag' | 'difficulty'
}

const difficultyClasses: Record<string, string> = {
  easy: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100 dark:bg-green-950 dark:text-green-300 dark:border-green-800 dark:hover:bg-green-950',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800 dark:hover:bg-yellow-950',
  hard: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100 dark:bg-red-950 dark:text-red-300 dark:border-red-800 dark:hover:bg-red-950',
}

export function TopicBadge({ label, variant = 'topic' }: TopicBadgeProps) {
  if (variant === 'difficulty') {
    const classes = difficultyClasses[label.toLowerCase()] ?? ''
    return (
      <Badge className={cn('capitalize', classes)}>
        {label}
      </Badge>
    )
  }

  if (variant === 'tag') {
    return (
      <Badge variant="secondary" className="text-xs">
        {label}
      </Badge>
    )
  }

  return (
    <Badge variant="outline">
      {label}
    </Badge>
  )
}
