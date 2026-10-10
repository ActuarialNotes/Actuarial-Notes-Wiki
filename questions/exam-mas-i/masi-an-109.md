---
id: "masi-an-109"
exam: "Exam MAS-I"
topic: "Analysis of Covariance"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Analysis+of+Covariance
  - Concepts/Interaction
  - Concepts/Categorical+Predictor
  - Concepts/Linear+Regression
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:747636ee076c92aa8373aea58e0939290f7279185ba07c3eee388eb3d5779046
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-109.md
---

An actuary models expected log claim severity for three territories with vehicle value $x$ as a covariate, using the analysis of covariance model

$$
\mu_{ij} = \mu + \alpha_i + \beta x_{ij}, \qquad \alpha_1 = 0
$$

On the scale of this model, the expected difference between any two territories is the same at every vehicle value. Which change to the model would allow that difference to depend on vehicle value?

- A) Add a territory-by-vehicle-value interaction term
- B) Add a squared vehicle-value term to the model
- C) Remove the intercept and include all three territory indicators
- D) Replace the territory indicators by a single numeric territory code
- E) Add vehicle age as a second covariate with its own slope

## Explanation

In the common-slope model the territory lines are **parallel**: the gap between territory $i$ and territory 1 is

$$
(\mu + \alpha_i + \beta x) - (\mu + \beta x) = \alpha_i
$$

whatever $x$ is. Adding the factor-by-covariate interaction gives each territory its own slope,

$$
\mu_{ij} = (\mu + \alpha_i) + (\beta + \gamma_i)\,x_{ij}
$$

so the gap becomes $\alpha_i + \gamma_i x$, which changes with vehicle value. The answer is **A**.

**Why not the others**

- **B** — a $\beta_2 x^2$ term bends every territory's curve by the same amount; the curves stay vertically parallel and the gap is still $\alpha_i$.
- **C** — with all three indicators and no intercept, the indicators sum to the constant column, so the fit is identical: each territory gets its own intercept, still with one common slope.
- **D** — a numeric code fits the territory effect as a slope across arbitrary labels; the territory term is still additive, so the gap still does not depend on $x$.
- **E** — another covariate adds the same amount, $\delta \times \text{age}$, to every territory at a given age; the gap between territories is unchanged.
