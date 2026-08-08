**Cross-validation** estimates test error by repeatedly holding out part of the training data, fitting on the rest, and scoring on the held-out fold. It is the standard way to tune a flexibility parameter when no separate test set exists.

> $$\mathrm{CV}_{(K)} = \frac{1}{K}\sum_{k=1}^{K} \mathrm{MSE}_k, \qquad \mathrm{MSE}_k = \frac{1}{n_k}\sum_{i \in C_k}\left(y_i - \hat{y}_i^{(-k)}\right)^{2}$$

- **$K$-fold**: split into $K$ folds, each serving once as the validation set. $K = 5$ or $10$ is standard
- **LOOCV** is $K = n$ — nearly unbiased but high variance (the $n$ fits are almost identical and their errors highly correlated), and expensive except in least squares, where one fit suffices:
  $\mathrm{CV}_{(n)} = \frac{1}{n}\sum \left(\frac{y_i - \hat y_i}{1 - h_{ii}}\right)^{2}$
- **The validation-set approach** (a single split) is simplest but wastes data and its estimate swings with the split
- The **one-standard-error rule** picks the simplest model whose CV error is within one standard error of the minimum — a flatter, more stable choice
- Any variable selection or preprocessing must happen **inside** each fold; screening predictors on the full data first leaks the response and produces an optimistic estimate

![[Media/Figures/Cross-Validation.svg|340]]

> [!example]- Tuning Tree Depth by 5-Fold CV {Example}
> Five folds of a severity model give MSE by tree size: 2 leaves — 4.9, 4.4, 5.2, 4.7, 4.8; 6 leaves — 3.9, 3.6, 4.5, 3.8, 4.2; 20 leaves — 4.1, 4.4, 5.0, 4.3, 4.7. Which size?
>
> > [!answer]-
> > $$\mathrm{CV}_2 = 4.80 \qquad \mathrm{CV}_6 = 4.00 \qquad \mathrm{CV}_{20} = 4.50$$
> > **6 leaves.** The U-shape is the [[Bias-Variance Tradeoff]] in view: 2 leaves is too rigid, 20 overfits. Note that training error at 20 leaves would be the lowest of the three — which is why it is not used.
