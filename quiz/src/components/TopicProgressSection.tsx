import { useState } from 'react'
import { ChevronDown, ChevronRight, Info, CalendarDays, BookMarked } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { wikiRoute } from '@/lib/wikiRoutes'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import {
  aggregateForTopic,
  decayIfStale,
  type ConceptMasteryRecord,
  type MasteryState,
} from '@/lib/mastery'
import { ConceptDetailModal } from '@/components/ConceptDetailModal'
import {
  isScheduledToday,
  daysUntilScheduled,
  todayISO,
  type StudyPlan,
  type PacingStatus,
} from '@/lib/studyPlan'

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New',
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3',
  forgotten: 'Forgotten',
}

const STATE_TEXT_COLOR: Record<MasteryState, string> = {
  new: 'text-muted-foreground',
  level1: 'text-amber-500 dark:text-amber-400',
  level2: 'text-blue-500 dark:text-blue-400',
  level3: 'text-green-600 dark:text-green-400',
  forgotten: 'text-red-500',
}

function InfoPanel() {
  return (
    <div className="mt-2 rounded-md border bg-muted/50 p-3 text-xs text-muted-foreground space-y-2">
      <p className="font-medium text-foreground">How concept mastery works</p>
      <p>
        Each concept advances through four levels. The bar above each topic is the
        share of its concepts that have reached <span className="font-medium">Level 3</span>.
      </p>
      <ul className="space-y-1">
        <li><span className="font-medium text-muted-foreground">New</span> — never attempted.</li>
        <li><span className="font-medium text-amber-500 dark:text-amber-400">Level 1</span> — first correct answer; building familiarity.</li>
        <li><span className="font-medium text-blue-500 dark:text-blue-400">Level 2</span> — 2+ correct answers; practicing.</li>
        <li><span className="font-medium text-green-600 dark:text-green-400">Level 3</span> — 3+ corrects including at least one hard question; mastered.</li>
        <li><span className="font-medium text-red-500">Forgotten</span> — 15 days without a correct answer, or 3 wrong in a row.</li>
      </ul>
    </div>
  )
}

// ── Plan status badge ─────────────────────────────────────────────────────────

const PACING_CONFIG: Record<PacingStatus, { label: string; className: string }> = {
  on_track:     { label: 'On track',         className: 'border-green-200 text-green-700 dark:border-green-800 dark:text-green-400' },
  ahead:        { label: 'Ahead of pace',    className: 'border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400' },
  behind:       { label: 'Behind pace',      className: 'border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-400' },
  target_passed:{ label: 'Ready date passed',className: 'border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-400' },
  review_mode:  { label: 'Review mode',      className: 'border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-400' },
}

// Small inline badge for each concept's scheduled date
export function ConceptScheduleBadge({ conceptName, plan }: { conceptName: string; plan: StudyPlan }) {
  if (isScheduledToday(conceptName, plan)) {
    return (
      <span className="text-xs px-1.5 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary font-medium shrink-0">
        Today
      </span>
    )
  }
  const days = daysUntilScheduled(conceptName, plan)
  if (days === null) return null
  if (days < 0) return null  // past
  if (days <= 6) {
    return (
      <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
        in {days}d
      </span>
    )
  }
  return null
}

interface Props {
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
  studyPlan?: StudyPlan | null
}

