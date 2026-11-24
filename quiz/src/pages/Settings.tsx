// Settings (docs/redesign-spec.md §7b.3): one screen, grouped, every value
// shown on its row. A row is edited in place (a switch, the theme) or in a
// popup (components/you/SettingsSheets.tsx); nothing opens a second screen.
//
// It holds no quiz settings (R3): when answers show, Timed and tap-to-read
// concepts are in the quiz setup sheet, where they are used.
//
// A visitor gets the rows the browser keeps (session length, daily goal,
// theme, sound, AI assistants, usage analytics) and Sign in for the rest.

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Loader2, Plus } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSettings } from '@/hooks/useSettings'
import { useSubscription } from '@/hooks/useSubscription'
import { useTheme } from '@/hooks/useTheme'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { useXp } from '@/hooks/useXp'
import { useEmailPrefs } from '@/hooks/useEmailPrefs'
import { useExamSwitcher } from '@/stores/examSwitcher'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { readLength, saveSessionLength } from '@/hooks/useTodaySession'
import { useExamProgress } from '@/contexts/examProgress'
import { TRACKS } from '@/data/tracks'
import { isAnalyticsOptedOut, setAnalyticsOptOut } from '@/lib/analytics'
import { DAILY_PLAN_EMAIL_ENABLED, XP_ENABLED } from '@/lib/featureFlags'
import { supabase } from '@/lib/supabase'
import { withLength, type SessionLength } from '@/lib/todaySession'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { YOU_PATH, dailyEmailValue, examDateValue, proRowValue, readerName, signInProvider, soundValue } from '@/lib/you'
import { todayISO } from '@/lib/studyPlan'
import { ExamLogo } from '@/components/ExamLogo'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { SessionLengthSheet } from '@/components/today/SessionLengthSheet'
import { DailyEmailSheet } from '@/components/you/DailyEmailSheet'
import { GoalSheet } from '@/components/you/YouSheets'
import {
  AiAssistantsSheet,
  DeleteAccountSheet,
  ExamSettingsSheet,
  ExportSheet,
  PasswordSheet,
  ProSheet,
  ResetSheet,
  SoundSheet,
  TextFieldSheet,
  ThemeRow,
  TrackSheet,
} from '@/components/you/SettingsSheets'
import { Row, RowGroup, SwitchRow, YouScreen } from '@/components/you/rows'
import { cn } from '@/lib/utils'

type Sheet =
  | 'length' | 'goal' | 'email-daily' | 'track'
  | 'sound' | 'ai'
  | 'name' | 'email' | 'password' | 'pro'
  | 'export' | 'reset' | 'delete'

