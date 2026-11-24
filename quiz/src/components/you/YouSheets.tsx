// The popups the profile opens (docs/redesign-spec.md §7b.1): the daily goal's
// presets, one quest in full, and Help.

import { lazy, Suspense, useId, useMemo, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useXp } from '@/hooks/useXp'
import { useSubscription } from '@/hooks/useSubscription'
import { useOnboardingTour } from '@/hooks/useOnboardingTour'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useExamProgress } from '@/contexts/examProgress'
import { ACTIVE_EXAM_KEY } from '@/hooks/useTodayExam'
import { matchesSelectedVariant } from '@/data/examSittings'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { setDailyGoal } from '@/lib/xpStore'
import { DAILY_GOALS } from '@/lib/xp'
import { PERFECT_QUIZ_MIN, type QuestKind } from '@/data/quests'
import type { QuestProgressView } from '@/lib/quests'
import { TOUR_ENABLED } from '@/lib/featureFlags'
import { supabase } from '@/lib/supabase'
import { CheckMark } from '@/components/CheckMark'
import { ContactDialog } from '@/components/ContactDialog'
import { Button } from '@/components/ui/button'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { questReward } from '@/lib/you'
import { Meter, Row } from '@/components/you/rows'
import { cn } from '@/lib/utils'

const DashboardGuideModal = lazy(() =>
  import('@/components/DashboardGuideModal').then(m => ({ default: m.DashboardGuideModal })))

const PICK_ROW = 'grid min-h-[64px] grid-cols-[minmax(0,1fr)_auto_28px] items-center gap-x-3.5 rounded-[18px] px-[18px] py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

// ── The daily goal ───────────────────────────────────────────────────────────

/** The four daily goals. Picking one keeps it at once; Done closes. */
export function GoalSheet({ onClose }: { onClose: () => void }) {
  const titleId = useId()
  const { user } = useAuth()
  const { goalId } = useXp()
  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Daily goal</PopupTitle>
      <div role="radiogroup" aria-label="Daily goal" className="flex flex-col gap-2.5">
        {DAILY_GOALS.map(goal => {
          const on = goal.id === goalId
          return (
            <button
              key={goal.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => void setDailyGoal(user?.id ?? null, goal.id)}
              className={cn(PICK_ROW, on ? 'border-2 border-foreground' : 'border-[1.5px] border-border')}
            >
              <span className="text-[17px] font-semibold">{goal.label}</span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-[22px] font-bold tabular-nums">{goal.xp}</span>
                <span className="text-[15px]">XP</span>
              </span>
              {on ? <CheckMark className="h-7 w-7 text-foreground" /> : <span />}
            </button>
          )
        })}
      </div>
      <Button size="main" className="w-full" onClick={onClose}>Done</Button>
    </Popup>
  )
}

// ── One quest ────────────────────────────────────────────────────────────────

/** What each kind of quest counts. */
const KIND_DETAIL: Record<QuestKind, string> = {
  correct: 'Counts every question you answer correctly today, in any quiz, at any difficulty.',
  hard_correct: 'Counts correct answers on hard questions only.',
  revive: 'Counts correct answers on concepts at Forgotten.',
  level_up: 'Counts concepts that go up a level today, such as New to Level 1 or Level 2 to Level 3.',
  perfect_quiz: `Counts a quiz of ${PERFECT_QUIZ_MIN} or more questions with every answer correct.`,
  concept_correct: 'Counts correct answers on this quest’s concept, which is in today’s study plan.',
}

export function QuestSheet({
  view, signedIn, busy, onCollect, onClose,
}: {
  view: QuestProgressView
  signedIn: boolean
  busy: boolean
  onCollect: () => void
  onClose: () => void
}) {
  const titleId = useId()
  const { quest, earned, target, ratio, claimed, claimable } = view
  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>{quest.title}</PopupTitle>
      <p className="text-[17px] leading-normal">{quest.description}. {KIND_DETAIL[quest.kind]}</p>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3.5">
        <Meter ratio={ratio} />
        <span className="text-[15px] font-bold tabular-nums">{earned}/{target}</span>
      </div>
      <p className="text-[17px]">
        {claimed ? 'Collected: ' : 'Pays '}
        <strong>{questReward(quest, signedIn)}</strong>
      </p>
      {claimable ? (
        <Button size="main" className="w-full" disabled={busy} data-sound="none" onClick={onCollect}>Collect</Button>
      ) : (
        <Button variant="edge" size="lg" className="w-full" onClick={onClose}>Close</Button>
      )}
    </Popup>
  )
}

