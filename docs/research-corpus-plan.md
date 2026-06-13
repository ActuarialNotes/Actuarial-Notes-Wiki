# Canadian P&C Insurance Research Corpus — Vault Coverage Plan

Target: the **markdown vault** (`Resources/Regulation/`, `Resources/Events/`,
`Resources/Books/`, and a new `Resources/Benchmarks/`), not the Supabase
`research_documents` corpus. Every topic below becomes one vault page with
YAML frontmatter that includes a link to its source (PDF, website, or book).
This is fully executable from a coding session — no Supabase credentials
needed, just research + `git commit`.

374 topics, organized into 18 sections (same groupings as the original plan).

## Target schema A — `Resources/Regulation/`, `Resources/Events/`, `Resources/Benchmarks/`

Extends the existing `Resources/Regulation/*.md` / `Resources/Events/*.md`
frontmatter (see `Creation of OSFI (1987).md`, `IFRS 17 Global Accounting
Implementation (2023).md`) with three new fields:

```yaml
---
id: <reg|event|bench>-<jurisdiction>-<year>-<slug>
title: "..."
type: regulation | event | benchmark
status: effective | pending | superseded | historical
date: YYYY-MM-DD
published_date: YYYY-MM-DD        # optional, if different from effective date
jurisdiction: "CA" | "CA-ON" | "CA-AB" | "CA-QC" | "CA-BC" | "CA-MB" | "CA-SK" | ...
lob: ["P&C"]                       # or ["Auto-Personal","Auto-Commercial"], ["Property"], etc.
issuing_body: "..."
impact_level: high | medium | low
impacted_agents: [...]
tags: [...]
aliases: [...]
source_url: "https://..."          # NEW — primary source (regulator page, PDF, press release)
source_type: pdf | webpage | dataset | filing   # NEW
pdf_url: "https://..."             # NEW, optional — direct PDF if source_url is an HTML landing page
---
```

`type: benchmark` is new — used for `Resources/Benchmarks/`.

## Target schema B — `Resources/Books/`

Existing schema already has a source-link field (`Available from`); no new
fields needed. Used for CIA educational notes, PACICC/insurer reports,
investor decks, and recurring corporate filings — things that are "documents
to cite" rather than dated regulatory/timeline events.

```yaml
---
Title: "..."
Author: "..."          # issuing body / company
Publisher: "..."
Type: "Educational Note" | "Annual Report" | "MD&A" | "Investor Presentation" | "Press Release" | "Report"
Code: "..."             # optional (e.g. CIA document number)
Available from: "[host](https://...)"
---
```

## Phase 0 — repo prep (do first, small code task)

- [x] Create `Resources/Benchmarks/` directory (seeded with `OSFI PC-1 Return (2023).md`)
- [x] Add `{ dir: 'Resources/Benchmarks', kind: 'benchmark' }` to `TIMELINE_SOURCES` in `quiz/vite.config.ts`
- [x] Verify `type: benchmark` flows through `ResourceHeatmap.tsx` / `ResourceMonthCards.tsx` / `ConceptPopup` reader — `TimelineKind`, `KIND_LABEL`, `KIND_BADGE`, `KIND_ORDER`, and `TIMELINE_KINDS` already covered `'benchmark'`; only `pathToEntryRef` in `wikiRoutes.ts` was missing a `resources/benchmarks/` case (now added) so `[[wikilinks]]` into the new directory resolve correctly. `npm run build` and `npx vitest run` both pass.
- [x] New `source_url` / `source_type` / `pdf_url` frontmatter fields are documented above in "Target schema A" — this plan doc is the durable reference.

## How to use this plan

1. Work section by section. Each `- [ ]` is one vault page.
2. Most fields (`jurisdiction`, `issuing_body`, default `lob`, target
   directory) are declared **once per section** — only deviations are called
   out per item.
3. `src: TBD` means the source URL still needs to be found — that's the bulk
   of the remaining work, and is pure web research (good for batched,
   separate sessions/agents).
4. `(dup?)` flags items that may already exist as a `Resources/Regulation/*.md`
   or `Resources/Events/*.md` page — verify before creating a new one.
5. Filenames should follow the existing convention: `<Title> (<Year>).md`.

## Coverage summary

| # | Section | Target dir | Topics |
|---|---|---|---|
| 1 | OSFI — Federal Prudential Regulation | Regulation | 30 |
| 2 | FSRA — Ontario Market Conduct & Product Regulation | Regulation | 28 |
| 3 | AIRB — Alberta Auto Insurance Rate Regulation | Regulation | 15 |
| 4 | AMF — Québec | Regulation | 14 |
| 5 | BCFSA / ICBC — British Columbia | Regulation | 16 |
| 6 | Other Provinces & Territories | Regulation | 14 |
| 7 | IBC — Insurance Bureau of Canada | Benchmarks/Books | 14 |
| 8 | GISA — General Insurance Statistical Agency | Benchmarks | 10 |
| 9 | CIA — Educational Notes & Standards of Practice | Books | 30 |
| 10 | PACICC | Books/Regulation | 8 |
| 11 | Government & Residual-Market Programs | Regulation | 14 |
| 12 | Insurer Filings (13 insurers × 7) | Books | 91 |
| 13 | M&A & Corporate Events | Events | 25 |
| 14 | Provincial Auto Reform Timeline | Regulation/Events | 18 |
| 15 | Court Cases & Tort Reform | Events | 12 |
| 16 | Climate & Catastrophe | Books/Regulation/Benchmarks | 10 |
| 17 | IFRS 17 / Accounting Transition | Regulation/Books | 8 |
| 18 | Benchmarks & Industry Loss Trend Data | Benchmarks | 17 |
| | **Total** | | **374** |

---

## 1. OSFI — Federal Prudential Regulation (Solvency)

Target: `Resources/Regulation/`. `jurisdiction: "CA"` · `issuing_body: "Office of the Superintendent of Financial Institutions (OSFI)"` · default `lob: ["P&C"]`.

