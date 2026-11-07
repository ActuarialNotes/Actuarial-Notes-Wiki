---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:56b51422119b324a94b8c5cb29c7aabe80145212b4c24e4a7eeb93fa1b0de988
  sources:
    - "Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists, file dated 2012-09-06): Sec. 4.2 n-step notation P^n_ij = P{X_{n+k}=j | X_k=i}, Chapman-Kolmogorov eq. (4.2) with derivation, P(n+m) = P(n)P(m), P(n) = P^n pp.189-190; unconditional P{X_n=j} = sum_i P^n_ij alpha_i p.191; absorbing-set technique for 'enters A by time n' and Ex. 4.10 pp.192-193, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Siegrist, Random, 'Discrete-Time Markov Chains' (Chapman-Kolmogorov P_m P_n = P_{m+n} and conditioning proof; P_n = P^n), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 - https://www.randomservices.org/random/markov/Discrete.html"
    - "Siegrist, Random, 'Transition Matrices and Generators' (continuous time: P_s P_t = P_{s+t}, P_{s+t}(x,z) = sum_y P_s(x,y) P_t(y,z)), sha256:5c059429b24a6c2c05ff35d4e72c1eb7153e9b5e3cc93e68bdf191309cbf9597 - https://www.randomservices.org/random/markov/Transition.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed.), Ch. 11 Sec. 11.1: p(2)_ij = sum_k p_ik p_kj and Thm 11.1, PDF pp.414-415, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e - https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Daniel, 'Multi-state transition models with actuarial applications' (2004; CAS/SOA reprint), Thm 1.18 non-homogeneous kQ_n = Q_n x ... x Q_{n+k-1} and the 'Warning on interpretation' (in a state at time n vs. having arrived/stayed), PDF p.7, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 - https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Chapman-Kolmogorov Equations.md
---

The **Chapman-Kolmogorov Equations** express the multi-step transition probabilities of a [[Markov Chain]] by conditioning on the state the chain occupies at an intermediate time. The probability that a chain now in state $i$ is in state $j$ after $n + m$ steps is

> $$P_{ij}^{n+m} = \sum_k P_{ik}^{n}\, P_{kj}^{m}$$

- $P_{ij}^{n} = P(X_n = j \mid X_0 = i)$ is the $n$-step transition probability from state $i$ to state $j$, with $P_{ij}^{1} = P_{ij}$.
- $k$ runs over every state of the chain.

To go from $i$ to $j$ in $n + m$ steps, the chain must be in some state $k$ after the first $n$ steps. Given that state, the Markov property makes the last $m$ steps independent of how the chain reached $k$.

> [!example]- Each month a claim is Open (O), Closed (C) or Reopened (R). The claim is Open now. What is the probability that it is Closed two months from now? {Example}
> The transition probabilities are:
>
> | From \ To | O | C | R |
> | --- | --- | --- | --- |
> | O | 0.6 | 0.4 | 0 |
> | C | 0 | 0.9 | 0.1 |
> | R | 0 | 0.5 | 0.5 |
>
> - With $n = m = 1$, the sum runs over the state $k$ after one month.
> - The probability that the claim is Closed two months from now is
>
> $$
> \begin{aligned}
> P_{OC}^{2} &= P_{OO}P_{OC} + P_{OC}P_{CC} + P_{OR}P_{RC} \\
> &= 0.6(0.4) + 0.4(0.9) + 0(0.5) \\
> &= 0.60
> \end{aligned}
> $$

## The $n$-step transition matrix

The matrix of $n$-step transition probabilities is the $n$th power of the one-step [[Transition Probability Matrix|transition probability matrix]] $\mathbf{P}$, and the equations in matrix form are

> $$\mathbf{P}^{n+m} = \mathbf{P}^{n}\,\mathbf{P}^{m}$$

- $\mathbf{P}^{n}$ is the matrix whose entry in row $i$ and column $j$ is $P_{ij}^{n}$.

Row $i$ of $\mathbf{P}^{n}$ is the distribution of the state $n$ steps after the chain is in state $i$. For one starting state, only that row is needed: row $i$ of $\mathbf{P}^{n-1}$ multiplied by $\mathbf{P}$ gives row $i$ of $\mathbf{P}^{n}$.

> [!example]- For the claim above, which is Open now, what is the probability that it is Closed three months from now? {Example}
> - The previous example gives $P_{OC}^{2} = 0.60$. The other entries of row O of $\mathbf{P}^{2}$ are $P_{OO}^{2} = 0.6(0.6) = 0.36$ and $P_{OR}^{2} = 0.4(0.1) = 0.04$.
> - Multiplying this row by column C of $\mathbf{P}$ gives
>
> $$
> \begin{aligned}
> P_{OC}^{3} &= 0.36(0.4) + 0.60(0.9) + 0.04(0.5) \\
> &= 0.144 + 0.540 + 0.020 \\
> &= 0.704
> \end{aligned}
> $$

## Unconditional probabilities

When the state at time 0 is random, the probability that the chain is in state $j$ at time $n$ is

> $$P(X_n = j) = \sum_i P(X_0 = i)\, P_{ij}^{n}$$

> [!example]- Half of a book of claims is Open and half is Closed now. What proportion is Reopened two months from now? {Example}
> - From row O of $\mathbf{P}^{2}$, $P_{OR}^{2} = 0.4(0.1) = 0.04$.
> - From row C of $\mathbf{P}^{2}$, $P_{CR}^{2} = 0.9(0.1) + 0.1(0.5) = 0.14$.
> - The proportion Reopened is $0.5(0.04) + 0.5(0.14) = 0.09$.

## Probability of entering a set of states within $n$ steps

The probability that the chain is in a set of states at time $n$ is not the probability that it enters the set at some time up to $n$. For the second, make every state of the set absorbing, so that a chain that enters the set stays there, and compute the $n$-step probability of being in the set in the modified chain.

> [!example]- For the claim above, which is Open now, what is the probability that it is reopened at some time within three months? {Example}
> - Make R absorbing by replacing its row with $P_{RR} = 1$.
> - In the modified chain, row O of $\mathbf{P}^{2}$ is still $(0.36, 0.60, 0.04)$.
> - The probability of being in R at month 3 in the modified chain is $0.60(0.1) + 0.04(1) = 0.10$.
> - The claim is reopened within three months with probability 0.10. The probability that it is in state R at month 3 in the original chain is only $0.60(0.1) + 0.04(0.5) = 0.08$, because a claim reopened in month 2 may close again in month 3.
