A **deferred annuity** ${}_{k|}a_{\overline{n}|}$ is an [[Annuity Immediate|annuity-immediate]] (or [[Annuity Due|annuity-due]]) whose first payment is delayed by a **deferral period** of $k$ periods.

> $${}_{k|}a_{\overline{n}|} = v^k \cdot a_{\overline{n}|} = a_{\overline{k+n}|} - a_{\overline{k}|}$$

> $${}_{k|}\ddot{a}_{\overline{n}|} = v^k \cdot \ddot{a}_{\overline{n}|}$$

- The difference form $a_{\overline{k+n}|} - a_{\overline{k}|}$ shows a deferred annuity as a full $(k+n)$-payment annuity minus the payments withheld during the deferral.
- $v = (1+i)^{-1}$ discounts the annuity-immediate value back over the $k$-period deferral.
- Common in retirement planning, where contributions accumulate during working years and payouts begin at a future date.

> [!example]- Present Value of a 3-Year Deferred Annuity {Example}
> An annuity pays \$$2{,}000$ at the end of each year for 5 years, with the first payment 4 years from now (i.e. deferred 3 years). The effective annual rate is $i = 5\%$. Find the present value today.
>
> > [!answer]-
> > $$\begin{align*} {}_{3|}a_{\overline{5}|} &= v^3 \cdot a_{\overline{5}|0.05} \\ &= (1.05)^{-3} \cdot \frac{1 - (1.05)^{-5}}{0.05} \\ &= 0.86384 \times 4.3295 \\ &\approx 3.7403 \end{align*}$$
> > $$PV = 2{,}000 \times 3.7403 \approx \$7{,}480.54$$
