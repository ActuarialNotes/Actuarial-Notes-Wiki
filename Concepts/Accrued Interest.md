$$AI = Fr \cdot t$$

**Accrued interest** is the portion of the next coupon payment that has been earned by the seller of a bond between the last coupon date and the settlement date, where $Fr$ is the coupon amount and $t$ is the fraction of the coupon period elapsed ($0 \le t < 1$). In bond markets, quoted bond prices are **clean prices** (also called flat prices), which exclude accrued interest. The **full price** (dirty price) actually paid by the buyer equals the clean price plus accrued interest:
$$\text{Full Price} = \text{Clean Price} + Fr \cdot t$$
The full price equals the theoretical present value of remaining cash flows. The convention separates the price into a "clean" component that reflects the bond's intrinsic value and an accrued interest component that compensates the seller for interest earned since the last coupon. For Exam FM, bonds are typically valued on coupon dates (so $t = 0$ and $AI = 0$), making this a minor computational topic; its main importance is conceptual.

> [!example]- Accrued Interest Between Coupon Dates {💡 Example}
> A $\$1{,}000$ face value bond pays semi-annual coupons at an annual rate of $6\%$ (so each coupon is $\$30$). A buyer purchases the bond 2 months after the last coupon date. The clean price is $\$985$. Find the accrued interest and the full price paid.
>
> > [!answer]- Answer
> > Fraction of coupon period elapsed: $t = 2/6 = 1/3$ (2 months out of a 6-month period).
> > $$AI = Fr \cdot t = 30 \times \tfrac{1}{3} = \$10.00$$
> > $$\text{Full Price} = 985 + 10 = \$995.00$$
> > The buyer pays $\$995$ to the seller. At the next coupon date (4 months later) the buyer receives the full $\$30$ coupon, of which $\$10$ reimburses the accrued interest paid at purchase.
