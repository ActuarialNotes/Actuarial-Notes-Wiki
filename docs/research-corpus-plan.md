# Canadian P&C Insurance Research Corpus — Coverage Plan

This is a working checklist for building out the `research_documents` corpus
(Supabase, see `supabase/migrations/20260608_research.sql` and
`quiz/src/lib/researchOntology.ts`) plus the related markdown "timeline"
content in `Resources/Regulation/`, `Resources/Events/`, and the still-empty
`Resources/Benchmarks/` directory referenced in `quiz/vite.config.ts`
(`TIMELINE_SOURCES`, `TimelineKind = 'book' | 'event' | 'regulation' |
'benchmark'`).

Goal: ≥300 concrete research topics — specific bulletins, guidelines,
filings, statistical publications, corporate disclosures, and historical
events — organized so an "Add by URL" pass (or a future batch-ingest script)
can work through them systematically, with enough metadata to populate
`agent_id`, `type`, `jurisdiction_provinces`, `line_of_business`, and
`exam_tags` on each `research_documents` row.

## How to use this plan

1. Work section by section. Each `- [ ]` item is one corpus entry (or one
   small family of entries — e.g. "Q1–Q4 MD&A" counts as one line but is 4
   filings).
2. Tags after the em dash map to schema fields:
   - **agent** → `research_documents.agent_id` (must exist in
     `research_agents` — see "Agent gaps" below for ones that don't yet)
   - **type** → `research_documents.type` (`document_type` enum)
   - **prov** → `jurisdiction_provinces` (`ON`, `AB`, `QC`, `BC`, `MB`, `SK`,
     `NB`, `NS`, `NL`, `PE`, or `—` for national/no province)
   - **lob** → `line_of_business` (`personal_auto`, `commercial_auto`,
     `personal_property`, `commercial_property`, `liability`,
     `accident_sickness`, or `—` if not LOB-specific)
   - **exam** → suggested `exam_tags` value (mostly `6c-1`, occasionally
     `5-1`/`9-1`) for items that map cleanly onto an Exam 6C reading
3. For items that are really a *vault* page (long-lived reference, like the
   existing `Resources/Regulation/*.md` and `Resources/Events/*.md` files)
   rather than a corpus document, a "vault" note is added. Section 18
   (Benchmarks) is the main candidate for the new `Resources/Benchmarks/`
   directory — follow the frontmatter pattern of `Resources/Regulation/*.md`
   (`id`, `title`, `type`, `status`, `date`, `jurisdiction`, `lob`,
   `issuing_body`, `tags`).
4. Check items off as they're ingested. Mark `(dup?)` items that may already
   be covered by an existing `Resources/Regulation/*.md` page so they aren't
   re-researched from scratch.

## Agent gaps (do this first)

`research_agents` currently has no row for the CIA, PACICC, Facility
Association, or government program bodies (AgriInsurance, EI, WSIB, etc.),
but Sections 9–11 and 13–17 cite documents from these issuers. Before — or
as part of — working those sections, either:

- add dedicated rows (`cia`, `pacicc`, `facility-association`, each
  `industry_bureau` type, federal/multi-provincial scope, `statistics` or a
  new domain as appropriate), mirroring the pattern in
  `20260613_research_ontology_v2.sql`, **or**
- fall back to the existing `user-added` agent (`industry_bureau`,
  `is_active=false`, added in `20260616_research_user_added_agent.sql`) for
  one-off items (court decisions, individual statutes) that don't warrant a
  new agent.

Items below are tagged `agent: cia (new)`, `agent: pacicc (new)`, `agent:
facility-association (new)`, or `agent: user-added` accordingly.

## Coverage summary

| # | Section | Topics |
|---|---|---|
| 1 | OSFI — Federal Prudential Regulation (Solvency) | 30 |
| 2 | FSRA — Ontario Market Conduct & Product Regulation | 28 |
| 3 | AIRB — Alberta Auto Insurance Rate Regulation | 15 |
| 4 | AMF — Québec | 14 |
| 5 | BCFSA / ICBC — British Columbia | 16 |
| 6 | Other Provinces & Territories (MB, SK, Atlantic, North) | 14 |
| 7 | IBC — Insurance Bureau of Canada | 14 |
| 8 | GISA — General Insurance Statistical Agency | 10 |
| 9 | CIA — Educational Notes & Standards of Practice | 30 |
| 10 | PACICC | 8 |
| 11 | Government & Residual-Market Programs | 14 |
| 12 | Insurer Filings (13 insurers × 7) | 91 |
| 13 | M&A & Corporate Events | 25 |
| 14 | Provincial Auto Reform Timeline | 18 |
| 15 | Court Cases & Tort Reform | 12 |
| 16 | Climate & Catastrophe | 10 |
| 17 | IFRS 17 / Accounting Transition | 8 |
| 18 | Benchmarks & Industry Loss Trend Data | 17 |
| | **Total** | **374** |

---

## 1. OSFI — Federal Prudential Regulation (Solvency)

- [ ] Guideline A-4: Internal Target Capital Ratio for Federally Regulated Insurers — `osfi` · `approved_guideline` · prov `—` · lob `—` · exam `6c-1`
- [ ] Guideline B-2: Large Exposure Limits — `osfi` · `approved_guideline` · prov `—` · lob `—`
- [ ] Guideline B-3: Sound Reinsurance Practices and Procedures — `osfi` · `approved_guideline` · prov `—` · lob `—` · exam `6c-1`
- [ ] Guideline B-8: Deterrence and Detection of Money Laundering and Terrorist Financing (P&C scope) — `osfi` · `approved_guideline`
- [ ] Guideline B-9: Earthquake Exposure Sound Practices — `osfi` · `approved_guideline` · lob `personal_property,commercial_property` · exam `6c-1`
- [ ] Guideline B-10: Third-Party Risk Management — `osfi` · `approved_guideline`
- [ ] Guideline B-13: Technology and Cyber Risk Management — `osfi` · `approved_guideline`
- [ ] Guideline B-15: Climate Risk Management — `osfi` · `approved_guideline` · exam `6c-1`
- [ ] Guideline E-15: Appointed Actuary — Legal Requirements, Qualifications and External Review — `osfi` · `approved_guideline` · exam `6c-1`
- [ ] Guideline E-18: Stress Testing — `osfi` · `approved_guideline` · exam `6c-1`
- [ ] Guideline E-19: Own Risk and Solvency Assessment (ORSA) — `osfi` · `approved_guideline` · exam `6c-1`
- [ ] Guideline E-21: Operational Risk Management — `osfi` · `approved_guideline`
- [ ] Corporate Governance Guideline (federally regulated insurers) — `osfi` · `approved_guideline` · exam `6c-1`
- [ ] Minimum Capital Test (MCT) Guideline for Federally Regulated P&C Insurers (current version) — `osfi` · `approved_guideline` · exam `6c-1`
- [ ] MCT Guideline — summary of year-over-year changes/advisories — `osfi` · `regulatory_bulletin`
- [ ] Annual Return — General Instructions and Forms (P&C) — `osfi` · `supervisory_framework` · exam `6c-1`
- [ ] Quarterly Return — Instructions and Filing Schedule — `osfi` · `supervisory_framework` · exam `6c-1`
- [ ] Source of Earnings (SOE) Disclosure Requirements — `osfi` · `regulatory_circular` · exam `6c-1`
- [ ] OSFI guidance referencing Dynamic Capital Adequacy Testing (DCAT) expectations for Appointed Actuaries — `osfi` · `regulatory_circular` · exam `6c-1`
- [ ] IFRS 17 Transition Guidance for Federally Regulated Insurers — `osfi` · `regulatory_circular` · exam `6c-1`
- [ ] OSFI Climate Risk Returns — mandatory disclosure pilot details — `osfi` · `regulatory_bulletin` · exam `6c-1`
- [ ] OSFI Annual Risk Outlook (most recent edition) — `osfi` · `research_report`
- [ ] OSFI Supervisory Framework — overview document — `osfi` · `supervisory_framework` · exam `6c-1`
- [ ] Memorandum to the Appointed Actuary — Property and Casualty Insurance (annual letter, most recent) — `osfi` · `regulatory_circular` · exam `6c-1`
- [ ] Capital treatment of Reinsurance Ceded to Unregistered Reinsurers — `osfi` · `regulatory_circular` · exam `6c-1`
- [ ] Letter: Valuation of Insurance Contract Liabilities under the IFRS 17 transitional approach — `osfi` · `regulatory_circular`
- [ ] Internal Capital Target (ICT) framework — most recent revisions — `osfi` · `regulatory_bulletin`
- [ ] OSFI supervisory communications on pandemic / business-interruption exposure for P&C insurers — `osfi` · `regulatory_bulletin`
- [ ] Foreign branch operations — Part XIII insurers, Vice-Superintendent standards — `osfi` · `supervisory_framework`
- [ ] Group-wide supervision framework for federally regulated insurance groups — `osfi` · `supervisory_framework`

## 2. FSRA — Ontario Market Conduct & Product Regulation

- [ ] Auto Insurance Rate Filing Guidelines (current edition) — `fsra` · `approved_guideline` · prov `ON` · lob `personal_auto` · exam `6c-1`
- [ ] Take-All-Comers requirement guidance (Insurance Act, s. 27) — `fsra` · `regulatory_bulletin` · prov `ON` · lob `personal_auto` · exam `6c-1`
- [ ] Risk Classification System filing requirements — Private Passenger Auto — `fsra` · `approved_guideline` · prov `ON` · lob `personal_auto`
- [ ] Territory Definitions — Ontario Private Passenger Auto — `fsra` · `regulatory_bulletin` · prov `ON` · lob `personal_auto` · exam `6c-1`
- [ ] Fair Practices in the Distribution of Automobile Insurance Rule (2018-001/REG) — `fsra` · `approved_guideline` · prov `ON` · exam `6c-1`
- [ ] Unfair or Deceptive Acts or Practices (UDAP) Rule — `fsra` · `approved_guideline` · prov `ON`
- [ ] Statutory Accident Benefits Schedule (O. Reg. 34/10) — consolidated text and amendment history — `fsra` · `regulatory_circular` · prov `ON` · lob `personal_auto,accident_sickness` · exam `6c-1` (dup? cross-ref `Resources/Regulation/Historic Ontario Auto Reform - SABS Reduction (2010).md`)
- [ ] Minor Injury Guideline (MIG) — definitions and treatment caps — `fsra` · `regulatory_bulletin` · prov `ON` · lob `accident_sickness`
- [ ] OPCF 44R — Family Protection Endorsement — `fsra` · `approved_guideline` · prov `ON` · lob `personal_auto`
- [ ] OPCF 28 — Transportation Network Driver coverage — `fsra` · `approved_guideline` · prov `ON` · lob `personal_auto`
- [ ] OPCF 47R — SABS Optionality opt-out endorsement (2026 reform) — `fsra` · `approved_guideline` · prov `ON` · lob `personal_auto,accident_sickness` (dup? cross-ref `Resources/Regulation/July 2026 Ontario Auto Insurance Reform (2026).md`)
- [ ] Health Claims for Auto Insurance (HCAI) data-standard guidance — `fsra` · `supervisory_framework` · prov `ON` · lob `accident_sickness`
- [ ] Auto Insurance Anti-Fraud Task Force — Final Report — `fsra` · `research_report` · prov `ON` · lob `personal_auto`
- [ ] FSRA Statement of Priorities (most recent fiscal year) — `fsra` · `supervisory_framework` · prov `ON`
- [ ] FSRA Annual Report (most recent) — `fsra` · `annual_report` · prov `ON`
- [ ] "File and Use" rate-approval reform — consultation paper — `fsra` · `consultation_paper` · prov `ON` · lob `personal_auto`
- [ ] Credit Score Prohibition in Auto Insurance Rating — rule amendment — `fsra` · `regulatory_bulletin` · prov `ON` · lob `personal_auto`
- [ ] Vulnerable Claimants in the Auto Insurance System — strategy paper — `fsra` · `research_report` · prov `ON` · lob `accident_sickness`
- [ ] Direct Compensation for Property Damage (DCPD) Agreement — Ontario — `fsra` · `approved_guideline` · prov `ON` · lob `personal_auto,commercial_auto` · exam `6c-1`
- [ ] OPCF 44 — Family Protection / Uninsured Automobile Coverage — `fsra` · `approved_guideline` · prov `ON` · lob `personal_auto`
- [ ] Travel Health Insurance — FSRA guidance for insurers and agents — `fsra` · `approved_guideline` · prov `ON` · lob `accident_sickness`
- [ ] Title Insurance — market conduct review — `fsra` · `research_report` · prov `ON`
- [ ] FSRA Market Conduct Examination — Auto Insurers thematic review (most recent) — `fsra` · `research_report` · prov `ON` · lob `personal_auto`
- [ ] FSRA Consultation: SABS Optionality implementation guidance (2026 reform follow-up) — `fsra` · `consultation_paper` · prov `ON` · lob `personal_auto,accident_sickness`
- [ ] Bill 171 (2024) — insurance-related schedule, Ontario Legislature — `fsra` · `regulatory_circular` · prov `ON`
- [ ] Bill 15 (2014) — Fighting Fraud and Reducing Automobile Insurance Rates Act — `fsra` · `regulatory_circular` · prov `ON` · exam `6c-1` (dup? cross-ref `Ontario Reg. 664` in Exam 6C reading list)
- [ ] "Putting Drivers First" auto insurance strategy (2019 announcement) — `fsra` · `research_report` · prov `ON` · lob `personal_auto`
- [ ] Auto Insurance Anti-Fraud Task Force — implementation progress report — `fsra` · `research_report` · prov `ON`

## 3. AIRB — Alberta Auto Insurance Rate Regulation

- [ ] AIRB Annual Review of Automobile Insurance Rates — industry report (most recent) — `airb` · `industry_statistics` · prov `AB` · lob `personal_auto` · exam `6c-1`
- [ ] Automobile Insurance Premiums Annual Report (Alberta) — `airb` · `industry_statistics` · prov `AB` · lob `personal_auto`
- [ ] Grid Rating Program — methodology guideline — `airb` · `approved_guideline` · prov `AB` · lob `personal_auto`
- [ ] Bulletin: Good Driver Rate Cap (Insurance Amendment Act, 2020 / Bill 41) — `airb` · `regulatory_bulletin` · prov `AB` · lob `personal_auto`
- [ ] Filing Guidelines for Private Passenger Vehicles — `airb` · `approved_guideline` · prov `AB` · lob `personal_auto`
- [ ] Order — annual rate-cap extension/removal decision (most recent) — `airb` · `regulatory_circular` · prov `AB` · lob `personal_auto`
- [ ] Direct Compensation for Property Damage (DCPD) — Alberta implementation — `airb` · `approved_guideline` · prov `AB` · lob `personal_auto`
- [ ] Diagnostic and Treatment Protocols Regulation — minor injury cap (Alberta) — `airb` · `regulatory_circular` · prov `AB` · lob `accident_sickness`
- [ ] AIRB Annual Report (most recent) — `airb` · `annual_report` · prov `AB`
- [ ] Alberta Risk Sharing Pool — Plan of Operation — `airb` · `supervisory_framework` · prov `AB` · lob `personal_auto`
- [ ] Bill 26 (Stronger, Fairer Auto Insurance Act) — "Care-First" auto insurance reform — `airb` · `regulatory_circular` · prov `AB` · lob `personal_auto,accident_sickness`
- [ ] Industry benchmark rate filing — loss trend rates by coverage (most recent) — `airb` · `industry_statistics` · prov `AB` · lob `personal_auto`
- [ ] Automobile Insurance Premium Survey (Alberta) — `airb` · `industry_statistics` · prov `AB` · lob `personal_auto`
- [ ] AIRB Consultation — optional product reform — `airb` · `consultation_paper` · prov `AB` · lob `personal_auto`
- [ ] Alberta Superintendent of Insurance — Annual Report on Automobile Insurance — `airb` · `annual_report` · prov `AB` · lob `personal_auto`

## 4. AMF — Québec

- [ ] Sound Commercial Practices Guideline — `amf` · `approved_guideline` · prov `QC`
- [ ] An Act respecting the distribution of financial products and services (Distribution Act) — consolidated text — `amf` · `regulatory_circular` · prov `QC`
- [ ] Bill 141 (2018) — insurance distribution and consumer-protection amendments — `amf` · `regulatory_circular` · prov `QC`
- [ ] Information Capsules — insurance sector (recent series) — `amf` · `regulatory_bulletin` · prov `QC`
- [ ] Insurers Act (Québec) — consolidated text — `amf` · `regulatory_circular` · prov `QC`
- [ ] Automobile Insurance Act (Québec) — no-fault bodily-injury regime overview — `amf` · `supervisory_framework` · prov `QC` · lob `personal_auto,accident_sickness`
- [ ] AMF Annual Report (most recent) — `amf` · `annual_report` · prov `QC`
- [ ] Regulation respecting complaint processing and dispute resolution in insurance — `amf` · `approved_guideline` · prov `QC`
- [ ] IFRS 17 transition expectations communication — Québec-chartered insurers — `amf` · `regulatory_circular` · prov `QC`
- [ ] AMF Supervisory Framework (overview document) — `amf` · `supervisory_framework` · prov `QC`
- [ ] Regulation respecting Alternative Distribution Methods — `amf` · `approved_guideline` · prov `QC`
- [ ] AMF Climate Risk Guideline — expectations for Québec insurers — `amf` · `approved_guideline` · prov `QC`
- [ ] AMF market-conduct bulletin distinguishing damage insurance vs. insurance of persons distribution rules — `amf` · `regulatory_bulletin` · prov `QC`
- [ ] Groupement des assureurs automobiles (GAA) — territorial rate classification methodology, Québec — `amf` · `industry_statistics` · prov `QC` · lob `personal_auto`

## 5. BCFSA / ICBC — British Columbia

- [ ] Enhanced Care (no-fault) reform — overview and implementation bulletin — `bcfsa` · `regulatory_bulletin` · prov `BC` · lob `personal_auto,accident_sickness`
- [ ] ICBC Basic Insurance annual rate application — `icbc` · `rate_filing_summary` · prov `BC` · lob `personal_auto` · exam `6c-1`
- [ ] Special Direction IC2 — rate-setting framework for Basic insurance — `bcfsa` · `supervisory_framework` · prov `BC` · lob `personal_auto`
- [ ] ICBC Annual Report (most recent) — `icbc` · `annual_report` · prov `BC`
- [ ] ICBC Service Plan / quarterly financial report (most recent) — `icbc` · `quarterly_supplement` · prov `BC`
- [ ] BCFSA Market Conduct Guidelines for Insurers — `bcfsa` · `approved_guideline` · prov `BC`
- [ ] Financial Institutions Act (BC) — insurance provisions, consolidated — `bcfsa` · `regulatory_circular` · prov `BC`
- [ ] Insurance (Vehicle) Act and Regulations (BC) — consolidated text — `bcfsa` · `regulatory_circular` · prov `BC` · lob `personal_auto`
- [ ] Optional Auto Insurance Market Competition Review — `bcfsa` · `research_report` · prov `BC` · lob `personal_auto`
- [ ] BC Utilities Commission — historical ICBC rate-oversight transition documents — `bcfsa` · `supervisory_framework` · prov `BC`
- [ ] ICBC Multi-Year Rate Plan (post Enhanced Care) — `icbc` · `rate_filing_summary` · prov `BC` · lob `personal_auto`
- [ ] BCFSA Annual Service Plan Report (most recent) — `bcfsa` · `annual_report` · prov `BC`
- [ ] ICBC Enhanced Care — Care Recovery Benefits structure and schedules — `icbc` · `approved_guideline` · prov `BC` · lob `accident_sickness`
- [ ] BCFSA Climate Risk Expectations for Insurers — `bcfsa` · `approved_guideline` · prov `BC`
- [ ] Insurance Premium Tax Act (BC) — consolidated text — `bcfsa` · `regulatory_circular` · prov `BC`
- [ ] BCFSA Fair Treatment of Customers Guideline — `bcfsa` · `approved_guideline` · prov `BC`

## 6. Other Provinces & Territories (MB, SK, Atlantic, North)

- [ ] Manitoba Public Insurance — Basic Compulsory Insurance annual rate application (to PUB) — `mpi` · `rate_filing_summary` · prov `MB` · lob `personal_auto` · exam `6c-1`
- [ ] Manitoba Public Utilities Board — MPI rate-hearing decision (most recent) — `mpi` · `regulatory_circular` · prov `MB` · lob `personal_auto`
- [ ] Saskatchewan Auto Fund — SGI Canada annual report (most recent) — `sgi-canada` · `annual_report` · prov `SK` · lob `personal_auto`
- [ ] Saskatchewan Auto Fund — rate indication application (most recent) — `sgi-canada` · `rate_filing_summary` · prov `SK` · lob `personal_auto`
- [ ] Saskatchewan — choice of tort vs. no-fault auto insurance, program overview — `sgi-canada` · `supervisory_framework` · prov `SK` · lob `personal_auto,accident_sickness`
- [ ] Nova Scotia Insurance Act amendments — 2010 minor-injury cap reform — `user-added` · `regulatory_circular` · prov `NS` · lob `personal_auto,accident_sickness`
- [ ] Nova Scotia Utility and Review Board — auto insurance rate regulation framework — `user-added` · `supervisory_framework` · prov `NS` · lob `personal_auto`
- [ ] New Brunswick Insurance Act amendments — 2013 reform, minor-injury cap increase — `user-added` · `regulatory_circular` · prov `NB` · lob `personal_auto,accident_sickness`
- [ ] New Brunswick Financial and Consumer Services Commission — auto insurance oversight bulletin — `user-added` · `regulatory_bulletin` · prov `NB` · lob `personal_auto`
- [ ] Newfoundland and Labrador Auto Insurance Review (2020–2022) — final report — `user-added` · `research_report` · prov `NL` · lob `personal_auto`
- [ ] PEI Insurance Act — auto insurance provisions, consolidated — `user-added` · `regulatory_circular` · prov `PE` · lob `personal_auto`
- [ ] Facility Association — Atlantic region residual-market rate filings (most recent) — `facility-association (new)` · `rate_filing_summary` · prov `NB,NS,NL,PE` · lob `personal_auto`
- [ ] GISA — Atlantic region (NB, NS, NL, PE) data-reporting requirements overview — `gisa` · `supervisory_framework` · prov `NB,NS,NL,PE`
- [ ] Auto insurance regulatory framework — Yukon, NWT, Nunavut (territories) overview — `user-added` · `supervisory_framework` · prov `—` · lob `personal_auto`

## 7. IBC — Insurance Bureau of Canada

- [ ] Facts of the General Insurance Industry in Canada (most recent annual edition) — `ibc` · `industry_statistics` · prov `—` · exam `6c-1`
- [ ] IBC Catastrophe Loss Report (most recent year) — `ibc` · `industry_statistics` · prov `—`
- [ ] IBC Catastrophe Loss Report — prior-year comparison series (3–5 years back) — `ibc` · `industry_statistics` · prov `—`
- [ ] IBC Auto Theft Report (most recent annual edition) — `ibc` · `industry_statistics` · prov `—` · lob `personal_auto,commercial_auto`
- [ ] IBC — "Cost of Severe Weather" report series — `ibc` · `research_report` · prov `—`
- [ ] IBC — Insurance Fraud: Cost to Canadians study — `ibc` · `research_report` · prov `—`
- [ ] IBC submission to FSRA on Ontario auto insurance reform (most recent consultation) — `ibc` · `consultation_paper` · prov `ON` · lob `personal_auto`
- [ ] IBC submission to AIRB annual rate review (most recent) — `ibc` · `consultation_paper` · prov `AB` · lob `personal_auto`
- [ ] IBC — water/flood risk and insurance position papers — `ibc` · `research_report` · prov `—` · lob `personal_property`
- [ ] IBC — National Disaster Mitigation Fund advocacy materials — `ibc` · `research_report` · prov `—`
- [ ] IBC — Auto Insurance Affordability research (most recent) — `ibc` · `research_report` · prov `—` · lob `personal_auto`
- [ ] IBC — Used Vehicle Information Standards (claims/total-loss) — `ibc` · `approved_guideline` · prov `—` · lob `personal_auto`
- [ ] IBC — Industry Underwriting Results Summary (most recent quarter) — `ibc` · `industry_statistics` · prov `—`
- [ ] IBC — Wildfire Risk to Homes report — `ibc` · `research_report` · prov `—` · lob `personal_property`

## 8. GISA — General Insurance Statistical Agency

- [ ] GISA Automobile Statistical Plan — manual (current edition) — `gisa` · `supervisory_framework` · lob `personal_auto,commercial_auto` · exam `6c-1`
- [ ] GISA General Liability Statistical Plan — manual — `gisa` · `supervisory_framework` · lob `liability`
- [ ] GISA Personal Property Statistical Plan — manual — `gisa` · `supervisory_framework` · lob `personal_property`
- [ ] GISA Industry Experience Exhibits — Private Passenger Auto (most recent) — `gisa` · `industry_statistics` · lob `personal_auto`
- [ ] GISA Industry Experience Exhibits — Commercial Auto (most recent) — `gisa` · `industry_statistics` · lob `commercial_auto`
- [ ] GISA DCPD Experience Exhibits (most recent) — `gisa` · `industry_statistics` · lob `personal_auto,commercial_auto`
- [ ] GISA Data Call Specifications — annual update — `gisa` · `supervisory_framework`
- [ ] GISA Closed Claim Studies — Auto Bodily Injury — `gisa` · `research_report` · lob `personal_auto,accident_sickness`
- [ ] GISA Underwriting Performance Reports by Province (most recent) — `gisa` · `industry_statistics`
- [ ] GISA Governance and Participating Jurisdictions overview — `gisa` · `supervisory_framework`

## 9. CIA — Educational Notes & Standards of Practice

- [ ] CIA Standards of Practice — General Standards (Section 1000) — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] CIA Standards of Practice — Insurance Practice, P&C sections (2300s) — `cia (new)` · `cia_educational_note` · exam `6c-1` ("CIA CSOP" in Exam 6C reading list)
- [ ] Educational Note: Premium Liabilities — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Discount Rate Assumptions for Property and Casualty Insurance ("CIA Discount Rates") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Duration of the Liabilities for P&C Insurers ("CIA Duration") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Financial Condition Testing — Part 1 ("CIA FCT 1") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Financial Condition Testing — Part 2 ("CIA FCT 2") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: IFRS 17 — Comparison to Current CIA Standards ("CIA IFRS 1") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: IFRS 17 — Discount Rates and Risk Adjustment ("CIA IFRS 2") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: IFRS 17 — Liability for Remaining Coverage ("CIA IFRS 17 - LRC") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: IFRS 17 — Comparison of P&C Actuarial Estimates ("CIA IFRS 17 - Comparison") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Materiality ("CIA Materiality") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Use of Models ("CIA Models") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Premium Allocation Approach under IFRS 17 ("CIA PAA") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Accounting and Reinsurance Treatment under IFRS 17 ("CIA Reinsurance Treatment") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Runoff of Claim Liabilities ("CIA Runoff") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Subsequent Events ("CIA Subsequent Events") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Territories and Discount Rate Curves ("CIA Territories") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Valuation of Policy Liabilities for P&C Insurers ("CIA Valuation") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Investigation of Bias and Volatility Considerations ("CIA Bias") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Role of the Appointed Actuary — guidance note ("CIA Appointed Actuary") — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Climate Change Considerations for Actuaries — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: ULAE (Unallocated Loss Adjustment Expense) Reserves — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Use of Actuarial Judgement — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] CIA Rules of Professional Conduct — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Reinsurance Considerations for P&C Insurers — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] CIA Practice Council update — P&C, most recent — `cia (new)` · `cia_educational_note`
- [ ] CIA Task Force Report — IFRS 17 implementation lessons learned — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] Educational Note: Going Concern and Solvency Assessment under IFRS 17 — `cia (new)` · `cia_educational_note` · exam `6c-1`
- [ ] CIA Practice Education Course materials — IFRS 17 for P&C — `cia (new)` · `cia_educational_note` · exam `6c-1`

