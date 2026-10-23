---
id: "faml-7-07"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Woolhouse's+Formula
  - Concepts/Expenses
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:d34c0b38839f9d72190db4d42bedcc4cba8404c3038cc9d4d2e6293794fff925
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.7, p.99, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.7, p.68, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-07.md
---

For a whole life insurance of 10,000 on ($x$), you are given:

(i) Death benefits are payable at the end of the year of death

(ii) A premium of 30 is payable at the start of each month

(iii) Commissions are 5% of each premium

(iv) Expenses of 100 are payable at the start of each year

(v) $i = 0.05$

(vi) $1000A_{x+10} = 400$

(vii) $_{10}V$ is the gross premium policy value at the end of year 10 for this insurance

Calculate $_{10}V$ using the two-term Woolhouse formula for annuities.

[Question 22 on the Spring 2013 exam]

- A) 950
- B) 980
- C) 1010
- D) 1110
- E) 1140

## Explanation

$$\begin{align*}
\ddot{a}_{x+10} &= (1 - A_{x+10})/d \\
&= (1 - 0.4)/(0.05/1.05) \\
&= 12.6
\end{align*}$$

$$\begin{align*}
\ddot{a}^{(12)}_{x+10} &\approx 12.6 - 11/24 \\
&= 12.142
\end{align*}$$

$$\begin{align*}
{}_{10}V &= 10{,}000A_{x+10} + 100\ddot{a}_{x+10} - 12\ddot{a}^{(12)}_{x+10}(30)(1 - 0.05) \\
{}_{10}V &= 10{,}000(0.4) + 100(12.6) - 12(12.142)(28.50) \\
{}_{10}V &= 1107
\end{align*}$$

The answer is **D**.
