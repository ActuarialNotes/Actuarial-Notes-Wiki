import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Radio, ShieldCheck } from 'lucide-react'
import { CoverageCalendar } from '@/components/actuaria/CoverageCalendar'
import { LandmarkRow } from '@/components/actuaria/LandmarkRow'
import { StatusChip } from '@/components/actuaria/StatusChip'
import { Term } from '@/components/actuaria/Term'
import { Button, buttonVariants } from '@/components/ui/button'
import type { ActuariaWorld } from '@/hooks/useActuariaWorld'
import { useCoverageDays } from '@/hooks/useCoverageDays'
import { useCrew } from '@/hooks/useCrew'
import { useStreak } from '@/hooks/useStreak'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { landmarkName } from '@/data/actuariaLandmarks'
import { monthOf, shiftMonth, studiedInMonth } from '@/lib/actuaria/coverage'
import { CREW_MIN, poolThreshold } from '@/lib/actuaria/crews'
import { drawTransmission, selectTransmission, transmissionPath, TRANSMISSION_SIZE } from '@/lib/actuaria/transmission'
import type { Question } from '@/lib/parser'
import { planConceptsToday } from '@/lib/planCompletion'
import { formatClock, timeAllowanceSeconds } from '@/lib/quizTiming'
import { localDayKey } from '@/lib/streak'
import { resolveTimeZone } from '@/lib/streakStore'
import { useOpenLandmark } from './useOpenLandmark'

/**
 * **Daily Transmission + Coverage** (docs/actuaria-online.md §6.6, §7.5): the
 * streak, with its grace days and a month of it; the landmarks closest to
 * decaying; and one button that turns them into an ordinary three-question quiz
 * — so the answers bank mastery, XP, the streak and quest progress exactly as
 * any quiz's do.
 */
export function DailyView({ world, questions, questionsLoading }: { world: ActuariaWorld; questions: readonly Question[]; questionsLoading: boolean }) {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-4 sm:px-6 lg:py-6">
      <h1 className="actuaria-display text-xl sm:text-2xl"><Term id="transmission" /></h1>
      <div className="grid gap-4 md:grid-cols-[1fr_20rem] md:items-start">
        <Transmission world={world} questions={questions} questionsLoading={questionsLoading} />
        <div className="space-y-4">
          <Coverage />
          <RiskPoolStrip exam={world.activeSector?.status === 'in_progress' ? world.activeSector.key : null} />
        </div>
      </div>
    </div>
  )
}

