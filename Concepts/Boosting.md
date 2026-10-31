---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:3cd562526361265e0069258513a79c0f7c866dc231eb74c69a3e845d7aa3b103
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §8.2.3 Algorithm 8.2, eqs (8.10)-(8.12), and the tuning parameters, p.347 (PDF 355), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Boosting.md
---

**Boosting** grows trees *sequentially*, each one fitted to the residuals left by the trees before it, and adds a shrunken version of each to a slowly improving model. Where [[Bagging]] fits independent trees in parallel to cut variance, boosting attacks bias.

> $$\hat{f}(x) \leftarrow \hat{f}(x) + \lambda \hat{f}^{b}(x), \qquad r_i \leftarrow r_i - \lambda \hat{f}^{b}(x_i)$$
>
> $$\hat{f}(x) = \sum_{b=1}^{B}\lambda\hat{f}^{b}(x)$$

**The algorithm for regression trees** (James et al., §8.2.3, Algorithm 8.2):

1. **Start from nothing.** Set $\hat{f}(x) = 0$ and $r_i = y_i$ for every observation in the training set, so the first tree is fitted to the responses themselves
2. For $b = 1, 2, \dots, B$: fit a tree $\hat{f}^{b}$ with $d$ splits to the data $(X, r)$, add $\lambda \hat{f}^{b}$ to $\hat{f}$, and subtract $\lambda \hat{f}^{b}(x_i)$ from each residual $r_i$, as in the update above
3. Output the boosted model $\hat{f}(x) = \sum_{b=1}^{B}\lambda\hat{f}^{b}(x)$

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
