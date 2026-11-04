---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:29e6c571ef43a380f016d35f8a0ce4d6bb9c92518b8df18fbcd70a7902cbb395
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Definition 1.1 and events (p.18, PDF p.26), union/intersection/difference/subset/complement and inclusive or (p.21, PDF p.29), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.0 Review of Set Theory, fetched 2026-09-27, sha256:709bad215891dbadd495e88c524d42641a53b4a054f2d3c678a39e8a171bd89e — https://www.probabilitycourse.com/chapter1/1_2_0_review_set_theory.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (incl. De Morgan's law, mutually exclusive), fetched 2026-09-27, sha256:aae5ce2766d2602e6bbdf92038d7bafdceca10b66ead36612dc7c6b31a35e12b — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (sample space, outcome, event), fetched 2026-09-27, sha256:d93c82800caad31da983d799d5444d8627a5423b3338900bf22405af912bc7f4 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "Encyclopedia of Mathematics (Springer/EMS), article Set function, fetched 2026-09-27, sha256:168f98c55dc240fde7643462ca01950c62077204b0253c44239d8d197c4a469a — https://encyclopediaofmath.org/wiki/Set_function"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.0 Review of Set Theory (equality: A=B iff A⊂B and B⊂A), fetched 2026-10-30, sha256:6749502933aab3a00f75adfda607b430dd991edc1a6d751b1cc1044f30226492 — https://www.probabilitycourse.com/chapter1/1_2_0_review_set_theory.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.3 Finding Probabilities (if A⊂B then A∩B=A and P(A)≤P(B); P(A−B)=P(A)−P(A∩B)), fetched 2026-10-30, sha256:984952f1ea762230cb0c228497cb48dced7032a55616e2ef6ca339338bd2fdfb — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures, difference rule, proper difference rule, increasing property, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 1.1 property 3 (p.22, PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and inclusive 'or' (p.21, PDF p.29), Thm 1.1 property 3 (p.22, PDF p.30), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (De Morgan's law; A−B = A∩B^c), fetched 2026-11-04, sha256:4025d5e8caa7de295a64d919f3cfc5b2f48996971272f227a574e5e7c4c5f9fd — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.3 Finding Probabilities (P(A−B)=P(A)−P(A∩B); if A⊂B then P(A)≤P(B)), fetched 2026-11-04, sha256:63d80d6b505c6ee80359645000bca6d4788ae1c97446662a77dd6deb07c7e946 — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, §2.3 Probability Measures (Kolmogorov axioms on events; difference rule; proper difference rule; increasing property), fetched 2026-11-04, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcomes a-g (PDF p.2; vault Exam P-1 page numbers them 1-7), re-read 2026-11-04, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Set Theory.md
---

**Set Theory** is the branch of mathematics that studies collections of objects called **sets** and the relationships between them. It supplies the language of [[Probability]]: the [[Sample Space]] $S$ is the set of all outcomes, an [[Event]] is a subset of $S$, and [[Set Operations]] on events (union, intersection, complement) mirror the words "or", "and", and "not".

> $$A \subseteq S \iff (\omega \in A \Rightarrow \omega \in S)$$

- A set is specified by listing its elements, $A = \{1, 2, 3\}$, or by a defining property, $A = \{\, \omega : \omega \text{ satisfies } P \,\}$.
- $\omega \in A$ means $\omega$ is an element of $A$; $A \subseteq S$ means every element of $A$ also lies in $S$.
- The empty set $\varnothing$ contains no elements; the complement $A^c = S \setminus A$ is everything in $S$ not in $A$.
- Sets are the building blocks of a probability space $(S, \mathcal{F}, P)$, in which events are the sets whose probabilities are measured.

> [!idea] The idea
> The [[Axioms of Probability]] are stated for sets, so once a sentence about events is rewritten as a union, intersection or complement, every probability rule applies mechanically. A relation between sets becomes a relation between numbers: if $A \subseteq B$, then $P(A) \leq P(B)$.

![[Media/Figures/Set_Theory.svg|340]]

### Equal sets and subsets

- Two sets are equal, $A = B$, exactly when they contain the same elements, that is, when $A \subseteq B$ and $B \subseteq A$.

> $$A = B \iff (A \subseteq B \text{ and } B \subseteq A)$$

