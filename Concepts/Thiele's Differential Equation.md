---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:528a56495599083cdfb54268e7183783cc747e7cdcccb7873d74d9b29983e717
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Thiele's Differential Equation.md"
---

**Thiele's Differential Equation** gives the rate at which the [[Policy Value|policy value]] ${}_tV$ of a long-term insurance or annuity changes over time when premiums, benefits and expenses are paid continuously. The policy value grows with the interest it earns and the premiums it receives, and it falls with the expenses paid and the expected cost of the benefit due on death. In a [[Multiple State Model|multiple state model]], each state has its own equation, and the equations are linked through the [[Transition Intensity|transition intensities]].

> $$\frac{d}{dt}\,{}_tV = \delta_t\,{}_tV + P_t - e_t - \left(S_t + E_t - {}_tV\right)\mu_{x+t}$$

> $$\begin{aligned} \frac{d}{dt}\,{}_tV^{(i)} = {} & \delta_t\,{}_tV^{(i)} + P_t^{(i)} - B_t^{(i)} \\ & - \sum_{j \neq i} \mu_{x+t}^{ij}\left(S_t^{(ij)} + {}_tV^{(j)} - {}_tV^{(i)}\right) \end{aligned}$$

- **Symbols.** Following Dickson, Hardy & Waters (chapters 7–8), $\delta_t$ is the [[Force of Interest|force of interest]], $P_t$ and $e_t$ are the annual premium and expense rates, $S_t$ is the sum insured, $E_t$ is the expense of paying a claim, and $\mu_{x+t}$ is the [[Hazard Rate|force of mortality]]. In the multiple state form, $P_t^{(i)}$ and $B_t^{(i)}$ are the premium and benefit rates paid while in state $i$, and $S_t^{(ij)}$ is the lump sum paid on a move from state $i$ to state $j$.
- **Sum at risk.** A death costs the insurer the sum at risk, $S_t + E_t - {}_tV$, rather than the full benefit, because the policy value already held is released to pay it. On a move from state $i$ to state $j$ the sum at risk is $S_t^{(ij)} + {}_tV^{(j)} - {}_tV^{(i)}$, so a move into a costlier state is a cost even when no lump sum is paid.
- **Origin.** The equation is the continuous form of the [[Reserve|policy value recursion]]. Writing the recursion over a short step $h$, subtracting ${}_tV$, dividing by $h$ and letting $h \to 0$ gives the first block above.
- **Solving it.** The equation rarely has a closed-form solution, so it is solved numerically. The usual method starts from the value known at the end of the contract (${}_nV = 0$ for term insurance, or the maturity benefit for an endowment) and steps backward with Euler's method, ${}_{t-h}V \approx {}_tV - h\,\frac{d}{dt}{}_tV$. The premium that makes ${}_0V = 0$ is the [[Equivalence Principle|equivalence principle]] premium.

> [!example]- Policy Value of a Term Insurance by Euler's Method {Example}
> A fully continuous 10-year term insurance on $(50)$ pays \$100,000 at the moment of death. Premiums are paid continuously at \$190 a year, there are no expenses, and $\delta = 0.05$. You are given $\mu_{60} = 0.003222$ and $\mu_{59.5} = 0.003051$. Write down Thiele's equation and its boundary condition, then estimate ${}_9V$ by Euler's method with $h = 0.5$, working backward from $t = 10$.
>
> > [!answer]-
> > Writing $V'_t$ for $\frac{d}{dt}{}_tV$, Thiele's equation is $V'_t = 0.05\,{}_tV + 190 - \mu_{50+t}\left(100{,}000 - {}_tV\right)$. The boundary condition is ${}_{10}V = 0$, because nothing is left to pay when the cover ends. Each Euler step uses ${}_{t-h}V \approx {}_tV - h\,V'_t$.
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
> > The level premium is more than the cost of cover in the early years and less than it in the later years, so the policy value builds up and then runs down to zero at $t = 10$. Under the Makeham law that produced these forces ($A = 0.00022$, $B = 2.7 \times 10^{-6}$, $c = 1.124$), the exact value is ${}_9V = 112.13$, and a smaller step of $h = 0.1$ gives 114.04.

