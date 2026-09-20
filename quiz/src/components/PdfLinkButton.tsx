import type { LucideIcon } from 'lucide-react'
import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { opensInReader } from '@/lib/examPdf'
import { openPdfReader } from '@/hooks/usePdfReader'

/**
 * **The** PDF button. One published document, opened in the app's reader.
 *
 * Wherever the app offers a PDF — a sitting's examiner's report and its
 * solutions on the past-paper shelf, an exam's published syllabus beside the
 * study guide's title, a resource page's "Read PDF", the paper behind the
 * question on screen, a source the Fact Check panel was checked against — it is
 * this button, so a candidate never loses their place to a browser tab.
 *
 * It stays an anchor to the publisher underneath. A plain left click reads the
 * document here; ⌘/ctrl-click, middle-click, shift-click and long-press keep
 * doing what a link does, the real URL stays visible in the status bar, and a
 * source the proxy won't serve (`lib/examPdf.ts`) is left as an ordinary
 * out-link rather than opening a panel that can't load. `opensInReader` is that
 * rule, in one tested place.
 */

interface PdfLinkButtonProps {
  /** The publisher's URL for the document. */
  url: string
  /** What the button says — "Examiner's Report", "Syllabus", "Read PDF". */
  label: string
  /** The reader's own title; defaults to `label`. */
  title?: string
  /** The reader's subtitle — which paper or work this belongs to. */
  subtitle?: string
  /** Opened from a full-screen surface (the popup in focus mode)? */
  hostFullScreen?: boolean
  /** Force the out-link, for a surface the reader must not cover. */
  linkOnly?: boolean
  /**
   * Runs when the reader takes the click. A host whose whole job was to point
   * at this document (the quiz's Question info panel) uses it to get out of the
   * way; a host the reader is read *beside* leaves it alone.
   */
  onOpen?: () => void
  /** The leading icon. A page of text unless the host has a better one. */
  icon?: LucideIcon
  /** The `PDF` chip after the label. On unless the label already says it. */
  chip?: boolean
  /** The `title` attribute — a tooltip, not the reader's heading. */
  tooltip?: string
  /**
   * What a screen reader hears, when the button's own words don't name the
   * document ("Read PDF" on a resource card says nothing about *which*).
   */
  ariaLabel?: string
  className?: string
}

/** An unmodified left click — what the aria-label is written for. */
const PLAIN_CLICK = {
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  button: 0,
} as const

/** The shape every PDF button shares: a thumb-sized filled target, not fine print. */
const BASE_CLASS =
  'inline-flex min-h-[36px] items-center gap-2 rounded-md border border-border px-3 py-1.5 ' +
  'text-sm font-medium text-foreground no-underline shadow-sm transition-colors ' +
  'hover:bg-accent hover:text-accent-foreground ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

export function PdfLinkButton({
  url,
  label,
  title,
  subtitle,
  hostFullScreen,
  linkOnly = false,
  onOpen,
  icon: Icon = FileText,
  chip = true,
  tooltip,
  ariaLabel,
  className,
}: PdfLinkButtonProps) {
  // Whether *a* plain click would open here, for the label a screen reader
  // hears. The click itself re-decides with the modifiers it actually carries.
  const readsHere = opensInReader(url, PLAIN_CLICK, linkOnly)
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      title={tooltip}
      aria-label={ariaLabel ?? (readsHere ? `View ${label} (PDF)` : `Open ${label} (PDF)`)}
      onClick={e => {
        if (!opensInReader(url, e, linkOnly)) return
        e.preventDefault()
        onOpen?.()
        openPdfReader({ url, title: title ?? label, subtitle, hostFullScreen })
      }}
      className={cn('not-prose bg-card', BASE_CLASS, className)}
    >
      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      {label}
      {chip && (
        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          PDF
        </span>
      )}
    </a>
  )
}
