import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { useSettings } from '@/hooks/useSettings'
import { TRACKS } from '@/data/tracks'
import type { ItemStatus, TrackItem } from '@/data/tracks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Loader2, Settings2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

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

// ---- Avatar helpers ----

const PRESET_COLORS = ['#2563eb', '#9333ea', '#16a34a', '#ea580c', '#e11d48', '#0d9488']

function parseAvatarUrl(url: string): { type: 'image' | 'color'; value: string } {
  if (!url) return { type: 'color', value: '#475569' }
  if (url.startsWith('{')) {
    try {
      const parsed = JSON.parse(url)
      if (parsed.type === 'color') return { type: 'color', value: parsed.value }
    } catch { /* fall through */ }
  }
  return { type: 'image', value: url }
}

function AvatarPreview({ url, initials, size = 64 }: { url: string; initials: string; size?: number }) {
  const parsed = parseAvatarUrl(url)
  if (parsed.type === 'image') {
    return (
      <img
        src={parsed.value}
        alt="Avatar"
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
      />
    )
  }
  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%',
        backgroundColor: parsed.value,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 600, fontSize: size * 0.35,
      }}
    >
      {initials}
    </div>
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
      <div className="bg-background border border-border rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
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
    <Alert className={cn('mt-3 text-sm', error ? 'border-destructive text-destructive' : 'border-green-500 text-green-700 dark:text-green-400')}>
      {error ?? success}
    </Alert>
  )
}

// ---- Nav items ----

const NAV_ITEMS = [
  { id: 'profile',    label: 'Profile' },
  { id: 'exams',      label: 'Credential Path & Exams' },
  { id: 'data',       label: 'Progress & Data' },
]

// ---- Main page ----

export default function Settings() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
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

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { state: { from: '/settings' }, replace: true })
    }
  }, [user, authLoading, navigate])

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

  const handlePresetColor = (hex: string) => {
    const val = JSON.stringify({ type: 'color', value: hex })
    setLocalAvatarUrl(val)
    setProfileDirty(true)
  }

  // ---- Exams section state ----
  const [selectedTrack, setSelectedTrack] = useState('DEFAULT')
  const [localExamMap, setLocalExamMap] = useState<Record<string, { status: ItemStatus; targetDate: string }>>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem('quiz-journey')
      if (raw) {
        const j = JSON.parse(raw)
        if (j.selectedTrack) setSelectedTrack(j.selectedTrack)
      }
    } catch { /* ignore */ }
  }, [])

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
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [dataActionState, setDataActionState] = useState<{ saving: boolean; error: string | null; success: string | null }>({ saving: false, error: null, success: null })

  const handleResetHistory = async () => {
    setShowResetModal(false)
    setDataActionState({ saving: true, error: null, success: null })
    const ok = await resetHistory()
    setDataActionState({ saving: false, error: ok ? null : 'Failed to reset history.', success: ok ? 'Study history cleared.' : null })
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
  if (!user) return null

  const currentTrack = TRACKS.find(t => t.key === selectedTrack) ?? TRACKS[0]

  return (
    <>
      <ConfirmModal
        open={showResetModal}
        title="Reset study history?"
        confirmLabel="Reset History"
        onConfirm={handleResetHistory}
        onCancel={() => setShowResetModal(false)}
        destructive
      >
        <p>This will permanently delete all your quiz sessions and question responses. This cannot be undone.</p>
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

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings2 className="h-6 w-6" />
            Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar nav */}
          <nav className="md:w-44 shrink-0">
            <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 sticky top-20">
              {NAV_ITEMS.map(item => (
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
                      {/* Avatar color picker */}
                      <div className="flex items-center gap-4">
                        <AvatarPreview url={localAvatarUrl} initials={initials} size={64} />
                        <div className="flex flex-wrap gap-2">
                          {PRESET_COLORS.map(hex => (
                            <button
                              key={hex}
                              type="button"
                              title={hex}
                              onClick={() => handlePresetColor(hex)}
                              style={{ backgroundColor: hex }}
                              className={cn(
                                'w-7 h-7 rounded-full border-2 transition-transform hover:scale-110',
                                localAvatarUrl === JSON.stringify({ type: 'color', value: hex })
                                  ? 'border-foreground scale-110'
                                  : 'border-transparent'
                              )}
                            />
                          ))}
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
                                <Alert className="text-sm border-destructive text-destructive">{pwValidErr}</Alert>
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
                      onChange={e => {
                        const newTrack = e.target.value
                        setSelectedTrack(newTrack)
                        try {
                          const raw = localStorage.getItem('quiz-journey')
                          const journey = raw ? JSON.parse(raw) : { selectedTrack: 'DEFAULT', progress: {} }
                          journey.selectedTrack = newTrack
                          localStorage.setItem('quiz-journey', JSON.stringify(journey))
                        } catch { /* ignore */ }
                      }}
                      className="w-full sm:w-auto text-sm border border-input rounded-md px-3 py-2 bg-background text-foreground cursor-pointer"
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
                                    <div className="flex items-center gap-2">
                                      <Label htmlFor={`date-${item.id}`} className="text-xs text-muted-foreground whitespace-nowrap">
                                        Target date
                                      </Label>
                                      <input
                                        id={`date-${item.id}`}
                                        type="date"
                                        value={row.targetDate}
                                        onChange={e => setExamDate(item.id, e.target.value)}
                                        className="text-sm border border-input rounded-md px-2 py-1 bg-background text-foreground"
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
                      <p className="text-xs text-muted-foreground">Permanently delete all quiz sessions and responses.</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowResetModal(true)}
                      disabled={dataState.saving || dataActionState.saving}
                      className="shrink-0"
                    >
                      Reset History
                    </Button>
                  </div>

                  <Separator />

                  {/* Export */}
                  <div>
                    <p className="text-sm font-medium mb-2">Export performance data</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" disabled title="Coming soon">
                        Export CSV
                      </Button>
                      <Button variant="outline" disabled title="Coming soon">
                        Export PDF
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Export formats coming soon.</p>
                  </div>

                  <Feedback error={dataActionState.error} success={dataActionState.success} />

                  <Separator />

                  {/* Delete account */}
                  <div className="rounded-md border border-destructive/40 p-4 space-y-3">
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
