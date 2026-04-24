$$P(A \cap B) = P(A) \cdot P(B \mid A) = P(B) \cdot P(A \mid B)$$

The Probability Multiplication Rule expresses the joint probability of two events $A$ and $B$ as the product of the probability of one event and the conditional probability of the other given the first.

When $A$ and $B$ are independent, the rule simplifies to $P(A \cap B) = P(A) \cdot P(B)$ since $P(B \mid A) = P(B)$. For a chain of events, the rule extends to $P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1)\,P(A_2 \mid A_1)\,P(A_3 \mid A_1 \cap A_2) \cdots$.

> [!example]- Sequential Claim Filing Without Replacement {💡 Example}
> A portfolio has 10 policies: 4 will generate claims this year and 6 will not. Two policies are selected at random without replacement. What is the probability both generate claims?
>
> > [!answer]- Answer
> > Let $A$ = first policy generates a claim, $B$ = second policy generates a claim. Applying the multiplication rule:
> > $$P(A \cap B) = P(A) \cdot P(B \mid A) = \frac{4}{10} \times \frac{3}{9} = \frac{12}{90} = \frac{2}{15} \approx 0.133$$
