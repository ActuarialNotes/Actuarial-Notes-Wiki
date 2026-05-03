$${}_{k|}a_{\overline{n}|} = v^k \cdot a_{\overline{n}|}$$

A **deferred annuity** is an [[Annuity Immediate|annuity-immediate]] (or [[Annuity Due|annuity-due]]) whose first payment is delayed by a **deferral period** of $k$ periods. The present value at time 0 of an annuity-immediate of $n$ payments deferred $k$ periods is:

$${}_{k|}a_{\overline{n}|} = v^k \cdot a_{\overline{n}|} = a_{\overline{k+n}|} - a_{\overline{k}|}$$

The second form shows that a deferred annuity equals the difference between a longer annuity starting now and the portion that is withheld during the deferral period. Similarly, for a deferred annuity-due:

$${}_{k|}\ddot{a}_{\overline{n}|} = v^k \cdot \ddot{a}_{\overline{n}|}$$

Deferred annuities are common in retirement planning, where contributions accumulate during a working phase and payments begin at a future date.

> [!example]- Present Value of a 3-Year Deferred Annuity {💡 Example}
> An annuity pays $\$2{,}000$ at the end of each year for 5 years, with the first payment 4 years from now (i.e., deferred 3 years). The effective annual rate is $i = 5\%$. Find the present value today.
>
> > [!answer]- Answer
> > $${}_{3|}a_{\overline{5}|0.05} = v^3 \cdot a_{\overline{5}|0.05}$$
> > $$v^3 = (1.05)^{-3} \approx 0.86384, \quad a_{\overline{5}|} = \frac{1-(1.05)^{-5}}{0.05} \approx 4.3295$$
> > $${}_{3|}a_{\overline{5}|} = 0.86384 \times 4.3295 \approx 3.7403$$
> > $$PV = 2{,}000 \times 3.7403 \approx \$7{,}480.54$$
