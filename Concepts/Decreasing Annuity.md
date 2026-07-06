An **arithmetic decreasing annuity** has payments $n, n-1, n-2, \ldots, 1$ at the end of periods $1, 2, \ldots, n$. Its present value is denoted $(Da)_{\overline{n}|}$:

> $$(Da)_{\overline{n}|} = \frac{n - a_{\overline{n}|}}{i}$$

- The corresponding accumulated value is $(Ds)_{\overline{n}|} = (1+i)^n (Da)_{\overline{n}|}$.
- Paired with the [[Arithmetic Increasing Annuity|increasing annuity]], $(Ia)_{\overline{n}|} + (Da)_{\overline{n}|} = (n+1)\,a_{\overline{n}|}$, since the two payment streams sum to $n+1$ in every period.
- For a first payment $P$ decreasing by $Q$ per period (payments $P,\, P-Q,\, P-2Q,\, \ldots,\, P-(n-1)Q$), the present value is:

> $$PV = P \cdot a_{\overline{n}|} - \frac{Q}{i}\!\left(a_{\overline{n}|} - nv^n\right)$$

> [!example]- Present Value of Payments 5, 4, 3, 2, 1 {Example}
> A decreasing annuity pays \$$500,\,\$400,\,\$300,\,\$200,\,\$100$ at the end of years 1 through 5. The effective annual rate is $i = 6\%$. Find the present value.
>
> > [!answer]-
> > Factor out 100: $PV = 100\cdot(Da)_{\overline{5}|0.06}$.
> > $$a_{\overline{5}|} = 4.2124$$
> > $$(Da)_{\overline{5}|} = \frac{5 - 4.2124}{0.06} = \frac{0.7876}{0.06} \approx 13.1273$$
> > $$PV = 100 \times 13.1273 \approx \$1{,}312.73$$
