---
id: "pa-an-014"
exam: "Exam PA"
topic: "Bivariate Data Exploration"
learning_objective: "Data Exploration and Visualization"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Bivariate+Data+Exploration
  - Concepts/Correlation
answer: "A"
points: 1
---

An analyst explores an auto insurer's data two variables at a time before fitting lapse and frequency models. Determine which of the following statements are true.

- I. To compare lapse rates across three payment plans, each plan's lapses should be divided by that plan's number of policies.
- II. The correlation between driver age and claim frequency is 0.03, so driver age can be left out of the frequency model.
- III. A territory variable that shows a strong frequency effect on its own will keep that effect once driver age is in the model.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I is true.** In a two-way table of plan by lapse, rates are compared across rows by dividing by the row totals, $\hat{p}_{j \mid i} = n_{ij}/n_{i\cdot}$. Dividing by the column total would give each plan's share of all lapses, which mostly reflects how many policies the plan has.

**II is false.** Correlation measures only a straight-line relationship. Driver age has a U-shaped effect on frequency, high for the young and the old, so $r$ can be near zero while age is a strong predictor. A scatter plot or the frequency by age band shows the curve.

**III is false.** A bivariate pattern can be produced by a third variable. If one territory has a larger share of young drivers, its apparent effect may come from driver age and may largely disappear once age is in the model.

Only I is true, so the answer is **A**.

**Why not the others**

- **B** and **D** accept II, reading a correlation near zero as no relationship.
- **C** and **D** accept III, assuming a relationship seen two variables at a time survives when other variables are accounted for.
- **E** would need a different combination, but I is true and II and III are false.
