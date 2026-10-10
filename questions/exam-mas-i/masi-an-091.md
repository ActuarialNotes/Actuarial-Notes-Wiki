---
id: "masi-an-091"
exam: "Exam MAS-I"
topic: "Extended Linear Model"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Extended+Linear+Model
  - Concepts/Generalized+Linear+Model
  - Concepts/Link+Function
  - Concepts/Linear+Regression
  - Concepts/Polynomial+Regression
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ba3d3329818e0e20224e7e8ad5cded6270a20e5d22802925654a39ba2161d23c
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (2021), CAS-hosted copy, MAS-I reading, 3.3.2 polynomial regression mpg = b0 + b1 hp + b2 hp^2 \"is still a linear model\", PDF p.102, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare & Tevet, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5 (CAS syllabus reading for MAS-II, Exam 8 and PCPA), 2.1.2 link function: g(mu_i) equals the linear predictor; log link gives a multiplicative rating structure, PDF pp.14-16, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Larsen, \"Generalized Linear Models\", CAS Study Note (rev. June 2016), MAS-I reading, Canonical link table: Normal identity, Binomial logit, Poisson log, Gamma inverse; inverse link maps the linear formula to the mean, PDF pp.2-3, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain C tasks 1-9 and readings (Dobson & Barnett, Hogg, James et al., Larsen), PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-091.md
---

Determine which of the following statements about extended linear models are true.

- I. The model $Y_i = \beta_0 + \beta_1 x_i + \beta_2 x_i^2 + \varepsilon_i$, with independent Normal errors, is a linear model even though the fitted curve is a parabola in $x$.
- II. A Gamma GLM for claim severity with a log link specifies $E[\ln Y_i]$ as a linear function of the predictors.
- III. Ordinary least-squares regression is the GLM whose response distribution is Normal and whose link is the identity.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Take each statement in turn.

**I — true.** "Linear" refers to the coefficients, not to $x$. The mean $\beta_0 + \beta_1 x + \beta_2 x^2$ is a linear combination of the unknown $\beta$s with known columns 1, $x$ and $x^2$, so it is fitted by least squares like any other linear model; the curvature lives in the design matrix.

**II — false.** A GLM's link transforms the **mean** of the response, not the response itself:

$$
g(\mu_i) = \ln E[Y_i] = \beta_0 + \beta_1 x_{i1} + \cdots
$$

$\ln E[Y_i]$ and $E[\ln Y_i]$ are different quantities (by Jensen's inequality $E[\ln Y] < \ln E[Y]$ for a non-degenerate $Y$). Modelling $E[\ln Y_i]$ is what an OLS regression of $\ln Y$ does; exponentiating its fitted values gives a geometric mean, which falls below the arithmetic mean, and that is one reason a log-link GLM is preferred for severity.

**III — true.** With a Normal response and the identity link, $\mu_i = \eta_i = \mathbf{x}_i^\top\boldsymbol\beta$, and maximum likelihood gives the least-squares estimates. Ordinary regression is the special case from which the other extended linear models generalise.

I and III are true, so the answer is **C**.

**Why not the others**

- **A** — rejects III, as if OLS stood outside the GLM family rather than being its Normal-identity special case.
- **B** and **D** — accept II, confusing a log *link* (log of the mean) with a log *transformation of the response* (mean of the log).
- **E** — would require I to be false too, i.e. reading "linear" as linear in $x$ rather than in the coefficients.
