$$P = \sum_{t=1}^{n} \frac{C_t}{(1+s_t)^t}$$

The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exactly $n$ years. It represents the market's required return for a single cash flow received at time $n$, with no intermediate payments. Because each cash flow has its own maturity, a coupon bond is priced by discounting each cash flow at the spot rate for that maturity rather than a single yield. Spot rates are read from the [[Yield Curve]] or bootstrapped from observed bond prices. The relationship between spot rates and [[Forward Rate|forward rates]] is: $(1+s_n)^n = (1+s_{n-1})^{n-1}(1+f_{n-1,n})$, where $f_{n-1,n}$ is the one-year forward rate from year $n-1$ to $n$.

> [!example]- Pricing a Bond with Spot Rates {💡 Example}
> Spot rates are $s_1 = 4\%$, $s_2 = 5\%$, $s_3 = 6\%$. Find the price of a $\$1{,}000$ face value 3-year bond paying annual coupons of $\$60$.
>
> > [!answer]- Answer
> > Discount each cash flow at the corresponding spot rate:
> > $$P = \frac{60}{1.04} + \frac{60}{1.05^2} + \frac{1060}{1.06^3}$$
> > $$P = 57.69 + 54.42 + 890.00 = \$1{,}002.11$$
> > Note this differs from using a single flat yield, because the spot curve is upward-sloping (longer maturities have higher rates).