## 10. PACICC

- [ ] PACICC Memorandum of Operation — `pacicc (new)` · `supervisory_framework` · exam `6c-1` (dup? cross-ref "PACICC" / "KPMG PACICC" in Exam 6C reading list)
- [ ] PACICC Annual Report (most recent) — `pacicc (new)` · `annual_report`
- [ ] PACICC "Why Insurers Fail" research series (most recent paper) — `pacicc (new)` · `research_report` · exam `6c-1`
- [ ] PACICC Risk-Based Capital framework discussion paper — `pacicc (new)` · `research_report` · exam `6c-1`
- [ ] PACICC — Policyholder Protection in a Hard Market study — `pacicc (new)` · `research_report`
- [ ] PACICC Compensation Plan for personal-lines policyholders — terms and limits — `pacicc (new)` · `approved_guideline` · exam `6c-1`
- [ ] PACICC — stress-testing P&C insurer insolvency scenarios — `pacicc (new)` · `research_report`
- [ ] PACICC — international comparison of guaranty-fund systems — `pacicc (new)` · `research_report`

## 11. Government & Residual-Market Programs

- [ ] AgriInsurance / Canadian Agricultural Partnership — program guidelines — `user-added` · `supervisory_framework` · exam `6c-1` ("Agricultural Programs" in Exam 6C reading list)
- [ ] Production Insurance Program — provincial crop insurance agreements (overview) — `user-added` · `supervisory_framework` · exam `6c-1`
- [ ] Employment Insurance Act — overview and relevance to disability income programs — `user-added` · `regulatory_circular` · exam `6c-1` ("Employment Insurance" in Exam 6C reading list)
- [ ] Canada's Task Force on Flood Insurance and Relocation — final report — `user-added` · `research_report` · exam `6c-1` ("GOC Flood Risks" in Exam 6C reading list)
- [ ] Facility Association — Plan of Operation — `facility-association (new)` · `supervisory_framework` · lob `personal_auto,commercial_auto` · exam `6c-1`
- [ ] Facility Association — Risk Sharing Pool (RSP) rules — `facility-association (new)` · `approved_guideline` · lob `personal_auto`
- [ ] Facility Association — Annual Report (most recent) — `facility-association (new)` · `annual_report`
- [ ] Facility Association — residual-market mechanism, by-province summary — `facility-association (new)` · `industry_statistics` · lob `personal_auto`
- [ ] Workplace Safety and Insurance Board (Ontario, WSIB) — Annual Report — `user-added` · `annual_report` · prov `ON` · exam `6c-1` ("Workers Compensation Insurance" in Exam 6C reading list)
- [ ] Alberta Workers' Compensation Board — Annual Report — `user-added` · `annual_report` · prov `AB`
- [ ] Canadian Government Crop Reinsurance Fund — structure overview — `user-added` · `supervisory_framework`
- [ ] CMHC mortgage insurance vs. P&C property insurance — regulatory distinction note — `user-added` · `research_report`
- [ ] Export Development Canada — trade credit insurance program overview — `user-added` · `supervisory_framework` · lob `liability`
- [ ] Government-backed disability/A&S programs — comparative overview (federal/provincial) — `user-added` · `research_report` · lob `accident_sickness`

