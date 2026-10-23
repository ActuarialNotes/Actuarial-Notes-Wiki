---
id: "faml-5-08"
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
  content_hash: sha256:59dc6a70b02bf21430189fba8792d58c372936a86201c65cbfe8b6d813ee66be
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.8, p.46 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.8, p.31 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-08.md
---

For an annual whole life annuity-due of 1 with a 5-year certain period on (55), you are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

Calculate the probability that the sum of the undiscounted payments actually made under this annuity will exceed the expected present value, at issue, of the annuity.

[A modified version of Question 6 on the Spring 2017 exam]

- A) 0.88
- B) 0.90
- C) 0.92
- D) 0.94
- E) 0.96

## Explanation

The expected present value is:

$$\begin{align*}
\ddot{a}_{\overline{5}|} + {}_{5}E_{55}\,\ddot{a}_{60} &= 4.54595 + 0.77382 \times 14.9041 \\
&= 16.07904
\end{align*}$$

The probability that the sum of the undiscounted payments will exceed the expected present value is the probability that at least 17 payments will be made. This will occur if (55) survives to age 71. The probability is therefore:

$$\begin{align*}
{}_{16}p_{55} &= \frac{l_{71}}{l_{55}} \\
&= \frac{90{,}134.0}{97{,}846.2} \\
&= 0.92118
\end{align*}$$

The answer is **C**.
