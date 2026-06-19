// Project-onboarding ontology for the Research tab: the kind of research
// artifact a project produces (a Document or a Model), the jurisdictions it can
// be scoped to, and the business departments ("agents") that can review it.
// Kept as small static reference tables in the same pure-function style as
// researchOntology.ts so the onboarding UI, the project metadata display, the
// per-section workflow, and the AI agent-review prompt all read from one source
// of truth.

import {
  FileText,
  FileCheck2,
  StickyNote,
  Presentation,
  Boxes,
  Layers,
  Tag,
  TrendingUp,
  ShieldCheck,
  Code2,
  FileCode2,
  Sheet,
  type LucideIcon,
} from 'lucide-react'
import { lobMeta } from './researchOntology'

// ── Artifact types ────────────────────────────────────────────────────────────
// The first onboarding decision: is this project producing a *Document* (a
// written deliverable structured as a series of sections) or a *Model* (built by
// walking the actuarial model-development workflow)? The choice drives the
// subtype options offered next and the section structure of the project itself.

export type ArtifactType = 'document' | 'model'

export interface ArtifactTypeMeta {
  slug: ArtifactType
  label: string
  description: string
  icon: LucideIcon
}

export const ARTIFACT_TYPES: readonly ArtifactTypeMeta[] = [
  {
    slug: 'document',
    label: 'Document',
    description: 'A written deliverable — a report, filing, memo, or presentation, organized into sections.',
    icon: FileText,
  },
  {
    slug: 'model',
    label: 'Model',
    description: 'An actuarial model, built by walking the model-development workflow step by step.',
    icon: Boxes,
  },
]

const ARTIFACT_TYPES_BY_SLUG = new Map(ARTIFACT_TYPES.map(t => [t.slug, t]))

export function artifactTypeMeta(slug: string | null | undefined): ArtifactTypeMeta | undefined {
  return slug ? ARTIFACT_TYPES_BY_SLUG.get(slug as ArtifactType) : undefined
}

// ── Artifact subtypes ─────────────────────────────────────────────────────────
// The second onboarding decision, scoped to the chosen artifact type. Each
// subtype carries its own icon so the picker and the project badges read
// visually. `documentType` on the project row stores the subtype slug.

export interface SubtypeMeta {
  slug: string
  label: string
  description: string
  icon: LucideIcon
}

export const DOCUMENT_SUBTYPES: readonly SubtypeMeta[] = [
  { slug: 'report',       label: 'Report',       description: 'A grounded summary of regulation, market data, and benchmarks on a question.', icon: FileText },
  { slug: 'filing',       label: 'Filing',       description: 'A defensible rate/reserve filing citing experience, guidance, and statistics.', icon: FileCheck2 },
  { slug: 'memo',         label: 'Memo',         description: 'A concise internal note: purpose, analysis, and a recommendation.',            icon: StickyNote },
  { slug: 'presentation', label: 'Presentation', description: 'A slide-style deck: context, key findings, and next steps.',                   icon: Presentation },
]

export const MODEL_SUBTYPES: readonly SubtypeMeta[] = [
  { slug: 'reserving',           label: 'Reserving',            description: 'Estimate unpaid claims — loss development, IBNR, and reserve ranges.',     icon: Layers },
  { slug: 'pricing',             label: 'Pricing',              description: 'Set rates and relativities — indications, segmentation, and rating plans.', icon: Tag },
  { slug: 'valuation_cash_flow', label: 'Valuation & Cash Flow', description: 'Project cash flows and value liabilities or blocks of business.',          icon: TrendingUp },
  { slug: 'risk_capital',        label: 'Risk & Capital',       description: 'Quantify risk and capital needs — solvency, ORSA, and stress testing.',    icon: ShieldCheck },
]

const SUBTYPES_BY_SLUG = new Map(
  [...DOCUMENT_SUBTYPES, ...MODEL_SUBTYPES].map(s => [s.slug, s]),
)

export function subtypeMeta(slug: string | null | undefined): SubtypeMeta | undefined {
  return slug ? SUBTYPES_BY_SLUG.get(slug) : undefined
}