- [ ] Guideline A-4: Internal Target Capital Ratio for Federally Regulated Insurers — src: TBD
- [ ] Guideline B-2: Large Exposure Limits — src: TBD
- [ ] Guideline B-3: Sound Reinsurance Practices and Procedures — src: TBD
- [ ] Guideline B-8: Deterrence and Detection of Money Laundering and Terrorist Financing — src: TBD
- [ ] Guideline B-9: Earthquake Exposure Sound Practices — lob `["Property"]` — src: TBD
- [ ] Guideline B-10: Third-Party Risk Management — src: TBD
- [ ] Guideline B-13: Technology and Cyber Risk Management — src: TBD
- [ ] Guideline B-15: Climate Risk Management — src: TBD
- [ ] Guideline E-15: Appointed Actuary — Legal Requirements, Qualifications and External Review — src: TBD
- [ ] Guideline E-18: Stress Testing — src: TBD
- [ ] Guideline E-19: Own Risk and Solvency Assessment (ORSA) — src: TBD
- [ ] Guideline E-21: Operational Risk Management — src: TBD
- [ ] Corporate Governance Guideline (federally regulated insurers) — src: TBD
- [ ] Minimum Capital Test (MCT) Guideline for Federally Regulated P&C Insurers (current version) — src: TBD
- [ ] MCT Guideline — summary of year-over-year changes/advisories (most recent) — src: TBD
- [ ] Annual Return — General Instructions and Forms (P&C) — src: TBD
- [ ] Quarterly Return — Instructions and Filing Schedule — src: TBD
- [ ] Source of Earnings (SOE) Disclosure Requirements — src: TBD
- [ ] OSFI guidance on Dynamic Capital Adequacy Testing (DCAT) expectations for Appointed Actuaries — src: TBD
- [ ] IFRS 17 Transition Guidance for Federally Regulated Insurers — src: TBD
- [ ] OSFI Climate Risk Returns — mandatory disclosure pilot — src: TBD
- [ ] OSFI Annual Risk Outlook (most recent edition) — type `event`? no — keep `regulation` — src: TBD
- [ ] OSFI Supervisory Framework — overview document — src: TBD
- [ ] Memorandum to the Appointed Actuary — Property and Casualty Insurance (most recent annual letter) — src: TBD
- [ ] Capital treatment of Reinsurance Ceded to Unregistered Reinsurers — src: TBD
- [ ] Letter: Valuation of Insurance Contract Liabilities under the IFRS 17 transitional approach — src: TBD
- [ ] Internal Capital Target (ICT) framework — most recent revisions — src: TBD
- [ ] OSFI supervisory communications on pandemic / business-interruption exposure for P&C insurers — src: TBD
- [ ] Foreign branch operations — Part XIII insurers, Vice-Superintendent standards — src: TBD
- [ ] Group-wide supervision framework for federally regulated insurance groups — src: TBD

## 2. FSRA — Ontario Market Conduct & Product Regulation

Target: `Resources/Regulation/`. `jurisdiction: "CA-ON"` · `issuing_body: "Financial Services Regulatory Authority of Ontario (FSRA)"` · default `lob: ["Auto-Personal","Auto-Commercial"]`.

- [ ] Auto Insurance Rate Filing Guidelines (current edition) — src: TBD
- [ ] Take-All-Comers requirement guidance (Insurance Act, s. 27) — src: TBD
- [ ] Risk Classification System filing requirements — Private Passenger Auto — src: TBD
- [ ] Territory Definitions — Ontario Private Passenger Auto — src: TBD
- [ ] Fair Practices in the Distribution of Automobile Insurance Rule (2018-001/REG) — src: TBD
- [ ] Unfair or Deceptive Acts or Practices (UDAP) Rule — src: TBD
- [ ] Statutory Accident Benefits Schedule (O. Reg. 34/10) — consolidated text and amendment history — lob `+["Accident-Sickness"]` — src: TBD (dup? cross-ref `Resources/Regulation/Historic Ontario Auto Reform - SABS Reduction (2010).md`)
- [ ] Minor Injury Guideline (MIG) — definitions and treatment caps — lob `["Accident-Sickness"]` — src: TBD
- [ ] OPCF 44R — Family Protection Endorsement — src: TBD
- [ ] OPCF 28 — Transportation Network Driver coverage — src: TBD
- [ ] OPCF 47R — SABS Optionality opt-out endorsement (2026 reform) — src: TBD (dup? cross-ref `Resources/Regulation/July 2026 Ontario Auto Insurance Reform (2026).md`)
- [ ] Health Claims for Auto Insurance (HCAI) data-standard guidance — lob `["Accident-Sickness"]` — src: TBD
- [ ] Auto Insurance Anti-Fraud Task Force — Final Report — type `event` — src: TBD
- [ ] FSRA Statement of Priorities (most recent fiscal year) — src: TBD
- [ ] FSRA Annual Report (most recent) — src: TBD
- [ ] "File and Use" rate-approval reform — consultation paper — status `pending` — src: TBD
- [ ] Credit Score Prohibition in Auto Insurance Rating — rule amendment — src: TBD
- [ ] Vulnerable Claimants in the Auto Insurance System — strategy paper — lob `["Accident-Sickness"]` — src: TBD
- [ ] Direct Compensation for Property Damage (DCPD) Agreement — Ontario — src: TBD
- [ ] OPCF 44 — Uninsured Automobile Coverage — src: TBD
- [ ] Travel Health Insurance — FSRA guidance for insurers and agents — lob `["Accident-Sickness"]` — src: TBD
- [ ] Title Insurance — market conduct review — lob `["Property"]` — src: TBD
- [ ] FSRA Market Conduct Examination — Auto Insurers thematic review (most recent) — src: TBD
- [ ] FSRA Consultation: SABS Optionality implementation guidance (2026 reform follow-up) — status `pending` — src: TBD
- [ ] Bill 171 (2024) — insurance-related schedule, Ontario Legislature — src: TBD
- [ ] Bill 15 (2014) — Fighting Fraud and Reducing Automobile Insurance Rates Act — status `historical` — src: TBD (dup? cross-ref "Ontario Reg. 664" in Exam 6C reading list)
- [ ] "Putting Drivers First" auto insurance strategy (2019 announcement) — type `event` — src: TBD
- [ ] Auto Insurance Anti-Fraud Task Force — implementation progress report — type `event` — src: TBD

## 3. AIRB — Alberta Auto Insurance Rate Regulation

Target: `Resources/Regulation/` (benchmark-flavoured items → `Resources/Benchmarks/`). `jurisdiction: "CA-AB"` · `issuing_body: "Alberta Insurance Rate Board (AIRB)"` · default `lob: ["Auto-Personal"]`.

- [ ] AIRB Annual Review of Automobile Insurance Rates — industry report (most recent) — dir `Benchmarks` — src: TBD
- [ ] Automobile Insurance Premiums Annual Report (Alberta) — dir `Benchmarks` — src: TBD
- [ ] Grid Rating Program — methodology guideline — src: TBD
- [ ] Bulletin: Good Driver Rate Cap (Insurance Amendment Act, 2020 / Bill 41) — src: TBD
- [ ] Filing Guidelines for Private Passenger Vehicles — src: TBD
- [ ] Order — annual rate-cap extension/removal decision (most recent) — src: TBD
- [ ] Direct Compensation for Property Damage (DCPD) — Alberta implementation — src: TBD
- [ ] Diagnostic and Treatment Protocols Regulation — minor injury cap (Alberta) — lob `["Accident-Sickness"]` — src: TBD
- [ ] AIRB Annual Report (most recent) — src: TBD
- [ ] Alberta Risk Sharing Pool — Plan of Operation — src: TBD
- [ ] Bill 26 (Stronger, Fairer Auto Insurance Act) — "Care-First" auto insurance reform — lob `+["Accident-Sickness"]` — src: TBD
- [ ] Industry benchmark rate filing — loss trend rates by coverage (most recent) — dir `Benchmarks` — src: TBD
- [ ] Automobile Insurance Premium Survey (Alberta) — dir `Benchmarks` — src: TBD
- [ ] AIRB Consultation — optional product reform — status `pending` — src: TBD
- [ ] Alberta Superintendent of Insurance — Annual Report on Automobile Insurance — src: TBD

