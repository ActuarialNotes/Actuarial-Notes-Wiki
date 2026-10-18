---
id: "faml-5-01"
exam: "Exam FAM"
topic: "Life Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Annuity
  - Concepts/Continuous+Annuity
  - Concepts/Future+Lifetime+Random+Variable
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8ce0f6f20527ddfe5221b97bc5ee3eb17a8f7e782bf5767a10e51c1115e7dece
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-01.md
---

You are given:

(i) $\delta_{t} = 0.06, \quad t \ge 0$

(ii) $\mu_{x}(t) = 0.01, \quad t \ge 0$

(iii) $Y$ is the present value random variable for a continuous annuity of 1 per year, payable for the lifetime of $(x)$ with 10 years certain

Calculate $\Pr(Y > \text{E}[Y])$.

[Question 21 on the Spring 2013 exam]

- A) 0.705
- B) 0.710
- C) 0.715
- D) 0.720
- E) 0.725

## Explanation

$$\begin{align*}
E(Y) &= \bar{a}_{\overline{10}|} + e^{-\delta(10)}e^{-\mu(10)}\bar{a}_{x+10} \\
&= \frac{\left(1 - e^{-0.6}\right)}{0.06} + e^{-0.7}\,\frac{1}{0.07} \\
&= 14.6139
\end{align*}$$

$$\begin{align*}
Y > E(Y) &\Rightarrow \left(\frac{1 - e^{-0.06T}}{0.06}\right) > 14.6139 \\
&\Rightarrow T > 34.90
\end{align*}$$

$$\begin{align*}
\Pr[Y > E(Y)] &= \Pr(T > 34.90) \\
&= e^{-34.90(0.01)} \\
&= 0.705
\end{align*}$$

The answer is **A**.
