import type { QuizSession } from '@/lib/supabase'
import { formatTime } from '@/components/SessionRow'

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

interface Props {
  session: QuizSession
  onClick: () => void
}

export function QuizSessionCard({ session, onClick }: Props) {
  const pct = session.total_questions > 0
    ? (session.correct_count / session.total_questions) * 100
    : 0
  const opacity = +(0.2 + 0.8 * (pct / 100)).toFixed(2)
  const bgStyle = { backgroundColor: `rgba(34, 197, 94, ${opacity})` }

  const modeLabel = session.mode === 'mock-exam' ? 'Exam' : 'Quiz'
  const topicLabel = session.topic ?? 'General'

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full text-left rounded-xl p-3 flex flex-col justify-between min-h-[100px] transition-opacity hover:opacity-90 active:scale-[0.98]"
      style={bgStyle}
    >
      {/* Mode tag — top left, subtle */}
      <span className="self-start text-[10px] font-medium rounded-full bg-black/20 text-white/80 px-2 py-0.5 leading-tight">
        {modeLabel}
      </span>

      {/* Topic — large, centered vertically */}
      <div className="flex-1 flex items-center py-1">
        <span className="text-sm font-bold text-white leading-snug line-clamp-2">
          {topicLabel}
        </span>
      </div>

      {/* Bottom row: date · score · time */}
      <div className="flex items-center justify-between text-[10px] text-white/80 font-medium">
        <span>{formatShortDate(session.completed_at)}</span>
        <span>{session.correct_count}/{session.total_questions}</span>
        <span>{formatTime(session.time_taken_seconds)}</span>
      </div>
    </button>
  )
}
