---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:59ecd6ad9d412d04c3f5a72cfde88fb6a0aaa2f6e472476f28703a5f57ca9dfa
  sources:
    - "https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf, §4.1 p.185; §4.2 pp.189-191; Ex. 4.20 Exercise 20 p.266, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "https://www.randomservices.org/random/markov/Limiting.html, Stationary and Limiting Distributions, Limiting Behavior, Revisited; invariant pdf for irreducible positive recurrent chain, sha256:d4719c5e1cb9ad3be4fbf84c8dd849390f7d1ad15ced112f6312be83e5545680 — https://www.randomservices.org/random/markov/Limiting.html"
    - "https://www.randomservices.org/random/markov/General.html, General Markov Processes, Enlarging the State Space, sha256:69b4f54fd8c976d8a7093b3bfb9e0b3e836aa60794d1ad262e55c9b4b27f043c — https://www.randomservices.org/random/markov/General.html"
    - "https://www.randomservices.org/random/markov/Discrete.html, Discrete-Time Markov Chains, Doubly Stochastic Matrices, sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 — https://www.randomservices.org/random/markov/Discrete.html"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Transition Probability Matrix.md
---

A **Transition Probability Matrix** $\mathbf{P}$ is the square matrix of the one-step transition probabilities of a [[Markov Chain]], with one row and one column for each state. The entry in row $i$ and column $j$ is the probability that the chain moves from state $i$ to state $j$ in one step, which is

> $$P_{ij} = P(X_{n+1} = j \mid X_n = i)$$

- $X_n$ is the state of the chain at time $n$.

Every entry is nonnegative, and each row sums to 1 because from state $i$ the chain must move to some state:

> $$\sum_j P_{ij} = 1$$

The columns need not sum to 1.

> [!example]- Each year a policyholder is claim-free (state 0) or has a claim (state 1). A claim-free policyholder has a claim the next year with probability 0.1, and a policyholder with a claim has a claim the next year with probability 0.3. What is the transition probability matrix? {Example}
> - Row 0 is the distribution of next year's state for a claim-free policyholder: $P_{01} = 0.1$, and its complement is $P_{00} = 1 - 0.1 = 0.9$.
> - Row 1 is the distribution for a policyholder with a claim: $P_{11} = 0.3$ and $P_{10} = 1 - 0.3 = 0.7$.
> - The transition probability matrix is therefore
>
> $$\mathbf{P} = \begin{bmatrix} 0.9 & 0.1 \\ 0.7 & 0.3 \end{bmatrix}$$

## The distribution of the state after one step

By the [[The Law of Total Probability|law of total probability]] over the current state, the probability that the chain is in state $j$ at time $n + 1$ is

> $$P(X_{n+1} = j) = \sum_i P(X_n = i)\, P_{ij}$$

In matrix form, the row vector of the probabilities $P(X_n = i)$ multiplied by $\mathbf{P}$ gives the row vector of the probabilities $P(X_{n+1} = j)$.

> [!example]- Policyholders move each year among Low, Medium and High risk tiers. This year 50% are Low, 40% Medium and 10% High. What is next year's mix? {Example}
> The transition probabilities are:
>
> | From \ To | Low | Medium | High |
> | --- | --- | --- | --- |
> | Low | 0.85 | 0.15 | 0 |
> | Medium | 0.20 | 0.70 | 0.10 |
> | High | 0 | 0.30 | 0.70 |
>
> - Low next year: $0.50(0.85) + 0.40(0.20) + 0.10(0) = 0.505$.
> - Medium next year: $0.50(0.15) + 0.40(0.70) + 0.10(0.30) = 0.385$.
> - High next year: $0.50(0) + 0.40(0.10) + 0.10(0.70) = 0.110$.
> - Next year's mix is 50.5% Low, 38.5% Medium and 11.0% High, which sums to 1.

## Absorbing states

A state $i$ is absorbing when

> $$P_{ii} = 1$$

Once the chain enters an absorbing state it never leaves it, so an absorbing state forms a [[Recurrent and Transient States#Communicating states and classes|class]] by itself.

## Probability of avoiding a set of states

The probability that a chain starting in state $i$ stays outside a set of states $A$ for the next two steps is

> $$P(X_1 \notin A, X_2 \notin A \mid X_0 = i) = \sum_{k \notin A} \sum_{l \notin A} P_{ik} P_{kl}$$

- $k$ and $l$ are the states at times 1 and 2.

Each step uses only the transitions into states outside $A$. The probability of entering $A$ at least once in the two steps is the complement.

> [!example]- A policyholder in the risk tiers above is Low this year. What is the probability that the policyholder is High in at least one of the next two years? {Example}
> - The set to avoid is $A = \{\text{High}\}$, so each step may go only to Low or Medium.
> - From Low, the policyholder stays Low with probability 0.85 and then avoids High with probability $0.85 + 0.15 = 1$.
> - From Low, the policyholder moves to Medium with probability 0.15 and then avoids High with probability $0.20 + 0.70 = 0.90$.
> - The probability of avoiding High for two years is $0.85(1) + 0.15(0.90) = 0.985$.
> - The probability of being High in at least one of the two years is $1 - 0.985 = 0.015$.

## Defining the states from the history

When the probability of the next step depends on more of the history than the current state, the process is not a Markov chain as stated. It becomes one when each state records the part of the history that the probabilities depend on, such as the outcomes of the last two periods or the length of a current winning streak.

> [!example]- A team wins its next game with probability 0.5 after a loss, 0.6 after one win, and 0.7 after two or more consecutive wins. It just lost. What is the probability that it wins the game after next? {Example}
> - The probability of a win depends on the current streak, so the states are L (a loss), W1 (one win) and W2 (two or more consecutive wins).
> - A win moves L to W1, W1 to W2 and W2 to W2, and a loss moves every state to L.
>
> | From \ To | L | W1 | W2 |
> | --- | --- | --- | --- |
> | L | 0.5 | 0.5 | 0 |
> | W1 | 0.4 | 0 | 0.6 |
> | W2 | 0.3 | 0 | 0.7 |
>
> - After the next game the team is in L with probability 0.5 and in W1 with probability 0.5.
> - It wins the game after next with probability $0.5(0.5) + 0.5(0.6) = 0.55$.

## Doubly stochastic matrices

A transition probability matrix is doubly stochastic when each of its columns also sums to 1:

> $$\sum_i P_{ij} = 1$$

For a chain with $M$ states, the uniform distribution $\pi_j = 1/M$ is a [[Stationary Distribution|stationary distribution]] exactly when $\mathbf{P}$ is doubly stochastic. If the chain is irreducible, it is then the only stationary distribution, so the limiting probabilities of all the states are equal exactly when every column sums to 1.

> [!example]- A three-state Markov chain has limiting probabilities that are all equal. Row 2 of its transition probability matrix is $(1/4, 1/2, w)$, and row 3 is $(x, y, z)$. Column 3 has $P_{13} = 0$. What is $z$? {Example}
> - Equal limiting probabilities mean that every column of $\mathbf{P}$ sums to 1.
> - Row 2 sums to 1, so $w = 1 - \frac14 - \frac12 = \frac14$.
> - Column 3 sums to 1, so $0 + w + z = 1$ and $z = 1 - \frac14 = 0.75$.
