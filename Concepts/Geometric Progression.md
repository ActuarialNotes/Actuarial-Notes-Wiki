In the context of annuities, a **geometric progression** refers to a sequence of payments where each payment is a constant multiple $(1+g)$ of the previous one. Starting from $1$, the payments are $1, (1+g), (1+g)^2, \ldots$

This is the basis of the [[Geometric Increasing Annuity]]. The present value for $n$ payments (annuity-immediate):
$$\text{PV} = \frac{1}{1+i} \cdot \frac{1-\left(\frac{1+g}{1+i}\right)^n}{1 - \frac{1+g}{1+i}} = \frac{1-(1+g)^n(1+i)^{-n}}{i-g}, \quad i \neq g$$

For a geometric [[Perpetuity]] ($i > g$): $\text{PV} = 1/(i-g)$.

> [!example]- Geometric Perpetuity {💡 Example}
> A cash flow starts at $5{,}000$ at end of year 1 and grows at $2\%$ per year forever. Find the PV at $i=8\%$.
>
> > [!answer]- Answer
> > $$\text{PV} = \frac{5000}{0.08 - 0.02} = \frac{5000}{0.06} = 83{,}333$$
