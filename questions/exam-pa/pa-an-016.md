---
id: "pa-an-016"
exam: "Exam PA"
topic: "Feature Engineering"
learning_objective: "Data Transformations and Unsupervised Learning Techniques"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Feature+Engineering
  - Concepts/Categorical+Predictor
answer: "20"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:915d10d31d0c3a0d1e6dea9a11bd494427fc372f6183b9cea859c27df073480a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-016.md
---

A claim frequency GLM has an intercept and these predictors:

- driver age, binned into 6 bands and entered as a categorical predictor,
- territory, a categorical predictor with 12 levels stored as the codes 1 to 12,
- vehicle use, a categorical predictor with 3 levels,
- the logarithm of the amount of insurance, entered as one numeric predictor.

Each categorical predictor is encoded with indicator variables in the usual way. Calculate the number of coefficients the model estimates, including the intercept. Give your answer as a whole number.

## Explanation

A categorical predictor with $k$ levels enters the model as $k - 1$ indicator variables, the base level being absorbed into the intercept. A territory code stored as a number is still categorical. The count is

$$
\underbrace{1}_{\text{intercept}} + \underbrace{(6 - 1)}_{\text{age bands}} + \underbrace{(12 - 1)}_{\text{territory}} + \underbrace{(3 - 1)}_{\text{use}} + \underbrace{1}_{\ln \text{AOI}} = 20
$$

The answer is **20**.

**Common wrong entries**

- **23**: giving every level its own indicator, 1 + 6 + 12 + 3 + 1. In a model with an intercept, one level of each predictor is the base level, which has no indicator because its effect is part of the intercept.
- **10**: entering territory as the single numeric code, 1 + 5 + 1 + 2 + 1. That imposes an order and equal steps between territories that the labels do not have.
- **19**: leaving out the intercept.
