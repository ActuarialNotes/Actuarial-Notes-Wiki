import { useEffect, useState } from 'react'
import { Loader2, X, Check, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PROJECT_DOCUMENT_TYPES, PROJECT_STARTERS, type ProjectStarter } from '@/lib/researchProjectMeta'
import { FIELD, Field, DocumentTypeField } from './ProjectScopeFields'
import type { ProjectOnboarding } from '@/hooks/useResearchProjects'

interface NewProjectDialogProps {
  onClose: () => void
  onCreate: (name: string, onboarding: ProjectOnboarding) => Promise<void>
}

const STEPS = ['Basics', 'Type'] as const

// Project onboarding as a fast, 2-step wizard: Basics (name, with color-coded
// starter ideas to seed it) and Type (document type, then Create). Jurisdiction,
// line of business, and review agents get sensible defaults here — either from a
// picked starter or the existing baseline (Canada, actuarial + underwriting) —
// and stay editable later from the project's "Edit scope" action.
export function NewProjectDialog({ onClose, onCreate }: NewProjectDialogProps) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [documentType, setDocumentType] = useState<string | null>(PROJECT_DOCUMENT_TYPES[0].slug)
  const [region, setRegion] = useState<string>('')
  const [lob, setLob] = useState<string | null>(null)
  const [departments, setDepartments] = useState<string[]>(['actuarial', 'underwriting'])
  const [submitting, setSubmitting] = useState(false)

  // Close on Escape, and lock body scroll while open.
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const isLast = step === STEPS.length - 1
  const canAdvance = step > 0 || name.trim().length > 0

  function pickStarter(starter: ProjectStarter) {
    setName(starter.name)
    setDocumentType(starter.documentType)
    setRegion(starter.jurisdictionRegion ?? '')
    setLob(starter.lineOfBusiness)
    setDepartments(starter.departments)
  }

  async function handleCreate() {
    if (!name.trim() || submitting) return
    setSubmitting(true)
    await onCreate(name, {
      documentType,
      jurisdictionCountry: 'CA',
      jurisdictionRegion: region || null,
      lineOfBusiness: lob,
      departments,
    })
    // Parent unmounts on success; keep submitting=true through the unmount.
  }

  function advance() {
    if (isLast) { handleCreate(); return }
    setStep(s => s + 1)
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault()
    if (canAdvance) advance()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="New research project"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border bg-card shadow-xl sm:rounded-2xl">
        <div className="border-b px-5 py-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">New project</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Step indicator */}
          <div className="mt-3 flex items-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                    i < step
                      ? 'bg-primary text-primary-foreground'
                      : i === step
                        ? 'border-2 border-primary text-primary'
                        : 'border border-input text-muted-foreground'
                  }`}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className={`text-xs ${i === step ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                  {label}
                </span>
                {i < STEPS.length - 1 && <span className="h-px flex-1 bg-border" />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleNext} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
            {step === 0 && (
              <>
                <Field title="Project name">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ontario auto reform 2026 impact"
                    maxLength={120}
                    autoFocus
                    className={FIELD}
                  />
                </Field>
                <Field title="Or start from an idea">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {PROJECT_STARTERS.map(starter => {
                      const active = name === starter.name
                      return (
                        <button
                          key={starter.name}
                          type="button"
                          onClick={() => pickStarter(starter)}
                          className={`flex items-start gap-2 rounded-lg border p-3 text-left text-sm transition-colors ${starter.color.card} ${
                            active ? 'border-primary' : 'border-transparent'
                          }`}
                        >
                          <Lightbulb className={`mt-0.5 h-4 w-4 shrink-0 ${starter.color.icon}`} aria-hidden />
                          <span className={`font-medium ${starter.color.text}`}>{starter.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </Field>
              </>
            )}

            {step === 1 && (
              <DocumentTypeField value={documentType} onChange={setDocumentType} />
            )}
          </div>

          <div className="flex items-center justify-between gap-2 border-t px-5 py-3.5">
            <Button
              type="button"
              variant="ghost"
              onClick={() => (step === 0 ? onClose() : setStep(s => s - 1))}
              className="gap-1"
            >
              {step === 0 ? 'Cancel' : <><ChevronLeft className="h-4 w-4" /> Back</>}
            </Button>
            <Button type="submit" disabled={!canAdvance || submitting} className="gap-1.5">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {isLast ? 'Create project' : <>Next <ChevronRight className="h-4 w-4" /></>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
