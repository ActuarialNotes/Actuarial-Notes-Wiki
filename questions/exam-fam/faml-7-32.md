---
id: "faml-7-32"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Variance
  - Concepts/Whole+Life+Insurance
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a3ce9687489255803c38967577fa67a7d5ced7329101fb85bf02d4cf4e9282d8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-32.md
---

For two fully continuous whole life insurance policies on (*x*), you are given:

(i)

|  | Death Benefit | Annual Premium Rate | Variance of the Present Value of Future Loss at *t* |
|---|---|---|---|
| Policy A | 1 | 0.10 | 0.455 |
| Policy B | 2 | 0.16 | - |

(ii) $\delta = 0.06$

Calculate the variance of the present value of future loss at *t* for Policy B.

[Question 12 on the Spring 2014 exam]

- A) 0.9
- B) 1.4
- C) 2.0
- D) 2.9
- E) 3.4

## Explanation

$$\begin{align*}
L_{A} &= v^{T} - 0.10\bar{a}_{\overline{T}|} \\
&= \left(1 + \frac{10}{6}\right)v^{T} - \frac{10}{6}
\end{align*}$$

$$\begin{align*}
Var(L_{A}) &= \left(1 + \frac{10}{6}\right)^{2} Var(v^{T}) \\
           &= 0.455 \\
\Rightarrow Var(v^{T}) &= 0.06398
\end{align*}$$

$$\begin{align*}
L_{B} &= 2v^{T} - 0.16\bar{a}_{\overline{T}|} \\
&= \left(2 + \frac{16}{6}\right)v^{T} - \frac{16}{6}
\end{align*}$$

$$\begin{align*}
Var(L_{B}) &= \left(2 + \frac{16}{6}\right)^{2} Var(v^{T}) \\
&= \left(2 + \frac{16}{6}\right)^{2}(0.06398) \\
&= 1.39
\end{align*}$$

The answer is **B**.
