---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2f66fae43e24fe286c66a7be803a4135b0368b1c1cdc0c430ca232323e54ee2e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Final Payment.md
---

The **final payment** on a loan is the last payment made to retire the outstanding balance, which may differ from the regular payment amount when the [[Term of Loan]] is not an integer number of periods.

- There are two conventions:
  - **[[Drop Payment]]**: the final payment is **smaller** than the regular payment and occurs at the same scheduled payment date
  - **[[Balloon Payment]]**: the final payment is **larger** than the regular payment (typically occurs when regular payments are set below the interest, causing the balance to grow)
- The final payment amount equals the [[Outstanding Balance]] at the previous payment date accumulated by one period, minus any regular payment.

![[Media/Figures/Final_Payment.svg|340]]

> [!example]- Computing the Drop Payment {Example}
> A $1{,}000$ loan at $6\%$ annual interest is repaid with annual payments of $250$. The term is approximately 4.65 years. Find the drop payment at end of year 5.
>
> > [!answer]-
> > Balance after 4 payments (prospective): $B_4 = 250 \cdot a_{\overline{0.65}|6\%}$ or equivalently by retrospective method. Approximate: $B_4 = 1000(1.06)^4 - 250 \cdot s_{\overline{4}|} = 1262.48 - 1092.73 = 169.75$. Drop payment $= 169.75(1.06) = 179.93$.
