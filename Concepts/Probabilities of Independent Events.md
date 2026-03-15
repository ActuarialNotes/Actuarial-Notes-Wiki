[[Wiki]] / [[Concepts]] / **Probabilities of Independent Events**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Probabilities of Independent Events"
     data-prev="Independent Events|Concepts/Independent Events"
     data-next=""
     data-objectives="P-1|Probability|3. General Probability|Exam P-1 (SOA)">
</div>

# Probabilities of Independent Events

## Definition

For ==independent events==, $P(A \cap B) = P(A) \cdot P(B)$. This extends to $n$ events:

$$ P\left(\bigcap_{i=1}^n A_i\right) = \prod_{i=1}^n P(A_i) $$

> [!example]- <u>Example</u>
> A system has 3 independent components with reliabilities $P(C_1) = 0.95$, $P(C_2) = 0.90$, and $P(C_3) = 0.85$. The system works only if all components work.
>
> $$P(\text{system works}) = P(C_1) \cdot P(C_2) \cdot P(C_3) = 0.95 \times 0.90 \times 0.85 = 0.72675$$
>
> The probability that at least one component fails is:
> $$P(\text{at least one fails}) = 1 - 0.72675 = 0.27325$$
