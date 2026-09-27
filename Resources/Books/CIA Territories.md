---
Title: "Territory Pricing Considerations in Property and Casualty Insurance"
Authors: "Canadian Institute of Actuaries"
Publisher: "Canadian Institute of Actuaries"
Year: "2024"
date: "2024"
Type: "Paper"
Code: "224032"
Available from: "[cia-ica.ca](https://www.cia-ica.ca/publications/224032e/)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:340f712a9c9baa01e9d2c8e17602966bcad14e97c422292526187e9a0975bc90
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA Territories.md
---
![[CIA Territories - Cover.svg]]

A CIA practice resource document on territorial ratemaking in property and casualty insurance, emphasizing the need for an adaptive approach. Dated March 11, 2024 (document 224032), it treats territory as a cornerstone rating variable, typically built from geographic building blocks such as postal code, forward sortation area (FSA) and census blocks, and concludes that territory pricing balances technical modelling, market dynamics, regulatory and fairness considerations, and organizational guidelines.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objective A1; the whole document.

## 1 Overview
- [[Territorial Rating|Territorial ratemaking]] generally has two phases: determining the boundaries of each territory, then determining their rate relativities.
- 1.1 Considerations in determining territorial boundaries
    - Size/credibility: territories granular enough to capture variations in expected loss costs, yet large enough for a [[Credibility|credible]] dataset.
    - Intuitive link to risk: desirable for explainability, but not a necessity for using a territory definition.
    - Regulations: territories need not be contiguous or uniform across coverages or perils, but mandates for contiguity or limits on the number of territories may shape the boundaries.
- 1.2 Considerations in determining territory relativities in addition to considering the expected loss cost in a particular territory
    - Competitiveness and business strategy, and dislocation and its impact on customer retention and new business volumes.

## 2 Technical modelling considerations
- A common approach attributes all risk characteristics not captured by other [[Rating Variable|rating variables]] to territory.
- The steps: build a non-territory model; calculate residual loss costs at the building-block level (e.g., FSA); model the residuals to group similar ones, balancing each block's credibility with its neighbours'; and finalize the boundaries, where claims or business development teams can add insight.

## 3 Lifecycle
- Boundaries and relativities should be reviewed regularly, though boundaries usually need refreshing less often than pricing models, depending on changes in population, the portfolio and the territory's risk profiles.

## 4 Third-party data and models
- Third-party data — topography, accident location, crime, weather and public transportation data — can help determine boundaries and relativities, subject to its appropriateness and accuracy.
- For natural catastrophe perils such as flood and earthquake, internal loss data alone may not be appropriate and zones from a third-party [[Catastrophe Modelling|model]] can be more accurate; relying on one calls for due diligence and model validation.

## 5 Additional considerations on using postal codes to define territories
- Advantages: every Canadian address has one, Statistics Canada releases data at the postal code level, the first digits allow a quick high-level review, and many are small enough for risks to be somewhat homogeneous within them.
- Disadvantages: a rural postal code can cover 15–20 square km or more, definitions are updated every month, and they are defined for Canada Post's delivery routes rather than insurance risk.

## 6 Fairness considerations
- Territory definitions may intersect with sociodemographic factors, so regulatory concerns around fairness and company internal guidelines must be factored into territory definitions and rate relativities.
- It points to the CIA's 2023 *Bias and Fairness in Pricing and Underwriting of Property and Casualty (P&C) Risks* for guidance.

## Related readings
- [[CIA Bias]] — the CIA's 2023 bias and fairness paper, cited in Section 6

## Sources
- [Territory Pricing Considerations in Property and Casualty Insurance (CIA, 2024)](https://www.cia-ica.ca/publications/224032e/) — the landing page (type, accession number, publication date) and the linked PDF: title page, table of contents and Sections 1–6
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation and the assigned scope
