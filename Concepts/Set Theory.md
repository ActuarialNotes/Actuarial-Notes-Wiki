---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:d15fc1e2ab3d40aa3c1c5866de4c41dae00d90716a2358b853ac0d95a269bf8f
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.0 §1 Sets: universal set, empty set, power set, union/intersection/difference/complement, De Morgan's laws, distributive laws, symmetric difference, Venn diagrams, partitions, read 2026-11-06, sha256:88ae6adae225bb78dcf149c6e9807cc4de3d615bf803a343f73b387d3729824a — https://www.randomservices.org/random/foundations/Sets.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.1 §3 Probability Measure (Kolmogorov axioms a-c, countable additivity; probability as a function on the collection of events), read 2026-11-06, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.2.2 Set Operations (union, intersection, complement, difference, mutually exclusive, partitions, De Morgan's law, distributive law), read 2026-11-06, sha256:ad6875e63227a79d1d04f5560bf8509caf6fced03dbdf7091b5a89d2db7f487e — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.3.3 Finding Probabilities (complement rule, P(empty)=0, P(A)<=1, P(A-B)=P(A)-P(A∩B), inclusion-exclusion n=2, monotonicity, with proofs from the axioms), read 2026-11-06, sha256:d9bbfac6df61983d64593563b88f919487a03c5ea8c140c3ee3bb97e36ca33ca — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Set Theory.md
---

![[Media/Figures/Set_Theory.svg|340]]

**Set Theory** is the branch of mathematics that studies sets, collections of distinct objects called elements. In probability, the [[Sample Space|sample space]] $S$ is a set and an [[Event|event]] is a subset of it.

An element $s$ of a set $E$ is written $s \in E$. A set is written by listing its elements, $\{1, 2, 3\}$, or by a rule, $\{s \in S : s < 4\}$. A set $E$ is a subset of a set $F$ when every element of $E$ is also an element of $F$:

> $$E \subseteq F$$

The [[Set Operations|set operations]] union, intersection and complement turn the words "or", "and" and "not" into sets.

> [!example]- A fair die is rolled. Which outcomes make up the event "less than 5", and what is its probability? {Example}
> - The sample space is $S = \{1, 2, 3, 4, 5, 6\}$.
> - "Less than 5" is $E = \{s \in S : s < 5\} = \{1, 2, 3, 4\}$.
> - The 6 outcomes are equally likely, so the [[Probability|probability]] is $P(E) = \frac{4}{6} = \frac{2}{3}$.

## De Morgan's laws

The complement of a union is the intersection of the complements:

> $$(E \cup F)^c = E^c \cap F^c$$

The complement of an intersection is the union of the complements:

> $$(E \cap F)^c = E^c \cup F^c$$

"Neither $E$ nor $F$" is the first set. "Not both $E$ and $F$" is the second.

> [!example]- A policyholder has probability 0.80 of no auto claim this year, 0.90 of no home claim and 0.75 of neither. What are the probabilities of at least one claim and of both? {Example}
> - Let $E$ be "an auto claim" and $F$ be "a home claim", so $P(E) = 0.20$ and $P(F) = 0.10$.
> - "Neither" is $E^c \cap F^c = (E \cup F)^c$, so at least one claim has probability $P(E \cup F) = 1 - 0.75 = 0.25$.
> - By the [[Probability Addition Rule|addition rule]], both have probability $P(E \cap F)$, which is $0.20 + 0.10 - 0.25 = 0.05$.

> [!trap] "Neither" versus "not both"
> "Neither" is the complement of the union, so $P(\text{neither}) = 1 - P(E \cup F)$. Writing $1 - P(E \cap F)$ answers "not both", which is at least as large and usually larger.

## Partitions

Events $E_1, E_2, \ldots, E_n$ form a **partition** of $S$ when they are [[Mutually Exclusive Events|mutually exclusive]] and together make up $S$. Every outcome is then in exactly one of them, and their probabilities add to 1:

> $$P(E_1) + P(E_2) + \cdots + P(E_n) = 1$$

An event $E$ and its complement $E^c$ are the simplest partition. Any other event splits into its pieces in each part of a partition, which leads to [[The Law of Total Probability|the law of total probability]].

> [!example]- Every policyholder is classified as exactly one of low, medium or high risk. 50% are low risk and 30% are medium risk. What is the probability that a policyholder chosen at random is high risk? {Example}
> - Each policyholder is in exactly one class, so the three classes form a partition.
> - Their probabilities add to 1, so $P(\text{high})$ is $1 - 0.50 - 0.30 = 0.20$.

## An event inside another

If $F \subseteq E$, then $P(F) \le P(E)$. Since $E$ is the disjoint union of $F$ and $E \setminus F$, the probability of the outcomes in $E$ but not in $F$ is

> $$P(E \setminus F) = P(E) - P(F)$$

- $E \setminus F$ is the set of outcomes in $E$ that are not in $F$.

Containment is the case of largest overlap and smallest union. If $F \subseteq E$, then $P(E \cap F) = P(F)$ and $P(E \cup F) = P(E)$, the most the intersection and the least the union can be.

> [!trap] Subtracting without containment
> $P(E \setminus F) = P(E) - P(F)$ only when $F \subseteq E$. Otherwise it is $P(E) - P(E \cap F)$.
