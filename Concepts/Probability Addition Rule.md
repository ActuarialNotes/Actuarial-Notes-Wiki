---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:de329d07d643e8869f40bcfc174b4bee1797075305c14fa688010d0e11a3bef2
  sources: []
  open_findings: 0
  log: .verify/Concepts/Probability Addition Rule.md
---

The **Probability Addition Rule** gives the probability that at least one of two events $A$ or $B$ occurs, correcting for the double-counting of outcomes in their intersection.
- Also known as the Inclusion-Exclusion Principle
- When events are [[Mutually Exclusive Events|mutually exclusive]], $P(A \cap B) = 0$ and the rule reduces to simple addition
- For three events the rule extends to include all pairwise and triple intersections:

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

> $$P(A \cup B \cup C) = P(A)+P(B)+P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$$

![[Media/Figures/Probability_Addition_Rule.svg|340]]

> [!example]- Probability of at Least One Coverage Trigger {Example}
> For a commercial policy, the probability of a fire loss is 0.05, a flood loss is 0.03, and both losses in the same year is 0.01. What is the probability of at least one loss?
>
> > [!answer]-
> > Let $F$ = fire and $L$ = flood. Applying the addition rule:
> > $$P(F \cup L) = P(F) + P(L) - P(F \cap L) = 0.05 + 0.03 - 0.01 = 0.07$$
> > There is a 7% probability of experiencing at least one loss in the year.
