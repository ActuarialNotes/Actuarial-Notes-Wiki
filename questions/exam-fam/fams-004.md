---
id: "fams-004"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Exponential+Distribution
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:8c6442df35a9448e236e8b1814f7e96485f0f7ddf9e75dc43b7612ac3d169987
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q4, p.5, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q4, p.3, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-004.md
---

You are given:

(i) Low-hazard risks have an exponential claim size distribution with mean $\theta$.

(ii) Medium-hazard risks have an exponential claim size distribution with mean $2\theta$.

(iii) High-hazard risks have an exponential claim size distribution with mean $3\theta$.

(iv) No claims from low-hazard risks are observed.

(v) Three claims from medium-hazard risks are observed, of sizes 1, 2 and 3.

(vi) One claim from a high-hazard risk is observed, of size 15.

Calculate the maximum likelihood estimate of $\theta$.

- A) 1
- B) 2
- C) 3
- D) 4
- E) 5

## Explanation

The likelihood function is

$$\begin{align*}
L &= \frac{e^{-1/(2\theta)}}{2\theta}\cdot\frac{e^{-2/(2\theta)}}{2\theta}\cdot\frac{e^{-3/(2\theta)}}{2\theta}\cdot\frac{e^{-15/(3\theta)}}{3\theta} \\
&= \frac{e^{-8/\theta}}{24\theta^4}
\end{align*}$$

The loglikelihood function is

$$-\ln(24) - 4\ln(\theta) - 8/\theta$$

Differentiating with respect to $\theta$ and setting the result equal to 0 yields

$$-\frac{4}{\theta} + \frac{8}{\theta^2} = 0$$

which produces $\hat{\theta} = 2$.

The answer is **B**.
