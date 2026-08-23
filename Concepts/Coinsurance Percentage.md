---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ce7560e5653f455fb256d594bbeecaf91b65d6aca78370921ec74cb1c1dee82a
  sources: []
  open_findings: 0
  log: .verify/Concepts/Coinsurance Percentage.md
---

A **Coinsurance Percentage** ($\alpha$) is the fraction of the covered loss (after any deductible) that the insurer agrees to pay, with the insured retaining the remaining fraction $1 - \alpha$.

> $$Y = \alpha \cdot (X - d)_+$$
>
> $$\text{where } \alpha \in (0,1] = \text{coinsurance percentage (insurer's share)}$$

- When $\alpha = 1$ the insurer covers 100% of the excess; lower values mean the insured co-pays a portion
- It scales the expected payment by $\alpha$ and the variance by $\alpha^2$

![[Media/Figures/Coinsurance_Percentage.svg|340]]

> [!example]- Expected Payment with Deductible and Coinsurance {Example}
> Ground-up losses $X$ have $E[(X-500)_+] = 1{,}200$ and $\text{Var}((X-500)_+) = 4{,}000{,}000$. The insurer applies coinsurance $\alpha = 0.80$. Find $E[Y]$ and $\text{Var}(Y)$.
>
> > [!answer]-
> > With $Y = 0.80 \cdot (X - 500)_+$:
> > $$E[Y] = 0.80 \times 1{,}200 = 960$$
> > $$\text{Var}(Y) = (0.80)^2 \times 4{,}000{,}000 = 0.64 \times 4{,}000{,}000 = 2{,}560{,}000$$
