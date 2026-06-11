import { useEffect, useState } from 'react'
import { Loader2, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { allLinesOfBusiness } from '@/lib/researchOntology'
import {
  PROJECT_DOCUMENT_TYPES,
  COUNTRIES,
  DEPARTMENTS,
  countryMeta,
} from '@/lib/researchProjectMeta'
import type { ProjectOnboarding } from '@/hooks/useResearchProjects'

interface NewProjectDialogProps {
  onClose: () => void
  onCreate: (name: string, description: string, onboarding: ProjectOnboarding) => Promise<void>
}

// 16px control text everywhere to stop iOS Safari from auto-zooming on focus.
const FIELD =
  'w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring'

function chipClass(active: boolean, disabled = false): string {
  return `rounded-full border px-3 py-1.5 text-sm transition-colors ${
    disabled
      ? 'cursor-not-allowed border-input text-muted-foreground/50'
      : active
        ? 'border-primary bg-primary/10 text-primary'
        : 'border-input text-muted-foreground hover:text-foreground hover:bg-accent/60'
  }`
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-medium">{title}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

// The project onboarding flow: a short, single-screen form that captures what a
// project is for (document type), where it applies (jurisdiction + line of
// business), and who reviews it (departments → AI agents). Everything except the
// name is optional — the goal is a fast, dismissible start, not a gate.
export function NewProjectDialog({ onClose, onCreate }: NewProjectDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [documentType, setDocumentType] = useState<string | null>(PROJECT_DOCUMENT_TYPES[0].slug)
  const [country, setCountry] = useState<string>('CA')
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

  const regions = countryMeta(country)?.regions ?? []

  function toggleDept(slug: string) {
    setDepartments(prev => (prev.includes(slug) ? prev.filter(d => d !== slug) : [...prev, slug]))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || submitting) return
    setSubmitting(true)
    await onCreate(name, description, {
      documentType,
      jurisdictionCountry: country,
      jurisdictionRegion: region || null,
      lineOfBusiness: lob,
      departments,
    })
    // The parent unmounts the dialog on success; keep submitting=true so the
    // button stays disabled through the unmount.
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
        <div className="flex items-center justify-between border-b px-5 py-3.5">
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

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
            <Section title="Project name">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Ontario auto reform 2026 impact"
                maxLength={120}
                autoFocus
                className={FIELD}
              />
            </Section>

            <Section title="What are you working on?" hint="Helps us suggest relevant resources to start.">
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Briefly describe the question, reg change, or filing you're analyzing…"
                rows={2}
                maxLength={500}
                className={`${FIELD} resize-none`}
              />
            </Section>

            <Section title="Type of document">
              <div className="grid gap-2 sm:grid-cols-2">
                {PROJECT_DOCUMENT_TYPES.map(t => {
                  const active = documentType === t.slug
                  return (
                    <button
                      key={t.slug}
                      type="button"
                      onClick={() => setDocumentType(t.slug)}
                      className={`rounded-lg border p-3 text-left transition-colors ${
                        active ? 'border-primary bg-primary/5' : 'border-input hover:bg-accent/50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        {active && <Check className="h-3.5 w-3.5 text-primary" />}
                        {t.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{t.description}</span>
                    </button>
                  )
                })}
              </div>
            </Section>

            <Section title="Jurisdiction">
              <div className="flex flex-wrap gap-1.5">
                {COUNTRIES.map(c => (
                  <button
                    key={c.code}
                    type="button"
                    disabled={c.disabled}
                    title={c.disabled ? 'Coming soon' : undefined}
                    onClick={() => { if (!c.disabled) { setCountry(c.code); setRegion('') } }}
                    className={chipClass(country === c.code, c.disabled)}
                  >
                    {c.label}{c.disabled ? ' (soon)' : ''}
                  </button>
                ))}
              </div>
              <select
                value={region}
                onChange={e => setRegion(e.target.value)}
                className={FIELD}
                aria-label="Province or state"
              >
                <option value="">All of {countryMeta(country)?.label ?? 'country'}</option>
                {regions.map(r => (
                  <option key={r.code} value={r.code}>{r.label}</option>
                ))}
              </select>
            </Section>

            <Section title="Line of business">
              <div className="flex flex-wrap gap-1.5">
                <button type="button" onClick={() => setLob(null)} className={chipClass(lob === null)}>
                  Any
                </button>
                {allLinesOfBusiness().map(l => (
                  <button
                    key={l.slug}
                    type="button"
                    onClick={() => setLob(l.slug)}
                    className={chipClass(lob === l.slug)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Review agents" hint="Departments whose lens the AI applies when analyzing this project.">
              <div className="flex flex-wrap gap-1.5">
                {DEPARTMENTS.map(d => (
                  <button
                    key={d.slug}
                    type="button"
                    onClick={() => toggleDept(d.slug)}
                    className={chipClass(departments.includes(d.slug))}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </Section>
          </div>

          <div className="flex items-center justify-end gap-2 border-t px-5 py-3.5">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!name.trim() || submitting} className="gap-1.5">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              Create project
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
