---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:66b7b62089d65ef5ff24176f95b40ee77ab93042a48e78648d8b2d9a4e807e38
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Definition 1.1 and events (p.18, PDF p.26), union/intersection/difference/subset/complement and inclusive or (p.21, PDF p.29), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.0 Review of Set Theory, fetched 2026-09-27, sha256:709bad215891dbadd495e88c524d42641a53b4a054f2d3c678a39e8a171bd89e — https://www.probabilitycourse.com/chapter1/1_2_0_review_set_theory.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.2.2 Set Operations (incl. De Morgan's law, mutually exclusive), fetched 2026-09-27, sha256:aae5ce2766d2602e6bbdf92038d7bafdceca10b66ead36612dc7c6b31a35e12b — https://www.probabilitycourse.com/chapter1/1_2_2_set_operations.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (online ed.), §1.3.1 Random Experiments (sample space, outcome, event), fetched 2026-09-27, sha256:d93c82800caad31da983d799d5444d8627a5423b3338900bf22405af912bc7f4 — https://www.probabilitycourse.com/chapter1/1_3_1_random_experiments.php"
    - "Encyclopedia of Mathematics (Springer/EMS), article Set function, fetched 2026-09-27, sha256:168f98c55dc240fde7643462ca01950c62077204b0253c44239d8d197c4a469a — https://encyclopediaofmath.org/wiki/Set_function"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Set Theory.md
---

**Set Theory** is the branch of mathematics that studies collections of objects called **sets** and the relationships between them. It supplies the language of [[Probability]]: the [[Sample Space]] $S$ is the set of all outcomes, an [[Event]] is a subset of $S$, and [[Set Operations]] on events (union, intersection, complement) mirror the words "or", "and", and "not".

> $$A \subseteq S \iff (\omega \in A \Rightarrow \omega \in S)$$

- A set is specified by listing its elements, $A = \{1, 2, 3\}$, or by a defining property, $A = \{\, \omega : \omega \text{ satisfies } P \,\}$.
- $\omega \in A$ means $\omega$ is an element of $A$; $A \subseteq S$ means every element of $A$ also lies in $S$.
- The empty set $\varnothing$ contains no elements; the complement $A^c = S \setminus A$ is everything in $S$ not in $A$.
- Sets are the building blocks of a probability space $(S, \mathcal{F}, P)$, in which events are the sets whose probabilities are measured.

![[Media/Figures/Set_Theory.svg|340]]

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
