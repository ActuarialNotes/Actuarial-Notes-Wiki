---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:826f856aaddda74ea3ed1eb379e9f2ba25423137404f969699fa654e77cd8d94
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent Events.md
---

Two events $A$ and $B$ are **Independent** if knowing that one occurred provides no information about whether the other occurred.
- $P(A \mid B) = P(A)$ and $P(B \mid A) = P(B)$
- Independence is a symmetric relation and must be verified mathematically; it cannot be assumed from a diagram
- For a collection of events to be **mutually independent**, the product rule must hold for every subset of the collection, not just pairs:

> $$P(A \cap B) = P(A) \cdot P(B)$$

![[Media/Figures/Independent_Events.svg|340]]

> [!example]- Testing Independence of Two Claim Events {Example}
> For two policyholders, $P(\text{A claims}) = 0.4$, $P(\text{B claims}) = 0.3$, and $P(\text{both claim}) = 0.12$. Are their claim events independent?
>
> > [!answer]-
> > Check whether $P(A \cap B) = P(A) \cdot P(B)$:
> > $$P(A) \cdot P(B) = 0.4 \times 0.3 = 0.12$$
> > Since $P(A \cap B) = 0.12 = P(A) \cdot P(B)$, the two events are independent — knowledge of one policyholder's claim does not affect the probability of the other's.
