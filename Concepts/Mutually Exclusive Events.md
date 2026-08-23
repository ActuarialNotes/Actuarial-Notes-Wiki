---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6fe255a119296c29cb4534cd440ed2f64b046b7d2b648ac8ac5d154d4000a617
  sources: []
  open_findings: 0
  log: .verify/Concepts/Mutually Exclusive Events.md
---

Two events $A$ and $B$ are **Mutually Exclusive** (disjoint) if they cannot both occur simultaneously.
- For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) + P(B)$
- The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are pairwise mutually exclusive, then $P\!\left(\bigcup_{i=1}^n A_i\right) = \sum_{i=1}^n P(A_i)$

> $$A \cap B = \emptyset \implies P(A \cap B) = 0$$

![[Media/Figures/Mutually_Exclusive_Events.svg|340]]

> [!example]- Insurance Claim Type {Example}
> A single claim is classified as either property damage ($P$) or bodily injury ($B$), but not both. $P(P) = 0.60$ and $P(B) = 0.35$.
>
> > [!answer]-
> > Since $P$ and $B$ are mutually exclusive:
> > $$P(P \cup B) = P(P) + P(B) = 0.60 + 0.35 = 0.95$$
> > There is a 5% probability the claim is neither type (e.g., classified as "other").
