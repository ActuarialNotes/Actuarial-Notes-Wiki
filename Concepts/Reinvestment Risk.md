**Reinvestment risk** is the risk that the coupon payments (and other intermediate cash flows) received from a bond must be reinvested at a rate lower than originally anticipated, reducing the total accumulated return. When an investor buys a bond expecting a yield of $j$, that yield is only actually realized if each coupon can be reinvested at $j$. If reinvestment rates fall, the accumulated value of coupons is less than projected and the realized yield falls below $j$. Reinvestment risk is higher for bonds with more and larger intermediate cash flows — that is, bonds with **shorter duration** and **higher coupon rates** — because more of the total return depends on reinvesting coupons rather than receiving a lump sum at maturity. Reinvestment risk is the counterpart of [[Price Risk]]: zero-coupon bonds have no reinvestment risk (no intermediate cash flows) but maximum price risk; short-term bonds have low price risk but high reinvestment risk. [[Redington Immunization]] and [[Cash Flow Matching]] both address reinvestment risk by matching asset and liability timing.

> [!example]- Reinvestment Risk on a Coupon Bond {💡 Example}
> An investor buys a 3-year $\$1{,}000$ bond with 8% annual coupons at par (yield = 8%). They expect to accumulate $\$1{,}259.71 = 1000(1.08)^3$ over 3 years. If coupons are reinvested at only 5% instead of 8%, what is the actual accumulated value?
>
> > [!answer]- Answer
> > Coupons of $\$80$ are received at times 1, 2, and 3. Reinvesting at 5%, the accumulated value of coupons at time 3 is:
> > $$80\,s_{\overline{3}|5\%} = 80(3.1525) = \$252.20$$
> > Adding the $\$1{,}000$ redemption value: total $= 252.20 + 1000 = \$1{,}252.20$.
> > The shortfall is $1259.71 - 1252.20 = \$7.51$, meaning the realized yield is slightly below 8% due to reinvestment risk. A zero-coupon bond would have no such shortfall.
