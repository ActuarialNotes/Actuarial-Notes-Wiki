// Modal for configuring the study plan: targetReadyDate, targetStrengthLevel, and exam date.

import { useState } from 'react'
import { X, CalendarDays, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  applyPreset,
  daysBetween,
  todayISO,
  formatReadableDate,
  type StudyPlanConfig,
  type TargetStrengthLevel,
} from '@/lib/studyPlan'

interface Props {
  config: StudyPlanConfig
  examDate: string | null
  examLabel: string
  onSave: (next: Partial<StudyPlanConfig>) => void
  onExamDateChange?: (date: string | null) => void
  onClose: () => void
}

export function StudyPlanConfigModal({ config, examDate, examLabel, onSave, onExamDateChange, onClose }: Props) {
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

  function handleExamDateChange(value: string) {
    setLocalExamDate(value)
    // Keep ready date as 2w before new exam date by default
    if (value && (!readyDate || (localExamDate && readyDate === applyPreset(localExamDate, '2w')))) {
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
        <div className="flex items-center gap-0 px-5 pt-4">
          {STEPS.map((label, i) => {
            const s = (i + 1) as 1 | 2 | 3
            const isActive = step === s
            const isDone = step > s
            return (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : isDone
                        ? 'bg-primary/30 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {s}
                  </div>
                  <span className={`text-[10px] whitespace-nowrap ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-2 mb-4 ${step > s ? 'bg-primary/40' : 'bg-border'}`} />
                )}
              </div>
            )
          })}
        </div>

        <div className="p-5 pt-4 space-y-4">
          {/* Step 1: Exam Date */}
          {step === 1 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
                <p className="text-sm font-medium">When is your exam?</p>
              </div>
              <input
                type="date"
                value={localExamDate}
                min={today}
                onChange={e => handleExamDateChange(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              />
              {examDaysOut !== null && examDaysOut > 0 && (
                <p className="text-xs text-muted-foreground">{examDaysOut} day{examDaysOut === 1 ? '' : 's'} away</p>
              )}
              {localExamDate && examDaysOut !== null && examDaysOut <= 0 && (
                <p className="text-xs text-destructive">Date must be in the future</p>
              )}
            </div>
          )}

          {/* Step 2: Target Ready Date */}
          {step === 2 && (
            <div className="space-y-3">
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
              <p className="text-xs text-muted-foreground leading-relaxed">
                The date you want to have mastered all concepts, before your exam.
              </p>
              <input
                type="date"
                value={readyDate}
                min={today}
                max={localExamDate || examDate || undefined}
                onChange={e => setReadyDate(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              />
              {daysOut !== null && daysOut > 0 && (
                <p className="text-xs text-muted-foreground">
                  {daysOut} day{daysOut === 1 ? '' : 's'} from today
                </p>
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
                <p className="text-sm font-medium">Study strategy</p>
              </div>

              <div className="space-y-2">
                {([
                  {
                    value: 'strong_all' as TargetStrengthLevel,
                    label: 'Master everything',
                    desc: 'Aim to fully master every concept before the ready date. Learn concepts in sequence, one-by-one.',
                  },
                  {
                    value: 'strong_key' as TargetStrengthLevel,
                    label: 'Focus on key topics',
                    desc: 'Learn the key topics first, then fill in the details of less common concepts as time allows.',
                  },
                ] as const).map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStrength(opt.value)}
                    className={`w-full text-left rounded-lg border p-3 transition-colors ${
                      strength === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3.5 w-3.5 rounded-full border-2 shrink-0 ${
                          strength === opt.value
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}
                      />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </div>
                    <p className="mt-1 pl-5.5 text-xs text-muted-foreground">{opt.desc}</p>
                  </button>
                ))}
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
                Save plan
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
