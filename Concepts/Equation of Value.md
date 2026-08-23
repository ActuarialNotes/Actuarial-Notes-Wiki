---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a24ad843e2d6041d80ac7758776b43f05f3d4d14e307abc71ef7b61a4bc5340b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Equation of Value.md
---

An **equation of value** equates the [[Present Value]] (or [[Accumulated Value]]) of all obligations to the present value of all payments at a chosen **comparison date** (also called the valuation date). It is the fundamental tool for solving time-value-of-money problems:

> $$\text{PV of inflows}$$

> $$= \text{PV of outflows at the comparison date}$$

- All cash flows must be moved to the same point in time using the same [[Interest Rate]] before comparing.
- A different choice of comparison date gives a different equation but the same solution for the unknown.

![[Media/Figures/Equation_of_Value.svg|340]]

> [!example]- Replacing Two Payments {Example}
> Debts of $1{,}000$ due in 2 years and $2{,}000$ due in 5 years are to be replaced by a single payment at the end of 3 years. Find the payment using $i = 6\%$.
>
> > [!answer]-
> > Set time 3 as the comparison date:
> > $$X = 1000(1.06)^1 + 2000(1.06)^{-2} = 1060 + 1779.99 = 2839.99$$
