---
id: "faml-5-06"
exam: "Exam FAM"
topic: "Portfolio Percentile Principle"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Portfolio+Percentile+Principle
  - Concepts/Normal+Approximation
  - Concepts/Annuity+Due
  - Concepts/Life+Annuity
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:25ebf6acd853fdea7678fd9a4cedf75730cff5e5410483ab8f4585980f70a436
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-06.md
---

For a group of 100 lives age $x$ with independent future lifetimes, you are given:

(i) Each life is to be paid 1 at the beginning of each year, if alive

(ii) $A_{x} = 0.45$

(iii) ${}^{2}A_{x} = 0.22$

(iv) $i = 0.05$

(v) $Y$ is the present value random variable of the aggregate payments.

Using the normal approximation to $Y$, calculate the initial size of the fund needed in order to be 95% certain of being able to make the payments for these life annuities.

[Question 6 on the Spring 2014 exam]

- A) 1170
- B) 1180
- C) 1190
- D) 1200
- E) 1210

## Explanation

Let $Y_{i}$ be the present value random variable of the payment to life $i$.

$$\begin{align*}
E[Y_{i}] &= \ddot{a}_{x} \\
&= \frac{1 - A_{x}}{d} \\
&= 11.55
\end{align*}$$

$$\begin{align*}
Var[Y_{i}] &= \frac{{}^{2}A_{x} - \left(A_{x}\right)^{2}}{d^{2}} \\
&= \frac{0.22 - 0.45^{2}}{\left(0.05/1.05\right)^{2}} \\
&= 7.7175
\end{align*}$$

Then $Y = \sum_{i=1}^{100} Y_{i}$ is the present value of the aggregate payments.

$E[Y] = 100E[Y_{i}] = 1155$ and $Var[Y] = 100Var[Y_{i}] = 771.75$

$$\begin{align*}
\Pr[Y \le F] &= \Pr\left[Z \le \frac{F - 1155}{\sqrt{771.75}}\right] \\
             &= 0.95 \\
\Rightarrow \frac{F - 1155}{\sqrt{771.75}} &= 1.645 \\
\Rightarrow F &= 1155 + 1.645\sqrt{771.75} \\
&= 1200.699
\end{align*}$$

The answer is **D**.
