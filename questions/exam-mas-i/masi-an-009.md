---
id: "masi-an-009"
exam: "Exam MAS-I"
topic: "Mixed Poisson Process"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Mixed+Poisson+Process
  - Concepts/Mixing+Distribution
  - Concepts/Gamma
  - Concepts/Experience+Rating
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7387ced947aed7b3b7adfae2b5c0269542595e0561e8afc66ab5f55169bdbd17
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-009.md
---

An auto portfolio's claim counts follow a mixed Poisson process. Each insured has a fixed annual claim rate $\Lambda$ drawn from a gamma distribution, and given $\Lambda$ its claims follow a Poisson process. Insured X had 3 claims last year and insured Y had none. Nothing else distinguishes them.

Which statement about their expected numbers of claims next year is correct?

- A) X's is higher, because X's claims raise the expected value of its rate
- B) They are equal, because the process has independent increments
- C) They are equal, because the process has stationary increments
- D) Y's is higher, because X's claims make further claims less likely
- E) X's is exactly 3, because an insured's own count estimates its rate

## Explanation

Given $\Lambda$, next year's count has mean $\Lambda$, so each insured's expected count is the mean of its rate given its history:

$$
E[N(2) - N(1) \mid N(1) = n] = E[\Lambda \mid N(1) = n]
$$

A high count is more likely under a high rate, so 3 claims shift the posterior distribution of X's rate upward, while a claim-free year shifts Y's down. X's expected count is higher; the answer is **A**. This dependence between years is what experience rating uses.

**Why not the others**

- **B** — independent increments hold for each insured *given* $\Lambda$, but unconditionally the years share the same unknown $\Lambda$, so they are dependent.
- **C** — the process does have stationary increments, but that concerns the unconditional distribution of a year's count, not the count given a history.
- **D** reverses the logic: under a Poisson process claims do not use up a rate; a claim is evidence of a higher one.
- **E** uses X's own count with full weight. The posterior mean blends that count with the portfolio mean, so it lies between them, not at 3.
