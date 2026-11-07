---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:6ae7d78141ab1eb17ee55940ddd0263508c1701ac6b7aecff78205e44ead1118
  sources:
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 11 §11.2 yhat = Xb = Hy, yhat_i = h_i1 y_1 + ... + h_in y_n, sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11.html"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1 normal equations X'X b = X'y; §2.9.1 fitted values and residuals, PDF pp.6, 49, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.4 'Poisson Models for Count Data', §4.2.1 estimating equations X'y = X'mu-hat for canonical links (Poisson log, binomial logit, normal identity) reproduce totals and factor margins; §4.3.2 offset = log exposure in the linear predictor, PDF pp.6-7, 10, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.2 mu-hat = g^-1(eta-hat), PDF p.4, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (rev. June 2016), 'Canonical Link Function' pp.2-3, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.2.2 'Three: Model Fit' R² = Cor(Y, Yhat)², printed p.79 (PDF p.89); §2.2.1 and §6.1.1 training vs test error, printed pp.29-33, 227; §4.6/4.7 lab predict(type = \"response\") vs the logit, printed p.173 (PDF p.183), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Bates, Mächler, Bolker & Walker, 'Fitting Linear Mixed-Effects Models Using lme4' (lme4 vignette, J. Stat. Softw. 2015), eqs (1)-(2) pp.2-3 and predict() re.form, sha256:60474d07bdb3a511f804a6cd2e73494fd8eb5713f532e2382f69c5dea2e8782e — https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fitted Values.md
---

**Fitted Values** are a model's estimates of the mean response at the predictor values of the observations it was fitted to. In a [[Linear Regression|linear regression]] with estimated coefficients $\hat\beta_0, \ldots, \hat\beta_p$, the fitted value of observation $i$ is

> $$\hat{y}_i = \hat\beta_0 + \hat\beta_1 x_{i1} + \cdots + \hat\beta_p x_{ip}$$

- $x_{ij}$ is the value of predictor $j$ for observation $i$.

The difference between an observation and its fitted value is its [[Residual|residual]], $e_i = y_i - \hat{y}_i$.

> [!example]- A simple regression gives the fitted line $\hat{y} = 25.8 + 1.6x$. An observation has $x = 15$ and $y = 52$. What are its fitted value and its residual? {Example}
> - The fitted value is the line's value at $x = 15$: $\hat{y} = 25.8 + 1.6(15) = 49.8$.
> - The residual is $52 - 49.8 = 2.2$.

## Fitted values in matrix form

For all $n$ observations at once, the vector of fitted values is

> $$\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol\beta}$$

- $\mathbf{X}$ is the [[Design Matrix|design matrix]] and $\hat{\boldsymbol\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ is the [[Ordinary Least Squares|least squares]] estimate.

Equivalently, $\hat{\mathbf{y}} = \mathbf{H}\mathbf{y}$, where $\mathbf{H}$ is the [[Hat Matrix|hat matrix]], so each $\hat{y}_i = \sum_j h_{ij}\, y_j$ is a weighted combination of all the responses.

> [!example]- The design matrix has rows $(1, 1)$, $(1, 2)$ and $(1, 3)$, and the estimates are $\hat\beta_0 = 0.3333$ and $\hat\beta_1 = 1.5$. What are the fitted values? {Example}
> - Each fitted value is a row of $\mathbf{X}$ times $\hat{\boldsymbol\beta}$.
> - The fitted values are $0.3333 + 1.5 = 1.8333$, $0.3333 + 3 = 3.3333$ and $0.3333 + 4.5 = 4.8333$.

## Fitted values of a generalized linear model

In a [[Generalized Linear Model|generalized linear model]] with [[Link Function|link function]] $g$, the fitted mean of observation $i$ is

> $$\hat\mu_i = g^{-1}(\hat\eta_i)$$

- $\hat\eta_i = \hat\beta_0 + \hat\beta_1 x_{i1} + \cdots + \hat\beta_p x_{ip}$ is the fitted linear predictor, including any [[Offset Variable|offset]].
- $g^{-1}$ is the inverse of the link function.

$\hat\eta_i$ is the fitted value on the link scale and $\hat\mu_i$ is the fitted value on the response scale. With a log link, $\hat\mu_i = e^{\hat\eta_i}$, so the log of a fitted mean is the sum of the intercept and the coefficients that apply to the observation. Taking logs of fitted means and differencing them therefore recovers the coefficients.

> [!example]- A Poisson model with a log link has $\hat\eta = \ln(\text{exposure}) - 2.0 + 0.4\,I_{\text{urban}}$. What is the fitted claim count of a rural policy with 0.5 years of exposure and of an urban policy with 1 year? {Example}
> - For the rural policy, $\hat\eta = \ln 0.5 - 2.0 = -2.6931$, so $\hat\mu = e^{-2.6931} = 0.0677$.
> - For the urban policy, $\hat\eta = \ln 1 - 2.0 + 0.4 = -1.6$, so $\hat\mu = e^{-1.6} = 0.2019$.

> [!example]- A log-link model with two indicators, $R$ and $F$, and their interaction has fitted means 0.10 for the base cell, 0.15 when only $R = 1$, 0.12 when only $F = 1$ and 0.24 when both are 1. What is the interaction coefficient? {Example}
> - With a log link, $\ln \hat\mu$ is the intercept plus the coefficients that apply to the cell.
> - The interaction coefficient is what the cell with both indicators adds beyond the two separate effects:
>
> $$\hat\beta_{RF} = \ln \hat\mu_{RF} - \ln \hat\mu_R - \ln \hat\mu_F + \ln \hat\mu_{\text{base}}$$
>
> - The coefficient is $\ln \frac{0.24 \times 0.10}{0.15 \times 0.12} = \ln 1.3333$, which is $0.2877$.
