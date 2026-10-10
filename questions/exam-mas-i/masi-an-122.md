---
id: "masi-an-122"
exam: "Exam MAS-I"
topic: "Marginal Model Plot"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Marginal+Model+Plot
  - Concepts/Model+Structure
  - Concepts/Model+Fit
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bd727fc2b4b8f52fb9b0ec5f33145a3c1423df7c7a64a93b89cb1f436bbe3766
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-122.md
---

An actuary fits a gamma GLM with a log link to homeowners claim severity. The predictors are building age (a single linear term), construction type (four levels) and protection class (ten levels). Three marginal model plots are drawn, each overlaying a smooth of the observed severities (the data smooth) and a smooth of the fitted values (the model smooth):

- **Against building age:** the data smooth falls steeply over the first five years and is nearly flat after that. The model smooth declines gently and steadily across the whole range, so it lies above the data smooth for buildings aged roughly 3 to 12 and below it for the newest buildings.
- **Against protection class:** the two smooths are indistinguishable.
- **Against the linear predictor:** the two smooths are close over the whole range.

Determine which of the following statements are true.

- I. The plot against building age indicates that a single linear term misstates how severity changes with building age; a banded or spline term for building age is worth trying.
- II. Dropping protection class from the model would leave the data smooth in the building-age plot unchanged.
- III. Because the smooths agree in the plot against the linear predictor, the model needs no change.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I — True.** The data smooth bends sharply (a steep drop, then flat), while the model smooth, built from one linear term on the log scale, can only change at a steady rate. Systematic separation of the two curves in the plot against one predictor is the signature of a misspecified functional form for that predictor; a banded, piecewise or spline term can follow the bend.

**II — True.** The data smooth is a smooth of the *observed* severities against building age. It involves no fitted values, so changing which predictors are in the model changes only the model smooth.

**III — False.** The plot against the linear predictor checks fit in one direction only, averaging over all the predictors. Errors in one term can cancel in that summary, which is exactly why marginal model plots are drawn against each predictor as well — and the building-age plot shows a misfit that the overall plot hides.

The true statements are I and II. The answer is **B**.

**Why not the others**

- **A** — misses II, treating both smooths as products of the model; only the model smooth is.
- **C** and **D** — accept III, reading agreement in the overall plot as proof that every term is right.
- **E** — the true set, I and II, is option B.