## 12. Insurer Filings

### Insurance Corporation of British Columbia (`icbc`)
- [ ] Annual Report (most recent) — `annual_report` · prov `BC`
- [ ] Service Plan (most recent) — `quarterly_supplement` · prov `BC`
- [ ] Q1 financial results — `quarterly_supplement` · prov `BC`
- [ ] Q2 financial results — `quarterly_supplement` · prov `BC`
- [ ] Q3 financial results — `quarterly_supplement` · prov `BC`
- [ ] Enhanced Care performance update (most recent) — `press_release` · prov `BC` · lob `personal_auto,accident_sickness`
- [ ] Multi-Year Rate Plan filing — `rate_filing_summary` · prov `BC` · lob `personal_auto`

### Intact Financial Corporation (`intact-financial`)
- [ ] Annual Report (most recent) — `annual_report`
- [ ] Q1 MD&A — `md_and_a`
- [ ] Q2 MD&A — `md_and_a`
- [ ] Q3 MD&A — `md_and_a`
- [ ] Q4 / full-year MD&A — `md_and_a`
- [ ] Investor Day presentation (most recent) — `investor_presentation`
- [ ] Press release — RSA Canada integration / portfolio update — `press_release`

### Desjardins General Insurance Group (`desjardins-general`)
- [ ] Desjardins Group Annual Report — General Insurance segment — `annual_report` · prov `ON,QC`
- [ ] Q1 financial results — General Insurance segment — `quarterly_supplement`
- [ ] Q2 financial results — General Insurance segment — `quarterly_supplement`
- [ ] Q3 financial results — General Insurance segment — `quarterly_supplement`
- [ ] Q4 / full-year financial results — General Insurance segment — `quarterly_supplement`
- [ ] Investor/analyst presentation — General Insurance segment — `investor_presentation`
- [ ] Press release — Onlia digital insurance expansion — `press_release`

