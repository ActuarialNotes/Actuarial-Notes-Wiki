---
id: "masi-an-159"
exam: "Exam MAS-I"
topic: "Quadratic Discriminant Analysis"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Quadratic+Discriminant+Analysis
  - Concepts/Bayes+Theorem
  - Concepts/Normal+Distribution
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eb1ca1c7cf442c806c662bb4a70a1f79728bcaa0a8ad2b71155e134631e39e73
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-159.md
---

Claims are classified as standard or litigated from their log-severity $x$. In the training data:

| Class | Share of claims | Log-severity |
| :--- | ---: | :--- |
| Standard | 0.80 | $N(7.0,\ 0.6^2)$ |
| Litigated | 0.20 | $N(8.0,\ 1.2^2)$ |

Using quadratic discriminant analysis with these as the estimates, calculate the probability that a claim with log-severity $x = 8.2$ is litigated.

- A) Less than 0.40
- B) At least 0.40, but less than 0.55
- C) At least 0.55, but less than 0.70
- D) At least 0.70, but less than 0.80
- E) At least 0.80

## Explanation

With one predictor, each class's discriminant function is

$$
\delta_k(x) = -\frac{(x - \mu_k)^2}{2\sigma_k^2} - \ln\sigma_k + \ln\pi_k
$$

$$
\begin{align*}
\delta_{\text{S}}(8.2) &= -\frac{(1.2)^2}{2(0.36)} - \ln 0.6 + \ln 0.8 \\
&= -2.0000 + 0.5108 - 0.2231 \\
&= -1.7123 \\[4pt]
\delta_{\text{L}}(8.2) &= -\frac{(0.2)^2}{2(1.44)} - \ln 1.2 + \ln 0.2 \\
&= -0.0139 - 0.1823 - 1.6094 \\
&= -1.8056
\end{align*}
$$

Each $e^{\delta_k}$ is proportional to $\pi_k f_k(x)$, so the posterior is

$$
\begin{align*}
P(\text{L} \mid x) &= \frac{e^{-1.8056}}{e^{-1.7123} + e^{-1.8056}} \\
&= \frac{0.1644}{0.1805 + 0.1644} \\
&= 0.477
\end{align*}
$$

The answer is **B**. Even though 8.2 is above the litigated mean, the claim is narrowly classed as standard: the 80% prior and the narrow standard-claim density outweigh the litigated class's wide spread.

**Why not the others**

- **A** — uses one shared variance, $(0.36 + 1.44)/2 = 0.90$, for both classes (the shared-covariance assumption QDA drops), giving 0.352.
- **C** — leaves out the $-\ln\sigma_k$ term, i.e. the factor $\sigma_k^{-1}$ in the normal density, which no longer cancels when the classes have different variances; this gives 0.646.
- **D** — ignores the priors $\pi_k$, giving 0.785.
- **E** — reports the posterior odds, $e^{-1.8056}/e^{-1.7123} = 0.911$, instead of the probability.
