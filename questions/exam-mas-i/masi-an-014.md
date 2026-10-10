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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:af4fdae5d68a14121ed28fdf52aebcfcd8831f287ba28bae1725f5dbab06c08c
  sources: []
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
