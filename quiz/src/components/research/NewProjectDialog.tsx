import { useEffect, useState } from 'react'
import { Loader2, X, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PROJECT_DOCUMENT_TYPES } from '@/lib/researchProjectMeta'
import {
  FIELD,
  Field,
  DocumentTypeField,
  JurisdictionField,
  LineOfBusinessField,
  DepartmentsField,
} from './ProjectScopeFields'
import type { ProjectOnboarding } from '@/hooks/useResearchProjects'

interface NewProjectDialogProps {
  onClose: () => void
  onCreate: (name: string, description: string, onboarding: ProjectOnboarding) => Promise<void>
}

const STEPS = ['Basics', 'Type', 'Scope', 'Agents'] as const

// Steps where the choice is optional — a "Skip" link lets a user move on
// without deciding, leaving the field unset (changeable later from the
// project's "Edit scope" action).
const SKIPPABLE_STEPS = new Set([1, 2])

// Project onboarding as a short, 4-step wizard: Basics (name + what you're
// working on), Type (document type), Scope (jurisdiction + line of business),
// and Agents (which departments' lens the AI applies). Only the name is
// required — Type and Scope can be skipped and changed later from the
// project's "Edit scope" action; the goal is a fast, low-friction start with
// one decision-cluster per page.
export function NewProjectDialog({ onClose, onCreate }: NewProjectDialogProps) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [documentType, setDocumentType] = useState<string | null>(PROJECT_DOCUMENT_TYPES[0].slug)
  const [country, setCountry] = useState<string | null>('CA')
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

  function toggleDept(slug: string) {
    setDepartments(prev => (prev.includes(slug) ? prev.filter(d => d !== slug) : [...prev, slug]))
  }

  async function handleCreate() {
    if (!name.trim() || submitting) return
    setSubmitting(true)
    await onCreate(name, description, {
      documentType,
      jurisdictionCountry: country,
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

  function handleSkip() {
    if (step === 1) setDocumentType(null)
    if (step === 2) {
      setCountry(null)
      setRegion('')
      setLob(null)
    }
    advance()
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
                <Field title="What are you working on?" hint="Helps us suggest relevant resources to start.">
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Briefly describe the question, reg change, or filing you're analyzing…"
                    rows={3}
                    maxLength={500}
                    className={`${FIELD} resize-none`}
                  />
                </Field>
              </>
            )}

            {step === 1 && (
              <DocumentTypeField value={documentType} onChange={setDocumentType} />
            )}

            {step === 2 && (
              <>
                <JurisdictionField
                  country={country}
                  region={region}
                  onCountryChange={c => { setCountry(c); setRegion('') }}
                  onRegionChange={setRegion}
                />
                <LineOfBusinessField value={lob} onChange={setLob} />
              </>
            )}

            {step === 3 && (
              <DepartmentsField value={departments} onToggle={toggleDept} />
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
            <div className="flex items-center gap-2">
              {SKIPPABLE_STEPS.has(step) && (
                <Button type="button" variant="ghost" onClick={handleSkip}>
                  Skip
                </Button>
              )}
              <Button type="submit" disabled={!canAdvance || submitting} className="gap-1.5">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                {isLast ? 'Create project' : <>Next <ChevronRight className="h-4 w-4" /></>}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
