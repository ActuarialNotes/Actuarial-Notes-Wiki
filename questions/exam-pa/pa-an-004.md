---
id: "pa-an-004"
exam: "Exam PA"
topic: "Bias-Variance Tradeoff"
learning_objective: "Predictive Analytics Problem Definition"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Bias-Variance+Tradeoff
  - Concepts/Overfitting
answer: "A"
points: 1
---

An actuary fits four claim frequency models of increasing flexibility to the same training data and evaluates each on the same holdout data.

| Model | Predictors and terms | Training deviance | Holdout deviance |
| :--- | :--- | ---: | ---: |
| 1 | 6 predictors | 3,100 | 3,180 |
| 2 | 12 predictors | 2,900 | 3,020 |
| 3 | 25 predictors | 2,750 | 3,060 |
| 4 | 25 predictors and 40 interactions | 2,400 | 3,350 |

Which model should be selected, and why?

- A) Model 2, because its holdout deviance is the lowest
- B) Model 1, because the gap between its training and holdout deviance is the smallest
- C) Model 3, because its training deviance is lower than Model 2's and its holdout deviance is close to it
- D) Model 4, because its training deviance is the lowest
- E) None of them, because every model's holdout deviance exceeds its training deviance

## Explanation

As flexibility increases, the training error falls every time, because the fitting procedure minimizes it. The test error first falls and then rises, in a U-shape. Here the holdout deviance falls from Model 1 to Model 2 and rises after it, so Model 2 is at the bottom of the U. Models 3 and 4 have gained less in bias than they lost in variance, and Model 4, with a training deviance of 2,400 and a holdout deviance of 3,350, is clearly overfitting. The answer is **A**.

**Why not the others**

- **B** uses the gap as the criterion. A small gap shows the model is not overfitting, but Model 1 is less flexible than the minimum and underfits: its holdout deviance, 3,180, is higher than Model 2's.
- **C** gives weight to the training deviance. The extra predictors lower the training deviance but raise the holdout deviance from 3,020 to 3,060, so they fit noise.
- **D** chooses on training error, which always favours the most flexible model.
- **E** misreads the normal pattern. A model almost always fits its training data better than new data; the comparison that matters is between the models' holdout deviances.
