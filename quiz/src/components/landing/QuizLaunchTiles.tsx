import type { ReactNode } from 'react'
import { CalendarCheck, ClipboardCheck, FileText, Lock } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { cn } from '@/lib/utils'

// The tiles under the quiz setup screen's card: today's plan across the full
// width, then the two ways to sit a whole paper — a practice exam drawn to the
// paper's shape, and the exam's own past papers. All three are the same height,
// so the page reads as one grid under the card.

const TILE =
  'flex h-24 w-full rounded-2xl bg-card p-4 text-left text-card-foreground'

const TILE_PRESS = cn(
  'transition-colors hover:bg-muted',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
)

/** The Pro tag — on the plan tile, which is Pro's. */
function ProTag() {
  return (
    <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold text-foreground/80">Pro</span>
  )
}

/**
 * Today's study plan. A Pro reader's tile starts the day's quiz, sized to
 * finish the plan; anyone else's is shown, locked, and is not a button — the
 * plan is never the way in for a reader who can't use it, so it never stands
 * above building their own quiz.
 */
export function TodaysPlanTile({
  state,
  conceptCount,
  questionCount,
  onStart,
}: {
  /** `locked`: not Pro. `empty`: nothing scheduled today. */
  state: 'ready' | 'done' | 'empty' | 'locked'
  conceptCount: number
  questionCount: number
  onStart: () => void
}) {
  if (state === 'locked' || state === 'empty') {
    return (
      <div
        aria-disabled="true"
        data-testid="todays-plan-tile"
        className={cn(TILE, 'items-center gap-3 bg-card/50 text-muted-foreground')}
      >
        {state === 'locked'
          ? <Lock className="h-5 w-5 shrink-0" aria-hidden />
          : <CalendarCheck className="h-5 w-5 shrink-0" aria-hidden />}
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold">Today's plan</span>
          <span className="block text-[13px] leading-snug">
            {state === 'locked' ? 'A daily set picked for your exam date' : 'Nothing scheduled for today'}
          </span>
        </span>
        {state === 'locked' && <ProTag />}
      </div>
    )
  }
  return (
    <button
      type="button"
      data-testid="todays-plan-tile"
      data-sound="begin"
      onClick={onStart}
      className={cn(TILE, TILE_PRESS, 'items-center gap-3')}
    >
      {state === 'done'
        ? <CheckMark className="h-5 w-5" />
        : <CalendarCheck className="h-5 w-5 shrink-0 text-[color:var(--exam-accent-vivid,currentColor)]" aria-hidden />}
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold">Today's plan</span>
        <span className="block text-[13px] leading-snug text-muted-foreground">
          {state === 'done'
            ? 'Done for today. Start it again to review'
            : `${conceptCount} concept${conceptCount === 1 ? '' : 's'} · ${questionCount} question${questionCount === 1 ? '' : 's'}`}
        </span>
      </span>
    </button>
  )
}

function SourceTile({
  icon,
  title,
  detail,
  onOpen,
}: {
  icon: ReactNode
  title: string
  detail: string
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      className={cn(TILE, TILE_PRESS, 'flex-col justify-between')}
    >
      {icon}
      <span className="min-w-0">
        <span className="block truncate text-[15px] font-semibold">{title}</span>
        <span className="block truncate text-[13px] text-muted-foreground">{detail}</span>
      </span>
    </button>
  )
}

/** The two whole-paper tiles, side by side. */
export function PaperTiles({
  practiceDetail,
  papersTitle,
  papersDetail,
  onPractice,
  onPapers,
}: {
  practiceDetail: string
  /** "Past Papers", or "By Source" for an exam with no released sittings. */
  papersTitle: string
  papersDetail: string
  onPractice: () => void
  onPapers: () => void
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SourceTile
        icon={<ClipboardCheck className="h-5 w-5" aria-hidden />}
        title="Practice exam"
        detail={practiceDetail}
        onOpen={onPractice}
      />
      <SourceTile
        icon={<FileText className="h-5 w-5" aria-hidden />}
        title={papersTitle}
        detail={papersDetail}
        onOpen={onPapers}
      />
    </div>
  )
}
