---
id: "pa-an-022"
exam: "Exam PA"
topic: "Offset Variable"
learning_objective: "Generalized Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Offset+Variable
  - Concepts/Poisson+Regression
  - Concepts/Dispersion+Parameter
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bc70738bcdc9fe7c0fb89e9731343a4d19fd2955a0bb7e06c18902fbb2b7d652
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-022.md
---

A commercial auto data set has one row per fleet: the fleet's claim count, its exposure in vehicle-years, and its rating variables. Exposure ranges from 2 to 400 vehicle-years. An actuary wants a Poisson GLM with a log link whose coefficients describe claim frequency per vehicle-year, with expected claims proportional to exposure.

Determine which of the following set-ups achieve this.

- I. Claim count as the response, with $\ln(\text{exposure})$ as an offset.
- II. Claim count divided by exposure as the response, with exposure as the weight and no offset.
- III. Claim count as the response, with $\ln(\text{exposure})$ as a predictor whose coefficient is estimated.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I achieves it.** An offset is a term in the linear predictor with its coefficient fixed at 1:

$$
\ln \mu_i = \ln(\text{exposure}_i) + \beta_0 + \beta_1 x_{i1} + \cdots
$$

so $\mu_i = \text{exposure}_i \cdot e^{\eta_i}$, proportional to exposure, and $e^{\eta_i}$ is the frequency per vehicle-year.

**II achieves it.** Modelling the frequency as the response, with exposure as the weight and no offset, gives the same coefficients, relativities and standard errors as I. The weight tells the model that a fleet with 400 vehicle-years has a much less variable frequency than one with 2.

**III does not.** Estimating the coefficient of $\ln(\text{exposure})$ drops the assumption that expected claims are proportional to exposure. It is a different model, in which the model with the offset is nested.

I and II achieve it, so the answer is **B**.

**Why not the others**

- **A** rejects II, missing that the frequency response with exposure weights is the equivalent set-up.
- **C** and **D** accept III, treating an estimated coefficient as if it were fixed at 1.
- **E** would need another combination, but I and II both work and III does not.
