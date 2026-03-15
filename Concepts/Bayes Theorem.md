[[Wiki]] / [[Concepts]] / **Bayes Theorem**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Bayes Theorem"
     data-prev=""
     data-next="The Law of Total Probability|Concepts/The Law of Total Probability"
     data-objectives="P-1|Probability|7. General Probability|Exam P-1 (SOA)">
</div>

# Bayes Theorem

## Definition

==Bayes Theorem== relates posterior probability to prior probability and likelihood:

$$ P(A_i|B) = \frac{P(B|A_i)P(A_i)}{\sum_{j} P(B|A_j)P(A_j)} $$

> [!example]- <u>Example</u>
> A factory has two machines. Machine 1 produces 60% of items and has a 3% defect rate. Machine 2 produces 40% of items and has a 5% defect rate. If an item is defective, what is the probability it came from Machine 1?
>
> - $P(M_1) = 0.60$, $P(M_2) = 0.40$
> - $P(D|M_1) = 0.03$, $P(D|M_2) = 0.05$
>
> $$P(M_1|D) = \frac{P(D|M_1)P(M_1)}{P(D|M_1)P(M_1) + P(D|M_2)P(M_2)} = \frac{0.03 \times 0.60}{0.03 \times 0.60 + 0.05 \times 0.40} = \frac{0.018}{0.038} \approx 0.474$$
>
> Despite Machine 1 producing more items, the defective item is more likely from Machine 2.
