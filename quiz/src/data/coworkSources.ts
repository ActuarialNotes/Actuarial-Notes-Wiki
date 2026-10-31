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
 *
 * Most real documents are not authored here at all. Every resource page a
 * practitioner would cite is read off the vault at build time
 * (`virtual:cowork-vault`, `lib/coworkVault.ts`) and filed under the entity
 * `PUBLISHER_ENTITY` names for its `Publisher:` — so a new resource page joins
 * Cowork by being written. An authored entry below wins over the derived one
 * for the same page: it is where a document's assumptions and table are said.
 */

import type { SourceEntity, SourceResource } from '@/lib/coworkSources'
import { vaultResource } from '@/lib/coworkVault'
import vaultDocuments from 'virtual:cowork-vault'

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
  {
    id: 'iaa',
    name: 'International Actuarial Association',
    short: 'IAA',
    category: 'standards',
    jurisdiction: 'Global',
    about:
      'The worldwide association of professional actuarial associations. Its International Standards of Actuarial Practice are the model national standards are adopted from, and its notes on IFRS 17 and insurer capital are where the profession’s international position is written down.',
    site: 'https://actuaries.org',
    /** transcribed: “Founded in 1895” (actuaries.org/about) */
    established: '1895',
    logo: 'https://actuaries.org/app/uploads/2024/12/cropped-IAA-Favicon-180x180.jpg',
    practiceAreas: ['life', 'pc', 'pensions', 'erm'],
  },
  {
    id: 'naic',
    name: 'National Association of Insurance Commissioners',
    short: 'NAIC',
    category: 'regulator',
    jurisdiction: 'United States',
    about:
      'The US standard-setting organization governed by the chief insurance regulators of the states and territories. Its model laws, statutory accounting principles, annual statement blanks and risk-based capital formulas are what a US insurer files against, so a US reserving or capital deliverable is shaped by something the NAIC wrote.',
    site: 'https://content.naic.org',
    /** transcribed: “Founded in 1871” (content.naic.org/about) */
    established: '1871',
    practiceAreas: ['pc', 'life', 'erm'],
  },
  {
    id: 'aaa',
    name: 'American Academy of Actuaries',
    short: 'AAA',
    category: 'standards',
    jurisdiction: 'United States',
    about:
      'The nonprofit, nonpartisan professional association representing actuaries in the US. It sets the qualification standards a US actuary signs a statement of opinion under, and its practice notes and public-policy papers are the profession’s view on how a statutory requirement is met.',
    site: 'https://actuary.org',
    /** transcribed: “Established in 1965” (actuary.org/about) */
    established: '1965',
    logo: 'https://actuary.org/wp-content/uploads/2025/02/favicon.png',
    practiceAreas: ['life', 'pc', 'pensions', 'erm'],
  },
  {
    id: 'milliman',
    name: 'Milliman',
    short: 'MILL',
    category: 'consulting',
    jurisdiction: 'Global',
    about:
      'An independent actuarial and risk consulting firm with offices around the world. Its published research and benchmark studies, on pension funding, reserving and health cost, are among the most widely cited consultant work in actuarial practice.',
    site: 'https://www.milliman.com',
    /** transcribed: founded 1947 (us.milliman.com/en/our-story) */
    established: '1947',
    logo: 'https://www.milliman.com/favicon.ico',
    practiceAreas: ['life', 'pc', 'pensions', 'erm'],
  },
  {
    id: 'mckinsey',
    name: 'McKinsey & Company',
    short: 'McK',
    category: 'consulting',
    jurisdiction: 'Global',
    about:
      'A global management consultancy, owned and governed by its partners. Its insurance-practice reports on industry economics, growth and risk are a common outside view a strategy or ERM discussion cites.',
    site: 'https://www.mckinsey.com',
    practiceAreas: ['pc', 'life', 'erm'],
  },
  {
    id: 'fsco',
    name: 'Financial Services Commission of Ontario',
    short: 'FSCO',
    category: 'regulator',
    jurisdiction: 'Ontario',
    about:
      'Ontario’s former regulator of insurance, pensions and other financial services, replaced by FSRA in 2019. Its auto-insurance rate decisions, bulletins and pension policies are still the record of how Ontario regulated before FSRA, and an older filing or reform history cites them.',
    site: 'https://www.fsco.gov.on.ca',
    /** established 1 July 1998 under the Financial Services Commission of Ontario Act, 1997 (Ministry of Finance agency listing, archived fin.gov.on.ca); its website is decommissioned and points to FSRA */
    established: '1998',
    practiceAreas: ['pc', 'life', 'pensions'],
  },
  {
    id: 'capsa',
    name: 'Canadian Association of Pension Supervisory Authorities',
    short: 'CAPSA',
    category: 'regulator',
    jurisdiction: 'Canada',
    about:
      'The national association of Canada’s pension regulators, whose mission is an efficient and effective pension regulatory system. Its guidelines on capital accumulation plans, plan governance and risk management are what every jurisdiction’s regulator expects a pension plan to follow.',
    site: 'https://www.capsa-acor.org',
    logo: 'https://www.capsa-acor.org/images/CAPSA/favicon-32x32.png?v=ESq3BeTGcqCySbreK58CQ1K6uNVsvQ0XDQ0QNDoYYgs',
    practiceAreas: ['pensions'],
  },
  {
    id: 'kings-printer-ontario',
    name: 'King’s Printer for Ontario',
    short: 'KPO',
    category: 'regulator',
    jurisdiction: 'Ontario',
    about:
      'The publisher of Ontario’s statutes and regulations, served on e-Laws. Under the Legislation Act, 2006, an e-Laws copy is an official copy of the law, so this is where an Ontario auto, insurance or pension requirement is quoted from.',
    site: 'https://www.ontario.ca/laws',
    logo: 'https://www.ontario.ca/themes/ontario_2021/favicon.ico',
    practiceAreas: ['pc', 'life', 'pensions'],
  },
  {
    id: 'ifoa',
    name: 'Institute and Faculty of Actuaries',
    short: 'IFoA',
    category: 'standards',
    jurisdiction: 'United Kingdom',
    about:
      'The UK’s only chartered professional body for actuaries, educating, developing and regulating actuaries in the UK and internationally. Its research, working-party papers and the Annals and British Actuarial Journal are a deep source on reserving, capital and longevity.',
    site: 'https://actuaries.org.uk',
    /** transcribed: the Institute of Actuaries (1848) and the Faculty of Actuaries “merged in 2010 to form the Institute and Faculty of Actuaries” (blog.actuaries.org.uk, “Happy birthday to us”) */
    established: '2010',
    logo: 'https://actuaries.org.uk/images/favicon/favicon-196.png',
    practiceAreas: ['life', 'pc', 'pensions', 'erm'],
  },
  {
    id: 'bma',
    name: 'Bermuda Monetary Authority',
    short: 'BMA',
    category: 'regulator',
    jurisdiction: 'Bermuda',
    about:
      'The regulator of Bermuda’s financial services sector, which supervises, regulates and inspects the insurers operating there. A large share of the world’s reinsurance and capital-market risk transfer is written out of Bermuda, so its solvency regime and capital rules govern a large share of the reinsurance a P&C deliverable relies on.',
    site: 'https://www.bma.bm',
    /** transcribed: “The Authority was established by statute in 1969” (bma.bm/about-us) */
    established: '1969',
    practiceAreas: ['pc', 'life', 'erm'],
  },
  {
    id: 'clhia',
    name: 'Canadian Life and Health Insurance Association',
    short: 'CLHIA',
    category: 'industry-data',
    jurisdiction: 'Canada',
    about:
      'The not-for-profit association representing 99% of Canada’s life and health insurance companies. Its industry facts and guidelines are the published picture of the Canadian life and health market, and the reference for its practice standards.',
    site: 'https://www.clhia.ca',
    logo: 'https://www.clhia.ca/favicon.ico',
    practiceAreas: ['life'],
  },
  {
    id: 'crs',
    name: 'Congressional Research Service',
    short: 'CRS',
    category: 'regulator',
    jurisdiction: 'United States',
    about:
      'The research agency in the Library of Congress that serves as shared staff to congressional committees and Members of Congress. Its nonpartisan reports set out the federal statutes behind flood insurance, terrorism risk insurance and retirement plans, with their history, in plain terms.',
    site: 'https://www.congress.gov',
    practiceAreas: ['pc', 'life', 'pensions'],
  },
  {
    id: 'fasb',
    name: 'Financial Accounting Standards Board',
    short: 'FASB',
    category: 'standards',
    jurisdiction: 'United States',
    about:
      'The independent, private-sector standard setter for US GAAP. Long-duration targeted improvements (LDTI), short-duration contract disclosures and pension accounting all come from FASB updates, so a US GAAP reserve or benefit-obligation figure is measured under its standards.',
    site: 'https://www.fasb.org',
    /** transcribed: “Established in 1973, the Financial Accounting Standards Board (FASB) is the independent, private-sector, not-for-profit organization …” (About the FASB, storage.fasb.org, April 2025) */
    established: '1973',
    practiceAreas: ['life', 'pc', 'pensions'],
  },
  {
    id: 'government-of-alberta',
    name: 'Government of Alberta',
    short: 'GoA',
    category: 'regulator',
    jurisdiction: 'Alberta',
    about:
      'The provincial government, whose legislation and ministries set Alberta’s automobile insurance system and its pension law. An Alberta auto reform or a provincial policy review is announced and documented here before it reaches a rate filing.',
    site: 'https://www.alberta.ca',
    logo: 'https://www.alberta.ca/themes/custom/goa_core/favicon.ico',
    practiceAreas: ['pc', 'pensions'],
  },
  {
    id: 'kpmg',
    name: 'KPMG',
    short: 'KPMG',
    category: 'consulting',
    jurisdiction: 'Global',
    about:
      'A global organization of independent firms providing audit, tax and advisory services. Its insurance-accounting publications, on IFRS 17 in particular, are widely used guides to how a standard is applied in practice, and it audits many insurers.',
    site: 'https://kpmg.com',
    logo: 'https://kpmg.com/etc.clientlibs/kpmg/clientlibs/clientlib-site/resources/images/favicons/apple-touch-icon-180x180.png',
    practiceAreas: ['life', 'pc', 'pensions', 'erm'],
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    short: 'DT',
    category: 'consulting',
    jurisdiction: 'Global',
    about:
      'The network of member firms of Deloitte Touche Tohmatsu Limited, providing audit, consulting, tax and advisory services. Its insurance-industry outlooks and accounting guides are a common outside reference for market conditions and for how a new standard lands.',
    site: 'https://www.deloitte.com',
    logo: 'https://www.deloitte.com/content/dam/assets-shared/icons/us/apple-icon-144x144.png',
    practiceAreas: ['life', 'pc', 'pensions', 'erm'],
  },
  {
    id: 'ey',
    name: 'EY',
    short: 'EY',
    category: 'consulting',
    jurisdiction: 'Global',
    about:
      'The global organization of the member firms of Ernst & Young Global Limited, providing assurance, tax and consulting services. Its insurance outlooks and IFRS 17 publications are among the guides practitioners read on how the standard is applied.',
    site: 'https://www.ey.com',
    logo: 'https://www.ey.com/content/dam/ey-unified-site/icon/ey-favicon.jpg',
    practiceAreas: ['life', 'pc', 'pensions', 'erm'],
  },
  {
    id: 'geneva-association',
    name: 'The Geneva Association',
    short: 'GA',
    category: 'industry-data',
    jurisdiction: 'Global',
    about:
      'The only international association of insurance companies, and the think tank for the global insurance industry. Its research on protection gaps, climate risk and systemic risk is the industry’s own published position on the questions regulators are asking it.',
    site: 'https://www.genevaassociation.org',
    /** transcribed: “Founded in 1973, the Geneva Association is the only international association of insurance companies” (genevaassociation.org/about-us) */
    established: '1973',
    logo: 'https://www.genevaassociation.org/sites/default/files/GA_logo_2.png',
    practiceAreas: ['pc', 'life', 'erm'],
  },
  {
    id: 'cro-forum',
    name: 'CRO Forum',
    short: 'CROF',
    category: 'industry-data',
    jurisdiction: 'Europe',
    about:
      'A group of chief risk officers from major European insurers that develops and promotes industry best practice in risk management. Its papers on emerging risks, internal models and risk taxonomy are a practitioner baseline an ERM framework is compared against.',
    site: 'https://www.thecroforum.org',
    practiceAreas: ['erm'],
  },
  {
    id: 'gao',
    name: 'U.S. Government Accountability Office',
    short: 'GAO',
    category: 'regulator',
    jurisdiction: 'United States',
    about:
      'The independent, nonpartisan “congressional watchdog” that works for Congress. Its audits of federal programs, such as the National Flood Insurance Program, crop insurance and pension insurance, put on record what a federal insurance scheme costs and where it falls short.',
    site: 'https://www.gao.gov',
    /** transcribed: “The Budget and Accounting Act of 1921 formed GAO” (gao.gov/about) */
    established: '1921',
    practiceAreas: ['pc', 'life', 'pensions'],
  },
  {
    id: 'retraite-quebec',
    name: 'Retraite Québec',
    short: 'RQ',
    category: 'regulator',
    jurisdiction: 'Québec',
    about:
      'The Québec agency that administers the Québec Pension Plan and the public-sector pension plans, and supervises supplemental pension plans. A pension deliverable in Québec works from its rules, and the QPP’s actuarial reports come from here.',
    site: 'https://www.retraitequebec.gouv.qc.ca',
    /** transcribed: “Since 1 January 2016, the Commission administrative des régimes de retraite et d’assurances (CARRA) and the Régie des rentes du Québec (RRQ) have been operating as one agency under the name of Retraite Québec” (retraitequebec.gouv.qc.ca) */
    established: '2016',
    logo: 'https://www.retraitequebec.gouv.qc.ca/profiles/custom/miza_wingsuit/themes/wingsuit/apps/drupal/favicon.ico',
    practiceAreas: ['pensions'],
  },
  {
    id: 'ifrs-foundation',
    name: 'IFRS Foundation',
    short: 'IFRS',
    category: 'standards',
    jurisdiction: 'Global',
    about:
      'The independent, not-for-profit organisation that sets the financial reporting standards used around the world, through the IASB. IFRS 17 Insurance Contracts is its standard, so every Canadian insurer’s liability measurement starts from a text it published.',
    site: 'https://www.ifrs.org',
    /** transcribed: “Since its creation in 2001” (ifrs.org/about-us/who-we-are) */
    established: '2001',
    logo: 'https://www.ifrs.org/etc.clientlibs/ifrs/clientlibs/clientlib-resource/resources/images/favicon.ico',
    practiceAreas: ['life', 'pc', 'erm'],
  },
  {
    id: 'iais',
    name: 'International Association of Insurance Supervisors',
    short: 'IAIS',
    category: 'standards',
    jurisdiction: 'Global',
    about:
      'The global standard-setting body for insurance supervision, whose mission is effective and globally consistent supervision and global financial stability. Its Insurance Core Principles and the Insurance Capital Standard are what national regimes, OSFI’s among them, are assessed against.',
    site: 'https://www.iais.org',
    /** transcribed: “Established in 1994” (iais.org/about-the-iais/what-we-do) */
    established: '1994',
    logo: 'https://www.iais.org/favicon.ico?v=4',
    practiceAreas: ['pc', 'life', 'erm'],
  },
  {
    id: 'ontario-ministry-of-finance',
    name: 'Ontario Ministry of Finance',
    short: 'ONFIN',
    category: 'regulator',
    jurisdiction: 'Ontario',
    about:
      'The ministry leading Ontario’s fiscal, tax, economic and statistics policy. Auto-insurance reform and pension policy in Ontario are announced by the ministry, and FSRA reports to it, so a coming change to Ontario’s rules first appears in its budgets and consultations.',
    site: 'https://www.ontario.ca/page/ministry-finance',
    logo: 'https://www.ontario.ca/themes/ontario_2021/assets/favicon/apple-touch-icon.png',
    practiceAreas: ['pc', 'pensions'],
  },
  {
    id: 'swiss-re',
    name: 'Swiss Re',
    short: 'SR',
    category: 'insurer',
    jurisdiction: 'Global',
    about:
      'A global reinsurer headquartered in Zurich. Its sigma research, on catastrophe losses, insurance market growth and the protection gap, is the most widely cited published series on the world insurance market.',
    site: 'https://www.swissre.com',
    logo: 'https://www.swissre.com/.resources/swissre-web/webresources/img/graphics/apple-touch-icon.png',
    practiceAreas: ['pc', 'life', 'erm'],
  },
  {
    id: 'aon',
    name: 'Aon',
    short: 'AON',
    category: 'consulting',
    jurisdiction: 'Global',
    about:
      'A global professional services firm in risk, retirement and health. Its reinsurance market reports and catastrophe reviews are a standard outside view of reinsurance pricing and global cat losses.',
    site: 'https://www.aon.com',
    logo: 'https://www.aon.com/lib/icons/favicon.png',
    practiceAreas: ['pc', 'life', 'pensions', 'erm'],
  },
  {
    id: 'guy-carpenter',
    name: 'Guy Carpenter',
    short: 'GC',
    category: 'consulting',
    jurisdiction: 'Global',
    about:
      'The reinsurance intermediary of Marsh McLennan, now operating as Marsh Re. Its reinsurance pricing indexes and renewal reports are a standard published view of how much reinsurance costs at each renewal.',
    site: 'https://www.guycarp.com',
    /** transcribed: Guy Carpenter’s “100 Years” page dates the firm 1922–2022, “incorporating his namesake company in 1922” (guycarp.com/company/100-years.html) */
    established: '1922',
    logo: 'https://www.guycarp.com/content/dam/enterprise/favicon-marsh-sky-blue-48px.svg',
    practiceAreas: ['pc', 'erm'],
  },
  {
    id: 'oecd',
    name: 'Organisation for Economic Co-operation and Development',
    short: 'OECD',
    category: 'industry-data',
    jurisdiction: 'Global',
    about:
      'The international organisation of member economies, based in Paris, that publishes comparable statistics and policy analysis. Its pension-market and insurance statistics, and its work on pension design, are the cross-country benchmark a pensions or market discussion reaches for.',
    site: 'https://www.oecd.org',
    practiceAreas: ['pensions', 'pc', 'erm'],
  },
]

