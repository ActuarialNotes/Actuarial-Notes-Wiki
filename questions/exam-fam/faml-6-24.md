---
id: "faml-6-24"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Whole+Life+Insurance
  - Concepts/Variance
  - Concepts/Equivalence+Principle
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0c226c6b30859ad7fa73ab7f27dca6649b1e08cd762e0e31298aa6b45c73e54a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-24.md
---

For a fully continuous whole life insurance of 1 on $(x)$, you are given:

(i) $L$ is the present value of the loss at issue random variable if the premium rate is determined by the equivalence principle

(ii) $L^{*}$ is the present value of the loss at issue random variable if the premium rate is 0.06

(iii) $\delta = 0.07$

(iv) $\bar{A}_{x} = 0.30$

(v) $Var(L) = 0.18$

Calculate $Var(L^{*})$.

[Question 8 on the Spring 2015 exam]

- A) 0.18
- B) 0.21
- C) 0.24
- D) 0.27
- E) 0.30

## Explanation

In general, the loss at issue random variable can be expressed as:

$$\begin{align*}
L &= \bar{Z}_{x} - P \times \bar{Y}_{x} \\
&= \bar{Z}_{x} - P \times \left(\frac{1 - \bar{Z}_{x}}{\delta}\right) \\
&= \bar{Z}_{x} \times \left(1 + \frac{P}{\delta}\right) - \frac{P}{\delta}
\end{align*}$$

Using actuarial equivalence to determine the premium rate:

$$\begin{align*}
P &= \frac{\bar{A}_{x}}{\bar{a}_{x}} \\
&= \frac{0.3}{(1 - 0.3)/0.07} \\
&= 0.03
\end{align*}$$

$$\begin{align*}
Var(L) &= \left(1 + \frac{P}{\delta}\right)^{2} \times Var\left(\bar{Z}_{x}\right) \\
&= \left(1 + \frac{0.03}{0.07}\right)^{2} \times Var\left(\bar{Z}_{x}\right) \\
&= 0.18
\end{align*}$$

$$\begin{align*}
Var\left(\bar{Z}_{x}\right) &= \frac{0.18}{\left(1 + \dfrac{0.03}{0.07}\right)^{2}} \\
&= 0.088
\end{align*}$$

$$\begin{align*}
Var(L^{*}) &= \left(1 + \frac{P^{*}}{\delta}\right)^{2} \times Var\left(\bar{Z}_{x}\right) \\
&= \left(1 + \frac{0.06}{0.07}\right)^{2}(0.088) \\
&= 0.304
\end{align*}$$

The answer is **E**.
