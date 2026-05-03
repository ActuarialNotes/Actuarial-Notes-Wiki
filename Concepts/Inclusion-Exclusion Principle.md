$$ P(A \cup B) = P(A) + P(B) - P(A \cap B) $$

The ==Inclusion-Exclusion Principle== is a counting rule used to determine the probability (or size) of the union of overlapping events by alternately adding and subtracting the probabilities of their intersections. For three events the principle extends to $P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$. The signs alternate: add single events, subtract pairwise intersections, add triple intersections, and so on.

> [!example]- Probability of At Least One Event Occurring {💡 Example}
> In a group of insurance claims, $P(A) = 0.5$, $P(B) = 0.4$, and $P(A \cap B) = 0.2$. What is the probability that at least one of $A$ or $B$ occurs?
>
> > [!answer]- Answer
> > "At least one of $A$ or $B$" is the event $A \cup B$. Applying the Inclusion-Exclusion Principle:
> > $$ P(A \cup B) = P(A) + P(B) - P(A \cap B) = 0.5 + 0.4 - 0.2 = 0.7 $$
