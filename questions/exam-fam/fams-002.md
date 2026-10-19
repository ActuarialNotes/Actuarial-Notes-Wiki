---
id: "fams-002"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Single-Parameter+Pareto+Distribution
  - Concepts/Censoring
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0dc7160db4ca9c9b06c564dd0162f238e70b9122a830a2f2d05bd4c4dd304bd9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-002.md
---

You are given:

(i) Losses follow a single-parameter Pareto distribution with density function:

$$f(x) = \frac{\alpha}{x^{\alpha+1}}, \quad x > 1, \quad 0 < \alpha < \infty$$

(ii) A random sample of size five produced three losses with values 3, 6 and 14, and two losses exceeding 25.

Calculate the maximum likelihood estimate of $\alpha$.

- A) 0.25
- B) 0.30
- C) 0.34
- D) 0.38
- E) 0.42

## Explanation

The distribution function is

$$\begin{align*}
F(x) &= \int_1^x \alpha t^{-\alpha-1}\,dt \\
&= -t^{-\alpha}\Big|_1^x \\
&= 1 - x^{-\alpha}
\end{align*}$$

The likelihood function is

$$\begin{align*}
L &= f(3)f(6)f(14)[1-F(25)]^2 \\
&= \alpha 3^{-\alpha-1}\,\alpha 6^{-\alpha-1}\,\alpha 14^{-\alpha-1}(25^{-\alpha})^2 \\
&\propto \alpha^3[3(6)(14)(625)]^{-\alpha}
\end{align*}$$

Taking logs, differentiating, setting equal to zero, and solving:

$$\begin{align*}
\ln L &= 3\ln\alpha - \alpha\ln 157{,}500 \text{ plus a constant} \\
d\ln L/d\alpha &= 3\alpha^{-1} - \ln 157{,}500 \\
               &= 0 \\
\hat{\alpha} &= 3/\ln 157{,}500 \\
&= 0.2507
\end{align*}$$

The answer is **A**.
