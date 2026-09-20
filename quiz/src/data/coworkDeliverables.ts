/**
 * The Cowork **scoping flows** — the multiple-choice questions that narrow a
 * deliverable from "an analysis" to "a P&C reserving analysis of personal auto
 * for the appointed actuary's report, on five accident years" — and the exports
 * each one earns.
 *
 * The flow is authored as data so the engine (`lib/coworkDeliverables.ts`) stays
 * about *sequencing* and this file stays about *content*. Each option does
 * three things at once, and that is the whole mechanism behind "the analysis
 * populates itself":
 *
 *   • `facets` — pins down one of the five axes, which is what makes the
 *     deliverable findable and what the pill row reads.
 *   • `assumptions` / `details` — adds rows to the deliverable's tables, each
 *     one carrying the question it came from as its basis. Nothing populates
 *     that cannot name what populated it.
 *   • `exports` — opens up the export formats that make sense for the thing
 *     being built. An indication earns a rate-indication exhibit; a reserve
 *     review earns a development triangle.
 *
 * `when` makes a step conditional on earlier answers, which is what keeps the
 * flow short: a pensions deliverable is never asked which auto coverage it
 * covers. Changing an earlier answer drops the answers it unlocked
 * (`answerStep`), so a flow can be walked backwards without leaving orphans.
 */

import { facetsFromAnswers, suggestedTitle, type Deliverable, type WizardStep, type DeliverableType } from '@/lib/coworkDeliverables'

/* ------------------------------------------------------------------ shared */

/**
 * The first three questions are the same whatever is being produced: whose
 * business, which job, who reads it. They are asked in that order because each
 * one narrows what the next one can sensibly offer.
 */
const PRACTICE_STEP: WizardStep = {
  id: 'practice',
  question: 'Whose business is this about?',
  help: 'The practice area decides which standards bind the work and which sources are relevant.',
  options: [
    {
      id: 'pc',
      label: 'Property & casualty',
      detail: 'Auto, property, liability, specialty',
      facets: { practiceArea: 'pc' },
      details: [{ label: 'Practice area', value: 'Property & casualty' }],
    },
    {
      id: 'life',
      label: 'Life & annuities',
      detail: 'Individual and group life, annuities, segregated funds',
      facets: { practiceArea: 'life' },
      details: [{ label: 'Practice area', value: 'Life & annuities' }],
    },
    {
      id: 'pensions',
      label: 'Pensions',
      detail: 'Registered plans and other post-employment benefits',
      facets: { practiceArea: 'pensions' },
      details: [{ label: 'Practice area', value: 'Pensions' }],
    },
    {
      id: 'erm',
      label: 'Enterprise risk',
      detail: 'Risk across the whole balance sheet',
      facets: { practiceArea: 'erm' },
      details: [{ label: 'Practice area', value: 'Enterprise risk' }],
    },
  ],
}

const AUDIENCE_STEP: WizardStep = {
  id: 'audience',
  question: 'Who reads it?',
  help: 'The audience sets the standard of disclosure and how much of the method has to be shown.',
  options: [
    {
      id: 'regulator',
      label: 'A regulator',
      detail: 'A supervisor with a filing or approval decision to make',
      facets: { audience: 'regulator', driver: 'regulation' },
      assumptions: [{ label: 'Disclosure standard', value: 'Filing-grade — method and support shown in full' }],
      details: [{ label: 'Audience', value: 'Regulator' }],
    },
    {
      id: 'management',
      label: 'Management',
      detail: 'Internal decision-makers who will act on it',
      facets: { audience: 'management' },
      assumptions: [{ label: 'Disclosure standard', value: 'Decision-grade — findings and their consequences' }],
      details: [{ label: 'Audience', value: 'Management' }],
    },
    {
      id: 'auditor',
      label: 'An auditor',
      detail: 'An external reviewer testing the work and its support',
      facets: { audience: 'auditor' },
      assumptions: [{ label: 'Disclosure standard', value: 'Audit-grade — every selection traceable to its support' }],
      details: [{ label: 'Audience', value: 'Auditor' }],
    },
    {
      id: 'shareholders',
      label: 'Shareholders',
      detail: 'Owners and the analysts reading on their behalf',
      facets: { audience: 'shareholders' },
      assumptions: [{ label: 'Disclosure standard', value: 'Public — consistent with filed disclosure' }],
      details: [{ label: 'Audience', value: 'Shareholders' }],
    },
    {
      id: 'policyholders',
      label: 'Policyholders',
      detail: 'The insured, or the members of a plan',
      facets: { audience: 'policyholders' },
      assumptions: [{ label: 'Disclosure standard', value: 'Plain language — no technical prerequisite' }],
      details: [{ label: 'Audience', value: 'Policyholders' }],
    },
  ],
}

