---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1e9bee56f94a65c058546ca640fea8812ee5761210595974b9e6a220221a93a0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Clash Cover.md
---

**A Clash Cover** is a high casualty per-occurrence [[Excess of Loss|excess of loss]] layer, attaching above the policy limits the cedant writes. A loss on one policy normally cannot reach it. It is penetrated when several policies (or lines) are involved in the same occurrence, when extra-contractual obligations (ECO) or awards in excess of policy limits (XPL) are paid, or when ALAE added to loss pushes an occurrence over the retention.

> $$Y = \min\left(\max\left(\sum_{j \in \text{occ}} (X_j + E_j) - R,\; 0\right),\; L\right)$$

- The sum runs over every policy $j$ involved in one occurrence. $X_j$ is the loss paid under policy $j$, including any ECO/XPL amount the treaty covers. $E_j$ is the ALAE counted with the loss ($E_j = 0$ when ALAE is shared pro rata instead). $R$ is the retention, set at or above the largest policy limit, and $L$ is the limit.
- **Clark's three casualty layers:** a *working layer*, penetrated often; an *exposed excess* layer, attaching below some policy limits; and a *clash* layer, above them. The boundaries are soft in pricing.
- **Exposure rating per policy gives zero.** The casualty exposure factor $\big[E[X \wedge \min(PL, R+L)] - E[X \wedge \min(PL, R)]\big]/E[X \wedge PL]$ vanishes when $R \geq PL$. A standard exposure rating therefore says a clash layer has no exposure, which is false. Its loss cost comes from how policies and expenses combine, not from any single policy's [[Severity Distribution|severity]].
- **How it is priced.** For large cedants, clash losses can be frequent enough for experience rating to guide the price. Otherwise the price is a judgment about how often one occurrence involves several of the cedant's insureds (a multi-vehicle crash, a construction accident, a product defect) or several lines (workers compensation and general liability in one explosion), and about ECO/XPL exposure from [[Bad Faith Damages|bad-faith]] claims. Loss frequency is low, severity is high and the rate on line is modest, so the uncertainty is large relative to the [[Loss Cost|loss cost]].
- **Contract wording drives exposure:** whether ALAE is added to loss, whether ECO/XPL is covered, and how an "occurrence" is defined. See [[Reinsurance Contract Provisions]] and [[Types of Reinsurance]].

> [!example]- When Does the Clash Layer Pay? {Example}
> A cedant writes general liability with limits up to $\$2$M and buys a clash cover of $\$3$M xs $\$2$M per occurrence, with ALAE added to loss. Find the clash recovery in each case:
>
> - (a) One policy pays a full $\$2$M limit plus $\$300$K of ALAE.
> - (b) A scaffold collapse involves two insureds: the contractor's policy pays $\$2$M plus $\$300$K ALAE, and the subcontractor's pays $\$800$K plus $\$150$K ALAE.
> - (c) As (a), but ALAE is shared pro rata with loss rather than added to it.
>
> > [!answer]-
> > **(a)** The occurrence total is $2.0 + 0.3 = \$2.3$M, so the layer pays $2.3 - 2.0 = \$0.3$M. The ALAE alone pierced the layer.
> >
> > **(b)**
> >
> > $$
> > \begin{align*}
> > \text{Occurrence} &= 2.0 + 0.3 + 0.8 + 0.15 \\
> > &= \$3.25\text{M}
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > Y &= \min(3.25 - 2.0,\ 3.0) \\
> > &= \$1.25\text{M}
> > \end{align*}
> > $$
> >
> > Neither policy alone could have reached $\$1.25$M in the layer. The recovery comes from the two policies combining.
> >
> > **(c)** The limit now applies to loss only. The $\$2$M loss does not exceed the $\$2$M retention, so the layer pays nothing, and there is no ceded loss for the ALAE to follow.
> >
> > The same event costs the clash reinsurer $\$0.3$M or $\$0$ depending on one clause, which is why ALAE treatment has to be settled before pricing.

> [!example]- Pricing a Clash Layer by Judgment {Example}
> For the $\$3$M xs $\$2$M clash layer above, exposure rating gives zero. The cedant's own history and industry data suggest an occurrence that pierces $\$2$M about once every $8$ years, with an average of $\$1.2$M in the layer when it does. Because of the parameter uncertainty, the reinsurer prices to a $50\%$ loss ratio. Find the loss cost, premium, rate on line and payback.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Loss cost} &= \frac{1}{8} \times \$1.2\text{M} \\
> > &= \$150{,}000
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Premium} &= \frac{\$150{,}000}{0.50} \\
> > &= \$300{,}000
> > \end{align*}
> > $$
> >
> > The rate on line is $0.3/3 = 10\%$ and the payback is $3/0.3 = 10$ years.
> >
> > Every input here is a judgment: the frequency of multi-policy occurrences, the size of ECO/XPL awards, and the wording on ALAE. The low target loss ratio is the reinsurer's charge for that uncertainty. If the frequency were one in five years, the loss cost would rise to $\$240{,}000$ and the same premium would imply an $80\%$ loss ratio.
