---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:0f184de2e67a7bc81ad87d16634e0f4ea78e34dbe0dd7155aefe1ff03848e00e
  sources:
    - "Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists, file dated 2012-09-06): Sec. 4.4 Theorem 4.1 and Remarks (ii)-(iii) (unique solution iff positive recurrent; long-run proportion; limit if aperiodic) pp.205-206; pi_j = 1/m_jj p.212; Proposition 4.3 long-run average reward sum r(j) pi_j and Ex. 4.23 BMS average premium pp.215-216; Ex. 4.31 nearest-neighbour chain time reversible, pi_i alpha_i = pi_{i+1}(1-alpha_{i+1}) p.238; Exercise 20 doubly stochastic p.266, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed.), Ch. 11: Thm 11.3 absorption with probability 1 PDF p.425; Ex. 11.16 periodic ergodic non-regular chain PDF p.441; Thms 11.7-11.12 and 'Equilibrium' PDF pp.442-447; Ex. 11.19-11.20 solving wP = w using all but one equation PDF p.444; Thm 11.15 mean recurrence r_i = 1/w_i PDF p.463, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e - https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random, 'Discrete-Time Markov Chains' (two-state chain P_01 = p, P_10 = q -> f = (q/(p+q), p/(p+q)); doubly stochastic -> uniform invariant), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 - https://www.randomservices.org/random/markov/Discrete.html"
    - "Siegrist, Random, 'Stationary and Limiting Distributions' (finite irreducible class is positive recurrent; unique invariant f(x) = 1/mu(x); ergodic limit; periodic behaviour), sha256:d4719c5e1cb9ad3be4fbf84c8dd849390f7d1ad15ced112f6312be83e5545680 - https://www.randomservices.org/random/markov/Limiting.html"
    - "Siegrist, Random, 'Discrete-Time Birth-Death Chains', section 'Time Reversal' (every irreducible recurrent birth-death chain is reversible), sha256:11fd7af4e9d00fb72857d73ce96bd41e6a78c0e4ad172587025d7096858dee94 - https://www.randomservices.org/random/markov/BirthDeath.html"
    - "CreditMetrics Technical Document (J.P. Morgan 1997; RiskMetrics 2007 reprint), Sec. 6.4 'since default is an absorbing state, eventually all firms will default', PDF p.91, sha256:b9e9cf7e01f8cc89dedd1ca1c1df377714c6ecefa99c587d1addbb130d7367c7 - https://www.msci.com/documents/10199/93396227-d449-4229-9143-24a94dab122f"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stationary Distribution.md
---

A **Stationary Distribution** of a [[Markov Chain]] is a probability distribution $\pi_j$ over its states that one transition leaves unchanged, so that a chain whose state has this distribution at one time has it at every later time. The stationary probabilities are the solution of the balance equations

> $$\pi_j = \sum_i \pi_i P_{ij}$$

together with

> $$\sum_j \pi_j = 1$$

- There is one balance equation for each state $j$, and the sum on the right runs over every state $i$.
- $P_{ij}$ is the probability of moving from state $i$ to state $j$ in one step.

Each balance equation says that the probability of being in state $j$ equals the sum of the probabilities of the states multiplied by their transition probabilities into $j$. In matrix form the equations are $\boldsymbol{\pi}\mathbf{P} = \boldsymbol{\pi}$, where $\boldsymbol{\pi}$ is the row vector of the $\pi_j$.

