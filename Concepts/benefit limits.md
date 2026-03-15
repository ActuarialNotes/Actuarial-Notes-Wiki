[[Wiki]] / [[Concepts]] / **benefit limits**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="benefit limits"
     data-prev="coinsurance percentages|Concepts/coinsurance percentages"
     data-next="inflation|Concepts/inflation"
     data-objectives="P-1|Probability|5. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# benefit limits

## Definition

A ==benefit limit== is a maximum amount $u$ the insurer will pay on a claim:

$$ Y = \min\!\Big(c \cdot \max(X - d,\; 0),\; u\Big) $$

> [!example]- <u>Example</u>
> A policy has deductible $d = 500$, coinsurance $c = 0.80$, and benefit limit $u = 2{,}000$.
>
> **Claim 1**: $X = 2{,}000$
> $c \cdot \max(2000 - 500, 0) = 0.80 \times 1500 = 1{,}200$
> $Y = \min(1200, 2000) = \$1{,}200$
>
> **Claim 2**: $X = 4{,}000$
> $c \cdot \max(4000 - 500, 0) = 0.80 \times 3500 = 2{,}800$
> $Y = \min(2800, 2000) = \$2{,}000$ (capped at the limit)
>
> For Claim 2, the policyholder pays $500 + 0.20(3500) + 800 = \$2{,}000$ (deductible + coinsurance share + amount above limit).
