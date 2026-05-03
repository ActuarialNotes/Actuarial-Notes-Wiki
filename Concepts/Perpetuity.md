$$a_{\overline{\infty}|} = \frac{1}{i}, \qquad \ddot{a}_{\overline{\infty}|} = \frac{1}{d}$$

A **perpetuity** is an annuity that pays 1 per period forever. For a **perpetuity-immediate** (payments at end of each period) the present value is obtained by letting $n \to \infty$ in $a_{\overline{n}|} = (1-v^n)/i$; since $v^n \to 0$:

$$a_{\overline{\infty}|} = \frac{1}{i}$$

For a **perpetuity-due** (payments at start of each period), the present value is one period's interest charge earlier:

$$\ddot{a}_{\overline{\infty}|} = \frac{1}{d} = \frac{1+i}{i}$$

The relationship $\ddot{a}_{\overline{\infty}|} = 1 + a_{\overline{\infty}|}$ holds because the perpetuity-due can be seen as an immediate payment of 1 followed by a perpetuity-immediate. Perpetuities model instruments such as consols, preferred stock with fixed dividends, or endowments intended to last indefinitely.

> [!example]- Endowment Fund Perpetuity {💡 Example}
> A university endowment must pay $\$50{,}000$ per year in perpetuity, with the first payment one year from now. If the fund earns $i = 4\%$ per year, how much must be deposited today?
>
> > [!answer]- Answer
> > This is a perpetuity-immediate, so:
> > $$PV = \frac{50{,}000}{i} = \frac{50{,}000}{0.04} = \$1{,}250{,}000$$
