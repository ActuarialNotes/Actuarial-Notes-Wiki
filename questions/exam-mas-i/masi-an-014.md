---
id: "masi-an-014"
exam: "Exam MAS-I"
topic: "Negative Binomial Distribution"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: easy
type: multiple-choice
bloom: remember
wiki_link:
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Mixed+Poisson+Process
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:af4fdae5d68a14121ed28fdf52aebcfcd8831f287ba28bae1725f5dbab06c08c
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), MAS-I reading, Def. & Properties 1.21 (negative binomial: E=r beta, Var=r beta(1+beta)), PDF p.11, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), B.2.1.4 negative binomial: E[N]=r beta, Var[N]=r beta(1+beta), PDF p.15, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-014.md
---

Claim counts $N$ follow a negative binomial distribution with parameters $r$ and $\beta$, counting from 0, so that $E[N] = r\beta$. Which expression is $\text{Var}(N)$?

- A) $r\beta(1 + \beta)$
- B) $r\beta$
- C) $r\beta^2$
- D) $r\beta/(1 + \beta)$
- E) $r(1 + \beta)/\beta^2$

## Explanation

In this parameterization

$$
\text{Var}(N) = r\beta(1 + \beta)
$$

so the variance-to-mean ratio is $\text{Var}(N)/E[N] = 1 + \beta > 1$: the negative binomial is the overdispersed alternative to the Poisson. It matches the gamma–Poisson mixture, whose variance is $E[\Lambda] + \text{Var}(\Lambda) = r\beta + r\beta^2$ when $\Lambda$ is gamma with shape $r$ and scale $\beta$. The answer is **A**.

**Why not the others**

- **B** is the mean, which would make the variance equal the mean, as for a Poisson.
- **C** is only the variance of the gamma rate, the between-insured part, without the Poisson variation around it.
- **D** is below the mean, the underdispersion of a binomial, not a negative binomial.
- **E** comes from the trials form $r(1 - p)/p^2$ with $p$ and $(1 - p)$ swapped; with $p = 1/(1 + \beta)$ that form gives $r\beta(1 + \beta)$.
