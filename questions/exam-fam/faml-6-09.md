---
id: "faml-6-09"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Term+Life+Insurance
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:26128b342d7fe2a56d7edb99de4f15983136350edaec93cb99d2834faa90c5ce
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.9, p.56, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.9, p.38, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-09.md
---

For a fully discrete 20-year term insurance of 100,000 on (50), you are given:

(i) Gross premiums are payable for 10 years

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

(iv) Expenses are incurred at the beginning of each year as follows:

| | Year 1 | Years 2-10 | Years 11-20 |
|---|---|---|---|
| Commission as % of premium | 40% | 10% | Not applicable |
| Premium taxes as % of premium | 2% | 2% | Not applicable |
| Maintenance expenses | 75 | 25 | 25 |

(v) Gross premiums are calculated using the equivalence principle

Calculate the gross premium for this insurance.

[A modified version of Question 9 on the Fall 2013 exam]

- A) 617
- B) 627
- C) 637
- D) 647
- E) 657

## Explanation

$$\ddot{a}_{50:\overline{10}|} = 8.0550$$

$$\begin{align*}
A^{1}_{50:\overline{20}|} &= A_{50:\overline{20}|} - {}_{20}E_{50} \\
&= 0.38844 - 0.34824 \\
&= 0.04020
\end{align*}$$

$$\ddot{a}_{50:\overline{20}|} = 12.8428$$

APV of Premiums = APV Death Benefit + APV Commission and Taxes + APV Maintenance

$$\begin{align*}
G\ddot{a}_{50:\overline{10}|} &= 100{,}000A^{1}_{50:\overline{20}|} + 0.12G\ddot{a}_{50:\overline{10}|} + 0.3G + 25\ddot{a}_{50:\overline{20}|} + 50 \\
8.0550G &= 4020 + 1.2666G + 371.07 \\
6.7883G &= 4391.07 \\
\Rightarrow G &= 646.86
\end{align*}$$

The answer is **D**.
