**Redington immunization** is a strategy for protecting a portfolio's surplus $S = V_A - V_L$ against small parallel shifts in interest rates. It requires three conditions to be satisfied simultaneously at the current yield rate $j$:

1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)
2. $D_{Mac}(A) = D_{Mac}(L)$ — asset and liability [[Macaulay Duration|Macaulay durations]] are equal
3. $\text{Convexity}(A) > \text{Convexity}(L)$ — asset [[Convexity]] exceeds liability convexity

When all three hold, a small change $\Delta j$ in the yield rate causes the asset value to increase (or decrease less than liabilities), so $S \geq 0$ after the shift. This works because the second-order (convexity) term dominates: $\Delta S \approx \tfrac{1}{2}(C_A - C_L) \cdot V \cdot (\Delta j)^2 \geq 0$. Redington immunization only protects against small, parallel rate shifts and must be rebalanced as time passes and rates change. It is less restrictive than [[Cash Flow Matching]] since exact cash flow timing is not required.

> [!example]- Verifying Redington Immunization {💡 Example}
> A company has a single liability of $\$10{,}000$ due in 4 years. It immunizes using two zero-coupon bonds: Bond A maturing in 2 years and Bond B maturing in 6 years. The current yield rate is $5\%$. Find the face values of the two bonds that satisfy the first two Redington conditions, and verify the third.
>
> > [!answer]- Answer
> > Let $X$ = face of 2-year bond, $Y$ = face of 6-year bond, $v = 1/1.05$.
> >
> > **Condition 1** ($PV_A = PV_L$):
> > $$X v^2 + Y v^6 = 10000 v^4$$
> > **Condition 2** ($D_{Mac}(A) = D_{Mac}(L) = 4$):
> > $$\frac{2 X v^2 + 6 Y v^6}{X v^2 + Y v^6} = 4 \implies 2 X v^2 + 6 Y v^6 = 4(10000 v^4)$$
> >
> > From Condition 1: $X v^2 + Y v^6 = 10000 v^4$. Substituting into Condition 2: $2Xv^2 + 6Yv^6 = 40000v^4$. Solving the system gives $Xv^2 = 5000v^4$ and $Yv^6 = 5000v^4$, so $X = 5000v^2 = 5000/1.05^2 \approx \$4{,}535$ face and $Y = 5000v^{-2} = 5000(1.05)^2 \approx \$5{,}513$ face.
> >
> > **Condition 3**: For zero-coupon bonds, convexity of the asset portfolio equals a weighted average of $t(t+1)$ terms. Asset convexity involves terms $2(3)$ and $6(7)$; liability convexity involves $4(5) = 20$. Asset convexity $= \tfrac{1}{2}[2(3) + 6(7)] = \tfrac{1}{2}[6+42] = 24 > 20$. Condition 3 is satisfied.
