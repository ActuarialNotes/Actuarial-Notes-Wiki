The **probability multiplication rules** give the probability of the intersection of two [[Event|events]] in terms of a [[Conditional Probability|conditional probability]].

> $$P(A \cap B) = P(A)\,P(B \mid A) = P(B)\,P(A \mid B)$$

- This rearranges the definition of conditional probability, $P(B \mid A) = P(A \cap B)/P(A)$.
- For [[Independent Events|independent]] events it reduces to $P(A \cap B) = P(A)\,P(B)$.
- It extends to three events as $P(A \cap B \cap C) = P(A)\,P(B \mid A)\,P(C \mid A \cap B)$.

> [!example]- Drawing Two Red Marbles Without Replacement {Example}
> A bag has 5 red and 3 blue marbles. Two are drawn without replacement. What is the probability both are red?
>
> > [!answer]-
> > $$\begin{align*} P(R_1 \cap R_2) &= P(R_1)\,P(R_2 \mid R_1) \\ &= \frac{5}{8} \cdot \frac{4}{7} \\ &= \frac{20}{56} = \frac{5}{14} \approx 0.357 \end{align*}$$
