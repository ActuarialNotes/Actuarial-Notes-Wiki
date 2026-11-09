---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:9277cfe95d9950ddbd253035ad8e5f076140106daa90fc67482ee15b1566e0fd
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §5.1.2-5.1.4 printed pp.202-206 (PDF pp.211-215); §6.1.3 printed p.232 (PDF p.240); §6.5.3 lab printed p.271 (PDF p.279), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §4.3.1 Train and Test PDF p.50; §4.3.4 Cross Validation PDF pp.51-52, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cross-Validation.md
---

![[Media/Figures/Cross-Validation.svg|340]]

**Cross-Validation** is a method of estimating the [[Test Error|test error]] of a model by fitting the model to part of the data and computing its error on the observations that were held out of the fit. It is used to choose between models, between values of a tuning parameter, or between procedures such as credibility procedures. The one with the smallest error on the held-out observations, such as the smallest sum of squared errors, is chosen.

## Validation set approach

The validation set approach splits the observations at random into a training set and a validation set, often of about equal size. The model is fitted to the training set, and the error on the validation set estimates the test error. A different random split gives a different estimate. The model is fitted to only part of the data, so the estimate tends to overstate the test error of the model fitted to all the data.

## Leave-one-out cross-validation

Leave-one-out cross-validation (LOOCV) fits the model $n$ times, each time to all the observations but one, and computes the error on the one observation left out. The LOOCV estimate of the test mean squared error is

> $$\text{CV}_{(n)} = \frac{1}{n}\sum_{i=1}^{n}\left(y_i - \hat{y}_{(i)}\right)^{2}$$

- $\hat{y}_{(i)}$ is the prediction for observation $i$ from the model fitted without observation $i$.

The prediction for each observation must come from the fit that left it out. LOOCV involves no random split, so it gives the same estimate every time it is run on the same data. For a least squares linear regression, the $n$ fits are not needed, because the LOOCV estimate can be computed from the one fit to all the data:

> $$\text{CV}_{(n)} = \frac{1}{n}\sum_{i=1}^{n}\left(\frac{y_i - \hat{y}_i}{1 - h_i}\right)^{2}$$

- $\hat{y}_i$ is the fitted value of observation $i$ from the fit to all the data.
- $h_i$ is the leverage of observation $i$, the $i$th diagonal element of the [[Hat Matrix|hat matrix]].

> [!example]- A least squares line fitted to $x = 1, 2, 3, 4$ and $y = 3, 7, 6, 10$ is $\hat{y} = 1.5 + 2x$, and the leverages are 0.7, 0.3, 0.3 and 0.7. What are the training MSE and the LOOCV estimate of the test MSE? {Example}
> - The fitted values are 3.5, 5.5, 7.5 and 9.5, so the residuals are $-0.5$, $1.5$, $-1.5$ and $0.5$.
> - The training MSE is $(0.25 + 2.25 + 2.25 + 0.25)/4 = 1.25$.
> - Dividing each residual by $1 - h_i$ gives $-1.667$, $2.143$, $-2.143$ and $1.667$.
> - The LOOCV estimate is $\left[2(1.667)^2 + 2(2.143)^2\right]/4 = 3.68$.

## $k$-fold cross-validation

$k$-fold cross-validation divides the observations at random into $k$ folds of about equal size. The model is fitted $k$ times, each time holding out one fold as the validation set and fitting to the other $k - 1$ folds. Each observation is in exactly one fold, so it is in the validation set once and in the training set $k - 1$ times. The $k$-fold estimate of the test mean squared error is

> $$\text{CV}_{(k)} = \frac{1}{k}\sum_{j=1}^{k} \text{MSE}_j$$

- $\text{MSE}_j$ is the mean squared error on fold $j$ of the model fitted to the other folds.

Each training set holds the fraction $(k - 1)/k$ of the data. LOOCV is the special case $k = n$. The usual choices are $k = 5$ and $k = 10$, which need only 5 or 10 fits instead of $n$.

> [!example]- Five candidate models have 10-fold cross-validated MSEs of 530, 430, 395, 415 and 470, and training MSEs of 520, 410, 350, 320 and 305. Which model is chosen? {Example}
> - The training MSE falls with every added term, so it cannot choose between the models.
> - The cross-validated MSE is smallest for model 3, at 395.
> - Model 3 is chosen. Models 4 and 5 have lower training MSEs but higher cross-validated MSEs, because they overfit.

## Bias and variance of the estimates

| | LOOCV | $k$-fold, $k = 5$ or $10$ |
| --- | --- | --- |
| Model fits | $n$ | $k$ |
| Bias | Lowest, because each fit uses $n - 1$ observations | Larger, because each fit uses $(k - 1)/k$ of the data |
| Variance | Higher, because the $n$ training sets are nearly identical | Lower, because the training sets overlap less |

A model fitted to fewer observations tends to fit worse, so a smaller $k$ gives an estimate with more upward bias. The $n$ fitted models of LOOCV are nearly the same, so their errors are highly positively correlated, and the mean of highly correlated quantities has a high variance. $k$-fold cross-validation with $k = 5$ or $10$ balances the two.

## Cross-validating a whole procedure

Every step that uses the response must be repeated inside each fold, including the selection of predictors, the choice of a penalty and the encoding of a variable by its response. If a step uses the held-out observations, their response has leaked into the fit, and the cross-validated error is too low. This is called leakage. For example, a target encoding of a categorical variable must be computed for each fold from the other folds only, which is called out-of-fold encoding. Cross-validation can also check the stability of a model, by comparing the coefficient estimates fitted to the different sets of $k - 1$ folds.

> [!trap] Selecting predictors before cross-validating
> An analyst who picks the 10 predictors most correlated with the response from all the data, and then cross-validates a model on those 10, has already used the held-out folds. The selection must be repeated within each fold, from that fold's training observations only.
