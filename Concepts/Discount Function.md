The **discount function** $v(t)$ is the [[Present Value]] at time 0 of 1 unit due at time $t$. It is the reciprocal of the [[Accumulation Function]] $a(t)$.

> $$v(t) = \frac{1}{a(t)}$$

- Under a constant effective rate $i$, $v(t) = (1+i)^{-t}$, with one-period factor $v = (1+i)^{-1}$.
- Under a constant [[Force of Interest]] $\delta$, $v(t) = e^{-\delta t}$.
- Multiplying a future cash flow by $v(t)$ gives its present value — the basic building block of annuity and [[Bond Price|bond]] valuation.

> [!example]- Present Value of a Future Payment {Example}
> At an annual effective rate of $i = 5\%$, what is the present value of \$$1{,}000$ due in 8 years?
>
> > [!answer]-
> > $$v(8) = (1.05)^{-8} \approx 0.67684$$
> > $$PV = 1{,}000 \times 0.67684 = \$676.84$$
