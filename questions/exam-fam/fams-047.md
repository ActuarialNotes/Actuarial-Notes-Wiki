---
id: "fams-047"
exam: "Exam FAM"
topic: "Limited Fluctuation Credibility"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Full+Credibility+Standard
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Aggregate+Loss+Model
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:766cf676696f77339dda88151606c93eb76fc64f69db4d5fb0b05562f2070cd7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-047.md
---

You are given:

(i) The number of claims follows a negative binomial distribution with parameters $r$ and $\beta = 3$.

(ii) Claim severity has the following distribution:

| Claim Size | Probability |
|---|---|
| 1 | 0.4 |
| 10 | 0.4 |
| 100 | 0.2 |

(iii) The number of claims is independent of the severity of claims.

Calculate the expected number of claims needed for aggregate losses to be within 10% of expected aggregate losses with 95% probability.

- A) Less than 1200
- B) At least 1200, but less than 1600
- C) At least 1600, but less than 2000
- D) At least 2000, but less than 2400
- E) At least 2400

## Explanation

For claim severity,

$$\begin{align*}
\mu_S &= 1(0.4) + 10(0.4) + 100(0.2) \\
&= 24.4 \\
\sigma_S^2 &= 1^2(0.4) + 10^2(0.4) + 100^2(0.2) - 24.4^2 \\
&= 1{,}445.04
\end{align*}$$

For claim frequency,

$$\begin{align*}
\mu_F &= r\beta \\
&= 3r \\
\sigma_F^2 &= r\beta(1 + \beta) \\
&= 12r
\end{align*}$$

For aggregate losses,

$$\begin{align*}
\mu &= \mu_S\mu_F \\
&= 24.4(3r) \\
&= 73.2r \\
\sigma^2 &= \mu_S^2\sigma_F^2 + \sigma_S^2\mu_F \\
&= 24.4^2(12r) + 1{,}445.04(3r) \\
&= 11{,}479.44r
\end{align*}$$

For the given probability and tolerance, $\lambda_0 = (1.96/0.1)^2 = 384.16$.

The number of observations needed is

$$\begin{align*}
\lambda_0\sigma^2/\mu^2 &= 384.16(11{,}479.44r)/(73.2r)^2 \\
&= 823.02/r
\end{align*}$$

The average observation produces $3r$ claims and so the required number of claims is $(823.02/r)(3r) = 2{,}469$.

The answer is **E**.
