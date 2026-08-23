---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:46d0e83c16b9c7c77e7533d7a7282a092f63db2a336437aa2a470ea0722386f4
  sources: []
  open_findings: 0
  log: .verify/Concepts/Deductible Rating.md
---

**Deductible Rating** is the pricing of policies under which the insured retains the first $d$ dollars of each loss. The rate credit is derived from the [[Loss Elimination Ratio|loss elimination ratio]] — the share of expected losses the deductible removes.

> $$\text{LER}(d) = \frac{E[X \wedge d]}{E[X]}$$

> $$\text{Deductible Relativity} = 1 - \text{LER}(d)$$

- The relativity applies to the **loss** portion of the rate, not the whole rate. [[Fixed Expenses|Fixed expenses]] do not fall because the insured took a deductible, so crediting the full $(1 - \text{LER})$ against the entire premium over-credits the deductible. Werner's formulation applies the LER to the loss cost and re-loads expenses afterwards.
- LERs are computed from the size-of-loss distribution — empirically where volume permits, from a fitted severity curve otherwise. The fit matters most for large deductibles, where the answer depends on the tail.
- Deductible credits must satisfy a **consistency** requirement: the credit per dollar of deductible must *decrease* as the deductible rises, because successive layers contain progressively less expected loss. A credit schedule that violates this lets an insured buy a higher deductible and gain more credit than the layer is worth.
- Two behavioural effects mean the observed saving exceeds the pure LER, and both belong in the pricing judgment: **claims suppression** (insureds do not report losses near the deductible, so even the excess portion is never claimed) and **moral hazard reduction** (retention improves care). Werner cautions that these are real but hard to quantify, and that credits set purely on LER tend to be conservative.
- Deductibles erode with [[Inflation|inflation]]: a fixed $d$ eliminates a falling share of a growing loss, so relativities must be refreshed or higher-deductible business becomes under-priced.
- On the reserving side, the mirror concept is the [[Deductible Recovery|deductible recovery]] — amounts billed back to the insured on a large-deductible programme, which must be estimated and collected, and carry credit risk.

![[Media/Figures/Deductible_Rating.svg|340]]

> [!example]- Pricing a Deductible Option {Example}
> A homeowners programme has a full-coverage loss cost of $\$620$ per house-year. LERs from the fitted severity distribution are:
>
> | Deductible | LER |
> |---|---|
> | $\$500$ | $0.145$ |
> | $\$1{,}000$ | $0.225$ |
> | $\$2{,}500$ | $0.360$ |
>
> Fixed expenses are $\$70$ per policy, variable expenses $24\%$, target profit $5\%$. Compute the rate at each deductible and check consistency.
>
> > [!answer]-
> > Apply the relativity to the **loss cost only**, then load expenses:
> >
> > | Deductible | Loss cost | Rate $= (\text{LC} + 70)/0.71$ |
> > |---|---|---|
> > | $\$500$ | $620 \times 0.855 = \$530.10$ | $\$845.21$ |
> > | $\$1{,}000$ | $620 \times 0.775 = \$480.50$ | $\$775.35$ |
> > | $\$2{,}500$ | $620 \times 0.640 = \$396.80$ | $\$657.46$ |
> >
> > **Consistency check** — the extra credit per extra dollar of deductible must fall:
> >
> > $$\begin{align*}
> > \$500 \to \$1{,}000: \; \frac{845.21 - 775.35}{500} &= \$0.140 \text{ per \$1} \\[6pt]
> > \$1{,}000 \to \$2{,}500: \; \frac{775.35 - 657.46}{1{,}500} &= \$0.079 \text{ per \$1}
> > \end{align*}$$
> >
> > The marginal credit falls from $14.0$ cents to $7.9$ cents per dollar of retention, as it must — the second, wider layer contains proportionally less expected loss.
> >
> > Note also that the rate does **not** fall by the full LER: raising the deductible from $\$500$ to $\$2{,}500$ eliminates $25\%$ of losses but only $22\%$ of premium, because the $\$70$ of fixed expense and the profit load ride on regardless.

> [!example]- An Inconsistent Credit Schedule {Example}
> A commercial property filing proposes these deductible credits against a $\$1{,}000$-deductible base:
>
> | Deductible | Proposed credit |
> |---|---|
> | $\$1{,}000$ | — |
> | $\$2{,}500$ | $8\%$ |
> | $\$5{,}000$ | $14\%$ |
> | $\$10{,}000$ | $28\%$ |
>
> Is the schedule sound?
>
> > [!answer]-
> > Marginal credit per dollar of additional retention:
> >
> > $$\begin{align*}
> > \$1{,}000 \to \$2{,}500: \; \frac{8\%}{1{,}500} &= 0.53\% \text{ per \$100} \\[6pt]
> > \$2{,}500 \to \$5{,}000: \; \frac{6\%}{2{,}500} &= 0.24\% \text{ per \$100} \\[6pt]
> > \$5{,}000 \to \$10{,}000: \; \frac{14\%}{5{,}000} &= 0.28\% \text{ per \$100}
> > \end{align*}$$
> >
> > The marginal credit falls, then **rises** at the top step. That is inconsistent: the $\$5{,}000$–$\$10{,}000$ layer cannot contain more expected loss per dollar than the $\$2{,}500$–$\$5{,}000$ layer beneath it.
> >
> > The practical consequence is arbitrage. An insured whose expected loss in the top layer is below average buys the $\$10{,}000$ deductible and captures a credit exceeding the loss it retains; the insurer loses on every such sale, and the insureds who take the option are precisely the ones for whom it is mispriced.
> >
> > The fix is to re-derive the credits from a single consistent size-of-loss distribution rather than setting them competitively step by step — the same consistency test applied to [[Increased Limits|increased limits factors]], run in the opposite direction.
