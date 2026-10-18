---
id: "masii-an-019"
exam: "Exam MAS-II"
topic: "Quantile Plot"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Quantile+Plot
  - Concepts/Lift
answer: "E"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:67fddd9449b11903681b5d51e0fb96fa45dcf9f364757a8b2ee6babaf2c03f1c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-019.md
---

An actuary compares the current rating plan with a proposed GLM using simple quintile plots built on a holdout data set. Each plot sorts the data by that model's predicted loss cost into quintiles of equal exposure; all values are divided by the overall average.

| Quintile | 1 | 2 | 3 | 4 | 5 |
| :--- | ---: | ---: | ---: | ---: | ---: |
| Current plan — predicted | 0.70 | 0.90 | 1.00 | 1.10 | 1.30 |
| Current plan — actual | 0.80 | 0.98 | 0.95 | 1.08 | 1.20 |
| Proposed GLM — predicted | 0.55 | 0.80 | 1.00 | 1.20 | 1.45 |
| Proposed GLM — actual | 0.58 | 0.82 | 1.03 | 1.16 | 1.41 |

Which of the following conclusions is best supported?

- A) The current plan is better, because predictions nearer the average are more stable and so more accurate
- B) Neither can be preferred, because a quantile plot cannot compare two models without a double lift chart
- C) The proposed GLM is better on lift, but the current plan is better on predictive accuracy
- D) The current plan is better, because its actual values never exceed its predicted values in the top quintile
- E) The proposed GLM is better on predictive accuracy, monotonicity and lift between the first and last quintiles

## Explanation

Judge the two plots on the three criteria for a quantile plot:

1. **Predictive accuracy** — the proposed GLM's actuals sit within 0.04 of its predictions in every quintile; the current plan misses by as much as 0.10 (quintiles 1 and 5), and its predictions are more extreme than what emerges at both ends.
2. **Monotonicity** — the GLM's actuals rise in every quintile; the current plan has a reversal in quintile 3 (0.95 after 0.98).
3. **Lift** — the GLM's actuals run from 0.58 to 1.41 (a ratio of 2.43); the current plan's from 0.80 to 1.20 (1.50).

The proposed GLM wins on all three. The answer is **E**.

**Why not the others**

- **A** — a narrow range of predictions is not accuracy; here the current plan's predictions are both narrow and wrong, and it separates the best from the worst risks less.
- **B** — a double lift chart compares two models directly, but two simple quantile plots on the same holdout data are themselves a standard comparison.
- **C** — the current plan is the less accurate of the two, not the more.
- **D** — under-predicting the top quintile is not a virtue, and the current plan *over*-predicts it (1.30 predicted, 1.20 actual), as it does at the bottom — the sign of a plan whose rating differences are too wide for what they capture.
