import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { useSettings } from '@/hooks/useSettings'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { TRACKS } from '@/data/tracks'
import type { ItemStatus, TrackItem } from '@/data/tracks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Loader2, User, ChevronRight, Star, Sun, Moon, GraduationCap, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSubscription } from '@/hooks/useSubscription'
import { useOnboardingTour } from '@/hooks/useOnboardingTour'
import { ExamSittingsList } from '@/components/ExamSittingsList'
import { DailyGoalPicker } from '@/components/DailyGoalPicker'
import { LeagueSettingsCard } from '@/components/LeagueSettingsCard'
import { EmailSettingsCard } from '@/components/EmailSettingsCard'
import { DAILY_PLAN_EMAIL_ENABLED, LEAGUES_ENABLED, XP_ENABLED } from '@/lib/featureFlags'
import {
  AvatarDisplay,
  ANIMAL_TYPES,
  ANIMAL_LABELS,
  parseAvatarUrl,
  serializeAvatar,
} from '@/components/AvatarDisplay'
import { COSMETICS } from '@/lib/cosmetics'
import { COLOR_THEMES } from '@/lib/colorThemes'
import { FREE_ANIMALS } from '@/lib/characters'
import { supabase } from '@/lib/supabase'
import { useTheme } from '@/hooks/useTheme'
import { RESETTABLE_EXAMS, EXAM_ID_TO_LABEL } from '@/lib/examIds'
import { ContactDialog } from '@/components/ContactDialog'
import { fetchExportResponses, responsesToCsv, buildExportFilename, downloadCsv, exportScopeSlug } from '@/lib/exportData'
import { buildProgressReport, generateProgressReportPdf, buildPdfFilename } from '@/lib/exportPdf'

// ---- Exam status cycle & icons ----

const STATUS_CYCLE: Record<ItemStatus, ItemStatus> = {
  not_started: 'in_progress',
  in_progress: 'completed',
  completed: 'not_started',
}

const STATUS_LABEL: Record<ItemStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Passed',
}

