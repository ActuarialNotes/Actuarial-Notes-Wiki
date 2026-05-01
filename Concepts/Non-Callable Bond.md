A **non-callable bond** (also called a **bullet bond**) cannot be redeemed by the issuer before its stated maturity date. The bondholder receives all scheduled [[Coupon]] payments and the [[Redemption Value]] at maturity with certainty, eliminating **call risk** and **reinvestment risk** from early redemption.

The price of a non-callable bond is straightforward:
$$P = Fr \cdot a_{\overline{n}|j} + C \cdot v^n$$

with no uncertainty about the term $n$. Non-callable bonds are simpler to analyze than [[Callable Bond]]s and are the baseline case for bond pricing on Exam FM.

> [!example]- Non-Callable vs. Callable Pricing {💡 Example}
> A non-callable $1{,}000$ face bond pays 7% annual coupons and matures in 8 years. Price at 5% yield.
>
> > [!answer]- Answer
> > $P = 70 \cdot a_{\overline{8}|5\%} + 1000(1.05)^{-8} = 70(6.4632) + 676.84 = 452.42 + 676.84 = 1129.26$
> > This bond is priced at a **premium** since coupon rate (7%) > yield (5%).
