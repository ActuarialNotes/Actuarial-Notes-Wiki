---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:80427466567ac28c3bd78f0f14d117255fd941b0d2c8351bbcb60afdc871d506
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multi-State Model.md
---

A **Multi-State Model** describes an individual moving among a finite set of states — for example healthy, disabled and dead — with transitions governed by a [[Markov Chain]]; benefits and premiums attach to being in a state or to moving between states. The two-state alive–dead [[Survival Model]] is its simplest case.

> $$\text{APV} = \sum_{k=1}^{n} b\, v^{k}\, P_{ij}^{\,k}$$

> $$P(X_1 = \cdots = X_n = i \mid X_0 = i) = (P_{ii})^{n}$$

- The APV is for a benefit $b$ payable at the end of each period $k$ in which a life that starts in state $i$ is in state $j$; $v$ is the one-period discount factor ([[Present Value]]) and $P^k_{ij}$ comes from the [[Chapman-Kolmogorov Equations]].
- A disability model typically has states H (healthy), D (disabled) and X (dead, absorbing), with transitions H $\to$ D (disablement), D $\to$ H (recovery) and H, D $\to$ X.
- **Being in a state versus staying in it:** $P^n_{ii}$ counts every path that is back in $i$ at time $n$, including those that left and returned; $(P_{ii})^n$ counts only paths that never left. Waiting periods and "continuously disabled" conditions need the second.
- Transition probabilities change with age, so realistic models are non-homogeneous — a different [[Transition Probability Matrix]] each year, multiplied in order.
- In continuous time the matrix is replaced by transition intensities, and the force of mortality ([[Hazard Rate]]) is the intensity of the alive $\to$ dead transition. [[Joint Life]] statuses (both alive, one alive, both dead) are another multi-state model.

> [!example]- Two-Year Disability Probabilities {Example}
> Annual transitions among Healthy, Disabled and Dead are
> $$\mathbf{P} = \begin{array}{c|ccc} & H & D & X \\ \hline H & 0.85 & 0.10 & 0.05 \\ D & 0.20 & 0.65 & 0.15 \\ X & 0 & 0 & 1 \end{array}$$
> For a healthy life, find the state probabilities two years from now and the probability of staying healthy throughout.
>
> > [!answer]-
> > Row H of $\mathbf{P}^2$:
> >
> > $$
> > \begin{align*}
> > P^2_{HH} &= 0.85(0.85) + 0.10(0.20) \\
> > &= 0.7425 \\
> > P^2_{HD} &= 0.85(0.10) + 0.10(0.65) \\
> > &= 0.1500 \\
> > P^2_{HX} &= 0.85(0.05) + 0.10(0.15) + 0.05(1) \\
> > &= 0.1075
> > \end{align*}
> > $$
> >
> > Staying healthy throughout has probability $0.85^2 = 0.7225$. The gap $0.7425 - 0.7225 = 0.02$ is the path H $\to$ D $\to$ H, $(0.10)(0.20)$: disabled in year 1, recovered by year 2.

> [!example]- Valuing a Disability Income Benefit {Example}
> Using the same matrix, a policy on a healthy life pays $\$10{,}000$ at the end of each of the next two years if the insured is then disabled. At $5\%$ annual interest, find the actuarial present value.
>
> > [!answer]-
> > The disabled probabilities are $P^1_{HD} = 0.10$ and $P^2_{HD} = 0.15$:
> >
> > $$
> > \begin{align*}
> > \text{APV} &= 10{,}000\left(\frac{0.10}{1.05} + \frac{0.15}{1.05^2}\right) \\
> > &= 10{,}000\,(0.095238 + 0.136054) \\
> > &= \$2{,}312.93
> > \end{align*}
> > $$
> >
> > The year-2 payment is worth more despite the extra discounting, because disablement accumulates faster than recovery removes it.
