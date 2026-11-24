---
id: "pa-an-020"
exam: "Exam PA"
topic: "Generalized Linear Model"
learning_objective: "Generalized Linear Models"
difficulty: easy
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Generalized+Linear+Model
  - Concepts/Tweedie+Distribution
  - Concepts/Link+Function
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9f847a776e580cfe3cdda3759d87a49df36d44446df1b0df0281e704de2893ce
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-020.md
---

A homeowners insurer asks you to model the annual pure premium of each policy, its total losses for the year, so that the fitted values can be used directly as a multiplicative rating plan. Of the 40,000 policies in the data, about 93% had no loss, and the losses of the rest are positive and strongly right-skewed.

Which distribution and link function are most appropriate for the GLM?

- A) Normal distribution with the identity link
- B) Tweedie distribution with the log link
- C) Gamma distribution with the log link
- D) Poisson distribution with the log link
- E) Binomial distribution with the logit link

## Explanation

The response is a pure premium: zero for most policies and a positive, right-skewed amount for the rest. The Tweedie distribution with power parameter $p$ between 1 and 2 has a point mass at zero and a continuous right-skewed part above it, so it fits both features of this response. The log link keeps every fitted mean positive and makes the predictors act multiplicatively, which is the form of the rating plan the insurer wants. The answer is **B**.

**Why not the others**

- **A** assumes a symmetric response with constant variance and allows negative fitted pure premiums; the identity link also makes the effects additive, not multiplicative.
- **C** suits claim severity, which is positive. A gamma response cannot be zero, and 93% of these policies have a pure premium of exactly zero.
- **D** is for claim counts. Pure premium is a dollar amount, not a count.
- **E** models whether a policy had a loss, a yes-or-no response, and says nothing about the size of the loss.
