---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1da55c7c116b0de3ae06e8a280b6cb54e24bbc9e0056c03c1455eeceb10e816b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Theory.md
---

**Probability Theory** is the mathematical framework for quantifying uncertainty. It assigns to each [[Event|event]] $E$ in a [[Sample Space|sample space]] $S$ a [[Probability|probability]] $P(E)$, a number in $[0, 1]$ that satisfies the three [[Axioms of Probability|axioms of probability]].

The first axiom, non-negativity, is that for every event $E$

> $$P(E) \ge 0$$

The second, normalization, is that the sample space has probability

> $$P(S) = 1$$

The third, countable additivity, is that for [[Mutually Exclusive Events|mutually exclusive]] events $E_1, E_2, \ldots$ the probability of their union is

> $$P\!\left(\bigcup_{i=1}^{\infty} E_i\right) = \sum_{i=1}^{\infty} P(E_i)$$

The events to which $P$ assigns probabilities form a collection $\mathcal{F}$ of subsets of $S$, called the event algebra. The other [[Probability Rules|probability rules]], including the complement rule, the addition rule and [[Conditional Probability|conditional probability]], are derived from the three axioms.

> [!example]- A fair die is rolled. What is the probability of rolling a number greater than 4? {Example}
> - The sample space is $S = \{1, 2, 3, 4, 5, 6\}$, and each outcome has probability $\frac{1}{6}$.
> - The event is $E = \{5, 6\}$, the union of two mutually exclusive outcomes.
> - By countable additivity, $P(E) = P(\{5\}) + P(\{6\}) = \frac{1}{3}$.
> - As a check, $P(E) + P(E^c) = \frac{1}{3} + \frac{2}{3} = 1 = P(S)$.
