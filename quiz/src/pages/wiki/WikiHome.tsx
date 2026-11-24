// Study Guides' home (docs/redesign-spec.md §6, Phase E). The exam list that
// stood here is the exam switcher's now: the page leads with the exam in focus
// and the way to the reader's others, then the guides that belong to no exam,
// the Resources shelf and the six credentials. The full ladder, with the
// in-development exams folded, is Add an exam.

import { useEffect, useMemo, useState } from 'react'
import { Award, Compass, Microscope, Plus } from 'lucide-react'
import { RESEARCH_TAB_ENABLED } from '@/lib/featureFlags'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { buildWikiIndex, bundledWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { requirementDisplayName, wikiRoute } from '@/lib/wikiRoutes'
import { TRACKS } from '@/data/tracks'
import { GENERAL_GUIDES } from '@/data/examGuides'
import { ExamDateMeta, ExamRow, ExamRowMeta } from '@/components/ExamRow'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { LogoTile } from '@/components/LogoTile'
import { useWikiPage } from '@/hooks/useWikiPage'
import { StudyGuidesPageRow } from '@/components/wiki/StudyGuidesPageRow'
import { useExamProgress } from '@/contexts/examProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { computeExamReadiness } from '@/lib/readiness'
import { examStatus } from '@/lib/examStatus'
import { useWikiPageHead } from '@/hooks/useWikiPageHead'
import { useExamSwitcher } from '@/stores/examSwitcher'

/** The credentials, in the order the page lists them. */
const CREDENTIALS = ['ASA', 'FSA', 'ACAS', 'FCAS', 'ACIA', 'FCIA']

function formatTargetDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

function SectionHeading({ children }: { children: string }) {
  return <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</h2>
}

export default function WikiHome() {
  const { loading } = useWikiSyllabus()
  const { setPageRefs, setExamId } = useWikiPage()
  useWikiPageHead('hub', '')
  const { targetDates } = useExamProgress()
  const { records: masteryRecords } = useConceptMastery()
  const openAt = useConceptPopup(s => s.openAt)
  const { active, activeKey, exams, loading: examsLoading } = useExamInFocus()
  const openSwitcher = useExamSwitcher(s => s.open)
  const openAddExam = useExamSwitcher(s => s.openAdd)
  // Seeded from the bundle, so the Resources row's count is there on the first frame.
  const [index, setIndex] = useState<WikiIndexItem[]>(() => bundledWikiIndex() ?? [])

  useEffect(() => {
    setPageRefs([])
    setExamId(null)
  }, [setPageRefs, setExamId])

  useEffect(() => {
    buildWikiIndex().then(setIndex).catch(() => setIndex([]))
  }, [])

  const resourceCount = useMemo(() => index.filter(i => i.category === 'document').length, [index])

  // The exam in focus, as the one row that opens its study guide: when it is
  // sat, and how much of its syllabus is covered (`computeExamReadiness`).
  const focus = useMemo(() => {
    if (!active || !activeKey || !active.fileName) return null
    const readiness = computeExamReadiness(active, masteryRecords.filter(r => r.exam_id === activeKey), new Date())
    return {
      name: requirementDisplayName(active.fileName),
      to: wikiRoute({ kind: 'exam', name: active.fileName }),
      status: examStatus(activeKey, active.examId),
      targetDate: targetDates[activeKey] ?? null,
      pct: readiness.counts.total > 0 ? Math.round(readiness.overallPct) : null,
    }
  }, [active, activeKey, masteryRecords, targetDates])

  const credentials = useMemo(
    () => CREDENTIALS.map(key => TRACKS.find(t => t.key === key)).filter(t => t != null && t.conceptPage != null),
    [],
  )

  return (
    <div className="space-y-8">
      <header>
        <h1 className="truncate text-2xl font-bold tracking-tight">Study Guides</h1>
      </header>

      {/* The exam in focus, and the way to the others. */}
      <section aria-label="Your exam" data-testid="study-guides-exam">
        {loading || examsLoading ? (
          <p className="text-sm text-muted-foreground">Loading exams…</p>
        ) : (
          <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
            {focus && active && activeKey && (
              <ListPanel>
                <ExamRow
                  examKey={activeKey}
                  title={focus.name}
                  topic={active.examTopic}
                  status={focus.status}
                  to={focus.to}
                  tourId={activeKey === 'P' ? 'exam-p' : undefined}
                  meta={(
                    <ExamRowMeta
                      items={[
                        focus.targetDate && <ExamDateMeta>Exam: {formatTargetDate(focus.targetDate)}</ExamDateMeta>,
                        focus.pct !== null && `${focus.pct}% of the syllabus`,
                      ]}
                    />
                  )}
                />
              </ListPanel>
            )}
            <ListPanel>
              {exams.length > 0 ? (
                <ListRow
                  onClick={() => openSwitcher()}
                  data-testid="study-guides-your-exams"
                  leading={<LogoTile size="lg" className="border border-dashed border-foreground"><Plus className="h-6 w-6" /></LogoTile>}
                  title="Your exams"
                  meta={<span>{exams.length === 1 ? 'Switch, or add an exam' : `${exams.length} exams. Switch, or add one`}</span>}
                />
              ) : (
                <ListRow
                  onClick={() => openAddExam()}
                  data-testid="study-guides-add-exam"
                  leading={<LogoTile size="lg" className="border border-dashed border-foreground"><Plus className="h-6 w-6" /></LogoTile>}
                  title="Add an exam"
                  meta={<span>Every SOA, CAS and CIA exam</span>}
                />
              )}
            </ListPanel>
          </div>
        )}
      </section>

      {/* The guides that belong to no single exam, and the tab's other page. */}
      <section>
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
          {GENERAL_GUIDES.map(guide => (
            <ListPanel key={guide.ref.path ?? guide.title}>
              <ListRow
                onClick={() => openAt([guide.ref], 0, '/wiki')}
                leading={
                  <LogoTile size="lg" className="bg-foreground text-background shadow-sm">
                    <Compass className="h-6 w-6" />
                  </LogoTile>
                }
                title={guide.title}
              />
            </ListPanel>
          ))}
          <StudyGuidesPageRow page="resources" count={resourceCount} />
          {/* The flag-gated Research tab (docs/research-ai-disabled.md): its way in, when it is on. */}
          {RESEARCH_TAB_ENABLED && (
            <ListPanel>
              <ListRow
                to="/research"
                leading={<LogoTile size="lg" className="bg-foreground text-background shadow-sm"><Microscope className="h-6 w-6" /></LogoTile>}
                title="Research"
              />
            </ListPanel>
          )}
        </div>
      </section>

      {/* The credentials: each opens its page, whose route lists what it requires. */}
      <section>
        <SectionHeading>Credentials</SectionHeading>
        <ListPanel columns={2}>
          {credentials.map(track => track && (
            <ListRow
              key={track.key}
              onClick={() => openAt([{ kind: 'concept', name: track.conceptPage! }], 0, '/wiki')}
              data-testid={`credential-${track.key}`}
              leading={<LogoTile size="lg" className="bg-foreground text-background shadow-sm"><Award className="h-6 w-6" /></LogoTile>}
              title={track.label}
              subtitle={track.fullName ?? undefined}
            />
          ))}
        </ListPanel>
      </section>
    </div>
  )
}
