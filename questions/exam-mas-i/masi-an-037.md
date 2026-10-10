---
id: "masi-an-037"
exam: "Exam MAS-I"
topic: "Covariance"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Covariance
  - Concepts/Aggregate+Loss+Model
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Exponential+Distribution
  - Concepts/Expected+Value
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7664a60c1ab46ce0c00aabf3ef014347cd118d91c039b0165060f16a3f61d62e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-037.md
---

For a portfolio, the number of claims $N$ in a year has a negative binomial distribution with $r = 2$ and $\beta = 1.5$, so that $E[N] = r\beta$ and $\text{Var}(N) = r\beta(1 + \beta)$. Claim amounts $X_1, X_2, \ldots$ are independent, exponentially distributed with mean 500, and independent of $N$. Aggregate losses are $S = X_1 + \cdots + X_N$.

Calculate $\text{Cov}(N, S)$.

- A) 0
- B) 1,500
- C) 3,750
- D) 8,250
- E) 1,875,000

## Explanation

Use $\text{Cov}(N, S) = E[NS] - E[N]E[S]$ and condition on $N$. Given $N = n$, $S$ is a sum of $n$ claims with mean 500 each, so $E[S \mid N] = 500N$ and

$$
E[NS] = E\big[N \cdot E[S \mid N]\big] = 500\,E[N^2]
$$

$$
\text{Cov}(N, S) = 500\,E[N^2] - E[N] \cdot 500\,E[N] = 500\,\text{Var}(N)
$$

With $E[N] = 2(1.5) = 3$ and $\text{Var}(N) = 2(1.5)(2.5) = 7.5$:

$$
\text{Cov}(N, S) = 500 \times 7.5 = 3{,}750
$$

The answer is **C**. Years with more claims have larger aggregate losses, so the covariance is positive even though each claim amount is independent of $N$.

**Why not the others**

- **A** — the claim *amounts* are independent of $N$, but $S$ is built from $N$; independence of the severities does not make $S$ independent of the count.
- **B** — $E[N] \cdot E[X] = 3 \times 500$ replaces $\text{Var}(N)$ with $E[N]$, a shortcut that only works when $N$ is Poisson (variance equal to mean).
- **D** — $E[NS] = 500\,E[N^2] = 500(7.5 + 9) = 8{,}250$ is the first term alone; $E[N]E[S] = 4{,}500$ was never subtracted.
- **E** — $\text{Var}(N)\,(E[X])^2 = 7.5 \times 500^2$ borrows the second term of the aggregate variance formula; the covariance is linear, not quadratic, in the claim mean.
