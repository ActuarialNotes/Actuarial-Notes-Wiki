$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

The Probability Addition Rule (Inclusion-Exclusion) gives the probability that at least one of two events $A$ or $B$ occurs, correcting for the double-counting of outcomes in their intersection.

For three events the rule extends to:
$$P(A \cup B \cup C) = P(A)+P(B)+P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$$
When events are mutually exclusive, $P(A \cap B) = 0$ and the rule reduces to simple addition.

> [!example]- Probability of at Least One Coverage Trigger {💡 Example}
> For a commercial policy, the probability of a fire loss is 0.05, a flood loss is 0.03, and both losses in the same year is 0.01. What is the probability of at least one loss?
>
> > [!answer]- Answer
> > Let $F$ = fire and $L$ = flood. Applying the addition rule:
> > $$P(F \cup L) = P(F) + P(L) - P(F \cap L) = 0.05 + 0.03 - 0.01 = 0.07$$
> > There is a 7% probability of experiencing at least one loss in the year.
