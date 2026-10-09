---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:22cad7e3d634af7f2d33aef6fd8013eafe8b7ae4bd0d3e4738af1e56b2a873ce
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Balancing Back.md
---

**Balancing Back** is the adjustment to the base rate that keeps the overall rate level where the ratemaking analysis put it when the risk classification differentials (the relativities) change. New relativities applied to the current mix of business change the average relativity, so without the adjustment the book's premium would move by more or less than the indicated [[Rate Change|rate change]]. *Balancing back* is the term used in the ASTAM ratemaking reading (Brown & Lennox, chapter 5), and Exam 5's Werner & Modlin call the same correction an off-balance factor. The analysis that produces the new relativities is [[Classification Ratemaking|classification ratemaking]].

> $$B_{\text{new}} = B_{\text{old}} \times (1 + \Delta) \times \text{OBF}$$

> $$\text{OBF} = \frac{\sum_i w_i\, r_i^{\text{old}}}{\sum_i w_i\, r_i^{\text{new}}}$$

> $$\sum_i w_i\, B_{\text{new}}\, r_i^{\text{new}} = (1 + \Delta) \sum_i w_i\, B_{\text{old}}\, r_i^{\text{old}}$$

- **Symbols:** $B$ is the base rate, which is the rate charged to the base class, whose relativity is 1.00. $r_i$ is the relativity of class $i$, $w_i$ is the exposure in class $i$, and $\Delta$ is the overall rate change from the [[Overall Rate Level Indication|overall rate level indication]]. OBF, the off-balance factor, is the average relativity before the change divided by the average relativity after it.
- **Why it is needed:** Each exposure in class $i$ pays $B\,r_i$, so the book's premium is $B \sum_i w_i r_i$. Raising the relativities of large or high-rated classes raises that sum, and the base rate must fall in the same proportion if the overall change is to stay at $\Delta$. The third block is the condition that balancing back enforces.
- **Where the new relativities come from:** Under the [[Loss Ratio Method|loss ratio method]], a class's indicated relativity is its current relativity times its loss ratio divided by the base class's loss ratio, with premiums at current rates. Under the [[Pure Premium Method|pure premium method]], it is the class pure premium divided by the base class pure premium. Either way, the overall change $\Delta$ is set separately, and balancing back reconciles the two.
- **Weights:** The weights are the exposures expected in each class when the new rates apply, and both sums use the same weights. When other rating variables also apply, each class's exposures are first multiplied by their average relativity for those other variables, so that the factor measures only this variable's effect on the average premium.

> [!example]- A Revenue-Neutral Territory Change {Example}
> An auto insurer's base rate is \$600, and suburban territory is the base class. Urban's relativity moves from 1.40 to 1.55 and rural's from 0.80 to 0.75, and the overall rate level is not to change. The book has 2,000 urban, 5,000 suburban and 3,000 rural exposures. Find the new base rate and the change in each territory's rate.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \textstyle\sum w_i r_i^{\text{old}} &= 2{,}800 + 5{,}000 + 2{,}400 \\
> > &= 10{,}200 \\
> > \textstyle\sum w_i r_i^{\text{new}} &= 3{,}100 + 5{,}000 + 2{,}250 \\
> > &= 10{,}350 \\
> > B_{\text{new}} &= 600 \times \frac{10{,}200}{10{,}350} \\
> > &= 591.30
> > \end{align*}
> > $$
> > Urban's rate rises from \$840 to $591.30 \times 1.55 = 916.52$, which is 9.1%. Suburban's falls from \$600 to \$591.30, which is 1.4%, and rural's falls from \$480 to $591.30 \times 0.75 = 443.48$, which is 7.6%. The base class's rate falls even though its relativity did not change, because it pays for the higher average relativity. Total premium stays at \$6.12 million.

> [!example]- Loss Ratio Relativities with an Overall Increase {Example}
> A book has three classes, with A as the base class. The current base rate is \$400, and the indicated overall change is +5%.
>
> | Class | Exposures | Current relativity | Premium at current rates | Losses |
> |---|---|---|---|---|
> | A | 6,000 | 1.00 | 2,400,000 | 1,440,000 |
> | B | 3,000 | 1.25 | 1,500,000 | 990,000 |
> | C | 1,000 | 1.60 | 640,000 | 480,000 |
>
> Find the indicated relativities by the loss ratio method, balance back, and give each class's new rate.
>
> > [!answer]-
> > The loss ratios are 0.600, 0.660 and 0.750. Relative to class A, the new relativities are $1.25(0.660/0.600) = 1.375$ for B and $1.60(0.750/0.600) = 2.000$ for C.
> > $$
> > \begin{align*}
> > \textstyle\sum w_i r_i^{\text{old}} &= 6{,}000 + 3{,}750 + 1{,}600 \\
> > &= 11{,}350 \\
> > \textstyle\sum w_i r_i^{\text{new}} &= 6{,}000 + 4{,}125 + 2{,}000 \\
> > &= 12{,}125 \\
> > \text{OBF} &= \frac{11{,}350}{12{,}125} \\
> > &= 0.93608 \\
> > B_{\text{new}} &= 400(1.05)(0.93608) \\
> > &= 393.15
> > \end{align*}
> > $$
> > The new rates are \$393.15 for A, a change of $-1.7\%$, $393.15 \times 1.375 = 540.58$ for B, a change of $+8.1\%$, and $393.15 \times 2.000 = 786.30$ for C, a change of $+22.9\%$. Together they raise premium by 5%, from \$4,540,000 to about \$4,767,000. Applying the 5% to the old base rate and the new relativities without balancing back would raise premium by $1.05 \times 12{,}125/11{,}350 - 1 = 12.2\%$.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to calculate risk classification differential changes, including balancing back. A question gives exposures, premiums at current rates and losses by class, together with an overall change, and asks for the new relativities, the new base rate or one class's new rate.
> - **Reading the result:** A follow-up part can ask for the rate change that a particular class will see. That needs both the new base rate and the class's new relativity, as the second example shows.
> - **Selected relativities:** A question can cap the indicated relativities or weight them with the current ones by credibility before balancing back. The off-balance factor then uses the selected relativities, because those are the ones that will be charged.

> [!warning]- Exam traps
> - **Skipping the balance:** Applying the overall change to the old base rate and then using the new relativities double-counts. In the second example it raises premium by 12.2% instead of 5%.
> - **The base class moves too:** The base class's relativity stays at 1.00, but its rate still changes, because the base rate carries the off-balance. A class's rate change is $(1 + \Delta)\,\text{OBF}\,r_i^{\text{new}}/r_i^{\text{old}} - 1$.
> - **Weighting by premium instead of exposure:** The sums weight relativities by exposures. Weighting the relativities by current premium counts each class's old relativity twice and gives the wrong factor.
> - **Factor upside down:** The factor is old over new. When the new relativities raise the average, the factor is below 1 and the base rate falls, which is a quick check on the direction.
