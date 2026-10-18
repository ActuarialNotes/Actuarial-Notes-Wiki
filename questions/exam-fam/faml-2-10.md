---
id: "faml-2-10"
exam: "Exam FAM"
topic: "Survival Model"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Survival+Model
  - Concepts/Hazard+Rate
  - Concepts/Life+Table
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eb5f634f948f6f95880d8f43f603c884a542acffcb4ddef6641419d20fab9246
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-10.md
---

You are given:

i) $\mu_{x+t} = \beta t^{2}$, $t \ge 0$

ii) $l_{x} = 1000$

iii) $l_{x+10} = 400$

Calculate $1000\beta$.

[Question on October 2022 FAM-L Exam]

- A) 2.75
- B) 2.80
- C) 2.85
- D) 2.90
- E) 2.95

## Explanation

$${}_{10}p_{x} = \frac{l_{x+10}}{l_{x}} = e^{-\int_{0}^{10}\mu_{x+t}\,dt}$$

$$\Longrightarrow \frac{400}{1000} = e^{-\int_{0}^{10}\beta t^{2}\,dt} \Longrightarrow 0.4 = e^{-\beta t^{3}/3\,\big|_{0}^{10}}$$

$$\Longrightarrow 0.4 = e^{-\beta \cdot 10^{3}/3} \Longrightarrow \ln(0.4) = -\beta\left(\frac{1000}{3}\right)$$

$$\begin{align*}
\Longrightarrow \beta &= -\ln(0.4)(.003) \\
&= 0.0027489
\end{align*}$$

The answer is **A**.
