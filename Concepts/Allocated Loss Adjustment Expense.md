---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e50322897ff220a303714e9453895929ba2111be4c1f8469b7bed6021cf60d4a
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.16 pp.371-374 (PDF 377-380), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Allocated Loss Adjustment Expense.md
---

![[Media/Figures/Allocated_Loss_Adjustment_Expense.svg|340]]

An **Allocated Loss Adjustment Expense** (ALAE) is a claim adjustment cost the insurer can assign to a particular claim, such as legal and expert witness expenses. [[Unallocated Loss Adjustment Expenses ULAE|ULAE]], such as the claims department's payroll and rent, cannot be assigned to one claim. In U.S. statutory reporting the split is instead defense and cost containment (DCC) and adjusting and other (A&O). The ratio of an accident year's ALAE to its claims at age $n$ is

> $$\text{ALAE Ratio} = \frac{\text{Paid ALAE}}{\text{Paid Claims}}$$

- $\text{Paid ALAE}$ and $\text{Paid Claims}$ are the cumulative paid ALAE and paid claims only, both at age $n$.

When ALAE is a fixed percentage of claims, claims and ALAE together are the claims multiplied by one plus the ALAE ratio. ALAE is assigned to a claim and its accident date is known, so all the development techniques can be used with it.

> [!example]- A general liability claim settles for $\$100{,}000$. The insurer also paid defense counsel $\$25{,}000$, an expert witness $\$8{,}000$ and court costs $\$2{,}000$. What are the claim's ALAE, its claim and ALAE together, and its ALAE ratio? {Example}
> - The ALAE is $25{,}000 + 8{,}000 + 2{,}000 = \$35{,}000$.
> - The claim and ALAE together are $100{,}000 + 35{,}000 = \$135{,}000$.
> - The ALAE ratio is $35{,}000/100{,}000 = 35\%$.

## Estimating unpaid ALAE

There are three ways to project ultimate ALAE:

1. **Combined with claims.** Because of data limitations, ALAE is often developed in one triangle with the claims.
2. **Development of ALAE on its own.** The [[Chain Ladder Method|development technique]] is applied to paid ALAE, or to reported ALAE where the insurer sets case outstanding for ALAE.
3. **Development of the ratio of paid ALAE to paid claims.** A triangle of the ratio is developed to an ultimate ratio.

Combining assumes ALAE develops like the claims. For some liability lines it does not: defense and expert witness costs are paid during the investigation, well before any payment to the claimant, and some defense costs follow it. Claims and ALAE are combined only if their development patterns and their ratio are consistent over time.

Whichever way it is projected, unpaid ALAE is ultimate ALAE minus paid ALAE, summed over the accident years.

## Ratio of paid ALAE to paid claims

The ratio triangle holds the ratio at each age for each accident year, and it is developed to an ultimate ratio with age-to-age factors on the ratios. The ultimate ALAE is then

> $$\text{Ultimate ALAE} = \text{Ultimate ALAE Ratio} \times \text{Ultimate Claims}$$

- $\text{Ultimate ALAE Ratio}$ is the ratio projected to ultimate for the accident year.
- $\text{Ultimate Claims}$ is the selected ultimate claims of the accident year, not its paid claims to date.

In the **additive** version, each factor is the difference between the ratios at successive ages, and the projected ultimate ratio is the latest ratio plus the sum of the selected differences from its age to ultimate. Wiser notes that if the ratios are very small at early maturities, the additive approach seems to be more stable.

> [!example]- The ratio of paid ALAE to paid claims is 0.050, 0.080 and 0.090 at 12, 24 and 36 months for accident year 2021, 0.055 and 0.083 for 2022, and 0.060 at 12 months for 2023. There is no development after 36 months. Accident year 2023 has ultimate claims of $\$2{,}000{,}000$ and $\$54{,}000$ of paid ALAE. What is its unpaid ALAE by the additive approach? {Example}
> - The 12 to 24 month differences are $0.080 - 0.050 = 0.030$ and $0.083 - 0.055 = 0.028$, with an average of $0.029$.
> - The 24 to 36 month difference is $0.090 - 0.080 = 0.010$.
> - Accident year 2023's ultimate ratio is $0.060 + 0.029 + 0.010 = 0.099$.
> - Its ultimate ALAE is $0.099 \times 2{,}000{,}000 = \$198{,}000$.
> - Its unpaid ALAE is $198{,}000 - 54{,}000 = \$144{,}000$.

The ratio method recognizes the relationship between ALAE and claims, and its factors tend not to be as highly leveraged as factors on paid ALAE dollars. Its disadvantages are three:

1. Any error in the estimate of ultimate claims passes into the estimate of ultimate ALAE.
2. ALAE spent on claims that settle with no payment distorts the ratio, especially at early ages.
3. It assumes the relationship between ALAE and claims has been stable over the experience period, which a change in defense strategy, or in the use of external versus internal defense counsel, breaks.

A [[Large Loss|large claim]] is removed before the ALAE, or the ratio, is developed, and its own ultimate ALAE is added back.

## ALAE in excess of loss reinsurance

An excess of loss treaty treats ALAE in one of three ways: included with the claim amount in determining the excess coverage (the most common), not covered, or covered pro rata in the proportion of the claim that is in the layer. In excess pricing, a cap on each occurrence applies to its loss and ALAE together. A historical ALAE ratio may not fit an excess layer, because losses capped at a policy limit raise the ratio of ALAE to loss, and so do claims whose litigation costs more than their indemnity.
