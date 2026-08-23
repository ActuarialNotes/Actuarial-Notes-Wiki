---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:771db24925328aa13f5ec14b04420503dcbf31e1572a11f980813b9cb3a9f86f
  sources: []
  open_findings: 0
  log: .verify/Concepts/Bias-Variance Tradeoff.md
---

The **Bias-Variance Tradeoff** is the decomposition of a model's expected prediction error into three pieces — squared [[Bias]], variance, and irreducible noise — and the fact that model complexity moves the first two in opposite directions. It is the reason the best-fitting model is almost never the best-predicting one.

> $$E\!\left[(y_0 - \hat{f}(x_0))^{2}\right] = \left[\text{Bias}(\hat{f}(x_0))\right]^{2} + \text{Var}(\hat{f}(x_0)) + \sigma^{2}$$

- **Bias** is error from the model being too rigid to represent the truth (a straight line through a curved relationship); **variance** is how much the fit would move if it were refitted on a different sample
- Adding terms, interactions, or levels lowers bias and raises variance. Removing them does the reverse. The total is U-shaped, and the minimum is the right complexity
- $\sigma^2$ is **irreducible**: no model, however good, predicts better than the noise in the response allows
- **Underfitting** = high bias, low variance: training and test error are both high and close together. **Overfitting** = low bias, high variance: training error is tiny and test error is much larger
- Training error is not a guide — it falls monotonically with complexity. Estimate test error with [[Cross-Validation]], or penalize complexity with [[AIC]] / [[BIC]]
- More data lowers variance without touching bias, so a complex model that overfits at $n = 500$ may be exactly right at $n = 50{,}000$ — the practical reason large books support finer classification plans
- Credibility weighting is this trade-off in actuarial dress: shrinking a volatile class estimate toward the overall mean accepts bias to cut variance, and lowers [[Mean Square Error]]

![[Media/Figures/Bias-Variance_Tradeoff.svg|340]]

> [!example]- Decomposing Prediction Error {Example}
> At a point $x_0$, a model has bias $-3$, variance $16$, and the response has irreducible variance $25$. Compare its expected squared prediction error with a simpler model having bias $-6$ and variance $4$.
>
> > [!answer]-
> > $$\text{Model A} = (-3)^2 + 16 + 25 = 9 + 16 + 25 = 50$$
> > $$\text{Model B} = (-6)^2 + 4 + 25 = 36 + 4 + 25 = 65$$
> > Model A predicts better despite being the more complex one. Note that both are floored at $25$ — even a perfect model cannot beat the noise.

> [!example]- Diagnosing Overfitting in a Rating Model {Example}
> A frequency model with territory banded into $8$ groups has training deviance $2{,}400$ and holdout deviance $2{,}510$. Refitting with all $220$ postal codes as separate levels gives training deviance $1{,}950$ and holdout deviance $2{,}890$. What happened?
>
> > [!answer]-
> > The $220$-level model has far lower **training** error and much worse **holdout** error — the signature of high variance. Most postal codes carry too little exposure to estimate their own relativity, so each coefficient is chasing a handful of claims. The $8$-band model accepts some bias (real differences within a band are averaged away) for a large reduction in variance, and predicts better.
