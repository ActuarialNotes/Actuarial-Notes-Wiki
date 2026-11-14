---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:9908ec86f3b2134cc9390a2b7fdce49e3671383cdf7443174556e56692c41e06
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021; CAS-hosted copy), §6.1.3 one-standard-error rule printed p.236 (PDF p.244); §6.2.1 standardizing before ridge printed p.239 (PDF p.247); §6.2.3 selecting the tuning parameter by CV and refitting on all observations printed p.250 (PDF p.258); §6.5.2 glmnet alpha=0 ridge, alpha=1 lasso (PDF p.282); §8.1.1 cost-complexity tuning parameter alpha (PDF pp.340-341); §8.2.1-8.2.3 bagging B not critical, m = sqrt(p), m = p is bagging, boosting B can overfit, lambda 0.01 or 0.001, d = 1 stumps (PDF pp.349-355); §2.2.3 larger K less flexible (PDF p.52), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Hastie, Qian & Tay, An Introduction to glmnet (glmnet vignette), elastic net penalty controlled by alpha, alpha=1 lasso (default) to ridge; lambda.1se = most regularized model within one standard error of the minimum, sha256:9a07a4d074261e30547f684d8a6fed9286623a828ffeaa7c43c62f6dc90b7e68 — https://glmnet.stanford.edu/articles/glmnet.html"
    - "scikit-learn User Guide, 3.1 Cross-validation, §3.1 ('hyperparameters' are settings that must be set manually; tuning them on the test set leaks it into the model), sha256:78d7587fa92ba3b3e480c9d841b50fedc14ac29d571ccb319d4068235154f0e2 — https://scikit-learn.org/stable/modules/cross_validation.html"
    - "SOA, Exam SRM syllabus, January 2027, outcome 4c 'Describe bagging, boosting, and random forests and the hyperparameters used to control them', p.4, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
    - "SOA, Exam PA syllabus, October 2026, learning outcome 'Select appropriate hyperparameters for regularized regression'; written responses, sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hyperparameter.md
---

A **Hyperparameter** is a setting fixed *before* a model is fitted that controls how the fitting works, usually how flexible the model may become. Examples are the penalty $\lambda$ in [[Regularization|regularized regression]], the pruning penalty $\alpha$ of a [[Decision Tree|decision tree]] and the number of predictors $m$ tried at each split of a [[Random Forest|random forest]].

Unlike a parameter ($\beta_j$, a split point), a hyperparameter is not estimated by minimizing training error, because training error always favours the most flexible setting. It is chosen by estimating [[Test Error|test error]], usually by [[Cross-Validation|cross-validation]]. With $k$ folds and a grid of values of $\lambda$, the value chosen is

> $$\hat{\lambda} = \arg\min_{\lambda}\ \text{CV}_{(k)}(\lambda)$$

- $\text{CV}_{(k)}(\lambda)$ is the cross-validation error at $\lambda$.

The cross-validation error at $\lambda$ is

> $$\text{CV}_{(k)}(\lambda) = \frac{1}{k}\sum_{j=1}^{k}\text{MSE}_j(\lambda)$$

- $\text{MSE}_j(\lambda)$ is the error on fold $j$ of a model fitted to the other $k-1$ folds at that $\lambda$ (deviance or error rate for a GLM or classifier).

After tuning, the model is refit on all the training data at the chosen value.

Each hyperparameter moves the model along the [[Bias-Variance Tradeoff|bias-variance tradeoff]]. A larger $\lambda$ or $\alpha$, a smaller $d$ in boosting or a larger $K$ in [[K-Nearest Neighbors|K-nearest neighbors]] means less flexibility, more bias and less variance.

## The one-standard-error rule

The **one-standard-error rule** takes the simplest model whose cross-validation error is within one standard error of the minimum. For a penalty that is the *largest* such $\lambda$,

> $$\hat{\lambda}_{\text{1SE}} = \max\left\{\lambda : \text{CV}(\lambda) \le \text{CV}(\hat{\lambda}) + \text{SE}(\hat{\lambda})\right\}$$

- $\text{SE}(\hat{\lambda})$ is the standard error of the cross-validation error at $\hat{\lambda}$.

> [!example]- Which $\lambda$ do minimum CV error and the one-standard-error rule choose for this lasso? {Example}
> A Poisson lasso for auto claim frequency is fitted over a grid of $\lambda$. Ten-fold cross-validation gives:
>
> | $\lambda$ | CV deviance | SE | Nonzero coefficients |
> | ---: | ---: | ---: | ---: |
> | 0.001 | 104.8 | 2.3 | 18 |
> | 0.01 | 102.1 | 2.2 | 14 |
> | 0.05 | 101.0 | 2.0 | 9 |
> | 0.10 | 102.6 | 2.1 | 6 |
> | 0.20 | 104.3 | 2.4 | 4 |
> | 0.50 | 109.5 | 2.8 | 2 |
>
> > [!answer]-
> > - The minimum CV deviance is $101.0$, at $\lambda = 0.05$.
> > - The one-standard-error threshold is $101.0 + 2.0 = 103.0$.
> > - The values of $\lambda$ with CV deviance at most $103.0$ are $0.01$, $0.05$ and $0.10$. At $\lambda = 0.20$ it is $104.3$.
> > - The rule takes the largest, $\lambda = 0.10$, with 6 rating variables against 9 at the minimum.

## Hyperparameters of tree ensembles

SRM asks for the hyperparameters that control the [[Tree Ensemble|tree ensembles]]:

| Method | Hyperparameters |
| :--- | :--- |
| [[Bagging]] | the number of trees $B$ |
| [[Random Forest]] | $B$ and $m$, typically $m \approx \sqrt{p}$ ($m = p$ is bagging) |
| [[Boosting]] | $B$, the shrinkage $\lambda$ and the interaction depth $d$ |

In bagging and random forests $B$ is not critical, since a large $B$ does not overfit. In boosting too many trees *can* overfit, so $B$ is chosen by cross-validation. A small shrinkage, such as $\lambda = 0.01$ or $0.001$, needs a larger $B$, and $d = 1$ (stumps) often works well.

> [!example]- With $p = 12$ predictors, what $m$ does a random forest typically use, and what is the model with $m = 12$? {Example}
> - A random forest typically uses $m \approx \sqrt{12} = 3.46$, so 3 or 4 predictors per split.
> - With $m = 12 = p$ every predictor is available at every split: that is **bagging**.
> - Its trees are more correlated, so averaging them reduces variance less.

## Hyperparameters of regularized regression

Ridge and lasso tune $\lambda$, after standardizing the predictors. The elastic net also tunes the mixing weight, `alpha` in R's `glmnet`, where `alpha = 1` is the lasso and `alpha = 0` ridge. It is a different quantity from the $\alpha$ of cost-complexity pruning, which is a penalty per terminal node.

> [!trap] Tuning on the test set
> Choosing $\lambda$ by test-set error and then reporting that error as the model's performance is optimistic, because the test set has been used to fit. Tune by cross-validation on the training data, and use the test set once.
