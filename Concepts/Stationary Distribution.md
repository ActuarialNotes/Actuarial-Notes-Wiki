---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dc5e7927a1560abb8ae418c7a7efe7eb95488a530f74d341e2f6b2b58b11753f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stationary Distribution.md
---

The **Stationary Distribution** $\boldsymbol{\pi}$ of a [[Markov Chain]] is a probability vector that one transition leaves unchanged: a chain started in $\boldsymbol{\pi}$ stays in $\boldsymbol{\pi}$. For an irreducible chain, $\pi_j$ is the long-run proportion of periods spent in state $j$; if the chain is also aperiodic, $\pi_j$ is the limit of $P^n_{ij}$ whatever the starting state $i$.

> $$\pi_j = \sum_i \pi_i\, P_{ij} \quad \text{for every } j$$
>
> $$\sum_j \pi_j = 1$$

- **Solving:** write the balance equations $\boldsymbol{\pi}\mathbf{P} = \boldsymbol{\pi}$, drop any one of them (they are linearly dependent because every row of the [[Transition Probability Matrix]] sums to one) and use $\sum_j \pi_j = 1$ in its place.
- A finite irreducible chain always has a unique stationary distribution. If it is also aperiodic (ergodic), $\lim_{n\to\infty} P^n_{ij} = \pi_j$. A periodic chain — one that alternates between two states, say — has a $\boldsymbol{\pi}$, but $\mathbf{P}^n$ never settles.
- **Mean return time** to state $j$ is $1/\pi_j$. **Long-run average reward**: if state $j$ earns $r(j)$ per period, the long-run average is $\sum_j r(j)\,\pi_j$ — the average premium in a [[Bonus-Malus System]], or the average expected loss of a portfolio whose risk mix migrates.
- **Shortcuts:** a two-state chain with $P_{01} = a$ and $P_{10} = b$ has $\boldsymbol{\pi} = \big(b/(a+b),\ a/(a+b)\big)$. A chain that moves at most one state at a time satisfies $\pi_i P_{i,i+1} = \pi_{i+1} P_{i+1,i}$. A doubly stochastic matrix has a uniform $\boldsymbol{\pi}$.
- With an absorbing state that every other state can reach (death in a [[Multi-State Model]], default in [[Credit Rating Migration]]) the stationary distribution just piles all probability into that state; those models are worked over finite horizons with the [[Chapman-Kolmogorov Equations]] instead.

> [!example]- Long-Run Risk Mix and Average Loss {Example}
> Policyholders move among Low, Medium and High risk tiers each year with
> $$\mathbf{P} = \begin{array}{c|ccc} & L & M & H \\ \hline L & 0.85 & 0.15 & 0 \\ M & 0.20 & 0.70 & 0.10 \\ H & 0 & 0.30 & 0.70 \end{array}$$
> Expected annual losses are $\$400$, $\$800$ and $\$2{,}000$ by tier. Find the long-run tier mix, the long-run average expected loss per policy, and the mean time between years spent in H.
>
> > [!answer]-
> > The chain moves one tier at a time, so balance the flows between neighbours:
> >
> > $$
> > \begin{align*}
> > 0.15\,\pi_L &= 0.20\,\pi_M \\
> > \pi_M &= 0.75\,\pi_L \\
> > 0.10\,\pi_M &= 0.30\,\pi_H \\
> > \pi_H &= 0.25\,\pi_L
> > \end{align*}
> > $$
> >
> > Normalising, $\pi_L(1 + 0.75 + 0.25) = 1$, so $\boldsymbol{\pi} = (0.500,\ 0.375,\ 0.125)$. Then
> >
> > $$
> > \begin{align*}
> > \text{Average loss} &= 0.500(400) + 0.375(800) + 0.125(2{,}000) \\
> > &= 200 + 300 + 250 \\
> > &= \$750
> > \end{align*}
> > $$
> >
> > The mean return time to H is $1/0.125 = 8$ years. High-risk policies are one-eighth of the book but a third of its expected loss.

> [!example]- Solving the Full Balance Equations {Example}
> A reinsurer classes each quarter's catastrophe activity as Quiet, Normal or Active, with rows
> $$\mathbf{P} = \begin{array}{c|ccc} & Q & N & A \\ \hline Q & 0.5 & 0.4 & 0.1 \\ N & 0.3 & 0.4 & 0.3 \\ A & 0.2 & 0.3 & 0.5 \end{array}$$
> Find the long-run proportion of Active quarters.
>
> > [!answer]-
> > Use the Q and A balance equations and drop the N one:
> >
> > $$
> > \begin{align*}
> > 0.5\,\pi_Q &= 0.3\,\pi_N + 0.2\,\pi_A \\
> > 0.5\,\pi_A &= 0.1\,\pi_Q + 0.3\,\pi_N
> > \end{align*}
> > $$
> >
> > The first gives $\pi_Q = 0.6\,\pi_N + 0.4\,\pi_A$. Substituting into the second:
> >
> > $$
> > \begin{align*}
> > 0.5\,\pi_A &= 0.06\,\pi_N + 0.04\,\pi_A + 0.3\,\pi_N \\
> > 0.46\,\pi_A &= 0.36\,\pi_N \\
> > \pi_A &= \tfrac{18}{23}\,\pi_N
> > \end{align*}
> > $$
> >
> > so $\pi_Q = \tfrac{21}{23}\pi_N$. Normalising, $\pi_N(21 + 23 + 18)/23 = 1$, giving $\boldsymbol{\pi} = \big(\tfrac{21}{62},\ \tfrac{23}{62},\ \tfrac{18}{62}\big) = (0.339,\ 0.371,\ 0.290)$.
> >
> > The dropped N equation checks it: $0.4(21) + 0.4(23) + 0.3(18) = 23$. About $29\%$ of quarters are Active in the long run.
