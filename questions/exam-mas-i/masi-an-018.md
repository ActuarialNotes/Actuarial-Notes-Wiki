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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7a6e3b5db0349f34e3896861de8c23475522ee63cdfec5c5c1171aa8267f66dc
  sources: []
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
