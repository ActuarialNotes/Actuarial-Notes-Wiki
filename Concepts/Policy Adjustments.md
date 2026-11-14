---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5c0c540456efeddf32eb3ba7da37be6dc71e83bf2b15a25d110b0c4d7ff33ef1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Adjustments.md
---

A **Policy Adjustment** is a modification applied to a raw loss amount that transforms the ground-up loss $X$ into the insurer's net payment. Applied in sequence, the policy adjustments determine the payment random variable from the loss random variable:

1. The [[Deductible|deductible]] is subtracted from the loss.
2. The [[Coinsurance|coinsurance]] percentage is applied to what remains.
3. The [[Benefit Limit|benefit limit]] caps the result.

> [!example]- A loss of $\$8{,}000$ occurs under a policy with a $\$1{,}000$ deductible, 80% coinsurance and a $\$5{,}000$ benefit limit. What does the insurer pay? {Example}
> - The deductible leaves $8{,}000 - 1{,}000 = 7{,}000$.
> - Coinsurance pays $0.80 \times 7{,}000 = 5{,}600$.
> - The benefit limit caps the payment at $\min(5{,}600,\ 5{,}000) = 5{,}000$.
> - The insurer pays $\$5{,}000$.
