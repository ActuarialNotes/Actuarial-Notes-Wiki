---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:65937c7fa7d48df42f442277e424b4d1546afebb19521914f3b162a0e61b4e7f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Quota Share.md
---

**Quota Share** is a proportional treaty in which the reinsurer takes a fixed percentage $a$ of the premium and of every loss (usually including ALAE) on a defined book. In return it pays the cedant a **ceding commission** for the expenses the cedant incurred to write the business.

> $$\begin{aligned} \text{Ceded premium} &= a \cdot P \\ \text{Ceded loss} &= a \cdot X \end{aligned}$$

> $$\text{Reinsurer's ratio} = \text{ELR} + c + b + e$$

- $P$ is subject premium, $X$ subject loss, $\text{ELR}$ the expected loss ratio (including a catastrophe load), $c$ the ceding commission, $b$ brokerage and $e$ the reinsurer's own expenses, each as a ratio to ceded premium. The reinsurer judges this combined ratio, with investment income and risk, against its target return.
- **The treaty loss ratio is the cedant's loss ratio**, so pricing is ratemaking on the cedant's data (Clark's steps): compile five or more years of subject experience; remove catastrophe and shock losses; develop, trend and bring premium to [[On Level Premium|current rate level]] (the [[Parallelogram Method|parallelogram method]] for a losses-occurring treaty); select the non-catastrophe ELR; add a catastrophe load, now usually from a [[Catastrophe Modelling|catastrophe model]]; then add commission, brokerage and expenses.
- **What it does, and doesn't do.** It provides capacity and surplus relief: the ceding commission recovers acquisition cost on the ceded unearned premium. It does **not** change the shape of the net result. Net loss is $(1-a)X$, so its coefficient of variation equals gross. The cedant keeps $1-a$ of every catastrophe and every large loss.
- **When the two sides disagree on the ELR**, adjustable features settle it: [[Sliding Scale Commissions]], a [[Profit Commission]], [[Loss Corridors]], or a per-occurrence limit on ceded catastrophe loss. See [[Reinsurance Contract Provisions]].
- For reserving, ceded losses are a scalar multiple of gross and develop on the gross pattern, unlike [[Excess of Loss]] cessions. Compare [[Surplus Share]], where the percentage varies by risk.

> [!example]- Pricing a Property Quota Share {Example}
> A cedant asks for a $40\%$ quota share on homeowners business with projected subject earned premium of $\$50$ million. Five years of developed, trended, on-level loss ratios excluding catastrophes are $52\%, 58\%, 55\%, 61\%, 54\%$. A catastrophe model gives expected annual catastrophe loss of $\$5.6$ million on the subject book. Terms offered: ceding commission $28\%$, brokerage $2\%$; the reinsurer's own expenses are $1.5\%$. The reinsurer targets a $95\%$ combined ratio.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Non-cat ELR} &= \frac{52 + 58 + 55 + 61 + 54}{5} \\
> > &= 56.0\%
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Cat load} &= \frac{\$5.6\text{M}}{\$50\text{M}} \\
> > &= 11.2\%
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Combined} &= 67.2\% + 28\% + 2\% + 1.5\% \\
> > &= 98.7\%
> > \end{align*}
> > $$
> >
> > Ceded premium is $0.40 \times \$50\text{M} = \$20$ million and expected ceded loss is $0.672 \times \$20\text{M} = \$13.44$ million. At $98.7\%$ the terms miss the target. The commission that meets it is $95 - 67.2 - 2 - 1.5 = 24.3\%$, so the actuary would counter at about $24\%$, or propose an adjustable feature instead.

> [!example]- Effect of a Per-Occurrence Catastrophe Limit {Example}
> Same treaty. The cedant's annual catastrophe loss (one event per year at most) is $\$0$ with probability $0.70$, $\$10$M with $0.20$, $\$30$M with $0.08$ and $\$60$M with $0.02$. The reinsurer proposes limiting ceded catastrophe loss to $\$8$ million per occurrence. Find the new catastrophe load and combined ratio.
>
> > [!answer]-
> > Ceded catastrophe loss at $40\%$ is $0, 4, 12, 24$ (in \$ millions) before the cap, and $0, 4, 8, 8$ after it:
> >
> > $$
> > \begin{align*}
> > E[\text{uncapped}] &= 0.20(4) + 0.08(12) + 0.02(24) \\
> > &= 2.24
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > E[\text{capped}] &= 0.20(4) + 0.08(8) + 0.02(8) \\
> > &= 1.60
> > \end{align*}
> > $$
> >
> > On ceded premium of $\$20$M the catastrophe load falls from $11.2\%$ to $1.60/20 = 8.0\%$, so the ELR becomes $64.0\%$ and the combined ratio $64.0 + 28 + 2 + 1.5 = 95.5\%$, close to target at the original commission.
> >
> > The cost moves to the cedant. In the $\$60$M event its net loss is $\$52$M instead of $\$36$M, so it needs a catastrophe excess cover on its net retention, which is exactly where such covers apply.
