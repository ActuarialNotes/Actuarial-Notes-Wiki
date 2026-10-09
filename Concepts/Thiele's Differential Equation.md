---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2456ca336ce60ca20ca8a85676e3baef5ea77499166187909b1ef92b87d33d8a
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Thiele's Differential Equation.md"
---

**Thiele's Differential Equation** gives the rate at which the [[Policy Value|policy value]] ${}_tV$ of a long-term insurance or annuity changes when premiums, benefits and expenses are paid continuously: interest earned on the policy value, plus premiums, less expenses, less the expected cost of the benefit due on death. In a [[Multiple State Model|multiple state model]] there is one equation per state, linked through the [[Transition Intensity|transition intensities]].

> $$\frac{d}{dt}\,{}_tV = \delta_t\,{}_tV + P_t - e_t - \left(S_t + E_t - {}_tV\right)\mu_{x+t}$$

> $$\begin{aligned} \frac{d}{dt}\,{}_tV^{(i)} = {} & \delta_t\,{}_tV^{(i)} + P_t^{(i)} - B_t^{(i)} \\ & - \sum_{j \neq i} \mu_{x+t}^{ij}\left(S_t^{(ij)} + {}_tV^{(j)} - {}_tV^{(i)}\right) \end{aligned}$$

- **Symbols** (Dickson, Hardy & Waters, ch. 7–8): $\delta_t$ is the [[Force of Interest|force of interest]], $P_t$ and $e_t$ the premium and expense rates per year, $S_t$ the sum insured, $E_t$ the expense of paying a claim and $\mu_{x+t}$ the [[Hazard Rate|force of mortality]]. In state $i$, $P_t^{(i)}$ and $B_t^{(i)}$ are the premium and benefit rates, and $S_t^{(ij)}$ is the lump sum paid on a move to state $j$.
- **Sum at risk.** A death costs $S_t + E_t - {}_tV$, because the policy value already held is released. For a move from state $i$ to $j$ the cost is $S_t^{(ij)} + {}_tV^{(j)} - {}_tV^{(i)}$, so a move into a costlier state is a cost even with no lump sum.
- **Origin.** It is the continuous form of the [[Reserve|policy value recursion]]: write the recursion over a step $h$, subtract ${}_tV$, divide by $h$ and let $h \to 0$.
- **Solving it.** Closed forms are rare. Start from the value at the end of the contract (${}_nV = 0$ for term insurance, the maturity benefit for an endowment) and step backward with Euler's method, ${}_{t-h}V \approx {}_tV - h\,\frac{d}{dt}{}_tV$. The premium that makes ${}_0V = 0$ is the [[Equivalence Principle|equivalence principle]] premium.

> [!example]- Policy Value of a Term Insurance by Euler's Method {Example}
> A fully continuous 10-year term insurance on $(50)$ pays \$100,000 at the moment of death. Premiums are paid continuously at \$190 a year, there are no expenses, and $\delta = 0.05$. You are given $\mu_{60} = 0.003222$ and $\mu_{59.5} = 0.003051$. Write down Thiele's equation and its boundary condition, then estimate ${}_9V$ by Euler's method with $h = 0.5$, working backward from $t = 10$.
>
> > [!answer]-
> > Write $V'_t$ for $\frac{d}{dt}{}_tV$. Then $V'_t = 0.05\,{}_tV + 190 - \mu_{50+t}\left(100{,}000 - {}_tV\right)$, with ${}_{10}V = 0$ because nothing is left to pay when the cover ends. Each step uses ${}_{t-h}V \approx {}_tV - h\,V'_t$.
> > $$
> > \begin{align*}
> > V'_{10} &= 0.05(0) + 190 - 0.003222(100{,}000) \\
> > &= -132.20 \\
> > {}_{9.5}V &= 0 - 0.5(-132.20) \\
> > &= 66.10 \\
> > V'_{9.5} &= 0.05(66.10) + 190 - 0.003051(99{,}933.90) \\
> > &= -111.59 \\
> > {}_{9}V &= 66.10 - 0.5(-111.59) \\
> > &= 121.90
> > \end{align*}
> > $$
> > The level premium exceeds the early cost of cover and falls short of the late cost, so the policy value builds up, then runs down to zero. The exact value under the Makeham law that produced these forces ($A = 0.00022$, $B = 2.7 \times 10^{-6}$, $c = 1.124$) is ${}_9V = 112.13$; a step of $h = 0.1$ gives 114.04.

