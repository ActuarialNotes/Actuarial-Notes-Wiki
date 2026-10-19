---
id: "fams-053"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Binomial+Distribution
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7fe469643bd542c98a4dda36cb22583dad935f2fe1abc16fa0400ea7498341ab
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-053.md
---

You are given:

(i) The distribution of the number of claims per policy during a one-year period for 10,000 insurance policies is:

| Number of Claims per Policy | Number of Policies |
|---|---|
| 0 | 5000 |
| 1 | 5000 |
| 2 or more | 0 |

(ii) You fit a binomial model with parameters $m$ and $q$ using the method of maximum likelihood.

Calculate the maximum value of the loglikelihood function when $m = 2$.

- A) -10,397
- B) -7,781
- C) -7,750
- D) -6,931
- E) -6,730

## Explanation

$$\begin{align*}
L(q) &= \left[\binom{2}{0}(1 - q)^2\right]^{5000}\left[\binom{2}{1}q(1 - q)\right]^{5000} \\
&= 2^{5000}q^{5000}(1 - q)^{15000} \\
l(q) &= 5000\ln(2) + 5000\ln(q) + 15000\ln(1 - q) \\
l'(q) &= 5000q^{-1} - 15000(1 - q)^{-1} \\
&= 0 \\
\hat{q} &= 0.25
\end{align*}$$

$$\begin{align*}
l(0.25) &= 5000\ln(2) + 5000\ln(0.25) + 15000\ln(0.75) \\
&= -7780.97
\end{align*}$$

The answer is **B**.
