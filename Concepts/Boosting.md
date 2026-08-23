---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:38caba1b53b83826e8d0676c88393f9dec22a73f57bd8f067c428515361938b9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Boosting.md
---

**Boosting** grows trees *sequentially*, each one fitted to the residuals left by the trees before it, and adds a shrunken version of each to a slowly improving model. Where [[Bagging]] fits independent trees in parallel to cut variance, boosting attacks bias.

> $$\hat{f}(x) \leftarrow \hat{f}(x) + \lambda \hat{f}^{b}(x), \qquad r_i \leftarrow r_i - \lambda \hat{f}^{b}(x_i)$$
>
> $$\hat{f}(x) = \sum_{b=1}^{B}\lambda\hat{f}^{b}(x)$$

**The three tuning parameters:**

| Parameter | Meaning | Typical |
| :--- | :--- | :--- |
| $B$ | number of trees | chosen by [[Cross-Validation]] — **too large overfits** |
| $\lambda$ | shrinkage / learning rate | 0.01–0.001; smaller needs larger $B$ |
| $d$ | interaction depth (splits per tree) | 1–4; $d = 1$ is an additive model of stumps |

- The trees are deliberately **small and weak** — a stump learns slowly, which is the point: many small corrections beat one large one
- Unlike bagging and [[Random Forest]], boosting **can overfit** if $B$ is too large, because every additional tree keeps fitting the residual
- No bootstrap resampling in the basic algorithm — each tree sees the full data, just with an updated response
- $d$ controls the interaction order the model can express: depth-1 stumps give a purely additive fit, depth-2 allows two-way interactions
- Gradient boosting generalizes this to any differentiable loss, which is how it is applied to Poisson and Tweedie insurance responses

![[Media/Figures/Boosting.svg|340]]

> [!example]- Reading a Boosting Diagnostic {Example}
> A gradient-boosted severity model with $\lambda = 0.01$, $d = 2$ shows training error still falling at $B = 5{,}000$, but 5-fold CV error bottoming out at $B \approx 1{,}200$ and rising after. What is happening, and what should be shipped?
>
> > [!answer]-
> > Past $B \approx 1{,}200$ the added trees are fitting **noise in the residuals** — the signature overfit that bagging and random forests cannot produce.
> > Ship $B = 1{,}200$. Training error falling forever is expected and carries no information; the CV curve is the one that decides. A smaller $\lambda$ would push the optimum to a larger $B$ and usually a slightly better minimum, at more computation.
