---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:de2b225f9d51988684349b7445ccdb7f102f502ab68ef350d16f3ecb1b74ee32
  sources:
    - "Ross, Introduction to Probability Models, Ch 4 'Markov Chains' (an earlier edition than the 12th ed. the 2026 MAS-I outline assigns; course-hosted copy on the NTNU TMA4265 page, printed pp.185-280, PDF p.n = printed p.184+n), §4.8 Time Reversible Markov Chains pp.236-242 (PDF pp.52-58): stationary ergodic chain traced backward, Q_ij = pi_j P_ji / pi_i, time reversible iff Q_ij = P_ij, Eq. (4.21) pi_i P_ij = pi_j P_ji and its rate interpretation p.237; Eq. (4.22) nonnegative x_i summing to 1 with x_i P_ij = x_j P_ji => reversible and x_i = pi_i p.237; Example 4.31 nearest-neighbour chain on 0..M reversible (moves i -> i+1 and back alternate) pp.238-239; Example 4.32 random walk on a connected graph with symmetric arc weights, pi_i = sum_j w_ij / sum_i sum_j w_ij, pp.240-241; 'usually no solution' and Eq. (4.25) P_ik P_kj P_ji = P_ij P_jk P_ki, Theorem 4.2 cycle criterion p.242; Theorem 4.1 Eq. (4.7) p.205, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Siegrist, Random (randomservices.org), Ch 15 §7 'Time Reversal in Discrete-Time Chains': reversibility via the balance equation; solving the reversibility condition 'is often easier than using the definition of invariance directly'; Kolmogorov cycle condition — an irreducible positive recurrent chain is reversible iff every cycle has the probability of its reversal, sha256:9aa4f030ec3b7f9225284b497d4fd8b4c114088e999509049b9bf829b7d4a62f — https://www.randomservices.org/random/markov/TimeReversal.html"
    - "Siegrist, Random (randomservices.org), Ch 15 §14 'Random Walks on Graphs': a random walk on a connected graph with conductance c is reversible with respect to C(x) = sum_y c(x,y), sha256:ae887db7f9a51245ae88a050f75b470aabeee64f2257ed9aeeea0eef091640e8 — https://www.randomservices.org/random/markov/WalkGraph.html"
    - "Siegrist, Random (randomservices.org), Ch 15 §13 'Discrete-Time Birth-Death Chains': every irreducible recurrent birth-death chain is reversible, sha256:11fd7af4e9d00fb72857d73ce96bd41e6a78c0e4ad172587025d7096858dee94 — https://www.randomservices.org/random/markov/BirthDeath.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Time-Reversible Markov Chain.md
---

A **Time-Reversible Markov Chain** is an ergodic [[Markov Chain]] whose states, observed backward in time once the chain is in its [[Stationary Distribution|stationary distribution]], have the same transition probabilities as the chain observed forward. Traced backward, the chain moves from state $i$ to state $j$ with probability

> $$Q_{ij} = \frac{\pi_j P_{ji}}{\pi_i}$$

- $\pi_i$ is the stationary probability of state $i$.
- $P_{ji}$ is the probability that the forward chain moves from state $j$ to state $i$ in one step.

The chain is time reversible when $Q_{ij} = P_{ij}$ for every pair of states. This holds exactly when the long-run rate of transitions from $i$ to $j$, $\pi_i P_{ij}$, equals the long-run rate from $j$ to $i$ for every pair of states, which are the detailed balance equations

> $$\pi_i P_{ij} = \pi_j P_{ji}$$

Every stationary distribution balances the total flow into and out of each state. A time-reversible chain balances the flow between each pair of states.

> [!example]- A Markov chain on states 1 and 2 has $P_{11} = 0.5$, $P_{12} = 0.5$, $P_{21} = 0.25$ and $P_{22} = 0.75$. Its stationary distribution is $\pi_1 = \frac13$, $\pi_2 = \frac23$. Is the chain time reversible? {Example}
> - The backward chain moves from 1 to 2 with probability $Q_{12} = \frac{(2/3)(0.25)}{1/3} = 0.5$, which equals $P_{12}$.
> - Then $Q_{11} = 1 - Q_{12} = 0.5 = P_{11}$, and in the same way $Q_{21} = P_{21}$ and $Q_{22} = P_{22}$.
> - The detailed balance equation holds, since $\pi_1 P_{12} = \frac13(0.5)$ and $\pi_2 P_{21} = \frac23(0.25)$ are both $\frac16$.
> - The chain is time reversible, although its transition probability matrix is not symmetric.