### Aviva Canada Inc. (`aviva-canada`)
- [ ] Annual financial statements (OSFI filing, most recent) — `annual_report`
- [ ] Aviva plc — Q1 trading update, Canada segment commentary — `quarterly_supplement`
- [ ] Aviva plc — H1 results, Canada segment commentary — `quarterly_supplement`
- [ ] Aviva plc — Q3 trading update, Canada segment commentary — `quarterly_supplement`
- [ ] Aviva plc — full-year results, Canada segment commentary — `quarterly_supplement`
- [ ] Investor presentation — Canada segment — `investor_presentation`
- [ ] Press release — acquisition of RBC's home and auto insurance manufacturing business — `press_release`

### TD Insurance (`td-insurance`)
- [ ] TD Bank Group Annual Report — Insurance segment — `annual_report`
- [ ] Q1 results — Insurance segment — `quarterly_supplement`
- [ ] Q2 results — Insurance segment — `quarterly_supplement`
- [ ] Q3 results — Insurance segment — `quarterly_supplement`
- [ ] Q4 / full-year results — Insurance segment — `quarterly_supplement`
- [ ] Investor Day presentation — Insurance segment — `investor_presentation`
- [ ] Press release — Insurance segment strategy / portfolio announcement — `press_release`

### The Co-operators General Insurance Company (`cooperators`)
- [ ] Co-operators Group Annual Report (most recent) — `annual_report`
- [ ] Co-operators financial statements (OSFI filing, most recent) — `annual_report`
- [ ] Sustainability / ESG report (most recent) — `research_report`
- [ ] Press release — CUMIS Group integration update — `press_release`
- [ ] Community investment / impact report (most recent) — `research_report`
- [ ] Economic outlook / affordability research (most recent) — `research_report`
- [ ] Member/policyholder annual update — `press_release`

