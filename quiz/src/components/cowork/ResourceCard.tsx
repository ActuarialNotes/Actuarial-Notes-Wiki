import { useState } from 'react'
import { BookOpen, Check, FileText, Gavel, Landmark, Newspaper, Plus, Scale, Table2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MetaPill } from '@/components/wiki/ResourcePills'
import {
  formatPublished,
  resourceEntryRef,
  resourceKindLabel,
  type ResourceKind,
  type SourceResource,
} from '@/lib/coworkSources'
import { cn } from '@/lib/utils'

/**
 * One document, as a **card**.
 *
 * Every surface that lists documents — the Sources shelf, a source's page, a
 * deliverable's attached and attachable sources — uses this one component, and
 * it is deliberately the same object the study guide's resource shelf is built
 * from (`components/wiki/SourceMaterialGallery.tsx`): a jacket or a kind icon
 * on the left, the title, and a row of metadata pills. Cowork is a second
 * product, not a second design system, so a document looks the same here as a
 * syllabus reading looks there.
 *
 * **The whole card opens the document** — in the popup viewer, the same one the
 * study guide reads a concept in — and the add/remove control at its right edge
 * is the one thing that does not. Those are the card's only two actions and
 * they answer different questions: "what is this?" and "am I working from it?"
 * A card whose title alone was the target made the other nine tenths of it a
 * dead surface that looked live.
 *
 * The pills are what the card says about the document; the one-line summary
 * that used to sit under the title is not repeated here, because the document
 * itself is one tap away and a grid of cards each carrying a grey sentence is
 * the page explaining itself instead of showing itself
 * (`docs/visual-noise-review.md`). A **Sample** chip, though, is not
 * decoration: it says the entry stands for a class of document rather than
 * naming one Cowork carries, which is what a reader has to know before citing
 * it (see `data/coworkSources.ts`).
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

export interface ResourceCardProps {
  resource: SourceResource
  inLibrary: boolean
  onToggleLibrary: (resource: SourceResource) => void
  onOpen: (resource: SourceResource) => void
  /** The work's jacket, when the vault carries one — see `lib/coworkCovers.ts`. */
  cover?: string
  /** Swaps the add control for an "attach to this deliverable" one. */
  attachLabel?: string
}

export function ResourceCard({
  resource,
  inLibrary,
  onToggleLibrary,
  onOpen,
  cover,
  attachLabel,
}: ResourceCardProps) {
  const [coverFailed, setCoverFailed] = useState(false)
  const Icon = KIND_ICON[resource.kind] ?? FileText
  const openable = resourceEntryRef(resource) !== null
  // A jacket that will not load leaves the card its kind icon rather than
  // nothing at all: the card keeps leading with an object either way.
  const showCover = Boolean(cover) && !coverFailed

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-colors duration-150 focus-within:ring-2 focus-within:ring-ring',
        openable && 'hover:bg-accent/40',
      )}
    >
      {/* The card *is* the target. It opens a panel rather than navigating, so
          it is a stretched button where the publisher's card is a stretched
          link — same geometry, the right element for what it does. */}
      {openable && (
        <button
          type="button"
          onClick={() => onOpen(resource)}
          aria-label={`Open ${resource.title}`}
          data-sound="open"
          className="absolute inset-0 z-0 rounded-lg focus:outline-none"
        />
      )}

      <div className="pointer-events-none relative z-10 flex items-center gap-3 p-3">
        {showCover ? (
          <img
            src={cover}
            alt=""
            loading="lazy"
            onError={() => setCoverFailed(true)}
            className="max-h-[4.5rem] w-12 shrink-0 rounded-md bg-muted/20 object-contain sm:w-14"
          />
        ) : (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug">{resource.title}</p>

          <div className="mt-1.5 flex flex-wrap items-center gap-1">
            <MetaPill>{resourceKindLabel(resource.kind)}</MetaPill>
            <MetaPill>{formatPublished(resource.published)}</MetaPill>
            {resource.wikiRef && (
              <span
                title="This document is a page in the Actuarial Notes wiki"
                className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300"
              >
                In wiki
              </span>
            )}
            {resource.sample && (
              <span
                title="A sample entry: it stands for this kind of document rather than naming one Cowork carries. Cite the real document."
                className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400"
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
            inLibrary ? `Remove ${resource.title} from your library` : `${attachLabel ?? 'Add'} ${resource.title}`
          }
          data-sound="press"
          className={cn(
            'pointer-events-auto inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 text-xs font-medium transition-colors',
            inLibrary
              ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-300'
              : 'border text-muted-foreground hover:bg-accent hover:text-foreground',
          )}
        >
          {inLibrary ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
          {inLibrary ? (attachLabel ? 'Attached' : 'Added') : attachLabel ?? 'Add'}
        </button>
      </div>
    </Card>
  )
}

/** The grid every list of resource cards is laid out on. */
export function ResourceCardGrid({ children }: { children: React.ReactNode }) {
  // `items-start` keeps a card its own size: a grid track otherwise stretches
  // every card to the tallest in its row, which turns a short card into a box
  // of empty space beside a card with a jacket.
  return <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
}
