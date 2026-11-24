// The weekly league (docs/redesign-spec.md §7b.2, docs/leagues.md): one exam's
// table for the week, the reader's row filled, a labelled line where promotion
// ends and another where relegation begins, the days left in the header, and
// Leave at the foot. Leagues are per exam, so the exam is switched in place.
//
// A reader who hasn't joined this exam's league gets the way in on the same
// screen: how they will appear, what joining shares, and Join.

import { useId, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowUp, ChevronDown, Loader2, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLeague } from '@/hooks/useLeague'
import { useTodayExam } from '@/hooks/useTodayExam'
import { usePageLabel } from '@/hooks/useBack'
import { LEAGUES_ENABLED } from '@/lib/featureFlags'
import { COHORT_CAP } from '@/lib/leagues'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { SETTINGS_PATH, YOU_PATH, leagueResultLine, leagueTable, readerName, weekLeftLabel } from '@/lib/you'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { OUTLINE_TILE } from '@/components/ui/OutlineCard'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { YouScreen } from '@/components/you/rows'
import { cn } from '@/lib/utils'

const RESULT_ACK_PREFIX = 'actuarial_league_result_ack_'

/** A result is dismissed per exam and week. */
function resultAcknowledged(exam: string, week: string): boolean {
  try { return localStorage.getItem(`${RESULT_ACK_PREFIX}${exam}_${week}`) === '1' } catch { return false }
}
function acknowledgeResult(exam: string, week: string): void {
  try { localStorage.setItem(`${RESULT_ACK_PREFIX}${exam}_${week}`, '1') } catch { /* quota exceeded */ }
}

const LINE_LABEL = { promoted: 'Promoted', relegated: 'Relegated' } as const

