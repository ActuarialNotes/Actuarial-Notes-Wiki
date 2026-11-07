---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:a081ddf16f436e9729289cc49207c42a314f869ee1ed9d9175c350fec12287a5
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.1 pp.13-14 (PDF 19-20); Part 3 intro pp.79-80 (PDF 85-86); Ch.3 p.42 (PDF 48); Ch.7 p.95 (PDF 101); Ch.17 pp.388-389 (PDF 394-395), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/IBNR.md
---

![[Media/Figures/IBNR.svg|340]]

**IBNR**, incurred but not reported, is the provision for claims that have occurred but are not yet in an insurer's [[Incurred Losses|reported claims]]. It is carried as a liability. In the broad sense used in reserving, the IBNR of an accident year is its [[Ultimate Loss|ultimate claims]] less its reported claims:

> $$\text{IBNR} = \text{Ultimate Claims} - \text{Reported Claims}$$

- $\text{Reported Claims}$ are the paid claims plus the case outstanding, so IBNR is measured from reported claims, not from paid claims.

The total [[Unpaid Claims|unpaid claims]] are the ultimate claims less the paid claims, which is the case outstanding plus the IBNR. IBNR is estimated for a whole accident year, not claim by claim, and the total is the sum over the accident years. Net IBNR is net ultimate claims less net reported claims, and ceded IBNR is gross IBNR less net IBNR.

> [!example]- An accident year has estimated ultimate claims of $\$1{,}200{,}000$, paid claims of $\$500{,}000$ and case outstanding of $\$300{,}000$. What are its reported claims, IBNR and unpaid claims? {Example}
> - The reported claims are $500{,}000 + 300{,}000 = \$800{,}000$.
> - The IBNR is $1{,}200{,}000 - 800{,}000 = \$400{,}000$.
> - The unpaid claims are the case outstanding plus the IBNR, $300{,}000 + 400{,}000 = \$700{,}000$.
> - As a check, the ultimate claims less the paid claims are $1{,}200{,}000 - 500{,}000 = \$700{,}000$.

## Components of IBNR

The broad IBNR has four components: future development on known claims, reopened claims, claims incurred but not yet reported, and claims in transit, which are reported but not yet recorded. It is usually split in two:

> $$\text{IBNR} = \text{IBNER} + \text{IBNYR}$$

- $\text{IBNER}$, incurred but not enough reported, is the future development on known claims, the amount by which their case reserves will prove inadequate. It can be negative when case reserves are set conservatively.
- $\text{IBNYR}$, incurred but not yet reported, is **pure IBNR**, the narrow definition: claims that have occurred and are not yet reported to the insurer.

The unpaid claims are then the case outstanding plus IBNER plus IBNYR. Separating the two tests the adequacy of case outstanding over time. One method estimates pure IBNR from claim counts: the projected ultimate counts less the reported counts are the IBNR counts, valued at the ultimate severity, and IBNER is the rest of the IBNR. Report year analysis, [[Frequency-Severity Method|frequency-severity]] techniques and judgment are also used.

> [!example]- AY 2023 at 24 months has reported claims of $\$4{,}000{,}000$ on 500 reported claims. Its ultimate claims are estimated at $\$5{,}400{,}000$ on 560 ultimate claims. How much of its IBNR is pure IBNR and how much is IBNER? {Example}
> - The total IBNR is $5{,}400{,}000 - 4{,}000{,}000 = \$1{,}400{,}000$.
> - There are $560 - 500 = 60$ claims not yet reported.
> - The ultimate severity is $5{,}400{,}000/560 = \$9{,}643$.
> - The pure IBNR is $60 \times 9{,}643 = \$578{,}571$.
> - The IBNER is $1{,}400{,}000 - 578{,}571 = \$821{,}429$, development on the 500 claims already reported.

## IBNR on claims-made coverage and report years

On a [[Claims Made Coverage|claims-made]] policy, coverage is triggered by the report of the claim, so the claims of a period are known at the end of the period. Its IBNR is then essentially all IBNER, while an occurrence policy carries both pure IBNR and IBNER. The same holds for a [[Report Year|report year]], whose number of claims is fixed when the year closes: developing a report year to ultimate captures only development on known claims. Claims reported but not yet recorded, and extended reporting endorsements not coded as new policies, can still add claims after the period ends.

The split matters where pure IBNR and known claims are treated differently. In the classical technique for [[Unallocated Loss Adjustment Expenses ULAE|unpaid ULAE]], the ULAE ratio is applied in full to pure IBNR and at 50% to the case outstanding plus IBNER, so on a claims-made book the 50% applies to all of the IBNR.

## IBNR under the reserving methods

Every reserving method estimates ultimate claims, and its IBNR is that ultimate less the reported claims:

| Method | IBNR |
| --- | --- |
| [[Chain Ladder Method]] | $\text{Reported Claims} \times (\text{CDF} - 1)$ |
| [[Expected Loss Method]] | $\text{Expected Claims} - \text{Reported Claims}$ |
| [[Bornhuetter-Ferguson Method]] | $\text{Expected Claims} \times (1 - 1/\text{CDF})$ |
| [[Benktander Method]] | $\text{BF Ultimate} \times (1 - 1/\text{CDF})$ |

The [[Case Outstanding Development Method|case outstanding development technique]] develops only claims that already carry a case reserve. It is therefore suited to data with little pure IBNR, such as a report year or claims-made coverage.

> [!trap] IBNR is not the unpaid claims
> Ultimate claims less paid claims are the unpaid claims, which include the case outstanding. In the first example, $1{,}200{,}000 - 500{,}000 = \$700{,}000$ is the unpaid claims and the IBNR is $\$400{,}000$. Taking IBNR as ultimate less paid, and then adding the case outstanding to get unpaid claims, counts the case outstanding twice.
