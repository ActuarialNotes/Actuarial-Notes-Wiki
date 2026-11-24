---
id: "atpa-an-025"
exam: "Exam ATPA"
topic: "Linear Mixed Model"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Linear+Mixed+Model
  - Concepts/Random+Effects
  - Concepts/Overfitting
answer: "E"
points: 1
---

A commercial auto loss-cost model includes the vehicle make and model, which has 900 levels in the data. A third of the levels have fewer than 10 vehicle-years, and new levels appear every year. The pricing team believes the vehicle model matters but does not want thin levels to drive the rates.

Which way of entering the vehicle model best meets the team's aims?

- A) Enter it as a fixed effect with 899 coefficients, one per level beyond the base
- B) Leave the vehicle model out, so that no thin level can affect the rates
- C) Fit a separate model to each vehicle model's own data
- D) Enter it as a fixed effect after merging every level with fewer than 10 vehicle-years into one level called Other
- E) Enter it as a random intercept in a linear mixed model with the other rating variables as fixed effects

## Explanation

A random intercept treats the 900 levels as a sample from a larger population of vehicle models, which suits a factor whose new levels keep appearing. It costs one variance parameter, $\sigma_u^2$, rather than 899 coefficients. Each level's effect is predicted by partial pooling: a level with plenty of data keeps most of its own deviation, and a thin level is pulled toward the overall mean, so it is not overfit. A new level gets the marginal prediction, the population average. The answer is **E**.

**Why not the others**

- **A** — no pooling. Each thin level's coefficient is fitted on a handful of vehicle-years and overfits.
- **B** — complete pooling. It throws away a variable the team believes matters, including its effect on the levels with plenty of data.
- **C** — no pooling again, in its most extreme form, with every other rating effect also estimated from each level's thin data.
- **D** — treats every thin level as alike, whatever its own data show, and still fits each larger level with no shrinkage. The mixed model weighs each level by how much data it has.
