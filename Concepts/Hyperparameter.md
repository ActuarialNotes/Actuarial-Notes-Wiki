---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e3e5795c1615bdbc6e4df8590fbd5128b07a4d8da025e9df86ccfe2a470a06f9
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

A **hyperparameter** is a setting fixed *before* a model is fitted that controls how the fitting works — usually how flexible the model may become — such as the penalty $\lambda$ in [[Regularization|regularized regression]], the pruning penalty $\alpha$ of a [[Decision Tree]] or the number of predictors $m$ tried at each split of a [[Random Forest]]. Unlike a parameter ($\beta_j$, a split point), it is not estimated by minimizing training error, because training error always favours the most flexible setting; it is chosen by estimating [[Test Error|test error]], usually by [[Cross-Validation]].

> $$\hat{\lambda} = \arg\min_{\lambda}\ \text{CV}_{(k)}(\lambda)$$
>
> $$\text{CV}_{(k)}(\lambda) = \frac{1}{k}\sum_{j=1}^{k}\text{MSE}_j(\lambda)$$
>
> $$\hat{\lambda}_{\text{1SE}} = \max\left\{\lambda : \text{CV}(\lambda) \le \text{CV}(\hat{\lambda}) + \text{SE}(\hat{\lambda})\right\}$$

- $\text{MSE}_j(\lambda)$ is the error on fold $j$ of a model fitted to the other $k-1$ folds at that $\lambda$ (deviance or error rate for a GLM or classifier). The **one-standard-error rule** takes the simplest model whose CV error is within one standard error of the minimum — for a penalty, the *largest* such $\lambda$. After tuning, the model is refit on all the training data at the chosen value.
- **SRM's tree ensembles** ([[Tree Ensemble]]): [[Bagging]] — the number of trees $B$, which is not critical, since a large $B$ does not overfit; random forests — $B$ and $m$, typically $m \approx \sqrt{p}$ ($m = p$ is bagging); [[Boosting]] — $B$ (too many trees *can* overfit, so it is cross-validated), the shrinkage $\lambda$ (small, such as $0.01$ or $0.001$, needing a larger $B$) and the interaction depth $d$ ($d = 1$, stumps, often works well).
- **Regularized regression** (PA): ridge and lasso tune $\lambda$, after standardizing the predictors; the elastic net also tunes the mixing weight — `alpha` in R's `glmnet`, where `alpha = 1` is the lasso and `alpha = 0` ridge.
- Each hyperparameter moves the model along the [[Bias-Variance Tradeoff]]: a larger $\lambda$ or $\alpha$, a smaller $d$ or a larger $K$ in [[K-Nearest Neighbors]] means less flexibility, more bias and less variance.

> [!example]- Choosing the Lasso Penalty for a Frequency GLM {Example}
> A Poisson lasso for auto claim frequency is fitted over a grid of $\lambda$. Ten-fold CV gives:
>
> | $\lambda$ | CV deviance | SE | Nonzero coefficients |
> |---|---|---|---|
> | $0.001$ | $104.8$ | $2.3$ | $18$ |
> | $0.01$ | $102.1$ | $2.2$ | $14$ |
> | $0.05$ | $101.0$ | $2.0$ | $9$ |
> | $0.10$ | $102.6$ | $2.1$ | $6$ |
> | $0.20$ | $104.3$ | $2.4$ | $4$ |
> | $0.50$ | $109.5$ | $2.8$ | $2$ |
>
> Find the $\lambda$ chosen by minimum CV error and by the one-standard-error rule.
>
> > [!answer]-
> > The minimum is $101.0$ at $\lambda = 0.05$. For the one-standard-error rule:
> >
> > $$
> > \begin{align*}
> > \text{threshold} &= 101.0 + 2.0 \\
> > &= 103.0
> > \end{align*}
> > $$
> >
> > The values of $\lambda$ with CV deviance at most $103.0$ are $0.01$, $0.05$ and $0.10$; the rule takes the largest, $\lambda = 0.10$ ($102.6 \le 103.0$, while $\lambda = 0.20$ gives $104.3$).
> >
> > Minimum CV picks $\lambda = 0.05$ with $9$ rating variables; the one-standard-error rule picks $\lambda = 0.10$ with $6$ — a model statistically indistinguishable in predictive accuracy and easier to file and explain.

> [!example]- Hyperparameters of a Severity Forest and a Boosted Model {Example}
> A modeller has $p = 12$ predictors. (a) What $m$ would a random forest typically use for a classification of large losses, and what is the model with $m = 12$? (b) For boosted trees, which of $B$, $\lambda$ and $d$ can cause overfitting if set too large, and what happens to the required $B$ if $\lambda$ is cut from $0.1$ to $0.01$?
>
> > [!answer]-
> > (a) $m \approx \sqrt{12} = 3.46$, so $3$ or $4$ predictors per split. With $m = 12 = p$ every predictor is available at every split: that is **bagging**, and its trees are more correlated, so averaging them reduces variance less.
> >
> > (b) **$B$**: boosting fits each tree to the current residuals, so too many trees overfit — unlike bagging and random forests. **$d$**: deeper trees fit higher-order interactions and more variance. A *larger* $\lambda$ learns faster and can overfit with fewer trees. Cutting $\lambda$ tenfold slows learning, so a much larger $B$ is needed to reach the same fit; $B$ and $\lambda$ are tuned together.

> [!tip]- How it appears on the exam
> - **SRM** (multiple choice): describe bagging, boosting and random forests and the hyperparameters used to control them — true/false statements on $B$, $m$, $\lambda$ and $d$ and what happens as each grows.
> - **SRM**: read a CV error curve or table and pick the tuning value, often paired with the [[Tree Pruning|pruning]] penalty $\alpha$ or a ridge/lasso $\lambda$.
> - **PA** (written): select appropriate hyperparameters for regularized regression — justify $\lambda$ (and the elastic-net mix) from CV output, minimum versus one-standard-error, and explain the effect on the coefficients.

> [!warning]- Exam traps
> - **Hyperparameter vs parameter.** Coefficients and split points are estimated from the training data; $\lambda$, $\alpha$, $m$, $B$, $d$ are not. Calling the lasso coefficients "hyperparameters" is wrong.
> - **Tuning on the test set.** Choosing $\lambda$ by test-set error and then reporting that error as the model's performance is optimistic — the test set has been used to fit. Tune by CV on the training data; touch the test set once.
> - **Direction of the penalty.** A *larger* $\lambda$ means a simpler model. The one-standard-error rule therefore moves to the right of the minimum in $\lambda$, not to the left.
> - **$B$ behaves differently.** Large $B$ is harmless for bagging and random forests but can overfit boosting.
> - **Two alphas.** `glmnet`'s `alpha` is the ridge–lasso mixing weight; the $\alpha$ of cost-complexity pruning is a penalty per terminal node.
