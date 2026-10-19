---
id: "faml-2-12"
exam: "Exam FAM"
topic: "Future Lifetime Random Variable"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Survival+Model
  - Concepts/Variance
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a1a14e667aa5ae22ff743ccb004f5e44719db227540beb0440c7d14543194c9f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-12.md
---

For a new light bulb, you are given:

i) $_{t}q_{0} = \dfrac{t^{2} + t}{72}$ for $0 \le t \le 8$

ii) $T_{0}$ is the random variable representing the future lifetime

Calculate $Var[T_{0}]$.

[Question on October 2022 FAM-L Exam]

- A) 3.9
- B) 4.1
- C) 4.3
- D) 4.5
- E) 4.7

## Explanation

$$\begin{align*}
E[T_{0}] &= \int_{0}^{8} {}_{t}p_{0}\,dt \\
&= \int_{0}^{8}\left(1 - \frac{t^{2} + t}{72}\right)dt \\
&\to \frac{1}{72}\left[72t - \frac{t^{3}}{3} - \frac{t^{2}}{2}\right]_{0}^{8} \\
&= 5.1852
\end{align*}$$

$$\begin{align*}
E[T_{0}^{2}] &= 2\int_{0}^{8}\left({}_{t}p_{0} \times t\right)dt \\
&= \frac{2}{72}\int_{0}^{8}\left(72t - t^{3} - t^{2}\right)dt \\
&= \frac{2}{72}\left[36t^{2} - \frac{t^{4}}{4} - \frac{t^{3}}{3}\right]_{0}^{8} \\
&= 30.815
\end{align*}$$

$$\begin{align*}
Var[T_{0}] &= E[T_{0}^{2}] - \left(E[T_{0}]\right)^{2} \\
&= 3.9287
\end{align*}$$

The answer is **A**.
