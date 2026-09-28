---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:8891cf2ff4ac92a0a60f9a86ed05e050908b49db046b2be58b3727575bdd36e1
  sources:
    - "Levin, Discrete Mathematics: An Open Introduction (4th ed.), §0.1 What is Discrete Mathematics?, fetched 2026-09-27, sha256:e00bf8f37901ce2eae655a7d6494fd3f7d5c38bea93d7f899a65334e14146a95 — https://discrete.openmathbooks.org/dmoi4/sec_intro-intro.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Exercise 8 (p.89, PDF p.97) and §3.2 (p.93, PDF p.101): a set with n elements has 2^n subsets, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Encyclopedia of Mathematics (Springer/EMS), article Set function, fetched 2026-09-27, sha256:168f98c55dc240fde7643462ca01950c62077204b0253c44239d8d197c4a469a — https://encyclopediaofmath.org/wiki/Set_function"
  open_findings: 0
  open_critical: 0
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
