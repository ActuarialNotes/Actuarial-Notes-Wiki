---
id: "pa-an-025"
exam: "Exam PA"
topic: "Interaction"
learning_objective: "Generalized Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Interaction
  - Concepts/Poisson+Regression
  - Concepts/Generalized+Linear+Model
answer: "2.226"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b09f4640152277a63563fe954c897281120c3f56324327de5e0b525e728fe097
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-025.md
---

A Poisson GLM with a log link models claim frequency for small commercial vehicles. Its predictors are vehicle age $x_1$ in years, an indicator $x_2$ that is 1 for an urban garaging location, and their interaction $x_1 x_2$. The fitted coefficients are:

| Term | Estimate |
| --- | ---: |
| Intercept | -2.00 |
| Vehicle age, $x_1$ | -0.04 |
| Urban, $x_2$ | 0.30 |
| Vehicle age × urban, $x_1 x_2$ | 0.05 |

Calculate the ratio of the expected claim frequency of an urban vehicle to that of a non-urban vehicle, both 10 years old. Give your answer to three decimal places.

## Explanation

The two vehicles share the intercept and the vehicle age term, so those cancel in the ratio. The urban vehicle adds the urban main effect and the interaction, which is $\hat{\beta}_3 x_1$:

$$
\hat{\eta}_{\text{urban}} - \hat{\eta}_{\text{non-urban}} = 0.30 + 0.05 \times 10 = 0.80
$$

Under a log link a difference in the linear predictor is a ratio of means:

$$
e^{0.80} = 2.226
$$

The answer is **2.226**. The urban relativity grows with vehicle age, because the interaction makes the effect of being urban depend on age.

**Common wrong entries**

- **1.350**: $e^{0.30}$, the urban relativity at vehicle age 0, ignoring the interaction.
- **1.419**: $e^{0.30 + 0.05}$, the interaction counted for one year of age instead of ten.
- **1.850**: $e^{0.30} + 0.05 \times 10$, adding the interaction to the relativity instead of to the linear predictor.
