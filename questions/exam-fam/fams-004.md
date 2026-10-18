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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8c6442df35a9448e236e8b1814f7e96485f0f7ddf9e75dc43b7612ac3d169987
  sources: []
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
