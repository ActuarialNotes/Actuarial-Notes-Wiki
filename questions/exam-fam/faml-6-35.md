---
id: "faml-6-35"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b9ea7fbced2e9717dd2d09e589641be6a549628884afc3e0922df8e73100887f
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.35, p.77, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.35, p.52, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-35.md
---

For a fully discrete whole life insurance policy of 100,000 on (35), you are given:

(i) First year commissions are 19% of the annual gross premium

(ii) Renewal year commissions are 4% of the annual gross premium

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

Calculate the annual gross premium for this policy using the equivalence principle.

[A modified version of Question 7 on the Spring 2016 exam]

- A) 410
- B) 450
- C) 490
- D) 530
- E) 570

## Explanation

Let $G$ be the annual gross premium. By the equivalence principle, we have

$$G\ddot{a}_{35} = 100{,}000A_{35} + 0.15G + 0.04G\ddot{a}_{35}$$

so that

$$\begin{align*}
G &= \frac{100{,}000A_{35}}{0.96\ddot{a}_{35} - 0.15} \\
&= \frac{100{,}000(0.09653)}{0.96(18.9728) - 0.15} \\
&= 534.38
\end{align*}$$

The answer is **D**.
