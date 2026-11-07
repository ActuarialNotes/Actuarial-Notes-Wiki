---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:00059405eb5d05b268c0a1b0f662cf29f36971fbb882e172aa064ddd577aaba2
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §3.1.2 eq (3.5), Fig. 3.3, pp.63-65 (PDF 73-75), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Linear Regression.md
---

![[Media/Figures/Linear_Regression.svg|340]]

A **Linear Regression** is a model in which a [[Response Variable|response]] $Y$ is a linear function of [[Predictor Variable|predictors]] $x_1, \ldots, x_p$ plus a random error. For observation $i$ of $n$, the multiple linear regression model is

> $$Y_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + \varepsilon_i$$

- $\beta_0$ is the intercept, the expected response when every predictor is zero.
- $\beta_j$ is the expected change in the response for a one-unit increase in $x_j$, holding the other predictors fixed.
- $\varepsilon_i$ is the error, independent of the predictors and of the other errors, with mean $0$ and variance $\sigma^2$.

The coefficients are estimated by [[Ordinary Least Squares|ordinary least squares]], which gives the estimates $\hat\beta_0, \ldots, \hat\beta_p$. The predicted response at predictor values $x_1, \ldots, x_p$ is

> $$\hat{y} = \hat\beta_0 + \hat\beta_1 x_1 + \cdots + \hat\beta_p x_p$$

At the predictor values of an observation in the data, $\hat{y}_i$ is that observation's [[Fitted Values|fitted value]].

> [!example]- A fitted model is $\hat{y} = 12 + 3x_1 - 2x_2$. What is the predicted response at $x_1 = 4$ and $x_2 = 5$, and what happens to the prediction when $x_2$ increases by 1? {Example}
> - The predicted response is $12 + 3(4) - 2(5) = 14$.
> - The coefficient of $x_2$ is $-2$, so a one-unit increase in $x_2$, with $x_1$ held at 4, lowers the prediction by 2, to 12.

## Simple linear regression

With one predictor, the model is

> $$Y_i = \beta_0 + \beta_1 x_i + \varepsilon_i$$

The intercept $\beta_0$ is the expected value of $Y$ when $x = 0$, not the overall mean of $Y$. The slope $\beta_1$ is the average change in $Y$ for a one-unit increase in $x$. The least squares estimates of $\beta_0$ and $\beta_1$ are given by the [[Ordinary Least Squares#Simple linear regression|simple linear regression formulas]].

> [!example]- A regression of claim severity on driver age, in years, gives $\hat{y} = 4{,}000 - 25x$. What do the intercept and the slope say? {Example}
> - The slope says that expected severity falls by 25 for each additional year of driver age.
> - The intercept is the expected severity at age 0, which lies far outside the data, so it is not the average severity and has no direct meaning here.

## Assumptions of the linear model

The normal linear model assumes:

1. The mean of the response is linear in the coefficients.
2. The errors are independent.
3. The errors have the same variance $\sigma^2$ at every value of the predictors.
4. The errors are normally distributed.

A [[Residual Plot|residual plot]] checks the first and third assumptions, and a [[QQ Plot|QQ plot]] checks the fourth. Under these assumptions the least squares estimates are the [[Maximum Likelihood Estimation|maximum likelihood estimates]], and the model is the [[Generalized Linear Model|generalized linear model]] with a normal response and the identity [[Link Function|link]].

A normal response can take negative values and has a variance that does not depend on its mean. Claim counts and claim severities are non-negative, and their variance grows with their mean, so they are usually modelled with a generalized linear model instead.

> [!example]- An actuary fits claim counts, mostly 0, 1 or 2, by linear regression on territory and exposure. The residual plot fans out and some fitted values are negative. Which assumptions fail, and what model is better? {Example}
> - The variance of a count grows with its mean, so the constant-variance assumption fails, which is why the residuals fan out.
> - The identity link lets the fitted mean fall below zero, which is impossible for a count.
> - A [[Poisson Regression|Poisson regression]] with a log link fits better: its variance equals its mean, and its fitted means $e^{\hat\eta}$ are always positive.

## Coefficients of transformed predictors

When the model uses $\ln x$ as its predictor, the expected response is

> $$E[Y] = \beta_0 + \beta_1 \ln x$$

- $\beta_1$ is the change in the expected response for a one-unit increase in $\ln x$.

Multiplying $x$ by a factor $c$ adds $\beta_1 \ln c$ to the expected response. When a predictor is standardized, by subtracting its mean and dividing by its standard deviation, its coefficient is the change in the expected response for a one-standard-deviation increase in the original predictor.

> [!example]- A model gives $\hat{y} = 2.0 + 0.8 \ln x$. By how much does the predicted response change when $x$ doubles? {Example}
> - Doubling $x$ adds $\ln 2$ to $\ln x$.
> - The predicted response increases by $0.8 \ln 2 = 0.5545$.

> [!trap] Reading a coefficient without holding the other predictors fixed
> In a multiple regression, $\hat\beta_j$ is the change in the predicted response when $x_j$ increases by one and the other predictors do not change. It is not the change seen when the response is regressed on $x_j$ alone, and the two can differ in size and even in sign when the predictors are correlated.
