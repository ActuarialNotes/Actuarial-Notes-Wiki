---
id: "masi-an-016"
exam: "Exam MAS-I"
topic: "Mean Time Spent in Transient States"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Mean+Time+Spent+in+Transient+States
  - Concepts/Markov+Chain
  - Concepts/Transition+Probability+Matrix
  - Concepts/Recurrent+and+Transient+States
answer: "3.75"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3f70bea435055c38eb1d52a7f8bd0c88eb4c5e7f51192e51db6cb041382d54b0
  sources:
    - "Ross, Introduction to Probability Models, Ch.4 Markov Chains (course-hosted copy, an edition earlier than the 11th-13th the outline lists), 4.6 Mean Time Spent in Transient States: S=(I-P_T)^-1, s_ij counts the starting period; making the states of A absorbing to get the time to enter A, printed pp.230-232 (PDF pp.46-48), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-016.md
---

Each month, a workers compensation claimant is Totally disabled (state 1), on Modified duty (state 2) or Returned to full work (state 3). State 3 is absorbing. The monthly transition matrix is

$$
P = \begin{array}{c|ccc} & 1 & 2 & 3 \\ \hline 1 & 0.5 & 0.3 & 0.2 \\ 2 & 0.2 & 0.4 & 0.4 \\ 3 & 0 & 0 & 1 \end{array}
$$

The claimant is Totally disabled this month. Calculate the expected number of months, counting this month, that the claimant spends in states 1 and 2 before returning to full work. Give your answer to two decimal places.

## Explanation

Keep only the transient states 1 and 2:

$$
I - P_T = \begin{bmatrix} 0.5 & -0.3 \\ -0.2 & 0.6 \end{bmatrix}
$$

Its determinant is $(0.5)(0.6) - (0.3)(0.2) = 0.24$, so

$$
\begin{align*}
S = (I - P_T)^{-1} &= \frac{1}{0.24}\begin{bmatrix} 0.6 & 0.3 \\ 0.2 & 0.5 \end{bmatrix} \\
&= \begin{bmatrix} 2.5 & 1.25 \\ 0.833 & 2.083 \end{bmatrix}
\end{align*}
$$

Starting in state 1, the claimant spends $s_{11} = 2.5$ months Totally disabled and $s_{12} = 1.25$ months on Modified duty:

$$
s_{11} + s_{12} = 2.5 + 1.25 = \mathbf{3.75}
$$

**Common wrong entries**

- **2.50** is $s_{11}$ alone, leaving out the months on Modified duty.
- **2.92** is the row sum for a claimant starting on Modified duty.
- **5.00** is $\tfrac{1}{0.2}$, as if every month carried state 1's 0.2 chance of returning to work; state 2's chance is 0.4.
- **2.00** is $\tfrac{1}{1 - 0.5}$, the expected length of the first spell in state 1 only.
