---
id: "faml-6-30"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
  - Concepts/Variance
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:6275ca7e968f4f7bcfd68f2bb6e30fcda065236c29cf08f5defc72164bbbb91b
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.30, p.74, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.30, p.49, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-30.md
---

For a fully discrete whole life insurance of 100 on $(x)$, you are given:

(i) The first year expense is 10% of the gross annual premium

(ii) Expenses in subsequent years are 5% of the gross annual premium

(iii) The gross premium calculated using the equivalence principle is 2.338

(iv) $i = 0.04$

(v) $\ddot{a}_{x} = 16.50$

(vi) ${}^{2}A_{x} = 0.17$

Calculate the variance of the loss at issue random variable.

[Question 8 on the Fall 2015 exam]

- A) 900
- B) 1200
- C) 1500
- D) 1800
- E) 2100

## Explanation

The loss at issue is given by:

$$\begin{align*}
L_{0} &= 100v^{K+1} + 0.05G + 0.05G\,\ddot{a}_{\overline{K+1}|} - G\,\ddot{a}_{\overline{K+1}|} \\
&= 100v^{K+1} + 0.05G - 0.95G\left(\frac{1 - v^{K+1}}{d}\right) \\
&= \left(100 + \frac{0.95G}{d}\right)v^{K+1} + 0.05G - 0.95\frac{G}{d}
\end{align*}$$

Thus, the variance is

$$\begin{align*}
Var\left(L_{0}\right) &= \left[100 + \frac{0.95(2.338)}{0.04/1.04}\right]^{2}\left({}^{2}A_{x} - \left(A_{x}\right)^{2}\right) \\
&= \left[100 + \frac{0.95(2.338)}{0.04/1.04}\right]^{2}\left(0.17 - \left(1 - \frac{0.04}{1.04}(16.50)\right)^{2}\right) \\
&= 908.1414
\end{align*}$$

The answer is **A**.
