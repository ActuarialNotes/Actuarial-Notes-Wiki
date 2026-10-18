---
id: "faml-2-06"
exam: "Exam FAM"
topic: "Survival Model"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Survival+Model
  - Concepts/Hazard+Rate
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:752a6e25d5222d7d9c8a1349f41bb12a5e4fb5055f4e87d01553c6a8959bee26
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-06.md
---

You are given the survival function:

$$S_{0}(x) = \left(1 - \frac{x}{60}\right)^{\frac{1}{3}}, \quad 0 \le x \le 60.$$

Calculate $1000\mu_{35}$.

[Question 2 on the Spring 2016 exam]

- A) 5.6
- B) 6.7
- C) 13.3
- D) 16.7
- E) 20.1

## Explanation

$$\begin{align*}
\mu_{x} &= -\frac{d}{dx}\ln S_{0}(x) \\
&= -\frac{1}{3}\frac{d}{dx}\ln\left(1 - \frac{x}{60}\right) \\
&= \frac{1}{180}\left(1 - \frac{x}{60}\right)^{-1} \\
&= \frac{1}{3(60 - x)}
\end{align*}$$

Therefore,

$$\begin{align*}
1000\mu_{35} &= (1000)\frac{1}{3(25)} \\
&= \frac{1000}{75} \\
&= 13.3
\end{align*}$$

The answer is **C**.
