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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:05961c1c4026e3a3da336627c981aa249bc908c6170832edbbceaa6de133baff
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.19, p.64, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.19, p.44, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
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

Loss at issue: $L_{0} = v^{k+1} - (\pi - 0.01)\,\ddot{a}_{\overline{k+1}|}\left(1 - v^{k+1}\right)/d + 0.19$ (as printed)

$$\begin{align*}
\Rightarrow Var\left[L_{0}\right] &= \left(1 + \frac{(\pi - 0.01)}{d}\right)^{2}\left({}^{2}A_{50} - A_{50}^{2}\right) \\
&= (2.15467)(0.05108 - 0.18931^{2}) \\
&= (2.15467)(0.015242) \\
&= 0.033
\end{align*}$$

The answer is **C**.
