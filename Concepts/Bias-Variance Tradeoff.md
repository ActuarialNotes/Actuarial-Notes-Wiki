The **bias-variance tradeoff** decomposes expected test error into three pieces: squared bias, variance, and irreducible noise. Flexibility lowers bias and raises variance, so test error falls then rises — a U-shape with a best model in the middle.

> $$E\!\left[(y_0 - \hat{f}(x_0))^{2}\right] = \underbrace{\left[\mathrm{Bias}(\hat{f}(x_0))\right]^{2}}_{\text{too rigid}} + \underbrace{\mathrm{Var}(\hat{f}(x_0))}_{\text{too twitchy}} + \underbrace{\mathrm{Var}(\varepsilon)}_{\text{irreducible}}$$

- **Bias** is the error from approximating a complicated truth with a simple model; **variance** is how much $\hat f$ would change on a different training sample
- **Training error always falls** with flexibility — it is not an estimate of test error, and using it to select a model always picks the most flexible one
- $\mathrm{Var}(\varepsilon)$ is a floor no method beats, however much data or flexibility is thrown at it
- Levers on the tradeoff: $k$ in [[K-Nearest Neighbors]], depth in a [[Decision Tree]], $\lambda$ in [[Regularization]], the number of trees and the learning rate in [[Boosting]]
- [[Bagging]] attacks the variance term while leaving bias alone; [[Tree Pruning]] and regularization trade a little bias for a large drop in variance

![[Media/Figures/Bias-Variance_Tradeoff.svg|340]]

> [!example]- Choosing k in KNN {Example}
> KNN regression on 200 claims gives training / test MSE of: $k=1$: 0 / 48.2; $k=5$: 18.4 / 31.0; $k=20$: 27.9 / 29.6; $k=100$: 40.1 / 41.5. Which $k$, and what is happening at each end?
>
> > [!answer]-
> > **$k = 20$**, the minimum test MSE at 29.6.
> > $k = 1$ interpolates every training point (training MSE 0) — zero bias, maximal variance, worst test error. $k = 100$ averages over half the sample — tiny variance, large bias, so both errors are high and nearly equal. Training MSE rises monotonically with $k$ and never identifies the right answer.