/**
 * The documents. `wikiRef` entries name real vault pages by their repo path;
 * `sample` entries name a class of document and carry no date or link.
 */
const AUTHORED_RESOURCES: SourceResource[] = [
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
    id: 'fsra-ppa-loss-trend-benchmarks',
    entityId: 'fsra',
    title: 'Private passenger automobile loss trend benchmarks (data as of December 31, 2024)',
    kind: 'guideline',
    /** the edition applies to rate filings submitted on or after 11 December 2025 */
    published: '2025-12-11',
    summary: 'The benchmark loss trend rates — past trend and a range of future trends, by coverage — and reform factors FSRA reviews an Ontario auto rate filing against.',
    wikiRef: {
      kind: 'resource',
      name: 'FSRA Private Passenger Automobile Loss Trend Benchmarks (2025)',
      path: 'Resources/Benchmarks/FSRA Private Passenger Automobile Loss Trend Benchmarks (2025).md',
    },
    url: 'https://www.fsrao.ca/industry/auto-insurance/regulatory-framework/guidance-auto-insurance/ontario-private-passenger-automobile-annual-review-based-industry-data-december-31-2024-0',
    practiceAreas: ['pc'],
    functions: ['pricing'],
    assumptions: [
      { label: 'Loss trend, by coverage', locator: 'Loss trend benchmarks: past trend' },
      { label: 'Future trend range, by coverage', locator: 'Loss trend benchmarks: future trend' },
      { label: 'Reform factors, by coverage', locator: 'Reform factors' },
      { label: 'Experience basis', value: 'GISA Ontario PPA industry data as of December 31, 2024', locator: 'Guidance, data' },
    ],
    // The figures are not transcribed: FSRA's page could not be read when this
    // entry was written. The rows are its coverages; the reader fills in the
    // rates from FSRA's page on the workflow step.
    table: {
      locator: 'Loss trend benchmarks, by coverage',
      columns: ['Coverage', 'Past trend', 'Future trend, low', 'Future trend, high'],
      rows: [
        'Bodily Injury',
        'Property Damage',
        'Direct Compensation – Property Damage',
        'Accident Benefits – Total',
        'Uninsured Automobile',
        'Collision',
        'Comprehensive',
      ].map(coverage => [coverage, '', '', '']),
    },
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
    title: 'Standard Filing (Approach No. AU0126APP)',
    kind: 'guideline',
    published: '2019-10-09',
    summary: 'FSRA’s modified file-and-use route for an Ontario private passenger auto rate change: who qualifies, what may change, and what the filing carries.',
    wikiRef: { kind: 'resource', name: 'FSRA Standard Filing', path: 'Resources/Regulation/FSRA Standard Filing.md' },
    url: 'https://www.fsrao.ca/industry/auto-insurance/regulatory-framework/guidance-auto-insurance/standard-filing',
    practiceAreas: ['pc'],
    functions: ['pricing'],
    assumptions: [
      { label: 'Filing path', value: 'Standard Filing (overall rate level change ≤ 5.0%, ≤ 15.0% to any one customer at renewal)', locator: 'Process and Practices, Standard filing eligibility' },
      { label: 'Required exhibits', locator: 'Process and Practices, Submitting filing contents' },
    ],
  },

  /* -------------------------------------------------------------------- AMF */
  {
    id: 'amf-capital-guideline-pc',
    entityId: 'amf',
    title: 'Guideline on Capital Adequacy Requirements — Property and Casualty Insurance (January 2025)',
    kind: 'guideline',
    published: '2025',
    summary: 'Québec’s own Minimum Capital Test for P&C (“damage”) insurers authorized in Québec: capital available, the risk margins, and the 100% minimum and 150% intervention target ratios.',
    wikiRef: { kind: 'resource', name: 'AMF Capital Adequacy Guideline (2025)', path: 'Resources/Regulation/AMF Capital Adequacy Guideline (2025).md' },
    url: 'https://lautorite.qc.ca/fileadmin/lautorite/reglementation/lignes-directrices-assurance/ld_tcm_01_2025_an.pdf',
    practiceAreas: ['pc', 'erm'],
    functions: ['capital', 'financial-reporting'],
    assumptions: [
      { label: 'Capital basis', value: 'MCT (AMF guideline)', locator: 'Guideline, s. 1.1.2 Scope of application' },
      { label: 'Intervention target capital ratio', value: '150%', locator: 'Guideline, s. 1.3.1' },
      { label: 'Minimum MCT ratio', value: '100%', locator: 'Guideline, s. 1.3.1' },
      { label: 'Internal capital target ratio', locator: 'Guideline, s. 1.3.1 (set by the insurer, above 150%)' },
    ],
  },
  {
    id: 'amf-sound-commercial-practices',
    entityId: 'amf',
    title: 'Sound Commercial Practices Guideline',
    kind: 'guideline',
    published: '2022',
    summary: 'The AMF’s expected outcomes for the fair treatment of clients, from governance and product design through disclosure, claims settlement and complaints.',
    wikiRef: { kind: 'resource', name: 'AMF Sound Commercial Practices Guideline (2022)', path: 'Resources/Regulation/AMF Sound Commercial Practices Guideline (2022).md' },
    url: 'https://lautorite.qc.ca/fileadmin/lautorite/reglementation/lignes-directrices-assurance/ligne-directrice-saines-pratiques-commerciales_an.pdf',
    practiceAreas: ['pc', 'life'],
    functions: ['advisory', 'underwriting'],
    assumptions: [
      { label: 'Market-conduct basis', value: 'Fair treatment of clients (FTC)', locator: 'Guideline, s. 1 and s. 5 Expected FTC outcomes' },
    ],
  },

  /* ------------------------------------------------------------------- AIRB */
  {
    id: 'airb-filing-guidelines',
    entityId: 'airb',
    title: 'Filing Guidelines for Change in Rates & Rating Programs',
    kind: 'guideline',
    published: '2025-10-01',
    summary: 'The Alberta prior approval and file and use filing types, when each applies under Ministerial Order 33/2025, and the eleven sections a filing carries.',
    wikiRef: { kind: 'resource', name: 'AIRB Filing Guidelines (2025)', path: 'Resources/Regulation/AIRB Filing Guidelines (2025).md' },
    url: 'https://www.airbfordrivers.ca/wp-content/uploads/2026/06/Filing-Guidelines-October-1-2025.pdf',
    practiceAreas: ['pc'],
    functions: ['pricing'],
    assumptions: [
      { label: 'Filing path', locator: 'A. General Information, Determining the Applicable Filing Type' },
      { label: 'Required exhibits', locator: 'Filing Format; C. Guidelines for Each Section of the Filing' },
    ],
  },
  {
    id: 'airb-annual-review',
    entityId: 'airb',
    title: '2026 Annual Review Report',
    kind: 'report',
    published: '2026',
    summary: 'The AIRB’s industry benchmarks — loss development, loss trends, expenses, health cost recovery and profit — for Alberta auto rate filings received on or after October 1, 2026.',
    wikiRef: { kind: 'resource', name: 'AIRB Annual Review Report (2026)', path: 'Resources/Reports/AIRB Annual Review Report (2026).md' },
    url: 'https://www.airbfordrivers.ca/wp-content/uploads/2026/09/Annual-Review-Report-2026.pdf',
    practiceAreas: ['pc'],
    functions: ['pricing', 'advisory'],
    assumptions: [
      { label: 'Industry loss trend, by coverage', locator: 'Industry Benchmarks, Loss Trends (PPV table, 2026 Annual Review column)' },
      { label: 'Loss development factors', locator: 'Industry Benchmarks, Loss Development Factors (RCS final report, Appendix A)' },
      { label: 'Total expenses (IFRS 4 basis)', value: '27.8%', locator: 'Industry Benchmarks, Operating Expenses & ULAE' },
      { label: 'Profit provision', value: '6.0% of premium', locator: 'Industry Benchmarks, Profit' },
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
    title: '2024 Annual Statement on Market Conduct Public Report',
    kind: 'report',
    /** printed "October 2025" */
    published: '2025',
    summary: 'CCIR’s pan-Canadian read of the 2024 Annual Statement on Market Conduct filings — distribution, commissions, cancellations, claims and complaints, by sector.',
    wikiRef: { kind: 'resource', name: 'CCIR ASMC Public Report (2024)', path: 'Resources/Reports/CCIR ASMC Public Report (2024).md' },
    url: 'https://www.ccir-ccrra.org/Documents/View/4000',
    practiceAreas: ['pc', 'life'],
    functions: ['financial-reporting', 'advisory'],
    assumptions: [
      { label: 'Market-conduct reporting basis', locator: 'Background, What is the ASMC?' },
      { label: 'P&C cancellation and non-renewal ratios', locator: 'Results, Policies, P&C Ratios' },
    ],
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
    title: 'RPEC 2026 Mortality Improvement Update',
    kind: 'report',
    published: '2026',
    summary: 'RPEC’s 2026 analysis of U.S. population mortality: ages 65+ are back to what MP-2021 projects, no new scale in 2026, and MP-2021 remains its best-estimate improvement scale for retirement plan valuations.',
    wikiRef: {
      kind: 'resource',
      name: 'RPEC 2026 Mortality Improvement Update (SOA - 2026)',
      path: 'Resources/Reports/RPEC 2026 Mortality Improvement Update (SOA - 2026).md',
    },
    url: 'https://www.soa.org/resources/research-reports/2026/rpec-mortality-improvement-update/',
    practiceAreas: ['life', 'pensions'],
    functions: ['pricing', 'reserving', 'financial-reporting'],
    assumptions: [
      { label: 'Mortality improvement scale', value: 'MP-2021', locator: 'Executive Summary; Section 1' },
      { label: 'Actual-to-expected mortality, ages 65+ (July 2025–June 2026)', value: '98.7%', locator: 'Executive Summary' },
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
    title: 'Fires, floods and storms: $3.7 billion in insured damage makes summer 2026 third worst on record',
    kind: 'news',
    published: '2026-10-22',
    summary: 'IBC’s release of CatIQ’s estimate of Canada’s summer 2026 insured severe-weather losses — more than $3.7 billion, the third-costliest summer on record — with the decade averages behind it.',
    wikiRef: {
      kind: 'resource',
      name: 'IBC Summer 2026 Severe Weather Insured Losses (2026)',
      path: 'Resources/Reports/IBC Summer 2026 Severe Weather Insured Losses (2026).md',
    },
    url: 'https://www.ibc.ca/news-insights/news/fires-floods-and-storms-three-point-seven-billion-in-insured-damage-makes-summer-2026-third-worst-on-record',
    practiceAreas: ['pc', 'erm'],
    functions: ['pricing', 'reserving', 'capital'],
    assumptions: [
      { label: 'Industry insured losses, summer 2026', value: 'More than $3.7 billion (CatIQ estimate)', locator: 'Release, first section' },
      { label: 'Catastrophe load basis', value: 'Average annual extreme-weather insured losses over the last decade: more than $3.7 billion', locator: 'Rising costs of extreme weather in Canada' },
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
    title: 'Why Insurers Fail — Mapping the road to ruin: lessons learned from four recent insurer failures',
    kind: 'report',
    published: '2022',
    summary: 'PACICC’s case study of four recent P&C failures (Gefion, CBL, Anbang, Merced), confirming the three common causes of insurer failure and adding natural disasters as a fourth.',
    wikiRef: { kind: 'resource', name: 'PACICC Why Insurers Fail - Mapping the Road to Ruin (2022)', path: 'Resources/Reports/PACICC Why Insurers Fail - Mapping the Road to Ruin (2022).md' },
    url: 'https://www.pacicc.ca/wp-content/uploads/Why-Insurers-Fail-Mapping-the-road-to-ruin-2022.pdf',
    practiceAreas: ['erm', 'pc'],
    functions: ['capital', 'advisory'],
    assumptions: [
      { label: 'Failure-cause taxonomy', value: 'Internal operations; organizational structure; adequacy of regulatory oversight; natural disasters', locator: 'Executive summary; Table 1 Causes of insurer failures' },
    ],
  },

  /* ------------------------------------------------------------------ GISA */
  {
    id: 'gisa-auto-exhibits',
    entityId: 'gisa',
    title: '2025 Actual Loss Ratio Exhibit — Private Passenger Automobile Excluding Farmers, Ontario (AUTO1005-ON)',
    kind: 'dataset',
    published: '2026-07-20',
    summary: 'All-industry Ontario private passenger auto experience by coverage and accident year 2021–2025 — vehicles, premiums, claims, frequency, severity and loss ratios — with GISA’s development and ULAE factors.',
    wikiRef: { kind: 'resource', name: 'GISA AUTO1005-ON Actual Loss Ratio Exhibit (2025)', path: 'Resources/Data/GISA AUTO1005-ON Actual Loss Ratio Exhibit (2025).md' },
    url: 'https://www.gisa.ca/Documents/View/6325',
    practiceAreas: ['pc'],
    functions: ['pricing', 'reserving'],
    assumptions: [
      { label: 'Industry benchmark experience', locator: 'Exhibit, Private Passenger Excluding Farmers: by coverage and accident year' },
      { label: 'Loss development benchmark', locator: 'Notes to Users: Implied Age-to-Ultimate Development Factors (pp. 10–11)' },
      { label: 'ULAE factor, accident year 2025', value: '1.1189', locator: 'Notes to Users: Other Factors, 1 Unallocated Loss Adjustment Expense Factors (p. 12)' },
    ],
  },

  /* --------------------------------------------------------- Bank of Canada */
  {
    id: 'boc-yield-curves',
    entityId: 'bank-of-canada',
    title: 'Selected benchmark bond yields',
    kind: 'dataset',
    published: '2026',
    summary: 'The Bank’s daily yields on benchmark Government of Canada bonds at 2, 3, 5, 7 and 10 years, long-term and the Real Return Bond — the risk-free reference curve a discounted liability is measured against.',
    wikiRef: {
      kind: 'resource',
      name: 'Bank of Canada Selected Benchmark Bond Yields',
      path: 'Resources/Data/Bank of Canada Selected Benchmark Bond Yields.md',
    },
    url: 'https://www.bankofcanada.ca/rates/interest-rates/canadian-bonds/',
    practiceAreas: ['pc', 'life', 'pensions', 'erm'],
    functions: ['reserving', 'financial-reporting', 'capital'],
    assumptions: [
      { label: 'Risk-free reference curve', value: 'Government of Canada benchmark bond yields (Bank of Canada)', locator: 'Valet group bond_yields_benchmark: 2-, 3-, 5-, 7-, 10-year and long-term series' },
      { label: 'Discount rate basis', locator: 'Selected series, valuation date' },
      { label: 'Current 10-year benchmark issue', value: '2036.06.01, 3.25% (effective 2026.06.23)', locator: 'Selected bond yields page, current benchmark bond issues' },
    ],
  },
  {
    id: 'boc-monetary-policy-report',
    entityId: 'bank-of-canada',
    title: 'Monetary Policy Report — October 2026',
    kind: 'report',
    published: '2026-10-28',
    summary: 'The Governing Council’s quarterly base-case projection for Canadian inflation and growth and its assessment of risks — the outside view a trend selection answers to.',
    wikiRef: {
      kind: 'resource',
      name: 'Bank of Canada Monetary Policy Report (October 2026)',
      path: 'Resources/Reports/Bank of Canada Monetary Policy Report (October 2026).md',
    },
    url: 'https://www.bankofcanada.ca/publications/mpr/mpr-2026-10-28/',
    practiceAreas: ['pc', 'life', 'erm'],
    functions: ['pricing', 'reserving', 'advisory'],
    assumptions: [
      { label: 'Inflation outlook', value: 'CPI 3.4% (2026Q4), 2.6% (2027Q4), 2.1% (2028Q4), year over year', locator: 'Table 3: Summary of the quarterly projection for Canada' },
      { label: 'Economic scenario basis', locator: 'Risks; Tariff and other assumptions' },
      { label: 'Nominal neutral interest rate', value: 'Midpoint of its estimated range of 2.25% to 3.25%', locator: 'Tariff and other assumptions: Other assumptions' },
    ],
  },

  /* ------------------------------------------------------ Statistics Canada */
  {
    id: 'statcan-cpi',
    entityId: 'statistics-canada',
    title: 'Consumer Price Index, monthly, not seasonally adjusted (Table 18-10-0004-01)',
    kind: 'dataset',
    published: null,
    summary: 'The index behind a severity trend — all-items and basket components such as passenger vehicle insurance premiums, repairs, health care and shelter, monthly for Canada.',
    wikiRef: {
      kind: 'resource',
      name: 'Consumer Price Index, Canada (Statistics Canada)',
      path: 'Resources/Data/Consumer Price Index, Canada (Statistics Canada).md',
    },
    url: 'https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000401',
    practiceAreas: ['pc', 'life', 'pensions'],
    functions: ['pricing', 'reserving'],
    assumptions: [
      { label: 'Inflation index', locator: 'Table 18-10-0004-01, series and basket component (2002=100)' },
      { label: 'Trend measurement period', locator: 'Series date range (monthly, from 2000-01)' },
    ],
  },
  {
    id: 'statcan-life-tables',
    entityId: 'statistics-canada',
    title: 'Life expectancy and other elements of the complete life table, three-year estimates (Table 13-10-0114-01)',
    kind: 'dataset',
    published: '2026-01-13',
    summary: 'Population mortality for Canada and the provinces by age and sex — q_x, l_x and e_x from 0 to 110+ — the base an insured table is set against.',
    wikiRef: {
      kind: 'resource',
      name: 'Complete Life Table, Canada (Statistics Canada)',
      path: 'Resources/Data/Complete Life Table, Canada (Statistics Canada).md',
    },
    url: 'https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1310011401',
    practiceAreas: ['life', 'pensions'],
    functions: ['pricing', 'reserving', 'financial-reporting'],
    assumptions: [
      { label: 'Population mortality basis', value: 'Canada, three-year estimates, 2022–2024', locator: 'Table 13-10-0114-01, geography and sex' },
      { label: 'Exposure period', value: '2022–2024', locator: 'Table reference period' },
    ],
  },

  /* ----------------------------------------------------------------- CatIQ */
  {
    id: 'catiq-event-bulletins',
    entityId: 'catiq',
    title: 'CAD 466M – Final industry loss estimate for the Ontario and Quebec ice storm of March 2025',
    kind: 'bulletin',
    published: '2026-03-31',
    summary: 'CatIQ’s fifth and final insured loss estimate for the March 28–31, 2025 ice storm, one year after the event.',
    wikiRef: { kind: 'resource', name: 'CatIQ Ice Storm Final Loss Estimate (2026)', path: 'Resources/Reports/CatIQ Ice Storm Final Loss Estimate (2026).md' },
    url: 'https://public.catiq.com/2026/03/31/cad-466m-catiq-discloses-final-industry-loss-estimate-for-the-ontario-and-quebec-ice-storm-of-march-2025/',
    practiceAreas: ['pc', 'erm'],
    functions: ['pricing', 'reserving', 'capital'],
    assumptions: [
      { label: 'Event loss basis', value: 'CAD 466 million — property (commercial and residential) and vehicle claims, incl. additional loss adjustment expenses', locator: 'Release, first two paragraphs' },
    ],
  },
  {
    id: 'catiq-annual-review',
    entityId: 'catiq',
    title: 'Canadian insured losses from catastrophic events total CAD 2.4 B in 2025',
    kind: 'report',
    published: '2026-01-20',
    summary: 'CatIQ’s annual figure for 2025: CAD 2.4 billion insured, CAD 3.4 billion societal with ICLR’s uninsured estimate, and the year’s costliest event.',
    wikiRef: { kind: 'resource', name: 'CatIQ Canadian Insured Catastrophe Losses (2025)', path: 'Resources/Reports/CatIQ Canadian Insured Catastrophe Losses (2025).md' },
    url: 'https://public.catiq.com/2026/01/20/canadian-insured-losses-from-catastrophic-events-total-cad-2-4-b-in-2025-societal-losses-total-3-4-b/',
    practiceAreas: ['pc', 'erm'],
    functions: ['pricing', 'capital', 'advisory'],
    assumptions: [{ label: 'Annual insured catastrophe loss', value: 'CAD 2.4 billion (2025)', locator: 'Release, opening paragraph' }],
  },

  /* --------------------------------------------------- Facility Association */
  {
    id: 'fa-rate-filings',
    entityId: 'facility-association',
    title: 'Manual Bulletins 2026: Manual of Rules and Rates, Ontario',
    kind: 'bulletin',
    published: '2026',
    summary: 'The approved Ontario residual market rate changes and rule changes FA implemented in 2026, each with its effective dates.',
    wikiRef: { kind: 'resource', name: 'FA Ontario Manual Bulletins (2026)', path: 'Resources/Books/FA Ontario Manual Bulletins (2026).md' },
    url: 'https://www.facilityassociation.com/BrokerAgents/Resources/Manuals',
    practiceAreas: ['pc'],
    functions: ['pricing', 'underwriting'],
    assumptions: [
      { label: 'Residual market rate level (Ontario PPV)', value: '+8.7% overall, effective Oct 1, 2026 (NB) / Nov 1, 2026 (RN)', locator: 'Bulletin: Revised PPV and CV Rate Change + Various Rule Changes' },
      { label: 'Rating class definitions', locator: 'Summaries of approved rule changes (e.g. Rule 207.J, Rule 708)' },
    ],
  },
  {
    id: 'fa-bulletins',
    entityId: 'facility-association',
    title: 'Changes to FARM Private Passenger Vehicle Eligibility (AB.AGCY 2025-01)',
    kind: 'bulletin',
    published: '2025-11-04',
    summary: 'Which Alberta private passenger risks the residual market takes from 2026 — those a voluntary insurer has declined for Section C physical damage cover.',
    wikiRef: { kind: 'resource', name: 'FA FARM PPV Eligibility Bulletin (2025)', path: 'Resources/Books/FA FARM PPV Eligibility Bulletin (2025).md' },
    url: 'https://www.facilityassociation.com/api/download/1762274755733-ABAGCY202501_ChangestoFARMPPVEligibility.pdf',
    practiceAreas: ['pc'],
    functions: ['underwriting', 'pricing'],
    assumptions: [
      { label: 'Residual market eligibility rules', locator: 'Summary of Key Changes, Eligibility for Section C Coverage (Rule 107); Entry Criteria (Rule 100.A.1)' },
    ],
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
    title: '2025 Annual Report',
    kind: 'report',
    published: '2026',
    summary: 'Intact’s 2025 MD&A and audited statements: combined ratio, CAT losses and thresholds, prior-year development and the catastrophe reinsurance program.',
    wikiRef: { kind: 'resource', name: 'Intact Annual Report (2025)', path: 'Resources/Reports/Intact Annual Report (2025).md' },
    url: 'https://www.intactfc.com/presentations/Intact_AnnualReport_2025.pdf',
    practiceAreas: ['pc'],
    functions: ['financial-reporting', 'reserving', 'capital'],
    assumptions: [
      { label: 'Peer combined ratio', value: '88.2% (2025, consolidated)', locator: 'MD&A Section 2, Table 2.3 – Consolidated underwriting results' },
      { label: 'Peer prior-year development', value: 'Favourable PYD ratio 6.2% (2025)', locator: 'MD&A Table 2.3; Section 21.2 – Prior-year claims development' },
      { label: 'Catastrophe threshold', value: '$15 million per event in Canada, from January 1, 2026', locator: 'MD&A Section 8.2 – CAT thresholds' },
    ],
  },
  {
    id: 'intact-quarterly',
    entityId: 'intact',
    title: 'Q2-2026 Supplementary Financial Information',
    kind: 'report',
    published: '2026',
    summary: 'Intact’s quarterly statistical package: premiums, loss ratios, CAT losses and PYD by segment and line of business.',
    wikiRef: { kind: 'resource', name: 'Intact Supplementary Financial Information (Q2 2026)', path: 'Resources/Reports/Intact Supplementary Financial Information (Q2 2026).md' },
    url: 'https://www.intactfc.com/presentations/Q2-2026-Stats-Supplement.pdf',
    practiceAreas: ['pc'],
    functions: ['financial-reporting'],
    assumptions: [
      { label: 'Peer combined ratio by line', locator: 'Underwriting Results — combined ratio by segment and line of business' },
      { label: 'Peer prior-year development by line', locator: 'Net Catastrophe Losses and Prior Year Claims Development — total PYD by segment and line of business' },
    ],
  },

  /* -------------------------------------------------------------- Definity */
  {
    id: 'definity-annual-report',
    entityId: 'definity',
    title: '2025 Annual Report',
    kind: 'report',
    published: '2026',
    summary: 'Definity’s 2025 MD&A and audited statements, with the claims ratio split into core accident year, catastrophe and prior-year development.',
    wikiRef: { kind: 'resource', name: 'Definity Annual Report (2025)', path: 'Resources/Reports/Definity Annual Report (2025).md' },
    url: 'https://s28.q4cdn.com/441925426/files/doc_financials/2025/Annual/102233_Definity_AR_SEDAR.pdf',
    practiceAreas: ['pc'],
    functions: ['financial-reporting', 'reserving'],
    assumptions: [{ label: 'Peer combined ratio', value: '91.6% (2025)', locator: 'MD&A Section 3 – Financial Performance' }],
  },

  /* --------------------------------------------------- Canadian Underwriter */
  {
    id: 'cu-reform-coverage',
    entityId: 'canadian-underwriter',
    title: 'Optional benefits: what drivers are keeping and what they’re ditching',
    kind: 'news',
    published: '2026-08-04',
    summary: 'Trade report on which Ontario accident benefits drivers kept or dropped after the July 1, 2026 reforms, from MyChoice quote data.',
    wikiRef: { kind: 'resource', name: 'CU Ontario Optional Benefits Choices (2026)', path: 'Resources/Papers/CU Ontario Optional Benefits Choices (2026).md' },
    url: 'https://canadianunderwriter.ca/news/auto/optional-benefits-what-drivers-are-keeping-and-what-theyre-ditching/',
    practiceAreas: ['pc'],
    functions: ['advisory', 'pricing'],
    assumptions: [
      { label: 'Date the change became known', value: 'August 4, 2026', locator: 'Article dateline' },
      { label: 'Optional benefits opt-out rate', value: '32.6% of drivers declined all optional accident benefits (MyChoice quotes)', locator: 'What Ontarians are ditching, and why' },
    ],
  },

  /* ---------------------------------------------------------- Oliver Wyman */
  {
    id: 'ow-benchmark-study',
    entityId: 'oliver-wyman',
    title: 'Reform Costing: Accident Benefits Regulations',
    kind: 'report',
    published: '2025-05-07',
    summary: 'Oliver Wyman’s costing, for FSRA, of Ontario’s July 1, 2026 accident benefits reforms: the change in required average premium by take-up rate.',
    wikiRef: { kind: 'resource', name: 'Oliver Wyman Ontario Accident Benefits Reform Costing (2025)', path: 'Resources/Reports/Oliver Wyman Ontario Accident Benefits Reform Costing (2025).md' },
    url: 'https://www.fsrao.ca/sites/default/files/2025-05/OW%20Costing%20Report.pdf',
    practiceAreas: ['pc'],
    functions: ['pricing', 'reserving', 'advisory'],
    assumptions: [
      { label: 'Reform cost impact', value: '+0.24% to +0.35% change in average required premium (take-up 55%–100%)', locator: 'Section 1.2, Table 1' },
      { label: 'Shift from accident benefits to bodily injury', value: '87% factor', locator: 'Section 1.2; Section 4.3' },
    ],
  },
]

/**
 * A resource page's `Publisher:`, exactly as the vault writes it → the entity
 * Cowork files it under. A publisher with no row here keeps its pages out of
 * Cowork until an entity is authored for it (the cowork-sources skill).
 */
export const PUBLISHER_ENTITY: Record<string, string> = {
  'Society of Actuaries': 'soa',
  'Society of Actuaries Research Institute': 'soa',
  'Canadian Institute of Actuaries': 'cia',
  'Casualty Actuarial Society': 'cas',
  'Actuarial Standards Board': 'asb',
  'Office of the Superintendent of Financial Institutions': 'osfi',
  'Financial Services Regulatory Authority of Ontario': 'fsra',
  'Autorité des marchés financiers': 'amf',
  'Automobile Insurance Rate Board': 'airb',
  'Canadian Council of Insurance Regulators': 'ccir',
  'Government of Canada': 'government-of-canada',
  'Insurance Bureau of Canada': 'ibc',
  'Property and Casualty Insurance Compensation Corporation': 'pacicc',
  'General Insurance Statistical Agency': 'gisa',
  'Bank of Canada': 'bank-of-canada',
  'Statistics Canada': 'statistics-canada',
  'Facility Association': 'facility-association',
  'Market-Security Analysis & Research Inc.': 'msa-research',
  'Intact Financial Corporation': 'intact',
  'Definity Financial Corporation': 'definity',
  'Canadian Underwriter': 'canadian-underwriter',
  'Oliver Wyman': 'oliver-wyman',
  'International Actuarial Association': 'iaa',
  'National Association of Insurance Commissioners': 'naic',
  'American Academy of Actuaries': 'aaa',
  'Milliman': 'milliman',
  'McKinsey & Company': 'mckinsey',
  'Financial Services Commission of Ontario': 'fsco',
  'Canadian Association of Pension Supervisory Authorities': 'capsa',
  "King's Printer for Ontario": 'kings-printer-ontario',
  'Institute and Faculty of Actuaries': 'ifoa',
  'Bermuda Monetary Authority': 'bma',
  'Canadian Life and Health Insurance Association': 'clhia',
  'Canadian Life and Health Insurance Association Inc.': 'clhia',
  'Congressional Research Service': 'crs',
  'Financial Accounting Standards Board': 'fasb',
  'Government of Alberta': 'government-of-alberta',
  'KPMG': 'kpmg',
  'KPMG LLP': 'kpmg',
  'KPMG IFRG Limited': 'kpmg',
  'Deloitte': 'deloitte',
  'EYGM Limited': 'ey',
  'The Geneva Association': 'geneva-association',
  'CRO Forum': 'cro-forum',
  'U.S. Government Accountability Office': 'gao',
  'Retraite Québec': 'retraite-quebec',
  'IFRS Foundation': 'ifrs-foundation',
  'International Association of Insurance Supervisors': 'iais',
  'Ontario Ministry of Finance': 'ontario-ministry-of-finance',
  'Swiss Reinsurance Company Ltd': 'swiss-re',
  'Swiss Re Publishing': 'swiss-re',
  'Aon': 'aon',
  'Aon Solutions UK Limited': 'aon',
  'Guy Carpenter': 'guy-carpenter',
  'Organisation for Economic Co-operation and Development': 'oecd',
  'OECD Publishing': 'oecd',
}

const authoredPages = new Set(
  AUTHORED_RESOURCES.flatMap(r => (r.wikiRef ? [r.wikiRef.path ?? r.wikiRef.name, r.wikiRef.name] : [])),
)
const entityById = new Map(COWORK_ENTITIES.map(e => [e.id, e] as const))

/** The vault's practice documents, each under its publisher — see `lib/coworkVault.ts`. */
export const VAULT_RESOURCES: SourceResource[] = vaultDocuments.flatMap(doc => {
  if (authoredPages.has(doc.path) || authoredPages.has(doc.name)) return []
  const entity = entityById.get(PUBLISHER_ENTITY[doc.publisher] ?? '')
  return entity ? [vaultResource(doc, entity)] : []
})

export const COWORK_RESOURCES: SourceResource[] = [...AUTHORED_RESOURCES, ...VAULT_RESOURCES]
