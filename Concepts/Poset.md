---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fe7430c0bc1343e6aed39c6ac202c205177a8b34b64c51d066453ca382f8dd68
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poset.md
---

A **Poset** (partially ordered set) is a pair $(P, \leq)$, where $P$ is a set and $\leq$ is a binary relation on $P$ with three properties:

1. **Reflexivity.** $x \leq x$ for every $x \in P$.
2. **Antisymmetry.** If $x \leq y$ and $y \leq x$, then $x = y$.
3. **Transitivity.** If $x \leq y$ and $y \leq z$, then $x \leq z$.

> [!example]- Is the [[Power Set|power set]] of $\{a, b\}$, ordered by $\subseteq$, a poset? {Example}
> - Every set is a subset of itself, so $\subseteq$ is reflexive.
> - If $E \subseteq F$ and $F \subseteq E$, the two sets have the same elements, so $E = F$ and $\subseteq$ is antisymmetric.
> - If $E \subseteq F$ and $F \subseteq G$, every element of $E$ is in $G$, so $\subseteq$ is transitive.
> - It is a poset. The order is only partial, because neither $\{a\} \subseteq \{b\}$ nor $\{b\} \subseteq \{a\}$.
