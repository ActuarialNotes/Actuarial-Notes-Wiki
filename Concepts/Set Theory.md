---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:ffbf4a6a08c582a7fa3c33beb1e1440ec29225fda0cbc07c8567ad1fe4be535d
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

**Set Theory** is the branch of mathematics that studies collections of objects called **sets** and the relationships between them. Set theory supplies the language of [[Probability]]. The [[Sample Space]] $S$ is the set of all outcomes, and an [[Event]] is a subset of $S$.

> $$A \subseteq S \iff (\omega \in A \Rightarrow \omega \in S)$$

- $\omega \in A$ means $\omega$ is an element of $A$, and $A \subseteq S$ means every element of $A$ also lies in $S$.
- A set is specified by listing its elements, $A = \{1, 2, 3\}$, or by a defining property, $A = \{\, \omega : \omega \text{ satisfies } P \,\}$.
- The [[Set Operations|set operations]] union, intersection and complement mirror the words "or", "and" and "not".

> [!idea] The idea
> Exam questions describe events in words, but the [[Axioms of Probability]] are stated for sets. Set theory translates the words into sets: "or" becomes a union, "and" an intersection and "not" a complement. Once a sentence about events is rewritten this way, every probability rule applies mechanically.

![[Media/Figures/Set_Theory.svg|340]]

## Sets of clients

An insurance agent has six clients, numbered 1 to 6. Clients 1 to 4 have an auto policy and clients 3 to 5 have a homeowners policy.

> $$S = \{1, 2, 3, 4, 5, 6\}$$

- The auto clients are $A = \{1, 2, 3, 4\}$ and the homeowners clients are $H = \{3, 4, 5\}$.
- $3 \in A$, because client 3 has an auto policy. $6 \notin A$.
- The empty set $\varnothing$ contains no elements. "Clients with neither policy and with both policies" is $\varnothing$.
- The complement $A^c = S \setminus A$ is everything in $S$ not in $A$. Here $A^c = \{5, 6\}$, the clients without auto.

## "Or", "and" and "but not"

Which clients have an auto **or** a homeowners policy? Which have both? Each question is a set built from $A$ and $H$.

| Words | Set | Clients |
|---|---|---|
| auto or home | $A \cup H$ | 1, 2, 3, 4, 5 |
| auto and home | $A \cap H$ | 3, 4 |
| auto but not home | $A \setminus H$ | 1, 2 |
| neither | $(A \cup H)^c$ | 6 |

- The union collects elements in either set, including those in both. "Or" means at least one.
- The difference $A \setminus H$ is the same set as $A \cap H^c$.
- Counting the union by adding the two sets counts clients 3 and 4 twice. So $|A \cup H| = 4 + 3 - 2 = 5$, which is the [[Inclusion-Exclusion Principle|inclusion-exclusion principle]].

If one client is chosen at random, each has probability $1/6$, and every set becomes a probability. $P(A \cup H) = 5/6$ and $P(A \cap H) = 2/6$.

## "Neither" and "not both"

"Neither policy" is the complement of "at least one policy". It is also the clients without auto **and** without home. That second reading is De Morgan's law.

> $$(A \cup H)^c = A^c \cap H^c$$

- $A^c \cap H^c = \{5, 6\} \cap \{1, 2, 6\} = \{6\}$, the same client as in the table.

"Not both" is a different set. It is the complement of the intersection, and it equals the clients missing at least one policy.

> $$(A \cap H)^c = A^c \cup H^c$$

- $A^c \cup H^c = \{1, 2, 5, 6\}$. "Not both" holds four clients, while "neither" holds one.

> [!trap] "Neither" is not "not both"
> $P(\text{neither}) = 1 - P(A \cup H) = 1/6$. Writing $1 - P(A \cap H) = 4/6$ answers "not both", which is at least as large and usually larger.

## Equal sets and subsets

Client 3 is the only client with a claim this year, so $C = \{3\}$. Every client in $C$ is in $A$, so $C \subseteq A$.

- Two sets are equal exactly when each is a subset of the other.

> $$A = B \iff (A \subseteq B \text{ and } B \subseteq A)$$

- $C$ is a proper subset of $A$, because clients 1, 2 and 4 are in $A$ but not in $C$. An event defined by a stricter condition is a proper subset of the broader event, not the same event.
- Because $C \subseteq A$, the union is the larger set and the intersection the smaller one: $A \cup C = A$ and $A \cap C = C$.
- $A$ splits into the disjoint pieces $C$ and $A \setminus C = \{1, 2, 4\}$. So $P(C) \leq P(A)$, and the difference rule holds.

