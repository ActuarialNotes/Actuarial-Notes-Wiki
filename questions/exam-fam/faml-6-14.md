---
id: "faml-6-14"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Deferred+Annuity
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:8f73fe78b71debbb6858abb09eaf1342c69f84599b825e44dabad2813cbceadb
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.14, p.60, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.14, p.41, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-14.md
---

For a special fully discrete whole life insurance of 100,000 on (40), you are given:

(i) The annual net premium is $P$ for years 1 through 10, $0.5P$ for years 11 through 20, and 0 thereafter

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

Calculate $P$.

[A modified version of Question 8 on the Spring 2014 exam]

- A) 850
- B) 950
- C) 1050
- D) 1150
- E) 1250

## Explanation

$$100{,}000A_{40} = P[\ddot{a}_{40:\overline{10}|} + 0.5\,{}_{10|}\ddot{a}_{40:\overline{10}|}]$$

$$\begin{align*}
P &= \frac{100{,}000A_{40}}{\ddot{a}_{40:\overline{10}|} + 0.5\,{}_{10|}\ddot{a}_{40:\overline{10}|}} \\
&= \frac{100{,}000(0.12106)}{8.0863 + 0.5(4.9071)} \\
&= \frac{12{,}106}{10.53985} \\
&= 1148.59
\end{align*}$$

where

$$\begin{align*}
{}_{10|}\ddot{a}_{40:\overline{10}|} &= {}_{10}E_{40}\left[\ddot{a}_{50:\overline{10}|}\right] \\
&= 0.60920\left[8.0550\right] \\
&= 4.9071
\end{align*}$$

There are several other ways to write the right-hand side of the first equation.

The answer is **D**.
