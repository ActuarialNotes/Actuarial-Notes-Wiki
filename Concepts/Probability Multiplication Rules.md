[[Wiki]] / [[Concepts]] / **Probability Multiplication Rules**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Probability Multiplication Rules"
     data-prev="Probability Addition Rule|Concepts/Probability Addition Rule"
     data-next="Inclusion-Exclusion Principle|Concepts/Inclusion-Exclusion Principle"
     data-objectives="P-1|Probability|5. General Probability|Exam P-1 (SOA)">
</div>

# Probability Multiplication Rules

## Definition

The ==probability multiplication rules== state:

$$ P(A \cap B) = P(A) \cdot P(B|A) = P(B) \cdot P(A|B) $$

For independent events, this simplifies to $P(A \cap B) = P(A) \cdot P(B)$.

> [!example]- <u>Example</u>
> A box contains 5 red and 3 blue balls. Two balls are drawn without replacement. What is the probability both are red?
>
> $$P(R_1 \cap R_2) = P(R_1) \cdot P(R_2 | R_1) = \frac{5}{8} \cdot \frac{4}{7} = \frac{20}{56} = \frac{5}{14} \approx 0.357$$
>
> If instead drawing **with** replacement (independent draws):
> $$P(R_1 \cap R_2) = P(R_1) \cdot P(R_2) = \frac{5}{8} \cdot \frac{5}{8} = \frac{25}{64} \approx 0.391$$