## 4. AMF — Québec

Target: `Resources/Regulation/`. `jurisdiction: "CA-QC"` · `issuing_body: "Autorité des marchés financiers (AMF)"` · default `lob: ["P&C"]`.

- [ ] Sound Commercial Practices Guideline — src: TBD
- [ ] An Act respecting the distribution of financial products and services (Distribution Act) — consolidated text — src: TBD
- [ ] Bill 141 (2018) — insurance distribution and consumer-protection amendments — src: TBD
- [ ] Information Capsules — insurance sector (recent series) — src: TBD
- [ ] Insurers Act (Québec) — consolidated text — src: TBD
- [ ] Automobile Insurance Act (Québec) — no-fault bodily-injury regime overview — lob `["Auto-Personal","Accident-Sickness"]` — src: TBD
- [ ] AMF Annual Report (most recent) — src: TBD
- [ ] Regulation respecting complaint processing and dispute resolution in insurance — src: TBD
- [ ] IFRS 17 transition expectations communication — Québec-chartered insurers — src: TBD
- [ ] AMF Supervisory Framework (overview document) — src: TBD
- [ ] Regulation respecting Alternative Distribution Methods — src: TBD
- [ ] AMF Climate Risk Guideline — expectations for Québec insurers — src: TBD
- [ ] AMF market-conduct bulletin: damage insurance vs. insurance-of-persons distribution rules — src: TBD
- [ ] Groupement des assureurs automobiles (GAA) — territorial rate classification methodology — lob `["Auto-Personal"]` — dir `Benchmarks` — src: TBD

## 5. BCFSA / ICBC — British Columbia

Target: `Resources/Regulation/`. `jurisdiction: "CA-BC"` · `issuing_body: "BC Financial Services Authority (BCFSA)"` (override to `"Insurance Corporation of British Columbia (ICBC)"` where noted) · default `lob: ["Auto-Personal"]`.

- [ ] Enhanced Care (no-fault) reform — overview and implementation bulletin — lob `+["Accident-Sickness"]` — src: TBD
- [ ] ICBC Basic Insurance annual rate application — issuing_body `ICBC` — src: TBD
- [ ] Special Direction IC2 — rate-setting framework for Basic insurance — src: TBD
- [ ] ICBC Annual Report (most recent) — issuing_body `ICBC` — dir `Books` (Type: Annual Report) — src: TBD
- [ ] ICBC Service Plan / quarterly financial report (most recent) — issuing_body `ICBC` — dir `Books` (Type: Report) — src: TBD
- [ ] BCFSA Market Conduct Guidelines for Insurers — lob `["P&C"]` — src: TBD
- [ ] Financial Institutions Act (BC) — insurance provisions, consolidated — lob `["P&C"]` — src: TBD
- [ ] Insurance (Vehicle) Act and Regulations (BC) — consolidated text — src: TBD
- [ ] Optional Auto Insurance Market Competition Review — type `event` — src: TBD
- [ ] BC Utilities Commission — historical ICBC rate-oversight transition documents — status `historical` — src: TBD
- [ ] ICBC Multi-Year Rate Plan (post Enhanced Care) — issuing_body `ICBC` — src: TBD
- [ ] BCFSA Annual Service Plan Report (most recent) — src: TBD
- [ ] ICBC Enhanced Care — Care Recovery Benefits structure and schedules — issuing_body `ICBC` — lob `["Accident-Sickness"]` — src: TBD
- [ ] BCFSA Climate Risk Expectations for Insurers — lob `["P&C"]` — src: TBD
- [ ] Insurance Premium Tax Act (BC) — consolidated text — lob `["P&C"]` — src: TBD
- [ ] BCFSA Fair Treatment of Customers Guideline — lob `["P&C"]` — src: TBD

## 6. Other Provinces & Territories (MB, SK, Atlantic, North)

Target: `Resources/Regulation/` (Crown-insurer rate filings → `Resources/Benchmarks/`). `jurisdiction` per item · default `lob: ["Auto-Personal"]`.

- [ ] Manitoba Public Insurance — Basic Compulsory Insurance annual rate application (to PUB) — `jurisdiction: "CA-MB"` · `issuing_body: "Manitoba Public Insurance (MPI)"` — dir `Benchmarks` — src: TBD
- [ ] Manitoba Public Utilities Board — MPI rate-hearing decision (most recent) — `jurisdiction: "CA-MB"` · `issuing_body: "Manitoba Public Utilities Board"` — src: TBD
- [ ] Saskatchewan Auto Fund — SGI Canada annual report (most recent) — `jurisdiction: "CA-SK"` · `issuing_body: "SGI Canada"` — dir `Books` (Type: Annual Report) — src: TBD
- [ ] Saskatchewan Auto Fund — rate indication application (most recent) — `jurisdiction: "CA-SK"` — dir `Benchmarks` — src: TBD
- [ ] Saskatchewan — choice of tort vs. no-fault auto insurance, program overview — `jurisdiction: "CA-SK"` · lob `+["Accident-Sickness"]` — src: TBD
- [ ] Nova Scotia Insurance Act amendments — 2010 minor-injury cap reform — `jurisdiction: "CA-NS"` · `issuing_body: "Nova Scotia Legislature"` · lob `+["Accident-Sickness"]` — src: TBD
- [ ] Nova Scotia Utility and Review Board — auto insurance rate regulation framework — `jurisdiction: "CA-NS"` — src: TBD
- [ ] New Brunswick Insurance Act amendments — 2013 reform, minor-injury cap increase — `jurisdiction: "CA-NB"` · lob `+["Accident-Sickness"]` — src: TBD
- [ ] New Brunswick Financial and Consumer Services Commission — auto insurance oversight bulletin — `jurisdiction: "CA-NB"` — src: TBD
- [ ] Newfoundland and Labrador Auto Insurance Review (2020–2022) — final report — `jurisdiction: "CA-NL"` · type `event` — src: TBD
- [ ] PEI Insurance Act — auto insurance provisions, consolidated — `jurisdiction: "CA-PE"` — src: TBD
- [ ] Facility Association — Atlantic region residual-market rate filings (most recent) — `jurisdiction: "CA-NB/NS/NL/PE"` · `issuing_body: "Facility Association"` — dir `Benchmarks` — src: TBD
- [ ] GISA — Atlantic region (NB, NS, NL, PE) data-reporting requirements overview — `jurisdiction: "CA-NB/NS/NL/PE"` · `issuing_body: "General Insurance Statistical Agency (GISA)"` — src: TBD
- [ ] Auto insurance regulatory framework — Yukon, NWT, Nunavut (territories) overview — `jurisdiction: "CA"` — src: TBD

## 7. IBC — Insurance Bureau of Canada

Target: `Resources/Benchmarks/` for stats series, `Resources/Books/` for reports. `jurisdiction: "CA"` · `issuing_body`/`Author: "Insurance Bureau of Canada (IBC)"` · default `lob: ["P&C"]`.

