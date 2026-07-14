**Accrued interest** ($Fr \cdot t$) is the portion of the next coupon that has been earned by the seller of a [[Bonds|bond]] between the last coupon date and the settlement date, where $Fr$ is the coupon amount and $t$ is the fraction of the coupon period elapsed ($0 \le t < 1$).

> $$AI = Fr \cdot t$$

> $$\text{Full Price} = \text{Clean Price} + Fr \cdot t$$

- Quoted **clean prices** (flat prices) exclude accrued interest; the **full price** (dirty price) actually paid adds it back and equals the present value of the remaining cash flows.
- The convention splits the price into a clean component (the bond's intrinsic value) and an accrued component that compensates the seller for interest earned since the last coupon.
- For Exam FM, bonds are usually valued on coupon dates, so $t = 0$ and $AI = 0$; the topic is mainly conceptual.

> [!example]- Accrued Interest Between Coupon Dates {Example}
> A \$$1{,}000$ face value bond pays semi-annual coupons at an annual rate of $6\%$ (so each coupon is \$$30$). A buyer purchases the bond 2 months after the last coupon date. The clean price is \$$985$. Find the accrued interest and the full price paid.
>
> > [!answer]-
> > Fraction of coupon period elapsed: $t = 2/6 = 1/3$ (2 months out of a 6-month period).
> > $$AI = Fr \cdot t = 30 \times \tfrac{1}{3} = \$10.00$$
> > $$\text{Full Price} = 985 + 10 = \$995.00$$
> > The buyer pays \$$995$ to the seller. At the next coupon date (4 months later) the buyer receives the full \$$30$ coupon, of which \$$10$ reimburses the accrued interest paid at purchase.