function StatusIcon({ status }: { status: ItemStatus }) {
  if (status === 'completed') {
    return (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="10" cy="10" r="8" fill="currentColor" opacity=".2" />
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
        <polyline points="6.5 10.5 9 13 14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (status === 'in_progress') {
    return (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 2a8 8 0 0 1 0 16" fill="currentColor" opacity=".45" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

// ---- Simple inline modal ----

function ConfirmModal({
  open,
  title,
  children,
  confirmLabel,
  confirmDisabled,
  onConfirm,
  onCancel,
  destructive,
}: {
  open: boolean
  title: string
  children: React.ReactNode
  confirmLabel: string
  confirmDisabled?: boolean
  onConfirm: () => void
  onCancel: () => void
  destructive?: boolean
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-background rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="text-sm text-muted-foreground space-y-2">{children}</div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button
            variant={destructive ? 'destructive' : 'default'}
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ---- Section feedback ----

function Feedback({ error, success }: { error: string | null; success: string | null }) {
  if (!error && !success) return null
  return (
    <Alert className={cn('mt-3 text-sm', error ? 'bg-destructive/10 text-destructive' : 'bg-green-500/10 text-green-700 dark:text-green-400')}>
      {error ?? success}
    </Alert>
  )
}

// ---- Inline auth form (shown on You tab when logged out) ----

function InlineAuthForm() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    try {
      if (mode === 'signin') {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
        if (authError) throw authError
        navigate('/dashboard', { replace: true })
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        })
        if (authError) throw authError
        setSignupSuccess(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (signupSuccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" onClick={() => { setSignupSuccess(false); setMode('signin') }}>
            Back to Sign In
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === 'signin' ? 'Sign In' : 'Create Account'}</CardTitle>
        <CardDescription>
          {mode === 'signin' ? 'Sign in to track your quiz progress' : 'Create an account to save results'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inline-email">Email</Label>
            <Input id="inline-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inline-password">Password</Label>
            <Input
              id="inline-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              minLength={8}
            />
          </div>
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="inline-confirm-password">Confirm Password</Label>
              <Input
                id="inline-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={8}
              />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {mode === 'signin' ? (
            <>
              Don&apos;t have an account?{' '}
              <button type="button" className="text-primary hover:underline" onClick={() => { setMode('signup'); setError(null) }}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" className="text-primary hover:underline" onClick={() => { setMode('signin'); setError(null) }}>
                Sign in
              </button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ---- Nav items ----

const BASE_NAV_ITEMS = [
  { id: 'profile',    label: 'Profile' },
  { id: 'premium',    label: 'Premium' },
  { id: 'exams',      label: 'Credential Path & Exams' },
  { id: 'data',       label: 'Progress & Data' },
]

// ---- Main page ----

export default function Settings() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { theme, toggleTheme, colorTheme, setColorTheme, colourfulVariant, setColourfulVariant } = useTheme()
  const { isPremium, isBetaTester, currentPeriodEnd, loading: subLoading } = useSubscription()
  const { sessions } = useProgress()
  const {
    profile, setProfile,
    examRows,
    loadingProfile, loadingExams,
    changePassword, updateProfile, saveExamRows,
    resetHistory, deleteAccount,
    accountState, profileState, examsState, dataState,
  } = useSettings()

  // Detect OAuth/SSO users (Google, Apple, etc.) — they cannot change their password
  // or email through our settings since identity is managed externally.
  const isSSOUser = !!(
    user?.app_metadata?.provider && user.app_metadata.provider !== 'email'
  )

  const navItems = [
    { id: 'support', label: 'Support' },
    { id: 'appearance', label: 'Appearance' },
    ...(user && XP_ENABLED ? [{ id: 'dailygoal', label: 'Daily Goal' }] : []),
    ...(user && LEAGUES_ENABLED ? [{ id: 'league', label: 'Leaderboard' }] : []),
    ...(user && DAILY_PLAN_EMAIL_ENABLED ? [{ id: 'email', label: 'Daily Email' }] : []),
    ...(user ? BASE_NAV_ITEMS : [{ id: 'signin', label: 'Sign In' }]),
  ]

  // ---- Onboarding tour (replayable from Support) ----
  const restartTour = useOnboardingTour(s => s.restart)
  const [showContact, setShowContact] = useState(false)

  // ---- Section refs for scroll-nav ----
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ---- Dirty tracking (per section) ----
  const [profileDirty, setProfileDirty] = useState(false)
  const [examsDirty, setExamsDirty] = useState(false)
  const isAnyDirty = profileDirty || examsDirty

  // beforeunload warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isAnyDirty) { e.preventDefault(); e.returnValue = '' }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isAnyDirty])

  // ---- Premium: manage subscription via Stripe portal ----
  const [portalLoading, setPortalLoading] = useState(false)
  const [portalError, setPortalError] = useState<string | null>(null)
  const [restoreLoading, setRestoreLoading] = useState(false)
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null)

  const handleRestorePurchase = async () => {
    setRestoreLoading(true)
    setRestoreMessage(null)
    try {
      const { data, error } = await supabase.functions.invoke('stripe-sync-session', { body: {} })
      if (error) throw new Error(error.message)
      if (data?.synced && data?.tier === 'premium') {
        setRestoreMessage('Premium restored! Your features should appear shortly.')
      } else {
        setRestoreMessage('No active subscription found. If you believe this is an error, contact support.')
      }
    } catch (err) {
      setRestoreMessage(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setRestoreLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    setPortalLoading(true)
    setPortalError(null)
    try {
      const { data, error } = await supabase.functions.invoke('stripe-create-portal', {
        body: { return_url: window.location.href },
      })
      if (error || !data?.url) throw new Error(error?.message ?? 'Could not open billing portal.')
      window.location.href = data.url
    } catch (err) {
      setPortalError(err instanceof Error ? err.message : 'Something went wrong.')
      setPortalLoading(false)
    }
  }

  // ---- Password change state (hidden behind toggle in Profile section) ----
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwValidErr, setPwValidErr] = useState<string | null>(null)

  const handlePasswordSave = async () => {
    setPwValidErr(null)
    if (!newPw) { setPwValidErr('New password is required.'); return }
    if (newPw.length < 8) { setPwValidErr('Password must be at least 8 characters.'); return }
    if (newPw !== confirmPw) { setPwValidErr('Passwords do not match.'); return }
    const ok = await changePassword(currentPw, newPw)
    if (ok) {
      setCurrentPw(''); setNewPw(''); setConfirmPw('')
      setShowPasswordFields(false)
    }
  }

  // ---- Profile section state ----
  const [localDisplayName, setLocalDisplayName] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [localAvatarUrl, setLocalAvatarUrl] = useState('')

  useEffect(() => {
    setLocalDisplayName(profile.displayName)
    setLocalEmail(profile.email)
    setLocalAvatarUrl(profile.avatarUrl)
  }, [profile])

  const handleProfileSave = async () => {
    const ok = await updateProfile({
      displayName: localDisplayName,
      email: isSSOUser ? undefined : localEmail,
      avatarUrl: localAvatarUrl,
    })
    if (ok) {
      setProfile(p => ({ ...p, displayName: localDisplayName, email: localEmail, avatarUrl: localAvatarUrl }))
      setProfileDirty(false)
    }
  }

  const handleAnimalSelect = (animal: typeof ANIMAL_TYPES[number]) => {
    setLocalAvatarUrl(serializeAvatar({ type: 'animal', value: animal }))
    setProfileDirty(true)
  }

  // Owned cosmetics — extends the avatar picker with unlocked color variants.
  const [ownedCosmetics, setOwnedCosmetics] = useState<Set<string>>(new Set())
  useEffect(() => {
    if (!user?.id) { setOwnedCosmetics(new Set()); return }
    let cancelled = false
    supabase
      .from('user_cosmetics')
      .select('cosmetic_id')
      .eq('user_id', user.id)
      .then(({ data, error }: { data: { cosmetic_id: string }[] | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          console.warn('Settings: failed to load cosmetics:', error.message)
          return
        }
        setOwnedCosmetics(new Set((data ?? []).map(r => r.cosmetic_id)))
      })
    return () => { cancelled = true }
  }, [user?.id])

  const handleVariantSelect = (animal: typeof ANIMAL_TYPES[number], variantKey: string) => {
    setLocalAvatarUrl(serializeAvatar({ type: 'animal', value: animal, variant: variantKey }))
    setProfileDirty(true)
  }

  const currentAvatar = parseAvatarUrl(localAvatarUrl)
  const currentAnimal = currentAvatar.type === 'animal' ? currentAvatar.value : null
  const currentVariant = currentAvatar.type === 'animal' ? currentAvatar.variant ?? null : null

  // ---- Exams section state ----
  const { selectedTrack, setSelectedTrack } = useExamProgress()
  const [localExamMap, setLocalExamMap] = useState<Record<string, { status: ItemStatus; targetDate: string }>>({})


  // Populate localExamMap whenever examRows or selectedTrack changes
  useEffect(() => {
    const track = TRACKS.find(t => t.key === selectedTrack)
    if (!track) return
    const allItems: TrackItem[] = track.sections.flatMap(s => s.items)
    const map: Record<string, { status: ItemStatus; targetDate: string }> = {}
    allItems.forEach(item => {
      const saved = examRows.find(r => r.exam_id === item.id)
      map[item.id] = { status: saved?.status ?? 'not_started', targetDate: saved?.target_date ?? '' }
    })
    setLocalExamMap(map)
    setExamsDirty(false)
  }, [examRows, selectedTrack])

  const setExamStatus = (examId: string, status: ItemStatus) => {
    setLocalExamMap(prev => ({
      ...prev,
      [examId]: { ...prev[examId], status, targetDate: status !== 'in_progress' ? '' : prev[examId]?.targetDate ?? '' },
    }))
    setExamsDirty(true)
  }

  const setExamDate = (examId: string, targetDate: string) => {
    setLocalExamMap(prev => ({ ...prev, [examId]: { ...prev[examId], targetDate } }))
    setExamsDirty(true)
  }

  const handleExamsSave = async () => {
    const rows = Object.entries(localExamMap).map(([exam_id, v]) => ({
      exam_id,
      status: v.status,
      target_date: v.targetDate || null,
    }))
    const ok = await saveExamRows(rows)
    if (ok) setExamsDirty(false)
  }

  // ---- Progress & Data modals ----
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetScope, setResetScope] = useState<'all' | string>('all')
  const [exportScope, setExportScope] = useState<'all' | string>('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [dataActionState, setDataActionState] = useState<{ saving: boolean; error: string | null; success: string | null }>({ saving: false, error: null, success: null })

  const handleResetHistory = async () => {
    setShowResetModal(false)
    setDataActionState({ saving: true, error: null, success: null })
    const examId = resetScope === 'all' ? null : resetScope
    const ok = await resetHistory(examId)
    const scopeLabel = examId ? EXAM_ID_TO_LABEL[examId] ?? examId : 'all exams'
    setDataActionState({
      saving: false,
      error: ok ? null : 'Failed to reset history.',
      success: ok ? `Study history and learning progress cleared for ${scopeLabel}.` : null,
    })
  }

  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv')
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    if (!user) return
    const examId = exportScope === 'all' ? null : exportScope
    const scopeLabel = examId ? EXAM_ID_TO_LABEL[examId] ?? examId : 'all exams'
    setExporting(true)
    setDataActionState({ saving: false, error: null, success: null })
    try {
      const rows = await fetchExportResponses(user.id, examId)
      if (rows.length === 0) {
        setDataActionState({ saving: false, error: `No answered questions to export for ${scopeLabel}.`, success: null })
        return
      }
      if (exportFormat === 'pdf') {
        const report = buildProgressReport(rows)
        const owner = profile.displayName?.trim() || profile.email || 'You'
        const scopeTitle = examId ? EXAM_ID_TO_LABEL[examId] ?? examId : 'All exams'
        await generateProgressReportPdf(report, { scopeLabel: scopeTitle, owner }, buildPdfFilename(exportScopeSlug(examId)))
      } else {
        downloadCsv(buildExportFilename(examId), responsesToCsv(rows))
      }
      const format = exportFormat.toUpperCase()
      setDataActionState({
        saving: false,
        error: null,
        success: `Exported ${rows.length} ${rows.length === 1 ? 'question' : 'questions'} for ${scopeLabel} as ${format}.`,
      })
    } catch (err) {
      setDataActionState({ saving: false, error: err instanceof Error ? err.message : 'Failed to export data.', success: null })
    } finally {
      setExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    setShowDeleteModal(false)
    setDataActionState({ saving: true, error: null, success: null })
    const ok = await deleteAccount()
    if (ok) navigate('/')
    else setDataActionState({ saving: false, error: 'Failed to delete account. Please try again.', success: null })
  }

  const totalSessions = sessions.length
  const avgScore = totalSessions > 0
    ? Math.round(sessions.reduce((sum, s) => sum + (s.correct_count / s.total_questions) * 100, 0) / totalSessions)
    : null

  const initials = (profile.displayName || profile.email || '?').slice(0, 2).toUpperCase()

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const currentTrack = TRACKS.find(t => t.key === selectedTrack) ?? TRACKS[0]

  return (
    <>
      {showContact && <ContactDialog onClose={() => setShowContact(false)} />}

      <ConfirmModal
        open={showResetModal}
        title="Reset study history?"
        confirmLabel="Reset History"
        onConfirm={handleResetHistory}
        onCancel={() => setShowResetModal(false)}
        destructive
      >
        <p>
          This will permanently delete all quiz sessions, question responses, and learning progress
          (concept mastery, daily completions, and cached study plans)
          {resetScope === 'all' ? ' for every exam' : ` for ${EXAM_ID_TO_LABEL[resetScope] ?? resetScope}`}.
          This cannot be undone.
        </p>
      </ConfirmModal>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete account"
        confirmLabel="Permanently Delete Account"
        confirmDisabled={deleteConfirmText !== 'DELETE'}
        onConfirm={handleDeleteAccount}
        onCancel={() => { setShowDeleteModal(false); setDeleteConfirmText('') }}
        destructive
      >
        <p className="font-medium text-destructive">This action is irreversible.</p>
        <p>
          Deleting your account will permanently remove all your data including quiz history and exam progress.
          In accordance with GDPR/CCPA, all your personal data will be erased and cannot be recovered.
        </p>
        <div className="mt-3">
          <Label htmlFor="delete-confirm">Type <span className="font-mono font-bold">DELETE</span> to confirm</Label>
          <Input
            id="delete-confirm"
            className="mt-1"
            value={deleteConfirmText}
            onChange={e => setDeleteConfirmText(e.target.value)}
            placeholder="DELETE"
          />
        </div>
      </ConfirmModal>

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <User className="h-6 w-6" />
            You
          </h1>
          {user && <p className="text-sm text-muted-foreground mt-1">{user.email}</p>}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar nav */}
          <nav className="md:w-44 shrink-0">
            <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 sticky top-20">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors whitespace-nowrap text-muted-foreground hover:text-foreground flex items-center justify-between group"
                  >
                    {item.label}
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity hidden md:block" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="flex-1 space-y-8 min-w-0">

            {/* ---- Support (first) ---- */}
            <section ref={el => { sectionRefs.current.support = el }} id="support">
              <Card>
                <CardHeader>
                  <CardTitle>Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">Take the tour</p>
                      <p className="text-xs text-muted-foreground">
                        Replay the guided walkthrough of Study Guides, concept popups, flashcards, quizzes and more.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => restartTour()}
                      className="shrink-0"
                    >
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Start tour
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">Contact us</p>
                      <p className="text-xs text-muted-foreground">
                        Have a question or found a bug? Send us a message.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowContact(true)}
                      className="shrink-0"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact us
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* ---- Appearance ---- */}
            <section ref={el => { sectionRefs.current.appearance = el }} id="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Mode</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => theme !== 'light' && toggleTheme()}
                        className={cn(
                          'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                          theme === 'light'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <Sun className="h-4 w-4" />
                        Light
                      </button>
                      <button
                        type="button"
                        onClick={() => theme !== 'dark' && toggleTheme()}
                        className={cn(
                          'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                          theme === 'dark'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <Moon className="h-4 w-4" />
                        Dark
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Theme</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {COLOR_THEMES.map(option => {
                        const swatch = theme === 'dark' ? option.preview.dark : option.preview.light
                        const selected = colorTheme === option.id

                        if (option.id === 'colourful') {
                          return (
                            <div
                              key={option.id}
                              role="button"
                              tabIndex={0}
                              onClick={() => setColorTheme(option.id)}
                              onKeyDown={e => e.key === 'Enter' && setColorTheme(option.id)}
                              className={cn(
                                'flex flex-col gap-2 p-3 rounded-md text-left transition-colors cursor-pointer',
                                selected
                                  ? 'ring-2 ring-primary'
                                  : 'bg-muted/40 hover:bg-accent hover:text-accent-foreground'
                              )}
                            >
                              <p className="text-sm font-medium">{option.name}</p>
                              <div className="flex gap-1.5 flex-wrap">
                                {option.variants!.map(v => {
                                  const vPrimary = theme === 'dark' ? v.dark.primary : v.light.primary
                                  const vAccent = theme === 'dark' ? v.dark.accent : v.light.accent
                                  const vSelected = selected && colourfulVariant === v.id
                                  return (
                                    <button
                                      key={v.id}
                                      type="button"
                                      aria-label={v.id}
                                      onClick={e => {
                                        e.stopPropagation()
                                        setColorTheme('colourful')
                                        setColourfulVariant(v.id)
                                      }}
                                      className={cn(
                                        'flex gap-1 p-0.5 rounded transition-colors',
                                        vSelected
                                          ? 'ring-1 ring-primary'
                                          : 'hover:bg-accent'
                                      )}
                                    >
                                      <span
                                        className="h-4 w-4 rounded-full border border-border/50"
                                        style={{ backgroundColor: vPrimary }}
                                      />
                                      <span
                                        className="h-4 w-4 rounded-full border border-border/50"
                                        style={{ backgroundColor: vAccent }}
                                      />
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        }

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setColorTheme(option.id)}
                            className={cn(
                              'flex flex-col gap-2 p-3 rounded-md text-left transition-colors',
                              selected
                                ? 'ring-2 ring-primary'
                                : 'bg-muted/40 hover:bg-accent hover:text-accent-foreground'
                            )}
                          >
                            <div className="flex gap-1.5">
                              <span
                                className="h-5 w-5 rounded-full border border-border/50"
                                style={{ backgroundColor: swatch.background }}
                              />
                              <span
                                className="h-5 w-5 rounded-full border border-border/50"
                                style={{ backgroundColor: swatch.primary }}
                              />
                              <span
                                className="h-5 w-5 rounded-full border border-border/50"
                                style={{ backgroundColor: swatch.accent }}
                              />
                            </div>
                            <p className="text-sm font-medium">{option.name}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* ---- Daily goal (XP) ---- */}
            {user && XP_ENABLED && (
              <section ref={el => { sectionRefs.current.dailygoal = el }} id="dailygoal">
                <DailyGoalPicker />
              </section>
            )}

            {/* ---- Weekly XP league opt-in (roadmap P4.1) ---- */}
            {user && LEAGUES_ENABLED && (
              <section ref={el => { sectionRefs.current.league = el }} id="league">
                <LeagueSettingsCard />
              </section>
            )}

            {/* ---- Daily study-plan email opt-in ---- */}
            {user && DAILY_PLAN_EMAIL_ENABLED && (
              <section ref={el => { sectionRefs.current.email = el }} id="email">
                <EmailSettingsCard />
              </section>
            )}

            {/* ---- Inline login (logged out) ---- */}
            {!user && (
              <section ref={el => { sectionRefs.current.signin = el }} id="signin">
                <InlineAuthForm />
              </section>
            )}

            {user && <>

            {/* ---- Profile (first) ---- */}
            <section ref={el => { sectionRefs.current.profile = el }} id="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loadingProfile ? (
                    <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
                  ) : (
                    <>
                      {/* Avatar picker */}
                      <div className="flex items-start gap-4">
                        <AvatarDisplay avatarUrl={localAvatarUrl} initials={initials} size={64} />
                        <div className="space-y-2">
                          {/* Default animal swatches */}
                          <div className="flex flex-wrap gap-2">
                            {ANIMAL_TYPES.filter(animal =>
                              FREE_ANIMALS.has(animal) || ownedCosmetics.has(`character:${animal}`)
                            ).map(animal => {
                              const isSelected = currentAnimal === animal && !currentVariant
                              return (
                                <button
                                  key={animal}
                                  type="button"
                                  title={ANIMAL_LABELS[animal]}
                                  onClick={() => handleAnimalSelect(animal)}
                                  className={cn(
                                    'w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 overflow-hidden p-0',
                                    isSelected ? 'border-foreground scale-110' : 'border-transparent'
                                  )}
                                >
                                  <AvatarDisplay avatarUrl={serializeAvatar({ type: 'animal', value: animal })} initials="" size={28} />
                                </button>
                              )
                            })}
                          </div>
                          {/* Owned cosmetic variants */}
                          {ownedCosmetics.size > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {COSMETICS.filter(c => ownedCosmetics.has(c.id)).map(c => {
                                const isSelected = currentAnimal === c.animal && currentVariant === c.variantKey
                                return (
                                  <button
                                    key={c.id}
                                    type="button"
                                    title={c.variantName}
                                    onClick={() => handleVariantSelect(c.animal!, c.variantKey!)}
                                    className={cn(
                                      'w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 overflow-hidden p-0',
                                      isSelected ? 'border-foreground scale-110' : 'border-transparent'
                                    )}
                                  >
                                    <AvatarDisplay
                                      avatarUrl={serializeAvatar({ type: 'animal', value: c.animal!, variant: c.variantKey! })}
                                      initials=""
                                      size={28}
                                    />
                                  </button>
                                )
                              })}
                            </div>
                          )}
                          <Link to="/store" className="text-xs text-primary hover:underline inline-block">
                            + Unlock more in the Store
                          </Link>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="display-name">Display name</Label>
                        <Input
                          id="display-name"
                          value={localDisplayName}
                          onChange={e => { setLocalDisplayName(e.target.value); setProfileDirty(true) }}
                          placeholder="Your name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        {isSSOUser ? (
                          <>
                            <Input id="email" type="email" value={localEmail} readOnly className="opacity-60 cursor-not-allowed" />
                            <p className="text-xs text-muted-foreground">
                              Email is managed by your {user?.app_metadata?.provider === 'google' ? 'Google' : 'linked'} account.
                            </p>
                          </>
                        ) : (
                          <>
                            <Input
                              id="email"
                              type="email"
                              value={localEmail}
                              onChange={e => { setLocalEmail(e.target.value); setProfileDirty(true) }}
                            />
                            <p className="text-xs text-muted-foreground">
                              A confirmation email will be sent to the new address before the change applies.
                            </p>
                          </>
                        )}
                      </div>

                      <Feedback error={profileState.error} success={profileState.success} />
                      <Button
                        onClick={handleProfileSave}
                        disabled={!profileDirty || profileState.saving}
                        className="w-full sm:w-auto"
                      >
                        {profileState.saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</> : 'Save Profile'}
                      </Button>

                      {/* Password change — hidden by default, not shown for SSO users */}
                      {!isSSOUser && (
                        <>
                          <Separator />
                          {!showPasswordFields ? (
                            <button
                              type="button"
                              onClick={() => setShowPasswordFields(true)}
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
                            >
                              Change my password
                            </button>
                          ) : (
                            <div className="space-y-4">
                              <p className="text-sm font-medium">Change password</p>
                              <div className="space-y-2">
                                <Label htmlFor="current-pw">Current password</Label>
                                <Input
                                  id="current-pw"
                                  type="password"
                                  autoComplete="current-password"
                                  value={currentPw}
                                  onChange={e => setCurrentPw(e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="new-pw">New password</Label>
                                <Input
                                  id="new-pw"
                                  type="password"
                                  autoComplete="new-password"
                                  value={newPw}
                                  onChange={e => setNewPw(e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="confirm-pw">Confirm new password</Label>
                                <Input
                                  id="confirm-pw"
                                  type="password"
                                  autoComplete="new-password"
                                  value={confirmPw}
                                  onChange={e => setConfirmPw(e.target.value)}
                                />
                              </div>
                              {pwValidErr && (
                                <Alert className="text-sm bg-destructive/10 text-destructive">{pwValidErr}</Alert>
                              )}
                              <Feedback error={accountState.error} success={accountState.success} />
                              <div className="flex gap-2">
                                <Button
                                  onClick={handlePasswordSave}
                                  disabled={accountState.saving}
                                  className="w-full sm:w-auto"
                                >
                                  {accountState.saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</> : 'Save Password'}
                                </Button>
                                <Button
                                  variant="ghost"
                                  onClick={() => { setShowPasswordFields(false); setCurrentPw(''); setNewPw(''); setConfirmPw(''); setPwValidErr(null) }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* ---- Premium ---- */}
            <section ref={el => { sectionRefs.current.premium = el }} id="premium">
              <Card>
                <CardHeader>
                  <CardTitle>Premium</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subLoading ? (
                    <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
                  ) : isPremium && isBetaTester ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400">
                          <Star className="h-3 w-3 fill-current" />
                          Beta Tester
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        You have Premium access via a beta tester code. Thank you for helping us build Actuarial Notes!
                      </p>
                    </>
                  ) : isPremium ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                          Premium
                        </span>
                      </div>
                      {currentPeriodEnd && (
                        <p className="text-sm text-muted-foreground">
                          Renews {new Date(currentPeriodEnd).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      )}
                      <div>
                        <Button
                          variant="outline"
                          onClick={handleManageSubscription}
                          disabled={portalLoading}
                        >
                          {portalLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Opening…</> : 'Manage Subscription'}
                        </Button>
                        {portalError && (
                          <p className="text-sm text-destructive mt-2">{portalError}</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          Free
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Upgrade to Premium for a custom study plan and exclusive features.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link to="/upgrade">
                          <Button variant="default">Upgrade to Premium →</Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={handleRestorePurchase}
                          disabled={restoreLoading}
                        >
                          {restoreLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Checking…</> : 'Restore Purchase'}
                        </Button>
                      </div>
                      {restoreMessage && (
                        <p className="text-sm text-muted-foreground">{restoreMessage}</p>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* ---- Credential Path & Exams ---- */}
            <section ref={el => { sectionRefs.current.exams = el }} id="exams">
              <Card>
                <CardHeader>
                  <CardTitle>Credential Path &amp; Exams</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="track-select">Credential track</Label>
                    <select
                      id="track-select"
                      value={selectedTrack}
                      onChange={e => setSelectedTrack(e.target.value)}
                      className="w-full sm:w-auto text-base border border-input rounded-md px-3 py-2 bg-background text-foreground cursor-pointer"
                    >
                      {TRACKS.map(t => (
                        <option key={t.key} value={t.key}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  {loadingExams ? (
                    <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
                  ) : (
                    <div className="space-y-4">
                      {currentTrack.sections.map(section => (
                        <div key={section.label}>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                            {section.label}
                          </p>
                          <div className="space-y-2">
                            {section.items.map(item => {
                              const row = localExamMap[item.id] ?? { status: 'not_started' as ItemStatus, targetDate: '' }
                              const statusColor =
                                row.status === 'completed' ? 'text-green-600 dark:text-green-500 opacity-100' :
                                row.status === 'in_progress' ? 'text-amber-600 dark:text-amber-500 opacity-100' :
                                'text-muted-foreground opacity-60'
                              return (
                                <div key={item.id} className="flex flex-wrap items-center gap-3 py-1">
                                  <button
                                    type="button"
                                    onClick={() => setExamStatus(item.id, STATUS_CYCLE[row.status])}
                                    title={STATUS_LABEL[row.status]}
                                    aria-label={`${STATUS_LABEL[row.status]} — click to cycle ${item.name} status`}
                                    className={cn(
                                      'inline-flex items-center justify-center w-[22px] h-[22px] shrink-0 rounded-full transition-all duration-100 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&>svg]:w-[18px] [&>svg]:h-[18px]',
                                      statusColor,
                                    )}
                                  >
                                    <StatusIcon status={row.status} />
                                  </button>
                                  <span
                                    className={cn(
                                      'text-sm font-medium w-32 shrink-0',
                                      row.status === 'completed' && 'line-through text-muted-foreground',
                                    )}
                                  >
                                    {item.name}
                                  </span>
                                  {row.status === 'in_progress' && (
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2">
                                        <Label htmlFor={`date-${item.id}`} className="text-xs text-muted-foreground whitespace-nowrap">
                                          Target date
                                        </Label>
                                        <input
                                          id={`date-${item.id}`}
                                          type="date"
                                          value={row.targetDate}
                                          onChange={e => setExamDate(item.id, e.target.value)}
                                          className="text-base border border-input rounded-md px-2 py-1 bg-background text-foreground"
                                        />
                                      </div>
                                      <ExamSittingsList
                                        examId={item.id}
                                        selectedDate={row.targetDate}
                                        onSelect={date => setExamDate(item.id, date)}
                                      />
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Feedback error={examsState.error} success={examsState.success} />
                  <Button
                    onClick={handleExamsSave}
                    disabled={!examsDirty || examsState.saving}
                    className="w-full sm:w-auto"
                  >
                    {examsState.saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</> : 'Save Exam Progress'}
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* ---- Progress & Data ---- */}
            <section ref={el => { sectionRefs.current.data = el }} id="data">
              <Card>
                <CardHeader>
                  <CardTitle>Progress &amp; Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Study history summary */}
                  <div>
                    <p className="text-sm font-medium mb-2">Study history</p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <span><span className="text-foreground font-medium">{totalSessions}</span> sessions</span>
                      {avgScore !== null && (
                        <span>avg score <span className="text-foreground font-medium">{avgScore}%</span></span>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Reset history */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">Reset study history</p>
                      <p className="text-xs text-muted-foreground">
                        Permanently delete quiz sessions, question responses, and learning progress (concept mastery,
                        daily completions, cached study plans).
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={resetScope}
                        onChange={e => setResetScope(e.target.value)}
                        aria-label="Reset scope"
                        className="text-sm border border-input rounded-md px-2 py-2 bg-background text-foreground cursor-pointer"
                      >
                        <option value="all">All exams</option>
                        {RESETTABLE_EXAMS.map(({ id, label }) => (
                          <option key={id} value={id}>{label}</option>
                        ))}
                      </select>
                      <Button
                        variant="outline"
                        onClick={() => setShowResetModal(true)}
                        disabled={dataState.saving || dataActionState.saving}
                      >
                        Reset History
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Export */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">Export performance data</p>
                      <p className="text-xs text-muted-foreground">
                        Download your answered questions as a <span className="font-medium">CSV</span> spreadsheet
                        (date, exam, topic, your answer, correct answer, result and time), or a branded{' '}
                        <span className="font-medium">PDF</span> progress report summarising your accuracy by exam and topic.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                      <select
                        value={exportScope}
                        onChange={e => setExportScope(e.target.value)}
                        aria-label="Export scope"
                        className="text-sm border border-input rounded-md px-2 py-2 bg-background text-foreground cursor-pointer"
                      >
                        <option value="all">All exams</option>
                        {RESETTABLE_EXAMS.map(({ id, label }) => (
                          <option key={id} value={id}>{label}</option>
                        ))}
                      </select>
                      <select
                        value={exportFormat}
                        onChange={e => setExportFormat(e.target.value as 'csv' | 'pdf')}
                        aria-label="Export format"
                        className="text-sm border border-input rounded-md px-2 py-2 bg-background text-foreground cursor-pointer"
                      >
                        <option value="csv">CSV spreadsheet</option>
                        <option value="pdf">PDF report</option>
                      </select>
                      <Button variant="outline" onClick={handleExport} disabled={exporting}>
                        {exporting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Exporting…</> : 'Export'}
                      </Button>
                    </div>
                  </div>

                  <Feedback error={dataActionState.error} success={dataActionState.success} />

                  <Separator />

                  {/* Delete account */}
                  <div className="rounded-md bg-destructive/5 p-4 space-y-3">
                    <p className="text-sm font-semibold text-destructive">Danger zone</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">Delete account</p>
                        <p className="text-xs text-muted-foreground">
                          Permanently delete your account and all data. This action cannot be undone.
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={() => setShowDeleteModal(true)}
                        disabled={dataState.saving || dataActionState.saving}
                        className="shrink-0"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            </> /* end user && */}

            <div className="text-center pt-2">
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
