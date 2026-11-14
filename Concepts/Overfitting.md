---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:5ae85085ae7cc761fcdf6d74a68a8a89074a09e39053a87cec490dbf8b6c19f7
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021; CAS-hosted copy), §2.2.1 printed pp.29-33 (PDF pp.40-44: training MSE falls monotonically, test MSE U-shaped, overfitting defined as small training and large test MSE when a less flexible model would do better); §2.2.2 (bias-variance); §2.2.3 printed p.41 (larger K less flexible); §3.1.2 printed p.66 (more observations, smaller standard error); §5.1 (validation set, CV); §8.1.1 (pruning alpha); §8.2.1-8.2.3 (OOB error; large B does not overfit bagging or random forests; boosting can overfit if B too large), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.3 printed pp.38-39 (noise vs signal; a model that includes noise in its estimates is overfit; holdout testing); §7.1 printed p.76 and §7.2.1 printed p.77 (actual vs predicted on holdout, buckets of equal weight, quantile plots), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Van Calster, McLernon, van Smeden, Wynants & Steyerberg, 'Calibration: the Achilles heel of predictive analytics', BMC Medicine 17:230 (2019): slope < 1 means estimated risks too extreme; overfitted algorithms give predicted risks that are too extreme on new data; penalized regression (Ridge, Lasso) to prevent overfitting — https://pmc.ncbi.nlm.nih.gov/articles/PMC6912996/"
    - "SOA, Exam SRM syllabus, January 2027, outcomes 1c and 4a, pp.2,4, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
    - "SOA, ATPA learning objectives (Jan 2022), outcome (g), p.3, sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf"
    - "SOA, Exam PA syllabus, October 2026, tree outcome 'Construct, prune, and validate regression and classification trees'; regularized regression; written responses, sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Overfitting.md
---

**Overfitting** is fitting a model so closely to its training data that it follows the noise in that sample as well as the signal, so that it predicts new observations worse than a simpler model would. James et al. (ISLR, §2.2.1) describe it as a method that yields a small training [[Mean Square Error|MSE]] but a large [[Test Error|test MSE]], and they reserve the word for the case in which a less flexible model would have given a smaller test MSE. It is the high-variance end of the [[Bias-Variance Tradeoff|bias-variance tradeoff]].

The training MSE of a model $\hat{f}$ fitted to $n$ training observations is

> $$\text{MSE}_{\text{train}} = \frac{1}{n}\sum_{i=1}^{n}\left(y_i - \hat{f}(x_i)\right)^2$$

- $y_i$ and $x_i$ are the response and predictors of training observation $i$.

The test MSE averages the same squared error over observations that were not used in the fit, and it measures how well the model predicts new data. Flexibility means the number of coefficients, the number of leaves of a [[Regression Tree|tree]], the degrees of freedom of a [[Smoothing Spline|spline]], or a small $K$ in [[K-Nearest Neighbors|K-nearest neighbors]].

## Training and test error as flexibility grows

Training MSE falls every time flexibility is added, because a model with as many free parameters as observations can reproduce them exactly. Training error therefore cannot be used to choose among models of different flexibility. Test MSE is U-shaped instead: past the minimum, each added parameter fits errors $\varepsilon_i$ that belong to this sample only and will not recur, so the variance of $\hat{f}$ rises by more than its squared bias falls. Models to the left of the minimum underfit, and models to the right overfit.

> [!example]- How do the training and test MSE of these two severity models compare? {Example}
> The true mean claim severity is \$12,000 at every vehicle age, but the analyst does not know this. Model A predicts the training mean for every claim. Model B is a [[Regression Tree|regression tree]] grown until each leaf holds one claim, so a new claim is predicted by the training claim nearest to it in age. The claims (vehicle age, severity in thousands) are:
>
> | Training claims | New claims |
> | :--- | :--- |
> | (1, 10) | (1.2, 13) |
> | (2, 14) | (2.2, 10) |
> | (3, 9) | (2.8, 12) |
> | (4, 15) | (3.9, 11) |
>
> > [!answer]-
> > - Model B reproduces each training claim, so its training MSE is 0.
> > - Model A predicts $\bar{y} = 12$, with training errors $-2, 2, -3, 3$, so its training MSE is $(4 + 4 + 9 + 9)/4 = 6.5$.
> > - On the new claims, model A predicts 12 throughout, so its test MSE is $(1 + 4 + 0 + 1)/4 = 1.5$.
> > - Model B predicts $10, 14, 9, 15$, so its test MSE is $(9 + 16 + 9 + 16)/4 = 12.5$.
> > - Model B fits the training claims perfectly and predicts the new claims more than eight times worse than the flat model.
> > - Every split it made chased a random deviation from \$12,000, and those deviations did not repeat in the new data.

## Detecting overfitting

Overfitting shows only on data the fit did not use, so it is measured with a held-out [[Train-Test Split|validation set]], [[Cross-Validation|$k$-fold cross-validation]] or the [[Out-of-Bag Error|out-of-bag error]] of a bagged model. The signature is a validation or CV error that turns upward as flexibility keeps rising while the training error keeps falling.

To compare actual with predicted on holdout data, sort the holdout records by predicted value, group them into buckets of equal weight (quintiles, deciles), and compare the average actual with the average predicted in each. Actual-to-predicted ratios that run from above 1 in the lowest-predicted buckets to below 1 in the highest mean the predictions are too extreme. The model then predicts more variation between risks than the new data show, which is what an overfit model is expected to produce.

> [!example]- Which of these three severity models overfit, by ISLR's definition? {Example}
> Three severity models enter driver age in increasingly flexible ways:
>
> | Model | Driver age entered as | Training MSE | Hold-out MSE |
> | :--- | :--- | ---: | ---: |
> | A | linear term | 410 | 450 |
> | B | spline, 6 degrees of freedom | 360 | 400 |
> | C | spline, 25 degrees of freedom | 250 | 470 |
>
> > [!answer]-
> > - Model C overfits. Its training MSE is the lowest, but a less flexible model, B, has a smaller hold-out MSE ($400 < 470$).
> > - Model B does not overfit, even though its hold-out MSE exceeds its training MSE by 40, because the only less flexible model, A, predicts worse ($450 > 400$).
> > - Model A underfits, because B shows that a curve in driver age predicts better than a line.
> > - B has the lowest hold-out MSE of the three and is the model to choose.

## Remedies for overfitting

Each remedy lowers the variance of the fit. [[Tree Pruning|Pruning]] removes leaves, [[Variable Selection|variable selection]] removes predictors and [[Regularization|regularization]] (ridge or lasso) shrinks coefficients. [[Bagging]] and [[Random Forest|random forests]] average many trees, and more data reduces the variance of every estimate. The strength of each remedy (the pruning penalty $\alpha$, the penalty $\lambda$, the number of predictors) is itself a [[Hyperparameter|hyperparameter]] chosen by cross-validation.

A larger $\alpha$, $\lambda$ or $K$ makes the model less flexible and less prone to overfit. Adding trees does not overfit bagging or a random forest, but too many trees can overfit [[Boosting|boosting]], because each new tree fits the residuals of the last.

> [!trap] Reading a gap between training and test error as overfitting
> Training error below test error does not by itself mean the model overfits. Almost every model has this gap; overfitting means a less flexible model would have predicted better.