- [ ] Facts of the General Insurance Industry in Canada (most recent annual edition) — dir `Books` (Type: Report) — src: TBD
- [ ] IBC Catastrophe Loss Report (most recent year) — dir `Benchmarks` — src: TBD
- [ ] IBC Catastrophe Loss Report — prior-year comparison series (3–5 years back) — dir `Benchmarks` — src: TBD
- [ ] IBC Auto Theft Report (most recent annual edition) — dir `Benchmarks` · lob `["Auto-Personal","Auto-Commercial"]` — src: TBD
- [ ] IBC — "Cost of Severe Weather" report series — dir `Books` (Type: Report) — src: TBD
- [ ] IBC — Insurance Fraud: Cost to Canadians study — dir `Books` (Type: Report) — src: TBD
- [ ] IBC submission to FSRA on Ontario auto insurance reform (most recent consultation) — dir `Regulation` · type `event` · `jurisdiction: "CA-ON"` · lob `["Auto-Personal"]` — src: TBD
- [ ] IBC submission to AIRB annual rate review (most recent) — dir `Regulation` · type `event` · `jurisdiction: "CA-AB"` · lob `["Auto-Personal"]` — src: TBD
- [ ] IBC — water/flood risk and insurance position papers — dir `Books` (Type: Report) · lob `["Property"]` — src: TBD
- [ ] IBC — National Disaster Mitigation Fund advocacy materials — dir `Books` (Type: Report) — src: TBD
- [ ] IBC — Auto Insurance Affordability research (most recent) — dir `Books` (Type: Report) · lob `["Auto-Personal"]` — src: TBD
- [ ] IBC — Used Vehicle Information Standards (claims/total-loss) — dir `Regulation` · lob `["Auto-Personal"]` — src: TBD
- [ ] IBC — Industry Underwriting Results Summary (most recent quarter) — dir `Benchmarks` — src: TBD
- [ ] IBC — Wildfire Risk to Homes report — dir `Books` (Type: Report) · lob `["Property"]` — src: TBD

## 8. GISA — General Insurance Statistical Agency

Target: `Resources/Benchmarks/` (manuals → `Resources/Regulation/`). `jurisdiction: "CA"` · `issuing_body: "General Insurance Statistical Agency (GISA)"`.

- [ ] GISA Automobile Statistical Plan — manual (current edition) — dir `Regulation` · lob `["Auto-Personal","Auto-Commercial"]` — src: TBD
- [ ] GISA General Liability Statistical Plan — manual — dir `Regulation` · lob `["Liability"]` — src: TBD
- [ ] GISA Personal Property Statistical Plan — manual — dir `Regulation` · lob `["Property"]` — src: TBD
- [ ] GISA Industry Experience Exhibits — Private Passenger Auto (most recent) — lob `["Auto-Personal"]` — src: TBD
- [ ] GISA Industry Experience Exhibits — Commercial Auto (most recent) — lob `["Auto-Commercial"]` — src: TBD
- [ ] GISA DCPD Experience Exhibits (most recent) — lob `["Auto-Personal","Auto-Commercial"]` — src: TBD
- [ ] GISA Data Call Specifications — annual update — dir `Regulation` — src: TBD
- [ ] GISA Closed Claim Studies — Auto Bodily Injury — lob `["Auto-Personal","Accident-Sickness"]` — src: TBD
- [ ] GISA Underwriting Performance Reports by Province (most recent) — src: TBD
- [ ] GISA Governance and Participating Jurisdictions overview — dir `Regulation` — src: TBD

## 9. CIA — Educational Notes & Standards of Practice

Target: `Resources/Books/`. `Author: "Canadian Institute of Actuaries (CIA)"` · `Type: "Educational Note"` unless noted.

- [ ] CIA Standards of Practice — General Standards (Section 1000) — Type `Standards of Practice` — src: TBD
- [ ] CIA Standards of Practice — Insurance Practice, P&C sections (2300s) ("CIA CSOP") — Type `Standards of Practice` — src: TBD
- [ ] Educational Note: Premium Liabilities — src: TBD
- [ ] Educational Note: Discount Rate Assumptions for P&C Insurance ("CIA Discount Rates") — src: TBD
- [ ] Educational Note: Duration of the Liabilities for P&C Insurers ("CIA Duration") — src: TBD
- [ ] Educational Note: Financial Condition Testing — Part 1 ("CIA FCT 1") — src: TBD
- [ ] Educational Note: Financial Condition Testing — Part 2 ("CIA FCT 2") — src: TBD
- [ ] Educational Note: IFRS 17 — Comparison to Current CIA Standards ("CIA IFRS 1") — src: TBD
- [ ] Educational Note: IFRS 17 — Discount Rates and Risk Adjustment ("CIA IFRS 2") — src: TBD
- [ ] Educational Note: IFRS 17 — Liability for Remaining Coverage ("CIA IFRS 17 - LRC") — src: TBD
- [ ] Educational Note: IFRS 17 — Comparison of P&C Actuarial Estimates ("CIA IFRS 17 - Comparison") — src: TBD
- [ ] Educational Note: Materiality ("CIA Materiality") — src: TBD
- [ ] Educational Note: Use of Models ("CIA Models") — src: TBD
- [ ] Educational Note: Premium Allocation Approach under IFRS 17 ("CIA PAA") — src: TBD
- [ ] Educational Note: Accounting and Reinsurance Treatment under IFRS 17 ("CIA Reinsurance Treatment") — src: TBD
- [ ] Educational Note: Runoff of Claim Liabilities ("CIA Runoff") — src: TBD
- [ ] Educational Note: Subsequent Events ("CIA Subsequent Events") — src: TBD
- [ ] Educational Note: Territories and Discount Rate Curves ("CIA Territories") — src: TBD
- [ ] Educational Note: Valuation of Policy Liabilities for P&C Insurers ("CIA Valuation") — src: TBD
- [ ] Educational Note: Investigation of Bias and Volatility Considerations ("CIA Bias") — src: TBD
- [ ] Role of the Appointed Actuary — guidance note ("CIA Appointed Actuary") — src: TBD
- [ ] Educational Note: Climate Change Considerations for Actuaries — src: TBD
- [ ] Educational Note: ULAE (Unallocated Loss Adjustment Expense) Reserves — src: TBD
- [ ] Educational Note: Use of Actuarial Judgement — src: TBD
- [ ] CIA Rules of Professional Conduct — Type `Standards of Practice` — src: TBD
- [ ] Educational Note: Reinsurance Considerations for P&C Insurers — src: TBD
- [ ] CIA Practice Council update — P&C (most recent) — Type `Report` — src: TBD
- [ ] CIA Task Force Report — IFRS 17 implementation lessons learned — Type `Report` — src: TBD
- [ ] Educational Note: Going Concern and Solvency Assessment under IFRS 17 — src: TBD
- [ ] CIA Practice Education Course materials — IFRS 17 for P&C — Type `Study Note` — src: TBD

## 10. PACICC

Target: `Resources/Books/` (Memorandum/Compensation Plan → `Resources/Regulation/`). `Author`/`issuing_body: "Property and Casualty Insurance Compensation Corporation (PACICC)"`.

