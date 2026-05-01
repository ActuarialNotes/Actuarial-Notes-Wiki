A **geometric increasing (or decreasing) annuity** has payments that grow (or shrink) at a constant geometric rate $g$ per period. For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (1+g), (1+g)^2, \ldots, (1+g)^{n-1}$.

The present value (at effective rate $i \neq g$) is:
$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$

When $i = g$, $\text{PV} = n \cdot v = n/(1+i)$. For a geometric [[Perpetuity]] with $i > g$: $\text{PV} = 1/(i-g)$.

> [!example]- Inflation-Adjusted Pension {💡 Example}
> A retiree receives $20{,}000$ at end of year 1, with payments increasing 3% per year for 20 years. At $i = 7\%$, find the present value.
>
> > [!answer]- Answer
> > $$\text{PV} = 20000 \cdot \frac{1-(1.03/1.07)^{20}}{0.07-0.03} = 20000 \cdot \frac{1-0.6730}{0.04} = 20000 \times 8.175 = 163{,}500$$
