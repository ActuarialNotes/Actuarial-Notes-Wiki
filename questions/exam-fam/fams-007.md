---
id: "fams-007"
exam: "Exam FAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Parametric Estimation"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Negative+Binomial+Distribution
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:461e0e86ae2de9e9c32c7fbca39ceb9b383a30329d664857a37898a23781c3b9
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q7, p.6, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q7, p.4, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-007.md
---

The number of claims follows a negative binomial distribution with parameters $\beta$ and $r$, where $\beta$ is unknown and $r$ is known. You wish to estimate $\beta$ based on $n$ observations, where $\bar{x}$ is the mean of these observations.

Determine the maximum likelihood estimate of $\beta$.

- A) $\bar{x}/r^2$
- B) $\bar{x}/r$
- C) $\bar{x}$
- D) $r\bar{x}$
- E) $r^2\bar{x}$

## Explanation

The likelihood is:

$$\begin{align*}
L &= \prod_{j=1}^{n} \frac{r(r+1)\cdots(r+x_j-1)\beta^{x_j}}{x_j!(1+\beta)^{r+x_j}} \\
&\propto \prod_{j=1}^{n} \beta^{x_j}(1+\beta)^{-r-x_j}
\end{align*}$$

The loglikelihood is:

$$\begin{align*}
l &= \sum_{j=1}^{n}[x_j\ln\beta - (r+x_j)\ln(1+\beta)] \\
l' &= \sum_{j=1}^{n}\left[\frac{x_j}{\beta} - \frac{r+x_j}{1+\beta}\right] \\
   &= 0 \\
0 &= \sum_{j=1}^{n}[x_j(1+\beta) - (r+x_j)\beta] \\
&= \sum_{j=1}^{n} x_j - rn\beta \\
&= n\bar{x} - rn\beta \\
\hat{\beta} &= \bar{x}/r
\end{align*}$$

The answer is **B**.