- [ ] PACICC Memorandum of Operation — dir `Regulation` · `jurisdiction: "CA"` (dup? cross-ref "PACICC"/"KPMG PACICC" in Exam 6C reading list) — src: TBD
- [ ] PACICC Annual Report (most recent) — Type `Annual Report` — src: TBD
- [ ] PACICC "Why Insurers Fail" research series (most recent paper) — Type `Report` — src: TBD
- [ ] PACICC Risk-Based Capital framework discussion paper — Type `Report` — src: TBD
- [ ] PACICC — Policyholder Protection in a Hard Market study — Type `Report` — src: TBD
- [ ] PACICC Compensation Plan for personal-lines policyholders — terms and limits — dir `Regulation` · `jurisdiction: "CA"` — src: TBD
- [ ] PACICC — stress-testing P&C insurer insolvency scenarios — Type `Report` — src: TBD
- [ ] PACICC — international comparison of guaranty-fund systems — Type `Report` — src: TBD

## 11. Government & Residual-Market Programs

Target: `Resources/Regulation/`. `jurisdiction: "CA"` (override per item) · default `lob: ["P&C"]`.

- [ ] AgriInsurance / Canadian Agricultural Partnership — program guidelines — `issuing_body: "Agriculture and Agri-Food Canada"` (dup? "Agricultural Programs" in Exam 6C reading list) — src: TBD
- [ ] Production Insurance Program — provincial crop insurance agreements (overview) — `issuing_body: "Agriculture and Agri-Food Canada"` — src: TBD
- [ ] Employment Insurance Act — overview and relevance to disability income programs — `issuing_body: "Employment and Social Development Canada"` ("Employment Insurance" in Exam 6C reading list) — src: TBD
- [ ] Canada's Task Force on Flood Insurance and Relocation — final report — type `event` · `issuing_body: "Government of Canada"` (dup? "GOC Flood Risks" in Exam 6C reading list) — src: TBD
- [ ] Facility Association — Plan of Operation — `issuing_body: "Facility Association"` · lob `["Auto-Personal","Auto-Commercial"]` — src: TBD
- [ ] Facility Association — Risk Sharing Pool (RSP) rules — `issuing_body: "Facility Association"` · lob `["Auto-Personal"]` — src: TBD
- [ ] Facility Association — Annual Report (most recent) — dir `Books` (Type: Annual Report) · `Author: "Facility Association"` — src: TBD
- [ ] Facility Association — residual-market mechanism, by-province summary — dir `Benchmarks` · `issuing_body: "Facility Association"` · lob `["Auto-Personal"]` — src: TBD
- [ ] Workplace Safety and Insurance Board (Ontario, WSIB) — Annual Report — dir `Books` (Type: Annual Report) · `jurisdiction: "CA-ON"` ("Workers Compensation Insurance" in Exam 6C reading list) — src: TBD
- [ ] Alberta Workers' Compensation Board — Annual Report — dir `Books` (Type: Annual Report) · `jurisdiction: "CA-AB"` — src: TBD
- [ ] Canadian Government Crop Reinsurance Fund — structure overview — `issuing_body: "Government of Canada"` — src: TBD
- [ ] CMHC mortgage insurance vs. P&C property insurance — regulatory distinction note — `issuing_body: "Canada Mortgage and Housing Corporation (CMHC)"` · lob `["Property"]` — src: TBD
- [ ] Export Development Canada — trade credit insurance program overview — `issuing_body: "Export Development Canada"` · lob `["Liability"]` — src: TBD
- [ ] Government-backed disability/A&S programs — comparative overview (federal/provincial) — lob `["Accident-Sickness"]` — src: TBD

## 12. Insurer Filings

Target: `Resources/Books/`. Each entry: `Author: <insurer legal name>` · `Publisher: <insurer>` · `Type` as noted · `Available from:` = src.

### Insurance Corporation of British Columbia (ICBC) — `jurisdiction: CA-BC`
- [ ] Annual Report (most recent) — Type `Annual Report` — src: TBD
- [ ] Service Plan (most recent) — Type `Report` — src: TBD
- [ ] Q1 financial results — Type `Quarterly Report` — src: TBD
- [ ] Q2 financial results — Type `Quarterly Report` — src: TBD
- [ ] Q3 financial results — Type `Quarterly Report` — src: TBD
- [ ] Enhanced Care performance update (most recent) — Type `Press Release` — src: TBD
- [ ] Multi-Year Rate Plan filing — Type `Report` — src: TBD

### Intact Financial Corporation
- [ ] Annual Report (most recent) — Type `Annual Report` — src: TBD
- [ ] Q1 MD&A — Type `MD&A` — src: TBD
- [ ] Q2 MD&A — Type `MD&A` — src: TBD
- [ ] Q3 MD&A — Type `MD&A` — src: TBD
- [ ] Q4 / full-year MD&A — Type `MD&A` — src: TBD
- [ ] Investor Day presentation (most recent) — Type `Investor Presentation` — src: TBD
- [ ] Press release — RSA Canada integration / portfolio update — Type `Press Release` — src: TBD

### Desjardins General Insurance Group
- [ ] Desjardins Group Annual Report — General Insurance segment — Type `Annual Report` — src: TBD
- [ ] Q1 financial results — General Insurance segment — Type `Quarterly Report` — src: TBD
- [ ] Q2 financial results — General Insurance segment — Type `Quarterly Report` — src: TBD
- [ ] Q3 financial results — General Insurance segment — Type `Quarterly Report` — src: TBD
- [ ] Q4 / full-year financial results — General Insurance segment — Type `Quarterly Report` — src: TBD
- [ ] Investor/analyst presentation — General Insurance segment — Type `Investor Presentation` — src: TBD
- [ ] Press release — Onlia digital insurance expansion — Type `Press Release` — src: TBD

### Aviva Canada Inc.
- [ ] Annual financial statements (OSFI filing, most recent) — Type `Annual Report` — src: TBD
- [ ] Aviva plc — Q1 trading update, Canada segment commentary — Type `Quarterly Report` — src: TBD
- [ ] Aviva plc — H1 results, Canada segment commentary — Type `Quarterly Report` — src: TBD
- [ ] Aviva plc — Q3 trading update, Canada segment commentary — Type `Quarterly Report` — src: TBD
- [ ] Aviva plc — full-year results, Canada segment commentary — Type `Quarterly Report` — src: TBD
- [ ] Investor presentation — Canada segment — Type `Investor Presentation` — src: TBD
- [ ] Press release — acquisition of RBC's home and auto insurance manufacturing business — Type `Press Release` — src: TBD

### TD Insurance
- [ ] TD Bank Group Annual Report — Insurance segment — Type `Annual Report` — src: TBD
- [ ] Q1 results — Insurance segment — Type `Quarterly Report` — src: TBD
- [ ] Q2 results — Insurance segment — Type `Quarterly Report` — src: TBD
- [ ] Q3 results — Insurance segment — Type `Quarterly Report` — src: TBD
- [ ] Q4 / full-year results — Insurance segment — Type `Quarterly Report` — src: TBD
- [ ] Investor Day presentation — Insurance segment — Type `Investor Presentation` — src: TBD
- [ ] Press release — Insurance segment strategy / portfolio announcement — Type `Press Release` — src: TBD

