---
id: "faml-3-13"
exam: "Exam FAM"
topic: "Life Table"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Table
  - Concepts/Fractional+Age+Assumption
  - Concepts/Future+Lifetime+Random+Variable
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:106230caca18816861b250c772191e256d527e4bafc909817aff6a923b6c255a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-13.md
---

A life is subject to the following 3-year select and ultimate table:

| $[x]$ | $\ell_{[x]}$ | $\ell_{[x]+1}$ | $\ell_{[x]+2}$ | $\ell_{x+3}$ | $x+3$ |
|---|---|---|---|---|---|
| 55 | 10,000 | 9,493 | 8,533 | 7,664 | 58 |
| 56 | 8,547 | 8,028 | 6,889 | 5,630 | 59 |
| 57 | 7,011 | 6,443 | 5,395 | 3,904 | 60 |
| 58 | 5,853 | 4,846 | 3,548 | 2,210 | 61 |

You are also given:

(i) $e_{60} = 1$

(ii) Deaths are uniformly distributed over each year of age

Calculate $\mathring{e}_{[58]+2}$.

[Question 1 on the Fall 2017 exam]

- A) 1.5
- B) 1.6
- C) 1.7
- D) 1.8
- E) 1.9

## Explanation

$$\begin{align*}
\mathring{e}_{[58]+2} &= e_{[58]+2} + 0.5
\end{align*}$$

$$\begin{align*}
e_{[58]+2} &= p_{[58]+2}\,(1 + e_{61}) \\
&= p_{[58]+2}\left[1 + \frac{e_{60}}{p_{60}} - 1\right] \\
&= \frac{l_{61}}{l_{[58]+2}} \times \frac{e_{60}}{p_{60}} \\
&= \frac{2210}{3548} \times \frac{1}{(2210/3904)} \\
&= \frac{3904}{3549} \\
&= 1.100338
\end{align*}$$

$$\begin{align*}
\mathring{e}_{[58]+2} &= 1.100338 + 0.5 \\
&= 1.6
\end{align*}$$

The answer is **B**.
