---
id: "masi-an-020"
exam: "Exam MAS-I"
topic: "Bonus-Malus System"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Bonus-Malus+System
  - Concepts/Markov+Chain
  - Concepts/Stationary+Distribution
  - Concepts/Transition+Probability+Matrix
  - Concepts/Poisson+Distribution
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a1a327794f04ec587e71d5730d128b352ed783a8c5d2bcb2ef5a1894982fc14f
  sources:
    - "Ross, Introduction to Probability Models, Ch.4 Markov Chains (course-hosted copy, an edition earlier than the 11th-13th the outline lists), Example 4.7 Bonus Malus system: s_i(k) and P_ij = sum over k with s_i(k)=j of e^-lambda lambda^k/k!, printed pp.188-189 (PDF pp.4-5); Proposition 4.3 and Example 4.23 average annual premium = sum pi_j x premium_j, printed pp.215-217 (PDF pp.31-33), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-020.md
---

A bonus-malus system has three levels with annual premiums:

| Level | 1 | 2 | 3 |
|---|---|---|---|
| Premium | \$300 | \$400 | \$600 |

After a claim-free year a policyholder moves down one level (staying at level 1 if already there). After a year with exactly one claim the policyholder moves up one level (staying at level 3 if already there). After a year with two or more claims the policyholder moves to level 3. Each policyholder's annual claim count is Poisson with mean 0.3.

Calculate the long-run average annual premium.

- A) 348.70
- B) 356.94
- C) 360.76
- D) 396.96
- E) 433.33

## Explanation

Let $a_0 = e^{-0.3} = 0.74082$, $a_1 = 0.3\,e^{-0.3} = 0.22225$ and $a_{2+} = 1 - a_0 - a_1 = 0.03694$. The transition matrix is

$$
P = \begin{array}{c|ccc} & 1 & 2 & 3 \\ \hline 1 & a_0 & a_1 & a_{2+} \\ 2 & a_0 & 0 & 1 - a_0 \\ 3 & 0 & a_0 & 1 - a_0 \end{array}
$$

Level 1 is entered only by claim-free years from levels 1 and 2, and level 2 from level 1 after one claim or from level 3 after a claim-free year:

$$
\begin{align*}
\pi_1 &= a_0(\pi_1 + \pi_2) \\
\pi_2 &= a_1\pi_1 + a_0\pi_3
\end{align*}
$$

Solving with $\pi_1 + \pi_2 + \pi_3 = 1$:

$$
\pi = (0.65698,\ 0.22985,\ 0.11317)
$$

$$
\begin{align*}
\text{Average premium} &= 300(0.65698) + 400(0.22985) + 600(0.11317) \\
&= 197.09 + 91.94 + 67.90 \\
&= \mathbf{356.94}
\end{align*}
$$

The answer is **B**.

**Why not the others**

- **A** (348.70) ignores the two-or-more rule and moves every claim year up a single level.
- **C** (360.76) uses 0.3 as the probability of a claim in a year; with Poisson counts that probability is $\Pr(N \ge 1) = 1 - e^{-0.3} = 0.2592$.
- **D** (396.96) sends every claim year straight to level 3, misreading the one-claim rule.
- **E** (433.33) is the unweighted average of the three premiums, as if policyholders were spread evenly across levels.
