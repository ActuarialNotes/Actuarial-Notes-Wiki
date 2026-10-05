A **Time-Reversible Markov Chain** is an ergodic [[Markov Chain]] that, once it is running in its long-run (stationary) regime, behaves the same backward in time as forward. Traced backward, the states $X_n, X_{n-1}, X_{n-2}, \ldots$ of a stationary ergodic chain with transition probabilities $P_{ij}$ and [[Stationary Distribution|stationary probabilities]] $\pi_i$ form a Markov chain with transition probabilities $Q_{ij}$; the chain is time reversible when $Q_{ij} = P_{ij}$ for all $i$ and $j$.

> $$Q_{ij} = \frac{\pi_j P_{ji}}{\pi_i}$$

> $$\pi_i P_{ij} = \pi_j P_{ji} \quad \text{for all } i, j$$

- The second line — the **time-reversibility** or **detailed balance** equations — says that the long-run rate of transitions from $i$ to $j$, $\pi_i P_{ij}$, equals the rate from $j$ to $i$. Every stationary chain balances total flow into and out of each state ($\boldsymbol{\pi}\mathbf{P} = \boldsymbol{\pi}$); a reversible chain balances it pair by pair.
- **A shortcut to $\boldsymbol{\pi}$.** If nonnegative numbers $x_i$ summing to 1 satisfy $x_i P_{ij} = x_j P_{ji}$ for every pair, then summing over $i$ gives $\sum_i x_i P_{ij} = x_j$: the chain is time reversible and $x_i = \pi_i$. When a chain is suspected to be reversible, solving these pairwise equations is usually much easier than solving $\boldsymbol{\pi}\mathbf{P} = \boldsymbol{\pi}$. For an arbitrary chain, though, they usually have no solution.
- **Chains that move one step at a time are reversible.** If a chain can only move to a neighbouring state ($i \to i \pm 1$, or stay), every move from $i$ to $i+1$ must be followed by one back before the next, so $\pi_i P_{i,i+1} = \pi_{i+1} P_{i+1,i}$. A [[Bonus-Malus System]] whose levels move one step per year is an example.
- **Kolmogorov's test.** A necessary condition is $P_{ik} P_{kj} P_{ji} = P_{ij} P_{jk} P_{ki}$ for all $i, j, k$; in general an ergodic chain is reversible exactly when every cycle of states has the same probability as the reversed cycle. A pair with $P_{ij} > 0$ but $P_{ji} = 0$ rules reversibility out.
- **Random walk on a weighted graph.** If from node $i$ the chain moves to $j$ with probability $P_{ij} = w_{ij} / \sum_k w_{ik}$, where the arc weights are symmetric ($w_{ij} = w_{ji}$), it is reversible, with $\pi_i$ proportional to the total weight at node $i$, $\sum_j w_{ij}$.

> [!example]- Long-Run Mix in a One-Step Bonus-Malus System {Example}
> A motor book has four premium levels, 1 (best) to 4 (worst), with premiums \$100, \$120, \$150 and \$200. A policyholder moves down one level after a claim-free year and up one level after a year with a claim, staying put at the ends; each year has a claim with probability 0.2. Find the long-run proportion of policyholders at each level and the long-run average premium.
>
> > [!answer]-
> > Moves are one step at a time, so the chain is reversible and each neighbouring pair balances. Moving up needs a claim (0.2), moving down a claim-free year (0.8):
> > $$
> > \begin{align*}
> > \pi_i (0.2) &= \pi_{i+1} (0.8) \\
> > \pi_{i+1} &= \tfrac14\, \pi_i
> > \end{align*}
> > $$
> > So $\boldsymbol{\pi} \propto (1, \tfrac14, \tfrac1{16}, \tfrac1{64})$, which sums to $\tfrac{85}{64}$:
> > $$\boldsymbol{\pi} = \big(\tfrac{64}{85},\ \tfrac{16}{85},\ \tfrac{4}{85},\ \tfrac{1}{85}\big) = (0.753,\ 0.188,\ 0.047,\ 0.012)$$
> > The long-run average premium is
> > $$
> > \begin{align*}
> > \sum_i \pi_i b_i &= \frac{64(100) + 16(120) + 4(150) + 1(200)}{85} \\
> > &= \frac{9{,}120}{85} \\
> > &= \$107.29
> > \end{align*}
> > $$
> > No system of four balance equations had to be solved — three pairwise ratios and a normalisation were enough.

> [!example]- The Underwriting Cycle Run Backward {Example}
> A reinsurer classes each year's market as Soft ($S$), Firming ($F$) or Hard ($H$):
> $$\mathbf{P} = \begin{array}{c|ccc} & S & F & H \\ \hline S & 0.5 & 0.4 & 0.1 \\ F & 0.1 & 0.5 & 0.4 \\ H & 0.4 & 0.1 & 0.5 \end{array}$$
> Find the stationary distribution and the reversed-chain transition probabilities $Q_{ij}$. Is the chain time reversible?
>
> > [!answer]-
> > Each column also sums to 1, so the uniform distribution is stationary: $\pi_S = \pi_F = \pi_H = \tfrac13$. With equal $\pi$'s, $Q_{ij} = \pi_j P_{ji} / \pi_i = P_{ji}$, so the reversed chain's matrix is the transpose:
> > $$\mathbf{Q} = \begin{array}{c|ccc} & S & F & H \\ \hline S & 0.5 & 0.1 & 0.4 \\ F & 0.4 & 0.5 & 0.1 \\ H & 0.1 & 0.4 & 0.5 \end{array}$$
> > $\mathbf{Q} \neq \mathbf{P}$, so the chain is **not** reversible. Detailed balance fails at once:
> > $$
> > \begin{align*}
> > \pi_S P_{SF} &= \tfrac13(0.4) \\
> > &= 0.133 \\
> > \pi_F P_{FS} &= \tfrac13(0.1) \\
> > &= 0.033
> > \end{align*}
> > $$
> > Kolmogorov's test shows the same: the cycle $S \to F \to H \to S$ has probability $0.4^3 = 0.064$ but the reverse cycle $S \to H \to F \to S$ only $0.1^3 = 0.001$. The market turns Soft, Firming, Hard far more often than the other way round, so a film of it run backward would look wrong — even though its long-run mix is a perfectly even one-third each.
