---
id: "faml-4-08"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Table
  - Concepts/Interest+Rate
  - Concepts/Interest
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4c10dbe890ba6ab12655b82723e22070fe6a1981688629d644b2c5c942cca98b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-08.md
---

For a whole life insurance of 1000 on (50), you are given:

(i) The death benefit is payable at the end of the year of death

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.04$ in the first year, and $i = 0.05$ in subsequent years

Calculate the actuarial present value of this insurance.

[A modified version of Question 5 on the Spring 2014 exam]

- A) 187
- B) 189
- C) 191
- D) 193
- E) 195

## Explanation

Let $A^{SULT}_{51}$ designate $A_{51}$ using the Standard Ultimate Life Table at 5%.

$$\begin{align*}
\text{APV (insurance)} &= 1000\left(\frac{1}{1.04}\right)\left(q_{50} + p_{50}\,A^{SULT}_{51}\right) \\
&= 1000\left(\frac{1}{1.04}\right)\left[0.001209 + (1 - 0.001209)(0.19780)\right] \\
&= 191.12
\end{align*}$$

The answer is **C**.
