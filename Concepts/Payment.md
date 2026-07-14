The **payment** $Y$ (the insurer's payment) is the amount an insurer actually pays a policyholder after all policy adjustments — [[Deductible|deductible]], [[Coinsurance|coinsurance]], and [[Benefit Limit|benefit limit]] — are applied to the raw [[Loss Random Variable|loss]] $X$.

> $$Y = \min\!\big(c\,(X - d)^+,\ u\big)$$

- $X$ is the ground-up loss, $d$ the deductible, $c$ the coinsurance factor, and $u$ the benefit limit (maximum payment).
- $(X - d)^+ = \max(X - d,\ 0)$ applies the deductible; multiplying by $c$ applies coinsurance; the outer $\min$ caps the payment at $u$.
- This is the [[Payment Random Variable|payment random variable]] whose expectation drives premium and reserve calculations.

> [!example]- Expected Payment with a Deductible {Example}
> A loss $X$ is uniformly distributed on $[0, 1000]$ with a \$$200$ deductible and no other adjustments. Find $E[Y]$.
>
> > [!answer]-
> > Here $Y = (X - 200)^+$: zero for $X \le 200$, and $X - 200$ for $X > 200$.
> > $$\begin{align*} E[Y] &= \int_{200}^{1000} (x - 200)\,\frac{1}{1000}\,dx \\ &= \frac{1}{1000} \cdot \frac{(800)^2}{2} \\ &= \frac{640{,}000}{2{,}000} = 320 \end{align*}$$
> > The insurer expects to pay \$$320$ per loss after the deductible.
