---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2a503c51e77686a1f4f17b46559a172694884b9f62ee96f255cc745f9f8847f7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit Commission.md
---

**A Profit Commission** is additional commission the reinsurer pays the cedant at the end of a contract period: a stated percentage of the reinsurer's profit on the treaty. Profit is measured as premium less losses, less the ceding commission, less an agreed margin for the reinsurer's expenses. It is paid only when that profit is positive, so the cedant shares the upside and never the downside.

> $$\text{PC} = k \times \max\left(0,\; 1 - \text{LR} - c - m\right)$$

> $$E[\text{PC}] = k \sum_i p_i \max\left(0,\; 1 - \text{LR}_i - c - m\right)$$

- All terms are ratios to ceded premium. $k$ is the share of profit returned, $\text{LR}$ the treaty loss ratio, $c$ the ceding commission and $m$ the reinsurer's margin. $p_i$ is the probability of loss-ratio outcome $\text{LR}_i$ from an [[Aggregate Loss Model|aggregate distribution]].
- **It is a call option held by the cedant.** The payoff is convex, so $E[\text{PC}] \ge \text{PC}(E[\text{LR}])$, and the gap grows with the loss ratio's volatility. Evaluate it over the distribution (Clark). The plug-in understates what the reinsurer gives away, and gives zero whenever the expected loss ratio exceeds $1 - c - m$.
- **It only ever costs the reinsurer.** A profit commission never increases the reinsurer's expected margin. To leave that margin unchanged, the base terms must tighten: a lower flat commission, a higher rate, or both. Contrast a [[Sliding Scale Commissions|sliding scale]], which moves the commission both ways within bounds.
- **Carryforward.** A deficit (negative profit) in one year is often carried into the next year's calculation. That lowers the expected profit commission, but a single-year pricing view ignores it. Clark notes the same ambiguity in pricing carryforwards as for sliding scales.
- Profit commissions also appear on excess and catastrophe covers — for example, returning a large share of premium if the contract is loss-free for several years. Heavy profit commissions are a hallmark of [[Finite Reinsurance]] and one of the features that can defeat [[Risk Transfer]]. See [[Reinsurance Contract Provisions]].

> [!example]- Profit Commission with a Deficit Carryforward {Example}
> A quota share cedes $\$8$M of premium each year, with a $27.5\%$ ceding commission. The profit commission is $40\%$ of profit after a $7.5\%$ margin, with deficits carried forward. Year 1's loss ratio is $70\%$ and year 2's is $55\%$. Find the profit commission each year, and what year 2's would have been with no carryforward.
>
> > [!answer]-
> > **Year 1:**
> >
> > $$
> > \begin{align*}
> > \text{Profit} &= 100\% - 70\% - 27.5\% - 7.5\% \\
> > &= -5\%
> > \end{align*}
> > $$
> >
> > No profit commission is paid. The deficit of $0.05 \times \$8\text{M} = \$400{,}000$ carries forward.
> >
> > **Year 2:**
> >
> > $$
> > \begin{align*}
> > \text{Profit} &= (100 - 55 - 27.5 - 7.5)\% \times \$8\text{M} \\
> > &= \$800{,}000
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{PC} &= 0.40 \times (\$800{,}000 - \$400{,}000) \\
> > &= \$160{,}000
> > \end{align*}
> > $$
> >
> > Without the carryforward it would have been $0.40 \times \$800{,}000 = \$320{,}000$. The carryforward halves year 2's payment, so the reinsurer recovers part of year 1's loss before sharing year 2's profit.

> [!example]- Expected Profit Commission Versus the Plug-In {Example}
> A quota share has $\$20$M of ceded premium, a $25\%$ ceding commission, and a profit commission of $20\%$ after a $5\%$ margin. The treaty loss ratio is $40\%$ ($p = 0.2$), $60\%$ ($0.4$), $80\%$ ($0.3$) or $100\%$ ($0.1$). Find the expected profit commission and the reinsurer's expected loss-plus-commission ratio.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[\text{LR}] &= 0.2(40) + 0.4(60) + 0.3(80) + 0.1(100) \\
> > &= 66\%
> > \end{align*}
> > $$
> >
> > $\text{PC} = 0.20\max(0, 70 - \text{LR})$ gives $6, 2, 0, 0$ points in the four outcomes.
> >
> > $$
> > \begin{align*}
> > E[\text{PC}] &= 0.2(6) + 0.4(2) \\
> > &= 2.0\%
> > \end{align*}
> > $$
> >
> > The plug-in gives $0.20(70 - 66) = 0.8\%$.
> >
> > In dollars the expected profit commission is $\$400{,}000$, against $\$160{,}000$ by plug-in. The reinsurer's expected ratio is $66 + 25 + 2.0 = 93.0\%$, not the $91.8\%$ the plug-in suggests. The extra $1.2$ points come from the good years, when the cedant takes $20\%$ of a large profit, while the bad years cost the cedant nothing extra.
