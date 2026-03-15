[[Wiki]] / [[Concepts]] / **Axioms of Probability**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Axioms of Probability"
     data-prev="Probability|Concepts/Probability"
     data-next=""
     data-objectives="P-1|Probability|1. General Probability|Exam P-1 (SOA)">
</div>

# Axioms of Probability

## Definition

The ==axioms of probability== (Kolmogorov axioms) are three foundational rules:

1. **Non-negativity:** $P(A) \geq 0$ for every event $A$
2. **Normalization:** $P(S) = 1$
3. **Countable additivity:** For mutually exclusive events $A_1, A_2, \ldots$:

$$ P\left(\bigcup_{i=1}^{\infty} A_i\right) = \sum_{i=1}^{\infty} P(A_i) $$

> [!example]- <u>Example</u>
> Let $S = \{1,2,3,4,5,6\}$ with $P(\{k\}) = \frac{1}{6}$ for each $k$. Verify the axioms:
> 1. **Non-negativity:** $P(\{k\}) = \frac{1}{6} \geq 0$ ✓
> 2. **Normalization:** $P(S) = 6 \times \frac{1}{6} = 1$ ✓
> 3. **Additivity:** Let $A = \{1,3,5\}$ and $B = \{2,4\}$, which are mutually exclusive. Then:
>    $P(A \cup B) = P(\{1,3,5,2,4\}) = \frac{5}{6}$ and $P(A) + P(B) = \frac{3}{6} + \frac{2}{6} = \frac{5}{6}$ ✓
