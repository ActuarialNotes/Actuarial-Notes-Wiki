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
  content_hash: sha256:3eb05bcd83f0d8abaefac09ed78cec46dca01901ff209daf803124d4e0591e51
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/State-Dependent Insurance.md
---

**State-Dependent Insurance** is a long-term insurance or annuity contract whose payments depend on the state a life occupies in a [[Multiple State Model|multiple state model]]: an annuity paid while the life is in a state, a lump sum paid on a move between states, and premiums paid only in some states. Disability income, long-term care, critical illness and [[Continuing Care Retirement Community|CCRC]] contracts are all of this kind, and they are priced with the [[Equivalence Principle|equivalence principle]] and reserved with a [[Policy Value|policy value]] for each state.

> $$\bar{a}^{ij}_x = \int_0^\infty e^{-\delta t}\;{}_tp^{ij}_x\,dt$$

> $$\bar{A}^{ij}_x = \int_0^\infty e^{-\delta t} \sum_{k \neq j} {}_tp^{ik}_x\,\mu^{kj}_{x+t}\,dt$$

> $${}_tV^{(i)} = \text{EPV}_t(\text{benefits}) - \text{EPV}_t(\text{premiums}) \text{ given } Y(x+t) = i$$

- **Symbols:** Following Dickson, Hardy & Waters (chapter 8), $\bar{a}^{ij}_x$ is the EPV of 1 a year paid continuously while the life is in state $j$, for a life now aged $x$ in state $i$, and $\bar{A}^{ij}_x$ is the EPV of 1 paid on every move into state $j$. A benefit on one particular move $k \to j$ keeps only that term of the sum. A term version, such as $\bar{a}^{ij}_{x:\overline{n}|}$, stops the integral at $n$, and the annual versions replace the integral by sums such as $\ddot{a}^{ij}_x = \sum_{k \geq 0} v^k\,{}_kp^{ij}_x$.
- **Present value random variables:** The present value of a sickness benefit of $B$ a year for $n$ years is $B\int_0^n e^{-\delta t}\,\mathbb{1}\{Y(x+t) = 1\}\,dt$, the discounted time spent sick. Its expected value is $B\,\bar{a}^{01}_{x:\overline{n}|}$, because the expectation of the indicator at time $t$ is ${}_tp^{01}_x$.
- **Premiums:** Premiums are usually paid only while the life is healthy and are waived while it is sick, so the premium annuity is $\bar{a}^{00}_{x:\overline{n}|}$, which counts healthy time after a recovery too. Monthly premiums and benefits come from the annual values by [[Woolhouse's Formula|Woolhouse's formula]].
- **Policy values:** Each state has its own policy value, and a move between states changes the reserve the insurer needs. [[Thiele's Differential Equation|Thiele's equations]] connect the state policy values through the sums at risk ${}_tV^{(j)} - {}_tV^{(i)}$.

> [!example]- Death Benefit Paid From Either State {Example}
> In a permanent disability model, a healthy life has constant intensities $\mu^{01} = 0.012$ of disablement and $\mu^{02} = 0.008$ of death, and a disabled life dies with intensity $\mu^{12} = 0.04$. A whole life policy on a healthy life pays \$100,000 at the moment of death, whether the life is healthy or disabled when it dies, and $\delta = 0.05$. Find the EPV.
>
> > [!answer]-
> > Death can come from state 0 or from state 1, so the EPV is $100{,}000\left(\mu^{02}\,\bar{a}^{00}_x + \mu^{12}\,\bar{a}^{01}_x\right)$. With constant intensities, $\bar{a}^{00}_x = 1/(0.05 + 0.02)$, and $\bar{a}^{01}_x$ is the healthy annuity times $\mu^{01}$ times the disabled annuity $1/(0.05 + 0.04)$.
> > $$
> > \begin{align*}
> > \bar{a}^{00}_x &= 14.285714 \\
> > \bar{a}^{01}_x &= \frac{0.012}{(0.07)(0.09)} \\
> > &= 1.904762 \\
> > \text{EPV} &= 100{,}000\left[0.008(14.285714) + 0.04(1.904762)\right] \\
> > &= 100{,}000(0.114286 + 0.076190) \\
> > &= 19{,}047.62
> > \end{align*}
> > $$
> > As a check, a benefit paid on death from any living state is worth $1 - \delta\left(\bar{a}^{00}_x + \bar{a}^{01}_x\right) = 1 - 0.05(16.190476) = 0.190476$ per unit. Deaths of disabled lives add two-thirds to the value of deaths from the healthy state, because disabled lives die five times as fast.

