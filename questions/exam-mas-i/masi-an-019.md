---
id: "masi-an-019"
exam: "Exam MAS-I"
topic: "Time-Reversible Markov Chain"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Time-Reversible+Markov+Chain
  - Concepts/Stationary+Distribution
  - Concepts/Transition+Probability+Matrix
  - Concepts/Markov+Chain
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3f3c8f88d293e56be653b4f442f08015f712b5aa33ed705a9dbfcc40498c6a57
  sources:
    - "Ross, Introduction to Probability Models, Ch.4 Markov Chains (course-hosted copy, an edition earlier than the 11th-13th the outline lists), 4.8 Time Reversible Markov Chains: Eq.(4.21) pi_i P_ij = pi_j P_ji; Example 4.31 nearest-neighbour chain reversible (transitions i->i+1 and i+1->i alternate); Eq.(4.25) and Theorem 4.2 cycle criterion, printed pp.236-239, 242 (PDF pp.52-55, 58), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-019.md
---

Each of the following is the transition matrix of an ergodic Markov chain on states 1, 2 and 3. Determine which of the chains are time reversible.

- I. $\begin{bmatrix} 0.2 & 0.5 & 0.3 \\ 0.5 & 0.1 & 0.4 \\ 0.3 & 0.4 & 0.3 \end{bmatrix}$
- II. $\begin{bmatrix} 0.5 & 0.5 & 0 \\ 0 & 0.5 & 0.5 \\ 0.5 & 0 & 0.5 \end{bmatrix}$
- III. $\begin{bmatrix} 0 & 1/2 & 1/2 \\ 1/3 & 0 & 2/3 \\ 1/4 & 1/2 & 1/4 \end{bmatrix}$

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

A chain is time reversible when its stationary distribution satisfies $\pi_i P_{ij} = \pi_j P_{ji}$ for every pair. Equivalently, every cycle of states has the same probability forward and backward (Kolmogorov's criterion).

**I is reversible.** The matrix is symmetric, so its columns sum to 1 and $\pi = (\tfrac13, \tfrac13, \tfrac13)$. Then $\pi_i P_{ij} = \tfrac13 P_{ij} = \tfrac13 P_{ji} = \pi_j P_{ji}$.

**II is not reversible.** $P_{12} = 0.5$ but $P_{21} = 0$, so $\pi_1 P_{12} > 0 = \pi_2 P_{21}$. The chain cycles 1 → 2 → 3 → 1 and never runs the other way, so a film of it played backward would look different.

**III is reversible, although its matrix is not symmetric.** Kolmogorov's criterion on the one cycle:

$$
\begin{align*}
P_{12}P_{23}P_{31} &= \tfrac12 \cdot \tfrac23 \cdot \tfrac14 \\
&= \tfrac1{12} \\
P_{13}P_{32}P_{21} &= \tfrac12 \cdot \tfrac12 \cdot \tfrac13 \\
&= \tfrac1{12}
\end{align*}
$$

Detailed balance confirms it with $\pi = (\tfrac29, \tfrac39, \tfrac49)$: for example $\tfrac29 \cdot \tfrac12 = \tfrac19 = \tfrac39 \cdot \tfrac13$, and $\tfrac39 \cdot \tfrac23 = \tfrac29 = \tfrac49 \cdot \tfrac12$. It is a random walk on a graph with symmetric arc weights.

I and III are reversible, so the answer is **C**.

**Why not the others**

- **A** rejects III because its matrix is not symmetric; reversibility needs balanced flows $\pi_i P_{ij}$, not $P_{ij} = P_{ji}$.
- **B** and **D** accept II, perhaps because its stationary distribution is uniform; a uniform $\pi$ makes reversibility equivalent to a symmetric matrix, which II does not have.
- **E** would require I or III to fail; both satisfy detailed balance.
