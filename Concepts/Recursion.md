**Recursion** expresses the value of a loan balance or annuity at one time step in terms of its value at the immediately preceding step. For a loan with outstanding balance $B_{k-1}$ at the start of period $k$, level payment $P$, and periodic effective rate $i$:

> $$B_k = B_{k-1}(1+i) - P$$

> $$a_{\overline{n}|} = v\bigl(1 + a_{\overline{n-1}|}\bigr)$$

- The loan recursion rolls the balance forward by one period's interest, then subtracts the payment; it starts from $B_0$ equal to the original loan amount.
- The annuity recursion treats an $n$-payment [[Annuity Immediate|annuity-immediate]] as one payment plus a deferred $(n-1)$-payment annuity.
- Useful for building [[Amortization Schedule|amortization schedules]], proving annuity formulas by induction, and finding [[Outstanding Balance|outstanding balances]] without evaluating long sums.

> [!example]- Outstanding Loan Balance After 2 Payments {Example}
> A loan of \$$5{,}000$ is repaid with level annual payments over 4 years at $i = 8\%$. Find the outstanding balance after the 2nd payment using recursion.
>
> > [!answer]-
> > First find the level payment $P$:
> > $$P = \frac{5{,}000}{a_{\overline{4}|0.08}} = \frac{5{,}000}{3.31213} \approx \$1{,}509.60$$
> > Then apply the recursion from $B_0 = 5{,}000$:
> > $$\begin{align*} B_1 &= 5{,}000(1.08) - 1{,}509.60 = \$3{,}890.40 \\ B_2 &= 3{,}890.40(1.08) - 1{,}509.60 = \$2{,}692.03 \end{align*}$$
> > The outstanding balance after 2 payments is approximately \$$2{,}692.03$.
