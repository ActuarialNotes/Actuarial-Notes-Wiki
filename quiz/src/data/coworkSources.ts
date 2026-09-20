/**
 * The Cowork **source catalogue** — the entities that publish and the documents
 * they publish, as authored seed data.
 *
 * Two kinds of resource live here and the difference is load-bearing:
 *
 *   • A resource with a `wikiRef` **is** a vault page. Its title, its content
 *     and its fact-check record are the wiki's, and opening it in Cowork opens
 *     the same page the study guide opens — which is how Cowork gets Study
 *     Mode's interactivity without a second reader.
 *   • A resource with `sample: true` illustrates the *shape* of the catalogue
 *     for a publisher whose corpus Cowork does not carry yet. It carries no
 *     date and no link, because it names no particular document: inventing a
 *     plausible one would put a citation in a deliverable that nothing
 *     supports. Its body says what that class of document contains and what an
 *     actuary takes out of it, which is the part that is true.
 *
 * The rule that keeps this honest is the vault's own (`docs/mock-exam-browser.md`,
 * `docs/verification.md`): provenance is **transcribed, never constructed**. A
 * date, a link or a figure appears here only where it is read off the
 * publisher; everywhere else the row is blank and says so.
 *
 * The sample bodies are registered as virtual vault files by
 * `lib/coworkContent.ts`, so both kinds open in the same popup viewer.
 */

import type { SourceEntity, SourceResource } from '@/lib/coworkSources'

const DOC_ROOT = 'Cowork/Sources'

/** The virtual vault path a sample document is registered at. */
function docPath(entityId: string, slug: string): string {
  return `${DOC_ROOT}/${entityId}/${slug}.md`
}

