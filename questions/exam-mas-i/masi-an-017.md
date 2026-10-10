---
id: "masi-an-017"
exam: "Exam MAS-I"
topic: "Mean Time Spent in Transient States"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Mean+Time+Spent+in+Transient+States
  - Concepts/Markov+Chain
  - Concepts/Transition+Probability+Matrix
  - Concepts/Stationary+Distribution
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:86d5cec64d26493cc2dc2be10a7c2104761a5ceac861ba798ac9be606a39b0fd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-017.md
---

A reinsurer's financial strength rating each year is Strong (state 1), Adequate (state 2) or Weak (state 3), with annual transition matrix

$$
P = \begin{array}{c|ccc} & 1 & 2 & 3 \\ \hline 1 & 0.6 & 0.3 & 0.1 \\ 2 & 0.3 & 0.5 & 0.2 \\ 3 & 0.2 & 0.3 & 0.5 \end{array}
$$

In the long run the reinsurer is rated Weak 22.9% of the time. It is rated Strong now.

Calculate the expected number of years until it is first rated Weak.

- A) Less than 4.4
- B) At least 4.4, but less than 5.0
- C) At least 5.0, but less than 6.8
- D) At least 6.8, but less than 8.5
- E) At least 8.5

## Explanation

The chain is irreducible, so no state is transient as it stands. To find the time until state 3 is first entered, make state 3 absorbing; states 1 and 2 are then transient, and the time to first reach Weak is the time spent in them:

$$
I - P_T = \begin{bmatrix} 0.4 & -0.3 \\ -0.3 & 0.5 \end{bmatrix}, \qquad \det = 0.20 - 0.09 = 0.11
$$

$$
\begin{align*}
S = (I - P_T)^{-1} &= \frac{1}{0.11}\begin{bmatrix} 0.5 & 0.3 \\ 0.3 & 0.4 \end{bmatrix} \\
&= \begin{bmatrix} 4.545 & 2.727 \\ 2.727 & 3.636 \end{bmatrix}
\end{align*}
$$

Starting Strong, the reinsurer spends $s_{11} = 4.545$ years Strong and $s_{12} = 2.727$ years Adequate before its first Weak year:

$$
s_{11} + s_{12} = 7.27 \text{ years}
$$

This lies in **D**. The long-run proportion in the stem is a distraction: it describes the chain in its original, unmodified form.

**Why not the others**

- **A**: $\tfrac{1}{0.229} = 4.36$ is the mean time between visits to Weak, measured from Weak, not the time to reach it from Strong.
- **B**: $s_{11} = 4.55$ counts only the years spent Strong.
- **C**: 6.27 leaves the current year out of the count, and 6.36 is the row sum for a reinsurer starting Adequate.
- **E**: $\tfrac{1}{0.1} = 10$ uses only the direct Strong-to-Weak probability, ignoring the faster route through Adequate.
