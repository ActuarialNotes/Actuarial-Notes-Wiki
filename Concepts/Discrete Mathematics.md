---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8891cf2ff4ac92a0a60f9a86ed05e050908b49db046b2be58b3727575bdd36e1
  sources: []
  open_findings: 0
  log: .verify/Concepts/Discrete Mathematics.md
---

**Discrete Mathematics** is the branch of mathematics concerned with countable, distinct structures like [[Set Theory|sets]] as opposed to continuous quantities studied in calculus.
- It provides the language and tools for counting outcomes, defining events, and reasoning about logical relationships between outcomes and events
- A [[Power Set]] $\mathcal{P}(S)$ is the set of all subsets of $S$:

> $$|\mathcal{P}(S)| = 2^{|S|}$$

![[Media/Figures/Discrete_Mathematics.svg|340]]

> [!example]- Counting Subsets of a Risk Portfolio {Example}
> An insurer has 4 distinct risk categories: Fire, Flood, Theft, and Liability. How many distinct subsets of these risks could be included in a policy?
>
> > [!answer]-
> > The number of subsets of a set with $|S| = 4$ elements is:
> > $$|\mathcal{P}(S)| = 2^4 = 16$$
> > This includes the empty set (no coverage) and the full set (all four risks covered), giving 16 possible coverage combinations.
