import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingDown } from 'lucide-react'
import {
  conceptsAboutToDecay,
  pickReviewQuestionForConcept,
  pickReviewQuestionsForConcepts,
  type DecayWarning,
} from '@/lib/masteryAnalytics'
import { trackMasteryAnalyticsQuiz } from '@/lib/analytics'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { FlipInsightCard, InsightBrowserModal } from '@/components/DashboardInsightCard'

// Only surface concepts on the brink — decaying within three days. Anything
// further out isn't urgent enough to earn a spot on the dashboard.
const DECAY_HORIZON_DAYS = 3
const SELECTED_IDS_KEY = 'actuarial_selected_ids'

function formatDays(days: number): string {
  const d = Math.max(0, Math.ceil(days))
  return d <= 1 ? 'today' : `in ${d} days`
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
 * Fading-concepts card (roadmap P2.5). A compact flip card: the front shows the
 * single most-urgent fading concept; flipping it reveals "Review" (quizzes just
 * that concept in one coverage-optimized question) and "See all fading concepts"
 * (opens a browser of every fading concept). Derived purely from the mastery
 * records the Dashboard already loads. Hides itself entirely when nothing is fading.
 */
export function MasteryAnalyticsCard({ syllabus, masteryRecords }: Props) {
  const navigate = useNavigate()
  const { questions: allQuestions } = useAllQuestions()
  const [browserOpen, setBrowserOpen] = useState(false)

  const examQuestions = useMemo(
    () => allQuestions.filter(q => q.exam === syllabus.examTopic),
    [allQuestions, syllabus.examTopic],
  )

  const warnings = useMemo(
    () => conceptsAboutToDecay(syllabus, masteryRecords, new Date(), DECAY_HORIZON_DAYS),
    [syllabus, masteryRecords],
  )

  const decayConceptNames = useMemo(() => warnings.map(w => w.concept), [warnings])
  // Fewest questions covering every fading concept (greedy set-cover).
  const reviewAllQuestions = useMemo(
    () => pickReviewQuestionsForConcepts(examQuestions, decayConceptNames),
    [examQuestions, decayConceptNames],
  )

  // Nothing to show unless a concept is actually about to fade.
  if (warnings.length === 0) return null

  const top = warnings[0]!

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

  const icon = <TrendingDown className="h-4 w-4 shrink-0 text-amber-500" />

  return (
    <>
      <FlipInsightCard
        icon={icon}
        title="Fading Concepts"
        count={warnings.length}
        front={
          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-semibold leading-snug">{top.concept}</p>
            <p className="mt-1 truncate text-xs text-muted-foreground">Fades {formatDays(top.daysUntil)}</p>
          </div>
        }
        primaryLabel="Review"
        onPrimary={() => launchConceptReview(top.concept)}
        seeAllLabel="See all fading concepts"
        onSeeAll={() => setBrowserOpen(true)}
      />

      {browserOpen && (
        <InsightBrowserModal
          title="Fading Concepts"
          icon={icon}
          onClose={() => setBrowserOpen(false)}
          actionLabel={warnings.length > 1 && reviewAllQuestions.length > 0 ? `Review all (${reviewAllQuestions.length})` : undefined}
          onAction={warnings.length > 1 && reviewAllQuestions.length > 0 ? () => { launchReviewAll() } : undefined}
        >
          <ul className="space-y-1">
            {warnings.map(w => (
              <DecayRow key={w.concept} warning={w} onReview={() => launchConceptReview(w.concept)} />
            ))}
          </ul>
        </InsightBrowserModal>
      )}
    </>
  )
}

function DecayRow({ warning, onReview }: { warning: DecayWarning; onReview: () => void }) {
  return (
    <li className="flex items-center gap-3 py-1">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{warning.concept}</p>
        <p className="truncate text-xs text-muted-foreground">Fades {formatDays(warning.daysUntil)}</p>
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