- If $A \subseteq B$ but some outcome of $B$ is not in $A$, then $A$ is a proper subset of $B$ and $A \neq B$: an event defined by a stricter condition is a proper subset of the broader event, not the same event.
- If $B \subseteq A$, then $A \cup B = A$ and $A \cap B = B$, so $P(A \cup B) = P(A)$ and $P(A \cap B) = P(B)$: the union of an event with a subset of it is the larger event.
- If $B \subseteq A$, then $P(B) \leq P(A)$, and since $A$ is the disjoint union of $B$ and $A \setminus B$, the difference rule gives $P(A \setminus B) = P(A) - P(B)$.

> $$B \subseteq A \implies P(A \setminus B) = P(A) - P(B)$$

- Containment is the case of largest overlap and smallest union: if $A \subseteq B$, then $P(A \cap B) = P(A)$ and $P(A \cup B) = P(B)$, the most the intersection and the least the union can be.

> [!example]- An Event and a Subset of It {Example}
> A fair die is rolled. Let $A = \{2, 4, 6\}$ (even) and $B = \{6\}$. Find $P(A \cup B)$, $P(A \cap B)$ and $P(A \setminus B)$.
>
> > [!answer]-
> > Every outcome of $B$ is in $A$, so $B \subseteq A$ (a proper subset: 2 and 4 are in $A$ but not $B$). Then $A \cup B = A$ and $A \cap B = B$:
> > $$P(A \cup B) = P(A) = \frac{3}{6}$$
> > $$P(A \cap B) = P(B) = \frac{1}{6}$$
> > $$P(A \setminus B) = P(A) - P(B) = \frac{2}{6}$$
> > Check: $A \setminus B = \{2, 4\}$, which has probability $2/6$.

> [!example]- Union, Intersection, and Difference of Two Sets {Example}
> Given $A = \{1, 2, 3, 4\}$ and $B = \{3, 4, 5, 6\}$, find $A \cup B$, $A \cap B$, and $A \setminus B$.
>
> > [!answer]-
> > $$A \cup B = \{1, 2, 3, 4, 5, 6\}$$
> > $$A \cap B = \{3, 4\}$$
> > $$A \setminus B = \{1, 2\}$$
> > The union collects elements in either set, the intersection those in both, and the difference those in $A$ only.

> [!example]- Complement and De Morgan's Law {Example}
> A [[Sample Space]] for a die roll is $S = \{1, 2, 3, 4, 5, 6\}$. Let $A = \{2, 4, 6\}$ (even) and $B = \{4, 5, 6\}$ (greater than 3). Find $A^c$ and verify $(A \cup B)^c = A^c \cap B^c$.
>
> > [!answer]-
> > The complements are $A^c = S \setminus A = \{1, 3, 5\}$ and $B^c = \{1, 2, 3\}$. Then:
> > $$A \cup B = \{2, 4, 5, 6\} \implies (A \cup B)^c = \{1, 3\}$$
> > $$A^c \cap B^c = \{1, 3, 5\} \cap \{1, 2, 3\} = \{1, 3\}$$
> > Both sides equal $\{1, 3\}$, confirming De Morgan's Law.

> [!tip]- How it appears on the exam
> - **Exam P** (General Probability, objective 1): the page is tagged on 29 Exam P questions in the bank, almost all of them word problems whose events must be written as sets before any rule is applied.
> - Survey and portfolio counts: totals for each group and some overlaps are given, and a region ("only auto", "neither") is asked for.
> - "Neither" and "at least one" through the complement: given $P(A^c)$, $P(B^c)$ and $P(A^c \cap B^c)$, find a union or an intersection.
> - Events described in words (thefts in each of three years, accidents in two policy years), with the task to pick the set expression or the subset relation that holds.

> [!warning]- Exam traps
> - **De Morgan the wrong way round.** "Neither $A$ nor $B$" is $(A \cup B)^c = A^c \cap B^c$. Writing $1 - P(A \cap B)$ gives "not both", which is at least as large and usually larger.
> - **"Or" read as exclusive.** $A \cup B$ includes outcomes in both events; treating "$A$ or $B$" as "exactly one" drops the overlap and undercounts.
> - **The difference rule without containment.** $P(A \setminus B) = P(A) - P(B)$ only when $B \subseteq A$; otherwise it is $P(A) - P(A \cap B)$. A negative "probability" is the usual sign of the slip.
