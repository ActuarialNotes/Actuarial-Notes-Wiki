---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:65870d62959694ed91fa5b56f67461ab7f3b76c5d7ac19520be99baff5bb4d1c
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §6 intro printed p.226 (PDF p.234); §6.1.1-6.1.3 printed pp.227-234 (PDF pp.235-242); §6.2.2 printed pp.241-242, 247 (PDF pp.249-250, 255), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5 variable-selection considerations (regulatory requirements) PDF p.57; §6.2.1-6.2.2 PDF pp.75-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-I Fall 2018, Q39 — official exam paper (scan), PDF p.43; Final Answer Key PDF p.50 (B), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variable Selection.md
---

![[Media/Figures/Variable_Selection.svg|340]]

**Variable Selection** is the choice of which of the $p$ available predictors a model includes, so that the fitted model leaves the other predictors out entirely and their coefficient estimates are exactly 0. Removing irrelevant predictors gives a simpler model that is easier to interpret, and it reduces the variance of the fit, which can improve its predictions. Leaving out important predictors makes the model underfit. Subset selection fits models on chosen subsets of the predictors, and the [[Regularization#The lasso|lasso]] selects predictors as part of its fit by setting some coefficients exactly to 0. Ridge regression shrinks the coefficients but never sets one exactly to 0, and [[Principal Components Regression|principal components regression]] and [[Partial Least Squares|partial least squares]] use every predictor, so none of these three selects variables.

## Best subset selection

Best subset selection fits a model for every subset of the $p$ predictors:

1. For each size $k = 1, 2, \ldots, p$, fit all the models with exactly $k$ predictors, and keep the one with the smallest RSS, or the largest $R^2$.
2. Choose among the best models of each size, and the null model with no predictors, by cross-validated error, $C_p$, [[AIC]], [[BIC]] or adjusted $R^2$.

Each predictor is either in or out of a model, so the number of models best subset selection fits is

> $$2^p$$

## Forward stepwise selection

Forward stepwise selection starts with the null model, which has only an intercept. At each step it fits every model that adds one of the unused predictors to the current model, and it adds the predictor of the best of these models, the one with the smallest RSS or the largest $R^2$. Predictors already in the model stay in, so the models are nested, one of each size. Without a stopping rule the steps continue until all $p$ predictors are in the model, and the p-values of individual predictors play no part in the steps. The final model is chosen among the sizes as in best subset selection. Step $k$ fits $p - k$ models, for $k = 0, 1, \ldots, p - 1$, so with the null model the number of models forward stepwise selection fits is

> $$1 + \frac{p(p+1)}{2}$$

Forward stepwise selection may miss the best model of a given size, because it must keep every predictor it has already added. Best subset selection searches every model, so the model it chooses has an AIC no higher than the model chosen by a stepwise method.

> [!example]- How many models do best subset selection and forward stepwise selection fit with $p = 10$ predictors? {Example}
> - Best subset selection fits $2^{10} = 1{,}024$ models.
> - Forward stepwise selection fits $1 + 10(11)/2 = 56$ models.

## Backward stepwise selection

Backward stepwise selection starts with the full model, which has all $p$ predictors and needs $n > p$. At each step it removes the one predictor whose removal leaves the model with the smallest RSS, or the largest $R^2$, so the models are again nested, one of each size. It fits the same number of models as forward stepwise selection. When predictors are removed by significance, as in fitting a [[Generalized Linear Model|GLM]], only one is removed at a time, the one with the highest p-value, and the model is refitted before the next is considered.

## Comparing models of different sizes

$R^2$ never decreases and the RSS and the [[Deviance|deviance]] never increase when a predictor is added, so they compare only models with the same number of parameters. Models of different sizes are compared by a criterion that penalizes the number of parameters, and the model with the lowest criterion is preferred:

> $$\text{AIC} = -2l + 2k$$

> $$\text{BIC} = -2l + k \ln n$$

- $l$ is the maximized log-likelihood of the model.
- $k$ is the number of parameters.

When $\ln n > 2$, which is when $n \ge 8$, BIC penalizes each parameter more heavily than AIC, so BIC chooses a model with no more predictors than AIC. BIC can therefore leave out predictive variables, and AIC is generally considered more reliable for the large data sets of insurance.

> [!example]- Model 1 for claim frequency has 5 parameters and log-likelihood $-2{,}040$. Model 2 adds 2 parameters and has log-likelihood $-2{,}037$. Which model does AIC prefer? {Example}
> - The AIC of model 1 is $-2(-2{,}040) + 2(5) = 4{,}090$.
> - The AIC of model 2 is $-2(-2{,}037) + 2(7) = 4{,}088$.
> - Model 2 has the lower AIC, so AIC prefers model 2.

## Tests for including a rating variable

In ratemaking, a variable in a GLM is judged by its statistical significance, the standard errors of its estimates, the consistency of its effect over time and judgment. Under judgment, its fitted relativities should be explainable in direction and size, and it must be practical to collect and acceptable to regulators and the public. A variable that fails the statistical tests is excluded unless there is a judgmental reason to keep it. These tests decide on one variable, and they are different from measures of the fit or [[Lift|lift]] of the whole model.

> [!trap] Comparing models of different sizes by $R^2$ or deviance
> The larger model always has the higher $R^2$ and the lower deviance, so comparing by them always favours adding predictors. Across sizes, compare by AIC, BIC or cross-validated error.
