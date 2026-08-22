import { useState } from 'react'
import { ExternalLink, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isSupportedPdfSource } from '@/lib/examPdf'
import { PdfViewerPanel } from '@/components/PdfViewerPanel'
import type { ResourceMeta } from '@/lib/resourceMeta'

/**
 * The metadata card at the top of a resource page — the jacket, who wrote it,
 * and the one action the page offers (get hold of the source).
 *
 * It is the page's title block, so it carries the resource's *title* on both
 * surfaces. The popup header above it shows the vault's filename
 * ("Introduction to Mathematical Statistics (Hogg et al. - 2018)"); the card
 * shows the clean authored title, and reads as the citation the page is built
 * on rather than a repeat of the chrome.
 *
 * Hierarchy inside the card, top to bottom (docs/style-guide.md §3): a muted
 * kicker for the *kind* of source, the title, the author, then the
 * bibliographic facts as outline chips and the action as the one filled
 * control. Chips are deliberately outlined and the button filled — the passive
 * facts and the thing to press must not read as the same object.
 */

interface ResourceMetaCardProps {
  meta: ResourceMeta
  compact?: boolean
}

export function ResourceMetaCard({ meta, compact }: ResourceMetaCardProps) {
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
  // Standards pages name the same body as both author and publisher — say it once.
  const publisher = meta.publisher === meta.author ? undefined : meta.publisher
  // Reads left to right like a citation, with the identifiers last.
  const facts = [
    meta.edition && `${meta.edition} ed.`,
    meta.year,
    publisher,
    meta.code,
    meta.isbn && `ISBN ${meta.isbn}`,
  ].filter((f): f is string => Boolean(f))
  const copyLabel = canView ? 'Read PDF' : isPdf ? 'Download PDF' : 'Get a copy'
  const heading = compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'

  return (
    <div
      className={cn(
        // Three shape decisions worth keeping:
        //
        // `border` — the popup this can sit in is itself `bg-card`, so the fill
        // alone leaves no edge; the hairline is what makes it a card there
        // (style-guide §6.2: an inset region takes the border, not a shadow).
        // `w-fit` — sized to its content rather than stretched across the pane.
        // A citation block with a third of its width empty reads as a bug.
        // `items-center` — the jacket is usually the taller column, so anchoring
        // the text to the top of it left the card bottom-heavy with dead space.
        'not-prose flex w-fit max-w-full items-center gap-4 rounded-lg border border-border bg-card',
        compact ? 'mb-3 p-3' : 'mb-4 p-4',
      )}
    >
      {meta.coverImageUrl && !coverFailed && (
        <div className={cn('shrink-0', compact ? 'w-20' : 'w-24 sm:w-28')}>
          {/* Natural aspect, never cropped: the real jackets range from 2:3 to
              4:5 and the generated covers are 400×580, so a fixed ratio would
              slice the top off one of them. */}
          <img
            src={meta.coverImageUrl}
            alt={meta.title ? `Cover of ${meta.title}` : 'Cover'}
            className="w-full rounded-md border border-border shadow-sm"
            onError={() => setCoverFailed(true)}
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {meta.type && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {meta.type}
          </p>
        )}
        {meta.title && (
          <h2 className={cn('font-semibold leading-snug tracking-tight', heading)}>{meta.title}</h2>
        )}
        {meta.author && (
          <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{meta.author}</p>
        )}

        {facts.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {facts.map(fact => (
              <li
                key={fact}
                className="rounded-md border border-border px-2 py-0.5 text-xs leading-5 text-muted-foreground"
              >
                {fact}
              </li>
            ))}
          </ul>
        )}

        {meta.getCopyUrl && (
          // A control, not fine print: getting hold of the source is the one
          // action this card offers, so it takes the same shape as the mock-exam
          // shelf's report button — a thumb-sized filled target with the file
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
            className="mt-3 inline-flex min-h-[36px] items-center gap-2 self-start rounded-md border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
