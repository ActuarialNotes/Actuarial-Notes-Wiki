import { Check } from 'lucide-react'
import { allLinesOfBusiness } from '@/lib/researchOntology'
import {
  PROJECT_DOCUMENT_TYPES,
  COUNTRIES,
  DEPARTMENTS,
  ARTIFACT_TYPES,
  countryMeta,
  subtypesForArtifact,
  type ArtifactType,
} from '@/lib/researchProjectMeta'

// Shared building blocks for the project onboarding wizard (NewProjectDialog)
// and the post-creation scope editor (EditProjectScopeDialog) — kept in one
// place so the two stay visually and behaviorally in sync.

// 16px control text everywhere to stop iOS Safari from auto-zooming on focus.
export const FIELD =
  'w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring'

export function chipClass(active: boolean): string {
  return `rounded-full border px-3 py-1.5 text-sm transition-colors ${
    active
      ? 'border-primary bg-primary/10 text-primary'
      : 'border-input text-muted-foreground hover:text-foreground hover:bg-accent/60'
  }`
}

export function Field({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
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

// A large, tappable option button — used for jurisdiction and line-of-business
// choices so they read as primary decisions rather than secondary filters.
export function BigOptionButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={disabled ? 'Coming soon' : undefined}
      className={`flex items-center justify-center gap-1.5 rounded-lg border p-4 text-center text-sm font-medium transition-colors ${
        disabled
          ? 'cursor-not-allowed border-input text-muted-foreground/50'
          : active
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-input hover:bg-accent/50'
      }`}
    >
      {active && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />}
      {children}
    </button>
  )
}

// A large icon + label + description card, used for the artifact-type and
// subtype pickers so each option reads as a distinct, recognizable choice.
function IconOptionCard({
  active,
  onClick,
  icon: Icon,
  label,
  description,
}: {
  active: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  label: string
  description: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
        active ? 'border-primary bg-primary/5' : 'border-input hover:bg-accent/50'
      }`}
    >
      <span
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
          active ? 'bg-primary/10 text-primary' : 'bg-accent text-muted-foreground'
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          {active && <Check className="h-3.5 w-3.5 text-primary" aria-hidden />}
          {label}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>
      </span>
    </button>
  )
}

export function ArtifactTypeField({ value, onChange }: { value: ArtifactType | null; onChange: (slug: ArtifactType) => void }) {
  return (
    <Field title="What type of research artifact would you like to create?">
      <div className="grid gap-2">
        {ARTIFACT_TYPES.map(t => (
          <IconOptionCard
            key={t.slug}
            active={value === t.slug}
            onClick={() => onChange(t.slug)}
            icon={t.icon}
            label={t.label}
            description={t.description}
          />
        ))}
      </div>
    </Field>
  )
}

export function SubtypeField({
  artifactType,
  value,
  onChange,
}: {
  artifactType: ArtifactType | null
  value: string | null
  onChange: (slug: string) => void
}) {
  const options = subtypesForArtifact(artifactType)
  const title = artifactType === 'model' ? 'What kind of model?' : 'What kind of document?'
  return (
    <Field title={title}>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map(t => (
          <IconOptionCard
            key={t.slug}
            active={value === t.slug}
            onClick={() => onChange(t.slug)}
            icon={t.icon}
            label={t.label}
            description={t.description}
          />
        ))}
      </div>
    </Field>
  )
}

export function DocumentTypeField({ value, onChange }: { value: string | null; onChange: (slug: string) => void }) {
  return (
    <Field title="Type of document">
      <div className="grid gap-2 sm:grid-cols-2">
        {PROJECT_DOCUMENT_TYPES.map(t => {
          const active = value === t.slug
          return (
            <button
              key={t.slug}
              type="button"
              onClick={() => onChange(t.slug)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                active ? 'border-primary bg-primary/5' : 'border-input hover:bg-accent/50'
              }`}
            >
              <span className="flex items-center gap-1.5 text-sm font-medium">
                {active && <Check className="h-3.5 w-3.5 text-primary" aria-hidden />}
                {t.label}
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{t.description}</span>
            </button>
          )
        })}
      </div>
    </Field>
  )
}

export function JurisdictionField({
  country,
  region,
  onCountryChange,
  onRegionChange,
}: {
  country: string | null
  region: string
  onCountryChange: (code: string) => void
  onRegionChange: (code: string) => void
}) {
  const regions = countryMeta(country)?.regions ?? []
  return (
    <Field title="Jurisdiction">
      <div className="grid grid-cols-2 gap-2">
        {COUNTRIES.map(c => (
          <BigOptionButton
            key={c.code}
            active={country === c.code}
            disabled={c.disabled}
            onClick={() => onCountryChange(c.code)}
          >
            {c.label}{c.disabled ? ' (soon)' : ''}
          </BigOptionButton>
        ))}
      </div>
      {regions.length > 0 && (
        <select
          value={region}
          onChange={e => onRegionChange(e.target.value)}
          className={FIELD}
          aria-label="Province or state"
        >
          <option value="">All of {countryMeta(country)?.label ?? 'country'}</option>
          {regions.map(r => (
            <option key={r.code} value={r.code}>{r.label}</option>
          ))}
        </select>
      )}
    </Field>
  )
}

export function LineOfBusinessField({ value, onChange }: { value: string | null; onChange: (slug: string | null) => void }) {
  return (
    <Field title="Line of business">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <BigOptionButton active={value === null} onClick={() => onChange(null)}>Any</BigOptionButton>
        {allLinesOfBusiness().map(l => (
          <BigOptionButton key={l.slug} active={value === l.slug} onClick={() => onChange(l.slug)}>
            {l.label}
          </BigOptionButton>
        ))}
      </div>
    </Field>
  )
}

export function DepartmentsField({ value, onToggle }: { value: string[]; onToggle: (slug: string) => void }) {
  return (
    <Field title="Review agents" hint="Departments whose lens the AI applies when analyzing this project.">
      <div className="flex flex-wrap gap-1.5">
        {DEPARTMENTS.map(d => (
          <button
            key={d.slug}
            type="button"
            onClick={() => onToggle(d.slug)}
            className={chipClass(value.includes(d.slug))}
          >
            {d.label}
          </button>
        ))}
      </div>
    </Field>
  )
}
