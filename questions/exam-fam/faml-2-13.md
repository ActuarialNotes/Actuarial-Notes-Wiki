---
id: "faml-2-13"
exam: "Exam FAM"
topic: "Parametric Survival Model"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Parametric+Survival+Model
  - Concepts/Life+Table
  - Concepts/Survival+Model
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a31382b64ad3eb9b42de96cfdd3bf7a4991ad3cccd38357fb4f1dfd922535f49
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-13.md
---

You are given:

i) The Standard Ultimate Life Table follows Makeham's law with parameters $A^{SULT}$, $B^{SULT}$, and $c^{SULT}$.

ii) Mortality follows Makeham's law with parameters $A = 1.035A^{SULT} + 0.01$, $B = 1.035B^{SULT}$, $c = c^{SULT}$.

Calculate $_{4}q_{89}$.

- A) 0.34
- B) 0.35
- C) 0.38
- D) 0.40
- E) 0.44

## Explanation

$$\begin{align*}
\mu_{x} &= 1.035A^{SULT} + 0.01 + 1.035B^{SULT} \times \left(c^{SULT}\right)^{x} \\
&= 1.035\left[A^{SULT} + B^{SULT}\left(c^{SULT}\right)^{x}\right] + 0.01
\end{align*}$$

$$\mu_{x} = 1.035\mu_{x}^{SULT} + 0.01$$

$$\begin{align*}
{}_{4}p_{89} &= \exp\left[-\int_{0}^{4}\left(1.035\mu_{89+t}^{SULT} + 0.01\right)dt\right] \\
&= \exp\left[-1.035\int_{0}^{4}\mu_{89+t}^{SULT}\,dt - \int_{0}^{4}0.01\,dt\right] \\
&= \left[{}_{4}p_{89}^{SULT}\right]^{1.035}e^{-4 \times 0.01} \\
&= \left[\frac{29{,}183.3}{45{,}995.6}\right]^{1.035}(0.96079) \\
&= 0.59996
\end{align*}$$

$$\begin{align*}
{}_{4}q_{89} &= 1 - 0.59996 \\
&= 0.40004
\end{align*}$$

The answer is **D**.
