import { useState } from 'react'
import { ExternalLink, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isSupportedPdfSource } from '@/lib/examPdf'
import { PdfViewerPanel } from '@/components/PdfViewerPanel'
import type { ResourceMeta } from '@/lib/resourceMeta'

interface ResourceMetaCardProps {
  meta: ResourceMeta
  compact?: boolean
  // The popup already shows the resource's name in its header, so the card
  // there would just repeat it.
  showTitle?: boolean
}

export function ResourceMetaCard({ meta, compact, showTitle = true }: ResourceMetaCardProps) {
  // A cover that fails to load drops its column entirely — no empty gutter.
  const [coverFailed, setCoverFailed] = useState(false)
  const [viewing, setViewing] = useState(false)
  const isPdf = meta.getCopyUrl ? /\.pdf$/i.test(meta.getCopyUrl) : false
  // A source document we can proxy is read here, in the same slide-up reader
  // the exam papers use, rather than handed to a browser tab the reader then
  // has to find their way back from. A PDF on a publisher the proxy won't serve
  // (and every non-PDF link — a library catalogue, a publisher's shop page)
  // stays an ordinary out-link.
  const canView = !!meta.getCopyUrl && isPdf && isSupportedPdfSource(meta.getCopyUrl)
  const CopyIcon = isPdf ? FileText : ExternalLink
  // One size for every line of metadata; colour, not scale, sets the hierarchy.
  // Standards pages name the same body as both author and publisher — say it once.
  const publisher = meta.publisher === meta.author ? undefined : meta.publisher
  const meta1 = [meta.year, meta.edition && `${meta.edition} ed.`, publisher].filter(Boolean)
  const meta2 = [meta.isbn && `ISBN ${meta.isbn}`, meta.type, meta.code].filter(Boolean)
  const copyLabel = canView ? 'Read PDF' : isPdf ? 'Download PDF' : 'Get a copy'

  return (
    <div className={cn('flex gap-3 rounded-lg bg-card p-3 not-prose', compact ? 'mb-3' : 'mb-4')}>
      {meta.coverImageUrl && !coverFailed && (
        <div className={cn('flex-shrink-0', compact ? 'w-14' : 'w-20 sm:w-24')}>
          <img
            src={meta.coverImageUrl}
            alt={meta.title ?? 'Cover'}
            className="w-full rounded object-cover shadow-sm"
            onError={() => setCoverFailed(true)}
          />
        </div>
      )}
      <div className="flex flex-col gap-0.5 min-w-0 text-sm leading-snug">
        {showTitle && meta.title && (
          <p className="font-semibold text-base leading-snug">{meta.title}</p>
        )}
        {meta.author && <p className="font-medium">{meta.author}</p>}
        {meta1.length > 0 && (
          <p className="text-muted-foreground">{meta1.join(' · ')}</p>
        )}
        {meta2.length > 0 && (
          <p className="text-muted-foreground">{meta2.join(' · ')}</p>
        )}
        {meta.getCopyUrl && (
          // A control, not fine print: getting hold of the source is the one
          // action this card offers, so it takes the same shape as the mock-exam
          // shelf's report button — a thumb-sized bordered target with the file
          // type spelled out — rather than a text link the eye slides past.
          //
          // Still an anchor to the publisher underneath when it opens the
          // reader: a plain click reads it here, but ⌘/ctrl-click, middle-click
          // and long-press keep working the way a link does, and the real URL
          // stays visible.
          <a
            href={meta.getCopyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              canView
                ? `Read ${meta.title ?? 'this resource'} (PDF)`
                : isPdf
                ? `Download ${meta.title ?? 'this resource'} (PDF)`
                : `Get a copy of ${meta.title ?? 'this resource'}`
            }
            onClick={e => {
              if (!canView || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
              e.preventDefault()
              setViewing(true)
            }}
            className="mt-2 inline-flex min-h-[36px] items-center gap-2 self-start rounded-md border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <CopyIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            {copyLabel}
            {isPdf && (
              <span className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                PDF
              </span>
            )}
          </a>
        )}
      </div>

      {viewing && canView && meta.getCopyUrl && (
        <PdfViewerPanel
          url={meta.getCopyUrl}
          title={meta.title ?? 'Source document'}
          subtitle={[meta.author, meta.year].filter(Boolean).join(' · ') || undefined}
          onClose={() => setViewing(false)}
        />
      )}
    </div>
  )
}