export default function League() {
  usePageLabel('League')
  const { user, loading: authLoading } = useAuth()
  const [params, setParams] = useSearchParams()
  const today = useTodayExam()
  const exams = today.exams.map(s => ({ key: wikiExamIdToProgressKey(s.examId), label: s.examLabel }))
  const asked = params.get('exam')
  const examKey = exams.find(e => e.key === asked)?.key ?? (exams.some(e => e.key === today.activeKey) ? today.activeKey : exams[0]?.key) ?? null
  const exam = exams.find(e => e.key === examKey) ?? null
  const league = useLeague(user ? examKey : null)

  const [picking, setPicking] = useState(false)
  const [confirmLeave, setConfirmLeave] = useState(false)
  const [busy, setBusy] = useState(false)
  const [dismissedWeek, setDismissedWeek] = useState<string | null>(null)
  const pickId = useId()
  const leaveId = useId()

  if (!LEAGUES_ENABLED) return <Navigate to={YOU_PATH} replace />

  const name = readerName(user)
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? ''
  const joined = !!user && !!exam && !league.loading && league.optedIn
  const result = joined && league.lastResult && examKey
    && league.lastResult.week !== dismissedWeek && !resultAcknowledged(examKey, league.lastResult.week)
    ? league.lastResult
    : null

  const join = async () => {
    setBusy(true)
    await league.join(name, avatarUrl)
    setBusy(false)
  }
  const leave = async () => {
    setBusy(true)
    await league.leave()
    setBusy(false)
    setConfirmLeave(false)
  }

  const examPicker = exam && (
    <div className="flex items-center gap-2.5 px-5 pt-3.5">
      <ExamLogo examKey={exam.key} size="sm" />
      {exams.length > 1 ? (
        <button
          type="button"
          onClick={() => setPicking(true)}
          aria-haspopup="dialog"
          aria-label={`Switch exam, ${exam.label}`}
          data-testid="league-exam"
          className="flex h-10 items-center gap-1.5 rounded-sm text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {exam.label}
          <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
        </button>
      ) : (
        <span className="flex h-10 items-center text-base font-semibold">{exam.label}</span>
      )}
    </div>
  )

  let body
  if (authLoading || today.loading || (user && exam && league.loading)) {
    body = (
      <div className="flex flex-1 items-center justify-center py-16" aria-busy="true">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
      </div>
    )
  } else if (!user) {
    body = (
      <div className="flex flex-col items-start gap-5 px-5 pt-6">
        <p className="text-[17px] leading-normal">
          A league is a week’s table of up to {COHORT_CAP} students studying the same exam. Sign in to join one.
        </p>
        <Link to="/auth" state={{ from: '/you/league' }} className={buttonVariants({ variant: 'edge' })}>Sign in</Link>
      </div>
    )
  } else if (!exam) {
    body = (
      <div className="flex flex-col items-start gap-5 px-5 pt-6">
        <p className="text-[17px] leading-normal">Leagues are per exam. Add an exam to join its league.</p>
        <Link to={SETTINGS_PATH} className={buttonVariants({ variant: 'edge' })}>Add an exam in Settings</Link>
      </div>
    )
  } else if (!joined) {
    body = (
      <>
        {examPicker}
        <div className="flex flex-col gap-5 px-5 pb-6 pt-4">
          <p className="text-[17px] leading-normal">
            Each week you’re put in a table of up to {COHORT_CAP} students studying this exam, ranked by the XP earned
            that week. On Monday the top of the table moves up a league, and the bottom, with anyone on 0 XP, moves down.
          </p>
          <div className={cn(OUTLINE_TILE, 'flex items-center gap-3.5 px-4 py-3.5')}>
            <AvatarDisplay avatarUrl={avatarUrl} initials={name.slice(0, 2).toUpperCase()} size={44} />
            <span className="min-w-0 truncate text-[17px] font-semibold" data-testid="league-appear-as">{name}</span>
          </div>
          <p className="text-[17px] leading-normal">
            Your league sees this name and character, and your XP for the week. It never sees your email or what you
            study. Leaving deletes all three.
          </p>
          <Button size="main" className="w-full" disabled={busy} onClick={() => void join()} data-testid="league-join">
            {busy ? 'Joining…' : 'Join the league'}
          </Button>
        </div>
      </>
    )
  } else {
    const entries = leagueTable(league.board, league.tier.index)
    body = (
      <>
        {examPicker}
        {result && examKey && (
          <p role="status" className="mx-5 mt-2.5 flex items-center gap-2 rounded-[14px] border border-border py-1 pl-3.5 pr-1 text-[15px] font-semibold">
            <span className="min-w-0 flex-1">{leagueResultLine(result.result, league.tier.label, result.rank)}</span>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => { acknowledgeResult(examKey, result.week); setDismissedWeek(result.week) }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            </button>
          </p>
        )}
        {entries.length === 0 ? (
          <p className="px-5 pt-5 text-[17px] leading-normal">
            Nobody else is in your {league.tier.label} league yet. The table fills as students join this week.
          </p>
        ) : (
          <ol className="flex flex-col gap-0.5 px-1.5 pt-2.5" aria-label={`${league.tier.label} league, this week`} data-testid="league-table">
            {entries.map(entry => entry.kind === 'line' ? (
              <li key={entry.line} data-line={entry.line} className="flex h-[34px] items-center gap-2.5 px-3.5 text-[13px] font-bold">
                {entry.line === 'promoted'
                  ? <ArrowUp className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                  : <ArrowDown className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />}
                {LINE_LABEL[entry.line]}
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </li>
            ) : (
              <li
                key={`row-${entry.row.rank}`}
                aria-current={entry.row.isSelf || undefined}
                className={cn(
                  'grid h-[52px] grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-x-3 px-3.5',
                  entry.row.isSelf && 'rounded-[14px] bg-foreground text-ground',
                )}
              >
                <span className="text-[15px] font-bold tabular-nums">{entry.row.rank}</span>
                <span className={cn('truncate text-[17px]', entry.row.isSelf ? 'font-bold' : 'font-medium')}>
                  {entry.row.displayName}
                </span>
                <span className="text-base font-bold tabular-nums">
                  {entry.row.weeklyXp}<span className="sr-only"> XP</span>
                </span>
              </li>
            ))}
          </ol>
        )}
        <div className="mt-auto px-5 pb-6 pt-6">
          <Button variant="edge" size="lg" className="w-full" onClick={() => setConfirmLeave(true)} aria-haspopup="dialog">
            Leave the league
          </Button>
        </div>
      </>
    )
  }

  return (
    <YouScreen
      way="back"
      to={YOU_PATH}
      label="You"
      title={joined ? `${league.tier.label} league` : 'League'}
      trailing={joined ? <span className="shrink-0 text-[15px]">{weekLeftLabel(new Date())}</span> : undefined}
      testId="league"
    >
      {body}

      {picking && (
        <Popup onClose={() => setPicking(false)} labelledBy={pickId}>
          <PopupTitle id={pickId}>Your exams</PopupTitle>
          <ul className="flex flex-col gap-2.5">
            {exams.map(option => {
              const on = option.key === examKey
              return (
                <li key={option.key}>
                  <button
                    type="button"
                    aria-current={on || undefined}
                    onClick={() => { setParams({ exam: option.key }, { replace: true }); setPicking(false) }}
                    className={cn(
                      'flex min-h-[60px] w-full items-center gap-3.5 rounded-[18px] px-4 text-left text-[17px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground',
                      on ? 'border-2 border-foreground' : 'border-[1.5px] border-border hover:border-foreground',
                    )}
                  >
                    <ExamLogo examKey={option.key} size="md" />
                    <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    {on && <CheckMark className="h-7 w-7 text-foreground" label="Showing" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </Popup>
      )}

      {confirmLeave && (
        <Popup onClose={() => setConfirmLeave(false)} labelledBy={leaveId}>
          <PopupTitle id={leaveId}>Leave the league?</PopupTitle>
          <p className="text-[17px] leading-normal">
            Your name, character and this week’s XP are deleted from the league. You can join again later.
          </p>
          <div className="flex flex-col gap-2.5">
            <Button size="main" className="w-full" disabled={busy} onClick={() => void leave()}>
              {busy ? 'Leaving…' : 'Leave the league'}
            </Button>
            <Button variant="edge" size="lg" className="w-full" disabled={busy} onClick={() => setConfirmLeave(false)}>
              Stay
            </Button>
          </div>
        </Popup>
      )}
    </YouScreen>
  )
}
