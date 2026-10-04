---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:771db24925328aa13f5ec14b04420503dcbf31e1572a11f980813b9cb3a9f86f
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §2.2.1-2.2.2 (printed pp.29-36, PDF pp.40-47), eq (2.7) on printed p.34; §6 intro (printed p.226, PDF p.234); §6.2.1 ridge bias-variance, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §4.3 overfitting PDF p.49, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Dean, 'Topics in Credibility Theory', SOA STAM study note STAM-23-18, §1.1 (pp.10-11: X-bar unbiased for mu(theta); Z*X-bar + (1-Z)*mu minimizes expected squared error at Z = N/(N+K)), sha256:a45571885a311426c0d5a16e4d24b9d70d7ff5ff024c2b18f888d5bdaa16f352 — https://www.soa.org/globalassets/assets/Files/Edu/2018/2018-stam-23-18.pdf"
  open_findings: 0
  open_critical: 0
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
