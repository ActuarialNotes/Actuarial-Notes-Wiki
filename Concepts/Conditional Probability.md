[[Wiki]] / [[Concepts]] / **Conditional Probability**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Conditional Probability"
     data-prev="Inclusion-Exclusion Principle|Concepts/Inclusion-Exclusion Principle"
     data-next=""
     data-objectives="P-1|Probability|6. General Probability|Exam P-1 (SOA)">
</div>

# Conditional Probability

## Definition

The ==conditional probability== of event $A$ given that event $B$ has occurred is:

$$ P(A|B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0 $$

> [!example]- <u>Example</u>
> A fair die is rolled. Let $A = \{\text{even}\} = \{2,4,6\}$ and $B = \{\text{greater than 3}\} = \{4,5,6\}$.
> - $P(A) = \frac{3}{6} = \frac{1}{2}$, $P(B) = \frac{3}{6} = \frac{1}{2}$
> - $A \cap B = \{4, 6\}$, so $P(A \cap B) = \frac{2}{6} = \frac{1}{3}$
>
> $$P(A|B) = \frac{P(A \cap B)}{P(B)} = \frac{1/3}{1/2} = \frac{2}{3}$$
>
> Given that the roll is greater than 3, two out of three outcomes (4, 5, 6) are even.
