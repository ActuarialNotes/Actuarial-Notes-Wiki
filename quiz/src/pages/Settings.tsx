import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useBlocker } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
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
import { Loader2, Sun, Moon, Settings2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  { id: 'account',    label: 'Account' },
  { id: 'profile',    label: 'Profile' },
  { id: 'exams',      label: 'Credential Path & Exams' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'data',       label: 'Progress & Data' },
]

// ---- Main page ----

export default function Settings() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { sessions } = useProgress()
  const {
    profile, setProfile,
    examRows,
    loadingProfile, loadingExams,
    changePassword, updateProfile, uploadAvatar, saveExamRows,
    resetHistory, deleteAccount,
    accountState, profileState, examsState, dataState,
  } = useSettings()

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
  const [accountDirty, setAccountDirty] = useState(false)
  const [profileDirty, setProfileDirty] = useState(false)
  const [examsDirty, setExamsDirty] = useState(false)
  const isAnyDirty = accountDirty || profileDirty || examsDirty

  // beforeunload warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isAnyDirty) { e.preventDefault(); e.returnValue = '' }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isAnyDirty])

  // In-app navigation blocker
  const blocker = useBlocker(({ currentLocation, nextLocation }) =>
    isAnyDirty && currentLocation.pathname !== nextLocation.pathname
  )

  // ---- Account section state ----
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
      setAccountDirty(false)
    }
  }

  // ---- Profile section state ----
  const [localDisplayName, setLocalDisplayName] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [localAvatarUrl, setLocalAvatarUrl] = useState('')
  const [avatarUploading, setAvatarUploading] = useState(false)

  useEffect(() => {
    setLocalDisplayName(profile.displayName)
    setLocalEmail(profile.email)
    setLocalAvatarUrl(profile.avatarUrl)
  }, [profile])

  const handleProfileSave = async () => {
    const ok = await updateProfile({
      displayName: localDisplayName,
      email: localEmail,
      avatarUrl: localAvatarUrl,
    })
    if (ok) {
      setProfile(p => ({ ...p, displayName: localDisplayName, email: localEmail, avatarUrl: localAvatarUrl }))
      setProfileDirty(false)
    }
  }

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarUploading(true)
    const url = await uploadAvatar(file)
    if (url) {
      setLocalAvatarUrl(url)
      setProfileDirty(true)
    }
    setAvatarUploading(false)
    e.target.value = ''
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
      {/* Unsaved changes blocker */}
      {blocker.state === 'blocked' && (
        <ConfirmModal
          open
          title="Unsaved changes"
          confirmLabel="Leave anyway"
          onConfirm={() => blocker.proceed?.()}
          onCancel={() => blocker.reset?.()}
          destructive
        >
          <p>You have unsaved changes. If you leave now, they will be lost.</p>
        </ConfirmModal>
      )}

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

            {/* ---- Account ---- */}
            <section ref={el => { sectionRefs.current.account = el }} id="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-pw">Current password</Label>
                    <Input
                      id="current-pw"
                      type="password"
                      autoComplete="current-password"
                      value={currentPw}
                      onChange={e => { setCurrentPw(e.target.value); setAccountDirty(true) }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-pw">New password</Label>
                    <Input
                      id="new-pw"
                      type="password"
                      autoComplete="new-password"
                      value={newPw}
                      onChange={e => { setNewPw(e.target.value); setAccountDirty(true) }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-pw">Confirm new password</Label>
                    <Input
                      id="confirm-pw"
                      type="password"
                      autoComplete="new-password"
                      value={confirmPw}
                      onChange={e => { setConfirmPw(e.target.value); setAccountDirty(true) }}
                    />
                  </div>
                  {pwValidErr && (
                    <Alert className="text-sm border-destructive text-destructive">{pwValidErr}</Alert>
                  )}
                  <Feedback error={accountState.error} success={accountState.success} />
                  <Button
                    onClick={handlePasswordSave}
                    disabled={!accountDirty || accountState.saving}
                    className="w-full sm:w-auto"
                  >
                    {accountState.saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</> : 'Save Password'}
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* ---- Profile ---- */}
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
                      {/* Avatar */}
                      <div className="flex items-center gap-4">
                        <AvatarPreview url={localAvatarUrl} initials={initials} size={64} />
                        <div className="space-y-2">
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
                          <label className="inline-block">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-input bg-background hover:bg-accent cursor-pointer transition-colors">
                              {avatarUploading ? <><Loader2 className="h-3 w-3 animate-spin" />Uploading…</> : 'Upload photo'}
                            </span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="sr-only"
                              onChange={handleAvatarFile}
                              disabled={avatarUploading}
                            />
                          </label>
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
                        <Input
                          id="email"
                          type="email"
                          value={localEmail}
                          onChange={e => { setLocalEmail(e.target.value); setProfileDirty(true) }}
                        />
                        <p className="text-xs text-muted-foreground">
                          A confirmation email will be sent to the new address before the change applies.
                        </p>
                      </div>

                      <Feedback error={profileState.error} success={profileState.success} />
                      <Button
                        onClick={handleProfileSave}
                        disabled={!profileDirty || profileState.saving}
                        className="w-full sm:w-auto"
                      >
                        {profileState.saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</> : 'Save Profile'}
                      </Button>
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
                              return (
                                <div key={item.id} className="flex flex-wrap items-center gap-3 py-1">
                                  <span className="text-sm font-medium w-32 shrink-0">{item.name}</span>
                                  <select
                                    value={row.status}
                                    onChange={e => setExamStatus(item.id, e.target.value as ItemStatus)}
                                    className="text-sm border border-input rounded-md px-2 py-1 bg-background text-foreground cursor-pointer"
                                  >
                                    <option value="not_started">Not Started</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Passed</option>
                                  </select>
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

            {/* ---- Appearance ---- */}
            <section ref={el => { sectionRefs.current.appearance = el }} id="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Theme</p>
                      <p className="text-xs text-muted-foreground">
                        Currently using <span className="font-medium capitalize">{theme}</span> mode
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                      className="h-10 w-10 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Theme preference is saved automatically and synced with the wiki.
                  </p>
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
