---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:967d6e371db386334820f6742ed4200c2507216c5d50db6998c67c176e31ef1d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pseudo R-Squared.md
---

**Pseudo R-Squared** (pseudo-R²) measures a [[Generalized Linear Model|GLM]]'s performance as the share of the possible log-likelihood improvement it achieves. The range runs from the **null model** (intercept only, predicting the mean) to the **saturated model** (predicting every observation exactly). Equivalently, it is the percentage of [[Deviance|deviance]] explained. Chalk et al. calculate it on validation folds and test data, never on the data the model was trained on.

> $$\text{pseudo-}R^2 = \frac{l_{\text{model}} - l_{\text{null}}}{l_{\text{saturated}} - l_{\text{null}}}$$

> $$\text{pseudo-}R^2 = 1 - \frac{D_{\text{model}}}{D_{\text{null}}}$$

> $$l = \sum_i \left(y_i \ln \hat{y}_i - \hat{y}_i\right)$$

- $l$ is the Poisson log-likelihood without the constant $\ln y_i!$, which cancels. The null model predicts $\hat{y}_i = \bar{y}$, the saturated model $\hat{y}_i = y_i$ (a zero count contributes $0$), and $D = 2(l_{\text{saturated}} - l)$. $D_{\text{null}}$ plays the part of the total sum of squares in [[R-Squared|R²]] and $D_{\text{model}}$ the residual.
- **Why this measure.** Deviance is summed over observations, so it grows with the data and cannot be compared across datasets or error distributions. On training data it always falls as features are added, which is why [[AIC]] and [[BIC]] penalize it. Pseudo-R² does not depend on the number of observations, and measured out of sample it needs no penalty.
- **With exposure weights,** each record's deviance contribution is multiplied by its exposure: $1 - \sum_i ex_i\, d_{\text{model},i} \big/ \sum_i ex_i\, d_{\text{null},i}$.
- **Zero, and below.** The null model scores $0$. On a validation fold it scores slightly *below* zero, because it was trained on a mean that differs from the fold's own. **Rebasing** (scaling predictions to the fold's mean) removes this, so pseudo-R² measures segmentation. The amount of rebasing needed separately measures whether the model is right on average, mirroring the split between classification and basic ratemaking.
- **Typical values are small.** On simulated auto data a model that knows the true frequencies scores only $0.051$, because claim outcomes are random. In the aviation case study the baseline GLM scores $0.140$, penalized regression $0.146$, nonlinear effects $0.150$, target-encoded make $0.151$, and the gradient boosting benchmark $0.165$. The level depends on the data's signal-to-noise ratio, so pseudo-R² ranks models on the **same target and data**, and the existing rating plan is the benchmark to beat ([[Model Benchmarking]]).

> [!example]- Pseudo-R² for Five Policies {Example}
> Five policies have claim counts $y = (0, 0, 0, 1, 2)$. A Poisson GLM predicts $\hat{y} = (0.2, 0.3, 0.5, 0.8, 1.2)$. Compute the model, null and saturated log-likelihoods, the pseudo-R², and check it against the deviances.
>
> > [!answer]-
> > The mean is $\bar{y} = 3/5 = 0.6$, and the predictions also sum to $3$.
> >
> > $$
> > \begin{align*}
> > l_{\text{model}} &= \ln 0.8 + 2\ln 1.2 - 3.0 \\
> > &= -0.2231 + 0.3646 - 3.0 \\
> > &= -2.8585 \\[4pt]
> > l_{\text{null}} &= 3\ln 0.6 - 5(0.6) \\
> > &= -1.5325 - 3.0 \\
> > &= -4.5325 \\[4pt]
> > l_{\text{saturated}} &= (1\ln 1 - 1) + (2\ln 2 - 2) \\
> > &= -1 - 0.6137 \\
> > &= -1.6137
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{pseudo-}R^2 &= \frac{-2.8585 + 4.5325}{-1.6137 + 4.5325} \\
> > &= \frac{1.6740}{2.9188} \\
> > &= 0.574
> > \end{align*}
> > $$
> >
> > Check: $D_{\text{model}} = 2(-1.6137 + 2.8585) = 2.4896$ and $D_{\text{null}} = 2(2.9188) = 5.8375$, so $1 - 2.4896/5.8375 = 0.574$. The model explains $57\%$ of the deviance, far above real insurance values, where most of the deviance is irreducible claim randomness.

> [!example]- Choosing Between Two Models by Validation Pseudo-R² {Example}
> Two frequency models are fitted with five-fold cross-validation.
>
> - Model A (unpenalized, all features): training $0.182, 0.176, 0.185, 0.179, 0.178$; validation $0.128, 0.141, 0.119, 0.135, 0.127$
> - Model B (LASSO): training $0.152, 0.149, 0.155, 0.150, 0.149$; validation $0.141, 0.146, 0.138, 0.147, 0.143$
>
> The null model averages $-0.0002$ on validation, and a gradient boosting benchmark $0.158$. Which model is better, and is its score "good"?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{A}_{\text{train}} &= 0.900/5 \\
> > &= 0.180 \\[4pt]
> > \bar{A}_{\text{val}} &= 0.650/5 \\
> > &= 0.130 \\[4pt]
> > \bar{B}_{\text{train}} &= 0.755/5 \\
> > &= 0.151 \\[4pt]
> > \bar{B}_{\text{val}} &= 0.715/5 \\
> > &= 0.143
> > \end{align*}
> > $$
> >
> > **Model B.** Only validation performance counts. A's training score is higher only because it fits noise, shown by its gap of $0.050$ between training and validation against B's $0.008$. B also wins on every fold.
> >
> > **Is 0.143 good?** The absolute level is not meaningful, since even a perfect model scores low on noisy claims. What matters is the comparison: B is far above the null model's $0$, and about $10\%$ short of the benchmark's $0.158$, which suggests effects still to find (nonlinearities, interactions). Before implementation it should also beat the current plan on the same folds, and it should then be scored once on the untouched test data.
