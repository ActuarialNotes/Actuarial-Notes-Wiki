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
    id: 'amf',
    name: 'Autorité des marchés financiers',
    short: 'AMF',
    category: 'regulator',
    jurisdiction: 'Québec',
    about:
      'Québec’s single regulator for insurance, securities and deposit institutions. An insurer chartered in Québec is capitalised against the AMF’s own capital adequacy guideline rather than the MCT, so a capital deliverable that crosses the provincial line crosses a second regime.',
    site: 'https://lautorite.qc.ca',
    practiceAreas: ['pc', 'life', 'erm'],
  },
  {
    id: 'airb',
    name: 'Automobile Insurance Rate Board',
    short: 'AIRB',
    category: 'regulator',
    jurisdiction: 'Alberta',
    about:
      'Alberta’s automobile rate regulator. Private passenger auto rates in Alberta are approved here, and its annual review is the province’s published view of what the industry’s loss experience is doing — which is what a company’s own selection gets compared against.',
    site: 'https://www.airbfordrivers.ca',
    logo: 'https://www.airbfordrivers.ca/wp-content/uploads/2026/04/cropped-favicon-180x180.png',
    practiceAreas: ['pc'],
  },
  {
    id: 'ccir',
    name: 'Canadian Council of Insurance Regulators',
    short: 'CCIR',
    category: 'regulator',
    jurisdiction: 'Canada',
    about:
      'The association of Canada’s provincial, territorial and federal insurance regulators. It exists to harmonise what an insurer files, so its return instructions and its market-conduct statement are the one form a carrier completes instead of thirteen.',
    site: 'https://www.ccir-ccrra.org',
    logo: 'https://www.ccir-ccrra.org/images/CCIR/favicon-32x32.png?v=KNsjSxSAmlzzrh6bHxZG3xSgKyIEk1Iezb56ljqNMiI',
    practiceAreas: ['pc', 'life'],
  },
  {
    id: 'government-of-canada',
    name: 'Government of Canada',
    short: 'GC',
    category: 'regulator',
    jurisdiction: 'Canada (federal)',
    about:
      'The federal legislator and policy maker. The statute a federally regulated insurer is incorporated and supervised under is an Act of Parliament, and the policy work that precedes a change to it — a task force on flood, a financial-sector review — is where a coming requirement is first visible.',
    site: 'https://www.canada.ca',
    practiceAreas: ['pc', 'life', 'pensions', 'erm'],
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
    id: 'soa',
    name: 'Society of Actuaries',
    short: 'SOA',
    category: 'standards',
    jurisdiction: 'North America',
    about:
      'The life, health, pensions and retirement actuarial body. Its experience studies and mortality tables are the published base a life or pension assumption is set from, and its research is the reference a P&C actuary reaches for when a deliverable crosses into those books.',
    site: 'https://www.soa.org',
    /** transcribed: in 1949 the Actuarial Society of America and the American Institute of Actuaries merged to form the Society of Actuaries (soa.org/about/soa-history) */
    established: '1949',
    logo: 'https://www.soa.org/siteassets/favicons/v-639255170535237341/favicon-32x32.png',
    practiceAreas: ['life', 'pensions', 'erm', 'pc'],
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
    id: 'bank-of-canada',
    name: 'Bank of Canada',
    short: 'BoC',
    category: 'industry-data',
    jurisdiction: 'Canada',
    about:
      'The central bank. Almost every discounted figure an actuary reports starts from a Government of Canada curve it publishes, and almost every trend selection is argued against its inflation outlook — so it is the source behind the *economic* assumptions rather than the actuarial ones.',
    site: 'https://www.bankofcanada.ca',
    /** transcribed: “In operation since 1935” (bankofcanada.ca/about) */
    established: '1935',
    logo: 'https://www.bankofcanada.ca/wp-content/themes/ews-build-2024/img/favicon/apple-touch-icon-180x180.png',
    practiceAreas: ['pc', 'life', 'pensions', 'erm'],
  },
  {
    id: 'statistics-canada',
    name: 'Statistics Canada',
    short: 'STC',
    category: 'industry-data',
    jurisdiction: 'Canada',
    about:
      'The national statistical agency. The CPI series behind a severity trend and the population life tables behind a mortality basis both come from here, which makes it the one source an external reviewer can always re-derive a trend selection from.',
    site: 'https://www.statcan.gc.ca',
    /** transcribed: “Statistics Canada emerged … in 1971, when a new Statistics Act was passed by Parliament”; the Dominion Bureau of Statistics it replaced dates from 1918 (statcan.gc.ca/en/about/history) */
    established: '1971',
    practiceAreas: ['pc', 'life', 'pensions', 'erm'],
  },
  {
    id: 'catiq',
    name: 'Catastrophe Indices and Quantification Inc.',
    short: 'CatIQ',
    category: 'industry-data',
    jurisdiction: 'Canada',
    about:
      'The Canadian catastrophe loss aggregator. It is what turns “a bad storm year” into a figure with a definition behind it — an event threshold, a peril attribution and an insured-loss estimate that the rest of the industry, including IBC, cites rather than re-estimates.',
    site: 'https://www.catiq.com',
    practiceAreas: ['pc', 'erm'],
  },
  {
    id: 'facility-association',
    name: 'Facility Association',
    short: 'FA',
    category: 'industry-data',
    jurisdiction: 'Canada',
    about:
      'The residual market for automobile insurance — the mechanism that carries the risks the voluntary market declines, in the provinces and territories that use it. Its rates and its share of the market are a standing part of the exposure picture an auto pricing deliverable works from.',
    site: 'https://www.facilityassociation.com',
    logo: 'https://www.facilityassociation.com/icon.png?1d5d2e450d5a3f5d',
    practiceAreas: ['pc'],
  },
  {
    id: 'msa-research',
    name: 'Market-Security Analysis & Research Inc.',
    short: 'MSA',
    category: 'industry-data',
    jurisdiction: 'Canada',
    about:
      'The publisher of the financial database Canadian insurer results are compared in. A peer benchmark is only as good as the definitions behind its ratios, and MSA’s are the ones the market has converged on.',
    site: 'https://www.msaresearch.com',
    logo: 'https://www.msaresearch.com/wp-content/uploads/2026/02/MSA-Logo-512x512-1-300x300.jpg',
    practiceAreas: ['pc', 'life'],
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

  /* -------------------------------------------------------------------- AMF */
  {
    id: 'amf-capital-guideline-pc',
    entityId: 'amf',
    title: 'Capital adequacy requirements guideline — damage insurance',
    kind: 'guideline',
    published: null,
    summary: 'Québec’s own risk-based capital test, the MCT’s counterpart for a provincially chartered insurer.',
    docPath: docPath('amf', 'capital-adequacy-guideline'),
    sample: true,
    practiceAreas: ['pc', 'erm'],
    functions: ['capital', 'financial-reporting'],
    assumptions: [
      { label: 'Capital basis', locator: 'Guideline, scope and application' },
      { label: 'Target capital ratio', locator: 'Guideline, target capital' },
    ],
  },
  {
    id: 'amf-sound-commercial-practices',
    entityId: 'amf',
    title: 'Sound commercial practices guideline',
    kind: 'guideline',
    published: null,
    summary: 'What the AMF expects of an insurer’s treatment of its clients, product design onwards.',
    docPath: docPath('amf', 'sound-commercial-practices'),
    sample: true,
    practiceAreas: ['pc', 'life'],
    functions: ['advisory', 'underwriting'],
    assumptions: [{ label: 'Market-conduct basis', locator: 'Guideline, expectations' }],
  },

  /* ------------------------------------------------------------------- AIRB */
  {
    id: 'airb-filing-guidelines',
    entityId: 'airb',
    title: 'Automobile insurance rate filing guidelines',
    kind: 'guideline',
    published: null,
    summary: 'The filing paths open to an Alberta auto rate change and what each one has to carry.',
    docPath: docPath('airb', 'rate-filing-guidelines'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['pricing'],
    assumptions: [
      { label: 'Filing path', locator: 'Filing guidelines, filing types' },
      { label: 'Required exhibits', locator: 'Filing guidelines, supporting material' },
    ],
  },
  {
    id: 'airb-annual-review',
    entityId: 'airb',
    title: 'Annual review of automobile insurance premiums',
    kind: 'report',
    published: null,
    summary: 'The Board’s published read on industry loss experience and where premiums sit against it.',
    docPath: docPath('airb', 'annual-review'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['pricing', 'advisory'],
    assumptions: [
      { label: 'Industry loss trend', locator: 'Annual review, trend analysis' },
      { label: 'Benchmark premium profiles', locator: 'Annual review, premium comparisons' },
    ],
  },

  /* ------------------------------------------------------------------- CCIR */
  {
    id: 'ccir-pc-return-instructions',
    entityId: 'ccir',
    title: 'P&C insurance return — instructions and forms',
    kind: 'filing',
    published: '2024',
    summary: 'The harmonised annual return a Canadian P&C insurer files, form by form.',
    wikiRef: { kind: 'resource', name: 'CCIR Instructions' },
    practiceAreas: ['pc'],
    functions: ['financial-reporting', 'reserving'],
    assumptions: [
      { label: 'Reporting basis', locator: 'Instructions, general requirements' },
      { label: 'Return exhibits', locator: 'Forms index' },
    ],
  },
  {
    id: 'ccir-market-conduct-statement',
    entityId: 'ccir',
    title: 'Annual Statement on Market Conduct',
    kind: 'filing',
    published: null,
    summary: 'The single conduct return that replaces a separate filing in each jurisdiction.',
    docPath: docPath('ccir', 'annual-statement-market-conduct'),
    sample: true,
    practiceAreas: ['pc', 'life'],
    functions: ['financial-reporting', 'advisory'],
    assumptions: [{ label: 'Market-conduct reporting basis', locator: 'Annual Statement, reporting guide' }],
  },

  /* --------------------------------------------------- Government of Canada */
  {
    id: 'goc-insurance-companies-act',
    entityId: 'government-of-canada',
    title: 'Insurance Companies Act',
    kind: 'regulation',
    published: '1991',
    summary: 'The federal statute a Canadian insurer is incorporated, supervised and wound up under.',
    wikiRef: { kind: 'resource', name: 'ICA' },
    practiceAreas: ['pc', 'life'],
    functions: ['capital', 'financial-reporting', 'advisory'],
    assumptions: [
      { label: 'Incorporating statute', value: 'Insurance Companies Act (S.C. 1991, c. 47)', locator: 'Act, short title' },
      { label: 'Appointed actuary requirement', locator: 'Act, actuary provisions' },
    ],
  },
  {
    id: 'goc-flood-risks',
    entityId: 'government-of-canada',
    title: 'Adapting to Rising Flood Risks',
    kind: 'report',
    published: '2022',
    summary: 'The federal task force’s options for insuring residential flood in high-risk areas.',
    wikiRef: { kind: 'resource', name: 'GOC Flood Risks' },
    practiceAreas: ['pc', 'erm'],
    functions: ['pricing', 'underwriting', 'advisory'],
    assumptions: [
      { label: 'Flood insurability basis', locator: 'Report, insurance solutions' },
      { label: 'High-risk household treatment', locator: 'Report, residual risk pool' },
    ],
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

  /* ------------------------------------------------------------------- SOA */
  {
    id: 'soa-risk-and-insurance',
    entityId: 'soa',
    title: 'Risk and Insurance (study note)',
    kind: 'textbook',
    published: null,
    summary: 'Why pooling works and what it costs — the treatment the rest of the corpus assumes.',
    wikiRef: { kind: 'resource', name: 'Risk and Insurance (SOA)' },
    practiceAreas: ['pc', 'life', 'erm'],
    functions: ['pricing', 'advisory'],
    assumptions: [{ label: 'Risk-pooling basis', locator: 'Study note, pooling of losses' }],
  },
  {
    id: 'soa-experience-studies',
    entityId: 'soa',
    title: 'Experience studies and mortality tables',
    kind: 'report',
    published: null,
    summary: 'The published base a life or pension assumption is set from, and the improvement scale applied to it.',
    docPath: docPath('soa', 'experience-studies'),
    sample: true,
    practiceAreas: ['life', 'pensions'],
    functions: ['pricing', 'reserving', 'financial-reporting'],
    assumptions: [
      { label: 'Base mortality table', locator: 'Study, table exhibits' },
      { label: 'Mortality improvement scale', locator: 'Study, improvement section' },
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

  /* --------------------------------------------------------- Bank of Canada */
  {
    id: 'boc-yield-curves',
    entityId: 'bank-of-canada',
    title: 'Government of Canada benchmark bond yields',
    kind: 'dataset',
    published: null,
    summary: 'The published risk-free curve a discounted liability is measured against.',
    docPath: docPath('bank-of-canada', 'benchmark-bond-yields'),
    sample: true,
    practiceAreas: ['pc', 'life', 'pensions', 'erm'],
    functions: ['reserving', 'financial-reporting', 'capital'],
    assumptions: [
      { label: 'Discount rate basis', locator: 'Selected series, valuation date' },
      { label: 'Risk-free reference curve', locator: 'Benchmark bond yield series' },
    ],
  },
  {
    id: 'boc-monetary-policy-report',
    entityId: 'bank-of-canada',
    title: 'Monetary Policy Report',
    kind: 'report',
    published: null,
    summary: 'The Bank’s quarterly projection for inflation and growth — the outside view a trend selection answers to.',
    docPath: docPath('bank-of-canada', 'monetary-policy-report'),
    sample: true,
    practiceAreas: ['pc', 'life', 'erm'],
    functions: ['pricing', 'reserving', 'advisory'],
    assumptions: [
      { label: 'Inflation outlook', locator: 'Report, projection' },
      { label: 'Economic scenario basis', locator: 'Report, risks to the outlook' },
    ],
  },

  /* ------------------------------------------------------ Statistics Canada */
  {
    id: 'statcan-cpi',
    entityId: 'statistics-canada',
    title: 'Consumer Price Index',
    kind: 'dataset',
    published: null,
    summary: 'The index behind a severity trend, by basket component and by province.',
    docPath: docPath('statistics-canada', 'consumer-price-index'),
    sample: true,
    practiceAreas: ['pc', 'life', 'pensions'],
    functions: ['pricing', 'reserving'],
    assumptions: [
      { label: 'Inflation index', locator: 'Series and basket component' },
      { label: 'Trend measurement period', locator: 'Series date range' },
    ],
  },
  {
    id: 'statcan-life-tables',
    entityId: 'statistics-canada',
    title: 'Life tables, Canada, provinces and territories',
    kind: 'dataset',
    published: null,
    summary: 'Population mortality by jurisdiction, age and sex — the base an insured table is set against.',
    docPath: docPath('statistics-canada', 'life-tables'),
    sample: true,
    practiceAreas: ['life', 'pensions'],
    functions: ['pricing', 'reserving', 'financial-reporting'],
    assumptions: [
      { label: 'Population mortality basis', locator: 'Life table, jurisdiction and sex' },
      { label: 'Exposure period', locator: 'Table reference period' },
    ],
  },

  /* ----------------------------------------------------------------- CatIQ */
  {
    id: 'catiq-event-bulletins',
    entityId: 'catiq',
    title: 'Insured catastrophe loss estimates',
    kind: 'dataset',
    published: null,
    summary: 'Per-event insured losses, with the threshold and peril attribution that define them.',
    docPath: docPath('catiq', 'insured-loss-estimates'),
    sample: true,
    practiceAreas: ['pc', 'erm'],
    functions: ['pricing', 'reserving', 'capital'],
    assumptions: [
      { label: 'Catastrophe threshold', locator: 'Event bulletin, qualifying criteria' },
      { label: 'Event loss basis', locator: 'Event bulletin, insured loss estimate' },
    ],
  },
  {
    id: 'catiq-annual-review',
    entityId: 'catiq',
    title: 'Annual catastrophe loss review',
    kind: 'report',
    published: null,
    summary: 'The year’s events gathered into one series — what a catastrophe load is argued from.',
    docPath: docPath('catiq', 'annual-loss-review'),
    sample: true,
    practiceAreas: ['pc', 'erm'],
    functions: ['pricing', 'capital', 'advisory'],
    assumptions: [{ label: 'Annual insured catastrophe loss', locator: 'Annual review, loss summary' }],
  },

  /* --------------------------------------------------- Facility Association */
  {
    id: 'fa-rate-filings',
    entityId: 'facility-association',
    title: 'Residual market rate filings',
    kind: 'filing',
    published: null,
    summary: 'The indicated and approved rate level for the risks the voluntary market declines.',
    docPath: docPath('facility-association', 'residual-market-rate-filings'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['pricing', 'reserving'],
    assumptions: [
      { label: 'Residual market rate level', locator: 'Filing, indicated rate change' },
      { label: 'Territory and class definitions', locator: 'Filing, rating structure' },
    ],
  },
  {
    id: 'fa-bulletins',
    entityId: 'facility-association',
    title: 'Member and broker bulletins',
    kind: 'bulletin',
    published: null,
    summary: 'The running series that changes who the residual market takes, and on what terms.',
    docPath: docPath('facility-association', 'member-bulletins'),
    sample: true,
    practiceAreas: ['pc'],
    functions: ['underwriting', 'pricing'],
    assumptions: [{ label: 'Residual market eligibility rules', locator: 'Applicable bulletin' }],
  },

  /* ---------------------------------------------------------- MSA Research */
  {
    id: 'msa-legend',
    entityId: 'msa-research',
    title: 'Legend of P&C key performance indicators',
    kind: 'dataset',
    published: '2023',
    summary: 'How MSA defines each ratio — the definitions a peer comparison has to be read under.',
    wikiRef: { kind: 'resource', name: 'MSA Legend' },
    practiceAreas: ['pc'],
    functions: ['financial-reporting', 'reserving', 'advisory'],
    assumptions: [
      { label: 'KPI definitions', locator: 'Legend, ratio definitions' },
      { label: 'Peer comparison basis', locator: 'Legend, company groupings' },
    ],
  },
  {
    id: 'msa-researcher',
    entityId: 'msa-research',
    title: 'MSA Researcher — Canadian insurer financial database',
    kind: 'dataset',
    published: null,
    summary: 'Filed financial results for the Canadian market, company by company and in aggregate.',
    docPath: docPath('msa-research', 'msa-researcher'),
    sample: true,
    practiceAreas: ['pc', 'life'],
    functions: ['financial-reporting', 'reserving', 'capital'],
    assumptions: [
      { label: 'Peer group definition', locator: 'Company selection' },
      { label: 'Industry benchmark ratios', locator: 'Aggregate exhibits' },
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
