---
id: "masi-an-015"
exam: "Exam MAS-I"
topic: "Negative Binomial Distribution"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Mixed+Poisson+Process
  - Concepts/Mixing+Distribution
  - Concepts/Gamma
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:b4358ccbee7dde985b68ed88713ad9419ef3d417de97cda1f94a354117a9ad7d
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), MAS-I reading, Def. & Properties 1.20 property 6 (C*Gamma is gamma with scale C theta), PDF p.11; Def. & Properties 1.21 (negative binomial pmf), PDF p.11; Example 1.24 (mixed Poisson over 2 years: 2 lambda gamma, mixture negative binomial r=alpha, beta=2 theta), PDF p.12, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), B.2.1.4 negative binomial pmf, PDF p.15, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-015.md
---

Each insured's annual claim rate $\Lambda$ follows a gamma distribution with $\alpha = 3$ and $\theta = 0.1$. Given $\Lambda$, the insured's claims follow a Poisson process.

Calculate the probability that a randomly selected insured has exactly one claim in a 2-year period.

- A) Less than 0.10
- B) At least 0.10, but less than 0.18
- C) At least 0.18, but less than 0.25
- D) At least 0.25, but less than 0.31
- E) At least 0.31

## Explanation

Given $\Lambda$, the count over $t = 2$ years is Poisson with mean $t\Lambda$, and $t\Lambda$ is gamma with $\alpha = 3$ and scale $\theta t = 0.2$. A gamma mixture of Poissons is negative binomial with $r = \alpha = 3$ and $\beta = \theta t = 0.2$:

$$
\begin{align*}
P(N = 1) &= \frac{r\,\beta}{(1 + \beta)^{r + 1}} \\
&= \frac{3(0.2)}{1.2^{4}} \\
&= \frac{0.6}{2.0736} \\
&= 0.2894
\end{align*}
$$

This lies in **D**.

**Why not the others**

- **A**: $p = 1/(1 + \beta)$ placed where $(1 - p)$ belongs gives $P = 3(1/6)^3(5/6) = 0.0116$.
- **B**: dividing by the time, $\beta = \theta/t = 0.05$, gives 0.1234.
- **C**: forgetting the 2-year period, $\beta = 0.1$, gives the 1-year probability 0.2049.
- **E**: a Poisson with the same mean, $P = 0.6\,e^{-0.6} = 0.3293$, ignores the variation in rates; reporting $P(N = 0) = 1.2^{-3} = 0.5787$ answers the wrong count.
