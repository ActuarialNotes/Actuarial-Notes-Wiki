---
id: "faml-6-56"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Endowment+Insurance
  - Concepts/Expenses
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:1e8970d27400fe5201c873903b23aeca0da4ea314c9c7bc2f0a51291bc80a883
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.56, p.93, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.56, p.63, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-56.md
---

An insurer issues a fully discrete 20-year endowment insurance policy of 1,000,000 on (35).

You are given:

i) First year expenses are 55% of the premium plus 150

ii) After the first year, expenses are 5% of the premium plus 50

iii) Mortality follows the Standard Ultimate Life Table

iv) $i = 0.05$

v) Premiums are determined using the equivalence principle

Calculate the annual gross premium on this policy.

[Question on October 2022 FAM-L Exam]

- A) 29,000
- B) 30,000
- C) 31,000
- D) 32,000
- E) 33,000

## Explanation

$$A_{35:\overline{20}|} = 0.37981$$

$$\ddot{a}_{35:\overline{20}|} = 13.0240$$

APV of Premium = APV of Benefits + APV of Expenses

$$\begin{align*}
\text{APV of Benefits + APV of \$ Expenses} &= 1{,}000{,}000 \times A_{35:\overline{20}|} + 50 \times \ddot{a}_{35:\overline{20}|} + 100 \\
&= 380{,}561.20
\end{align*}$$

$$\begin{align*}
\text{APV of Premium} - \text{APV of \% Expenses} &= (0.95) \times P \times \ddot{a}_{35:\overline{20}|} - (0.5) \times P \\
&= 11.8728 \times P
\end{align*}$$

$$\begin{align*}
P &= \frac{380{,}561.20}{11.8728} \\
&= 32{,}053.20
\end{align*}$$

The answer is **D**.
