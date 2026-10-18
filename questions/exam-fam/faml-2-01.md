---
id: "faml-2-01"
exam: "Exam FAM"
topic: "Future Lifetime Random Variable"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Survival+Model
  - Concepts/Hazard+Rate
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0caf7a2a71e3af208cbeba2b372cd26f4d3586ffad929a31000e1f12235481f5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-01.md
---

You are given:

(i) $S_{0}(t) = \left(1 - \dfrac{t}{\omega}\right)^{\frac{1}{4}}$, for $0 \le t \le \omega$

(ii) $\mu_{65} = \dfrac{1}{180}$

Calculate $e_{106}$, the curtate expectation of life at age 106.

[Question 3 on the Fall 2012 exam]

- A) 2.2
- B) 2.5
- C) 2.7
- D) 3.0
- E) 3.2

## Explanation

Since $S_{0}(t) = 1 - F_{0}(t) = \left(1 - \dfrac{t}{\omega}\right)^{\frac{1}{4}}$, we have $\ln[S_{0}(t)] = \dfrac{1}{4}\ln\left[\dfrac{\omega - t}{\omega}\right]$.

Then $\mu_{t} = -\dfrac{d}{dt}\log S_{0}(t) = \dfrac{1}{4}\,\dfrac{1}{\omega - t}$, and $\mu_{65} = \dfrac{1}{180} = \dfrac{1}{4}\,\dfrac{1}{\omega - 65} \Rightarrow \omega = 110$.

$$e_{106} = \sum_{t=1}^{3} {}_{t}p_{106}, \quad \text{since } {}_{4}p_{106} = 0$$

$$\begin{align*}
{}_{t}p_{106} &= \frac{S_{0}(106+t)}{S_{0}(106)} \\
&= \frac{\left(1 - \frac{106+t}{110}\right)^{1/4}}{\left(1 - \frac{106}{110}\right)^{1/4}} \\
&= \left(\frac{4-t}{4}\right)^{1/4}
\end{align*}$$

$$\begin{align*}
e_{106} &= \sum_{i=1}^{i=4} {}_{t}p_{106} \\
&= \frac{1}{4^{0.25}}\left(1^{0.25} + 2^{0.25} + 3^{0.25}\right) \\
&= 2.4786
\end{align*}$$

The answer is **B**.
