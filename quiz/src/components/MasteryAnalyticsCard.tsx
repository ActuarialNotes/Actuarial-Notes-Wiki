import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, ChevronDown, Clock, Target, TrendingDown } from 'lucide-react'
import {
  conceptsAboutToDecay,
  pickReviewQuestionForConcept,
  pickReviewQuestionsForConcepts,
  weakestTopics,
  type DecayWarning,
  type WeakTopic,
} from '@/lib/masteryAnalytics'
import { trackMasteryAnalyticsQuiz } from '@/lib/analytics'
import { computeReadiness } from '@/lib/readiness'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { useAllQuestions } from '@/hooks/useAllQuestions'

// Warn about concepts decaying within two weeks — long enough to be actionable,
// short enough to stay urgent.
const DECAY_HORIZON_DAYS = 14
const SELECTED_IDS_KEY = 'actuarial_selected_ids'

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New',
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3',
  forgotten: 'Forgotten',
}

function formatDays(days: number): string {
  const d = Math.max(0, Math.ceil(days))
  if (d <= 1) return 'in 1 day'
  if (d < 14) return `in ${d} days`
  return `in ${Math.round(d / 7)} weeks`
}

// Launch a quiz of specific question ids via the shared selection=stored seam
// (mirrors Landing.launchTodaysPlan) — keeps the URL small for multi-question sets.
function launchStoredQuiz(navigate: ReturnType<typeof useNavigate>, ids: string[]) {
  try {
    sessionStorage.setItem(SELECTED_IDS_KEY, JSON.stringify(ids))
  } catch {
    /* ignore quota/private-mode errors */
  }
  const params = new URLSearchParams({
    selection: 'stored',
    mode: 'quiz',
    reveal: 'during',
    count: String(ids.length),
    from: 'dashboard',
  })
  navigate(`/quiz?${params.toString()}`)
}

// ── Card ─────────────────────────────────────────────────────────────────────

interface Props {
  syllabus: WikiExamSyllabus
  /** Mastery records already filtered to the active exam. */
  masteryRecords: ConceptMasteryRecord[]
}

/**
 * Learner mastery-analytics card (roadmap P2.5). Collapsed to a one-line summary
 * — how many concepts are fading and current readiness — and expandable into
 * two views derived from the mastery records the Dashboard already loads:
 * concepts about to decay (each reviewable in a single coverage-optimized
 * question) and a weakest-topics ranking that launches a targeted quiz. The
 * predicted exam-readiness curve lives in the Study Schedule info panel
 * (HeatmapInfoPanel). Hides itself until the learner has some mastery
 * to analyse.
 */