### Definity Financial Corporation (`definity`)
- [ ] Annual Report (most recent) — `annual_report`
- [ ] Q1 MD&A — `md_and_a`
- [ ] Q2 MD&A — `md_and_a`
- [ ] Q3 MD&A — `md_and_a`
- [ ] Q4 / full-year MD&A — `md_and_a`
- [ ] Investor Day presentation (most recent) — `investor_presentation`
- [ ] Press release — Sonnet Insurance full-ownership acquisition (2023) — `press_release`

### Allstate Insurance Company of Canada (`allstate-canada`)
- [ ] Allstate Corporation 10-K — Canada segment notes (most recent) — `annual_report`
- [ ] Allstate Canada financial statements (OSFI filing, most recent) — `annual_report`
- [ ] Allstate Corp Q1 earnings call — Canada commentary — `quarterly_supplement`
- [ ] Allstate Corp Q2 earnings call — Canada commentary — `quarterly_supplement`
- [ ] Allstate Corp Q3 earnings call — Canada commentary — `quarterly_supplement`
- [ ] Allstate Corp Q4 earnings call — Canada commentary — `quarterly_supplement`
- [ ] Press release — Allstate Canada rate filing / community initiative (most recent) — `press_release`

### Wawanesa Mutual Insurance Company (`wawanesa`)
- [ ] Annual Report (most recent) — `annual_report`
- [ ] Financial statements (OSFI filing, most recent) — `annual_report`
- [ ] Press release — Western Financial Group integration update — `press_release`
- [ ] Press release — recent M&A / expansion announcement — `press_release`
- [ ] Sustainability report (most recent) — `research_report`
- [ ] AM Best rating action report (most recent) — `research_report`
- [ ] Member/policyholder report (most recent) — `press_release`

