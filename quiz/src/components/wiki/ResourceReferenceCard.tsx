import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FactCheckBadge } from '@/components/FactCheckBadge'
import { GroupRow, GroupSurface } from '@/components/ui/GroupedList'
import { ResourceCopyAction } from '@/components/wiki/ResourceMetaCard'
import { SyllabusAssignmentRow } from '@/components/wiki/SyllabusAssignmentRow'
import { resourceFacts, type ResourceMeta, type SyllabusAssignment } from '@/lib/resourceMeta'
import type { Verification } from '@/lib/verification'
import type { PdfReaderDoc } from '@/hooks/usePdfReader'
import type { WikiTitleAction } from '@/components/wiki/WikiArticle'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

/**
 * The top of a resource page, the Reference Card (docs/resource-page-v2.md):
 * what the document is, how to get it, and why a candidate reads it, before
 * anything of its contents.
 *
 * Top to bottom: the cover beside the kind of document, its title and its
 * authors; the actions — the one way to get hold of it (`ResourceCopyAction`)
 * and its Fact Check verdict beside it (decision D-RP3); then one grouped list
 * of the bibliographic facts (`resourceFacts`), with a row for each exam the
 * document is a reading for (`SyllabusAssignmentRow`) at its foot.
 *
 * Both surfaces a resource page is read on draw it: the page route
 * (`WikiResource`) and the concept popup (`ConceptPagePanel`, `compact`). The
 * shelves and the Fact Check panel's *Checked against* list keep
 * `ResourceMetaCard`, which draws a resource as a card among others.
 */
export function ResourceReferenceCard({
  meta,
  assignments,
  verification,
  contentPath,
  contentName,
  onOpen,
  onReadPdf,
  titleAction,
  compact,
  children,
  className,
}: {
  meta: ResourceMeta
  assignments: SyllabusAssignment[]
  verification?: Verification | null
  /** The page's vault path, for the Fact Check panel. */
  contentPath: string
  contentName: string
  /** Open an exam's study guide from its syllabus row. */
  onOpen: (ref: WikiEntryRef) => void
  /** Read the PDF as the popup's next page rather than in the app's reader. */
  onReadPdf?: (doc: PdfReaderDoc) => void
  /** Makes the title the page's action-menu trigger (the page route). */
  titleAction?: WikiTitleAction
  compact?: boolean
  /** Anything the host adds under the facts (the Assumptions Bank's sets). */
  children?: ReactNode
  className?: string
}) {
  const [coverFailed, setCoverFailed] = useState(false)
  const facts = resourceFacts(meta)
  const title = meta.title ?? contentName
  const hasFactCheck = verification !== undefined

  return (
    <div className={cn('not-prose flex flex-col', compact ? 'gap-3' : 'gap-4', className)}>
      <div className="flex items-end gap-4">
        {meta.coverImageUrl && !coverFailed && (
          // Natural aspect, never cropped: the jackets range from 2:3 to 4:5.
          <img
            src={meta.coverImageUrl}
            alt={`Cover of ${title}`}
            className={cn('shrink-0 rounded-md border border-border shadow-sm', compact ? 'w-20' : 'w-24 sm:w-28')}
            onError={() => setCoverFailed(true)}
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {meta.type && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{meta.type}</p>
          )}
          <h2 className={cn('font-semibold leading-tight tracking-tight', compact ? 'text-lg' : 'text-xl sm:text-2xl')}>
            {titleAction ? (
              <button
                ref={titleAction.ref}
                type="button"
                data-play-menu-trigger
                onClick={titleAction.onToggle}
                aria-haspopup="menu"
                aria-expanded={titleAction.open}
                aria-label={titleAction.label}
                className="action-title-underline text-left"
              >
                {title}
              </button>
            ) : title}
          </h2>
          {meta.author && <p className="text-sm leading-snug text-muted-foreground">{meta.author}</p>}
        </div>
      </div>

      {(meta.getCopyUrl || hasFactCheck) && (
        <div className="flex flex-wrap items-center gap-2">
          <ResourceCopyAction meta={meta} onReadPdf={onReadPdf} />
          {hasFactCheck && (
            <FactCheckBadge
              verification={verification}
              contentPath={contentPath}
              contentName={contentName}
              undated
              className="min-h-[36px] px-3 text-sm"
            />
          )}
        </div>
      )}

      {(facts.length > 0 || assignments.length > 0) && (
        <GroupSurface className="border border-border">
          {facts.map(f => (
            <GroupRow
              key={f.label}
              label={<span className="text-muted-foreground">{f.label}</span>}
              value={<span className="text-foreground">{f.value}</span>}
              className="min-h-[44px]"
            />
          ))}
          {assignments.map(a => (
            <div key={a.exam}>
              <SyllabusAssignmentRow assignment={a} onOpen={onOpen} compact />
            </div>
          ))}
        </GroupSurface>
      )}

      {children}
    </div>
  )
}
