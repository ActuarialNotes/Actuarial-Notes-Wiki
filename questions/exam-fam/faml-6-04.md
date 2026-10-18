---
id: "faml-6-04"
exam: "Exam FAM"
topic: "Portfolio Percentile Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Portfolio+Percentile+Principle
  - Concepts/Normal+Approximation
  - Concepts/Life+Annuity
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bbf92b9fcae402950230ea53de9e7076aa248e1cc90198ba9369abfb43cb8d62
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-04.md
---

For whole life annuities-due of 15 per month on each of 200 lives age 62 with independent future lifetimes, you are given:

(i) $i = 0.06$

(ii) $A_{62}^{(12)} = 0.4075$ and ${}^{2}A_{62}^{(12)} = 0.2105$

(iii) $\pi$ is the single premium to be paid by each of the 200 lives

(iv) $S$ is the present value random variable at time 0 of total payments made to the 200 lives

Using the normal approximation, calculate $\pi$ such that $\Pr(200\pi > S) = 0.90$.

[Question 19 on the Fall 2012 exam]

- A) 1850
- B) 1860
- C) 1870
- D) 1880
- E) 1890

## Explanation

Let $X_{i}$ be the present value of a life annuity of 1/12 per month on life $i$ for $i = 1, 2, \ldots, 200$.

Let $S = \sum_{i=1}^{200} X_{i}$ be the present value of all the annuity payments.

$$\begin{align*}
E[X_{i}] &= \ddot{a}_{62}^{(12)} \\
&= \frac{1 - A_{62}^{(12)}}{d^{(12)}} \\
&= \frac{1 - 0.4075}{0.05813} \\
&= 10.19267
\end{align*}$$

$$\begin{align*}
Var\left(X_{i}\right) &= \frac{{}^{2}A_{62}^{(12)} - \left(A_{62}^{(12)}\right)^{2}}{\left(d^{(12)}\right)^{2}} \\
&= \frac{0.2105 - (0.4075)^{2}}{(0.05813)^{2}} \\
&= 13.15255
\end{align*}$$

$$\begin{align*}
E[S] &= (200)(180)(10.19267) \\
&= 366{,}936.12
\end{align*}$$

$$\begin{align*}
Var(S) &= (200)(180)^{2}(13.15255) \\
&= 85{,}228{,}524
\end{align*}$$

With the normal approximation, for $\Pr(S \le M) = 0.90$

$$\begin{align*}
M &= E[S] + 1.282\sqrt{Var(S)} \\
&= 366{,}936.12 + 1.282\sqrt{85{,}228{,}524} \\
&= 378{,}771.45
\end{align*}$$

So

$$\begin{align*}
\pi &= \frac{378{,}771.45}{200} \\
&= 1893.86
\end{align*}$$

The answer is **E**.