export const COWORK_ENTITIES: SourceEntity[] = [
  {
    id: 'osfi',
    name: 'Office of the Superintendent of Financial Institutions',
    short: 'OSFI',
    category: 'regulator',
    jurisdiction: 'Canada (federal)',
    about:
      'The prudential supervisor of federally regulated insurers, banks and pension plans. Its guidelines set the capital tests, the stress-testing expectations and the annual returns a Canadian insurer files — so most solvency and capital work starts from something OSFI published.',
    site: 'https://www.osfi-bsif.gc.ca',
    /** the OSFI Act was proclaimed 2 July 1987, merging the Department of Insurance with the Office of the Inspector General of Banks */
    established: '1987',
    logo: 'https://www.osfi-bsif.gc.ca/themes/custom/osfi_wxt/favicon.ico',
    practiceAreas: ['pc', 'life', 'erm', 'pensions'],
  },
  {
    id: 'fsra',
    name: 'Financial Services Regulatory Authority of Ontario',
    short: 'FSRA',
    category: 'regulator',
    jurisdiction: 'Ontario',
    about:
      'Ontario’s market-conduct and rate regulator. Auto rates in Ontario are filed with and approved by FSRA, so its filing guidance and bulletins are the binding rules of a personal-auto pricing exercise in the province.',
    site: 'https://www.fsrao.ca',
    /** created by statute in 2016; took over from the Financial Services Commission of Ontario on 8 June 2019, which is when it became the regulator */
    established: '2019',
    practiceAreas: ['pc'],
  },
  {
    id: 'cia',
    name: 'Canadian Institute of Actuaries',
    short: 'CIA',
    category: 'standards',
    jurisdiction: 'Canada',
    about:
      'The national actuarial body. Its Standards of Practice bind a Canadian actuary’s work, and its educational notes are what practice actually follows between the standard and the file — the discount-rate guidance, the appointed actuary’s report, the IFRS 17 measurement notes.',
    site: 'https://www.cia-ica.ca',
    /** incorporated 18 March 1965 */
    established: '1965',
    logo: 'https://www.cia-ica.ca/app/themes/wicket/assets/icons/android-chrome-192x192.png',
    practiceAreas: ['life', 'pc', 'pensions', 'erm'],
  },
  {
    id: 'asb',
    name: 'Actuarial Standards Board',
    short: 'ASB',
    category: 'standards',
    jurisdiction: 'United States',
    about:
      'The US standard setter, whose Actuarial Standards of Practice are the reference point for unpaid-claim estimates, trending and risk classification — and are on the CAS syllabus, so a Canadian actuary reads them too.',
    site: 'https://www.actuarialstandardsboard.org',
    /** established within the American Academy of Actuaries on 1 July 1988 */
    established: '1988',
    logo: 'https://www.actuarialstandardsboard.org/wp-content/themes/asb/images/apple-icon-144x144.png',
    practiceAreas: ['pc', 'life'],
  },
  {
    id: 'cas',
    name: 'Casualty Actuarial Society',
    short: 'CAS',
    category: 'standards',
    jurisdiction: 'North America',
    about:
      'The P&C actuarial body. Its statements of principles and the textbooks on its syllabus are the methodological baseline a ratemaking or reserving deliverable is built on.',
    site: 'https://www.casact.org',
    /** organized 7 November 1914 as the Casualty Actuarial and Statistical Society of America; present name 1921 */
    established: '1914',
    logo: 'https://www.casact.org/sites/default/files/CAS_20Favicon.png',
    practiceAreas: ['pc'],
  },
  {
    id: 'ibc',
    name: 'Insurance Bureau of Canada',
    short: 'IBC',
    category: 'industry-data',
    jurisdiction: 'Canada',
    about:
      'The national industry association for home, car and business insurers. Its aggregate loss statistics — particularly on severe weather — are the usual external benchmark for a catastrophe or inflation discussion.',
    site: 'https://www.ibc.ca',
    /** founded 1964 */
    established: '1964',
    logo: 'https://www.ibc.ca/favicon.svg',
    practiceAreas: ['pc'],
  },
  {
    id: 'pacicc',
    name: 'Property and Casualty Insurance Compensation Corporation',
    short: 'PACICC',
    category: 'industry-data',
    jurisdiction: 'Canada',
    about:
      'The P&C policyholder protection fund. Its research on insurer failure and its assessment mechanics are the standard reference for what insolvency costs the industry, and for the tail a Canadian ERM deliverable reasons about.',
    site: 'https://www.pacicc.ca',
    /** founded 1988 */
    established: '1988',
    logo: 'https://www.pacicc.ca/wp-content/themes/wp-bootstrap-starter-child-pacicc/images/apple-touch-icon.png',
    practiceAreas: ['pc', 'erm'],
  },
  {
    id: 'gisa',
    name: 'General Insurance Statistical Agency',
    short: 'GISA',
    category: 'industry-data',
    jurisdiction: 'Canada',
    about:
      'The statistical agency collecting automobile insurance data for most Canadian jurisdictions. Its exhibits are the industry-level experience a company’s own auto results are benchmarked against in a rate filing.',
    site: 'https://www.gisa-asag.ca',
    /** incorporated June 2005; appointed statistical agent effective 1 April 2006 */
    established: '2005',
    practiceAreas: ['pc'],
  },
  {
    id: 'intact',
    name: 'Intact Financial Corporation',
    short: 'IFC',
    category: 'insurer',
    jurisdiction: 'Canada',
    about:
      'The largest Canadian P&C insurer. A listed carrier’s own disclosure — its annual report, quarterly supplements and MD&A — is a public benchmark for combined ratios, reserve development and catastrophe load.',
    site: 'https://www.intactfc.com',
    /** ING Canada became Intact Financial Corporation on 13 May 2009 — the business it holds is much older */
    established: '2009',
    logo: 'https://www.intactfc.com/apple-icon-180x180.png',
    practiceAreas: ['pc'],
  },
  {
    id: 'definity',
    name: 'Definity Financial Corporation',
    short: 'DFY',
    category: 'insurer',
    jurisdiction: 'Canada',
    about:
      'A listed Canadian P&C carrier. Read alongside its peers, its disclosure is the second point that turns a single company’s result into a market view.',
    site: 'https://www.definityfinancial.com',
    /** incorporated as Economical's parent and renamed Definity Financial Corporation in 2021, on Economical's demutualization — Economical itself wrote its first policy in 1871 */
    established: '2021',
    logo: 'https://www.definityfinancial.com/favicon.ico',
    practiceAreas: ['pc'],
  },
  {
    id: 'canadian-underwriter',
    name: 'Canadian Underwriter',
    short: 'CU',
    category: 'media',
    jurisdiction: 'Canada',
    about:
      'The Canadian P&C trade paper. What it is used for in a deliverable is dating and attribution — it establishes when something became known and who said it, which is exactly what a subsequent-events or external-environment section needs.',
    site: 'https://www.canadianunderwriter.ca',
    /** first published 1934 */
    established: '1934',
    practiceAreas: ['pc'],
  },
  {
    id: 'oliver-wyman',
    name: 'Oliver Wyman',
    short: 'OW',
    category: 'consulting',
    jurisdiction: 'Global',
    about:
      'A consultancy whose actuarial practice publishes benchmark and reform-costing work that is cited in Canadian auto filings and reserve reviews.',
    site: 'https://www.oliverwyman.com',
    /** founded 1984 in New York as Oliver, Wyman & Company */
    established: '1984',
    logo: 'https://www.oliverwyman.com/content/dam/oliver-wyman/v3/logos/favicon-marsh-sky-blue-48px.svg',
    practiceAreas: ['pc', 'life', 'erm'],
  },
]