/** The subtype options offered for a given artifact type. */
export function subtypesForArtifact(artifactType: ArtifactType | null | undefined): readonly SubtypeMeta[] {
  return artifactType === 'model' ? MODEL_SUBTYPES : DOCUMENT_SUBTYPES
}

// ── Legacy document types ─────────────────────────────────────────────────────
// The original two-option vocabulary, kept so projects created before the
// artifact-type revamp still resolve a readable badge. New projects use the
// artifact-type + subtype model above.

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

/**
 * Resolve a project's type-badge label from whichever vocabulary applies:
 * a new artifact subtype first, then the legacy document type. Returns
 * undefined when the project predates typing entirely.
 */
export function projectTypeLabel(documentType: string | null | undefined): string | undefined {
  return subtypeMeta(documentType)?.label ?? documentTypeMeta(documentType)?.label
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

// ── Project starters ──────────────────────────────────────────────────────────
// A handful of example project ideas shown on the "New project" Basics step,
// color-coded like the Flashcards pack cards so the onboarding screen reads as
// a set of ready-to-go starting points rather than a bare form. Picking one
// fills in the name and seeds sensible type/jurisdiction/line-of-business/agent
// defaults for the Type step — all still editable later via "Edit scope".

export interface ProjectStarter {
  name: string
  documentType: string
  jurisdictionRegion: string | null
  lineOfBusiness: string | null
  departments: string[]
  color: { card: string; text: string; icon: string }
}

export const PROJECT_STARTERS: readonly ProjectStarter[] = [
  {
    name: 'Ontario auto reform 2026 impact',
    documentType: 'research_report',
    jurisdictionRegion: 'ON',
    lineOfBusiness: 'personal_auto',
    departments: ['actuarial', 'underwriting'],
    color: { card: 'bg-blue-500/10 hover:bg-blue-500/15', text: 'text-blue-700 dark:text-blue-300', icon: 'text-blue-500' },
  },
  {
    name: 'Alberta auto rate filing benchmark',
    documentType: 'actuarial_justification',
    jurisdictionRegion: 'AB',
    lineOfBusiness: 'personal_auto',
    departments: ['actuarial'],
    color: { card: 'bg-emerald-500/10 hover:bg-emerald-500/15', text: 'text-emerald-700 dark:text-emerald-300', icon: 'text-emerald-500' },
  },
  {
    name: 'BC claims trend review',
    documentType: 'research_report',
    jurisdictionRegion: 'BC',
    lineOfBusiness: 'personal_auto',
    departments: ['claims', 'actuarial'],
    color: { card: 'bg-violet-500/10 hover:bg-violet-500/15', text: 'text-violet-700 dark:text-violet-300', icon: 'text-violet-500' },
  },
  {
    name: 'Quebec product compliance check',
    documentType: 'research_report',
    jurisdictionRegion: 'QC',
    lineOfBusiness: 'personal_auto',
    departments: ['legal_compliance', 'product'],
    color: { card: 'bg-orange-500/10 hover:bg-orange-500/15', text: 'text-orange-700 dark:text-orange-300', icon: 'text-orange-500' },
  },
]

// ── Section structure ─────────────────────────────────────────────────────────
// A project is a series of sections, each opening in its own page with its own
// subsections. The structure depends on the artifact type:
//   • A Document follows an outline tailored to its subtype (a report has an
//     introduction, literature review, methodology…; a filing has an executive
//     summary, rate indication, certification…).
//   • A Model walks the actuarial model-development workflow — the same seven
//     steps regardless of subtype — so the workflow itself prompts the user
//     through the design decisions a model needs (data, assumptions, testing…).
// Resources saved to the project and custom notes attach to a section (or one of
// its subsections), keyed by these stable slugs.

export interface SubsectionTemplate {
  key: string
  title: string
}

export interface SectionTemplate {
  key: string
  title: string
  /** One-line hint shown under the section title to orient the user. */
  hint: string
  subsections: readonly SubsectionTemplate[]
}

function sub(...titles: string[]): SubsectionTemplate[] {
  return titles.map(title => ({ key: slugifyKey(title), title }))
}

function slugifyKey(s: string): string {
  return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
}

// Document outlines, keyed by subtype slug. `report` doubles as the default for
// any document subtype without a bespoke outline.
const DOCUMENT_SECTIONS: Record<string, readonly SectionTemplate[]> = {
  report: [
    { key: 'introduction',      title: 'Introduction',      hint: 'Frame the question, objectives, and scope.',        subsections: sub('Background', 'Objectives', 'Scope') },
    { key: 'literature_review', title: 'Literature Review',  hint: 'Prior work, regulation, and market context.',       subsections: sub('Prior work', 'Regulatory context') },
    { key: 'methodology',       title: 'Methodology',        hint: 'Approach, data, and techniques used.',              subsections: sub('Approach', 'Data', 'Techniques') },
    { key: 'analysis',          title: 'Analysis',           hint: 'Results and key findings.',                         subsections: sub('Results', 'Key findings') },
    { key: 'discussion',        title: 'Discussion',         hint: 'Interpretation and limitations.',                   subsections: sub('Interpretation', 'Limitations') },
    { key: 'conclusion',        title: 'Conclusion',         hint: 'Summary and recommendations.',                      subsections: sub('Summary', 'Recommendations') },
    { key: 'references',        title: 'References',         hint: 'Sources cited.',                                    subsections: [] },
  ],
  filing: [
    { key: 'executive_summary', title: 'Executive Summary',  hint: 'The ask and headline impact, up front.',            subsections: [] },
    { key: 'background',        title: 'Background',          hint: 'Current program and regulatory context.',          subsections: sub('Current program', 'Regulatory context') },
    { key: 'rate_indication',   title: 'Rate Indication',     hint: 'Experience, trend, and the indicated change.',      subsections: sub('Loss experience', 'Trend', 'Indicated change') },
    { key: 'supporting_data',   title: 'Supporting Data',     hint: 'Exhibits and benchmarks behind the indication.',    subsections: sub('Exhibits', 'Benchmarks') },
    { key: 'impact_analysis',   title: 'Impact Analysis',     hint: 'Dislocation, capping, and policyholder impact.',     subsections: sub('Dislocation', 'Capping') },
    { key: 'certification',     title: 'Compliance & Certification', hint: 'Actuarial opinion and sign-off.',            subsections: sub('Actuarial opinion', 'Sign-off') },
  ],
  memo: [
    { key: 'purpose',        title: 'Purpose',        hint: 'Why this memo exists.',         subsections: [] },
    { key: 'background',     title: 'Background',      hint: 'Context the reader needs.',     subsections: [] },
    { key: 'analysis',       title: 'Analysis',        hint: 'The work and what it shows.',   subsections: sub('Findings') },
    { key: 'recommendation', title: 'Recommendation',  hint: 'What to do, and next steps.',   subsections: sub('Next steps') },
  ],
  presentation: [
    { key: 'agenda',          title: 'Title & Agenda',   hint: 'Set up the deck.',                  subsections: [] },
    { key: 'context',         title: 'Context',          hint: 'Background and objectives.',        subsections: sub('Background', 'Objectives') },
    { key: 'findings',        title: 'Key Findings',     hint: 'The main results, one idea a slide.', subsections: [] },
    { key: 'recommendations', title: 'Recommendations',  hint: 'What you are asking for.',          subsections: [] },
    { key: 'next_steps',      title: 'Next Steps',       hint: 'Owners and timeline.',              subsections: [] },
    { key: 'appendix',        title: 'Appendix',         hint: 'Supporting detail.',                subsections: [] },
  ],
}

// The actuarial model-development workflow — the same seven steps for every
// model subtype. Each step's subsections are the design decisions to walk
// through (e.g. ARIMA would be a resource attached under "Model").
const MODEL_SECTIONS: readonly SectionTemplate[] = [
  { key: 'purpose_scope', title: 'Purpose and Scope', hint: 'What the model is for and where it applies.',     subsections: sub('Business problem', 'Intended use', 'Scope & limitations') },
  { key: 'data',          title: 'Data',              hint: 'Sources, quality, and adjustments.',              subsections: sub('Data sources', 'Data quality', 'Adjustments') },
  { key: 'assumptions',   title: 'Assumptions',       hint: 'Key assumptions and their rationale.',            subsections: sub('Key assumptions', 'Rationale', 'Sensitivities') },
  { key: 'model',         title: 'Model',             hint: 'Methodology, form, and parameterization.',        subsections: sub('Methodology', 'Model form', 'Parameterization') },
  { key: 'test',          title: 'Test',              hint: 'Validation, back-testing, and sensitivity.',      subsections: sub('Validation', 'Back-testing', 'Sensitivity testing') },
  { key: 'implement',     title: 'Implement',         hint: 'Rollout plan, controls, and sign-off.',           subsections: sub('Implementation plan', 'Controls', 'Sign-off') },
  { key: 'monitor',       title: 'Monitor',           hint: 'Ongoing monitoring, triggers, and review.',       subsections: sub('Monitoring plan', 'Triggers', 'Review cadence') },
]

/** The section structure for a project, given its artifact type and subtype. */
export function projectSections(
  artifactType: string | null | undefined,
  subtype: string | null | undefined,
): readonly SectionTemplate[] {
  if (artifactType === 'model') return MODEL_SECTIONS
  return DOCUMENT_SECTIONS[subtype ?? ''] ?? DOCUMENT_SECTIONS.report
}

/** Find a single section template within a project's structure. */
export function sectionTemplate(
  artifactType: string | null | undefined,
  subtype: string | null | undefined,
  sectionKey: string,
): SectionTemplate | undefined {
  return projectSections(artifactType, subtype).find(s => s.key === sectionKey)
}

// ── Model outputs ─────────────────────────────────────────────────────────────
// A model can generate two kinds of output: Documentation (a written write-up of
// the model) and Code. When Code is chosen the user picks a target language.

export type ModelOutput = 'documentation' | 'code'

export interface ModelOutputMeta {
  slug: ModelOutput
  label: string
  description: string
  icon: LucideIcon
}

export const MODEL_OUTPUTS: readonly ModelOutputMeta[] = [
  { slug: 'documentation', label: 'Documentation', description: 'A written write-up of the model, section by section.', icon: FileText },
  { slug: 'code',          label: 'Code',          description: 'Runnable code that implements the model.',             icon: Code2 },
]

export interface CodeLanguageMeta {
  slug: string
  label: string
  icon: LucideIcon
}

export const CODE_LANGUAGES: readonly CodeLanguageMeta[] = [
  { slug: 'r',      label: 'R',      icon: FileCode2 },
  { slug: 'python', label: 'Python', icon: Code2 },
  { slug: 'excel',  label: 'Excel',  icon: Sheet },
]

export function codeLanguageMeta(slug: string | null | undefined): CodeLanguageMeta | undefined {
  return slug ? CODE_LANGUAGES.find(l => l.slug === slug) : undefined
}

// ── Suggested project name ─────────────────────────────────────────────────────
// The onboarding name step is pre-populated from the choices made so far, e.g.
// region ON + line of business "Personal auto" + subtype "Filing" → "ON Personal
// Auto Filing". A model appends "Model" so the name reads as a deliverable.

function titleCase(s: string): string {
  return s.replace(/\b\w/g, c => c.toUpperCase())
}

export function suggestProjectName(opts: {
  artifactType: ArtifactType | null | undefined
  subtype: string | null | undefined
  region: string | null | undefined
  lineOfBusiness: string | null | undefined
}): string {
  const parts: string[] = []
  if (opts.region) parts.push(opts.region.toUpperCase())
  const lob = opts.lineOfBusiness ? lobMeta(opts.lineOfBusiness)?.label : undefined
  if (lob) parts.push(titleCase(lob))
  const subLabel = subtypeMeta(opts.subtype)?.label
  if (subLabel) parts.push(subLabel)
  if (opts.artifactType === 'model' && !/(model)$/i.test(subLabel ?? '')) parts.push('Model')
  return parts.join(' ').trim()
}
