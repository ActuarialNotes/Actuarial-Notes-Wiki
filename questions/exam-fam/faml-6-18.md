---
id: "faml-6-18"
exam: "Exam FAM"
topic: "Deferred Annuity"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Deferred+Annuity
  - Concepts/Equivalence+Principle
  - Concepts/Term+Life+Insurance
  - Concepts/Life+Table
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:d0df0e19e96803a9b255af2f546b00cf0bb04aec9796cb22e627e3c196680aa2
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.18, p.64, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.18, p.43, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-18.md
---

For a 20-year deferred whole life annuity-due with annual payments of 30,000 on (40), you are given:

(i) The single net premium is refunded without interest at the end of the year of death if death occurs during the deferral period

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

Calculate the single net premium for this annuity.

[A modified version of Question 6 on the Fall 2014 exam]

- A) 162,000
- B) 164,000
- C) 165,200
- D) 166,400
- E) 168,800

## Explanation

$$P = 30{,}000\,{}_{20|}\ddot{a}_{40} + P A^{1}_{40:\overline{20}|}$$

$$\begin{align*}
\Rightarrow \quad P &= 30{,}000\,{}_{20|}\ddot{a}_{40} \Big/ \left(1 - A^{1}_{40:\overline{20}|}\right) \\
&= 30{,}000(5.46429) / (1 - 0.0146346) \\
&= 166{,}363
\end{align*}$$

The answer is **D**.
