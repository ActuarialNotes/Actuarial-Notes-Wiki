---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:335ffbe3361ec4dcac87c53495ae2d38ed68121c7e974d306a5722bfd98f6a42
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.1 p.14 (PDF 20); Ch.2 'Overview' p.17 (PDF 23); Part 3 intro pp.79-80 (PDF 85-86); Ch.13 pp.284-290 (PDF 290-296), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Case Reserves.md
---

**Case Reserves**, also called case outstanding, are the estimates of the unpaid amounts on individual claims that have been reported to and recorded by the insurer. They are set by claims adjusters, third-party administrators or independent adjusters from what is known about each claim, and they do not include future development on those claims. The case outstanding of an accident year at a valuation date is

> $$\text{Case Outstanding} = \text{Reported Claims} - \text{Paid Claims}$$

- $\text{Reported Claims}$ are the accident year's [[Incurred Losses|reported claims]], the cumulative paid claims plus the case outstanding.
- $\text{Paid Claims}$ are its cumulative [[Paid Losses|paid claims]] through the valuation date.

A case reserve is the adjuster's estimate on the information known at the time, and it changes as medical reports, legal proceedings and settlement talks bring new information. The total [[Unpaid Claims|unpaid claims]] are the case outstanding plus the [[IBNR]]. The case outstanding covers the known claims, and the IBNR covers the development on them (IBNER) and the claims not yet reported (IBNYR).

> [!example]- Three claims from accident year 2023 are reported during 2023, with case reserves at $12/31/2023$ of $\$200$, $\$300$ and $\$400$. A fourth 2023 claim is reported in May 2024 with a case reserve of $\$1{,}000$, and by $12/31/2024$ the first two claims have closed and the third has a case reserve of $\$200$. What is accident year 2023's case outstanding at 12 and 24 months? {Example}
> - At 12 months, only the three claims reported in 2023 are in the triangle, so the case outstanding is $200 + 300 + 400 = \$900$.
> - At 24 months, the closed claims have no case reserve, so the case outstanding is the third claim's $\$200$ plus the fourth claim's $\$1{,}000$, or $\$1{,}200$.
> - Each cell holds each claim's latest reserve at the valuation date, never a sum of its earlier reserves.

## Setting case reserves

For some claims the initial case reserve is a formula or tabular value. An insurer may set every automobile glass claim at a fixed amount, or set a workers compensation reserve by the type of injury. For other claims the adjuster makes an independent estimate, and insurers differ on what the estimate is. A common basis is the best estimate of the ultimate settlement value, including future inflation. Others set the maximum value, the policy limit, or the mode or the expected value of the settlement.

> [!example]- A medical malpractice claim has a $\$1{,}000{,}000$ limit. Counsel estimates an 80% chance it settles with no payment and a 20% chance it settles for the full limit. What case reserve does each basis give? {Example}
> - On the maximum value basis, the case reserve is the $\$1{,}000{,}000$ limit.
> - On the mode basis, it is $\$0$, the most likely outcome.
> - On the expected value basis, it is $0.80 \times 0 + 0.20 \times 1{,}000{,}000 = \$200{,}000$.

Insurers also differ on whether case reserves include claim adjustment expenses and whether they are net of expected [[Salvage and Subrogation|salvage and subrogation]], so the actuary must know which before using the data.

## Case adequacy and development

Changes in case reserving adequacy over time distort development triangle patterns. A strengthening of case reserves raises the latest diagonal of the reported triangle and its factors, so historical reported factors applied to it overstate ultimate claims, most for the latest accident years. A large gap between the paid and reported projections is the usual sign. The [[Berquist-Sherman Method|Berquist-Sherman]] adjustment restates the historical triangles to the current [[Case Adequacy|case adequacy]].

The [[Case Outstanding Development Method|case outstanding development technique]] projects future payments from the case reserves, so it estimates the development on known claims but not the pure IBNR. It suits data with no pure IBNR, such as a [[Report Year|report year]] or claims-made coverage.