> $$C \subseteq A \implies P(A \setminus C) = P(A) - P(C)$$

- Here $P(A \setminus C) = 4/6 - 1/6 = 3/6$.
- Containment is the case of largest overlap and smallest union. If $C \subseteq A$, then $P(A \cap C) = P(C)$ and $P(A \cup C) = P(A)$. No two events with these probabilities can overlap more or have a smaller union.

## Splitting the sample space

$A$ and $A^c$ share no client, and together they make up $S$. Two events like this, mutually exclusive with at least one certain to occur, form a **partition** of $S$.

A partition splits any other event into pieces that can be added. The homeowners clients are those with auto and those without.

> $$P(H) = P(H \cap A) + P(H \cap A^c)$$

- $H \cap A = \{3, 4\}$ and $H \cap A^c = \{5\}$, so $P(H) = 2/6 + 1/6 = 3/6$.
- With more pieces, the same split is [[The Law of Total Probability|the law of total probability]].

Sets are the building blocks of a probability space $(S, \mathcal{F}, P)$. In it, $\mathcal{F}$ is the collection of events, the sets whose probabilities are measured, and $P$ is the probability.

## Try it

> [!example]- Complement and De Morgan's law {Example}
> A [[Sample Space]] for a die roll is $S = \{1, 2, 3, 4, 5, 6\}$. Let $A = \{2, 4, 6\}$ (even) and $B = \{4, 5, 6\}$ (greater than 3). Find $A^c$ and verify $(A \cup B)^c = A^c \cap B^c$.
>
> > [!answer]-
> > **Plan:** compute each side from the listed sets.
> >
> > The complements are $A^c = S \setminus A = \{1, 3, 5\}$ and $B^c = \{1, 2, 3\}$. Then:
> > $$A \cup B = \{2, 4, 5, 6\} \implies (A \cup B)^c = \{1, 3\}$$
> > $$A^c \cap B^c = \{1, 3, 5\} \cap \{1, 2, 3\} = \{1, 3\}$$
> > Both sides equal $\{1, 3\}$, confirming De Morgan's Law.

> [!example]- An event and a subset of it {Example}
> A fair die is rolled. Let $A = \{2, 4, 6\}$ (even) and $B = \{6\}$. Find $P(A \cup B)$, $P(A \cap B)$ and $P(A \setminus B)$.
>
> > [!answer]-
> > **Plan:** check containment first, then use the subset rules.
> >
> > Every outcome of $B$ is in $A$, so $B \subseteq A$. It is a proper subset, because 2 and 4 are in $A$ but not in $B$. Then $A \cup B = A$ and $A \cap B = B$.
> > $$P(A \cup B) = P(A) = \frac{3}{6}$$
> > $$P(A \cap B) = P(B) = \frac{1}{6}$$
> > $$P(A \setminus B) = P(A) - P(B) = \frac{2}{6}$$
> > Check: $A \setminus B = \{2, 4\}$, which has probability $2/6$.

> [!example]- Claims from complements {Example}
> A policyholder has probability 0.80 of no auto claim this year, 0.90 of no home claim, and 0.75 of neither. Find the probability of at least one claim and of both.
>
> > [!answer]-
> > **Plan:** "neither" is the complement of the union. Then the union gives the intersection.
> >
> > $$
> > \begin{align*}
> > P(A \cup H) &= 1 - P(A^c \cap H^c) \\
> > &= 1 - 0.75 \\
> > &= 0.25 \\
> > P(A \cap H) &= P(A) + P(H) - P(A \cup H) \\
> > &= 0.20 + 0.10 - 0.25 \\
> > &= 0.05
> > \end{align*}
> > $$
> >
> > Why not $1 - 0.75$ for "both"? Because 0.75 is "neither", and its complement is "at least one".

> [!warning]- Exam traps
> - **De Morgan the wrong way round.** "Neither $A$ nor $B$" is $(A \cup B)^c = A^c \cap B^c$. Writing $1 - P(A \cap B)$ gives "not both", which is at least as large and usually larger.
> - **"Or" read as exclusive.** $A \cup B$ includes outcomes in both events. Treating "$A$ or $B$" as "exactly one" drops the overlap and undercounts.
> - **The difference rule without containment.** $P(A \setminus B) = P(A) - P(B)$ only when $B \subseteq A$. Otherwise it is $P(A) - P(A \cap B)$. When $P(B) > P(A)$, the slip gives a negative "probability". Otherwise it gives a plausible but wrong number, so check containment before subtracting.
