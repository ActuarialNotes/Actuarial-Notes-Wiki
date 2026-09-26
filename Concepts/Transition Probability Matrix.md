---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:00465fb4261a3b929a34b103f5d98ca98fbca395212c32235430aa511098740b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Transition Probability Matrix.md
---

The **Transition Probability Matrix** $\mathbf{P} = [P_{ij}]$ of a [[Markov Chain]] collects its one-step probabilities: $P_{ij}$ is the probability of moving to state $j$ next period given the chain is in state $i$ now, so row $i$ is the conditional distribution of next period's state.

> $$P_{ij} = P(X_{n+1} = j \mid X_n = i) \geq 0$$
>
> $$\sum_{j} P_{ij} = 1 \quad \text{for every row } i$$

> $$\boldsymbol{\alpha}^{(n)} = \boldsymbol{\alpha}^{(0)}\, \mathbf{P}^{n}$$

- **Rows sum to one; columns need not.** A matrix whose columns also sum to one is *doubly stochastic*, and its [[Stationary Distribution|stationary distribution]] is uniform.
- The state distribution is a **row vector** multiplied on the left: next period's probability of state $j$ is $\sum_i \alpha_i P_{ij}$ — the [[The Law of Total Probability|law of total probability]] over the current state. The $n$-step probabilities are the entries of $\mathbf{P}^n$, by the [[Chapman-Kolmogorov Equations]].
- An **absorbing** state has $P_{ii} = 1$ — death in a [[Multi-State Model]], default in [[Credit Rating Migration]].
- **Building the matrix is often the real question.** If the next state depends on the last *two* periods, the process is not Markov as stated — but it becomes Markov once the state is redefined as the pair of the last two periods, at the cost of a larger matrix.
- A **time-homogeneous** chain uses the same $\mathbf{P}$ every period. Age-dependent models need a different matrix each year, and $n$-step probabilities are then products of those matrices in order.

> [!example]- Next Year's Risk-Tier Mix {Example}
> Policyholders are rated Low, Medium or High risk each year, with
> $$\mathbf{P} = \begin{array}{c|ccc} & L & M & H \\ \hline L & 0.85 & 0.15 & 0 \\ M & 0.20 & 0.70 & 0.10 \\ H & 0 & 0.30 & 0.70 \end{array}$$
> Today the portfolio is $50\%$ L, $40\%$ M and $10\%$ H. Find next year's mix.
>
> > [!answer]-
> > Multiply the row vector $(0.50, 0.40, 0.10)$ by $\mathbf{P}$, one column at a time:
> >
> > $$
> > \begin{align*}
> > \alpha_L^{(1)} &= 0.50(0.85) + 0.40(0.20) \\
> > &= 0.505 \\
> > \alpha_M^{(1)} &= 0.50(0.15) + 0.40(0.70) + 0.10(0.30) \\
> > &= 0.385 \\
> > \alpha_H^{(1)} &= 0.40(0.10) + 0.10(0.70) \\
> > &= 0.110
> > \end{align*}
> > $$
> >
> > The three sum to $1$, a quick check. Repeating the step year after year converges to the chain's long-run mix $(0.500, 0.375, 0.125)$ — see [[Stationary Distribution]].

> [!example]- Making a Two-Year Memory Markov {Example}
> A policyholder files a claim next year with probability $0.4$ if it claimed in both of the last two years, $0.3$ if it claimed last year only, $0.2$ if it claimed two years ago only, and $0.1$ if it claimed in neither. Set this up as a Markov chain, and find the probability that a policyholder claim-free in both of the last two years claims two years from now.
>
> > [!answer]-
> > Let the state be (two years ago, last year), each C (claim) or N (none). From $(a, b)$ the chain moves to $(b, c)$:
> >
> > $$\mathbf{P} = \begin{array}{c|cccc} & CC & NC & CN & NN \\ \hline CC & 0.4 & 0 & 0.6 & 0 \\ NC & 0.3 & 0 & 0.7 & 0 \\ CN & 0 & 0.2 & 0 & 0.8 \\ NN & 0 & 0.1 & 0 & 0.9 \end{array}$$
> >
> > A claim in year 2 means landing in a state ending in C. From NN, go through NC or NN in year 1:
> >
> > $$
> > \begin{align*}
> > P^2_{NN,CC} + P^2_{NN,NC} &= (0.1)(0.3) + (0.9)(0.1) \\
> > &= 0.03 + 0.09 \\
> > &= 0.12
> > \end{align*}
> > $$
> >
> > A $12\%$ chance of a claim in year 2, above the $10\%$ for next year because a year-1 claim would raise it.
