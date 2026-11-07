---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e99d6c457b9d791675e4619bf2bb8c3321dfe0a4a19f15fd4dbc7593cf2bc729
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.2 'Step Functions', eqs (7.4)-(7.6) and footnote 2, printed pp.292-294 (PDF pp.300-302); §7.3 eq (7.7), printed p.294; §7.4.1 'piecewise polynomials of degree 0', printed p.295 (PDF p.303); §7.7.1 Fig 7.11 caption (education as a step function), printed p.308 (PDF p.316), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Step Function.md
---

A **Step Function** is a function of a predictor $X$ that is constant on each of a set of intervals, called bins. A step-function regression cuts the range of $X$ at cutpoints $c_1 < c_2 < \cdots < c_K$ and fits a [[Linear Regression|linear regression]] on indicator variables for the bins. The indicator variables are

> $$
> \begin{aligned}
> C_0(X) &= I(X < c_1) \\
> C_k(X) &= I(c_k \le X < c_{k+1}) \\
> C_K(X) &= I(c_K \le X)
> \end{aligned}
> $$

- $I(\cdot)$ is the indicator function, equal to 1 when its condition is true and 0 otherwise.
- $k = 1, 2, \ldots, K - 1$ in the middle line.

Each bin includes its lower cutpoint and excludes its upper one, so an observation at a cutpoint belongs to the bin that the cutpoint starts. Every value of $X$ falls in exactly one of the $K + 1$ bins, so $C_0(X) + C_1(X) + \cdots + C_K(X) = 1$. The step-function regression is

> $$y_i = \beta_0 + \beta_1 C_1(x_i) + \beta_2 C_2(x_i) + \cdots + \beta_K C_K(x_i) + \varepsilon_i$$

- $y_i$ is the response and $x_i$ is the predictor of observation $i$.
- $\varepsilon_i$ is the error term.

The indicator $C_0$ is left out. With an intercept, the $K + 1$ indicators would add up to the intercept column, and the [[Design Matrix|design matrix]] would not have full rank. The bin $X < c_1$ is the reference bin. A step function turns a continuous predictor into a [[Categorical Predictor|categorical predictor]], and unlike [[Polynomial Regression|polynomial regression]] it fits each bin separately.

> [!example]- Claim frequency is fitted as a step function of driver age with cutpoints 25, 40 and 65, giving $\hat\beta_0 = 0.18$, $\hat\beta_1 = -0.07$, $\hat\beta_2 = -0.09$ and $\hat\beta_3 = -0.05$. What is the predicted frequency for drivers aged 22, 40 and 70? {Example}
> - A prediction is the intercept plus the coefficients of the indicators that equal 1 for the driver. The other indicators are 0.
> - Age 22 is in the reference bin, so the predicted frequency is $0.18$.
> - Age 40 starts the bin $40 \le X < 65$, so $C_2 = 1$ and the predicted frequency is $0.18 - 0.09 = 0.09$.
> - Age 70 is in the bin $65 \le X$, so the predicted frequency is $0.18 - 0.05 = 0.13$.

## Least squares estimates of the coefficients

When the regression is fitted by [[Ordinary Least Squares|least squares]], the fitted value in each bin is the mean response of the observations in that bin. The intercept estimate is the mean of the reference bin,

> $$\hat\beta_0 = \bar{y}_0$$

and each other coefficient estimate is the difference between its bin's mean and the mean of the reference bin:

> $$\hat\beta_k = \bar{y}_k - \bar{y}_0$$

- $\bar{y}_k$ is the mean response of the observations with $C_k(x_i) = 1$, and $\bar{y}_0$ is the mean response of the observations in the reference bin.

> [!example]- Nine claim severities, in thousands, are fitted with a step function of building age $x$, with cutpoints 10 and 30. What are $\hat\beta_0$, $\hat\beta_1$ and $\hat\beta_2$, and what is the fitted severity of a 30-year-old building? {Example}
>
> | $x$ | 4 | 7 | 9 | 15 | 22 | 30 | 38 | 45 | 52 |
> | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
> | $y$ | 4 | 6 | 5 | 7 | 9 | 12 | 10 | 14 | 12 |
>
> - The bin $x < 10$ holds 4, 6 and 5, with mean 5.
> - The bin $10 \le x < 30$ holds 7 and 9, with mean 8.
> - The bin $30 \le x$ holds 12, 10, 14 and 12, with mean 12. The building aged 30 is in this bin, because the bin starts at the cutpoint 30.
> - The estimates are $\hat\beta_0 = 5$, $\hat\beta_1 = 8 - 5 = 3$ and $\hat\beta_2 = 12 - 5 = 7$.
> - The fitted severity of a 30-year-old building is $5 + 7 = 12$, or $\$12{,}000$.

> [!trap] Placing an observation at a cutpoint in the lower bin
> An observation equal to a cutpoint belongs to the bin that the cutpoint starts. In the example above, moving the 30-year-old building into the middle bin changes that bin's mean from 8 to $28/3 = 9.33$, so $\hat\beta_1$ becomes 4.33 instead of 3.
