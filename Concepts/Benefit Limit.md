---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5413cc077eb0e4e45103a72953e8b811e0a010153fd8133bab88c21f634ccfb5
  sources: []
  open_findings: 0
  log: .verify/Concepts/Benefit Limit.md
---

A **Benefit Limit** ($u$) is the maximum amount an insurer will pay on a single claim, capping the insurer's payment regardless of how large the underlying loss $X$ is.

> $$Y = \min\!\bigl(\alpha(X - d)_+,\; u\bigr)$$
>
> $$\text{where } u = \text{maximum benefit (benefit limit)}$$

- The benefit limit is the insurer's counterpart to the [[Deductible]]: the deductible removes small losses, while the limit removes large ones
- Losses above $d + u/\alpha$ (for coinsurance $\alpha$) result in the insurer paying exactly $u$ and the insured bearing the remainder

![[Media/Figures/Benefit_Limit.svg|340]]

> [!example]- Payment with Deductible and Benefit Limit {Example}
> A policy has deductible $d = 100$ and benefit limit $u = 400$ with no coinsurance. If $X = 600$, what does the insurer pay?
>
> > [!answer]-
> > The uncapped payment would be $X - d = 600 - 100 = 500$. Applying the benefit limit:
> > $$Y = \min(500, 400) = 400$$
> > The insurer pays \$400; the insured absorbs the first \$100 (deductible) and the last \$100 (excess above limit).
