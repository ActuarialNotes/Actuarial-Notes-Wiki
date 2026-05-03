**Cash flow matching** (also called **dedication**) is a portfolio strategy in which asset cash flows are structured to exactly equal liability cash flows at every future date, eliminating both [[Price Risk]] and [[Reinvestment Risk]] entirely. Unlike [[Redington Immunization]], which only protects against small parallel rate shifts and requires periodic rebalancing, a cash flow matched portfolio requires no rebalancing once constructed: each liability is funded directly by a matching asset cash flow. The strategy is more conservative — and typically more expensive — than immunization because it eliminates reinvestment risk at the cost of reduced flexibility. Construction proceeds backwards from the last liability date: choose an asset to fund the final liability, then fund the second-to-last, and so on. Any asset cash flows exceeding the liability at a given date carry forward as an offset to the next liability.

> [!example]- Cash Flow Matching a Two-Period Liability {💡 Example}
> A company has liabilities of $\$5{,}000$ due at time 1 and $\$10{,}000$ due at time 2. Zero-coupon bonds are available at all maturities. Show how to construct a cash flow matched portfolio.
>
> > [!answer]- Answer
> > **Step 1 — Fund the time-2 liability**: Buy a 2-year zero-coupon bond with face value $\$10{,}000$. At time 2 it pays exactly $\$10{,}000$. ✓
> >
> > **Step 2 — Fund the time-1 liability**: Buy a 1-year zero-coupon bond with face value $\$5{,}000$. At time 1 it pays exactly $\$5{,}000$. ✓
> >
> > The portfolio cost is $\dfrac{10000}{(1+s_2)^2} + \dfrac{5000}{1+s_1}$, where $s_1, s_2$ are the current spot rates. Once purchased, no rebalancing is needed and the liabilities are fully funded regardless of future interest rate movements.