/**
 * The documents. `wikiRef` entries name real vault pages by their repo path;
 * `sample` entries name a class of document and carry no date or link.
 */
export const COWORK_RESOURCES: SourceResource[] = [
  /* ------------------------------------------------------------------ OSFI */
  {
    id: 'osfi-mct',
    entityId: 'osfi',
    title: 'Minimum Capital Test (MCT) guideline',
    kind: 'guideline',
    published: '2024',
    summary: 'The risk-based capital test every federally regulated P&C insurer is measured against.',
    wikiRef: { kind: 'resource', name: 'OSFI MCT' },
    practiceAreas: ['pc', 'erm'],
    functions: ['capital', 'financial-reporting'],
    assumptions: [
      { label: 'Capital basis', value: 'MCT (OSFI guideline)', locator: 'Guideline, s. 1' },
      { label: 'Supervisory target MCT ratio', value: '150%', locator: 'Guideline, s. 1.2' },
      { label: 'Minimum MCT ratio', value: '100%', locator: 'Guideline, s. 1.2' },
    ],
  },
  {
    id: 'osfi-orsa',
    entityId: 'osfi',
    title: 'Own Risk and Solvency Assessment (ORSA) guideline',
    kind: 'guideline',
    published: null,
    summary: 'What an insurer’s own assessment of its risk and capital needs has to cover.',
    wikiRef: { kind: 'resource', name: 'OSFI ORSA' },
    practiceAreas: ['erm', 'pc', 'life'],
    functions: ['capital', 'advisory'],
    assumptions: [
      { label: 'Internal capital target', locator: 'ORSA report, capital section' },
      { label: 'Risk appetite statement', locator: 'ORSA report, s. 1' },
    ],
  },
  {
    id: 'osfi-stress-testing',
    entityId: 'osfi',
    title: 'Stress testing guideline',
    kind: 'guideline',
    published: null,
    summary: 'The supervisory expectation for scenario and stress testing programmes.',
    wikiRef: { kind: 'resource', name: 'OSFI Stress Testing' },
    practiceAreas: ['erm', 'pc', 'life'],
    functions: ['capital', 'advisory'],
    assumptions: [{ label: 'Stress scenario set', locator: 'Guideline, scenario design' }],
  },
  {
    id: 'osfi-climate',
    entityId: 'osfi',
    title: 'Climate risk management guideline (B-15)',
    kind: 'guideline',
    published: null,
    summary: 'Governance and disclosure expectations for climate-related risk.',
    wikiRef: { kind: 'resource', name: 'OSFI Climate' },
    practiceAreas: ['erm', 'pc'],
    functions: ['capital', 'financial-reporting', 'advisory'],
    assumptions: [{ label: 'Climate scenario basis', locator: 'Guideline, scenario analysis' }],
  },
  {
    id: 'osfi-annual-return',
    entityId: 'osfi',
    title: 'P&C annual return',
    kind: 'filing',
    published: null,
    summary: 'The annual regulatory return and the exhibits an insurer files in it.',
    wikiRef: { kind: 'resource', name: 'OSFI Annual Return' },
    practiceAreas: ['pc'],
    functions: ['financial-reporting', 'reserving'],
    assumptions: [{ label: 'Reported claims basis', locator: 'Annual return, claims exhibits' }],
  },
  {
    id: 'osfi-reinsurance',
    entityId: 'osfi',
    title: 'Reinsurance guideline',
    kind: 'guideline',
    published: null,
    summary: 'Expectations for reinsurance arrangements and counterparty risk.',
    wikiRef: { kind: 'resource', name: 'OSFI Reinsurance' },
    practiceAreas: ['pc', 'erm'],
    functions: ['capital', 'underwriting'],
    assumptions: [{ label: 'Reinsurance structure', locator: 'Treaty summary' }],
  },

  /* ------------------------------------------------------------------ FSRA */
  {
    id: 'fsra-sabs-filing-specs',
    entityId: 'fsra',
    title: 'Final filing specifications for statutory accident benefits optionality',
    kind: 'regulation',
    published: '2025-06-17',
    summary: 'The filing path and specifications for Ontario auto SABS optionality.',
    wikiRef: {
      kind: 'regulation',
      name: 'FSRA Filing Specifications for SABS Optionality (2025)',
      path: 'Resources/Regulation/FSRA Filing Specifications for SABS Optionality (2025).md',
    },
    practiceAreas: ['pc'],
    functions: ['pricing', 'financial-reporting'],
    assumptions: [
      { label: 'Filing jurisdiction', value: 'Ontario (FSRA)', locator: 'Filing specifications' },
      { label: 'Benefit basis', value: 'SABS with optionality', locator: 'Filing specifications' },
    ],
  },
  {
    id: 'fsra-risk-management',
    entityId: 'fsra',
    title: 'FSRA risk management guidance',
    kind: 'guideline',
    published: null,
    summary: 'FSRA’s expectations for how a regulated entity manages its risk.',
    wikiRef: { kind: 'resource', name: 'FSRA Risk Management' },
    practiceAreas: ['pc'],
    functions: ['advisory', 'capital'],
  },
  {
    id: 'fsra-rate-bulletin',
    entityId: 'fsra',
    title: 'Auto rate filing bulletins',
    kind: 'bulletin',
    published: null,
    summary: 'The running series of bulletins that change what a rate filing must contain.',
    docPath: docPath('fsra', 'auto-rate-filing-bulletins'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['pricing'],
    assumptions: [{ label: 'Filing path', locator: 'Applicable bulletin' }],
  },

  /* ------------------------------------------------------------------- CIA */
  {
    id: 'cia-csop',
    entityId: 'cia',
    title: 'Standards of Practice',
    kind: 'standard',
    published: null,
    summary: 'The consolidated standards binding a Canadian actuary’s work.',
    wikiRef: { kind: 'resource', name: 'CIA CSOP' },
    practiceAreas: ['life', 'pc', 'pensions', 'erm'],
    functions: ['reserving', 'financial-reporting', 'advisory'],
    assumptions: [
      { label: 'Standards basis', value: 'CIA Standards of Practice', locator: 'Applicable section' },
    ],
  },
  {
    id: 'cia-appointed-actuary',
    entityId: 'cia',
    title: 'The Appointed Actuary',
    kind: 'standard',
    published: null,
    summary: 'The appointed actuary’s role, report and required opinions.',
    wikiRef: { kind: 'resource', name: 'CIA Appointed Actuary' },
    practiceAreas: ['life', 'pc'],
    functions: ['reserving', 'financial-reporting', 'advisory'],
    assumptions: [{ label: 'Opinion scope', locator: 'Appointed actuary’s report' }],
  },
  {
    id: 'cia-discount-rates',
    entityId: 'cia',
    title: 'Discount rates guidance',
    kind: 'standard',
    published: null,
    summary: 'How the discount rate used in a valuation is set and supported.',
    wikiRef: { kind: 'resource', name: 'CIA Discount Rates' },
    practiceAreas: ['life', 'pc'],
    functions: ['reserving', 'financial-reporting'],
    assumptions: [{ label: 'Discount rate', locator: 'Curve as at the valuation date' }],
  },
  {
    id: 'cia-ifrs17-lrc',
    entityId: 'cia',
    title: 'IFRS 17 — liability for remaining coverage',
    kind: 'standard',
    published: null,
    summary: 'Measurement of the liability for remaining coverage under IFRS 17.',
    wikiRef: { kind: 'resource', name: 'CIA IFRS 17 - LRC' },
    practiceAreas: ['pc', 'life'],
    functions: ['financial-reporting', 'reserving'],
    assumptions: [
      { label: 'Measurement model', locator: 'Educational note, measurement section' },
      { label: 'Risk adjustment basis', locator: 'Educational note, risk adjustment' },
    ],
  },

  /* ------------------------------------------------------------------- ASB */
  {
    id: 'asop-43',
    entityId: 'asb',
    title: 'ASOP 43 — Property/Casualty Unpaid Claim Estimates',
    kind: 'standard',
    published: '2007',
    summary: 'What an unpaid claim estimate is, and what has to be disclosed about it.',
    wikiRef: { kind: 'resource', name: 'ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)' },
    practiceAreas: ['pc'],
    functions: ['reserving'],
    assumptions: [
      { label: 'Estimate basis', value: 'Unpaid claim estimate per ASOP 43', locator: 'ASOP 43, s. 3' },
      { label: 'Intended measure', locator: 'ASOP 43, s. 3.2' },
    ],
  },
  {
    id: 'asop-13',
    entityId: 'asb',
    title: 'ASOP 13 — Trending Procedures in Property/Casualty Insurance',
    kind: 'standard',
    published: '2009',
    summary: 'The considerations behind selecting and applying a trend.',
    wikiRef: { kind: 'resource', name: 'ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)' },
    practiceAreas: ['pc'],
    functions: ['pricing', 'reserving'],
    assumptions: [
      { label: 'Trend selection basis', locator: 'ASOP 13, s. 3' },
      { label: 'Severity trend', locator: 'Selected from fitted experience' },
      { label: 'Frequency trend', locator: 'Selected from fitted experience' },
    ],
  },
  {
    id: 'asop-12',
    entityId: 'asb',
    title: 'ASOP 12 — Risk Classification',
    kind: 'standard',
    published: '2005',
    summary: 'When a rating variable is a defensible risk classifier.',
    wikiRef: { kind: 'resource', name: 'ASOP 12 - Risk Classification (ASB - 2005)' },
    practiceAreas: ['pc', 'life'],
    functions: ['pricing', 'underwriting'],
    assumptions: [{ label: 'Rating variables', locator: 'ASOP 12, s. 3' }],
  },

  /* ------------------------------------------------------------------- CAS */
  {
    id: 'cas-sop-ratemaking',
    entityId: 'cas',
    title: 'Statement of Principles Regarding P&C Insurance Ratemaking',
    kind: 'standard',
    published: '1988',
    summary: 'The four principles a rate must satisfy.',
    wikiRef: {
      kind: 'resource',
      name: 'Statement of Principles Regarding Property and Casualty Insurance Ratemaking (CAS - 1988)',
    },
    practiceAreas: ['pc'],
    functions: ['pricing'],
    assumptions: [
      { label: 'Rate adequacy standard', value: 'Reasonable, not excessive, not inadequate, not unfairly discriminatory', locator: 'Principles 1–4' },
    ],
  },
  {
    id: 'werner-basic-ratemaking',
    entityId: 'cas',
    title: 'Basic Ratemaking (Werner & Modlin)',
    kind: 'textbook',
    published: '2016',
    summary: 'The syllabus text behind the standard indication and classification methods.',
    wikiRef: { kind: 'resource', name: 'Basic Ratemaking (Werner - 2016)' },
    practiceAreas: ['pc'],
    functions: ['pricing'],
    assumptions: [
      { label: 'Indication method', locator: 'Ch. 8 — pure premium or loss ratio' },
      { label: 'Permissible loss ratio', locator: 'Ch. 7 — expense provisions' },
    ],
  },
  {
    id: 'friedland-unpaid-claims',
    entityId: 'cas',
    title: 'Estimating Unpaid Claims Using Basic Techniques (Friedland)',
    kind: 'textbook',
    published: '2010',
    summary: 'The development, expected-claims and Bornhuetter-Ferguson methods, end to end.',
    wikiRef: { kind: 'resource', name: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)' },
    practiceAreas: ['pc'],
    functions: ['reserving'],
    assumptions: [
      { label: 'Development method', locator: 'Ch. 7 — selected age-to-age factors' },
      { label: 'Tail factor', locator: 'Ch. 8 — selected tail' },
      { label: 'Expected claim ratio', locator: 'Ch. 9 — expected claims method' },
    ],
  },

  /* ------------------------------------------------------------------- IBC */
  {
    id: 'ibc-code-of-conduct',
    entityId: 'ibc',
    title: 'IBC Code of Conduct',
    kind: 'guideline',
    published: null,
    summary: 'The industry’s own conduct commitments.',
    wikiRef: { kind: 'resource', name: 'IBC Code of Conduct' },
    practiceAreas: ['pc'],
    functions: ['advisory', 'underwriting'],
  },
  {
    id: 'ibc-severe-weather',
    entityId: 'ibc',
    title: 'Severe weather insured-loss statements',
    kind: 'dataset',
    published: null,
    summary: 'Industry insured losses attributed to named catastrophe events.',
    docPath: docPath('ibc', 'severe-weather-insured-losses'),
    sample: true,
    practiceAreas: ['pc', 'erm'],
    functions: ['pricing', 'reserving', 'capital'],
    assumptions: [
      { label: 'Catastrophe load basis', locator: 'Industry insured-loss series' },
      { label: 'Event definition threshold', locator: 'Series notes' },
    ],
  },

  /* ---------------------------------------------------------------- PACICC */
  {
    id: 'pacicc-overview',
    entityId: 'pacicc',
    title: 'PACICC — compensation and assessment mechanics',
    kind: 'report',
    published: null,
    summary: 'What the compensation fund covers and how assessments fall on members.',
    wikiRef: { kind: 'resource', name: 'PACICC' },
    practiceAreas: ['pc', 'erm'],
    functions: ['capital', 'advisory'],
    assumptions: [{ label: 'Assessment exposure', locator: 'Member assessment basis' }],
  },
  {
    id: 'pacicc-why-insurers-fail',
    entityId: 'pacicc',
    title: 'Insurer failure research series',
    kind: 'report',
    published: null,
    summary: 'PACICC’s standing research on the causes and cost of P&C insurer failure.',
    docPath: docPath('pacicc', 'insurer-failure-research'),
    sample: true,
    practiceAreas: ['erm', 'pc'],
    functions: ['capital', 'advisory'],
    assumptions: [{ label: 'Failure-cause taxonomy', locator: 'Research series' }],
  },

  /* ------------------------------------------------------------------ GISA */
  {
    id: 'gisa-auto-exhibits',
    entityId: 'gisa',
    title: 'Automobile insurance statistical exhibits',
    kind: 'dataset',
    published: null,
    summary: 'Industry automobile experience by jurisdiction, coverage and accident year.',
    docPath: docPath('gisa', 'automobile-statistical-exhibits'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['pricing', 'reserving'],
    assumptions: [
      { label: 'Industry benchmark experience', locator: 'Exhibit by coverage and accident year' },
      { label: 'Loss development benchmark', locator: 'Industry development exhibit' },
    ],
  },

  /* ---------------------------------------------------------------- Intact */
  {
    id: 'intact-annual-report',
    entityId: 'intact',
    title: 'Annual report and MD&A',
    kind: 'report',
    published: null,
    summary: 'The audited results, the MD&A discussion and the reserve development disclosure.',
    docPath: docPath('intact', 'annual-report'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['financial-reporting', 'reserving', 'capital'],
    assumptions: [
      { label: 'Peer combined ratio', locator: 'MD&A, underwriting results' },
      { label: 'Peer prior-year development', locator: 'Notes, claims liabilities' },
    ],
  },
  {
    id: 'intact-quarterly',
    entityId: 'intact',
    title: 'Quarterly results and supplementary package',
    kind: 'report',
    published: null,
    summary: 'The quarterly view, with the segment detail the annual report aggregates.',
    docPath: docPath('intact', 'quarterly-results'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['financial-reporting'],
  },

  /* -------------------------------------------------------------- Definity */
  {
    id: 'definity-annual-report',
    entityId: 'definity',
    title: 'Annual report and MD&A',
    kind: 'report',
    published: null,
    summary: 'A second listed carrier’s disclosure, for a two-point market read.',
    docPath: docPath('definity', 'annual-report'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['financial-reporting', 'reserving'],
    assumptions: [{ label: 'Peer combined ratio', locator: 'MD&A, underwriting results' }],
  },

  /* --------------------------------------------------- Canadian Underwriter */
  {
    id: 'cu-reform-coverage',
    entityId: 'canadian-underwriter',
    title: 'Auto reform and market coverage',
    kind: 'news',
    published: null,
    summary: 'Trade reporting that dates a reform, an announcement or a market move.',
    docPath: docPath('canadian-underwriter', 'auto-reform-coverage'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['advisory', 'pricing'],
    assumptions: [{ label: 'Date the change became known', locator: 'Article dateline' }],
  },

  /* ---------------------------------------------------------- Oliver Wyman */
  {
    id: 'ow-benchmark-study',
    entityId: 'oliver-wyman',
    title: 'Auto benchmark and reform-costing studies',
    kind: 'report',
    published: null,
    summary: 'Consulting analysis of reform cost impacts and industry benchmarks.',
    docPath: docPath('oliver-wyman', 'auto-benchmark-studies'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['pricing', 'reserving', 'advisory'],
    assumptions: [{ label: 'Reform cost impact', locator: 'Study, cost impact section' }],
  },
]
