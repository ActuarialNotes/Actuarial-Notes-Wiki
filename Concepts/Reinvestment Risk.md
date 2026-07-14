**Reinvestment risk** is the risk that the coupons (and other intermediate cash flows) from a [[Bonds|bond]] must be reinvested at a rate lower than originally anticipated, reducing the total accumulated return. A bond bought to yield $j$ realizes that yield only if every coupon can be reinvested at $j$.

> $$\text{Accumulated value} = \text{coupons} \cdot s_{\overline{n}|j'} + \text{redemption}$$

- If reinvestment rates $j'$ fall below $j$, the accumulated value of coupons falls short of projection and the realized yield drops below $j$.
- Reinvestment risk is **higher** for bonds with more and larger intermediate cash flows — shorter [[Macaulay Duration|duration]] and higher coupon rates — because more of the total return depends on reinvesting coupons.
- It is the counterpart of [[Price Risk]]: a zero-coupon bond has no reinvestment risk but maximum price risk, while a short-term bond has low price risk but high reinvestment risk.
- [[Redington Immunization]] and [[Cash Flow Matching]] both address reinvestment risk by matching asset and liability timing.

> [!example]- Reinvestment Risk on a Coupon Bond {Example}
> An investor buys a 3-year \$$1{,}000$ bond with 8% annual coupons at par (yield = 8%), expecting to accumulate $1{,}000(1.08)^3 = \$1{,}259.71$ over 3 years. If coupons are reinvested at only 5% instead of 8%, what is the actual accumulated value?
>
> > [!answer]-
> > Coupons of \$$80$ are received at times 1, 2, and 3. Reinvesting at 5%, their accumulated value at time 3 is:
> > $$80\,s_{\overline{3}|5\%} = 80(3.1525) = \$252.20$$
> > Adding the \$$1{,}000$ redemption value gives a total of $252.20 + 1{,}000 = \$1{,}252.20$.
> > The shortfall is $1{,}259.71 - 1{,}252.20 = \$7.51$, so the realized yield falls slightly below 8% — the effect of reinvestment risk. A zero-coupon bond would have no such shortfall.
