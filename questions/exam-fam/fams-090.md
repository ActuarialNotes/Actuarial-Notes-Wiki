---
id: "fams-090"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Poisson+Distribution
  - Concepts/Censoring
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9b327349f1d1d741bbd1a6bdd04dc1337f7706d82e1b9b368156213af37e0ad6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-090.md
---

You are given the following observations on 185 small business policies:

| Number of Claims | Number of Policies |
|---|---|
| 0 | 80 |
| 1 or more | 105 |

The number of claims per policy follows a Poisson distribution with parameter $\lambda$.

Using the maximum likelihood estimate of $\lambda$, determine the estimated probability of a policy having fewer than two claims.

- A) 0.79
- B) 0.84
- C) 0.89
- D) 0.95
- E) 0.98

## Explanation

The likelihood function is

$$L(\lambda) = \left(e^{-\lambda}\right)^{80}\left(1 - e^{-\lambda}\right)^{105}$$

The loglikelihood function is

$$l(\lambda) = -80\lambda + 105\ln(1 - e^{-\lambda})$$

Setting

$$l'(\lambda) = -80 + \frac{105e^{-\lambda}}{1 - e^{-\lambda}}$$

equal to 0, we find

$$\begin{align*}
e^{-\lambda} &= \frac{80}{185} \\
\Rightarrow \hat{\lambda} &= -\ln\frac{80}{185} \\
&= 0.838329
\end{align*}$$

The probability the number of claims, $N$, is less than 2 is

$$\begin{align*}
P(N < 2) &= e^{-\hat{\lambda}} + \hat{\lambda}e^{-\hat{\lambda}} \\
&= 0.79495
\end{align*}$$

The answer is **A**.
