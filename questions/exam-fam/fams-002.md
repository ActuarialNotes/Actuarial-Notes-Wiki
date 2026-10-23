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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:0dc7160db4ca9c9b06c564dd0162f238e70b9122a830a2f2d05bd4c4dd304bd9
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q2, p.3, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q2, p.2, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