### The Co-operators General Insurance Company
- [ ] Co-operators Group Annual Report (most recent) — Type `Annual Report` — src: TBD
- [ ] Co-operators financial statements (OSFI filing, most recent) — Type `Annual Report` — src: TBD
- [ ] Sustainability / ESG report (most recent) — Type `Report` — src: TBD
- [ ] Press release — CUMIS Group integration update — Type `Press Release` — src: TBD
- [ ] Community investment / impact report (most recent) — Type `Report` — src: TBD
- [ ] Economic outlook / affordability research (most recent) — Type `Report` — src: TBD
- [ ] Member/policyholder annual update — Type `Press Release` — src: TBD

### Definity Financial Corporation
- [ ] Annual Report (most recent) — Type `Annual Report` — src: TBD
- [ ] Q1 MD&A — Type `MD&A` — src: TBD
- [ ] Q2 MD&A — Type `MD&A` — src: TBD
- [ ] Q3 MD&A — Type `MD&A` — src: TBD
- [ ] Q4 / full-year MD&A — Type `MD&A` — src: TBD
- [ ] Investor Day presentation (most recent) — Type `Investor Presentation` — src: TBD
- [ ] Press release — Sonnet Insurance full-ownership acquisition (2023) — Type `Press Release` — src: TBD

### Allstate Insurance Company of Canada
- [ ] Allstate Corporation 10-K — Canada segment notes (most recent) — Type `Annual Report` — src: TBD
- [ ] Allstate Canada financial statements (OSFI filing, most recent) — Type `Annual Report` — src: TBD
- [ ] Allstate Corp Q1 earnings call — Canada commentary — Type `Quarterly Report` — src: TBD
- [ ] Allstate Corp Q2 earnings call — Canada commentary — Type `Quarterly Report` — src: TBD
- [ ] Allstate Corp Q3 earnings call — Canada commentary — Type `Quarterly Report` — src: TBD
- [ ] Allstate Corp Q4 earnings call — Canada commentary — Type `Quarterly Report` — src: TBD
- [ ] Press release — Allstate Canada rate filing / community initiative (most recent) — Type `Press Release` — src: TBD

### Wawanesa Mutual Insurance Company
- [ ] Annual Report (most recent) — Type `Annual Report` — src: TBD
- [ ] Financial statements (OSFI filing, most recent) — Type `Annual Report` — src: TBD
- [ ] Press release — Western Financial Group integration update — Type `Press Release` — src: TBD
- [ ] Press release — recent M&A / expansion announcement — Type `Press Release` — src: TBD
- [ ] Sustainability report (most recent) — Type `Report` — src: TBD
- [ ] AM Best rating action report (most recent) — Type `Report` — src: TBD
- [ ] Member/policyholder report (most recent) — Type `Press Release` — src: TBD

### Chubb Insurance Company of Canada
- [ ] Chubb Limited 10-K — Canada segment notes (most recent) — Type `Annual Report` — src: TBD
- [ ] Chubb Canada financial statements (OSFI filing, most recent) — Type `Annual Report` — src: TBD
- [ ] Chubb Ltd investor presentation — Canada/international notes — Type `Investor Presentation` — src: TBD
- [ ] Chubb Ltd Q1 earnings call — Canada commentary — Type `Quarterly Report` — src: TBD
- [ ] Chubb Ltd Q2 earnings call — Canada commentary — Type `Quarterly Report` — src: TBD
- [ ] Chubb Ltd Q3 earnings call — Canada commentary — Type `Quarterly Report` — src: TBD
- [ ] Press release — Chubb Canada product/distribution announcement (most recent) — Type `Press Release` — src: TBD

### Gore Mutual Insurance Company
- [ ] Annual Report (most recent) — Type `Annual Report` — src: TBD
- [ ] Financial statements (OSFI filing, most recent) — Type `Annual Report` — src: TBD
- [ ] "Project 2025" transformation press release / update — Type `Press Release` — src: TBD
- [ ] Sustainability / ESG report (most recent) — Type `Report` — src: TBD
- [ ] Press release — broker partnership / distribution announcement — Type `Press Release` — src: TBD
- [ ] AM Best rating action report (most recent) — Type `Report` — src: TBD
- [ ] Community / foundation report (most recent) — Type `Press Release` — src: TBD

### SGI Canada — `jurisdiction: CA-SK/AB/MB/ON/BC`
- [ ] SGI CANADA Annual Report (competitive lines segment, most recent) — Type `Annual Report` — src: TBD
- [ ] Saskatchewan Crown Investments Corporation Annual Report — SGI segment — Type `Annual Report` — src: TBD
- [ ] Q1–Q3 quarterly financial reports — Type `Quarterly Report` — src: TBD
- [ ] Auto Fund rate filing — Saskatchewan — Type `Report` — src: TBD
- [ ] Press release — SGI Canada multi-province expansion update — Type `Press Release` — src: TBD
- [ ] SGI Canada investor/analyst note (if available) — Type `Investor Presentation` — src: TBD
- [ ] SGI Canada sustainability report (most recent) — Type `Report` — src: TBD

### Manitoba Public Insurance — `jurisdiction: CA-MB`
- [ ] Annual Report (most recent) — Type `Annual Report` — src: TBD
- [ ] Q1 financial report — Type `Quarterly Report` — src: TBD
- [ ] Q2 financial report — Type `Quarterly Report` — src: TBD
- [ ] Q3 financial report — Type `Quarterly Report` — src: TBD
- [ ] PUB rate-application materials (most recent Basic insurance application) — Type `Report` — src: TBD
- [ ] Basic insurance rate decision (most recent PUB order) — Type `Report` — src: TBD
- [ ] Corporate plan (most recent) — Type `Report` — src: TBD

## 13. M&A & Corporate Events

Target: `Resources/Events/`. `jurisdiction: "CA"` (override per item) · default `lob: ["P&C"]` · `impact_level: medium` unless noted.

