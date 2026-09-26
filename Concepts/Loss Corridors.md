---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:14a0b007c92a8ffd02a6b95384dd30808da41a595d5fdabb65d754a42d131b84
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Corridors.md
---

**A Loss Corridor** is a reinsurance contract provision under which the cedant **reassumes** part of the reinsurer's liability when the treaty loss ratio falls within a stated band. For example, the cedant takes back $75\%$ of the losses between an $80\%$ and a $90\%$ loss ratio. The reinsurer's cover therefore has a hole in the middle. Corridors are most common on proportional treaties.

> $$\text{LR}_{\text{net}} = \text{LR} - c \cdot \min\left(\max(\text{LR} - a,\, 0),\; b - a\right)$$

- $\text{LR}$ is the treaty loss ratio on ceded premium before the corridor, $a$ and $b$ the corridor's lower and upper bounds, and $c$ the share reassumed ($100\%$ or less). Below $a$ and above $b$ the reinsurer pays as usual. Within the band it pays only $1 - c$ of each extra point.
- **Bounded saving.** The most the reinsurer saves is $c(b - a)$ points of premium, in any year that reaches $b$. Unlike a stop loss, the cedant's retention is a slice in the middle of the distribution, and the reinsurer still pays in full above $b$.
- **Price with the distribution.** A corridor attaching above the expected loss ratio still lowers the reinsurer's expected loss ratio, because some years reach it. Plugging in the expected loss ratio would value it at zero. Evaluate the probability and average loss ratio below, within and above the corridor (Clark).
- **A substitute for commission.** A corridor worth $k$ points of expected loss is worth roughly $k$ points of ceding commission. The cedant can keep volatility in a band it can bear in exchange for better commission terms. It is one of the adjustable [[Reinsurance Contract Provisions]], alongside [[Sliding Scale Commissions]] and a [[Profit Commission]].
- On excess contracts the analogous feature is an annual aggregate deductible — see [[Aggregate Excess of Loss]]. A corridor on a surplus share that inures to a catastrophe cover changes that cover's exposure too.
- A wide corridor across the likely range of outcomes leaves the reinsurer little real risk. Loss ratio corridors are among the features that can defeat [[Risk Transfer]].

> [!example]- Applying a Corridor to Actual Loss Ratios {Example}
> A quota share has a loss corridor in which the cedant reassumes $50\%$ of the losses between a $75\%$ and a $95\%$ loss ratio. Find the reinsurer's net loss ratio for treaty loss ratios of $70\%$, $85\%$ and $110\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{LR} = 70\%: \quad \text{LR}_{\text{net}} &= 70\% \\[4pt]
> > \text{LR} = 85\%: \quad \text{LR}_{\text{net}} &= 85 - 0.5(10) \\
> > &= 80\% \\[4pt]
> > \text{LR} = 110\%: \quad \text{LR}_{\text{net}} &= 110 - 0.5(20) \\
> > &= 100\%
> > \end{align*}
> > $$
> >
> > The reinsurer's saving grows with the loss ratio until it reaches $0.5 \times 20 = 10$ points at $95\%$, and stays there. At $110\%$ the reinsurer still pays the $15$ points above the corridor in full.

> [!example]- Expected Value of a Corridor Above the Expected Loss Ratio {Example}
> A quota share cedes $\$10$M of premium at a $25\%$ ceding commission. The treaty loss ratio is $60\%$ ($p = 0.25$), $70\%$ ($0.35$), $80\%$ ($0.25$) or $100\%$ ($0.15$). The reinsurer proposes a corridor in which the cedant reassumes $100\%$ of losses between $75\%$ and $85\%$. Find the corridor's effect on the reinsurer's expected loss.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[\text{LR}] &= 0.25(60) + 0.35(70) + 0.25(80) + 0.15(100) \\
> > &= 74.5\%
> > \end{align*}
> > $$
> >
> > Reassumed points, $\min(\max(\text{LR} - 75, 0), 10)$: $0, 0, 5, 10$.
> >
> > $$
> > \begin{align*}
> > E[\text{Reassumed}] &= 0.25(5) + 0.15(10) \\
> > &= 2.75 \text{ points}
> > \end{align*}
> > $$
> >
> > The reinsurer's expected loss ratio falls from $74.5\%$ to $71.75\%$, or $\$275{,}000$ of expected loss. Its loss-plus-commission ratio falls from $99.5\%$ to $96.75\%$.
> >
> > The expected loss ratio of $74.5\%$ sits *below* the corridor, so a plug-in estimate would value the corridor at nothing. The saving comes entirely from the $40\%$ chance of a year at $80\%$ or worse. For the same expected result, the reinsurer could offer the cedant a choice: accept the corridor, or take a ceding commission about $2.75$ points lower.
