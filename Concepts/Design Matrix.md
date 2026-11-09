---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:20a80b5a40480e3c9a71e0e0cb9c5833f9ecbb71fef8ef5da44e82e0788c12a3
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.2 SE(b1) shrinks as x is more spread out, printed p.66; §3.3.1 dummy variables, one fewer than the number of levels, baseline, printed pp.83-86 (PDF pp.93-96); §3.3.2 interaction and x² columns, eq (3.36), printed pp.87-92; §6.5 lab model.matrix() printed pp.272-274 (PDF pp.280-282), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 5 §5.4 X with a column of 1's, b = (X'X)^-1 X'Y, hat matrix, linear dependence makes X'X non-invertible, sha256:c7eb1ac675fffa3493ca7644a47f8a36e96fa53d301d2f8191c7ac4ca82edec6 — https://online.stat.psu.edu/stat501/Lesson05.html"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1 full column rank required for (X'X)^-1; (2.9) var(b) = (X'X)^-1 sigma²; §2.9.1 H = X(X'X)^-1 X', PDF pp.6-7, 49, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.1 linear predictor eta = X beta in a GLM, PDF pp.2-3, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Bates, Mächler, Bolker & Walker, 'Fitting Linear Mixed-Effects Models Using lme4' (lme4 vignette, J. Stat. Softw. 2015), eqs (1)-(2) pp.2-3 and predict() re.form, sha256:60474d07bdb3a511f804a6cd2e73494fd8eb5713f532e2382f69c5dea2e8782e — https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Design Matrix.md
---

A **Design Matrix** is the matrix $\mathbf{X}$ that holds the values of a regression's predictors, with one row per observation and one column per coefficient. For a model with an intercept, $n$ observations and $p$ predictors, the design matrix is the $n \times (p + 1)$ matrix

> $$\mathbf{X} = \begin{bmatrix} 1 & x_{11} & \cdots & x_{1p} \\ 1 & x_{21} & \cdots & x_{2p} \\ \vdots & \vdots & & \vdots \\ 1 & x_{n1} & \cdots & x_{np} \end{bmatrix}$$

- $x_{ij}$ is the value of predictor $j$ for observation $i$.
- The first column, in which every entry is 1, is the intercept column.

