---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:55cb99ca49d9103310a20c32efa012f8ddcab59ebf805c832a6f02060bdf1e93
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.106,110 (PDF pp.118,122) and Ch. 8 p.142 (PDF p.154), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 1 p.9 (PDF p.15) and Ch. 7 (PDF p.94), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Line of Business.md
---

![[Media/Figures/Line_of_Business.svg|340]]

A **Line of Business** is a group of insurance policies that cover the same kind of risk, such as personal automobile, homeowners, workers compensation or medical malpractice. It is the first level at which ratemaking and reserving data is divided. Lines differ in:

1. **Exposure base.** Personal auto is rated on car-years, homeowners on house-years and workers compensation on payroll ([[Exposure Base|exposure base]]).
2. **Coverage trigger.** Most lines are written on an [[Occurrence Coverage|occurrence]] basis, and some, such as medical malpractice, on a [[Claims Made Coverage|claims-made]] basis.
3. **Reporting and settlement patterns.** Property claims are reported and paid quickly, while liability claims can take years to settle ([[Long Tail Lines|long-tailed lines]]).
4. **Claim size.** Property damage claims are relatively small, while bodily injury claims in the same policy can cost millions.

Schedule P of the U.S. statutory Annual Statement reports premiums, payments and unpaid claims [[Schedule P|by line of insurance]], so a company's internal segments roll up to those lines.

> [!example]- Claims from commercial auto policies are reported and settled more slowly than claims from personal auto policies. Should an insurer whose commercial book is growing 30% a year, against 5% for personal auto, develop the two lines together? {Example}
> - Combined development factors are a weighted average of the two lines' patterns.
> - The weight on the slower commercial pattern grows each year, so the historical combined factors no longer describe the current mix.
> - Combining the lines would distort the development of the latest years, so the two lines are developed separately.

## Coverages within a line

Development and trend are analyzed on a body of homogeneous claims. That may be a line of business, or something more granular, such as the coverages or types of loss within the line. Liability claims and property claims are typically analyzed separately, and workers compensation indemnity and medical losses may be separated. A homeowners policy, for example, covers both the property and liability exposures of a home.

> [!example]- An insurer reserves its personal auto line as one triangle. Its auto property damage claims are reported and paid within months, while its bodily injury claims take years to settle. Should it split the triangle? {Example}
> - The two coverages have different reporting and payment patterns and tail lengths.
> - A combined triangle's development factors mix the two patterns in proportions that can change from year to year.
> - If each coverage has enough data to be credible, it is analyzed separately, and the estimates are added up for the line.

> [!trap] Combining lines whose mix is changing
> Two lines with different development patterns can be analyzed together only while their relative volumes are stable. A combined triangle of a fast line and a slow line whose share is growing will understate the development still to come on the latest years.
