---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:9f15b25610a6806b9f952ce7129e97a5b9f680d6df3118540b2a2275208609b8
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §6.1.3 eq (6.2) Cp with σ̂² from the full model, AIC display, footnote 4 (two least-squares formulas, log(RSS) form), pp.233-234 (PDF 241-242), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/AIC.md
---

![[Media/Figures/AIC.svg|340]]

The **AIC**, or Akaike information criterion, is a measure for comparing models fitted by [[Maximum Likelihood Estimation|maximum likelihood]] that penalizes the maximized log-likelihood for the number of parameters. For a model with maximized log-likelihood $l$ and $k$ estimated parameters, the AIC is

> $$\text{AIC} = -2l + 2k$$

- $k$ counts every estimated parameter, including the intercept.

The model with the lowest AIC is preferred. The models compared need not be nested, which is the case a [[Likelihood Ratio Test|likelihood ratio test]] cannot handle. They must be fitted to the same data, meaning the same observations of the same response. A model for $\ln Y$ cannot be compared with a model for $Y$. Information criteria such as the AIC estimate how far a model is from the true distribution, measured by the Kullback-Leibler divergence.

> [!example]- A Poisson GLM with an intercept and 3 predictors has maximized log-likelihood $-120$. A Poisson GLM with an intercept and 1 predictor, fitted to the same data, has $-124$. Which model has the lower AIC? {Example}
> - The first model has $k = 4$ parameters, so its AIC is $-2(-120) + 2(4) = 248$.
> - The second model has $k = 2$ parameters, so its AIC is $-2(-124) + 2(2) = 252$.
> - The first model has the lower AIC, so its better fit outweighs its two extra parameters.

The number of parameters can be recovered from the AIC and the log-likelihood, $k = (\text{AIC} + 2l)/2$. A model with AIC 250.4 and log-likelihood $-121.2$ has $k = (250.4 - 242.4)/2 = 4$ parameters.

## AIC in terms of the deviance

For models fitted to the same data, $-2l$ differs from the scaled [[Deviance|deviance]] $D^*$ by the same constant, $-2l_{\text{sat}}$. Models can therefore be compared with the deviance in place of $-2l$, by the value of

> $$D^* + 2k$$

The lowest value of $D^* + 2k$ picks the same model as the lowest AIC.

## AIC for least squares

For a linear model with normal errors fitted by least squares with $p$ predictors, the AIC is, up to a constant,

> $$\text{AIC} = \frac{1}{n}\left(\text{RSS} + 2p\,\hat{\sigma}^2\right)$$

- $\text{RSS}$ is the [[Residual Sum of Squares|residual sum of squares]] of the model.
- $\hat{\sigma}^2$ is the estimate of the error variance from the full model containing all the predictors, used for every model compared.

> [!example]- Regressions are fitted to 50 observations. The full model has residual standard error 2. Model A has 2 predictors and $\text{RSS} = 230$, and model B has 4 predictors and $\text{RSS} = 210$. Which has the lower AIC? {Example}
> - The error variance estimate is $\hat{\sigma}^2 = 2^2 = 4$, used for both models.
> - Model A has $\text{AIC} = \frac{230 + 2(2)(4)}{50} = 4.92$.
> - Model B has $\text{AIC} = \frac{210 + 2(4)(4)}{50} = 4.84$.
> - Model B has the lower AIC, because its extra predictors lower the RSS by 20, more than the 16 they add to the penalty.

## AIC for a Bayesian model

In Exam MAS-II's Bayesian models, the deviance is $-2$ times the log pointwise predictive density, the sum over observations of the logarithm of each observation's posterior predictive likelihood:

> $$D = -2\sum_{i=1}^{n} \ln p(y_i)$$

- $p(y_i)$ is the posterior predictive likelihood of observation $i$.

The AIC adds a penalty for the effective number of parameters $k$, $\text{AIC} = D + 2k$. A lower deviance is a better fit to the data, and a lower AIC is a better model once overfitting is penalized.

> [!example]- Model $q$ has 3 effective parameters and posterior predictive likelihoods 0.20, 0.30 and 0.25 for three observations. Model $r$ has 5 effective parameters and likelihoods 0.22, 0.33 and 0.27. Which has the lower deviance, and which the lower AIC? {Example}
> - Model $q$ has deviance $-2(\ln 0.20 + \ln 0.30 + \ln 0.25) = 8.399$ and AIC $8.399 + 2(3) = 14.399$.
> - Model $r$ has deviance $-2(\ln 0.22 + \ln 0.33 + \ln 0.27) = 7.864$ and AIC $7.864 + 2(5) = 17.864$.
> - Model $r$ has the lower deviance, but model $q$ has the lower AIC, so model $q$ is preferred once overfitting is penalized.
