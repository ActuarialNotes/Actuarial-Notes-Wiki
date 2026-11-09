---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:223fc1682b46e3bcec8327eeff7c3df3582a3eb4bae9b361fc42b2b6a905e611
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.1 p.15 (PDF 21); Ch.5 p.52 (PDF 58); Ch.13; Ch.17 p.392 incl. fn.99 (PDF 398), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Incurred Losses.md
---

![[Media/Figures/Incurred_Losses.svg|340]]

**Incurred Losses**, which Friedland calls **reported claims**, are the cumulative [[Paid Losses|paid claims]] on known claims through a valuation date plus the [[Case Reserves|case outstanding]] on them at that date. They are also called case incurred losses, and they exclude [[IBNR]]. For an accident year at a valuation date they are

> $$\text{Reported Claims} = \text{Paid Claims} + \text{Case Outstanding}$$

- $\text{Paid Claims}$ are the cumulative payments on the accident year's claims through the valuation date.
- $\text{Case Outstanding}$ is the case reserves on its reported claims at the valuation date, which is also the average case outstanding times the number of open claims.
- Both are net of the same recoveries, such as deductibles.

The ultimate claims are the reported claims plus the IBNR, so the IBNR is

> $$\text{IBNR} = \text{Ultimate Claims} - \text{Reported Claims}$$

This IBNR is the broad one. It is the pure IBNR, or IBNYR, on claims that have occurred but have not yet been reported, plus the IBNER, the future development on claims already reported. A cumulative reported triangle is built by adding each accident year's case outstanding at each valuation date to its cumulative paid claims.

> [!example]- An accident year has $\$450{,}000$ paid and $\$350{,}000$ of case outstanding at 24 months. The reported CDF from 24 months to ultimate is 1.35. What are its reported claims, its ultimate claims and its IBNR? {Example}
> - The reported claims are $450{,}000 + 350{,}000 = \$800{,}000$.
> - The ultimate claims are $800{,}000 \times 1.35 = \$1{,}080{,}000$.
> - The IBNR is $1{,}080{,}000 - 800{,}000 = \$280{,}000$.
> - It is the pure IBNR on claims not yet reported plus the expected development on the claims already in the $\$800{,}000$.

## Incurred losses in a calendar year

The word *incurred* means different things to different people. To someone in finance, the incurred losses of a calendar year are the payments made in the year plus the change in total unpaid claims, including IBNR. To an actuary building a triangle, incurred losses are cumulative payments plus case outstanding, with no IBNR. Some U.S. triangles, such as Schedule P's incurred losses, do include IBNR. Friedland uses *reported claims* for the triangle to avoid the ambiguity.

## Reported claim development

Reported claims emerge faster than paid claims, because a case reserve is set as soon as a claim is known. The reported CDFs are therefore smaller than the paid CDFs, and reported development is less leveraged. The cost is that reported development mixes new information with re-estimates of known claims, so it assumes that [[Case Adequacy|case adequacy]] has not changed. A strengthening of case outstanding raises the latest diagonal, and applying the historical reported factors to it overstates ultimate claims.

Reported claims can also develop downward, when claims settle for less than their case reserves or when [[Salvage and Subrogation|salvage and subrogation]] recoveries are in the data. Age-to-age factors below 1.000 are then expected.

> [!trap] Subtracting paid claims to get IBNR
> IBNR is ultimate claims minus reported claims, not minus paid claims. Ultimate claims minus paid claims is everything still to be paid, which also holds the case outstanding.
