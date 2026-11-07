---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:7cf7b8ac1d754f0a5d06c97a047edb197795edcb571c4934e4c8889e0fc503f9
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Def. 1.1 sample space/outcomes/events, Def. 1.2 P(E)=Σ_{ω∈E} m(ω), Examples 1.6-1.9, set operations and Fig. 1.7, Thm 1.1 (P(E)≥0, P(Ω)=1, monotonicity, disjoint additivity, complement with proof), Thms 1.2-1.4 and Cor. 1.1 (pp.18-24, PDF pp.26-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.2.1 Venn Diagrams (rectangle = universal set S, sets as closed regions), read 2026-11-06, sha256:17ef1be99b65701d11585defc07269bc6c4794f12c04b4d5332b7b4e6128cad9 — https://www.probabilitycourse.com/chapter1/1_2_1_venn.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.2.2 Set Operations (union, intersection, complement, difference, mutually exclusive, partitions, De Morgan's law, distributive law), read 2026-11-06, sha256:ad6875e63227a79d1d04f5560bf8509caf6fced03dbdf7091b5a89d2db7f487e — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §1.3.3 Finding Probabilities (complement rule, P(empty)=0, P(A)<=1, P(A-B)=P(A)-P(A∩B), inclusion-exclusion n=2, monotonicity, with proofs from the axioms), read 2026-11-06, sha256:d9bbfac6df61983d64593563b88f919487a03c5ea8c140c3ee3bb97e36ca33ca — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Ch.0 §1 Sets: universal set, empty set, power set, union/intersection/difference/complement, De Morgan's laws, distributive laws, symmetric difference, Venn diagrams, partitions, read 2026-11-06, sha256:88ae6adae225bb78dcf149c6e9807cc4de3d615bf803a343f73b387d3729824a — https://www.randomservices.org/random/foundations/Sets.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, introduction (calculus incl. series, differentiation, integration assumed, PDF p.1) and Topic 1 General Probability learning objective and outcomes a-g (PDF p.2), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Venn Diagram.md
---

![[Media/Figures/Venn_Diagram.svg|340]]

A **Venn Diagram** is a picture of [[Event|events]] in a [[Sample Space|sample space]]: a rectangle for the sample space $S$ and a circle inside it for each event. The circles cut the rectangle into regions with no outcome in common, so the [[Probability|probability]] of an event is the sum of the probabilities of the regions inside it.

Two events $E$ and $F$ cut $S$ into four regions:

| Region | Event |
| --- | --- |
| in both $E$ and $F$ | $E \cap F$ |
| in $E$ only | $E \cap F^c$ |
| in $F$ only | $E^c \cap F$ |
| in neither | $(E \cup F)^c$ |

The circle for $E$ holds the region in $E$ only and the region in both, so the probability of the region in $E$ only is

> $$P(E \cap F^c) = P(E) - P(E \cap F)$$

The region in neither is the complement of the union, so by the [[Axioms of Probability#The complement rule|complement rule]] its probability is

> $$P\big((E \cup F)^c\big) = 1 - P(E \cup F)$$

A count of people in each region works the same way as a probability. Dividing each count by the total gives the region's probability.

> [!example]- An insurer has 100 policyholders. 70 have an auto policy, 40 have a homeowners policy and 20 have both. How many policyholders are in each region of the Venn diagram? {Example}
> - Let $E$ be "has an auto policy" and $F$ be "has a homeowners policy".
> - The region in both is given directly: 20.
> - The auto circle's 70 includes the 20 in both, so auto only is $70 - 20 = 50$.
> - Homeowners only is $40 - 20 = 20$.
> - The union is $50 + 20 + 20 = 90$, the same as $70 + 40 - 20$ by the [[Probability Addition Rule|addition rule]].
> - Neither is $100 - 90 = 10$.
>
> | Region | Policyholders |
> | --- | --- |
> | auto only | 50 |
> | both | 20 |
> | homeowners only | 20 |
> | neither | 10 |

## Exactly one of two events

The event that exactly one of $E$ and $F$ occurs is the two "only" regions together. Its probability is

> $$P(\text{exactly one of } E, F) = P(E) + P(F) - 2P(E \cap F)$$

The event that at least one of $E$ and $F$ occurs is their union $E \cup F$. The event that at most one occurs is the complement of $E \cap F$.

> [!example]- An insurer has 100 policyholders. 70 have an auto policy, 40 have a homeowners policy and 20 have both. What is the probability that a policyholder chosen at random has exactly one of the two policies? {Example}
> - Let $E$ be "has an auto policy" and $F$ be "has a homeowners policy", so $P(E) = 0.70$, $P(F) = 0.40$ and $P(E \cap F) = 0.20$.
> - The two "only" regions hold $50 + 20 = 70$ policyholders, which agrees with the formula.
> - The probability of exactly one policy is $0.70 + 0.40 - 2(0.20) = 0.70$.

## Venn diagrams of three events

Three events $E$, $F$ and $G$ cut $S$ into eight regions: three in one event only, three in exactly two events, one in all three, and one outside all three. The probability of $E$ is the sum of the four regions inside its circle:

> $$
> \begin{aligned}
> P(E) = {} & P(E \cap F^c \cap G^c) \\
> & + P(E \cap F \cap G^c) \\
> & + P(E \cap F^c \cap G) \\
> & + P(E \cap F \cap G)
> \end{aligned}
> $$

Fill a three-event diagram from the centre out. Give each unknown region a symbol, and write each total the question gives as a sum of regions.

> [!example]- In a group of 120 people, 50 read paper $X$, 45 read $Y$ and 40 read $Z$. 20 read only $X$, 25 only $Y$, 15 only $Z$, and 5 read all three. How many read exactly two papers, and how many read none? {Example}
> - Let $a$, $b$ and $c$ be the numbers who read only $X$ and $Y$, only $X$ and $Z$, and only $Y$ and $Z$.
> - Each paper's total is the sum of its four regions: $20 + a + b + 5 = 50$, $25 + a + c + 5 = 45$ and $15 + b + c + 5 = 40$.
> - So $a + b = 25$, $a + c = 15$ and $b + c = 20$.
> - Adding the three gives $2(a + b + c) = 60$, so $a + b + c = 30$ read exactly two papers.
> - The seven regions inside the circles hold $20 + 25 + 15 + 30 + 5 = 95$ people, so $120 - 95 = 25$ read none.

> [!trap] A pairwise count used as an "exactly two" region
> "30 read $X$ and $Y$" includes the people who read all three papers. If 5 read all three, the region for $X$ and $Y$ only is $30 - 5 = 25$. Putting 30 in that region counts the centre twice.
