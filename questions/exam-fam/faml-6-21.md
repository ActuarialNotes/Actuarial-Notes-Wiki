---
id: "faml-6-21"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Endowment+Insurance
  - Concepts/Pure+Endowment
  - Concepts/Term+Life+Insurance
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eeece9b449806b6e5e429c85948f272505f1bcf36639eb4881b1e2ac90358cc6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-21.md
---

For a special fully discrete 15-year endowment insurance on (75), you are given:

(i) The death benefit is 1000

(ii) The endowment benefit is the sum of the net premiums paid without interest

(iii) $d = 0.04$

(iv) $A_{75:\overline{15}|} = 0.70$

(v) $A_{75:\overline{15}|}^{\ \ 1} = 0.11$

Calculate the annual net premium.

[Question 9 on the Fall 2014 exam]

- A) 80
- B) 90
- C) 100
- D) 110
- E) 120

## Explanation

$$P \times \ddot{a}_{75:\overline{15}|} = 1000\,A^{1}_{75:\overline{15}|} + 15 \times P \times A_{75:\overline{15}|}^{\ \ 1} \;\rightarrow\; P = \frac{1000\,A^{1}_{75:\overline{15}|}}{\ddot{a}_{75:\overline{15}|} - 15 \times A_{75:\overline{15}|}^{\ \ 1}}$$

$$\begin{align*}
A^{1}_{75:\overline{15}|} &= A_{75:\overline{15}|} - A_{75:\overline{15}|}^{\ \ 1} \\
&= 0.7 - 0.11 \\
&= 0.59
\end{align*}$$

$$\begin{align*}
\ddot{a}_{75:\overline{15}|} &= \frac{1 - A_{75:\overline{15}|}}{d} \\
&= (1 - 0.7)/0.04 \\
&= 7.5
\end{align*}$$

So

$$\begin{align*}
P &= \frac{590}{7.5 - 15(0.11)} \\
&= 100.85
\end{align*}$$

The answer is **C**.
