---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:f932d5af2a0e29cd1be1859d04e53c3b00059ad858eebc0ac395458dbcb32940
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 1 p.15 (PDF p.21); Part 3 intro pp.79-80 (PDF pp.85-86); Ch. 9 p.155 (PDF p.161), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p.138 (PDF p.150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Short Tail Insurance.md
---

![[Media/Figures/Short_Tail_Insurance.svg|340]]

**Short Tail Insurance** is insurance whose claims are reported and settled quickly, so that its [[Ultimate Loss|ultimate claims]] are often known within one or two years after the end of the accident period. Its typical lines are:

1. Automobile physical damage, collision and comprehensive.
2. Homeowners and other property insurance.
3. Inland marine, boiler and machinery, and most other first-party property covers.

Paid claims and [[Case Reserves|case outstanding]] are a high proportion of a short-tail line's ultimate claims at early maturities, so its [[IBNR]] is a small share of what remains unpaid. Its development is compact and its [[Tail Factor|tail factor]] is close to 1.000. Medical professional liability, at the other end, is a [[Long Tail Lines|long-tail line]].

> [!example]- A hail storm on $3/5/2024$ damages an insured car, and in the same year a worker is exposed to a substance that causes an occupational disease. How do the two claims differ at $12/31/2024$? {Example}
> - The comprehensive claim is reported within days and the car is appraised and paid within a month.
> - At $12/31/2024$ it is closed, and its cost is known.
> - The disease may not appear for years, so at $12/31/2024$ the workers compensation claim is not yet reported and sits entirely in pure IBNR.
> - Mixing the two lines in one triangle would give development factors that fit neither, so they are analyzed separately.

## Methods for short-tail lines

The development technique is particularly suitable for high-frequency, low-severity lines with timely reporting, so the [[Chain Ladder Method|development technique]] works well on short-tail data. When there is little or no pure IBNR, the [[Case Outstanding Development Method|case outstanding development technique]] is also appropriate, because it projects only from claims already reported.

## Seasonality in short-tail development

Short-tail data are often organized by accident half-year or quarter rather than accident year. Shorter periods show seasonality in development that annual data average together. In Friedland's private passenger collision example, the accident half-years ending in December close a smaller share of their claims by six months than those ending in June, so their 6 to 12 month closed count factors are higher. Each season's factor is then selected from the accident periods of that season.

## Catastrophe risk in short-tail lines

The main uncertainty in a short-tail line is not development but concentration. A single hail storm or hurricane can produce more loss in a day than a normal year, so [[Catastrophe Loss|catastrophe]] losses are excluded from the experience and loaded separately. A short-tail line can therefore have low reserve risk and very high catastrophe risk at the same time.
