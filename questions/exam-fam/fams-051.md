---
id: "fams-051"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Deductible
  - Concepts/Poisson+Thinning
  - Concepts/Variance
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3147176acecf399a34a24518cff3ea69a91b8411953828e54a490b59ed4388d4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-051.md
---

For an insurance:

(i) The number of losses per year has a Poisson distribution with $\lambda = 10$.

(ii) Loss amounts are uniformly distributed on (0, 10).

(iii) Loss amounts and the number of losses are mutually independent.

(iv) There is an ordinary deductible of 4 per loss.

Calculate the variance of aggregate payments in a year.

- A) 36
- B) 48
- C) 72
- D) 96
- E) 120

## Explanation

Since loss amounts are uniform on (0, 10), 40% of losses are below the deductible (4), and 60% are above.  Thus, claims occur at a Poisson rate $\lambda^* = 0.6(10) = 6$.

Since loss amounts were uniform on (0, 10), claims are uniform on (0, 6).

Let $N$ = number of claims; $X$ = claim amount; $S$ = aggregate claims.

$$\begin{align*}
E(N) &= Var(N) = \lambda^* \\
&= 6 \\
E(X) &= (6 - 0)/2 \\
&= 3 \\
Var(X) &= (6 - 0)^2/12 \\
&= 3 \\
Var(S) &= E(N)Var(X) + E(X)^2 Var(N) \\
&= 6(3) + 3^2(6) \\
&= 72
\end{align*}$$

The answer is **C**.
