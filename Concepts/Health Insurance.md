---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:182259f4c31ae94526c4a50d9b9a7a217de1f9bc1a4d5efd102d59f794d009cb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Health Insurance.md
---
**Health Insurance**, in the long-term sense of the SOA life exams, covers benefits triggered by the insured's state of health rather than by death alone. It is modelled with a [[Multi-State Model|multiple state model]] (healthy, sick, dead) in which benefits attach to being in a state or moving between states. Canada's public system is [[Health Care Insurance]].

Three kinds of long-term health insurance are modelled this way:

1. **Disability income insurance** pays an income while the insured is sick.
2. **Long-term care insurance** pays care costs while the insured is unable to live independently.
3. **Critical illness insurance** pays a lump sum on diagnosis.

For a benefit $B$ paid at the end of each of $n$ years if the insured, healthy at age $x$, is sick at that time, the expected present value of the income is

> $$\text{EPV(income)} = B\sum_{k=1}^{n} v^{k}\;{}_kp_x^{01}$$

- ${}_kp_x^{ij}$ is the probability that a life in state $i$ at age $x$ is in state $j$ at age $x+k$, with state 0 healthy, 1 sick and 2 dead.
- $v$ is the annual discount factor.

These probabilities come from the transition matrices by the [[Chapman-Kolmogorov Equations|Chapman-Kolmogorov equations]] in discrete time, or from Kolmogorov's forward equations in continuous time.

Premiums are usually waived while the insured is sick. A level premium $P$ paid at the start of each of $n$ years while the insured is healthy therefore has expected present value

> $$\text{EPV(premiums)} = P\sum_{k=0}^{n-1} v^{k}\;{}_kp_x^{00}$$

The sum runs over the premium payment period only, and nothing is paid after it ends. The premium follows from the [[Equivalence Principle|equivalence principle]] or a profit objective.

> [!example]- What is the level premium for this two-year disability income policy? {Example}
> The policy is issued to a healthy life. A benefit of $10{,}000$ is paid at the end of each year if the insured is sick at that time. A level premium is paid at the start of each year only if the insured is healthy, and $i = 5\%$. The annual transition probabilities are the same each year:
>
> | From | To healthy | To sick | To dead |
> | --- | ---: | ---: | ---: |
> | Healthy | 0.92 | 0.05 | 0.03 |
> | Sick | 0.10 | 0.80 | 0.10 |
>
> > [!answer]-
> > - ${}_1p^{01} = 0.05$.
> > - A life sick at time 2 either fell sick in year 1 and stayed sick, or stayed healthy and fell sick in year 2, so ${}_2p^{01} = 0.92(0.05) + 0.05(0.80) = 0.086$.
> > - The benefits are worth $10{,}000\left[v(0.05) + v^2(0.086)\right]$, which is $476.19 + 780.05 = 1{,}256.24$.
> > - A premium of 1 a year is worth $1 + v(0.92) = 1.87619$.
> > - The premium is $P = 1{,}256.24 / 1.87619 = 669.57$.

## Benefits in continuous time

In continuous time, the expected present value of a benefit of 1 paid on the transition from healthy to sick within $n$ years is

> $$\int_0^n e^{-\delta t}\,{}_tp_x^{00}\,\mu_{x+t}^{01}\,dt$$

- $\delta$ is the force of interest.
- $\mu_{x+t}^{01}$ is the transition intensity from healthy to sick at age $x + t$.

Recovery from sick to healthy makes ${}_tp_x^{00}$ larger than ${}_tp_x^{\overline{00}}$, the probability of staying healthy throughout, and the premium annuity and any healthy-state benefit need ${}_tp_x^{00}$. A benefit paid on being sick at a date uses ${}_{k+1}p_x^{01}$ at time $k+1$. A benefit paid on falling sick in year $k+1$ uses ${}_kp_x^{00}\,p_{x+k}^{01}$, ignoring recovery and re-sickness within the year.

> [!example]- What are the EPV of the benefit and the annual premium rate for this critical illness policy? {Example}
> A whole-life critical illness policy pays $100{,}000$ immediately on diagnosis. A healthy life has constant intensities of diagnosis $\mu^{01} = 0.004$ and of death without diagnosis $\mu^{02} = 0.006$, and $\delta = 0.04$. Premiums are payable continuously while the life is healthy.
>
> > [!answer]-
> > - Staying healthy has probability ${}_tp^{00} = e^{-0.01t}$.
> > - The benefit is worth $100{,}000\int_0^\infty e^{-0.05t}(0.004)\,dt$, which is $100{,}000(0.004/0.05) = 8{,}000$.
> > - The premium annuity is $\int_0^\infty e^{-0.05t}\,dt = 20$.
> > - The premium is $P = 8{,}000/20 = 400$ a year, which is $100{,}000\,\mu^{01}$, the expected benefit outgo per year of healthy exposure.

## Policy values by state

Policy values, [[Reserve|reserves]] and profit tests are computed per state. A sick life and a healthy life of the same age hold very different reserves. The model is Markov, so it assumes, for example, that the chance of recovery does not depend on how long the life has been sick.

> [!trap] Running the premium annuity on survival
> When premiums are waived during sickness, the premium annuity runs on ${}_kp_x^{00}$, not on survival ${}_kp_x^{00} + {}_kp_x^{01}$. Using survival inflates the annuity and understates the premium.
