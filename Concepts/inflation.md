[[Wiki]] / [[Concepts]] / **inflation**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="inflation"
     data-prev="benefit limits|Concepts/benefit limits"
     data-next=""
     data-objectives="P-1|Probability|5. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# inflation

## Definition

==Inflation== is the rate at which losses increase over time. The adjusted loss after one year of inflation is:

$$ X' = X(1 + r) $$

where $r$ is the annual inflation rate.

> [!example]- <u>Example</u>
> Current losses $X$ are uniformly distributed on $[0, 1000]$ with $E[X] = 500$. Annual inflation is $r = 5\%$.
>
> After one year, $X' = 1.05X$, so losses are uniform on $[0, 1050]$.
> - $E[X'] = 1.05 \cdot 500 = 525$
>
> A policy has deductible $d = 200$.
> - **This year**: $E[\max(X - 200, 0)] = \int_{200}^{1000} \frac{x - 200}{1000}\,dx = \frac{800^2}{2 \cdot 1000} = 320$
> - **Next year**: $E[\max(X' - 200, 0)] = \int_{200}^{1050} \frac{x - 200}{1050}\,dx = \frac{850^2}{2 \cdot 1050} \approx 343.45$
>
> Inflation increases the expected insurer payment from \$320 to **\$343.45** (a 7.3% increase, exceeding the 5% inflation rate because the fixed deductible absorbs a smaller proportion of the inflated loss).
