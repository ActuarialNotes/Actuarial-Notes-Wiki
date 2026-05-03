Two events $A$ and $B$ are **mutually exclusive** (disjoint) if they cannot both occur simultaneously:
$$A \cap B = \emptyset \implies P(A \cap B) = 0$$

For mutually exclusive events, the [[Probability Addition Rule]] simplifies to:
$$P(A \cup B) = P(A) + P(B)$$

This extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are pairwise mutually exclusive, then $P\!\left(\bigcup_{i=1}^n A_i\right) = \sum_{i=1}^n P(A_i)$.

> [!example]- Insurance Claim Type {💡 Example}
> A single claim is classified as either property damage ($P$) or bodily injury ($B$), but not both. $P(P) = 0.60$ and $P(B) = 0.35$.
>
> > [!answer]- Answer
> > Since $P$ and $B$ are mutually exclusive:
> > $$P(P \cup B) = P(P) + P(B) = 0.60 + 0.35 = 0.95$$
> > There is a 5% probability the claim is neither type (e.g., classified as "other").