### Chubb Insurance Company of Canada (`chubb-canada`)
- [ ] Chubb Limited 10-K — Canada segment notes (most recent) — `annual_report`
- [ ] Chubb Canada financial statements (OSFI filing, most recent) — `annual_report`
- [ ] Chubb Ltd investor presentation — Canada/international notes — `investor_presentation`
- [ ] Chubb Ltd Q1 earnings call — Canada commentary — `quarterly_supplement`
- [ ] Chubb Ltd Q2 earnings call — Canada commentary — `quarterly_supplement`
- [ ] Chubb Ltd Q3 earnings call — Canada commentary — `quarterly_supplement`
- [ ] Press release — Chubb Canada product/distribution announcement (most recent) — `press_release`

### Gore Mutual Insurance Company (`gore-mutual`)
- [ ] Annual Report (most recent) — `annual_report`
- [ ] Financial statements (OSFI filing, most recent) — `annual_report`
- [ ] "Project 2025" transformation press release / update — `press_release`
- [ ] Sustainability / ESG report (most recent) — `research_report`
- [ ] Press release — broker partnership / distribution announcement — `press_release`
- [ ] AM Best rating action report (most recent) — `research_report`
- [ ] Community / foundation report (most recent) — `press_release`

### SGI Canada (`sgi-canada`)
- [ ] SGI CANADA Annual Report (competitive lines segment, most recent) — `annual_report` · prov `SK,AB,MB,ON,BC`
- [ ] Saskatchewan Crown Investments Corporation Annual Report — SGI segment — `annual_report` · prov `SK`
- [ ] Q1–Q3 quarterly financial reports — `quarterly_supplement` · prov `SK`
- [ ] Auto Fund rate filing — Saskatchewan (agent-tagged) — `rate_filing_summary` · prov `SK` · lob `personal_auto`
- [ ] Press release — SGI Canada multi-province expansion update — `press_release`
- [ ] SGI Canada investor/analyst note (if available) — `investor_presentation`
- [ ] SGI Canada sustainability report (most recent) — `research_report`

### Manitoba Public Insurance (`mpi`)
- [ ] Annual Report (most recent) — `annual_report` · prov `MB`
- [ ] Q1 financial report — `quarterly_supplement` · prov `MB`
- [ ] Q2 financial report — `quarterly_supplement` · prov `MB`
- [ ] Q3 financial report — `quarterly_supplement` · prov `MB`
- [ ] PUB rate-application materials (most recent Basic insurance application) — `rate_filing_summary` · prov `MB` · lob `personal_auto`
- [ ] Basic insurance rate decision (most recent PUB order) — `regulatory_circular` · prov `MB` · lob `personal_auto`
- [ ] Corporate plan (most recent) — `supervisory_framework` · prov `MB`

## 13. M&A & Corporate Events

