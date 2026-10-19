---
id: "faml-4-04"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Variance
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Payable+Continuously
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2087ce6ec33013772a78bc0c29502ea4d42e98dc71ac5255041892e03d9151e0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-04.md
---

For a special increasing whole life insurance on (40), payable at the moment of death, you are given:

(i) The death benefit at time $t$ is $b_{t} = 1 + 0.2t, \quad t \ge 0$

(ii) The interest discount factor at time $t$ is $v(t) = (1 + 0.2t)^{-2}, \quad t \ge 0$

(iii) $_{t}p_{40}\,\mu_{40+t} = \begin{cases} 0.025, & 0 \le t < 40 \\ 0, & \text{otherwise} \end{cases}$

(iv) $Z$ is the present value random variable for this insurance

Calculate Var($Z$).

[Question 8 on the Spring 2013 exam]

- A) 0.036
- B) 0.038
- C) 0.040
- D) 0.042
- E) 0.044

## Explanation

$$\begin{align*}
Var(Z) &= E(Z^{2}) - E(Z)^{2}
\end{align*}$$

$$\begin{align*}
E(Z) &= E\left[(1 + 0.2T)(1 + 0.2T)^{-2}\right] \\
&= E\left[(1 + 0.2T)^{-1}\right] \\
&= \int_{0}^{40} \frac{1}{(1 + 0.2t)} f_{T}(t)\,dt \\
&= \frac{1}{40}\int_{0}^{40} \frac{1}{1 + 0.2t}\,dt \\
&= \frac{1}{40}\,\frac{1}{0.2}\,\ln(1 + 0.2t)\Big|_{0}^{40} \\
&= \frac{1}{8}\ln(9) \\
&= 0.27465
\end{align*}$$

$$\begin{align*}
E(Z^{2}) &= E\{(1 + 0.2T)^{2}[(1 + 0.2T)^{-2}]^{2}\} \\
&= E[(1 + 0.2T)^{-2}] \\
&= \int_{0}^{40} \frac{1}{(1 + 0.2t)^{2}} f_{T}(t) \\
&= \frac{1}{40}\,\frac{1}{0.2}\left[\frac{-1}{(1 + 0.2t)}\right]_{0}^{40} \\
&= \frac{1}{8}\left(1 - \frac{1}{9}\right) \\
&= \frac{1}{9} \\
&= 0.11111
\end{align*}$$

$$\begin{align*}
Var(Z) &= 0.11111 - (0.27465)^{2} \\
&= 0.03568
\end{align*}$$

The answer is **A**.
