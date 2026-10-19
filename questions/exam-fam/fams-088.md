---
id: "fams-088"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Pareto+Distribution
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e90cd78c45d7da1df595196d5d47d36f0e72c9738ac25770e48320cb65b7987a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-088.md
---

You are given:

(i) The random variable $X$ has probability density function

$$f(x) = \alpha(1500)^{\alpha}(1500 + x)^{-(\alpha+1)}, \qquad \alpha > 0 \text{ and } x > 0$$

(ii) Five sample observations are:

$$50 \qquad 250 \qquad 450 \qquad 650 \qquad 850$$

Calculate the maximum likelihood estimate of $\alpha$.

- A) 0.16
- B) 0.79
- C) 1.85
- D) 2.91
- E) 3.97

## Explanation

The likelihood function is

$$L(\alpha) = \alpha^5\, 1500^{5\alpha} \prod \left(1500 + x_i\right)^{-(\alpha+1)}$$

The loglikelihood function is

$$l(\alpha) = 5\ln\alpha + 5\alpha\ln 1500 - (\alpha+1)\sum \ln\left(1500 + x_i\right)$$

$$l'(\alpha) = \frac{5}{\alpha} + 5\ln 1500 - \sum \ln\left(1500 + x_i\right)$$

Setting $l'(\alpha) = 0$, we find:

$$\begin{align*}
\frac{5}{\alpha} &= -5\ln 1500 + \sum \ln\left(1500 + x_i\right) \\
\Rightarrow \hat{\alpha} &= 3.974
\end{align*}$$

The answer is **E**.
