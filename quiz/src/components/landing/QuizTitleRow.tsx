import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import type { ExamBody } from '@/lib/bodyFilter'
import { cn } from '@/lib/utils'

/**
 * The page's title row. On the exam list it is the Study Guides page's plain
 * title row, so the two tabs' titles sit on the same line. Inside an exam it
 * is the exam's name, the way a study guide opens with its own: the way back
 * and the exam's logo ride the search bar's strip (`examStrip` in
 * pages/Landing.tsx), which is what stays in sight as the concept list
 * scrolls.
 *
 * Inside an exam the row is empty unless a concept filter rides it — and an
 * empty row still took a `space-y-6` slot, which opened a gap between the
 * exam's strip and the source tabs. So it is only drawn with something in it.
 */
export function QuizTitleRow({
  hasTopic,
  signedIn,
  body,
  onBodyChange,
  concept,
  conceptCount,
  onClearConcept,
}: {
  /** An exam's builder is open. */
  hasTopic: boolean
  signedIn: boolean
  /** The examining body the exam list is showing. */
  body: ExamBody
  onBodyChange: (body: ExamBody) => void
  /** A single-concept filter, from the dashboard or a search; '' for none. */
  concept: string
  /** How many questions that concept holds. */
  conceptCount: number
  onClearConcept: () => void
}) {
  if (hasTopic && !concept) return null
  return (
    <div className={cn(hasTopic && 'space-y-2')}>
      {!hasTopic && (
        <div className="flex items-center gap-2">
          <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">Quiz</h1>
          {!signedIn && (
            <Link
              to="/auth"
              className="shrink-0 rounded-md text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-primary underline-offset-2 hover:underline">Sign in</span>
              <span className="hidden sm:inline"> to save progress</span>
            </Link>
          )}
          {/* The body picker rides the title row, the shape the Study Guides
              tab opens on — it governs the whole exam list below, so it sits
              with the title rather than in a label row of its own. */}
          <SegmentedControl
            label="Examining body"
            size="lg"
            pill
            value={body}
            onChange={onBodyChange}
            options={[
              { value: 'SOA', label: 'SOA' },
              { value: 'CAS', label: 'CAS' },
            ]}
            className="shrink-0"
          />
        </div>
      )}

      {concept && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Concept:</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
            {concept}
            <button
              type="button"
              onClick={onClearConcept}
              className="hover:text-primary/70 transition-colors"
              aria-label="Remove concept filter"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
          {conceptCount > 0 && (
            <span className="text-xs text-muted-foreground">{conceptCount} question{conceptCount !== 1 ? 's' : ''}</span>
          )}
        </div>
      )}

    </div>
  )
}
