import { useState } from 'react'
import { ChevronDown, ChevronRight, Info } from 'lucide-react'
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

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New',
  learning: 'Learning',
  strong: 'Strong',
  forgotten: 'Forgotten',
}

const STATE_TEXT_COLOR: Record<MasteryState, string> = {
  new: 'text-muted-foreground',
  learning: 'text-amber-600 dark:text-amber-400',
  strong: 'text-green-600 dark:text-green-400',
  forgotten: 'text-red-500',
}

function InfoPanel() {
  return (
    <div className="mt-2 rounded-md border bg-muted/50 p-3 text-xs text-muted-foreground space-y-2">
      <p className="font-medium text-foreground">How concept mastery works</p>
      <p>
        Each concept tracks one of four states. The bar above each topic is the
        share of its concepts that are currently <span className="font-medium">Strong</span>.
      </p>
      <ul className="space-y-1">
        <li><span className="font-medium text-muted-foreground">New</span> — never attempted.</li>
        <li><span className="font-medium text-amber-600 dark:text-amber-400">Learning</span> — at least one correct answer; not yet mastered.</li>
        <li><span className="font-medium text-green-600 dark:text-green-400">Strong</span> — 3+ corrects including at least one hard question.</li>
        <li><span className="font-medium text-red-500">Forgotten</span> — 15 days without a correct answer, or 3 wrong in a row.</li>
      </ul>
    </div>
  )
}

interface Props {
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
}

export function TopicProgressSection({ syllabus, masteryRecords }: Props) {
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set())
  const [showInfo, setShowInfo] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState<{ name: string; state: MasteryState } | null>(null)

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
      const tLow = c.target.toLowerCase()
      if (tLow !== c.name.toLowerCase()) {
        targetToDisplayName.set(tLow, c.name)
      }
    }
  }
  const normalizedMastery = examMastery.map(r => {
    const display = targetToDisplayName.get(r.concept_slug.toLowerCase())
    return display ? { ...r, concept_slug: display } : r
  })
  const recordsBySlug = new Map(normalizedMastery.map(r => [r.concept_slug.toLowerCase(), r]))

  const toggle = (name: string) =>
    setOpenTopics(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

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
                            onClick={() => setSelectedConcept({ name: c.name, state })}
                            className="flex items-center gap-2 w-full py-1 px-1 -mx-1 rounded hover:bg-muted/40 transition-colors text-left"
                          >
                            <span className="text-xs text-foreground min-w-0 flex-1 truncate" title={c.name}>
                              {c.name}
                            </span>
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
        />
      )}
    </>
  )
}
