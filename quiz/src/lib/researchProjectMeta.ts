// Project-onboarding ontology for the Research tab: the document types a project
// can produce, the jurisdictions it can be scoped to, and the business
// departments ("agents") that can review it. Kept as small static reference
// tables in the same pure-function style as researchOntology.ts so the
// onboarding UI, the project metadata display, and the AI agent-review prompt
// all read from one source of truth.

// ── Document types ────────────────────────────────────────────────────────────

export interface DocumentTypeMeta {
  slug: string
  label: string
  description: string
}

export const PROJECT_DOCUMENT_TYPES: readonly DocumentTypeMeta[] = [
  {
    slug: 'research_report',
    label: 'Research Report',
    description: 'A grounded summary of regulation, market data, and benchmarks on a question.',
  },
  {
    slug: 'actuarial_justification',
    label: 'Actuarial Justification',
    description: 'A defensible rate/reserve memo citing filings, guidance, and statistics.',
  },
]

const DOC_TYPES_BY_SLUG = new Map(PROJECT_DOCUMENT_TYPES.map(t => [t.slug, t]))

export function documentTypeMeta(slug: string | null | undefined): DocumentTypeMeta | undefined {
  return slug ? DOC_TYPES_BY_SLUG.get(slug) : undefined
}

// ── Jurisdictions ─────────────────────────────────────────────────────────────
// Country is selectable; the US is intentionally disabled for now (Canadian
// corpus only). Each country carries its regions (provinces / states) so the
// onboarding flow can offer a second-level picker.

export interface JurisdictionRegion {
  code: string
  label: string
}

export interface CountryMeta {
  code: string
  label: string
  /** When true the option is shown but cannot be selected yet. */
  disabled?: boolean
  regions: readonly JurisdictionRegion[]
}

const CA_PROVINCES: readonly JurisdictionRegion[] = [
  { code: 'AB', label: 'Alberta' },
  { code: 'BC', label: 'British Columbia' },
  { code: 'MB', label: 'Manitoba' },
  { code: 'NB', label: 'New Brunswick' },
  { code: 'NL', label: 'Newfoundland and Labrador' },
  { code: 'NS', label: 'Nova Scotia' },
  { code: 'NT', label: 'Northwest Territories' },
  { code: 'NU', label: 'Nunavut' },
  { code: 'ON', label: 'Ontario' },
  { code: 'PE', label: 'Prince Edward Island' },
  { code: 'QC', label: 'Quebec' },
  { code: 'SK', label: 'Saskatchewan' },
  { code: 'YT', label: 'Yukon' },
]

const US_STATES: readonly JurisdictionRegion[] = [
  { code: 'CA', label: 'California' },
  { code: 'FL', label: 'Florida' },
  { code: 'NY', label: 'New York' },
  { code: 'TX', label: 'Texas' },
]

export const COUNTRIES: readonly CountryMeta[] = [
  { code: 'CA', label: 'Canada', regions: CA_PROVINCES },
  { code: 'US', label: 'United States', disabled: true, regions: US_STATES },
]

const COUNTRIES_BY_CODE = new Map(COUNTRIES.map(c => [c.code, c]))

export function countryMeta(code: string | null | undefined): CountryMeta | undefined {
  return code ? COUNTRIES_BY_CODE.get(code) : undefined
}

export function regionLabel(country: string | null | undefined, region: string | null | undefined): string | undefined {
  if (!region) return undefined
  return countryMeta(country)?.regions.find(r => r.code === region)?.label ?? region
}

// ── Departments (review "agents") ─────────────────────────────────────────────
// The business functions that can review a project. In the AI workflow these
// become reviewing "agents" — e.g. an Actuarial agent and an Underwriting agent
// jointly assessing an Ontario reg change.

export interface DepartmentMeta {
  slug: string
  label: string
}

export const DEPARTMENTS: readonly DepartmentMeta[] = [
  { slug: 'actuarial',            label: 'Actuarial' },
  { slug: 'underwriting',         label: 'Underwriting' },
  { slug: 'claims',               label: 'Claims' },
  { slug: 'risk_management',      label: 'Risk Management' },
  { slug: 'legal_compliance',     label: 'Legal & Compliance' },
  { slug: 'product',              label: 'Product' },
  { slug: 'distribution_broker',  label: 'Distribution & Broker' },
  { slug: 'it',                   label: 'IT' },
  { slug: 'finance',              label: 'Finance' },
  { slug: 'customer_experience',  label: 'Customer Experience' },
  { slug: 'strategy_planning',    label: 'Strategy & Planning' },
  { slug: 'business_intelligence', label: 'Business Intelligence' },
]

const DEPARTMENTS_BY_SLUG = new Map(DEPARTMENTS.map(d => [d.slug, d]))

export function departmentMeta(slug: string): DepartmentMeta | undefined {
  return DEPARTMENTS_BY_SLUG.get(slug)
}

export function departmentLabels(slugs: string[] | null | undefined): string[] {
  return (slugs ?? []).map(s => departmentMeta(s)?.label ?? s)
}
