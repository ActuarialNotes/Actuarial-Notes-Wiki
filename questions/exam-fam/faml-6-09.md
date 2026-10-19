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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:26128b342d7fe2a56d7edb99de4f15983136350edaec93cb99d2834faa90c5ce
  sources: []
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
