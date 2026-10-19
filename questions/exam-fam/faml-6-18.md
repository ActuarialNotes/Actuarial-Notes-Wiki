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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d0df0e19e96803a9b255af2f546b00cf0bb04aec9796cb22e627e3c196680aa2
  sources: []
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
