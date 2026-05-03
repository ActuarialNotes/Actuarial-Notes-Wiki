The **loss random variable** $X$ represents the ground-up loss amount before any policy modifications such as [[Deductibles]], [[Coinsurance Percentages]], or [[Benefit Limits]] are applied.

The corresponding [[Payment Random Variable]] $Y$ is the amount actually paid by the insurer:
$$Y = \begin{cases} 0 & X \leq d \\ X - d & X > d \end{cases}$$
where $d$ is the ordinary deductible. The [[Expected Value]] and [[Variance]] of $Y$ differ from those of $X$ because of the truncation and censoring imposed by policy terms.

> [!example]- Expected Payment with Deductible {💡 Example}
> Ground-up losses $X \sim \text{Exp}(\theta = 1000)$. A policy has an ordinary deductible $d = 500$.
>
> > [!answer]- Answer
> > The expected payment per loss is:
> > $$E[Y] = E[\max(X - 500,\, 0)] = \int_{500}^{\infty}(x-500)\cdot\frac{1}{1000}e^{-x/1000}\,dx = 1000\,e^{-0.5} \approx 606.5$$
