**Prospective formula** (present value of remaining cash flows):
$$BV_k = Fr \cdot a_{\overline{n-k}|j} + C \cdot v^{n-k}$$

**Retrospective formula** (price accumulated minus coupons accumulated):
$$BV_k = P(1+j)^k - Fr \cdot s_{\overline{k}|j}$$

The **book value** of a bond at time $k$ (immediately after the $k$-th coupon is paid) is the amortized value of the bond at that point, using the original [[Yield Rate]] $j$. It equals the present value of all remaining cash flows (coupons and redemption) discounted at $j$, and also equals the price accumulated at $j$ minus the accumulated coupons. At time 0, $BV_0 = P$ (the purchase price). At time $n$, $BV_n = C$ (the redemption value). For a **premium bond** ($P > C$), the book value decreases from $P$ toward $C$ over time (amortization of premium). For a **discount bond** ($P < C$), it increases from $P$ toward $C$ (accumulation of discount). Book value is used in the [[Amortization Schedule]] for bonds: each coupon period the investor earns $j \cdot BV_{k-1}$ in yield, and the difference between the coupon $Fr$ and the yield $j \cdot BV_{k-1}$ is the write-down (premium) or write-up (discount) of the book value.

> [!example]- Book Value of a Premium Bond {💡 Example}
> A $\$1{,}000$ face value 3-year annual-coupon bond has coupon rate $8\%$ and yield rate $6\%$. Find the book value after the 2nd coupon.
>
> > [!answer]- Answer
> > First find the price: $P = 80\,a_{\overline{3}|6\%} + 1000\,v^3 = 80(2.6730) + 1000(0.8396) = 213.84 + 839.62 = \$1{,}053.46$.
> >
> > **Prospective**: $BV_2 = 80\,a_{\overline{1}|6\%} + 1000\,v^1 = 80(0.9434) + 1000(0.9434) = 75.47 + 943.40 = \$1{,}018.87$
> >
> > **Retrospective**: $BV_2 = 1053.46(1.06)^2 - 80\,s_{\overline{2}|6\%} = 1053.46(1.1236) - 80(2.0600) = 1183.56 - 164.80 = \$1{,}018.76$
> >
> > (Rounding difference; both methods agree.) The book value has moved from $\$1{,}053.46$ at time 0 toward $\$1{,}000$ at maturity, as expected for a premium bond.
