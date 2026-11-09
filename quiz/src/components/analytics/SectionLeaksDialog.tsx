import { useEffect, useRef } from 'react'
import { BarChart3 } from 'lucide-react'
import type { SectionLeak } from '@/lib/performanceAnalytics'
import type { AccuracySpan } from '@/lib/accuracyTrend'
import { formatMarks } from '@/lib/analyticsSummary'
import { EXAM_LABEL_TO_ID } from '@/lib/examIds'
import { examAccentStyle } from '@/lib/examColors'
import { dialogOpenOver } from '@/lib/layeredDialog'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { ExamLogo } from '@/components/ExamLogo'
import { BannerTile, EXAM_BANNER, InfoBanner, InfoSheet, NEUTRAL_BANNER, Stat } from '@/components/ui/InfoSheet'
import { SectionLeaksList } from './SectionLeaksCard'

/**
 * **Where you're losing marks**, opened from the Analytics summary's *Marks at
 * risk* tile: every section's marks lost, each row a quiz on that section. The
 * banner adds them up — the marks the judged sections cost between them, and
 * how many sections are judged and still to judge.
 */
export function SectionLeaksDialog({ leaks, examLabel, span, onClose }: {
  leaks: SectionLeak[]
  examLabel: string
  /** The days the figures cover — the Analytics section's span. */
  span?: AccuracySpan
  onClose: () => void
}) {
  useSoundOnMount('open')
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !dialogOpenOver(dialogRef.current)) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const examKey = EXAM_LABEL_TO_ID[examLabel]
  const judged = leaks.filter(l => l.marksLost !== null)
  const unjudged = leaks.length - judged.length
  const lost = judged.reduce((n, l) => n + (l.marksLost ?? 0), 0)

  return (
    <InfoSheet
      onClose={onClose}
      label="Where you're losing marks"
      layer="z-[130]"
      dialogRef={dialogRef}
      style={examKey ? examAccentStyle(examKey) : undefined}
    >
      <InfoBanner
        tile={examKey ? <ExamLogo examKey={examKey} size="md" /> : <BannerTile><BarChart3 className="h-5 w-5" /></BannerTile>}
        eyebrow={span ? `${examLabel} · past ${span} days` : examLabel}
        title="Where you’re losing marks"
        titleId="leaks-heading"
        onClose={onClose}
        tint={examKey ? EXAM_BANNER : NEUTRAL_BANNER}
        stats={judged.length > 0 ? [
          <Stat key="lost" value={`−${formatMarks(lost)}`} label="marks of 100" accent />,
          <Stat key="judged" value={judged.length} label={judged.length === 1 ? 'section judged' : 'sections judged'} />,
          unjudged > 0 ? <Stat key="unjudged" value={unjudged} label="to judge" /> : null,
        ] : undefined}
      />
      <SectionLeaksList leaks={leaks} examLabel={examLabel} />
    </InfoSheet>
  )
}
