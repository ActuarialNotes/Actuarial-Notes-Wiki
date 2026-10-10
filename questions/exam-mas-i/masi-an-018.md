---
id: "masi-an-018"
exam: "Exam MAS-I"
topic: "Time-Reversible Markov Chain"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Time-Reversible+Markov+Chain
  - Concepts/Stationary+Distribution
  - Concepts/Bonus-Malus+System
  - Concepts/Markov+Chain
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7a6e3b5db0349f34e3896861de8c23475522ee63cdfec5c5c1171aa8267f66dc
  sources:
    - "Ross, Introduction to Probability Models, Ch.4 Markov Chains (course-hosted copy, an edition earlier than the 11th-13th the outline lists), 4.8 Time Reversible Markov Chains: Eq.(4.21) pi_i P_ij = pi_j P_ji; Example 4.31 nearest-neighbour chain reversible (transitions i->i+1 and i+1->i alternate); Eq.(4.25) and Theorem 4.2 cycle criterion, printed pp.236-239, 242 (PDF pp.52-55, 58), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-018.md
---

A bonus-malus system has levels 1 to 5. Each year a policyholder moves up one level after a year with a claim, or down one level after a claim-free year, staying put at the ends. The level forms an ergodic Markov chain with stationary distribution $\pi$.

Which equation holds for every pair of adjacent levels $i$ and $i + 1$, and why?

- A) $\pi_i P_{i,i+1} = \pi_{i+1} P_{i+1,i}$, since up-crossings and down-crossings of that boundary alternate
- B) $P_{i,i+1} = P_{i+1,i}$, since a time-reversible chain must have a symmetric transition matrix
- C) $\pi_i = \pi_{i+1}$, since in the long run the chain spends equal time at every level
- D) $\pi_i P_{i+1,i} = \pi_{i+1} P_{i,i+1}$, since each flow is weighted by the probability of its destination
- E) $\pi_i P_{i,i+1} = \pi_{i+1} P_{i,i+1}$, since moving up and moving down are equally likely

## Explanation

The chain moves at most one level per year, so to cross the boundary between $i$ and $i + 1$ upward again it must first cross it downward. Over a long period the numbers of up-crossings and down-crossings differ by at most one, so their long-run rates are equal:

$$
\pi_i P_{i,i+1} = \pi_{i+1} P_{i+1,i}
$$

These are the detailed-balance equations, so the chain is time reversible, and solving them pair by pair gives $\pi$ without the full system $\pi P = \pi$. The answer is **A**.

**Why not the others**

- **B** — reversibility balances *flows*, not probabilities. Here the up-probability is the probability of a claim and the down-probability that of a claim-free year, which are generally unequal.
- **C** — a uniform stationary distribution holds only for special chains, such as a doubly stochastic one; a claim-free year is usually far more likely than a claim, so most policyholders sit at the low levels.
- **D** — attaches each transition probability to the wrong level: the rate of moving from $i$ to $i + 1$ is the proportion at $i$ times the probability of moving up from $i$.
- **E** — uses the upward probability on both sides, which would force $\pi_i = \pi_{i+1}$.
