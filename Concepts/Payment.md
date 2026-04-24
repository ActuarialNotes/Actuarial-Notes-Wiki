## Definition

The ==Payment== (or insurer's payment) is the amount an insurance company actually pays to a policyholder after all policy adjustments — deductible, coinsurance, and benefit limits — have been applied to the raw loss. It is the output of transforming the loss through the policy terms:

$$ Y = \min\!\big(c \cdot (X - d)^+,\ u\big) $$

where $X$ is the loss, $d$ is the deductible, $c$ is the coinsurance proportion, and $u$ is the benefit limit.

> [!example]- A loss $X$ is uniformly distributed on $[0, 1000]$ with a $\$200$ deductible and no other adjustments. What is $E[Y]$?
> $Y = (X - 200)^+$. For $X \leq 200$, $Y = 0$; for $X > 200$, $Y = X - 200$.
> $$ E[Y] = \int_{200}^{1000} (x - 200) \cdot \frac{1}{1000}\, dx = \frac{1}{1000} \cdot \frac{(800)^2}{2} = \frac{640{,}000}{2{,}000} = 320 $$
