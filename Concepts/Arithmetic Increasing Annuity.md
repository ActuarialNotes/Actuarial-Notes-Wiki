$$(Ia)_{\overline{n}|} = \frac{\ddot{a}_{\overline{n}|} - nv^n}{i}$$

An **arithmetic increasing annuity** has payments $1, 2, 3, \ldots, n$ at the end of periods $1, 2, \ldots, n$. Its present value is denoted $(Ia)_{\overline{n}|}$:

$$(Ia)_{\overline{n}|} = \frac{\ddot{a}_{\overline{n}|} - nv^n}{i}$$

where $\ddot{a}_{\overline{n}|}$ is the [[Annuity Due|annuity-due]] present value. The corresponding accumulated value is $(Is)_{\overline{n}|} = (1+i)^n (Ia)_{\overline{n}|}$.

For the more general case with first payment $P$ and constant increase $Q$ per period (payments $P,\, P+Q,\, P+2Q,\, \ldots,\, P+(n-1)Q$), the present value is:

$$PV = P \cdot a_{\overline{n}|} + Q \cdot (Ia)_{\overline{n}|} - Q \cdot n \cdot v^n \cdot \frac{1}{i}$$

which simplifies to the well-known formula:

$$PV = P \cdot a_{\overline{n}|} + \frac{Q}{i}\!\left(a_{\overline{n}|} - nv^n\right)$$

> [!example]- Present Value of Payments 1, 2, 3, 4, 5 {💡 Example}
> An annuity pays $\$100,\,\$200,\,\$300,\,\$400,\,\$500$ at the end of years 1 through 5. The effective annual rate is $i = 6\%$. Find the present value.
>
> > [!answer]- Answer
> > Factor out 100: $PV = 100\cdot(Ia)_{\overline{5}|0.06}$.
> > $$\ddot{a}_{\overline{5}|} = (1.06)\,a_{\overline{5}|} = (1.06) \times 4.2124 \approx 4.4651$$
> > $$v^5 = (1.06)^{-5} \approx 0.74726$$
> > $$(Ia)_{\overline{5}|} = \frac{4.4651 - 5(0.74726)}{0.06} = \frac{4.4651 - 3.7363}{0.06} = \frac{0.7288}{0.06} \approx 12.1467$$
> > $$PV = 100 \times 12.1467 \approx \$1{,}214.67$$
