---
id: "faml-6-08"
exam: "Exam FAM"
topic: "Expenses"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Expenses
  - Concepts/Equivalence+Principle
  - Concepts/Annuity+Due
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:8f40ed88aa179ea0b7062379fcc1710424ff64fc1ffb36491bdb2b22bb6cdd07
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.8, p.55, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.8, p.38, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-08.md
---

For a fully discrete whole life insurance on (60), you are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

(iii) The expected company expenses, payable at the beginning of the year, are:

- 50 in the first year
- 10 in years 2 through 10
- 5 in years 11 through 20
- 0 after year 20

Calculate the level annual amount that is actuarially equivalent to the expected company expenses.

[Question 2 on the Spring 2013 exam]

- A) 7.5
- B) 9.5
- C) 11.5
- D) 13.5
- E) 15.5

## Explanation

$$\ddot{a}_{60:\overline{10}|} = 7.9555$$

$$\ddot{a}_{60:\overline{20}|} = 12.3816$$

$$\begin{align*}
\text{Annual level amount} &= \frac{40 + 5\ddot{a}_{60:\overline{10}|} + 5\ddot{a}_{60:\overline{20}|}}{\ddot{a}_{60}} \\
&= \frac{141.686}{14.9041} \\
&= 9.51
\end{align*}$$

The answer is **B**.
