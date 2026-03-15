[[Wiki]] / [[Concepts]] / **coinsurance percentages**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="coinsurance percentages"
     data-prev="deductibles|Concepts/deductibles"
     data-next="benefit limits|Concepts/benefit limits"
     data-objectives="P-1|Probability|5. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# coinsurance percentages

## Definition

A ==coinsurance percentage== is a fraction $c$ (where $0 < c \leq 1$) of a covered loss paid by the insurer after the deductible:

$$ Y = c \cdot \max(X - d,\; 0) $$

> [!example]- <u>Example</u>
> A policy has deductible $d = 200$ and coinsurance $c = 0.75$ (insurer pays 75%). Three claims occur:
>
> **Claim 1**: $X = 150$
> $Y = 0.75 \cdot \max(150 - 200, 0) = 0.75 \cdot 0 = \$0$
>
> **Claim 2**: $X = 600$
> $Y = 0.75 \cdot \max(600 - 200, 0) = 0.75 \cdot 400 = \$300$
>
> **Claim 3**: $X = 1{,}000$
> $Y = 0.75 \cdot \max(1000 - 200, 0) = 0.75 \cdot 800 = \$600$
>
> The policyholder pays the deductible plus 25% of the excess: for Claim 3, that is $200 + 0.25(800) = \$400$.
