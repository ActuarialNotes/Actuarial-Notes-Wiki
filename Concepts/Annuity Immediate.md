---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f289f3af6e4b1d3c4ee5585bac779479cef8de9c2b320cace7e67b7a9dc9d53e
  sources: []
  open_findings: 0
  log: .verify/Concepts/Annuity Immediate.md
---

An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period. The present value, valued one period before the first payment, is $a_{\overline{n}|}$, and the accumulated value at the time of the last payment is $s_{\overline{n}|}$.

> $$a_{\overline{n}|} = \frac{1-v^n}{i}$$

> $$= \frac{1-(1+i)^{-n}}{i}$$

> $$s_{\overline{n}|} = \frac{(1+i)^n - 1}{i}$$

- The two are related by $s_{\overline{n}|} = (1+i)^n \cdot a_{\overline{n}|}$.
- For a level payment of $P$ per period, multiply through by $P$.
- The annuity-immediate is the standard building block for loan amortisation, bond pricing, and insurance reserve calculations.

![[Media/Figures/Annuity_Immediate.svg|340]]

> [!example]- Present Value of a 5-Year Annuity-Immediate {Example}
> An annuity pays \$$1{,}200$ at the end of each year for 5 years. The effective annual interest rate is $i = 6\%$. Find the present value.
>
> > [!answer]-
> > $$PV = 1{,}200 \cdot a_{\overline{5}|0.06} = 1{,}200 \cdot \frac{1-(1.06)^{-5}}{0.06}$$
> > $$(1.06)^{-5} \approx 0.74726, \quad a_{\overline{5}|} = \frac{1-0.74726}{0.06} = \frac{0.25274}{0.06} \approx 4.2124$$
> > $$PV = 1{,}200 \times 4.2124 \approx \$5{,}054.87$$
