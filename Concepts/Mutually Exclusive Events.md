---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:b26d019b41c7b4b42813cfc0d911ec375d7d0c0877b593b93ec53e949719136e
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 property 4, Thm 1.2 (pairwise disjoint), Thm 1.3 (P(E)=Σ P(E∩A_i) over a partition), Thm 1.4 with proof 'added twice … subtracted once' (pp.22-24, PDF pp.30-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 independence (either event probability 0 counts as independent), Thm 4.1 independent iff P(E∩F)=P(E)P(F) (pp.139-140, PDF pp.147-148); Def. 4.2 mutual independence over every subset, pairwise does not imply mutual (p.141, PDF p.149); Exercise 7: A heads on first toss, B heads on second, C tosses match are pairwise independent but not independent (PDF p.159), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Probability Spaces > Independence (disjoint events with positive probability are dependent; probability 0 or 1 events independent of every event; pairwise vs mutual independence; Reliability: series reliability p1…pn, parallel 1−∏(1−pi), k out of n system works iff at least k components work), read 2026-11-06, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.4.1 Independence (complements of independent events independent; P(∪A_i)=1−∏(1−P(A_i)); warning not to confuse independence with disjointness), read 2026-11-06, sha256:fcf1aacf872ba059ed46a7a386f0e4725016d0ae10db09bd5d4f77d9883c35a7 — https://www.probabilitycourse.com/chapter1/1_4_1_independence.php"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mutually Exclusive Events.md
---

![[Media/Figures/Mutually_Exclusive_Events.svg|340]]

**Mutually Exclusive Events** are [[Event|events]] that cannot occur together. Two events $E$ and $F$ are mutually exclusive when they have no outcome in common:

> $$E \cap F = \varnothing$$

So the [[Probability|probability]] that both occur is $P(E \cap F) = 0$. Mutually exclusive events are also called disjoint.

> [!example]- A die is rolled. Is "an even number" mutually exclusive with "a 1 or a 3"? Is it mutually exclusive with "at least 5"? {Example}
> - "An even number" is $E = \{2, 4, 6\}$.
> - "A 1 or a 3" is $\{1, 3\}$, which has no outcome in common with $E$, so the two events are mutually exclusive.
> - "At least 5" is $\{5, 6\}$, which shares the outcome 6 with $E$, so these two are not mutually exclusive.

## Probability of a union of mutually exclusive events

The probability that one of two mutually exclusive events occurs is

> $$P(E \cup F) = P(E) + P(F)$$

For events $E_1, E_2, \ldots, E_n$ that are mutually exclusive in pairs, the probabilities add in the same way:

> $$
> \begin{aligned}
> & P(E_1 \cup E_2 \cup \cdots \cup E_n) \\
> & \quad = P(E_1) + P(E_2) + \cdots + P(E_n)
> \end{aligned}
> $$

An event such as "at least 3" or "at most 1" is split into the mutually exclusive values it contains, and their probabilities are added.

> [!example]- An urn holds 3 red balls and 2 blue balls. Two are drawn at random without replacement. What is the probability that they are the same colour? {Example}
> - "The same colour" is the union of "both red" and "both blue", which are mutually exclusive.
> - There are $\binom{5}{2} = 10$ equally likely pairs, so $P(\text{both red}) = \frac{\binom{3}{2}}{10} = \frac{3}{10}$ and $P(\text{both blue}) = \frac{\binom{2}{2}}{10} = \frac{1}{10}$.
> - The probability that they are the same colour is $\frac{3}{10} + \frac{1}{10} = 0.4$.

## Mutually exclusive and exhaustive events

Events that are mutually exclusive and together cover every outcome form a [[Set Theory#Partitions|partition]], and their probabilities add to 1. So the probability of any one of them is 1 minus the others:

> $$
> \begin{aligned}
> P(E_n) = 1 - \big( & P(E_1) + P(E_2) \\
> & + \cdots + P(E_{n-1}) \big)
> \end{aligned}
> $$

> [!example]- Each claim is classified as exactly one of property damage, bodily injury or other. 60% are property damage and 35% are bodily injury. What is the probability that a claim is property damage or bodily injury, and that it is other? {Example}
> - The classes are mutually exclusive, so property damage or bodily injury has probability $0.60 + 0.35 = 0.95$.
> - The classes are also exhaustive, so $P(\text{other}) = 1 - 0.95 = 0.05$.

## Intersections of three or more events

If $E$ and $F$ are mutually exclusive, every intersection that contains both of them is empty too. For any event $G$,

> $$P(E \cap F \cap G) = 0$$

> [!example]- $P(E) = 0.3$, $P(F) = 0.4$ and $P(G) = 0.2$. $E$ and $F$ are independent, and $G$ is mutually exclusive with both $E$ and $F$. What is $P(E \cup F \cup G)$? {Example}
> - $E$ and $F$ are [[Independent Events|independent]], so $P(E \cap F) = 0.3 \times 0.4 = 0.12$.
> - $G$ is mutually exclusive with $E$ and with $F$, so $P(E \cap G)$, $P(F \cap G)$ and $P(E \cap F \cap G)$ are all 0.
> - By the [[Inclusion-Exclusion Principle|inclusion-exclusion principle]], $P(E \cup F \cup G)$ is $0.3 + 0.4 + 0.2 - 0.12$, which is $0.78$.

> [!trap] Mutually exclusive taken for independent
> Mutually exclusive events with positive probabilities are never independent. If $E$ occurs, $F$ cannot, so $P(E \cap F) = 0$, not $P(E)\,P(F)$.
