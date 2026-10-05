---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:57d20253f104d402c18f34fb87d0cba25c96ae4993fd7fbccd8204c44f8bf58c
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.3.3 item 6 'Collinearity': inflated SEs, correlation matrix, multicollinearity, VIF = 1/(1 - R²_Xj|X-j), 5-10 rule, drop or combine, printed pp.99-103 (PDF pp.109-113), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 12 §12.3 predictions within scope unaffected, interpretation lost; §12.4 Var(b_k) = sigma²/sum_i(x_ik - xbar_k)² x 1/(1 - R_k²), Var(b_k)_min with x_k the only predictor, VIF_k = 1/(1-R_k²), sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 5 §5.4 linear dependence: X'X not invertible, sha256:c7eb1ac675fffa3493ca7644a47f8a36e96fa53d301d2f8191c7ac4ca82edec6 — https://online.stat.psu.edu/stat501/Lesson05.html"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1 full column rank required for (X'X)^-1, PDF pp.6-7, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multicollinearity.md
---

**Multicollinearity** is strong linear association among the *predictors* of a regression. The fit as a whole stays fine, but individual coefficients become unstable: the data cannot say which of two nearly interchangeable variables is doing the work, so each coefficient gets a large standard error.

> $$\text{VIF}_j = \frac{1}{1 - R_j^{2}}$$

> $$\text{Var}(\hat\beta_j) = \frac{\sigma^{2}}{S_{jj}} \times \text{VIF}_j$$

- $S_{jj} = \sum_{i=1}^{n} (x_{ij} - \bar{x}_j)^2$ is the centred sum of squares of predictor $x_j$ (not the uncentred diagonal entry of $\mathbf{X}^\top\mathbf{X}$), so $\sigma^2/S_{jj}$ is $\text{Var}(\hat\beta_j)$ when $x_j$ is the only predictor, and $\text{VIF}_j$ is the factor by which the other predictors inflate it
- $R_j^2$ is from regressing predictor $x_j$ on all the *other* predictors. A **variance inflation factor** above $5$–$10$ is the usual flag
- Symptoms: a significant overall $F$ test with no significant individual coefficients, coefficients that flip sign when a variable is added or a few rows change, and standard errors that are implausibly large
- What it does **not** hurt is prediction inside the observed range of the predictors — fitted values and [[R-Squared]] are unaffected. It damages *interpretation*, which is fatal for a rating model where each relativity must stand on its own
- **Perfect** collinearity (the dummy-variable trap: including every level of a [[Categorical Predictor]] plus an intercept) makes $\mathbf{X}^\top\mathbf{X}$ singular and the fit impossible; drop one level as the base
- Remedies: drop one of the pair, combine them into a single variable, centre the variables before adding polynomial or [[Interaction]] terms, or shrink with a penalized fit. Collecting data that breaks the association is the real fix
- Common in insurance data by construction — vehicle age and vehicle value, building age and construction type, exposure and premium all move together
- Detect it before fitting with a correlation matrix or a [[Scatter Plot]] matrix of the predictors; confirm afterwards with VIFs from the [[Parameter Estimate Tables]]

![[Media/Figures/Multicollinearity.svg|340]]

> [!example]- Computing and Interpreting a VIF {Example}
> Regressing vehicle value on the other predictors gives $R^2 = 0.92$. Compute the VIF and describe the effect on the coefficient.
>
> > [!answer]-
> > $$\text{VIF} = \frac{1}{1 - 0.92} = 12.5$$
> > The variance of $\hat\beta$ for vehicle value is $12.5$ times what it would be if that predictor were uncorrelated with the others, so its standard error is $\sqrt{12.5} = 3.5$ times larger. A relativity that would have been comfortably significant may now fail its Wald test entirely.

> [!example]- Sign Flip in a Rating Model {Example}
> A severity model includes both vehicle age and vehicle value, which correlate at $-0.94$. Alone, vehicle age has coefficient $-0.08$; together with value it becomes $+0.05$. Is the positive sign a real effect?
>
> > [!answer]-
> > Almost certainly not. With $r = -0.94$ the two variables carry nearly the same information, so the fit can trade a large coefficient on one against a large opposite coefficient on the other with little change in the likelihood — the split between them is essentially arbitrary. Keep **one** of the two (or build a single derived variable such as value-per-year-of-age) and choose between the candidate models on holdout error or [[AIC]], not on the sign of an unstable coefficient.
