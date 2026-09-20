import { BookOpen, Check, FileText, Gavel, Landmark, Newspaper, Plus, Scale, Table2 } from 'lucide-react'
import {
  formatPublished,
  resourceEntryRef,
  resourceKindLabel,
  type ResourceKind,
  type SourceResource,
} from '@/lib/coworkSources'
import { cn } from '@/lib/utils'

/**
 * One document, in a list.
 *
 * The row's title is a *button that opens the document* — in the popup viewer,
 * the same one the study guide reads a concept in — and the add/remove control
 * sits at the end. Those are the row's only two actions, and they are kept
 * apart because they answer different questions: "what is this?" and "am I
 * working from it?"
 *
 * A **Sample** chip is not decoration. It says this entry stands for a class of
 * document rather than naming one Cowork carries, which is exactly what a
 * reader has to know before citing it (see `data/coworkSources.ts`).
 */

const KIND_ICON: Record<ResourceKind, typeof FileText> = {
  textbook: BookOpen,
  standard: Scale,
  regulation: Gavel,
  guideline: Landmark,
  bulletin: FileText,
  filing: FileText,
  report: FileText,
  news: Newspaper,
  dataset: Table2,
}

export interface ResourceRowProps {
  resource: SourceResource
  inLibrary: boolean
  onToggleLibrary: (resource: SourceResource) => void
  onOpen: (resource: SourceResource) => void
  /** Swaps the add control for an "attach to this deliverable" one. */
  attachLabel?: string
}

export function ResourceRow({ resource, inLibrary, onToggleLibrary, onOpen, attachLabel }: ResourceRowProps) {
  const Icon = KIND_ICON[resource.kind] ?? FileText
  const openable = resourceEntryRef(resource) !== null

  return (
    <div className="flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent/40">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
        <Icon className="h-4 w-4" aria-hidden />
      </span>

      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onOpen(resource)}
          disabled={!openable}
          data-sound="open"
          className={cn(
            'text-left text-sm font-medium leading-snug',
            openable ? 'text-foreground hover:text-primary hover:underline' : 'cursor-default text-foreground',
          )}
        >
          {resource.title}
        </button>
        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{resource.summary}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
          <span className="rounded-full bg-muted px-1.5 py-0.5 font-medium leading-none">
            {resourceKindLabel(resource.kind)}
          </span>
          <span className="tabular-nums">{formatPublished(resource.published)}</span>
          {resource.wikiRef && (
            <span
              title="This document is a page in the Actuarial Notes wiki"
              className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 font-semibold leading-none text-emerald-700 dark:text-emerald-300"
            >
              In wiki
            </span>
          )}
          {resource.sample && (
            <span
              title="A sample entry: it stands for this kind of document rather than naming one Cowork carries. Cite the real document."
              className="rounded-full bg-amber-500/15 px-1.5 py-0.5 font-semibold leading-none text-amber-600 dark:text-amber-400"
            >
              Sample
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onToggleLibrary(resource)}
        aria-pressed={inLibrary}
        aria-label={
          inLibrary
            ? `Remove ${resource.title} from your library`
            : `${attachLabel ?? 'Add'} ${resource.title}`
        }
        title={inLibrary ? 'In your library' : attachLabel ?? 'Add to library'}
        className={cn(
          'mt-0.5 inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-2 text-xs font-medium transition-colors',
          inLibrary
            ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-300'
            : 'border text-muted-foreground hover:bg-accent hover:text-foreground',
        )}
      >
        {inLibrary ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
        <span className="hidden sm:inline">{inLibrary ? 'Added' : attachLabel ?? 'Add'}</span>
      </button>
    </div>
  )
}
