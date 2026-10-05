---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:5d59f3e223a9282eeba91f036ffcd2ef4cadf5654e9b9c345fa74cd717669a75
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

The **design matrix** $\mathbf{X}$ is the $n \times (p+1)$ matrix that holds a regression's predictor values: one row per observation, one column per coefficient, with a leading column of ones for the intercept. It turns the model for every observation into one matrix equation, $\mathbf{y} = \mathbf{X}\boldsymbol\beta + \boldsymbol\varepsilon$, and it is the $\mathbf{X}$ in every [[Linear Algebra|linear-algebra]] formula of [[Linear Regression]] and the [[Generalized Linear Model]].

> $$\mathbf{X} = \begin{bmatrix} 1 & x_{11} & \cdots & x_{1p} \\ 1 & x_{21} & \cdots & x_{2p} \\ \vdots & \vdots & & \vdots \\ 1 & x_{n1} & \cdots & x_{np} \end{bmatrix}$$

> $$\hat{\boldsymbol\beta} = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$$

- $x_{ij}$ is the value in column $j$ for observation $i$; $n$ is the number of observations and $p + 1$ the number of coefficients. The second block is the [[Ordinary Least Squares]] estimate, which exists only when $\mathbf{X}^\top\mathbf{X}$ is invertible
- **Columns are coefficients, not variables.** A [[Categorical Predictor|categorical predictor]] with $k$ levels contributes $k - 1$ indicator columns (the omitted level is the base, absorbed into the intercept); an [[Interaction]] contributes the product of its columns; a quadratic term contributes a column of $x^2$
- **Full column rank is required.** If one column is a linear combination of others, $\mathbf{X}^\top\mathbf{X}$ is singular and $\hat{\boldsymbol\beta}$ is not unique. The classic case is the dummy-variable trap — an intercept plus an indicator for *every* level. Near-dependence is [[Multicollinearity]]
- $\mathbf{X}$ also sets the precision of the fit: $\mathrm{Var}(\hat{\boldsymbol\beta}) = \sigma^2(\mathbf{X}^\top\mathbf{X})^{-1}$, so a predictor observed over a wide range gets a tighter coefficient. The [[Hat Matrix]] $\mathbf{H} = \mathbf{X}(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top$ and the [[Fitted Values]] $\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol\beta}$ are both built from it
- A GLM uses the same $\mathbf{X}$ in its linear predictor $\boldsymbol\eta = \mathbf{X}\boldsymbol\beta$. A [[Linear Mixed Model]] has two: $\mathbf{X}$ for the [[Fixed Effects|fixed effects]] and $\mathbf{Z}$, which maps each observation to its group's [[Random Effects|random effects]]
- Software builds $\mathbf{X}$ from the model formula (R's `model.matrix()` prints it). Reading it is the quickest check of which level became the base and how many parameters a term really costs

> [!example]- Building the Matrix for a Rating Model {Example}
> Five policies have vehicle age and territory (A, B or C, with A the base): $(2, \text{A})$, $(5, \text{B})$, $(8, \text{C})$, $(1, \text{B})$, $(4, \text{A})$. Write the design matrix for a model with an intercept, vehicle age and territory. What goes wrong if an indicator for territory A is added as well?
>
> > [!answer]-
> > Columns: intercept, vehicle age, $I_B$, $I_C$.
> > $$
> > \mathbf{X} = \begin{bmatrix} 1 & 2 & 0 & 0 \\ 1 & 5 & 1 & 0 \\ 1 & 8 & 0 & 1 \\ 1 & 1 & 1 & 0 \\ 1 & 4 & 0 & 0 \end{bmatrix}
> > $$
> > It is $5 \times 4$: four coefficients from three variables, leaving $5 - 4 = 1$ residual degree of freedom.
> >
> > Adding $I_A$ makes $I_A + I_B + I_C = 1$ in every row — exactly the intercept column. The five columns have rank $4$, $\mathbf{X}^\top\mathbf{X}$ is singular, and no unique fit exists. Software either refuses or silently drops one column, so always check which level ended up as the base.

> [!example]- An Indicator Coefficient Is a Difference in Means {Example}
> Four claim severities (in $\$000$) are $2$ and $4$ from rural policies and $7$ and $9$ from urban ones. Fit $y = \beta_0 + \beta_1 I_{\text{urban}} + \varepsilon$ by least squares using the matrix formula.
>
> > [!answer]-
> > $\mathbf{X}$ has rows $(1, 0), (1, 0), (1, 1), (1, 1)$ and $\mathbf{y} = (2, 4, 7, 9)^\top$.
> > $$
> > \begin{align*}
> > \mathbf{X}^\top\mathbf{X} &= \begin{bmatrix} 4 & 2 \\ 2 & 2 \end{bmatrix} \\
> > (\mathbf{X}^\top\mathbf{X})^{-1} &= \frac{1}{4}\begin{bmatrix} 2 & -2 \\ -2 & 4 \end{bmatrix} \\
> > \mathbf{X}^\top\mathbf{y} &= \begin{bmatrix} 22 \\ 16 \end{bmatrix} \\
> > \hat{\boldsymbol\beta} &= \frac{1}{4}\begin{bmatrix} 2(22) - 2(16) \\ -2(22) + 4(16) \end{bmatrix} \\
> > &= \begin{bmatrix} 3 \\ 5 \end{bmatrix}
> > \end{align*}
> > $$
> > The intercept $\hat\beta_0 = 3$ is the rural mean severity, $\$3{,}000$, and $\hat\beta_1 = 5$ is the urban mean ($8$) minus the rural mean: urban claims cost $\$5{,}000$ more on average. With a single indicator in the model, its coefficient is simply the difference between the group means.
