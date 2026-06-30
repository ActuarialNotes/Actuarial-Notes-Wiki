The **loss random variable** $X$ represents the ground-up loss amount before any policy modifications such as [[Deductible]]s, [[Coinsurance Percentage|Coinsurance Percentages]], or [[Benefit Limit|Benefit Limits]] are applied.
- The [[Expected Value]] and [[Variance]] of the corresponding [[Payment Random Variable]] $Y$ differ from those of $X$ because of the truncation and censoring imposed by policy terms

> $$Y = \begin{cases} 0 & X \leq d \\ X - d & X > d \end{cases}$$
>
> $$\text{where } d = \text{ordinary deductible}$$

> [!example]- Expected Payment with Deductible {Example}
> Ground-up losses $X \sim \text{Exp}(\theta = 1000)$. A policy has an ordinary deductible $d = 500$.
>
> > [!answer]-
> > The expected payment per loss is:
> > $$E[Y] = E[\max(X - 500,\, 0)] = \int_{500}^{\infty}(x-500)\cdot\frac{1}{1000}e^{-x/1000}\,dx = 1000\,e^{-0.5} \approx 606.5$$
