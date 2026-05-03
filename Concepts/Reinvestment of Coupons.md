$$AV = Fr \cdot s_{\overline{n}|r_i} + C$$

When coupons are reinvested at a rate $r_i$ per period, the **accumulated value** at the end of $n$ periods equals the future value of the coupon annuity at the reinvestment rate plus the redemption value $C$. Here $Fr$ is the coupon per period, $s_{\overline{n}|r_i}$ is the accumulated value factor for an annuity-immediate at rate $r_i$, and $C$ is the redemption payment received at time $n$. If the reinvestment rate equals the original yield ($r_i = j$), the total accumulated value equals $P(1+j)^n$, confirming that the investor earns exactly the yield rate. If $r_i < j$, the accumulated value is lower and the realized return falls below $j$; if $r_i > j$, the investor does better than the promised yield. This analysis motivates [[Reinvestment Risk]] as an important practical concern for coupon bonds.

> [!example]- Accumulated Value with Coupon Reinvestment {💡 Example}
> A $\$1{,}000$ face value 4-year bond pays 7% annual coupons and is redeemed at par. Coupons are reinvested at 4% per year. Find the total accumulated value at the end of 4 years and the realized annual yield.
>
> > [!answer]- Answer
> > Coupon $= Fr = 1000 \times 0.07 = \$70$ per year. $s_{\overline{4}|4\%} = \dfrac{(1.04)^4 - 1}{0.04} = \dfrac{1.1699 - 1}{0.04} = 4.2465$.
> > $$AV = 70 \times 4.2465 + 1000 = 297.26 + 1000 = \$1{,}297.26$$
> > The bond was priced at par so $P = \$1{,}000$. The realized yield $r_{\text{realized}}$ satisfies $1000(1+r)^4 = 1297.26$, giving $(1+r)^4 = 1.29726$, so $r = 1.29726^{1/4} - 1 \approx 6.71\%$. This is below the 7% coupon rate because coupons were reinvested at only 4%.
