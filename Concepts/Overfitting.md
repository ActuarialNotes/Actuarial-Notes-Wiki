---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:1aeebc0ede955f77d018012dd18ae0eedc0ca4db092331415bab88f96a33990c
  sources:
    - "Van Calster, McLernon, van Smeden, Wynants & Steyerberg, 'Calibration: the Achilles heel of predictive analytics', BMC Medicine 17:230 (2019): slope < 1 means estimated risks too extreme (too high for high risk, too low for low risk); overfitted algorithms give predicted risks that are too extreme on new data; penalized regression (Ridge, Lasso) to prevent overfitting — https://pmc.ncbi.nlm.nih.gov/articles/PMC6912996/"
    - "Goldburd et al., CAS Monograph 5, 2nd ed., §7.1 printed p.76 (actual vs predicted on holdout data; sort by prediction, buckets of equal aggregate weight, averages of actual and predicted per bucket) and §7.2.1 printed p.77 (quantile plots: quintiles, deciles, vigintiles), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Overfitting.md
---

**Overfitting** is fitting a model so closely to its training data that it follows the noise in that sample as well as the signal, so that it predicts new observations worse than a simpler model would. James et al. (ISLR, §2.2.1) describe it as a method that yields a small training [[Mean Square Error|MSE]] but a large [[Test Error|test MSE]], and they reserve the word for the case in which a less flexible model would have given a smaller test MSE. It is the high-variance end of the [[Bias-Variance Tradeoff|bias-variance tradeoff]].

> $$\text{MSE}_{\text{train}} = \frac{1}{n}\sum_{i=1}^{n}\left(y_i - \hat{f}(x_i)\right)^2$$

> $$\text{MSE}_{\text{train}}(B) < \text{MSE}_{\text{train}}(A)$$

> $$\text{MSE}_{\text{test}}(B) > \text{MSE}_{\text{test}}(A)$$

- **Symbols:** $\hat{f}$ is fitted to the $n$ training observations, and the test MSE averages the same squared error over observations that were not used in the fit. Model $B$ is more flexible than model $A$, and it overfits when both inequalities hold. Flexibility means the number of coefficients, the number of leaves of a [[Regression Tree|tree]], the degrees of freedom of a [[Smoothing Spline|spline]], or a small $K$ in [[K-Nearest Neighbors|K-nearest neighbors]].
- **Why it happens:** Training MSE falls every time flexibility is added, because a model with as many free parameters as observations can reproduce them exactly. Test MSE is U-shaped instead: past the minimum, each added parameter fits errors $\varepsilon_i$ that belong to this sample only and will not recur, so the variance of $\hat{f}$ rises by more than its squared bias falls.
- **Detecting it:** Overfitting shows only on data the fit did not use, so it is measured with a held-out [[Train-Test Split|validation set]], [[Cross-Validation|$k$-fold cross-validation]] or the [[Out-of-Bag Error|out-of-bag error]] of a bagged model. The signature is a validation or CV error that turns upward as flexibility keeps rising while the training error keeps falling.
- **Actual against predicted on holdout data:** Sort the holdout records by predicted value, group them into buckets of equal weight (quintiles, deciles), and compare the average actual with the average predicted in each. Actual-to-predicted ratios that run from above 1 in the lowest-predicted buckets to below 1 in the highest mean the predictions are too extreme: too low where the model predicts low and too high where it predicts high, so the model predicts more variation between risks than the new data show. That is what an overfit model is expected to produce, and penalized regression (ridge or lasso), which shrinks the coefficients, is one way to prevent it.
- **Remedies:** Each remedy lowers the variance of the fit: [[Tree Pruning|pruning]] removes leaves, [[Variable Selection|variable selection]] removes predictors, [[Regularization|regularization]] shrinks coefficients, [[Bagging|bagging]] and [[Random Forest|random forests]] average many trees, and more data reduces the variance of every estimate. The strength of each remedy (the pruning penalty $\alpha$, the penalty $\lambda$, the number of predictors) is itself a [[Hyperparameter|hyperparameter]] chosen by cross-validation.

