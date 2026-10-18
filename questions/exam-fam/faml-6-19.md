---
id: "faml-6-19"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Whole+Life+Insurance
  - Concepts/Expenses
  - Concepts/Equivalence+Principle
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:10436cdb841bb88783e731ac8f074454749a78ac1c22f7f5650985306e73b546
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-19.md
---

For a fully discrete whole life insurance of 1 on (50), you are given:

(i) Expenses of 0.20 at the start of the first year and 0.01 at the start of each renewal year are incurred

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

(iv) Gross premiums are determined using the equivalence principle.

Calculate the variance of $L_{0}$, the gross loss-at-issue random variable.

[A modified version of Question 7 on the Fall 2014 exam]

- A) 0.023
- B) 0.028
- C) 0.033
- D) 0.038
- E) 0.043

## Explanation

Let $\pi$ be the annual premium, so that $\pi \ddot{a}_{50} = A_{50} + 0.01\ddot{a}_{50} + 0.19$

$$\begin{align*}
\Rightarrow \pi &= \frac{A_{50} + 0.19}{\ddot{a}_{50}} + 0.01 \\
&= \frac{0.18931 + 0.19}{17.0245} + 0.01 \\
&= 0.03228
\end{align*}$$

Loss at issue: $L_{0} = v^{k+1} - (\pi - 0.01)\,\ddot{a}_{\overline{k+1}|}\left(1 - v^{k+1}\right)/d + 0.19$

$$\begin{align*}
\Rightarrow Var\left[L_{0}\right] &= \left(1 + \frac{(\pi - 0.01)}{d}\right)^{2}\left({}^{2}A_{50} - A_{50}^{2}\right) \\
&= (2.15467)(0.05108 - 0.18931^{2}) \\
&= (2.15467)(0.015242) \\
&= 0.033
\end{align*}$$

The answer is **C**.
