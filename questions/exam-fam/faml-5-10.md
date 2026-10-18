---
id: "faml-5-10"
exam: "Exam FAM"
topic: "Life Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Annuity
  - Concepts/Annuity+Due
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6696d3d1720899cd5278018c7116b51cd532bdc059bc933f72904c725f4ee166
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-10.md
---

For a 10-year certain and life annuity-due on (65) with annual payments you are given:

i) Mortality follows the Standard Ultimate Life Table

ii) $i = 0.05$

Calculate the probability that the sum of the payments on a non-discounted basis made under the annuity will exceed the expected present value of the annuity at issue.

[Question on October 2022 FAM-L Exam]

- A) 0.826
- B) 0.836
- C) 0.846
- D) 0.856
- E) 0.866

## Explanation

$$\begin{align*}
\ddot{a}_{\overline{65:\overline{10}|}} &= \ddot{a}_{\overline{10}|} + {}_{10}E_{65} \times \ddot{a}_{75} \\
&= 8.10782 + 0.55305 \times 10.3178 \\
&= 13.8141
\end{align*}$$

Assuming payments of 1 (any other payment amount would just cancel, giving the same number of years), 14 payments are needed for the sum of payments to exceed 13.8141. That requires surviving to the start of year 14, thus surviving 13 years.

$$\begin{align*}
{}_{13}p_{65} &= \frac{l_{78}}{l_{65}} \\
&= \frac{80{,}006.2}{94{,}579.7} \\
&= 0.846
\end{align*}$$

The answer is **C**.
