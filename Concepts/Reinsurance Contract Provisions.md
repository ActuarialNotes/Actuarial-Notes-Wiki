---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aa1b08337e35a6a7e344406d86c086b66c18840f049a0972cceaf52f1ec59af1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Contract Provisions.md
---

**Reinsurance Contract Provisions** — the loss-sensitive or *adjustable* features of a reinsurance contract — make the final commission, premium or ceded loss depend on the contract's actual experience. They include [[Sliding Scale Commissions]], [[Profit Commission|profit commissions]], [[Loss Corridors]], [[Reinstatements]], annual aggregate deductibles, swing plans and occurrence limits. Each is a non-linear function of the loss outcome, so its effect on the [[Loss Cost|loss cost]] must be measured over the whole distribution of outcomes.

> $$E\left[g(\text{LR})\right] = \sum_i p_i \, g(\text{LR}_i)$$

> $$E\left[g(\text{LR})\right] \neq g\left(E[\text{LR}]\right) \ \text{(in general)}$$

- $g$ is the provision's payoff: commission, reassumed loss, profit commission or additional premium, as a function of the loss ratio. $p_i$ is the probability of loss-ratio outcome $\text{LR}_i$, from an [[Aggregate Loss Model|aggregate loss distribution]]. A cap, a floor or a kink in $g$ is enough to make the plug-in answer wrong.
- **Why they exist.** Once the expected loss ratio is estimated, cedant and reinsurer often still disagree about it and about the ceding commission. An adjustable feature lets each side be paid if its own view proves right (Clark).
- **Direction of effect, from the reinsurer's side:**
    - *Sliding scale:* commission falls as the loss ratio rises, which damps the reinsurer's result within the slide.
    - *Profit commission:* returns part of the profit in good years, so it can only lower the reinsurer's expected margin.
    - *Loss corridor:* the cedant reassumes losses in a band of loss ratios, which lowers the reinsurer's expected loss even when the expected loss ratio is below the band.
    - *Reinstatement premium:* extra premium due when a loss uses the limit, which lowers the up-front premium needed.
    - *Annual aggregate deductible:* multiplies the layer's loss cost by an excess charge factor — see [[Aggregate Excess of Loss]].
    - *Swing plan:* a retrospectively rated premium on an excess layer, within a minimum and maximum, as in [[Retrospective Rating]].
- **[[Clash Cover|Clash]]** is a coverage structure rather than an adjustable feature: a casualty layer above the policy limits, whose loss cost comes from multi-policy occurrences, ECO/XPL awards and the treatment of ALAE.
- **Method.** Tabulate ranges of the loss ratio with each range's probability and average loss ratio, evaluate the provision in each range, and weight. Historical adjusted loss ratios are a reasonability check only: they are distorted by past catastrophes and low-volume years, and they leave out many possible outcomes. *Carryforward* provisions, which bring past deficits into the current year's calculation, have no standard method: either shift the terms by the carryforward, or model a multi-year block with reduced variance.
- Provisions reduce the reinsurer's risk as well as its expected cost, which matters for [[Risk Loads|risk loads]]. Pushed far enough, they defeat [[Risk Transfer]].

> [!example]- Three Provisions on One Loss Ratio Distribution {Example}
> A quota share has $\$10$M of ceded premium and a flat $25\%$ ceding commission. The loss ratio is $55\%$ ($p = 0.30$), $70\%$ ($0.40$), $90\%$ ($0.20$) or $110\%$ ($0.10$). Evaluate, separately:
>
> - (a) a loss corridor: the cedant reassumes $50\%$ of losses between $80\%$ and $100\%$;
> - (b) a profit commission of $25\%$ of $(100\% - \text{LR} - 25\% - 5\% \text{ margin})$;
> - (c) replacing the flat commission with a sliding scale: $25\%$ at a $75\%$ loss ratio, sliding $1{:}1$ to a maximum of $35\%$ at $65\%$ and a minimum of $20\%$ at $80\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[\text{LR}] &= 0.30(55) + 0.40(70) + 0.20(90) + 0.10(110) \\
> > &= 73.5\%
> > \end{align*}
> > $$
> >
> > **(a) Corridor.** Reassumed points $0.5\min(\max(\text{LR} - 80, 0), 20)$: $0, 0, 5, 10$. Expected $= 0.20(5) + 0.10(10) = 2.0$ points, so the ceded loss ratio is $71.5\%$. The plug-in says $0$, because $73.5\% < 80\%$.
> >
> > **(b) Profit commission.** $0.25\max(70 - \text{LR}, 0)$: $3.75, 0, 0, 0$. Expected $= 0.30(3.75) = 1.125$ points. The plug-in gives $0.25\max(70 - 73.5, 0) = 0$.
> >
> > **(c) Sliding scale.** Commission $\min(35, \max(20, 25 + 75 - \text{LR}))$: $35, 30, 20, 20$.
> >
> > $$
> > \begin{align*}
> > E[c] &= 0.30(35) + 0.40(30) + 0.20(20) + 0.10(20) \\
> > &= 28.5\%
> > \end{align*}
> > $$
> >
> > The plug-in gives $25 + 1.5 = 26.5\%$.
> >
> > **Reinsurer's expected loss-plus-commission ratio:**
> >
> > - Flat terms: $73.5 + 25 = 98.5\%$
> > - With the corridor: $71.5 + 25 = 96.5\%$
> > - With the profit commission: $98.5 + 1.125 = 99.6\%$
> > - With the sliding scale: $73.5 + 28.5 = 102.0\%$, against $100.0\%$ by plug-in
> >
> > Every plug-in answer is wrong. In (a) and (b) it misses the provision's value entirely, and in (c) it understates the reinsurer's cost by two points. Each error comes from outcomes away from the mean.