const DRIVER_STEP: WizardStep = {
  id: 'driver',
  question: 'What made it necessary?',
  help: 'The driver is what the deliverable has to answer to — and what it is judged against later.',
  options: [
    {
      id: 'regulation',
      label: 'A rule or filing requirement',
      detail: 'A standard, a guideline or a scheduled filing asks for it',
      facets: { driver: 'regulation' },
      details: [{ label: 'Driver', value: 'Regulation' }],
    },
    {
      id: 'external',
      label: 'The external environment',
      detail: 'Inflation, weather, litigation, the market or the economy moved',
      facets: { driver: 'external-environment' },
      assumptions: [{ label: 'External condition addressed', locator: 'Stated in the deliverable’s scope' }],
      details: [{ label: 'Driver', value: 'External environment' }],
    },
  ],
}

const PERIOD_STEP: WizardStep = {
  id: 'period',
  question: 'How much experience does it cover?',
  help: 'This sets the rows of every exhibit the deliverable exports.',
  options: [
    {
      id: 'ay3',
      label: 'Three accident years',
      detail: 'A short window — responsive, low credibility',
      periods: { count: 3, label: 'Accident year', basis: 'year' },
      facets: { timeOrientation: 'retrospective' },
      assumptions: [{ label: 'Experience period', value: '3 accident years' }],
    },
    {
      id: 'ay5',
      label: 'Five accident years',
      detail: 'The usual window for a personal-lines review',
      periods: { count: 5, label: 'Accident year', basis: 'year' },
      facets: { timeOrientation: 'retrospective' },
      assumptions: [{ label: 'Experience period', value: '5 accident years' }],
    },
    {
      id: 'ay10',
      label: 'Ten accident years',
      detail: 'A long-tail window — liability, commercial casualty',
      periods: { count: 10, label: 'Accident year', basis: 'year' },
      facets: { timeOrientation: 'retrospective' },
      assumptions: [{ label: 'Experience period', value: '10 accident years' }],
    },
    {
      id: 'quarters',
      label: 'Eight valuation quarters',
      detail: 'A quarterly reporting cadence',
      periods: { count: 8, label: 'Valuation quarter', basis: 'quarter' },
      facets: { timeOrientation: 'retrospective' },
      assumptions: [{ label: 'Experience period', value: '8 valuation quarters' }],
    },
  ],
}

/* ---------------------------------------------------------------- analysis */

