---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:d2ef6a24a890df8b3d2e02b9cbac6ad1e58ab71a53617e86033c74e993204737
  sources:
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §1.2 Theorem 1.1 property 5, p.22 (PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Finding Probabilities, §1.3.3 Finding Probabilities, complement rule P(A^c)=1-P(A), sha256:d5e57b2e884034fe523f2d056a51dab0c818c6482c3ba7be639b03647420da7f — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "Probability | Axioms | Chance | Likelihood, §1.3.2 Probability, Axioms 1-3, sha256:7d3745935ae618b0bfd74d8b5134437aefa7c9ca2e119dbfddd90ff790b8c634 — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Axioms of Probability.md
---

![[Media/Figures/Axioms_of_Probability.svg|340]]

The **Axioms of Probability** are the three rules that every [[Probability|probability]] $P$ on a [[Sample Space|sample space]] $S$ must satisfy.

The first axiom, **non-negativity**, states that for every [[Event|event]] $E$,

> $$P(E) \geq 0$$

The second axiom, **total probability**, states that the sample space has probability 1:

> $$P(S) = 1$$

The third axiom, **additivity**, states that for any sequence of [[Mutually Exclusive Events|mutually exclusive]] events $E_1, E_2, \ldots$, the probability of their union is the sum of their probabilities:

> $$\displaystyle P\!\left(\bigcup_{i=1}^{\infty} E_i\right) = \sum_{i=1}^{\infty} P(E_i)$$

- The sequence may be finite, as with two mutually exclusive events $E$ and $F$, where $P(E \cup F) = P(E) + P(F)$.

> [!idea] The idea
> Every other rule of probability follows from these three.

For example, an event $E$ and its complement $E^c$ are mutually exclusive and together make up $S$. So the second and third axioms give $P(E) + P(E^c) = 1$.

> [!example]- An insurer assigns probability 0.60 to no claims on a policy in a year, 0.25 to one claim, 0.10 to two claims and 0.05 to three or more claims. Is this a valid probability? {Example}
> - Non-negativity holds: every probability is at least 0.
> - Total probability holds: the four outcomes are mutually exclusive and exhaustive, and $0.60 + 0.25 + 0.10 + 0.05 = 1$.
> - Additivity gives every other event its probability. "One or two claims" has probability $0.25 + 0.10 = 0.35$.
> - The model is valid. Had the four numbers added to 1.05, it would break the second axiom.

## The complement rule

The [[Event#Combining events|complement]] $E^c$ is the event that $E$ does not occur. Its probability is

> $$P(E^c) = 1 - P(E)$$

> [!example]- The number of claims $N$ on a policy is $k = 0, 1, 2, \ldots$ with probability $P(N = k) = 0.5^{k+1}$. What is the probability of at least one claim? {Example}
> - "At least one claim" is the union of the mutually exclusive events $\{N = 1\}, \{N = 2\}, \ldots$.
> - By additivity, its probability is $0.25 + 0.125 + 0.0625 + \cdots = 0.5$.
> - The complement rule gives the same answer more quickly: $1 - P(N = 0) = 1 - 0.5 = 0.5$.

## Bounds on a probability

The axioms also bound every probability. For every event $E$,

> $$0 \leq P(E) \leq 1$$

If every outcome of an event $E$ is also in an event $F$, $E \subseteq F$, then

> $$P(E) \leq P(F)$$

The [[Event#Special events|impossible event]] $\varnothing$ has probability $P(\varnothing) = 0$.

> [!example]- A claim model gives a probability of 0.40 to at least one claim. Can it give a probability of 0.45 to at least two claims? {Example}
> - Every policy with at least two claims has at least one claim, so "at least two" $\subseteq$ "at least one".
> - Its probability can be at most 0.40.
> - The model can't give it 0.45.

> [!trap] Adding events that overlap
> Additivity holds only for mutually exclusive events. If $P(E) = 0.40$ and $P(F) = 0.95$, then $0.40 + 0.95 = 1.35$ is above 1, which is the sign that the events overlap. Subtract the overlap once, by the [[Probability Addition Rule|addition rule]]: $P(E \cup F) = P(E) + P(F) - P(E \cap F)$.
