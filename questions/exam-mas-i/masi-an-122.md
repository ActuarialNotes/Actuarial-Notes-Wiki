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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:bd727fc2b4b8f52fb9b0ec5f33145a3c1423df7c7a64a93b89cb1f436bbe3766
  sources:
    - "Fox & Weisberg, R package 'car' reference manual, avPlots 'Added-Variable Plots' (also called partial-regression plots) PDF p.11; mmps 'Marginal Model Plotting' PDF p.89 (response vs a linear combination u of the regressors, a smooth of the data and a smooth of the fitted values on u), sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §7.2.1 Simple Quantile Plots, PDF p.87 (sort by predicted, equal-exposure quantiles, actual vs predicted; criteria predictive accuracy, monotonicity, vertical distance between first and last quantiles = lift), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
