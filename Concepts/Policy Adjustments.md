---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2e35487c850b0cbe48520b0bd91df1791e6613492b43764e03958c160e393f39
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Adjustments.md
---

**Policy Adjustments** are the modifications applied to a raw loss amount — [[Deductible|deductibles]], [[Coinsurance|coinsurance]], and [[Benefit Limit|benefit limits]] — that transform the ground-up loss $X$ into the insurer's net payment. Applied in sequence, they determine the payment random variable from the loss random variable.

> [!example]- A loss of \$$8{,}000$ occurs under a policy with a \$$1{,}000$ deductible, 80% coinsurance, and a \$$5{,}000$ benefit limit. What does the insurer pay?
> 1. Apply deductible: $8{,}000 - 1{,}000 = 7{,}000$.
> 2. Apply coinsurance: $0.80 \times 7{,}000 = 5{,}600$.
> 3. Apply benefit limit: $\min(5{,}600,\ 5{,}000) = 5{,}000$.
>
> The insurer pays \$$5{,}000$.
