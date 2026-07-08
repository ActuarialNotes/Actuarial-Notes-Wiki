import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X, CalendarDays, Info, Sparkles, BookOpen, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExamSittingsList } from '@/components/ExamSittingsList'
import { SittingDateGrid } from '@/components/SittingDateGrid'
import { StudyPlanInfoPanel } from '@/components/StudyPlanInfoPanel'
import { getSittingsForExam, LOCALIZED_EXAMS } from '@/data/examSittings'
import {
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

// Compact chip labels for the ready-date buffer presets (the hero date shows the resolved day)
const HEADLINE_PRESET_LABELS: Record<'1w' | '2w' | '1m', string> = {
  '1w': '1 week',
  '2w': '2 weeks',
  '1m': '1 month',
}

interface Props {
  config: StudyPlanConfig
  examDate: string | null
  examLabel: string
  examId?: string
  initialStep?: number
  isPremium?: boolean
  onSave: (next: Partial<StudyPlanConfig>) => void
  onExamDateChange?: (date: string | null) => void
  onClose: () => void
}

export function StudyPlanConfigModal({ config, examDate, examLabel, examId, initialStep, isPremium = true, onSave, onExamDateChange, onClose }: Props) {
  const today = todayISO()

  const variants = examId ? (LOCALIZED_EXAMS[examId] ?? null) : null
  const hasVariants = variants !== null && variants.length > 0

  const EXAM_DATE_STEP = hasVariants ? 2 : 1
  const READY_DATE_STEP = hasVariants ? 3 : 2
  const STRATEGY_STEP = hasVariants ? 4 : 3
  const TOTAL_STEPS = hasVariants ? 4 : 3
  const STEP_LABELS = hasVariants
    ? ['Version', 'Exam Date', 'Ready Date', 'Study Strategy']
    : ['Exam Date', 'Ready Date', 'Study Strategy']

  const [step, setStep] = useState<number>(() => {
    if (initialStep !== undefined) return initialStep
    if (hasVariants && !config.examVariant) return 1
    return EXAM_DATE_STEP
  })
  const [localExamVariant, setLocalExamVariant] = useState<string>(config.examVariant ?? '')
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
      return null
    }
    return '2w'
  })
  const [showInfo, setShowInfo] = useState(false)
  const readyDateInputRef = useRef<HTMLInputElement>(null)
  const examDateInputRef = useRef<HTMLInputElement>(null)

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

  function handleExamSittingSelect(value: string) {
    if (value === localExamDate) {
      if (step < TOTAL_STEPS) setStep(step + 1)
    } else {
      handleExamDateChange(value)
    }
  }

  function handleSave() {
    onSave({
      targetReadyDate: readyDate || null,
      targetStrengthLevel: strength,
      ...(hasVariants && localExamVariant ? { examVariant: localExamVariant } : {}),
    })
    if (onExamDateChange) {
      onExamDateChange(localExamDate || null)
    }
    onClose()
  }

  const examDaysOut = localExamDate ? daysBetween(today, localExamDate) : null
  const daysOut = readyDate ? daysBetween(today, readyDate) : null
  const readyDateValid = !readyDate || (daysOut !== null && daysOut > 0)
  const examDateValid = !localExamDate || (examDaysOut !== null && examDaysOut > 0)

  const sittings = examId ? getSittingsForExam(examId) : []
  const hasSittings = sittings.length > 0
  const selectedSitting = sittings.find(s => {
    if (!localExamDate) return false
    if (s.endDate) return localExamDate >= s.startDate && localExamDate <= s.endDate
    return localExamDate === s.startDate
  }) ?? null

  function isNextDisabled(): boolean {
    if (step === 1 && hasVariants) return !localExamVariant
    if (step === EXAM_DATE_STEP) return !localExamDate || !examDateValid
    if (step === READY_DATE_STEP) return !!readyDate && !readyDateValid
    return false
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Study plan configuration"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl flex flex-col my-12">
        {/* Header — just the exam name */}
        <div className="flex items-start justify-between px-6 pt-5">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground/70 leading-none">Study plan</p>
            <h2 className="text-xl font-bold leading-tight truncate mt-1">{examLabel}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground/50 hover:text-foreground p-1 -mr-1 -mt-1 transition-colors ml-2 shrink-0"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress — minimal segmented bar */}
        <div className="flex items-center gap-1.5 px-6 pt-4">
          {STEP_LABELS.map((_, i) => {
            const s = i + 1
            const isActive = step === s
            const isDone = step > s
            const isStrategyLocked = s === STRATEGY_STEP && !isPremium
            return (
              <button
                key={s}
                type="button"
                disabled={isStrategyLocked}
                onClick={() => {
                  if (isStrategyLocked) return
                  if (s === step) {
                    if (step < TOTAL_STEPS && !isNextDisabled()) setStep(step + 1)
                  } else {
                    setStep(s)
                  }
                }}
                className="group flex-1 py-2 focus:outline-none disabled:cursor-not-allowed"
                aria-label={`Step ${s} of ${TOTAL_STEPS}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary'
                      : isDone
                      ? 'bg-primary/40'
                      : 'bg-muted group-hover:bg-muted-foreground/20'
                  }`}
                />
              </button>
            )
          })}
        </div>

        <div className="px-6 pb-2 pt-5 space-y-5">

          {/* Step: Version selection (localized exams only) */}
          {step === 1 && hasVariants && (
            <div className="space-y-4">
              <p className="text-lg font-semibold">Which version are you taking?</p>
              <div className="space-y-2">
                {variants!.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setLocalExamVariant(v.id)}
                    className={`w-full text-left rounded-xl p-3.5 text-sm font-semibold transition-all duration-200 ${
                      localExamVariant === v.id
                        ? 'bg-primary/10'
                        : 'bg-muted/40 hover:bg-accent/50'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Exam Date step */}
          {step === EXAM_DATE_STEP && (
            <div className="space-y-4">
              <p className="text-lg font-semibold">When is your exam?</p>

              {localExamDate && examDaysOut !== null && examDaysOut > 0 && (
                <button
                  type="button"
                  onClick={() => { examDateInputRef.current?.showPicker?.() ?? examDateInputRef.current?.click() }}
                  className="group flex items-center gap-2.5 text-left"
                  aria-label="Change exam date"
                >
                  <span className="text-4xl font-bold tracking-tight">{formatReadableDate(localExamDate)}</span>
                  <CalendarDays className="h-5 w-5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                  <input
                    ref={examDateInputRef}
                    type="date"
                    value={localExamDate}
                    min={selectedSitting?.startDate ?? today}
                    max={selectedSitting?.endDate ?? undefined}
                    onChange={e => handleExamDateChange(e.target.value)}
                    className="sr-only dark:[color-scheme:dark]"
                  />
                </button>
              )}

              {hasSittings ? (
                <>
                  {examId && (
                    <ExamSittingsList
                      examId={examId}
                      selectedDate={localExamDate}
                      onSelect={handleExamSittingSelect}
                    />
                  )}
                  {selectedSitting?.endDate && selectedSitting.endDate !== selectedSitting.startDate
                    && daysBetween(selectedSitting.startDate, selectedSitting.endDate) <= 35 && (
                    <SittingDateGrid
                      startDate={selectedSitting.startDate}
                      endDate={selectedSitting.endDate}
                      selectedDate={localExamDate}
                      onSelect={handleExamDateChange}
                    />
                  )}
                </>
              ) : !localExamDate ? (
                <div className="overflow-hidden rounded-md border border-input shadow-sm focus-within:ring-1 focus-within:ring-ring">
                  <input
                    type="date"
                    value={localExamDate}
                    min={today}
                    onChange={e => handleExamDateChange(e.target.value)}
                    className="block w-full bg-background px-3 py-2 text-base transition-colors focus:outline-none"
                  />
                </div>
              ) : null}

              {localExamDate && examDaysOut !== null && examDaysOut <= 0 && (
                <p className="text-xs text-destructive">Date must be in the future</p>
              )}
            </div>
          )}

          {/* Ready Date step */}
          {step === READY_DATE_STEP && (
            <div className="space-y-4">
              <p className="text-lg font-semibold">When do you want to be exam-ready?</p>

              {/* Selected ready date — tap to pick a custom day */}
              {readyDate && (
                <button
                  type="button"
                  onClick={() => { readyDateInputRef.current?.showPicker?.() ?? readyDateInputRef.current?.click() }}
                  className="group flex items-center gap-2.5 text-left"
                  aria-label="Change ready date"
                >
                  <span className="text-4xl font-bold tracking-tight">{formatReadableDate(readyDate)}</span>
                  <CalendarDays className="h-5 w-5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                  <input
                    ref={readyDateInputRef}
                    type="date"
                    value={readyDate}
                    min={today}
                    max={localExamDate || examDate || undefined}
                    onChange={e => handleReadyDateChange(e.target.value)}
                    className="sr-only dark:[color-scheme:dark]"
                  />
                </button>
              )}

              {/* Buffer presets — the hero date above shows the resolved day */}
              {localExamDate && (
                <div className="grid grid-cols-3 gap-2">
                  {HEADLINE_PRESETS.map(p => {
                    const isActive = activePreset === p
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => selectPreset(p)}
                        className={`rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted/40 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {HEADLINE_PRESET_LABELS[p as '1w' | '2w' | '1m']}
                      </button>
                    )
                  })}
                </div>
              )}
              <p className="text-xs text-muted-foreground/70">A buffer before exam day to review and rest.</p>

              {readyDate && daysOut !== null && daysOut <= 0 && (
                <p className="text-xs text-destructive">Date must be in the future</p>
              )}

              {!isPremium && (
                <div className="flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary/60" />
                  <span>
                    Study strategy customization is a{' '}
                    <Link to="/upgrade" className="underline text-primary hover:text-primary/80">Premium</Link>{' '}
                    feature.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Study Strategy step */}
          {step === STRATEGY_STEP && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-lg font-semibold">How do you want to study?</p>
                <button
                  type="button"
                  onClick={() => setShowInfo(true)}
                  className="text-muted-foreground/50 hover:text-foreground transition-colors p-1 -mr-1 shrink-0"
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
                    desc: 'Fully master every concept, one at a time.',
                    icon: BookOpen,
                  },
                  {
                    value: 'strong_key' as TargetStrengthLevel,
                    label: 'Focus on key topics',
                    desc: 'Prioritize key topics, then fill in the rest.',
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
                      className={`w-full text-left rounded-xl p-4 transition-all duration-200 ${
                        isActive
                          ? 'bg-primary/10'
                          : 'bg-muted/40 hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
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
                          <p className="mt-0.5 text-xs text-muted-foreground">{opt.desc}</p>
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
        <div className="px-6 pb-6 pt-3 flex gap-2 justify-between">
          <div>
            {step > 1 && (
              <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>
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
            {step < TOTAL_STEPS && !(step === READY_DATE_STEP && !isPremium) ? (
              <Button
                size="sm"
                onClick={() => setStep(step + 1)}
                disabled={isNextDisabled()}
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
