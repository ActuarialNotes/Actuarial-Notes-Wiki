---
id: "faml-2-07"
exam: "Exam FAM"
topic: "Survival Model"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Survival+Model
  - Concepts/Future+Lifetime+Random+Variable
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f417ee8b6f88dfacb4bd23e9a03e3e49745cebbe52b0c02bd914051a2197ad02
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-07.md
---

You are given the following survival function of a newborn:

$$S_{0}(x) = \begin{cases} 1 - \dfrac{x}{250}, & 0 \le x < 40 \\[2ex] 1 - \left(\dfrac{x}{100}\right)^{2}, & 40 \le x \le 100 \end{cases}$$

Calculate the probability that (30) dies within the next 20 years.

[Question 2 on the Fall 2016 exam]

- A) 0.13
- B) 0.15
- C) 0.17
- D) 0.19
- E) 0.21

## Explanation

$$\begin{align*}
{}_{20}q_{30} &= \frac{S_{0}(30) - S_{0}(50)}{S_{0}(30)} \\
&= \frac{\left(1 - \frac{30}{250}\right) - \left(1 - \left[\frac{50}{100}\right]^{2}\right)}{1 - \frac{30}{250}} \\
&= \frac{\frac{220}{250} - \frac{3}{4}}{\frac{220}{250}} \\
&= \frac{440 - 375}{440} \\
&= \frac{65}{440} \\
&= \frac{13}{88} \\
&= 0.1477
\end{align*}$$

The answer is **B**.
