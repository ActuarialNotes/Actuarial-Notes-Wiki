import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { FACT_CHECK_UI_ENABLED } from '@/lib/featureFlags'
import { factCheckBadge, factCheckOverview, formatCheckedDate, type FactCheckTone, type Verification } from '@/lib/verification'
import { FACT_CHECK_TONE_CLASSES, FACT_CHECK_ICONS } from '@/lib/factCheckTone'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { useIsReadingPdf } from '@/hooks/usePdfReader'
import { BannerTile, InfoBanner, InfoSheet, NEUTRAL_BANNER, Stat } from '@/components/ui/InfoSheet'
import { FactCheckPanel } from '@/components/FactCheckPanel'

/**
 * **Fact Check** — the one badge that says what has been checked about a page.
 *
 * It is a trust signal, and a trust signal that can only be good is worth
 * nothing — so this shows "Not fact checked" as readily as it shows "Fact
 * checked", and tapping any state opens the page's fact-check record. Showing
 * the work is the point (docs/verification.md).
 *
 * The dialog half is exported on its own as `FactCheckDialog`, because on a
 * concept or resource page the way in is the **Fact Check** row of the action
 * menu rather than a badge in the title row.
 */

interface FactCheckBadgeProps {
  verification: Verification | null | undefined
  /** Repo-relative path of the page, e.g. `Concepts/Convexity.md`. */
  contentPath: string
  /** Human-readable page name, for the log panel's header. */
  contentName?: string
  className?: string
  /** Hide the label and show only the icon — for dense rows. */
  compact?: boolean
}

export function FactCheckBadge({
  verification,
  contentPath,
  contentName,
  className,
  compact = false,
}: FactCheckBadgeProps) {
  const [open, setOpen] = useState(false)
  if (!FACT_CHECK_UI_ENABLED) return null

  const badge = factCheckBadge(verification)
  const Icon = FACT_CHECK_ICONS[badge.kind]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-sound="tap"
        title={`${badge.label} — ${badge.detail} Tap to see the fact check.`}
        aria-label={`Fact check: ${badge.label}. ${badge.detail}`}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
          'transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring',
          FACT_CHECK_TONE_CLASSES[badge.tone],
          className,
        )}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {!compact && <span className="truncate">{badge.label}</span>}
      </button>

      <FactCheckDialog
        open={open}
        onClose={() => setOpen(false)}
        verification={verification}
        contentPath={contentPath}
        contentName={contentName}
      />
    </>
  )
}

interface FactCheckDialogProps {
  open: boolean
  onClose: () => void
  verification: Verification | null | undefined
  contentPath: string
  contentName?: string
}

/** The fact-check record for one page, in the sheet every surface opens it in. */
export function FactCheckDialog(props: FactCheckDialogProps) {
  if (!props.open || !FACT_CHECK_UI_ENABLED) return null
  return <FactCheckSheet {...props} />
}

/**
 * Mounted only while open, so the sound and the key handler belong to one
 * viewing rather than to the surface that owns the button.
 *
 * An info popup (`components/ui/InfoSheet.tsx`): the verdict leads as the
 * banner, tinted in its tone — the page's name over the verdict, and the
 * strip's figures (when last checked, against how many sources, how many
 * issues are open) — and the record follows as one grouped surface. A verdict
 * the figures can't say (stale, under review, unchecked) keeps its sentence.
 */
function FactCheckSheet({
  onClose,
  verification,
  contentPath,
  contentName,
}: FactCheckDialogProps) {
  // Paper: the panel sliding in, the same cue as the question-info sheet.
  useSoundOnMount('open')
  // A source from the "Checked against" shelf is read over this sheet, and the
  // reader binds Esc itself — so the sheet hands the key over while a document
  // is up, or one press closed the document *and* the record behind it.
  const readingPdf = useIsReadingPdf()
  useEffect(() => {
    if (readingPdf) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, readingPdf])

  const badge = factCheckBadge(verification)
  const overview = factCheckOverview(verification)
  const VerdictIcon = FACT_CHECK_ICONS[badge.kind]
  const checked = badge.kind === 'checked' || badge.kind === 'checked-open' || badge.kind === 'issue'
  const date = formatCheckedDate(verification?.lastChecked ?? null)
  const sources = verification?.sources.length ?? 0

  return (
    <InfoSheet
      onClose={onClose}
      label={`Fact check for ${contentName ?? contentPath}`}
      layer="z-[130]"
    >
      <InfoBanner
        tile={(
          <BannerTile className={FACT_CHECK_TONE_CLASSES[badge.tone]}>
            <VerdictIcon className="h-5 w-5" />
          </BannerTile>
        )}
        eyebrow={contentName ?? contentPath}
        title={badge.label.split(' · ')[0]}
        onClose={onClose}
        tint={BANNER_TINT[badge.tone]}
        stats={checked ? [
          date ? <Stat key="date" value={date.endsWith(String(new Date().getFullYear())) ? date.replace(/ \d{4}$/, '') : date} label="last checked" tone={STAT_TONE[badge.tone]} /> : null,
          sources > 0 ? <Stat key="sources" value={sources} label={sources === 1 ? 'source' : 'sources'} /> : null,
          <Stat key="open" value={verification?.openFindings ?? 0} label={(verification?.openFindings ?? 0) === 1 ? 'open issue' : 'open issues'} />,
        ] : undefined}
      >
        {!checked && <p className="px-3.5 pb-3.5 text-sm text-muted-foreground">{overview.sentence}</p>}
      </InfoBanner>

      <FactCheckPanel
        verification={verification}
        contentPath={contentPath}
        contentName={contentName}
      />
    </InfoSheet>
  )
}

/** The banner's wash, in the verdict's tone. */
const BANNER_TINT: Record<FactCheckTone, string> = {
  green: 'bg-green-500/10',
  amber: 'bg-amber-500/10',
  red: 'bg-red-500/10',
  grey: NEUTRAL_BANNER,
}

/** The date figure, in the verdict's colour. */
const STAT_TONE: Record<FactCheckTone, string> = {
  green: 'text-green-700 dark:text-green-400',
  amber: 'text-amber-700 dark:text-amber-400',
  red: 'text-red-700 dark:text-red-400',
  grey: '',
}
