$$P = Fr \cdot a_{\overline{n}|j} + C \cdot v^n$$

The **yield rate** $j$ (also called the yield to maturity) is the internal rate of return of a bond — the interest rate per period at which the present value of all future cash flows equals the current price $P$. It is the $j$ that solves the bond price equation. Unlike the [[Coupon Rate]] $r$, which is fixed by the bond's terms, the yield rate reflects the bond's market price. A **premium bond** ($P > C$) has $Fr > Cj$, meaning the coupon rate exceeds the yield rate; a **discount bond** ($P < C$) has $Fr < Cj$. Bond prices and yields move in opposite directions: if the yield rises, the price falls, and vice versa. The yield rate is the fundamental measure of a bond's return to a buy-and-hold investor.

> [!example]- Finding the Yield Rate {💡 Example}
> A $\$1{,}000$ face value 3-year annual-coupon bond with coupon rate $5\%$ is currently priced at $\$950.26$. Verify that the yield rate is approximately $6.5\%$.
>
> > [!answer]- Answer
> > Coupons are $Fr = 1000(0.05) = \$50$ per year; redemption value $C = 1000$.
> > At $j = 6.5\%$: $v = 1/1.065$, $a_{\overline{3}|6.5\%} = (1 - 1.065^{-3})/0.065 = 2.6485$.
> > $$P = 50(2.6485) + 1000(1.065)^{-3} = 132.43 + 827.85 = \$960.28$$
> > Trying $j = 7\%$: $a_{\overline{3}|7\%} = 2.6243$, $P = 50(2.6243) + 1000(1.07)^{-3} = 131.22 + 816.30 = \$947.51$.
> > By interpolation the yield is close to $6.5\%$–$7\%$, consistent with the bond trading at a discount to its $\$1{,}000$ face value since the coupon rate ($5\%$) is below the yield.
