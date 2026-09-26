---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:23607ddd2f8c65c5ecc74d19a61db0a58f40250f6679776eb4b413eef1b2d381
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Aggregate Excess of Loss.md
---

**Aggregate Excess of Loss** reinsurance responds to the **total** of the cedant's losses over a period, usually a year, rather than to any single loss. The reinsurer pays the aggregate in excess of an aggregate retention $A$, up to an aggregate limit $L_A$. Stated in loss-ratio points of subject premium it is a **stop loss**. Applied to the losses in an excess layer, the retention is an **annual aggregate deductible** (AAD).

> $$Y = \min\left(\max(S - A,\, 0),\; L_A\right)$$

> $$E[Y] = E[S \wedge (A + L_A)] - E[S \wedge A]$$

> $$\phi(A) = \frac{E\left[(S - A)_+\right]}{E[S]}$$

- $S$ is the aggregate loss for the period: all subject losses for a stop loss, or the per-occurrence layer losses for an AAD. $\phi(A)$ is Clark's **excess charge factor**, the share of expected aggregate loss above $A$. It is the reinsurance analogue of a Table M insurance charge in [[Retrospective Rating|retrospective rating]].
- **The expected value is not enough.** $E[Y]$ depends on the whole distribution of $S$. Plugging in the expected loss ratio usually gives zero, because stop losses attach above it. Clark regards the collective risk model — an [[Aggregate Loss Model|aggregate loss model]] of frequency and severity — as generally the best tool for these covers.
- **Clark's cautions on aggregate models:** don't treat the model as a black box — check its CV and percentiles against the data; occurrences, and frequency and severity, are assumed independent; numerical methods can err at low frequencies; and the model captures process variance but not parameter variance or model risk.
- **AAD on a working layer.** The cedant keeps the first layer losses each year but stays protected if there are more than expected. The net loss cost is the layer's loss cost gross of the AAD times $\phi_{\text{AAD}}$.
- **Why buy it.** Per-risk and per-occurrence covers miss a year of many medium-sized losses; an aggregate cover protects the year's result against that frequency accumulation. Aggregate limits appear inside other contracts too: a catastrophe layer with $n$ [[Reinstatements]] has aggregate limit $(1+n)L$.
- **Risk transfer.** Aggregate structures are the building blocks of [[Finite Reinsurance]]. An attachment far above the expected loss ratio or a thin limit invites [[Risk Transfer]] scrutiny. See [[Types of Reinsurance]].

> [!example]- Pricing a Stop Loss {Example}
> A stop loss covers $25$ points of loss ratio in excess of a $75\%$ loss ratio on $\$100$M of subject premium. The cedant's loss ratio distribution: $60\%$ ($p = 0.30$), $70\%$ ($0.35$), $80\%$ ($0.20$), $95\%$ ($0.10$), $115\%$ ($0.05$). Find the expected loss ratio and the reinsurer's expected loss.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[\text{LR}] &= 0.30(60) + 0.35(70) + 0.20(80) \\
> > &\quad + 0.10(95) + 0.05(115) \\
> > &= 73.75\%
> > \end{align*}
> > $$
> >
> > Points ceded, $\min(\max(\text{LR} - 75, 0), 25)$: $0, 0, 5, 20, 25$.
> >
> > $$
> > \begin{align*}
> > E[Y] &= 0.20(5) + 0.10(20) + 0.05(25) \\
> > &= 4.25 \text{ points}
> > \end{align*}
> > $$
> >
> > Expected ceded loss is $0.0425 \times \$100\text{M} = \$4.25$ million. The expected loss ratio of $73.75\%$ is below the attachment, so a plug-in estimate would price this cover at zero. The whole cost comes from the tail. The cedant is still exposed above the exit: in the $115\%$ year its net loss ratio is $90\%$.

> [!example]- Annual Aggregate Deductible on a Working Layer {Example}
> A $\$500$K xs $\$500$K per-occurrence layer has annual aggregate layer losses of $\$0$ ($p = 0.20$), $\$500$K ($0.30$), $\$1{,}000$K ($0.25$), $\$1{,}500$K ($0.15$) and $\$2{,}500$K ($0.10$). Subject premium is $\$10$M. The cedant proposes an AAD of $\$750$K. Find $\phi_{\text{AAD}}$ and the net loss cost.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[S] &= 0.30(500) + 0.25(1{,}000) \\
> > &\quad + 0.15(1{,}500) + 0.10(2{,}500) \\
> > &= 875
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > E[(S - 750)_+] &= 0.25(250) + 0.15(750) + 0.10(1{,}750) \\
> > &= 62.5 + 112.5 + 175 \\
> > &= 350
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \phi_{\text{AAD}} &= \frac{350}{875} \\
> > &= 0.40
> > \end{align*}
> > $$
> >
> > The layer's loss cost falls from $875/10{,}000 = 8.75\%$ to $0.40 \times 8.75\% = 3.50\%$. The cedant expects to retain $875 - 350 = \$525$K, less than the $\$750$K AAD because in some years the layer losses fall short of it. It gives up $60\%$ of the expected layer loss but keeps protection against the bad years.
