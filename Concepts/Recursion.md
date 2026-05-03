$$B_k = B_{k-1}(1+i) - P$$

**Recursion** is the technique of expressing the value of an annuity or loan balance at one time step in terms of its value at the immediately preceding step. For a loan with outstanding balance $B_{k-1}$ at the start of period $k$, level payment $P$, and periodic effective rate $i$, the balance after the $k$-th payment satisfies:

$$B_k = B_{k-1}(1+i) - P, \qquad B_0 = \text{loan amount}$$

The same idea applies to annuity present values. Since an $n$-payment [[Annuity Immediate|annuity-immediate]] is just an immediate payment of 1 plus a deferred $(n-1)$-payment annuity, we have:

$$a_{\overline{n}|} = 1 \cdot v + v \cdot a_{\overline{n-1}|} \qquad \Longleftrightarrow \qquad a_{\overline{n}|} = v\bigl(1 + a_{\overline{n-1}|}\bigr)$$

Recursion is particularly useful for building amortisation schedules, verifying annuity formulas by induction, and computing prospective/retrospective loan balances without evaluating long sums directly.

> [!example]- Outstanding Loan Balance After 2 Payments {💡 Example}
> A loan of $\$5{,}000$ is repaid with level annual payments over 4 years at $i = 8\%$. Find the outstanding balance after the 2nd payment using recursion.
>
> > [!answer]- Answer
> > First find the level payment $P$:
> > $$P = \frac{5{,}000}{a_{\overline{4}|0.08}} = \frac{5{,}000}{(1-(1.08)^{-4})/0.08} = \frac{5{,}000}{3.31213} \approx \$1{,}509.60$$
> >
> > Apply the recursion starting from $B_0 = 5{,}000$:
> > $$B_1 = 5{,}000(1.08) - 1{,}509.60 = 5{,}400 - 1{,}509.60 = \$3{,}890.40$$
> > $$B_2 = 3{,}890.40(1.08) - 1{,}509.60 = 4{,}201.63 - 1{,}509.60 = \$2{,}692.03$$
> >
> > The outstanding balance after 2 payments is approximately $\$2{,}692.03$.