> [!example]- Thiele's Equations for Disability Income Insurance {Example}
> A disability income policy on a healthy life aged 50 uses the healthy–sick–dead model, with states 0, 1 and 2. Premiums of \$1,024.49 a year are paid continuously while the insured is healthy and are waived while the insured is sick. A benefit of \$20,000 a year is paid continuously while the insured is sick. Nothing is paid on death, and $\delta = 0.04$. At time 5, the transition intensities are $\mu^{01} = 0.007324$, $\mu^{10} = 0.000732$ and $\mu^{02} = \mu^{12} = 0.009851$, and the policy values are ${}_5V^{(0)} = 339.51$ and ${}_5V^{(1)} = 154{,}335.41$. Write Thiele's equations for states 0 and 1, then estimate both policy values at $t = 4.9$ with one backward Euler step.
>
> > [!answer]-
> > Because there is no death benefit, the sum at risk on death is $-{}_tV^{(i)}$, so the death terms enter with a plus sign.
> > $$
> > \begin{align*}
> > \tfrac{d}{dt}{}_tV^{(0)} &= \delta\,{}_tV^{(0)} + 1{,}024.49 + \mu^{02}_{50+t}\,{}_tV^{(0)} \\
> > &\quad - \mu^{01}_{50+t}\left({}_tV^{(1)} - {}_tV^{(0)}\right) \\
> > \tfrac{d}{dt}{}_tV^{(1)} &= \delta\,{}_tV^{(1)} - 20{,}000 + \mu^{12}_{50+t}\,{}_tV^{(1)} \\
> > &\quad - \mu^{10}_{50+t}\left({}_tV^{(0)} - {}_tV^{(1)}\right)
> > \end{align*}
> > $$
> > At $t = 5$, the cost of falling sick is $0.007324(153{,}995.90) = 1{,}127.87$, and the recovery term adds $-0.000732(-153{,}995.90) = 112.72$. The interest and death terms follow directly from the given values.
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
> > The sick-state policy value funds the sickness annuity, so it is large and runs down by about \$12,200 a year. A fine-step solution of the same model gives 347.84 and 155,552.38, so one Euler step is already close.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to write down Thiele's equation for a stated contract, such as a single-life policy with expenses or each state of a disability income, long-term care or CCRC model, and to explain what each term pays for.
> - **Numerical answers.** The question then asks for a numerical answer, using Euler's method with a given step size from the boundary condition or from a given policy value, to reach a policy value or the premium that makes ${}_0V = 0$.
> - **Reverse questions.** Some questions work in reverse: they give the equations and ask which premiums and benefits the contract pays in each state, or they ask for the derivation from the policy value recursion.

> [!warning]- Exam traps
> - **Sum at risk, not sum insured.** The death term is $-(S_t + E_t - {}_tV)\,\mu_{x+t}$. Writing $-S_t\,\mu_{x+t}$ instead forgets that the policy value is released on death and makes the derivative too negative.
> - **Force of interest, not effective rate.** The interest term uses the force of interest $\delta$, not the effective rate $i$. Using 5% where $\delta = \ln 1.05 = 0.04879$ overstates the interest earned.
> - **The starting value.** Euler's method must start from a value that is known. For an endowment, ${}_nV$ is the maturity benefit rather than 0, and each backward step takes the derivative at the known end $t$.
> - **Every transition.** Each state's equation needs a term for every possible move out of that state, so the sick state usually has a recovery term as well as a death term. A premium that is waived while the insured is sick does not appear in the sick state's equation.
> - **Annual premiums.** The equation assumes that payments are continuous. With annual premiums, it holds between premium dates with $P_t = 0$, and the policy value jumps up by the premium, less expenses, on each premium date.
