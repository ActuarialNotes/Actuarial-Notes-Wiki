---
aliases:
  - Multiple Decrement
  - Deconstruct Multiple Decrement Table
  - Single Decrement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e31395d6bd8b559cf003c561784f1d177e6eb3fe6d585c0e49757fd39e53f3f5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multiple Decrement Model.md
---

A **Multiple Decrement Model** follows a group of lives who can leave one active state by any of several causes, such as death, withdrawal, disability or retirement. It is the [[Multiple State Model|multiple state model]] with a single active state and one absorbing exit state for each cause.

In table form it gives the **dependent** probability $q^{(j)}_x$ of leaving by cause $j$ within a year while every cause operates. With $m$ causes, the probability of leaving by any cause is

> $$q^{(\tau)}_x = \sum_{j=1}^{m} q^{(j)}_x$$

- $p^{(\tau)}_x = 1 - q^{(\tau)}_x$ is the probability of staying in the active state for the year.

## Associated single decrement models

The **associated single decrement** model for cause $j$ has $j$ as its only cause, with the same [[Transition Intensity|intensity]] $\mu^{(j)}$. Its probability of surviving the year is

> $$p'^{(j)}_x = \exp\left(-\int_0^1 \mu^{(j)}_{x+t}\,dt\right)$$

- $q'^{(j)}_x = 1 - p'^{(j)}_x$ is the single decrement probability of leaving by cause $j$.

Because the intensities add, $p^{(\tau)}_x = \prod_j p'^{(j)}_x$ holds without any further assumption. When other causes operate, $q^{(j)}_x$ is smaller than $q'^{(j)}_x$, because some lives leave by another cause first.

## Deconstructing a multiple decrement table

Under a uniform distribution of each decrement in the multiple decrement table, ${}_tq^{(j)}_x = t\,q^{(j)}_x$, the single decrement probability is

> $$p'^{(j)}_x = \left(p^{(\tau)}_x\right)^{q^{(j)}_x / q^{(\tau)}_x}$$

The same formula holds under constant intensities over the year, because both assumptions make $\mu^{(j)}_{x+t}/\mu^{(\tau)}_{x+t}$ equal to $q^{(j)}_x/q^{(\tau)}_x$ throughout the year. Run backward, it constructs a table from single decrement rates:

> $$q^{(j)}_x = q^{(\tau)}_x\,\frac{\ln p'^{(j)}_x}{\ln p^{(\tau)}_x}$$

> [!example]- What are the new dependent rates when the withdrawal rate is halved? {Example}
> A multiple decrement table gives $q^{(d)} = 0.004$ for death, $q^{(i)} = 0.006$ for disability and $q^{(w)} = 0.060$ for withdrawal at one age. A new product design is expected to halve the single decrement withdrawal rate. Assume UDD in the multiple decrement table for the old table and constant intensities for the new one.
>
> > [!answer]-
> > - The old table has $q^{(\tau)} = 0.07$ and $p^{(\tau)} = 0.93$.
> > - Deconstructing it, $p'^{(d)} = 0.93^{0.004/0.07} = 0.995862$, $p'^{(i)} = 0.93^{0.006/0.07} = 0.993799$ and $p'^{(w)} = 0.93^{0.060/0.07} = 0.939692$.
> > - The new withdrawal rate is $q'^{(w)} = 0.060308/2 = 0.030154$, so $p'^{(w)} = 0.969846$.
> > - The new $p^{(\tau)} = 0.995862 \times 0.993799 \times 0.969846 = 0.959843$, so $q^{(\tau)} = 0.040157$ and $\ln p^{(\tau)} = -0.040985$.
> > - The new dependent rates are $q^{(d)} = 0.040157 \times 0.004147/0.040985 = 0.004063$, $q^{(i)} = 0.040157 \times 0.006220/0.040985 = 0.006095$ and $q^{(w)} = 0.040157 \times 0.030618/0.040985 = 0.029999$.
> > - Fewer withdrawals leave more lives exposed to death and disability, so both dependent rates rise even though their single decrement rates are unchanged.

## Constructing a table from single decrement tables

Under a uniform distribution of decrements in each single decrement model, with two causes, the dependent probability is

> $$q^{(1)}_x = q'^{(1)}_x\left(1 - \tfrac{1}{2}\,q'^{(2)}_x\right)$$

With three causes it is

> $$q^{(1)}_x = q'^{(1)}_x\left(1 - \tfrac{1}{2}\left(q'^{(2)}_x + q'^{(3)}_x\right) + \tfrac{1}{3}\,q'^{(2)}_x\,q'^{(3)}_x\right)$$

The two [[Fractional Age Assumption|fractional age assumptions]], UDD in the multiple decrement table and UDD in each single decrement model, give slightly different tables.

> [!example]- With $q'^{(d)} = 0.010$ and $q'^{(w)} = 0.150$, what are the dependent rates under UDD in each single decrement model, and under constant intensities? {Example}
> - In both cases $p^{(\tau)} = 0.99 \times 0.85 = 0.8415$, so $q^{(\tau)} = 0.1585$.
> - Under UDD in each single decrement model, $q^{(d)} = 0.010(1 - 0.075) = 0.009250$ and $q^{(w)} = 0.150(1 - 0.005) = 0.149250$.
> - Under constant intensities, $q^{(d)} = 0.1585 \times \ln 0.99/\ln 0.8415 = 0.009231$ and $q^{(w)} = 0.1585 \times \ln 0.85/\ln 0.8415 = 0.149269$.
> - The two assumptions differ by less than 0.00002.

## Decrements at fixed times

Some causes act only at one moment, such as withdrawals at the policy anniversary or retirement at a set age. A cause at the end of the year is applied to the survivors of the other causes, so with death through the year and withdrawal at year end, the dependent withdrawal probability is

> $$q^{(w)}_x = \left(1 - q'^{(d)}_x\right)q'^{(w)}_x$$

No fractional age assumption is needed for a decrement at a fixed time, and $q^{(d)}_x = q'^{(d)}_x$, because every life is exposed to death for the whole year before it can withdraw.

> [!example]- With $q'^{(d)} = 0.010$ and lapses of $q'^{(w)} = 0.150$ only at year end, what are the dependent rates? {Example}
> - Every policy is exposed to death for the whole year, so $q^{(d)} = 0.010$.
> - Lapses apply to the survivors, so $q^{(w)} = 0.99 \times 0.150 = 0.148500$.
> - Year-end lapses change the table more than the choice of fractional age assumption does. Spreading the lapses through the year would understate the death rate.

> [!trap] Adding the single decrement rates
> Adding the single decrement rates overstates $q^{(\tau)}_x$, because some lives leave by another cause first. Find it as $1 - \prod_j p'^{(j)}_x$.
