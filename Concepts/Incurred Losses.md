---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a8ddbd185af92a572011c752191ce646b3a9ecab882ecc4aa4ba9c0afb35eefc
  sources: []
  open_findings: 0
  log: .verify/Concepts/Incurred Losses.md
---

**Incurred Losses** — more precisely **reported losses** — are cumulative [[Paid Losses|payments]] plus [[Case Reserves|case outstanding]] on known claims at a valuation date. They are the insurer's current estimate of what the reported claims will ultimately cost, and they exclude [[IBNR]].

> $$\text{Reported (Incurred)} = \text{Paid} + \text{Case Reserves}$$

> $$\text{Ultimate} = \text{Reported} + \text{IBNR}$$

- The vocabulary matters on the exam. "Incurred" in a **calendar year** context (paid $+ \Delta$ case $+ \Delta$ IBNR) is a different quantity from "reported" in an **accident year** triangle (paid $+$ case). Friedland uses *reported* for the triangle to avoid the ambiguity.
- Reported triangles emerge **faster and more smoothly** than paid ones, because a case reserve is set as soon as a claim is known. Reported development factors are therefore smaller and the chain ladder is less leveraged.
- The cost is exposure to adjuster judgment. Reported development mixes genuine emergence with **IBNER** — re-estimation of known claims — so any systematic change in [[Case Adequacy|case adequacy]] corrupts the historical factors. A single strengthening initiative shows up as an elevated diagonal across every accident year at once.
- Reported losses can develop **downward**. Conservative initial reserving, [[Salvage and Subrogation|salvage and subrogation]] recoveries, and claims closing below their case reserve all produce age-to-age factors under $1.000$; capping factors at $1.000$ on principle is a standard error.
- At ultimate, case reserves run off to zero and reported losses converge to paid. The gap between reported and ultimate at any maturity is IBNR.

![[Media/Figures/Incurred_Losses.svg|340]]

> [!example]- Reported Development and IBNR {Example}
> Accident year $2022$ has reported losses of $\$800{,}000$ at $24$ months. The selected cumulative reported factor to ultimate is $1.35$.
>
> Estimate ultimate losses and IBNR, and state what the IBNR consists of.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Ultimate} &= \$800{,}000 \times 1.35 \\
> > &= \$1{,}080{,}000 \\[4pt]
> > \text{IBNR} &= \$1{,}080{,}000 - \$800{,}000 \\
> > &= \$280{,}000
> > \end{align*}$$
> >
> > That $\$280{,}000$ is **broad IBNR** — two components in one number:
> >
> > - **Pure IBNR**: claims that occurred in $2022$ and are still unknown to the insurer at $24$ months.
> > - **IBNER**: expected upward development on the claims already in the $\$800{,}000$, as case reserves move toward settlement values.
> >
> > Splitting the two requires a [[Claim Count Triangle|claim count triangle]] — develop counts to ultimate, subtract reported counts, and value the unreported claims at an expected severity. The split matters when reporting patterns and case adequacy are moving in different directions.

> [!example]- A Case Reserve Strengthening in the Triangle {Example}
> Reported age-to-age factors for a liability line:
>
> | AY | 12–24 | 24–36 | 36–48 |
> |---|---|---|---|
> | $2020$ | $1.48$ | $1.19$ | $1.07$ |
> | $2021$ | $1.50$ | $1.18$ | **$1.15$** |
> | $2022$ | $1.47$ | **$1.31$** | |
> | $2023$ | **$1.66$** | | |
>
> Average case outstanding per open claim rose $28\%$ during $2023$ across all accident years. What happened, and what should the actuary do?
>
> > [!answer]-
> > The bolded figures form the latest **diagonal** — the year ending $12/31/2023$ — and every one of them is above its column's history. Combined with the jump in average case outstanding, this is a **case reserve strengthening**, not a change in the underlying loss cost.
> >
> > Selecting factors that include the elevated diagonal would apply a one-time level shift as if it were an ongoing pattern, over-stating every future year's development.
> >
> > Two defensible responses:
> >
> > 1. **Restate the triangle** with the [[Berquist-Sherman Method|Berquist-Sherman]] case-adequacy adjustment: trend historical average case outstanding up to the current level, rebuild the reported triangle, and select factors from the restated history.
> > 2. **Lean on paid data**, which is unaffected by case adequacy — provided the [[Settlement Rate|settlement rate]] has been stable, which must be checked separately.
> >
> > Doing neither, and simply excluding the latest diagonal, avoids the distortion in the factors but leaves the *diagonal itself* in the data — the strengthened reserves are still on the books, so the ultimate estimate must acknowledge them.
