import { useState, useEffect, useCallback } from 'react'
import { X, Loader2, GraduationCap } from 'lucide-react'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { TRACKS } from '@/data/tracks'
import type { ItemStatus, TrackItem } from '@/data/tracks'
import { cn } from '@/lib/utils'
import { ExamSittingsList } from '@/components/ExamSittingsList'

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
  const { examRows, loadingExams, selectedTrack, setSelectedTrack, saveExamRows, examsState } = useExamProgress()
  const [localExamMap, setLocalExamMap] = useState<Record<string, { status: ItemStatus; targetDate: string }>>({})
  const [dirty, setDirty] = useState(false)
  const desktopLeft = useDesktopLeft()

  const currentTrack = TRACKS.find(t => t.key === selectedTrack) ?? TRACKS[0]

  // Rebuild local map when examRows or track changes
  useEffect(() => {
    const allItems: TrackItem[] = currentTrack.sections.flatMap(s => s.items)
    const map: Record<string, { status: ItemStatus; targetDate: string }> = {}
    allItems.forEach(item => {
      const saved = examRows.find(r => r.exam_id === item.id)
      map[item.id] = { status: saved?.status ?? 'not_started', targetDate: saved?.target_date ?? '' }
    })
    setLocalExamMap(map)
    setDirty(false)
  }, [examRows, selectedTrack, currentTrack])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  const setExamStatus = (examId: string, status: ItemStatus) => {
    setLocalExamMap(prev => ({
      ...prev,
      [examId]: {
        ...prev[examId],
        status,
        targetDate: status !== 'in_progress' ? '' : prev[examId]?.targetDate ?? '',
      },
    }))
    setDirty(true)
  }

  const setExamDate = (examId: string, targetDate: string) => {
    setLocalExamMap(prev => ({ ...prev, [examId]: { ...prev[examId], targetDate } }))
    setDirty(true)
  }

  const handleSave = async () => {
    const rows = Object.entries(localExamMap).map(([exam_id, v]) => ({
      exam_id,
      status: v.status,
      target_date: v.targetDate || null,
    }))
    const ok = await saveExamRows(rows)
    if (ok) setDirty(false)
  }

  if (!open) return null

  return (
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
          'fixed z-[60] flex flex-col bg-background border shadow-xl overflow-hidden',
          // Mobile: full-width bottom sheet
          'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-xl',
          // Desktop: side panel positioned via inline style
          'lg:bottom-4 lg:left-auto lg:right-auto lg:w-96 lg:max-h-[85vh] lg:rounded-xl',
        )}
        style={desktopLeft ? { left: desktopLeft } : undefined}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
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

        {/* Track selector */}
        <div className="px-4 pt-3 pb-2 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Credential track</span>
            <select
              value={selectedTrack}
              onChange={e => setSelectedTrack(e.target.value)}
              className="flex-1 text-sm border border-input rounded-md px-2 py-1.5 bg-background text-foreground cursor-pointer"
            >
              {TRACKS.map(t => (
                <option key={t.key} value={t.key}>{t.name}</option>
              ))}
            </select>
          </div>
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
                      const statusColor =
                        row.status === 'completed'
                          ? 'text-green-600 dark:text-green-500 opacity-100'
                          : row.status === 'in_progress'
                          ? 'text-amber-600 dark:text-amber-500 opacity-100'
                          : 'text-muted-foreground opacity-60'
                      return (
                        <div key={item.id} className="flex flex-wrap items-center gap-2 py-0.5">
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
                              'text-sm font-medium w-28 shrink-0',
                              row.status === 'completed' && 'line-through text-muted-foreground',
                            )}
                          >
                            {item.name}
                          </span>
                          {row.status === 'in_progress' && (
                            <div className="w-full flex flex-col gap-1.5 mt-1 pl-7">
                              <div className="flex items-center gap-1.5">
                                <label htmlFor={`pop-date-${item.id}`} className="text-xs text-muted-foreground whitespace-nowrap">
                                  Target date
                                </label>
                                <input
                                  id={`pop-date-${item.id}`}
                                  type="date"
                                  value={row.targetDate}
                                  onChange={e => setExamDate(item.id, e.target.value)}
                                  className="text-xs border border-input rounded-md px-2 py-1 bg-background text-foreground"
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
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-3 shrink-0 space-y-2">
          {(examsState.error || examsState.success) && (
            <p className={cn(
              'text-xs',
              examsState.error ? 'text-destructive' : 'text-green-600 dark:text-green-400',
            )}>
              {examsState.error ?? examsState.success}
            </p>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty || examsState.saving}
            className="w-full flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {examsState.saving ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Saving…</>
            ) : 'Save Exam Progress'}
          </button>
        </div>
      </div>
    </>
  )
}
