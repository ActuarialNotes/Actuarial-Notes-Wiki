[[Wiki]] / [[Concepts]] / **Payment Random Variable**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Payment Random Variable"
     data-prev="Loss Random Variable|Concepts/Loss Random Variable"
     data-next=""
     data-objectives="P-1|Probability|6. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# Payment Random Variable

## Definition

The ==Payment Random Variable== $Y$ represents the amount paid by the insurer. With deductible $d$ and limit $u$:

$$ Y = \min\!\Big(\max(X - d,\; 0),\; u - d\Big) $$

$E[Y]$ is the expected payment.

> [!example]- <u>Example</u>
> Losses $X$ follow an exponential distribution with mean \$500 ($\lambda = 1/500$). The policy has deductible $d = 100$ and maximum covered loss $u = 600$ (so the insurer pays at most $u - d = 500$).
>
> $E[Y] = \int_{100}^{600}(x - 100)\frac{1}{500}e^{-x/500}\,dx + 500 \cdot P(X > 600)$
>
> Using the memoryless property and known formulas:
> - $E[\max(X - 100, 0)] = 500 \cdot e^{-100/500} = 500 e^{-0.2} \approx 409.37$
> - $E[\max(X - 600, 0)] = 500 \cdot e^{-600/500} = 500 e^{-1.2} \approx 150.60$
> - $E[Y] = 409.37 - 150.60 = \$258.77$
>
> The insurer expects to pay **\$258.77** per loss.
