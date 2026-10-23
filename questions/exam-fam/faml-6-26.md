---
id: "faml-6-26"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Annuity
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:da589a93506eda9507be7d8e1f0c43dd943f489b1b9c901d31d7fe8827f11247
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.26, p.70, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.26, p.47, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-26.md
---

For a special fully discrete whole life insurance policy of 1000 on (90), you are given:

(i) The first year premium is 0

(ii) $P$ is the renewal premium

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

(v) Premiums are calculated using the equivalence principle

Calculate $P$.

[A modified version of Question 10 on the Spring 2015 exam]

- A) 150
- B) 160
- C) 170
- D) 180
- E) 190

## Explanation

$$\begin{align*}
\text{EPV (Premiums)} &= Pa_{90} \\
&= P(\ddot{a}_{90} - 1) \\
&= (4.1835)P
\end{align*}$$

$$\begin{align*}
\text{EPV(Benefits)} &= 1000A_{90} \\
&= 1000(0.75317) \\
&= 753.17
\end{align*}$$

Therefore,

$$\begin{align*}
P &= \frac{753.17}{4.1835} \\
&= 180.03
\end{align*}$$

The answer is **D**.
