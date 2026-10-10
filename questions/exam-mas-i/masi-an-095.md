---
id: "masi-an-095"
exam: "Exam MAS-I"
topic: "Data Types"
learning_objective: "Extended Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Data+Types
  - Concepts/Categorical+Predictor
  - Concepts/Offset+Variable
  - Concepts/Design+Matrix
  - Concepts/Poisson+Regression
answer: "18"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0bee4faf7fd77c26aa75bcea76a7305ae245cd430d17dc47065f1dd5c7fe8d6f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-095.md
---

A Poisson GLM with a log link is fitted to personal auto claim counts. Its linear predictor contains an intercept and the following terms:

- $\ln(\text{car-years})$, entered as an offset;
- territory, with 12 territories stored in the file as the integers 1–12 and declared categorical before fitting;
- credit tier, with five ordered tiers A–E, entered as categorical;
- driver age in years, entered as a single continuous term;
- vehicle use, business or pleasure, entered as categorical.

Calculate the number of parameters the model estimates, including the intercept. Enter a whole number, e.g. 7.

## Explanation

Count the estimated coefficients term by term. A categorical predictor with $k$ levels takes $k - 1$ indicator columns alongside the intercept; a continuous predictor takes one; an offset takes **none**, because its coefficient is fixed at 1.

$$
\begin{aligned}
\text{Intercept} &: 1 \\
\text{Offset } \ln(\text{car-years}) &: 0 \\
\text{Territory } (k = 12) &: 11 \\
\text{Credit tier } (k = 5) &: 4 \\
\text{Driver age (continuous)} &: 1 \\
\text{Vehicle use } (k = 2) &: 1 \\[4pt]
\text{Total} &: 18
\end{aligned}
$$

The model estimates **18** parameters. That territory is *stored* as numbers does not matter once it is declared categorical: it is nominal, and each territory other than the base gets its own coefficient.

**Common wrong entries**

- **19** — counts the offset as a parameter; its coefficient is fixed, not estimated.
- **21** — gives each categorical predictor $k$ indicators instead of $k - 1$ (1 + 12 + 5 + 1 + 2); with an intercept, a full set of indicators is collinear with the constant column.
- **8** — treats territory as a single numeric slope (1 + 1 + 4 + 1 + 1), which is how the model would be fitted had territory not been declared categorical.
