An **amortization schedule** is a table that breaks every loan payment into its interest and principal components, and tracks the [[Outstanding Balance]] over the life of the loan. For a level-payment loan with payment $P$, interest rate $i$, and $n$ periods, each row contains:

| Column | Formula |
|---|---|
| Payment number $k$ | $1, 2, \ldots, n$ |
| Payment amount | $P$ (constant) |
| Interest portion $I_k$ | $OB_{k-1} \times i$ |
| Principal portion $PR_k$ | $P - I_k$ |
| Outstanding balance $OB_k$ | $OB_{k-1} - PR_k$ |

The principal portions form a geometric sequence: $PR_k = PR_1 \cdot (1+i)^{k-1}$. The interest portions decrease by the same factor. The schedule ends when $OB_n = 0$.

> [!example]- 3-Payment Amortization Schedule {💡 Example}
> A $\$3{,}000$ loan is repaid with 3 level annual payments at $i = 10\%$. Construct the full amortization schedule.
>
> > [!answer]- Answer
> > Payment: $P = 3000 / a_{\overline{3}|10\%} = 3000 / 2.4869 = \$1{,}206.34$
> >
> > | Period | Payment | Interest | Principal | Balance |
> > |---|---|---|---|---|
> > | 0 | — | — | — | $3{,}000.00$ |
> > | 1 | $1{,}206.34$ | $300.00$ | $906.34$ | $2{,}093.66$ |
> > | 2 | $1{,}206.34$ | $209.37$ | $996.97$ | $1{,}096.69$ |
> > | 3 | $1{,}206.34$ | $109.67$ | $1{,}096.67$ | $\approx 0$ |
> >
> > The interest column decreases each period (charged on a smaller balance), while the principal column increases. The small rounding discrepancy in period 3 disappears with exact arithmetic.
