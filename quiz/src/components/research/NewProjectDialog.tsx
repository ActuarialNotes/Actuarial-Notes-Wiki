import { useEffect, useState } from 'react'
import { Loader2, X, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  suggestProjectName,
  subtypeMeta,
  artifactTypeMeta,
  type ArtifactType,
} from '@/lib/researchProjectMeta'
import {
  FIELD,
  Field,
  ArtifactTypeField,
  SubtypeField,
  JurisdictionField,
  LineOfBusinessField,
} from './ProjectScopeFields'
import type { ProjectOnboarding } from '@/hooks/useResearchProjects'

interface NewProjectDialogProps {
  onClose: () => void
  onCreate: (name: string, onboarding: ProjectOnboarding) => Promise<void>
}

const STEPS = ['Type', 'Subtype', 'Scope', 'Name'] as const

// Project onboarding as a 4-step wizard that mirrors the decisions a research
// artifact needs: what type it is (Document vs Model), its subtype (report /
// filing / … or reserving / pricing / …), the scope it covers (jurisdiction and
// line of business), and finally a name — pre-populated from the choices so far
// (e.g. "ON Personal Auto Filing"). Everything stays editable later via the
// project's "Edit scope" action.
export function NewProjectDialog({ onClose, onCreate }: NewProjectDialogProps) {
  const [step, setStep] = useState(0)
  const [artifactType, setArtifactType] = useState<ArtifactType | null>(null)
  const [subtype, setSubtype] = useState<string | null>(null)
  const [region, setRegion] = useState<string>('')
  const [lob, setLob] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Keep the name in sync with the choices so far until the user edits it by
  // hand — so arriving at the Name step shows a sensible suggestion.
  useEffect(() => {
    if (nameTouched) return
    setName(suggestProjectName({ artifactType, subtype, region, lineOfBusiness: lob }))
  }, [artifactType, subtype, region, lob, nameTouched])

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
  const canAdvance =
    step === 0 ? artifactType !== null
    : step === 1 ? subtype !== null
    : step === 3 ? name.trim().length > 0
    : true

  function pickArtifactType(slug: ArtifactType) {
    setArtifactType(slug)
    setSubtype(null) // subtype options depend on the artifact type
  }

  async function handleCreate() {
    if (!name.trim() || submitting) return
    setSubmitting(true)
    await onCreate(name, {
      artifactType,
      documentType: subtype,
      jurisdictionCountry: 'CA',
      jurisdictionRegion: region || null,
      lineOfBusiness: lob,
      departments: ['actuarial', 'underwriting'],
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
                <span className={`hidden text-xs sm:inline ${i === step ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
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
              <ArtifactTypeField value={artifactType} onChange={pickArtifactType} />
            )}

            {step === 1 && (
              <SubtypeField artifactType={artifactType} value={subtype} onChange={setSubtype} />
            )}

            {step === 2 && (
              <>
                <JurisdictionField
                  country="CA"
                  region={region}
                  onCountryChange={() => { /* Canada only for now */ }}
                  onRegionChange={setRegion}
                />
                <LineOfBusinessField value={lob} onChange={setLob} />
              </>
            )}

            {step === 3 && (
              <Field title="Project name" hint="Pre-filled from your choices — edit it however you like.">
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setNameTouched(true) }}
                  placeholder="e.g. ON Personal Auto Filing"
                  maxLength={120}
                  autoFocus
                  className={FIELD}
                />
                <p className="text-xs text-muted-foreground">
                  {artifactTypeMeta(artifactType)?.label}
                  {subtypeMeta(subtype) ? ` · ${subtypeMeta(subtype)?.label}` : ''}
                </p>
              </Field>
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
