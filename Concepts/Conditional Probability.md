$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

Conditional Probability $P(A \mid B)$ is the probability that event $A$ occurs given that event $B$ is known to have occurred, effectively restricting the sample space to $B$.

If $A$ and $B$ are independent, then $P(A \mid B) = P(A)$. Conditional probability is foundational to Bayes' Theorem, the law of total probability, and many insurance and actuarial calculations.

> [!example]- Claim Severity Given Deductible Threshold {💡 Example}
> A loss $X$ is uniformly distributed on $(0, 1000)$. Given that the loss exceeds 400, what is the probability it also exceeds 700?
>
> > [!answer]- Answer
> > Let $A = \{X > 700\}$ and $B = \{X > 400\}$. Since $A \subseteq B$, we have $A \cap B = A$.
> > $$P(A \mid B) = \frac{P(X > 700)}{P(X > 400)} = \frac{300/1000}{600/1000} = \frac{300}{600} = 0.5$$
