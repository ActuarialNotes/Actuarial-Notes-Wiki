---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:a354815701b7944845ddc2ae3f56c4a9869972a04916f38ac1f382e07fcb4f93
  sources:
    - "https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf, §4.1 eq. (4.1) and row sums, PDF p.1 (p.185), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf, §4.2 eq. (4.2) and P(n)=P^n, PDF pp.5-6, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf, §4.4 Theorem 4.1 and Remarks (i)-(ii), PDF p.21, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Discrete-Time Markov Chains, Markov property, past and future conditionally independent given the present, sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 — https://www.randomservices.org/random/markov/Discrete.html"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Markov Chain.md
---

A **Markov Chain** is a [[Stochastic Processes|stochastic process]] $\{X_n, n = 0, 1, 2, \ldots\}$ with a finite or countable set of states in which, given the present state, the next state is independent of the past states. If the chain is in state $i$ at time $n$, the probability that it is in state $j$ at time $n + 1$ is

> $$P(X_{n+1} = j \mid X_n = i, X_{n-1} = i_{n-1}, \ldots, X_0 = i_0) = P_{ij}$$

- $i_0, \ldots, i_{n-1}$ are the states the chain occupied at times $0, \ldots, n-1$.
- $P_{ij}$ is the transition probability from state $i$ to state $j$, and it does not depend on $n$.
- $P_{ij} \ge 0$, and $\sum_j P_{ij} = 1$ for every state $i$.

The transition probabilities form the [[Transition Probability Matrix|transition probability matrix]] $\mathbf{P}$, whose row $i$ is the distribution of the next state when the chain is in state $i$. Each row sums to 1 because from state $i$ the chain must move to some state.

Because only the present state matters, two paths of the chain that are in the same state at the same time have the same probabilities for every later step. A chain observed partway through therefore restarts from its current state. When the probabilities of the next step depend on more of the history than the current state, the process becomes a Markov chain once [[Transition Probability Matrix#Defining the states from the history|each state records that history]].

> [!example]- Each day a commuter either drives (state 1) or takes the train (state 2). After a day of driving she drives the next day with probability 0.7, and after a day on the train she takes the train the next day with probability 0.6. What is the transition probability matrix? {Example}
> - Row 1 is the distribution of tomorrow's state after a day of driving: $P_{11} = 0.7$, and its complement is $P_{12} = 1 - 0.7 = 0.3$.
> - Row 2 is the distribution after a day on the train: $P_{22} = 0.6$ and $P_{21} = 1 - 0.6 = 0.4$.
> - The transition probability matrix is therefore
>
> $$\mathbf{P} = \begin{bmatrix} 0.7 & 0.3 \\ 0.4 & 0.6 \end{bmatrix}$$

## Multi-step transition probabilities

The probability that a chain now in state $i$ is in state $j$ after $n$ steps is

> $$P_{ij}^{n} = (\mathbf{P}^n)_{ij}$$

- $(\mathbf{P}^n)_{ij}$ is the entry in row $i$ and column $j$ of the $n$th power of $\mathbf{P}$.

This follows from the [[Chapman-Kolmogorov Equations|Chapman-Kolmogorov equations]]. Row $i$ of $\mathbf{P}^n$ is the distribution of the state $n$ steps after the chain is in state $i$. Each entry $P_{ij}^{n}$ is the sum, over every path of intermediate states from $i$ to $j$, of the product of the transition probabilities along the path.

> [!example]- The commuter took the train today. What is the probability that she drives two days from now? {Example}
> - She can drive tomorrow and again the day after, with probability $P_{21}P_{11} = 0.4 \times 0.7 = 0.28$.
> - She can take the train tomorrow and drive the day after, with probability $P_{22}P_{21} = 0.6 \times 0.4 = 0.24$.
> - The probability is the sum over the two paths, $P_{21}^{2} = 0.28 + 0.24 = 0.52$.

## Long-run probabilities

For an [[Recurrent and Transient States#Communicating states and classes|irreducible]], [[Recurrent and Transient States#The period of a state|aperiodic]] chain with finitely many states, the long-run probability $\pi_j$ of state $j$ is the solution of

> $$\pi_j = \sum_i \pi_i P_{ij}$$

- $\sum_j \pi_j = 1$.

The probabilities $\pi_j$ form the [[Stationary Distribution|stationary distribution]] of the chain. Each $\pi_j$ is the long-run proportion of time the chain spends in state $j$, and it is also the limit of $P_{ij}^{n}$ as $n \to \infty$ for every starting state $i$.

> [!example]- In the long run, on what proportion of days does the commuter drive? {Example}
> - The balance equation for state 1 is $\pi_1 = 0.7\,\pi_1 + 0.4\,\pi_2$, so $0.3\,\pi_1 = 0.4\,\pi_2$.
> - With $\pi_1 + \pi_2 = 1$, $\pi_1 = \frac{0.4}{0.3 + 0.4} = \frac{4}{7}$.
> - She drives on $\frac{4}{7} = 0.571$ of days in the long run.

> [!trap] Using one path for a multi-step probability
> A multi-step transition probability sums over every path of intermediate states. For the commuter on the train today, the path through driving tomorrow gives only $0.28$, but the probability of driving in two days is $0.28 + 0.24 = 0.52$.
