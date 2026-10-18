---
id: "faml-6-14"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Deferred+Annuity
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8f73fe78b71debbb6858abb09eaf1342c69f84599b825e44dabad2813cbceadb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-14.md
---

For a special fully discrete whole life insurance of 100,000 on (40), you are given:

(i) The annual net premium is $P$ for years 1 through 10, $0.5P$ for years 11 through 20, and 0 thereafter

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

Calculate $P$.

[A modified version of Question 8 on the Spring 2014 exam]

- A) 850
- B) 950
- C) 1050
- D) 1150
- E) 1250

## Explanation

$$100{,}000A_{40} = P[\ddot{a}_{40:\overline{10}|} + 0.5\,{}_{10|}\ddot{a}_{40:\overline{10}|}]$$

$$\begin{align*}
P &= \frac{100{,}000A_{40}}{\ddot{a}_{40:\overline{10}|} + 0.5\,{}_{10|}\ddot{a}_{40:\overline{10}|}} \\
&= \frac{100{,}000(0.12106)}{8.0863 + 0.5(4.9071)} \\
&= \frac{12{,}106}{10.53985} \\
&= 1148.59
\end{align*}$$

where

$$\begin{align*}
{}_{10|}\ddot{a}_{40:\overline{10}|} &= {}_{10}E_{40}\left[\ddot{a}_{50:\overline{10}|}\right] \\
&= 0.60920\left[8.0550\right] \\
&= 4.9071
\end{align*}$$

There are several other ways to write the right-hand side of the first equation.

The answer is **D**.
