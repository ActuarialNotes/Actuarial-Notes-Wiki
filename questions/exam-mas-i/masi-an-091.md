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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ba3d3329818e0e20224e7e8ad5cded6270a20e5d22802925654a39ba2161d23c
  sources: []
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
