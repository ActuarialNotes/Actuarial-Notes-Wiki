import { useState, useEffect, useCallback, useMemo } from 'react'
import { X, Loader2, GraduationCap, Play, LogIn, CalendarDays, Plus, Hammer, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { isExamBeta, isExamInDevelopment } from '@/lib/examStatus'
import { TRACKS } from '@/data/tracks'
import type { ItemStatus, TrackItem } from '@/data/tracks'
import { cn } from '@/lib/utils'
import { StudyPlanConfigModal } from '@/components/StudyPlanConfigModal'
import {
  loadStudyPlanConfig,
  saveStudyPlanConfig,
  todayISO,
  type StudyPlanConfig,
} from '@/lib/studyPlan'
import { useSoundOnToggle } from '@/hooks/useSoundEffects'

const ACTIVE_EXAM_KEY = 'quiz.dashboard.activeExamId'

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

/**
 * Whether an exam can actually be studied here.
 *
 * The credential tracks list ~50 exams, but only the ones with a syllabus page
 * in the vault can ever reach the dashboard — and of those, the in-development
 * ones (Exams 6–9) are a syllabus outline with no question bank. Adding either
 * kind used to "work": the row saved, and then nothing appeared on the
 * dashboard, with nothing on screen to say why. So the popout now says which
 * exams it can study and only offers to add those.
 */
type ExamAvailability = 'ready' | 'beta' | 'development' | 'unavailable'

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

interface Props {
  open: boolean
  onClose: () => void
}

function useDesktopLeft() {
  const [left, setLeft] = useState<string | undefined>(undefined)

  const update = useCallback(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    if (isDesktop) {
      const sidebarWidth =
        getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width').trim() || '16rem'
      setLeft(`calc(${sidebarWidth} + 8px)`)
    } else {
      setLeft(undefined)
    }
  }, [])

  useEffect(() => {
    update()
    const mq = window.matchMedia('(min-width: 1024px)')
    mq.addEventListener('change', update)
    // Also re-run when sidebar-width var might change (sidebar collapse)
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })
    return () => {
      mq.removeEventListener('change', update)
      observer.disconnect()
    }
  }, [update])

  return left
}

