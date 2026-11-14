---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:26148451cffde34364874e851ead2076b254078f65dc9d4dc7753825f7d656c7
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Thiele's Differential Equation.md"
---

**Thiele's Differential Equation** is the equation for the rate at which the [[Policy Value|policy value]] ${}_tV$ of a long-term insurance or annuity changes over time, when premiums, benefits and expenses are paid continuously. For a policy issued to a life aged $x$, it is

> $$\frac{d}{dt}\,{}_tV = \delta_t\,{}_tV + P_t - e_t - \left(S_t + E_t - {}_tV\right)\mu_{x+t}$$

- $\delta_t$ is the [[Force of Interest|force of interest]] at time $t$.
- $P_t$ and $e_t$ are the annual rates of premium and of expense at time $t$.
- $S_t$ is the sum insured paid on death at time $t$, and $E_t$ is the expense of paying that claim.
- $\mu_{x+t}$ is the [[Hazard Rate|force of mortality]] at age $x+t$.

The policy value grows with the interest it earns and the premiums it receives, and it falls with the expenses paid and the expected cost of deaths. A death costs the insurer the sum at risk, $S_t + E_t - {}_tV$, rather than the full benefit, because the policy value already held is released to pay it.

The equation is the continuous form of the [[Reserve#The policy value recursion|policy value recursion]]. Writing the recursion over a short step $h$, subtracting ${}_tV$, dividing by $h$ and letting $h \to 0$ gives it.

## Solving the equation by Euler's method

The equation rarely has a closed-form solution, so it is solved numerically. The usual method starts from the value known at the end of the contract, ${}_nV$, and steps backward with Euler's method, for which the policy value one step earlier is

> $${}_{t-h}V \approx {}_tV - h\,\frac{d}{dt}{}_tV$$

- $h$ is the step size.

For a term insurance ${}_nV = 0$, because nothing is left to pay when the cover ends. For an endowment, ${}_nV$ is the maturity benefit rather than 0, and each backward step takes the derivative at the known end $t$. The premium that makes ${}_0V = 0$ is the [[Equivalence Principle|equivalence principle]] premium.

> [!example]- What is ${}_9V$ for this term insurance, by Euler's method with $h = 0.5$? {Example}
> A fully continuous 10-year term insurance on $(50)$ pays $\$100{,}000$ at the moment of death. Premiums are paid continuously at $\$190$ a year, there are no expenses, and $\delta = 0.05$. You are given $\mu_{60} = 0.003222$ and $\mu_{59.5} = 0.003051$.
>
> > [!answer]-
> > - Thiele's equation is $\frac{d}{dt}{}_tV = 0.05\,{}_tV + 190 - \mu_{50+t}(100{,}000 - {}_tV)$.
> > - The boundary condition is ${}_{10}V = 0$.
> > - At $t = 10$, the derivative is $0 + 190 - 0.003222(100{,}000) = -132.20$.
> > - One step back, ${}_{9.5}V = 0 - 0.5(-132.20) = 66.10$.
> > - At $t = 9.5$, the derivative is $0.05(66.10) + 190 - 0.003051(99{,}933.90) = -111.59$.
> > - One more step back, ${}_9V = 66.10 - 0.5(-111.59) = 121.90$.
> > - The forces come from the Makeham law with $A = 0.00022$, $B = 2.7 \times 10^{-6}$ and $c = 1.124$, under which the exact value is ${}_9V = 112.13$. A step of $h = 0.1$ gives $114.04$.

## Premiums paid at discrete dates

The equation assumes that payments are continuous. With annual premiums, it holds between premium dates with $P_t = 0$, and the policy value jumps up by the premium, less expenses, on each premium date.

## Multiple state models

In a [[Multiple State Model|multiple state model]], each state $i$ has its own equation, and the equations are linked through the [[Transition Intensity|transition intensities]]. The equation for state $i$ is

> $$\begin{aligned} \frac{d}{dt}\,{}_tV^{(i)} = {} & \delta_t\,{}_tV^{(i)} + P_t^{(i)} - B_t^{(i)} \\ & - \sum_{j \neq i} \mu_{x+t}^{ij}\left(S_t^{(ij)} + {}_tV^{(j)} - {}_tV^{(i)}\right) \end{aligned}$$

- ${}_tV^{(i)}$ is the policy value at time $t$ for a policy in state $i$.
- $P_t^{(i)}$ and $B_t^{(i)}$ are the annual rates of premium and of benefit paid while in state $i$.
- $\mu_{x+t}^{ij}$ is the transition intensity from state $i$ to state $j$ at age $x+t$.
- $S_t^{(ij)}$ is the lump sum paid on a move from state $i$ to state $j$.

On a move from state $i$ to state $j$ the sum at risk is $S_t^{(ij)} + {}_tV^{(j)} - {}_tV^{(i)}$, so a move into a costlier state is a cost even when no lump sum is paid. Each state's equation needs a term for every possible move out of that state, so the sick state usually has a recovery term as well as a death term. A premium that is waived while the insured is sick does not appear in the sick state's equation.

> [!example]- What are ${}_{4.9}V^{(0)}$ and ${}_{4.9}V^{(1)}$ for this disability income policy, by one Euler step back from $t = 5$? {Example}
> A disability income policy on a healthy life aged 50 uses the healthy–sick–dead model, with states 0, 1 and 2. Premiums of $\$1{,}024.49$ a year are paid continuously while the insured is healthy and are waived while the insured is sick. A benefit of $\$20{,}000$ a year is paid continuously while the insured is sick. Nothing is paid on death, and $\delta = 0.04$. At time 5:
>
> | Quantity | Value |
> | :--- | ---: |
> | $\mu^{01}$ | 0.007324 |
> | $\mu^{10}$ | 0.000732 |
> | $\mu^{02} = \mu^{12}$ | 0.009851 |
> | ${}_5V^{(0)}$ | 339.51 |
> | ${}_5V^{(1)}$ | 154,335.41 |
>
> > [!answer]-
> > - There is no death benefit, so the sum at risk on death is $-{}_tV^{(i)}$ and the death terms enter with a plus sign.
> > - State 0's equation has interest, the premium, the death term $\mu^{02}\,{}_tV^{(0)}$ and the cost of falling sick, $-\mu^{01}({}_tV^{(1)} - {}_tV^{(0)})$.
> > - State 1's equation has interest, the benefit $-20{,}000$, the death term $\mu^{12}\,{}_tV^{(1)}$ and the recovery term $-\mu^{10}({}_tV^{(0)} - {}_tV^{(1)})$.
> > - At $t = 5$, the cost of falling sick is $0.007324(153{,}995.90) = 1{,}127.87$, and the recovery term is $-0.000732(-153{,}995.90) = 112.72$.
> > - For state 0, the derivative is $13.58 + 1{,}024.49 + 3.34 - 1{,}127.87 = -86.46$.
> > - So ${}_{4.9}V^{(0)} = 339.51 + 0.1(86.46) = 348.16$.
> > - For state 1, the derivative is $6{,}173.42 - 20{,}000 + 1{,}520.36 + 112.72 = -12{,}193.50$.
> > - So ${}_{4.9}V^{(1)} = 154{,}335.41 + 0.1(12{,}193.50) = 155{,}554.76$.
> > - A fine-step solution of the same model gives $347.84$ and $155{,}552.38$, so one Euler step is already close.

> [!trap] Using the sum insured in place of the sum at risk
> The death term is $-(S_t + E_t - {}_tV)\,\mu_{x+t}$. Writing $-S_t\,\mu_{x+t}$ forgets that the policy value is released on death and makes the derivative too negative.