The model for all $n$ observations is $\mathbf{y} = \mathbf{X}\boldsymbol\beta + \boldsymbol\varepsilon$, and the linear predictor of a [[Generalized Linear Model|generalized linear model]] is $\boldsymbol\eta = \mathbf{X}\boldsymbol\beta$. The intercept is an estimated coefficient, so the number of parameters is the number of columns of $\mathbf{X}$, $p + 1$. The [[Ordinary Least Squares#Matrix form of the estimates|least squares estimate]] $\hat{\boldsymbol\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ has one entry for each column of $\mathbf{X}$.

> [!example]- Five policies have vehicle ages 2, 5, 8, 1 and 4 and territories A, B, C, B and A. What is the design matrix of a model with an intercept, vehicle age and territory, with territory A as the base level? {Example}
> - The columns are the intercept, vehicle age, an indicator for territory B and an indicator for territory C.
> - Each row holds 1, the policy's vehicle age, and a 1 in the indicator of its territory, if that territory is not A.
>
> $$\mathbf{X} = \begin{bmatrix} 1 & 2 & 0 & 0 \\ 1 & 5 & 1 & 0 \\ 1 & 8 & 0 & 1 \\ 1 & 1 & 1 & 0 \\ 1 & 4 & 0 & 0 \end{bmatrix}$$
>
> - The matrix is $5 \times 4$, so the model has 4 parameters from 2 predictors.

## Indicator columns for a categorical predictor

A [[Categorical Predictor|categorical predictor]] with $J$ levels enters a model with an intercept through $J - 1$ indicator columns, one for each level except a base level. The indicator for level $j$ is

> $$I_j = \begin{cases} 1 & \text{if the observation is at level } j \\ 0 & \text{otherwise} \end{cases}$$

The base level has no indicator, so its effect is absorbed into the intercept. The linear predictor of an observation is the intercept plus the coefficient of its own level, and the base level contributes zero. With one categorical predictor, the intercept estimate is the mean response of the base level, and each indicator's coefficient is the mean response of its level minus the mean response of the base level.

> [!example]- Rural claims of 2 and 4 and urban claims of 7 and 9 are fitted by $y = \beta_0 + \beta_1 I_{\text{urban}} + \varepsilon$. What are the least squares estimates? {Example}
> - The rows of $\mathbf{X}$ are $(1, 0)$, $(1, 0)$, $(1, 1)$ and $(1, 1)$, and $\mathbf{y}$ has entries $2, 4, 7, 9$.
> - $\mathbf{X}^T\mathbf{X}$ has rows $(4, 2)$ and $(2, 2)$, and $\mathbf{X}^T\mathbf{y}$ has entries $22$ and $16$.
>
> $$
> \begin{aligned}
> (\mathbf{X}^T\mathbf{X})^{-1} &= \frac{1}{4}\begin{bmatrix} 2 & -2 \\ -2 & 4 \end{bmatrix} \\
> \hat{\boldsymbol\beta} &= \frac{1}{4}\begin{bmatrix} 2(22) - 2(16) \\ -2(22) + 4(16) \end{bmatrix} \\
> &= \begin{bmatrix} 3 \\ 5 \end{bmatrix}
> \end{aligned}
> $$
>
> - The intercept $\hat\beta_0 = 3$ is the rural mean, and $\hat\beta_1 = 5$ is the urban mean, 8, minus the rural mean.

## Interaction and polynomial columns

An [[Interaction|interaction]] between predictors $x_1$ and $x_2$ enters the design matrix as a column of their products, so the linear predictor contains the term

> $$\beta_3\, x_1 x_2$$

- $\beta_3$ is the interaction coefficient.

When $x_2$ is an indicator, the term applies only when $x_2 = 1$, and it changes the slope of $x_1$ for that level by $\beta_3$. A quadratic term enters the same way, as a column of $x^2$.

> [!example]- A model has linear predictor $\eta = 1.0 + 0.2x + 0.5I + 0.1xI$, where $I$ indicates an urban policy. What is $\eta$ at $x = 3$ for a rural and for an urban policy? {Example}
> - For a rural policy, $I = 0$, so only the intercept and the $x$ term apply: $\eta = 1.0 + 0.2(3) = 1.6$.
> - For an urban policy, $I = 1$, so the indicator and interaction terms apply as well: $\eta = 1.0 + 0.6 + 0.5 + 0.1(3) = 2.4$.
> - The slope of $x$ is $0.2$ for rural policies and $0.2 + 0.1 = 0.3$ for urban ones.

## Linearly dependent columns

If one column of $\mathbf{X}$ is a linear combination of the others, $\mathbf{X}^T\mathbf{X}$ is singular and the coefficients are not uniquely determined. This is called aliasing: any amount can be added to one coefficient and offset in others without changing the fit, which causes convergence problems or arbitrary estimates. The usual case is an intercept together with an indicator for every level of a categorical predictor, because the indicators then sum to the intercept column. Software that finds such a column drops it and reports its coefficient as NA, and that level becomes the base level.

Dropping the intercept and keeping the indicators of all $J$ levels instead is a reparameterization: the columns span the same space, so the fitted values are unchanged and each level has its own intercept. Columns that are nearly, but not exactly, dependent cause [[Multicollinearity|multicollinearity]].

> [!example]- In the vehicle age and territory model above, what goes wrong if an indicator for territory A is added as a fifth column? {Example}
> - Every policy is in exactly one territory, so $I_A + I_B + I_C = 1$ in every row.
> - The three indicators sum to the intercept column, so the five columns have rank 4.
> - $\mathbf{X}^T\mathbf{X}$ is singular and the coefficients have no unique estimates.
> - Dropping one indicator, or the intercept, restores a unique fit.