> [!example]- Thiele's Equations for Disability Income Insurance {Example}
> A disability income policy on a healthy life aged 50 uses the healthy–sick–dead model (states 0, 1, 2). Premiums of \$1,024.49 a year are paid continuously while healthy and waived while sick. A benefit of \$20,000 a year is paid continuously while sick. Nothing is paid on death, and $\delta = 0.04$. At time 5, $\mu^{01} = 0.007324$, $\mu^{10} = 0.000732$, $\mu^{02} = \mu^{12} = 0.009851$, ${}_5V^{(0)} = 339.51$ and ${}_5V^{(1)} = 154{,}335.41$. Write Thiele's equations for states 0 and 1, then estimate both policy values at $t = 4.9$ with one backward Euler step.
>
> > [!answer]-
> > With no death benefit the sum at risk on death is $-{}_tV^{(i)}$, so the death terms enter with a plus sign.
> > $$
> > \begin{align*}
> > \tfrac{d}{dt}{}_tV^{(0)} &= \delta\,{}_tV^{(0)} + 1{,}024.49 + \mu^{02}_{50+t}\,{}_tV^{(0)} \\
> > &\quad - \mu^{01}_{50+t}\left({}_tV^{(1)} - {}_tV^{(0)}\right) \\
> > \tfrac{d}{dt}{}_tV^{(1)} &= \delta\,{}_tV^{(1)} - 20{,}000 + \mu^{12}_{50+t}\,{}_tV^{(1)} \\
> > &\quad - \mu^{10}_{50+t}\left({}_tV^{(0)} - {}_tV^{(1)}\right)
> > \end{align*}
> > $$
> > At $t = 5$ the cost of falling sick is $0.007324(153{,}995.90) = 1{,}127.87$, and recovery contributes $-0.000732(-153{,}995.90) = +112.72$.
> > $$
> > \begin{align*}
> > \tfrac{d}{dt}{}_5V^{(0)} &= 13.58 + 1{,}024.49 + 3.34 - 1{,}127.87 \\
> > &= -86.46 \\
> > {}_{4.9}V^{(0)} &= 339.51 + 0.1(86.46) \\
> > &= 348.16 \\
> > \tfrac{d}{dt}{}_5V^{(1)} &= 6{,}173.42 - 20{,}000 + 1{,}520.36 + 112.72 \\
> > &= -12{,}193.50 \\
> > {}_{4.9}V^{(1)} &= 154{,}335.41 + 0.1(12{,}193.50) \\
> > &= 155{,}554.76
> > \end{align*}
> > $$
> > The sick-state value funds the sickness annuity, so it is large and runs down by about \$12,200 a year. A fine-step solution of the same model gives 347.84 and 155,552.38.

> [!tip]- How it appears on the exam
> - **ALTAM** asks you to write down Thiele's equation for a stated contract (a single-life policy with expenses, or each state of a disability income, long-term care or CCRC model) and to say what each term pays for.
> - It then asks for a number: an Euler step of given size from the boundary condition or a given policy value, to reach a policy value or the premium that makes ${}_0V = 0$.
> - In reverse, it gives the equations and asks which premiums and benefits the contract has in which states, or asks for the derivation from the recursion.

> [!warning]- Exam traps
> - **Death costs the sum at risk.** The term is $-(S_t + E_t - {}_tV)\,\mu_{x+t}$; writing $-S_t\,\mu_{x+t}$ forgets the released policy value.
> - **Interest is $\delta$, not $i$.** Using 5% where $\delta = \ln 1.05 = 0.04879$ overstates the interest term.
> - **Start where the value is known.** An endowment's ${}_nV$ is the maturity benefit, not 0, and the backward step takes the derivative at the known end $t$.
> - **Every move out of a state.** The sick state usually has a recovery term. A waived premium is absent from the sick state's equation.
> - **Annual premiums.** Between premium dates the equation holds with $P_t = 0$; on each premium date the policy value jumps up by the premium less expenses.
