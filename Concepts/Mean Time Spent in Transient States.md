---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:a024de00cc24a4623a95e0e4aceb8570635f43ea1b04889629f31d0187f1f747
  sources:
    - "https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf, §4.6, PDF pp.46-48, Eq. (4.18), printed pp.230-232, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §11.2, Thm 11.4-11.6, PDF pp.426-428, printed pp.418-420, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mean Time Spent in Transient States.md
---

The **Mean Time Spent in Transient States** of a [[Markov Chain]] with finitely many states is the expected number of periods the chain spends in each [[Recurrent and Transient States|transient state]] before it leaves the transient states for good. A transient state is one the chain may leave and never return to, and an absorbing state is one that, once entered, is never left. For transient states $i$ and $j$, conditioning on the first step shows that the expected number of periods $s_{ij}$ spent in state $j$ by a chain that starts in state $i$ is

> $$s_{ij} = \delta_{ij} + \sum_{k} P_{ik}\, s_{kj}$$

- $\delta_{ij}$ is 1 if $i = j$ and 0 otherwise, so the starting period counts when $i = j$.
- $k$ runs over the transient states only, because the chain can never return to a transient state from a recurrent one.

In matrix form these equations are $\mathbf{S} = \mathbf{I} + \mathbf{P}_T \mathbf{S}$, so the matrix of the $s_{ij}$ is

> $$\mathbf{S} = (\mathbf{I} - \mathbf{P}_T)^{-1}$$

- $\mathbf{P}_T$ is the part of the [[Transition Probability Matrix|transition probability matrix]] with the rows and columns of the transient states only.
- $\mathbf{I}$ is the identity matrix of the same size.

With two transient states, the inverse of a $2 \times 2$ matrix is

> $$\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

> [!example]- Each month a claim is Open (O), in Litigation (L) or Closed (C). From O it stays O with probability 0.6, moves to L with probability 0.1 and closes with probability 0.3. From L it moves to O with probability 0.2, stays L with probability 0.7 and closes with probability 0.1. For a claim that is Open now, what are the expected numbers of months it spends Open and in Litigation? {Example}
> - C is absorbing, and O and L are transient, so
>
> $$\mathbf{I} - \mathbf{P}_T = \begin{bmatrix} 0.4 & -0.1 \\ -0.2 & 0.3 \end{bmatrix}$$
>
> - Its determinant is $(0.4)(0.3) - (-0.1)(-0.2) = 0.10$.
> - Inverting it gives
>
> $$
> \begin{aligned}
> \mathbf{S} &= \frac{1}{0.10}\begin{bmatrix} 0.3 & 0.1 \\ 0.2 & 0.4 \end{bmatrix} \\
> &= \begin{bmatrix} 3 & 1 \\ 2 & 4 \end{bmatrix}
> \end{aligned}
> $$
>
> - A claim that is Open now spends $s_{OO} = 3$ months Open, counting this one, and $s_{OL} = 1$ month in Litigation.

## Expected time until absorption

The expected number of periods a chain starting in transient state $i$ spends in all the transient states, which is the expected time until it is absorbed, is the sum of row $i$ of $\mathbf{S}$:

> $$\sum_j s_{ij}$$

- $j$ runs over the transient states, and the sum counts the starting period.

> [!example]- How many months does the claim that is Open now take to close, on average? {Example}
> - Row O of $\mathbf{S}$ is $(3, 1)$.
> - The claim is Open or in Litigation for $3 + 1 = 4$ months on average before it closes.

## Expected time until the chain first enters a state

To find the expected time until the chain first enters a state, or a set of states, make each of those states absorbing. The remaining states are then transient, and the row sums of $\mathbf{S}$ for the modified chain give the expected times.

> [!example]- Policyholders move each year among Low, Medium and High risk tiers. A policyholder is Low this year. What is the expected number of years, counting this one, before the policyholder is first High? {Example}
> The transition probabilities are:
>
> | From \ To | Low | Medium | High |
> | --- | --- | --- | --- |
> | Low | 0.85 | 0.15 | 0 |
> | Medium | 0.20 | 0.70 | 0.10 |
> | High | 0 | 0.30 | 0.70 |
>
> - Make High absorbing, so Low and Medium are transient and
>
> $$\mathbf{I} - \mathbf{P}_T = \begin{bmatrix} 0.15 & -0.15 \\ -0.20 & 0.30 \end{bmatrix}$$
>
> - Its determinant is $(0.15)(0.30) - (-0.15)(-0.20) = 0.015$.
> - Row Low of $\mathbf{S}$ is $\frac{1}{0.015}(0.30, 0.15) = (20, 10)$.
> - The policyholder spends $20 + 10 = 30$ years, counting this one, in Low or Medium before first being High.

## Probability of ever entering a transient state

For transient states $i$ and $j$, the probability that a chain starting in state $i$ ever enters state $j$ is

> $$f_{ij} = \frac{s_{ij} - \delta_{ij}}{s_{jj}}$$

A chain that enters $j$ spends $s_{jj}$ periods there on average, so $s_{ij} = \delta_{ij} + f_{ij}\, s_{jj}$.

> [!example]- What is the probability that the claim that is Open now is ever litigated? {Example}
> - With $i = O$ and $j = L$, $\delta_{OL} = 0$, $s_{OL} = 1$ and $s_{LL} = 4$.
> - The probability is $f_{OL} = \frac{1}{4} = 0.25$.
> - This agrees with the first step: the claim leaves O for L or C in the ratio $0.1 : 0.3$, so it reaches L first with probability $0.25$.

> [!trap] Leaving out the starting period
> The diagonal entry $s_{ii}$ counts the period the chain starts in. For the claim that is Open now, $s_{OO} = 3$ includes this month, so the claim spends 2 further months Open on average.
