---
id: "faml-6-32"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Annuity
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e35d8258c4e1af71c9cf3fd1cff218f1c2b1aabb292f01563dd3f9b9613f81a9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-32.md
---

For a whole life insurance of 100,000 on $(x)$, you are given:

(i) Death benefits are payable at the moment of death

(ii) Deaths are uniformly distributed over each year of age

(iii) Premiums are payable monthly

(iv) $i = 0.05$

(v) $\ddot{a}_{x} = 9.19$

Calculate the monthly net premium.

[Question 11 on the Fall 2015 exam]

- A) 530
- B) 540
- C) 550
- D) 560
- E) 570

## Explanation

Assuming UDD

Let $P$ = monthly net premium

$$\begin{align*}
\text{EPV(premiums)} &= 12P\ddot{a}^{(12)}_{x} \\
&\cong 12P\left[\alpha(12)\,\ddot{a}_{x} - \beta(12)\right] \\
&= 12P\left[1.00020(9.19) - 0.46651\right] \\
&= 104.7039P
\end{align*}$$

$$\begin{align*}
\text{EPV(benefits)} &= 100{,}000\,\bar{A}_{x} \\
&= 100{,}000\,\frac{i}{\delta}A_{x} \\
&= 100{,}000\,\frac{i}{\delta}\left(1 - d\ddot{a}_{x}\right) \\
&= 100{,}000\,\frac{0.05}{\ln(1.05)}\left(1 - \frac{0.05}{1.05}(9.19)\right) \\
&= 57{,}632.62
\end{align*}$$

$$\begin{align*}
P &= \frac{57{,}632.62}{104.7039} \\
&= 550.43
\end{align*}$$

The answer is **C**.