export default function ExamsPopout({ open, onClose }: Props) {
  // Paper: the panel sliding in.
  useSoundOnToggle(open, 'open', 'close')
  const { user } = useAuth()
  const navigate = useNavigate()
  const { isPremium } = useSubscription()
  const { syllabi } = useWikiSyllabus()
  const { examRows, loadingExams, selectedTrack, setSelectedTrack, saveExamRows, examsState, updateStudyPlanConfig, updateTargetDate } = useExamProgress()
  const [localExamMap, setLocalExamMap] = useState<Record<string, { status: ItemStatus; targetDate: string }>>({})
  const desktopLeft = useDesktopLeft()

  // Study Plan wizard state — must live outside the popout's `open` gate so it
  // remains mounted when the popout closes during onboarding.
  const [onboarding, setOnboarding] = useState<null | {
    examId: string
    examLabel: string
    examDate: string | null
    config: StudyPlanConfig
  }>(null)

  const currentTrack = TRACKS.find(t => t.key === selectedTrack) ?? TRACKS[0]

  // Which exams the vault actually has a syllabus page for — the same list the
  // dashboard builds its exam tabs from, so "added" and "shows up" agree.
  const studiableExams = useMemo(
    () => new Set(syllabi.map(s => wikiExamIdToProgressKey(s.examId))),
    [syllabi],
  )

  const availabilityOf = useCallback((examId: string): ExamAvailability => {
    if (!studiableExams.has(examId)) return 'unavailable'
    if (isExamInDevelopment(examId)) return 'development'
    return isExamBeta(examId) ? 'beta' : 'ready'
  }, [studiableExams])

  // Rebuild local map when examRows or track changes
  useEffect(() => {
    const allItems: TrackItem[] = currentTrack.sections.flatMap(s => s.items)
    const map: Record<string, { status: ItemStatus; targetDate: string }> = {}
    allItems.forEach(item => {
      const saved = examRows.find(r => r.exam_id === item.id)
      map[item.id] = { status: saved?.status ?? 'not_started', targetDate: saved?.target_date ?? '' }
    })
    setLocalExamMap(map)
  }, [examRows, selectedTrack, currentTrack])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Every status change writes straight through. The old panel collected edits
  // behind a "Save Exam Progress" button at the bottom of a scrolling list, so
  // the common outcome of "add my exam" was a change that was never saved.
  const persist = useCallback(
    (map: Record<string, { status: ItemStatus; targetDate: string }>) =>
      saveExamRows(
        Object.entries(map).map(([exam_id, v]) => ({
          exam_id,
          status: v.status,
          target_date: v.targetDate || null,
        })),
      ),
    [saveExamRows],
  )

  // The map is derived straight from `examRows` and this panel is its only
  // writer, so the next map can be built from the rendered one — no updater
  // callback, which would otherwise have to double as the place the write is
  // fired from.
  const setExamStatus = useCallback((examId: string, status: ItemStatus) => {
    const next = {
      ...localExamMap,
      [examId]: {
        ...localExamMap[examId],
        status,
        targetDate: status !== 'in_progress' ? '' : localExamMap[examId]?.targetDate ?? '',
      },
    }
    setLocalExamMap(next)
    return persist(next)
  }, [localExamMap, persist])

  const openOnboardingFor = useCallback((item: TrackItem, targetDate: string | null) => {
    // Promote this exam to be the user's active dashboard exam.
    try { localStorage.setItem(ACTIVE_EXAM_KEY, item.id) } catch { /* ignore */ }
    setOnboarding({
      examId: item.id,
      examLabel: item.name,
      examDate: targetDate,
      config: loadStudyPlanConfig(item.id),
    })
    onClose()
  }, [onClose])

  // "Add" — one action that marks the exam in progress, saves it, and goes
  // straight into the study-plan wizard.
  const handleAddExam = useCallback(async (item: TrackItem) => {
    // A failed write leaves the panel open showing the error, rather than
    // handing the user a study-plan wizard for an exam that wasn't added.
    if (!await setExamStatus(item.id, 'in_progress')) return
    openOnboardingFor(item, localExamMap[item.id]?.targetDate || null)
  }, [setExamStatus, openOnboardingFor, localExamMap])

  // Mirrors useStudyPlan.updateConfig: localStorage + Supabase persistence.
  const handleOnboardingConfigSave = (next: Partial<StudyPlanConfig>) => {
    if (!onboarding) return
    const merged: StudyPlanConfig = {
      ...onboarding.config,
      ...next,
      planStartDate: onboarding.config.planStartDate ?? (next.targetReadyDate ? todayISO() : null),
    }
    saveStudyPlanConfig(onboarding.examId, merged)
    updateStudyPlanConfig(onboarding.examId, merged).catch(() => { /* best-effort */ })
    setOnboarding(prev => prev ? { ...prev, config: merged } : prev)
  }

  const handleOnboardingExamDateChange = (date: string | null) => {
    if (!onboarding) return
    updateTargetDate(onboarding.examId, date).catch(() => { /* best-effort */ })
    setLocalExamMap(prev => ({
      ...prev,
      [onboarding.examId]: {
        status: prev[onboarding.examId]?.status ?? 'in_progress',
        targetDate: date ?? '',
      },
    }))
    setOnboarding(prev => prev ? { ...prev, examDate: date } : prev)
  }

  // Nothing on the dashboard yet — the panel leads with what to do rather than
  // leaving a new account to work out that the status dots are the way in.
  // Read off the saved rows, not the current track's slice of them, so browsing
  // a track you study nothing on doesn't bring the prompt back.
  const hasStudyingExam = examRows.some(r => r.status === 'in_progress')

  return (
    <>
      {open && (
        <>
      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 z-[55] bg-black/40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Credential Path & Exams"
        className={cn(
          'fixed z-[60] flex flex-col bg-background shadow-xl overflow-hidden',
          // Mobile: full-width bottom sheet
          'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-xl',
          // Desktop: side panel positioned via inline style
          'lg:bottom-4 lg:left-auto lg:right-auto lg:w-96 lg:max-h-[85vh] lg:rounded-xl',
        )}
        style={desktopLeft ? { left: desktopLeft } : undefined}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-sm">Credential Path &amp; Exams</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body — blurred when signed out */}
        <div className="relative flex flex-col flex-1 min-h-0">
          <div className={cn('flex flex-col flex-1 min-h-0', !user && 'blur-sm pointer-events-none select-none')}>
            {/* Track selector */}
            <div className="px-4 pt-3 pb-2 shrink-0 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground whitespace-nowrap">Credential track</span>
                <select
                  value={selectedTrack}
                  onChange={e => setSelectedTrack(e.target.value)}
                  className="flex-1 min-w-0 text-base border border-input rounded-md px-2 py-1.5 bg-background text-foreground cursor-pointer"
                >
                  {TRACKS.map(t => (
                    <option key={t.key} value={t.key}>{t.name}</option>
                  ))}
                </select>
              </div>
              {!loadingExams && !hasStudyingExam && (
                <p className="text-sm text-foreground">
                  Add the exam you&apos;re studying for and it appears on your dashboard.
                </p>
              )}
            </div>

            {/* Exam list — scrollable */}
            <div className="flex-1 overflow-y-auto px-4 pb-2">
              {loadingExams ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-4">
                  {currentTrack.sections.map(section => (
                    <div key={section.label}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        {section.label}
                      </p>
                      <div className="space-y-1.5">
                        {section.items.map(item => {
                          const row = localExamMap[item.id] ?? { status: 'not_started' as ItemStatus, targetDate: '' }
                          const availability = availabilityOf(item.id)
                          const canStudy = availability === 'ready' || availability === 'beta'
                          const statusColor =
                            row.status === 'completed'
                              ? 'text-green-600 dark:text-green-500 opacity-100'
                              : row.status === 'in_progress'
                              ? 'text-amber-600 dark:text-amber-500 opacity-100'
                              : 'text-muted-foreground opacity-60'
                          return (
                            <div key={item.id} className="flex items-center gap-2 py-0.5">
                              <button
                                type="button"
                                onClick={() => setExamStatus(item.id, STATUS_CYCLE[row.status])}
                                title={`${STATUS_LABEL[row.status]} — click to cycle ${item.name} status`}
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
                                  'text-sm font-medium flex-1 min-w-0 truncate',
                                  row.status === 'completed' && 'line-through text-muted-foreground',
                                  !canStudy && row.status !== 'completed' && 'text-muted-foreground',
                                )}
                              >
                                {item.name}
                              </span>

                              {/* Beta is worth saying next to the name; the two
                                  unstudiable states say so where the Add button
                                  would otherwise be, since that's the question
                                  being answered. */}
                              {canStudy && availability === 'beta' && row.status !== 'in_progress' && (
                                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                  Beta
                                </span>
                              )}

                              {availability === 'development' && (
                                <span
                                  className="shrink-0 inline-flex items-center gap-1 rounded-full border border-dashed border-muted-foreground/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                                  title="The syllabus is here, but there are no questions to study from yet."
                                >
                                  <Hammer className="h-3 w-3" aria-hidden="true" />
                                  In development
                                </span>
                              )}

                              {availability === 'unavailable' && (
                                <span
                                  className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium text-muted-foreground/70"
                                  title="No study material for this exam yet — you can still track it on your credential path."
                                >
                                  Not covered yet
                                </span>
                              )}

                              {canStudy && row.status !== 'in_progress' && (
                                <button
                                  type="button"
                                  onClick={() => handleAddExam(item)}
                                  disabled={examsState.saving}
                                  className="shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                  <Plus className="h-4 w-4" />
                                  Add
                                </button>
                              )}

                              {row.status === 'in_progress' && (() => {
                                const hasPlan = !!loadStudyPlanConfig(item.id).planStartDate
                                return (
                                  <button
                                    type="button"
                                    onClick={() => openOnboardingFor(item, row.targetDate || null)}
                                    className="shrink-0 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                  >
                                    {hasPlan
                                      ? <CalendarDays className="h-4 w-4" />
                                      : <Play className="h-4 w-4 fill-current" />}
                                    {hasPlan ? 'Change Exam Date' : 'Set Exam Date'}
                                  </button>
                                )
                              })()}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer — a save state, not a save button: changes are already written. */}
            <div className="px-4 py-3 shrink-0 min-h-[2.75rem] flex items-center">
              {examsState.error ? (
                <p className="text-xs text-destructive">
                  Couldn&apos;t save that — {examsState.error}
                </p>
              ) : examsState.saving ? (
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Saving…
                </p>
              ) : examsState.success ? (
                <p className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                  <Check className="h-3 w-3" />
                  Saved
                </p>
              ) : null}
            </div>
          </div>

          {/* Sign-in overlay */}
          {!user && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="bg-card rounded-2xl shadow-2xl px-6 py-5 flex flex-col items-center gap-3 max-w-xs w-full mx-4">
                <p className="text-sm font-semibold text-foreground text-center">Sign in to track exam progress</p>
                <button
                  type="button"
                  onClick={() => { onClose(); navigate('/auth', { state: { from: '/dashboard' } }); }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
        </>
      )}

      {onboarding && (
        <StudyPlanConfigModal
          config={onboarding.config}
          examDate={onboarding.examDate}
          examLabel={onboarding.examLabel}
          examId={onboarding.examId}
          isPremium={isPremium}
          onSave={handleOnboardingConfigSave}
          onExamDateChange={handleOnboardingExamDateChange}
          onClose={() => setOnboarding(null)}
        />
      )}
    </>
  )
}
