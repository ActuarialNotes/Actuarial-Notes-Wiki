---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:c38fad289a14845b4dfbc4ee476e505f5249d8d31cbf11e7535233904e396e6c
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C heading, description and tasks 1-9 (Task 2: model structure, e.g. link function and distribution of the dependent variable for GLM; tasks 3, 7, 8: evaluation, AIC/BIC/deviance, diagnostic plots), PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope, printed pp.2-3 (PDF pp.19-20): modelling step 1, specifying models in two parts; linear regression a special case of GLMs, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), §3.3.2 Extensions of the Linear Model: interaction term (3.31), quadratic term (3.36) 'still a linear model', PDF pp.97-102, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), App. B §§B.1.1-B.1.2: exponential-family response, link g(mu_i) = eta_i, linear predictor eta_i = x_i'beta, standard linear model = normal errors with identity link, PDF pp.2-4, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), §2.1.2-2.1.3 log link gives a multiplicative structure and guarantees positive premium, gamma severity example (PDF pp.14-15); §2.7.1-2.7.2 gamma for severity, Poisson for frequency (PDF pp.29-31); contents §§5.4 (binning, polynomial terms, piecewise linear, splines) and 5.6 interactions (PDF p.6), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Extended Linear Model.md
---

**Extended Linear Models** is the name the CAS MAS-I outline gives its regression domain: ordinary linear regression and the models that extend it by relaxing its classical assumptions — allowing a non-Normal response distribution, a non-identity [[Link Function]], and a more flexible linear predictor. [[Generalized Linear Model]]s are the most common extended linear model used in actuarial work.

> $$\eta_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

> $$g(\mu_i) = \eta_i, \qquad Y_i \sim \text{(chosen response distribution)}$$

| Model class | Response distribution | Link |
| :--- | :--- | :--- |
| Ordinary regression | Normal | Identity |
| [[Generalized Linear Model]] | Exponential family | Chosen to fit the data |

- Both classes can include [[Interaction|interactions]], transformations such as polynomial terms, and banded variables: "linear" means linear in the coefficients, so $\beta_0 + \beta_1 x + \beta_2 x^2$ is still a linear model
- Building an extended linear model means choosing its **[[Model Structure]]**, which has three parts: the **response distribution**, the **[[Link Function]]**, and the **linear predictor** (which predictors, transformations, and interactions enter it). The MAS-I outline's own example of choosing a GLM's model structure is choosing its link function and the distribution of the dependent variable
- Ordinary least-squares regression is a special case where the response is Normal and the link is the identity function
- Model adequacy is compared across candidate extended linear models using [[Deviance]], [[AIC]], [[BIC]], and [[Residual Plot]]s
- In insurance ratemaking, the choice of extended linear model is driven by the data's behavior — e.g., a right-skewed, strictly positive severity favors a Gamma distribution with a log link, while integer claim counts favor a Poisson distribution

![[Media/Figures/Extended_Linear_Model.svg|340]]

> [!example]- Selecting an Extended Linear Model for Claim Severity {Example}
> An actuary has individual claim severities that are strictly positive and right-skewed. Why is ordinary least-squares regression not an appropriate extended linear model here, and what would be a better choice?
>
> > [!answer]-
> > Ordinary least-squares assumes a Normal response, which can produce negative fitted severities and underweights the right skew. A **Gamma [[Generalized Linear Model]] with a log [[Link Function]]** is a better extended linear model: it restricts fitted values to be positive and models the multiplicative, right-skewed behavior typical of claim severity.
