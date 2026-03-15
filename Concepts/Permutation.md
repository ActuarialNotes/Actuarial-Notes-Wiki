[[Wiki]] / [[Concepts]] / **Permutation**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Permutation"
     data-prev="Combination|Concepts/Combination"
     data-next=""
     data-objectives="P-1|Probability|2. General Probability|Exam P-1 (SOA)">
</div>

# Permutation

## Definition

A ==permutation== is an arrangement of $r$ objects from $n$ where order matters.

$$ P(n,r) = \frac{n!}{(n-r)!} $$

> [!example]- <u>Example</u>
> In a race with 10 runners, how many ways can gold, silver, and bronze be awarded?
>
> $$P(10,3) = \frac{10!}{7!} = 10 \times 9 \times 8 = 720$$
>
> Compare with combinations: choosing 3 runners from 10 (without ordering) gives $\binom{10}{3} = 120$. Since each group of 3 can be arranged in $3! = 6$ ways, we get $120 \times 6 = 720 = P(10,3)$.
