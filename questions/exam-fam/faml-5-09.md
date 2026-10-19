---
id: "faml-5-09"
exam: "Exam FAM"
topic: "Life Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Annuity
  - Concepts/Annuity+Due
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f2802b99a0e7c471eb1348e8652e50d0ca713284bfc36769466e63498d0649e3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-09.md
---

For a select and ultimate mortality model with a one-year select period, you are given:

(i) $p_{[x]} = (1+k)\,p_{x}$, for some constant $k$

(ii) $\ddot{a}_{x:\overline{n}|} = 21.854$

(iii) $\ddot{a}_{[x]:\overline{n}|} = 22.167$

Calculate $k$.

[Question 5 on the Spring 2016 exam]

- A) 0.005
- B) 0.010
- C) 0.015
- D) 0.020
- E) 0.025

## Explanation

$$\begin{align*}
\ddot{a}_{[x]:\overline{n}|} &= 1 + v\,p_{[x]}\,\ddot{a}_{x+1:\overline{n-1}|} \\
&= 1 + (1+k)\left(v\,p_{x}\,\ddot{a}_{x+1:\overline{n-1}|}\right) \\
&= 1 + (1+k)\left(\ddot{a}_{x:\overline{n}|} - 1\right)
\end{align*}$$

Therefore, we have

$$\begin{align*}
k &= \frac{\ddot{a}_{[x]:\overline{n}|} - 1}{\ddot{a}_{x:\overline{n}|} - 1} - 1 \\
&= \frac{21.167}{20.854} - 1 \\
&= 0.015
\end{align*}$$

The answer is **C**.
