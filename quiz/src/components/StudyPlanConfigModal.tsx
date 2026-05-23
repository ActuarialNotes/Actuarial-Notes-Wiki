// Modal for configuring the study plan: targetReadyDate, targetStrengthLevel, and exam date.

import { useState } from 'react'
import { X, CalendarDays, Target, Info, Sparkles, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExamSittingsList } from '@/components/ExamSittingsList'
import { StudyPlanInfoPanel } from '@/components/StudyPlanInfoPanel'
import { isValidSittingDate, getSittingsForExam } from '@/data/examSittings'
import {
  QUICK_SET_LABELS,
  QUICK_SET_PRESETS,
  applyPreset,
  daysBetween,
  todayISO,
  formatReadableDate,
  type StudyPlanConfig,
  type QuickSetPreset,
  type TargetStrengthLevel,
} from '@/lib/studyPlan'

const HEADLINE_PRESETS: QuickSetPreset[] = ['1w', '2w', '1m']

interface Props {
  config: StudyPlanConfig
  examDate: string | null
  examLabel: string
  examId?: string
  onSave: (next: Partial<StudyPlanConfig>) => void
  onExamDateChange?: (date: string | null) => void
  onClose: () => void
}

export function StudyPlanConfigModal({ config, examDate, examLabel, examId, onSave, onExamDateChange, onClose }: Props) {
  const today = todayISO()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [localExamDate, setLocalExamDate] = useState(examDate ?? '')
  const [readyDate, setReadyDate] = useState(() => {
    if (config.targetReadyDate) return config.targetReadyDate
    const base = examDate
    if (base) return applyPreset(base, '2w')
    return ''
  })
  const [strength, setStrength] = useState<TargetStrengthLevel>(config.targetStrengthLevel)
  const [activePreset, setActivePreset] = useState<QuickSetPreset | null>(() => {
    if (config.targetReadyDate && examDate) {
      for (const p of QUICK_SET_PRESETS) {
        if (applyPreset(examDate, p) === config.targetReadyDate) return p
      }
      return null  // saved date doesn't match any preset → custom
    }
    return '2w'  // default: 2 weeks before
  })
  const [showCustomReady, setShowCustomReady] = useState<boolean>(() => {
    if (!config.targetReadyDate || !examDate) return false
    return !HEADLINE_PRESETS.some(p => applyPreset(examDate, p) === config.targetReadyDate)
  })
  const [showInfo, setShowInfo] = useState(false)

  function selectPreset(preset: QuickSetPreset) {
    const base = localExamDate || examDate
    if (!base) return
    setReadyDate(applyPreset(base, preset))
    setActivePreset(preset)
  }

  function handleReadyDateChange(value: string) {
    setReadyDate(value)
    setActivePreset(null)
  }

  function handleExamDateChange(value: string) {
    setLocalExamDate(value)
    if (activePreset && value) {
      setReadyDate(applyPreset(value, activePreset))
    } else if (value && (!readyDate || (localExamDate && readyDate === applyPreset(localExamDate, '2w')))) {
      setReadyDate(applyPreset(value, '2w'))
    }
  }

  function handleSave() {
    onSave({ targetReadyDate: readyDate || null, targetStrengthLevel: strength })
    if (onExamDateChange) {
      onExamDateChange(localExamDate || null)
    }
    onClose()
  }

  const examDaysOut = localExamDate ? daysBetween(today, localExamDate) : null
  const daysOut = readyDate ? daysBetween(today, readyDate) : null
  const readyDateValid = !readyDate || (daysOut !== null && daysOut > 0)
  const examDateValid = !localExamDate || (examDaysOut !== null && examDaysOut > 0)

  const hasSittings = examId ? getSittingsForExam(examId).length > 0 : false
  const dateMatchesSitting = !examId || !localExamDate || !hasSittings || isValidSittingDate(examId, localExamDate)

  const STEPS = ['Exam Date', 'Ready Date', 'Study Strategy'] as const

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Study plan configuration"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-card border rounded-xl shadow-2xl flex flex-col my-12">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 border-b shrink-0">
          <Target className="h-4 w-4 text-primary shrink-0" />
          <span className="flex-1 font-semibold text-sm">Study Plan</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 px-5 pt-5">
          {STEPS.map((label, i) => {
            const s = (i + 1) as 1 | 2 | 3
            const isActive = step === s
            const isDone = step > s
            return (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground scale-110 ring-2 ring-primary/30'
                        : isDone
                        ? 'bg-primary/30 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {s}
                  </div>
                  <span className={`text-[10px] whitespace-nowrap transition-colors ${isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-colors ${step > s ? 'bg-primary/50' : 'bg-border'}`} />
                )}
              </div>
            )
          })}
        </div>

        <div className="p-5 pt-4 space-y-4">
          {/* Step 1: Exam Date */}
          {step === 1 && (
            <div className="space-y-3">
              {examDaysOut !== null && examDaysOut > 0 && (
                <div className="text-center py-1">
                  <p className="text-5xl font-bold tabular-nums tracking-tight">{examDaysOut}</p>
                  <p className="text-sm text-muted-foreground mt-1">day{examDaysOut === 1 ? '' : 's'} away</p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
                <p className="text-sm font-medium">When is your exam?</p>
              </div>
              {examId && (
                <ExamSittingsList
                  examId={examId}
                  selectedDate={localExamDate}
                  onSelect={handleExamDateChange}
                />
              )}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  {hasSittings ? 'Or enter a custom date' : 'Select a date'}
                </p>
                <div className="overflow-hidden rounded-md border border-input shadow-sm focus-within:ring-1 focus-within:ring-ring">
                  <input
                    type="date"
                    value={localExamDate}
                    min={today}
                    onChange={e => handleExamDateChange(e.target.value)}
                    className="block w-full bg-background px-3 py-2 text-sm transition-colors focus:outline-none"
                  />
                </div>
              </div>
              {localExamDate && examDaysOut !== null && examDaysOut <= 0 && (
                <p className="text-xs text-destructive">Date must be in the future</p>
              )}
              {localExamDate && examDaysOut !== null && examDaysOut > 0 && !dateMatchesSitting && (
                <p className="text-xs text-muted-foreground">This date doesn't match a known sitting window</p>
              )}
            </div>
          )}

          {/* Step 2: Target Ready Date */}
          {step === 2 && (
            <div className="space-y-3">
              {daysOut !== null && daysOut > 0 && (
                <div className="text-center py-1">
                  <p className="text-5xl font-bold tabular-nums tracking-tight">{daysOut}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    day{daysOut === 1 ? '' : 's'} from today
                    {examDaysOut !== null && examDaysOut > 0
                      ? ` · ${examDaysOut - daysOut} day${Math.abs(examDaysOut - daysOut) === 1 ? '' : 's'} before exam`
                      : ''}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
                <p className="text-sm font-medium">Target ready date</p>
              </div>
              {localExamDate && (
                <p className="text-xs text-muted-foreground">
                  {examLabel} exam on {formatReadableDate(localExamDate)}
                  {examDaysOut !== null && examDaysOut > 0 ? ` · ${examDaysOut} days away` : ''}
                </p>
              )}

              {/* Headline preset cards */}
              {localExamDate && !showCustomReady && (
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {HEADLINE_PRESETS.map(p => {
                    const isActive = activePreset === p
                    const targetDate = applyPreset(localExamDate, p)
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => selectPreset(p)}
                        className={`rounded-lg border p-3 text-left transition-all duration-200 ${
                          isActive
                            ? 'border-primary bg-primary/10 shadow-sm scale-[1.02]'
                            : 'border-border hover:bg-accent/50 hover:border-border'
                        }`}
                      >
                        <p className="text-sm font-semibold">{QUICK_SET_LABELS[p]}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {formatReadableDate(targetDate)}
                        </p>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Custom toggle / panel */}
              {localExamDate && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomReady(v => !v)}
                    className="text-xs font-medium text-primary hover:underline transition-colors"
                  >
                    {showCustomReady ? '← Use a preset' : 'Or pick a custom date →'}
                  </button>
                  {showCustomReady && (
                    <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Quick set</p>
                          <span className="text-xs font-medium text-foreground">
                            {activePreset ? QUICK_SET_LABELS[activePreset] : 'Custom date'}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={QUICK_SET_PRESETS.length - 1}
                          step={1}
                          value={activePreset !== null ? QUICK_SET_PRESETS.indexOf(activePreset) : 0}
                          onChange={e => {
                            const idx = parseInt(e.target.value)
                            if (idx >= 0 && idx < QUICK_SET_PRESETS.length) selectPreset(QUICK_SET_PRESETS[idx])
                          }}
                          className="w-full accent-primary"
                          aria-label="Quick set target ready date"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Or pick a date</p>
                        <div className="overflow-hidden rounded-md border border-input shadow-sm focus-within:ring-1 focus-within:ring-ring">
                          <input
                            type="date"
                            value={readyDate}
                            min={today}
                            max={localExamDate || examDate || undefined}
                            onChange={e => handleReadyDateChange(e.target.value)}
                            className="block w-full bg-background px-3 py-2 text-sm transition-colors focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {readyDate && daysOut !== null && daysOut <= 0 && (
                <p className="text-xs text-destructive">Date must be in the future</p>
              )}
            </div>
          )}

          {/* Step 3: Study Strategy */}
          {step === 3 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground shrink-0" />
                <p className="text-sm font-medium flex-1">Study strategy</p>
                <button
                  type="button"
                  onClick={() => setShowInfo(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1"
                  aria-label="How custom study plans work"
                  title="How custom study plans work"
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2">
                {([
                  {
                    value: 'strong_all' as TargetStrengthLevel,
                    label: 'Master everything',
                    desc: 'Aim to fully master every concept before the ready date. Learn concepts in sequence, one-by-one.',
                    icon: BookOpen,
                  },
                  {
                    value: 'strong_key' as TargetStrengthLevel,
                    label: 'Focus on key topics',
                    desc: 'Learn the key topics first, then fill in the details of less common concepts as time allows.',
                    icon: Sparkles,
                  },
                ] as const).map(opt => {
                  const Icon = opt.icon
                  const isActive = strength === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setStrength(opt.value)}
                      className={`w-full text-left rounded-lg border p-4 transition-all duration-200 ${
                        isActive
                          ? 'border-primary bg-primary/10 shadow-sm scale-[1.01]'
                          : 'border-border hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold">{opt.label}</p>
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{opt.desc}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex gap-2 justify-between">
          <div>
            {step > 1 && (
              <Button variant="outline" size="sm" onClick={() => setStep((step - 1) as 1 | 2 | 3)}>
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {step === 1 && (
              <Button variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
            )}
            {step < 3 ? (
              <Button
                size="sm"
                onClick={() => setStep((step + 1) as 2 | 3)}
                disabled={
                  (step === 1 && (!localExamDate || !examDateValid)) ||
                  (step === 2 && !!readyDate && !readyDateValid)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!!readyDate && !readyDateValid}
              >
                Lock in plan
              </Button>
            )}
          </div>
        </div>
      </div>
      <StudyPlanInfoPanel open={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  )
}
