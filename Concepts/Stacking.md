---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:03a954960281da55dedc5a48cc2fe025fafd0c1601ccb84b146ecc255e6ddeaa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stacking.md
---

**Stacking**, or stacked generalization, combines several fitted base models through a second model, the meta-model, which is trained on the base models' out-of-fold predictions and learns how much to trust each of them. It aims at a prediction more accurate than any one base model, at a cost in [[Explainability|explainability]].

With $M$ base models $\hat{f}_1, \dots, \hat{f}_M$ and a meta-model $g$, the stacked prediction for a record with features $\mathbf{x}$ is

> $$\hat{y}(\mathbf{x}) = g\big(\hat{f}_1(\mathbf{x}), \dots, \hat{f}_M(\mathbf{x})\big)$$

## Out-of-fold predictions

The training data are split into $K$ folds, as in [[Cross-Validation|cross-validation]], and each base model is fitted $K$ times, each time predicting the fold it left out. Every record then has a prediction from a model that never saw it, which is what the meta-model must learn from. The base models are then refitted on all the training data to score new records.

The common meta-model is a weighted sum of the base models' predictions, with the weights that minimize the squared error over the $n$ training records:

> $$\hat{\mathbf{w}} = \arg\min_{\mathbf{w}} \sum_{i=1}^{n}\Big(y_i - \sum_{m=1}^{M} w_m\, \hat{f}_m^{(-k(i))}(\mathbf{x}_i)\Big)^2$$

- $y_i$ is the actual value for record $i$.
- $\hat{f}_m^{(-k(i))}(\mathbf{x}_i)$ is base model $m$'s prediction for record $i$ from a fit on every fold except fold $k(i)$, the one that contains record $i$.
- $w_m$ is the weight on base model $m$, which Breiman (1996) recommended constraining to be non-negative.

> [!example]- What weight should this meta-model give the GLM, and what does it predict for a new claim? {Example}
> A GLM and a GBM give these out-of-fold predictions of claim severity (in thousands) for five claims. The meta-model is $\hat{y} = w\,a + (1 - w)\,b$, where $a$ is the GLM's prediction and $b$ the GBM's. On a new claim the GLM predicts 6.0 and the GBM 9.0.
>
> | Claim | Actual $y$ | GLM $a$ | GBM $b$ |
> | ---: | ---: | ---: | ---: |
> | 1 | 4 | 2 | 5 |
> | 2 | 9 | 7 | 8 |
> | 3 | 6 | 5 | 4 |
> | 4 | 12 | 11 | 13 |
> | 5 | 3 | 4 | 4 |
>
> > [!answer]-
> > - Setting the derivative of $\sum_i (y_i - b_i - w(a_i - b_i))^2$ to zero gives $w = \sum_i (y_i - b_i)(a_i - b_i) \big/ \sum_i (a_i - b_i)^2$.
> > - The numerator is $3 - 1 + 2 + 2 + 0 = 6$ and the denominator is $9 + 1 + 1 + 4 + 0 = 15$, so $w = 0.40$.
> > - The stacked predictions $0.4a + 0.6b$ are 3.8, 7.6, 4.4, 12.2 and 4.0.
> > - The mean squared errors are 2.20 for the GLM, 1.60 for the GBM and 1.12 for the stack.
> > - On claims 1 and 4 the two models err in opposite directions, so the weighted average cancels much of both errors.
> > - **The GLM gets a weight of 0.40, and the new claim's stacked prediction is $0.4(6.0) + 0.6(9.0) = 7.8$, or $\$7{,}800$.**

> [!example]- A deep GBM (training MSE 0.4, out-of-fold 2.6) and a GLM (2.0 and 2.1) are stacked on their in-sample predictions. What goes wrong? {Example}
> - On its training records the GBM looks five times as accurate as the GLM, so the meta-model gives it almost all the weight.
> - On new data the GBM is less accurate than the GLM ($2.6$ against $2.1$), so the stack ends up close to the worse of the two models.
> - The meta-model has learned how well each model fits data it memorized, which rewards whichever model [[Overfitting|overfits]] most.
> - **The weights are wrong.** Out-of-fold predictions measure each model on records it did not see, so the weights reflect accuracy on new data.

## Blending

**Blending** fits the base models on one part of the training data and trains the meta-model on their predictions for a separate hold-out part. It is simpler than stacking and keeps the two levels' data cleanly apart, but the meta-model learns from fewer records.

## Benefits and costs of stacking

Models built in different ways, such as a GLM, a [[Boosting|GBM]] and a [[Neural Network|neural network]], make errors that are not perfectly correlated, so a weighted combination can have a smaller error than any one of them. The gain is largest when the base models are each accurate and differ from one another. Stacking three GBMs that differ only slightly in their settings adds little, because their errors are highly correlated.

A stacked prediction depends on every base model and on the meta-model, so no single set of coefficients or relativities explains it, and post-hoc tools such as [[Shapley Value|Shapley values]] are needed. Stacking also multiplies the fitting time, the code to maintain and the models to validate, and its output cannot be loaded as rating tables ([[Table Importability|table importability]]). A stack usually wins on accuracy and loses on most other model-selection criteria, so choosing it means judging whether the gain is worth that cost in the business context.

Stacking differs from [[Bagging|bagging]], which averages copies of one model fitted to bootstrap samples, and from boosting, which adds models in sequence to fit the remaining residuals.

> [!trap] Testing the stack on the data that fitted the meta-model
> The weights were chosen to fit those records, so the stack's accuracy on them is too good. An honest comparison with the base models needs a test set kept out of both levels ([[Train-Test Split|train-test split]]).
