[[Wiki]] / [[Concepts]] / **deductibles**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="deductibles"
     data-prev="policy information|Concepts/policy information"
     data-next="coinsurance percentages|Concepts/coinsurance percentages"
     data-objectives="P-1|Probability|5. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# deductibles

## Definition

A ==deductible== is an amount $d$ the policyholder pays before insurance coverage begins. The payment per loss is:

$$ Y = \max(X - d,\; 0) $$

where $X$ is the loss. The expected payment is $E[Y] = E[\max(X - d, 0)]$.

> [!example]- <u>Example</u>
> A policy has a deductible of $d = 500$. Losses $X$ are uniformly distributed on $[0, 2000]$.
>
> $E[Y] = E[\max(X - 500, 0)] = \int_{500}^{2000} (x - 500) \cdot \frac{1}{2000}\,dx$
>
> $= \frac{1}{2000}\left[\frac{(x-500)^2}{2}\right]_{500}^{2000} = \frac{1}{2000} \cdot \frac{1500^2}{2} = \frac{2{,}250{,}000}{4{,}000} = 562.50$
>
> Without the deductible, $E[X] = 1000$. The deductible reduces the expected insurer payment from \$1,000 to **\$562.50**.