// ── Help ─────────────────────────────────────────────────────────────────────

/**
 * How Today works, for the exam Today last showed. Its last slide reads that
 * exam's syllabus, levels and plan, so they are derived here the way Today
 * derives them, and only while the guide is open.
 */
function TodayGuide({ isPro, onClose }: { isPro: boolean; onClose: () => void }) {
  const { syllabi } = useWikiSyllabus()
  const { progress, targetDates, examVariants } = useExamProgress()
  const { records, loading: masteryLoading } = useConceptMastery()

  const syllabus = useMemo(() => {
    const inProgress = syllabi.filter(s => {
      const key = wikiExamIdToProgressKey(s.examId)
      return progress[key] === 'in_progress' && matchesSelectedVariant(key, s.examId, examVariants[key])
    })
    let saved: string | null = null
    try { saved = localStorage.getItem(ACTIVE_EXAM_KEY) } catch { /* ignore */ }
    return inProgress.find(s => s.examId === saved) ?? inProgress[0] ?? null
  }, [syllabi, progress, examVariants])

  const progressKey = syllabus ? wikiExamIdToProgressKey(syllabus.examId) : null
  const examDate = progressKey ? (targetDates[progressKey] ?? null) : null
  const { plan } = useStudyPlan(syllabus, records, examDate, masteryLoading)
  const examRecords = useMemo(
    () => (progressKey ? records.filter(r => r.exam_id === progressKey) : []),
    [records, progressKey],
  )

  return (
    <Suspense fallback={null}>
      <DashboardGuideModal
        open
        onClose={onClose}
        syllabus={syllabus}
        masteryRecords={examRecords}
        examDate={examDate}
        // Only a Pro account has a plan (as on Today).
        plan={isPro ? plan : null}
      />
    </Suspense>
  )
}

/** Help: the guide to Today, a way to write to us, and a lost purchase checked. */
export function HelpSheet({ onClose }: { onClose: () => void }) {
  const titleId = useId()
  const { user } = useAuth()
  const { isPro, loading: subLoading } = useSubscription()
  const restartTour = useOnboardingTour(s => s.restart)
  const [guide, setGuide] = useState(false)
  const [contact, setContact] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null)

  const restore = async () => {
    setRestoring(true)
    setRestoreMessage(null)
    try {
      const { data, error } = await supabase.functions.invoke('stripe-sync-session', { body: {} })
      if (error) throw new Error(error.message)
      setRestoreMessage(data?.synced && data?.tier === 'premium'
        ? 'Pro restored. Reload the page if the Pro features don’t show yet.'
        : 'There’s no active Pro subscription on this account. If you paid with another email, sign in with that one, or contact us.')
    } catch (err) {
      console.error('help: restore purchase failed:', err)
      setRestoreMessage('Your purchase couldn’t be checked just now. Try again in a minute.')
    } finally {
      setRestoring(false)
    }
  }

  if (guide && user) return <TodayGuide isPro={isPro} onClose={() => { setGuide(false); onClose() }} />
  if (contact) return <ContactDialog onClose={() => { setContact(false); onClose() }} />

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Help</PopupTitle>
      <div className="flex flex-col divide-y divide-border">
        {user && <Row label="How Today works" onClick={() => setGuide(true)} />}
        {TOUR_ENABLED && <Row label="Take the tour" onClick={() => { onClose(); restartTour() }} />}
        <Row label="Contact us" onClick={() => setContact(true)} />
        {user && !isPro && !subLoading && (
          <Row label="Restore purchase" value={restoring ? 'Checking…' : null} onClick={() => { if (!restoring) void restore() }} />
        )}
      </div>
      {restoreMessage && <p role="status" className="text-[15px] leading-normal">{restoreMessage}</p>}
    </Popup>
  )
}
