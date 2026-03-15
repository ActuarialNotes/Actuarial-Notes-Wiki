[[Wiki]] / [[Concepts]] / **policy information**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="policy information"
     data-prev=""
     data-next="deductibles|Concepts/deductibles"
     data-objectives="P-1|Probability|5. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# policy information

## Definition

==Policy information== is an overview of insurance policy structure including premiums, coverage terms, deductibles, coinsurance, and benefit limits that determine how losses are shared between policyholder and insurer.

$$ \text{Insurer Payment} = \min\!\Big(c \cdot \max(X - d,\; 0),\; u\Big) $$

> [!example]- <u>Example</u>
> An insurance policy has the following terms:
> - **Premium**: \$500/year
> - **Deductible**: $d = 200$
> - **Coinsurance**: $c = 0.80$ (insurer pays 80%)
> - **Benefit limit**: $u = 5{,}000$
>
> If a loss of $X = 3{,}000$ occurs:
> 1. After deductible: $3{,}000 - 200 = 2{,}800$
> 2. After coinsurance: $0.80 \times 2{,}800 = 2{,}240$
> 3. Check limit: $2{,}240 \leq 5{,}000$ ✓
>
> The insurer pays **\$2,240** and the policyholder pays $200 + 0.20(2{,}800) = \$760$.
