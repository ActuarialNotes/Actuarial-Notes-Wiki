---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8f76ccb6b93c80acf9bfd5f3c123cec76887e63b2f71c9d9df60f4c7b228bb94
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cash Flow.md
---

A **cash flow** is a payment of money at a specific point in time, which can be positive (inflows/receipts) or negative (outflows/disbursements). A cash flow stream $\{(C_t, t)\}$ is valued by its present value at a given [[Interest Rate]]:

> $$\text{PV} = \sum_t C_t \cdot v^t$$

- Financial mathematics analyzes streams of cash flows by computing their [[Present Value]], [[Accumulated Value]], or [[Net Present Value]]
- Cash flow analysis forms the basis for [[Loans]], [[Bonds]], [[Annuity Immediate|annuities]], and [[Cash Flow Matching]] for liability management

![[Media/Figures/Cash_Flow.svg|340]]

> [!example]- Valuing an Irregular Cash Flow Stream {Example}
> A project pays $500$ at time 1, $-200$ at time 2 (an outflow), and $1{,}000$ at time 3. Find the PV at $i = 8\%$.
>
> > [!answer]-
> > $$\text{PV} = \frac{500}{1.08} + \frac{-200}{1.08^2} + \frac{1000}{1.08^3} = 462.96 - 171.47 + 793.83 = 1085.32$$
