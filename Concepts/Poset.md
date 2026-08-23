---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1d9b29b6e2b8976098f4b06dcef2dfa91e83490e8228f84f13776be1bf73cb6e
  sources: []
  open_findings: 0
  log: .verify/Concepts/Poset.md
---

A ==Poset== (Partially Ordered Set) is a pair (P, $\leq$) where P is a set and $\leq$ is a binary relation on P that satisfies three properties; Reflexivity, Antisymmetry, and Transitivity. 

$$\forall x \in P, x \leq x$$
$$\forall x,y \in P \quad \text{if} \quad x \leq y \quad \\ \text{and} \quad y \leq x, \quad \text{then} \quad x = y $$