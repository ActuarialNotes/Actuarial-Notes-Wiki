---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d81d8b7cf66020befd0a13fd034042d35077e28b7751f07fd055bfdd2dd11dca
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Test Error.md
---

**Test error** is the average error a fitted model makes on observations that were not used to fit it. It is the quantity [[Supervised Learning|supervised learning]] actually tries to minimise. The **training error**, measured on the fitting data, is different: it falls automatically as the model becomes more flexible, so it cannot choose between models.

> $$\text{Test MSE} = \text{Ave}\left(y_0 - \hat{f}(x_0)\right)^{2}$$
>
> $$\text{Test error rate} = \text{Ave}\left(I(y_0 \neq \hat{y}_0)\right)$$
>
> $$E\!\left[\left(y_0 - \hat{f}(x_0)\right)^{2}\right] = \mathrm{Var}(\hat{f}(x_0)) + \left[\mathrm{Bias}(\hat{f}(x_0))\right]^{2} + \mathrm{Var}(\varepsilon)$$

- The averages run over test observations $(x_0, y_0)$. The [[Mean Square Error|MSE]] suits a numeric response and the error rate a classifier (see [[Confusion Matrix]]); a GLM uses holdout [[Deviance|deviance]].
- **Its shape.** By the [[Bias-Variance Tradeoff|bias-variance tradeoff]], test error is U-shaped in flexibility: bias falls, variance rises. It can never fall below $\mathrm{Var}(\varepsilon)$. A growing gap between low training error and high test error is overfitting.
- **Estimating it without new data.** Four approaches:
  - **Validation set:** fit on one part and score on the rest. Simple, but the estimate is variable and overstates the error, because the fit used fewer observations.
  - **Leave-one-out (LOOCV):** $\text{CV}_{(n)} = \frac{1}{n}\sum \text{MSE}_i$. For least squares it needs only one fit: $\frac{1}{n}\sum\left[(y_i - \hat{y}_i)/(1 - h_i)\right]^2$, where $h_i$ is the leverage.
  - **$k$-fold:** $\text{CV}_{(k)} = \frac{1}{k}\sum \text{MSE}_j$, with $k = 5$ or $10$. It is slightly more biased than LOOCV but less variable, since LOOCV's $n$ fits are nearly identical and their errors highly correlated. See [[Cross-Validation]].
  - For bagged ensembles, [[Out-of-Bag Error|out-of-bag error]] estimates test error at no extra cost. [[AIC]] and [[BIC]] instead adjust training error for complexity.
- **Not the bootstrap's job.** The [[Bootstrap|bootstrap]] measures how variable an *estimate* is: its standard error is the [[Standard Deviation|standard deviation]] of the resampled estimates. Cross-validation measures how well a *model* predicts. Each bootstrap resample overlaps the original data (about $63\%$ of distinct observations), so a model scored on it looks optimistic.

> [!example]- Choosing a Severity Model by 5-Fold CV {Example}
> Two severity models are compared by 5-fold cross-validation. Model A (a GLM with five rating variables) has training MSE $380$ and fold MSEs $412, 398, 455, 430, 405$. Model B (a deep tree) has training MSE $310$ and fold MSEs $470, 380, 520, 445, 435$. Which should be used?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{CV}_A &= \frac{412 + 398 + 455 + 430 + 405}{5} \\
> > &= \frac{2{,}100}{5} \\
> > &= 420 \\
> > \text{CV}_B &= \frac{470 + 380 + 520 + 445 + 435}{5} \\
> > &= \frac{2{,}250}{5} \\
> > &= 450
> > \end{align*}
> > $$
> > **Model A.** B fits the training data better ($310$ against $380$) but predicts worse. Its gap of $140$ between training and CV error, against A's $40$, is the variance side of the tradeoff.

> [!example]- LOOCV from a Single Fit {Example}
> Claim frequency (per $100$ exposures) in four territories is regressed on a density index $x = 1, 2, 3, 4$, with $y = 3, 7, 6, 10$. The least-squares fit is $\hat{y} = 1.5 + 2x$. Compute the training MSE and the LOOCV estimate of test MSE.
>
> > [!answer]-
> > The fitted values are $3.5, 5.5, 7.5, 9.5$, so the residuals are $-0.5, 1.5, -1.5, 0.5$ and the training MSE is $(0.25 + 2.25 + 2.25 + 0.25)/4 = 1.25$.
> >
> > The leverages are $h_i = \frac{1}{4} + \frac{(x_i - 2.5)^2}{5}$, giving $0.7, 0.3, 0.3, 0.7$. Dividing each residual by $1 - h_i$ gives $-0.5/0.3 = -1.667$, $1.5/0.7 = 2.143$, $-2.143$ and $1.667$:
> > $$
> > \begin{align*}
> > \text{CV}_{(4)} &= \frac{2(1.667)^2 + 2(2.143)^2}{4} \\
> > &= \frac{5.556 + 9.184}{4} \\
> > &= 3.68
> > \end{align*}
> > $$
> > Predicting a held-out territory costs about three times the training MSE. The end territories have the highest leverage, and their squared errors grow elevenfold (from $0.25$ to $2.78$) when they are left out, because each pulls the line toward itself when it is included.
