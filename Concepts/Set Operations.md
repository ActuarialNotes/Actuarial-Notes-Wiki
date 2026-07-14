**Set Operations** are the fundamental ways of combining or modifying [[Set Theory|sets]] — union, intersection, complement, and difference — which translate directly into logical statements about [[Event|events]] in probability.

> $$A \cup B = \{\, \omega : \omega \in A \text{ or } \omega \in B \,\}$$

> $$A \cap B = \{\, \omega : \omega \in A \text{ and } \omega \in B \,\}$$

> $$A^c = S \setminus A, \qquad A \setminus B = A \cap B^c$$

- Union means "or", intersection means "and", the complement $A^c$ means "not $A$", and the difference $A \setminus B$ means "in $A$ but not $B$".
- De Morgan's laws relate them: $(A \cup B)^c = A^c \cap B^c$ and $(A \cap B)^c = A^c \cup B^c$.
- On [[Mutually Exclusive Events|disjoint]] events $A \cap B = \varnothing$, so $P(A \cup B) = P(A) + P(B)$.

> [!example]- Finding $P(A^c \cap B)$ from Given Probabilities {Example}
> If $P(A) = 0.4$, $P(B) = 0.5$, and $P(A \cap B) = 0.2$, what is $P(A^c \cap B)$?
>
> > [!answer]-
> > $A^c \cap B$ is the part of $B$ that does not overlap $A$:
> > $$P(A^c \cap B) = P(B) - P(A \cap B) = 0.5 - 0.2 = 0.3$$
