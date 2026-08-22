import { BookOpen, FileText, GraduationCap, Landmark, X } from 'lucide-react'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

const BAR_ICON = {
  concept: FileText,
  resource: BookOpen,
  exam: GraduationCap,
  event: Landmark,
  regulation: Landmark,
} as const

/**
 * A page of the popup's stack, folded up to a single row — the visible edge of
 * a sheet under the one being read. Tapping it opens that page again exactly as
 * it was left, and folds away whatever pushed it down.
 *
 * The row runs the full width of the pane because that is the dimension the
 * popup has to spare: a phone-width bar holds the page's real title, which is
 * the whole point of leaving it on screen. It also leaves room for a full-size
 * close button, so a page can be dropped from the trail without opening it
 * first.
 */
export interface PageStackBarProps {
  entry: WikiEntryRef
  onOpen: () => void
  onClose: () => void
  /** Sits above the open page (its trail) rather than below it. */
  above: boolean
}

export function PageStackBar({ entry, onOpen, onClose, above }: PageStackBarProps) {
  const Icon = BAR_ICON[entry.kind] ?? FileText
  return (
    <div
      className={`page-bar group flex h-10 shrink-0 items-center bg-background/60 transition-colors hover:bg-accent/60 ${above ? 'border-b' : 'border-t'}`}
    >
      <button
        type="button"
        data-sound="page"
        onClick={onOpen}
        title={entry.name}
        aria-label={`Open ${entry.name}`}
        className="flex h-full min-w-0 flex-1 items-center gap-2 pl-3 pr-1 text-left"
      >
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
        <span className="truncate text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          {entry.name}
        </span>
      </button>
      <button
        type="button"
        data-sound="none"
        onClick={onClose}
        title="Close page"
        aria-label={`Close ${entry.name}`}
        className="mr-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
