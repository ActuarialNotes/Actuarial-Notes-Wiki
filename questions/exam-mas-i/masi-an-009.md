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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7387ced947aed7b3b7adfae2b5c0269542595e0561e8afc66ab5f55169bdbd17
  sources:
    - "Huang, STAT 317 (U. Chicago, 2021) Lecture 11 slides, following Ross ch.5, slides 17-18 (5.4.3 conditional/mixed Poisson process: stationary increments; increments in general not independent), PDF pp.17-18, sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "Mahler & Dean, \"Credibility\", ch.8 of Foundations of Casualty Actuarial Science (SOA study note C-21-01), 5.3 conjugate priors, Example 5.3.1 (observing claims raises, no claims lowers, the posterior mean (alpha+C)/(lambda+Y)), PDF pp.101-102, sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/C-21-01.pdf"
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), MAS-I reading, Section 1.3.3 (an insurer models insured claims as Poisson with lambda varying randomly among insureds), PDF p.12, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
