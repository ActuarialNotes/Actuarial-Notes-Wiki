---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ac515235e6996c3171451aa76beeb288590b5225f676173dcacc8d97208cb07c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Set Operations.md
---
**Set Operations** are the ways of combining [[Event|events]] as [[Set Theory|sets]] of outcomes: union, intersection, complement and difference. Each one turns a statement in words about events into a set of outcomes of the [[Sample Space|sample space]] $S$.

| Words | Operation | Event | Its outcomes |
| --- | --- | --- | --- |
| $E$ or $F$ | union | $E \cup F$ | in $E$, in $F$, or in both |
| $E$ and $F$ | intersection | $E \cap F$ | in both $E$ and $F$ |
| not $E$ | complement | $E^c$ | in $S$ but not in $E$ |
| $E$ but not $F$ | difference | $E \setminus F$ | in $E$ but not in $F$ |

An outcome $s$ belongs to $E \cap F$ only if it is in both events, and to $E \cup F$ if it is in at least one of them. The [[Axioms of Probability#The complement rule|complement rule]] gives the probability of "not $E$", $P(E^c) = 1 - P(E)$.

> [!example]- With $E$ "needs a filling" and $F$ "needs a root canal", which events are "no fillings", "at least one of the two" and "neither"? {Example}
> - "No fillings" is "not $E$", the complement $E^c$.
> - "At least one of the two" is "$E$ or $F$", the union $E \cup F$.
> - "Neither" is "not $E$ and not $F$", the intersection $E^c \cap F^c$.

## The difference of two events

The difference of $E$ and $F$, the event that $E$ occurs and $F$ does not, is

> $$E \setminus F = E \cap F^c$$

The event $E$ splits into the part inside $F$ and the part outside it. These two parts have no outcome in common, so their probabilities add:

> $$P(E) = P(E \cap F) + P(E \cap F^c)$$

So the probability that $E$ occurs and $F$ does not is

> $$P(E \cap F^c) = P(E) - P(E \cap F)$$

If $F$ is a subset of $E$, then $E \cap F = F$ and $P(E \cap F^c) = P(E) - P(F)$.

> [!example]- $P(E) = 0.4$, $P(F) = 0.5$ and $P(E \cap F) = 0.2$. What is $P(E^c \cap F)$? {Example}
> - $E^c \cap F$ is the part of $F$ that does not overlap $E$.
> - $P(E^c \cap F) = P(F) - P(E \cap F) = 0.5 - 0.2 = 0.3$.

## De Morgan's laws

The complement of a union is the intersection of the complements:

> $$(E \cup F)^c = E^c \cap F^c$$

The complement of an intersection is the union of the complements:

> $$(E \cap F)^c = E^c \cup F^c$$

The first law makes "neither $E$ nor $F$" the complement of "$E$ or $F$", so the probability that neither occurs is

> $$P(E^c \cap F^c) = 1 - P(E \cup F)$$

> [!example]- 25% of drivers had an accident, 15% a speeding ticket and 10% both. What is the probability that a driver had neither? {Example}
> - By the [[Inclusion-Exclusion Principle|inclusion-exclusion principle]], $P(E \cup F) = 0.25 + 0.15 - 0.10 = 0.30$.
> - "Neither" is $E^c \cap F^c = (E \cup F)^c$.
> - The probability that a driver had neither is $1 - 0.30 = 0.70$.

## Splitting two events into disjoint regions

Two events cut the sample space into four regions: $E \cap F$, $E \cap F^c$, $E^c \cap F$ and $E^c \cap F^c$ (both, $E$ only, $F$ only, neither). No two regions share an outcome, so they are [[Mutually Exclusive Events|mutually exclusive]]. For mutually exclusive events $E \cap F = \varnothing$, and the probability of their union is

> $$P(E \cup F) = P(E) + P(F)$$

The four regions' probabilities add to 1, and each event's probability is the sum of its two regions. Laid out as a two-way table, each row and column total is the sum of its cells, so a missing cell is its total minus the known cells. Three events cut the sample space into eight regions in the same way ([[Venn Diagram#Venn diagrams of three events|Venn diagrams of three events]]).

> [!example]- How many of these policyholders have only one of the two policies, and what is the probability that a policyholder has neither? {Example}
> Of 1,000 policyholders, 600 have auto insurance, 300 have home insurance and 200 have both:
>
> | | Home | No home | Total |
> | :--- | ---: | ---: | ---: |
> | Auto | 200 | | 600 |
> | No auto | | | |
> | Total | 300 | | 1,000 |
>
> > [!answer]-
> > - Auto only is the auto total minus both: $600 - 200 = 400$.
> > - Home only is the home total minus both: $300 - 200 = 100$.
> > - So $200 + 400 + 100 = 700$ have at least one policy, and $1{,}000 - 700 = 300$ have neither.
> > - $400 + 100 = 500$ policyholders have only one of the two policies.
> > - The probability that a policyholder has neither is $300/1{,}000 = 0.3$.

> [!trap] Confusing "neither" with "not both"
> "Neither $E$ nor $F$" is $E^c \cap F^c = (E \cup F)^c$. "Not both" is $(E \cap F)^c$, which is larger. In the drivers example, neither has probability $0.70$, but not both has probability $1 - 0.10 = 0.90$.