export function MasteryAnalyticsCard({ syllabus, masteryRecords }: Props) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const { questions: allQuestions } = useAllQuestions()

  const examQuestions = useMemo(
    () => allQuestions.filter(q => q.exam === syllabus.examTopic),
    [allQuestions, syllabus.examTopic],
  )

  const { warnings, weak, readinessNow } = useMemo(() => {
    const now = new Date()
    const warnings = conceptsAboutToDecay(syllabus, masteryRecords, now, DECAY_HORIZON_DAYS)
    const weak = weakestTopics(syllabus, masteryRecords, now, 4)
    const readinessNow = Math.round(computeReadiness(syllabus, masteryRecords, now).overallPct)
    return { warnings, weak, readinessNow }
  }, [syllabus, masteryRecords])

  const decayConceptNames = useMemo(() => warnings.map(w => w.concept), [warnings])
  // Fewest questions covering every fading concept (greedy set-cover).
  const reviewAllQuestions = useMemo(
    () => pickReviewQuestionsForConcepts(examQuestions, decayConceptNames),
    [examQuestions, decayConceptNames],
  )

  // Nothing to analyse until the learner has advanced at least one concept.
  const hasProgress = masteryRecords.some(r => r.state !== 'new')
  if (!hasProgress) return null

  // Review a single fading concept with ONE question, chosen to also refresh as
  // many other fading concepts as possible. Falls back to the concept quiz if no
  // tagged question is found (or questions haven't loaded yet).
  const launchConceptReview = (concept: string) => {
    trackMasteryAnalyticsQuiz({ source: 'decay_warning', exam: syllabus.examTopic })
    const chosen = pickReviewQuestionForConcept(examQuestions, decayConceptNames, concept)
    if (chosen) {
      launchStoredQuiz(navigate, [chosen.id])
    } else {
      const params = new URLSearchParams({ concept, mode: 'quiz', reveal: 'during', from: 'dashboard' })
      navigate(`/quiz?${params.toString()}`)
    }
  }

  // Review every fading concept in the fewest questions (greedy set-cover).
  const launchReviewAll = () => {
    if (reviewAllQuestions.length === 0) return
    trackMasteryAnalyticsQuiz({ source: 'decay_warning', exam: syllabus.examTopic })
    launchStoredQuiz(navigate, reviewAllQuestions.map(q => q.id))
  }

  const launchTopicQuiz = (topic: WeakTopic) => {
    trackMasteryAnalyticsQuiz({ source: 'weak_topic', exam: syllabus.examTopic, topic: topic.name })
    const concepts = topic.weakConceptNames.length > 0 ? topic.weakConceptNames : topic.conceptNames
    const params = new URLSearchParams({ exam: syllabus.examTopic, mode: 'quiz', reveal: 'during', from: 'dashboard' })
    params.set('concepts', concepts.join(','))
    navigate(`/quiz?${params.toString()}`)
  }

  return (
    <div className="rounded-lg bg-card text-card-foreground shadow-[var(--shadow-card)]">
      {/* Header — the whole row toggles the section. */}
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-2 rounded-lg p-5 text-left transition-colors hover:bg-muted/40"
      >
        <Activity className="h-4 w-4 shrink-0 text-primary" />
        <h2 className="text-sm font-bold tracking-tight">Mastery insights</h2>
        <span className="min-w-0 flex-1 truncate text-xs font-medium tabular-nums text-muted-foreground">
          {warnings.length > 0
            ? `${warnings.length} fading · ${readinessNow}% ready`
            : `${readinessNow}% ready`}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="space-y-5 px-5 pb-5">
          {/* About to decay */}
          {warnings.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-500" />
                <h3 className="text-xs font-semibold">About to decay</h3>
                {warnings.length > 1 && reviewAllQuestions.length > 0 && (
                  <button
                    type="button"
                    onClick={launchReviewAll}
                    className="ml-auto rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:bg-muted"
                  >
                    Review all ({reviewAllQuestions.length})
                  </button>
                )}
              </div>
              <ul className="space-y-1.5">
                {warnings.slice(0, 5).map(w => (
                  <DecayRow key={w.concept} warning={w} onReview={() => launchConceptReview(w.concept)} />
                ))}
              </ul>
            </section>
          )}

          {/* Weakest topics */}
          {weak.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-primary" />
                <h3 className="text-xs font-semibold">Weakest topics</h3>
              </div>
              <ul className="space-y-2">
                {weak.map(t => (
                  <WeakTopicRow key={t.name} topic={t} onPractice={() => launchTopicQuiz(t)} />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

function DecayRow({ warning, onReview }: { warning: DecayWarning; onReview: () => void }) {
  return (
    <li className="flex items-center gap-2">
      <TrendingDown className="h-4 w-4 shrink-0 text-amber-500" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{warning.concept}</p>
        <p className="truncate text-xs text-muted-foreground">
          {STATE_LABEL[warning.currentState]} → {STATE_LABEL[warning.nextState]} {formatDays(warning.daysUntil)}
        </p>
      </div>
      <button
        type="button"
        onClick={onReview}
        className="shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:bg-muted"
      >
        Review
      </button>
    </li>
  )
}

function WeakTopicRow({ topic, onPractice }: { topic: WeakTopic; onPractice: () => void }) {
  const pct = Math.round(topic.readinessPct)
  return (
    <li className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-medium">{topic.name}</p>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{pct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onPractice}
        className="shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:bg-muted"
      >
        Practice
      </button>
    </li>
  )
}
