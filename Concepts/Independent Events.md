---
aliases:
  - independence
---
[[Wiki]] / [[Concepts]] / **Independent Events**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Independent Events"
     data-prev=""
     data-next="Probabilities of Independent Events|Concepts/Probabilities of Independent Events"
     data-objectives="P-1|Probability|3. General Probability|Exam P-1 (SOA)">
</div>

# Independent Events

## Definition

Two events $A$ and $B$ are ==independent== iff $P(A \cap B) = P(A) \cdot P(B)$. Equivalently, $P(A|B) = P(A)$.

$$ P(A \cap B) = P(A) \cdot P(B) $$

> [!example]- <u>Example</u>
> A fair coin is flipped and a fair die is rolled. Let $A = \{\text{heads}\}$ and $B = \{6\}$.
> - $P(A) = \frac{1}{2}$, $P(B) = \frac{1}{6}$
> - $P(A \cap B) = P(\text{heads and 6}) = \frac{1}{12}$
> - Check: $P(A) \cdot P(B) = \frac{1}{2} \cdot \frac{1}{6} = \frac{1}{12} = P(A \cap B)$ ✓
>
> The events are independent because the coin outcome does not affect the die outcome.
