// Modal for configuring the study plan: targetReadyDate and targetStrengthLevel.

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
  onClose: () => void
}

export function StudyPlanConfigModal({ config, examDate, examLabel, onSave, onClose }: Props) {
  const today = todayISO()

  const [readyDate, setReadyDate]     = useState(config.targetReadyDate ?? '')
  const [strength, setStrength]       = useState<TargetStrengthLevel>(config.targetStrengthLevel)
  const [activePreset, setActivePreset] = useState<QuickSetPreset | null>(() => {
    // Detect which preset matches the current targetReadyDate, if any
    if (!config.targetReadyDate || !examDate) return null
    for (const p of QUICK_SET_PRESETS) {
      if (applyPreset(examDate, p) === config.targetReadyDate) return p
    }
    return null
  })

  function selectPreset(preset: QuickSetPreset) {
    if (!examDate) return
    const computed = applyPreset(examDate, preset)
    setReadyDate(computed)
    setActivePreset(preset)
  }

  function handleDateChange(value: string) {
    setReadyDate(value)
    setActivePreset(null)  // manual pick clears preset highlight
  }

  function handleSave() {
    onSave({ targetReadyDate: readyDate || null, targetStrengthLevel: strength })
    onClose()
  }

  const daysOut = readyDate ? daysBetween(today, readyDate) : null
  const examDaysOut = examDate ? daysBetween(today, examDate) : null

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
          <span className="flex-1 font-semibold text-sm">Study Plan Settings</span>
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
          {/* Target ready date */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
              <p className="text-sm font-medium">Target ready date</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The date you want to have mastered all concepts — before your{' '}
              {examLabel} exam
              {examDate ? ` on ${formatReadableDate(examDate)}` : ''}.
            </p>

            {/* Quick-set presets */}
            {examDate && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Quick set
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SET_PRESETS.map(preset => {
                    const computed = applyPreset(examDate, preset)
                    const inFuture = daysBetween(today, computed) > 0
                    return (
                      <button
                        key={preset}
                        type="button"
                        disabled={!inFuture}
                        onClick={() => selectPreset(preset)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                          activePreset === preset
                            ? 'bg-primary text-primary-foreground border-primary'
                            : inFuture
                            ? 'border-border text-muted-foreground hover:text-foreground hover:bg-accent'
                            : 'border-border text-muted-foreground/40 cursor-not-allowed'
                        }`}
                        title={inFuture ? formatReadableDate(computed) : 'Date has already passed'}
                      >
                        {QUICK_SET_LABELS[preset]}
                      </button>
                    )
                  })}
                </div>
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
                max={examDate ?? undefined}
                onChange={e => handleDateChange(e.target.value)}
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
                  label: 'Strong in everything',
                  desc: 'Aim to fully master every concept before the ready date.',
                },
                {
                  value: 'strong_key' as TargetStrengthLevel,
                  label: 'Prioritise high-weight topics',
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