- [ ] Intact Financial — acquisition of RSA Insurance Group's Canada, UK & International operations (2021, joint deal with Tryg) — `intact-financial` · `press_release` · exam `6c-1`
- [ ] Intact Financial — acquisition of Frank Cowan Company (2020) — `intact-financial` · `press_release`
- [ ] Intact Financial — On Side Restoration / NARS network expansion — `intact-financial` · `press_release`
- [ ] Intact Financial — BrokerLink brokerage roll-up acquisitions (ongoing, most recent) — `intact-financial` · `press_release`
- [ ] Definity Financial Corporation — demutualization and IPO of Economical Insurance (2021/2022) — `definity` · `press_release` · exam `6c-1`
- [ ] Definity — acquisition of remaining stake in Sonnet Insurance (2023) — `definity` · `press_release`
- [ ] Trisura Group — spin-off from Brookfield Asset Management and Canadian/US expansion — `user-added` · `press_release`
- [ ] Westland Insurance Group — brokerage acquisitions across Canada (most recent roll-up) — `user-added` · `press_release`
- [ ] Wawanesa Mutual — acquisition of Western Financial Group (2019) — `wawanesa` · `press_release`
- [ ] Beneva — merger of La Capitale and SSQ Insurance (2020) — `user-added` · `press_release` · prov `QC`
- [ ] Aviva Canada — acquisition of RBC's home and auto insurance manufacturing business (2023) — `aviva-canada` · `press_release` · exam `6c-1`
- [ ] Gore Mutual Insurance — "Project 2025" transformation and strategic partnerships — `gore-mutual` · `press_release`
- [ ] CAA Insurance Company — ownership and governance structure within the CAA Club Group network — `user-added` · `research_report`
- [ ] Co-operators — acquisition/integration of CUMIS Group — `cooperators` · `press_release`
- [ ] Northbridge Financial Corporation — Fairfax Financial subsidiary restructuring (most recent) — `user-added` · `press_release`
- [ ] Travelers Insurance Company of Canada — rebrand history from Dominion of Canada General Insurance — `user-added` · `press_release`
- [ ] Onlia — Desjardins-backed digital insurance startup launch and expansion — `desjardins-general` · `press_release`
- [ ] SCM Insurance Services — acquisitions of claims/adjusting firms (most recent) — `user-added` · `press_release`
- [ ] Hub International Canada — brokerage acquisition activity (most recent) — `user-added` · `press_release`
- [ ] APRIL Canada — MGA acquisitions (most recent) — `user-added` · `press_release`
- [ ] Zurich Canada — P&C portfolio/segment changes (most recent) — `user-added` · `press_release`
- [ ] Pembridge Insurance Company — Intact's non-standard auto subsidiary, operational update — `intact-financial` · `press_release` · lob `personal_auto`
- [ ] belairdirect — Intact's direct-to-consumer brand expansion — `intact-financial` · `press_release`
- [ ] Definity — corporate brand consolidation across Sonnet / Economical / Family Insurance Solutions / Petline — `definity` · `press_release`
- [ ] Industry-wide M&A activity summary — most recent MSA Research / Canadian Underwriter year-in-review — `user-added` · `research_report`

## 14. Provincial Auto Reform Timeline

- [ ] Ontario 2003 — Bill 198, Automobile Insurance Rate Stabilization Act — `fsra` · `regulatory_circular` · prov `ON` · lob `personal_auto`
- [ ] Ontario 2010 — Five-Year Auto Insurance Review & SABS reduction (dup — already in vault: `Resources/Regulation/Historic Ontario Auto Reform - SABS Reduction (2010).md`)
- [ ] Ontario 2013 — Auto Insurance Cost and Rate Reduction Strategy — `fsra` · `regulatory_bulletin` · prov `ON` · lob `personal_auto`
- [ ] Ontario 2015 — Auto Insurance Rate Reduction targets — `fsra` · `regulatory_bulletin` · prov `ON` · lob `personal_auto`
- [ ] Ontario 2019 — "Putting Drivers First" reform announcement — `fsra` · `research_report` · prov `ON` · lob `personal_auto`
- [ ] Ontario 2021 — Recovery and Renewal plan (usage-based insurance promotion) — `fsra` · `regulatory_bulletin` · prov `ON` · lob `personal_auto`
- [ ] Ontario 2026 — SABS Optionality reform (dup — already in vault: `Resources/Regulation/July 2026 Ontario Auto Insurance Reform (2026).md`)
- [ ] Alberta 2004 — Bill 53 / Minor Injury Regulation introduction — `airb` · `regulatory_circular` · prov `AB` · lob `accident_sickness`
- [ ] Alberta 2020 — Bill 41, Good Driver Rate Cap — `airb` · `regulatory_circular` · prov `AB` · lob `personal_auto`
- [ ] Alberta 2023–24 — "Care-First" auto insurance reform announcement (Bill 26) — `airb` · `regulatory_circular` · prov `AB` · lob `personal_auto,accident_sickness`
- [ ] BC 2018 — ICBC financial crisis & Special Direction IC2 amendments — `bcfsa` · `regulatory_bulletin` · prov `BC` · lob `personal_auto`
- [ ] BC 2021 — Enhanced Care no-fault implementation — `bcfsa` · `regulatory_bulletin` · prov `BC` · lob `personal_auto,accident_sickness`
- [ ] Québec 1978 — Automobile Insurance Act no-fault regime introduction (historical) — `amf` · `regulatory_circular` · prov `QC` · lob `personal_auto,accident_sickness`
- [ ] Québec 2018 — Bill 141 distribution reform — `amf` · `regulatory_circular` · prov `QC`
- [ ] Nova Scotia 2003/2010 — minor-injury cap and rate-review reforms — `user-added` · `regulatory_circular` · prov `NS` · lob `personal_auto,accident_sickness`
- [ ] New Brunswick 2013 — auto insurance reform (minor-injury cap increase) — `user-added` · `regulatory_circular` · prov `NB` · lob `personal_auto,accident_sickness`
- [ ] Newfoundland and Labrador 2021–22 — Auto Insurance Review final report and reform — `user-added` · `research_report` · prov `NL` · lob `personal_auto`
- [ ] Saskatchewan — tort/no-fault choice system review and Auto Fund reforms (most recent) — `sgi-canada` · `regulatory_bulletin` · prov `SK` · lob `personal_auto`

## 15. Court Cases & Tort Reform

- [ ] Sabean v. Portage La Prairie Mutual Insurance Co. (SCC, 2017) — SABS deduction interpretation — `user-added` · `research_report` · exam `6c-1`
- [ ] Ledcor Construction v. Northbridge Indemnity Insurance Co. (SCC, 2016) — standard of review for insurance contract interpretation — `user-added` · `research_report` · exam `6c-1`
- [ ] Tridon Inc. v. Jensen (ONCA) — duty to defend — `user-added` · `research_report`
- [ ] Economical Mutual Insurance Co. v. Caughy — SABS interpretation case — `user-added` · `research_report` · lob `accident_sickness`
- [ ] Class actions — COVID-19 business-interruption claims against Canadian insurers (status summary) — `user-added` · `research_report` · lob `commercial_property`
- [ ] Heath v. Economical and related decisions — "catastrophic impairment" definition under SABS — `user-added` · `research_report` · lob `accident_sickness`
- [ ] Combined Insurance Co. of America v. Blashko — good-faith claims-handling standard — `user-added` · `research_report`
- [ ] Tort-threshold litigation — "permanent serious impairment" definition (Ontario appellate decisions) — `user-added` · `research_report` · prov `ON`
- [ ] Historical class actions — credit-score-based rating practices — `user-added` · `research_report` · lob `personal_auto`
- [ ] Court of Appeal decisions on territorial-rating discrimination claims — `user-added` · `research_report` · lob `personal_auto`
- [ ] Genetic Non-Discrimination Act (2020) — implications for insurance underwriting — `user-added` · `research_report`
- [ ] Definitional disputes — "accident" under SABS (appellate decision summary) — `user-added` · `research_report` · prov `ON` · lob `accident_sickness`

