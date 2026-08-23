---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0e9ea51b72e37e206962f4f65f22e4f3b2c8728e72eefefd0809422b52b74d74
  sources: []
  open_findings: 0
  log: .verify/Concepts/Event.md
---

An **event** $E$ is any subset of the [[Sample Space]] $S$.
- Events are the objects to which probabilities are assigned.
- A **simple event** contains exactly one outcome.
- A **compound event** contains two or more outcomes.
- The [[Axioms of Probability]] define $P(E) \in [0,1]$ for every event $E$, with $P(S) = 1$.

![[Media/Figures/Event.svg|340]]

> [!example]- Rolling a Die {Example}
> A fair six-sided die is rolled. The sample space is $S = \{1,2,3,4,5,6\}$.
>
> > [!answer]-
> > Let $E = \{2, 4, 6\}$ be the event "an even number is rolled." This is a compound event containing 3 outcomes.
> > $$P(E) = \frac{|E|}{|S|} = \frac{3}{6} = 0.5$$
