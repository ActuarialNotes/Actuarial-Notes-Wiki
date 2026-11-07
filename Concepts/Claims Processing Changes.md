---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:bffdfab764e92d428d30e0d8452deeae4b595a434e55913a215969a9a921f681
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 pp. 44-47; Ch. 6 pp. 68-76 (management reports, closed-to-reported, average values, CNP, footnote 29); Ch. 7 pp. 96-103; Ch. 9 p. 158; Ch. 11 p. 206; Ch. 13 pp. 283-293; Ch. 15 p. 349, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claims Processing Changes.md
---

![[Media/Figures/Claims_Processing_Changes.svg|340]]

**Claims Processing Changes** are changes in how an insurer's claims department handles claims, such as its case reserving guidelines and formulas, its claims system, its adjusters' staffing and caseloads, its settlement authority and its settlement strategy. They change when claims are paid and how they are reserved, so they change the development patterns. They are internal changes, unlike inflation or legislation.

A processing change works through one of two channels:

1. **Case reserving**: a change in [[Case Adequacy|case adequacy]] distorts reported development and leaves paid development alone.
2. **Settlement speed**: a change in the [[Settlement Rate|settlement rate]] distorts paid development. With case adequacy unchanged, reported claims are largely unaffected, because each payment is offset by a reduction in case outstanding.

A processing change affects every accident year still open when it happens, so it shows along a diagonal of the triangle, as a calendar-year effect. Strengthening case reserves across all accident years in one calendar year is an example.

The settlement rate is measured by the disposal rate, the cumulative closed claim count of an accident year at an age divided by its ultimate claim count:

> $$\text{Disposal Rate} = \frac{\text{Closed Claim Counts}}{\text{Ultimate Claim Counts}}$$

Case adequacy is measured by the average case outstanding, the case outstanding of an accident year at an age divided by its number of open claims:

> $$\text{Average Case Outstanding} = \frac{\text{Case Outstanding}}{\text{Open Claim Counts}}$$

Read down a column of the [[Data Diagnostic Analysis|diagnostic]] triangles, each change suggests an operational cause:

| Diagnostic, down a column | Suggests |
| --- | --- |
| Paid-to-reported claims rising | Faster payment, or weaker case reserves |
| Closed-to-reported counts rising | Faster settlement |
| Closed-to-reported counts falling | Slower settlement |
| Average case outstanding falling | Weaker case reserves |
| Average case outstanding rising faster than the severity trend | Stronger case reserves |

> [!example]- An insurer introduces fast-track settlement for auto bodily injury, and claims now close in about half the time they did. Historical $12$-to-$24$ month paid factors averaged $1.45$, and the recent years show about $1.20$. What happens if the historical factors are applied to the recent years? {Example}
> - More of each recent year's ultimate is already paid at $12$ months, so its paid claims are high relative to its ultimate.
> - The historical factor of $1.45$ was built when less had been paid by $12$ months, so applying it to the recent years overstates their ultimate claims.
> - The [[Berquist-Sherman Method|Berquist-Sherman]] paid adjustment restates the historical paid triangle to the current settlement rate, so that its factors fit the recent years.
> - With case adequacy unchanged, the reported development technique is largely unaffected and can be relied on instead.

## Changes in the handling of large and small claims

A shift in the claims department's emphasis between large and small claims affects both triangles. More attention to large claims, which are fewer, more complex and slower to settle, can slow the settlement of small claims while speeding up the large ones. The large claims' case outstanding then leaves the triangle sooner and their payments appear at earlier ages than in the past. Changes in handling, such as adding adjusters or clearing a backlog, change which claims close in a period. That moves the average paid per closed claim without any change in the underlying cost of claims. A change in the timing of ALAE payments, such as paying legal expenses earlier in a claim's life, makes historical ALAE development factors inappropriate in the same way.

To understand a change, the actuary asks the claims department about its case reserving philosophy, its claims system and reserve formulas, its adjusters' staffing and experience, and its settlement strategy, and when each changed.

> [!example]- At $24$ months, the disposal rate rose from $57\%$ to $71\%$ over two years, and the average case outstanding from $\$11{,}500$ to $\$18{,}200$, far faster than the severity trend. What is happening, and which techniques remain usable? {Example}
> - The rising disposal rate shows claims closing faster, which overstates paid development.
> - The average case outstanding rising faster than trend shows case reserves strengthened, which overstates reported development.
> - Both triangles are distorted, so neither can serve as the clean check on the other.
> - The two Berquist-Sherman adjustments, one for settlement rate and one for case adequacy, restate each triangle before development.
> - The [[Expected Loss Method|expected claims technique]] relies on an a priori estimate of ultimate claims and is unaffected by changes in settlement rate or case adequacy.