const ANALYSIS_STEPS: WizardStep[] = [
  PRACTICE_STEP,
  {
    id: 'question',
    question: 'What is the analysis for?',
    help: 'This is the one choice that decides the method, the exhibits and the export.',
    options: [
      {
        id: 'rate-indication',
        label: 'A rate indication',
        detail: 'What the rate level should be',
        facets: { function: 'pricing', timeOrientation: 'prospective' },
        assumptions: [
          { label: 'Indication method', locator: 'Pure premium or loss ratio — selected' },
          { label: 'Permissible loss ratio', locator: 'From the expense provision' },
          { label: 'Rate level change', locator: 'Output of the indication' },
        ],
        details: [{ label: 'Analysis', value: 'Rate indication' }],
        exports: ['experience-summary', 'rate-indication', 'assumptions'],
      },
      {
        id: 'unpaid-claims',
        label: 'An unpaid claim estimate',
        detail: 'What is still owed on claims already incurred',
        facets: { function: 'reserving', timeOrientation: 'retrospective' },
        assumptions: [
          { label: 'Development method', locator: 'Selected age-to-age factors' },
          { label: 'Tail factor', locator: 'Selected tail' },
          { label: 'Expected claim ratio', locator: 'Expected-claims method' },
          { label: 'Selected ultimate basis', locator: 'Method weighting by accident year' },
        ],
        details: [{ label: 'Analysis', value: 'Unpaid claim estimate' }],
        exports: ['experience-summary', 'development-triangle', 'assumptions'],
      },
      {
        id: 'capital',
        label: 'A capital calculation',
        detail: 'How much capital the risk requires',
        facets: { function: 'capital', timeOrientation: 'prospective' },
        assumptions: [
          { label: 'Capital basis', locator: 'MCT, LICAT or internal model' },
          { label: 'Target capital ratio', locator: 'Internal target from the ORSA' },
          { label: 'Risk margin basis', locator: 'Stated in the capital section' },
        ],
        details: [{ label: 'Analysis', value: 'Capital calculation' }],
        exports: ['capital-summary', 'assumptions'],
      },
      {
        id: 'experience-study',
        label: 'An experience study',
        detail: 'What actually happened, against what was assumed',
        facets: { function: 'reserving', timeOrientation: 'retrospective' },
        assumptions: [
          { label: 'Expected basis', locator: 'The assumption being tested' },
          { label: 'Credibility standard', locator: 'Stated in the study’s method' },
        ],
        details: [{ label: 'Analysis', value: 'Experience study' }],
        exports: ['experience-summary', 'assumptions'],
      },
    ],
  },
  {
    id: 'line',
    question: 'Which line of business?',
    help: 'Narrows the sources that are relevant and the coverages an exhibit is cut by.',
    when: { practice: ['pc'] },
    options: [
      {
        id: 'personal-auto',
        label: 'Personal automobile',
        detail: 'The most heavily regulated line in Canada',
        assumptions: [{ label: 'Line of business', value: 'Personal automobile' }],
        details: [{ label: 'Line of business', value: 'Personal automobile' }],
      },
      {
        id: 'personal-property',
        label: 'Personal property',
        detail: 'Homeowners and tenants — catastrophe exposed',
        assumptions: [
          { label: 'Line of business', value: 'Personal property' },
          { label: 'Catastrophe load', locator: 'Separate provision — see sources' },
        ],
        details: [{ label: 'Line of business', value: 'Personal property' }],
      },
      {
        id: 'commercial',
        label: 'Commercial lines',
        detail: 'Commercial property, liability and specialty',
        assumptions: [{ label: 'Line of business', value: 'Commercial lines' }],
        details: [{ label: 'Line of business', value: 'Commercial lines' }],
      },
    ],
  },
  {
    id: 'jurisdiction',
    question: 'Which jurisdiction governs it?',
    help: 'Rate regulation is provincial; the answer decides whose filing rules apply.',
    when: { practice: ['pc'] },
    options: [
      {
        id: 'ontario',
        label: 'Ontario',
        detail: 'Rates filed with and approved by FSRA',
        assumptions: [
          { label: 'Jurisdiction', value: 'Ontario' },
          { label: 'Filing authority', value: 'FSRA' },
        ],
        details: [{ label: 'Jurisdiction', value: 'Ontario' }],
      },
      {
        id: 'alberta',
        label: 'Alberta',
        detail: 'Rates filed with the Automobile Insurance Rate Board',
        assumptions: [
          { label: 'Jurisdiction', value: 'Alberta' },
          { label: 'Filing authority', value: 'AIRB' },
        ],
        details: [{ label: 'Jurisdiction', value: 'Alberta' }],
      },
      {
        id: 'multi',
        label: 'Multi-jurisdiction',
        detail: 'A national book, reported in aggregate',
        assumptions: [{ label: 'Jurisdiction', value: 'Multi-jurisdiction' }],
        details: [{ label: 'Jurisdiction', value: 'Multi-jurisdiction' }],
      },
    ],
  },
  PERIOD_STEP,
  AUDIENCE_STEP,
]

/* ------------------------------------------------------------------ report */

