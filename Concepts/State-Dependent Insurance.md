---
aliases:
  - State-Dependent Life Insurance
  - State-Dependent Cash Flow
  - State-Contingent Life
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dc96153c8de01c804919a40a9ad1dce41a9c2bc913f133f68edc3ef77d10ae67
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/State-Dependent Insurance.md
---

**State-Dependent Insurance** is a long-term insurance or annuity contract whose payments depend on the state a life occupies in a [[Multiple State Model|multiple state model]]: an annuity paid while the life is in a state, a lump sum paid on a move between states, and premiums paid only in some states. Disability income, long-term care, critical illness and [[Continuing Care Retirement Community|CCRC]] contracts are all of this kind.

For a life now aged $x$ in state $i$, the EPV of 1 a year paid continuously while the life is in state $j$ is

> $$\bar{a}^{ij}_x = \int_0^\infty e^{-\delta t}\;{}_tp^{ij}_x\,dt$$

- $\delta$ is the force of interest.
- ${}_tp^{ij}_x$ is the probability that a life aged $x$ in state $i$ is in state $j$ at age $x+t$.

A term version, such as $\bar{a}^{ij}_{x:\overline{n}|}$, stops the integral at $n$. The annual versions replace the integral by sums such as $\ddot{a}^{ij}_x = \sum_{k \geq 0} v^k\,{}_kp^{ij}_x$. Monthly premiums and benefits come from the annual values by [[Woolhouse's Formula|Woolhouse's formula]]. The first index is the starting state, so $\bar{a}^{01}_x$ and $\bar{a}^{11}_x$ are different annuities.

## Present value random variables

The present value of a sickness benefit of $B$ a year for $n$ years, for a life healthy (state 0) at $x$, is the discounted time spent sick (state 1):

> $$B\int_0^n e^{-\delta t}\,\mathbb{1}\{Y(x+t) = 1\}\,dt$$

- $Y(x+t)$ is the state the life occupies at age $x+t$.

Its expected value is $B\,\bar{a}^{01}_{x:\overline{n}|}$, because the expectation of the indicator at time $t$ is ${}_tp^{01}_x$.

## Benefits paid on a move between states

The EPV of 1 paid on every move into state $j$, for a life now aged $x$ in state $i$, is

> $$\bar{A}^{ij}_x = \int_0^\infty e^{-\delta t} \sum_{k \neq j} {}_tp^{ik}_x\,\mu^{kj}_{x+t}\,dt$$

- $\mu^{kj}_{x+t}$ is the transition intensity from state $k$ to state $j$ at age $x+t$.

A benefit on one particular move $k \to j$ keeps only that term of the sum. A sickness annuity uses ${}_tp^{01}_x$, while a lump sum on falling sick uses ${}_tp^{00}_x\,\mu^{01}_{x+t}$.

> [!example]- What is the EPV of this death benefit, paid whether the life is healthy or disabled when it dies? {Example}
> In a permanent disability model, a healthy life has constant intensities $\mu^{01} = 0.012$ of disablement and $\mu^{02} = 0.008$ of death, and a disabled life dies with intensity $\mu^{12} = 0.04$. A whole life policy on a healthy life pays $\$100{,}000$ at the moment of death, and $\delta = 0.05$.
>
> > [!answer]-
> > - Death can come from state 0 or from state 1, and the intensities are constant, so the EPV is
> >
> > > $$100{,}000\left(\mu^{02}\,\bar{a}^{00}_x + \mu^{12}\,\bar{a}^{01}_x\right)$$
> >
> > - The healthy annuity is $\bar{a}^{00}_x = 1/(0.05 + 0.02) = 14.285714$.
> > - $\bar{a}^{01}_x$ is the healthy annuity times $\mu^{01}$ times the disabled annuity $1/(0.05 + 0.04)$, so $\bar{a}^{01}_x = 0.012/(0.07 \times 0.09) = 1.904762$.
> > - Deaths from the healthy state contribute $0.008(14.285714) = 0.114286$ and deaths from the disabled state $0.04(1.904762) = 0.076190$.
> > - The EPV is $100{,}000(0.190476) = \$19{,}047.62$.
> > - As a check, a benefit paid on death from any living state is worth $1 - \delta\left(\bar{a}^{00}_x + \bar{a}^{01}_x\right)$ per unit, which is $1 - 0.05(16.190476) = 0.190476$.
> > - Deaths of disabled lives add two-thirds to the value of deaths from the healthy state, because disabled lives die five times as fast.

## Premiums

Premiums are priced with the [[Equivalence Principle|equivalence principle]]. They are usually paid only while the life is healthy and waived while it is sick, so the premium annuity is $\bar{a}^{00}_{x:\overline{n}|}$, which counts healthy time after a recovery too.

## Policy values by state

Each state has its own [[Policy Value|policy value]]. For a life in state $i$ at time $t$, it is

> $${}_tV^{(i)} = \text{EPV}_t(\text{benefits}) - \text{EPV}_t(\text{premiums}) \text{ given } Y(x+t) = i$$

A move between states changes the reserve the insurer needs. [[Thiele's Differential Equation|Thiele's equations]] connect the state policy values through the sums at risk ${}_tV^{(j)} - {}_tV^{(i)}$. In a model with recovery, a sick life's policy value subtracts the EPV of the premiums it will pay after recovering, $P\,\bar{a}^{10}$.

> [!example]- What are this disability income policy's premium and its policy values at time 15 for a healthy and for a sick insured? {Example}
> A disability income policy is issued to a healthy life aged 40 and runs to age 65. It pays a benefit of $\$30{,}000$ a year continuously while the insured is sick, and level premiums are paid continuously while the insured is healthy. The model is healthy–sick–dead with recovery, and $\delta = 0.05$. You are given:
>
> | Annuity | Value |
> |---|---|
> | $\bar{a}^{00}_{40:\overline{25}\rvert}$ | 13.0116 |
> | $\bar{a}^{01}_{40:\overline{25}\rvert}$ | 0.45542 |
> | $\bar{a}^{00}_{55:\overline{10}\rvert}$ | 7.0488 |
> | $\bar{a}^{01}_{55:\overline{10}\rvert}$ | 0.36866 |
> | $\bar{a}^{10}_{55:\overline{10}\rvert}$ | 0.03687 |
> | $\bar{a}^{11}_{55:\overline{10}\rvert}$ | 7.3806 |
>
> > [!answer]-
> > - The annual premium is $P = 30{,}000(0.45542)/13.0116 = \$1{,}050.03$.
> > - For a healthy insured, the benefits are worth $30{,}000(0.36866) = 11{,}059.80$ and the premiums $1{,}050.03(7.0488) = 7{,}401.45$, so ${}_{15}V^{(0)} = \$3{,}658.35$.
> > - A sick insured who recovers starts paying premiums again, so the sick-state policy value has a premium term.
> > - For a sick insured, the benefits are worth $30{,}000(7.3806) = 221{,}418.00$ and the premiums $1{,}050.03(0.03687) = 38.71$, so ${}_{15}V^{(1)} = \$221{,}379.29$.
> > - Falling sick at age 55 costs the insurer about $\$217{,}700$ in extra reserve, even though no lump sum is paid.

> [!trap] Valuing waived premiums with the survival annuity
> Premiums waived during sickness are valued with $\bar{a}^{00}$, not with the survival annuity $\bar{a}^{00} + \bar{a}^{01}$. Using the survival annuity understates the premium.
