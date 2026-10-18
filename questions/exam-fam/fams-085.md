---
id: "fams-085"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Limited+Expected+Value
  - Concepts/Lognormal+Distribution
  - Concepts/Normal+Approximation
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b025dbfc343d2b6677578bc44308c68089cb56a307ffd7f73095a275c6067c94
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-085.md
---

For the workers' compensation claims of a construction company you are given:

i) The annual number of claims follows the Poisson distribution with mean 20.

ii) Claim sizes $X$ follow the lognormal distribution with $\mu = 4.2$ and $\sigma = 1.1$.

iii) The company retains the first 500 of each claim.

iv) Annual aggregate retained claims approximately follow the normal distribution.

v) $E\left[\left(X \wedge 500\right)^2\right] = 26{,}189$

Determine the 90th percentile of the aggregate distribution of retained claims.

- A) Less than 2900
- B) At least 2900, but less than 3100
- C) At least 3100, but less than 3300
- D) At least 3300, but less than 3500
- E) At least 3500

## Explanation

$$\begin{align*}
E\left(X \wedge 500\right) &= \exp\left(4.2 + \frac{1.1^2}{2}\right)\Phi(0.73) + 500\left(1 - \Phi(1.83)\right) \\
&= 110.5
\end{align*}$$

Let $S$ denote the aggregate distribution of retained claims.

$$\begin{align*}
E(S) &= E(N)E(X \wedge 500) \\
&= 20(110.5) \\
&= 2210 \\
Var(S) &= E(N)Var(X \wedge 500) + E\left((X \wedge 500)^2\right)Var(N) \\
&= 20(26{,}189) \\
&= 523{,}780
\end{align*}$$

The 90th percentile of $S$ is

$$\begin{align*}
&2210 + 1.282\sqrt{523{,}780} \\
&= 3137.82
\end{align*}$$

The answer is **C**.