const REPORT_STEPS: WizardStep[] = [
  PRACTICE_STEP,
  {
    id: 'report-kind',
    question: 'What kind of report is it?',
    options: [
      {
        id: 'appointed-actuary',
        label: 'Appointed actuary’s report',
        detail: 'The annual opinion and the report behind it',
        facets: { function: 'financial-reporting', driver: 'regulation', timeOrientation: 'retrospective' },
        assumptions: [
          { label: 'Standards basis', value: 'CIA Standards of Practice' },
          { label: 'Valuation date', locator: 'Stated in the report’s scope' },
        ],
        details: [{ label: 'Report', value: 'Appointed actuary’s report' }],
        exports: ['report-outline', 'assumptions'],
      },
      {
        id: 'filing-memo',
        label: 'Rate filing memorandum',
        detail: 'The narrative that accompanies an indication into a filing',
        facets: { function: 'pricing', audience: 'regulator', driver: 'regulation', timeOrientation: 'prospective' },
        assumptions: [
          { label: 'Filing authority', locator: 'Stated in the memorandum’s scope' },
          { label: 'Proposed effective date', locator: 'Stated in the memorandum' },
        ],
        details: [{ label: 'Report', value: 'Rate filing memorandum' }],
        exports: ['report-outline', 'rate-indication', 'assumptions'],
      },
      {
        id: 'board-note',
        label: 'Board or management note',
        detail: 'A finding put to the people who will act on it',
        facets: { function: 'advisory', audience: 'management' },
        assumptions: [{ label: 'Decision requested', locator: 'Stated in the note’s opening' }],
        details: [{ label: 'Report', value: 'Board or management note' }],
        exports: ['report-outline'],
      },
      {
        id: 'orsa',
        label: 'ORSA report',
        detail: 'The insurer’s own view of its risk and capital needs',
        facets: { function: 'capital', driver: 'regulation', timeOrientation: 'prospective' },
        assumptions: [
          { label: 'Risk appetite statement', locator: 'ORSA, s. 1' },
          { label: 'Internal capital target', locator: 'ORSA, capital section' },
          { label: 'Stress scenario set', locator: 'ORSA, scenario section' },
        ],
        details: [{ label: 'Report', value: 'ORSA report' }],
        exports: ['report-outline', 'capital-summary', 'assumptions'],
      },
    ],
  },
  DRIVER_STEP,
  AUDIENCE_STEP,
]

/* ----------------------------------------------------------- documentation */

const DOCUMENTATION_STEPS: WizardStep[] = [
  PRACTICE_STEP,
  {
    id: 'doc-kind',
    question: 'What is being recorded?',
    help: 'Documentation exists so another actuary could repeat the work. What has to be repeatable?',
    options: [
      {
        id: 'methodology',
        label: 'A methodology',
        detail: 'How a recurring analysis is done, and why that way',
        facets: { function: 'reserving', timeOrientation: 'retrospective' },
        assumptions: [
          { label: 'Method scope', locator: 'Stated in the note’s opening' },
          { label: 'Data source', locator: 'Named in the data section' },
        ],
        details: [{ label: 'Documentation', value: 'Methodology note' }],
        exports: ['documentation-index', 'assumptions'],
      },
      {
        id: 'model-change',
        label: 'A model change',
        detail: 'What changed, why, and what it moved',
        facets: { function: 'financial-reporting' },
        assumptions: [
          { label: 'Change description', locator: 'Change log entry' },
          { label: 'Quantified impact', locator: 'Before-and-after comparison' },
          { label: 'Approval', locator: 'Governance record' },
        ],
        details: [{ label: 'Documentation', value: 'Model change record' }],
        exports: ['documentation-index', 'assumptions'],
      },
      {
        id: 'assumption-basis',
        label: 'An assumption basis',
        detail: 'Every assumption, its support and when it was last reviewed',
        facets: { function: 'reserving' },
        assumptions: [{ label: 'Review cycle', locator: 'Stated in the basis document' }],
        details: [{ label: 'Documentation', value: 'Assumption basis' }],
        exports: ['assumptions', 'documentation-index'],
      },
      {
        id: 'reliance',
        label: 'A reliance record',
        detail: 'What was relied on, from whom, and with what limits',
        facets: { function: 'advisory' },
        assumptions: [
          { label: 'Party relied upon', locator: 'Reliance statement' },
          { label: 'Scope of reliance', locator: 'Reliance statement' },
        ],
        details: [{ label: 'Documentation', value: 'Reliance record' }],
        exports: ['documentation-index'],
      },
    ],
  },
  AUDIENCE_STEP,
]

