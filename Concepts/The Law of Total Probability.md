$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$
$$\text{where } \{A_1, A_2, \ldots, A_n\} \text{ is a partition of } S$$

The Law of Total Probability states that if $\{A_1, \ldots, A_n\}$ is a partition of the sample space $S$ (mutually exclusive and exhaustive events), then the probability of any event $B$ can be expressed as a weighted average of its conditional probabilities given each $A_i$.

It is the essential tool for computing the denominator $P(E)$ in Bayes' Theorem, and for finding marginal probabilities when a problem is naturally structured by distinct scenarios or risk classes. Every term $P(B \mid A_i)\,P(A_i) = P(B \cap A_i)$, so the law simply partitions $P(B)$ by summing over disjoint slices of the sample space.

> [!example]- Overall Claim Probability Across Risk Classes {💡 Example}
> A portfolio is 30% young drivers ($A_1$), 50% middle-aged ($A_2$), and 20% senior ($A_3$). Claim probabilities are $P(C \mid A_1)=0.20$, $P(C \mid A_2)=0.10$, $P(C \mid A_3)=0.15$. Find the overall probability of a claim.
>
> > [!answer]- Answer
> > Since $\{A_1, A_2, A_3\}$ partitions the portfolio:
> > $$P(C) = (0.20)(0.30) + (0.10)(0.50) + (0.15)(0.20)$$
> > $$= 0.060 + 0.050 + 0.030 = 0.140$$
> > The overall claim probability is 14%.
