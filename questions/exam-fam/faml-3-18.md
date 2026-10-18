---
id: "faml-3-18"
exam: "Exam FAM"
topic: "Fractional Age Assumption"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Fractional+Age+Assumption
  - Concepts/Hazard+Rate
  - Concepts/Life+Table
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b675f67d031efb260bae7b7961af54c5ec79f4310c131606bfd1b0dd2c4a04ee
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-18.md
---

You are given:

(i) Mortality follows the Standard Ultimate Life Table.

(ii) Deaths are uniformly distributed over each year of age.

Calculate $1000\dfrac{d}{dt}\mu_{100+t}$ at $t = 0.10$.

- A) 90
- B) 150
- C) 300
- D) 340
- E) 390

## Explanation

Under UDD,

$$\begin{align*}
\mu_{100+t} &= \frac{q_{100}}{1 - tq_{100}} \\
&= q_{100}(1 - tq_{100})^{-1}.
\end{align*}$$

The required derivative is,

$$\begin{align*}
1000\frac{d}{dt}\mu_{100+t} &= 1000q_{100}(-1)(1 - tq_{100})^{-2}(-q_{100}) \\
&= 1000\left(\frac{q_{100}}{1 - tq_{100}}\right)^{2}.
\end{align*}$$

At $t = 0.10$ the derivative is

$$\begin{align*}
1000\left(\frac{0.289584}{1 - 0.1(0.289584)}\right)^{2} &= 89.
\end{align*}$$

The answer is **A**.
