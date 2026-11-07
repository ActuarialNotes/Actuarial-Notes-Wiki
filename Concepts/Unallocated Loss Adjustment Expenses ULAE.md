---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:3065d29f680f2e73ef9ecd6c1541c0a3367ad6e2b26f9f660b7c282da0bc00ec
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.17 pp.386-391, 402-404 (PDF 392-397, 408-410); Errata (PDF 451), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Unallocated Loss Adjustment Expenses ULAE.md
---

![[Media/Figures/Unallocated_Loss_Adjustment_Expenses_ULAE.svg|340]]

**Unallocated Loss Adjustment Expenses** (ULAE) are the claims-handling costs that cannot be assigned to a particular claim, the costs of operating the claims department such as rent, technology, salaries, and management and administration. [[Allocated Loss Adjustment Expense|ALAE]], such as legal fees and expert witnesses, can be assigned to a claim. Since no case reserve holds ULAE, its unpaid amount is estimated in bulk, by dollar-based or count-based techniques.

In the classical technique, the ULAE ratio is the calendar year's paid ULAE divided by its paid claims, the claims including ALAE:

> $$\text{ULAE Ratio} = \frac{\text{Paid ULAE}}{\text{Paid Claims}}$$

The ratio is computed for each calendar year and reviewed for trends, and a ratio for future claims payments is selected. The classical technique assumes that half of a claim's ULAE is spent when it is opened and half when it is closed. Half of the ratio then applies to case outstanding, whose claims are already open, and all of it to IBNR, whose claims are not yet reported. The unpaid ULAE is

> $$\text{Unpaid ULAE} = \text{ULAE Ratio} \times (50\% \times \text{Case Outstanding} + 100\% \times \text{IBNR})$$

Its other key assumptions are that the ratio of ULAE to claims is in a steady state, so the paid-to-paid ratio approximates the ratio of ultimate ULAE to ultimate claims, and that future ULAE on unreported and open claims is proportional to IBNR and case outstanding. Selecting the ratio is a judgment, not a blind average of the years. With no trend, the variation is random and an average is used. With a steady trend, the selection reflects it, such as the latest ratio. Outlier years, such as early years with very small claim volume, are excluded. A known change in expenses means the ratios before it are not averaged with those after.

> [!example]- An insurer selects a ULAE ratio of $0.045$. Its case outstanding is $\$603$ million and its IBNR $\$316$ million, of which $\$19$ million is pure IBNR and $\$297$ million development on known claims. What is its unpaid ULAE by the classical technique, with and without the split of IBNR? {Example}
> - With total IBNR, the unpaid ULAE is $0.045 \times (0.5 \times 603 + 316) = \$27.8$ million.
> - Theoretically the full ratio applies only to pure IBNR (IBNYR), and half of it to case outstanding plus development on known claims (IBNER).
> - With the split, the unpaid ULAE is $0.045 \times (0.5 \times 900 + 19) = \$21.1$ million.

## When the classical technique fails

Johnson finds the classical technique gives good results only for very short-tailed, stable lines. It may not be appropriate:

1. **For long-tail lines**, whose claims stay open for years and keep incurring ULAE after they are opened, so the $50/50$ assumption understates the unpaid ULAE on case outstanding.
2. **When volume changes rapidly**: in a growing book, paid ULAE reacts quickly to newly reported claims while paid claims lag on claims reported at the old volume, so the ratio is overstated. A shrinking book distorts it the other way.
3. **When inflation changes**: the ratio accounts for inflation only if ULAE and claim costs inflate at the same rate, and under inflation it is distorted upward, because most claims paid in a year were incurred earlier.
4. **When the $50/50$ split does not fit the workflow**: if ULAE shifts later in a claim's life, such as in-house legal costs after reporting, the technique understates unpaid ULAE.

Closing and paying a claim are not the same thing either. A windshield claim closes with its one payment, while a workers compensation claim pays lost wages for years. Some actuaries change the percentages applied to case outstanding and IBNR to fit their insurer. In a catastrophe-prone area, catastrophe years spike paid claims without matching ULAE, so the ratio swings with the catastrophe experience, and none of the dollar-based refinements removes that.

## The Kittel refinement

Kittel recognizes that ULAE is spent as claims are reported even if nothing is paid, so ULAE relates to both the reporting and the payment of claims. His ratio divides by the average of paid and incurred claims:

> $$\text{ULAE Ratio} = \frac{\text{Paid ULAE}}{0.5 \times \text{Paid Claims} + 0.5 \times \text{Incurred Claims}}$$

- $\text{Incurred Claims}$ for the calendar year are its paid claims plus the change in case outstanding and IBNR.

The ratio is then applied with the same $50\%$ and $100\%$. Kittel corrects the distortion of a growing book, but it keeps the $50/50$ assumption and still assumes ULAE and claims inflate at the same rate. Without splitting IBNR into IBNYR and IBNER it can overstate the unpaid ULAE.

> [!example]- A calendar year has paid ULAE of $\$480{,}000$, paid claims of $\$4{,}000{,}000$ and incurred claims of $\$8{,}000{,}000$. What are the classical and Kittel ratios? {Example}
> - The classical ratio is $480{,}000/4{,}000{,}000 = 12.0\%$.
> - The average of paid and incurred claims is $\$6{,}000{,}000$, so the Kittel ratio is $480{,}000/6{,}000{,}000 = 8.0\%$.
> - Incurred claims double the paid claims, a sign of a growing book, so the classical ratio is distorted upward.

## The Conger and Nolibos generalized approach

Conger and Nolibos split ultimate ULAE into the shares spent opening claims ($U_1$), maintaining them ($U_2$) and closing them ($U_3$), with $U_1 + U_2 + U_3 = 100\%$. A calendar period's claims basis is

> $$B = U_1 \times R + U_2 \times P + U_3 \times C$$

- $R$ is the ultimate cost of the claims reported in the period, $P$ the claims paid in it, and $C$ the ultimate cost of the claims closed in it.

The ratio $W$ of the period's paid ULAE to $B$ is computed for past years, and a ratio $W^{*}$ selected. Their preferred estimate, like the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson technique]], is $W^{*}$ times the ultimate claims less the claims basis to date. That is the provision for opening claims not yet reported, paying active and future claims, and closing the claims not yet closed. They also give an expected claims form and a development form. The weights can vary greatly between insurers and lines.

## The Mango-Allen refinement and count-based techniques

When calendar-year paid claims are volatile, Mango and Allen replace them with expected paid claims, accident year ultimates run through a payment pattern. That suits a line with few claims of widely varying size, or an insurer with little experience.

Mango and Allen also object that ULAE depends on the average size of a claim, not only on claim dollars, and that a dollar-based estimate rides on whatever volatility is in the estimate of ultimate claims. Count-based techniques assume the same kind of transaction costs the same ULAE regardless of claim size. Johnson's technique weights the reporting of a new claim and the maintenance of an open one, and applies the historical cost per weighted claim to the claims to be reported and kept open in the future.

## ULAE in ratemaking

A rate indication includes ULAE as well as ALAE, since both are claims costs. Werner & Modlin's ratio is the calendar year's paid ULAE divided by its paid loss and ALAE, over several years. The projected loss and ALAE, adjusted for extraordinary events, development and trend, are multiplied by $1$ plus that ratio. Catastrophe LAE is excluded from the ratio and handled in the catastrophe provision. In pricing an excess layer, the ULAE load applies only to the excess loss.
