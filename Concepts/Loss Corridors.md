---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:8a7a823c42535c8afdfb099deaab916221cae82b8921bb07d47d75cb04ba8243
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.13-14 (loss corridor definition, 75% of 80%-90% example, aggregate-distribution table), p.45 (corridor on inuring surplus share affects cat exposure), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Loss Corridors.md
---

A **Loss Corridor** is a reinsurance contract provision under which the cedant **reassumes** part of the reinsurer's liability when the treaty loss ratio falls within a stated band. For example, the cedant takes back $75\%$ of the losses between an $80\%$ and a $90\%$ loss ratio, so the reinsurer's cover has a hole in the middle.

If the corridor runs from loss ratio $a$ to loss ratio $b$ and the cedant reassumes a share $c$ of the losses within it, the reinsurer's loss ratio after the corridor is

> $$\text{LR}_{\text{net}} = \text{LR} - c \cdot \min\left(\max(\text{LR} - a,\, 0),\; b - a\right)$$

- $\text{LR}$ is the treaty loss ratio on ceded premium before the corridor.
- $c \le 100\%$.

Below $a$ and above $b$ the reinsurer pays as usual. Within the band it pays only $1 - c$ of each extra point. The most the reinsurer saves is $c(b - a)$ points of premium, in any year that reaches $b$. Unlike a stop loss, the cedant's retention is a slice in the middle of the distribution, and the reinsurer still pays in full above $b$.

> [!example]- What is the reinsurer's loss ratio after this corridor at treaty loss ratios of $70\%$, $85\%$ and $110\%$? {Example}
> A quota share has a loss corridor in which the cedant reassumes $50\%$ of the losses between a $75\%$ and a $95\%$ loss ratio.
>
> > [!answer]-
> > - At $70\%$ the loss ratio is below the corridor, so $\text{LR}_{\text{net}} = 70\%$.
> > - At $85\%$ the loss ratio is $10$ points into the corridor, so $\text{LR}_{\text{net}} = 85 - 0.5(10) = 80\%$.
> > - At $110\%$ the whole $20$-point corridor is used, so $\text{LR}_{\text{net}} = 110 - 0.5(20) = 100\%$.
> > - The reinsurer's saving stops growing at $10$ points, and it still pays the $15$ points above $95\%$ in full.

A corridor is one of the adjustable [[Reinsurance Contract Provisions|reinsurance contract provisions]], alongside [[Sliding Scale Commissions|sliding scale commissions]] and a [[Profit Commission|profit commission]]. On excess contracts the analogous feature is an annual aggregate deductible ([[Aggregate Excess of Loss]]). A corridor on a [[Surplus Share|surplus share]] that inures to a catastrophe cover changes that cover's exposure too.

## Pricing a corridor with the aggregate distribution

A corridor attaching above the expected loss ratio still lowers the reinsurer's expected loss ratio, because some years reach it. Clark evaluates the probability and the average loss ratio below, within and above the corridor. Over the outcomes $\text{LR}_i$ of an [[Aggregate Loss Model|aggregate distribution]], the expected loss ratio the cedant reassumes is

> $$E[\text{Reassumed}] = c \sum_i p_i \min\left(\max(\text{LR}_i - a,\, 0),\; b - a\right)$$

- $p_i$ is the probability of outcome $\text{LR}_i$.

> [!example]- What does this corridor save the reinsurer in expected loss? {Example}
> A quota share cedes $\$10$M of premium. The treaty loss ratio is:
>
> | Loss ratio | Probability |
> | ---: | ---: |
> | 60% | 0.25 |
> | 70% | 0.35 |
> | 80% | 0.25 |
> | 100% | 0.15 |
>
> The reinsurer proposes a corridor in which the cedant reassumes $100\%$ of the losses between $75\%$ and $85\%$.
>
> > [!answer]-
> > - The expected loss ratio is $0.25(60) + 0.35(70) + 0.25(80) + 0.15(100) = 74.5\%$, below the corridor.
> > - The points reassumed in the four outcomes are $0$, $0$, $5$ and $10$.
> > - $E[\text{Reassumed}] = 0.25(5) + 0.15(10) = 2.75$ points.
> > - The reinsurer's expected loss ratio falls from $74.5\%$ to $71.75\%$, a saving of $0.0275 \times \$10\text{M} = \$275{,}000$ of expected loss.

> [!trap] Valuing the corridor at the expected loss ratio
> Putting the expected loss ratio into the formula values a corridor above it at zero. In the example, $74.5\%$ is below the corridor, yet the corridor saves $2.75$ points, all from the $40\%$ chance of a year at $80\%$ or worse. Evaluate it outcome by outcome over the distribution.
