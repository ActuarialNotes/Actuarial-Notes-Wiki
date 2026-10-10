---
id: "masi-an-006"
exam: "Exam MAS-I"
topic: "Claim"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Claim
  - Concepts/Compound+Poisson+Process
  - Concepts/Poisson+Thinning
  - Concepts/Exponential+Distribution
  - Concepts/Aggregate+Loss+Model
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:01e48fec1f33610f888ec25b8813bee2c8e0a22aba65cdb28388cd2c0227d4fc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-006.md
---

Claims are reported to an insurer as a Poisson process at a rate of 10 per year. Independently of everything else, each claim is closed without payment with probability 0.3; otherwise the payment is exponential with mean 2,000.

Let $S$ be the total amount paid on claims reported during one year. Calculate $\text{Var}(S)$.

- A) Less than 25,000,000
- B) At least 25,000,000, but less than 32,000,000
- C) At least 32,000,000, but less than 45,000,000
- D) At least 45,000,000, but less than 70,000,000
- E) At least 70,000,000

## Explanation

Not every claim produces a payment. Two equivalent routes:

**Route 1: all claims, with zero payments allowed.** $S$ is compound Poisson with $\lambda = 10$ and payment $X$ that is 0 with probability 0.3 and exponential otherwise:

$$
\begin{align*}
E[X^2] &= 0.7 \times 2(2{,}000)^2 \\
&= 5{,}600{,}000 \\
\text{Var}(S) &= \lambda\,E[X^2] \\
&= 10 \times 5{,}600{,}000 \\
&= 56{,}000{,}000
\end{align*}
$$

**Route 2: paid claims only.** Thinning leaves a Poisson process of paid claims at rate $\lambda_{\text{paid}} = 10(0.7) = 7$, each exponential with $E[Y^2] = 2(2{,}000)^2 = 8{,}000{,}000$:

$$
\text{Var}(S) = 7 \times 8{,}000{,}000 = 56{,}000{,}000
$$

This lies in **D**.

**Why not the others**

- **A**: $\lambda\,E[X]^2 = 10 \times 1{,}400^2 = 19{,}600{,}000$ squares the mean payment instead of taking the second moment.
- **B**: $\lambda_{\text{paid}}\,\text{Var}(Y) = 7 \times 2{,}000^2 = 28{,}000{,}000$ uses the paid claims' variance, $\text{Var}(Y)$, where the compound Poisson formula needs $E[Y^2]$.
- **C**: $\lambda\,\text{Var}(X) = 10 \times 3{,}640{,}000 = 36{,}400{,}000$ makes the same variance-for-second-moment mistake on the zero-inflated payment.
- **E**: $\lambda\,E[Y^2] = 10 \times 8{,}000{,}000 = 80{,}000{,}000$ counts every reported claim as a paid claim, ignoring those closed without payment.