export default function Settings() {
  const navigate = useNavigate()
  const { user, loading: authLoading, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const sound = useSoundEffects()
  const xp = useXp()
  const { isPro, isBetaTester, currentPeriodEnd, loading: subLoading } = useSubscription()
  const emailPrefs = useEmailPrefs()
  const { changePassword, updateProfile, resetHistory, deleteAccount, accountState } = useSettings()
  const { examRows, targetDates, selectedTrack, setSelectedTrack, updateTargetDate, saveExamRows } = useExamProgress()
  const { exams } = useExamInFocus()
  const openAddExam = useExamSwitcher(s => s.openAdd)

  // `/settings#ai` opens AI assistants: Workflows' Run in Claude links to it.
  const { hash } = useLocation()
  const [sheet, setSheet] = useState<Sheet | null>(hash === '#ai' ? 'ai' : null)
  const [examKey, setExamKey] = useState<string | null>(null)
  const [length, setLength] = useState(() => readLength(user?.user_metadata?.session_minutes))
  const [analyticsOff, setAnalyticsOff] = useState(isAnalyticsOptedOut)
  const close = () => setSheet(null)

  if (authLoading) {
    return (
      <YouScreen way="back" to={YOU_PATH} label="You" title="Settings" testId="settings">
        <div className="flex flex-1 items-center justify-center py-16" aria-busy="true">
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
        </div>
      </YouScreen>
    )
  }

  const now = new Date()
  const name = readerName(user)
  const provider = signInProvider(user)
  const track = TRACKS.find(t => t.key === selectedTrack) ?? TRACKS[0]
  const proValue = proRowValue({ isPro, isBetaTester })
  const openExam = exams.find(s => wikiExamIdToProgressKey(s.examId) === examKey) ?? null

  const setExamStatus = (key: string, status: 'completed' | 'not_started') =>
    saveExamRows([{
      exam_id: key,
      status,
      target_date: examRows.find(r => r.exam_id === key)?.target_date ?? null,
    }])

  const pickLength = (minutes: SessionLength) => {
    const next = withLength(length, minutes, todayISO(), true)
    setLength(next)
    saveSessionLength(user?.id ?? null, next, true)
  }

  const openBilling = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('stripe-create-portal', {
        body: { return_url: window.location.href },
      })
      if (error || !data?.url) throw new Error('portal')
      window.location.href = data.url
      return true
    } catch (err) {
      console.error('settings: billing portal failed:', err)
      return false
    }
  }

  return (
    <YouScreen way="back" to={YOU_PATH} label="You" title="Settings" testId="settings">
      <div className="flex flex-col gap-[22px] px-5 pb-7 pt-3.5">
        {!user && (
          <div className="flex flex-col gap-3">
            <p className="text-[17px] leading-normal">
              Sign in to add exams and keep your progress on every device. These settings are kept in this browser.
            </p>
            <Link to="/auth" state={{ from: '/settings' }} className={cn(buttonVariants({ size: 'main' }), 'w-full')}>
              Sign in
            </Link>
          </div>
        )}

        <RowGroup title="Studying">
          {user && exams.map(exam => {
            const key = wikiExamIdToProgressKey(exam.examId)
            return (
              <Row
                key={exam.examId}
                leading={<ExamLogo examKey={key} size="sm" />}
                label={exam.examLabel}
                value={examDateValue(targetDates[key], now)}
                onClick={() => setExamKey(key)}
                testId={`settings-exam-${key}`}
              />
            )
          })}
          {user && (
            <Row
              leading={<span className="flex h-[26px] w-[26px] items-center justify-center"><Plus className="h-5 w-5" aria-hidden="true" /></span>}
              label="Add an exam"
              onClick={() => openAddExam()}
              testId="settings-add-exam"
            />
          )}
          <Row label="Session length" value={`${length.everyDay} min`} onClick={() => setSheet('length')} testId="settings-length" />
          {XP_ENABLED && <Row label="Daily goal" value={`${xp.goal.xp} XP`} onClick={() => setSheet('goal')} testId="settings-goal" />}
          {user && DAILY_PLAN_EMAIL_ENABLED && (
            <Row
              label="Daily email"
              value={emailPrefs.loading || subLoading ? null : dailyEmailValue(emailPrefs.prefs, isPro)}
              onClick={() => setSheet('email-daily')}
              testId="settings-daily-email"
            />
          )}
          {user && <Row label="Credential track" value={track.name} onClick={() => setSheet('track')} testId="settings-track" />}
        </RowGroup>

        <RowGroup title="App">
          <ThemeRow theme={theme} onToggle={toggleTheme} />
          <Row label="Sound" value={soundValue(sound)} onClick={() => setSheet('sound')} testId="settings-sound" />
          <Row label="AI assistants" onClick={() => setSheet('ai')} testId="settings-ai" />
        </RowGroup>

        {user && (
          <RowGroup title="Account">
            <Row label="Name" value={name} onClick={() => setSheet('name')} testId="settings-name" />
            {provider ? (
              <Row label="Email" value={user.email} />
            ) : (
              <Row label="Email" value={user.email} onClick={() => setSheet('email')} testId="settings-email" />
            )}
            {provider ? (
              <Row label="Password" value={provider} />
            ) : (
              <Row label="Password" onClick={() => setSheet('password')} testId="settings-password" />
            )}
            {subLoading ? (
              <Row label="Pro" />
            ) : proValue === 'Get Pro' ? (
              <Row label="Pro" value={proValue} to="/upgrade" testId="settings-pro" />
            ) : proValue === 'Manage' ? (
              <Row label="Pro" value={proValue} onClick={() => setSheet('pro')} testId="settings-pro" />
            ) : (
              <Row label="Pro" value={proValue} testId="settings-pro" />
            )}
          </RowGroup>
        )}

        <RowGroup title="Your data">
          <SwitchRow
            label="Usage analytics"
            on={!analyticsOff}
            onChange={on => { setAnalyticsOptOut(!on); setAnalyticsOff(!on) }}
            testId="settings-analytics"
          />
          {user && <Row label="Export" onClick={() => setSheet('export')} testId="settings-export" />}
          {user && <Row label="Reset study history" onClick={() => setSheet('reset')} testId="settings-reset" />}
        </RowGroup>

        {user && (
          <div className="flex flex-col gap-1">
            <Button
              variant="edge"
              className="h-[52px] w-full text-base"
              onClick={() => { void signOut(); navigate('/') }}
            >
              Sign out
            </Button>
            <button
              type="button"
              onClick={() => setSheet('delete')}
              aria-haspopup="dialog"
              className="h-12 rounded-full text-[15px] font-semibold text-answer-incorrect focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Delete account
            </button>
          </div>
        )}
      </div>

      {sheet === 'length' && (
        <SessionLengthSheet standing minutes={length.everyDay} onPick={pickLength} onClose={close} />
      )}
      {sheet === 'goal' && <GoalSheet onClose={close} />}
      {sheet === 'email-daily' && user && (
        <DailyEmailSheet email={user.email ?? ''} isPro={isPro} subscriptionLoading={subLoading} onClose={close} />
      )}
      {sheet === 'track' && <TrackSheet selected={track.key} onPick={setSelectedTrack} onClose={close} />}
      {sheet === 'sound' && <SoundSheet onClose={close} />}
      {sheet === 'ai' && <AiAssistantsSheet onClose={close} />}
      {sheet === 'name' && user && (
        <TextFieldSheet
          title="Name"
          label="Your name"
          initial={(user.user_metadata?.display_name as string | undefined) ?? ''}
          autoComplete="nickname"
          note="A league you’ve joined shows the name you had when you joined it."
          onSave={value => updateProfile({ displayName: value })}
          onClose={close}
        />
      )}
      {sheet === 'email' && user && (
        <TextFieldSheet
          title="Email"
          label="Email address"
          type="email"
          initial={user.email ?? ''}
          autoComplete="email"
          note="We send a confirmation link to the new address. Your email changes once you open it."
          saved={value => `Confirmation link sent to ${value}. Open it to finish the change.`}
          onSave={value => updateProfile({ email: value })}
          onClose={close}
        />
      )}
      {sheet === 'password' && user && (
        <PasswordSheet error={accountState.error} onSave={changePassword} onClose={close} />
      )}
      {sheet === 'pro' && (
        <ProSheet
          renews={currentPeriodEnd
            ? new Date(currentPeriodEnd).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
            : null}
          onManage={openBilling}
          onClose={close}
        />
      )}
      {sheet === 'export' && user && <ExportSheet userId={user.id} owner={name} onClose={close} />}
      {sheet === 'reset' && <ResetSheet onReset={resetHistory} onClose={close} />}
      {sheet === 'delete' && (
        <DeleteAccountSheet
          onDelete={async () => {
            const ok = await deleteAccount()
            if (ok) navigate('/')
            return ok
          }}
          onClose={close}
        />
      )}
      {openExam && examKey && (
        <ExamSettingsSheet
          label={openExam.examLabel}
          date={targetDates[examKey] ?? null}
          onSaveDate={date => updateTargetDate(examKey, date)}
          onPassed={() => setExamStatus(examKey, 'completed')}
          onRemove={() => setExamStatus(examKey, 'not_started')}
          onClose={() => setExamKey(null)}
        />
      )}
    </YouScreen>
  )
}
