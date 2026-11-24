---
id: "pa-an-023"
exam: "Exam PA"
topic: "Offset Variable"
learning_objective: "Generalized Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Offset+Variable
  - Concepts/Generalized+Linear+Model
answer: "203"
points: 1
---

A pure premium GLM with a log link is fitted to homeowners data. The deductible factors and the increased limit factors were set in separate studies, so both are carried into the model as offsets. The fitted model has an intercept of 5.20 and a coefficient of 0.18 for the policy's territory.

A policy in that territory has a deductible factor of 0.85 and an increased limit factor of 1.10. Calculate its expected pure premium. Give your answer to the nearest dollar.

## Explanation

Under a log link the offset is on the scale of the linear predictor, so each factor enters as its logarithm:

$$
o = \ln 0.85 + \ln 1.10 = -0.1625 + 0.0953 = -0.0672
$$

The linear predictor is

$$
\hat{\eta} = -0.0672 + 5.20 + 0.18 = 5.3128
$$

and the expected pure premium is

$$
e^{5.3128} = 202.92
$$

which is **203**. Equivalently, $e^{5.38} = 217.02$ multiplied by the combined factor $r = 0.85 \times 1.10 = 0.935$.

**Common wrong entries**

- **217**: leaves out the offset, so the deductible and limit factors are not applied.
- **1,525**: adds the factors 0.85 and 1.10 to the linear predictor instead of their logarithms.
