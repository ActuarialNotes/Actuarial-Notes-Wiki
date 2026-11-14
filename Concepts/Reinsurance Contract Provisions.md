---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:7f022fae7422b38593106c7abd0202a8376ec2576dadb5104ee8dad467a88937
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), p.9 (adjustable features, loss occurrence limit), pp.9-14 (sliding scale, carryforward, profit commission, loss corridor tables), pp.22-23 (clash), pp.33-35 (AAD, swing plan as retrospective rating), pp.38 (range-table method), pp.46-47 (finite risk, risk transfer), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Reinsurance Contract Provisions.md
---

A **Reinsurance Contract Provision** is a loss-sensitive, or adjustable, feature of a reinsurance contract that makes the final commission, premium or ceded loss depend on the contract's actual experience. It lets cedant and reinsurer, who often disagree about the expected loss ratio, each be paid if its own view proves right.

The expected value of a provision over the loss-ratio outcomes $\text{LR}_i$ is

> $$E\left[g(\text{LR})\right] = \sum_i p_i \, g(\text{LR}_i)$$

- $g$ is the provision's payoff at a given loss ratio: a commission, a reassumed loss, a profit commission or an additional premium.
- $p_i$ is the probability of outcome $\text{LR}_i$, read from an [[Aggregate Loss Model|aggregate loss distribution]].

Tabulate ranges of the loss ratio with each range's probability and average loss ratio, evaluate the provision in each range, and weight. With simulated trials, the provision is computed trial by trial and the results averaged. A cap, a floor or a kink in $g$ is enough to make $g(E[\text{LR}])$, the provision at the expected loss ratio, the wrong answer. Historical adjusted loss ratios are only a reasonability check, because they are distorted by past catastrophes and low-volume years and leave out many possible outcomes. Provisions reduce the reinsurer's risk as well as its expected cost, which matters for [[Risk Loads|risk loads]], and pushed far enough they defeat [[Risk Transfer|risk transfer]].

## Sliding scale commission

A [[Sliding Scale Commissions|sliding scale commission]] on a proportional treaty falls as the loss ratio rises, between a minimum and a maximum, which damps the reinsurer's result within the slide. With a provisional commission $c_0$ at loss ratio $\text{LR}_0$ and a slide of $s$ points of commission per point of loss ratio, the commission is

> $$c = \min\left(c_{\max},\ \max\left(c_{\min},\ c_0 + s(\text{LR}_0 - \text{LR})\right)\right)$$

- $c_{\max}$ and $c_{\min}$ are the maximum and minimum commissions.

> [!example]- What is the expected sliding scale commission on this quota share? {Example}
> The commission is $25\%$ at a $75\%$ loss ratio, sliding $1{:}1$ to a maximum of $35\%$ at $65\%$ and a minimum of $20\%$ at $80\%$. The loss ratio is distributed as:
>
> | Loss ratio | Probability |
> | ---: | ---: |
> | 55% | 0.30 |
> | 70% | 0.40 |
> | 90% | 0.20 |
> | 110% | 0.10 |
>
> > [!answer]-
> > - The commission at each loss ratio is $\min(35, \max(20, 25 + 75 - \text{LR}))$: $35\%$, $30\%$, $20\%$ and $20\%$.
> > - The expected commission is $0.30(35) + 0.40(30) + 0.20(20) + 0.10(20) = 28.5\%$.
> > - At the expected loss ratio, $0.30(55) + 0.40(70) + 0.20(90) + 0.10(110) = 73.5\%$, the commission would be only $26.5\%$.

A **carryforward** provision adds the amount by which a year's loss ratio exceeds the loss ratio at the minimum commission to the next year's loss ratio in the commission calculation, which stabilises the commission. There is no standard method of pricing it. One approach shifts the commission scale and the loss ratio ranges by the expected carried-forward amount, for the current year only. The other models the loss ratio over a block of several years, which has a smaller variance.

## Profit commission

A [[Profit Commission|profit commission]] returns to the cedant a share of the reinsurer's profit in good years, so it can only lower the reinsurer's expected margin. As a ratio to ceded premium, it is

> $$\text{PC} = c_p \max\left(0,\ 1 - \text{LR} - c - m\right)$$

- $c_p$ is the profit commission percentage.
- $c$ is the ceding commission and $m$ the margin the reinsurer keeps.

## Loss corridor

Under a [[Loss Corridors|loss corridor]], the cedant reassumes a share of the losses that fall between two loss ratios, which lowers the reinsurer's expected loss even when the expected loss ratio is below the band. For a corridor from $\text{LR}_L$ to $\text{LR}_U$, the loss ratio reassumed is

> $$\text{Reassumed} = r \min\left(\max(\text{LR} - \text{LR}_L, 0),\ \text{LR}_U - \text{LR}_L\right)$$

- $r$ is the cedant's share of the losses in the corridor.

> [!example]- How much loss does the cedant expect to reassume under this corridor? {Example}
> The cedant reassumes $50\%$ of the losses between an $80\%$ and a $100\%$ loss ratio. The loss ratio is $55\%$, $70\%$, $90\%$ or $110\%$ with probabilities $0.30$, $0.40$, $0.20$ and $0.10$.
>
> > [!answer]-
> > - The reassumed points are $0.5\min(\max(\text{LR} - 80, 0), 20)$: $0$, $0$, $5$ and $10$.
> > - The expected reassumed loss is $0.20(5) + 0.10(10) = 2.0$ points, so the ceded loss ratio falls from $73.5\%$ to $71.5\%$.

## Reinstatements, aggregate deductibles and swing plans

A [[Reinstatements|reinstatement]] premium is extra premium due when a loss uses the limit, which lowers the up-front premium needed. An annual aggregate deductible multiplies the layer's loss cost by an excess charge factor ([[Aggregate Excess of Loss]]). A **swing plan** is a retrospectively rated premium on an excess layer: the layer's losses times a loading factor, within a minimum and a maximum premium, as in [[Retrospective Rating|retrospective rating]].

[[Clash Cover|Clash]] is a coverage structure rather than an adjustable feature. It is a casualty layer above the policy limits, whose loss cost comes from multi-policy occurrences, ECO/XPL awards and the treatment of ALAE.

> [!trap] Pricing a provision at the expected loss ratio
> A provision evaluated at the expected loss ratio misses the outcomes away from the mean. A corridor from $80\%$ to $100\%$ is worth nothing at a $73.5\%$ expected loss ratio, yet in the example above it is worth $2.0$ points. Weight the provision over the whole distribution.
