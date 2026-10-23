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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:6696d3d1720899cd5278018c7116b51cd532bdc059bc933f72904c725f4ee166
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.10, p.47 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.10, p.31 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
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
