---
id: "faml-6-49"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Fractional+Age+Assumption
  - Concepts/Expenses
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:b234d40e4de8a2c92180cee166e065ce5319fccf8783f1ab95c280b2b0e04eb5
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.49, p.88, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.49, p.59, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-49.md
---

For a special whole life insurance of 100,000 on (40), you are given:

(i) The death benefit is payable at the moment of death

(ii) Level gross premiums are payable monthly for a maximum of 20 years

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

(v) Deaths are uniformly distributed over each year of age

(vi) Initial expenses are 200

(vii) Renewal expenses are 4% of each premium including the first

(viii) Gross premiums are calculated using the equivalence principle

Calculate the monthly gross premium.

[A modified version of Question 10 on the Fall 2017 exam]

- A) 66
- B) 76
- C) 86
- D) 96
- E) 106

## Explanation

$$G\ddot{a}^{(12)}_{40:\overline{20}|} = 100{,}000\left(\frac{i}{\delta}\right)A_{40} + 200 + 0.04G\ddot{a}^{(12)}_{40:\overline{20}|}$$

$$\begin{align*}
\ddot{a}^{(12)}_{40:\overline{20}|} &= \alpha(12)\,\ddot{a}_{40:\overline{20}|} - (1 - {}_{20}E_{40})\,\beta(12) \\
&= 1.00020 \cdot 12.9935 - (1 - 0.36663) \cdot 0.46651 \\
&= 12.700625
\end{align*}$$

$$\begin{align*}
G &= \frac{(100{,}000)(1.02480)(0.12106) + 200}{0.96 \times 12.700625} \\
&= 1033.92
\end{align*}$$

$$\Rightarrow G/12 = 86.16$$

The answer is **C**.
