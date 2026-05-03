$$P = Fr \cdot a_{\overline{n}|j} + C \cdot v^n$$

The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the yield rate $j$ per period. Here $F$ is the face value, $r$ is the coupon rate per period (so $Fr$ is the periodic coupon amount), $C$ is the redemption value (often equal to $F$), $n$ is the total number of coupon periods, and $v = 1/(1+j)$. An equivalent form is the **premium/discount formula**: $P = C + (Fr - Cj) \cdot a_{\overline{n}|j}$, which makes the premium or discount explicit. When $Fr > Cj$ the bond sells at a **premium** ($P > C$); when $Fr < Cj$ it sells at a **discount** ($P < C$); when $Fr = Cj$ it sells at **par** ($P = C$).

> [!example]- Bond Price Calculation {💡 Example}
> A $\$1{,}000$ face value 10-year bond pays semi-annual coupons at a coupon rate of $8\%$ per year. The bond is priced to yield $6\%$ per year convertible semi-annually. Find the bond price.
>
> > [!answer]- Answer
> > Per-period values: $F = C = 1000$, $r = 4\% = 0.04$, $j = 3\% = 0.03$, $n = 20$.
> > $$Fr = 1000(0.04) = 40, \quad v^{20} = (1.03)^{-20} = 0.5537$$
> > $$a_{\overline{20}|3\%} = \frac{1 - 0.5537}{0.03} = 14.877$$
> > $$P = 40(14.877) + 1000(0.5537) = 595.08 + 553.70 = \$1{,}148.78$$
> > Since the coupon rate per period ($4\%$) exceeds the yield rate per period ($3\%$), the bond sells at a **premium** above its $\$1{,}000$ face value.
