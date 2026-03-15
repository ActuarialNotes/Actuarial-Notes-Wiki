[[Wiki]] / [[Concepts]] / **The Law of Total Probability**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="The Law of Total Probability"
     data-prev="Bayes Theorem|Concepts/Bayes Theorem"
     data-next=""
     data-objectives="P-1|Probability|7. General Probability|Exam P-1 (SOA)">
</div>

# The Law of Total Probability

## Definition

If $\{A_1, A_2, \ldots, A_n\}$ is a partition of $S$, then the ==law of total probability== states:

$$ P(B) = \sum_{i=1}^{n} P(B|A_i)P(A_i) $$

> [!example]- <u>Example</u>
> An insurance company classifies drivers as low-risk (50%), medium-risk (30%), and high-risk (20%). The probability of filing a claim in a year is 0.05 for low-risk, 0.15 for medium-risk, and 0.30 for high-risk.
>
> What is the overall probability a randomly selected driver files a claim?
>
> $$P(\text{claim}) = P(C|L)P(L) + P(C|M)P(M) + P(C|H)P(H)$$
> $$= (0.05)(0.50) + (0.15)(0.30) + (0.30)(0.20)$$
> $$= 0.025 + 0.045 + 0.060 = 0.130$$
>
> 13% of all policyholders are expected to file a claim.