- [ ] Intact Financial — acquisition of RSA Insurance Group's Canada, UK & International operations (2021, joint deal with Tryg) — `impact_level: high` — src: TBD
- [ ] Intact Financial — acquisition of Frank Cowan Company (2020) — src: TBD
- [ ] Intact Financial — On Side Restoration / NARS network expansion — src: TBD
- [ ] Intact Financial — BrokerLink brokerage roll-up acquisitions (most recent) — src: TBD
- [ ] Definity Financial Corporation — demutualization and IPO of Economical Insurance (2021/2022) — `impact_level: high` — src: TBD
- [ ] Definity — acquisition of remaining stake in Sonnet Insurance (2023) — src: TBD
- [ ] Trisura Group — spin-off from Brookfield Asset Management and Canadian/US expansion — src: TBD
- [ ] Westland Insurance Group — brokerage acquisitions across Canada (most recent roll-up) — `jurisdiction: "CA-BC"` — src: TBD
- [ ] Wawanesa Mutual — acquisition of Western Financial Group (2019) — src: TBD
- [ ] Beneva — merger of La Capitale and SSQ Insurance (2020) — `jurisdiction: "CA-QC"` — src: TBD
- [ ] Aviva Canada — acquisition of RBC's home and auto insurance manufacturing business (2023) — `impact_level: high` — src: TBD
- [ ] Gore Mutual Insurance — "Project 2025" transformation and strategic partnerships — src: TBD
- [ ] CAA Insurance Company — ownership and governance structure within the CAA Club Group network — src: TBD
- [ ] Co-operators — acquisition/integration of CUMIS Group — src: TBD
- [ ] Northbridge Financial Corporation — Fairfax Financial subsidiary restructuring (most recent) — src: TBD
- [ ] Travelers Insurance Company of Canada — rebrand history from Dominion of Canada General Insurance — status `historical` — src: TBD
- [ ] Onlia — Desjardins-backed digital insurance startup launch and expansion — src: TBD
- [ ] SCM Insurance Services — acquisitions of claims/adjusting firms (most recent) — src: TBD
- [ ] Hub International Canada — brokerage acquisition activity (most recent) — src: TBD
- [ ] APRIL Canada — MGA acquisitions (most recent) — src: TBD
- [ ] Zurich Canada — P&C portfolio/segment changes (most recent) — src: TBD
- [ ] Pembridge Insurance Company — Intact's non-standard auto subsidiary, operational update — lob `["Auto-Personal"]` — src: TBD
- [ ] belairdirect — Intact's direct-to-consumer brand expansion — src: TBD
- [ ] Definity — corporate brand consolidation across Sonnet / Economical / Family Insurance Solutions / Petline — src: TBD
- [ ] Industry-wide M&A activity summary — most recent MSA Research / Canadian Underwriter year-in-review — dir `Books` (Type: Report) — src: TBD

## 14. Provincial Auto Reform Timeline

Target: `Resources/Regulation/` for legislative/regulatory text, `Resources/Events/` for announcements/reviews. Default `lob: ["Auto-Personal"]`.

- [ ] Ontario 2003 — Bill 198, Automobile Insurance Rate Stabilization Act — dir `Regulation` · `jurisdiction: "CA-ON"` · status `historical` — src: TBD
- [ ] Ontario 2010 — Five-Year Auto Insurance Review & SABS reduction — *(dup — already in vault: `Resources/Regulation/Historic Ontario Auto Reform - SABS Reduction (2010).md`)*
- [ ] Ontario 2013 — Auto Insurance Cost and Rate Reduction Strategy — dir `Regulation` · `jurisdiction: "CA-ON"` · status `historical` — src: TBD
- [ ] Ontario 2015 — Auto Insurance Rate Reduction targets — dir `Regulation` · `jurisdiction: "CA-ON"` · status `historical` — src: TBD
- [ ] Ontario 2019 — "Putting Drivers First" reform announcement — dir `Events` · `jurisdiction: "CA-ON"` — src: TBD
- [ ] Ontario 2021 — Recovery and Renewal plan (usage-based insurance promotion) — dir `Regulation` · `jurisdiction: "CA-ON"` — src: TBD
- [ ] Ontario 2026 — SABS Optionality reform — *(dup — already in vault: `Resources/Regulation/July 2026 Ontario Auto Insurance Reform (2026).md`)*
- [ ] Alberta 2004 — Bill 53 / Minor Injury Regulation introduction — dir `Regulation` · `jurisdiction: "CA-AB"` · lob `["Accident-Sickness"]` · status `historical` — src: TBD
- [ ] Alberta 2020 — Bill 41, Good Driver Rate Cap — dir `Regulation` · `jurisdiction: "CA-AB"` — src: TBD
- [ ] Alberta 2023–24 — "Care-First" auto insurance reform announcement (Bill 26) — dir `Events` · `jurisdiction: "CA-AB"` · lob `+["Accident-Sickness"]` — src: TBD
- [ ] BC 2018 — ICBC financial crisis & Special Direction IC2 amendments — dir `Events` · `jurisdiction: "CA-BC"` — src: TBD
- [ ] BC 2021 — Enhanced Care no-fault implementation — dir `Regulation` · `jurisdiction: "CA-BC"` · lob `+["Accident-Sickness"]` — src: TBD
- [ ] Québec 1978 — Automobile Insurance Act no-fault regime introduction (historical) — dir `Regulation` · `jurisdiction: "CA-QC"` · lob `+["Accident-Sickness"]` · status `historical` — src: TBD
- [ ] Québec 2018 — Bill 141 distribution reform — dir `Regulation` · `jurisdiction: "CA-QC"` · lob `["P&C"]` — src: TBD
- [ ] Nova Scotia 2003/2010 — minor-injury cap and rate-review reforms — dir `Regulation` · `jurisdiction: "CA-NS"` · lob `+["Accident-Sickness"]` · status `historical` — src: TBD
- [ ] New Brunswick 2013 — auto insurance reform (minor-injury cap increase) — dir `Regulation` · `jurisdiction: "CA-NB"` · lob `+["Accident-Sickness"]` · status `historical` — src: TBD
- [ ] Newfoundland and Labrador 2021–22 — Auto Insurance Review final report and reform — dir `Events` · `jurisdiction: "CA-NL"` — src: TBD
- [ ] Saskatchewan — tort/no-fault choice system review and Auto Fund reforms (most recent) — dir `Regulation` · `jurisdiction: "CA-SK"` — src: TBD

## 15. Court Cases & Tort Reform

Target: `Resources/Events/`. `type: event` · default `lob: ["Auto-Personal","Accident-Sickness"]`.

- [ ] Sabean v. Portage La Prairie Mutual Insurance Co. (SCC, 2017) — SABS deduction interpretation — `jurisdiction: "CA"` — src: TBD
- [ ] Ledcor Construction v. Northbridge Indemnity Insurance Co. (SCC, 2016) — standard of review for insurance contract interpretation — `jurisdiction: "CA"` · lob `["P&C"]` — src: TBD
- [ ] Tridon Inc. v. Jensen (ONCA) — duty to defend — `jurisdiction: "CA-ON"` · lob `["Liability"]` — src: TBD
- [ ] Economical Mutual Insurance Co. v. Caughy — SABS interpretation case — `jurisdiction: "CA-ON"` — src: TBD
- [ ] Class actions — COVID-19 business-interruption claims against Canadian insurers (status summary) — `jurisdiction: "CA"` · lob `["Commercial-Property"]` — src: TBD
- [ ] Heath v. Economical and related decisions — "catastrophic impairment" definition under SABS — `jurisdiction: "CA-ON"` — src: TBD
- [ ] Combined Insurance Co. of America v. Blashko — good-faith claims-handling standard — `jurisdiction: "CA"` · lob `["P&C"]` — src: TBD
- [ ] Tort-threshold litigation — "permanent serious impairment" definition (Ontario appellate decisions) — `jurisdiction: "CA-ON"` — src: TBD
- [ ] Historical class actions — credit-score-based rating practices — `jurisdiction: "CA"` · lob `["Auto-Personal"]` · status `historical` — src: TBD
- [ ] Court of Appeal decisions on territorial-rating discrimination claims — `jurisdiction: "CA"` · lob `["Auto-Personal"]` — src: TBD
- [ ] Genetic Non-Discrimination Act (2020) — implications for insurance underwriting — `jurisdiction: "CA"` · lob `["P&C"]` — src: TBD
- [ ] Definitional disputes — "accident" under SABS (appellate decision summary) — `jurisdiction: "CA-ON"` — src: TBD

