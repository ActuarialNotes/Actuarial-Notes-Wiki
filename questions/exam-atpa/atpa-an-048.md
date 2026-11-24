---
id: "atpa-an-048"
exam: "Exam ATPA"
topic: "Lift"
learning_objective: "Model Explainability and Communication"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Lift
  - Concepts/Quantile+Plot
answer: "D"
points: 1
---

Two candidate pricing models are compared on the same holdout data. For each model, the holdout records are sorted by that model's predictions and grouped into five quintiles of equal exposure. Loss costs are shown divided by the overall average prediction.

| Quintile | Model A predicted | Model A actual | Model B predicted | Model B actual |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 0.50 | 0.75 | 0.70 | 0.60 |
| 2 | 0.80 | 0.90 | 0.85 | 0.85 |
| 3 | 1.00 | 1.00 | 1.00 | 0.95 |
| 4 | 1.25 | 1.10 | 1.10 | 1.15 |
| 5 | 1.70 | 1.30 | 1.40 | 1.50 |

Measuring lift as a ratio, which model has the greater lift, and what is that lift?

- A) Model A, with a lift of 3.40
- B) Model A, with a lift of 1.73
- C) Model B, with a lift of 2.00
- D) Model B, with a lift of 2.50
- E) Model A, with a lift of 1.20

## Explanation

Lift as a ratio is the **actual** value in the highest quantile divided by the actual value in the lowest:

$$L_A = \frac{1.30}{0.75} = 1.73 \qquad L_B = \frac{1.50}{0.60} = 2.50$$

Model B separates the best and worst risks further, so it has the greater lift, **2.50**. The answer is **D**.

**Why not the others**

- **A** uses Model A's predictions, 1.70 / 0.50 = 3.40. Predictions rise across a model's own quantiles by construction, so a wide spread of predictions shows nothing; Model A's actuals spread far less than its predictions.
- **B** is Model A's actual lift computed correctly, but it is smaller than Model B's.
- **C** uses Model B's predictions, 1.40 / 0.70 = 2.00, instead of its actuals.
- **E** takes the difference of Model A's predictions, 1.70 − 0.50 = 1.20, which mixes the wrong measure with the wrong values.
