import { useEffect, useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DocumentTypeField,
  JurisdictionField,
  LineOfBusinessField,
  DepartmentsField,
} from './ProjectScopeFields'
import type { ProjectOnboarding, ResearchProject } from '@/hooks/useResearchProjects'

interface EditProjectScopeDialogProps {
  project: ResearchProject
  onClose: () => void
  onSave: (onboarding: ProjectOnboarding) => Promise<void>
}

// Lets a user revisit the type/scope/agent choices made (or skipped) during
// the New project wizard, on a single page rather than re-running the wizard.
export function EditProjectScopeDialog({ project, onClose, onSave }: EditProjectScopeDialogProps) {
  const [documentType, setDocumentType] = useState<string | null>(project.documentType)
  const [country, setCountry] = useState<string | null>(project.jurisdictionCountry)
  const [region, setRegion] = useState<string>(project.jurisdictionRegion ?? '')
  const [lob, setLob] = useState<string | null>(project.lineOfBusiness)
  const [departments, setDepartments] = useState<string[]>(project.departments)
  const [submitting, setSubmitting] = useState(false)

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

  function toggleDept(slug: string) {
    setDepartments(prev => (prev.includes(slug) ? prev.filter(d => d !== slug) : [...prev, slug]))
  }

  async function handleSave() {
    if (submitting) return
    setSubmitting(true)
    await onSave({
      documentType,
      jurisdictionCountry: country,
      jurisdictionRegion: region || null,
      lineOfBusiness: lob,
      departments,
    })
    setSubmitting(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Edit project scope"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border bg-card shadow-xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b px-5 py-3.5">
          <h2 className="text-lg font-semibold">Edit scope</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <DocumentTypeField value={documentType} onChange={setDocumentType} />
          <JurisdictionField
            country={country}
            region={region}
            onCountryChange={c => { setCountry(c); setRegion('') }}
            onRegionChange={setRegion}
          />
          <LineOfBusinessField value={lob} onChange={setLob} />
          <DepartmentsField value={departments} onToggle={toggleDept} />
        </div>

        <div className="flex items-center justify-end gap-2 border-t px-5 py-3.5">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={handleSave} disabled={submitting} className="gap-1.5">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
