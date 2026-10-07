---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c9bc9b033ec2f448a041afe9f9668561c7e80da228eeaf0a48e87292bf444916
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Health Insurance.md
---

**Health Insurance**, in the long-term sense of the SOA life exams, covers benefits triggered by the insured's state of health rather than by death alone: disability income insurance (an income while sick), long-term care insurance (care costs while unable to live independently) and critical illness insurance (a lump sum on diagnosis). It is modelled with a [[Multi-State Model|multiple state model]] (healthy, sick, dead) in which benefits attach to being in a state or moving between states. (Canada's public system is [[Health Care Insurance]].)

> $$\text{EPV(income)} = B\sum_{k=1}^{n} v^{k}\;{}_kp_x^{01}$$

> $$\text{EPV(premiums)} = P\sum_{k=0}^{n-1} v^{k}\;{}_kp_x^{00}$$

- ${}_kp_x^{ij}$ is the probability that a life in state $i$ at age $x$ is in state $j$ at age $x+k$ (state 0 healthy, 1 sick, 2 dead), found from the transition matrices by the [[Chapman-Kolmogorov Equations|Chapman-Kolmogorov equations]] in discrete time or Kolmogorov's forward equations in continuous time
- Premiums are usually **waived while sick**, so the premium annuity runs on ${}_kp_x^{00}$, not on survival; the premium follows from the [[Equivalence Principle|equivalence principle]] or a profit objective
- In continuous time a benefit on transition $0 \to 1$ is valued by $\int_0^n e^{-\delta t}\,{}_tp_x^{00}\,\mu_{x+t}^{01}\,dt$. Recovery ($1 \to 0$) makes ${}_tp_x^{00}$ larger than ${}_tp_x^{\overline{00}}$, the probability of staying healthy throughout
- Policy values, [[Reserve|reserves]] and profit tests are computed **per state**: a sick life and a healthy life of the same age hold very different reserves

> [!example]- Two-Year Disability Income Premium {Example}
> A two-year disability income policy is issued to a healthy life. A benefit of $10{,}000$ is paid at the end of each year if the insured is sick at that time. A level premium is paid at the start of each year only if the insured is healthy. Annual transition probabilities (same each year): from healthy, $0.92$ healthy, $0.05$ sick, $0.03$ dead; from sick, $0.10$ healthy, $0.80$ sick, $0.10$ dead. With $i = 5\%$, find the premium.
>
> > [!answer]-
> > ${}_1p^{01} = 0.05$ and
> > $$
> > \begin{align*}
> > {}_2p^{01} &= p^{00}p^{01} + p^{01}p^{11} \\
> > &= 0.92(0.05) + 0.05(0.80) \\
> > &= 0.086
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{EPV(benefits)} &= 10{,}000\left[v(0.05) + v^2(0.086)\right] \\
> > &= 476.19 + 780.05 \\
> > &= 1{,}256.24
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{EPV(premium of 1)} &= 1 + v(0.92) \\
> > &= 1.87619
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > P &= 1{,}256.24 / 1.87619 \\
> > &= 669.57
> > \end{align*}
> > $$
> > A life sick in year 2 may be one who fell sick in year 1 and stayed sick, or one who stayed healthy and fell sick, which is why ${}_2p^{01}$ has two terms.

> [!example]- Critical Illness Under Constant Intensities {Example}
> A whole-life critical illness policy pays $100{,}000$ immediately on diagnosis. A healthy life has constant intensities of diagnosis $\mu^{01} = 0.004$ and of death without diagnosis $\mu^{02} = 0.006$; $\delta = 0.04$. Premiums are payable continuously while healthy. Find the EPV of the benefit and the annual premium rate.
>
> > [!answer]-
> > Staying healthy has probability ${}_tp^{00} = e^{-0.01t}$.
> > $$
> > \begin{align*}
> > \text{EPV} &= 100{,}000\int_0^\infty e^{-0.04t}e^{-0.01t}(0.004)\,dt \\
> > &= 100{,}000\left(\frac{0.004}{0.05}\right) \\
> > &= 8{,}000
> > \end{align*}
> > $$
> > The premium annuity is $\int_0^\infty e^{-0.05t}\,dt = 20$, so $P = 8{,}000/20 = 400$ a year. With constant intensities the premium is simply $100{,}000\,\mu^{01}$, the expected benefit outgo per year of healthy exposure.

> [!tip]- How it appears on the exam
> - **ALTAM** gives a transition matrix or transition intensities and asks for the EPV of a disability income, long-term care or critical illness benefit, the premium by the [[Equivalence Principle|equivalence principle]], and policy values in each state, often through Thiele's differential equation.
> - ALTAM profit-analysis questions profit test a long-term health contract: the profit vector per policy in force in each state, the profit signature, NPV, internal rate of return, profit margin and discounted payback period, or the premium for a target profit.
> - Written parts ask candidates to critique the Markov assumption, for example that the chance of recovery does not depend on how long the life has been sick.

> [!warning]- Exam traps
> - Using ${}_kp_x^{\overline{00}}$ (healthy throughout) where the question allows recovery: the premium annuity and any healthy-state benefit need ${}_kp_x^{00}$, which includes lives who were sick and recovered.
> - Running the premium annuity on survival ${}_kp_x^{00} + {}_kp_x^{01}$ when premiums are waived during sickness, which inflates the annuity and understates the premium.
> - Applying one year's transition probabilities two years ahead. ${}_2p^{01}$ is not $(p^{01})^2$ or $2p^{01}$; it is a matrix product over the intermediate state.
> - Confusing a benefit paid on being sick at a date (state-based) with one paid on falling sick (transition-based); at time $k+1$ they use ${}_{k+1}p_x^{01}$ and ${}_kp_x^{00}\,p_{x+k}^{01}$ respectively (ignoring recovery and re-sickness within the year).