export function TopicProgressSection({ syllabus, masteryRecords, studyPlan }: Props) {
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set())
  const [showInfo, setShowInfo] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState<{ name: string; state: MasteryState; index: number } | null>(null)

  const examKey = wikiExamIdToProgressKey(syllabus.examId)
  const examMastery = masteryRecords.filter(r => r.exam_id === examKey)
  const now = new Date()

  // Questions store concept_slug using the concept FILE name (e.g. "Bond Price"),
  // but the syllabus may display an alias (e.g. [[Bond Price|Price]] → c.name="Price").
  // Build a map from target (file name) → display name for aliased concepts so that
  // mastery records written under "Bond Price" are found when looking up "Price".
  const targetToDisplayName = new Map<string, string>()
  for (const topic of syllabus.topics) {
    for (const c of topic.concepts) {
      const tLow = c.target?.toLowerCase() ?? ''
      if (tLow && tLow !== c.name.toLowerCase()) {
        targetToDisplayName.set(tLow, c.name)
      }
    }
  }
  const normalizedMastery = examMastery.map(r => {
    const display = targetToDisplayName.get(r.concept_slug.toLowerCase())
    return display ? { ...r, concept_slug: display } : r
  })
  const recordsBySlug = new Map(normalizedMastery.map(r => [r.concept_slug.toLowerCase(), r]))

  const allConcepts: { name: string; state: MasteryState }[] = syllabus.topics.flatMap(topic =>
    topic.concepts.map(c => {
      const rec = recordsBySlug.get(c.name.toLowerCase())
      const state: MasteryState = rec ? decayIfStale(rec, now).state : 'new'
      return { name: c.name, state }
    })
  )

  const toggle = (name: string) =>
    setOpenTopics(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  // Derive plan summary data
  const today = todayISO()
  const todaysConcepts = studyPlan?.todaysConcepts ?? []
  const thisWeekAssignments = studyPlan?.assignments.filter(a => {
    const diff = Math.round(
      (new Date(a.scheduledDate + 'T12:00:00').getTime() - new Date(today + 'T12:00:00').getTime())
      / (1000 * 60 * 60 * 24)
    )
    return diff > 0 && diff <= 6
  }) ?? []
  const thisWeekConcepts = [...new Set(thisWeekAssignments.map(a => a.conceptName))]

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">{syllabus.examLabel}</CardTitle>
            <button
              onClick={() => setShowInfo(v => !v)}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              aria-label="How mastery tracking works"
            >
              <Info className="h-4 w-4" />
            </button>
            {studyPlan && (
              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${(PACING_CONFIG[studyPlan.status] ?? PACING_CONFIG.on_track).className}`}>
                {(PACING_CONFIG[studyPlan.status] ?? PACING_CONFIG.on_track).label}
              </span>
            )}
            {syllabus.fileName && (
              <Link
                to={wikiRoute({ kind: 'exam', name: syllabus.fileName })}
                className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                Study Guide
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
          {showInfo && <InfoPanel />}

          {/* Today's plan summary */}
          {studyPlan && studyPlan.config.targetReadyDate && studyPlan.status !== 'review_mode' && (
            <div className="mt-2 rounded-md border bg-muted/30 p-3 text-xs space-y-2">
              {todaysConcepts.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                    Today ({todaysConcepts.length} concept{todaysConcepts.length === 1 ? '' : 's'})
                  </div>
                  <div className="flex flex-wrap gap-1 pl-5">
                    {todaysConcepts.map(name => (
                      <span key={name} className="px-1.5 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {thisWeekConcepts.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-muted-foreground">
                    <BookMarked className="h-3.5 w-3.5 shrink-0" />
                    On deck this week ({thisWeekConcepts.length})
                  </div>
                  <p className="text-muted-foreground pl-5 leading-relaxed">
                    {thisWeekConcepts.slice(0, 4).join(', ')}
                    {thisWeekConcepts.length > 4 ? ` +${thisWeekConcepts.length - 4} more` : ''}
                  </p>
                </div>
              )}
              {todaysConcepts.length === 0 && thisWeekConcepts.length === 0 && (
                <p className="text-muted-foreground">No concepts scheduled in the near term.</p>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {syllabus.topics.map(topic => {
              const conceptSlugs = topic.concepts.map(c => c.name)
              const agg = aggregateForTopic(normalizedMastery, conceptSlugs, now)
              const isOpen = openTopics.has(topic.name)

              return (
                <div key={topic.name}>
                  {/* Top-level category header — one bar per topic */}
                  <button
                    className="flex items-center gap-2 w-full py-2 text-left hover:bg-muted/40 rounded-md px-1 -mx-1 transition-colors"
                    onClick={() => toggle(topic.name)}
                    aria-expanded={isOpen}
                  >
                    <ChevronDown
                      className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
                    />
                    <span className="text-sm font-semibold min-w-0 truncate">
                      {topic.name}
                      {topic.weight && (
                        <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                          {topic.weight}
                        </span>
                      )}
                    </span>
                    <div
                      className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden min-w-0"
                      role="progressbar"
                      aria-valuenow={agg.strongPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${agg.strong} of ${agg.total} concepts mastered`}
                    >
                      <div
                        className="h-full rounded-full bg-green-500 transition-all"
                        style={{ width: `${agg.strongPct}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium shrink-0 text-right w-12 tabular-nums text-muted-foreground">
                      {agg.strong}/{agg.total}
                    </span>
                  </button>

                  {/* Concept rows — clickable buttons that open the selector popup */}
                  {isOpen && topic.concepts.length > 0 && (
                    <div className="space-y-1 pl-5 border-l-2 border-border ml-2 mb-2 mt-1">
                      {topic.concepts.map(c => {
                        const rec = recordsBySlug.get(c.name.toLowerCase())
                        const state: MasteryState = rec ? decayIfStale(rec, now).state : 'new'
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => {
                            const idx = allConcepts.findIndex(ac => ac.name === c.name)
                            setSelectedConcept({ name: c.name, state, index: idx === -1 ? 0 : idx })
                          }}
                            className="flex items-center gap-2 w-full py-1 px-1 -mx-1 rounded hover:bg-muted/40 transition-colors text-left"
                          >
                            <span className="text-xs text-foreground min-w-0 flex-1 truncate" title={c.name}>
                              {c.name}
                            </span>
                            {studyPlan && state !== 'level3' && (
                              <ConceptScheduleBadge conceptName={c.name} plan={studyPlan} />
                            )}
                            <span className={`text-xs font-medium shrink-0 ${STATE_TEXT_COLOR[state]}`}>
                              {STATE_LABEL[state]}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedConcept && (
        <ConceptDetailModal
          conceptName={selectedConcept.name}
          masteryState={selectedConcept.state}
          onClose={() => setSelectedConcept(null)}
          syllabus={syllabus}
          allConcepts={allConcepts}
          initialConceptIndex={selectedConcept.index}
        />
      )}
    </>
  )
}
