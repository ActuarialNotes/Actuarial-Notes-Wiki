import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConceptDetailModal } from '@/components/ConceptDetailModal'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { computeReadiness, type SectionReadiness } from '@/lib/readiness'

// ── Radial donut chart ─────────────────────────────────────────────────────────
//
// Each section occupies an arc proportional to its syllabus weight.
// The arc's opacity encodes readiness: 0.12 (0%) → 1.0 (100%).
// A 2-degree gap separates adjacent arcs for clarity.

const CX = 80
const CY = 80
const R_OUTER = 66
const R_INNER = 44
const GAP_DEG = 2

function degreesToRadians(deg: number) { return (deg * Math.PI) / 180 }

function polarToCart(cx: number, cy: number, r: number, angleDeg: number) {
  const a = degreesToRadians(angleDeg - 90) // start at 12 o'clock
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

function arcPath(startDeg: number, endDeg: number, rOuter: number, rInner: number): string {
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  const o1 = polarToCart(CX, CY, rOuter, startDeg)
  const o2 = polarToCart(CX, CY, rOuter, endDeg)
  const i1 = polarToCart(CX, CY, rInner, endDeg)
  const i2 = polarToCart(CX, CY, rInner, startDeg)
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${i2.x} ${i2.y}`,
    'Z',
  ].join(' ')
}

function ReadinessDonut({ sections }: { sections: SectionReadiness[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  const totalWeight = sections.reduce((s, sec) => s + sec.weight, 0) || 1
  const arcs = useMemo(() => {
    let cursor = 0
    return sections.map((sec, i) => {
      const span = (sec.weight / totalWeight) * 360
      const startDeg = cursor + (i === 0 ? 0 : GAP_DEG / 2)
      const endDeg = cursor + span - (i === sections.length - 1 ? 0 : GAP_DEG / 2)
      cursor += span
      const opacity = 0.12 + 0.88 * (sec.readinessPct / 100)
      return { sec, startDeg, endDeg, opacity }
    })
  }, [sections, totalWeight])

  const hoveredSec = hovered !== null ? arcs[hovered]?.sec : null

  return (
    <div className="relative flex items-center justify-center">
      <svg width={CX * 2} height={CY * 2} viewBox={`0 0 ${CX * 2} ${CY * 2}`} role="img" aria-label="Section readiness donut chart">
        {/* Track ring */}
        <circle cx={CX} cy={CY} r={(R_OUTER + R_INNER) / 2} fill="none" strokeWidth={R_OUTER - R_INNER} stroke="rgba(34,197,94,0.06)" />
        {arcs.map(({ sec, startDeg, endDeg, opacity }, i) => (
          <path
            key={sec.name}
            d={arcPath(startDeg, endDeg, R_OUTER, R_INNER)}
            fill={`rgba(34,197,94,${opacity.toFixed(2)})`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-default transition-opacity"
            style={{ opacity: hovered !== null && hovered !== i ? 0.5 : 1 }}
          />
        ))}
      </svg>

      {/* Centre label — shows hovered section or overall */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        {hoveredSec ? (
          <>
            <span className="text-lg font-bold leading-none">{Math.round(hoveredSec.readinessPct)}%</span>
            <span className="text-[9px] text-muted-foreground mt-0.5 max-w-[60px] leading-tight">{hoveredSec.name}</span>
          </>
        ) : (
          <span className="text-lg font-bold leading-none text-muted-foreground">hover</span>
        )}
      </div>
    </div>
  )
}

// ── ReadinessCard ──────────────────────────────────────────────────────────────

interface Props {
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
}

export function ReadinessCard({ syllabus, masteryRecords }: Props) {
  const navigate = useNavigate()
  const [conceptModalOpen, setConceptModalOpen] = useState(false)

  const now = useMemo(() => new Date(), [])
  const progressKey = wikiExamIdToProgressKey(syllabus.examId)
  const examRecords = useMemo(
    () => masteryRecords.filter(r => r.exam_id === progressKey),
    [masteryRecords, progressKey],
  )

  const { overallPct, sections } = useMemo(
    () => computeReadiness(syllabus, examRecords, now),
    [syllabus, examRecords, now],
  )

  const allConcepts = useMemo(
    () => syllabus.topics.flatMap(t => t.concepts.map(c => ({
      name: c.name,
      state: (examRecords.find(r =>
        r.concept_slug.toLowerCase() === c.name.toLowerCase() ||
        r.concept_slug.toLowerCase() === c.target.toLowerCase()
      )?.state ?? 'new') as MasteryState,
    }))),
    [syllabus, examRecords],
  )

  function handleStartQuiz() {
    navigate(`/?topic=${encodeURIComponent(syllabus.examTopic)}`)
  }

  return (
    <>
      <Card className="border-primary/40 ring-1 ring-primary/10 shadow-sm">
        <CardContent className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl font-semibold truncate">{syllabus.examLabel}</h2>
            <span className="text-sm text-muted-foreground shrink-0">Exam Readiness</span>
          </div>

          {/* Body: score + donut */}
          <div className="flex items-center gap-6">
            {/* Overall score */}
            <div className="flex flex-col items-center justify-center gap-1 shrink-0">
              <span className="text-4xl font-bold tabular-nums leading-none">
                {Math.round(overallPct)}%
              </span>
              <span className="text-xs text-muted-foreground">overall</span>
            </div>

            {/* Radial widget */}
            <ReadinessDonut sections={sections} />

            {/* Section legend */}
            <div className="flex flex-col gap-1.5 min-w-0 flex-1">
              {sections.map(sec => (
                <div key={sec.name} className="flex items-center gap-2 min-w-0">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: `rgba(34,197,94,${(0.12 + 0.88 * (sec.readinessPct / 100)).toFixed(2)})` }}
                  />
                  <span className="text-xs text-muted-foreground truncate flex-1">{sec.name}</span>
                  <span className="text-xs font-medium tabular-nums shrink-0">{Math.round(sec.readinessPct)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="outline"
              onClick={() => setConceptModalOpen(true)}
              disabled={allConcepts.length === 0}
              className="gap-1.5 text-sm"
            >
              <BookOpen className="h-4 w-4" />
              Read concepts
            </Button>
            <Button
              onClick={handleStartQuiz}
              className="gap-1.5 text-sm"
            >
              <Play className="h-4 w-4" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>

      {conceptModalOpen && allConcepts.length > 0 && (
        <ConceptDetailModal
          conceptName={allConcepts[0].name}
          masteryState={allConcepts[0].state}
          onClose={() => setConceptModalOpen(false)}
          syllabus={syllabus}
          allConcepts={allConcepts}
          initialConceptIndex={0}
        />
      )}
    </>
  )
}
