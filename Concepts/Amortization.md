$$P = \frac{L}{a_{\overline{n}|i}}$$

**Amortization** is the process of repaying a loan through a series of level periodic payments $P$, each covering the interest accrued on the [[Outstanding Balance]] plus a portion of principal. The payment $P$ is determined by setting the present value of $n$ level payments equal to the original loan amount $L$ at interest rate $i$ per period. Because interest is charged on the declining balance, the interest portion of each payment decreases over time while the principal portion increases — but the total payment remains constant. At the end of the $n$-th payment the loan is exactly paid off. The key relationships are:

- Interest in payment $k$: $I_k = P \cdot (1 - v^{n-k+1})$ where $v = 1/(1+i)$
- Principal in payment $k$: $PR_k = P \cdot v^{n-k+1}$
- Outstanding balance after payment $k$: $OB_k = P \cdot a_{\overline{n-k}|i}$

> [!example]- Amortizing a Loan {💡 Example}
> A $\$10{,}000$ loan is repaid with level annual payments over 4 years at $i = 5\%$ per year. Find the annual payment and the interest and principal portions of the first payment.
>
> > [!answer]- Answer
> > $$P = \frac{10000}{a_{\overline{4}|5\%}} = \frac{10000}{3.5460} = \$2{,}820.12$$
> > **Payment 1 interest**: $I_1 = 10000 \times 0.05 = \$500.00$
> > **Payment 1 principal**: $PR_1 = 2820.12 - 500.00 = \$2{,}320.12$
> > **Outstanding balance after payment 1**: $OB_1 = 10000 - 2320.12 = \$7{,}679.88$, which equals $P \cdot a_{\overline{3}|5\%} = 2820.12(2.7232) = \$7{,}679.88$. ✓