function Transmission({ world, questions, questionsLoading }: { world: ActuariaWorld; questions: readonly Question[]; questionsLoading: boolean }) {
  const navigate = useNavigate()
  const openLandmark = useOpenLandmark()
  const { targetDates } = useExamProgress()
  const active = world.activeSector
  const { plan } = useStudyPlan(
    active?.syllabus ?? null,
    world.records,
    active ? targetDates[active.key] ?? null : null,
    world.loading,
  )

  const studying = useMemo(() => world.sectors.filter(s => s.status === 'in_progress').map(s => s.key), [world.sectors])
  const picks = useMemo(() => {
    const now = new Date()
    const planFill = active ? planConceptsToday(plan).map(concept => ({ exam: active.key, concept })) : []
    return selectTransmission(world.records, now, TRANSMISSION_SIZE, {
      activeExams: studying.length > 0 ? studying : undefined,
      plan: planFill,
    })
  }, [world.records, studying, active, plan])
  const drawn = useMemo(() => drawTransmission(picks, questions), [picks, questions])
  const decaying = picks.filter(p => p.reason !== 'plan')
  const seconds = timeAllowanceSeconds(drawn.map(d => d.question))
  const names = picks.map(p => p.concept)

  if (world.loading) {
    return (
      <section className="rounded-xl bg-card p-5">
        <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Listening for decay…</p>
      </section>
    )
  }

  return (
    <section className="space-y-4 rounded-xl bg-card p-5" aria-labelledby="transmission-heading" data-testid="actuaria-transmission">
      <div>
        <h2 id="transmission-heading" className="text-base font-semibold">
          {decaying.length === 0
            ? 'No decay today'
            : `${decaying.length} ${decaying.length === 1 ? 'landmark is' : 'landmarks are'} decaying`}
        </h2>
        {decaying.length === 0 && picks.length > 0 && (
          <p className="text-sm text-muted-foreground">Today’s study plan fills the transmission instead.</p>
        )}
      </div>

      {picks.length > 0 && (
        <ul className="divide-y divide-border/60">
          {picks.map((p, i) => {
            const inWorld = landmarkName(p.concept)
            return (
              <LandmarkRow
                key={`${p.exam}:${p.concept}`}
                name={inWorld ?? p.concept}
                conceptName={inWorld ? p.concept : null}
                state={p.state}
                decay={p.step}
                onOpen={() => openLandmark(names, i)}
              />
            )
          })}
        </ul>
      )}

      {drawn.length > 0 ? (
        <div className="space-y-2">
          <Button
            size="lg"
            className="h-12 w-full gap-2 rounded-full text-base"
            onClick={() => navigate(transmissionPath(drawn))}
            data-testid="actuaria-receive-transmission"
          >
            <Radio className="h-5 w-5" aria-hidden />
            Receive transmission
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            {drawn.length} {drawn.length === 1 ? 'question' : 'questions'}
            {seconds ? ` · about ${formatClock(seconds)} at exam pace` : ''}
          </p>
        </div>
      ) : picks.length > 0 && questionsLoading ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Tuning the questions…</p>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {picks.length > 0
              ? 'The bank has no questions on these landmarks yet.'
              : 'Nothing you have learned is about to slip. Today’s study plan is the next thing to do.'}
          </p>
          <Link to="/dashboard" className={buttonVariants({ size: 'lg', className: 'w-full rounded-full' })}>
            Open today’s study plan
          </Link>
        </div>
      )}
    </section>
  )
}

/**
 * The cohort's risk pool, in a line (§6.6): "9 / 12 covered · +25% gems
 * active". Shown only to a member of a cohort on the active sector.
 */
function RiskPoolStrip({ exam }: { exam: string | null }) {
  const { crew } = useCrew(exam)
  if (!crew || crew.pool.members < CREW_MIN) return null
  const { covered, members, active } = crew.pool
  return (
    <Link
      to={`/actuaria/cohort?exam=${encodeURIComponent(crew.crew.exam)}`}
      className="flex items-center justify-between gap-3 rounded-xl bg-card px-5 py-3 text-sm transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      data-testid="actuaria-risk-pool"
    >
      <span><Term id="riskPool" /> · <span className="font-mono tabular-nums">{covered} / {members}</span> covered</span>
      {active
        ? <StatusChip variant="cleared" size="sm">+25% gems active</StatusChip>
        : <span className="text-xs text-muted-foreground">{poolThreshold(members) - covered} more for +25%</span>}
    </Link>
  )
}

function Coverage() {
  const streak = useStreak()
  const tz = useMemo(() => resolveTimeZone(), [])
  const today = localDayKey(new Date(), tz)
  const [month, setMonth] = useState(() => monthOf(today))
  const { days } = useCoverageDays(month)
  const covered = studiedInMonth(month, days)

  return (
    <section className="space-y-4 rounded-xl bg-card p-5" aria-labelledby="coverage-heading" data-testid="actuaria-coverage">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-500" aria-hidden>
          <ShieldCheck className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h2 id="coverage-heading" className="actuaria-display text-[11px] text-muted-foreground"><Term id="coverage" /></h2>
          <p className="text-lg font-semibold">
            <span className="font-mono tabular-nums">{streak.currentStreak}</span> {streak.currentStreak === 1 ? 'day' : 'days'}
          </p>
        </div>
      </div>
      <p className="text-sm">
        <Term id="graceDay">Grace days</Term>: <span className="font-mono tabular-nums">{streak.freezes}</span>
      </p>
      <CoverageCalendar
        month={month}
        today={today}
        studied={days}
        onMonth={delta => setMonth(m => shiftMonth(m, delta))}
        canGoForward={month < monthOf(today)}
      />
      <p className="text-xs text-muted-foreground">
        <span className="font-mono tabular-nums">{covered}</span> {covered === 1 ? 'day' : 'days'} covered this month
      </p>
    </section>
  )
}
