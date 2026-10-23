---
id: "faml-6-37"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Annuity
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:7800975a8a6e00421cd5de500a695e00b7fd30d469fd90aeb616578ad46ac814
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.37, p.78, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.37, p.52, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-37.md
---

For a fully discrete whole life insurance policy of 50,000 on (35), with premiums payable for a maximum of 10 years, you are given:

(i) Expenses of 100 are payable at the end of each year including the year of death

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

Calculate the annual gross premium using the equivalence principle.

[A modified version of Question 9 on the Spring 2016 exam]

- A) 790
- B) 800
- C) 810
- D) 820
- E) 830

## Explanation

By the equivalence principle, we have

$$G\ddot{a}_{35:\overline{10}|} = 50{,}000A_{35} + 100a_{35} + 100A_{35}$$

so

$$\begin{align*}
G &= \frac{50{,}100A_{35} + 100\left(\ddot{a}_{35} - 1\right)}{\ddot{a}_{35:\overline{10}|}} \\
&= \frac{50{,}100(0.09653) + 100(17.9728)}{8.0926} \\
&= 819.69
\end{align*}$$

The answer is **D**.
