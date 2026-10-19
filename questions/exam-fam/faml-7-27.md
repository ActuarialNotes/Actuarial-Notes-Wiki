---
id: "faml-7-27"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Expenses
  - Concepts/Equivalence+Principle
  - Concepts/Endowment+Insurance
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8dfc38ca88550b9cfb56f7d016b41e491d630436a76748d582be57050d43090e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-27.md
---

The gross annual premium, *G*, for a fully discrete 5-year endowment insurance of 1000 issued on (*x*) is calculated using the equivalence principle. You are given:

(i) $1000P_{x:\overline{5}|} = 187.00$

(ii) The expense policy value at the end of the first year, $_{1}V^{e} = -38.70$

(iii) $q_{x} = 0.008$

(iv) Expenses, payable at the beginning of the year, are:

| Year | Percent of Premium | Per Policy |
|---|---|---|
| First | 25% | 10 |
| Renewal | 5% | 5 |

(v) $i = 0.03$

Calculate *G*.

[Question 17 on the Fall 2016 exam]

- A) 200
- B) 213
- C) 226
- D) 239
- E) 252

## Explanation

Since $G$ is determined using the equivalence principle, ${}_{0}V = 0$.

Then, with $P^{e} = G - 187$,

$$\begin{align*}
{}_{1}V^{e} &= \frac{\left(0 + \overbrace{G - 187}^{P^{e}} - 0.25G - 10\right)(1.03)}{0.992} \\
&= -38.7
\end{align*}$$

$$\begin{align*}
\Rightarrow 0.75G &= \frac{-38.7(0.992)}{1.03} + 187 + 10 \\
&= 159.72
\end{align*}$$

$$\Rightarrow G = 212.97$$

The answer is **B**.
