import { Link } from 'react-router-dom'
import { CheckMark } from '@/components/CheckMark'

/**
 * The Today's Plan source on the quiz builder: the concepts the day's study
 * plan schedules, or — for a reader without Pro, or a plan with nothing in
 * it today — why there is no list.
 */
export function TodaysPlanPanel({ isPro, concepts }: { isPro: boolean; concepts: string[] }) {
  if (!isPro) {
    return (
      <div className="rounded-lg bg-muted/40 px-4 py-3 flex items-start gap-3">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">Personalized daily study plan</p>
          <p className="text-xs text-muted-foreground">Get a daily study schedule tailored to your exam date and mastery progress.</p>
        </div>
        <Link
          to="/upgrade"
          className="shrink-0 px-3 py-1.5 rounded-md bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Go Pro
        </Link>
      </div>
    )
  }
  if (concepts.length === 0) {
    return (
      <div className="rounded-lg bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        No concepts scheduled for today. Set your exam date in the dashboard to generate a study plan.
      </div>
    )
  }
  return (
    <ul className="overflow-hidden rounded-lg bg-muted/30">
      {concepts.map(concept => (
        <li key={concept} className="flex items-center gap-2.5 px-3 py-2.5">
          <CheckMark className="h-4 w-4" />
          <span className="min-w-0 flex-1 text-sm font-medium leading-snug">{concept}</span>
        </li>
      ))}
    </ul>
  )
}
