$$P(A \cap B) = P(A) \cdot P(B)$$

Two events $A$ and $B$ are Independent if knowing that one occurred provides no information about whether the other occurred; equivalently, $P(A \mid B) = P(A)$ and $P(B \mid A) = P(B)$.

Independence is a symmetric relation and must be verified mathematically — it cannot be assumed from a diagram. For a collection of events to be **mutually independent**, the product rule must hold for every subset of the collection, not just pairs.

> [!example]- Testing Independence of Two Claim Events {💡 Example}
> For two policyholders, $P(\text{A claims}) = 0.4$, $P(\text{B claims}) = 0.3$, and $P(\text{both claim}) = 0.12$. Are their claim events independent?
>
> > [!answer]- Answer
> > Check whether $P(A \cap B) = P(A) \cdot P(B)$:
> > $$P(A) \cdot P(B) = 0.4 \times 0.3 = 0.12$$
> > Since $P(A \cap B) = 0.12 = P(A) \cdot P(B)$, the two events are independent — knowledge of one policyholder's claim does not affect the probability of the other's.
