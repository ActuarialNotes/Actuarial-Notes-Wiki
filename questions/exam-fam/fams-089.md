---
id: "fams-089"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Censoring
  - Concepts/Pareto+Distribution
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2ae56f7627d23acc3db9727233d024b6f35b84fd9ec1a2d74419bbecdc41b595
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q89, p.71, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q89, p.35, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-089.md
---

The following random sample of five claims is drawn from a Pareto distribution with parameters $\alpha$ (unknown) and $\theta = 1$:

$1.2 \qquad 1.6 \qquad 1.4 \qquad$ and two other values that exceed 2.0

Calculate the maximum likelihood estimate of $\alpha$.

- A) 0.62
- B) 0.72
- C) 0.94
- D) 1.04
- E) 1.15

## Explanation

The likelihood function is:

$$\begin{align*}
L(\alpha) &= f(1.2)\,f(1.6)\,f(1.4)\left[S(2.0)\right]^2 \\
&= \alpha^3 (1/3)^{2\alpha} \prod \left(x_i + 1\right)^{-(\alpha+1)}
\end{align*}$$

The loglikelihood function is

$$l(\alpha) = 3\ln\alpha + 2\alpha\ln(1/3) - (\alpha+1)\sum \ln\left(x_i + 1\right)$$

$$\begin{align*}
l'(\alpha) &= \frac{3}{\alpha} + 2\ln(1/3) - \sum \ln(x_i + 1) \\
&= \frac{3}{\alpha} - 4.81666
\end{align*}$$

Setting $l'(\alpha) = 0$, we find $\hat{\alpha} = 0.623$.

The answer is **A**.