> [!example]- A Tree with One Leaf per Claim {Example}
> The true mean claim severity is \$12,000 at every vehicle age, but the analyst does not know this. Four training claims (in thousands) are $(x, y) = (1, 10), (2, 14), (3, 9), (4, 15)$, where $x$ is the vehicle age. Model A predicts the training mean for every claim. Model B is a [[Regression Tree|regression tree]] grown until each leaf holds one claim, so a new claim is predicted by the training claim nearest to it in age. Four new claims are $(1.2, 13), (2.2, 10), (2.8, 12), (3.9, 11)$. Compare the training and test MSE of the two models.
>
> > [!answer]-
> > Model B reproduces each training claim, so its training MSE is 0. Model A predicts $\bar{y} = 12$, with training errors $-2, 2, -3, 3$. On the new claims, model B predicts $10, 14, 9, 15$ and model A predicts 12 throughout.
> > $$
> > \begin{align*}
> > \text{MSE}_{\text{train}}(A) &= \frac{4 + 4 + 9 + 9}{4} \\
> > &= 6.5 \\
> > \text{MSE}_{\text{test}}(A) &= \frac{1 + 4 + 0 + 1}{4} \\
> > &= 1.5 \\
> > \text{MSE}_{\text{test}}(B) &= \frac{9 + 16 + 9 + 16}{4} \\
> > &= 12.5
> > \end{align*}
> > $$
> > Model B fits the training claims perfectly and predicts the new claims more than eight times worse than the flat model. Every split it made chased a random deviation from \$12,000, and those deviations did not repeat in the new data.

> [!example]- Which Severity Model Overfits? {Example}
> Three severity models enter driver age in increasingly flexible ways. Model A uses a linear term, model B a spline with 6 degrees of freedom and model C a spline with 25 degrees of freedom. Their training MSEs are 410, 360 and 250, and their MSEs on a hold-out set are 450, 400 and 470. Which of the three overfit, by ISLR's definition?
>
> > [!answer]-
> > Model C overfits. Its training MSE is the lowest, but a less flexible model, B, has a smaller hold-out MSE ($400 < 470$); C is even worse than the straight line A. Model B does not overfit, even though its hold-out MSE exceeds its training MSE by 40. The only less flexible model, A, predicts worse ($450 > 400$), and a test error above the training error is expected of almost every model. Model A underfits, because B shows that a curve in driver age predicts better than a line. B has the lowest hold-out MSE of the three and is the model to choose.

> [!tip]- How it appears on the exam
> - **SRM** sets multiple-choice statements on how training and test error move as flexibility increases, and on which settings reduce overfitting: a larger pruning penalty $\alpha$, a larger $\lambda$, a larger $K$, or fewer boosting iterations. Its decision-tree objective asks how trees are pruned to mitigate overfitting.
> - **Reading curves and tables:** A question may give training and test (or CV) errors for a sequence of models and ask which model to choose, which ones overfit, or where the bias-variance balance lies.
> - **PA** asks for written explanations: why the chosen tree was pruned to its size, why a penalty was applied, or why the hold-out error, rather than the training error, justifies the final model.
> - **ATPA** lists starting with too many variables and the repeated use of train/test/validate sets among the effects to recognize and mitigate; both are routes to overfitting.

> [!warning]- Exam traps
> - **A gap is not proof:** Training error below test error does not by itself mean the model overfits. Almost every model has this gap; overfitting means a less flexible model would have predicted better.
> - **Training error as a guide:** Choosing the model with the smallest training error always picks the most flexible one. Only error on data not used in the fit can show overfitting.
> - **Direction of the penalties:** A larger $\alpha$, $\lambda$ or $K$ makes the model less flexible and less prone to overfit. Reading them the other way round reverses every conclusion.
> - **More trees:** Adding trees does not overfit [[Bagging|bagging]] or a [[Random Forest|random forest]], because each tree is fitted on its own and more trees only steady their average. Too many trees can overfit [[Boosting|boosting]], because each new tree fits the residuals of the last.
> - **More data cures variance, not bias:** A larger sample shrinks the variance of an overfit model, but it does not help a model that underfits, whose error comes from bias.
