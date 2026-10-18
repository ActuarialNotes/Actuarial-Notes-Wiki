---
id: "faml-2-03"
exam: "Exam FAM"
topic: "Parametric Survival Model"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Parametric+Survival+Model
  - Concepts/Probability+Density+Function+(PDF)
  - Concepts/Future+Lifetime+Random+Variable
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6458e58b2014e702935d32b71e901dd400b533bdc40e1963580029834b78db9c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-03.md
---

You are given that mortality follows Gompertz Law with $B = 0.00027$ and $c = 1.1$.

Calculate $f_{50}(10)$.

- A) 0.048
- B) 0.050
- C) 0.052
- D) 0.054
- E) 0.056

## Explanation

$$\begin{align*}
f_{x}(t) &= -\frac{d}{dt}S_{x}(t) \\
&= -\frac{d}{dt}\left(e^{-\frac{B}{\ln c}\left(c^{x}\right)\left(c^{t}-1\right)}\right) \\
&= -e^{-\frac{B}{\ln c}\left(c^{x}\right)\left(c^{t}-1\right)} \cdot \left(-\frac{B}{\ln c} \cdot c^{x}\right) \cdot c^{t} \cdot \ln c \\
&= e^{-\frac{B}{\ln c}\left(c^{x}\right)\left(c^{t}-1\right)} \cdot Bc^{x+t} \\
&= 0.00027 \times 1.1^{x+t} \cdot e^{-\frac{0.00027}{\ln(1.1)}\left(1.1^{x}\right)\left(1.1^{t}-1\right)}
\end{align*}$$

$$\begin{align*}
f_{50}(10) &= 0.00027 \times 1.1^{50+10} \cdot e^{-\frac{0.00027}{\ln(1.1)}\left(1.1^{50}\right)\left(1.1^{10}-1\right)} \\
&= 0.04839
\end{align*}$$

Alternative Solution:

$$f_{x}(t) = {}_{t}p_{x} \cdot \mu_{x+t}$$

Then we can use the formulas given for Makeham with $A = 0$, $B = 0.00027$ and $c = 1.1$

$$\begin{align*}
f_{x}(t) &= \left(e^{-\frac{0.00027}{\ln(1.1)}\left(1.1^{50}\right)\left(1.1^{10}-1\right)}\right)\left(0.00027 \times 1.1^{50+10}\right) \\
&= 0.04839
\end{align*}$$

The answer is **A**.
