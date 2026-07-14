The **Inclusion-Exclusion Principle** is a counting rule for the probability (or size) of a union of overlapping [[Event|events]]: add the individual probabilities, subtract the pairwise intersections, add back the triple intersections, and so on, so that no outcome is counted more than once.

> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

> $$\begin{aligned} P(A \cup B \cup C) = {}& P(A) + P(B) + P(C) \\ &- P(A \cap B) - P(A \cap C) - P(B \cap C) \\ &+ P(A \cap B \cap C) \end{aligned}$$

- The signs alternate by intersection size: add single events, subtract pairwise intersections, add triple intersections, and so on.
- For [[Mutually Exclusive Events|disjoint]] events the intersection terms are $0$, so the rule reduces to $P(A \cup B) = P(A) + P(B)$.
- It is the general form of the addition rule of [[Probability]] and relies on [[Set Operations]] for the union and intersection.

> [!example]- Probability of At Least One Event Occurring {Example}
> Among a group of insurance claims, $P(A) = 0.5$, $P(B) = 0.4$, and $P(A \cap B) = 0.2$. What is the probability that at least one of $A$ or $B$ occurs?
>
> > [!answer]-
> > "At least one of $A$ or $B$" is the event $A \cup B$:
> > $$\begin{align*} P(A \cup B) &= P(A) + P(B) - P(A \cap B) \\ &= 0.5 + 0.4 - 0.2 \\ &= 0.7 \end{align*}$$

> [!example]- Three Overlapping Coverages {Example}
> A policyholder may file an auto ($A$), home ($B$), or liability ($C$) claim. Given $P(A) = P(B) = P(C) = 0.3$, each pairwise intersection $= 0.1$, and $P(A \cap B \cap C) = 0.05$, find the probability of at least one claim.
>
> > [!answer]-
> > $$\begin{align*} P(A \cup B \cup C) &= 0.3 + 0.3 + 0.3 \\ &\quad - 0.1 - 0.1 - 0.1 \\ &\quad + 0.05 \\ &= 0.65 \end{align*}$$
> > There is a 65% chance the policyholder files at least one of the three claims.