## 16. Climate & Catastrophe

Target: mixed — `Resources/Books/` for reports, `Resources/Regulation/` for guidelines, `Resources/Benchmarks/` for data series. Default `jurisdiction: "CA"` · `lob: ["Property"]`.

- [ ] IBC — "Telling the Weather Story" report — dir `Books` (Type: Report, Author: IBC) — src: TBD
- [ ] IBC — "Investing in Canada's Future: The Cost of Climate Adaptation" — dir `Books` (Type: Report, Author: IBC) — src: TBD
- [ ] Task Force on Flood Insurance and Relocation — final report to government (2022) — dir `Events` · `issuing_body: "Government of Canada"` — src: TBD
- [ ] National Adaptation Strategy (Canada, most recent) — dir `Regulation` · `issuing_body: "Government of Canada"` — src: TBD
- [ ] OSFI — Guideline B-15 (Climate Risk Management) implementation timeline bulletin — dir `Regulation` · `issuing_body: "OSFI"` · lob `["P&C"]` — src: TBD
- [ ] OSFI Standardized Climate Scenario Exercise (SCSE) — results summary — dir `Books` (Type: Report, Author: OSFI) · lob `["P&C"]` — src: TBD
- [ ] Canadian Climate Institute — insurance and climate-risk reports (most recent) — dir `Books` (Type: Report) — src: TBD
- [ ] Partners for Action (University of Waterloo) — flood-risk research (most recent) — dir `Books` (Type: Report) — src: TBD
- [ ] IBC Severe Weather Events Database — annual update — dir `Benchmarks` — src: TBD
- [ ] CatIQ (Catastrophe Indices and Quantification Inc.) — loss-data methodology overview — dir `Books` (Type: Report) — src: TBD

## 17. IFRS 17 / Accounting Transition

Target: `Resources/Regulation/` for transition guidance, `Resources/Books/` for insurer disclosures and study material. Default `jurisdiction: "CA"` · `lob: ["P&C"]`.

- [ ] OSFI — IFRS 17 Transition Resource Group communications for federally regulated insurers — dir `Regulation` · `issuing_body: "OSFI"` (dup? cross-ref `Resources/Regulation/IFRS 17 Global Accounting Implementation (2023).md`) — src: TBD
- [ ] Intact Financial — IFRS 17 transition impact disclosure (investor materials) — dir `Books` (Type: Investor Presentation, Author: Intact Financial Corporation) — src: TBD
- [ ] Definity — IFRS 17 first-time-adoption disclosures — dir `Books` (Type: MD&A, Author: Definity Financial Corporation) — src: TBD
- [ ] CPA Canada — IFRS 17 implementation guidance for P&C insurers — dir `Books` (Type: Report, Author: CPA Canada) — src: TBD
- [ ] CIA — IFRS 17 Practice Education Course materials *(cross-listed, see Section 9)*
- [ ] AMF — IFRS 17 transition expectations communication *(cross-listed, see Section 4)*
- [ ] OSFI — Source of Earnings under IFRS 17, revised guidance — dir `Regulation` · `issuing_body: "OSFI"` — src: TBD
- [ ] Comparative study — Canadian GAAP vs. IFRS 17 P&C reserve impacts — dir `Books` (Type: Report) — src: TBD

## 18. Benchmarks & Industry Loss Trend Data

Target: `Resources/Benchmarks/` (new directory — see Phase 0). Default `jurisdiction: "CA"`.

- [x] OSFI P&C-1 Return — industry-aggregate supplement (most recent) — `issuing_body: "OSFI"` — done: `Resources/Benchmarks/OSFI PC-1 Return (2023).md`
- [ ] OSFI — annual statistical summary of P&C industry MCT ratios and capital, by company — `issuing_body: "OSFI"` — src: TBD
- [ ] AIRB — industry benchmark loss-trend rates, Private Passenger Auto (most recent) — `jurisdiction: "CA-AB"` · `issuing_body: "AIRB"` · lob `["Auto-Personal"]` — src: TBD
- [ ] AIRB — approved industry trend rates by coverage (Bodily Injury, Accident Benefits, Collision, Comprehensive) — `jurisdiction: "CA-AB"` · `issuing_body: "AIRB"` · lob `["Auto-Personal"]` — src: TBD
- [ ] FSRA — approved benchmark trend rates for Ontario auto rate filings (most recent) — `jurisdiction: "CA-ON"` · `issuing_body: "FSRA"` · lob `["Auto-Personal"]` — src: TBD
- [ ] GISA — industry loss-trend exhibits, Private Passenger Auto by province (most recent) — `issuing_body: "GISA"` · lob `["Auto-Personal"]` — src: TBD
- [ ] GISA — commercial-lines benchmark exhibits (most recent) — `issuing_body: "GISA"` · lob `["Auto-Commercial","Commercial-Property","Liability"]` — src: TBD
- [ ] AMF — Québec auto insurance benchmark loss-trend data (most recent) — `jurisdiction: "CA-QC"` · `issuing_body: "AMF"` · lob `["Auto-Personal"]` — src: TBD
- [ ] IBC — industry-aggregate underwriting results / loss ratios by line of business (most recent) — `issuing_body: "IBC"` — src: TBD
- [ ] ICBC — Basic insurance loss-trend benchmarks (BCFSA filing, most recent) — `jurisdiction: "CA-BC"` · `issuing_body: "ICBC"` · lob `["Auto-Personal"]` — src: TBD
- [ ] SGI Canada / Saskatchewan Auto Fund — loss-trend benchmark data (most recent) — `jurisdiction: "CA-SK"` · `issuing_body: "SGI Canada"` · lob `["Auto-Personal"]` — src: TBD
- [ ] MPI — Basic insurance loss-trend rates (PUB filing, most recent) — `jurisdiction: "CA-MB"` · `issuing_body: "MPI"` · lob `["Auto-Personal"]` — src: TBD
- [ ] GISA — reinsurance-ceded benchmark statistics (most recent) — `issuing_body: "GISA"` — src: TBD
- [ ] OSFI — earthquake exposure benchmark data (probable maximum loss by zone) — `issuing_body: "OSFI"` · lob `["Property"]` — src: TBD
- [ ] Robert Hall & Associates / third-party — Canadian severe-weather frequency benchmark data — `issuing_body: "Robert Hall & Associates"` — src: TBD
- [ ] MSA Research — annual benchmark industry report (combined ratios by company) — `issuing_body: "MSA Research"` — src: TBD
- [ ] GISA — five-year historical industry experience summary, all lines — `issuing_body: "GISA"` — src: TBD
