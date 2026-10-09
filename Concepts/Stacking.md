---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b518c5ef962a1c3579777ce6676fa724c8b75120f422da3ee807ed91be2c5686
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stacking.md
---

**Stacking** (stacked generalization, Wolpert 1992) combines several fitted base models through a second model, the meta-model, which is trained on the base models' out-of-fold predictions and learns how much to trust each of them. **Blending** is the variant in which the meta-model is trained on the base models' predictions for a single hold-out set instead. Both aim at a prediction more accurate than any one base model, at a cost in [[Explainability|explainability]].

> $$\hat{y}(\mathbf{x}) = g\big(\hat{f}_1(\mathbf{x}), \dots, \hat{f}_M(\mathbf{x})\big)$$

> $$\hat{\mathbf{w}} = \arg\min_{\mathbf{w}} \sum_{i=1}^{n}\Big(y_i - \sum_{m=1}^{M} w_m\, \hat{f}_m^{(-k(i))}(\mathbf{x}_i)\Big)^2$$

- **Symbols:** $\hat{f}_1, \dots, \hat{f}_M$ are the $M$ base models and $g$ is the meta-model. In the second block, which is the common linear meta-model, $\hat{f}_m^{(-k(i))}(\mathbf{x}_i)$ is base model $m$'s prediction for record $i$ from a fit on every fold except fold $k(i)$, the one that contains record $i$. Breiman (1996) recommended constraining the weights $w_m$ to be non-negative.
- **Out-of-fold predictions:** The training data are split into $K$ folds, as in [[Cross-Validation|cross-validation]], and each base model is fitted $K$ times, each time predicting the fold it left out. Every record then has a prediction from a model that never saw it, which is what the meta-model must learn from. The base models are then refitted on all the training data to score new records.
- **Blending:** Blending fits the base models on one part of the training data and trains the meta-model on their predictions for a separate hold-out part. It is simpler and keeps the two levels' data cleanly apart, but the meta-model learns from fewer records than it does in stacking.
- **Why it helps:** Models built in different ways, such as a GLM, a [[Boosting|GBM]] and a [[Neural Network|neural network]], make errors that are not perfectly correlated, so a weighted combination can have a smaller error than any one of them. The gain is largest when the base models are each accurate and differ from one another.
- **What it costs:** A stacked prediction depends on every base model and on the meta-model, so no single set of coefficients or relativities explains it, and post-hoc tools such as [[Shapley Value|Shapley values]] are needed. It also multiplies the fitting time, the code to maintain and the models to validate, and its output cannot be loaded as rating tables (see [[Table Importability]]).

> [!example]- Fitting a Linear Meta-Model to Two Base Models {Example}
> A GLM and a GBM give the out-of-fold predictions below of claim severity (in thousands) for five claims. The meta-model is $\hat{y} = w\,a + (1 - w)\,b$, where $a$ is the GLM's prediction and $b$ the GBM's. Find the $w$ that minimizes the squared error, compare the mean squared errors, and give the stacked prediction for a new claim on which the GLM predicts 6.0 and the GBM 9.0.
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
> > Setting the derivative of $\sum_i (y_i - b_i - w(a_i - b_i))^2$ to zero gives the weight.
> > $$
> > \begin{align*}
> > w &= \frac{\sum_i (y_i - b_i)(a_i - b_i)}{\sum_i (a_i - b_i)^2} \\
> > &= \frac{3 - 1 + 2 + 2 + 0}{9 + 1 + 1 + 4 + 0} \\
> > &= \frac{6}{15} \\
> > &= 0.40
> > \end{align*}
> > $$
> > The stacked predictions $0.4a + 0.6b$ are 3.8, 7.6, 4.4, 12.2 and 4.0.
> > $$
> > \begin{align*}
> > \text{MSE}_{\text{GLM}} &= \tfrac{1}{5}(4 + 4 + 1 + 1 + 1) \\
> > &= 2.20 \\
> > \text{MSE}_{\text{GBM}} &= \tfrac{1}{5}(1 + 1 + 4 + 1 + 1) \\
> > &= 1.60 \\
> > \text{MSE}_{\text{stack}} &= \tfrac{1}{5}(0.04 + 1.96 + 2.56 + 0.04 + 1.00) \\
> > &= 1.12
> > \end{align*}
> > $$
> > The GBM gets the larger weight because it is more accurate out of fold, but the GLM still gets 40%, because on claims 1 and 4 the two models err in opposite directions and the weighted average cancels much of both errors. The new claim's stacked prediction is $0.4(6.0) + 0.6(9.0) = 7.8$, or $\$7{,}800$. A real meta-model is fitted on thousands of records, and its accuracy is then checked on a test set that neither level has seen.

> [!example]- Why the Meta-Model Needs Out-of-Fold Predictions {Example}
> A deep GBM has a training MSE of 0.4 and an out-of-fold MSE of 2.6, and a GLM has a training MSE of 2.0 and an out-of-fold MSE of 2.1. An analyst fits the meta-model on each base model's predictions for the records it was trained on. What goes wrong?
>
> > [!answer]-
> > On its training records the GBM looks five times as accurate as the GLM ($0.4$ against $2.0$), so the meta-model gives it almost all the weight. On new data the GBM is in fact less accurate than the GLM ($2.6$ against $2.1$), so the stack ends up close to the worse of the two models. The meta-model has learned how well each model fits data it memorized, which rewards whichever model [[Overfitting|overfits]] most. Out-of-fold predictions measure each model on records it did not see, so the weights reflect accuracy on new data, and blending's hold-out set does the same job.

> [!tip]- How it appears on the exam
> - **ATPA** asks candidates, in its Advanced Predictive Analytics Models section, to explain the benefits of combining multiple models by stacking and blending and to demonstrate the combination. A task can ask for a stacked model to be fitted on the assessment data and compared with its base models on held-out data.
> - **Model selection:** The same section asks for a modeling approach to be chosen by accuracy, explainability, stability, analytical effort, computational efficiency and table importability. A stack usually wins on accuracy and loses on most of the others, so the justification must say whether the gain is worth that cost in the business context.

> [!warning]- Exam traps
> - **In-sample predictions:** Training the meta-model on base-model predictions for the records those models were fitted to rewards overfitting, as the second example shows. The meta-model must learn from out-of-fold predictions, or from a separate hold-out set when blending.
> - **Testing on the stacking data:** The records used to fit the meta-model cannot also measure the stack's accuracy, because the weights were chosen to fit them. An honest comparison with the base models needs a test set kept out of both levels (see [[Train-Test Split]]).
> - **Similar base models:** Stacking three GBMs that differ only slightly in their settings adds little, because their errors are highly correlated. The benefit comes from base models that differ in kind.
> - **Not bagging or boosting:** [[Bagging]] averages copies of one model fitted to bootstrap samples, and boosting adds models in sequence to fit the remaining residuals. Stacking combines different models through a meta-model that learns their weights.
