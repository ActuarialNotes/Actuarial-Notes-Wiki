**Set Theory** is the branch of mathematics that studies collections of objects called **sets** and the relationships between them. It supplies the language of [[Probability]]: the [[Sample Space]] $S$ is the set of all outcomes, an [[Event]] is a subset of $S$, and [[Set Operations]] on events (union, intersection, complement) mirror the words "or", "and", and "not".

> $$A \subseteq S \iff (\omega \in A \Rightarrow \omega \in S)$$

- A set is specified by listing its elements, $A = \{1, 2, 3\}$, or by a defining property, $A = \{\, \omega : \omega \text{ satisfies } P \,\}$.
- $\omega \in A$ means $\omega$ is an element of $A$; $A \subseteq S$ means every element of $A$ also lies in $S$.
- The empty set $\varnothing$ contains no elements; the complement $A^c = S \setminus A$ is everything in $S$ not in $A$.
- Sets are the building blocks of a probability space $(S, \mathcal{F}, P)$, in which events are the sets whose probabilities are measured.

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