export const DELIVERABLE_STEPS: Record<DeliverableType, WizardStep[]> = {
  analysis: ANALYSIS_STEPS,
  report: REPORT_STEPS,
  documentation: DOCUMENTATION_STEPS,
}

export function stepsFor(type: DeliverableType): WizardStep[] {
  return DELIVERABLE_STEPS[type] ?? []
}

/**
 * What a deliverable is called on screen: the name the reader gave it, or — until
 * they give it one — the sentence its own answers make ("P&C Reserving analysis").
 *
 * It lives here rather than beside `suggestedTitle` because deriving it needs the
 * authored flow, and the engine deliberately does not import the catalogue.
 */
export function deliverableDisplayTitle(deliverable: Deliverable): string {
  if (deliverable.title.trim()) return deliverable.title
  return suggestedTitle(deliverable.type, facetsFromAnswers(stepsFor(deliverable.type), deliverable.answers))
}

/* ----------------------------------------------------------------- exports */

export type ExportFormat = 'xlsx' | 'csv'

export interface ExportSpec {
  id: string
  label: string
  /** What the exported workbook is for, in one line. */
  description: string
  /** The columns of the main table. The first is the period column, if any. */
  columns: string[]
  /** True when the table gets one row per period from the scoping answers. */
  perPeriod: boolean
  formats: ExportFormat[]
}

/**
 * Every export the app can build. Which of these a deliverable is offered comes
 * from its answers (`exports` on the options above), so an export is never
 * offered for a deliverable whose scoping did not earn it.
 *
 * Value cells are left empty on purpose. Cowork has no access to a reader's
 * experience data, so an exhibit that arrived pre-filled would be filled with
 * numbers nobody measured. What the export *can* carry honestly is the
 * structure — the right columns, the right periods, and the assumptions and
 * sources behind them, each naming where it came from.
 */
export const EXPORT_SPECS: ExportSpec[] = [
  {
    id: 'experience-summary',
    label: 'Experience Summary Table',
    description: 'One row per period, with the exposure, premium and claim columns an experience exhibit carries.',
    columns: [
      'Period',
      'Earned exposure',
      'Earned premium',
      'Reported claim count',
      'Reported claims',
      'Paid claims',
      'Case reserves',
      'Ultimate claims',
      'Loss ratio',
    ],
    perPeriod: true,
    formats: ['xlsx', 'csv'],
  },
  {
    id: 'development-triangle',
    label: 'Development Triangle',
    description: 'A period-by-maturity grid, ready for reported or paid claims.',
    columns: ['Period'],
    perPeriod: true,
    formats: ['xlsx', 'csv'],
  },
  {
    id: 'rate-indication',
    label: 'Rate Indication Exhibit',
    description: 'The indication build-up: trended losses, expenses, permissible loss ratio and the indicated change.',
    columns: [
      'Period',
      'Earned premium at present rates',
      'Trended ultimate claims',
      'Trended ULAE',
      'Loss ratio',
      'Weight',
    ],
    perPeriod: true,
    formats: ['xlsx', 'csv'],
  },
  {
    id: 'capital-summary',
    label: 'Capital Summary',
    description: 'Required and available capital by component, with the target ratio the deliverable manages to.',
    columns: ['Component', 'Required capital', 'Available capital', 'Ratio', 'Note'],
    perPeriod: false,
    formats: ['xlsx', 'csv'],
  },
  {
    id: 'assumptions',
    label: 'Assumptions Register',
    description: 'Every assumption the scoping and the attached sources produced, with its basis.',
    columns: ['Assumption', 'Value', 'Basis', 'Locator', 'Origin'],
    perPeriod: false,
    formats: ['xlsx', 'csv'],
  },
  {
    id: 'report-outline',
    label: 'Report Outline',
    description: 'The section skeleton the report type calls for, with the sources that support each section.',
    columns: ['Section', 'What it covers', 'Supporting sources'],
    perPeriod: false,
    formats: ['xlsx', 'csv'],
  },
  {
    id: 'documentation-index',
    label: 'Documentation Index',
    description: 'What is recorded, where it is recorded, and what supports it.',
    columns: ['Item', 'Record', 'Support', 'Last reviewed'],
    perPeriod: false,
    formats: ['xlsx', 'csv'],
  },
]

