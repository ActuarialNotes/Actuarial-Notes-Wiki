$$P = \sum_{t=1}^{n} \frac{C_t}{(1+s_t)^t}$$

The **yield curve** is a graph plotting the [[Spot Rate]] $s_t$ (or yield to maturity) against time to maturity $t$. It summarizes the term structure of interest rates at a given point in time and is used to price bonds by discounting each cash flow at the spot rate for its maturity. A **normal (upward-sloping)** yield curve has long rates above short rates, reflecting expectations of rising rates or a liquidity premium. An **inverted (downward-sloping)** curve has short rates above long rates, often signaling a potential economic slowdown. A **flat** yield curve has roughly equal rates across all maturities. The yield curve is bootstrapped from observed market prices of coupon bonds to extract the implied spot rates $s_1, s_2, \ldots, s_n$.

> [!example]- Reading and Using a Yield Curve {💡 Example}
> The yield curve gives $s_1 = 3\%$, $s_2 = 4\%$, $s_3 = 4.5\%$. Price a 3-year $\$1{,}000$ bond paying annual coupons of $\$50$.
>
> > [!answer]- Answer
> > $$P = \frac{50}{1.03} + \frac{50}{1.04^2} + \frac{1050}{1.045^3}$$
> > $$P = 48.54 + 46.27 + 921.49 = \$1{,}016.30$$
> > This is an upward-sloping (normal) yield curve. The bond prices above par because the coupon rate ($5\%$) exceeds even the longest spot rate ($4.5\%$), so the bond is a premium bond.
