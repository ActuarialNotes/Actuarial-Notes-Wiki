// Modal for configuring the study plan: targetReadyDate, targetStrengthLevel, and exam date.

import { useState } from 'react'
import { X, CalendarDays, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

  const [readyDate, setReadyDate]       = useState(config.targetReadyDate ?? '')
  const [strength, setStrength]         = useState<TargetStrengthLevel>(config.targetStrengthLevel)
  const [localExamDate, setLocalExamDate] = useState(examDate ?? '')
  const [activePreset, setActivePreset] = useState<QuickSetPreset | null>(() => {
    if (!config.targetReadyDate || !examDate) return null
    for (const p of QUICK_SET_PRESETS) {
      if (applyPreset(examDate, p) === config.targetReadyDate) return p
    }
    return null
  })

  function selectPreset(preset: QuickSetPreset) {
    const base = localExamDate || examDate
    if (!base) return
    const computed = applyPreset(base, preset)
    setReadyDate(computed)
    setActivePreset(preset)
  }

  function handleReadyDateChange(value: string) {
    setReadyDate(value)
    setActivePreset(null)
  }

  function handleExamDateChange(value: string) {
    setLocalExamDate(value)
    // Re-apply active preset against new exam date
    if (activePreset && value) {
      setReadyDate(applyPreset(value, activePreset))
    }
  }

  function handleSave() {
    onSave({ targetReadyDate: readyDate || null, targetStrengthLevel: strength })
    if (onExamDateChange) {
      onExamDateChange(localExamDate || null)
    }
    onClose()
  }

  const daysOut = readyDate ? daysBetween(today, readyDate) : null
  const examDaysOut = localExamDate ? daysBetween(today, localExamDate) : null

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

        <div className="p-5 space-y-6">
          {/* Exam date — editable */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
              <p className="text-sm font-medium">Exam date</p>
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
          </div>

          {/* Target ready date */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
              <p className="text-sm font-medium">Target ready date</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The date you want to have mastered all concepts — before your{' '}
              {examLabel} exam
              {localExamDate ? ` on ${formatReadableDate(localExamDate)}` : ''}.
            </p>

            {/* Quick-set slider */}
            {(localExamDate || examDate) && (
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
            )}

            {/* Manual date picker */}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Or pick a date
              </p>
              <input
                type="date"
                value={readyDate}
                min={today}
                max={localExamDate || examDate || undefined}
                onChange={e => handleReadyDateChange(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              />
              {daysOut !== null && daysOut > 0 && (
                <p className="text-xs text-muted-foreground">
                  {daysOut} day{daysOut === 1 ? '' : 's'} from today
                  {examDaysOut !== null && examDaysOut > 0
                    ? ` · ${examDaysOut - daysOut} day${Math.abs(examDaysOut - daysOut) === 1 ? '' : 's'} before exam`
                    : ''}
                </p>
              )}
              {daysOut !== null && daysOut <= 0 && (
                <p className="text-xs text-destructive">
                  Date must be in the future
                </p>
              )}
            </div>
          </div>

          {/* Strength level */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground shrink-0" />
              <p className="text-sm font-medium">Strength goal</p>
            </div>

            <div className="space-y-2">
              {([
                {
                  value: 'strong_all' as TargetStrengthLevel,
                  label: 'Master everything',
                  desc: 'Aim to fully master every concept before the ready date.',
                },
                {
                  value: 'strong_key' as TargetStrengthLevel,
                  label: 'Focus on key topics',
                  desc: 'Heavier exam topics get scheduled first; lighter topics are covered as time allows.',
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
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!!readyDate && (daysOut === null || daysOut <= 0)}
          >
            Save plan
          </Button>
        </div>
      </div>
    </div>
  )
}
