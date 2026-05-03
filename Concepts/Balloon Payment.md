A **balloon payment** is a final loan payment that is larger than the regular periodic payments. It arises when the regular payment amount is set below the level needed to fully amortize the loan in $n$ periods — that is, when the regular payments do not reduce the [[Outstanding Balance]] to zero by the last scheduled date. The balloon payment equals the outstanding balance at the end of the last period (accumulated to that point) plus any regular payment due then. Contrast with a **drop payment**, which is a final payment smaller than the regular payment; a drop payment occurs when the regular payment slightly over-amortizes the loan and the last payment is reduced to pay off the small remaining balance exactly.

For a loan of $L$ with $n-1$ regular payments of $K$ followed by one balloon payment $B$ at time $n$, at interest rate $i$:
$$B = L(1+i)^n - K \cdot s_{\overline{n-1}|i} \cdot (1+i)$$
or equivalently, $B$ is the [[Outstanding Balance]] $OB_{n-1}$ accumulated one more period: $B = OB_{n-1}(1+i)$.

> [!example]- Balloon Payment on a Loan {💡 Example}
> A borrower takes a $\$10{,}000$ loan at $8\%$ annual interest. The borrower makes payments of $\$1{,}500$ at the end of each year for 9 years, then clears the loan with a balloon payment at the end of year 10. Find the balloon payment.
>
> > [!answer]- Answer
> > First find the outstanding balance after 9 payments using the retrospective method:
> > $$OB_9 = 10000(1.08)^9 - 1500\,s_{\overline{9}|8\%}$$
> > $(1.08)^9 = 1.9990$, $s_{\overline{9}|8\%} = \dfrac{(1.08)^9 - 1}{0.08} = \dfrac{0.9990}{0.08} = 12.4876$
> > $$OB_9 = 10000(1.9990) - 1500(12.4876) = 19990 - 18731.40 = \$1{,}258.60$$
> > The balloon payment at time 10 is:
> > $$B = OB_9(1.08) = 1258.60(1.08) = \$1{,}359.29$$
> > This exceeds the regular payment of $\$1{,}500$? No — $\$1{,}359.29 < \$1{,}500$, making this actually a **drop payment**. To get a true balloon, the regular payment must be set even lower, e.g., $\$1{,}200$: $OB_9 = 19990 - 1200(12.4876) = 19990 - 14985.12 = \$5{,}004.88$, giving balloon $= 5004.88(1.08) = \$5{,}405.27 \gg \$1{,}200$. ✓
