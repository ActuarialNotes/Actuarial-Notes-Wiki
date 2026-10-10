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
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:01e48fec1f33610f888ec25b8813bee2c8e0a22aba65cdb28388cd2c0227d4fc
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), MAS-I reading, Fact 1.11 (Var[S(t)] = E[N(t)]E[X^2]), PDF p.7; Fact 1.13 (thinning: special events form a Poisson process with rate pi*lambda), PDF p.9, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.3.3.1 exponential E[X^k]=theta^k k!, PDF p.12, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