## 16. Climate & Catastrophe

- [ ] IBC — "Telling the Weather Story" report — `ibc` · `research_report` · exam `6c-1`
- [ ] IBC — "Investing in Canada's Future: The Cost of Climate Adaptation" — `ibc` · `research_report`
- [ ] Task Force on Flood Insurance and Relocation — final report to government (2022) — `user-added` · `research_report` · exam `6c-1`
- [ ] National Adaptation Strategy (Canada, most recent) — `user-added` · `research_report`
- [ ] OSFI — Guideline B-15 (Climate Risk Management) implementation timeline bulletin — `osfi` · `regulatory_bulletin`
- [ ] OSFI Standardized Climate Scenario Exercise (SCSE) — results summary — `osfi` · `research_report`
- [ ] Canadian Climate Institute — insurance and climate-risk reports (most recent) — `user-added` · `research_report`
- [ ] Partners for Action (University of Waterloo) — flood-risk research (most recent) — `user-added` · `research_report` · lob `personal_property`
- [ ] IBC Severe Weather Events Database — annual update — `ibc` · `industry_statistics`
- [ ] CatIQ (Catastrophe Indices and Quantification Inc.) — loss-data methodology overview — `user-added` · `research_report`

## 17. IFRS 17 / Accounting Transition

- [ ] OSFI — IFRS 17 Transition Resource Group communications for federally regulated insurers — `osfi` · `regulatory_circular` · exam `6c-1` (dup? cross-ref `Resources/Regulation/IFRS 17 Global Accounting Implementation (2023).md`)
- [ ] Intact Financial — IFRS 17 transition impact disclosure (investor materials) — `intact-financial` · `investor_presentation` · `accounting_standard: ifrs17`
- [ ] Definity — IFRS 17 first-time-adoption disclosures — `definity` · `md_and_a` · `accounting_standard: ifrs17`
- [ ] CPA Canada — IFRS 17 implementation guidance for P&C insurers — `user-added` · `research_report` · `accounting_standard: ifrs17`
- [ ] CIA — IFRS 17 Practice Education Course materials (cross-listed, see Section 9) — `cia (new)` · `cia_educational_note` · `accounting_standard: ifrs17`
- [ ] AMF — IFRS 17 transition expectations communication (cross-listed, see Section 4) — `amf` · `regulatory_circular` · `accounting_standard: ifrs17`
- [ ] OSFI — Source of Earnings under IFRS 17, revised guidance — `osfi` · `regulatory_circular` · `accounting_standard: ifrs17` · exam `6c-1`
- [ ] Comparative study — Canadian GAAP vs. IFRS 17 P&C reserve impacts — `user-added` · `research_report` · `accounting_standard: ifrs17,canadian_gaap`

## 18. Benchmarks & Industry Loss Trend Data

Dual-purpose section: feeds both `research_documents` (`type:
industry_statistics`) and the planned `Resources/Benchmarks/` vault directory
(`TimelineKind: 'benchmark'` in `quiz/vite.config.ts`, referenced as "OSFI
PC-1"). For vault entries, follow the `Resources/Regulation/*.md` frontmatter
pattern but with `type: benchmark`.

- [ ] OSFI P&C-1 Return — industry-aggregate supplement (most recent) — `osfi` · `industry_statistics` · vault candidate (`Resources/Benchmarks/OSFI PC-1 (year).md`) · exam `6c-1`
- [ ] OSFI — annual statistical summary of P&C industry MCT ratios and capital, by company — `osfi` · `industry_statistics` · exam `6c-1`
- [ ] AIRB — industry benchmark loss-trend rates, Private Passenger Auto (most recent) — `airb` · `industry_statistics` · prov `AB` · lob `personal_auto`
- [ ] AIRB — approved industry trend rates by coverage (Bodily Injury, Accident Benefits, Collision, Comprehensive) — `airb` · `industry_statistics` · prov `AB` · lob `personal_auto`
- [ ] FSRA — approved benchmark trend rates for Ontario auto rate filings (most recent) — `fsra` · `industry_statistics` · prov `ON` · lob `personal_auto`
- [ ] GISA — industry loss-trend exhibits, Private Passenger Auto by province (most recent) — `gisa` · `industry_statistics` · lob `personal_auto`
- [ ] GISA — commercial-lines benchmark exhibits (most recent) — `gisa` · `industry_statistics` · lob `commercial_auto,commercial_property,liability`
- [ ] AMF — Québec auto insurance benchmark loss-trend data (most recent) — `amf` · `industry_statistics` · prov `QC` · lob `personal_auto`
- [ ] IBC — industry-aggregate underwriting results / loss ratios by line of business (most recent) — `ibc` · `industry_statistics`
- [ ] ICBC — Basic insurance loss-trend benchmarks (BCFSA filing, most recent) — `icbc` · `industry_statistics` · prov `BC` · lob `personal_auto`
- [ ] SGI Canada / Saskatchewan Auto Fund — loss-trend benchmark data (most recent) — `sgi-canada` · `industry_statistics` · prov `SK` · lob `personal_auto`
- [ ] MPI — Basic insurance loss-trend rates (PUB filing, most recent) — `mpi` · `industry_statistics` · prov `MB` · lob `personal_auto`
- [ ] GISA — reinsurance-ceded benchmark statistics (most recent) — `gisa` · `industry_statistics`
- [ ] OSFI — earthquake exposure benchmark data (probable maximum loss by zone) — `osfi` · `industry_statistics` · lob `personal_property,commercial_property` · exam `6c-1`
- [ ] Robert Hall & Associates / third-party — Canadian severe-weather frequency benchmark data — `user-added` · `industry_statistics`
- [ ] MSA Research — annual benchmark industry report (combined ratios by company) — `user-added` · `industry_statistics` · vault candidate (`Resources/Benchmarks/...`)
- [ ] GISA — five-year historical industry experience summary, all lines — `gisa` · `industry_statistics` · vault candidate (`Resources/Benchmarks/...`)