> [!example]- Disability Income Premium and Policy Values by State {Example}
> A disability income policy is issued to a healthy life aged 40 and runs to age 65. It pays a benefit of \$30,000 a year continuously while the insured is sick, and level premiums are paid continuously while the insured is healthy. The model is healthy–sick–dead with recovery, and $\delta = 0.05$. You are given $\bar{a}^{00}_{40:\overline{25}|} = 13.0116$, $\bar{a}^{01}_{40:\overline{25}|} = 0.45542$, and at age 55, $\bar{a}^{00}_{55:\overline{10}|} = 7.0488$, $\bar{a}^{01}_{55:\overline{10}|} = 0.36866$, $\bar{a}^{10}_{55:\overline{10}|} = 0.03687$ and $\bar{a}^{11}_{55:\overline{10}|} = 7.3806$. Find the annual premium, then the policy values at time 15 for an insured who is healthy and for one who is sick.
>
> > [!answer]-
> > A sick insured who recovers starts paying premiums again, so the sick-state policy value has a premium term.
> > $$
> > \begin{align*}
> > P &= \frac{30{,}000(0.45542)}{13.0116} \\
> > &= 1{,}050.03 \\
> > {}_{15}V^{(0)} &= 30{,}000(0.36866) - 1{,}050.03(7.0488) \\
> > &= 11{,}059.80 - 7{,}401.45 \\
> > &= 3{,}658.35 \\
> > {}_{15}V^{(1)} &= 30{,}000(7.3806) - 1{,}050.03(0.03687) \\
> > &= 221{,}418.00 - 38.71 \\
> > &= 221{,}379.29
> > \end{align*}
> > $$
> > The insurer holds about \$3,700 for a healthy policyholder and about \$221,400 for a sick one. Falling sick at age 55 therefore costs the insurer about \$217,700 in extra reserve, even though no lump sum is paid.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to define the present value random variables of state-dependent insurance and annuity benefits and to calculate their EPVs, from given intensities, transition probabilities or annuity values.
> - **Premiums and policy values:** ALTAM then asks for the premium by the equivalence principle for state-dependent life insurance, long-term health insurance and CCRCs, and for the policy value in each state. Euler's method on Thiele's equations, or a profit test by state, can follow.
> - **Payment frequency:** A question can give annual values and ask for monthly cash flows, which is where the two-term and three-term Woolhouse approximations come in.

> [!warning]- Exam traps
> - **The premium annuity:** Premiums waived during sickness are valued with $\bar{a}^{00}$, not with the survival annuity $\bar{a}^{00} + \bar{a}^{01}$. Using the survival annuity understates the premium.
> - **Recovery and premiums:** In a model with recovery, a sick life's policy value subtracts the EPV of the premiums it will pay after recovering, $P\,\bar{a}^{10}$. Leaving it out overstates the sick-state policy value.
> - **Benefit on a state versus on a move:** A sickness annuity uses ${}_tp^{01}_x$, while a lump sum on falling sick uses ${}_tp^{00}_x\,\mu^{01}_{x+t}$. Mixing them values a different benefit from the one described.
> - **The starting state:** $\bar{a}^{01}_x$ and $\bar{a}^{11}_x$ are different annuities. A policy value for a sick life starts in state 1, so every EPV in it has 1 as its first index.
