[[Wiki]] / [[Concepts]] / **Mutually Exclusive Events**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Mutually Exclusive Events"
     data-prev=""
     data-next=""
     data-objectives="P-1|Probability|4. General Probability|Exam P-1 (SOA)">
</div>

# Mutually Exclusive Events

## Definition

Events $A$ and $B$ are ==mutually exclusive== (disjoint) iff $A \cap B = \emptyset$. If mutually exclusive:

$$ P(A \cup B) = P(A) + P(B) $$

> [!example]- <u>Example</u>
> A single card is drawn from a standard 52-card deck. Let $A = \{\text{hearts}\}$ and $B = \{\text{spades}\}$.
> - $A \cap B = \emptyset$ (a card cannot be both a heart and a spade)
> - $P(A) = \frac{13}{52} = \frac{1}{4}$, $P(B) = \frac{13}{52} = \frac{1}{4}$
> - $P(A \cup B) = P(A) + P(B) = \frac{1}{4} + \frac{1}{4} = \frac{1}{2}$
>
> **Note:** Mutually exclusive events with positive probabilities are never independent, since $P(A \cap B) = 0 \neq P(A) \cdot P(B)$.