export function exportSpec(id: string): ExportSpec | null {
  return EXPORT_SPECS.find(e => e.id === id) ?? null
}

/**
 * The sections a report outline carries, by report kind. Authored rather than
 * generated because the order is the convention of the document type — an
 * appointed actuary's report does not open with its findings.
 */
export const REPORT_OUTLINES: Record<string, Array<{ section: string; covers: string }>> = {
  'appointed-actuary': [
    { section: 'Scope and purpose', covers: 'What the opinion covers and the valuation date' },
    { section: 'Reliances and limitations', covers: 'Data relied upon and what was not verified' },
    { section: 'Data', covers: 'Sources, reconciliation and sufficiency' },
    { section: 'Methodology', covers: 'Methods applied, by line and accident year' },
    { section: 'Assumptions', covers: 'Each assumption and its support' },
    { section: 'Results', covers: 'Policy liabilities and the movement since last valuation' },
    { section: 'Opinion', covers: 'The statement of opinion itself' },
  ],
  'filing-memo': [
    { section: 'Proposal', covers: 'The rate change sought and its effective date' },
    { section: 'Data and experience period', covers: 'What the indication was built on' },
    { section: 'Trend', covers: 'Frequency and severity selections and their support' },
    { section: 'Development', covers: 'Loss development selections and their support' },
    { section: 'Expenses and profit', covers: 'The permissible loss ratio build-up' },
    { section: 'Indication', covers: 'The indicated change and the selected change' },
    { section: 'Impact', covers: 'Distribution of the change across the book' },
  ],
  'board-note': [
    { section: 'Decision requested', covers: 'What is being asked of the reader' },
    { section: 'Background', covers: 'What changed and why it matters now' },
    { section: 'Analysis', covers: 'The finding and the work behind it' },
    { section: 'Options', covers: 'What could be done, with consequences' },
    { section: 'Recommendation', covers: 'What the actuary recommends, and why' },
  ],
  orsa: [
    { section: 'Risk appetite', covers: 'The risks the insurer accepts and the limits on them' },
    { section: 'Risk identification', covers: 'The material risks and how they were identified' },
    { section: 'Stress and scenario testing', covers: 'Scenarios run and their results' },
    { section: 'Capital needs', covers: 'Internal capital target and the position against it' },
    { section: 'Governance', covers: 'Who owns the assessment and how it is challenged' },
    { section: 'Conclusion', covers: 'The board-level statement on solvency' },
  ],
}

/** The rows of a documentation index, by documentation kind. */
export const DOCUMENTATION_ITEMS: Record<string, Array<{ item: string; record: string }>> = {
  methodology: [
    { item: 'Purpose', record: 'What the analysis is for and how often it is run' },
    { item: 'Data', record: 'Source system, extract definition and reconciliation' },
    { item: 'Method', record: 'Steps, in the order performed' },
    { item: 'Assumptions', record: 'Each assumption and its review cycle' },
    { item: 'Controls', record: 'What is checked, by whom, before release' },
    { item: 'Known limitations', record: 'What the method does not handle' },
  ],
  'model-change': [
    { item: 'Change', record: 'What changed, in the model and in the code' },
    { item: 'Rationale', record: 'Why it changed' },
    { item: 'Impact', record: 'Quantified before-and-after' },
    { item: 'Testing', record: 'What was tested and the result' },
    { item: 'Approval', record: 'Who approved it and when' },
    { item: 'Effective date', record: 'The first reporting period on the new basis' },
  ],
  'assumption-basis': [
    { item: 'Assumption', record: 'The assumption as stated' },
    { item: 'Support', record: 'The source or study behind it' },
    { item: 'Last reviewed', record: 'Date of the most recent review' },
    { item: 'Next review', record: 'When it is due again' },
    { item: 'Owner', record: 'Who maintains it' },
  ],
  reliance: [
    { item: 'Party', record: 'Who was relied upon' },
    { item: 'Subject', record: 'What was relied upon them for' },
    { item: 'Scope', record: 'The limits of the reliance' },
    { item: 'Verification', record: 'What was and was not checked' },
    { item: 'Disclosure', record: 'Where the reliance is disclosed' },
  ],
}
