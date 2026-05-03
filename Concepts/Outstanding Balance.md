**Prospective method** (present value of future payments):
$$OB_k = P \cdot a_{\overline{n-k}|i}$$

**Retrospective method** (accumulated value of loan minus accumulated payments):
$$OB_k = L(1+i)^k - P \cdot s_{\overline{k}|i}$$

The **outstanding balance** $OB_k$ is the remaining principal owed immediately after the $k$-th payment on a loan of original amount $L$, level payment $P$, interest rate $i$ per period, and $n$ total payments. Both formulas give the same result; the prospective method is usually simpler because it only requires the number of remaining payments $(n-k)$, while the retrospective method accumulates the original loan forward and subtracts the accumulated payments. Note that the formula $OB_k = L - P\,a_{\overline{k}|i}$ is **incorrect** in general; it would only apply if interest were zero.

> [!example]- Outstanding Balance After 3 Payments {💡 Example}
> A $\$20{,}000$ loan is repaid with level annual payments over 6 years at $i = 8\%$. Find the outstanding balance immediately after the 3rd payment using both methods.
>
> > [!answer]- Answer
> > **Payment**: $P = 20000 / a_{\overline{6}|8\%} = 20000 / 4.6229 = \$4{,}326.40$
> >
> > **Prospective**: $OB_3 = P \cdot a_{\overline{3}|8\%} = 4326.40 \times 2.5771 = \$11{,}147.42$
> >
> > **Retrospective**: $OB_3 = 20000(1.08)^3 - 4326.40 \cdot s_{\overline{3}|8\%}$
> > $= 20000(1.2597) - 4326.40(3.2464)$
> > $= 25194.00 - 14041.22 = \$11{,}152.78$
> >
> > The small difference is due to rounding in $P$; with exact arithmetic both methods agree exactly.
