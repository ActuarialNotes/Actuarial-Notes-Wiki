---
id: "fams-049"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Censoring
  - Concepts/Weibull+Distribution
  - Concepts/Severity
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:5a0f99d0c0e6bfe612d33f806b4988a647decbbbcc6c66907bfe01db83d71430
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q49, p.40, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q49, p.22, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-049.md
---

Personal auto property damage claims in a certain region are known to follow the Weibull distribution:

$$F(x) = 1 - \exp\left[-\left(\frac{x}{\theta}\right)^{0.2}\right], \quad x > 0$$

A sample of four claims is:

130     240     300     540

The values of two additional claims are known to exceed 1000.

Calculate the maximum likelihood estimate of $\theta$.

- A) Less than 300
- B) At least 300, but less than 1200
- C) At least 1200, but less than 2100
- D) At least 2100, but less than 3000
- E) At least 3000

## Explanation

The density function is

$$f(x) = \frac{0.2x^{-0.8}}{\theta^{0.2}}e^{-(x/\theta)^{0.2}}$$

The likelihood function is

$$\begin{align*}
L(\theta) &= f(130)f(240)f(300)f(540)[1 - F(1000)]^2 \\
&= \frac{0.2(130)^{-0.8}}{\theta^{0.2}}e^{-(130/\theta)^{0.2}}\,\frac{0.2(240)^{-0.8}}{\theta^{0.2}}e^{-(240/\theta)^{0.2}}\,\frac{0.2(300)^{-0.8}}{\theta^{0.2}}e^{-(300/\theta)^{0.2}}\,\frac{0.2(540)^{-0.8}}{\theta^{0.2}}e^{-(540/\theta)^{0.2}}e^{-(1000/\theta)^{0.2}}e^{-(1000/\theta)^{0.2}} \\
&\propto \theta^{-0.8}e^{-\theta^{-0.2}(130^{0.2} + 240^{0.2} + 300^{0.2} + 540^{0.2} + 1000^{0.2} + 1000^{0.2})}
\end{align*}$$

$$\begin{align*}
l(\theta) &= -0.8\ln(\theta) - \theta^{-0.2}(130^{0.2} + 240^{0.2} + 300^{0.2} + 540^{0.2} + 1000^{0.2} + 1000^{0.2}) \\
&= -0.8\ln(\theta) - 20.2505\theta^{-0.2} \\
l'(\theta) &= -0.8\theta^{-1} + 0.2(20.2505)\theta^{-1.2} \\
&= 0
\end{align*}$$

$$\theta^{-0.2} = 0.197526, \quad \hat{\theta} = 3{,}325.67$$

The answer is **E**.
