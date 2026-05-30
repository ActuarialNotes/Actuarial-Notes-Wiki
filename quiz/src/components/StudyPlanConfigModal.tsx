import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X, CalendarDays, Target, Info, Sparkles, BookOpen, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExamSittingsList } from '@/components/ExamSittingsList'
import { StudyPlanInfoPanel } from '@/components/StudyPlanInfoPanel'
import { getSittingsForExam, LOCALIZED_EXAMS } from '@/data/examSittings'
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
      <div className="w-full max-w-md bg-card border rounded-xl shadow-2xl flex flex-col my-12">
        {/* Header — exam name prominently displayed */}
        <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Target className="h-4 w-4 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium leading-none">Study Plan</p>
              <p className="text-base font-bold leading-tight truncate">{examLabel}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors ml-2 shrink-0"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 px-5 pt-5">
          {STEP_LABELS.map((label, i) => {
            const s = i + 1
            const isActive = step === s
            const isDone = step > s
            const isStrategyLocked = s === STRATEGY_STEP && !isPremium
            return (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                {isStrategyLocked ? (
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-muted/50 text-muted-foreground/40 cursor-not-allowed border border-dashed border-muted-foreground/20">
                      <Lock className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[10px] whitespace-nowrap text-muted-foreground/40">{label}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStep(s)}
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                    aria-label={`Go to step ${s}: ${label}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-foreground scale-110 ring-2 ring-primary/30'
                          : isDone
                          ? 'bg-primary/30 text-primary hover:bg-primary/50 cursor-pointer'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer'
                      }`}
                    >
                      {s}
                    </div>
                    <span className={`text-[10px] whitespace-nowrap transition-colors ${isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                      {label}
                    </span>
                  </button>
                )}
                {i < STEP_LABELS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-colors ${step > s ? 'bg-primary/50' : 'bg-border'}`} />
                )}
              </div>
            )
          })}
        </div>

        <div className="p-5 pt-4 space-y-4">

          {/* Step: Version selection (localized exams only) */}
          {step === 1 && hasVariants && (
            <div className="space-y-3">
              <p className="text-base font-semibold">Which version are you taking?</p>
              <div className="space-y-2">
                {variants!.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setLocalExamVariant(v.id)}
                    className={`w-full text-left rounded-lg border p-3 transition-all duration-200 ${
                      localExamVariant === v.id
                        ? 'border-primary bg-primary/10 shadow-sm scale-[1.01]'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <p className="text-sm font-semibold">{v.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Exam Date step */}
          {step === EXAM_DATE_STEP && (
            <div className="space-y-3">
              <p className="text-base font-semibold">When is your exam?</p>

              {localExamDate && examDaysOut !== null && examDaysOut > 0 && (
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold">{formatReadableDate(localExamDate)}</p>
                  <button
                    type="button"
                    onClick={() => { examDateInputRef.current?.showPicker?.() ?? examDateInputRef.current?.click() }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Pick exam date"
                  >
                    <CalendarDays className="h-5 w-5" />
                  </button>
                  <input
                    ref={examDateInputRef}
                    type="date"
                    value={localExamDate}
                    min={today}
                    onChange={e => handleExamDateChange(e.target.value)}
                    className="sr-only"
                  />
                </div>
              )}

              {hasSittings ? (
                <>
                  {examId && (
                    <ExamSittingsList
                      examId={examId}
                      selectedDate={localExamDate}
                      onSelect={handleExamDateChange}
                    />
                  )}
                  {selectedSitting && selectedSitting.endDate && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Your specific exam day:</p>
                      <div className="overflow-hidden rounded-md border border-input shadow-sm focus-within:ring-1 focus-within:ring-ring">
                        <input
                          type="date"
                          value={localExamDate}
                          min={selectedSitting.startDate}
                          max={selectedSitting.endDate}
                          onChange={e => handleExamDateChange(e.target.value)}
                          className="block w-full bg-background px-3 py-2 text-base transition-colors focus:outline-none"
                        />
                      </div>
                    </div>
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
            <div className="space-y-3">
              <p className="text-base font-semibold">When do you want to be 100% ready for your exam?</p>

              {/* Selected ready date + calendar icon trigger */}
              {readyDate && (
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold">{formatReadableDate(readyDate)}</p>
                  <button
                    type="button"
                    onClick={() => { readyDateInputRef.current?.showPicker?.() ?? readyDateInputRef.current?.click() }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Pick a ready date"
                  >
                    <CalendarDays className="h-5 w-5" />
                  </button>
                  <input
                    ref={readyDateInputRef}
                    type="date"
                    value={readyDate}
                    min={today}
                    max={localExamDate || examDate || undefined}
                    onChange={e => handleReadyDateChange(e.target.value)}
                    className="sr-only"
                  />
                </div>
              )}

              {/* Preset cards */}
              {localExamDate && (
                <div className="grid grid-cols-3 gap-2">
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

              {readyDate && daysOut !== null && daysOut <= 0 && (
                <p className="text-xs text-destructive">Date must be in the future</p>
              )}

              {!isPremium && (
                <div className="flex items-start gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
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
