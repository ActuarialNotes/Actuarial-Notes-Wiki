---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:e48e4cb6547890358cf13f5fe10f2930a701c60f6d00bc5fbcfc2125ddbcbce2
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 set operations and Venn Fig. 1.7, Thm 1.1-1.4 incl. Thm 1.4 proof 'added twice' (pp.21-24, PDF pp.29-32); Infinite Sample Spaces (pp.28-29, PDF pp.36-37), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Set Theory.md
---

**Set Theory** is the branch of mathematics that studies collections of objects called **sets** and the relationships between them. Set theory supplies the language of [[Probability]]. The [[Sample Space]] $S$ is the set of all outcomes, and an [[Event]] is a subset of $S$. The [[Set Operations]] union, intersection and complement mirror the words "or", "and" and "not".

> $$A \subseteq S \iff (\omega \in A \Rightarrow \omega \in S)$$

- A set is specified by listing its elements, $A = \{1, 2, 3\}$, or by a defining property, $A = \{\, \omega : \omega \text{ satisfies } P \,\}$.
- $\omega \in A$ means $\omega$ is an element of $A$.
- $A \subseteq S$ means every element of $A$ also lies in $S$.
- The empty set $\varnothing$ contains no elements; the complement $A^c = S \setminus A$ is everything in $S$ not in $A$.
- Sets are the building blocks of a probability space $(S, \mathcal{F}, P)$, in which events are the sets whose probabilities are measured.

> [!idea] The idea
> Exam questions describe events in words, but the [[Axioms of Probability]] are stated for sets. Set theory translates the words into sets: "or" becomes a union, "and" an intersection and "not" a complement. Once a sentence about events is rewritten this way, every probability rule applies mechanically.

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
> > Every outcome of $B$ is in $A$, so $B \subseteq A$. It is a proper subset, because 2 and 4 are in $A$ but not in $B$. Then $A \cup B = A$ and $A \cap B = B$:
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
> - **Exam P** (General Probability, objective 1): the page is tagged on 29 Exam P questions in the bank. Almost all of them are word problems whose events must be written as sets before any rule is applied.
> - Survey and portfolio counts give the totals for each group and some overlaps, and ask for a region such as "only auto" or "neither".
> - "Neither" and "at least one" are found through the complement. Given $P(A^c)$, $P(B^c)$ and $P(A^c \cap B^c)$, the question asks for a union or an intersection.
> - Events are described in words, such as thefts in each of three years or accidents in two policy years. The task is to pick the set expression or the subset relation that holds.

> [!warning]- Exam traps
> - **De Morgan the wrong way round.** "Neither $A$ nor $B$" is $(A \cup B)^c = A^c \cap B^c$. Writing $1 - P(A \cap B)$ gives "not both", which is at least as large and usually larger.
> - **"Or" read as exclusive.** $A \cup B$ includes outcomes in both events. Treating "$A$ or $B$" as "exactly one" drops the overlap and undercounts.
> - **The difference rule without containment.** $P(A \setminus B) = P(A) - P(B)$ only when $B \subseteq A$. Otherwise it is $P(A) - P(A \cap B)$. When $P(B) > P(A)$, the slip gives a negative "probability". Otherwise it gives a plausible but wrong number, so check containment before subtracting.
