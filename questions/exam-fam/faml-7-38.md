---
id: "faml-7-38"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Expenses
  - Concepts/Annuity+Due
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:d3606c77a9c229a8d99a6a0be9022d88056c3bfac15d6a9167f02e0b7e7f0f92
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.38, p.124, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.38, p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-38.md
---

For a fully discrete 30 payment whole life insurance of 1000 on (50) with level annual premiums of 16, $_{k}V$ denotes the gross premium policy value at the end of year *k*, *k* = 0,1,2,... .

The original valuation assumptions include:

i) Mortality follows the Standard Ultimate Life Table

ii) $i = 0.05$

iii) Premium taxes are 2%

iv) There are commissions and various other expenses

Using the original valuation assumptions, $_{10}V = 110$.

At some point prior to year 10, your jurisdiction increased the premium tax rate so the premium tax assumption increased to 3%. All other assumptions are unchanged.

Calculate the revised value of $_{10}V$.

[Question on October 2022 FAM-L Exam]

- A) 112
- B) 114
- C) 116
- D) 118
- E) 120

## Explanation

There is no change in the EPV of future benefits or of future gross premiums. Each year that a premium is due, the expense changes by (3% - 2%) of 16, or 0.16. Since at the end of year 10, the insured is 60 with 20 remaining premiums, the EPV of future expense rises by

$$\begin{align*}
0.16\ddot{a}_{60:\overline{20}|} &= 0.16(12.3816) \\
&= 1.981
\end{align*}$$

The new reserve is $110 + 1.981 = 112$.

The answer is **A**.