A chain with finitely many states that is [[Recurrent and Transient States#Communicating states and classes|irreducible]] has exactly one stationary distribution, and $\pi_j$ is the long-run proportion of time the chain spends in state $j$. The expected number of steps between visits to state $j$ is $1/\pi_j$. If the chain is also [[Recurrent and Transient States#The period of a state|aperiodic]], $\pi_j$ is the limiting probability $\lim_{n \to \infty} P_{ij}^{n}$, whatever the starting state $i$.

> [!example]- Each year a policyholder is claim-free (state 0) or has a claim (state 1). A claim-free policyholder has a claim the next year with probability 0.1, and a policyholder with a claim has a claim the next year with probability 0.3. In the long run, what proportion of years are claim-free? {Example}
> - The transition probabilities are $P_{00} = 0.9$, $P_{01} = 0.1$, $P_{10} = 0.7$ and $P_{11} = 0.3$.
> - The balance equation for state 0 is $\pi_0 = 0.9\,\pi_0 + 0.7\,\pi_1$, so $0.1\,\pi_0 = 0.7\,\pi_1$ and $\pi_1 = \pi_0 / 7$.
> - With $\pi_0 + \pi_1 = 1$, $\pi_0 = \frac{7}{8} = 0.875$.
> - In the long run 87.5% of years are claim-free.

## Solving the balance equations

The balance equations are linearly dependent, because every row of the [[Transition Probability Matrix|transition probability matrix]] sums to 1. To solve them, drop any one balance equation and use $\sum_j \pi_j = 1$ in its place. The dropped equation then serves as a check.

> [!example]- A reinsurer classes each quarter's catastrophe activity as Quiet (Q), Normal (N) or Active (A). What is the long-run proportion of Active quarters? {Example}
> The transition probabilities are:
>
> | From \ To | Q | N | A |
> | --- | --- | --- | --- |
> | Q | 0.5 | 0.4 | 0.1 |
> | N | 0.3 | 0.4 | 0.3 |
> | A | 0.2 | 0.3 | 0.5 |
>
> - Drop the balance equation for N. The balance equations for Q and A are
>
> $$
> \begin{aligned}
> \pi_Q &= 0.5\,\pi_Q + 0.3\,\pi_N + 0.2\,\pi_A \\
> \pi_A &= 0.1\,\pi_Q + 0.3\,\pi_N + 0.5\,\pi_A
> \end{aligned}
> $$
>
> - The first gives $\pi_Q = 0.6\,\pi_N + 0.4\,\pi_A$. Substituting it into the second gives $0.46\,\pi_A = 0.36\,\pi_N$, so $\pi_A = \frac{18}{23}\pi_N$ and $\pi_Q = \frac{21}{23}\pi_N$.
> - With $\pi_Q + \pi_N + \pi_A = 1$, $\pi_N \cdot \frac{62}{23} = 1$, so the stationary probabilities are $\pi_Q = \frac{21}{62}$, $\pi_N = \frac{23}{62}$ and $\pi_A = \frac{18}{62}$.
> - The dropped balance equation for N checks, since $0.4(21) + 0.4(23) + 0.3(18)$ equals 23.
> - In the long run $\frac{18}{62} = 0.290$ of quarters are Active.

## States with equal stationary probabilities

When some states are interchangeable, so that the transition probabilities look the same from each of them, their stationary probabilities can be assumed equal. This reduces the balance equations to a few unknowns. A solution that satisfies every balance equation and sums to 1 is then the stationary distribution, because an irreducible chain has only one.

A [[Transition Probability Matrix#Doubly stochastic matrices|doubly stochastic]] transition probability matrix, whose columns also sum to 1, has the uniform distribution as a stationary distribution.

> [!example]- A chain has states 0, 1, 2 and 3. From state 0 it stays at 0 with probability $\frac12$ and moves to each of 1, 2 and 3 with probability $\frac16$. From each of states 1, 2 and 3 it moves to 0 with probability $\frac13$ and otherwise to the next state in the cycle $1 \to 2 \to 3 \to 1$. What is the long-run probability of state 0? {Example}
> - States 1, 2 and 3 are interchangeable, so let $\pi_1 = \pi_2 = \pi_3 = a$.
> - The balance equation for state 0 is $\pi_0 = \frac12\pi_0 + \frac13(a + a + a)$, so $\pi_0 = 2a$.
> - With $\pi_0 + 3a = 1$, $5a = 1$, so $a = 0.2$ and $\pi_0 = 0.4$.
> - The balance equation for state 1 checks, since $\frac16(0.4) + \frac23(0.2) = 0.2$.
> - The long-run probability of state 0 is 0.4.

## Long-run average amount per period

If the chain earns an amount $b_j$ in each period it spends in state $j$, the long-run average amount per period is

> $$\sum_j \pi_j\, b_j$$

In a [[Bonus-Malus System|bonus-malus system]], $b_j$ is the premium at level $j$, and the sum is the long-run average premium.

> [!example]- Policyholders move each year among Low, Medium and High risk tiers, with expected annual losses of 400, 800 and 2,000. What is the long-run average expected loss per policy? {Example}
> The transition probabilities are:
>
> | From \ To | Low | Medium | High |
> | --- | --- | --- | --- |
> | Low | 0.85 | 0.15 | 0 |
> | Medium | 0.20 | 0.70 | 0.10 |
> | High | 0 | 0.30 | 0.70 |
>
> - Solving the balance equations gives $\pi_L = 0.500$, $\pi_M = 0.375$ and $\pi_H = 0.125$.
> - The long-run average expected loss is
>
> $$
> \begin{aligned}
> \sum_j \pi_j\, b_j &= 0.500(400) + 0.375(800) + 0.125(2{,}000) \\
> &= 750
> \end{aligned}
> $$

A chain that moves at most one state at a time, as this one does, can be solved one pair of neighbouring states at a time with the [[Time-Reversible Markov Chain#Chains that move one state at a time|equations for a chain that moves one state at a time]].

> [!trap] Solving the balance equations without $\sum_j \pi_j = 1$
> The balance equations alone have every multiple of $\boldsymbol{\pi}$ as a solution. In the claim-free example, $\pi_1 = \pi_0 / 7$ holds for $(7, 1)$ as well as for $(0.875, 0.125)$. Only the equation $\sum_j \pi_j = 1$ picks out the probabilities.