## Solving the detailed balance equations

If nonnegative numbers $x_i$ that sum to 1 satisfy $x_i P_{ij} = x_j P_{ji}$ for every pair of states, then summing over $i$ gives

> $$\sum_i x_i P_{ij} = x_j$$

The $x_i$ therefore satisfy the balance equations, so they are the stationary probabilities and the chain is time reversible. When a chain is time reversible, solving the detailed balance equations one pair of states at a time and then making the probabilities sum to 1 is usually easier than solving the full balance equations. For a chain that is not time reversible, the detailed balance equations have no solution.

## Chains that move one state at a time

A chain whose states are $0, 1, 2, \ldots$ and that moves at most one state up or down in each step is time reversible. Between any two transitions from $i$ to $i + 1$ there must be a transition from $i + 1$ to $i$, so the numbers of the two transitions differ by at most one, and their long-run rates are equal:

> $$\pi_i P_{i,i+1} = \pi_{i+1} P_{i+1,i}$$

A [[Bonus-Malus System|bonus-malus system]] whose levels move one step a year is a chain of this kind.

> [!example]- A bonus-malus system has levels 1 (best) to 4 (worst), with premiums 100, 120, 150 and 200. A policyholder moves down one level after a claim-free year and up one level after a year with a claim, staying put at the ends. Each year has a claim with probability 0.2. What is the long-run average premium? {Example}
> - Moving up needs a claim, with probability 0.2, and moving down needs a claim-free year, with probability 0.8.
> - The detailed balance equations are $\pi_i (0.2) = \pi_{i+1} (0.8)$, so $\pi_{i+1} = \frac14\pi_i$.
> - The stationary probabilities are proportional to $1, \frac14, \frac{1}{16}, \frac{1}{64}$, which sum to $\frac{85}{64}$.
> - Making them sum to 1 gives $\pi_1 = \frac{64}{85}$, $\pi_2 = \frac{16}{85}$, $\pi_3 = \frac{4}{85}$ and $\pi_4 = \frac{1}{85}$.
> - The long-run average premium, with $b_i$ the premium at level $i$, is
>
> $$
> \begin{aligned}
> \sum_i \pi_i b_i &= \frac{64(100) + 16(120) + 4(150) + 1(200)}{85} \\
> &= \frac{9{,}120}{85} \\
> &= 107.29
> \end{aligned}
> $$

## Kolmogorov's criterion

An ergodic chain is time reversible exactly when, for every cycle of states, the product of the transition probabilities around the cycle equals the product around the same cycle in reverse. For a cycle of three states the condition is

> $$P_{ik} P_{kj} P_{ji} = P_{ij} P_{jk} P_{ki}$$

If $P_{ij} > 0$ but $P_{ji} = 0$ for two states with positive stationary probabilities, detailed balance fails, and the chain is not time reversible.

> [!example]- A reinsurer classes each year's market as Soft (S), Firming (F) or Hard (H). Is the chain time reversible? {Example}
> The transition probabilities are:
>
> | From \ To | S | F | H |
> | --- | --- | --- | --- |
> | S | 0.5 | 0.4 | 0.1 |
> | F | 0.1 | 0.5 | 0.4 |
> | H | 0.4 | 0.1 | 0.5 |
>
> - The cycle $S \to F \to H \to S$ has probability $0.4^3 = 0.064$.
> - The reverse cycle $S \to H \to F \to S$ has probability $0.1^3 = 0.001$.
> - The products differ, so the chain is not time reversible.
> - Every column sums to 1, so the stationary distribution is uniform, $\pi_S = \pi_F = \pi_H = \frac13$. A uniform stationary distribution does not make a chain time reversible.

## Symmetric transition matrices

A chain whose transition probability matrix is symmetric, with

> $$P_{ij} = P_{ji}$$

for every pair of states, is [[Transition Probability Matrix#Doubly stochastic matrices|doubly stochastic]], so its stationary distribution is uniform. The detailed balance equations then hold, because $\pi_i = \pi_j$, and the chain is time reversible. A time-reversible chain need not have a symmetric matrix, as the two-state chain in the first example shows.

> [!trap] Reading time reversibility as a symmetric matrix
> Time reversibility requires $\pi_i P_{ij} = \pi_j P_{ji}$, a balance of flows, not $P_{ij} = P_{ji}$. The two-state chain with $P_{12} = 0.5$ and $P_{21} = 0.25$ is time reversible, because $\pi_2 = 2\pi_1$ makes the two flows equal.
