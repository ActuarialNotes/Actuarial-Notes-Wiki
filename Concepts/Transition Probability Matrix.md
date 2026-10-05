---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:fa16d80ab3d787060d726ba41805b1788c5da4a7dbd6f68510ef47edeab2b9eb
  sources:
    - "Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists, file dated 2012-09-06): P_ij >= 0 and row sums p.185; Ex. 4.4 'Transforming a Process into a Markov Chain' (two-day weather -> four-state chain) pp.186-187; Sec. 4.2 Chapman-Kolmogorov and unconditional P{X_n=j} = sum_i alpha_i P^n_ij pp.189-191; Exercise 20 doubly stochastic p.266, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed.), Ch. 11: Thm 11.2 u(n) = uP^n (row vector) PDF p.417; Def 11.1 absorbing state p_ii = 1 PDF p.424; Exercise 11.3.9 column sums 1 -> uniform fixed vector PDF p.451, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e - https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random, 'Discrete-Time Markov Chains' (stochastic matrix, f P^n is the distribution of X_n, time homogeneity, 'Doubly Stochastic Matrices' -> uniform invariant), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 - https://www.randomservices.org/random/markov/Discrete.html"
    - "Siegrist, Random, 'General Markov Processes', section 'Enlarging the State Space' (future depends on last two states -> Y_n = (X_n, X_{n+1}) is a homogeneous Markov process), sha256:69b4f54fd8c976d8a7093b3bfb9e0b3e836aa60794d1ad262e55c9b4b27f043c - https://www.randomservices.org/random/markov/General.html"
    - "Daniel, 'Multi-state transition models with actuarial applications' (2004; CAS/SOA reprint), Def. 1.7 non-homogeneous Markov chain and Thm 1.18 kQ_n = Q_n Q_{n+1} ... Q_{n+k-1}, PDF pp.4-7, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 - https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf"
    - "CreditMetrics Technical Document (J.P. Morgan 1997; RiskMetrics 2007 reprint), Sec. 6.4 'since default is an absorbing state, eventually all firms will default', PDF p.91, sha256:b9e9cf7e01f8cc89dedd1ca1c1df377714c6ecefa99c587d1addbb130d7367c7 - https://www.msci.com/documents/10199/93396227-d449-4229-9143-24a94dab122f"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Transition Probability Matrix.md
---

The **Transition Probability Matrix** $\mathbf{P} = [P_{ij}]$ of a [[Markov Chain]] collects its one-step probabilities: $P_{ij}$ is the probability of moving to state $j$ next period given the chain is in state $i$ now, so row $i$ is the conditional distribution of next period's state.

> $$P_{ij} = P(X_{n+1} = j \mid X_n = i) \geq 0$$
>
> $$\sum_{j} P_{ij} = 1 \quad \text{for every row } i$$

> $$\boldsymbol{\alpha}^{(n)} = \boldsymbol{\alpha}^{(0)}\, \mathbf{P}^{n}$$

- **Rows sum to one; columns need not.** A matrix whose columns also sum to one is *doubly stochastic*. For a chain with finitely many states the uniform distribution is then stationary, and it is the chain's unique [[Stationary Distribution|stationary distribution]] when the chain is irreducible.
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
