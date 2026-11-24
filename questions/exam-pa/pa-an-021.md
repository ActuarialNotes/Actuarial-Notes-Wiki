---
id: "pa-an-021"
exam: "Exam PA"
topic: "Generalized Linear Model"
learning_objective: "Generalized Linear Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Generalized+Linear+Model
  - Concepts/Poisson+Regression
answer: "D"
points: 1
---

A Poisson GLM with a log link models auto claim frequency. The output for the rating variable annual distance driven, with four ordered levels, is below. Level 1 is the base level.

| Level | Distance driven | Exposure (car-years) | $\hat{\beta}$ | Standard error |
| --- | --- | ---: | ---: | ---: |
| 1 | Under 10,000 km | 60,000 | 0 | |
| 2 | 10,000 to 20,000 km | 25,000 | 0.15 | 0.03 |
| 3 | 20,000 to 30,000 km | 9,000 | 0.32 | 0.05 |
| 4 | Over 30,000 km | 600 | 0.05 | 0.22 |

Determine which of the following statements are true.

- I. Level 4 should get its own rate, with a relativity of about 1.05 to level 1.
- II. The relativity of level 2 can be told apart from the base level, because its band of plus and minus two standard errors excludes 1.00.
- III. The drop from level 3 to level 4 is more likely the result of thin data than a real fall in risk, so combining level 4 with level 3 is reasonable.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Each relativity is $e^{\hat{\beta}}$, and its band runs from $e^{\hat{\beta} - 2\,\text{SE}}$ to $e^{\hat{\beta} + 2\,\text{SE}}$.

| Level | Relativity | Band |
| --- | ---: | --- |
| 2 | 1.162 | 1.094 to 1.234 |
| 3 | 1.377 | 1.246 to 1.522 |
| 4 | 1.051 | 0.677 to 1.632 |

**I is false.** Level 4's band, 0.677 to 1.632, includes 1.00, so it cannot be told apart from the base level. With only 600 car-years its estimate is unreliable, and a relativity of 1.05 would charge the longest-distance drivers less than level 2.

**II is true.** Level 2's band, 1.094 to 1.234, lies entirely above 1.00.

**III is true.** Levels 1 to 3 rise steadily with narrow bands. Level 4 reverses that pattern, and its wide band comes from its small exposure. Combining a thin level with an adjacent level is the usual remedy.

II and III are true, so the answer is **D**.

**Why not the others**

- **A**, **B** and **C** all accept I, reading the point estimate of 1.05 without its standard error.
- **E** would need some other combination, but II and III are true and I is false.
