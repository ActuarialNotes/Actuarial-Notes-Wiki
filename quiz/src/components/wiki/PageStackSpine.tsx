import { BookOpen, FileText, GraduationCap, Landmark } from 'lucide-react'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

const SPINE_ICON = {
  concept: FileText,
  resource: BookOpen,
  exam: GraduationCap,
  event: Landmark,
  regulation: Landmark,
} as const

/**
 * A page of the popup's stack, collapsed to its spine — the thin vertical strip
 * an Obsidian stacked tab leaves behind. It is the whole page's affordance:
 * tapping it expands that page again, exactly as it was left, and collapses
 * whatever pushed it aside.
 *
 * Deliberately one tap target and nothing else. A close button here would be a
 * ~20px hit area on a phone, sitting next to the thing it would undo; a page is
 * closed from its own header instead, where the control is full size.
 */
export interface PageStackSpineProps {
  entry: WikiEntryRef
  onFocus: () => void
}

export function PageStackSpine({ entry, onFocus }: PageStackSpineProps) {
  const Icon = SPINE_ICON[entry.kind] ?? FileText
  return (
    <button
      type="button"
      data-sound="page"
      onClick={onFocus}
      title={entry.name}
      aria-label={`Back to ${entry.name}`}
      className="page-spine group flex w-9 shrink-0 flex-col items-center gap-2 border-r bg-muted/40 py-3 transition-colors hover:bg-accent"
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      <span className="page-spine-title min-h-0 flex-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {entry.name}
      </span>
    </button>
  )
}
