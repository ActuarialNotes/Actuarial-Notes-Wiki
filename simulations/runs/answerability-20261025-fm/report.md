# Answerability: Exam FM-2 (SOA)

Run `answerability-20261025-fm` · 460 questions checked of 460 attempted · cost $76.40

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away or on a prerequisite exam's page | 120 | 26% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 165 | 36% |
| **Gap** — something the solution uses is taught on no page | 174 | 38% |
| No requirements listed | 1 | |

Requirements: 2160 — tagged 1230 (57%), linked 331 (15%), prerequisite 0 (0%), elsewhere 358 (17%), missing 241 (11%)
Not checked: 1 off syllabus.

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 460 | 120 | 165 | 174 (38%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### **no page for Bond Pricing** — 17 question(s)

- `fm-095` (procedure): Solve the bond price equation for the coupon rate to get r = (P/F)(1/a_{n\|}) − v^n/a_{n\|}, showing r is a linear function of 1/F when price, term and yield are held fixed.
- `fm-095` (procedure): When bonds share the same term, price and yield, the slope and intercept constants in the linear relation r = x(1/F) + y are the same for all bonds, so they can be determined from two bonds and then applied to a third.
- `fm-158` (procedure): When two bond price equations share the same annuity (coupon) term and differ only in the redemption term, subtract them to isolate the present value of the redemption amount, then substitute back to solve for the annuity value.
- `fm-163` (fact): The price of a portfolio of bonds is the sum of the individual bond prices, so the combined price can be written as a sum of the two bonds' present value expressions at the same yield rate.
- `fm-196` (procedure): To solve for an unknown coupon rate, write the price of the original bond and of the changed-term bond at the same yield, relate them using the stated price difference, and solve the resulting equation for the coupon rate.
- `fm-235` (procedure): To compare two bonds with the same term and yield rate, write each price with the bond formula and subtract; terms common to both (such as a shared redemption value) cancel, leaving a difference in coupon annuities and redemption values to solve for the unknown.
- `fm-239` (procedure): When a price changes by a percentage (e.g. 7% less), the new price equals the old price times one minus that percentage, which allows setting up an equation linking the two bond prices at the same yield rate.
- `fm-258` (fact): When two bonds have the same purchase price, set their price expressions equal and solve for the unknown quantity.
- `fm-263` (procedure): When two bonds share the same face value, coupon rate, and yield rate but differ in term, use the first bond's price to solve for v^n (or v at a given term), then use that to find the unknown term via v^n = target and n = ln(v^n)/ln(v).
- `fm-264` (procedure): Use the first bond's price equation to solve for the unknown annual coupon amount, then take half of it as the second bond's semiannual coupon.
- `fm-273` (procedure): Sale proceeds are reinvested as the purchase price of the new bond, so the new bond's price equals the old bond's sale price; solve the bond price equation for the unknown coupon.
- `fm-297` (procedure): When the coupon rate is a multiple k of the yield rate, the coupon-bond price simplifies to F[k(1 - v^n) + v^n], which can be solved for v^n and then for the yield rate i.
- `fm-319` (fact): The coupon amount Fr equals j times the quantity Fr/j, so the coupon annuity can be written as (Fr/j)(1 - v^n), which lets the price equation be rewritten as Fr/j + (C - Fr/j)v^n.
- `fm-352` (procedure): When two bonds share the same price, term and yield, use the first bond's relation (v^n = Price/Face) to get v^n for the second bond's price equation, and solve that equation for the unknown face value.
- `fm-378` (procedure): Solve for the unknown annual coupon by setting the observed price equal to the bond's present value at the given yield and isolating the coupon in the annuity term.
- `fm-416` (procedure): When the coupon rate is a fixed fraction k of the yield rate and face equals redemption, the bond price simplifies to F[k + (1-k)v^n], so the unknown v^n can be solved from the given price and then reused with a different term via v^{jn} = (v^n)^j.
- `fm-434` (fact): Two bonds yielding the same annual nominal rate share the same periodic yield rate, so the yield found from one bond can be used to price the other.
- `fm-444` (procedure): Solve for an unknown coupon amount by setting the bond price equal to the coupon annuity PV plus redemption PV and isolating the coupon.

### `Concepts/Macaulay Duration.md` — 16 question(s)

- `fm-030` (formula): Macaulay duration equals the negative of the derivative of price with respect to yield, divided by price, times one plus the effective annual yield: D = -(dP/di)/P × (1+i).
- `fm-050` (fact): For a bond bought at par (coupon rate equals yield rate), the Macaulay duration in periods equals the annuity-due value ä_{n\|} at the yield rate.
- `fm-053` (fact): For a bond bought at par (coupon rate equals yield rate), the price equals par and the Macaulay duration equals the annuity-due present value factor at the yield rate for the remaining term.
- `fm-053` (procedure): Just before a coupon is paid, the remaining cash flows are those of the bond one period earlier, each occurring one year sooner, so the Macaulay duration equals the earlier duration minus one year (yield unchanged).
- `fm-100` (procedure): Given a known Macaulay duration, solve the duration equation for the discount factor v (and hence the yield rate), then reuse that same v when computing the duration of another cash flow stream at the same yield rate.
- `fm-102` (fact): For a perpetuity-due paying 1 per year, the Macaulay duration (starting at time 0) equals 1/i, so the interest rate can be found as the reciprocal of the duration.
- `fm-183` (fact): For level end-of-period payments, the payment amount cancels in the Macaulay duration ratio, so duration equals (Ia) divided by a at the loan's interest rate over the term.
- `fm-185` (fact): For a bond with fixed term and yield, a higher coupon rate puts more present-value weight on earlier coupon payments relative to the final redemption payment, which lowers Macaulay duration.
- `fm-219` (fact): In the Macaulay duration of equal-amount cash flows, the common amount X cancels from the numerator and denominator, so the duration depends only on timing and discount factors.
- `fm-354` (procedure): Compute the Macaulay duration of a coupon bond as [Fr·(Ia)_n + n·C·v^n] divided by its price, where Fr is the coupon and C the redemption value.
- `fm-383` (procedure): Given a Macaulay duration and the cash flow amounts and times, set up the duration formula as an equation in v = 1/(1+i) and solve it to recover the effective annual yield rate.
- `fm-383` (fact): A cash flow occurring at time 0 has a time weight of 0 and a present value equal to its face amount, so it contributes to the denominator but not the numerator of the duration formula.
- `fm-389` (fact): Deferring all payments of a cash flow set by k years increases its Macaulay duration by exactly k years, since every payment time shifts by k in the weighted average.
- `fm-409` (fact): When cash flows are level, the payment amount cancels in the numerator and denominator of the Macaulay duration, so duration does not depend on the loan size.
- `fm-412` (fact): In the Macaulay duration of a level-payment stream, the common payment amount cancels from numerator and denominator, so only the discount factors matter.
- `fm-429` (procedure): To compute the duration of a coupon bond, the numerator is the coupon rate times (Ia)_n plus n times v^n (for the redemption payment at time n), and the denominator is the bond price.
- `fm-445` (procedure): When the current rate is unknown, use one bond's known approximated present value to solve for the common rate-ratio factor (1+i0)/(1+i) raised to its exponent, then raise that result to the ratio of the other bond's duration to the first bond's duration to get the other bond's factor.
- `fm-447` (fact): Scaling all cash flows by a constant factor (e.g., changing the level payment amount) does not change the Macaulay or modified duration, since the factor cancels in the ratio.
- `fm-447` (procedure): For a perpetuity-due, the payment at time 0 has weight 0 in the time-weighted present value, so the numerator is the same as for the perpetuity-immediate, while the denominator (total present value) includes the time-0 payment.

### `Concepts/Equation of Value.md` — 12 question(s)

- `fm-010` (procedure): To find an unknown deposit, set up an equation of value in which the interest earned over a period, computed as the opening balance (prior deposits accumulated plus the new deposit) times [a(t2)/a(t1) - 1], equals the stated amount, then solve for the unknown.
- `fm-075` (procedure): When cash flows occur at times t and 2t, substitute x = v^t so that the equation of value becomes a quadratic in x, then solve it with the quadratic formula and take the positive root.
- `fm-083` (fact): The account balance just before the first withdrawal equals the accumulated value of all prior deposits at that time, which also equals the present value at that time of all future withdrawals.
- `fm-117` (procedure): To solve for an unknown quantity defined by two equivalent expressions, set the expressions equal and solve for the common term (here (1+i)^n - 1) without needing to determine n itself.
- `fm-217` (fact): The price of an investment equals the present value of its payments at the valuation rate, so a purchase made with an account balance sets the accumulated deposits equal to the perpetuity's present value.
- `fm-252` (procedure): To find a fund's value at another time when two funds are equal at one time, equate the two accumulation functions at that time to determine (1+i)^n, then raise to the appropriate power to get the value at the other time.
- `fm-253` (procedure): To solve for an unknown interest rate when two cash flow streams have equal present values, equate the present values and reduce to an equation in v^n (a quadratic in v^10 when powers v^10 and v^20 appear), then solve for v and convert to i = 1/v - 1.
- `fm-303` (procedure): To find an unknown deposit, express the total accumulated balance at the end date as the sum of each deposit accumulated to that date, subtract total deposits to get interest, and set it equal to the given interest condition.
- `fm-311` (procedure): The number of terms in the sum is determined by the number of periods through the stated balance date, and the terminal balance is discounted by the time of the last payment (e.g., 15 months = 15/12 = 5/4 years).
- `fm-330` (procedure): To find an unknown deposit, set the interest earned in the specified year on one account equal to that on the other account and solve for the unknown.
- `fm-342` (fact): The account balance immediately after the last deposit is a value at the final deposit time (time of the term end), so its present value is the balance times the discount factor over the full term.
- `fm-391` (procedure): When cash flows occur at even times, the equation of value can be written as a quadratic in v^2 (a substitution such as w = v^2), after dividing out the common factor.

### `Concepts/Annuity Immediate.md` — 9 question(s)

- `fm-014` (procedure): Decompose a payment stream with a step increase in level into a sum of level annuities covering different time spans (e.g., a stream of 2P over a later period equals P over the whole period plus P over the later period).
- `fm-077` (procedure): Count only the level payments that occur on or before the valuation date (complete periods elapsed), so payments falling after the evaluation date are excluded from the equation.
- `fm-164` (fact): The present value of an n-payment annuity-due equals one payment plus the present value of an (n-1)-payment annuity-immediate: a-double-dot angle n = 1 + a angle (n-1).
- `fm-261` (procedure): Count the number of payments in a series running from one birthday/age to another inclusive (last age minus first age plus 1), and measure elapsed time between the start and end dates as last age minus first age.
- `fm-309` (procedure): To value an annuity at a time after some payments have been made, take the present value at that time of only the remaining payments, using the number of payments still outstanding.
- `fm-335` (formula): The present value of an n-period annuity-immediate at effective rate i is a_angle(n) = (1 - v^n)/i. — *the locator quoted text that isn't on the page:* “> $$a_{\overline{n}\|} = \frac{1-v^n}{i}$$”
- `fm-376` (formula): The Macaulay duration of an n-year level annuity-immediate is (Ia)_{n\|} / a_{n\|}, since the payments at times 1..n have present values proportional to v^t.
- `fm-384` (fact): The difference of consecutive annuity-immediate values satisfies a_{n\|} − a_{n-1\|} = v^n, and v^n − v^{n-1} = −i·v^n.
- `fm-397` (procedure): To value a repeating pattern of payments within each year, first compute the present value of one year's pattern at the start of that year using the periodic rate, then treat these values as a level annuity of annual payments valued at the effective annual rate.

### `Concepts/Increasing Annuity.md` — 9 question(s)

- `fm-026` (procedure): When payments grow with inflation from today's level, the first payment at time 1 equals the current amount times (1 + inflation rate), and payment t equals the current amount times (1 + inflation rate)^t.
- `fm-165` (procedure): Compute the time-weighted present value of a payment stream with irregular or step-changing payments by decomposing the t times payment sequence into a combination (sums and differences) of standard increasing annuities.
- `fm-195` (procedure): For a deferred level perpetuity, the time-weighted PV of payments at times k+1, k+2, ... is computed by writing each time as k plus the index (t = k + s), giving v^k[k·a_∞ + (Ia)_∞].
- `fm-209` (fact): Interest paid on a level deposit at rate i at the end of each year forms an increasing annuity of payments i·D, 2i·D, 3i·D, ... when each deposit's interest is paid for each year since deposit, so the interest accumulates as i·D·(Is) at the reinvestment rate.
- `fm-259` (procedure): Decompose an arithmetically increasing payment stream (each payment rising by a constant amount) into a sum of level annuities, one starting at each payment time, and accumulate each to the common valuation date.
- `fm-336` (formula): The accumulated value of an increasing annuity-immediate is (Is)_{n\|i} = (s̈_{n\|i} − n)/i. — *the locator quoted text that isn't on the page:* “> $$(Is)_{\overline{n}\|} = \frac{\ddot{s}_{\overline{n}\|} - n}{i}$$”
- `fm-392` (procedure): For an investment where each beginning-of-year payment earns simple interest at rate i paid at year end and the interest is reinvested at another rate, the principal held during year k is k times the payment, so the interest paid at the end of year k is k times the payment times i.
- `fm-398` (procedure): Decompose a payment pattern with changing slopes into a sum of increasing perpetuities started at different times, with each multiple (e.g. -2 at the peak, +1 at the next break) chosen to change the slope of the payments at that time and produce the desired level pattern.
- `fm-409` (formula): The Macaulay duration of an n-year level annuity-immediate at interest rate i equals (Ia)_{n\|i} / a_{n\|i}.

### **no page for Bond Valuation** — 8 question(s)

- `fm-053` (fact): Immediately after a coupon is paid, the bond is a par bond with one fewer period remaining, and its duration is computed from the remaining cash flows only (the paid coupon is excluded).
- `fm-098` (procedure): To find the term of a bond, solve the prospective book value equation for the remaining number of periods using logarithms, then add the elapsed periods and convert periods to years (divide by the number of periods per year).
- `fm-141` (procedure): When two bond price equations share unknowns (the coupon rate and the price), write both equations and subtract one from the other to eliminate the common term and solve for the price, then back-substitute to find the coupon rate.
- `fm-234` (procedure): To find an unknown coupon rate when two bonds have equal prices at the same yield rate, compute the first bond's price, set the second bond's price formula equal to it, and solve for the second bond's coupon amount, then divide by its face value to get the rate.
- `fm-269` (procedure): When two bonds share the same yield, term and coupon payments but have different face amounts, scale one price equation and subtract the other to eliminate the redemption-value term v^n and solve for the coupon annuity value.
- `fm-315` (fact): Bonds with the same term and the same yield rate share the same v^n and a_angle(n), so these values found from one bond can be reused to price another.
- `fm-340` (procedure): To find an unknown first payment, write the price equation as a linear function of that payment (annuity factor times payment plus PV of redemption) and solve for it.
- `fm-430` (procedure): When two bonds share the same price, term, and yield, the quantity v^n found from one bond's price equation can be substituted into the other bond's price equation, so that the yield rate i cancels and the unknown face value can be solved for.

### `Concepts/Annuity Due.md` — 8 question(s)

- `fm-002` (procedure): To find the accumulated value of level deposits made at the start of each k-year period, accumulate each deposit at the effective rate for its remaining time and sum the resulting terms, which form a geometric series with ratio (1+i)^k.
- `fm-015` (formula): The annuity-due present value factor is ä_{n\|i} = (1 − v^n)/d = (1 − v^n)·(1+i)/i, where v = 1/(1+i). — *the locator quoted text that isn't on the page:* “> $$= \frac{1-v^n}{d}$$”
- `fm-165` (fact): For payments made at the beginning of each year starting today, the payment in year k is received at time k-1, so the time weights are 0, 1, 2, ... rather than 1, 2, 3, ....
- `fm-178` (procedure): For level deposits at the beginning of each year, a deposit made at time k-1 earns interest at times k through n, so the interest payments across deposits form an increasing stream of 1, 2, ..., n payments at each time.
- `fm-233` (definition): A deposit made at the beginning of year n (annuity-due timing) occurs at time n-1, so deposits for years 1 through N occur at times 0 through N-1.
- `fm-280` (procedure): For annual deposits at the start of each year, each deposit earns a constant interest amount (rate times principal) at each year-end, so the interest payments form an increasing stream of 1, 2, ..., n times that amount when accumulated, with n deposits yielding interest of k payments for the k-th o…
- `fm-336` (formula): The accumulated value of an annuity-due is s̈_{n\|i} = ((1+i)^n − 1)/d, where d = i/(1+i), equivalently (1+i)·s_{n\|i}. — *the locator quoted text that isn't on the page:* “> $$\ddot{s}_{\overline{n}\|} = (1+i)\,s_{\overline{n}\|}$$”
- `fm-366` (procedure): A level-varying payment stream can be decomposed into a base level annuity plus additional level annuities starting later, each valued separately and summed (e.g., 100 for all years plus an extra 50 for the last three years).

### `Concepts/Force of Interest.md` — 8 question(s)

- `fm-046` (fact): When the integrand is a constant multiple of f'(r)/f(r), its integral is that multiple times ln f(r), so the integral from 0 to t equals the multiple times ln(f(t)/f(0)).
- `fm-086` (fact): The integral of 1/(t+1) is ln(t+1), so exp of the integral from a to b equals (b+1)/(a+1).
- `fm-115` (procedure): To solve for an unknown interest rate from an annuity equation, substitute X = e^{-kδ} (a power of the discount factor) so that e^{-2kδ} = X^2 and the equation becomes a polynomial in X, then cancel the common factor (1 - X) since X ≠ 1 when the interest rate is positive.
- `fm-324` (formula): The annual effective rate of interest in year n is i_n = a(n)/a(n-1) - 1, i.e., the growth over the interval from time n-1 to n.
- `fm-324` (fact): Year n corresponds to the time interval from t = n-1 to t = n, so year 5 runs from time 4 to time 5.
- `fm-342` (formula): With a constant force of interest δ, the accumulation factor over t years is e^{δt} and the present value (discount) factor is e^{-δt}. — *the locator quoted text that isn't on the page:* “> $$a(t) = e^{\delta t}$$”
- `fm-342` (procedure): For a nominal or annual force of interest δ and payments m times per year, the force of interest over each 1/m-year period is δ/m, so the nth payment at time n/m has present value equal to the payment times e^{-(δ/m)n}.
- `fm-365` (fact): The integral of 1/(1+t) dt is ln(1+t), so exp(∫_a^b 1/(1+t) dt) = (1+b)/(1+a).
- `fm-394` (fact): The n-th year of an investment corresponds to the time interval from t = n−1 to t = n.
- `fm-442` (procedure): Map a calendar year to a time interval measured from the stated time origin: the year beginning n years after the origin runs from t=n to t=n+1.
- `fm-442` (fact): The antiderivative of 1/(c+t) with respect to t is ln(c+t), so the integral of the force of interest 1/(c+t) from a to b equals ln((c+b)/(c+a)).

### **no page for Zero-Coupon Bond** — 6 question(s)

- `fm-091` (fact): A zero-coupon bond bought at a price expressed as a fraction of redemption value grows to a redemption value equal to the reciprocal of that price per unit invested.
- `fm-091` (procedure): A deposit made at the beginning of month k is invested in a bond maturing at the end of the accumulation horizon, so its term is the remaining months and its price is the one for that maturity (e.g., the first deposit uses the longest maturity, the last deposit uses a 1-month bond).
- `fm-137` (definition): A zero-coupon bond pays a single lump sum at maturity and no interim coupons, so its maturity value equals the purchase price accumulated at the yield rate for the full term.
- `fm-151` (definition): A zero-coupon bond pays a single face amount at maturity and no interim coupons, so its price is the present value of the face amount at the bond's yield. — *the locator quoted text that isn't on the page:* “Purchase a 4-year zero-coupon bond with face value $50{,}000$ at a cost of > > $$50{,}000(1.05)^{-4} = 41{,}135.12$$”
- `fm-266` (procedure): The accumulation factor from time m to time n can be expressed using zero-coupon bond prices as the ratio P(0,m)/P(0,n), since the price ratio of two zero-coupon bonds gives the forward growth factor.
- `fm-297` (fact): A zero-coupon bond pays only the face value at maturity, so its price is F·v^n.
- `fm-315` (definition): A zero-coupon bond pays no coupons, so its price equals its redemption value times v^n.

### `Concepts/Loan Amortization.md` — 6 question(s)

- `fm-006` (procedure): When each payment is a fixed multiple m of the interest due, the balance is reduced by the factor (1 - (m-1)i) each period, so the balance after n periods is the original loan times (1 - (m-1)i)^n.
- `fm-069` (procedure): To reamortize a loan at a new interest rate, treat the current outstanding balance as a new loan over the remaining number of payments (maturity unchanged) and compute the new level payment as balance divided by the annuity factor at the new rate.
- `fm-089` (procedure): Convert a count of end-of-month payment periods to a calendar date by counting forward from the first payment date, with the k-th payment occurring k-1 months after the first payment date.
- `fm-092` (procedure): To find the interest rate from two pieces of amortization information, divide the two expressions to eliminate the payment P, solve for v^n (or v^5) from the ratio, then obtain i from v = 1/(1+i).
- `fm-256` (procedure): To find the payment where principal and interest portions are equal, set the two portion formulas equal, solve for v^(n-t+1)=0.5, and take logarithms to solve for t, rounding to the nearest integer payment number.
- `fm-267` (procedure): To find the number of remaining payments when a loan is paid off early, subtract the years saved from the original term and count payments from the change point; the balance at the change point is equated to the PV of the new payments over the shortened remaining term and also to the PV of the orig…

### `Concepts/Present Value.md` — 6 question(s)

- `fm-105` (formula): The derivative with respect to (1+i) of a cash flow term C(1+i)^k is k·C(1+i)^(k−1), used to obtain the slope condition P'(i)=0.
- `fm-151` (formula): The present value of a payment F due in n years at annual effective yield i is F/(1+i)^n. — *the locator quoted text that isn't on the page:* “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value: > $$PV = FV \cdot (1+i)^{-n}$$”
- `fm-175` (fact): An equation in v^(2n) and v^n is a quadratic in u = v^n, which can be solved with the quadratic formula; the positive root with 0 < v < 1 is chosen, and then i = v^(-1) - 1 is recovered from u = v^n.
- `fm-242` (fact): A payment at time t is discounted over the time interval between the payment and the valuation date using the interest rate in effect during that interval; payments up to and including the rate-change time are valued with the earlier rate.
- `fm-293` (fact): The derivative of c(1+i)^{-n} with respect to i is -n c (1+i)^{-(n+1)}, so differentiating a present value term-by-term multiplies each term by -n and raises the discount exponent magnitude by one.
- `fm-424` (procedure): To find a corrected payment when the price is fixed, compute the price as the present value using the erroneous rate and payment, then set it equal to the present value formula at the correct rate and solve for the payment.

### **no page for Varying Interest Rates** — 5 question(s)

- `fm-078` (procedure): When the interest rate changes over time, split the deposits by rate regime: accumulate each segment's annuity to the time of the rate change using that segment's rate, then accumulate that value forward at the later rate, and add the contributions of the remaining deposits.
- `fm-080` (procedure): To value an annuity under a rate change, take the annuity-due at the initial rate for the payments before the change and add the annuity-due at the later rate for the remaining payments, discounted to time 0 using the initial rate for the years before the change.
- `fm-130` (procedure): When the interest rate changes over time, split the timeline at the rate change: accumulate the earlier payments to the change date at the first rate, then accumulate that value at the new rate for the remaining period.
- `fm-130` (procedure): Payments made after the rate change are accumulated separately as their own annuity at the new rate, and the two accumulated values are added to get the total balance.
- `fm-233` (procedure): With a changing interest rate, discount a cash flow across successive rate periods by multiplying the discount factors for each period (e.g., the full years at the first rate, then the remaining years at the second rate).
- `fm-233` (fact): A cash flow occurring before the rate changes is discounted only at the first rate, while one occurring after the change is discounted at the first rate for the initial years and at the second rate for the years beyond.
- `fm-242` (procedure): When the interest rate changes over time, split the cash flows at the rate-change time, value the later payments at that time using the later rate, then discount that value back using the earlier rate.

### `Concepts/Geometric Increasing Annuity.md` — 5 question(s)

- `fm-032` (procedure): For cash flows growing at a constant rate g discounted at rate i, rewrite the discount factor as the product v(1+g) = 1/(1+j), giving an equivalent level-payment problem at modified rate j = (i-g)/(1+g).
- `fm-083` (formula): The accumulated value at the end of n periods of a geometrically increasing annuity-immediate with first payment P is P[(1+i)^n-(1+g)^n]/(i-g).
- `fm-277` (formula): The accumulated value at time n of an annuity-immediate with first payment P, payments growing at rate g, and effective interest rate i (g ≠ i) is P·[(1+i)^n − (1+g)^n]/(i − g).
- `fm-302` (formula): The accumulated value at time n of a geometric annuity-immediate with first payment P is P[(1+i)^n - (1+g)^n]/(i - g), obtained by summing a geometric series of accumulated payments.
- `fm-443` (formula): The present value of an annuity-immediate whose payments grow geometrically at rate g, with interest rate i, over n periods is [1 - ((1+g)/(1+i))^n] / (i - g). — *the locator quoted text that isn't on the page:* “> $$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$”
- `fm-443` (procedure): For payments made monthly with annual step increases, value each year's level monthly payments as an annuity-due at the monthly rate to get one lump-sum value at the start of that year, then treat these yearly values as annual payments forming a geometric annuity at the annual effective rate.

### `Concepts/Perpetuity.md` — 4 question(s)

- `fm-008` (procedure): The value of a perpetuity immediately after a payment is the same as its value at time zero, because the remaining payments form an identical perpetuity-immediate starting one period later.
- `fm-024` (procedure): For a perpetuity with payments every k years, treat it as a sum of payments discounted by v^k, 2k, 3k,... and sum the geometric series to get payment times v^k/(1-v^k), then solve for v^k.
- `fm-117` (procedure): For payments made every n years (not every year), find the present value of the perpetuity-immediate by using the effective rate per n-year period, (1+i)^n - 1, so PV = payment / ((1+i)^n - 1) = payment * v^n/(1 - v^n).
- `fm-440` (fact): Immediately before a payment of a perpetuity-due, the remaining payments (including that one) form a new perpetuity-due identical to the original, so its price at the original rate equals the original price.

### **no page for Effective Interest Rate** — 3 question(s)

- `fm-173` (procedure): To handle payments made every k years, convert the annual effective rate i to the k-year effective rate by computing (1+i)^k - 1 and treat each k-year period as one payment period.
- `fm-208` (formula): An equivalent effective rate for a shorter period is found by raising 1+i to the fractional power of the period length (e.g., semiannual rate j = (1+i)^0.5 - 1).
- `fm-310` (formula): The effective rate over a k-year period equals (1+i)^k - 1, where i is the annual effective rate, so a perpetuity with payments every k years uses this rate per period.

### **no page for Geometric Annuity** — 3 question(s)

- `fm-121` (fact): When 1+i = (1+g)^2, the ratio (1+g)/(1+i) equals 1/(1+g), so a growing annuity with growth rate g reduces to a level annuity-due-type sum discounted at rate g.
- `fm-287` (procedure): To find the balance after payment t, take the remaining payments, whose first (payment t+1) equals the original first payment times (1+g)^t, and value them as a geometric annuity of n-t payments starting one period after time t.
- `fm-360` (fact): If each year's payments are 5% larger than the previous year's, their value at the start of each year is also 5% larger, so the annual block values form a geometric progression with ratio 1+g.

### **no page for Present Value of Cash Flows** — 3 question(s)

- `fm-056` (formula): The derivative with respect to i of a cash flow C at time distance t from the focal date, valued as C(1+i)^(-t), is -tC(1+i)^(-t-1), so a payment before the focal date (negative t) contributes with the opposite sign to a payment after it.
- `fm-360` (procedure): A block of payments within a year can be replaced by a single equivalent value at the start of that year (its present value there), reducing the stream to an annual-period cash flow series.
- `fm-389` (fact): A payment at time 0 contributes its amount to present value but contributes nothing to the derivative of present value with respect to the interest rate, since it does not depend on the rate.

### `Concepts/Compound Interest.md` — 3 question(s)

- `fm-003` (procedure): Interest earned during a single period equals the balance at the end of the previous period times the periodic rate (equivalently, the difference of consecutive accumulated values).
- `fm-014` (fact): Powers of the accumulation factor combine multiplicatively: if (1+i)^n = k, then (1+i)^{jn} = k^j.
- `fm-207` (procedure): Interest credited during a given year equals the accumulated value at the end of that year minus the accumulated value at the start of that year (the difference of the compound-interest accumulations at times n and n-1).

### `Concepts/Discount Factor.md` — 3 question(s)

- `fm-016` (fact): Powers of the discount factor combine by exponent rules, so v^(2n) = (v^n)^2, allowing known v^n to determine v^(2n).
- `fm-128` (fact): Powers of the discount factor are related by v^16 = (v^8)^2, so an equation in v^8 and v^16 becomes a quadratic in v^8 that can be solved with the quadratic formula.
- `fm-253` (fact): Since i > 0 and v = 1/(1+i), the discount factor v^n must be positive and less than 1, so any negative root of the quadratic in v^n is rejected.

### `Concepts/Immunization.md` — 3 question(s)

- `fm-103` (fact): The need for immunization does not depend on the shape or slope of the yield curve (e.g., long-term rates being lower than short-term rates does not reduce the need), since interest rate changes can still affect asset and liability values.
- `fm-147` (fact): Redington immunization and full immunization are developed under the assumption of a flat yield curve, where a single interest rate discounts all cash flows and interest rate changes move that single rate.
- `fm-339` (procedure): Solve for an unknown asset maturity by dividing the duration (time-weighted PV) equation by the PV-match equation, which cancels the unknown maturity value and yields the time offset directly.

### `Concepts/Modified Duration.md` — 3 question(s)

- `fm-389` (procedure): To find the duration of a combined or altered set of cash flows, add the present values and the present value derivatives of the components, then compute duration from the totals.
- `fm-440` (procedure): Compute the relative error of an approximation as (approximate price − actual price)/actual price, where the actual price is the exact present value at the new yield rate.
- `fm-458` (definition): Modified duration of a cash flow stream is the negative of the derivative of the present value with respect to the interest rate divided by the present value, -P'(i)/P(i). — *the locator quoted text that isn't on the page:* “> $$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$”
- `fm-458` (procedure): Given a target modified duration, set -P'(i)/P(i) equal to the target and solve for the unknown cash flow amount.
- `fm-458` (procedure): Once the unknown cash flow is found, apply it to the second investment's timing, compute its present value and -P'(i), and divide to get its modified duration.

### `Concepts/Outstanding Balance.md` — 3 question(s)

- `fm-162` (fact): A loan's outstanding balance at a later date is a cash outflow whose present value must be included in the equation of value (discounted from that date), alongside the payments, with the initial balance and new borrowings as inflows.
- `fm-288` (procedure): An extra (additional) payment made at a payment date reduces the outstanding balance dollar for dollar at that time.
- `fm-413` (procedure): When scheduled payments are missed, compute the balance by taking the accumulated value of the full payment schedule and subtracting the accumulated value of the missed payments, each accumulated at (1+i)^(t - payment time).

### `Concepts/Yield Rate.md` — 3 question(s)

- `fm-078` (procedure): To find the yield rate for a deposit annuity with a known accumulated value, set the annuity accumulation s-double-dot_{n\|j} times the deposit equal to the final fund value and solve for j numerically or by iteration, then convert j to the annual effective rate via (1+j)^(1/k) - 1.
- `fm-176` (fact): The interest rate charged by the lender on the loan (which determines balance accumulation) can differ from the lender's yield rate (used for present value of payments), when rates vary by period.
- `fm-408` (definition): The equivalent (single) annual effective interest rate for a set of payments is the constant rate i at which the present value of the payments equals their present value computed using the spot rates.

### **no page for Geometric Series** — 2 question(s)

- `fm-116` (formula): The sum of a finite geometric series with first term a, ratio r and n terms is a(1 - r^n)/(1 - r).
- `fm-121` (formula): The sum of a finite geometric series with first term 1, ratio r and n+1 terms is (1 - r^(n+1))/(1 - r).

### **no page for Increasing Perpetuity** — 2 question(s)

- `fm-174` (fact): The present value of an increasing perpetuity-immediate with payments of 1, 2, 3, ... starting one period later is v(Ia)∞, since the pattern 0 (first period), 1, 2, ... shifts by one period and is discounted by v.
- `fm-208` (procedure): Decompose a stream of payments made twice a year with annual step increases into two annual-payment perpetuities, one with payments at mid-year points and one at year-ends, each increasing annually.

### **no page for Interest Earned** — 2 question(s)

- `fm-010` (definition): Interest earned over a period equals the fund balance at the end of the period minus the balance at the start of the period (including any deposits made at the start, but excluding deposits made during the period).
- `fm-303` (definition): Interest earned over a period equals the ending fund balance minus the total deposits (principal) made during the period.

### **no page for Interest Earned in a Period** — 2 question(s)

- `fm-166` (procedure): Interest credited during a time interval equals the account balance at the end of the interval minus the balance at the start, so interest in year k is A(k) - A(k-1).
- `fm-330` (definition): The interest earned during year n on an investment of amount P is P[a(n) − a(n−1)], the difference in accumulated values at the end and start of that year.

### **no page for Quadratic Formula** — 2 question(s)

- `fm-257` (formula): The roots of a quadratic equation ax^2 + bx + c = 0 are x = (-b ± sqrt(b^2 - 4ac)) / (2a), and two distinct roots give two possible values of v.
- `fm-391` (formula): The quadratic formula gives the roots of ax^2 + bx + c = 0 as x = (-b ± sqrt(b^2 - 4ac)) / (2a).

### **no page for Solving for the Interest Rate** — 2 question(s)

- `fm-002` (procedure): A polynomial equation in a power of (1+i), such as x^2 - 5x + 4 = 0 with x = (1+i)^n, is solved by substitution and factoring; reject non-positive or non-meaningful roots (e.g., x = 1 giving i = 0, which fails the stated condition) and recover i from the valid root.
- `fm-217` (procedure): To find an unknown effective interest rate from an annuity equation that cannot be solved algebraically, solve numerically (e.g., with a financial calculator's N, PV/FV, PMT, I/Y keys or iteration).

### `Concepts/Accumulation Function.md` — 2 question(s)

- `fm-086` (procedure): For a period with changing interest (a different rate in each period), the overall accumulation factor is the product of the accumulation factors for each consecutive period.
- `fm-284` (procedure): Model a penalty of losing the last m months' interest as accumulating the original deposit at the stated rate only for the withdrawal time minus m/12 years.

### `Concepts/Cash Flow Matching.md` — 2 question(s)

- `fm-109` (procedure): Express the total cost of the portfolio as a function of one bond's face amount using the matching constraints, and minimize it by taking the bond with the lowest cost per unit of cash flow as large as feasible (non-negativity bounds the quantities).
- `fm-109` (fact): Profit is the initial deposit minus the cost of the matching portfolio.
- `fm-148` (fact): An investment can be used in an exact-matching portfolio only if its cash flows do not exceed the liability at any time. Investments with a cash flow at a time when the liability is already covered would cause over-matching.

### `Concepts/Duration.md` — 2 question(s)

- `fm-425` (fact): When present values of assets and liabilities are equal, matching durations is equivalent to matching the derivatives of the present values with respect to the interest rate, so the derivative of the net present value (liabilities minus assets) equals zero.
- `fm-460` (definition): The percentage error of an estimate E of the true value P is (E - P)/P.

### `Concepts/Full Immunization.md` — 2 question(s)

- `fm-147` (fact): Full immunization gives no guarantee under non-parallel shifts of the yield curve.
- `fm-307` (fact): Full immunization requires the present value of assets to equal the present value of liabilities and the first derivatives of these present values with respect to the interest rate to be equal (h(i)=0 and h'(i)=0), with the asset convexity exceeding the liability convexity (h''(i)>0).

### `Concepts/Geometric Increasing Perpetuity.md` — 2 question(s)

- `fm-085` (formula): A continuous perpetuity whose payment rate grows geometrically as (1+g)^s has present value 1/(δ - ln(1+g)) at its start, obtained from the integral of e^{-(δ-ln(1+g))s} over 0 to infinity (requires δ > ln(1+g)).
- `fm-424` (fact): A payment that is a given percentage less than the previous payment corresponds to a negative growth rate g (e.g., 2% less means g = -0.02, ratio 1+g = 0.98).

### `Concepts/Nominal Interest Rate.md` — 2 question(s)

- `fm-166` (procedure): When interest is credited more than once per year, the interest in a given year is the sum over its compounding periods, or equivalently the beginning-of-year balance times the year's effective growth factor minus one, (1+j)^m - 1.
- `fm-403` (procedure): To find an unknown interest rate from a given annuity accumulated value, set deposit times s_{n\|i} equal to the value and solve numerically for i, e.g., by trial using the answer options or interpolation.

### `Concepts/Redington Immunization.md` — 2 question(s)

- `fm-104` (procedure): To find unknown asset cash flows, define the net present value function P(i) as assets minus liabilities and solve P(i0)=0 and P'(i0)=0 simultaneously at the valuation interest rate.
- `fm-104` (fact): If the second derivative of the asset-minus-liability present value at the valuation rate is negative (a local maximum rather than minimum), the full immunization (Redington) conditions fail because a rate change need not leave assets exceeding liabilities.
- `fm-199` (fact): Redington immunization assumes a flat yield curve, so all maturities share the same yield rate.

### **no page for Account Balance and Cash Flows** — 1 question(s)

- `fm-379` (fact): A balance remaining immediately after a withdrawal at the end of the horizon is equivalent to an additional final cash outflow of that amount at that time, so its present value is included on the withdrawal side of the equation of value.

### **no page for Accumulated Value with Varying Interest** — 1 question(s)

- `fm-365` (procedure): When the interest rate changes over time, accumulate over each period separately (using an effective rate for one segment and the force of interest for another) and multiply the accumulation factors.

### **no page for Amortization with Rounded Payments** — 1 question(s)

- `fm-090` (procedure): Rounding a payment up to the next multiple of a given amount means taking the smallest multiple of that amount that is at least the computed payment.

### **no page for Amount of Interest Earned in a Period** — 1 question(s)

- `fm-022` (definition): The interest earned during the nth year equals the accumulated value at time n minus the accumulated value at time n-1, i.e., A(n) - A(n-1).

### **no page for Annual Effective Interest Rate** — 1 question(s)

- `fm-391` (fact): Since v = 1/(1+i), the interest rate is recovered by inverting the solved value of v^2 to get (1+i)^2, taking the square root to get 1+i, and subtracting 1.

### **no page for Annuities with Payment Period Longer than Interest Period** — 1 question(s)

- `fm-278` (procedure): The present value of level payments made every k years (e.g., at times 2, 4, ..., 10) is a geometric series in v^k, with value P(v^k + v^{2k} + ... + v^{nk}) = P·a_{nk\|}/s_{k\|}.

### **no page for Annuity Decomposition** — 1 question(s)

- `fm-446` (procedure): A payment stream with repeated payments can be split into several interleaved sub-streams (e.g. payments every two periods) and each is valued separately at the matching longer-period effective rate, then the values are summed.

### **no page for Annuity Payable More Frequently Than Interest Is Convertible** — 1 question(s)

- `fm-074` (procedure): Payments that are level within each year but step up annually can be grouped into annual blocks, each valued as a single payment at year-end (its accumulated value at the end of the year) and discounted at the effective annual rate.

### **no page for Annuity Payment Timing** — 1 question(s)

- `fm-386` (procedure): Count the number of payments from the timing of the first and last payments (last time minus first time, divided by the payment interval, plus one) and express payment times in consistent periods.

### **no page for Annuity-Immediate Accumulated Value** — 1 question(s)

- `fm-453` (formula): The total accumulation of discount over the first t coupons equals the first-period accumulation times the accumulated value annuity-immediate factor s_{t\|i}, i.e., P1 * ((1+i)^t - 1)/i.

### **no page for Asset-Liability Matching (Cash Flow Matching)** — 1 question(s)

- `fm-221` (procedure): To find the break-even reinvestment rate, set the accumulated assets (reinvested surplus plus later maturity proceeds) equal to the final liability payment and solve for the rate.

### **no page for Bond Portfolio Valuation** — 1 question(s)

- `fm-155` (fact): The total price of a portfolio of bonds at a given interest rate is the sum of the individual bond prices, and a portfolio can be treated as a single asset with its aggregate price and portfolio duration.

### **no page for Bond Pricing (Premium/Discount Formula)** — 1 question(s)

- `fm-216` (procedure): When the redemption value is unknown, set the bond price equal to the premium/discount formula with C as the unknown, with Fr and Ci both expressed as multiples of C (here face equals redemption), and solve for C.

### **no page for Bond Pricing (Prospective Book Value)** — 1 question(s)

- `fm-097` (procedure): To find the number of remaining periods of a bond from a known book value, substitute the known coupon, redemption value and yield into the prospective formula and solve for the discount factor v^(n−t), then take logarithms to get the remaining term; add the elapsed periods t to get total term n.

### **no page for Bond Yield Rate Determination** — 1 question(s)

- `fm-453` (procedure): To find the yield rate from two cumulative accumulation amounts at times t and 2t, divide the two expressions and use (1+i)^{2t}-1 = [(1+i)^t+1][(1+i)^t-1] to solve for (1+i)^t and then i.

### **no page for Cash Flow Timing** — 1 question(s)

- `fm-418` (procedure): Place each cash flow at its correct time in years: an immediate purchase at t=0, annual fees at t=1 and t=2, monthly end-of-month payments at t=k/12 for k=1,…,24, and the balance at the start of year three at t=2.

### **no page for Comparison of Interest and Discount Methods** — 1 question(s)

- `fm-247` (fact): For the same numerical rate and a multi-year term (n>1), the present value factors are ordered: simple discount < compound discount < compound interest < simple interest (i.e., (1−ni) < (1−i)^n < (1+i)^−n < (1+ni)^−1).

### **no page for Effective Annual Interest Rate** — 1 question(s)

- `fm-254` (fact): When solving a quadratic equation for the interest rate, the root consistent with the constraint i > 0 is the valid one.

### **no page for Effective Rate of Discount** — 1 question(s)

- `fm-023` (definition): The effective discount rate d equals 1 − v (equivalently i·v), the relationship used to rewrite 1 − v as d. — *the locator quoted text that isn't on the page:* “$$= 1 - v$$”

### **no page for Interest Credited at Conversion Dates** — 1 question(s)

- `fm-062` (fact): When interest is credited only at the end of each conversion period, the account value is a step function, so a threshold is first met at the next conversion date at or after the continuous-time solution, which is the next multiple of the conversion period length.

### **no page for Interest-Only Loan (Sinking Fund Method)** — 1 question(s)

- `fm-343` (procedure): To find the loan interest payment due at a given time, subtract the cost of the bond purchased at that time from the total cash outlay, then divide the interest payment by the principal to get the interest rate.

### **no page for Investment Gain** — 1 question(s)

- `fm-137` (definition): The gain on an investment is the total proceeds (maturity value plus sale price) minus the initial amount invested.

### **no page for Leveraged Investment (Borrowing to Invest)** — 1 question(s)

- `fm-094` (procedure): Compute the investor's net periodic cash flow when borrowing to invest by subtracting the interest-only loan payment from the investment income, and compute the net terminal cash flow by subtracting loan principal repayment from the investment's redemption proceeds.

### **no page for Life Annuity Income Conversion** — 1 question(s)

- `fm-035` (procedure): To find the fund needed at retirement, divide the desired periodic income by the income rate per unit of fund (e.g. income per 1000 of fund) and scale up by the unit size.

### **no page for Loan Balance** — 1 question(s)

- `fm-130` (fact): With no repayments, the loan balance equals the accumulated value of all borrowed amounts, including the final amount received at that time; the interest-free wait after year four is irrelevant to the balance at that date.

### **no page for Loan Refinancing** — 1 question(s)

- `fm-049` (procedure): When a loan is refinanced, the outstanding balance at the refinancing date becomes the principal of the new loan, which is repaid using the new rate and new term.

### **no page for Percentage Error** — 1 question(s)

- `fm-461` (definition): The percentage error of an estimate E of a true value P is (E−P)/P.

### **no page for Perpetuities** — 1 question(s)

- `fm-066` (formula): The present value of a perpetuity-immediate paying 1 every k periods (first payment at time k) at effective rate i per period is 1/((1+i)^k - 1).

### **no page for Perpetuities with Non-Level Payments** — 1 question(s)

- `fm-310` (procedure): A level-pattern perpetuity with payments that repeat in a cycle can be split into separate perpetuities, one for each position in the cycle, each with payments spaced one cycle apart.

### **no page for Present Value and Discount Factor** — 1 question(s)

- `fm-263` (fact): The discount factor satisfies v^(kn) = (v^n)^k, so powers of v can be related by exponent rules (e.g., v^18 = 0.8^3 implies v^6 = 0.8 and v^12 = 0.64).

### **no page for Reinvestment Rate (Different Interest Rates)** — 1 question(s)

- `fm-171` (fact): With level deposits at year-end and interest paid out each year, the interest credited at the end of year k equals i times the deposits made before that time, i·D(k-1), so the interest payments form an arithmetic increasing sequence beginning at the end of year 2.

### **no page for Solving for Time Using Logarithms** — 1 question(s)

- `fm-111` (procedure): To solve for an unknown number of periods in an equation involving v^n, isolate the discount factor (1+i)^(-n) and take logarithms of both sides.

### **no page for Time Measurement in Interest Problems** — 1 question(s)

- `fm-077` (procedure): Measure the time between two calendar dates in months and use the matching period rate (months with the monthly rate) when discounting a balance, e.g. Jan 1 to May 1 ten years later is 124 months.

### **no page for Time Periods and Timeline** — 1 question(s)

- `fm-003` (procedure): The last 6 months of the 8th year is the 16th semiannual period, so interest in it is earned on the balance after 15 semiannual periods.

### **no page for Timeline of Cash Flows** — 1 question(s)

- `fm-311` (procedure): Convert the timing of cash flows to years from the valuation date: a flow at the middle of month n occurs at time (n-0.5)/12 and a flow at the end of month n occurs at time n/12 when time 0 is the start of month 1.

### **no page for Timing of Payments** — 1 question(s)

- `fm-066` (fact): A payment due at the beginning of year two occurs at time 1, so a perpetuity paying every three years starting then has payments at times 1, 4, 7, ...

### **no page for Timing of Payments Within a Period** — 1 question(s)

- `fm-162` (definition): Beginning of month k is time k-1 months, and the middle of month k is time k-0.5 months, measured from the start of month 1.

### `Concepts/Accumulated Value.md` — 1 question(s)

- `fm-312` (procedure): The balance of an account at a given time with multiple deposits equals the sum of each deposit multiplied by its accumulation factor from its deposit time to that time. — *the locator quoted text that isn't on the page:* “each cash flow is carried forward by its own accumulation factor: > $$AV = \sum_k C_{t_k} \cdot \frac{a(t)}{a(t_k)}$$”

### `Concepts/Amortization Schedule.md` — 1 question(s)

- `fm-246` (procedure): Divide the expressions for two principal or balance quantities to cancel R and solve for v^k, then obtain v and the effective interest rate i = 1/v - 1.

### `Concepts/Arithmetic Increasing Annuity.md` — 1 question(s)

- `fm-244` (procedure): To find an unknown payment increment, set the present value formula for the increasing annuity equal to the given price and solve for the increment.

### `Concepts/Book Value.md` — 1 question(s)

- `fm-437` (formula): The book value of a discount bond just after coupon t equals the purchase price plus the accumulated discount, which is the first-period discount amount times the accumulation annuity-immediate factor s_{t\|i}.

### `Concepts/Callable Bond.md` — 1 question(s)

- `fm-136` (definition): A bond callable at par on any of the last k coupon dates can be redeemed at times n-k+1 through n, so the earliest call date is n-k+1.

### `Concepts/Decreasing Annuity.md` — 1 question(s)

- `fm-005` (fact): When a loan or fund earning interest is reduced by a level principal amount each period, the interest paid each period forms an arithmetic decreasing sequence, falling by the interest rate times the principal reduction each period.

### `Concepts/Effective Rate.md` — 1 question(s)

- `fm-022` (formula): With a deposit P at time 0 and annual effective rate i, the interest earned in year n equals P(1+i)^(n-1) * i.
- `fm-022` (procedure): To find an unknown effective rate from two equations that share the same unknown quantity, divide one equation by the other to eliminate the common amount, then solve for (1+i) by taking a root and subtract 1 to obtain i.

### `Concepts/Forward Rate.md` — 1 question(s)

- `fm-039` (procedure): To fund a liability at time 3 using a bond maturing at time 2, the proceeds at time 2 are reinvested at the forward rate for one year, so the needed amount at time 2 is the liability divided by (1 + forward rate).

### `Concepts/Level Payment Annuity.md` — 1 question(s)

- `fm-002` (procedure): Payments made every k years can be treated as an annuity whose effective rate per k-year period is (1+i)^k - 1, so the accumulated value equals the payment times s_angle(n)/a_angle(k) evaluated at the annual rate i (for payments at the start of each k-year period).

### `Concepts/Payable m-thly.md` — 1 question(s)

- `fm-278` (definition): The accumulated value at the end of one year of payments of 1/m made m times per year (an m-thly annuity-immediate) is the symbol s_{1\|}^{(m)}, which equals ((1+i)-1)/i^{(m)}.
- `fm-278` (procedure): The present value of an m-thly annuity-immediate of 1 per year for n years equals the one-year accumulated value of the m-thly payments (s_{1\|}^{(m)}) times the annual annuity-immediate a_{n\|}, since each year's payments can be replaced by an equivalent lump sum at year end.

### `Concepts/Reinvestment Risk.md` — 1 question(s)

- `fm-221` (procedure): In cash-flow matching with reinvestment risk, the surplus from an asset maturing before a liability payment (maturity proceeds minus the payment due) is reinvested at the reinvestment rate until the next liability date.

### `Concepts/Reinvestment of Coupons.md` — 1 question(s)

- `fm-137` (procedure): When proceeds from a maturing bond are reinvested at a new yield rate, accumulate them at the new rate for the new term, chaining accumulation periods at different rates.

### `Concepts/Spot Rate.md` — 1 question(s)

- `fm-371` (formula): The price of a zero-coupon bond with face amount F and term t is F(1+s_t)^(-t), where s_t is the spot rate (yield rate) for term t.
- `fm-371` (procedure): To determine the yield curve shape from zero-coupon bond prices, solve for the implied spot rate at each term as s_t = (F/P)^(1/t) - 1 and compare the rates across terms.

### `Concepts/Time Value of Money.md` — 1 question(s)

- `fm-075` (fact): Delaying deposits reduces their accumulated value at a fixed future date, so the largest n meeting the accumulation requirement is the floor of the solved n.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `fm-002` | Geometric Progression |
| `fm-004` | Deferred Annuity, Discount Factor, Level Perpetuity |
| `fm-006` | Annuity Immediate |
| `fm-007` | Annuity Immediate |
| `fm-008` | Discount Factor, Equation of Value |
| `fm-009` | Equation of Value |
| `fm-015` | Nominal Interest Rate Convertible m-thly |
| `fm-016` | Discount Factor |
| `fm-017` | Equation of Value |
| `fm-018` | Annuity Immediate |
| `fm-019` | Equation of Value |
| `fm-021` | Compound Interest, Nominal Interest Rate |
| `fm-023` | Annuity Immediate |
| `fm-024` | Discount Factor, Payment Period |
| `fm-025` | Annuity Immediate |
| `fm-027` | Economic Value |
| `fm-031` | Effective Discount Rate, Increasing Annuity, Level Perpetuity |
| `fm-033` | Level Payment Annuity |
| `fm-034` | Annuity Immediate, Effective Rate |
| `fm-035` | Equation of Value |
| `fm-041` | Nominal Interest Rate Convertible m-thly |
| `fm-043` | Nominal Interest Rate |
| `fm-044` | Annuity Immediate |
| `fm-045` | Loan Amortization |
| `fm-047` | Annuity Immediate |
| `fm-049` | Annuity Immediate, Nominal Interest Rate |
| `fm-050` | Increasing Annuity |
| `fm-053` | Annuity Due |
| `fm-056` | Equation of Value |
| `fm-058` | Present Value |
| `fm-059` | Annuity Immediate |
| `fm-060` | Refinancing |
| `fm-061` | Annuity Immediate |
| `fm-063` | Equation of Value |
| `fm-064` | Annuity Immediate, Decreasing Annuity |
| `fm-065` | Effective Rate |
| `fm-066` | Equation of Value |
| `fm-067` | Arithmetic Increasing Annuity, Level Annuity |
| `fm-068` | Annuity Immediate |
| `fm-069` | Nominal Interest Rate |
| `fm-071` | Annuity Immediate, Nominal Interest Rate |
| `fm-074` | Nominal Interest Rate Convertible m-thly |
| `fm-078` | Payment Period, Rate of Return |
| `fm-079` | Deferred Annuity, Effective Rate, Equation of Value |
| `fm-080` | Equation of Value, Geometric Increasing Perpetuity |
| `fm-081` | Arithmetic Increasing Annuity, Increasing Annuity |
| `fm-082` | Loan Amortization |
| `fm-083` | Annuity Due, Equation of Value |
| `fm-084` | Effective Rate |
| `fm-086` | Variable Force of Interest |
| `fm-087` | Annuity Immediate, Term of Annuity |
| `fm-088` | Term of Annuity |
| `fm-089` | Annuity Immediate, Mortgage Loan, Nominal Interest Rate |
| `fm-091` | Equation of Value |
| `fm-092` | Annuity Immediate |
| `fm-093` | Annuity Immediate, Nominal Interest Rate |
| `fm-094` | Effective Rate, Nominal Interest Rate, Rate of Return |
| `fm-096` | Geometric Increasing Annuity, Nominal Interest Rate |
| `fm-102` | Increasing Annuity |
| `fm-106` | Present Value |
| `fm-109` | Compound Interest |
| `fm-111` | Geometric Increasing Perpetuity, Interest Rate |
| `fm-113` | Effective Discount Rate |
| `fm-114` | Equation of Value, Payment Period |
| `fm-118` | Nominal Interest Rate Convertible m-thly |
| `fm-119` | Effective Rate |
| `fm-121` | Geometric Increasing Perpetuity, Perpetuity |
| `fm-122` | Annuity Due, Geometric Increasing Perpetuity |
| `fm-123` | Geometric Increasing Perpetuity, Level Payment Annuity |
| `fm-124` | Capital Budgeting |
| `fm-126` | Annuity Immediate, Deferred Annuity |
| `fm-127` | Annuity Immediate |
| `fm-128` | Annuity Immediate |
| `fm-129` | Mortgage Loan |
| `fm-130` | Annuity Immediate, Nominal Interest Rate |
| `fm-132` | Annuity Immediate |
| `fm-134` | Annuity Immediate |
| `fm-138` | Annuity Immediate |
| `fm-139` | Effective Rate |
| `fm-141` | Annuity Immediate |
| `fm-143` | Internal Rate of Return, Outstanding Balance |
| `fm-144` | Increasing Annuity |
| `fm-149` | Present Value |
| `fm-158` | Annuity Immediate |
| `fm-160` | Discount Factor, Level Annuity |
| `fm-162` | Equation of Value, Present Value |
| `fm-163` | Annuity Immediate |
| `fm-164` | Effective Rate |
| `fm-165` | Arithmetic Increasing Annuity, Deferred Annuity |
| `fm-167` | Annuity Immediate |
| `fm-168` | Annuity Immediate, Deferred Annuity, Equation of Value |
| `fm-169` | Annuity Immediate, Effective Rate |
| `fm-170` | Loan Amortization |
| `fm-171` | Equation of Value, Increasing Annuity |
| `fm-172` | Equation of Value, Nominal Interest Rate Convertible m-thly |
| `fm-175` | Equation of Value |
| `fm-176` | Yield Rate |
| `fm-177` | Annuity Immediate |
| `fm-178` | Increasing Annuity |
| `fm-179` | Equation of Value |
| `fm-182` | Equation of Value, Nominal Interest Rate Convertible m-thly |
| `fm-183` | Arithmetic Increasing Annuity |
| `fm-184` | Present Value |
| `fm-186` | Payment Period |
| `fm-187` | Level Payment Annuity |
| `fm-188` | Term of Bond |
| `fm-189` | Annuity Immediate, Nominal Interest Rate Convertible m-thly |
| `fm-190` | Nominal Interest Rate |
| `fm-191` | Annuity Immediate, Deferred Annuity, Nominal Interest Rate, Time Value of Money |
| `fm-195` | Increasing Annuity |
| `fm-196` | Annuity Immediate, Nominal Interest Rate Convertible m-thly |
| `fm-197` | Asset-Liability Management, Present Value |
| `fm-198` | Annuity Immediate |
| `fm-201` | Geometric Increasing Perpetuity |
| `fm-203` | Annuity Immediate |
| `fm-205` | Present Value |
| `fm-206` | Annuity Immediate, Number of Periods |
| `fm-209` | Increasing Annuity |
| `fm-210` | Loan Amortization |
| `fm-211` | Accumulated Value, Equation of Value, Nominal Interest Rate |
| `fm-212` | Annuity Immediate |
| `fm-213` | Nominal Interest Rate Convertible m-thly |
| `fm-214` | Equation of Value |
| `fm-215` | Annuity Immediate, Equation of Value |
| `fm-216` | Annuity Immediate |
| `fm-217` | Annuity Due, Increasing Annuity |
| `fm-218` | Annuity Immediate |
| `fm-224` | Spot Rates and Forward Rates |
| `fm-226` | Annuity Immediate |
| `fm-230` | Rate of Return |
| `fm-232` | Annuity Immediate |
| `fm-233` | Equation of Value, Time Value of Money |
| `fm-235` | Annuity Immediate |
| `fm-236` | Geometric Increasing Perpetuity |
| `fm-237` | Equation of Value |
| `fm-238` | Payment Period |
| `fm-239` | Annuity Immediate |
| `fm-241` | Equation of Value, Reinvestment of Coupons |
| `fm-243` | Refinancing |
| `fm-254` | Equation of Value |
| `fm-255` | Compound Interest |
| `fm-256` | Discount Factor |
| `fm-258` | Annuity Immediate |
| `fm-259` | Equation of Value |
| `fm-261` | Equation of Value |
| `fm-263` | Annuity Immediate |
| `fm-264` | Annuity Immediate, Effective Rate |
| `fm-265` | Effective Discount Rate |
| `fm-266` | Discount Factor |
| `fm-267` | Annuity Immediate |
| `fm-269` | Nominal Interest Rate |
| `fm-270` | Level Payment Annuity |
| `fm-271` | Annuity Immediate, Effective Rate |
| `fm-272` | Annuity Immediate |
| `fm-273` | Nominal Interest Rate |
| `fm-275` | Present Value |
| `fm-276` | Increasing Annuity, Perpetuity |
| `fm-278` | Equation of Value |
| `fm-280` | Increasing Annuity |
| `fm-281` | Nominal Interest Rate Convertible m-thly |
| `fm-282` | Internal Rate of Return |
| `fm-283` | Rate of Return |
| `fm-285` | Time Value of Money |
| `fm-286` | Payment Period |
| `fm-287` | Geometric Increasing Annuity, Nominal Interest Rate Convertible m-thly |
| `fm-288` | Annuity Immediate |
| `fm-290` | Nominal Interest Rate Convertible m-thly |
| `fm-291` | Internal Rate of Return |
| `fm-292` | Annuity Immediate, Nominal Interest Rate Convertible m-thly |
| `fm-296` | Annuity Immediate |
| `fm-297` | Annuity Immediate |
| `fm-298` | Geometric Increasing Perpetuity |
| `fm-301` | Effective Rate |
| `fm-302` | Geometric Progression |
| `fm-304` | Discount Factor |
| `fm-305` | Annuity Immediate |
| `fm-306` | Present Value |
| `fm-307` | Present Value |
| `fm-309` | Effective Rate, Equation of Value |
| `fm-313` | Geometric Increasing Perpetuity, Level Perpetuity |
| `fm-314` | Equation of Value, Nominal Interest Rate, Time Value of Money |
| `fm-317` | Annuity Immediate |
| `fm-319` | Annuity Contract, Annuity Immediate, Number of Periods |
| `fm-321` | Effective Discount Rate, Nominal Discount Rate |
| `fm-327` | Nominal Interest Rate Convertible m-thly |
| `fm-328` | Equation of Value |
| `fm-332` | Equation of Value |
| `fm-334` | Equation of Value, Level Annuity |
| `fm-337` | Annuity Immediate |
| `fm-340` | Nominal Interest Rate |
| `fm-342` | Equation of Value |
| `fm-346` | Nominal Interest Rate |
| `fm-348` | Equation of Value |
| `fm-349` | Variable Force of Interest |
| `fm-351` | Annuity Immediate |
| `fm-352` | Annuity Immediate, Term of Bond |
| `fm-354` | Arithmetic Increasing Annuity, Term of Bond |
| `fm-355` | Time Value of Money Equations |
| `fm-356` | Equation of Value, Variable Force of Interest |
| `fm-358` | Effective Discount Rate |
| `fm-359` | Payment Period |
| `fm-361` | Annuity Immediate, Equation of Value |
| `fm-364` | Payment Amount |
| `fm-365` | Accumulated Value, Compound Interest |
| `fm-366` | Time Value of Money |
| `fm-368` | Payment Amount |
| `fm-372` | Annuity Immediate |
| `fm-373` | Annuity Immediate |
| `fm-374` | Annuity Immediate |
| `fm-376` | Term of Bond |
| `fm-377` | Annuity Immediate, Term of Annuity |
| `fm-380` | Annuity Immediate |
| `fm-382` | 1st-Order Macaulay Approximation |
| `fm-385` | Annuity Immediate, Nominal Interest Rate |
| `fm-387` | Geometric Progression |
| `fm-390` | Present Value |
| `fm-393` | Geometric Increasing Perpetuity |
| `fm-396` | Payment Period |
| `fm-399` | Annuity Immediate |
| `fm-405` | Nominal Interest Rate Convertible m-thly |
| `fm-407` | Annuity Immediate |
| `fm-410` | Interest Rate |
| `fm-412` | Annuity Immediate |
| `fm-413` | Annuity Immediate |
| `fm-415` | Nominal Interest Rate Convertible m-thly |
| `fm-416` | Annuity Immediate |
| `fm-419` | Annuity Immediate, Coupon, Nominal Interest Rate Convertible m-thly |
| `fm-420` | Geometric Increasing Perpetuity |
| `fm-423` | Term of Bond |
| `fm-427` | Annuity Immediate |
| `fm-428` | Geometric Increasing Perpetuity, Time Value of Money |
| `fm-429` | Bond Price |
| `fm-430` | Annuity Immediate, Term of Bond |
| `fm-431` | Effective Rate |
| `fm-434` | Deferred Annuity |
| `fm-435` | Nominal Interest Rate Convertible m-thly |
| `fm-437` | Annuity Immediate |
| `fm-438` | Effective Discount Rate |
| `fm-439` | Level Payment Annuity |
| `fm-440` | 1st-Order Macaulay Approximation |
| `fm-442` | Variable Force of Interest |
| `fm-447` | Effective Discount Rate, Increasing Annuity |
| `fm-448` | Term of Bond |
| `fm-449` | Annuity Immediate, Deferred Annuity |
| `fm-451` | Geometric Progression, Increasing Annuity |
| `fm-452` | Internal Rate of Return |
| `fm-455` | Nominal Interest Rate Convertible m-thly, Term of Bond |
| `fm-456` | Annuity Immediate, Bond Price, Number of Periods |
| `fm-459` | 1st-Order Macaulay Approximation, Increasing Annuity |
| `fm-462` | Annuity Immediate |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Yield Rate | 17 | To find the yield of a bond whose price was computed from spot rates, set the p…; Solve for an unknown periodic interest rate from a given annuity accumulated va…; To find an unknown periodic interest rate from a known annuity value a_{n\|j}, … |
| Geometric Increasing Perpetuity | 12 | The present value of a perpetuity with a payment pattern that changes over time…; A deferred cash flow stream is valued by computing its present value as of the …; When the interest rate changes over time, value a perpetuity by splitting it at… |
| Cash Flow Matching | 10 | To match a liability with a zero-coupon bond, choose the bond amount so its mat…; The total purchase cost of the matching portfolio is the sum of the prices of t…; A bond selling at par with coupon rate c pays coupons of c times face at each p… |
| Fund Accumulation | 7 | When interest earned on an investment is reinvested at a different rate, comput…; When deposits earn interest at rate i but the interest is reinvested at a diffe…; When principal earns one rate but the interest is reinvested at a different rat… |
| Loan Amortization | 7 | For payments whose pattern changes partway, split the payment stream into segme…; Value a payment stream with a level portion followed by an arithmetically decre…; When the interest rate changes over time, split the payments into periods by ra… |
| Term of Loan | 6 | To find the number of level payments n, solve payment × a_n = loan balance for …; To find the number of payments n when the loan amount, payment and rate are kno…; To find the number of payments made or remaining, set the balance equal to the … |
| Interest Rate | 5 | To evaluate a balance from v^n, recover i from v^n = (1+i)^{-n} by taking the n…; The annual yield (annual effective rate of return) of an investment is the cons…; With compound interest at annual effective rate i, an amount invested at time 0… |
| Redington Immunization | 5 | To find the amounts invested in two zero-coupon bonds that match a target prese…; To immunize or match a liability by duration matching, choose asset amounts so …; After matching PV and duration, verify the convexity condition by comparing ass… |
| Reinvestment of Coupons | 5 | When coupons are reinvested at a different rate, the investor's overall yield i…; The lender's annual effective yield over the term is the rate i solving (amount…; To find the annual effective yield, set the initial investment times (1+j)^n eq… |
| Duration Matching | 4 | The Macaulay duration of a portfolio of bonds is the price-weighted (present-va…; To match duration in immunization (Redington), choose asset amounts so the asse…; For a portfolio of bonds, compute the portfolio Macaulay duration by weighting … |
| Effective Discount Rate | 4 | To convert an effective rate over one period to an effective rate over a longer…; Time in days is converted to years by dividing by the number of days in the yea…; A discount of d% on a price means the buyer pays (1 - d) times the price, so th… |
| Effective Rate | 4 | The equivalent effective monthly rate for an annual effective rate i is j = (1+…; The equivalent effective monthly rate j is obtained from an annual effective ra…; Convert an annual effective yield rate i to an effective rate per semiannual pe… |
| Arithmetic Increasing Annuity | 3 | A payment stream that increases by a constant amount each period, starting at t…; Present value is linear: the present value of a stream that is a multiple of a …; An annuity with payments X, 2X, ..., nX has present value X times the present v… |
| Asset-Liability Portfolio | 3 | A zero-coupon bond pays a single face amount at maturity with no intermediate c…; The price of a zero-coupon bond with face F maturing in t years at annual effec…; A zero-coupon bond pays a single lump sum at maturity, so the amount invested t… |
| Internal Rate of Return | 3 | When cash flows occur only at times 0, 2, and 4, the yield equation is a quadra…; Solving for the interest rate from an equation in v that reduces to a quadratic…; A quadratic equation a·x^2 + b·x + c = 0 in v is solved by the quadratic formul… |
| Nominal Interest Rate | 3 | An annual nominal yield rate convertible semiannually corresponds to an effecti…; Convert a nominal annual rate convertible m times per year to the effective rat…; A nominal annual interest rate convertible monthly equals 12 times the effectiv… |
| Term of Annuity | 3 | The smaller final payment is found by the equation of value: fund value at the …; Find the drop payment by setting the present value of the level payments plus t…; A fund that is the same before the first withdrawal and after the last withdraw… |
| Balloon Payment | 2 | To find a final balloon payment, solve for the number of full level payments th…; To find the number of level payments for a loan, solve loan amount = payment ti… |
| Deferred Annuity | 2 | A perpetuity whose first payment is at time n is valued as a perpetuity-immedia…; Place the payments on the timeline by their payment number: with the first paym… |
| Annuities | 1 | To value an annuity-immediate formula result at an earlier or later date, accum… |
| Annuity Contract | 1 | When the redemption value is defined as a multiple of the bond's own price, exp… |
| Bond Amortization | 1 | The book value of a bond immediately after a coupon payment is the present valu… |
| Bond Price | 1 | The effective yield rate per coupon period equals the nominal annual yield conv… |
| Capital Budgeting | 1 | Compare two projects by taking the difference of their cash flows and discounti… |
| Coupon | 1 | A bond's periodic coupon equals the coupon rate times the par (face) value, wit… |
| Economic Value | 1 | The reinvestment rate and the NPV discount rate can differ; reinvestment rate i… |
| Full Immunization | 1 | Convert the present value of a zero-coupon bond back to its maturity value by a… |
| Geometric Increasing Annuity | 1 | The present value of an n-year geometrically increasing annuity-immediate with … |
| Increasing Annuity | 1 | Total accumulated value equals the total principal deposited plus the accumulat… |
| Level Payment Annuity | 1 | To find the first payment of a perpetuity from its price, set the price equal t… |
| Payment Period | 1 | Choose the time unit to match the compounding period (e.g., quarters for quarte… |
| Perpetuity | 1 | A fund's accumulated value can be used as the price (present value) of a perpet… |
| Principal | 1 | The interest portion of a loan payment equals the interest rate times the outst… |
| Rate of Return | 1 | When an investment has multiple contributions, the yield is found by writing th… |
| Refinancing | 1 | The total number of payments equals the payments made before refinancing plus t… |
| Simple Interest | 1 | Convert time periods quoted in months to years (months/12) so they match an ann… |
| Spot Rates and Forward Rates | 1 | The present value of a series of payments under spot rates is the sum of each p… |
| Time Value of Money | 1 | To compare two investments with different payment structures, compute the total… |
| Time Value of Money Equations | 1 | Solve for an unknown time by taking logarithms of (1+i)^(-n) = x, giving n = -l… |

## Every question

<details><summary><code>fm-001</code> · answerable</summary>

Tagged pages: Force of Interest, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate i^(m) convertible m times per year credits interest at i^(m)/m per period, so the accumulated value after on… | definition | linked | Convertible m-thly: “A [[Nominal Interest Rate]] is **convertible $m$-thly** (or compounded $m$ times per year) when int…” |
| With a constant force of interest delta, the accumulation factor over t years is e^(delta*t), so one year grows by a factor of e^delta. | formula | tagged | Force of Interest: “$$a(t) = e^{\delta t}$$” |
| Two interest measures are equivalent if they give the same accumulated value over the same period; equivalent rates therefore give equal on… | fact | tagged | Effective Rate: “It is the rate that, applied once per period, produces the same accumulation as an equivalent [[Nom…” |
| To convert from a nominal rate convertible m times per year to a force of interest, set e^delta = (1 + i^(m)/m)^m and solve delta = m*ln(1 … | procedure | tagged | Force of Interest: “$$\delta = \ln(1+i)$$” |

</details>

<details><summary><code>fm-002</code> · gap</summary>

Tagged pages: Annuities, Level Annuity, Accumulated Value, Annuity Due, Annuity Immediate, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the accumulated value of level deposits made at the start of each k-year period, accumulate each deposit at the effective rate for … | procedure | missing |  |
| The sum of a finite geometric series with first term a, common ratio r and n terms is a(1 - r^n)/(1 - r). | formula | elsewhere | Geometric Progression: “$$\text{PV} = \frac{1}{1+i} \cdot \frac{1-\left(\frac{1+g}{1+i}\right)^n}{1 - \frac{1+g}{1+i}}$$” |
| The accumulated value at time n of an annuity-immediate of 1 per period is s_angle(n) = ((1+i)^n - 1)/i. | formula | tagged | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| Payments made every k years can be treated as an annuity whose effective rate per k-year period is (1+i)^k - 1, so the accumulated value eq… | procedure | missing |  |
| A polynomial equation in a power of (1+i), such as x^2 - 5x + 4 = 0 with x = (1+i)^n, is solved by substitution and factoring; reject non-p… | procedure | missing |  |

</details>

<details><summary><code>fm-003</code> · gap</summary>

Tagged pages: Simple vs Compound Interest, Simple Interest, Compound Interest, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| An annual nominal rate i compounded m times per year credits interest of i/m per period, so the effective rate per period is i/m. | definition | linked | Convertible m-thly: “when interest is credited $m$ times per year at the periodic rate $i^{(m)}/m$” |
| With compound interest, the accumulated value after n periods is the principal times (1 + j)^n, where j is the periodic effective rate. | formula | tagged | Compound Interest: “$$A(t) = P(1+i)^t$$” |
| Interest earned during a single period equals the balance at the end of the previous period times the periodic rate (equivalently, the diff… | procedure | missing |  |
| With simple interest at annual rate i, interest earned each period is the original principal times the rate for that period, so it is const… | formula | tagged | Simple vs Compound Interest: “Simple interest adds a constant **amount** each period” |
| The last 6 months of the 8th year is the 16th semiannual period, so interest in it is earned on the balance after 15 semiannual periods. | procedure | missing |  |

</details>

<details><summary><code>fm-004</code> · untagged</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Perpetuity, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an increasing annuity-immediate with payments 1, 2, ..., n at the ends of years 1 through n is (Ia)_{n\|} = (ä_{n\|} −… | formula | tagged | Arithmetic Increasing Annuity: “An **arithmetic increasing annuity** has payments $1, 2, 3, \ldots, n$ at the end of periods $1, 2,…” |
| For a payment stream that starts at the end of year 2 and increases by 1 each year, value it as an increasing annuity whose first payment i… | procedure | elsewhere | Deferred Annuity: “{}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}” |
| The present value of a level perpetuity-immediate of amount P is P/i, and if it begins after a deferral period, discount it by v for each y… | formula | elsewhere | Level Perpetuity: “The present value of a perpetuity-immediate (payments at end of period) paying $1$ per period at ra…” |
| The present value of an n-year annuity-immediate of 1 is a_{n\|} = (1 − v^n)/i, and ä_{n\|} = (1 + i)·a_{n\|} = a_{n\|}/v, so v·ä_{n\|} = a… | formula | linked | Annuities: “a_{\overline{n}\\|} = \frac{1-v^n}{i}” |
| The discount factor is v = 1/(1+i), so v^n = (1+i)^(−n), and solving for an unknown n in v^n = c uses logarithms: n = −ln(c)/ln(1+i). | definition | elsewhere | Discount Factor: “- The $n$-period discount factor is $v^n = (1+i)^{-n}$.” |

</details>

<details><summary><code>fm-005</code> · gap</summary>

Tagged pages: Decreasing Annuity, Fund Accumulation, Accumulated Value, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| When a loan or fund earning interest is reduced by a level principal amount each period, the interest paid each period forms an arithmetic … | fact | missing |  |
| The accumulated value at the end of n periods of payments of n, n-1, ..., 1 at the ends of periods 1 through n is (Ds)_{n\|i} = (n(1+i)^n -… | formula | tagged | Decreasing Annuity: “$$(Da)_{\overline{n}\\|} = \frac{n - a_{\overline{n}\\|}}{i}$$” |
| The accumulated value of level end-of-period payments is s_{n\|i} = ((1+i)^n - 1)/i. | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| Split a payment stream into a level component and a decreasing arithmetic component, value each separately at the reinvestment rate, and ad… | procedure | tagged | Decreasing Annuity: “$$PV = P \cdot a_{\overline{n}\\|} - \frac{Q}{i}\!\left(a_{\overline{n}\\|} - nv^n\right)$$” |
| Payments reinvested in a second fund accumulate at that fund's own interest rate, which can differ from the rate earned in the original fun… | fact | tagged | Fund Accumulation: “A common Exam FM scenario: amounts withdrawn from one fund are immediately deposited into and accum…” |

</details>

<details><summary><code>fm-006</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| In a level-interest loan with annual payments, the interest due each year equals the effective rate times the outstanding balance at the st… | fact | tagged | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |
| The principal repaid in a period equals the payment minus the interest due, so the outstanding balance after the payment equals the prior b… | procedure | tagged | Loan Amortization: “$$PR_k = K_k - I_k = B_{k-1} - B_k$$” |
| When each payment is a fixed multiple m of the interest due, the balance is reduced by the factor (1 - (m-1)i) each period, so the balance … | procedure | missing |  |
| The outstanding loan balance at any time equals the present value of the remaining payments at the loan's interest rate (prospective method… | fact | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| The present value of a level annuity-immediate of 1 per period for n periods is a_angle(n) = (1 - v^n)/i. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |

</details>

<details><summary><code>fm-007</code> · untagged</summary>

Tagged pages: Bond Amortization, Amortization of Premium, Bonds, Book Value, Interest, Premium, Face Value, Coupon, Coupon Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The book value (amortized value) of a bond at a given time is the present value of its remaining payments (coupons and redemption) at the p… | definition | tagged | Book Value: “It equals the present value of all remaining cash flows (coupons and redemption) discounted at $j$,…” |
| The present value of a level annuity-immediate of n payments at effective rate i is a_angle_n = (1 - v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The coupon of a bond equals the coupon rate times the face (par) value, and the redemption value is the par value unless otherwise stated. | formula | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| The interest portion of a bond coupon payment at time t equals the yield rate times the book value at time t-1 (the beginning of the period… | fact | tagged | Bond Amortization: “$$I_t = j\,B_{t-1}$$” |
| To find the interest in the k-th coupon of an n-year bond, compute the book value at time k-1 as the PV of the remaining n-k+1 coupons and … | procedure | tagged | Bond Amortization: “One row can be found without the rest of the table: value $B_{t-1}$ at the original yield from the …” |

</details>

<details><summary><code>fm-008</code> · gap</summary>

Tagged pages: Geometric Increasing Annuity, Perpetuity, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-immediate paying a level amount R per period at effective rate i per period is R/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The value of a perpetuity immediately after a payment is the same as its value at time zero, because the remaining payments form an identic… | procedure | missing |  |
| Two cash flow streams are exchanged at equal value by setting the present value of the new annuity at the exchange date equal to the value … | procedure | elsewhere | Equation of Value: “$$\text{Value}_{t_0}(\text{inflows}) = \text{Value}_{t_0}(\text{outflows})$$” |
| A geometrically increasing annuity-immediate has first payment X at the end of year one and each later payment is (1+k) times the preceding… | definition | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |
| When the payment growth rate k equals the interest rate i, each discounted payment in a geometric annuity equals Xv, so the present value o… | fact | tagged | Geometric Increasing Annuity: “When $i = g$, $\text{PV} = n \cdot v = n/(1+i)$.” |
| The discount factor is v = 1/(1+i), so (1+i)v = 1. | definition | elsewhere | Discount Factor: “$$v = \frac{1}{1+i}$$” |

</details>

<details><summary><code>fm-009</code> · untagged</summary>

Tagged pages: Nominal Discount Rate, Nominal Discount Rate Convertible m-thly, Discount Rate, Effective Discount Rate, Convertible m-thly, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal discount rate d^(m) compounded m times per year corresponds to an effective discount rate of d^(m)/m per period, and the accumula… | definition | tagged | Nominal Discount Rate: “$$a(t) = \left(1 - \frac{d^{(m)}}{m}\right)^{-mt}$$” |
| A nominal interest rate i^(m) compounded m times per year corresponds to an effective rate of i^(m)/m per period, and the accumulation fact… | definition | tagged | Convertible m-thly: “$$1 + i = \left(1 + \frac{i^{(m)}}{m}\right)^m$$” |
| To solve for an unknown rate, write an equation of value at a chosen comparison date by accumulating each deposit with the rate in force ov… | procedure | elsewhere | Equation of Value: “Every cash flow must be moved to the same comparison date before comparing, each at the [[Interest …” |

</details>

<details><summary><code>fm-010</code> · gap</summary>

Tagged pages: Force of Interest, Accumulation Function, Variable Force of Interest, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation function from time 0 under a force of interest delta_t is a(t) = exp(integral from 0 to t of delta_s ds). | formula | tagged | Force of Interest: “$$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$” |
| The accumulated value at time t2 of an amount invested at time t1 is the amount times a(t2)/a(t1), which equals exp of the integral of the … | formula | tagged | Variable Force of Interest: “$$\frac{a(t)}{a(s)} = \exp\!\left(\int_s^t \delta(u)\,du\right)$$” |
| Interest earned over a period equals the fund balance at the end of the period minus the balance at the start of the period (including any … | definition | missing |  |
| To find an unknown deposit, set up an equation of value in which the interest earned over a period, computed as the opening balance (prior … | procedure | missing |  |

</details>

<details><summary><code>fm-011</code> · answerable</summary>

Tagged pages: Geometric Increasing Perpetuity, Geometric Increasing Annuity, Perpetuity, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity with a payment pattern that changes over time is found by splitting it into pieces (a level annuity-immed… | procedure | tagged | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| The present value of a level annuity-immediate of n payments is a_angle_n = (1 - v^n)/i, where v = 1/(1+i). | formula | tagged | Perpetuity: “letting $n \to \infty$ in $a_{\overline{n}\\|} = (1-v^n)/i$” |
| A deferred cash flow stream is valued by computing its present value as of the end of the deferral period and then discounting that value b… | procedure | tagged | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| A perpetuity-immediate whose payments grow geometrically at rate k has present value P/(i - k), valid for k < i, where P is the first payme… | formula | tagged | Geometric Increasing Perpetuity: “For a first payment $P$, multiply by $P$.” |
| If a payment is K% larger than the preceding payment, it equals the preceding payment multiplied by (1 + K/100), so payments form a geometr… | fact | tagged | Geometric Progression: “a **geometric progression** refers to a sequence of payments where each payment is a constant multi…” |

</details>

<details><summary><code>fm-012</code> · answerable</summary>

Tagged pages: Loan Repayment Comparison, Loans, Amortization, Interest Rate, Equation of Value, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment P on a loan of amount L repaid over n years at effective annual rate i satisfies L = P * a_{n\|i}, where a_{n\|i} = (1 - … | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| Total interest paid over the life of a loan equals the total of all payments minus the original loan amount (total principal repaid equals … | fact | tagged | Loan Repayment Comparison: “$$\text{Total interest (level)} = n\,P_{\text{level}} - L$$” |
| For a loan repaid with fixed principal installments plus interest on the unpaid balance (installment/straight-line method), the interest ea… | procedure | tagged | Loan Repayment Comparison: “Under constant-principal repayment, the principal portion each period is $L/n$, and interest is cha…” |
| Total interest on a loan equals i times the sum of the outstanding balances at the beginning of each period, which for fixed principal inst… | fact | tagged | Loan Repayment Comparison: “summing the interest over all $n$ periods gives $iL\frac{n+1}{2}$.” |

</details>

<details><summary><code>fm-013</code> · answerable</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Geometric Progression, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate compounded monthly, i^(12), gives an effective monthly rate of i^(12)/12. | definition | tagged | Loans: “Monthly rate: $i^{(12)}/12 = 0.06/12 = 0.5\%$.” |
| The outstanding loan balance at any time equals the present value of the remaining future payments at the loan interest rate (prospective m… | fact | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| For payments that decrease by a constant proportion each period (geometric progression), the k-th payment equals the first payment times (1… | formula | linked | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |
| The present value of a geometrically varying annuity-immediate with ratio r=(1+g) is a finite geometric series: sum of first-term·(r v)^(j)… | formula | tagged | Geometric Progression: “$$\text{PV} = \frac{1}{1+i} \cdot \frac{1-\left(\frac{1+g}{1+i}\right)^n}{1 - \frac{1+g}{1+i}}$$” |
| To find the balance after the k-th payment, discount only the remaining payments (k+1 through n), re-indexing time so the first remaining p… | procedure | tagged | Outstanding Balance: “$$OB_k = P \cdot a_{\overline{n-k}\\|i}$$” |

</details>

<details><summary><code>fm-014</code> · gap</summary>

Tagged pages: Annuities, Annuity Immediate, Accumulated Value, Equation of Value, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at the end of m periods of level end-of-period deposits is the deposit times s_{m\|i} = ((1+i)^m - 1)/i. | formula | tagged | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| Decompose a payment stream with a step increase in level into a sum of level annuities covering different time spans (e.g., a stream of 2P … | procedure | missing |  |
| Set up an equation of value at a chosen comparison date by equating the accumulated value of all deposits to the target amount. | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| Powers of the accumulation factor combine multiplicatively: if (1+i)^n = k, then (1+i)^{jn} = k^j. | fact | missing |  |

</details>

<details><summary><code>fm-015</code> · gap</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| Convert a nominal annual rate convertible m times per year to an effective rate per period by dividing by m, then convert to an effective r… | procedure | elsewhere | Nominal Interest Rate Convertible m-thly: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| A payment stream that increases by a constant amount each period, starting at that same amount (payments P, 2P, ..., nP), equals P times th… | fact | tagged | Arithmetic Increasing Annuity (collapsed): “Factor out 100: $PV = 100\cdot(Ia)_{\overline{5}\\|0.06}$.” |
| The present value of an n-period increasing annuity-immediate with payments 1, 2, ..., n is (Ia)_{n\|i} = (ä_{n\|i} − n v^n) / i. | formula | tagged | Arithmetic Increasing Annuity: “An **arithmetic increasing annuity** has payments $1, 2, 3, \ldots, n$ at the end of periods $1, 2,…” |
| The annuity-due present value factor is ä_{n\|i} = (1 − v^n)/d = (1 − v^n)·(1+i)/i, where v = 1/(1+i). | formula | missing |  |

</details>

<details><summary><code>fm-016</code> · gap</summary>

Tagged pages: Present Value, Equation of Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a stream of payments is the sum of each payment multiplied by the discount factor v^t for its payment time t, where v … | definition | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| To compare or solve for an unknown rate, set the present values of two payment streams equal (equation of value) at a common valuation date. | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| Powers of the discount factor combine by exponent rules, so v^(2n) = (v^n)^2, allowing known v^n to determine v^(2n). | fact | missing |  |
| The annual effective interest rate is recovered from the discount factor via v = 1/(1+i), so i = 1/v - 1 (equivalently i = (v^10)^(-1/10) -… | formula | elsewhere | Discount Factor: “$$v = \frac{1}{1+i}$$” |

</details>

<details><summary><code>fm-017</code> · untagged</summary>

Tagged pages: Continuous Annuity, Force of Interest, Accumulation Function, Payable Continuously

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation function for a time-varying force of interest is a(t) = exp(∫_0^t δ_r dr). | formula | tagged | Force of Interest: “$$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$” |
| The accumulated value at time T of a continuous payment stream with rate ρ(t) is found by integrating ρ(t)·a(T)/a(t) from 0 to T, accumulat… | procedure | tagged | Continuous Annuity: “$$\bar{s}_{\overline{n}\\|} = \int_0^n e^{\delta(n-t)}\,dt$$” |
| Set the accumulated value of the payments at time T equal to the given account value to form an equation of value, then solve for the unkno… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The accumulation factor from time t to T is a(T)/a(t), which equals exp(∫_t^T δ_r dr). | fact | linked | Accumulated Value: “under a [[Variable Force of Interest\\|force of interest]] $\delta_r$ it equals $\exp\left(\int_s^t …” |

</details>

<details><summary><code>fm-018</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value, Non-Callable Bond

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons (coupon rate times par times the annuity-immediate factor) plus the present val… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The annuity-immediate present value factor is a_{m\|} = (1 - v^m)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| For a bond with semi-annual coupons held n years, use 2n periods, with the coupon rate and yield rate expressed per half-year, so the disco… | procedure | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| Given (1+i)^{-n} for a term of n years with semi-annual periods, the discount over 2n periods is obtained by treating (1+i)^{-n} as the n-p… | fact | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| The coupon amount is par (face) times the coupon rate per period, and the coupon annuity PV can be written as Fr(1-v^m)/i = F(r/i)(1-v^m), … | fact | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |

</details>

<details><summary><code>fm-019</code> · untagged</summary>

Tagged pages: Net Present Value, Present Value, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| The net present value of a project is the present value of its cash inflows minus the present value of its cash outflows (investments), dis… | definition | tagged | Net Present Value: “$$= PV(\text{inflows}) - PV(\text{outflows})$$” |
| The present value of a payment made at time t is the payment times v^t, where v = 1/(1+i) and i is the annual effective interest rate. | formula | tagged | Present Value: “$$= FV \cdot v^n$$” |
| To find an unknown cash flow when two projects have equal NPV, set the NPV expressions of the two projects (each with timed cash flows disc… | procedure | elsewhere | Equation of Value: “$$\text{Value}_{t_0}(\text{inflows}) = \text{Value}_{t_0}(\text{outflows})$$” |

</details>

<details><summary><code>fm-020</code> · answerable</summary>

Tagged pages: Perpetuity, Present Value, Level Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-immediate paying X per year is X/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The present value of an n-year annuity-immediate paying X per year is X times a_angle_n = X(1 - v^n)/i, where v = 1/(1+i). | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The fraction of a perpetuity's present value that comes from its first n payments equals 1 - v^n, since a_angle_n divided by 1/i is 1 - v^n. | fact | tagged | Perpetuity: “For a **perpetuity-immediate** (payments at end of each period) the present value is obtained by le…” |
| A perpetuity whose payments begin after a deferral of m years has present value v^m times the present value of the perpetuity starting imme… | procedure | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |

</details>

<details><summary><code>fm-021</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Interest, Amortization, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate compounded m times per year corresponds to an effective rate of i/m per compounding period. | definition | elsewhere | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| A lump sum accumulates with compound interest as principal times (1+i)^n, so the interest paid at the end is principal times ((1+i)^n - 1). | formula | elsewhere | Compound Interest: “An investment of $P$ at effective annual rate $i$ grows to:” |
| For a loan on which interest is paid each period and the principal is repaid at the end, the interest per period is the principal times the… | procedure | tagged | Interest: “I_t = i \cdot B_{t-1}” |
| The level payment that amortizes a loan L over n periods at periodic rate i is P = L / a_{n\|i}, where a_{n\|i} = (1 - v^n)/i. | formula | tagged | Amortization: “P = \frac{L}{a_{\overline{n}\\|i}}” |
| Total interest paid over an amortized loan equals the sum of all payments minus the original principal. | fact | tagged | Loan Amortization: “Over the whole loan the principal portions add up to $L$, so the total interest is the total of the…” |

</details>

<details><summary><code>fm-022</code> · gap</summary>

Tagged pages: Compound Interest, Accumulated Value, Interest, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The interest earned during the nth year equals the accumulated value at time n minus the accumulated value at time n-1, i.e., A(n) - A(n-1). | definition | missing |  |
| With a deposit P at time 0 and annual effective rate i, the interest earned in year n equals P(1+i)^(n-1) * i. | formula | missing |  |
| To find an unknown effective rate from two equations that share the same unknown quantity, divide one equation by the other to eliminate th… | procedure | missing |  |

</details>

<details><summary><code>fm-023</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Interest, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| For a level-payment loan, the outstanding balance at time t equals the present value of the remaining payments, i.e. the payment times the … | formula | tagged | Amortization: “Outstanding balance after payment $k$: $OB_k = P \cdot a_{\overline{n-k}\\|i}$” |
| Interest paid in a period equals the effective rate i times the outstanding balance at the start of that period (the balance at the end of … | fact | tagged | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |
| Principal repaid in a period equals the payment minus the interest paid in that period (equivalently, the reduction in the outstanding bala… | fact | tagged | Loan Amortization: “$$PR_k = K_k - I_k = B_{k-1} - B_k$$” |
| The present value of an n-year annuity-immediate is a_angle(n) = (1 − v^n)/i, so i·a_angle(n) = 1 − v^n, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The effective discount rate d equals 1 − v (equivalently i·v), the relationship used to rewrite 1 − v as d. | definition | missing |  |

</details>

<details><summary><code>fm-024</code> · gap</summary>

Tagged pages: Perpetuity, Level Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-immediate paying a level amount at the end of each period is the payment times v/(1-v), where v is the di… | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| For a perpetuity with payments every k years, treat it as a sum of payments discounted by v^k, 2k, 3k,... and sum the geometric series to g… | procedure | missing |  |
| The discount factor is v = 1/(1+i), so v raised to a fractional power t gives the present value factor for a payment made t years from now,… | definition | elsewhere | Discount Factor: “The $n$-period discount factor is $v^n = (1+i)^{-n}$.” |
| For a perpetuity with payments at intervals shorter than a year, use the discount factor over one payment interval, v^(1/m) for payments ev… | procedure | elsewhere | Payment Period: “$$j = (1+i)^{1/m} - 1$$” |

</details>

<details><summary><code>fm-025</code> · untagged</summary>

Tagged pages: Immunization, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Reinvestment of Coupons, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Compute the annual coupon of a bond as the coupon rate times the par (face) value. | procedure | linked | Coupon: “$$\text{Coupon} = Fr$$” |
| Coupons received before maturity are reinvested at the reinvestment rate, so their accumulated value at maturity is the coupon amount times… | procedure | tagged | Reinvestment of Coupons: “When coupons are reinvested at a rate $r_i$ per period, the **accumulated value** at the end of $n$…” |
| The accumulated value of an n-period annuity-immediate of 1 per period is s_{n\|i} = ((1+i)^n - 1)/i. | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| A bond whose maturity value equals par returns the par value at maturity in addition to the final coupon, so total funds at maturity equal … | fact | tagged | Reinvestment of Coupons: “$$AV = Fr \cdot s_{\overline{n}\\|r_i} + C$$” |
| Profit or loss at the liability date equals the accumulated asset proceeds at maturity minus the liability payment; a shortfall is a loss a… | procedure | tagged | Asset-Liability Portfolio: “$$S(i) = \sum_{t} v^t \left(A_t - L_t\right) = PV_A(i) - PV_L(i)$$” |
| When reinvestment rates fall below the assumed rate, reinvested coupons accumulate to less and the asset-liability position shows a loss; w… | fact | tagged | Reinvestment of Coupons: “If $r_i < j$, the accumulated value is lower and the realized return falls below $j$; if $r_i > j$,…” |

</details>

<details><summary><code>fm-026</code> · gap</summary>

Tagged pages: Geometric Increasing Annuity, Present Value, Geometric Progression, Non-level Annuities, Real Rate of Interest

| Item | Kind | Status | Where |
|---|---|---|---|
| When payments grow with inflation from today's level, the first payment at time 1 equals the current amount times (1 + inflation rate), and… | procedure | missing |  |
| The discount factor v equals 1/(1+i), where i is the annual effective interest rate, and a payment at time t has present value equal to the… | definition | tagged | Present Value: “future cash flows are multiplied by the discount factor $v = (1+i)^{-1}$ raised to the number of pe…” |
| The present value of an annuity-immediate whose payments grow geometrically at rate g is the sum of a geometric series: PV = P·[(1+g)v − ((… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| The geometric series formula for a growing annuity remains valid when the growth rate exceeds the interest rate (ratio (1+g)v greater than … | fact | tagged | Geometric Increasing Annuity: “The present value (at effective rate $i \neq g$) is:” |

</details>

<details><summary><code>fm-027</code> · untagged</summary>

Tagged pages: Net Present Value, Present Value, Cash Flow, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| Net present value is the present value of cash inflows minus the present value of cash outflows (the initial investment), discounted at a g… | definition | tagged | Net Present Value: “$$= PV(\text{inflows}) - PV(\text{outflows})$$” |
| When interim cash flows are reinvested at a specified rate, accumulate each cash flow forward to the end of the investment term at the rein… | procedure | tagged | Reinvestment of Coupons: “When coupons are reinvested at a rate $r_i$ per period, the **accumulated value** at the end of $n$…” |
| The accumulated value of an amount after n periods at annual effective rate i is the amount times (1+i)^n. | formula | linked | Accumulated Value: “Under [[Compound Interest]] at rate $i$, $a(t) = (1+i)^t$, so $AV = PV \cdot (1+i)^t$.” |
| The present value of an amount due at time n at annual effective rate i is the amount times (1+i)^(-n). | formula | tagged | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| The reinvestment rate and the NPV discount rate can differ; reinvestment rate is used to accumulate cash flows, while the stated valuation … | fact | elsewhere | Economic Value (collapsed): “Funds after 2 years} &= 130(1.04)^2 \\” |

</details>

<details><summary><code>fm-028</code> · answerable</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Bonds, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| The value of a bond equals the present value of its future coupon and redemption cash flows. | fact | tagged | Bonds: “**[[Bond Price\\|Price]]** — Present value of all future cash flows at the yield rate” |
| The annual coupon of a bond equals the coupon rate times the par (face) value, and the final payment at maturity is the last coupon plus th… | formula | tagged | Spot Rate: “$$P = \frac{60}{1.04} + \frac{60}{1.05^2} + \frac{1060}{1.06^3}$$” |
| The t-year spot interest rate is the annual effective rate used to discount a single cash flow occurring at time t, so that its present val… | definition | tagged | Spot Rates and Forward Rates: “The [[Spot Rate]] $s_t$ is the annual effective rate earned on an investment made now and repaid in…” |
| To value a bond using spot rates, discount each cash flow at the spot rate matching its payment time and sum the present values: P = sum C_… | procedure | tagged | Spot Rates and Forward Rates: “convert whichever rates are given to spot rates (or to a product of forward-rate factors), then dis…” |

</details>

<details><summary><code>fm-029</code> · answerable</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Yield Rate, Bonds, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond's price (value) equals the present value of its coupons and redemption value, each cash flow discounted at the spot rate matching it… | fact | tagged | Spot Rate: “A coupon bond is priced by discounting each cash flow at the spot rate for that maturity:” |
| The price of a bond with par value F, coupon rate r, redemption C and n periods at yield i is P = F·r·a_{n\|i} + C(1+i)^{-n}. | formula | tagged | Yield Rate: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The yield rate of a bond is the single effective interest rate i at which the present value of its cash flows equals its price. | definition | tagged | Yield Rate: “The **yield rate** $j$ (also called the yield to maturity) is the internal rate of return of a bond…” |
| To find the yield of a bond whose price was computed from spot rates, set the price equal to the level-yield bond price formula and solve f… | procedure | tagged | Yield Rate (collapsed): “$$50\,a_{\overline{3}\\|j} + 1{,}000\,v^3 = 950.26$$” |

</details>

<details><summary><code>fm-030</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Modified Duration, Bonds

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration equals the negative of the derivative of price with respect to yield, divided by price, times one plus the effective annu… | formula | missing |  |
| Macaulay duration is the present-value-weighted average time of a bond's cash flows, measuring the bond's price sensitivity to yield. | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| Modified duration equals the negative of the price derivative divided by price, and Macaulay duration equals modified duration times (1+i). | fact | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-031</code> · untagged</summary>

Tagged pages: Duration, Perpetuity, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of a cash flow stream: the sum of t times the present value of the payment at … | definition | linked | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| The present value of a perpetuity-immediate paying 1 per year is a_infinity = 1/i. | formula | elsewhere | Level Perpetuity: “The present value of a perpetuity-immediate (payments at end of period) paying $1$ per period at ra…” |
| The present value of an increasing perpetuity-immediate paying t at time t is (Ia)_infinity = 1/(i·d) = a-due_infinity / i. | formula | elsewhere | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| The Macaulay duration of a level perpetuity-immediate equals 1/d, which is (1+i)/i. | fact | linked | Macaulay Duration: “For a level [[Perpetuity]]-immediate — payments of 1 at the **end** of each period, forever — $D_{M…” |
| The effective annual discount rate is d = i/(1+i). | formula | elsewhere | Effective Discount Rate: “$$d = \frac{i}{1+i}$$” |

</details>

<details><summary><code>fm-032</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Geometric Increasing Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of cash flows: the sum of t times v^t times the cash flow at time t, divided b… | formula | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| For cash flows growing at a constant rate g discounted at rate i, rewrite the discount factor as the product v(1+g) = 1/(1+j), giving an eq… | procedure | missing |  |
| The present value of a perpetuity-immediate paying 1 per period is a_∞ = 1/j, and the increasing perpetuity-immediate (1,2,3,...) has prese… | formula | linked | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The Macaulay duration of a level perpetuity-immediate (ratio of (Ia)_∞ to a_∞) equals 1/d = (1+i)/i, where d is the effective discount rate. | fact | tagged | Macaulay Duration: “For a level [[Perpetuity]]-immediate — payments of 1 at the **end** of each period, forever — $D_{M…” |
| The effective annual discount rate is d = i/(1+i) = 1 - v, so 1/d = (1+i)/i. | definition | linked | Perpetuity: “$$\ddot{a}_{\overline{\infty}\\|} = \frac{1}{d}$$” |

</details>

<details><summary><code>fm-033</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| With level end-of-year payments, the outstanding balance after the payment at time n-1 equals the present value of the one remaining paymen… | fact | linked | Final Payment: “The final payment amount equals the [[Outstanding Balance]] at the previous payment date accumulate…” |
| The amount of a loan repaid by n level end-of-year payments of P at effective rate i is P times the annuity-immediate present value factor … | formula | elsewhere | Level Payment Annuity: “$$\text{PV} = P \cdot a_{\overline{n}\\|i}$$” |
| The interest portion of a loan payment equals the interest rate times the outstanding balance at the start of the period, and the principal… | procedure | tagged | Principal (collapsed): “**Principal in payment 1**: $PR_1 = P - I_1 = 3560.95 - 900.00 = \$2{,}660.95$” |
| For a level-payment loan, successive principal repayments grow geometrically by a factor of (1+i), so P_t = P_1(1+i)^(t-1). | fact | tagged | Loan Amortization: “With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$, so $PR_{…” |
| In a level-payment loan, the final principal repaid equals the outstanding balance just before the final payment. | fact | tagged | Loan Amortization: “$$PR_k = K_k - I_k = B_{k-1} - B_k$$” |

</details>

<details><summary><code>fm-034</code> · untagged</summary>

Tagged pages: Yield Rate, Bonds, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| When a bond's yield rate equals its coupon rate, the bond's price equals its par (redemption) value. | fact | linked | Bond Price: “when $Fr = Cj$ it sells at **par** ($P = C$)” |
| Semi-annual coupon amount equals the par value times the annual coupon rate divided by 2 (coupon rate per period times face value). | formula | linked | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The accumulated value at the end of n periods of level payments made at the end of each period, reinvested at periodic rate j, is the payme… | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When coupons are reinvested at a different rate, the investor's overall yield is found by equating the purchase price accumulated at the an… | procedure | tagged | Reinvestment of Coupons (collapsed): “The realized yield $r$ satisfies $1000(1+r)^4 = 1297.25$, giving $(1+r)^4 = 1.29725$, so $r = 1.297…” |
| Solve for an unknown periodic interest rate from a given annuity accumulated value (s_{n\|j} = known value) using a financial calculator or… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |
| A semi-annual effective rate j converts to an annual effective rate by i = (1+j)^2 - 1. | formula | elsewhere | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |

</details>

<details><summary><code>fm-035</code> · gap</summary>

Tagged pages: Annuity Due, Accumulated Value, Level Payment Annuity, Term of Annuity, Payable m-thly

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the fund needed at retirement, divide the desired periodic income by the income rate per unit of fund (e.g. income per 1000 of fund… | procedure | missing |  |
| A nominal annual rate compounded monthly, i^(12), corresponds to an effective monthly rate of i^(12)/12. | fact | linked | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| An annuity-due makes payments at the beginning of each period, and its accumulated value at the end of n periods is s-due_{n\|i} = ((1+i)^n… | definition | tagged | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |
| Set the accumulated value of level periodic contributions equal to the target fund (equation of value) and solve for the contribution amoun… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| Monthly contributions made for a number of years total 12 times the years in payments, with the first contribution made at time 0 (start of… | fact | tagged | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |

</details>

<details><summary><code>fm-036</code> · answerable</summary>

Tagged pages: Time Value of Money, Time Value of Money Equations, Present Value, Equation of Value, Effective Rate, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| To set up an equation of value, choose a single comparison date and express the value of all cash flows (deposits and withdrawals) at that … | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The present value of a payment of amount C made t years from now at effective annual rate i is C·v^t, where v = 1/(1+i). | formula | tagged | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| The accumulated value at time n of a payment C made at time t (t ≤ n) is C·(1+i)^(n−t). | formula | linked | Accumulated Value: “$$AV = \sum_k C_{t_k} \cdot (1+i)^{t - t_k}$$” |
| For a series of level payments, express the value at a chosen date as a sum of terms, with each payment's exponent equal to the time betwee… | procedure | linked | Future Value: “$$\text{FV}_n = \sum_{t=0}^{n} C_t (1+i)^{n-t}$$” |

</details>

<details><summary><code>fm-037</code> · no requirements</summary>

Tagged pages: Immunization, Bonds, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|

</details>

<details><summary><code>fm-038</code> · answerable</summary>

Tagged pages: Immunization, Loans, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| To exactly match liabilities with assets (cash flow matching), start with the latest liability date, solve for the asset that is the only o… | procedure | tagged | Cash Flow Matching: “Construction proceeds **backwards** from the last liability date — fund the final liability first, …” |
| A loan of L repaid with n equal annual payments at effective rate i has level payment L / a_angle(n) at rate i, where a_angle(n) = (1 - v^n… | formula | linked | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The amount lent in a loan equals the present value of the loan's repayments discounted at the loan's effective interest rate. | definition | linked | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |

</details>

<details><summary><code>fm-039</code> · gap</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Forward Rate, Immunization, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| To match a liability with a zero-coupon bond, choose the bond amount so its maturity value equals the liability due at that time, and its p… | procedure | linked | Cash Flow Matching (collapsed): “**Step 2 — Fund the time-1 liability:** Buy a 1-year zero-coupon bond with face value \$$5{,}000$. …” |
| The price of a zero-coupon bond maturing in n years with face amount F and annual yield i is F/(1+i)^n. | formula | tagged | Spot Rate: “The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exa…” |
| A forward rate is the interest rate agreed now for an investment made at a future date over a specified period, such as a one-year rate sta… | definition | tagged | Forward Rate: “A **forward rate** $f_{t_1, t_2}$ is the interest rate agreed upon today for an investment (or loan…” |
| To fund a liability at time 3 using a bond maturing at time 2, the proceeds at time 2 are reinvested at the forward rate for one year, so t… | procedure | missing |  |
| The total purchase cost of the matching portfolio is the sum of the prices of the individual bonds, where each bond's face amount is set by… | procedure | linked | Cash Flow Matching (collapsed): “The portfolio cost is $\dfrac{10{,}000}{(1+s_2)^2} + \dfrac{5{,}000}{1+s_1}$, where $s_1, s_2$ are …” |

</details>

<details><summary><code>fm-040</code> · answerable</summary>

Tagged pages: Bond Price, Bonds, Callable Bond, Premium, Face Value, Coupon, Coupon Rate, Redemption Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a callable or non-callable bond equals the present value of its coupons (coupon rate times redemption value times an annuity-i… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A bond sells at a premium when its coupon rate per period exceeds the yield rate per period, so its price exceeds its redemption value. | definition | tagged | Bond Price: “When $Fr > Cj$ the bond sells at a **premium** ($P > C$); when $Fr < Cj$ it sells at a **discount**…” |
| For a callable premium bond, the investor's minimum yield occurs if the bond is called at the earliest possible call date, so the guarantee… | fact | tagged | Callable Bond: “If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified c…” |
| Convert a nominal annual rate convertible semiannually to an effective rate per period by dividing by 2, and convert the coupon rate and th… | procedure | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| A bond's coupon amount is the coupon rate per period times the par (face) value, and when redeemed at par the redemption value equals the f… | fact | tagged | Face Value: “The [[Coupon]] payment each period equals $F \times r$ where $r$ is the [[Coupon Rate]] per period” |

</details>

<details><summary><code>fm-041</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Callable Bond, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of its redemption value at the yield rate: P = Fr·a_{n\|… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A nominal annual rate convertible semiannually equals twice the effective half-year rate, so the per-period yield is the nominal rate divid… | definition | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| A callable bond is one the issuer may redeem early at a specified call price on specified call dates prior to maturity, so the investor's r… | definition | tagged | Callable Bond: “A **callable bond** gives the **issuer** the right (but not the obligation) to redeem the bond befo…” |
| When the coupon amount exceeds the yield rate times the call price (coupon rate per period greater than yield), the price at a call date ri… | fact | tagged | Callable Bond: “Within a stretch of dates sharing one call price $K$, the price moves steadily one way (up with $m$…” |
| To guarantee at least a given yield on a callable bond, compute the price for each possible redemption scenario (earliest call and maturity… | procedure | tagged | Callable Bond: “To guarantee a yield of at least $j$ per period, the most the investor will pay is the **smallest**…” |

</details>

<details><summary><code>fm-042</code> · answerable</summary>

Tagged pages: Bond Price, Bonds, Callable Bond, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons (Fr times an annuity-immediate at the periodic yield rate) plus the present val… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A nominal annual rate convertible semiannually is converted to an effective rate per period by dividing by 2, and the coupon per period is … | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| A bond whose coupon rate per period is less than the yield rate per period sells at a discount (price below redemption value). | fact | tagged | Bond Price: “when $Fr < Cj$ it sells at a **discount** ($P < C$)” |
| For a callable bond bought at a discount, the investor's yield is lowest when the bond is redeemed at the latest possible date (maturity), … | fact | tagged | Callable Bond: “If the bond is at a **discount** (price $<$ redemption value): assume the **latest** possible redem…” |
| To find the guaranteed minimum yield on a callable bond, price the bond at the yield rate under the worst-case call date and solve for the … | procedure | tagged | Callable Bond: “To guarantee a yield of at least $j$ per period, the most the investor will pay is the **smallest**…” |

</details>

<details><summary><code>fm-043</code> · untagged</summary>

Tagged pages: Bond Price, Yield Rate, Bonds, Callable Bond, Call Price, Call Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons (a level annuity) plus the present value of the redemption payment, discounted … | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The bond coupon equals the coupon rate per period times the face (par) value, not the redemption value. | definition | linked | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| A callable bond may be redeemed by the issuer before maturity at a specified call price (here par plus a premium), on specified call dates. | definition | tagged | Callable Bond: “A **callable bond** gives the **issuer** the right (but not the obligation) to redeem the bond befo…” |
| To find the yield on a callable bond, compute the yield for each possible redemption date (each call date and maturity) by solving the pric… | procedure | tagged | Callable Bond: “Given a price instead, the investor's yield is the smallest of the yields at the possible call date…” |
| When the purchase price is below the call price (a discount relative to redemption), the yield is lowest when redemption occurs at the late… | fact | tagged | Callable Bond: “If the bond is at a **discount** (price $<$ redemption value): assume the **latest** possible redem…” |
| An annual nominal rate convertible m times per year equals m times the effective rate per period, i^(m) = m·j. | definition | elsewhere | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |

</details>

<details><summary><code>fm-044</code> · untagged</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-year annuity-immediate of level payments is the payment times a_angle_n = (1 - v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| Macaulay duration of a cash flow series is the present-value-weighted average of the payment times: sum of t*PV(C_t) divided by the total p… | definition | linked | Macaulay Duration: “$$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$” |
| The Macaulay duration of a zero-coupon bond equals its term to maturity. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| The Macaulay duration of an asset portfolio is the average of the individual assets' durations weighted by their present values (proportion… | fact | tagged | Portfolio: “**[[Duration]] of a portfolio**: the weighted average of individual asset durations, weighted by ma…” |
| To immunize (match) a liability using two assets, set the total asset present value equal to the liability's present value and set the weig… | procedure | linked | Full Immunization: “$$A\,v^{T-a} + B\,v^{T+b} = L\,v^{T}$$” |

</details>

<details><summary><code>fm-045</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Loans, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a loan equals the present value of its payments at the loan's effective interest rate, so the loan amount is the sum o… | definition | linked | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |
| The present value of an n-payment geometric annuity-immediate with first payment P and ratio (1+k) is (P·v − P(1+k)^n·v^(n+1)) / (1 − (1+k)… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| For payments whose pattern changes partway, split the payment stream into segments, value each segment as its own annuity at its start, dis… | procedure | elsewhere | Loan Amortization (collapsed): “The loan is the present value of the payments, with $a_{\overline{4}\\|5\%} = 3.545951$ and $v^4 a_{…” |
| A decreasing geometric annuity is valued with the same formula using a ratio below 1 (1−r for r% decreases), with the first payment of the … | procedure | tagged | Geometric Increasing Annuity: “A **geometric increasing (or decreasing) annuity** has payments that grow (or shrink) at a constant…” |
| Determine the payment amounts at the segment boundaries by compounding the growth: after m increases of rate k the payment is P(1+k)^m, and… | procedure | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |

</details>

<details><summary><code>fm-046</code> · gap</summary>

Tagged pages: Force of Interest, Accumulation Function, Variable Force of Interest, Effective Rate, Number of Periods

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation function in terms of a force of interest is a(t) = exp(∫_0^t δ_r dr). | formula | tagged | Force of Interest: “$$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$” |
| To find the time for a deposit to grow to a target value, set the deposit times a(t) equal to the target value and solve for t, i.e., a(t) … | procedure | tagged | Number of Periods: “Under a [[Variable Force of Interest\\|variable force]] $\delta(t)$, solve $\int_0^n \delta(t)\,dt =…” |
| When the integrand is a constant multiple of f'(r)/f(r), its integral is that multiple times ln f(r), so the integral from 0 to t equals th… | fact | missing |  |

</details>

<details><summary><code>fm-047</code> · untagged</summary>

Tagged pages: Bond Amortization, Amortization of Premium, Bonds, Book Value, Discount, Amortization, Face Value, Coupon, Coupon Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| For a bond bought at a discount with annual coupons, the discount amortization (accumulation) in the t-th coupon equals (Ci - Fr)v^(n-t+1),… | formula | tagged | Bond Amortization: “$$PR_t = Fr - I_t = (Fr - Cj)\,v^{\,n-t+1}$$” |
| The discount accumulation amounts in successive coupons form a geometric sequence with ratio (1+i), so the ratio of two accumulation amount… | fact | tagged | Bond Amortization: “The principal adjustments form a geometric progression with ratio $1 + j$ and add up to the premium…” |
| The total discount at purchase (redemption value minus price) equals the sum of all discount accumulations over the bond's life, which is (… | fact | tagged | Discount: “$$C - P = (Cj - Fr)\,a_{\overline{n}\\|j}$$” |
| The present value annuity-immediate factor a_{n\|i} equals (1 - v^n)/i, where v = 1/(1+i). | definition | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |

</details>

<details><summary><code>fm-048</code> · answerable</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Interest, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| In a level-payment amortized loan, the principal portions of successive payments grow geometrically by a factor of (1+i) each period. | fact | tagged | Loan Amortization: “With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$, so $PR_{…” |
| For a level-payment loan with n payments, the principal repaid in payment t equals P·v^(n-t+1), where P is the level payment and v = 1/(1+i… | formula | tagged | Amortization: “Principal in payment $k$: $PR_k = P \cdot v^{n-k+1}$” |
| The interest portion of the first payment on a loan equals the initial loan amount times the periodic effective interest rate (I1 = L·i), a… | fact | tagged | Principal: “It is the basis on which interest is computed in the first period ($\text{Interest}_1 = L \times i$…” |
| Total interest paid on a loan equals the sum of all level payments (payment times number of payments) minus the original loan amount (total… | procedure | tagged | Loan Amortization: “Over the whole loan the principal portions add up to $L$, so the total interest is the total of the…” |

</details>

<details><summary><code>fm-049</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan, Balloon Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible monthly, i(12), gives an effective monthly rate of i(12)/12. | definition | elsewhere | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| The outstanding loan balance immediately after a payment is the amount still owed on the loan, equal to the principal remaining after that … | definition | tagged | Outstanding Balance: “**Outstanding balance** (or outstanding loan balance) is the amount still owed on a loan at a given…” |
| Retrospective method: the outstanding balance after k payments equals the original loan accumulated with interest for k periods minus the a… | procedure | tagged | Outstanding Balance: “$$OB_k = L(1+i)^k - P \cdot s_{\overline{k}\\|i}$$” |
| The accumulated value of an n-period annuity-immediate of 1 per period is s_{n\|i} = ((1+i)^n - 1)/i. | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| The level payment P that amortizes a loan of amount L over n periods at effective rate i satisfies L = P*a_{n\|i}, where a_{n\|i} = (1-v^n)… | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| When a loan is refinanced, the outstanding balance at the refinancing date becomes the principal of the new loan, which is repaid using the… | procedure | missing |  |

</details>

<details><summary><code>fm-050</code> · gap</summary>

Tagged pages: Duration, Bonds, Macaulay Duration

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond purchased at par (no premium or discount) has a yield rate per period equal to its coupon rate per period. | fact | linked | Coupon Rate: “When the coupon rate equals the yield rate ($r = j$ for $F = C$), the bond prices at par.” |
| Macaulay duration is the present-value-weighted average of the times of the cash flows, i.e., the sum of t times PV of the payment at t div… | definition | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| The present value of an increasing annuity with payments 1, 2, ..., n at the end of each period is (Ia)_{n\|} = (ä_{n\|} − n v^n)/i. | formula | elsewhere | Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |
| For a coupon bond, compute Macaulay duration by weighting each coupon and the redemption value by its time, using the coupon as an increasi… | procedure | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| For a bond bought at par (coupon rate equals yield rate), the Macaulay duration in periods equals the annuity-due value ä_{n\|} at the yiel… | fact | missing |  |

</details>

<details><summary><code>fm-051</code> · answerable</summary>

Tagged pages: Duration, Modified Duration, Bonds, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Modified duration equals Macaulay duration divided by (1+i), where i is the annual effective interest rate. | formula | tagged | Modified Duration: “$$= \frac{D_{Mac}}{1+j}$$” |
| The first-order modified approximation estimates the new price as P(i+Δi) ≈ P(i)[1 − Δi × modified duration]. | formula | tagged | Modified Duration: “$$\Delta P \approx -D_{Mod} \cdot P \cdot \Delta j$$” |
| A bond purchased at par has a price equal to its par (face) value at the purchase interest rate, so the starting price P(i) is the par valu… | fact | linked | Bond Price: “when $Fr = Cj$ it sells at **par** ($P = C$).” |

</details>

<details><summary><code>fm-052</code> · answerable</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Forward Rate, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| A zero-coupon bond's price is the present value of a payment of 1 at maturity, so the n-year spot rate s_n satisfies P(n) = 1/(1+s_n)^n. | definition | tagged | Spot Rate: “The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exa…” |
| Obtain the n-year spot rate from a zero-coupon bond price by solving P(n) = (1+s_n)^(-n), i.e. s_n = P(n)^(-1/n) - 1. | procedure | tagged | Spot Rate: “The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exa…” |
| The forward rate for a one-year period deferred t years (from time t to t+1) is the rate that can be locked in today for borrowing or inves… | definition | tagged | Forward Rate: “A **forward rate** $f_{t_1, t_2}$ is the interest rate agreed upon today for an investment (or loan…” |
| Spot and forward rates are linked by no-arbitrage accumulation: (1+s_{t+1})^{t+1} = (1+s_t)^t (1+ f_t), where f_t is the one-year forward r… | formula | tagged | Spot Rates and Forward Rates: “$$(1+s_n)^n\,(1+f_{n,n+k})^k = (1+s_{n+k})^{n+k}$$” |

</details>

<details><summary><code>fm-053</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Bonds

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of a bond's cash flows: the sum of t times PV of the cash flow at time t, divi… | definition | tagged | Macaulay Duration: “$$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$” |
| For a bond bought at par (coupon rate equals yield rate), the price equals par and the Macaulay duration equals the annuity-due present val… | fact | missing |  |
| The annuity-due present value factor is ä_n = (1 - v^n)/d, where d = i/(1+i) and v = 1/(1+i). | formula | elsewhere | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| Just before a coupon is paid, the remaining cash flows are those of the bond one period earlier, each occurring one year sooner, so the Mac… | procedure | missing |  |
| Immediately after a coupon is paid, the bond is a par bond with one fewer period remaining, and its duration is computed from the remaining… | fact | missing |  |

</details>

<details><summary><code>fm-054</code> · answerable</summary>

Tagged pages: Immunization, Bonds, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| Exact cash flow matching (asset-liability matching) means choosing bond holdings whose cash flows equal the liability cash flows at every p… | definition | tagged | Cash Flow Matching: “**Cash flow matching** (also called **dedication**) is a portfolio strategy in which asset cash flo…” |
| To match liabilities exactly, work backwards from the latest liability: the bond maturing last is the only one with cash flow at the final … | procedure | tagged | Cash Flow Matching: “Construction proceeds **backwards** from the last liability date — fund the final liability first, …” |
| After setting units of the longer bond, subtract its coupon payments received at earlier dates from each earlier liability, and use the nex… | procedure | tagged | Cash Flow Matching: “A coupon bond bought for a later liability also pays coupons on the earlier dates, so those coupons…” |
| An annual coupon bond pays coupon rate times par at each period and pays par plus the final coupon at maturity; a zero-coupon bond pays onl… | fact | tagged | Bonds: “A **bond** is a fixed-income debt instrument in which an issuer (borrower) promises to pay the bond…” |

</details>

<details><summary><code>fm-055</code> · answerable</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization matches the present value and modified duration of assets to those of liabilities (with asset convexity exceeding li… | definition | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| Redington immunization assumes a flat yield curve that shifts in parallel when interest rates change. | fact | tagged | Immunization: “**[[Redington Immunization]]**: protects against small parallel yield shifts; requires three condit…” |
| Redington immunization only protects against small changes in the interest rate, since it relies on a first/second-order approximation of p… | fact | tagged | Redington Immunization: “Redington immunization only protects against small, parallel rate shifts and must be rebalanced as …” |
| The modified durations of assets and liabilities change over time at different rates, so the duration match holds only at the moment of imm… | fact | tagged | Redington Immunization: “Redington immunization only protects against small, parallel rate shifts and must be rebalanced as …” |
| Modified duration measures the sensitivity of a cash flow stream's present value to changes in the interest rate. | definition | tagged | Duration: “**[[Modified Duration]]** $D_{Mod}$: approximate percentage decrease in price per unit increase in …” |

</details>

<details><summary><code>fm-056</code> · gap</summary>

Tagged pages: Immunization, Full Immunization, Portfolio, Asset-Liability Portfolio, Duration Matching, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Full immunization of a single liability requires that the present value of assets equal the present value of the liability, that the (modif… | fact | tagged | Full Immunization: “1. $PV(\text{assets}) = PV(\text{liability})$ at the current rate $i$” |
| To satisfy the duration condition, set the derivative of the surplus (asset PV minus liability PV) with respect to the interest rate equal … | procedure | tagged | Full Immunization: “Dividing through by $v^T$ reduces them to $A(1+i)^{a} + B(1+i)^{-b} = L$ and $a\,A(1+i)^{a} = b\,B(…” |
| Value cash flows at a chosen focal date by accumulating earlier payments with (1+i)^t and discounting later payments with (1+i)^-t, where t… | procedure | elsewhere | Equation of Value: “- Cash flows before $t_0$ are accumulated to it; cash flows on or after $t_0$ are discounted to it.” |
| The derivative with respect to i of a cash flow C at time distance t from the focal date, valued as C(1+i)^(-t), is -tC(1+i)^(-t-1), so a p… | formula | missing |  |

</details>

<details><summary><code>fm-057</code> · answerable</summary>

Tagged pages: Immunization, Full Immunization, Portfolio, Asset-Liability Portfolio, Duration Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| Full immunization of a liability requires that the asset cash flows have the same present value as the liability, the same (Macaulay) durat… | definition | linked | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| Set the present value of the asset payments equal to the present value of the liability by accumulating or discounting each payment to a co… | procedure | tagged | Full Immunization: “$$A\,v^{T-a} + B\,v^{T+b} = L\,v^{T}$$” |
| Macaulay duration is the present-value-weighted average time of cash flows, sum of t·C_t·v^t divided by the present value; equating asset a… | formula | tagged | Full Immunization: “$$(T-a)\,A\,v^{T-a} + (T+b)\,B\,v^{T+b} = T\,L\,v^{T}$$” |
| When the present values of assets and liabilities are equal, matching durations is equivalent to requiring that the net present value's der… | fact | tagged | Full Immunization: “Dividing through by $v^T$ reduces them to $A(1+i)^{a} + B(1+i)^{-b} = L$ and $a\,A(1+i)^{a} = b\,B(…” |

</details>

<details><summary><code>fm-058</code> · untagged</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization requires that the present value of assets equals the present value of liabilities, the first derivatives of the pres… | definition | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| The present value of a cash flow C at time t at effective annual rate i is C*v^t, where v = 1/(1+i). | formula | elsewhere | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| The derivative of the present value of a cash flow C at time t with respect to i is -t*C*v^(t+1), so the first-derivative condition equates… | formula | linked | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| To find unknown asset amounts under Redington immunization, set up the PV-equality and first-derivative-equality equations and solve them s… | procedure | tagged | Redington Immunization: “Subtracting twice Condition 1 from Condition 2 gives $4Yv^6 = 20{,}000v^4$, so each bond carries ha…” |
| When asset cash flows occur on both sides of a single liability date (one earlier, one later), the convexity condition for Redington immuni… | fact | linked | Full Immunization: “3. There is an asset cash flow before the liability date and one after it” |

</details>

<details><summary><code>fm-059</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of its redemption value, all discounted at the yield rat… | fact | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| A nominal annual rate convertible semiannually, i, corresponds to an effective rate per half-year of i/2, and a coupon rate paid semiannual… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The present value of level payments of 1 at the end of each of n periods at periodic rate j is the annuity-immediate a_{n\|j} = (1 - (1+j)^… | formula | elsewhere | Annuity Immediate: “$$= \frac{1-(1+i)^{-n}}{i}$$” |
| For two bonds with the same term, redemption value and yield rate, the redemption value's present value is identical, so the difference in … | fact | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| To find an unknown periodic interest rate from a known annuity value a_{n\|j}, solve the equation numerically (e.g., with a financial calcu… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |

</details>

<details><summary><code>fm-060</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment of an n-period loan with principal L at periodic effective rate i is L divided by the annuity-immediate present value fac… | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| A nominal annual rate convertible monthly, j^(12), corresponds to a monthly effective rate of j^(12)/12. | definition | tagged | Loans: “Monthly rate: $i^{(12)}/12 = 0.06/12 = 0.5\%$. Number of payments: $n=360$.” |
| The outstanding loan balance immediately after a payment equals the present value of the remaining payments, discounted at the loan's inter… | fact | tagged | Outstanding Balance: “**Prospective method** (present value of future payments):” |
| To refinance a loan, set the new payment times the annuity factor over the remaining term at the new rate equal to the outstanding balance … | procedure | elsewhere | Refinancing: “$$P' = \frac{L'}{a_{\overline{n'}\\|\,i'}}$$” |
| The number of remaining payments after the k-th payment of an n-payment loan is n - k, which sets the term of the annuity for the balance. | procedure | tagged | Outstanding Balance: “$$OB_k = P \cdot a_{\overline{n-k}\\|i}$$” |
| When an annuity factor equation cannot be solved in closed form for the interest rate, solve for the rate numerically (e.g., by calculator … | procedure | linked | Payment Period: “When $k = m$ the conversion is trivial: $j = i^{(m)}/m$.” |

</details>

<details><summary><code>fm-061</code> · untagged</summary>

Tagged pages: Bond Price, Yield Rate, Bonds

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of its redemption value, discounted at the yield rate pe… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The coupon per period equals the coupon rate per period times the par (face) value, not the redemption value. | definition | linked | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| Convert a nominal annual yield compounded semiannually to an effective rate per period by dividing by 2, and use the number of periods as y… | procedure | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| The present value of an n-period annuity-immediate at periodic rate i is a_{n\|i} = (1 - v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To find an unknown yield rate, set the price equation of the bond equal to the given price (same price as another bond) and solve for the p… | procedure | tagged | Yield Rate: “the yield rate is the $j$ that solves this equation.” |

</details>

<details><summary><code>fm-062</code> · gap</summary>

Tagged pages: Compound Interest, Effective Rate, Number of Periods

| Item | Kind | Status | Where |
|---|---|---|---|
| An annual nominal interest rate convertible m times per year earns an effective rate of i/m per conversion period, so the accumulated value… | definition | linked | Convertible m-thly: “when interest is credited $m$ times per year at the periodic rate $i^{(m)}/m$. The equivalent effec…” |
| To find when one account's accumulated value reaches a multiple of another's, set up the inequality between the two accumulation functions … | procedure | tagged | Number of Periods: “$$n = \frac{\ln(FV/PV)}{\ln(1+i)}$$” |
| When interest is credited only at the end of each conversion period, the account value is a step function, so a threshold is first met at t… | fact | missing |  |
| Converting between years and months multiplies or divides by 12, and the conversion period length in months is 12/m (6 months for semiannua… | fact | tagged | Number of Periods: “With a nominal rate $i^{(12)}$ the natural rate is $i^{(12)}/12$ per month, so $n$ comes out in mon…” |

</details>

<details><summary><code>fm-063</code> · untagged</summary>

Tagged pages: Force of Interest, Accumulation Function, Compound Interest, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| With a constant annual effective interest rate i, an initial investment P accumulates to P(1+i)^n after n years. | formula | linked | Interest Rate: “Under [[Compound Interest]], $1$ invested grows to $(1+i)^n$ after $n$ periods.” |
| With force of interest δ_t, an investment P accumulates to P·exp(∫_0^n δ_t dt) at time n. | formula | tagged | Accumulation Function: “The **amount function** $A(t) = k \cdot a(t)$ gives the accumulated value of an initial investment …” |
| When two accounts have equal initial deposits and equal accumulated values at the same time, equate their accumulation factors (or exponent… | procedure | elsewhere | Equation of Value: “Every cash flow must be moved to the same comparison date before comparing, each at the [[Interest …” |

</details>

<details><summary><code>fm-064</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Interest, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The outstanding loan balance at any time equals the present value of all remaining future payments (prospective method). | fact | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| The loan amount at time 0 equals the present value of all loan payments. | fact | tagged | Loan Amortization: “whose present value at the loan rate equals the amount lent” |
| Interest paid in a period equals the rate i times the outstanding balance at the start of the period, and principal repaid equals the payme… | fact | tagged | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |
| The present value of a decreasing annuity-immediate with payments n, n-1, ..., 1 is (Da)_{n\|} = (n - a_{n\|})/i. | formula | elsewhere | Decreasing Annuity: “$$(Da)_{\overline{n}\\|} = \frac{n - a_{\overline{n}\\|}}{i}$$” |
| Value a payment stream with a level portion followed by an arithmetically decreasing portion by summing the PV of the level annuity and the… | procedure | tagged | Loan Amortization (collapsed): “10000 &= 1000\,a_{\overline{4}\\|} + X\,v^4\,a_{\overline{4}\\|}” |
| The present value of an n-year level annuity-immediate is a_{n\|} = (1 - v^n)/i. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |

</details>

<details><summary><code>fm-065</code> · untagged</summary>

Tagged pages: Annuity Due, Accumulated Value, Level Payment Annuity, Term of Annuity, Drop Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at the end of n periods of an annuity-due of level payments is the payment times s-double-dot_n = ((1+i)^n - 1)/d, wh… | formula | tagged | Annuity Due: “$$= \frac{(1+i)^n - 1}{d}$$” |
| The present value of an annuity-due of level payments is the payment times a-double-dot_n = (1 - v^n)/d. | formula | tagged | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| To convert an annual effective rate to an equivalent effective rate for a shorter period (e.g., semiannual), take (1+i)^(1/m) - 1, so that … | procedure | elsewhere | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |
| To find the number of level payments an accumulated fund supports, set the fund equal to the present value of the annuity and solve for n; … | procedure | tagged | Term of Annuity: “For an annuity-due, $\text{PV} = P\,\ddot{a}_{\overline{n}\\|} = P(1-v^n)/d$, so replace $i$ by $d$ …” |
| The smaller final payment is found by the equation of value: fund value at the start of withdrawals equals the PV of the full payments plus… | procedure | tagged | Term of Annuity (collapsed): “Check: $1{,}500\,a_{\overline{8}\\|} + 1{,}157.82\,v^9 = 9{,}314.69 + 685.31 = 10{,}000$.” |
| The final smaller payment at the beginning of a period following n full annuity-due payments occurs at time n (in periods), so it is discou… | fact | tagged | Drop Payment: “A **drop payment** is a final loan payment that is **smaller** than the regular payment, made one p…” |

</details>

<details><summary><code>fm-066</code> · gap</summary>

Tagged pages: Perpetuity, Present Value, Level Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-immediate paying 1 every k periods (first payment at time k) at effective rate i per period is 1/((1+i)^k… | formula | missing |  |
| For a perpetuity-due paying every k periods, add the immediate payment at time 0 to the perpetuity-immediate value, giving 1/((1+i)^k - 1) … | procedure | tagged | Perpetuity: “The relationship $\ddot{a}_{\overline{\infty}\\|} = 1 + a_{\overline{\infty}\\|}$ holds because the p…” |
| For a perpetuity whose first payment is at time t, value it one payment period before the first payment as an annuity-due or immediate form… | procedure | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| A payment due at the beginning of year two occurs at time 1, so a perpetuity paying every three years starting then has payments at times 1… | fact | missing |  |
| Set two present values equal at their respective interest rates and solve for the unknown payment amount, after solving the interest rate f… | procedure | elsewhere | Equation of Value: “Every cash flow must be moved to the same comparison date before comparing, each at the [[Interest …” |

</details>

<details><summary><code>fm-067</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The loan amount (principal) equals the present value of all scheduled loan payments, discounted at the loan's effective interest rate. | fact | tagged | Loan Amortization: “the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rat…” |
| The present value of an annuity-immediate with payments 1, 2, ..., n at the end of years 1 through n is (Ia)_n = (ä_n − n v^n)/i. | formula | elsewhere | Arithmetic Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |
| The present value of a level annuity-immediate of n payments of 1 is a_n = (1 − v^n)/i, and the annuity-due is ä_n = (1 − v^n)/d, where d =… | formula | elsewhere | Level Annuity: “**[[Annuity Immediate]]**: payments at the **end** of each period; PV factor $a_{\overline{n}\\|} = …” |
| To value a level annuity whose payments begin after a deferral period of k years, take the annuity's present value at time k and discount i… | procedure | tagged | Loan Amortization: “10000 &= 1000\,a_{\overline{4}\\|} + X\,v^4\,a_{\overline{4}\\|}” |

</details>

<details><summary><code>fm-068</code> · untagged</summary>

Tagged pages: Accumulated Value, Equation of Value, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at the time of the last payment of an annuity-immediate with level payments of 1 for n periods is s_angle(n) = ((1+i)… | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When the interest rate changes over time, accumulate the annuity payments to the date the rate changes using the first rate, then grow that… | procedure | tagged | Equation of Value: “Every cash flow must be moved to the same comparison date before comparing, each at the [[Interest …” |
| A target accumulated value equals the sum of the accumulated values of all deposits at the target date, so the level deposit can be found b… | fact | tagged | Accumulated Value: “$$AV = \sum_k C_{t_k} \cdot (1+i)^{t - t_k}$$” |
| A lump sum grows over n periods at annual effective rate i by the factor (1+i)^n. | formula | linked | Compound Interest: “For $n$ periods at rate $i$, $(1+i)^n$ is the **accumulation factor** — the value at time $n$ of 1 …” |

</details>

<details><summary><code>fm-069</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| A level-payment loan with n periodic payments at periodic effective rate i has payment equal to the loan amount divided by the annuity-imme… | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| A nominal annual rate convertible m times per year, j(m), corresponds to a periodic effective rate of j(m)/m per period. | definition | elsewhere | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| The outstanding loan balance immediately after a payment equals the present value of the remaining payments, discounted at the loan's inter… | fact | tagged | Outstanding Balance: “**Prospective method** (present value of future payments):” |
| To reamortize a loan at a new interest rate, treat the current outstanding balance as a new loan over the remaining number of payments (mat… | procedure | missing |  |

</details>

<details><summary><code>fm-070</code> · answerable</summary>

Tagged pages: Geometric Increasing Annuity, Annuity Due, Accumulated Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at the time of the last payment of an annuity-immediate of n level payments is the payment times s_{n\|i} = ((1+i)^n … | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| An annuity-due has payments at the beginning of each period, so payments made at the beginning of each year for n years, valued at the time… | definition | tagged | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |
| A cost growing at effective annual rate g from an initial amount C equals C(1+g)^(t-1) in the tth year (geometric growth), where year 1 is … | formula | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |
| Subtract an outflow from a fund balance at the time it occurs, then accumulate the remaining balance forward with (1+i)^t to a later date t… | procedure | tagged | Accumulated Value: “Under [[Compound Interest]] at rate $i$, $a(t) = (1+i)^t$, so $AV = PV \cdot (1+i)^t$.” |

</details>

<details><summary><code>fm-071</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible m times per year equals the effective rate per period times m, so the per-period effective rate … | definition | elsewhere | Nominal Interest Rate: “The two-way relationship with the effective annual rate $i$ is:” |
| A bond's coupon equals the coupon rate times the face (par) value per coupon period, while the redemption value is the amount paid at matur… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The price of a bond is the present value of its coupons plus the present value of the redemption value at the yield rate per period: P = Co… | formula | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| The present value of an n-period annuity-immediate of 1 per period at rate i is a_{n\|i} = (1 − v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The number of coupon periods equals the term in years times the number of coupon payments per year, and the coupon, yield, and period count… | procedure | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |

</details>

<details><summary><code>fm-072</code> · answerable</summary>

Tagged pages: Bond Price, Bonds, Callable Bond, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Convert an annual nominal rate compounded semi-annually to a per-period effective rate by dividing by 2, and compute the semi-annual coupon… | procedure | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The price of a bond is the present value of its coupons plus the present value of its redemption value at the yield rate: P = Fr·a_{n\|i} +… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A bond whose coupon rate is lower than the yield rate per period sells at a discount (price below redemption value). | fact | tagged | Bond Price: “when $Fr < Cj$ it sells at a **discount** ($P < C$)” |
| For a callable bond purchased at a discount, the investor's yield is lowest when the bond is redeemed at the latest possible date (maturity… | fact | tagged | Callable Bond: “If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified c…” |
| To guarantee at least a given yield for a callable bond regardless of call date, the maximum purchase price is the minimum of the prices (c… | procedure | tagged | Callable Bond: “To guarantee a yield of at least $j$ per period, the most the investor will pay is the **smallest**…” |
| For a bond at a discount, the price at a fixed yield decreases as the redemption date (term) increases. | fact | tagged | Callable Bond: “the price moves steadily one way (up with $m$ when $Fr > Kj$, down when $Fr < Kj$)” |

</details>

<details><summary><code>fm-073</code> · answerable</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Forward Rate, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| A spot rate s_t is the annual effective interest rate for an investment made today with a term of t years (zero-coupon yield). | definition | tagged | Spot Rate: “The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exa…” |
| The forward rate _tf_k (deferred k years, for t years) is the interest rate for an investment of length t that begins k years from now, imp… | definition | tagged | Spot Rates and Forward Rates: “the [[Forward Rate]] $f_{n,n+k}$ is the annual effective rate for an investment that starts $n$ yea…” |
| No-arbitrage relationship: (1+s_{n})^{n} = (1+s_{k})^{k} (1+ _{n-k}f_k)^{n-k}, so accumulating at the spot rate for n years equals accumula… | formula | tagged | Spot Rates and Forward Rates: “$$(1+s_n)^n\,(1+f_{n,n+k})^k = (1+s_{n+k})^{n+k}$$” |
| To find the one-year forward rate deferred k years, divide the accumulation factor (1+s_{k+1})^{k+1} by (1+s_k)^k and subtract 1. | procedure | tagged | Forward Rate: “$$f_{t, t+1} = \frac{(1+s_{t+1})^{t+1}}{(1+s_t)^t} - 1$$” |

</details>

<details><summary><code>fm-074</code> · gap</summary>

Tagged pages: Geometric Increasing Annuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a stream of payments is the sum of each payment discounted by the interest rate for the time until it is paid. | definition | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| A nominal annual rate compounded monthly, i^(12), corresponds to a monthly effective rate of i^(12)/12 and an effective annual rate of (1+i… | fact | elsewhere | Nominal Interest Rate Convertible m-thly: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| The accumulated value at the end of n periods of level payments of 1 made at the end of each period is s_{n\|i} = ((1+i)^n - 1)/i. | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| Payments that are level within each year but step up annually can be grouped into annual blocks, each valued as a single payment at year-en… | procedure | missing |  |
| The present value of a geometrically increasing annuity-immediate with first payment R, growth rate g, interest rate i and n payments is R·… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |

</details>

<details><summary><code>fm-075</code> · gap</summary>

Tagged pages: Time Value of Money, Time Value of Money Equations, Present Value, Equation of Value, Effective Rate, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate compounded m times per year corresponds to an effective rate per period of the nominal rate divided by m. | definition | linked | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| The present value of a payment of amount C due t periods from now is C(1+i)^(-t), where i is the effective rate per period. | formula | tagged | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| Set up an equation of value by equating the present value (at a common date) of the deposits to the present value of the required accumulat… | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| When cash flows occur at times t and 2t, substitute x = v^t so that the equation of value becomes a quadratic in x, then solve it with the … | procedure | missing |  |
| Solve for an unknown time by taking logarithms of (1+i)^(-n) = x, giving n = -ln(x)/ln(1+i). | procedure | tagged | Time Value of Money Equations (collapsed): “$$10000 = 5000(1.07)^n \implies (1.07)^n = 2 \implies n = \frac{\ln 2}{\ln 1.07} = \frac{0.6931}{0.…” |
| Delaying deposits reduces their accumulated value at a fixed future date, so the largest n meeting the accumulation requirement is the floo… | fact | missing |  |

</details>

<details><summary><code>fm-076</code> · answerable</summary>

Tagged pages: Nominal Discount Rate, Nominal Discount Rate Convertible m-thly, Compound Interest, Discount Rate, Effective Discount Rate, Convertible m-thly, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual discount rate d^(m) convertible m times per year means the effective discount rate per 1/m-year period is d^(m)/m. | definition | tagged | Nominal Discount Rate: “each is charged discount at the effective rate $d^{(m)}/m$, paid at the **beginning** of that period” |
| The accumulated value of an investment A over n years at nominal discount rate d^(m) convertible m times per year is A(1 - d^(m)/m)^(-mn). | formula | tagged | Nominal Discount Rate: “$$a(t) = \left(1 - \frac{d^{(m)}}{m}\right)^{-mt}$$” |
| An annual effective interest rate i equivalent to a nominal discount rate d^(m) satisfies 1+i = (1 - d^(m)/m)^(-m), since equivalent rates … | fact | tagged | Nominal Discount Rate Convertible m-thly: “$$\left(1 - \frac{d^{(m)}}{m}\right)^m = 1 - d$$” |

</details>

<details><summary><code>fm-077</code> · gap</summary>

Tagged pages: Time Value of Money, Time Value of Money Equations, Equation of Value, Effective Rate, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible m times per year, i^(m), means the effective rate per 1/m-year period is i^(m)/m. | definition | linked | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| Convert an effective rate for one period length to an equivalent effective rate for a longer period by compounding, e.g. quarterly effectiv… | procedure | tagged | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |
| Build an equation of value by choosing a comparison date and equating the present values (accumulated or discounted) of all cash flows at t… | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| Count only the level payments that occur on or before the valuation date (complete periods elapsed), so payments falling after the evaluati… | procedure | missing |  |
| The present value at time 0 of a payment P made at time t (in units of the rate's period) is P/(1+i)^t, so end-of-period level payments for… | formula | linked | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| Measure the time between two calendar dates in months and use the matching period rate (months with the monthly rate) when discounting a ba… | procedure | missing |  |

</details>

<details><summary><code>fm-078</code> · gap</summary>

Tagged pages: Accumulated Value, Yield Rate, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The annual effective yield rate over an investment period is the constant annual effective rate i for which the accumulated value of the de… | definition | elsewhere | Rate of Return: “The **rate of return** on an investment is the interest rate at which the money put in and the mone…” |
| The accumulated value at the end of n periods of an annuity-due of 1 per period at effective rate j per period is s-double-dot_{n\|j} = ((1… | formula | linked | Annuity Due: “$$= \frac{(1+i)^n - 1}{d}$$” |
| When payments are made every k years, convert the annual effective rate i to the effective rate per k-year payment period as (1+i)^k - 1 so… | procedure | elsewhere | Payment Period: “The same conversion works when payments are *less* frequent than compounding: annual payments at $6…” |
| When the interest rate changes over time, split the deposits by rate regime: accumulate each segment's annuity to the time of the rate chan… | procedure | missing |  |
| To find the yield rate for a deposit annuity with a known accumulated value, set the annuity accumulation s-double-dot_{n\|j} times the dep… | procedure | missing |  |

</details>

<details><summary><code>fm-079</code> · untagged</summary>

Tagged pages: Annuity Due, Accumulated Value, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Solve a cash-flow problem by setting the present value (or accumulated value) of deposits equal to that of withdrawals at a common time, us… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The equivalent effective monthly rate for an annual effective rate i is j = (1+i)^(1/12) - 1. | formula | elsewhere | Effective Rate (collapsed): “(The nominal monthly rate equivalent to 7% semi-annually is $12\left[(1.071225)^{1/12} - 1\right] =…” |
| The present value of an annuity-due of n payments at rate i is ä_n = (1 - v^n)/d, where d = i/(1+i) and v = 1/(1+i), valued one period befo… | formula | tagged | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| To find the value at time 0 of an annuity whose first payment occurs at a later time t, compute the annuity value at one period before the … | procedure | elsewhere | Deferred Annuity: “$${}_{k\\|}\ddot{a}_{\overline{n}\\|} = v^k \cdot \ddot{a}_{\overline{n}\\|}$$” |
| Withdrawals at the beginning of years 16 through 19 form a four-payment annuity-due whose value is at the start of year 16 (time 15); a mon… | fact | tagged | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |

</details>

<details><summary><code>fm-080</code> · gap</summary>

Tagged pages: Annuity Due, Perpetuity, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| A perpetuity-due pays at the start of each period forever, so its first payment is made at time 0 and has present value equal to the paymen… | definition | tagged | Perpetuity: “The relationship $\ddot{a}_{\overline{\infty}\\|} = 1 + a_{\overline{\infty}\\|}$ holds because the p…” |
| The present value of a perpetuity-immediate with payment 1 at effective rate i is 1/i, and the perpetuity-due equals 1/d = 1/i + 1. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| When the interest rate changes over time, value a perpetuity by splitting it at the rate change: the first segment is valued at the initial… | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| The present value of an n-year annuity-due of 1 per year at effective rate i is ä_n = (1 - v^n)/d, where d = i/(1+i) and v = 1/(1+i). | formula | tagged | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| To value an annuity under a rate change, take the annuity-due at the initial rate for the payments before the change and add the annuity-du… | procedure | missing |  |
| Two cash flow streams that are exchanged with equal present value are found by setting their present values equal and solving for the unkno… | fact | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |

</details>

<details><summary><code>fm-081</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value, Non-Callable Bond

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a bond immediately after a coupon payment is the present value of all remaining coupons plus the present value of the … | procedure | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| A nominal annual rate convertible m times per year gives an effective rate per period equal to the nominal rate divided by m, and the numbe… | fact | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| A sequence of payments that increases by a constant amount each period can be decomposed into a level annuity of the first payment plus the… | procedure | elsewhere | Increasing Annuity: “A first payment $P$ rising by $Q$ a period is a level annuity of $P - Q$ plus $Q\,(Ia)_{\overline{n…” |
| The present value of an annuity-immediate with payments 1, 2, ..., n is (Ia)_n = (ä_n − n v^n)/i, and the level annuity-immediate is a_n = … | formula | tagged | Bond Price: “$$a_{\overline{20}\\|3\%} = \frac{1 - v^{20}}{0.03} = 14.877475$$” |
| With the first coupon after the valuation date equal to the base payment and each later coupon increased by X, the k-th coupon equals the f… | fact | elsewhere | Arithmetic Increasing Annuity: “For the more general case with first payment $P$ and constant increase $Q$ per period (payments $P,…” |

</details>

<details><summary><code>fm-082</code> · untagged</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A payment stream that starts after a deferral period is valued by valuing the stream as of the start of the deferral's end point and then d… | procedure | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| An annuity whose payments start at P and increase by Q each period can be decomposed into a level annuity of (P-Q) per period plus Q times … | procedure | linked | Arithmetic Progression: “Equivalently, write each payment $P + (t-1)Q$ as $(P-Q) + Qt$: a [[Level Annuity\\|level annuity]] o…” |
| The present value of an n-period annuity-due paying 1 per period is ä_n = (1 - v^n)/d, where d = i/(1+i) = iv. | formula | linked | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| The present value of an n-period increasing annuity-due paying 1,2,...,n is (Iä)_n = (ä_n - n v^n)/d. | formula | tagged | Increasing Annuity: “$(I\ddot{a})_{\overline{n}\\|} = (\ddot{a}_{\overline{n}\\|} - nv^n)/d$” |
| A loan's amount equals the present value, at the loan's effective interest rate, of the annuity payments that repay it. | fact | elsewhere | Loan Amortization: “the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rat…” |

</details>

<details><summary><code>fm-083</code> · gap</summary>

Tagged pages: Geometric Increasing Annuity, Accumulated Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a geometrically increasing annuity-immediate with n payments, first payment P, growth rate g and effective rate i is P… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| The accumulated value at the end of n periods of a geometrically increasing annuity-immediate with first payment P is P[(1+i)^n-(1+g)^n]/(i… | formula | missing |  |
| Convert an annuity-immediate to an annuity-due by multiplying its present value by (1+i), so payments at the beginning of each year are val… | procedure | elsewhere | Annuity Due: “Because each payment is received one period earlier than in an [[Annuity Immediate\\|annuity-immedia…” |
| Solve for the unknown interest rate using the equation of value: set the accumulated value of deposits equal to the present value of withdr… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The account balance just before the first withdrawal equals the accumulated value of all prior deposits at that time, which also equals the… | fact | missing |  |

</details>

<details><summary><code>fm-084</code> · untagged</summary>

Tagged pages: Geometric Increasing Perpetuity, Geometric Increasing Annuity, Perpetuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A perpetuity-due is a perpetuity whose payments are made at the beginning of each period, so the first payment occurs at time 0. | definition | tagged | Perpetuity: “For a **perpetuity-due** (payments at the start of each period), each payment comes one period earl…” |
| A geometric series of payments has each payment equal to the previous payment multiplied by a constant ratio (1+k), found by dividing a pay… | definition | tagged | Geometric Progression: “a **geometric progression** refers to a sequence of payments where each payment is a constant multi…” |
| Set the price equal to the present value of the payments by discounting each payment at the effective interest rate per payment period (her… | procedure | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| The present value of a perpetuity-due with first payment P and payments growing geometrically by ratio r per period is P/(1 - r·v), valid w… | formula | tagged | Geometric Increasing Perpetuity: “Paid at the start of each period (a perpetuity-due, first payment now), each payment comes one peri…” |
| The annual effective rate is obtained from the discount factor over a sub-annual period by compounding: 1+i = (1+j)^m = v^(-m), where m is … | formula | elsewhere | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |

</details>

<details><summary><code>fm-085</code> · gap</summary>

Tagged pages: Continuous Annuity, Force of Interest, Present Value, Payable Continuously

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a continuous annuity paying at a constant rate of 1 per year for n years is (1 - v^n)/δ, where δ = ln(1+i). | formula | tagged | Continuous Annuity: “$$= \frac{1 - v^n}{\delta}$$” |
| The force of interest δ equals ln(1+i), where i is the annual effective interest rate. | definition | tagged | Force of Interest: “$$\delta = \ln(1+i)$$” |
| The present value of a continuous payment stream with rate f(t) is the integral of f(t)·e^{-δt} dt (equivalently f(t)·v^t dt) over the paym… | formula | tagged | Continuous Annuity: “$$\bar{a}_{\overline{n}\\|} = \int_0^n e^{-\delta t}\,dt$$” |
| To value payments that begin at a later time T, value them as of time T (shifting the time variable so it starts at 0) and discount that va… | procedure | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| A continuous perpetuity whose payment rate grows geometrically as (1+g)^s has present value 1/(δ - ln(1+g)) at its start, obtained from the… | formula | missing |  |
| For a payment stream defined piecewise in time, split the present value into separate pieces over each interval and add them. | procedure | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |

</details>

<details><summary><code>fm-086</code> · gap</summary>

Tagged pages: Force of Interest, Accumulation Function, Equation of Value, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation factor from time t1 to time t2 under a force of interest δ_t is exp(∫ from t1 to t2 of δ_t dt). | formula | elsewhere | Variable Force of Interest: “$$\frac{a(t)}{a(s)} = \exp\!\left(\int_s^t \delta(u)\,du\right)$$” |
| Under an annual effective interest rate i, a payment accumulates over n years by the factor (1+i)^n. | formula | linked | Compound Interest: “For $n$ periods at rate $i$, $(1+i)^n$ is the **accumulation factor** — the value at time $n$ of 1 …” |
| For a period with changing interest (a different rate in each period), the overall accumulation factor is the product of the accumulation f… | procedure | missing |  |
| Set up an equation of value at a chosen comparison date by accumulating or discounting all loan advances and repayments to that date and eq… | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The integral of 1/(t+1) is ln(t+1), so exp of the integral from a to b equals (b+1)/(a+1). | fact | missing |  |

</details>

<details><summary><code>fm-087</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Effective Discount Rate, Principal, Term of Loan, Drop Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| The annual effective interest rate equals i = d/(1-d), equivalently i = (1-d)^{-1} - 1, where d is the annual effective discount rate. | formula | tagged | Effective Discount Rate: “$$i = \frac{d}{1-d}$$” |
| The present value of an n-period annuity-immediate of 1 per period is a_n = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| For a deferred annuity whose first payment is at time m+1, accumulate the loan to time m (one period before the first payment) and treat it… | procedure | elsewhere | Annuity Immediate: “The present value, valued one period before the first payment, is $a_{\overline{n}\\|}$, and the acc…” |
| To find the number of level payments n, solve payment × a_n = loan balance for n; the number of full level payments is the integer part of … | procedure | tagged | Term of Loan (collapsed): “$5000 = 900\,a_{\overline{n}\\|8\%}$, so $a_{\overline{n}\\|} = 5.555556$:” |
| A drop payment is a smaller final payment made one period after the last full level payment to pay off the loan when the number of level pa… | definition | tagged | Drop Payment: “A **drop payment** is a final loan payment that is **smaller** than the regular payment, made one p…” |
| Find the drop payment by setting the present value of the level payments plus the present value of the drop payment (discounted from its pa… | procedure | elsewhere | Term of Annuity (collapsed): “Check: $1{,}500\,a_{\overline{8}\\|} + 1{,}157.82\,v^9 = 9{,}314.69 + 685.31 = 10{,}000$.” |

</details>

<details><summary><code>fm-088</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| In a level-payment amortized loan, the payment at time k equals the payment amount times a constant, and the interest portion of the paymen… | fact | tagged | Amortization: “Level payments — interest in payment $k$: $I_k = P \cdot (1 - v^{n-k+1})$ where $v = 1/(1+i)$” |
| For an n-year level-payment loan with payment P, the interest portion of the payment at time k is P(1 - v^{n-k+1}), so interest portions in… | formula | tagged | Amortization: “Level payments — interest in payment $k$: $I_k = P \cdot (1 - v^{n-k+1})$ where $v = 1/(1+i)$” |
| The present value of a payment stream with the level payment P is P·a_{angle n} = P(1 - v^n)/i, and the loan balance after time t equals P·… | formula | tagged | Outstanding Balance: “$$OB_k = P \cdot a_{\overline{n-k}\\|i}$$” |
| To find the term n from v^n, take logarithms: n = ln(v^n)/ln(v), after first solving for v from the given ratio condition. | procedure | elsewhere | Term of Annuity: “$$n = \frac{\ln(1 - i \cdot \text{PV}/P)}{\ln(1/(1+i))}$$” |

</details>

<details><summary><code>fm-089</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan, Drop Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment on a loan of amount L repaid over n periods at periodic rate i is L divided by the annuity-immediate present value factor… | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| A nominal annual rate compounded monthly, i^(12), corresponds to a monthly effective rate of i^(12)/12 and an equivalent annual effective r… | definition | elsewhere | Nominal Interest Rate: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| The outstanding loan balance equals the present value of future payments, so extra payments reduce the loan's effective starting amount by … | fact | elsewhere | Mortgage Loan: “$B_t$ is the [[Outstanding Balance\\|outstanding balance]] after $t$ payments, the [[Present Value\\|…” |
| The present value of a series of level payments made at annual intervals is the sum of each payment discounted by v^t at the annual effecti… | formula | elsewhere | Annuity Immediate: “An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period.…” |
| To find the term of a loan with level payments, solve the equation of value L = P·a_{n\|i} for n; if n is non-integer, the loan is repaid b… | procedure | tagged | Term of Loan: “If it is paid one period after the last regular payment, it is a separate payment smaller than the …” |
| Convert a count of end-of-month payment periods to a calendar date by counting forward from the first payment date, with the k-th payment o… | procedure | missing |  |

</details>

<details><summary><code>fm-090</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Effective Discount Rate, Principal, Term of Loan, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| An annual effective discount rate d converts to an annual effective interest rate by i = d/(1-d). | formula | tagged | Effective Discount Rate: “i = \frac{d}{1-d}” |
| The level end-of-year payment on a loan of amount L over n years at effective rate i is L divided by the annuity-immediate present value fa… | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| When the level payments are rounded, the final payment is found from the equation of value setting the loan amount equal to the present val… | procedure | tagged | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |
| Rounding a payment up to the next multiple of a given amount means taking the smallest multiple of that amount that is at least the compute… | procedure | missing |  |
| The present value of the first n level end-of-year payments is the payment times a_{n\|i}, and a single payment at time t is discounted by … | fact | linked | Discount Factor: “$$\text{PV} = C \cdot v^n$$” |

</details>

<details><summary><code>fm-091</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Accumulated Value, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A zero-coupon bond pays a single redemption value at maturity with no coupons, and its price is the present value of that redemption amount. | definition | linked | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |
| A zero-coupon bond bought at a price expressed as a fraction of redemption value grows to a redemption value equal to the reciprocal of tha… | fact | missing |  |
| A deposit made at the beginning of month k is invested in a bond maturing at the end of the accumulation horizon, so its term is the remain… | procedure | missing |  |
| Set up an equation of value at the target date: the sum of each level deposit times its accumulation factor equals the target accumulated a… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |

</details>

<details><summary><code>fm-092</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| For a level-payment loan with payment P and n payments, the interest paid in the first year equals P(1 - v^n), since the first-year interes… | fact | tagged | Amortization: “Level payments — interest in payment $k$: $I_k = P \cdot (1 - v^{n-k+1})$ where $v = 1/(1+i)$” |
| For an n-year level-payment loan with payment P at the end of each year, the principal repaid in year k equals P·v^(n-k+1). | formula | tagged | Loan Amortization: “With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$, so $PR_{…” |
| The present value of an n-year annuity-immediate of 1 per year is a_n = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The original loan amount equals the present value of the level payments, X = P·a_n at the loan's effective interest rate. | fact | tagged | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |
| To find the interest rate from two pieces of amortization information, divide the two expressions to eliminate the payment P, solve for v^n… | procedure | missing |  |

</details>

<details><summary><code>fm-093</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its redemption value plus the present value of its coupons: P = F v_j^n + F r a_{n\|j}, whe… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| Coupon payments per period equal the coupon rate per period times the face (redemption) value; the periodic coupon rate is the annual coupo… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| Convert an annual effective yield rate to an equivalent periodic (semiannual) effective rate by j = (1+i)^{1/2} - 1. | procedure | elsewhere | Nominal Interest Rate: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| The number of periods for a bond with semiannual coupons is twice the number of years to maturity. | definition | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| The present value of an n-period annuity-immediate at periodic rate j is a_{n\|j} = (1 - v^n)/j, with v = 1/(1+j). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |

</details>

<details><summary><code>fm-094</code> · gap</summary>

Tagged pages: Yield Rate, Bonds, Loans

| Item | Kind | Status | Where |
|---|---|---|---|
| The yield rate on an investment is the interest rate at which the present value of the investor's net cash inflows equals the amount the in… | definition | elsewhere | Rate of Return: “The **rate of return** on an investment is the interest rate at which the money put in and the mone…” |
| Compute the investor's net periodic cash flow when borrowing to invest by subtracting the interest-only loan payment from the investment in… | procedure | missing |  |
| A bond's periodic coupon equals the coupon rate times the par (face) value, with the rate per period being the nominal annual coupon rate d… | formula | linked | Coupon (collapsed): “The coupon rate per semi-annual period is $r = 6\%/2 = 3\%$.” |
| Interest on an interest-only loan each period equals the principal times the nominal annual rate divided by the compounding frequency, and … | formula | elsewhere | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| The present value of a level n-period annuity-immediate is the payment times a_{n\|j} = (1 - (1+j)^{-n})/j, and a lump sum at time n is dis… | formula | linked | Interest Rate: “$$\text{PV} = \frac{\text{FV}}{(1+i)^n}$$” |
| A periodic effective rate j per period (m periods per year) converts to an annual effective rate by i = (1+j)^m - 1. | formula | elsewhere | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |

</details>

<details><summary><code>fm-095</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a par-valued (redeemable at par) annual coupon bond with face value F, coupon rate r, and term n, price P = F·r·a_{n\|} + F·v^n, where … | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| Solve the bond price equation for the coupon rate to get r = (P/F)(1/a_{n\|}) − v^n/a_{n\|}, showing r is a linear function of 1/F when pri… | procedure | missing |  |
| When bonds share the same term, price and yield, the slope and intercept constants in the linear relation r = x(1/F) + y are the same for a… | procedure | missing |  |
| The coupon rate of a bond is the annual coupon divided by face value, so the coupon amount equals face value times coupon rate. | definition | tagged | Coupon Rate: “$$r = \frac{\text{Coupon}}{F}$$” |

</details>

<details><summary><code>fm-096</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value, Non-Callable Bond

| Item | Kind | Status | Where |
|---|---|---|---|
| An annual effective rate i is converted to an equivalent semiannual effective rate j by (1+j)^2 = 1+i, i.e. j = (1+i)^(1/2) - 1 (equivalent… | formula | elsewhere | Nominal Interest Rate: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| The price of a bond is the present value of its future coupons plus the present value of its redemption value, discounted at the yield rate. | fact | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| For coupons that grow by a constant factor (1+g) each period, with the next coupon being the previous one times (1+g), write the cash flows… | procedure | linked | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| The present value of an n-period geometric annuity-immediate with first payment P and ratio r=(1+g)v is P·(1 - r^n)/(1 - r) (the sum of a f… | formula | elsewhere | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| Immediately after a coupon payment, the bond's value excludes that coupon; the remaining semiannual coupons over the remaining term (2 per … | procedure | tagged | Market Value: “8 coupons remain: $P = 50 \cdot a_{\overline{8}\\|6\%} + 1000(1.06)^{-8} = 50(6.2098) + 627.41 = 310…” |

</details>

<details><summary><code>fm-097</code> · gap</summary>

Tagged pages: Bond Amortization, Accumulation of Discount, Bonds, Book Value, Interest, Face Value, Coupon, Coupon Rate, Term of Bond

| Item | Kind | Status | Where |
|---|---|---|---|
| For a bond with annual coupons, the book value immediately after a coupon accrues at the yield rate for one period and then drops by the co… | fact | tagged | Bond Amortization: “$$I_t = j\,B_{t-1}$$” |
| The prospective book value of a bond after t coupons equals the present value of the remaining coupons (Fr times the annuity-immediate fact… | formula | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |
| The coupon of a bond equals the face amount F times the coupon rate r (Fr), and it is paid each period independent of the yield rate. | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| To find the number of remaining periods of a bond from a known book value, substitute the known coupon, redemption value and yield into the… | procedure | missing |  |

</details>

<details><summary><code>fm-098</code> · gap</summary>

Tagged pages: Bond Amortization, Accumulation of Discount, Bonds, Book Value, Interest, Face Value, Coupon, Coupon Rate, Term of Bond

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond's coupon equals the par (face) value times the coupon rate per period, and the yield per period equals the nominal annual yield conv… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The book value after a coupon follows the recursion BV_{t+1} = BV_t(1+i) - Fr, so the change in book value over a period equals i*BV_t - Fr… | formula | tagged | Bond Amortization: “$$B_t = B_{t-1} - PR_t$$” |
| The book value of a bond at time t equals the present value of the remaining coupons and redemption value at the yield rate: BV_t = Fr*a_{n… | formula | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |
| To find the term of a bond, solve the prospective book value equation for the remaining number of periods using logarithms, then add the el… | procedure | missing |  |
| When the coupon rate is below the yield rate, the bond sells at a discount and its book value increases over time toward the redemption val… | fact | tagged | Book Value: “For a **discount bond** ($P < C$), it increases from $P$ toward $C$ (accumulation of discount).” |

</details>

<details><summary><code>fm-099</code> · answerable</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Forward Rate, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| A one-year forward rate deferred t years is the rate agreed today for borrowing/investing for one year starting at time t, implied by the s… | definition | tagged | Spot Rates and Forward Rates: “$f_{n,n+k}$ is what SOA calls the "$k$-year forward rate, deferred $n$ years" (or "starting in $n$ …” |
| The n-year spot rate is the annual yield on a zero-coupon bond maturing in n years, so that (1+s_n)^n is the accumulation factor over n yea… | definition | tagged | Spot Rate: “The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exa…” |
| The n-year spot rate equals the geometric mean of the one-year forward rates: (1+s_n)^n = (1+f_0)(1+f_1)...(1+f_{n-1}), so (1+s_n) = [(1+s_… | formula | tagged | Spot Rates and Forward Rates: “$$(1+s_t)^t = (1+f_{0,1})(1+f_{1,2})\cdots(1+f_{t-1,t})$$” |
| The one-year spot rate equals the one-year forward rate deferred 0 years (s_1 = f_0). | fact | tagged | Spot Rates and Forward Rates: “the one-year forward rate starting now is the one-year spot rate, $f_{0,1} = s_1$” |

</details>

<details><summary><code>fm-100</code> · gap</summary>

Tagged pages: Duration, Annuity Due, Present Value, Macaulay Duration

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of a cash flow stream: the sum of t times the present value of the payment at … | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| For an annuity-due paying 1 at the start of each year for n years, payments occur at times 0 through n-1, so the Macaulay duration is the s… | procedure | tagged | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |
| Given a known Macaulay duration, solve the duration equation for the discount factor v (and hence the yield rate), then reuse that same v w… | procedure | missing |  |
| The discount factor v equals 1/(1+i), where i is the effective annual yield rate, and it is used to discount each payment to the time of pu… | fact | tagged | Present Value: “future cash flows are multiplied by the discount factor $v = (1+i)^{-1}$ raised to the number of pe…” |

</details>

<details><summary><code>fm-101</code> · answerable</summary>

Tagged pages: Duration, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average of the times of the cash flows, using the weights PV of each cash flow divided by t… | definition | linked | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| Macaulay duration = sum of t*CF_t*v^t divided by sum of CF_t*v^t, where v = 1/(1+i) is the discount factor at the effective yield rate i. | formula | linked | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| Compute the present value of each cash flow by discounting it at the annual effective yield rate over its time in years using v^t. | procedure | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |

</details>

<details><summary><code>fm-102</code> · gap</summary>

Tagged pages: Duration, Perpetuity, Macaulay Duration, Modified Duration

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of a cash flow stream, equal to the sum of t times the present value of the pa… | definition | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| Modified duration equals Macaulay duration divided by (1+i), where i is the effective annual interest rate. | formula | tagged | Modified Duration: “$$= \frac{D_{Mac}}{1+j}$$” |
| The present value of a perpetuity-due paying 1 at the start of each year is the sum of v^n for n from 0, equal to 1/d = (1+i)/i. | formula | tagged | Perpetuity: “$$\ddot{a}_{\overline{\infty}\\|} = \frac{1}{d}$$” |
| The present value of an increasing perpetuity-due paying n at time n (n = 0,1,2,...), i.e. sum of n v^n, equals 1/(d i) = (1+i)/i^2. | formula | elsewhere | Increasing Annuity: “the perpetuity-due $(I\ddot{a})_{\overline{\infty}\\|} = 1/d^2$” |
| For a perpetuity-due paying 1 per year, the Macaulay duration (starting at time 0) equals 1/i, so the interest rate can be found as the rec… | fact | missing |  |

</details>

<details><summary><code>fm-103</code> · gap</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Immunization is a strategy of structuring assets relative to liabilities (e.g., matching present value and duration) so that the portfolio'… | definition | tagged | Immunization: “**Immunization** is a [[Portfolio]] management strategy that protects the value of a surplus (asset…” |
| The need for immunization does not depend on the shape or slope of the yield curve (e.g., long-term rates being lower than short-term rates… | fact | missing |  |
| Either Macaulay duration or modified duration can be used to set up an immunization strategy by matching asset duration to liability durati… | fact | tagged | Redington Immunization: “asset and liability [[Macaulay Duration\\|Macaulay durations]] are equal (equivalently their [[Modif…” |
| Redington immunization (matching present values and durations of assets and liabilities) protects only against small interest rate changes … | fact | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date, wh…” |

</details>

<details><summary><code>fm-104</code> · gap</summary>

Tagged pages: Immunization, Duration, Net Present Value, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization requires that the present value of assets equals the present value of liabilities, that the first derivatives of ass… | definition | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| To find unknown asset cash flows, define the net present value function P(i) as assets minus liabilities and solve P(i0)=0 and P'(i0)=0 sim… | procedure | missing |  |
| The present value of a cash flow C at time t is C(1+i)^(-t), whose first derivative with respect to i is -tC(1+i)^(-t-1) and second derivat… | formula | linked | Convexity: “For a single cash flow at time $t$, $C_{Mac} = t^2$ and $C_{Mod} = t(t+1)/(1+j)^2$” |
| If the second derivative of the asset-minus-liability present value at the valuation rate is negative (a local maximum rather than minimum)… | fact | missing |  |

</details>

<details><summary><code>fm-105</code> · gap</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Full Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Full immunization is a matching strategy in which the present value of assets equals the present value of liabilities and the asset and lia… | definition | tagged | Full Immunization: “**Full immunization** protects an [[Asset-Liability Portfolio\\|asset-liability position]] against *…” |
| Full immunization requires that the present value of assets equals the present value of liabilities, that the first derivatives of those pr… | fact | tagged | Full Immunization: “1. $PV(\text{assets}) = PV(\text{liability})$ at the current rate $i$ 2. The [[Duration]] of the as…” |
| Set up the net present value function P(i) = PV(assets) − PV(liabilities) at a chosen valuation time, with each cash flow C at time t contr… | procedure | tagged | Asset-Liability Portfolio: “S(i) = \sum_{t} v^t \left(A_t - L_t\right) = PV_A(i) - PV_L(i)” |
| The derivative with respect to (1+i) of a cash flow term C(1+i)^k is k·C(1+i)^(k−1), used to obtain the slope condition P'(i)=0. | formula | missing |  |
| Solve the two immunization equations simultaneously for the unknown time and the unknown cash flow amount: solve the PV-equality equation f… | procedure | tagged | Full Immunization: “Dividing through by $v^T$ reduces them to $A(1+i)^{a} + B(1+i)^{-b} = L$ and $a\,A(1+i)^{a} = b\,B(…” |

</details>

<details><summary><code>fm-106</code> · untagged</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization requires that the present value of assets equal the present value of liabilities, the duration of assets equal the d… | fact | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| The present value of a set of cash flows is the sum of each payment discounted at the effective interest rate, i.e. the sum of CF_t/(1+i)^t. | formula | elsewhere | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| Macaulay duration of a cash flow stream is the present-value-weighted average of payment times: sum of t*PV_t divided by total PV. | formula | linked | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| Convexity of a cash flow stream is the sum of t^2*PV_t divided by total PV (using Macaulay-style convexity), i.e. the present-value-weighte… | formula | tagged | Convexity: “**Macaulay convexity** is the present-value-weighted average of the *squared* times of the cash flo…” |
| A zero-coupon bond has Macaulay duration equal to its term and convexity equal to the square of its term. | fact | tagged | Convexity: “For a single cash flow at time $t$, $C_{Mac} = t^2$ and $C_{Mod} = t(t+1)/(1+j)^2$” |
| The duration and convexity of a portfolio are the price-weighted (present-value-weighted) averages of the durations and convexities of its … | procedure | tagged | Portfolio: “- **[[Duration]] of a portfolio**: the weighted average of individual asset durations, weighted by …” |

</details>

<details><summary><code>fm-108</code> · answerable</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization against small changes in yield requires that the present value of assets equals the present value of liabilities, th… | fact | tagged | Immunization: “1. $PV(assets) = PV(liabilities)$ 2. $D_{Mac}(assets) = D_{Mac}(liabilities)$ ([[Duration Matching]…” |
| For a portfolio of zero-coupon bonds, the Macaulay duration is the present-value-weighted average of the maturities: sum(t_i * PV_i) / sum(… | formula | linked | Macaulay Duration: “$$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$” |
| For a portfolio of zero-coupon bonds, the Macaulay convexity is the present-value-weighted average of the squared maturities: sum(t_i^2 * P… | formula | tagged | Convexity: “**Macaulay convexity** is the present-value-weighted average of the *squared* times of the cash flo…” |
| To find the amounts invested in two zero-coupon bonds that match a target present value and duration, set up the two equations (amounts sum… | procedure | tagged | Redington Immunization (collapsed): “$$X v^2 + Y v^6 = 10{,}000 v^4$$” |
| A portfolio's duration is a weighted average of its bonds' maturities, so matching a target duration requires at least one maturity longer … | fact | tagged | Portfolio: “the weighted average of individual asset durations, weighted by market values” |

</details>

<details><summary><code>fm-109</code> · gap</summary>

Tagged pages: Immunization, Bonds, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| To guarantee future liabilities, construct an asset portfolio whose cash flows match the liability cash flows at each time (cash-flow match… | procedure | tagged | Cash Flow Matching: “**Cash flow matching** (also called **dedication**) is a portfolio strategy in which asset cash flo…” |
| A deposit accumulating at annual effective rate i for n years grows to the deposit times (1+i)^n. | formula | elsewhere | Compound Interest: “An investment of $P$ at effective annual rate $i$ grows to:” |
| A bond selling at par with coupon rate c pays coupons of c times face at each period and pays face plus the final coupon at maturity. | fact | tagged | Cash Flow Matching (collapsed): “the 2-year bond pays its face $F$ plus a coupon of $0.05F$ at time 2” |
| The price of a zero-coupon bond with face F, yield i and term n is F/(1+i)^n; a par bond's price equals its face amount. | formula | tagged | Asset-Liability Portfolio: “$$50{,}000(1.05)^{-4} = 41{,}135.12$$” |
| Express the total cost of the portfolio as a function of one bond's face amount using the matching constraints, and minimize it by taking t… | procedure | missing |  |
| Profit is the initial deposit minus the cost of the matching portfolio. | fact | missing |  |

</details>

<details><summary><code>fm-110</code> · answerable</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| Exact cash-flow matching of liabilities means choosing assets whose cash inflows equal the liability amounts at the same times, and the cos… | procedure | tagged | Asset-Liability Portfolio: “**[[Cash Flow Matching]]** (dedication): choose assets whose cash flow on each date exactly equals …” |
| To minimize the cost of matching a given liability, use the asset with the highest yield, since a higher yield means a lower price for the … | fact | linked | Yield Rate: “Bond prices and yields move in opposite directions: if the yield rises, the price falls, and vice v…” |
| A bond bought at par has a yield to maturity equal to its coupon rate. | fact | linked | Coupon Rate: “When the coupon rate equals the yield rate ($r = j$ for $F = C$), the bond prices at par.” |
| A one-year par bond with annual coupon rate c pays 1+c per unit of par at time 1, so the par amount needed to match a time-1 liability L is… | fact | tagged | Cash Flow Matching (collapsed): “the 2-year bond pays its face $F$ plus a coupon of $0.05F$ at time 2, so” |
| The price of an n-year zero-coupon bond paying amount F at time n with annual effective yield i is F/(1+i)^n. | formula | tagged | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |
| A coupon bond with an intermediate coupon cannot exactly match a single time-2 liability without also producing a time-1 cash flow, so a ze… | fact | tagged | Cash Flow Matching: “A coupon bond bought for a later liability also pays coupons on the earlier dates, so those coupons…” |

</details>

<details><summary><code>fm-111</code> · gap</summary>

Tagged pages: Perpetuity, Present Value, Level Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-period annuity-immediate paying 1 per period at effective rate i is a_angle(n) = (1 - v^n)/i, where v = 1/(1+i). | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The present value of a perpetuity-immediate paying 1 per period at effective rate i is 1/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| A perpetuity whose first payment is made at time n+1 (deferred n periods) has present value equal to the perpetuity value 1/i discounted by… | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| Interest paid on a principal at the end of each year at effective annual rate i equals principal times i, giving a level annual payment. | fact | elsewhere | Interest Rate: “The **interest rate** (or rate of interest) $i$ is the amount of interest earned per unit of princi…” |
| To solve for an unknown number of periods in an equation involving v^n, isolate the discount factor (1+i)^(-n) and take logarithms of both … | procedure | missing |  |

</details>

<details><summary><code>fm-112</code> · answerable</summary>

Tagged pages: Force of Interest, Simple Interest, Accumulated Value, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The force of interest at time t is delta_t = A'(t)/A(t), the derivative of the accumulation function divided by the accumulation function (… | definition | tagged | Force of Interest: “The force of interest equals the instantaneous rate of change of $\ln a(t)$: $\delta(t) = a'(t)/a(t…” |
| For an account earning a constant annual effective rate i, the force of interest is constant and equals ln(1+i). | fact | tagged | Force of Interest: “$$\delta = \ln(1+i)$$” |
| Under simple interest at annual rate y, the accumulation function is a(t) = 1 + y t, so the accumulated value of a deposit P after t years … | formula | tagged | Simple Interest: “The [[Accumulation Function]] under simple interest is $a(t) = 1 + it$.” |
| Under simple interest the force of interest is y/(1+y t), which decreases over time, where t is measured from the deposit date. | fact | tagged | Force of Interest: “The force of interest equals the instantaneous rate of change of $\ln a(t)$: $\delta(t) = a'(t)/a(t…” |
| When an account starts at a later date, measure elapsed time from that deposit date (t - deposit time) when evaluating its accumulation fun… | procedure | tagged | Simple Interest: “When a question specifies simple interest, SOA measures $t$ from the moment each cash flow occurs, …” |

</details>

<details><summary><code>fm-113</code> · untagged</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Perpetuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a standard increasing perpetuity-immediate with payments 1, 2, 3, ... at times 1, 2, 3, ... is (Ia)_∞ = 1/(i·d) = 1/(i… | formula | tagged | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| To value a deferred cash flow stream, take the present value of the equivalent non-deferred stream at the earlier time and discount it by v… | procedure | linked | Deferred Annuity: “${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$” |
| The effective discount rate satisfies d = i/(1+i) = iv, so d = vi. | fact | elsewhere | Effective Discount Rate: “d = \frac{i}{1+i}” |

</details>

<details><summary><code>fm-114</code> · untagged</summary>

Tagged pages: Annuity Due, Present Value, Accumulated Value, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalent effective monthly rate for an annual effective rate i is j = (1+i)^(1/12) - 1. | formula | elsewhere | Payment Period: “$$j = (1+i)^{1/m} - 1$$” |
| The accumulated value at the end of n periods of level payments of 1 made at the end of each period is s_angle(n) = ((1+i)^n - 1)/i. | formula | tagged | Level Payment Annuity: “$$= P \cdot \frac{(1+i)^n - 1}{i}$$” |
| The accumulated value at the end of n periods of level payments of 1 made at the beginning of each period is s-double-dot_angle(n) = ((1+i)… | formula | tagged | Annuity Due: “$$= \frac{(1+i)^n - 1}{d}$$” |
| Set up an equation of value by equating the accumulated (or present) value of all deposits to that of all withdrawals at a common compariso… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| Payments on a different frequency can be handled by using an annuity at the rate matching each payment frequency (monthly deposits at the m… | procedure | elsewhere | Payment Period: “Every annuity factor is computed per payment period, so $i$ must be the effective rate for that int…” |
| A deferred annuity's present value equals the annuity value at the start of its payments discounted back over the deferral period; e.g., wi… | fact | linked | Deferred Annuity: “$v = (1+i)^{-1}$ discounts the annuity-immediate value back over the $k$-period deferral.” |

</details>

<details><summary><code>fm-115</code> · gap</summary>

Tagged pages: Continuous Annuity, Force of Interest, Accumulated Value, Payable Continuously

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-year continuous annuity of 1 per year is a-bar_n = (1 - e^{-δn})/δ = (1 - v^n)/δ, where δ is the force of interes… | formula | tagged | Continuous Annuity: “Equivalent forms: $\bar{a}_{\overline{n}\\|} = \dfrac{1 - e^{-\delta n}}{\delta}$ and $\bar{s}_{\ove…” |
| The accumulated value of an n-year continuous annuity of 1 per year is s-bar_n = (e^{δn} - 1)/δ = ((1+i)^n - 1)/δ. | formula | tagged | Continuous Annuity: “Equivalent forms: $\bar{a}_{\overline{n}\\|} = \dfrac{1 - e^{-\delta n}}{\delta}$ and $\bar{s}_{\ove…” |
| To solve for an unknown interest rate from an annuity equation, substitute X = e^{-kδ} (a power of the discount factor) so that e^{-2kδ} = … | procedure | missing |  |
| The force of interest δ is related to the discount factor by e^{-δ} = v = 1/(1+i), so δ = ln(1+i), and e^{-kδ} = a given value can be solve… | fact | tagged | Continuous Annuity: “Here $v = e^{-\delta}$ is the annual discount factor and $\delta = \ln(1+i)$ links the force of int…” |

</details>

<details><summary><code>fm-116</code> · gap</summary>

Tagged pages: Annuities, Level Annuity, Present Value, Annuity Immediate, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an annuity with level payments is the sum of each payment discounted by v raised to its payment time, so payments at t… | procedure | linked | Non-level Annuities: “Any non-level cash flow stream can be valued by discounting each payment individually:” |
| The sum of a finite geometric series with first term a, ratio r and n terms is a(1 - r^n)/(1 - r). | formula | missing |  |
| The present value of an n-period annuity-immediate with payments of 1 is a_angle(n) = (1 - v^n)/i, where v = 1/(1+i). | definition | tagged | Annuity Immediate: “The present value, valued one period before the first payment, is $a_{\overline{n}\\|}$, and the acc…” |
| The quantity 1 - v^m equals i times a_angle(m), so differences of 1 - v^m terms and ratios such as (1 - v^m)/(1 - v^k) can be expressed as … | fact | tagged | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |

</details>

<details><summary><code>fm-117</code> · gap</summary>

Tagged pages: Annuities, Level Annuity, Accumulated Value, Perpetuity, Annuity Immediate, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at the end of n periods of an n-period annuity-immediate paying 1 per period is s_angle(n) = ((1+i)^n - 1)/i. | formula | tagged | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| The present value of a perpetuity-immediate paying 1 at the end of each period is 1/i, where i is the effective rate per period. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| For payments made every n years (not every year), find the present value of the perpetuity-immediate by using the effective rate per n-year… | procedure | missing |  |
| To solve for an unknown quantity defined by two equivalent expressions, set the expressions equal and solve for the common term (here (1+i)… | procedure | missing |  |

</details>

<details><summary><code>fm-118</code> · untagged</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible m times per year, j(m), corresponds to an effective rate per period of j(m)/m, so 12% convertibl… | fact | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| A payment stream that starts at P at the end of the first period and increases by P each period (P, 2P, ..., nP) is valued as P times the i… | procedure | tagged | Arithmetic Increasing Annuity: “Factor out 100: $PV = 100\cdot(Ia)_{\overline{5}\\|0.06}$.” |
| The present value of an increasing annuity-immediate is (Ia)_{n\|i} = (ä_{n\|} − n v^n) / i. | formula | tagged | Arithmetic Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |
| The annuity-due present value is ä_{n\|} = (1 − v^n)/d, where d = i/(1+i) and v = 1/(1+i); the number of payments equals the term in years … | definition | linked | Annuity Due: “$$= \frac{1-v^n}{d}$$” |

</details>

<details><summary><code>fm-119</code> · untagged</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Perpetuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A perpetuity-due makes payments at the beginning of each period forever, so the first payment is made at time 0 and is not discounted. | definition | tagged | Perpetuity: “The relationship $\ddot{a}_{\overline{\infty}\\|} = 1 + a_{\overline{\infty}\\|}$ holds because the p…” |
| The present value of a level perpetuity-immediate of 1 per period at periodic effective rate j is a_angle-infinity = 1/j. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The present value of an infinite increasing perpetuity-immediate paying 1, 2, 3, ... at the end of each period is (Ia)_angle-infinity = 1/j… | formula | tagged | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| Decompose a payment stream with a level part and an arithmetic increase into a level annuity plus an increasing annuity of the increments, … | procedure | linked | Arithmetic Progression: “Equivalently, write each payment $P + (t-1)Q$ as $(P-Q) + Qt$: a [[Level Annuity\\|level annuity]] o…” |
| When payments occur more often than annually, work with the effective rate per payment period j and convert to the annual effective rate by… | procedure | elsewhere | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |

</details>

<details><summary><code>fm-120</code> · answerable</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Perpetuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| Decompose a payment stream that increases by a constant amount each period into a level payment stream plus an increasing stream, i.e. writ… | procedure | tagged | Increasing Annuity: “A first payment $P$ rising by $Q$ a period is a level annuity of $P - Q$ plus $Q\,(Ia)_{\overline{n…” |
| The present value of a perpetuity-immediate paying 1 per year at effective annual rate i is 1/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The present value of an increasing perpetuity-immediate paying k at time k (payments 1, 2, 3, ...) is (Ia) at infinity = (1+i)/i^2 = 1/(i·d… | formula | tagged | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| Present value is linear: the present value of a stream that is a multiple of a base stream plus another stream equals the same combination … | fact | tagged | Arithmetic Increasing Annuity (collapsed): “Factor out 100: $PV = 100\cdot(Ia)_{\overline{5}\\|0.06}$.” |

</details>

<details><summary><code>fm-121</code> · gap</summary>

Tagged pages: Net Present Value, Present Value, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| The net present value of a project is the present value of income minus the present value of investments (outflows); setting NPV to zero eq… | procedure | tagged | Net Present Value: “$$= PV(\text{inflows}) - PV(\text{outflows})$$” |
| The present value of a perpetuity-immediate paying 1 per period at the end of each period is a_infinity = 1/i. | formula | elsewhere | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| Investments made at the beginning of each year are discounted by v^t with t = 0 for the immediate investment, t = 1 for the next year's, an… | procedure | elsewhere | Geometric Increasing Perpetuity: “Paid at the start of each period (a perpetuity-due, first payment now), each payment comes one peri…” |
| The sum of a finite geometric series with first term 1, ratio r and n+1 terms is (1 - r^(n+1))/(1 - r). | formula | missing |  |
| When 1+i = (1+g)^2, the ratio (1+g)/(1+i) equals 1/(1+g), so a growing annuity with growth rate g reduces to a level annuity-due-type sum d… | fact | missing |  |

</details>

<details><summary><code>fm-122</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Perpetuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A annuity-due (perpetuity-due) makes payments at the start of each period, so the k-th payment is made at time k-1. | definition | tagged | Perpetuity: “For a **perpetuity-due** (payments at the start of each period), each payment comes one period earl…” |
| The present value of an n-year level annuity-due of 1 per year is ä_n = (1 - v^n)/d, where d = i/(1+i) and v = 1/(1+i). | formula | elsewhere | Annuity Due: “Here $d = i/(1+i)$ is the effective annual [[Discount Rate]].” |
| For a payment stream that changes geometrically after a delay, split it into the level portion and the geometric portion, value each separa… | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| The present value of a geometric series of payments is the first term divided by (1 - ratio), where the ratio is (1+g)v for payments growin… | formula | elsewhere | Geometric Increasing Perpetuity: “Paid at the end of each period, with the first payment one period from now, its present value at an…” |

</details>

<details><summary><code>fm-123</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Perpetuity, Force of Interest, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-immediate whose first payment is P and whose payments change by a constant factor r each period is PV = P… | formula | elsewhere | Geometric Increasing Perpetuity: “$$PV = \frac{1}{i-g}$$” |
| A payment that decreases by a given percentage each year forms a geometric sequence with ratio r = 1 minus that percentage, so the payment … | procedure | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |
| With a constant force of interest δ, the annual discount factor is v = e^(−δ), since the accumulation factor over one year is e^δ. | fact | tagged | Force of Interest: “$$a(t) = e^{\delta t}$$” |
| To find the first payment of a perpetuity from its price, set the price equal to the present value expressed as a multiple of the first pay… | procedure | elsewhere | Level Payment Annuity (collapsed): “20{,}000 &= P \cdot a_{\overline{5}\\|5\%}” |

</details>

<details><summary><code>fm-124</code> · untagged</summary>

Tagged pages: Net Present Value, Present Value, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| The net present value (NPV) of a project is the present value of its cash inflows and outflows discounted at the given effective interest r… | definition | tagged | Net Present Value: “The **net present value** (NPV) is the sum of the present values of all cash flows associated with …” |
| The present value of a cash flow C received at time t at effective annual rate i is C·v^t, where v = 1/(1+i). | formula | tagged | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |
| Under the NPV criterion, an investment is accepted only if its NPV at the given interest rate is positive, and projects with negative NPV a… | fact | tagged | Net Present Value: “A positive NPV means the investment creates value at rate $i$ — the inflows more than compensate fo…” |
| When projects are independent and any subset may be chosen (subject to a limit on the number), the best selection consists of those project… | fact | elsewhere | Capital Budgeting: “The governing rule is to accept the projects whose [[Net Present Value\\|net present value]], discou…” |
| Compare two projects by taking the difference of their cash flows and discounting only those differing flows, to determine which has the hi… | procedure | elsewhere | Capital Budgeting (collapsed): “\text{NPV}_{B-A} &= 850{,}000(2.486852) - 2{,}000{,}000” |

</details>

<details><summary><code>fm-125</code> · answerable</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The interest due in a period on a loan equals the effective interest rate times the outstanding balance at the beginning of the period. | fact | tagged | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |
| When a loan payment equals the interest due, no principal is repaid and the outstanding balance stays unchanged. | fact | tagged | Loan Amortization: “A payment equal to the interest due repays no principal and leaves the balance unchanged; a smaller…” |
| When each payment is a fixed multiple of the interest due, the principal repaid is payment minus interest, so the balance is multiplied by … | procedure | tagged | Loan Amortization: “$$PR_k = K_k - I_k = B_{k-1} - B_k$$” |
| The outstanding balance of a loan at any time equals the present value of the remaining payments at the loan interest rate (prospective met… | fact | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| The present value of an n-period level annuity-immediate is a_angle_n = (1 - v^n)/i, so a level payment that repays balance B over n years … | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |

</details>

<details><summary><code>fm-126</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan, Balloon Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-payment annuity-immediate of 1 at effective rate i is a_angle(n) = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| A deferred annuity whose first payment is at time k+1 has present value equal to v^k times the annuity-immediate value, so payments startin… | procedure | elsewhere | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| A loan's principal equals the present value, at the loan rate, of all its repayments (equation of value at time 0). | fact | tagged | Loan Amortization: “the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rat…” |
| To find the number of level payments, solve the annuity present value equation for n; a non-integer n means the number of full level paymen… | procedure | tagged | Term of Loan: “When the term is not an integer, the regular payments cannot repay the loan exactly, and the [[Fina…” |
| The balloon payment is found by subtracting the present value of the regular payments from the loan amount and accumulating (dividing by v^… | procedure | tagged | Balloon Payment: “Either way, the balloon payment is the [[Outstanding Balance]] just after the previous payment, acc…” |

</details>

<details><summary><code>fm-127</code> · untagged</summary>

Tagged pages: Loan Repayment Comparison, Loans, Amortization, Interest Rate, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The loan amount equals the present value of the level payments (equation of value at time 0), so the payment is the loan amount divided by … | procedure | tagged | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |
| The present value of an n-year annuity-immediate at effective rate i is a_{n\|i} = (1 - (1+i)^{-n}) / i. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| When the interest rate changes over time, split the payments into periods by rate: value the first-period payments at the first rate, and v… | procedure | linked | Loan Amortization (collapsed): “10000 &= 1000\,a_{\overline{4}\\|} + X\,v^4\,a_{\overline{4}\\|}” |
| Discounting a value over n years at effective annual rate i multiplies it by the discount factor v^n = (1+i)^{-n}. | formula | linked | Compound Interest: “$v^n = (1+i)^{-n}$ is the present value of 1 due in $n$ periods” |

</details>

<details><summary><code>fm-128</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| In each payment of a level-rate loan, the interest portion equals the interest rate times the outstanding balance at the start of the perio… | fact | linked | Interest: “where $i$ is the periodic [[Interest Rate]] and $B_{t-1}$ is the [[Outstanding Balance]] at the sta…” |
| The outstanding balance after a payment equals the prior balance times (1+i) minus the payment: B_t = B_{t-1}(1+i) - P. | formula | tagged | Loan Amortization: “$$B_k = B_{k-1}(1+i) - K_k$$” |
| The prospective method sets the loan amount (or outstanding balance) equal to the present value of the remaining payments, with a varying p… | procedure | tagged | Loan Amortization (collapsed): “The loan is the present value of the payments, with $a_{\overline{4}\\|5\%} = 3.545951$ and $v^4 a_{…” |
| The present value of an n-year annuity-immediate with payment 1 is a_n = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| Powers of the discount factor are related by v^16 = (v^8)^2, so an equation in v^8 and v^16 becomes a quadratic in v^8 that can be solved w… | fact | missing |  |
| To evaluate a balance from v^n, recover i from v^n = (1+i)^{-n} by taking the n-th root, then compute the annuity value. | procedure | linked | Interest Rate (collapsed): “$$6802.44 = 5000(1+i)^5 \implies (1+i)^5 = 1.36049 \implies i = 1.36049^{1/5} - 1 = 0.0635 = 6.35\%…” |

</details>

<details><summary><code>fm-129</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan, Drop Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| In a level-payment loan, each payment equals interest on the outstanding balance plus principal repaid, so the principal portion equals the… | fact | tagged | Loan Amortization: “$$PR_k = K_k - I_k = B_{k-1} - B_k$$” |
| With level payments, the principal portions grow geometrically, so the difference between consecutive principal portions equals the periodi… | fact | tagged | Loan Amortization: “With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$, so $PR_{…” |
| The present value of a level payment annuity-immediate is the payment times a_{n\|i} = (1 - v^n)/i, and the loan amount equals the present … | formula | tagged | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |
| A drop payment is a final smaller payment made one period after the last full level payment when the loan balance is not exactly paid off b… | definition | tagged | Drop Payment: “A **drop payment** is a final loan payment that is **smaller** than the regular payment, made one p…” |
| To find the number of full level payments, solve the annuity equation for a non-integer n and take the integer part (round down); the drop … | procedure | tagged | Drop Payment: “$n$ is the number of full payments (the integer part of the term)” |
| The drop payment is found from an equation of value: loan amount equals the present value of the full level payments plus the drop payment … | procedure | tagged | Drop Payment: “$$\text{Drop Payment} = B_n(1+i)$$” |
| A nominal annual rate compounded monthly corresponds to an effective monthly rate equal to the nominal rate divided by 12. | fact | elsewhere | Mortgage Loan: “$i$ the monthly rate (the annual contract rate divided by 12)” |

</details>

<details><summary><code>fm-130</code> · gap</summary>

Tagged pages: Accumulated Value, Compound Interest, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible monthly, i^(12), corresponds to an effective monthly rate of i^(12)/12. | definition | elsewhere | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| The accumulated value at the time of the last payment of a level annuity-immediate of n payments is s_{n\|i} = ((1+i)^n - 1)/i. | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When the interest rate changes over time, split the timeline at the rate change: accumulate the earlier payments to the change date at the … | procedure | missing |  |
| Payments made after the rate change are accumulated separately as their own annuity at the new rate, and the two accumulated values are add… | procedure | missing |  |
| With no repayments, the loan balance equals the accumulated value of all borrowed amounts, including the final amount received at that time… | fact | missing |  |

</details>

<details><summary><code>fm-131</code> · answerable</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| In a level-payment amortized loan, the principal repaid in each payment grows geometrically by a factor of (1+j) per period, where j is the… | fact | tagged | Loan Amortization: “With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$, so $PR_{…” |
| For a level-payment loan of n payments with payment P, the principal repaid in payment k equals P·v^(n-k+1), where v is the discount factor… | formula | tagged | Amortization: “Principal in payment $k$: $PR_k = P \cdot v^{n-k+1}$” |
| Convert an annual effective interest rate to an equivalent effective rate per month by taking the twelfth root: j = (1+i)^(1/12) - 1. | procedure | linked | Payment Period: “$$j = (1+i)^{1/m} - 1$$” |
| To find principal repaid at payment t from the principal repaid at payment s, multiply by (1+j)^(t-s). | procedure | linked | Amortization Schedule: “The principal portions form a geometric sequence: $PR_k = PR_1 \cdot (1+i)^{k-1}$.” |

</details>

<details><summary><code>fm-132</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The interest portion of a level-period loan payment equals the effective rate times the outstanding loan balance immediately after the prev… | fact | tagged | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |
| Compute the outstanding balance at time k by the prospective method: the present value at time k of all remaining future payments, discount… | procedure | tagged | Outstanding Balance: “**Prospective method** (present value of future payments):” |
| The present value of an n-year annuity-immediate of 1 per year is a_{n\|} = (1 - v^n)/i, where v = 1/(1+i); hence i·a_{n\|} = 1 - v^n. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| Split a payment stream with a changing level into a base level annuity plus an additional annuity covering only the period of the extra amo… | procedure | tagged | Loan Amortization (collapsed): “10000 &= 1000\,a_{\overline{4}\\|} + X\,v^4\,a_{\overline{4}\\|}” |

</details>

<details><summary><code>fm-133</code> · answerable</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan, Drop Payment, Final Payment, Refinancing

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate compounded monthly corresponds to an effective monthly rate equal to the nominal rate divided by 12. | definition | linked | Payment Period: “When $k = m$ the conversion is trivial: $j = i^{(m)}/m$.” |
| The level payment on a loan of amount L repaid over n periods at periodic rate j is L divided by the annuity-immediate present value factor… | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The outstanding loan balance immediately after a payment equals the present value, at the loan rate, of the remaining future payments (pros… | fact | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| On refinancing, the new loan amount equals the outstanding balance, and the new payment stream is valued at the new interest rate to find t… | procedure | tagged | Refinancing: “The new loan's principal is the old loan's [[Outstanding Balance\\|outstanding balance]] at the refi…” |
| To find the number of payments n when the loan amount, payment and rate are known, solve L = P·a_{n\|j} for n using logarithms: n = -ln(1 -… | procedure | tagged | Term of Loan (collapsed): “n &= \frac{-\ln(1 - 0.08 \times 5.555556)}{\ln 1.08} \\” |
| When the computed number of payments is not an integer, the loan is repaid by floor(n) full payments plus one smaller final (drop) payment … | fact | tagged | Drop Payment: “A **drop payment** is a final loan payment that is **smaller** than the regular payment, made one p…” |
| With payments at the end of each month, the k-th payment falls k months after the date the loan or refinancing started, which gives the dat… | procedure | tagged | Drop Payment: “A **drop payment** is a final loan payment that is **smaller** than the regular payment, made one p…” |

</details>

<details><summary><code>fm-134</code> · untagged</summary>

Tagged pages: Loan Repayment Comparison, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-year level annuity-immediate of 1 per year at effective rate i is a_{n\|i} = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The outstanding loan balance at any time equals the present value of the remaining payments at the loan's effective interest rate (prospect… | fact | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| After a payment at time k on an n-year loan with level payments, the number of remaining payments is n minus k. | fact | tagged | Outstanding Balance: “$$OB_k = P \cdot a_{\overline{n-k}\\|i}$$” |
| An extra (additional) payment made at the time of a regular payment reduces the outstanding balance by the amount of the extra payment, dol… | procedure | linked | Loan Amortization: “$$B_k = B_{k-1}(1+i) - K_k$$” |
| To find a revised level payment over a new term, divide the new outstanding balance by the annuity-immediate factor for the new number of p… | procedure | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |

</details>

<details><summary><code>fm-135</code> · answerable</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value, Callable Bond

| Item | Kind | Status | Where |
|---|---|---|---|
| To guarantee at least a given yield for a callable bond, the buyer should price the bond at the minimum of the present values over all poss… | fact | tagged | Callable Bond: “To guarantee a yield of at least $j$ per period, the most the investor will pay is the **smallest**…” |
| The modified coupon rate is the coupon Fr divided by the redemption value C, and it is compared with the yield rate per period to judge whe… | definition | tagged | Face Value: “otherwise compare the yield with the modified coupon rate $g = Fr/C$.” |
| If the modified coupon rate exceeds the yield rate per period, the bond sells at a premium, so the earliest redemption date gives the lowes… | fact | tagged | Callable Bond: “If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified c…” |
| The price of a bond redeemed after n periods is P = Fr·a_{n\|j} + C·v^n, where Fr is the coupon, C the redemption value, and j the yield ra… | formula | tagged | Bond Price: “Here $F$ is the face value, $r$ is the coupon rate per period (so $Fr$ is the periodic coupon amoun…” |
| Convert a nominal annual yield convertible semiannually to a semiannual effective rate by dividing by 2, and compute the semiannual coupon … | procedure | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |

</details>

<details><summary><code>fm-136</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value, Callable Bond

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond with annual coupons equals the present value of its coupons plus the present value of its redemption value at the yield… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A bond whose coupon rate exceeds the yield rate and that is redeemed at par sells at a premium (price above par). | fact | tagged | Bond Price: “When $Fr > Cj$ the bond sells at a **premium** ($P > C$)” |
| For a callable premium bond, the worst case for the buyer is the earliest call date, because the premium is amortized over the shortest per… | fact | tagged | Callable Bond: “If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified c…” |
| The maximum price guaranteeing at least a given yield on a callable bond is the minimum of the prices computed assuming redemption at each … | procedure | tagged | Callable Bond: “To guarantee a yield of at least $j$ per period, the most the investor will pay is the **smallest**…” |
| A bond callable at par on any of the last k coupon dates can be redeemed at times n-k+1 through n, so the earliest call date is n-k+1. | definition | missing |  |
| The annual coupon equals the coupon rate times the par (face) value, and the annuity-immediate factor is a_{n\|i} = (1 - v^n)/i with v = 1/… | formula | tagged | Coupon: “$$\text{Coupon} = Fr$$” |

</details>

<details><summary><code>fm-137</code> · gap</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Bonds, Future Value, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| A zero-coupon bond pays a single lump sum at maturity and no interim coupons, so its maturity value equals the purchase price accumulated a… | definition | missing |  |
| The accumulated value of an investment P at annual effective rate i after n years is P(1+i)^n. | formula | tagged | Future Value: “$$\text{FV} = \text{PV} \cdot (1+i)^n$$” |
| When proceeds from a maturing bond are reinvested at a new yield rate, accumulate them at the new rate for the new term, chaining accumulat… | procedure | missing |  |
| The price of a zero-coupon bond before maturity to yield rate j to the buyer is the maturity value discounted at j for the remaining time: … | formula | linked | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| The maturity value of a bond purchased earlier is found from the original yield rate over the full original term, and a seller's sale price… | procedure | linked | Compound Interest: “$$A(t) = P(1+i)^t$$” |
| The gain on an investment is the total proceeds (maturity value plus sale price) minus the initial amount invested. | definition | missing |  |

</details>

<details><summary><code>fm-138</code> · untagged</summary>

Tagged pages: Bond Amortization, Amortization of Premium, Bonds, Book Value, Interest, Face Value, Coupon, Coupon Rate, Term of Bond

| Item | Kind | Status | Where |
|---|---|---|---|
| The coupon payment for a bond equals the face amount times the coupon rate per period, and the redemption value is the amount paid at matur… | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| Convert a nominal annual yield convertible semiannually to the effective semiannual yield by dividing by 2, and use the number of semiannua… | procedure | linked | Bond Price: “Per-period values: $F = C = 1000$, $r = 4\% = 0.04$, $j = 3\% = 0.03$, $n = 20$.” |
| The book value of a bond after k coupons is the present value of the remaining coupons plus the present value of the redemption value at th… | formula | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |
| The amortization of premium in a coupon payment equals the decrease in book value from the previous period, BV_{k-1} − BV_k. | fact | tagged | Bond Amortization: “$$B_t = B_{t-1} - PR_t$$” |
| The amortization of premium in the kth coupon is (Fr − Cj)·v^{n−k+1} at the yield rate j, where the premium amortized equals coupon minus i… | formula | tagged | Bond Amortization: “$$PR_t = Fr - I_t = (Fr - Cj)\,v^{\,n-t+1}$$” |
| The present value of an n-period annuity-immediate at rate j is a_{n\|j} = (1 − v^n)/j with v = 1/(1+j). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |

</details>

<details><summary><code>fm-139</code> · untagged</summary>

Tagged pages: Bond Price, Callable Bond, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons (Fr times an annuity-immediate at the yield rate) plus the present value of the… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The coupon payment per period equals the coupon rate per period times the face value (not the redemption value); a 10% annual coupon rate p… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| Convert an annual effective rate to an equivalent semiannual effective rate by taking (1+i)^(1/2) - 1, and convert a semiannual rate back t… | procedure | elsewhere | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |
| For a callable bond, the price is computed assuming the call at the date and call price that give the stated yield, using the number of cou… | procedure | linked | Call Price: “Where $n_c$ is the number of periods until the call date.” |
| To find the realized yield when a bond is called early, set the purchase price equal to the present value of the cash flows actually receiv… | procedure | tagged | Yield Rate: “the yield rate is the $j$ that solves this equation.” |

</details>

<details><summary><code>fm-140</code> · answerable</summary>

Tagged pages: Bond Amortization, Accumulation of Discount, Bonds, Book Value, Interest, Face Value, Coupon, Coupon Rate, Term of Bond

| Item | Kind | Status | Where |
|---|---|---|---|
| The effective yield rate per coupon period equals the nominal annual yield convertible semiannually divided by 2. | definition | linked | Bond Price (collapsed): “Per-period values: $F = C = 1000$, $r = 4\% = 0.04$, $j = 3\% = 0.03$, $n = 20$.” |
| The book value of a bond immediately after a coupon is the present value of the remaining coupons plus the present value of the redemption … | formula | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |
| The coupon is the face amount times the coupon rate per period (Fr, with r/2 per semiannual period for a nominal annual coupon rate r payab… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| For a bond bought at a discount (coupon rate below yield rate), the amortization schedule's principal adjustment in each period is an accum… | fact | tagged | Book Value: “each coupon period the investor earns $j \cdot BV_{k-1}$ in yield, and the difference between the c…” |
| To find the book value after the k-th coupon of an n-period bond, use the number of remaining coupons n − k as the term in the annuity and … | procedure | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |

</details>

<details><summary><code>fm-141</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons and its redemption value, discounted at the yield rate. | fact | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| The price of an annual coupon bond is P = Fr * a_angle(n) at rate i + C * v^n, where Fr is the coupon (par times coupon rate), C is the red… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The annual coupon equals the coupon rate times the par (face) value, which can differ from the redemption value. | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| The present value of an n-year annuity-immediate of 1 per year is a_angle(n) = (1 - v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| When two bond price equations share unknowns (the coupon rate and the price), write both equations and subtract one from the other to elimi… | procedure | missing |  |

</details>

<details><summary><code>fm-142</code> · answerable</summary>

Tagged pages: Bond Price, Callable Bond, Call Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a callable bond, the investor's guaranteed price (minimum price) is found by assuming the redemption/call date that is worst for the in… | fact | tagged | Callable Bond: “The investor therefore assumes the issuer calls on the date **worst for the investor**. To guarante…” |
| If the yield rate is below the coupon rate (bond sells at a premium), the worst case for the investor is the earliest call date, since the … | fact | tagged | Callable Bond: “If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified c…” |
| If the yield rate exceeds the coupon rate (bond sells at a discount), the worst case for the investor is the latest call date or maturity, … | fact | tagged | Callable Bond: “If the bond is at a **discount** (price $<$ redemption value): assume the **latest** possible redem…” |
| The price of a bond equals the present value of coupons plus the present value of redemption value: P = Fr·a_{n\|j} + C·v^n, using the peri… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A nominal yield convertible semiannually corresponds to a periodic (semiannual) effective rate equal to half the nominal rate, and semiannu… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| A premium bond's price exceeds that of a discount bond at the same coupon, so the absolute difference in prices is the premium price minus … | fact | tagged | Bond Price: “When $Fr > Cj$ the bond sells at a **premium** ($P > C$); when $Fr < Cj$ it sells at a **discount**…” |

</details>

<details><summary><code>fm-143</code> · untagged</summary>

Tagged pages: Net Present Value, Yield Rate, Accumulated Value, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at time n of a lump sum P at effective rate i is P(1+i)^n. | formula | linked | Compound Interest: “$$A(t) = P(1+i)^t$$” |
| The accumulated value at the time of the last payment of a level annuity-immediate of 1 per period for n periods is s_{n\|i} = ((1+i)^n - 1… | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| A fund's ending balance equals the accumulated value of the initial deposit minus the accumulated value of the periodic withdrawals (claims… | procedure | elsewhere | Outstanding Balance: “$$OB_k = L(1+i)^k - P \cdot s_{\overline{k}\\|i}$$” |
| Determine the insurer's net cash flows by netting its outflows (expenses), inflows (fees), and the retained portion of the fund balance (fu… | procedure | tagged | Net Present Value: “with inflows treated as positive and outflows as negative” |
| The yield rate (internal rate of return) is the interest rate at which the present value of cash inflows equals the present value of cash o… | definition | tagged | Net Present Value: “The **internal rate of return** (IRR) is the rate $i^*$ at which $NPV = 0$.” |
| When cash flows occur only at times 0, 2, and 4, the yield equation is a quadratic in (1+i)^2 and can be solved with the quadratic formula,… | fact | elsewhere | Internal Rate of Return (collapsed): “A short signature may reduce to a quadratic in $v$.” |

</details>

<details><summary><code>fm-144</code> · untagged</summary>

Tagged pages: Duration, Macaulay Duration, Perpetuity, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of a cash flow stream: the sum of t times the present value of the payment at … | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| The present value of a perpetuity-immediate of 1 per period is a_∞ = 1/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The present value of an increasing perpetuity-immediate with payments 1, 2, 3, ... is (Ia)_∞ = (1+i)/i^2 = 1/(i·d). | formula | elsewhere | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| The Macaulay duration of a perpetuity-immediate of level payments is (1+i)/i = 1 + 1/i, so the interest rate can be recovered from a given … | fact | tagged | Macaulay Duration: “For a level [[Perpetuity]]-immediate — payments of 1 at the **end** of each period, forever — $D_{M…” |

</details>

<details><summary><code>fm-145</code> · answerable</summary>

Tagged pages: Duration, Macaulay Duration, Modified Duration, Bonds

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration of a bond is the present-value-weighted average time of its cash flows, measured in years. | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| Modified duration of a bond is the negative of the relative price sensitivity to the yield rate, -P'(i)/P(i). | definition | tagged | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| For an annual effective yield rate i, modified duration equals Macaulay duration divided by (1+i), so Macaulay duration equals modified dur… | formula | tagged | Macaulay Duration: “The relationship to [[Modified Duration]] is $D_{Mod} = D_{Mac}/(1+j)$” |
| When the yield rate is positive, a bond's Macaulay duration is larger than its modified duration, and bonds with the same yield rate keep t… | fact | tagged | Modified Duration: “Modified duration is less than [[Macaulay Duration]] whenever $j > 0$ (since then $1+j > 1$)” |

</details>

<details><summary><code>fm-146</code> · answerable</summary>

Tagged pages: Duration, Macaulay Duration, 1st-Order Macaulay Approximation, Bonds, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of a bond's cash flows, measuring the bond's price sensitivity to changes in y… | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| The first-order Macaulay approximation of price at a new yield i is P(i) ≈ P(i0) · ((1+i0)/(1+i))^{D_MAC(i0)}, where D_MAC is the Macaulay … | formula | tagged | 1st-Order Macaulay Approximation: “$$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{D_{Mac}}$$” |
| The approximate percentage price change equals 100 times (approximated new price divided by original price minus 1), with the new yield equ… | procedure | tagged | 1st-Order Macaulay Approximation: “$$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{D_{Mac}}$$” |
| Modified duration equals Macaulay duration divided by (1+i), and the first-order modified approximation gives ΔP/P ≈ −D_MOD · Δi, which dif… | formula | tagged | 1st-Order Macaulay Approximation: “**Contrast with the [[1st-Order Linear Approximation]]**, which uses [[Modified Duration]] and is a…” |

</details>

<details><summary><code>fm-147</code> · gap</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Cash Flow Matching, Redington Immunization, Full Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization requires that the present value of assets equals the present value of liabilities, the durations of assets and liabi… | fact | tagged | Redington Immunization: “3. $\text{Convexity}(A) > \text{Convexity}(L)$ — asset [[Convexity]] exceeds liability convexity” |
| Cash-flow matching (dedication) constructs an asset portfolio whose cash inflows exactly match the liability cash outflows in timing and am… | definition | tagged | Cash Flow Matching: “**Cash flow matching** (also called **dedication**) is a portfolio strategy in which asset cash flo…” |
| Cash-flow matching restricts the portfolio manager's investment choices to a subset of those available under Redington immunization, since … | fact | tagged | Redington Immunization: “Less restrictive than [[Cash Flow Matching]] since exact cash flow timing is not required” |
| Redington immunization and full immunization are developed under the assumption of a flat yield curve, where a single interest rate discoun… | fact | missing |  |
| Full immunization ensures that the present value of assets is at least the present value of liabilities for any change in the interest rate… | definition | tagged | Full Immunization: “Under these conditions the surplus $PV_A - PV_L$ is zero at $i$ and positive at every other rate, w…” |
| Full immunization gives no guarantee under non-parallel shifts of the yield curve. | fact | missing |  |
| A cash-flow matched portfolio needs no rebalancing when interest rates change, whereas Redington and fully immunized portfolios must be reb… | fact | tagged | Cash Flow Matching: “Unlike [[Redington Immunization]], which only protects against small parallel rate shifts and needs…” |

</details>

<details><summary><code>fm-148</code> · gap</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Full Immunization, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| A portfolio is fully immunized (cash-flow matched) against a liability stream when its asset cash flows equal the liability payments at eac… | definition | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date, wh…” |
| To cash-flow match liabilities using whole units of available investments, combine integer multiples of the investments so that the total c… | procedure | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date” |
| The cost of a matching portfolio is the sum of the purchase prices of the units bought, each multiplied by the number of units purchased. | fact | tagged | Cash Flow Matching (collapsed): “The portfolio cost is $\dfrac{10{,}000}{(1+s_2)^2} + \dfrac{5{,}000}{1+s_1}$, where $s_1, s_2$ are …” |
| An investment can be used in an exact-matching portfolio only if its cash flows do not exceed the liability at any time. Investments with a… | fact | missing |  |

</details>

<details><summary><code>fm-149</code> · untagged</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization against small yield changes requires that the present value of assets equals the present value of liabilities. | fact | tagged | Redington Immunization: “$PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| Redington immunization requires that the (Macaulay or modified) duration of the assets equals the duration of the liabilities, so the first… | fact | tagged | Redington Immunization: “$D_{Mac}(A) = D_{Mac}(L)$ — asset and liability [[Macaulay Duration\\|Macaulay durations]] are equal…” |
| The Macaulay duration of a single payment (zero-coupon liability) equals the time until it is paid. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| Modified duration equals Macaulay duration divided by (1+i), i.e. Macaulay duration = modified duration × (1+i), for annual effective yield… | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The duration of a portfolio of assets is the present-value-weighted average of the individual assets' durations (weights are each asset's s… | procedure | tagged | Portfolio: “$$D_{Mod}^{\text{portfolio}} = \frac{\sum_i P_i \cdot D_{Mod,i}}{\sum_i P_i}$$” |
| The present value of a single liability payment is the payment discounted at the effective yield for the number of years until due: PV = pa… | formula | elsewhere | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |

</details>

<details><summary><code>fm-150</code> · answerable</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| Exact cash flow matching means choosing asset purchases whose cash inflows at each time equal the liability payments due at that time. | definition | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date” |
| To solve a cash flow matching problem, set up the time-1 equation (zero-coupon redemption plus coupons from the coupon bonds equals the tim… | procedure | tagged | Cash Flow Matching: “A coupon bond bought for a later liability also pays coupons on the earlier dates, so those coupons…” |
| The price of a bond is the present value of its coupons and redemption value discounted at the bond's annual effective yield: P = sum of CF… | formula | tagged | Bonds: “The **basic bond price formula**: $P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$ where $F$ = face…” |
| A coupon bond with par value F and coupon rate r pays coupons of rF each period and returns the par (redemption) value at maturity along wi… | definition | tagged | Cash Flow Matching: “the 2-year bond pays its face $F$ plus a coupon of $0.05F$ at time 2” |
| A zero-coupon bond with redemption value A and annual effective yield i has a purchase price of A/(1+i)^n for maturity n years. | formula | tagged | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| The total purchase price of a matching portfolio equals the sum of the prices of all bonds in it, and the amount invested in a bond type eq… | fact | tagged | Cash Flow Matching (collapsed): “The portfolio cost is $\dfrac{10{,}000}{(1+s_2)^2} + \dfrac{5{,}000}{1+s_1}$, where $s_1, s_2$ are …” |

</details>

<details><summary><code>fm-151</code> · gap</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| Exact cash flow matching means buying assets whose cash inflows equal the liability payments in amount and timing, so the cost today is the… | definition | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date, wh…” |
| A zero-coupon bond pays a single face amount at maturity and no interim coupons, so its price is the present value of the face amount at th… | definition | missing |  |
| The present value of a payment F due in n years at annual effective yield i is F/(1+i)^n. | formula | missing |  |
| To match a liability due at time t, buy a zero-coupon bond maturing at time t with face value equal to the liability, and price it using th… | procedure | tagged | Cash Flow Matching (collapsed): “**Step 1 — Fund the time-2 liability:** Buy a 2-year zero-coupon bond with face value \$$10{,}000$.…” |

</details>

<details><summary><code>fm-152</code> · answerable</summary>

Tagged pages: Duration, Bonds, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Modified duration equals Macaulay duration divided by (1 + i), where i is the annual effective yield. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The first-order (duration) approximation of percentage price change is ΔP/P ≈ -D_mod × Δi, where Δi is the change in yield. | formula | tagged | 1st-Order Linear Approximation: “$$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j = -\frac{D_{Mac}}{1+j} \cdot \Delta j$$” |
| Bond price moves inversely to yield, so a yield increase produces a negative price change. | fact | linked | Yield Rate: “Bond prices and yields move in opposite directions: if the yield rises, the price falls, and vice v…” |

</details>

<details><summary><code>fm-153</code> · answerable</summary>

Tagged pages: Duration, Macaulay Duration, 1st-Order Macaulay Approximation, Bonds, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The first-order Macaulay approximation estimates the new price as P(i') ≈ P(i) · ((1+i)/(1+i'))^{D_MAC}, where D_MAC is the Macaulay durati… | formula | tagged | 1st-Order Macaulay Approximation: “$$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{D_{Mac}}$$” |
| Macaulay duration is the present-value-weighted average time of a bond's cash flows, measured in years, and serves as a measure of the pric… | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| A bond bought at par has a price equal to its face value at the purchase yield rate, so the starting price P(i) equals the face value. | fact | linked | Bond Price: “when $Fr = Cj$ it sells at **par** ($P = C$).” |

</details>

<details><summary><code>fm-154</code> · answerable</summary>

Tagged pages: Duration, Macaulay Duration, Modified Duration, 1st-Order Macaulay Approximation, 1st-Order Linear Approximation, Bonds, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration equals modified duration multiplied by (1+i), where i is the annual effective interest rate. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The first-order Macaulay approximation estimates the price at a new rate i' as P(i') ≈ P(i) × ((1+i)/(1+i'))^(Macaulay duration). | formula | tagged | 1st-Order Macaulay Approximation: “$$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{D_{Mac}}$$” |
| The first-order modified approximation estimates the price at a new rate i' as P(i') ≈ P(i) × [1 − (i' − i) × modified duration]. | formula | tagged | 1st-Order Macaulay Approximation: “$P(i) \approx P(i_0)\left[1 - (i - i_0)\,D_{Mod}\right]$” |
| Modified duration is the negative of the relative rate of change of price with respect to the interest rate, −P'(i)/P(i), which measures pr… | definition | tagged | Modified Duration: “**Modified duration** $D_{Mod}$ measures the percentage change in price per unit increase in the [[…” |

</details>

<details><summary><code>fm-155</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, 1st-Order Macaulay Approximation, Bonds, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The Macaulay duration of a portfolio of bonds is the price-weighted (present-value-weighted) average of the individual bonds' Macaulay dura… | formula | linked | Duration Matching (collapsed): “Purchase bonds with total market value \$$7{,}472.58$ and weighted Macaulay duration of exactly 5 y…” |
| The first-order Macaulay approximation estimates the price at a new rate i as P(i) ≈ P(i0) * ((1+i0)/(1+i))^D, where D is the Macaulay dura… | formula | tagged | 1st-Order Macaulay Approximation: “$$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{D_{Mac}}$$” |
| The total price of a portfolio of bonds at a given interest rate is the sum of the individual bond prices, and a portfolio can be treated a… | fact | missing |  |

</details>

<details><summary><code>fm-156</code> · answerable</summary>

Tagged pages: Duration, Macaulay Duration, Modified Duration, 1st-Order Macaulay Approximation, Annuity Due, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The first-order Macaulay approximation estimates the present value at a new interest rate j as P(j) ≈ P(i)·((1+i)/(1+j))^(D_MAC), where D_M… | formula | tagged | 1st-Order Macaulay Approximation: “$$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{D_{Mac}}$$” |
| Macaulay duration is the present-value-weighted average time of a cash flow stream's payments. | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| Modified duration equals Macaulay duration divided by (1+i), where i is the annual effective interest rate. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-157</code> · answerable</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Cash Flow Matching, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Exact cash-flow matching (absolute matching) means choosing assets whose cash inflows equal the liability cash flows in amount and timing, … | definition | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date, wh…” |
| Buying zero-coupon bonds whose maturity dates and face amounts equal the liability dates and amounts produces exact cash-flow matching. | fact | tagged | Cash Flow Matching (collapsed): “Buy a 2-year zero-coupon bond with face value \$$10{,}000$. At time 2 it pays exactly \$$10{,}000$.…” |
| An asset whose present value equals the present value of the liabilities at the current interest rate does not achieve exact matching, beca… | fact | tagged | Cash Flow Matching: “**Cash flow matching** (also called **dedication**) is a portfolio strategy in which asset cash flo…” |
| Matching asset and liability duration with asset convexity larger than liability convexity is Redington immunization, a different strategy … | fact | tagged | Redington Immunization: “Less restrictive than [[Cash Flow Matching]] since exact cash flow timing is not required” |

</details>

<details><summary><code>fm-158</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a coupon bond equals the present value of its coupons plus the present value of its redemption value: P = Coupon × a_{n\|} + C… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The coupon rate of a bond is the annual coupon amount divided by the face (par) value. | definition | tagged | Coupon Rate: “$$r = \frac{\text{Coupon}}{F}$$” |
| For a par value bond, the redemption value equals the face amount, so the redemption value is proportional to the face amount. | fact | tagged | Face Value: “When the bond is redeemed at par, the [[Redemption Value]] $C = F$” |
| When two bond price equations share the same annuity (coupon) term and differ only in the redemption term, subtract them to isolate the pre… | procedure | missing |  |
| The present value annuity-immediate factor is a_{n\|} = (1 − v^n)/i, so v^n = 1 − i·a_{n\|}. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| Given the value of an annuity-immediate factor a_{n\|} and n, solve for the effective interest rate i (numerically or by trial/financial ca… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |

</details>

<details><summary><code>fm-159</code> · answerable</summary>

Tagged pages: Time Value of Money, Time Value of Money Equations, Compound Interest, Accumulated Value, Effective Rate, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value of an investment of 1 for n years at annual effective rate i is (1+i)^n. | formula | tagged | Compound Interest: “For $n$ periods at rate $i$, $(1+i)^n$ is the **accumulation factor** — the value at time $n$ of 1 …” |
| The annual yield (annual effective rate of return) of an investment is the constant annual effective rate that grows the initial investment… | definition | linked | Interest Rate (collapsed): “$$6802.44 = 5000(1+i)^5 \implies (1+i)^5 = 1.36049 \implies i = 1.36049^{1/5} - 1 = 0.0635 = 6.35\%…” |
| To compare two investments with different payment structures, compute the total accumulated value at the end of the term per unit invested … | procedure | tagged | Time Value of Money (collapsed): “The two are equal at $i = (1.15)^{1/3} - 1 = 4.769\%$” |

</details>

<details><summary><code>fm-160</code> · untagged</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Annuity Due, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-year arithmetically increasing annuity-due with payments 1, 2, ..., n is (Iä)_n = (ä_n − n·v^n)/d. | formula | tagged | Increasing Annuity: “$(I\ddot{a})_{\overline{n}\\|} = (\ddot{a}_{\overline{n}\\|} - nv^n)/d$” |
| The present value of an n-year level annuity-due of 1 per year is ä_n = (1 − v^n)/d. | formula | elsewhere | Level Annuity: “**[[Annuity Due]]**: payments at the **beginning** of each period; PV factor $\ddot{a}_{\overline{n…” |
| The discount factor is v = 1/(1+i) and the effective annual discount rate is d = 1 − v = i/(1+i). | definition | linked | Discount Rate: “$$d = \frac{i}{1+i}$$” |
| Under a continuously compounded annual rate δ, the effective annual discount factor is v = e^(−δ), so v^n = e^(−δn). | fact | elsewhere | Discount Factor: “Under [[Force of Interest]] $\delta$, the discount factor is $v = e^{-\delta}$ per period.” |
| An annuity with payments X, 2X, ..., nX has present value X times the present value of the unit increasing annuity (Iä)_n, so the payment s… | fact | tagged | Arithmetic Increasing Annuity (collapsed): “Factor out 100: $PV = 100\cdot(Ia)_{\overline{5}\\|0.06}$.” |

</details>

<details><summary><code>fm-161</code> · answerable</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible m times per year corresponds to an effective rate per period equal to the nominal rate divided b… | definition | linked | Payment Period: “When $k = m$ the conversion is trivial: $j = i^{(m)}/m$.” |
| For a level-payment loan with payment R and n total periods, the loan is repaid by an annuity-immediate with payments at the end of each pe… | fact | tagged | Amortization: “The payments need not be level, but the common case is a loan $L$ repaid by $n$ level payments $P$ …” |
| In a level-payment amortized loan with n payments of R, the principal repaid in the kth payment is R*v^(n-k+1). | formula | tagged | Loan Amortization: “With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$” |
| In a level-payment amortized loan with n payments of R, the interest paid in the kth payment is R*(1 - v^(n-k+1)). | formula | tagged | Amortization: “Level payments — interest in payment $k$: $I_k = P \cdot (1 - v^{n-k+1})$ where $v = 1/(1+i)$” |
| The total number of payment periods equals the loan term in years times the number of payments per year. | fact | linked | Payment Period: “$m$ is the number of payments per year, $T$ the [[Term of Loan\\|term]] in years” |

</details>

<details><summary><code>fm-162</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| Write an equation of value by setting the present value of all cash inflows (initial loan balance and additional borrowings) equal to the p… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| A loan's outstanding balance at a later date is a cash outflow whose present value must be included in the equation of value (discounted fr… | fact | missing |  |
| A nominal annual rate convertible m times per year gives an effective rate per period of i^(m)/m, and discounting can use this period rate … | fact | linked | Payment Period: “When $k = m$ the conversion is trivial: $j = i^{(m)}/m$.” |
| Choose the time unit to match the compounding period (e.g., quarters for quarterly conversion) and convert monthly timings into that unit (… | procedure | linked | Payment Period (collapsed): “The rate per half-year is $2.5\%$; a month is one-sixth of a half-year.” |
| Beginning of month k is time k-1 months, and the middle of month k is time k-0.5 months, measured from the start of month 1. | definition | missing |  |
| The present value of a cash flow C at time t is C/(1+i)^t, where i is the effective rate per time unit. | formula | elsewhere | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |

</details>

<details><summary><code>fm-163</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond with annual coupons equals the present value of the redemption amount plus the present value of the coupons: P = F·v^n … | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The coupon rate is the annual coupon amount divided by the face amount, so the coupon payment equals the face amount times the coupon rate. | definition | tagged | Coupon Rate: “$$r = \frac{\text{Coupon}}{F}$$” |
| The present value of an n-period annuity-immediate at effective rate i is a_{n\|i} = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The price of a portfolio of bonds is the sum of the individual bond prices, so the combined price can be written as a sum of the two bonds'… | fact | missing |  |

</details>

<details><summary><code>fm-164</code> · gap</summary>

Tagged pages: Annuities, Level Annuity, Accumulated Value, Present Value, Annuity Immediate, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value (future value) of an annuity-immediate or annuity-due is the value of its payments accumulated with interest to a spe… | definition | tagged | Annuity Immediate: “the accumulated value at the time of the last payment is $s_{\overline{n}\\|}$” |
| The present value of an annuity-due with n payments is valued at the time of the first payment and equals the payment times a-double-dot an… | definition | tagged | Level Annuity: “**[[Annuity Due]]**: payments at the **beginning** of each period; PV factor $\ddot{a}_{\overline{n…” |
| A present value at a given time can be accumulated to a later time by multiplying by (1+j) raised to the number of periods between the two … | fact | tagged | Accumulated Value: “Under [[Compound Interest]] at rate $i$, $a(t) = (1+i)^t$, so $AV = PV \cdot (1+i)^t$.” |
| The present value of an n-payment annuity-due equals one payment plus the present value of an (n-1)-payment annuity-immediate: a-double-dot… | fact | missing |  |
| The present value of an n-period annuity-immediate with interest rate j per period is a angle n = (1 - v^n)/j, where v = 1/(1+j). | formula | tagged | Annuities: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| Convert a periodic (e.g., semiannual) effective rate j to an annual effective rate by compounding: i = (1+j)^m - 1, where m is the number o… | procedure | elsewhere | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |

</details>

<details><summary><code>fm-165</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Annuity Due

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of cash flows: the sum of t times PV of the payment at time t, divided by the … | definition | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| The present value of an annuity-due of n payments is the annuity-due factor a-double-dot_n = (1 - v^n)/d, where d = i/(1+i). | formula | tagged | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| Value a deferred annuity by discounting its annuity factor back by the deferral period, i.e., multiply by v^k for a payment stream beginnin… | procedure | elsewhere | Deferred Annuity: “$${}_{k\\|}\ddot{a}_{\overline{n}\\|} = v^k \cdot \ddot{a}_{\overline{n}\\|}$$” |
| The present value of an increasing annuity-immediate with payments 1, 2, ..., n at times 1, ..., n is (Ia)_n = (a-double-dot_n - n v^n)/i. | formula | elsewhere | Arithmetic Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |
| Compute the time-weighted present value of a payment stream with irregular or step-changing payments by decomposing the t times payment seq… | procedure | missing |  |
| For payments made at the beginning of each year starting today, the payment in year k is received at time k-1, so the time weights are 0, 1… | fact | missing |  |

</details>

<details><summary><code>fm-166</code> · gap</summary>

Tagged pages: Nominal Interest Rate, Accumulated Value, Compound Interest, Convertible m-thly, Nominal Interest Rate Convertible m-thly, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| An annual nominal interest rate compounded m times per year credits interest at rate i/m per period, so the effective rate per compounding … | definition | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| With compound interest the accumulated value after n periods is the principal times (1+j)^n, where j is the per-period effective rate. | formula | tagged | Compound Interest: “For $n$ periods at rate $i$, $(1+i)^n$ is the **accumulation factor** — the value at time $n$ of 1 …” |
| Interest credited during a time interval equals the account balance at the end of the interval minus the balance at the start, so interest … | procedure | missing |  |
| When interest is credited more than once per year, the interest in a given year is the sum over its compounding periods, or equivalently th… | procedure | missing |  |

</details>

<details><summary><code>fm-167</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of its redemption value, discounted at the yield rate. | fact | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| Bond price = Fr·a_{n\|i} + C·v^n, where Fr is the periodic coupon (face value times coupon rate per period), C is the redemption value, n i… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| For a bond with semiannual coupons, the annual coupon rate is divided by two to get the semiannual coupon rate, the nominal annual yield co… | fact | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The present value of an n-period annuity-immediate at periodic rate i is a_{n\|i} = (1 − v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To find an unknown coupon rate, set the bond's price equal to the given price at the given yield, then solve for the periodic coupon and co… | procedure | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |

</details>

<details><summary><code>fm-168</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Accumulated Value, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The loan amount equals the present value of the scheduled payments at the loan interest rate (equation of value), so the original loan equa… | fact | tagged | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |
| The present value of an n-year annuity-immediate paying 1 at the end of each year is a_{n\|} = (1 - v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The accumulated value of an n-year annuity-immediate at time n is s_{n\|} = ((1+i)^n - 1)/i, and s_{n\|} = (1+i)^n a_{n\|}. | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| The present value of an annuity-immediate whose payments occur in years k+1 through k+n is v^k a_{n\|}, i.e. a deferred annuity is discount… | procedure | elsewhere | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| To convert a present-value equation of value into an accumulated-value equation, multiply both sides by (1+i)^t to move the comparison date… | procedure | elsewhere | Equation of Value: “moving the date multiplies every term by the same power of $(1+i)$.” |

</details>

<details><summary><code>fm-169</code> · untagged</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Accumulated Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalent effective monthly rate j is obtained from an annual effective rate i by j = (1+i)^(1/12) - 1. | formula | elsewhere | Effective Rate (collapsed): “The nominal monthly rate equivalent to 7% semi-annually is $12\left[(1.071225)^{1/12} - 1\right] = …” |
| The accumulated value at time t of a payment stream includes only the payments made on or before time t, so later payments are excluded whe… | procedure | tagged | Accumulated Value: “For a series of cash flows $C_{t_k}$ occurring at times $t_k \leq t$” |
| An arithmetic payment sequence with first payment P and common increase Q has k-th payment P + (k-1)Q, which is decomposed into a level ann… | formula | linked | Arithmetic Progression: “Equivalently, write each payment $P + (t-1)Q$ as $(P-Q) + Qt$: a [[Level Annuity\\|level annuity]] o…” |
| The accumulated value of a level annuity-immediate of n payments is s_n = ((1+j)^n - 1)/j. | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| The accumulated value of an increasing annuity-immediate paying 1, 2, ..., n at times 1..n is (Is)_n = (s̈_n - n)/j. | formula | tagged | Increasing Annuity: “$$(Is)_{\overline{n}\\|} = \frac{\ddot{s}_{\overline{n}\\|} - n}{i}$$” |
| The accumulated value of an annuity-due is s̈_n = (1+j)·s_n = ((1+j)^n - 1)/d, where d = j/(1+j). | formula | linked | Annuity Due: “$$\ddot{s}_{\overline{n}\\|} = (1+i)\,s_{\overline{n}\\|}$$” |

</details>

<details><summary><code>fm-170</code> · untagged</summary>

Tagged pages: Decreasing Annuity, Fund Accumulation, Accumulated Value, Future Value, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| When a fund earns interest at an effective rate and the interest plus a fixed amount of principal is withdrawn at each period end, the bala… | fact | elsewhere | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |
| Decompose a payment stream into a level annuity part plus an arithmetic decreasing part (a constant plus a payment that falls by a fixed am… | procedure | tagged | Decreasing Annuity: “$$PV = P \cdot a_{\overline{n}\\|} - \frac{Q}{i}\!\left(a_{\overline{n}\\|} - nv^n\right)$$” |
| The accumulated value of an n-period annuity-immediate with level payments of 1 at effective rate i is s_{n\|i} = ((1+i)^n - 1)/i. | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| The accumulated value of a decreasing annuity-immediate with payments n, n-1, ..., 1 at the ends of periods 1 through n is (Ds)_{n\|i} = (n… | formula | tagged | Decreasing Annuity: “The corresponding accumulated value is $(Ds)_{\overline{n}\\|} = (1+i)^n (Da)_{\overline{n}\\|}$.” |
| Deposits made at the end of each period into a fund earning an effective rate accumulate at that rate, so the fund's accumulated value is t… | fact | tagged | Fund Accumulation: “A common Exam FM scenario: amounts withdrawn from one fund are immediately deposited into and accum…” |

</details>

<details><summary><code>fm-171</code> · gap</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Future Value, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value of an annuity-immediate of level payments at the end of each year for n years at effective rate i is the payment time… | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When interest earned on an investment is reinvested at a different rate, compute the interest credited each year from the balance at the in… | procedure | tagged | Fund Accumulation (collapsed): “Since the \$$500$ principal stays in Fund A, it earns level interest of $500(0.05) = \$25$ per year…” |
| With level deposits at year-end and interest paid out each year, the interest credited at the end of year k equals i times the deposits mad… | fact | missing |  |
| The accumulated value at time n of an increasing annuity-immediate with payments 1, 2, ..., n is (Is)_{n\|i} = (s̈_{n\|i} - n)/i. | formula | elsewhere | Increasing Annuity: “$$(Is)_{\overline{n}\\|} = \frac{\ddot{s}_{\overline{n}\\|} - n}{i}$$” |
| The accumulated value of an annuity-due factor is s̈_{n\|i} = (1+i)s_{n\|i} = ((1+i)^n - 1)/d, where d = i/(1+i). | formula | linked | Annuity Due: “$$\ddot{s}_{\overline{n}\\|} = (1+i)\,s_{\overline{n}\\|}$$” |
| Equate the accumulated values of two investments at the same time point (equation of value) and solve for the unknown payment. | procedure | elsewhere | Equation of Value: “Every cash flow must be moved to the same comparison date before comparing, each at the [[Interest …” |

</details>

<details><summary><code>fm-172</code> · untagged</summary>

Tagged pages: Nominal Discount Rate, Nominal Discount Rate Convertible m-thly, Accumulated Value, Compound Interest, Discount Rate, Effective Discount Rate, Convertible m-thly, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| With nominal interest rate i^(m) compounded m times per year, the accumulated value of a deposit P0 after n years is P0(1 + i^(m)/m)^(mn). | formula | elsewhere | Nominal Interest Rate Convertible m-thly: “The **nominal interest rate convertible $m$-thly**, denoted $i^{(m)}$, is an annual rate that is co…” |
| With nominal discount rate d^(m) compounded m times per year, the accumulated value of a deposit P0 after n years is P0(1 - d^(m)/m)^(-mn). | formula | tagged | Nominal Discount Rate: “$$a(t) = \left(1 - \frac{d^{(m)}}{m}\right)^{-mt}$$” |
| To solve for an unknown rate when two funds accumulate to the same amount, equate the two accumulation expressions and solve for the rate, … | procedure | elsewhere | Equation of Value: “one equation can equate the balances of two funds earning different rates.” |

</details>

<details><summary><code>fm-173</code> · gap</summary>

Tagged pages: Perpetuity, Present Value, Level Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| To handle payments made every k years, convert the annual effective rate i to the k-year effective rate by computing (1+i)^k - 1 and treat … | procedure | missing |  |
| The present value of a perpetuity-due paying 1 at the start of each period is a-double-dot-infinity = (1+i)/i = 1/d, where i is the effecti… | formula | tagged | Perpetuity: “$$\ddot{a}_{\overline{\infty}\\|} = \frac{1}{d}$$” |
| The present value of a level perpetuity with payment X equals X times the perpetuity annuity factor, so X is found by dividing the present … | procedure | linked | Annuity Immediate: “For a level payment of $P$ per period, multiply through by $P$.” |

</details>

<details><summary><code>fm-174</code> · gap</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Perpetuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| Decompose a perpetuity with payments increasing by a constant amount each period into a level perpetuity of the first payment plus an arith… | procedure | tagged | Increasing Annuity: “A first payment $P$ rising by $Q$ a period is a level annuity of $P - Q$ plus $Q\,(Ia)_{\overline{n…” |
| The present value of a level perpetuity-immediate of 1 per period is 1/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The present value of an increasing perpetuity-immediate paying 1, 2, 3, ... is (Ia)∞ = 1/(i·d) = (1+i)/i². | formula | tagged | Increasing Annuity: “the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(Ia)_{\overline{\in…” |
| The present value of an increasing perpetuity-immediate with payments of 1, 2, 3, ... starting one period later is v(Ia)∞, since the patter… | fact | missing |  |

</details>

<details><summary><code>fm-175</code> · gap</summary>

Tagged pages: Annuities, Level Annuity, Present Value, Perpetuity, Annuity Immediate, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-year annuity-immediate of 1 per year is a_n = (1 - v^n)/i, where v = 1/(1+i). | formula | tagged | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The present value of a perpetuity-immediate of 1 per year is 1/i. | formula | tagged | Perpetuity: “A **perpetuity** is an annuity that pays 1 per period forever. For a **perpetuity-immediate** (paym…” |
| The present value of a deferred cash flow stream is found by valuing the stream as if starting at the deferral date and discounting by v ra… | procedure | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| Cash flows with a gap in payments can be valued as the sum of the present values of the separate payment blocks, each discounted to time 0,… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| An equation in v^(2n) and v^n is a quadratic in u = v^n, which can be solved with the quadratic formula; the positive root with 0 < v < 1 i… | fact | missing |  |

</details>

<details><summary><code>fm-176</code> · gap</summary>

Tagged pages: Loan Repayment Comparison, Loans, Amortization, Interest Rate, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The lender's yield rate is the interest rate at which the present value of the loan payments equals the amount loaned, so the loan amount e… | fact | elsewhere | Yield Rate: “the interest rate per period at which the present value of all future cash flows equals the current…” |
| Write an equation of value that discounts each payment at the yield rate, using v = 1/(1+yield) per year for each payment time, to solve fo… | procedure | linked | Loan Amortization: “The loan is the present value of the payments, with $a_{\overline{4}\\|5\%} = 3.545951$ and $v^4 a_{…” |
| The outstanding loan balance after a payment equals the prior balance accumulated at the loan's interest rate for that period minus the pay… | formula | linked | Loan Amortization: “$$B_k = B_{k-1}(1+i) - K_k$$” |
| The loan is fully repaid when the outstanding balance after the final payment is zero, so the balance accumulated one period at the final-p… | fact | tagged | Amortization: “At the end of the $n$-th payment the loan is exactly paid off.” |
| The interest rate charged by the lender on the loan (which determines balance accumulation) can differ from the lender's yield rate (used f… | fact | missing |  |

</details>

<details><summary><code>fm-177</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-year level annuity-immediate at effective rate i is a_{n\|i} = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The original loan amount equals the present value, at the loan interest rate, of all scheduled payments. | fact | tagged | Loan Amortization: “whose present value at the loan rate equals the amount lent” |
| Value a deferred annuity (payments that begin after a delay of k periods) by computing the annuity's present value at the start of its paym… | procedure | tagged | Loan Amortization: “The loan is the present value of the payments, with $a_{\overline{4}\\|5\%} = 3.545951$ and $v^4 a_{…” |
| The outstanding loan balance after a payment is the present value (prospective method) of the remaining future payments at the loan interes… | definition | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| Principal repaid over a period equals the decrease in the outstanding balance (initial loan minus ending balance), and total interest paid … | fact | tagged | Loan Amortization: “the principal repaid in payments $j+1$ through $k$ is $B_j - B_k$, and the interest paid in them is…” |

</details>

<details><summary><code>fm-178</code> · gap</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Simple Interest, Future Value, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| With simple interest on a deposit, interest equals the rate times the principal each year and is not compounded; the principal itself stays… | fact | tagged | Simple Interest: “Under **simple interest**, interest is earned only on the original principal — it does not itself e…” |
| When interest is paid out and reinvested at a different rate, accumulate the principal separately from the stream of interest payments, eac… | procedure | tagged | Fund Accumulation: “A common Exam FM scenario: amounts withdrawn from one fund are immediately deposited into and accum…” |
| For level deposits at the beginning of each year, a deposit made at time k-1 earns interest at times k through n, so the interest payments … | procedure | missing |  |
| The accumulated value at time n of an increasing annuity-immediate with payments 1, 2, ..., n is (Is)_n = (s̈_n − n)/i. | formula | elsewhere | Increasing Annuity: “$$(Is)_{\overline{n}\\|} = \frac{\ddot{s}_{\overline{n}\\|} - n}{i}$$” |
| The accumulated value of an annuity-due is s̈_n = ((1+i)^n − 1)/d, where d = i/(1+i). | formula | linked | Annuity Due: “$$= \frac{(1+i)^n - 1}{d}$$” |

</details>

<details><summary><code>fm-179</code> · untagged</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Decreasing Annuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a decreasing arithmetic annuity-immediate with first payment P and decrement Q is found by writing it as a level annui… | procedure | tagged | Decreasing Annuity: “$$PV = P \cdot a_{\overline{n}\\|} - \frac{Q}{i}\!\left(a_{\overline{n}\\|} - nv^n\right)$$” |
| The present value of an increasing annuity-immediate paying 1, 2, ..., n at times 1..n is (Ia)_{n\|} = (ä_{n\|} - n v^n)/i. | formula | tagged | Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |
| The present value of an n-period annuity-immediate at effective rate i is a_{n\|} = (1 - v^n)/i, with v = 1/(1+i). | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The annuity-due and annuity-immediate values are related by ä_{n\|} = (1+i)a_{n\|} = a_{n\|} + 1 - v^n, so ä is computed from a at the same… | formula | linked | Annuity Due: “$$\ddot{a}_{\overline{n}\\|} = (1+i)\,a_{\overline{n}\\|}$$” |
| The initial investment equals the present value of the future payments at the effective interest rate (equation of value at time 0). | fact | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |

</details>

<details><summary><code>fm-180</code> · answerable</summary>

Tagged pages: Net Present Value, Present Value, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| Net present value is the present value of all cash inflows minus the present value of all cash outflows, with the initial investment at tim… | definition | tagged | Net Present Value: “$$= PV(\text{inflows}) - PV(\text{outflows})$$” |
| The present value of a cash flow C received at time t at annual effective rate i is C/(1+i)^t. | formula | tagged | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| Net the investments and revenues that occur at the same time point into a single cash flow for that time, then discount each net cash flow … | procedure | tagged | Net Present Value: “The **net present value** (NPV) is the sum of the present values of all cash flows associated with …” |
| A negative NPV at the given interest rate indicates that the project's returns are less than required by that rate, so the project is not p… | fact | tagged | Net Present Value: “A negative NPV means the opposite.” |

</details>

<details><summary><code>fm-181</code> · answerable</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Immunization (e.g., Redington) requires the present value of asset cash flows to equal the present value of liability cash flows. | fact | tagged | Immunization: “1. $PV(assets) = PV(liabilities)$” |
| Immunization requires the duration (price sensitivity to interest rate changes) of assets to equal the duration of liabilities. | fact | tagged | Immunization: “2. $D_{Mac}(assets) = D_{Mac}(liabilities)$ ([[Duration Matching]])” |
| Immunization requires the convexity of assets to be greater than the convexity of liabilities so that asset value exceeds liability value a… | fact | tagged | Redington Immunization: “When all three hold, a small change $\Delta j$ causes $S \geq 0$ because the convexity term dominat…” |

</details>

<details><summary><code>fm-182</code> · untagged</summary>

Tagged pages: Annuities, Accumulated Value, Annuity Due, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The effective annual rate equivalent to a nominal rate convertible m times per year is i = (1 + i^(m)/m)^m - 1, where the periodic rate is … | formula | elsewhere | Nominal Interest Rate Convertible m-thly: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| The present value of an annuity-due of n level payments at effective rate i is the payment times (1 - v^n)/d, denoted ä_{n\|}, valued one p… | formula | tagged | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| The accumulated value of n level payments made at the end of each period at periodic rate j, valued at the time of the last payment, is s_{… | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| A series of payments made at the beginning of each period, valued at the time one period after the last payment, is an annuity-due accumula… | fact | tagged | Annuity Due: “The accumulated value at the end of the last period (one period after the final payment) is $\ddot{…” |
| To fund future payments, choose a comparison date, find the value of the payments at that date (discounting or accumulating at the appropri… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| To solve for the number of payments n, solve the equation of value for the growth factor (1+j)^n and take logarithms: n = ln(factor)/ln(1+j… | procedure | linked | Term of Annuity: “When $n$ is not a whole number, $\lfloor n \rfloor$ regular payments are made plus one smaller paym…” |

</details>

<details><summary><code>fm-183</code> · gap</summary>

Tagged pages: Duration, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration of a stream of cash flows is the present-value-weighted average of the payment times: the sum of t times PV of the paymen… | definition | linked | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| For level end-of-period payments, the payment amount cancels in the Macaulay duration ratio, so duration equals (Ia) divided by a at the lo… | fact | missing |  |
| The increasing annuity-immediate (Ia)_n has payments 1, 2, ..., n at times 1, ..., n, and its present value is the sum of k v^k. | definition | elsewhere | Arithmetic Increasing Annuity: “An **arithmetic increasing annuity** has payments $1, 2, 3, \ldots, n$ at the end of periods $1, 2,…” |
| The present value of an increasing annuity-immediate is (Ia)_{n\|} = (ä_{n\|} − n v^n)/i. | formula | elsewhere | Arithmetic Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |
| The present value of an n-year annuity-immediate at effective rate i is a_{n\|} = (1 − v^n)/i, and the annuity-due is ä_{n\|} = a_{n\|}(1+i… | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |

</details>

<details><summary><code>fm-184</code> · untagged</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a stream of level cash flows is found by discounting each payment at the effective annual yield and summing. | procedure | elsewhere | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| Macaulay duration of a cash flow stream is the present-value-weighted average time of the payments: sum of t*PV(CF_t) divided by the total … | formula | linked | Macaulay Duration: “$$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$” |
| The Macaulay duration of a zero-coupon bond equals its time to maturity. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| The duration of a portfolio of assets is the weighted average of the individual asset durations, with weights equal to each asset's share o… | fact | tagged | Portfolio: “**[[Duration]] of a portfolio**: the weighted average of individual asset durations, weighted by ma…” |
| To match duration in immunization (Redington), choose asset amounts so the asset portfolio's duration equals the liabilities' duration, wit… | procedure | tagged | Duration Matching (collapsed): “Purchase bonds with total market value \$$7{,}472.58$ and weighted Macaulay duration of exactly 5 y…” |

</details>

<details><summary><code>fm-185</code> · gap</summary>

Tagged pages: Duration, Bonds, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration of a bond is the present-value-weighted average of the times of its cash flows, i.e. sum of t times PV of cash flow at t … | definition | linked | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| Macaulay duration depends only on the timing and relative present-value weights of cash flows, so scaling all cash flows by the same factor… | fact | linked | Macaulay Duration: “where each cash flow is weighted by its [[Present Value]] as a fraction of total price” |
| For a bond with fixed term and yield, a higher coupon rate puts more present-value weight on earlier coupon payments relative to the final … | fact | missing |  |
| A bond's coupon amount equals the coupon rate times face value, so changing face value at a fixed coupon rate scales both coupons and redem… | fact | linked | Face Value: “The [[Coupon]] payment each period equals $F \times r$ where $r$ is the [[Coupon Rate]] per period” |

</details>

<details><summary><code>fm-186</code> · untagged</summary>

Tagged pages: Nominal Interest Rate, Convertible m-thly, Nominal Interest Rate Convertible m-thly, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate compounded m times per year, i^(m), means the effective rate per 1/m-year period is i^(m)/m. | definition | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| To find the equivalent effective rate for a payment period that differs from the compounding period, equate the accumulation factors over a… | procedure | elsewhere | Payment Period: “$$j = \left(1 + \frac{i^{(k)}}{k}\right)^{k/m} - 1$$” |
| The equivalent effective rate over a fraction of a period is j = (1+i)^(t) - 1, where t is the ratio of the shorter period to the longer pe… | formula | elsewhere | Payment Period: “$$j = (1+i)^{1/m} - 1$$” |

</details>

<details><summary><code>fm-187</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| For a level-payment loan, each payment equals the interest due on the prior outstanding balance plus the principal repaid, so principal rep… | fact | tagged | Loan Amortization: “$$PR_k = K_k - I_k = B_{k-1} - B_k$$” |
| Level payment = interest on the previous balance (i times prior balance) plus principal repaid in that period; setting this up for two cons… | formula | tagged | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |
| In a level-payment loan, the principal repaid grows each period by a factor of (1+i), so the difference between consecutive principal repay… | fact | tagged | Loan Amortization: “With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$, so $PR_{…” |
| The loan amount equals the level payment times the annuity-immediate present value factor a_{n\|i} = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Level Payment Annuity: “$$\text{PV} = P \cdot a_{\overline{n}\\|i}$$” |
| Solve the annuity equation for the number of payments n by isolating v^n = 1 - (loan amount × i / payment) and taking logarithms to get n =… | procedure | tagged | Term of Loan: “n &= \frac{-\ln(1 - 0.08 \times 5.555556)}{\ln 1.08} \\” |
| With a nominal annual rate compounded monthly, the effective monthly rate is the nominal rate divided by 12, and payments at the end of eac… | definition | linked | Payment Period: “When $k = m$ the conversion is trivial: $j = i^{(m)}/m$.” |

</details>

<details><summary><code>fm-188</code> · untagged</summary>

Tagged pages: Immunization, Duration, Force of Interest, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Present value of a future payment under a constant force of interest delta is the payment times e^(-delta t); the total present value of a … | procedure | tagged | Force of Interest: “$$a(t) = e^{\delta t}$$” |
| Macaulay duration is the present-value-weighted average time of the cash flows: the sum of t times the present value of each payment, divid… | definition | linked | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| A zero-coupon bond has a single payment at maturity, so its Macaulay duration equals its time to maturity, and its contribution to the port… | fact | elsewhere | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| To immunize or match a liability by duration matching, choose asset amounts so that the asset present value equals the liability present va… | procedure | tagged | Redington Immunization (collapsed): “**Condition 2** ($D_{Mac}(A) = D_{Mac}(L) = 4$), multiplying through by the common present value:” |

</details>

<details><summary><code>fm-189</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Convert an annual nominal yield rate convertible semiannually into the effective semiannual rate by dividing by two, and use that rate as t… | procedure | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| The present value of a bond's redemption value C paid after n periods is C v^n, where v = 1/(1+i) and i is the yield rate per period. | formula | linked | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |
| The coupon per period equals the coupon rate per period times the face value (annual coupon rate divided by payments per year, times face v… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The present value of an n-period annuity-immediate at rate i per period is a_{n\|i} = (1 - v^n)/i. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The price of a bond is the present value of its coupons plus the present value of its redemption value: P = Fr·a_{n\|i} + C·v^n. | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |

</details>

<details><summary><code>fm-190</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan, Drop Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible m times per year corresponds to an effective rate per period of the nominal rate divided by m. | definition | elsewhere | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| In a level-payment loan amortization, the interest portion of a payment equals the periodic rate times the outstanding balance at the start… | fact | tagged | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |
| With level payments, the principal repaid in successive payments grows geometrically at the periodic effective rate, so principal in paymen… | fact | tagged | Loan Amortization: “With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$, so $PR_{…” |
| When a loan is repaid by level payments for as long as necessary plus a smaller final drop payment, payments before the final one follow th… | fact | tagged | Drop Payment: “It arises when level payments continue for as long as necessary and the [[Term of Loan]] is not a w…” |

</details>

<details><summary><code>fm-191</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible m times per year corresponds to an effective rate per period of the nominal rate divided by m. | definition | elsewhere | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| The present value of a level annuity-immediate of n payments at periodic rate j is a_{n\|j} = (1 - v^n)/j, where v = 1/(1+j). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The outstanding loan balance at any time equals the present value of the remaining scheduled payments (prospective method), discounted at t… | fact | tagged | Outstanding Balance: “**Prospective method** (present value of future payments):” |
| To find an unknown revised payment, set the present value of the revised payment schedule (including deferred or delayed payments) equal to… | procedure | tagged | Loan Amortization: “The loan is the present value of the payments, with $a_{\overline{4}\\|5\%} = 3.545951$ and $v^4 a_{…” |
| The present value of a deferred annuity of n payments starting after a deferral of k periods is v^k a_{n\|j}, discounting the annuity value… | procedure | elsewhere | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| Missed payments can be made up by later payments equal to the missed amount accumulated with interest at the loan rate to the later date, s… | fact | elsewhere | Time Value of Money: “Under [[Compound Interest]] at effective rate $i$, an amount $C$ paid at time $s$ is worth, at time…” |

</details>

<details><summary><code>fm-192</code> · answerable</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| Exact (cash flow) matching of liabilities means choosing asset cash flows so that the asset payments at each time equal the liability payme… | definition | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date, wh…” |
| To exactly match a series of liabilities with bonds of different maturities, work backwards from the latest liability: the longest-maturity… | procedure | tagged | Cash Flow Matching: “Construction proceeds **backwards** from the last liability date — fund the final liability first, …” |
| A zero-coupon bond pays only its face (redemption) value at maturity, so its face value equals the liability due at that time when it alone… | fact | tagged | Cash Flow Matching (collapsed): “Buy a 2-year zero-coupon bond with face value \$$10{,}000$. At time 2 it pays exactly \$$10{,}000$.” |
| A coupon bond with face value F and coupon rate r per period pays a coupon of rF each period, and at maturity pays the final coupon plus th… | formula | tagged | Cash Flow Matching: “the 2-year bond pays its face $F$ plus a coupon of $0.05F$ at time 2” |
| Bond prices and yield rates are not needed to determine the face amounts that exactly match liabilities; only the bonds' cash flows (face v… | fact | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date” |

</details>

<details><summary><code>fm-193</code> · answerable</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| To exactly match a liability with a portfolio of bonds (cash flow matching), subtract the known bond's cash flows from the liability's cash… | procedure | tagged | Cash Flow Matching: “A coupon bond bought for a later liability also pays coupons on the earlier dates, so those coupons…” |
| A bond with face amount F and coupon rate r pays a coupon of F times r at the end of each period and returns the face amount (redemption va… | fact | tagged | Cash Flow Matching: “the 2-year bond pays its face $F$ plus a coupon of $0.05F$ at time 2” |
| Given required periodic coupon payments and a required maturity payment, infer the bond's face amount from the maturity payment less the fi… | procedure | tagged | Cash Flow Matching: “**Time 2 first:** the 2-year bond pays its face $F$ plus a coupon of $0.05F$ at time 2, so” |
| The price of a bond at effective yield i is the present value of its coupons plus redemption value: P = Fr·a_{n\|i} + C·(1+i)^{-n}. | formula | tagged | Bonds: “The **basic bond price formula**: $P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$ where $F$ = face…” |
| The present value of an n-period annuity-immediate at effective rate i is a_{n\|i} = (1 − (1+i)^{-n})/i. | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |

</details>

<details><summary><code>fm-194</code> · answerable</summary>

Tagged pages: Duration, Bonds, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons (coupon times the annuity-immediate factor) plus the present value of the redem… | formula | tagged | Bonds: “**[[Bond Price\\|Price]]** — Present value of all future cash flows at the yield rate” |
| The coupon of a bond equals the coupon rate times the par (face) value, which is distinct from the redemption value. | definition | linked | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| The annuity-immediate factor is a_{n\|i} = (1 - (1+i)^{-n}) / i, so that i times a_{n\|i} = 1 - v^n. | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To find the yield rate from a bond's price, set price equal to the present value of cash flows, solve for the discount factor (1+i)^{-n}, t… | procedure | linked | Yield Rate (collapsed): “Coupons are $Fr = 1{,}000(0.05) = 50$ per year and the redemption value is $C = 1{,}000$, so $j$ so…” |
| Modified duration equals Macaulay duration divided by (1+i), where i is the effective annual yield rate. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-195</code> · gap</summary>

Tagged pages: Duration, Perpetuity, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-immediate paying 1 per period is 1/i, and a deferred perpetuity's present value is found by multiplying b… | formula | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| A perpetuity whose first payment is at time n is valued as a perpetuity-immediate deferred n-1 years (the PV at time n-1 of payments at n, … | procedure | linked | Deferred Annuity (collapsed): “with the first payment 4 years from now (i.e. deferred 3 years)” |
| Macaulay duration is the present-value-weighted average time of cash flows: the sum of t times the PV of the cash flow at t, divided by the… | definition | linked | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| The present value of an increasing perpetuity-immediate paying 1, 2, 3, ... is (Ia)_∞ = 1/(i·d) = (1+i)/i². | formula | elsewhere | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| For a deferred level perpetuity, the time-weighted PV of payments at times k+1, k+2, ... is computed by writing each time as k plus the ind… | procedure | missing |  |
| Modified duration equals Macaulay duration divided by (1+i), where i is the annual effective interest rate. | formula | linked | Modified Duration: “$$= \frac{D_{Mac}}{1+j}$$” |

</details>

<details><summary><code>fm-196</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a coupon bond redeemable at par equals the present value of its coupons (coupon amount times an annuity-immediate factor) plus… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A nominal annual yield rate convertible semiannually corresponds to an effective yield per coupon period equal to the nominal rate divided … | definition | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| The coupon amount equals the face value times the coupon rate per period, and the number of coupon periods equals the term in years times t… | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| The present value of an n-period annuity-immediate at periodic rate i is a_{n\|i} = (1 - (1+i)^{-n}) / i. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To solve for an unknown coupon rate, write the price of the original bond and of the changed-term bond at the same yield, relate them using… | procedure | missing |  |

</details>

<details><summary><code>fm-197</code> · untagged</summary>

Tagged pages: Immunization, Net Present Value, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| A portfolio of asset and liability cash flows is Redington immunized at interest rate i if the net present value h(i) = PV(assets) − PV(lia… | definition | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| The present value of a net cash flow stream at effective annual rate i is h(i) = sum of c_t (1+i)^(-t), where c_t is the net cash flow (ass… | formula | elsewhere | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| The first derivative of h(i) = sum c_t (1+i)^(-t) with respect to i is −sum t c_t (1+i)^(-t-1), and the second derivative is sum t(t+1) c_t… | formula | linked | Convexity: “$$C_{Mod} = \frac{1}{P} \cdot \frac{d^2P}{dj^2}$$…$$C_{Mod} = \frac{\displaystyle\sum_{t=1}^{n} t(t…” |
| A set of cash flows fails to be Redington immunized if any one of the conditions fails, so it suffices to find that h(i) is nonzero or h'(i… | fact | elsewhere | Asset-Liability Management: “Redington immunization]] adds that the assets' convexity exceed the liabilities', and [[Immunizatio…” |

</details>

<details><summary><code>fm-198</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a bond callable at par on several dates, if the bond is bought at a premium (price above redemption value), the worst case for the inve… | fact | linked | Callable Bond: “If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified c…” |
| The price of a bond equals the present value of its coupons plus the present value of the redemption value at the yield rate: P = Fr·a_{n\|… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The present value of an n-period annuity-immediate at effective rate i is a_{n\|i} = (1 - (1+i)^{-n}) / i. | formula | elsewhere | Annuity Immediate: “$$= \frac{1-(1+i)^{-n}}{i}$$” |
| To find the yield of a bond, set the purchase price equal to the present value of cash flows to the relevant redemption date (the worst-cas… | procedure | tagged | Yield Rate: “the yield rate is the $j$ that solves this equation.” |

</details>

<details><summary><code>fm-199</code> · gap</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization is a technique for protecting a portfolio of assets against interest rate changes by matching the present value and … | definition | tagged | Redington Immunization: “**Redington immunization** is a strategy for protecting a portfolio's surplus $S = V_A - V_L$ again…” |
| Redington immunization assumes a flat yield curve, so all maturities share the same yield rate. | fact | missing |  |
| Redington immunization only protects against parallel shifts in the yield curve, where the rate changes by the same amount at all maturitie… | fact | tagged | Redington Immunization: “Redington immunization only protects against small, parallel rate shifts and must be rebalanced as …” |
| Redington immunization protects only against small, instantaneous changes in the interest rate and breaks down for large changes. | fact | tagged | Redington Immunization: “Redington immunization only protects against small, parallel rate shifts and must be rebalanced as …” |
| Redington immunization requires the present value of assets to equal the present value of liabilities and the (modified or Macaulay) durati… | fact | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$) 2. $D_{Mac}(A) …” |
| Redington immunization requires the convexity of assets to be greater than the convexity of liabilities (not equal), so the net present val… | fact | tagged | Redington Immunization: “3. $\text{Convexity}(A) > \text{Convexity}(L)$ — asset [[Convexity]] exceeds liability convexity” |

</details>

<details><summary><code>fm-200</code> · answerable</summary>

Tagged pages: Continuous Annuity, Force of Interest, Accumulated Value, Payable Continuously

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at a target time of a continuous payment stream is found by integrating the payment rate at time t times the accumula… | procedure | tagged | Continuous Annuity: “$$\bar{s}_{\overline{n}\\|} = \int_0^n e^{\delta(n-t)}\,dt$$” |
| With a constant force of interest δ, the accumulation factor from time t to time T is e^{δ(T−t)}. | formula | tagged | Accumulated Value: “The ratio $a(t)/a(s)$ for $t > s$ is the **accumulation factor** from $s$ to $t$: the value at time…” |
| The integral of e^{at} dt is e^{at}/a, so the integral of an exponential over an interval equals the difference of its antiderivative at th… | fact | tagged | Continuous Annuity: “$$\bar{s}_{\overline{n}\\|} = \int_0^n e^{\delta(n-t)}\,dt$$” |

</details>

<details><summary><code>fm-201</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Perpetuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| An annuity-immediate pays at the end of each period, and its present value for n payments at effective rate i is a_n = (1 - v^n)/i with v =… | definition | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To value a deferred level annuity, take the annuity value at the time just before its first payment and discount it back by the deferral pe… | procedure | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| Place the payments on the timeline by their payment number: with the first payment at time t, the nth payment falls at time t+n-1, which fi… | procedure | linked | Deferred Annuity (collapsed): “with the first payment 4 years from now (i.e. deferred 3 years)” |
| A perpetuity-immediate whose payments grow geometrically at rate g, with first payment P, has present value P/(i-g) one period before the f… | formula | elsewhere | Geometric Increasing Perpetuity: “Paid at the end of each period, with the first payment one period from now, its present value at an…” |
| For a payment stream with a level phase followed by a growing phase, set the total present value equal to the sum of the level annuity's pr… | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| If a payment stream grows by a fixed percentage k% each payment, the growth factor is 1+g with g=k/100, so the payment after m growth steps… | fact | tagged | Geometric Progression: “a **geometric progression** refers to a sequence of payments where each payment is a constant multi…” |

</details>

<details><summary><code>fm-202</code> · answerable</summary>

Tagged pages: Geometric Increasing Annuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a stream of payments is the sum of each payment discounted by (1+i)^-t for its payment time t. | procedure | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| A geometrically increasing annuity-immediate has payments at times 1 through n where each payment is (1+k) times the previous payment, with… | definition | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |
| The present value of a geometric annuity-immediate with first payment X, growth rate k, interest rate i, and n payments is X[1 - ((1+k)/(1+… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| The sum of a finite geometric series with first term a, ratio r, and n terms is a(1 - r^n)/(1 - r). | formula | tagged | Geometric Progression: “$$\text{PV} = \frac{1}{1+i} \cdot \frac{1-\left(\frac{1+g}{1+i}\right)^n}{1 - \frac{1+g}{1+i}}$$” |
| In a geometrically growing payment stream with n payments, the nth payment equals the first payment times (1+k)^(n-1), since there are n-1 … | fact | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |

</details>

<details><summary><code>fm-203</code> · untagged</summary>

Tagged pages: Simple vs Compound Interest, Simple Interest, Compound Interest, Loans, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment of an n-year loan repaid by end-of-period payments equals the loan amount divided by the annuity-immediate present value … | formula | tagged | Loans: “$$P = \frac{200{,}000}{a_{\overline{360}\\|0.5\%}} = \frac{200{,}000}{166.792} = 1199.10 \text{ per …” |
| The present value of an n-period annuity-immediate at interest rate i is a_{n\|i} = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The outstanding loan balance at the end of a period is found prospectively as the present value, at the loan rate, of the remaining level p… | procedure | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| Under simple interest, a balance B accumulated for a fraction t of a year grows to B(1 + i·t). | formula | tagged | Simple Interest: “$$A(t) = P(1 + it)$$” |
| When interest within a year is computed by simple interest but balances at year ends use the effective rate, the mid-year balance is the pr… | procedure | tagged | Simple Interest: “so a deposit $C$ made at time $s$ is worth $C\,[1 + i(t - s)]$ at time $t$” |

</details>

<details><summary><code>fm-205</code> · untagged</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization requires that the present value of assets equal the present value of liabilities and that the Macaulay (or modified)… | fact | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$) 2. $D_{Mac}(A) …” |
| The Macaulay duration of a single lump-sum payment equals the time until it is paid. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| The present value of a single payment is the amount times (1+i) raised to the negative number of years until payment. | formula | elsewhere | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| The Macaulay duration of a portfolio is the present-value-weighted average of the individual assets' Macaulay durations, so the portfolio d… | fact | tagged | Portfolio: “- **[[Duration]] of a portfolio**: the weighted average of individual asset durations, weighted by …” |
| The amount invested in a bond equals its present value (price) at the valuation interest rate, so the asset PV is the sum of the amounts in… | definition | linked | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |

</details>

<details><summary><code>fm-206</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a coupon bond equals the present value of its coupons (coupon amount times an annuity-immediate factor) plus the present value… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| Convert an annual nominal yield convertible semiannually to a per-period effective rate by dividing by 2, and use 2n coupon periods for an … | procedure | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| Each semiannual coupon equals the face amount times the annual coupon rate divided by 2. | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The present value of an n-period annuity-immediate at periodic rate j is a_{n\|j} = (1 - (1+j)^{-n})/j. | formula | elsewhere | Annuity Immediate: “$$= \frac{1-(1+i)^{-n}}{i}$$” |
| To find the number of periods from an equation of the form (1+j)^{-N} = w, solve N = -ln(w)/ln(1+j) by taking logarithms. | procedure | elsewhere | Number of Periods: “$$n = \frac{\ln(FV/PV)}{\ln(1+i)}$$” |

</details>

<details><summary><code>fm-207</code> · gap</summary>

Tagged pages: Simple vs Compound Interest, Simple Interest, Compound Interest, Accumulated Value, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Under simple interest, interest credited each year equals the principal times the annual simple rate in effect that year, so it is constant… | fact | tagged | Simple vs Compound Interest: “Simple interest adds a constant **amount** each period, so its effective rate in period $n$, $i_n =…” |
| Simple interest accumulation is A(t) = P(1 + i t); interest earned during year t is P*i when the rate is constant over that year. | formula | tagged | Simple Interest: “$$A(t) = P(1 + it)$$” |
| A nominal annual rate i^(m) compounded m times per year credits interest at an effective rate of i^(m)/m per period, giving an effective an… | definition | tagged | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |
| Interest credited during a given year equals the accumulated value at the end of that year minus the accumulated value at the start of that… | procedure | missing |  |
| Under compound interest, the accumulated value after n periods is P(1 + i)^n, with i the per-period effective rate. | formula | tagged | Compound Interest: “$$A(t) = P(1+i)^t$$” |

</details>

<details><summary><code>fm-208</code> · gap</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Perpetuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an arithmetically increasing perpetuity-immediate with first payment P and annual increase Q is P/i + Q/i^2. | formula | tagged | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| An equivalent effective rate for a shorter period is found by raising 1+i to the fractional power of the period length (e.g., semiannual ra… | formula | missing |  |
| Decompose a stream of payments made twice a year with annual step increases into two annual-payment perpetuities, one with payments at mid-… | procedure | missing |  |
| To value a perpetuity whose payments begin a fraction of a year earlier than the standard timing, value it with the standard formula and th… | procedure | tagged | Perpetuity: “each payment comes one period earlier than under the perpetuity-immediate, so its value is $(1+i)\,…” |
| The present value of a stream of cash flows equals the sum of the present values of its component streams. | fact | linked | Annuities: “Its value on any date is the sum of the values of its payments on that date” |

</details>

<details><summary><code>fm-209</code> · gap</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Annuity Due, Future Value, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| When deposits earn interest at rate i but the interest is reinvested at a different rate j, the interest earned each period is computed on … | procedure | tagged | Fund Accumulation (collapsed): “Since the \$$500$ principal stays in Fund A, it earns level interest of $500(0.05) = \$25$ per year…” |
| Interest paid on a level deposit at rate i at the end of each year forms an increasing annuity of payments i·D, 2i·D, 3i·D, ... when each d… | fact | missing |  |
| The accumulated value at the end of n periods of an increasing annuity-immediate with payments 1, 2, ..., n is (Is)_{n\|} = (s̈_{n\|} − n)/… | formula | elsewhere | Increasing Annuity: “$$(Is)_{\overline{n}\\|} = \frac{\ddot{s}_{\overline{n}\\|} - n}{i}$$” |
| The accumulated value of an annuity-due of n level payments at rate j is s̈_{n\|} = ((1+j)^n − 1)/d, where d = j/(1+j). | formula | tagged | Annuity Due: “$$= \frac{(1+i)^n - 1}{d}$$” |

</details>

<details><summary><code>fm-210</code> · untagged</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Loans, Future Value, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment on a loan repaid by end-of-year payments equals the loan amount divided by the present value annuity-immediate factor a_a… | formula | linked | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The accumulated value at the end of n periods of level end-of-period payments is the payment times the accumulated annuity-immediate factor… | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When loan payments are reinvested at a different rate than the loan rate, compute the payment using the loan rate, then accumulate the paym… | procedure | tagged | Fund Accumulation: “A common Exam FM scenario: amounts withdrawn from one fund are immediately deposited into and accum…” |
| Total interest earned on reinvested payments equals the accumulated value of the deposits at the end of the term minus the total amount dep… | procedure | elsewhere | Loan Amortization: “Over the whole loan the principal portions add up to $L$, so the total interest is the total of the…” |

</details>

<details><summary><code>fm-211</code> · untagged</summary>

Tagged pages: Perpetuity, Present Value, Annuity Due, Level Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible monthly, i^(12), gives an effective monthly rate of i^(12)/12. | definition | elsewhere | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| The accumulated value at time n of an annuity-due of 1 per period is s̈_{n\|i} = ((1+i)^n - 1)/d, where d = i/(1+i). | formula | tagged | Annuity Due: “$$\ddot{s}_{\overline{n}\\|} = (1+i)\,s_{\overline{n}\\|}$$” |
| To accumulate a fund over a period with no further deposits, multiply its value at the start of the period by (1+i)^t. | procedure | elsewhere | Accumulated Value: “Under [[Compound Interest]] at rate $i$, $a(t) = (1+i)^t$, so $AV = PV \cdot (1+i)^t$.” |
| The present value of a perpetuity-due paying 1 per period is ä_∞ = 1/d = (1+i)/i. | formula | tagged | Perpetuity: “$$\ddot{a}_{\overline{\infty}\\|} = \frac{1}{d}$$” |
| Solve for an unknown payment by setting the accumulated value of the contributions equal to the present value of the payouts at the same va… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| A perpetuity-due whose first payment is at time T has its present value, valued at time T, equal to (1+i)/i per unit payment, so the fund a… | fact | tagged | Perpetuity: “For a **perpetuity-due** (payments at the start of each period), each payment comes one period earl…” |

</details>

<details><summary><code>fm-212</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The outstanding loan balance immediately after a payment is the amount of principal still owed, equal to the present value of the remaining… | definition | tagged | Loans: “The [[Outstanding Balance]] at any time is computed by either of two equivalent methods: the **pros…” |
| Retrospective method: the outstanding balance after time k equals the original loan accumulated with interest to time k minus the accumulat… | procedure | tagged | Outstanding Balance: “$$OB_k = L(1+i)^k - P \cdot s_{\overline{k}\\|i}$$” |
| The accumulated value at the time of the last payment of an n-period annuity-immediate of 1 per period is s_angle(n) at rate i = ((1+i)^n -… | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| If the level payment is less than the interest due on the loan (interest accrued in a period), the outstanding balance grows over time (neg… | fact | tagged | Loan Amortization: “A payment equal to the interest due repays no principal and leaves the balance unchanged; a smaller…” |

</details>

<details><summary><code>fm-213</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond's price equals the present value of its coupons and redemption value discounted at the yield rate, so the yield is the periodic rate… | fact | tagged | Yield Rate: “the interest rate per period at which the present value of all future cash flows equals the current…” |
| A bond's coupon per period equals the face amount times the coupon rate per period; a nominal annual coupon rate convertible semiannually g… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| To find a bond's yield, set the number of periods to the number of coupon payments, enter the price, coupon, and redemption value as PV, PM… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |
| A nominal annual rate i^(m) convertible m times per year converts to an annual effective rate via i = (1 + i^(m)/m)^m − 1. | formula | elsewhere | Nominal Interest Rate Convertible m-thly: “\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i” |

</details>

<details><summary><code>fm-214</code> · untagged</summary>

Tagged pages: Nominal Discount Rate, Nominal Discount Rate Convertible m-thly, Force of Interest, Accumulated Value, Discount Rate, Effective Discount Rate, Convertible m-thly, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| With a nominal annual discount rate d^(m) convertible m times per year, the accumulated value of an investment P after n years is P(1 - d^(… | formula | tagged | Nominal Discount Rate: “$$a(t) = \left(1 - \frac{d^{(m)}}{m}\right)^{-mt}$$” |
| A nominal annual rate of discount d^(m) convertible m times per year means the effective discount rate per 1/m-year period is d^(m)/m. | definition | tagged | Nominal Discount Rate: “the year is split into $m$ periods of length $1/m$, and each is charged discount at the effective r…” |
| Under a constant force of interest δ, the accumulated value of an investment P after n years is P e^(δn). | formula | tagged | Force of Interest: “$$a(t) = e^{\delta t}$$” |
| To find the time at which two fund balances are equal, set the two accumulated value expressions equal and solve for the time by taking nat… | procedure | elsewhere | Equation of Value: “Every cash flow must be moved to the same comparison date before comparing, each at the [[Interest …” |

</details>

<details><summary><code>fm-215</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Accumulated Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| An annuity-immediate makes payments at the end of each period, so the first payment occurs at time 1. | definition | elsewhere | Annuity Immediate: “An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period.” |
| A geometrically increasing annuity has payments that grow by a constant percentage g each period, so the k-th payment equals the first paym… | definition | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |
| The present value of an n-period geometric annuity-immediate with first payment P, growth rate g and interest rate i (i not equal to g) is … | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| The accumulated value of an n-period geometric annuity-immediate at time n is P[(1+g)^n - (1+i)^n]/(g - i), equal to the present value time… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| To solve for an unknown payment, set up an equation of value by equating the present value (or accumulated value) of the payment stream to … | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |

</details>

<details><summary><code>fm-216</code> · gap</summary>

Tagged pages: Bond Amortization, Amortization of Premium, Bonds, Book Value, Face Value, Coupon, Coupon Rate, Term of Bond, Accumulation of Discount

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond with redemption value C, coupon Fr, and yield per period i is P = C + (Fr - Ci)·a_{n\|i} (premium/discount formula), wh… | formula | linked | Bond Price: “An equivalent form is the **premium/discount formula**: $P = C + (Fr - Cj) \cdot a_{\overline{n}\\|j…” |
| Convert an annual nominal rate convertible semiannually to a per-period effective rate by dividing by 2, and the annual coupon rate paid se… | procedure | tagged | Coupon Rate: “For a bond paying semi-annually with a $6\%$ annual coupon rate, the per-period coupon rate is $r =…” |
| The present value of an n-period annuity-immediate at periodic rate i is a_{n\|i} = (1 - v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The coupon Fr is the face value times the coupon rate per period, and the discount on a bond purchase is the redemption value minus the pur… | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| When the redemption value is unknown, set the bond price equal to the premium/discount formula with C as the unknown, with Fr and Ci both e… | procedure | missing |  |

</details>

<details><summary><code>fm-217</code> · gap</summary>

Tagged pages: Perpetuity, Accumulated Value, Level Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at time n of an increasing annuity-immediate with payments 1, 2, ..., n at the end of years 1 to n is (Is)_{n\|i} = (… | formula | elsewhere | Increasing Annuity: “$$(Is)_{\overline{n}\\|} = \frac{\ddot{s}_{\overline{n}\\|} - n}{i}$$” |
| The present value of a perpetuity-immediate paying P each period at effective rate i per period is P/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The price of an investment equals the present value of its payments at the valuation rate, so a purchase made with an account balance sets … | fact | missing |  |
| The accumulated value of an annuity-due, s̈_{n\|i}, is the value at time n of n unit payments made at the start of each year, equal to ((1+… | definition | elsewhere | Annuity Due: “- The accumulated value at the end of the last period (one period after the final payment) is $\ddo…” |
| To find an unknown effective interest rate from an annuity equation that cannot be solved algebraically, solve numerically (e.g., with a fi… | procedure | missing |  |

</details>

<details><summary><code>fm-218</code> · untagged</summary>

Tagged pages: Loan Repayment Comparison, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a level annuity-immediate of 1 per period for n periods at effective rate i is a_angle(n) = (1 - v^n)/i. | definition | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The outstanding loan balance at any time equals the present value of the remaining payments at the loan's interest rate (prospective method… | fact | tagged | Outstanding Balance: “**Prospective method** (present value of future payments):” |
| Roll the balance forward one period by accumulating it at interest for one year and subtracting the payment made at the end of that year. | procedure | linked | Loan Amortization: “$$B_k = B_{k-1}(1+i) - K_k$$” |
| An additional (extra) principal payment made at the time of a regular payment reduces the outstanding balance dollar for dollar. | procedure | linked | Loan Amortization: “$$B_k = B_{k-1}(1+i) - K_k$$” |
| After a change in repayment, the new level payment equals the current outstanding balance divided by the annuity-immediate factor for the n… | procedure | linked | Loan Amortization (collapsed): “X &= \frac{10000 - 3545.95}{v^4\,a_{\overline{4}\\|}}” |

</details>

<details><summary><code>fm-219</code> · gap</summary>

Tagged pages: Duration, Immunization, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| The Macaulay duration of a cash flow set is the present-value-weighted average of payment times: sum of t*C_t*v^t divided by sum of C_t*v^t. | formula | linked | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| The present value of a cash flow stream at annual effective rate i is the sum of C_t*v^t, where v = 1/(1+i). | formula | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| When an unknown asset amount is not given, determine it by setting the present value of the assets equal to the present value of the liabil… | procedure | tagged | Immunization: “1. $PV(assets) = PV(liabilities)$” |
| In the Macaulay duration of equal-amount cash flows, the common amount X cancels from the numerator and denominator, so the duration depend… | fact | missing |  |

</details>

<details><summary><code>fm-220</code> · answerable</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Loans, Future Value, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| The level end-of-year payment that amortizes a loan L over n years at effective rate i is L divided by the present value annuity-immediate … | formula | linked | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The accumulated value at time n of level end-of-year payments of 1 at effective rate j is the annuity-immediate accumulation factor s_{n\|j… | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When loan payments received by the lender are reinvested at a different rate than the loan rate, compute the lender's accumulated value by … | procedure | tagged | Reinvestment of Coupons: “When coupons are reinvested at a rate $r_i$ per period, the **accumulated value** at the end of $n$…” |
| The lender's annual effective yield over the term is the rate i solving (amount lent)(1+i)^n = accumulated value of reinvested payments at … | procedure | tagged | Reinvestment of Coupons (collapsed): “The realized yield $r$ satisfies $1000(1+r)^4 = 1297.25$, giving $(1+r)^4 = 1.29725$, so $r = 1.297…” |

</details>

<details><summary><code>fm-221</code> · gap</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Forward Rate, Present Value, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| A zero-coupon bond pays no coupons and returns its accumulated value (principal plus compound interest at its effective annual rate) at mat… | definition | tagged | Spot Rate: “The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exa…” |
| The accumulated value of an investment P at annual effective rate i after n years is P(1+i)^n. | formula | linked | Accumulated Value: “Under [[Compound Interest]] at rate $i$, $a(t) = (1+i)^t$, so $AV = PV \cdot (1+i)^t$.” |
| An immediate annuity makes level payments at the end of each period, so a two-year immediate annuity pays at times 1 and 2. | definition | linked | Annuity Immediate: “An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period.” |
| In cash-flow matching with reinvestment risk, the surplus from an asset maturing before a liability payment (maturity proceeds minus the pa… | procedure | missing |  |
| To find the break-even reinvestment rate, set the accumulated assets (reinvested surplus plus later maturity proceeds) equal to the final l… | procedure | missing |  |

</details>

<details><summary><code>fm-222</code> · answerable</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Forward Rate, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| A spot rate s_t is the annual effective yield on a zero-coupon investment made today with a term of t years. | definition | tagged | Spot Rate: “The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exa…” |
| An implied forward rate is the rate for a future period, locked in today, that is implied by the current term structure of spot rates. | definition | tagged | Forward Rate: “A **forward rate** $f_{t_1, t_2}$ is the interest rate agreed upon today for an investment (or loan…” |
| The forward rate over one year starting at time t satisfies (1+s_t)^t (1+f_t) = (1+s_{t+1})^{t+1}, so 1+f_t = (1+s_{t+1})^{t+1}/(1+s_t)^t. | formula | tagged | Forward Rate: “$$f_{t, t+1} = \frac{(1+s_{t+1})^{t+1}}{(1+s_t)^t} - 1$$” |
| The one-year rate for year n (the nth year) is the one-year forward rate deferred n-1 years, so the fifth year corresponds to the forward r… | fact | tagged | Spot Rates and Forward Rates: “$$(1+s_t)^t = (1+f_{0,1})(1+f_{1,2})\cdots(1+f_{t-1,t})$$” |

</details>

<details><summary><code>fm-223</code> · answerable</summary>

Tagged pages: Duration, Bonds, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of a bond's cash flows, i.e. the sum of t times the present value of the cash … | definition | linked | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| The Macaulay duration of a zero-coupon bond equals its time to maturity, because all of its cash flow occurs at maturity. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term, but for a coup…” |
| Modified duration equals Macaulay duration divided by (1+i), where i is the annual effective yield rate. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-224</code> · untagged</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Duration Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| Exact cash-flow matching (asset-liability matching) means choosing assets whose cash flows equal the liability cash flows in amount and tim… | definition | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date, wh…” |
| A zero-coupon bond pays a single face amount at maturity with no intermediate coupons, so matching a liability at time t uses the zero-coup… | definition | tagged | Asset-Liability Portfolio (collapsed): “Purchase a 4-year zero-coupon bond with face value $50{,}000$ at a cost of” |
| The price of a zero-coupon bond with face F maturing in t years at annual effective spot yield y_t is F/(1+y_t)^t, i.e., the present value … | formula | tagged | Asset-Liability Portfolio (collapsed): “$$50{,}000(1.05)^{-4} = 41{,}135.12$$” |
| Each maturity's zero-coupon bond is priced with its own spot yield (from the yield curve), so cash flows at different times are discounted … | fact | elsewhere | Spot Rates and Forward Rates: “convert whichever rates are given to spot rates (or to a product of forward-rate factors), then dis…” |

</details>

<details><summary><code>fm-225</code> · answerable</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Forward Rate, Present Value, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| The n-year spot rate is the annual effective rate of return on a zero-coupon investment made today and maturing at time n, used to discount… | definition | tagged | Spot Rates and Forward Rates: “The [[Spot Rate]] $s_t$ is the annual effective rate earned on an investment made now and repaid in…” |
| The present value of a cash flow C paid at time n is C/(1+s_n)^n, where s_n is the n-year spot rate. | formula | tagged | Spot Rates and Forward Rates: “$$PV = \sum_{t} \frac{C_t}{(1+s_t)^t}$$” |
| The present value of a series of cash flows under a spot rate curve is the sum of each cash flow discounted separately at the spot rate mat… | procedure | tagged | Spot Rates and Forward Rates: “convert whichever rates are given to spot rates (or to a product of forward-rate factors), then dis…” |

</details>

<details><summary><code>fm-226</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a zero-coupon bond equals its face value times v^n, where v = 1/(1+i) and n is the years to maturity. | formula | linked | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| The price of a coupon bond is the present value of its coupons plus the present value of its redemption value: P = Fr·a_{n\|i} + C·v^n, whe… | formula | tagged | Bond Price: “Here $F$ is the face value, $r$ is the coupon rate per period (so $Fr$ is the periodic coupon amoun…” |
| The present value of an n-period annuity-immediate satisfies i·a_{n\|i} = 1 − v^n. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| A bond's coupon rate is the coupon amount per period as a fraction of face value, and the yield rate is the effective interest rate at whic… | definition | tagged | Coupon Rate: “The **coupon rate** $r$ is the rate applied to the face value $F$ of a bond to determine each perio…” |

</details>

<details><summary><code>fm-227</code> · answerable</summary>

Tagged pages: Duration, Bonds, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| The Macaulay duration of a zero-coupon bond equals its term to maturity. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| Find the annual effective yield rate of a zero-coupon bond by equating its price to the present value of its face amount, i.e. price times … | procedure | linked | Yield Rate: “the interest rate per period at which the present value of all future cash flows equals the current…” |
| Modified duration equals Macaulay duration divided by (1+i), where i is the annual effective yield rate. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-228</code> · answerable</summary>

Tagged pages: Duration, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average of the times at which cash flows occur, i.e., the sum of t times PV of the cash flo… | definition | linked | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| Macaulay duration = [Σ t·CF_t·v^t] / [Σ CF_t·v^t], where v = 1/(1+i). | formula | linked | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| Discount each cash flow to present value at the effective annual interest rate by multiplying by (1+i)^(-t), then sum the present values to… | procedure | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |

</details>

<details><summary><code>fm-229</code> · answerable</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization is a strategy that matches assets to liabilities so that the net present value (assets minus liabilities) is protect… | definition | tagged | Redington Immunization: “**Redington immunization** is a strategy for protecting a portfolio's surplus $S = V_A - V_L$ again…” |
| Redington immunization requires three conditions at the current yield rate: present value of assets equals present value of liabilities, (m… | fact | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$) 2. $D_{Mac}(A) …” |
| Under the Redington conditions, net present value (assets minus liabilities) has a local minimum of zero at the current yield rate, so asse… | fact | tagged | Redington Immunization: “When all three hold, a small change $\Delta j$ causes $S \geq 0$ because the convexity term dominat…” |
| Redington immunization protection is only local and assumes a single yield rate for all cash flows; it is not guaranteed for large yield ch… | fact | tagged | Redington Immunization: “Redington immunization only protects against small, parallel rate shifts and must be rebalanced as …” |
| Duration measures the sensitivity of a present value to changes in the yield rate (first derivative), and convexity measures the curvature … | definition | tagged | Convexity: “**Convexity** measures the curvature of the price–yield relationship for a bond or portfolio. While…” |

</details>

<details><summary><code>fm-230</code> · untagged</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Loans, Future Value, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment on a loan of amount L repaid over n years at effective rate i equals L divided by the present value annuity-immediate fac… | formula | linked | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The accumulated value at the end of n periods of level end-of-period payments of 1 at rate i is s_{n\|i} = ((1+i)^n - 1)/i. | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When the reinvestment rate changes over time, accumulate the payments made during the first rate period to the change date using that perio… | procedure | tagged | Fund Accumulation: “$$AV_n = F_0(1+i)^n + \sum_t C_t(1+i)^{n-t}$$” |
| The yield rate (effective rate of return) on an investment is the interest rate j at which the amount invested accumulates to the total acc… | definition | elsewhere | Rate of Return: “The **rate of return** on an investment is the interest rate at which the money put in and the mone…” |
| To find the annual effective yield, set the initial investment times (1+j)^n equal to the accumulated value at time n of the reinvested pay… | procedure | tagged | Reinvestment of Coupons (collapsed): “The realized yield $r$ satisfies $1000(1+r)^4 = 1297.25$, giving $(1+r)^4 = 1.29725$, so $r = 1.297…” |

</details>

<details><summary><code>fm-232</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan, Balloon Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| The outstanding loan balance at the beginning of year t+1 equals the balance immediately after the t-th payment (end of year t). | definition | tagged | Outstanding Balance: “The **outstanding balance** $OB_k$ is the remaining principal owed immediately after the $k$-th pay…” |
| The retrospective method computes the outstanding balance as the accumulated value of the original loan minus the accumulated value of the … | procedure | tagged | Loans: “the **retrospective method** (the loan accumulated to that date, less the accumulated value of the …” |
| The accumulated value of n level end-of-period payments of P at effective rate i is P·s_{n\|i}, where s_{n\|i} = ((1+i)^n − 1)/i. | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| A balloon payment at the end of the loan does not affect the outstanding balance before it is paid, so balances prior to that time depend o… | fact | tagged | Outstanding Balance: “the retrospective method needs only the original loan and the payments already made, which makes it…” |

</details>

<details><summary><code>fm-233</code> · gap</summary>

Tagged pages: Accumulated Value, Compound Interest, Annuity Due, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A deposit made at the beginning of year n (annuity-due timing) occurs at time n-1, so deposits for years 1 through N occur at times 0 throu… | definition | missing |  |
| To write an equation of value, choose a comparison date and equate the present value (or accumulated value) of all deposits to the present … | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The present value at time 0 of an amount at time t under annual effective rate i is the amount times (1+i)^(-t). | formula | elsewhere | Time Value of Money: “for $t < s$ it is discounted by $v^{s-t}$, where $v = 1/(1+i)$ is the [[Discount Factor]] ([[Presen…” |
| With a changing interest rate, discount a cash flow across successive rate periods by multiplying the discount factors for each period (e.g… | procedure | missing |  |
| A cash flow occurring before the rate changes is discounted only at the first rate, while one occurring after the change is discounted at t… | fact | missing |  |

</details>

<details><summary><code>fm-234</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond with annual coupons equals the present value of the coupons plus the present value of the redemption value: P = Fr·a_{n… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The annual coupon amount equals the coupon rate times the face (par) value; for a par-value bond the redemption value equals the face value. | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| The present value of an n-year annuity-immediate at effective rate i is a_{n\|i} = (1 - v^n)/i, where v = 1/(1+i). | formula | tagged | Bond Price: “$$a_{\overline{20}\\|3\%} = \frac{1 - v^{20}}{0.03} = 14.877475$$” |
| To find an unknown coupon rate when two bonds have equal prices at the same yield rate, compute the first bond's price, set the second bond… | procedure | missing |  |
| A bond's price is determined by discounting its cash flows at the yield rate (the investor's effective annual yield), so the yield rate ser… | fact | tagged | Bonds: “**[[Bond Price\\|Price]]** — Present value of all future cash flows at the yield rate” |

</details>

<details><summary><code>fm-235</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual yield rate compounded semiannually equals twice the effective semiannual rate, so the effective rate per half-year is the … | definition | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| The coupon per period equals the coupon rate per period times the face amount (annual coupon rate divided by the payment frequency, multipl… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The price of a bond is the present value of its coupons plus the present value of its redemption value at the yield rate: P = Fr·a_{n\|j} +… | formula | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| The present value of an n-period annuity-immediate at periodic rate j is a_{n\|j} = (1 − v^n)/j, with v = 1/(1+j). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To compare two bonds with the same term and yield rate, write each price with the bond formula and subtract; terms common to both (such as … | procedure | missing |  |

</details>

<details><summary><code>fm-236</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Perpetuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-payment geometrically increasing annuity-immediate with first payment P, growth rate g and interest rate i (i ≠ g… | formula | tagged | Geometric Increasing Annuity: “The present value (at effective rate $i \neq g$) is:” |
| The present value of a perpetuity-immediate whose first payment is P and which grows at constant rate g is P/(i − g), valid for g < i. | formula | tagged | Geometric Progression: “\text{PV} = \frac{5000}{0.08 - 0.02} = \frac{5000}{0.06} = 83{,}333” |
| For payments that grow at different rates in different periods, split the cash flows into segments, value each segment separately, and sum … | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “PV &= 100\,a_{\overline{3}\\|0.08} + 2{,}060\,(1.08)^{-3} \\” |
| To value a deferred growing perpetuity, compute its value one period before its first payment using the perpetuity formula, then discount t… | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| With payments growing at rate g, the k-th payment equals the first payment times (1+g)^(k−1), and a payment after a change in growth rate e… | fact | tagged | Geometric Increasing Annuity: “payments are $1, (1+g), (1+g)^2, \ldots, (1+g)^{n-1}$” |

</details>

<details><summary><code>fm-237</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Perpetuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A perpetuity-immediate pays at the end of each period forever, with the first payment one period from now. | definition | tagged | Perpetuity: “For a **perpetuity-immediate** (payments at end of each period)” |
| The present value of a geometrically changing perpetuity-immediate with first payment P and payment growth rate g is P/(i - g), valid for i… | formula | tagged | Geometric Progression: “$$\text{PV} = \frac{5000}{0.08 - 0.02} = \frac{5000}{0.06} = 83{,}333$$” |
| Payments that decrease by r% each year form a geometric sequence with growth rate g = -r/100 (ratio 1 - r/100), so the perpetuity present v… | fact | tagged | Geometric Increasing Annuity: “A **geometric increasing (or decreasing) annuity** has payments that grow (or shrink) at a constant…” |
| The price of an annuity equals the present value of its payments at the effective yield rate, so setting the price equal to the PV formula … | fact | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |

</details>

<details><summary><code>fm-238</code> · untagged</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Perpetuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The effective rate over a k-year period equals (1+i)^k - 1, where i is the annual effective rate. | formula | elsewhere | Payment Period: “$$j = (1+i)^{1/m} - 1$$” |
| To value payments made every k years, treat each k-year period as one period and use the k-year effective rate in standard annuity or perpe… | procedure | elsewhere | Payment Period: “Every annuity factor is computed per payment period, so $i$ must be the effective rate for that int…” |
| The present value of an arithmetically increasing perpetuity-immediate with first payment P and increase Q per period at periodic rate j is… | formula | linked | Arithmetic Progression: “With $P, Q > 0$ and no end date, the [[Perpetuity\\|perpetuity]]-immediate is worth $P/i + Q/i^2$.” |
| A perpetuity-immediate makes its first payment one period after the valuation date, with payments continuing forever at regular intervals. | definition | tagged | Perpetuity: “For a **perpetuity-immediate** (payments at end of each period) the present value is obtained by le…” |

</details>

<details><summary><code>fm-239</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of its redemption value at the yield rate: P = Fr·a_{n\|… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A coupon is the face amount times the coupon rate per period (Fr), and it is paid each period independent of the redemption value C and the… | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| A nominal annual rate convertible semiannually equals a periodic rate of half the nominal rate per half-year, and the number of periods is … | fact | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| The present value of an n-period annuity-immediate is a_{n\|i} = (1 − v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| When a price changes by a percentage (e.g. 7% less), the new price equals the old price times one minus that percentage, which allows setti… | procedure | missing |  |

</details>

<details><summary><code>fm-240</code> · answerable</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Full Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| A portfolio is fully immunized against a liability when the present value of assets equals the present value of liabilities, the Macaulay d… | definition | tagged | Full Immunization: “1. $PV(\text{assets}) = PV(\text{liability})$ at the current rate $i$” |
| The Macaulay duration of a single payment (zero-coupon bond) equals its time to payment. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| The Macaulay duration of a portfolio is the present-value-weighted average of the times of the cash flows: sum of t times PV of cash flow a… | formula | linked | Macaulay Duration: “$$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$” |
| Set up two equations, one equating asset and liability present values and one equating asset and liability durations, in terms of the prese… | procedure | tagged | Full Immunization: “Dividing through by $v^T$ reduces them to $A(1+i)^{a} + B(1+i)^{-b} = L$ and $a\,A(1+i)^{a} = b\,B(…” |
| Convert the present value of a zero-coupon bond back to its maturity value by accumulating at the effective interest rate for its term, i.e… | procedure | tagged | Full Immunization (collapsed): “A &= 500(1.04)^{-5} = 410.96 \\” |
| For full immunization of a single liability, the asset cash flows must be spread on both sides of the liability's due date, so the asset co… | fact | tagged | Full Immunization: “3. There is an asset cash flow before the liability date and one after it” |

</details>

<details><summary><code>fm-241</code> · untagged</summary>

Tagged pages: Net Present Value, Yield Rate, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| The net present value of an investment is the present value of its cash inflows minus the present value of its outflows, discounted at a gi… | definition | tagged | Net Present Value: “$$= PV(\text{inflows}) - PV(\text{outflows})$$” |
| Discount (or accumulate) the investment outlay and the cash inflows at the stated valuation rate to set up an equation of value at a chosen… | procedure | elsewhere | Equation of Value: “$$\text{Value}_{t_0}(\text{inflows}) = \text{Value}_{t_0}(\text{outflows})$$” |
| A payment of P accumulated for n years at annual effective rate i grows to P(1+i)^n. | formula | linked | Accumulated Value: “$$AV = \sum_k C_{t_k} \cdot (1+i)^{t - t_k}$$” |
| When interim cash flows are reinvested at a rate i, each cash flow is accumulated at i to the end of the term, so a level payment C receive… | procedure | linked | Accumulated Value: “$$AV = \sum_k C_{t_k} \cdot (1+i)^{t - t_k}$$” |
| The valuation (discount) rate used for the NPV and the reinvestment rate are distinct rates; the NPV condition at the valuation rate fixes … | fact | elsewhere | Reinvestment of Coupons: “**Reinvestment of coupons** refers to the practice of investing each periodic coupon payment at a r…” |

</details>

<details><summary><code>fm-242</code> · gap</summary>

Tagged pages: Annuities, Level Annuity, Present Value, Annuity Immediate, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-immediate paying 1 per period at effective rate i is 1/i, valued one period before the first payment. | formula | linked | Perpetuity: “A **perpetuity** is an annuity that pays 1 per period forever. For a **perpetuity-immediate** (paym…” |
| The present value of an n-period annuity-immediate paying 1 per period is a_angle_n = (1 - v^n)/i. | formula | tagged | Annuities: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| When the interest rate changes over time, split the cash flows at the rate-change time, value the later payments at that time using the lat… | procedure | missing |  |
| Value a deferred perpetuity or annuity at one period before its first payment, then discount that value back to time 0 by the deferral peri… | procedure | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| A payment at time t is discounted over the time interval between the payment and the valuation date using the interest rate in effect durin… | fact | missing |  |

</details>

<details><summary><code>fm-243</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan, Drop Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment of an n-period loan with principal L at periodic rate i is X = L / a_{n\|i}, where a_{n\|i} = (1 - v^n)/i. | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| An annual nominal interest rate convertible monthly, i^(12), corresponds to an effective monthly rate of i^(12)/12. | definition | tagged | Loans: “Monthly rate: $i^{(12)}/12 = 0.06/12 = 0.5\%$.” |
| The outstanding loan balance at any time equals the present value of the remaining payments, discounted at the loan's interest rate (prospe… | fact | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| To find the number of payments made or remaining, set the balance equal to the payment times a_{n\|i} and solve for n, using the rate in ef… | procedure | tagged | Term of Loan (collapsed): “$5000 = 900\,a_{\overline{n}\\|8\%}$, so $a_{\overline{n}\\|} = 5.555556$:” |
| On refinancing, the current balance becomes the new principal, and the number of payments needed at the new rate and unchanged payment is f… | procedure | elsewhere | Refinancing: “**Shorter term**: keep the old payment and solve for $n'$, with a smaller final [[Drop Payment]] if…” |
| When the solved number of payments n is not an integer, the loan needs the integer part as full payments plus one smaller final payment, so… | fact | tagged | Term of Loan: “8 payments needed, with a smaller final payment: 7 full payments of $900$” |
| The total number of payments equals the payments made before refinancing plus the number of payments required after refinancing, including … | procedure | elsewhere | Refinancing (collapsed): “So 10 full payments and a smaller 11th.” |

</details>

<details><summary><code>fm-244</code> · gap</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an annuity-immediate equals the sum of each payment times v raised to its payment time, so a payment stream can be spl… | fact | tagged | Non-level Annuities: “Any non-level cash flow stream can be valued by discounting each payment individually:” |
| The present value of an n-year level annuity-immediate paying 1 per year is a_angle_n = (1 - v^n)/i, where v = 1/(1+i). | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The present value of an annuity-immediate with first payment P and payments increasing by Q each year is P*a_n + Q*(a_n - n v^n)/i. | formula | tagged | Arithmetic Increasing Annuity: “$$PV = P \cdot a_{\overline{n}\\|} + \frac{Q}{i}\!\left(a_{\overline{n}\\|} - nv^n\right)$$” |
| The increasing annuity-immediate paying 1, 2, ..., n at times 1 to n has present value (Ia)_n = (ä_n - n v^n)/i, with the annuity-due ä_n i… | formula | tagged | Arithmetic Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |
| The annuity-due factor is ä_n = (1+i) a_n = (1 - v^n)/d, the present value of n payments of 1 made at the start of each year. | definition | linked | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |
| To find an unknown payment increment, set the present value formula for the increasing annuity equal to the given price and solve for the i… | procedure | missing |  |

</details>

<details><summary><code>fm-245</code> · answerable</summary>

Tagged pages: Geometric Increasing Annuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| An annuity-immediate makes payments at the end of each period, so the k-th payment occurs at time k and is discounted by v^k = (1+i)^{-k}. | definition | linked | Annuity Immediate: “An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period.” |
| A geometrically increasing annuity has payments where each payment is (1+g) times the previous one, so the k-th payment equals the first pa… | definition | tagged | Geometric Progression: “a **geometric progression** refers to a sequence of payments where each payment is a constant multi…” |
| The present value of an annuity is the sum of each payment multiplied by its discount factor (1+i)^{-t}. | fact | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| The present value of an n-year geometrically increasing annuity-immediate with first payment P, growth rate g and interest rate i is P·[1 −… | formula | tagged | Geometric Increasing Annuity (collapsed): “\text{PV} &= 20{,}000 \cdot \frac{1-0.46673346}{0.07-0.03}” |

</details>

<details><summary><code>fm-246</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The outstanding balance of a level-payment loan just before the final payment equals the present value of the single remaining payment, i.e… | fact | linked | Balloon Payment: “Either way, the balloon payment is the [[Outstanding Balance]] just after the previous payment, acc…” |
| For a level-payment loan of n payments of R, the principal repaid in year t is R v^(n-t+1). | formula | tagged | Amortization: “Principal in payment $k$: $PR_k = P \cdot v^{n-k+1}$” |
| Divide the expressions for two principal or balance quantities to cancel R and solve for v^k, then obtain v and the effective interest rate… | procedure | missing |  |
| Interest paid in year 1 equals the effective interest rate times the original loan amount, since the outstanding balance at the start is th… | fact | tagged | Principal: “It is the basis on which interest is computed in the first period ($\text{Interest}_1 = L \times i$…” |

</details>

<details><summary><code>fm-247</code> · gap</summary>

Tagged pages: Simple vs Compound Interest, Simple Interest, Compound Interest, Present Value, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Under simple interest at rate i, the accumulated value after n years is PV(1 + n·i), so the present value of an amount Y due in n years is … | formula | tagged | Simple Interest: “$$A(t) = P(1 + it)$$” |
| Under compound interest at rate i, the accumulated value after n years is PV(1+i)^n, so the present value of Y due in n years is Y/(1+i)^n … | formula | tagged | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| Under simple discount at annual rate d, the present value of an amount Y due in n years is Y(1 − n·d). | formula | tagged | Simple vs Compound Interest: “The discount counterparts are simple discount, $a(t)^{-1} = 1 - dt$, and compound discount, $a(t)^{…” |
| Under compound discount at annual rate d, the present value of an amount Y due in n years is Y(1 − d)^n. | formula | tagged | Simple vs Compound Interest: “The discount counterparts are simple discount, $a(t)^{-1} = 1 - dt$, and compound discount, $a(t)^{…” |
| For the same numerical rate and a multi-year term (n>1), the present value factors are ordered: simple discount < compound discount < compo… | fact | missing |  |
| To determine the amount to invest now to accumulate to a target value, compute the present value of the target using the stated interest or… | procedure | tagged | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |

</details>

<details><summary><code>fm-248</code> · answerable</summary>

Tagged pages: Bond Price, Bonds, Book Value, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of the redemption value at the yield rate: P = Fr·a_{n\|… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The discount on a bond is the redemption value minus the purchase price; the coupon equals the face amount times the coupon rate per period. | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| A nominal annual rate convertible m times per year, i^(m), corresponds to an effective rate per period of i^(m)/m, so coupon periods and yi… | fact | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| Find a bond's yield rate per period by solving the price equation (purchase price = PV of coupons + PV of redemption) for the periodic rate… | procedure | linked | Yield Rate: “the yield rate is the $j$ that solves this equation.” |
| The book value of a bond at any time is the present value of the remaining coupons and redemption value, discounted at the original yield r… | fact | tagged | Book Value: “It equals the present value of all remaining cash flows (coupons and redemption) discounted at $j$,…” |
| To find a bond's book value after a given time, count the remaining coupon periods (total periods minus periods elapsed) and use that as n … | procedure | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |

</details>

<details><summary><code>fm-249</code> · answerable</summary>

Tagged pages: Duration, Immunization, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Immunization by exact cash-flow matching of present value requires setting the present value of asset cash flows equal to the present value… | procedure | linked | Redington Immunization: “$PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| Matching duration of assets and liabilities is done by equating the first derivatives of present value with respect to the interest rate, w… | procedure | linked | Full Immunization: “$$(T-a)\,A\,v^{T-a} + (T+b)\,B\,v^{T+b} = T\,L\,v^{T}$$” |
| The Macaulay duration of a set of cash flows is the present-value-weighted average time: sum of t*C_t*v^t divided by sum of C_t*v^t. | formula | linked | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| The present value of a cash flow C at time t at annual effective rate i is C*v^t, where v = 1/(1+i); its derivative with respect to i is pr… | formula | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |

</details>

<details><summary><code>fm-250</code> · answerable</summary>

Tagged pages: Loan Repayment Comparison, Loans, Amortization, Interest Rate, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment on a loan of amount L repaid over n years at effective annual rate i is L divided by the annuity-immediate present value … | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The total of all payments on a loan equals the total principal repaid (the original loan amount) plus the total interest paid. | fact | tagged | Loan Repayment Comparison: “$$\text{Total interest (level)} = n\,P_{\text{level}} - L$$” |
| In a loan repaid with a fixed principal amount each period plus interest on the unpaid balance, the outstanding balance at the start of per… | procedure | tagged | Loan Repayment Comparison: “Under constant-principal repayment, the principal portion each period is $L/n$, and interest is cha…” |
| Under fixed-principal repayment, the interest payments form an arithmetic sequence, so total interest is i times the sum of the outstanding… | fact | tagged | Loan Repayment Comparison: “summing the interest over all $n$ periods gives $iL\frac{n+1}{2}$.” |

</details>

<details><summary><code>fm-251</code> · answerable</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| In a level-payment amortization, the principal portion of successive payments grows geometrically at a factor of (1+j) per period, where j … | fact | tagged | Loan Amortization: “With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$, so $PR_{…” |
| For a level-payment loan of n payments with payment R, the principal repaid in payment k is P_k = R·v^(n-k+1), so P_k = P_m·(1+j)^(k-m). | formula | tagged | Amortization: “Principal in payment $k$: $PR_k = P \cdot v^{n-k+1}$” |
| Convert an annual effective interest rate i to an equivalent effective rate per period for m periods per year using j = (1+i)^(1/m) - 1. | procedure | linked | Payment Period: “$$j = (1+i)^{1/m} - 1$$” |

</details>

<details><summary><code>fm-252</code> · gap</summary>

Tagged pages: Force of Interest, Accumulated Value, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at time t of an investment of 1 at time 0 under a force of interest δ_s is exp(∫_0^t δ_s ds). | formula | linked | Variable Force of Interest: “$$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$” |
| An investment of 1 at an annual effective interest rate i accumulates to (1+i)^t after t years. | formula | linked | Accumulation Function: “\\| Compound interest (rate $i$) \\| $(1+i)^t$ \\|” |
| The integral of f'(t)/f(t) is ln f(t), so ∫ 2/(1+2t) dt = ln(1+2t), and exp(ln x) = x. | fact | linked | Accumulation Function: “The [[Force of Interest]] at any time is recovered from $a(t)$ by $\delta(t) = a'(t)/a(t) = \frac{d…” |
| To find a fund's value at another time when two funds are equal at one time, equate the two accumulation functions at that time to determin… | procedure | missing |  |

</details>

<details><summary><code>fm-253</code> · gap</summary>

Tagged pages: Annuities, Level Annuity, Present Value, Perpetuity, Annuity Immediate, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-year annuity-immediate with level payments R is R times a_angle_n = R(1 - v^n)/i, where v = 1/(1+i). | formula | tagged | Level Payment Annuity: “For a level payment $P$, $n$-period annuity-immediate at rate $i$:” |
| The present value of a level perpetuity-immediate with payment R per period is R/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| To value a perpetuity whose payments step up at a later time, decompose it into a level perpetuity from time 0 plus a deferred perpetuity o… | procedure | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| To solve for an unknown interest rate when two cash flow streams have equal present values, equate the present values and reduce to an equa… | procedure | missing |  |
| Since i > 0 and v = 1/(1+i), the discount factor v^n must be positive and less than 1, so any negative root of the quadratic in v^n is reje… | fact | missing |  |

</details>

<details><summary><code>fm-254</code> · gap</summary>

Tagged pages: Increasing Annuity, Arithmetic Increasing Annuity, Perpetuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A perpetuity-immediate makes payments at the end of each period forever, with the first payment one period after purchase. | definition | tagged | Perpetuity: “For a **perpetuity-immediate** (payments at end of each period) the present value is obtained by le…” |
| The present value of a perpetuity-immediate with first payment P that increases by Q each period is P/i + Q/i^2. | formula | linked | Arithmetic Progression: “With $P, Q > 0$ and no end date, the [[Perpetuity\\|perpetuity]]-immediate is worth $P/i + Q/i^2$.” |
| The price of an annuity or perpetuity equals the present value of its payments at the effective interest rate, so the price can be set equa… | fact | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| When solving a quadratic equation for the interest rate, the root consistent with the constraint i > 0 is the valid one. | fact | missing |  |

</details>

<details><summary><code>fm-255</code> · untagged</summary>

Tagged pages: Loan Repayment Comparison, Loans, Amortization, Interest, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value of a principal P after n years at annual effective rate i is P(1+i)^n, so interest paid on a loan repaid by a single … | formula | elsewhere | Compound Interest: “An investment of $P$ at effective annual rate $i$ grows to:” |
| A loan of amount L repaid by n level end-of-period payments has payment R = L / a_{n\|i}, where a_{n\|i} = (1 - v^n)/i is the present value… | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| Total interest paid on a loan repaid by installments equals the sum of all payments minus the original principal borrowed. | procedure | tagged | Loan Repayment Comparison: “$$\text{Total interest (level)} = n\,P_{\text{level}} - L$$” |
| Annual effective interest rate is the percentage growth of money over one year, with interest compounding annually. | definition | linked | Interest Rate: “The **effective annual interest rate** is the interest earned over a year per unit invested at the …” |

</details>

<details><summary><code>fm-256</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| For a level-payment loan of n payments with payment R at the end of each period, the principal portion of the t-th payment is R·v^(n-t+1). | formula | tagged | Amortization: “Principal in payment $k$: $PR_k = P \cdot v^{n-k+1}$” |
| For a level-payment loan of n payments, the interest portion of the t-th payment is R·(1 - v^(n-t+1)), since interest equals the payment mi… | formula | tagged | Amortization: “Level payments — interest in payment $k$: $I_k = P \cdot (1 - v^{n-k+1})$ where $v = 1/(1+i)$” |
| The discount factor v equals 1/(1+i), where i is the annual effective interest rate. | definition | elsewhere | Discount Factor: “$$v = \frac{1}{1+i}$$” |
| To find the payment where principal and interest portions are equal, set the two portion formulas equal, solve for v^(n-t+1)=0.5, and take … | procedure | missing |  |

</details>

<details><summary><code>fm-257</code> · gap</summary>

Tagged pages: Time Value of Money, Present Value, Compound Interest, Effective Rate, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a payment made at time t is the payment times v^t, where v = 1/(1+i) is the discount factor for an annual effective in… | definition | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| To find an unknown interest rate from an equation of value, set the present value of one set of cash flows equal to that of another and exp… | procedure | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| The roots of a quadratic equation ax^2 + bx + c = 0 are x = (-b ± sqrt(b^2 - 4ac)) / (2a), and two distinct roots give two possible values … | formula | missing |  |
| Each solution for v converts to an annual effective interest rate via i = 1/v - 1. | formula | tagged | Discount Factor: “$$v = \frac{1}{1+i}$$” |

</details>

<details><summary><code>fm-258</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond with redemption value C equals the present value of its coupons plus the present value of the redemption: P = Fr·a_{n\|… | formula | tagged | Bond Price: “P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n” |
| Convert a nominal annual coupon rate convertible m times per year into a per-period coupon amount by multiplying face value by the rate div… | procedure | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| Convert a nominal annual yield convertible m times per year into an effective yield per period by dividing by m, and use the number of peri… | procedure | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| The present value of an annuity-immediate of n payments at periodic effective rate j is a_{n\|j} = (1 - v^n)/j with v = 1/(1+j). | formula | elsewhere | Annuity Immediate: “a_{\overline{n}\\|} = \frac{1-v^n}{i}” |
| To find an unknown number of periods in a bond price equation, solve for N using the financial calculator's TVM keys (PV, PMT, FV, I/Y) and… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |
| When two bonds have the same purchase price, set their price expressions equal and solve for the unknown quantity. | fact | missing |  |

</details>

<details><summary><code>fm-259</code> · gap</summary>

Tagged pages: Increasing Annuity, Accumulated Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| An increasing annuity-immediate with payments 1, 2, ..., n at times 1 to n has accumulated value (Is)_{n\|} = (s̈_{n\|} - n)/i, and its pay… | definition | tagged | Increasing Annuity: “$$(Is)_{\overline{n}\\|} = \frac{\ddot{s}_{\overline{n}\\|} - n}{i}$$” |
| Decompose an arithmetically increasing payment stream (each payment rising by a constant amount) into a sum of level annuities, one startin… | procedure | missing |  |
| The present value of an n-year annuity-immediate with first payment X and payments growing at rate g is X(v + (1+g)v^2 + ... + (1+g)^{n-1}v… | formula | linked | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| An annuity-immediate makes its first payment one period after the valuation date, so its payments fall at times 1 to n and are discounted b… | fact | linked | Annuities: “an [[Annuity Immediate\\|annuity-immediate]] pays at the end of each period, an [[Annuity Due\\|annui…” |
| Set up an equation of value by choosing a comparison date and equating the accumulated or present values of all deposits to the value of al… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |

</details>

<details><summary><code>fm-260</code> · answerable</summary>

Tagged pages: Duration, Bonds, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration of a cash flow stream is the present-value-weighted average of the times of the cash flows, i.e., the sum of t times PV o… | definition | linked | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| The price of a zero-coupon bond equals the present value of its redemption value, so the market price can be used directly as the present v… | fact | tagged | Bonds: “**[[Bond Price\\|Price]]** — Present value of all future cash flows at the yield rate” |
| For a portfolio of bonds, compute the portfolio Macaulay duration by weighting each bond's maturity time by the total cost (price times num… | procedure | linked | Duration Matching (collapsed): “Purchase bonds with total market value \$$7{,}472.58$ and weighted Macaulay duration of exactly 5 y…” |
| The Macaulay duration of a zero-coupon bond equals its time to maturity. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |

</details>

<details><summary><code>fm-261</code> · gap</summary>

Tagged pages: Annuity Due, Accumulated Value, Present Value, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Set up an equation of value by accumulating the initial fund balance and the periodic withdrawals to a common comparison date and equating … | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The accumulated value at the time of the last payment of a level annuity-immediate of n payments is s_angle(n) = ((1+i)^n - 1)/i. | formula | tagged | Level Payment Annuity: “$$= P \cdot \frac{(1+i)^n - 1}{i}$$” |
| Count the number of payments in a series running from one birthday/age to another inclusive (last age minus first age plus 1), and measure … | procedure | missing |  |
| A single amount accumulates over t years at effective annual rate i to amount × (1+i)^t. | formula | linked | Compound Interest: “$$A(t) = P(1+i)^t$$” |
| A fund that is the same before the first withdrawal and after the last withdrawal at the end of the period means the accumulated value of t… | fact | tagged | Term of Annuity (collapsed): “OB_8 &= 10{,}000(1.06)^8 - 1{,}500\,s_{\overline{8}\\|}” |

</details>

<details><summary><code>fm-262</code> · answerable</summary>

Tagged pages: Increasing Annuity, Annuity Due, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| An annuity-due makes payments at the start of each period (times 0, 1, ..., n-1), and its present value is denoted ä_{n\|i} = (1 - v^n)/d. | definition | tagged | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |
| The increasing annuity-due (Iä)_{n\|i} has payments 1, 2, ..., n at times 0, 1, ..., n-1, so its present value is the value one time unit b… | definition | tagged | Increasing Annuity: “Paid at the start of each period, the annuity-due versions divide by $d$ instead of $i$: $(I\ddot{a…” |
| Decompose an arithmetic-progression payment stream (first payment P, increase Q each period) into a level annuity of (P - Q) plus Q times a… | procedure | tagged | Increasing Annuity: “A first payment $P$ rising by $Q$ a period is a level annuity of $P - Q$ plus $Q\,(Ia)_{\overline{n…” |
| To value an annuity whose first payment occurs at time k (a deferred annuity-due), compute the annuity-due value at time k (one period-star… | procedure | linked | Deferred Annuity: “$${}_{k\\|}\ddot{a}_{\overline{n}\\|} = v^k \cdot \ddot{a}_{\overline{n}\\|}$$” |

</details>

<details><summary><code>fm-263</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of an n-year annual-coupon bond with face value F, coupon rate r, and yield rate i is the premium/discount form P = F + F(r - i)·… | formula | tagged | Bond Price: “An equivalent form is the **premium/discount formula**: $P = C + (Fr - Cj) \cdot a_{\overline{n}\\|j…” |
| The present value of an n-year annuity-immediate is a_angle_n = (1 - v^n)/i, so i·a_angle_n = 1 - v^n. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The coupon rate is the annual coupon amount as a fraction of face value, and the yield rate is the effective annual interest rate used to d… | definition | tagged | Coupon Rate: “The **coupon rate** $r$ is the rate applied to the face value $F$ of a bond to determine each perio…” |
| When two bonds share the same face value, coupon rate, and yield rate but differ in term, use the first bond's price to solve for v^n (or v… | procedure | missing |  |
| The discount factor satisfies v^(kn) = (v^n)^k, so powers of v can be related by exponent rules (e.g., v^18 = 0.8^3 implies v^6 = 0.8 and v… | fact | missing |  |

</details>

<details><summary><code>fm-264</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of the redemption amount, discounted at the yield rate: … | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The present value of an n-period annuity-immediate of 1 per period at effective rate i is a_angle(n) = (1 − v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To convert an annual effective yield rate to an equivalent semiannual effective rate, solve (1+j)^2 = 1+i, so j = (1+i)^(1/2) − 1. | procedure | elsewhere | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |
| For a bond with m coupons per year, value it using n×m periods, the coupon per period, and the per-period effective yield rate equivalent t… | procedure | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| Use the first bond's price equation to solve for the unknown annual coupon amount, then take half of it as the second bond's semiannual cou… | procedure | missing |  |

</details>

<details><summary><code>fm-265</code> · untagged</summary>

Tagged pages: Nominal Interest Rate, Loans, Convertible m-thly, Nominal Interest Rate Convertible m-thly, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The effective rate for a period equals the interest earned in the period divided by the principal at the start of the period; after a payme… | procedure | linked | Interest: “$$I_t = i \cdot B_{t-1}$$” |
| A nominal annual interest rate convertible m times per year corresponds to an effective rate of i/m per compounding period, so the nominal … | definition | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| To convert an effective rate over one period to an effective rate over a longer period, compound it: one plus the longer-period rate equals… | procedure | elsewhere | Effective Discount Rate (collapsed): “i &= \left(\frac{10000}{9898.89}\right)^{365/91} - 1 \\” |

</details>

<details><summary><code>fm-266</code> · gap</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Forward Rate, Present Value, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a zero-coupon bond paying 1 at time t, P(0,t), is the present value of 1 payable at time t. | definition | elsewhere | Discount Factor: “The **discount factor** $v$ is the [[Present Value]] of $1$ payable one period in the future:” |
| Under a constant effective annual interest rate i, the price of a zero-coupon bond paying 1 at time t is P(0,t) = (1+i)^(-t), i.e. the disc… | formula | tagged | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |
| An investment of 1 made at time m grows at effective rate i to (1+i)^(n-m) at time n. | formula | linked | Accumulated Value: “Under compound interest it equals $(1+i)^{t-s}$” |
| The accumulation factor from time m to time n can be expressed using zero-coupon bond prices as the ratio P(0,m)/P(0,n), since the price ra… | procedure | missing |  |

</details>

<details><summary><code>fm-267</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible monthly, i^(12), gives an effective monthly rate of i^(12)/12. | fact | tagged | Loans: “Monthly rate: $i^{(12)}/12 = 0.06/12 = 0.5\%$. Number of payments: $n=360$.” |
| The present value of a level payment annuity-immediate of n payments at periodic rate j is a_angle_n = (1 - v^n)/j, with v = 1/(1+j). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The outstanding loan balance at a given time equals the present value of the remaining scheduled payments, discounted at the loan interest … | definition | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| To find the number of remaining payments when a loan is paid off early, subtract the years saved from the original term and count payments … | procedure | missing |  |
| The original loan amount equals the present value of the original level payments over the full original term at the loan rate. | fact | tagged | Loan Amortization: “the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rat…” |

</details>

<details><summary><code>fm-268</code> · answerable</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization requires that the present value of assets equals the present value of liabilities, the duration of assets equals the… | definition | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| Full immunization requires, in addition to the Redington conditions, that the asset cash flows bracket the liability cash flows (assets occ… | definition | linked | Full Immunization: “3. There is an asset cash flow before the liability date and one after it” |
| Equal modified durations together with equal present values is equivalent to equal Macaulay durations, since modified duration is Macaulay … | fact | tagged | Redington Immunization: “asset and liability [[Macaulay Duration\\|Macaulay durations]] are equal (equivalently their [[Modif…” |
| Exact (cash flow) matching means asset cash flows are set equal to liability cash flows at each time, which is a stricter condition than ma… | definition | tagged | Redington Immunization: “Less restrictive than [[Cash Flow Matching]] since exact cash flow timing is not required” |

</details>

<details><summary><code>fm-269</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of its redemption value: P = Fr·a_{n\|j} + C·v^n, where … | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A coupon of fixed amount paid at the end of each period is valued with the annuity-immediate factor a_{n\|j} = (1 - v^n)/j, where j is the … | definition | tagged | Bond Price: “$$a_{\overline{20}\\|3\%} = \frac{1 - v^{20}}{0.03} = 14.877475$$” |
| When two bonds share the same yield, term and coupon payments but have different face amounts, scale one price equation and subtract the ot… | procedure | missing |  |
| Given an annuity-immediate present value factor, number of periods, and payment, solve for the per-period interest rate j using a financial… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |
| A nominal annual rate convertible m times per year, i^(m), equals m times the effective rate per period, so the semiannual effective rate j… | definition | elsewhere | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| A bond with semiannual coupons and a term of n years has 2n coupon periods, so the annuity and discounting use 2n periods at the semiannual… | fact | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |

</details>

<details><summary><code>fm-270</code> · untagged</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-year level annuity-immediate equals the payment times a_angle-n = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Level Payment Annuity: “$$= P \cdot \frac{1-v^n}{i}$$” |
| A zero-coupon bond pays a single lump sum at maturity, so the amount invested today is the present value of that payment discounted at the … | definition | tagged | Asset-Liability Portfolio (collapsed): “Purchase a 4-year zero-coupon bond with face value $50{,}000$ at a cost of” |
| Immunizing a liability requires the asset portfolio to match the liability's present value and its Macaulay duration (or, equivalently here… | fact | tagged | Redington Immunization: “2. $D_{Mac}(A) = D_{Mac}(L)$ — asset and liability [[Macaulay Duration\\|Macaulay durations]] are eq…” |
| To immunize with two zero-coupon bonds, set up two equations (total present value equal to the liability's PV, and PV-weighted time sum equ… | procedure | tagged | Redington Immunization: “Subtracting twice Condition 1 from Condition 2 gives $4Yv^6 = 20{,}000v^4$, so each bond carries ha…” |
| Macaulay duration is the present-value-weighted average time of a cash flow stream: sum of t times PV of cash flow at t, divided by total P… | definition | linked | Macaulay Duration: “$$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$” |

</details>

<details><summary><code>fm-271</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond is the present value of its coupons and redemption value at the yield rate: P = Fr·a_{n\|j} + C·v^n. | procedure | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| The coupon amount per period equals the face amount times the coupon rate per payment period (annual coupon rate divided by the number of p… | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| Convert an annual effective yield rate i to an effective rate per semiannual period using j = (1+i)^{1/2} − 1 so the bond can be valued wit… | procedure | elsewhere | Effective Rate (collapsed): “(The nominal monthly rate equivalent to 7% semi-annually is $12\left[(1.071225)^{1/12} - 1\right] =…” |
| The present value of an n-period annuity-immediate at rate i is a_{n\|i} = (1 − v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To find an unknown yield rate, set the bond's price equal to the present value of its cash flows and solve for the rate numerically (e.g., … | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |

</details>

<details><summary><code>fm-272</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan, Balloon Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual rate convertible m times per year corresponds to an effective rate per period of the nominal rate divided by m. | definition | linked | Payment Period: “When $k = m$ the conversion is trivial: $j = i^{(m)}/m$.” |
| The outstanding loan balance after k payments (retrospective method) equals the accumulated value of the original loan minus the accumulate… | formula | tagged | Loans: “the **retrospective method** (the loan accumulated to that date, less the accumulated value of the …” |
| The present value of an n-period annuity-immediate of level payments P at periodic rate j is P times a_angle(n) = P(1-v^n)/j, and the accum… | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The outstanding balance at any time equals the present value of all remaining future payments at the loan rate (prospective method). | fact | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |
| To find a final balloon payment, solve for the number of full level payments the balance can support (non-integer n), take the integer numb… | procedure | tagged | Balloon Payment (collapsed): “Solve $10000 = 1500\,a_{\overline{n}\\|8\%}$, so $a_{\overline{n}\\|} = 6.666667$:” |
| A balloon payment is a final payment larger than the regular level payment, made at the time of the last regular payment, whereas a drop pa… | fact | tagged | Term of Loan: “If the remainder is paid together with the last regular payment, that final payment is larger than …” |

</details>

<details><summary><code>fm-273</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond with redemption value C equals the present value of coupons (Fr times an annuity-immediate) plus the present value of t… | formula | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| A bond's coupon equals the coupon rate per period times the face amount (Fr), which is distinct from the redemption value C. | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| An annual nominal yield rate convertible semiannually corresponds to an effective rate per half-year equal to the nominal rate divided by 2… | fact | elsewhere | Nominal Interest Rate (collapsed): “The monthly periodic rate is $6\%/12 = 0.5\%$” |
| The sale price of a bond at a later date is the present value of its remaining coupons and redemption value at the buyer's yield rate, usin… | procedure | tagged | Market Value: “For bonds, market value equals the [[Present Value]] of all future cash flows discounted at the pre…” |
| Sale proceeds are reinvested as the purchase price of the new bond, so the new bond's price equals the old bond's sale price; solve the bon… | procedure | missing |  |

</details>

<details><summary><code>fm-274</code> · answerable</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Duration Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons and redemption payment, discounted at the bond's annual effective yield. | formula | linked | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| An annual coupon equals the coupon rate times the face (par) amount, and a bond redeemed at par pays the face amount at maturity. | formula | linked | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |
| An exactly matched portfolio (cash flow matching) has asset cash inflows at each time equal to the liability cash outflows at that time. | definition | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date” |
| To cash-flow match with bonds, work backward from the longest maturity: the longest bond's final payment covers the last liability, then it… | procedure | linked | Cash Flow Matching: “Construction proceeds **backwards** from the last liability date — fund the final liability first, …” |
| The amount to invest in a bond that pays only at maturity equals the required payment at that time discounted at that bond's yield. | procedure | tagged | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |

</details>

<details><summary><code>fm-275</code> · untagged</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Full Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Full immunization requires the present value of assets to equal the present value of liabilities and the duration (Macaulay) of assets to e… | fact | tagged | Full Immunization: “1. $PV(\text{assets}) = PV(\text{liability})$ at the current rate $i$ 2. The [[Duration]] of the as…” |
| The Macaulay duration of a single cash flow such as a zero-coupon bond or a single liability equals its time to payment. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| The Macaulay duration of a portfolio is the present-value-weighted average of the times of the cash flows: sum of t*PV(t) divided by total … | formula | linked | Macaulay Duration: “$$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$” |
| The present value of a zero-coupon bond with face value F maturing in n years at effective annual rate i is F/(1+i)^n. | formula | elsewhere | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |
| With a flat yield curve, all cash flows are discounted at the same single interest rate, and the liability's value at its due date equals i… | fact | tagged | Full Immunization: “Dividing through by $v^T$ reduces them to $A(1+i)^{a} + B(1+i)^{-b} = L$ and $a\,A(1+i)^{a} = b\,B(…” |

</details>

<details><summary><code>fm-276</code> · untagged</summary>

Tagged pages: Decreasing Annuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| Decompose a payment stream with varying patterns into a level annuity, a decreasing annuity deferred by the appropriate number of years, an… | procedure | elsewhere | Increasing Annuity: “A first payment $P$ rising by $Q$ a period is a level annuity of $P - Q$ plus $Q\,(Ia)_{\overline{n…” |
| The present value of an n-period annuity-immediate with level payments of 1 is a_n = (1 - v^n)/i, where v = 1/(1+i). | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The present value of an n-period decreasing annuity-immediate with payments n, n-1, ..., 1 is (Da)_n = (n - a_n)/i. | formula | tagged | Decreasing Annuity: “$$(Da)_{\overline{n}\\|} = \frac{n - a_{\overline{n}\\|}}{i}$$” |
| To value an annuity whose first payment occurs after a delay, compute its present value at the time just before its first payment and disco… | procedure | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| The present value of a perpetuity-immediate paying 1 per period is 1/i. | formula | elsewhere | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| A perpetuity-immediate whose first payment occurs at time t has present value v^(t-1)/i, since its value one period before the first paymen… | fact | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |

</details>

<details><summary><code>fm-277</code> · gap</summary>

Tagged pages: Geometric Increasing Annuity, Accumulated Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| An annuity-immediate makes payments at the end of each period, and a geometrically increasing annuity has each payment a fixed percentage l… | definition | tagged | Geometric Increasing Annuity: “A **geometric increasing (or decreasing) annuity** has payments that grow (or shrink) at a constant…” |
| Find the accumulated value of a series of payments at a given time by compounding each payment at the effective interest rate from its paym… | procedure | tagged | Accumulated Value: “each cash flow is carried forward by its own accumulation factor:” |
| The accumulated value at time n of an annuity-immediate with first payment P, payments growing at rate g, and effective interest rate i (g … | formula | missing |  |

</details>

<details><summary><code>fm-278</code> · gap</summary>

Tagged pages: Annuities, Present Value, Annuity Immediate, Level Payment Annuity, Term of Annuity, Payable m-thly

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at the end of one year of payments of 1/m made m times per year (an m-thly annuity-immediate) is the symbol s_{1\|}^{… | definition | missing |  |
| The present value of an m-thly annuity-immediate of 1 per year for n years equals the one-year accumulated value of the m-thly payments (s_… | procedure | missing |  |
| The present value of level payments made every k years (e.g., at times 2, 4, ..., 10) is a geometric series in v^k, with value P(v^k + v^{2… | procedure | missing |  |
| The accumulated value of an annuity-immediate is s_{n\|} = ((1+i)^n - 1)/i, and a_{n\|} = (1 - v^n)/i, so (1+i)^k - 1 = i·s_{k\|}. | formula | tagged | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| Two cash-flow streams are equivalent when their present values are equal, so an unknown payment is found by setting the present values equa… | fact | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |

</details>

<details><summary><code>fm-279</code> · answerable</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| In a level-payment amortization schedule, the principal portion of successive payments grows geometrically by a factor of (1+j) per period,… | fact | tagged | Loan Amortization: “With level payments $P$, the principal portions grow geometrically: $PR_k = P\,v^{n-k+1}$, so $PR_{…” |
| For a level-payment loan, the principal in payment k+m equals the principal in payment k times (1+j)^m, i.e. P_{k+m} = P_k (1+j)^m. | formula | linked | Amortization Schedule: “The principal portions form a geometric sequence: $PR_k = PR_1 \cdot (1+i)^{k-1}$.” |
| Convert an annual effective interest rate i to an equivalent effective rate per period for m periods per year using j = (1+i)^(1/m) − 1. | procedure | linked | Payment Period: “$$j = (1+i)^{1/m} - 1$$” |

</details>

<details><summary><code>fm-280</code> · gap</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Annuity Due, Future Value, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| When principal earns one rate but the interest is reinvested at a different rate, the accumulated value equals the total principal deposite… | procedure | tagged | Fund Accumulation (collapsed): “Since the \$$500$ principal stays in Fund A, it earns level interest of $500(0.05) = \$25$ per year…” |
| For annual deposits at the start of each year, each deposit earns a constant interest amount (rate times principal) at each year-end, so th… | procedure | missing |  |
| The accumulated value at the end of n years of an increasing annuity-immediate with payments 1, 2, ..., n at the end of years 1..n is (Is)_… | formula | elsewhere | Increasing Annuity: “$$(Is)_{\overline{n}\\|} = \frac{\ddot{s}_{\overline{n}\\|} - n}{i}$$” |
| The accumulated value of an annuity-due is s̈_{n\|i} = ((1+i)^n − 1)/d, where d = i/(1+i). | formula | tagged | Annuity Due: “$$= \frac{(1+i)^n - 1}{d}$$” |

</details>

<details><summary><code>fm-281</code> · untagged</summary>

Tagged pages: Bond Amortization, Bonds, Book Value, Face Value, Coupon, Coupon Rate, Term of Bond, Accumulation of Discount

| Item | Kind | Status | Where |
|---|---|---|---|
| The periodic coupon of a bond equals the coupon rate per period times the par (face) value. | formula | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| A nominal annual yield convertible m times per year gives an effective yield per period equal to the nominal rate divided by m. | fact | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| The price of a bond equals the present value of its coupons plus the present value of the redemption value, both discounted at the yield ra… | formula | tagged | Bonds: “The **basic bond price formula**: $P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$ where $F$ = face…” |
| The book value of a bond immediately after a coupon payment is the present value, at the original purchase yield rate, of the remaining cou… | procedure | tagged | Bond Amortization (collapsed): “The book value just after the 4th coupon is the value of the 16 coupons and the redemption value st…” |
| The present value of an n-period annuity-immediate at effective rate j is a_{n\|j} = (1 - (1+j)^{-n}) / j. | formula | linked | Bond Price: “$$a_{\overline{20}\\|3\%} = \frac{1 - v^{20}}{0.03} = 14.877475$$” |

</details>

<details><summary><code>fm-282</code> · untagged</summary>

Tagged pages: Loan Amortization, Amortization, Principal, Interest, Time Value of Money, Compound Interest, Present Value, Effective Rate, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a level annuity-immediate of 1 per period for n periods is a_{n\|} = (1 - v^n)/i, where v = 1/(1+i). | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| For a loan of a_{n\|} repaid by level payments of 1 at the end of each period, the principal repaid in payment k is v^(n-k+1). | formula | tagged | Amortization: “Principal in payment $k$: $PR_k = P \cdot v^{n-k+1}$” |
| The interest paid in payment k equals the payment minus the principal repaid, so for a level payment of 1 on a loan of a_{n\|} it is 1 - v^… | formula | tagged | Amortization: “Level payments — interest in payment $k$: $I_k = P \cdot (1 - v^{n-k+1})$ where $v = 1/(1+i)$” |
| The discount factor is v = 1/(1+i), so (1+i)^k v^k = 1. | definition | tagged | Discount Factor: “$$v = \frac{1}{1+i}$$” |
| Solving for the interest rate from an equation in v that reduces to a quadratic: apply the quadratic formula, take the positive root for v … | procedure | elsewhere | Internal Rate of Return (collapsed): “Write $v = 1/(1+j)$ and solve the quadratic $-100 + 230v - 132v^2 = 0$.” |

</details>

<details><summary><code>fm-283</code> · untagged</summary>

Tagged pages: Time Value of Money, Compound Interest, Accumulated Value, Effective Rate, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| The annual effective yield (internal rate of return) of a set of cash flows is the effective annual rate i at which the present value of co… | definition | elsewhere | Rate of Return: “the IRR is the $i$ that makes the [[Net Present Value\\|net present value]] zero.” |
| With compound interest at annual effective rate i, an amount invested at time 0 accumulates to A(1+i)^n after n years, so a single investme… | formula | linked | Interest Rate (collapsed): “$$6802.44 = 5000(1+i)^5 \implies (1+i)^5 = 1.36049 \implies i = 1.36049^{1/5} - 1 = 0.0635 = 6.35\%…” |
| To find the yield on combined cash flows of several investors, add the cash flows occurring at each date to form a single net cash flow str… | procedure | elsewhere | Rate of Return: “$C_t$ is the net cash flow at time $t$ (outflows negative) and $v = 1/(1+i)$; the IRR is the $i$ th…” |
| To find an unknown cash flow given the yield, set up the equation of value by accumulating (or discounting) all contributions and collectio… | procedure | linked | Equation of Value: “$$\text{Value}_{t_0}(\text{inflows}) = \text{Value}_{t_0}(\text{outflows})$$” |
| When an investment has multiple contributions, the yield is found by writing the equation of value as a polynomial in v or (1+i) (a quadrat… | procedure | elsewhere | Rate of Return (collapsed): “Set the net present value to zero and solve the quadratic in $v$:” |

</details>

<details><summary><code>fm-284</code> · gap</summary>

Tagged pages: Time Value of Money, Compound Interest, Accumulated Value, Effective Rate, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| Under compound interest at annual effective rate i, an investment of 1 accumulates to (1+i)^t after t years, including for fractional t. | fact | tagged | Compound Interest: “$$A(t) = P(1+i)^t$$” |
| Model a penalty of losing the last m months' interest as accumulating the original deposit at the stated rate only for the withdrawal time … | procedure | missing |  |
| Model a penalty that reduces the effective rate to j on early withdrawal as accumulating the deposit at rate j for the entire holding perio… | procedure | tagged | Compound Interest: “$$A(t) = P(1+i)^t$$” |
| To find an unknown rate from equivalence of two scenarios, set the two accumulated values equal and solve for the rate, taking the t-th roo… | procedure | linked | Interest Rate (collapsed): “$$6802.44 = 5000(1+i)^5 \implies (1+i)^5 = 1.36049 \implies i = 1.36049^{1/5} - 1 = 0.0635 = 6.35\%…” |

</details>

<details><summary><code>fm-285</code> · untagged</summary>

Tagged pages: Annuity Due, Accumulated Value, Present Value, Level Payment Annuity, Term of Annuity, Payable m-thly

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value at time n of an annuity-due of 1 per period is the annuity-due future value factor s-double-dot_n = ((1+i)^n - 1)/d, … | formula | tagged | Annuity Due: “$$= \frac{(1+i)^n - 1}{d}$$” |
| The present value of an annuity-due of 1 per period is a-double-dot_n = (1 - v^n)/d = (1 - (1+i)^-n)/i × (1+i). | formula | tagged | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| A nominal annual rate convertible m times per year, i^(m), gives an effective rate of i^(m)/m per period, which is used for payments made m… | definition | linked | Nominal Interest Rate Convertible m-thly: “The **nominal interest rate convertible $m$-thly**, denoted $i^{(m)}$, is an annual rate that is co…” |
| The fund needed to purchase an annuity is its present value at the purchase date, so the remaining balance is the accumulated fund value mi… | procedure | elsewhere | Time Value of Money: “amounts payable at different times cannot be compared until each is accumulated or discounted to a …” |
| The number of payments in a monthly annuity is the number of years times 12, and the interest rate per period must match the payment period… | procedure | tagged | Term of Annuity: “A 30-year monthly mortgage has a term of 360 months.” |

</details>

<details><summary><code>fm-286</code> · untagged</summary>

Tagged pages: Perpetuity, Present Value, Level Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-due paying 1 per period is (1+j)/j = 1/d, where j is the effective interest rate per payment period. | formula | tagged | Perpetuity: “\ddot{a}_{\overline{\infty}\\|} = \frac{1}{d}” |
| Convert an effective interest rate between different periods by compounding: the rate over a longer period equals (1 + rate over the shorte… | procedure | elsewhere | Payment Period: “The same conversion works when payments are *less* frequent than compounding: annual payments at $6…” |
| For a perpetuity whose payment period differs from the interest period, apply the perpetuity formula using the equivalent effective rate pe… | procedure | elsewhere | Payment Period: “Every annuity factor is computed per payment period, so $i$ must be the effective rate for that int…” |
| The present value of a perpetuity-due with payment P per period at period rate k is P(1+k)/k, which equals P/d with d = k/(1+k); thus P = P… | fact | tagged | Perpetuity: “each payment comes one period earlier than under the perpetuity-immediate, so its value is $(1+i)\,…” |

</details>

<details><summary><code>fm-287</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The outstanding loan balance at any time (prospective method) equals the present value, at that time, of the remaining scheduled payments. | fact | tagged | Outstanding Balance: “**Prospective method** (present value of future payments):” |
| A nominal annual rate convertible m times per year corresponds to an effective rate per period of i^(m)/m. | definition | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| For payments that decrease geometrically, the k-th payment equals the first payment times (1+g)^(k-1), where g is the (negative) constant r… | formula | elsewhere | Geometric Increasing Annuity: “payments are $1, (1+g), (1+g)^2, \ldots, (1+g)^{n-1}$” |
| The present value of an n-period annuity-immediate with first payment P and payments growing at rate g is P*(1-((1+g)/(1+i))^n)/(i-g), whic… | formula | elsewhere | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| To find the balance after payment t, take the remaining payments, whose first (payment t+1) equals the original first payment times (1+g)^t… | procedure | missing |  |

</details>

<details><summary><code>fm-288</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-period annuity-immediate at effective rate i per period is a_{n\|i} = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The outstanding loan balance at any time equals the present value of the remaining payments, discounted at the loan's effective interest ra… | fact | tagged | Outstanding Balance: “**Prospective method** (present value of future payments):” |
| To find the balance after a given payment in a level-payment loan with n total payments, value the remaining n minus k payments as an annui… | procedure | tagged | Amortization: “Outstanding balance after payment $k$: $OB_k = P \cdot a_{\overline{n-k}\\|i}$” |
| Accumulate the balance one period at the loan interest rate to the next payment date, then subtract that payment to get the balance immedia… | procedure | tagged | Loan Amortization: “$$B_k = B_{k-1}(1+i) - K_k$$” |
| An extra (additional) payment made at a payment date reduces the outstanding balance dollar for dollar at that time. | procedure | missing |  |
| To find a revised level payment over a new term, divide the new outstanding balance by the annuity-immediate factor for the new number of p… | procedure | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |

</details>

<details><summary><code>fm-289</code> · answerable</summary>

Tagged pages: Loan Repayment Comparison, Loans, Amortization, Interest, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment that repays a loan L over n years at effective annual rate i is L divided by the present value annuity-immediate factor a… | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The total of all payments under a level-payment loan equals the number of payments times the level payment. | fact | tagged | Loan Repayment Comparison: “$$\text{Total interest (level)} = n\,P_{\text{level}} - L$$” |
| In a loan repaid with payments of interest plus a fixed principal amount, the principal repaid over the term sums to the original loan amou… | fact | linked | Loan Amortization: “Over the whole loan the principal portions add up to $L$, so the total interest is the total of the…” |
| Interest each period equals the effective rate times the outstanding balance at the start of the period, so with a fixed principal repaymen… | procedure | tagged | Loan Repayment Comparison: “Under constant-principal repayment, the principal portion each period is $L/n$, and interest is cha…” |
| Total payments under a repayment schedule equal the loan principal plus total interest paid, and two schedules with equal total payments ar… | procedure | tagged | Loan Repayment Comparison: “The two can be tied together by setting their total payments or total interest equal and solving fo…” |

</details>

<details><summary><code>fm-290</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The coupon of a bond equals the face amount times the nominal annual coupon rate divided by the number of payments per year (coupon rate pe… | formula | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The price of a bond at a coupon date equals the present value of the remaining coupons (coupon times an annuity-immediate factor) plus the … | formula | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| A nominal annual rate convertible m times per year equals m times the effective rate per period, so the periodic yield j is converted to i^… | definition | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| Determine the coupon dates from the issue date and payment frequency, locate the purchase date relative to them, and count the remaining co… | procedure | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| To find the yield rate of a bond given its price, solve the bond price equation for the periodic rate j using a financial calculator (N, PV… | procedure | tagged | Yield Rate: “the yield rate is the $j$ that solves this equation.” |

</details>

<details><summary><code>fm-291</code> · untagged</summary>

Tagged pages: Nominal Interest Rate, Present Value, Compound Interest, Convertible m-thly, Nominal Interest Rate Convertible m-thly, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The rate of return earned on an investment is the interest rate at which the present value of the cash inflows equals the initial deposit (… | procedure | linked | Net Present Value: “The **internal rate of return** (IRR) is the rate $i^*$ at which $NPV = 0$.” |
| The discount factor v equals 1/(1+i), and a payment of amount X at time t has present value X·v^t. | definition | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| A quadratic equation a·x^2 + b·x + c = 0 in v is solved by the quadratic formula, taking the positive root as the valid discount factor. | formula | elsewhere | Internal Rate of Return (collapsed): “Write $v = 1/(1+j)$ and solve the quadratic $-100 + 230v - 132v^2 = 0$.” |
| An effective annual rate i and a nominal rate i^(m) convertible m times per year are related by 1 + i = (1 + i^(m)/m)^m. | formula | tagged | Convertible m-thly: “$$1 + i = \left(1 + \frac{i^{(m)}}{m}\right)^m$$” |
| A nominal rate convertible m times per year, i^(m), divided by m gives the effective interest rate per conversion period. | definition | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |

</details>

<details><summary><code>fm-292</code> · untagged</summary>

Tagged pages: Bond Price, Callable Bond, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond is the present value of its coupons and redemption value at the investor's yield rate: P = Fr·a_{n\|j} + C·v^n, where F… | formula | tagged | Bond Price: “P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n” |
| Convert an annual effective yield i to the per-period (semiannual) yield by j = (1+i)^{1/2} - 1, since two compounding periods equal one ye… | procedure | elsewhere | Nominal Interest Rate Convertible m-thly: “i^{(m)} = m\!\left[(1+i)^{1/m} - 1\right]” |
| A bond sells at a premium when its price exceeds redemption value, which occurs when the coupon rate per period Fr exceeds the yield rate p… | definition | tagged | Bond Price: “When $Fr > Cj$ the bond sells at a **premium** ($P > C$); when $Fr < Cj$ it sells at a **discount**…” |
| For a callable bond, the price guaranteeing at least the desired yield assumes the redemption date least favourable to the investor: for a … | fact | tagged | Callable Bond: “If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified c…” |
| The coupon per period equals the face amount times the coupon rate per period (annual coupon rate divided by number of payments per year). | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The present value of an n-period annuity-immediate at per-period rate j is a_{n\|j} = (1 - (1+j)^{-n})/j. | formula | elsewhere | Annuity Immediate: “$$= \frac{1-(1+i)^{-n}}{i}$$” |

</details>

<details><summary><code>fm-293</code> · gap</summary>

Tagged pages: Modified Duration, Duration, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Modified duration of a cash flow stream with present value P(i) is the negative of the derivative of P with respect to the effective intere… | formula | tagged | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The derivative of c(1+i)^{-n} with respect to i is -n c (1+i)^{-(n+1)}, so differentiating a present value term-by-term multiplies each ter… | fact | missing |  |

</details>

<details><summary><code>fm-294</code> · answerable</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Forward Rate, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| A spot rate s_t is the annual effective yield on a zero-coupon bond maturing at time t, used to discount a single cash flow from time t bac… | definition | tagged | Spot Rate: “The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exa…” |
| An implied forward rate (n-year rate starting at time t) is the rate for borrowing/investing from time t to t+n that is implied by the curr… | definition | tagged | Forward Rate: “A **forward rate** $f_{t_1, t_2}$ is the interest rate agreed upon today for an investment (or loan…” |
| Spot and forward rates satisfy (1+s_{t+n})^{t+n} = (1+s_t)^t (1+ {}_t f_n)^n, so the forward rate is {}_t f_n = [(1+s_{t+n})^{t+n}/(1+s_t)^… | formula | tagged | Spot Rates and Forward Rates: “$$(1+s_n)^n\,(1+f_{n,n+k})^k = (1+s_{n+k})^{n+k}$$” |
| To find the implied rate for a future period (e.g., years 2 to 4), identify the spot rates for the end and start of the period, equate the … | procedure | tagged | Spot Rates and Forward Rates: “$$(1+s_n)^n\,(1+f_{n,n+k})^k = (1+s_{n+k})^{n+k}$$” |

</details>

<details><summary><code>fm-295</code> · answerable</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization requires the present value of assets to equal the present value of liabilities. | fact | tagged | Redington Immunization: “$PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| Redington immunization requires the modified duration (equivalently, the first derivative of present value with respect to the interest rat… | fact | tagged | Redington Immunization: “$D_{Mac}(A) = D_{Mac}(L)$ — asset and liability [[Macaulay Duration\\|Macaulay durations]] are equal…” |
| Redington immunization requires the convexity of assets to exceed the convexity of liabilities, so the surplus does not fall for small inte… | fact | tagged | Redington Immunization: “When all three hold, a small change $\Delta j$ causes $S \geq 0$ because the convexity term dominat…” |
| To test whether a position is immunized, check all Redington conditions (PV equality, duration equality, asset convexity greater than liabi… | procedure | tagged | Asset-Liability Portfolio: “equal present values, equal [[Modified Duration\\|modified durations]] ([[Duration Matching]]), and …” |

</details>

<details><summary><code>fm-296</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan, Drop Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| The periodic interest rate can be found from the outstanding balance after the first payment: balance after payment = initial loan × (1 + i… | procedure | tagged | Loan Amortization: “$$B_k = B_{k-1}(1+i) - K_k$$” |
| The present value of a level annuity-immediate of n payments at periodic rate i is a_{n\|i} = (1 − v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| A loan equals the present value of its level payments at the loan rate, so loan amount = payment × a_{n\|i}; solving for n gives a non-inte… | fact | tagged | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |
| When the solved n is not an integer, take the integer part as the number of full level payments and add one smaller final (drop) payment on… | procedure | tagged | Drop Payment: “$n$ is the number of full payments (the integer part of the term), and $B_n$ is the outstanding bal…” |
| A nominal annual rate compounded monthly corresponds to an effective monthly rate equal to the nominal rate divided by 12, so payments at m… | fact | tagged | Loans: “Monthly rate: $i^{(12)}/12 = 0.06/12 = 0.5\%$.” |

</details>

<details><summary><code>fm-297</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a coupon bond equals the present value of its coupons (an annuity-immediate at the yield rate) plus the present value of the r… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The present value of an n-period annuity-immediate at effective rate i is a_{n\|} = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The coupon rate is the annual coupon amount as a fraction of face value, so each coupon equals F times the coupon rate; the yield rate is t… | definition | tagged | Coupon Rate: “The **coupon rate** $r$ is the rate applied to the face value $F$ of a bond to determine each perio…” |
| A zero-coupon bond pays only the face value at maturity, so its price is F·v^n. | fact | missing |  |
| When the coupon rate is a multiple k of the yield rate, the coupon-bond price simplifies to F[k(1 - v^n) + v^n], which can be solved for v^… | procedure | missing |  |

</details>

<details><summary><code>fm-298</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Perpetuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| Split a cash-flow stream with changing growth rates into segments (an initial finite stream and a later stream), value each segment separat… | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| The present value of an n-payment geometric annuity-immediate with first payment 1 and growth rate g at effective rate i (i not equal to g)… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| The present value of a geometric perpetuity-immediate with first payment P and constant growth rate g at effective rate i (i greater than g… | formula | elsewhere | Geometric Increasing Perpetuity: “For a first payment $P$, multiply by $P$.” |
| A payment stream that grows by a fixed rate each year has the payment at time t equal to the first payment times (1+g)^(t-1); when the grow… | fact | tagged | Geometric Progression: “a **geometric progression** refers to a sequence of payments where each payment is a constant multi…” |
| Discount a perpetuity value computed at an earlier time point (one period before its first payment) back to time 0 by multiplying by v^n at… | procedure | tagged | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |

</details>

<details><summary><code>fm-299</code> · answerable</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization requires that the present value of assets equals the present value of liabilities, the (Macaulay) duration of assets… | fact | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$) 2. $D_{Mac}(A) …” |
| The Macaulay duration of a zero-coupon bond or single cash flow equals its time to payment. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| The Macaulay duration of a portfolio is the present-value-weighted average of the durations of its components, i.e. sum of (PV_i × t_i) div… | formula | tagged | Portfolio: “- **[[Duration]] of a portfolio**: the weighted average of individual asset durations, weighted by …” |
| To immunize, set up two equations in the present values invested in each asset (total PV equals liability PV, and PV-weighted duration equa… | procedure | tagged | Duration Matching: “These two conditions ensure that if interest rates change slightly, the change in asset value appro…” |
| Macaulay convexity of a cash flow stream is the PV-weighted average of t squared; for zero-coupon bonds it is sum of (PV_i × t_i²) divided … | formula | tagged | Convexity: “**Macaulay convexity** is the present-value-weighted average of the *squared* times of the cash flo…” |
| After matching PV and duration, verify the convexity condition by comparing asset convexity with liability convexity (for a single liabilit… | procedure | tagged | Redington Immunization (collapsed): “Since $21.77 > 18.14$, the asset convexity exceeds the liability convexity and Condition 3 holds: t…” |

</details>

<details><summary><code>fm-300</code> · answerable</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan, Drop Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment that repays a loan of amount L over n periods at periodic effective rate j is X = L / a_{n\|j}, where a_{n\|j} = (1 - v^n… | formula | tagged | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| An annual nominal rate compounded m times per year corresponds to a periodic effective rate of i^(m)/m per period. | definition | linked | Payment Period: “When $k = m$ the conversion is trivial: $j = i^{(m)}/m$.” |
| The outstanding loan balance after k payments by the retrospective method equals the accumulated value of the original loan minus the accum… | formula | linked | Outstanding Balance: “$$OB_k = L(1+i)^k - P \cdot s_{\overline{k}\\|i}$$” |
| When the actual payments exceed the level amount that exactly amortizes the loan, the number of payments is found by setting the outstandin… | procedure | tagged | Term of Loan (collapsed): “$5000 = 900\,a_{\overline{n}\\|8\%}$, so $a_{\overline{n}\\|} = 5.555556$:” |
| A drop payment is a final, smaller payment made one period after the last full regular payment so that the loan is fully repaid when n is n… | definition | tagged | Drop Payment: “A **drop payment** is a final loan payment that is **smaller** than the regular payment, made one p…” |

</details>

<details><summary><code>fm-301</code> · untagged</summary>

Tagged pages: Bond Price, Callable Bond, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond is the present value of its coupons (coupon rate times face amount per period, as an annuity-immediate) plus the presen… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| Convert an annual effective yield to an equivalent effective yield per coupon period by compounding: j = (1+i)^(1/m) − 1, for m coupon peri… | procedure | elsewhere | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |
| The coupon per period equals the coupon rate per period (annual nominal coupon rate divided by payments per year) times the face amount. | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| A bond sells at a premium when its coupon rate per period exceeds the yield rate per period, and at a discount when the coupon rate is less… | fact | tagged | Bond Price: “When $Fr > Cj$ the bond sells at a **premium** ($P > C$); when $Fr < Cj$ it sells at a **discount**…” |
| For a callable bond bought at a premium, the investor's worst-case yield occurs if the bond is called at the earliest call date, so the pri… | fact | tagged | Callable Bond: “If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified c…” |
| A call at par immediately after a coupon payment means the investor receives the coupon plus the par redemption value at the call date, wit… | fact | tagged | Callable Bond: “\text{Call at 5 years: } P &= 2\,a_{\overline{10}\\|1.5\%} + 109\,v^{10} \\” |

</details>

<details><summary><code>fm-302</code> · gap</summary>

Tagged pages: Geometric Increasing Annuity, Non-level Annuities, Fund Accumulation, Accumulated Value, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| An annuity-immediate makes payments at the end of each period, so the first payment occurs at time 1 and the n-th at time n. | definition | linked | Annuity Immediate: “An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period.” |
| A geometric annuity has payments that change by a constant factor (1+g) each period, so each payment is the prior payment times (1+g), with… | definition | elsewhere | Geometric Progression: “a **geometric progression** refers to a sequence of payments where each payment is a constant multi…” |
| The present value of an n-period geometric annuity-immediate with first payment P, growth rate g and effective interest rate i is P[1 - ((1… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| The accumulated value at the time of the last payment equals the present value at time 0 multiplied by (1+i)^n, or equivalently each paymen… | procedure | tagged | Accumulated Value: “$$AV = \sum_k C_{t_k} \cdot (1+i)^{t - t_k}$$” |
| The accumulated value at time n of a geometric annuity-immediate with first payment P is P[(1+i)^n - (1+g)^n]/(i - g), obtained by summing … | formula | missing |  |
| Money deposited at an annual effective interest rate i grows by a factor of (1+i) each year, so a deposit made at time t has value (1+i)^(n… | fact | tagged | Future Value: “$$\text{FV}_n = \sum_{t=0}^{n} C_t (1+i)^{n-t}$$” |

</details>

<details><summary><code>fm-303</code> · gap</summary>

Tagged pages: Force of Interest, Accumulated Value, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation function from time 0 to t under a force of interest δ_r is a(t) = exp(∫_0^t δ_r dr). | formula | linked | Variable Force of Interest: “$$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$” |
| A deposit made at time s accumulates to time t by multiplying it by a(t)/a(s), where a is the accumulation function under the fund's force … | procedure | tagged | Accumulated Value: “$$AV = \sum_k C_{t_k} \cdot \frac{a(t)}{a(t_k)}$$” |
| Interest earned over a period equals the ending fund balance minus the total deposits (principal) made during the period. | definition | missing |  |
| To find an unknown deposit, express the total accumulated balance at the end date as the sum of each deposit accumulated to that date, subt… | procedure | missing |  |

</details>

<details><summary><code>fm-304</code> · untagged</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Full Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Full immunization means choosing asset cash flows so that the net present value of assets minus liabilities, h(i), is zero at the current i… | definition | tagged | Full Immunization: “Under these conditions the surplus $PV_A - PV_L$ is zero at $i$ and positive at every other rate, w…” |
| The first two conditions for full immunization are that the present value of assets equals the present value of liabilities and that the de… | fact | tagged | Full Immunization: “1. $PV(\text{assets}) = PV(\text{liability})$ at the current rate $i$ 2. The [[Duration]] of the as…” |
| Compute the net liability by subtracting cash flows from assets that exactly match the liability in timing, then immunize the remaining net… | procedure | linked | Cash Flow Matching: “A coupon bond bought for a later liability also pays coupons on the earlier dates, so those coupons…” |
| Set up the immunization conditions at a chosen reference time by accumulating or discounting each cash flow to that time (a cash flow at ti… | procedure | tagged | Full Immunization: “Dividing through by $v^T$ reduces them to $A(1+i)^{a} + B(1+i)^{-b} = L$ and $a\,A(1+i)^{a} = b\,B(…” |
| The derivative of the present value of a cash flow with respect to the interest rate is proportional to −t times C·v^(t+1), so the conditio… | fact | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The discount factor v equals 1/(1+i), so v^(-n) is the accumulation factor over n years. | fact | elsewhere | Discount Factor: “The $n$-period discount factor is $v^n = (1+i)^{-n}$.” |

</details>

<details><summary><code>fm-305</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Principal, Term of Loan, Drop Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| An annual effective rate i converts to an equivalent effective rate per quarter j by j = (1+i)^(1/4) - 1, equivalently (1 + i^(4)/4)^4 = 1 … | formula | linked | Payment Period: “$$j = (1+i)^{1/m} - 1$$” |
| An annuity-immediate values level payments one period before the first payment, so if the first payment is at time k periods, the payments'… | fact | elsewhere | Annuity Immediate: “The present value, valued one period before the first payment, is $a_{\overline{n}\\|}$” |
| For a loan whose first payment is deferred, accumulate the loan amount at the periodic interest rate to one period before the first payment… | procedure | tagged | Loan Amortization: “10000 &= 1000\,a_{\overline{4}\\|} + X\,v^4\,a_{\overline{4}\\|} \\” |
| The number of level payments n is found from PV = P·a_{n\|j} = P(1 - v^n)/j, giving n = -ln(1 - PV·j/P)/ln(1+j). | formula | tagged | Term of Loan: “n &= \frac{-\ln(1 - 0.08 \times 5.555556)}{\ln 1.08} \\” |
| A drop payment (final smaller payment) is a last payment, smaller than the regular payment, made one period after the last full payment; th… | definition | tagged | Drop Payment: “A **drop payment** is a final loan payment that is **smaller** than the regular payment, made one p…” |

</details>

<details><summary><code>fm-306</code> · untagged</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| A portfolio is fully immunized at a given interest rate when the present value of assets equals the present value of liabilities and the du… | definition | tagged | Redington Immunization: “3. $\text{Convexity}(A) > \text{Convexity}(L)$ — asset [[Convexity]] exceeds liability convexity” |
| Under full immunization at the current rate, the present value of assets equals the present value of liabilities, so the unknown asset's pr… | fact | linked | Full Immunization: “Dividing through by $v^T$ reduces them to $A(1+i)^{a} + B(1+i)^{-b} = L$ and $a\,A(1+i)^{a} = b\,B(…” |
| The present value of a single payment of amount C due in t years at annual effective rate i is C(1+i)^(-t), and accumulating a present valu… | formula | elsewhere | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| To find the surplus after an immediate interest rate change, hold the asset and liability cash flows fixed, revalue both at the new rate, a… | procedure | tagged | Asset-Liability Portfolio: “$$S(i) = \sum_{t} v^t \left(A_t - L_t\right) = PV_A(i) - PV_L(i)$$” |

</details>

<details><summary><code>fm-307</code> · gap</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Full Immunization, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| Full immunization of a liability with an asset portfolio means the present value of assets equals the present value of liabilities and the … | definition | tagged | Full Immunization: “**Full immunization** protects an [[Asset-Liability Portfolio\\|asset-liability position]] against *…” |
| Full immunization requires the present value of assets to equal the present value of liabilities and the first derivatives of these present… | fact | missing |  |
| To immunize a single liability with two zero-coupon bonds, set up two equations: PV of bond face values equals PV of the liability, and the… | procedure | tagged | Full Immunization: “$$A\,v^{T-a} + B\,v^{T+b} = L\,v^{T}$$” |
| The present value of a payment of amount X at time t at annual effective rate i is X v^t with v = 1/(1+i), and its derivative with respect … | formula | elsewhere | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| A zero-coupon bond pays a single amount (its face value) at maturity, so its present value is the face value discounted from the maturity d… | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |

</details>

<details><summary><code>fm-308</code> · answerable</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| Exact (cash flow) matching means choosing bond holdings whose coupon and redemption receipts in each period equal the liability due in that… | definition | tagged | Asset-Liability Portfolio: “choose assets whose cash flow on each date exactly equals the liability cash flow due that date, wh…” |
| To match liabilities exactly, work backward from the last period: the longest bond is the only asset paying at the final date, so its redem… | procedure | tagged | Cash Flow Matching: “Construction proceeds **backwards** from the last liability date — fund the final liability first, …” |
| A bond with face/redemption F and coupon rate r pays coupon rF in each period and at its maturity pays F(1+r), i.e., the final coupon plus … | fact | tagged | Cash Flow Matching: “the 2-year bond pays its face $F$ plus a coupon of $0.05F$ at time 2” |
| The price of a bond is the present value of its coupons and redemption discounted at its periodic effective yield rate: P = sum of CF_t/(1+… | formula | linked | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| A zero-coupon bond pays no coupons and pays only its redemption amount at maturity, so its price is the redemption discounted at its yield … | definition | tagged | Asset-Liability Portfolio (collapsed): “Purchase a 4-year zero-coupon bond with face value $50{,}000$ at a cost of” |
| When bonds are valued at different yield rates, each bond is priced separately at its own yield and the total purchase price is the sum of … | fact | tagged | Cash Flow Matching (collapsed): “The portfolio cost is $\dfrac{10{,}000}{(1+s_2)^2} + \dfrac{5{,}000}{1+s_1}$, where $s_1, s_2$ are …” |

</details>

<details><summary><code>fm-309</code> · gap</summary>

Tagged pages: Geometric Increasing Annuity, Perpetuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-year annuity-immediate paying 1 per year at effective rate i is a_n = (1 - v^n)/i, where v = 1/(1+i). | formula | tagged | Perpetuity: “obtained by letting $n \to \infty$ in $a_{\overline{n}\\|} = (1-v^n)/i$” |
| To value an annuity at a time after some payments have been made, take the present value at that time of only the remaining payments, using… | procedure | missing |  |
| Convert an annual effective interest rate i to an equivalent effective rate per half-year j by solving (1+j)^2 = 1+i, so j = (1+i)^(1/2) - … | procedure | elsewhere | Effective Rate: “i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1” |
| A perpetuity-immediate whose first payment is K and whose payments grow by a constant rate g per period has present value K/(i - g) when i … | formula | tagged | Geometric Progression: “$$\text{PV} = \frac{5000}{0.08 - 0.02} = \frac{5000}{0.06} = 83{,}333$$” |
| Two cash flow streams are exchanged at equal value when their present values at the same date and same interest rate are equal (equation of… | fact | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |

</details>

<details><summary><code>fm-310</code> · gap</summary>

Tagged pages: Perpetuity, Present Value, Annuity Due, Level Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| A perpetuity-due pays at the start of each period, and its present value with period effective rate i is (1+i)/i = 1/d. | definition | tagged | Perpetuity: “\ddot{a}_{\overline{\infty}\\|} = \frac{1}{d}” |
| The effective rate over a k-year period equals (1+i)^k - 1, where i is the annual effective rate, so a perpetuity with payments every k yea… | formula | missing |  |
| A level-pattern perpetuity with payments that repeat in a cycle can be split into separate perpetuities, one for each position in the cycle… | procedure | missing |  |
| A perpetuity whose first payment is delayed by m years has its present value found by discounting the perpetuity value back m years by mult… | procedure | linked | Deferred Annuity: “{}_{k\\|}\ddot{a}_{\overline{n}\\|} = v^k \cdot \ddot{a}_{\overline{n}\\|}” |
| The present value of a set of cash flows is the sum of the present values of its component streams, and setting it equal to the price allow… | fact | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |

</details>

<details><summary><code>fm-311</code> · gap</summary>

Tagged pages: Time Value of Money, Compound Interest, Present Value, Effective Rate, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| An annual effective interest rate i implies an equivalent monthly accumulation factor of (1+i)^(1/12); the monthly effective rate is (1+i)^… | fact | linked | Nominal Interest Rate: “$$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$” |
| An equation of value sets the present value (or accumulated value) of all cash flows in equal to that of all cash flows out at a chosen val… | definition | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| Convert the timing of cash flows to years from the valuation date: a flow at the middle of month n occurs at time (n-0.5)/12 and a flow at … | procedure | missing |  |
| In a loan or credit balance equation of value, the initial balance and subsequent charges are treated as amounts owed (inflows), while paym… | procedure | linked | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The number of terms in the sum is determined by the number of periods through the stated balance date, and the terminal balance is discount… | procedure | missing |  |

</details>

<details><summary><code>fm-312</code> · gap</summary>

Tagged pages: Force of Interest, Accumulated Value, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| With a force of interest δ_t, the accumulation function from time 0 to time t is a(t) = exp(∫_0^t δ_r dr). | formula | tagged | Force of Interest: “$$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$” |
| The accumulation factor from time s to time t (s<t) under a force of interest δ_r is a(t)/a(s) = exp(∫_s^t δ_r dr). | formula | tagged | Accumulated Value: “under a [[Variable Force of Interest\\|force of interest]] $\delta_r$ it equals $\exp\left(\int_s^t …” |
| The balance of an account at a given time with multiple deposits equals the sum of each deposit multiplied by its accumulation factor from … | procedure | missing |  |

</details>

<details><summary><code>fm-313</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Perpetuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A perpetuity-due makes payments at the start of each period (first payment at time 0), whereas a perpetuity-immediate pays at the end of ea… | definition | tagged | Perpetuity: “For a **perpetuity-due** (payments at the start of each period), each payment comes one period earl…” |
| The present value of an n-payment annuity-immediate with first payment P growing geometrically at rate g, at interest rate i (i≠g), is P[1-… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| A level perpetuity-immediate paying a per period has present value a/i one period before its first payment. | formula | elsewhere | Level Perpetuity: “The present value of a perpetuity-immediate (payments at end of period) paying $1$ per period at ra…” |
| To value a perpetuity that starts later, value it as of one period before its first payment and discount that value back to time 0 using v … | procedure | linked | Deferred Annuity: “$v = (1+i)^{-1}$ discounts the annuity-immediate value back over the $k$-period deferral.” |
| Split a cash flow stream with changing patterns into separate pieces (e.g., a finite growing annuity and a level perpetuity) and sum their … | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “PV &= 100\,a_{\overline{3}\\|0.08} + 2{,}060\,(1.08)^{-3} \\” |
| For payments growing by a constant rate g per period starting from first payment P, the k-th payment equals P(1+g)^(k-1). | fact | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |

</details>

<details><summary><code>fm-314</code> · untagged</summary>

Tagged pages: Increasing Annuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual rate convertible m times per year, i^(m), corresponds to an effective rate of i^(m)/m per interest period of length 1/m ye… | definition | elsewhere | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| Convert a payment time expressed in months into units of the compounding period (e.g., month n equals n/6 semiannual periods) and discount … | procedure | elsewhere | Time Value of Money: “it is discounted by $v^{s-t}$, where $v = 1/(1+i)$ is the [[Discount Factor]]” |
| The loan amount equals the present value of all payments at the loan's effective rate (equation of value at time 0). | fact | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| Payments made at the end of each period starting one period from today (payment-immediate/arrears) occur at times 1, 2, ..., N, so the summ… | definition | linked | Arithmetic Increasing Annuity: “An **arithmetic increasing annuity** has payments $1, 2, 3, \ldots, n$ at the end of periods $1, 2,…” |
| For an arithmetically increasing payment stream with first payment P and constant increase X, the n-th payment equals P + (n-1)X. | procedure | linked | Arithmetic Progression: “starting from a first payment $P$, the payments are $P,\ P+Q,\ P+2Q,\ \ldots,\ P+(n-1)Q$.” |

</details>

<details><summary><code>fm-315</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond's price equals the present value of its coupons plus the present value of its redemption value, discounted at the bond's yield rate. | fact | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| A zero-coupon bond pays no coupons, so its price equals its redemption value times v^n. | definition | missing |  |
| The price of a par-redeemed bond with par value F, coupon rate r, and n annual periods at effective yield i is F(v^n + r·a_angle(n)), where… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| Bonds with the same term and the same yield rate share the same v^n and a_angle(n), so these values found from one bond can be reused to pr… | fact | missing |  |
| The coupon on a bond equals the coupon rate times the par (face) value, paid each period. | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |

</details>

<details><summary><code>fm-316</code> · answerable</summary>

Tagged pages: Increasing Annuity, Perpetuity, Present Value, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a level annuity-immediate of 1 per period for n periods at effective rate i is a_angle(n) = (1 - v^n)/i, where v = 1/(… | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The present value of a perpetuity-immediate paying 1 per period is 1/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| An increasing perpetuity-immediate paying P, 2P, 3P, ... at times 1, 2, 3, ... has present value P/i^2. | formula | linked | Arithmetic Progression: “With $P, Q > 0$ and no end date, the [[Perpetuity\\|perpetuity]]-immediate is worth $P/i + Q/i^2$.” |
| Split a payment stream with arithmetic increases into a level perpetuity plus an increasing perpetuity whose payments start at zero (e.g., … | procedure | linked | Arithmetic Progression: “The first term values a level payment of $P$ every period; the second values what is added on top o…” |
| To value a deferred stream at time 0, compute its value as of the time just before its first payment (the deferral point) using perpetuity … | procedure | linked | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| The present value of a cash flow stream at an effective rate is the sum of its component streams' present values, which equals the stated t… | definition | linked | Annuities: “Its value on any date is the sum of the values of its payments on that date” |

</details>

<details><summary><code>fm-317</code> · untagged</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond's price equals the present value of its coupons and redemption value, discounted at the yield rate. | fact | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| The price of an annual-coupon bond with face amount F, coupon rate r, redemption value equal to F, n years and yield rate i is P = F[v^n + … | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The present value of an n-period annuity-immediate at effective rate i is a_{n\|i} = (1 - v^n)/i. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The coupon amount of a bond is the coupon rate multiplied by the face amount, paid each coupon period. | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |

</details>

<details><summary><code>fm-318</code> · answerable</summary>

Tagged pages: Bond Amortization, Bonds, Book Value, Face Value, Coupon, Coupon Rate, Term of Bond, Accumulation of Discount

| Item | Kind | Status | Where |
|---|---|---|---|
| For a bond paying semiannual coupons with a nominal annual yield convertible semiannually, work in half-year periods: the coupon is the fac… | procedure | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The modified coupon rate g is the coupon amount divided by the redemption value (g = Fr/C), so that Cg equals the coupon. | definition | tagged | Face Value: “otherwise compare the yield with the modified coupon rate $g = Fr/C$.” |
| A bond is purchased at a discount when the redemption value times the periodic yield exceeds the coupon (Ci > Fr, i.e., i > g). | fact | linked | Discount: “The discount is positive exactly when $Fr < Cj$, that is, when the **modified coupon rate** $g = Fr…” |
| For a bond bought at a discount, the amortization schedule's accumulation of discount in the k-th coupon (the increase in book value) is C(… | formula | tagged | Accumulation of Discount: “$$= (Cj - Fr) \cdot v^{n-t+1}$$” |

</details>

<details><summary><code>fm-319</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of its redemption value, discounted at the yield rate: P… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| For a bond with coupons payable semiannually, convert to half-year periods: the number of periods is twice the years, the periodic yield is… | procedure | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The present value of an n-period annuity-immediate at periodic rate j is a_{n\|j} = (1 - v^n)/j, where v = 1/(1+j). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| When the redemption value is defined as a multiple of the bond's own price, express the redemption value in terms of the unknown price P, w… | procedure | elsewhere | Annuity Contract (collapsed): “the refund is a fraction of the premium being solved for, so $G$ appears on both sides and the answ…” |
| To find an unknown term of a bond given its price, yield, coupon and redemption value, set up the price equation and solve for the number o… | procedure | elsewhere | Number of Periods: “$$n = \frac{\ln(FV/PV)}{\ln(1+i)}$$” |
| The coupon amount Fr equals j times the quantity Fr/j, so the coupon annuity can be written as (Fr/j)(1 - v^n), which lets the price equati… | fact | missing |  |

</details>

<details><summary><code>fm-320</code> · answerable</summary>

Tagged pages: Duration, Bonds, Present Value, 1st-Order Linear Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| Modified duration equals Macaulay duration divided by (1+i), where i is the annual effective yield rate: D_mod = D_mac/(1+i). | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |
| Macaulay duration is the present-value-weighted average time of a bond's cash flows, measured in years at a given yield rate. | definition | linked | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| Bonds evaluated at the same yield rate share the same factor (1+i), so the ratio of Macaulay duration to modified duration is the same for … | fact | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-321</code> · untagged</summary>

Tagged pages: Nominal Interest Rate, Force of Interest, Accumulated Value, Convertible m-thly, Nominal Interest Rate Convertible m-thly, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| When the interest rate changes over successive periods, the accumulated value is the initial deposit times the product of the accumulation … | procedure | tagged | Accumulated Value: “each cash flow is carried forward by its own accumulation factor:” |
| With a nominal annual rate i^(m) convertible m times per year, the effective rate per period is i^(m)/m, and the accumulation factor over n… | formula | tagged | Convertible m-thly: “A [[Nominal Interest Rate]] is **convertible $m$-thly** (or compounded $m$ times per year) when int…” |
| With a constant force of interest δ, the accumulation factor over t years is e^(δt). | formula | tagged | Force of Interest: “Under a constant force of interest, the [[Accumulation Function]] is:” |
| With a nominal annual discount rate d^(m) convertible m times per year, the effective discount rate per period is d^(m)/m, and the accumula… | formula | elsewhere | Nominal Discount Rate: “A **nominal discount rate** $d^{(m)}$ is a quoted annual rate of discount payable (convertible) $m$…” |
| The accumulation factor over one period equals the reciprocal of the discount factor (1-d) for that period, so (1-d)^(-n) accumulates for n… | fact | elsewhere | Effective Discount Rate: “Under compound discount, $1$ today accumulates to $\frac{1}{1-d}$ after one period and to $(1-d)^{-…” |

</details>

<details><summary><code>fm-322</code> · answerable</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Perpetuity, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-immediate paying P per year at annual effective rate j is P/j. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The accumulated value at the time of the last payment of an annuity-immediate of level payments R for n years at rate i is R times s_angle(… | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When an accumulated fund is used to purchase a perpetuity, set the fund value equal to the perpetuity's present value at the purchase-date … | procedure | tagged | Perpetuity: “$$PV = \frac{50{,}000}{i} = \frac{50{,}000}{0.04} = \$1{,}250{,}000$$” |

</details>

<details><summary><code>fm-323</code> · answerable</summary>

Tagged pages: Geometric Increasing Annuity, Loan Amortization, Loans, Outstanding Balance, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-period geometrically increasing annuity-immediate with first payment P, growth rate g, and interest rate i is P*(… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| The original loan amount equals the present value of all scheduled loan payments, discounted at the loan's effective interest rate. | fact | tagged | Loan Amortization: “whose present value at the loan rate equals the amount lent” |
| A payment stream with each payment a fixed percentage greater than the preceding one forms a geometric progression, with the t-th payment e… | definition | tagged | Geometric Increasing Annuity: “payments are $1, (1+g), (1+g)^2, \ldots, (1+g)^{n-1}$” |
| Compute the outstanding loan balance prospectively as the present value, at the loan's interest rate, of the remaining future payments afte… | procedure | tagged | Loans: “the **prospective method** (present value of the remaining payments)” |

</details>

<details><summary><code>fm-324</code> · gap</summary>

Tagged pages: Force of Interest, Accumulated Value, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation function equals the exponential of the integral of the force of interest from 0 to t: a(t) = exp(∫_0^t δ_r dr). | formula | tagged | Force of Interest: “$$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$” |
| The annual effective rate of interest in year n is i_n = a(n)/a(n-1) - 1, i.e., the growth over the interval from time n-1 to n. | formula | missing |  |
| Year n corresponds to the time interval from t = n-1 to t = n, so year 5 runs from time 4 to time 5. | fact | missing |  |

</details>

<details><summary><code>fm-325</code> · answerable</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond's price is the present value of its coupons and redemption value, discounted at the yield rate per period. | definition | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| Coupon amount per period equals the face amount times the coupon rate per period (annual coupon rate divided by the number of payments per … | definition | tagged | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| A bond purchased at a discount of D has a price equal to its redemption value (par) minus D. | definition | linked | Discount: “A **discount** bond is a [[Bonds\\|bond]] whose price $P$ is below its [[Redemption Value\\|redemptio…” |
| A nominal annual rate convertible m times per year corresponds to an effective rate of j/m per period, and the number of periods equals yea… | fact | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| The price of a bond with coupons Fr per period and redemption C is P = Fr * a_{n\|i} + C(1+i)^{-n}, where i is the yield per period and n t… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| Solve for the unknown yield rate per period using a financial calculator by entering N, PV, PMT, FV and computing I/Y, then convert to the … | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |

</details>

<details><summary><code>fm-326</code> · answerable</summary>

Tagged pages: Bond Amortization, Bonds, Book Value, Face Value, Coupon, Coupon Rate, Term of Bond, Amortization of Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond is bought at a premium when the coupon rate exceeds the yield rate, and the book value then decreases each period as the premium is … | fact | tagged | Bond Amortization: “$PR_t > 0$ when the bond was bought at a [[Premium\\|premium]]: the book value is written down each …” |
| The change in a bond's book value over a coupon period equals the principal adjustment: the amortization of premium (or accumulation of dis… | definition | tagged | Bond Amortization: “$$B_t = B_{t-1} - PR_t$$” |
| For a bond with face F, redemption C, coupon rate r and yield i per period, n periods, the premium amortized in the kth coupon is (Fr − Ci)… | formula | tagged | Bond Amortization: “$$PR_t = Fr - I_t = (Fr - Cj)\,v^{\,n-t+1}$$” |
| The price of a bond is the present value of its coupons plus the present value of the redemption value at the yield rate: P = Fr·a_n\|i + C… | formula | tagged | Bonds: “The **basic bond price formula**: $P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$ where $F$ = face…” |
| When a bond is redeemed at par, the redemption value C equals the face amount F. | fact | tagged | Face Value: “When the bond is redeemed at par, the [[Redemption Value]] $C = F$” |

</details>

<details><summary><code>fm-327</code> · untagged</summary>

Tagged pages: Annuities, Present Value, Annuity Immediate, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Compounding the periodic effective rate j over m conversion periods gives the annual effective rate, so (1+j)^m = 1+i. | fact | elsewhere | Nominal Interest Rate Convertible m-thly: “\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i” |
| The present value of an n-year annuity-immediate paying 1 at the end of each year is a_angle_n = (1 - v^n)/i = (1 - (1+i)^(-n))/i. | formula | tagged | Annuity Immediate: “= \frac{1-(1+i)^{-n}}{i}” |
| To find the number of payments n from a known annuity present value and rate, set the annuity formula equal to the present value, solve for… | procedure | tagged | Term of Annuity: “n = \frac{\ln(1 - i \cdot \text{PV}/P)}{\ln(1/(1+i))}” |

</details>

<details><summary><code>fm-328</code> · untagged</summary>

Tagged pages: Net Present Value, Present Value, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| Convert a nominal annual interest rate convertible m times per year to the effective rate per period by dividing the nominal rate by m. | procedure | linked | Loans: “Monthly rate: $i^{(12)}/12 = 0.06/12 = 0.5\%$.” |
| Compare two cash-flow options by computing the present value of each at the given interest rate, and set the present values equal when the … | procedure | elsewhere | Equation of Value: “$$\text{Value}_{t_0}(\text{inflows}) = \text{Value}_{t_0}(\text{outflows})$$” |
| The present value of a single payment of amount F due in n periods is F(1+i)^(-n), where i is the effective rate per period. | formula | tagged | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |
| The present value of an n-period ordinary annuity-immediate paying 1 at the end of each period is a_{n\|i} = (1 - (1+i)^(-n)) / i. | formula | linked | Annuity Immediate: “$$= \frac{1-(1+i)^{-n}}{i}$$” |
| In the purchase option, the net cost's present value is the purchase price minus the present value of the car's resale/residual value to th… | procedure | tagged | Net Present Value: “The **net present value** (NPV) is the sum of the present values of all cash flows associated with …” |

</details>

<details><summary><code>fm-329</code> · answerable</summary>

Tagged pages: Geometric Increasing Annuity, Loan Amortization, Loans, Outstanding Balance, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a geometrically increasing annuity-immediate with first payment R, payment growth rate g, and interest rate i is R*[1-… | formula | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |
| The loan amount equals the present value of all installments discounted at the loan's effective interest rate (equation of value at time ze… | fact | tagged | Loan Amortization: “the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rat…” |
| The outstanding loan balance after a payment can be computed retrospectively as the accumulated original loan minus the accumulated value o… | formula | tagged | Outstanding Balance: “- **Retrospective method** (accumulated value of loan minus accumulated payments):” |
| The interest portion of a payment equals the interest rate times the outstanding balance immediately after the previous payment. | formula | tagged | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |
| The principal portion of a payment equals the payment minus its interest portion. | formula | tagged | Loan Amortization: “$$PR_k = K_k - I_k = B_{k-1} - B_k$$” |
| Installments that each increase by a fixed percentage over the preceding installment form a geometric progression with ratio 1 plus that pe… | definition | tagged | Geometric Progression: “a **geometric progression** refers to a sequence of payments where each payment is a constant multi…” |

</details>

<details><summary><code>fm-330</code> · gap</summary>

Tagged pages: Force of Interest, Accumulated Value, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation function for a force of interest δ_t is a(t) = exp(∫_0^t δ_r dr). | formula | linked | Variable Force of Interest: “$$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$” |
| The interest earned during year n on an investment of amount P is P[a(n) − a(n−1)], the difference in accumulated values at the end and sta… | definition | missing |  |
| With annual effective rate i, the accumulation function is a(t) = (1+i)^t, so interest credited in year n on deposit X is X[(1+i)^n − (1+i)… | formula | linked | Compound Interest: “The [[Accumulation Function]] is $a(t) = (1+i)^t$, which is exponential (vs. linear under [[Simple …” |
| To find an unknown deposit, set the interest earned in the specified year on one account equal to that on the other account and solve for t… | procedure | missing |  |

</details>

<details><summary><code>fm-331</code> · answerable</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Forward Rate, Yield Curve, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| An n-year spot rate is the annual effective rate earned on a zero-coupon investment or single-payment loan made today and held for n years,… | definition | tagged | Spot Rates and Forward Rates: “The [[Spot Rate]] $s_t$ is the annual effective rate earned on an investment made now and repaid in…” |
| Under no-arbitrage (or indifference between alternatives), investing for a long period at the spot rate must give the same accumulated valu… | fact | tagged | Spot Rates and Forward Rates: “Either set determines the other, because investing for $n$ years and then at the forward rate for $…” |
| The forward rate from time t to time t+k satisfies (1+s_{t+k})^{t+k} = (1+s_t)^t (1+f_{t,t+k})^k, so (1+f)^k = (1+s_{t+k})^{t+k}/(1+s_t)^t. | formula | tagged | Forward Rate: “$$(1+s_{t_2})^{t_2} = (1+s_{t_1})^{t_1} \cdot (1+f_{t_1, t_2})^{t_2-t_1}$$” |
| To compare a single-payment loan with a rolled-over alternative, accumulate the principal at the appropriate spot rate for each segment, se… | procedure | tagged | Spot Rates and Forward Rates: “Either set determines the other, because investing for $n$ years and then at the forward rate for $…” |

</details>

<details><summary><code>fm-332</code> · untagged</summary>

Tagged pages: Accumulated Value, Annuity Due, Compound Interest, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| An annuity-due is a series of equal payments made at the beginning of each period; its accumulated value at the end of n periods is s-doubl… | definition | tagged | Annuity Due: “Because each payment is received one period earlier than in an [[Annuity Immediate\\|annuity-immedia…” |
| The accumulated value of an n-period annuity-due of level payments P at effective rate i, measured at the end of period n, is P times s-dou… | formula | tagged | Annuity Due: “Here $d = i/(1+i)$ is the effective annual [[Discount Rate]].” |
| To value a stream of cash flows, choose a comparison date, then accumulate each group of payments to that date (here the end of year 5) and… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| Deposits made at certain times can be treated as a separate annuity, so combined payments at a given time are the sum of independent annuit… | fact | tagged | Accumulated Value: “AV = \sum_k C_{t_k} \cdot (1+i)^{t - t_k}” |
| A single amount accumulates over t years at annual effective rate i by multiplying by (1+i)^t. | formula | tagged | Accumulated Value: “$a(t) = (1+i)^t$, so $AV = PV \cdot (1+i)^t$” |

</details>

<details><summary><code>fm-333</code> · answerable</summary>

Tagged pages: Immunization, Duration, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization protects the surplus only against small parallel shifts in the interest rate, not against any arbitrary change in ra… | fact | tagged | Redington Immunization: “Redington immunization only protects against small, parallel rate shifts and must be rebalanced as …” |
| Redington immunization requires that the present value of assets equal the present value of liabilities and that the (modified or Macaulay)… | fact | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$) 2. $D_{Mac}(A) …” |
| Redington immunization requires the convexity of the assets to be greater than the convexity of the liabilities, so the surplus does not fa… | fact | tagged | Redington Immunization: “3. $\text{Convexity}(A) > \text{Convexity}(L)$ — asset [[Convexity]] exceeds liability convexity” |
| Full immunization is achieved when asset cash flows bracket the liability cash flows (asset cash flows occur both before and after the liab… | fact | linked | Full Immunization: “3. There is an asset cash flow before the liability date and one after it” |

</details>

<details><summary><code>fm-334</code> · untagged</summary>

Tagged pages: Accumulated Value, Annuity Due, Compound Interest, Future Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value of a single deposit P after n years at annual effective rate i is P(1+i)^n. | formula | tagged | Accumulated Value: “Under [[Compound Interest]] at rate $i$, $a(t) = (1+i)^t$, so $AV = PV \cdot (1+i)^t$.” |
| The present value of an n-year annuity-due of level payments P at annual effective rate i is P times a-double-dot_n = P(1-v^n)/d, where d =… | formula | elsewhere | Level Annuity: “**[[Annuity Due]]**: payments at the **beginning** of each period; PV factor $\ddot{a}_{\overline{n…” |
| To find an unknown interest rate, set up an equation of value equating the accumulated value of the initial deposit at the reinvestment dat… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The present value of an annuity-due is measured one period before its first payment, so the balance reinvested at the end of year 5 funds t… | fact | tagged | Annuity Due: “Because each payment is received one period earlier than in an [[Annuity Immediate\\|annuity-immedia…” |

</details>

<details><summary><code>fm-335</code> · gap</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a zero-coupon bond equals its face value times v^n, where v = 1/(1+i) is the discount factor and n is the years to maturity. | formula | linked | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |
| The price of a coupon bond with face value F, coupon rate r, and redemption equal to face value is the present value of the coupons, F*r*a_… | formula | tagged | Bond Price: “Here $F$ is the face value, $r$ is the coupon rate per period (so $Fr$ is the periodic coupon amoun…” |
| The present value of an n-period annuity-immediate at effective rate i is a_angle(n) = (1 - v^n)/i. | formula | missing |  |
| The annual coupon on a bond is the coupon rate times the face value, paid at the end of each year. | definition | tagged | Coupon: “A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the…” |

</details>

<details><summary><code>fm-336</code> · gap</summary>

Tagged pages: Increasing Annuity, Fund Accumulation, Accumulated Value, Future Value, Reinvestment of Coupons

| Item | Kind | Status | Where |
|---|---|---|---|
| When interest on an investment is paid out each period and reinvested at a different rate, the principal stays unchanged and the interest p… | procedure | tagged | Fund Accumulation (collapsed): “Since the \$$500$ principal stays in Fund A, it earns level interest of $500(0.05) = \$25$ per year…” |
| Determine the interest payment each period as the investment rate times the principal outstanding, so that level deposits produce interest … | procedure | tagged | Fund Accumulation (collapsed): “Since the \$$500$ principal stays in Fund A, it earns level interest of $500(0.05) = \$25$ per year…” |
| An increasing annuity-immediate has payments of 1, 2, ..., n at the end of periods 1 through n, and its accumulated value at the end of per… | definition | tagged | Increasing Annuity: “$(Ia)_{\overline{n}\\|}$ values payments $1, 2, \ldots, n$ at the ends of periods $1$ to $n$, one pe…” |
| The accumulated value of an increasing annuity-immediate is (Is)_{n\|i} = (s̈_{n\|i} − n)/i. | formula | missing |  |
| The accumulated value of an annuity-due is s̈_{n\|i} = ((1+i)^n − 1)/d, where d = i/(1+i), equivalently (1+i)·s_{n\|i}. | formula | missing |  |

</details>

<details><summary><code>fm-337</code> · untagged</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Outstanding Balance, Principal, Term of Loan, Balloon Payment, Final Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a level annuity-immediate of n payments at effective rate i is a_angle(n) = (1 - v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The loan amount equals the present value of all loan payments at the loan's effective interest rate (equation of value). | fact | tagged | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |
| To find the number of level payments for a loan, solve loan amount = payment times a_angle(n) for n, which is generally non-integer; the nu… | procedure | tagged | Balloon Payment (collapsed): “Solve $10000 = 1500\,a_{\overline{n}\\|8\%}$, so $a_{\overline{n}\\|} = 6.666667$:” |
| A balloon payment is handled by paying the regular payment for the integer number of periods plus an additional amount X at the final time,… | procedure | tagged | Balloon Payment: “$$B = L(1+i)^n - K \cdot s_{\overline{n-1}\\|i} \cdot (1+i)$$” |
| The final (balloon) payment must be consistent with the stated constraint on its size (here, less than twice the regular payment), which de… | fact | tagged | Balloon Payment: “So 9 full payments can be made, and something is still owed just after the 9th:” |

</details>

<details><summary><code>fm-338</code> · answerable</summary>

Tagged pages: Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization matches the present value of assets and liabilities and their durations (first-derivative condition), with asset con… | definition | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| For Redington immunization, the Macaulay duration of the assets must equal the Macaulay duration of the liabilities. | fact | tagged | Redington Immunization: “2. $D_{Mac}(A) = D_{Mac}(L)$ — asset and liability [[Macaulay Duration\\|Macaulay durations]] are eq…” |
| The Macaulay duration of a single zero-coupon bond equals its time to maturity. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| The Macaulay duration of a portfolio is the present-value-weighted average of the times of the cash flows: sum of t times PV(cash flow at t… | formula | linked | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| Find the duration of a single liability payment, which equals its payment time, then set it equal to the asset portfolio duration to solve … | procedure | tagged | Redington Immunization (collapsed): “**Condition 2** ($D_{Mac}(A) = D_{Mac}(L) = 4$), multiplying through by the common present value:” |
| Since the asset amounts invested are given at the valuation rate, use them as present-value weights in the asset duration calculation (the … | procedure | tagged | Portfolio: “**[[Duration]] of a portfolio**: the weighted average of individual asset durations, weighted by ma…” |

</details>

<details><summary><code>fm-339</code> · gap</summary>

Tagged pages: Immunization, Full Immunization, Duration, Bonds, Portfolio, Asset-Liability Portfolio, Duration Matching, Redington Immunization

| Item | Kind | Status | Where |
|---|---|---|---|
| A portfolio is fully immunized at a given interest rate when the present value of assets equals the present value of liabilities and the fi… | definition | tagged | Full Immunization: “Under these conditions the surplus $PV_A - PV_L$ is zero at $i$ and positive at every other rate, w…” |
| Full immunization requires two conditions: the present value of assets equals the present value of liabilities, and the derivative of the n… | fact | tagged | Full Immunization: “1. $PV(\text{assets}) = PV(\text{liability})$ at the current rate $i$ 2. The [[Duration]] of the as…” |
| Set up the immunization equations by choosing a reference date (e.g., the liability date) and accumulating or discounting each cash flow to… | procedure | tagged | Full Immunization: “Dividing through by $v^T$ reduces them to $A(1+i)^{a} + B(1+i)^{-b} = L$ and $a\,A(1+i)^{a} = b\,B(…” |
| The derivative with respect to i of a cash flow's value at a reference date, C(1+i)^(-(t-s)), is -(t-s)C(1+i)^(-(t-s)-1); so the duration c… | formula | tagged | Full Immunization: “$$(T-a)\,A\,v^{T-a} + (T+b)\,B\,v^{T+b} = T\,L\,v^{T}$$” |
| Solve for an unknown asset maturity by dividing the duration (time-weighted PV) equation by the PV-match equation, which cancels the unknow… | procedure | missing |  |

</details>

<details><summary><code>fm-340</code> · gap</summary>

Tagged pages: Bond Price, Geometric Increasing Annuity, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of its redemption value, discounted at the yield rate pe… | fact | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| A nominal annual rate convertible m times per year corresponds to an effective rate per period equal to the nominal rate divided by m. | definition | elsewhere | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| The number of coupons on a bond equals the number of years times the coupon frequency per year. | fact | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| A geometrically increasing annuity-immediate pays an amount that grows by a constant factor (1+g) each period, with the first payment made … | definition | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |
| The present value of an n-period geometrically increasing annuity-immediate with first payment R, growth rate g and interest rate i (i≠g) i… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| To find an unknown first payment, write the price equation as a linear function of that payment (annuity factor times payment plus PV of re… | procedure | missing |  |

</details>

<details><summary><code>fm-341</code> · answerable</summary>

Tagged pages: Geometric Increasing Annuity, Perpetuity, Force of Interest, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| A constant force of interest δ corresponds to an annual effective rate i = e^δ − 1. | formula | tagged | Force of Interest: “$$i = e^\delta - 1$$” |
| The present value of a geometrically increasing perpetuity-immediate with first payment K one period from now and growth rate g is K/(i − g… | formula | tagged | Geometric Progression: “$$\text{PV} = \frac{5000}{0.08 - 0.02} = \frac{5000}{0.06} = 83{,}333$$” |
| Convert a perpetuity-immediate present value to a perpetuity-due present value by multiplying by (1 + i), since each payment occurs one per… | procedure | tagged | Perpetuity: “For a **perpetuity-due** (payments at the start of each period), each payment comes one period earl…” |
| A perpetuity-due is a perpetual series of payments made at the beginning of each period, with the first payment at time 0. | definition | tagged | Perpetuity: “For a **perpetuity-due** (payments at the start of each period), each payment comes one period earl…” |

</details>

<details><summary><code>fm-342</code> · gap</summary>

Tagged pages: Annuities, Force of Interest, Accumulated Value, Annuity Immediate, Level Payment Annuity, Term of Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| With a constant force of interest δ, the accumulation factor over t years is e^{δt} and the present value (discount) factor is e^{-δt}. | formula | missing |  |
| An equation of value sets the present value (at a common time) of all cash inflows equal to the present value of all cash outflows or balan… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| For a nominal or annual force of interest δ and payments m times per year, the force of interest over each 1/m-year period is δ/m, so the n… | procedure | missing |  |
| Payments made at the end of each period for a given number of years occur at times 1/m, 2/m, ..., so the count of payments is m times the n… | fact | tagged | Annuity Immediate: “An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period.” |
| The account balance immediately after the last deposit is a value at the final deposit time (time of the term end), so its present value is… | fact | missing |  |

</details>

<details><summary><code>fm-343</code> · gap</summary>

Tagged pages: Loan Amortization, Loans, Amortization, Bonds, Principal, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| A zero-coupon bond pays a single amount (par/redemption value) at maturity, and its price at purchase is the par value discounted at the yi… | definition | linked | Term of Bond: “The time factor in the present value formula: $v^n = (1+j)^{-n}$” |
| The price of a zero-coupon bond bought n years before maturity with annual effective yield j is Par × (1+j)^(-n). | formula | linked | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| In an interest-only loan, each periodic payment before the final one equals the loan principal times the effective interest rate per period… | fact | tagged | Principal: “It is the basis on which interest is computed in the first period ($\text{Interest}_1 = L \times i$…” |
| To find the loan interest payment due at a given time, subtract the cost of the bond purchased at that time from the total cash outlay, the… | procedure | missing |  |

</details>

<details><summary><code>fm-344</code> · answerable</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| Exact (cash flow) matching of assets to liabilities means choosing asset holdings so that the asset cash flows equal the liability cash flo… | definition | tagged | Cash Flow Matching: “**Cash flow matching** (also called **dedication**) is a portfolio strategy in which asset cash flo…” |
| A bond redeemable at par with face value F and annual coupon rate r pays coupon rF at the end of each year until maturity, and at maturity … | fact | tagged | Cash Flow Matching: “the 2-year bond pays its face $F$ plus a coupon of $0.05F$ at time 2” |
| To match liabilities with bonds of different terms, work backwards from the longest maturity: the final liability determines the face amoun… | procedure | tagged | Cash Flow Matching: “Construction proceeds **backwards** from the last liability date — fund the final liability first, …” |
| The unknown liability at a given time equals the total coupons received at that time from all bonds still outstanding (plus any redemption … | procedure | tagged | Cash Flow Matching (collapsed): “that bond also pays a coupon of $0.05(1{,}904.76) = 95.24$ at time 1, so the zero-coupon bond only …” |

</details>

<details><summary><code>fm-345</code> · answerable</summary>

Tagged pages: Bond Price, Bonds, Yield Rate, Face Value, Coupon, Coupon Rate, Redemption Value, Market Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The coupon rate of a bond is the annual coupon total divided by the face amount, so semiannual coupons are the semiannual coupon amount tim… | definition | tagged | Coupon Rate: “$$r = \frac{\text{Coupon}}{F}$$” |
| An annual nominal yield rate convertible semiannually is divided by 2 to give the effective yield rate per semiannual period. | fact | tagged | Coupon Rate: “For a bond paying semi-annually with a $6\%$ annual coupon rate, the per-period coupon rate is $r =…” |
| The price of a bond equals the present value of its coupons (coupon amount times an annuity-immediate factor at the periodic yield) plus th… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The number of coupon periods for a bond with semiannual coupons is twice the number of years to maturity, so years equals the number of per… | fact | linked | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |
| Solve for the unknown number of periods in a bond price equation using a financial calculator by entering PV (price), PMT (coupon), FV (red… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |

</details>

<details><summary><code>fm-346</code> · untagged</summary>

Tagged pages: Immunization, Bonds, Present Value, Portfolio, Asset-Liability Portfolio, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| An exact cash flow match (immediate cash flow matching) builds an asset portfolio whose cash inflows equal the liability payments at each t… | fact | tagged | Cash Flow Matching: “**Cash flow matching** (also called **dedication**) is a portfolio strategy in which asset cash flo…” |
| To match cash flows, work backward from the latest liability: buy enough of the longest-maturity bond so its final payment (par plus coupon… | procedure | tagged | Cash Flow Matching: “Construction proceeds **backwards** from the last liability date — fund the final liability first, …” |
| The price of a coupon bond is the present value of its coupons and redemption value at the yield rate per coupon period, i.e. the sum of co… | formula | linked | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| A nominal annual yield rate convertible semiannually corresponds to an effective per-period rate equal to the nominal rate divided by 2 (e.… | fact | elsewhere | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| A bond's coupon equals the coupon rate per period times par value (annual coupon rate payable semiannually gives half the annual rate times… | fact | tagged | Cash Flow Matching: “the 2-year bond pays its face $F$ plus a coupon of $0.05F$ at time 2” |
| A zero-coupon bond pays only its maturity value, so its price is the maturity value discounted at the per-period yield rate for the number … | formula | tagged | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |

</details>

<details><summary><code>fm-347</code> · answerable</summary>

Tagged pages: Net Present Value, Force of Interest, Cash Flow, Current Value

| Item | Kind | Status | Where |
|---|---|---|---|
| With a constant force of interest δ, the accumulation factor over t years is e^(δt) and the discount (present value) factor is e^(-δt). | formula | tagged | Force of Interest: “Under a constant force of interest, the [[Accumulation Function]] is:” |
| The current value of a set of cash flows is the sum of each flow's value moved to the valuation date: future flows are discounted back, pas… | procedure | tagged | Current Value: “It is computed by accumulating the cash flows that occur before $t$ and discounting those that occu…” |
| Convert time periods quoted in months to years (months/12) so they match an annual force of interest rate. | procedure | linked | Simple Interest (collapsed): “$t = 9/12 = 0.75$ years:” |

</details>

<details><summary><code>fm-348</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Present Value, Geometric Progression, Non-level Annuities

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-payment geometrically increasing annuity-immediate with first payment P, growth rate g, and effective interest ra… | formula | tagged | Geometric Increasing Annuity: “The present value (at effective rate $i \neq g$) is:” |
| When the payment growth rate equals the effective interest rate, each payment's present value equals the first payment, so an n-payment geo… | fact | tagged | Geometric Increasing Annuity: “When $i = g$, $\text{PV} = n \cdot v = n/(1+i)$.” |
| An annuity-due makes payments at the beginning of each period (times 0, 1, ..., n−1), whereas an annuity-immediate pays at the end of each … | definition | linked | Annuity Immediate: “An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period.” |
| To find an unknown payment amount for two annuities with equal present values, compute each annuity's present value at the same interest ra… | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The present value of a stream of payments is the sum of each payment multiplied by the discount factor v^t = (1+i)^(−t) for its payment tim… | procedure | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |

</details>

<details><summary><code>fm-349</code> · untagged</summary>

Tagged pages: Nominal Discount Rate, Nominal Discount Rate Convertible m-thly, Force of Interest, Discount Rate, Effective Discount Rate, Convertible m-thly, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation factor from time t1 to t2 under a force of interest δ_t is exp(∫ from t1 to t2 of δ_t dt). | formula | elsewhere | Variable Force of Interest: “$$\frac{a(t)}{a(s)} = \exp\!\left(\int_s^t \delta(u)\,du\right)$$” |
| The nominal annual discount rate d^(m) compounded m times per year means the effective discount rate per 1/m-year period is d^(m)/m; for pe… | definition | tagged | Nominal Discount Rate: “$m$ need not be a whole number: a rate "compounded every two years" has $m = \tfrac{1}{2}$, so disc…” |
| Accumulating over a time span n with nominal discount rate d^(m) gives the accumulation factor (1 - d^(m)/m)^(-mn), where mn may be fractio… | formula | tagged | Nominal Discount Rate: “$$a(t) = \left(1 - \frac{d^{(m)}}{m}\right)^{-mt}$$” |
| To find an equivalent nominal rate over a time interval, set the accumulation factor from the nominal rate equal to the accumulation factor… | procedure | tagged | Nominal Discount Rate Convertible m-thly: “$$\left(1 - \frac{d^{(m)}}{m}\right)^m = 1 - d$$” |

</details>

<details><summary><code>fm-350</code> · answerable</summary>

Tagged pages: Duration, Bonds, Present Value, Macaulay Duration

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a coupon bond is the present value of its coupons and redemption value at the yield rate: P = Fr·a_{n\|i} + C·v^n. | formula | tagged | Bonds: “The **basic bond price formula**: $P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$ where $F$ = face…” |
| Macaulay duration is the weighted average of payment times, where each time is weighted by the present value of the payment made at that ti… | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| Macaulay duration of a bond = Σ t·v^t·CF_t / Σ v^t·CF_t, computed at the bond's yield rate. | formula | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| A zero-coupon bond's Macaulay duration equals its time to maturity, since it has a single payment. | fact | linked | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term, but for a coup…” |
| When all assets in a portfolio are valued at the same yield, the portfolio's Macaulay duration equals the average of the individual duratio… | fact | linked | Duration Matching (collapsed): “Purchase bonds with total market value \$$7{,}472.58$ and weighted Macaulay duration of exactly 5 y…” |

</details>

<details><summary><code>fm-351</code> · untagged</summary>

Tagged pages: Loan Amortization, Yield Rate, Equation of Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an n-period annuity-immediate of 1 per period at effective rate i is a_angle(n) = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The original loan amount equals the present value of the scheduled loan payments discounted at the loan's effective interest rate. | fact | tagged | Loan Amortization: “the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rat…” |
| A lender's yield on a transaction is the interest rate at which the present value of its cash inflows equals the present value of its cash … | definition | tagged | Yield Rate: “the interest rate per period at which the present value of all future cash flows equals the current…” |
| To find an unknown sale price, set up an equation of value at the yield rate equating the amount lent to the PV of the payments actually re… | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The seller of the remaining loan payments receives the sale price as a single cash inflow at the time of sale, and a single amount at time … | fact | linked | Present Value: “A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:” |

</details>

<details><summary><code>fm-352</code> · gap</summary>

Tagged pages: Bond Price, Face Value, Coupon Rate, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a zero-coupon bond equals its face amount discounted at the yield rate for n years: Price = F v^n = F(1+i)^(-n). | formula | elsewhere | Term of Bond: “The time factor in the present value formula: $v^n = (1+j)^{-n}$” |
| The price of a coupon bond with face value F, coupon rate r per period, and no redemption premium equals the present value of coupons plus … | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The present value of an n-period annuity-immediate at effective rate i is a_{n\|i} = (1 - v^n)/i. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The coupon amount of a bond is the coupon rate times the face amount, paid each coupon period; a bond's yield rate is the effective interes… | definition | tagged | Yield Rate: “The **yield rate** $j$ (also called the yield to maturity) is the internal rate of return of a bond…” |
| When two bonds share the same price, term and yield, use the first bond's relation (v^n = Price/Face) to get v^n for the second bond's pric… | procedure | missing |  |

</details>

<details><summary><code>fm-353</code> · answerable</summary>

Tagged pages: Duration, Modified Duration, Macaulay Duration

| Item | Kind | Status | Where |
|---|---|---|---|
| Modified duration equals the negative of the derivative of price with respect to the yield rate divided by the price: D_mod = -P'(i)/P. | formula | tagged | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| For an annual effective yield i, Macaulay duration equals modified duration multiplied by (1+i): D_mac = (1+i) D_mod. | formula | tagged | Modified Duration: “$$= \frac{D_{Mac}}{1+j}$$” |
| Macaulay duration is the present-value-weighted average time until a bond's cash flows are received, measured in years. | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |

</details>

<details><summary><code>fm-354</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Portfolio, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond purchased at par (price equal to face amount) has a yield rate equal to its coupon rate. | fact | linked | Coupon Rate: “When the coupon rate equals the yield rate ($r = j$ for $F = C$), the bond prices at par.” |
| The present value of a bond or zero-coupon payment is found by discounting each payment at the yield rate, e.g. a zero-coupon bond's price … | formula | linked | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| Macaulay duration is the present-value-weighted average of the payment times: sum of t times PV of the payment at t, divided by the total p… | definition | tagged | Macaulay Duration: “$$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$” |
| The Macaulay duration of a zero-coupon bond equals its time to maturity. | fact | elsewhere | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| The present value of an increasing annuity-immediate with payments 1, 2, ..., n is (Ia)_n = (ä_n − n v^n)/i. | formula | elsewhere | Arithmetic Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |
| Compute the Macaulay duration of a coupon bond as [Fr·(Ia)_n + n·C·v^n] divided by its price, where Fr is the coupon and C the redemption v… | procedure | missing |  |
| The Macaulay duration of a portfolio of bonds is the average of the individual bond durations weighted by their prices (present values) at … | fact | tagged | Portfolio: “**[[Duration]] of a portfolio**: the weighted average of individual asset durations, weighted by ma…” |

</details>

<details><summary><code>fm-355</code> · untagged</summary>

Tagged pages: Increasing Annuity, Perpetuity, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a single payment due in n years at annual effective rate i is the payment times (1+i)^(-n), i.e., divided by (1+i)^n. | formula | elsewhere | Time Value of Money Equations: “\text{PV} = \text{FV} \cdot v^n” |
| The present value of a set of cash flows is the sum of the present values of the individual payments, and two cash flow streams are equival… | procedure | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| The present value of an increasing perpetuity-immediate with first payment P at time 1 and payments increasing by Q each period is P/i + Q/… | formula | linked | Arithmetic Progression: “With $P, Q > 0$ and no end date, the [[Perpetuity\\|perpetuity]]-immediate is worth $P/i + Q/i^2$.” |
| A perpetuity-due (first payment at time 0) is valued by taking the perpetuity-immediate value for the same payments and multiplying by (1+i… | procedure | tagged | Perpetuity: “For a **perpetuity-due** (payments at the start of each period), each payment comes one period earl…” |

</details>

<details><summary><code>fm-356</code> · untagged</summary>

Tagged pages: Force of Interest, Nominal Discount Rate, Accumulation Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation factor from time t1 to t2 under a force of interest δ_t is exp(∫ from t1 to t2 of δ_t dt). | formula | elsewhere | Variable Force of Interest: “\frac{a(t)}{a(s)} = \exp\!\left(\int_s^t \delta(u)\,du\right)” |
| The integral of f'(t)/f(t) is ln f(t), so a force of interest of the form δ_t = f'(t)/f(t) gives an accumulation factor f(t2)/f(t1). | fact | tagged | Force of Interest: “The force of interest equals the instantaneous rate of change of $\ln a(t)$: $\delta(t) = a'(t)/a(t…” |
| A nominal annual rate of discount d^(m) convertible m times per year means an effective discount rate of d^(m)/m per 1/m-year period. | definition | tagged | Nominal Discount Rate: “each is charged discount at the effective rate $d^{(m)}/m$, paid at the **beginning** of that period” |
| With effective discount rate d per period, the accumulation factor over n periods is (1 − d)^(−n), so a present amount equals the accumulat… | formula | tagged | Nominal Discount Rate: “a(t) = \left(1 - \frac{d^{(m)}}{m}\right)^{-mt}” |
| To find an unknown investment amount, equate the accumulated values at the common date under the two interest bases and solve for the initi… | procedure | elsewhere | Equation of Value: “Every cash flow must be moved to the same comparison date before comparing, each at the [[Interest …” |

</details>

<details><summary><code>fm-357</code> · answerable</summary>

Tagged pages: Annuity Due, Effective Rate, Present Value, Equation of Value, Payment Period

| Item | Kind | Status | Where |
|---|---|---|---|
| Two interest rates are equivalent when they give the same accumulated value over a year, so an annual effective rate i converts to an effec… | fact | tagged | Payment Period: “$$j = (1+i)^{1/m} - 1$$” |
| An annuity-due makes level payments at the beginning of each period, and its present value is the annuity-due factor a-double-dot_n = (1 - … | definition | tagged | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |
| To value an annuity whose payment frequency differs from the interest rate's period, convert the rate to the payment period and count the p… | procedure | tagged | Payment Period: “Every annuity factor is computed per payment period, so $i$ must be the effective rate for that int…” |
| The present value of a series of payments is the sum of each payment times v^t, where v = 1/(1+i) and t is the payment time, so irregularly… | formula | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| To find an unknown payment amount, set the present values of the two payment streams equal (equation of value) at the same interest rate an… | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |

</details>

<details><summary><code>fm-358</code> · untagged</summary>

Tagged pages: Effective Rate, Compound Interest, Equation of Value

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the implied yield of a discount for early payment, treat paying the discounted amount at the early date as an investment that grows… | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| An annual effective rate i satisfies the accumulation relation: amount at time t equals amount at time 0 times (1+i)^t, where t is measured… | formula | tagged | Compound Interest: “$$A(t) = P(1+i)^t$$” |
| Time in days is converted to years by dividing by the number of days in the year (365 here), so a 20-day period is 20/365 of a year. | fact | elsewhere | Effective Discount Rate (collapsed): “i &= \left(\frac{10000}{9898.89}\right)^{365/91} - 1 \\” |
| A discount of d% on a price means the buyer pays (1 - d) times the price, so the discounted payment is the early-payment amount per unit of… | fact | elsewhere | Effective Discount Rate (collapsed): “The discount of $0.06 \times 5000 = 300$ is taken upfront, so the borrower receives $5000 - 300 = 4…” |

</details>

<details><summary><code>fm-359</code> · untagged</summary>

Tagged pages: Increasing Annuity, Perpetuity, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| When payments occur at intervals longer than the interest conversion period, convert the annual effective rate to an equivalent effective r… | procedure | elsewhere | Payment Period: “The same conversion works when payments are *less* frequent than compounding: annual payments at $6…” |
| Re-express a payment stream with payments every k years as payments at the end of consecutive periods of length k years, using the k-year r… | procedure | elsewhere | Payment Period: “Every annuity factor is computed per payment period, so $i$ must be the effective rate for that int…” |
| An arithmetic increasing perpetuity-immediate pays P, 2P, 3P, ... at the end of periods 1, 2, 3, ..., i.e., payments increase by a constant… | definition | tagged | Increasing Annuity: “$(Ia)_{\overline{n}\\|}$ values payments $1, 2, \ldots, n$ at the ends of periods $1$ to $n$, one pe…” |
| The present value of an increasing perpetuity-immediate paying P, 2P, 3P, ... at the ends of periods 1, 2, 3, ... at periodic rate j is P(1… | formula | tagged | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |

</details>

<details><summary><code>fm-360</code> · gap</summary>

Tagged pages: Geometric Increasing Perpetuity, Annuity Immediate, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalent effective rate for a shorter period is found by j = (1+i)^(1/m) - 1, where m is the number of periods per year. | formula | linked | Nominal Interest Rate: “$$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$” |
| The present value of an n-period annuity-immediate with level payments of 1 at effective rate j per period is a_angle_n = (1 - v^n)/j. | formula | tagged | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| A block of payments within a year can be replaced by a single equivalent value at the start of that year (its present value there), reducin… | procedure | missing |  |
| If each year's payments are 5% larger than the previous year's, their value at the start of each year is also 5% larger, so the annual bloc… | fact | missing |  |
| The present value of a geometrically increasing perpetuity-immediate with first payment P, growth rate g and interest rate i is P/(i-g), fo… | formula | tagged | Geometric Increasing Perpetuity: “For a first payment $P$, multiply by $P$. Paid at the start of each period (a perpetuity-due, first…” |

</details>

<details><summary><code>fm-361</code> · untagged</summary>

Tagged pages: Perpetuity, Accumulated Value, Nominal Interest Rate, Effective Discount Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| To solve a cash-flow equation of value, choose a comparison date and equate the accumulated value of contributions to the present value of … | procedure | elsewhere | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| The accumulated value at the time of the last payment of a level payment annuity-immediate of n payments is the payment times s_{n\|i} = ((… | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| A perpetuity-due paying 1 per period has present value 1/d, where d = i/(1+i), equivalently (1+i)/i. | formula | tagged | Perpetuity: “$$\ddot{a}_{\overline{\infty}\\|} = \frac{1}{d}$$” |
| The first payment of a perpetuity-immediate is one period after its valuation date, so a perpetuity whose first payment occurs at the valua… | fact | tagged | Perpetuity: “For a **perpetuity-immediate** (payments at end of each period)” |
| A nominal annual rate compounded m times per year, i^(m), gives a periodic effective rate of i^(m)/m. | definition | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| The annual effective rate equivalent to a periodic rate j compounded m times per year is (1+j)^m - 1. | formula | tagged | Nominal Interest Rate: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| The effective annual discount rate is d = i/(1+i), where i is the annual effective interest rate. | definition | tagged | Effective Discount Rate: “$$d = \frac{i}{1+i}$$” |

</details>

<details><summary><code>fm-362</code> · answerable</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Increasing Annuity, Yield Rate, Rate of Return

| Item | Kind | Status | Where |
|---|---|---|---|
| For an annuity-due investment whose balance earns interest at one rate with the interest paid out and reinvested at a different rate, find … | procedure | tagged | Fund Accumulation (collapsed): “Since the \$$500$ principal stays in Fund A, it earns level interest of $500(0.05) = \$25$ per year…” |
| Accumulate a stream of interest payments at the reinvestment rate to the end of the term, and add the total principal deposited to get the … | procedure | tagged | Fund Accumulation (collapsed): “$$AV_B = 25 \times 4.50611 \approx \$112.65$$” |
| The accumulated value at the end of n periods of a level annuity-immediate of 1 per period at rate j is s_{n\|j} = ((1+j)^n − 1)/j. | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| An increasing annuity-immediate with payments 0, P, 2P, …, (n−1)P at times 1,…,n accumulates at time n to P(s_{n\|j} − n)/j. | formula | linked | Arithmetic Progression: “The accumulated value at time $n$ is $P\,s_{\overline{n}\\|} + Q\,(s_{\overline{n}\\|} - n)/i$.” |
| The yield rate (effective annual rate) on an investment is the rate i such that the initial investment accumulated at compound interest for… | definition | tagged | Rate of Return: “The **rate of return** on an investment is the interest rate at which the money put in and the mone…” |

</details>

<details><summary><code>fm-363</code> · answerable</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Increasing Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| An annuity-due involves level payments at the beginning of each period; deposits at times 0 through n-1 earn interest in each year, with th… | definition | linked | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |
| When interest paid by a fund is reinvested at a different rate than the fund's own rate, compute the interest credited each period on the f… | procedure | tagged | Fund Accumulation (collapsed): “Since the \$$500$ principal stays in Fund A, it earns level interest of $500(0.05) = \$25$ per year…” |
| The accumulated value at the end of n periods of an annuity-immediate with level payments of 1 is s_{n\|i} = ((1+i)^n - 1)/i. | formula | linked | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| The accumulated value at time n of an increasing annuity-immediate with payments P, 2P, ..., nP at times 1..n is P(s_{n\|i} - n)/i, so paym… | formula | linked | Arithmetic Progression: “The accumulated value at time $n$ is $P\,s_{\overline{n}\\|} + Q\,(s_{\overline{n}\\|} - n)/i$.” |
| Decompose an arithmetic-increasing payment stream into a level stream plus an increasing stream starting at zero, and accumulate each part … | procedure | linked | Arithmetic Progression: “The first term values a level payment of $P$ every period; the second values what is added on top o…” |
| Total accumulated value equals the total principal deposited plus the accumulated value of the reinvested interest. | fact | tagged | Increasing Annuity (collapsed): “The deposits total \$5,500; the other \$913.57 is interest.” |

</details>

<details><summary><code>fm-364</code> · untagged</summary>

Tagged pages: Amortization Schedule, Loan Amortization, Annuity Immediate

| Item | Kind | Status | Where |
|---|---|---|---|
| The initial loan amount of an amortization equals the present value of the loan payments discounted at the loan interest rate; for level pa… | fact | tagged | Loan Amortization: “the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rat…” |
| Over the life of a fully repaid loan, the total principal repaid equals the original loan amount. | fact | tagged | Loan Amortization: “Over the whole loan the principal portions add up to $L$, so the total interest is the total of the…” |
| Each payment on an amortized loan splits into interest and principal, so total interest paid equals total payments made minus total princip… | fact | tagged | Loan Amortization: “Over the whole loan the principal portions add up to $L$, so the total interest is the total of the…” |
| For a level payment of 1 on a loan of a_{n\|i}, the interest in the first payment is i*a_{n\|i} = 1 - v^n, and the principal repaid in paym… | formula | elsewhere | Payment Amount: “$$I_k = i \cdot OB_{k-1} = P\left(1 - v^{\,n-k+1}\right)$$” |
| The annuity-immediate present value a_{n\|i} = (1 - v^n)/i, where v = 1/(1+i), is the present value of payments of 1 at the end of each of … | definition | tagged | Annuity Immediate: “An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period.…” |

</details>

<details><summary><code>fm-365</code> · gap</summary>

Tagged pages: Force of Interest, Variable Force of Interest, Effective Discount Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation factor from time a to time b under a force of interest δ_t is exp(∫_a^b δ_t dt). | formula | elsewhere | Accumulated Value: “under a [[Variable Force of Interest\\|force of interest]] $\delta_r$ it equals $\exp\left(\int_s^t …” |
| When the interest rate changes over time, accumulate over each period separately (using an effective rate for one segment and the force of … | procedure | missing |  |
| Under an annual effective rate i, an amount accumulates over n years by the factor (1+i)^n. | formula | elsewhere | Compound Interest: “An investment of $P$ at effective annual rate $i$ grows to:” |
| The integral of 1/(1+t) dt is ln(1+t), so exp(∫_a^b 1/(1+t) dt) = (1+b)/(1+a). | fact | missing |  |
| An annual effective discount rate d is equivalent to an accumulation factor over n years of (1-d)^(-n), i.e. the present value of an amount… | formula | tagged | Effective Discount Rate: “Under compound discount, $1$ today accumulates to $\frac{1}{1-d}$ after one period and to $(1-d)^{-…” |
| To find the equivalent annual effective rate over a period, equate the total accumulation factor over the period to the constant-rate accum… | procedure | linked | Interest Rate (collapsed): “$$6802.44 = 5000(1+i)^5 \implies (1+i)^5 = 1.36049 \implies i = 1.36049^{1/5} - 1 = 0.0635 = 6.35\%…” |

</details>

<details><summary><code>fm-366</code> · gap</summary>

Tagged pages: Perpetuity, Annuity Due, Accumulated Value, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulated value of an annuity-due with n payments at rate i is the sum of payments made at the beginning of each period, each accumul… | definition | tagged | Annuity Due: “$$\ddot{s}_{\overline{n}\\|} = (1+i)\,s_{\overline{n}\\|}$$” |
| A level-varying payment stream can be decomposed into a base level annuity plus additional level annuities starting later, each valued sepa… | procedure | missing |  |
| An annuity-due accumulated value for a later-starting block of payments that ends at the same time as the full stream is computed as s-doub… | procedure | tagged | Annuity Due: “The accumulated value at the end of the last period (one period after the final payment) is $\ddot{…” |
| To find the value at a later date, accumulate a value at an earlier date by multiplying by (1+i) raised to the number of additional years. | procedure | elsewhere | Time Value of Money: “$$C(1+i)^{t-s}$$” |
| The present value of a perpetuity-immediate paying a level amount each period is the payment divided by the effective interest rate per per… | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The equivalent effective rate per 1/m of a year, given an annual effective rate i, is (1+i)^(1/m) - 1. | formula | linked | Nominal Interest Rate: “$$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$” |
| A fund's accumulated value can be used as the price (present value) of a perpetuity at the time of purchase, so equating the fund value to … | fact | tagged | Perpetuity (collapsed): “$$PV = \frac{50{,}000}{i} = \frac{50{,}000}{0.04} = \$1{,}250{,}000$$” |

</details>

<details><summary><code>fm-367</code> · answerable</summary>

Tagged pages: Annuity Due, Accumulated Value, Effective Rate, Payment Amount

| Item | Kind | Status | Where |
|---|---|---|---|
| To convert an annual effective interest rate to an equivalent monthly effective rate, solve (1+j)^12 = 1+i for j. | procedure | linked | Payment Period: “$$j = (1+i)^{1/m} - 1$$” |
| The accumulated value at the end of n periods of an annuity-due of level payments P at periodic rate j is P times s-double-dot_{n\|j} = P[(… | formula | tagged | Annuity Due: “$$= \frac{(1+i)^n - 1}{d}$$” |
| The present value of an n-year annuity-due of 1 per year at effective rate i is a-double-dot_{n\|i} = (1 - v^n)/d, where d = i/(1+i). | formula | tagged | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| To find the level payment an accumulated fund can purchase, set the fund balance equal to the present value of the annuity (payment times t… | procedure | tagged | Payment Amount: “$$P = \frac{PV}{\ddot{a}_{\overline{n}\\|i}}$$” |
| Payments made at the beginning of each period form an annuity-due, and a monthly payment stream over n years has 12n payments accumulated a… | fact | linked | Payment Period: “$$L = P \cdot a_{\overline{mT}\\|\,j}$$” |

</details>

<details><summary><code>fm-368</code> · untagged</summary>

Tagged pages: Loan Amortization, Outstanding Balance, Nominal Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A quarterly-convertible nominal annual rate j^(4) corresponds to an effective quarterly rate of j^(4)/4. | fact | tagged | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| The level payment on a loan of amount L repaid over n periods at periodic rate i is P = L / a_{n\|i}, where a_{n\|i} = (1 - v^n)/i is the p… | formula | elsewhere | Payment Amount: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The outstanding loan balance immediately after a payment is the present value of the remaining payments, discounted at the loan's periodic … | definition | tagged | Outstanding Balance: “**Prospective method** (present value of future payments):” |
| Each level payment consists of interest plus principal repayment, so the total interest in a set of future payments equals the sum of those… | fact | tagged | Loan Amortization: “the principal repaid in payments $j+1$ through $k$ is $B_j - B_k$, and the interest paid in them is…” |
| To find the interest forgone when a loan is forgiven after some payment, compute the total of the remaining scheduled payments and subtract… | procedure | tagged | Loan Amortization: “the principal repaid in payments $j+1$ through $k$ is $B_j - B_k$, and the interest paid in them is…” |

</details>

<details><summary><code>fm-369</code> · answerable</summary>

Tagged pages: Refinancing, Outstanding Balance, Loan Amortization, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Convert an annual effective interest rate to an equivalent monthly effective rate by solving (1+i) = (1+j)^12 for j. | procedure | linked | Nominal Interest Rate: “$$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$” |
| The level payment on a loan of amount L repaid over n periods at periodic rate j is P = L / a_{n\|j}, where a_{n\|j} = (1 - v^n)/j. | formula | linked | Payment Amount: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The outstanding loan balance immediately after a payment equals the present value, at the loan rate, of the remaining future payments (pros… | fact | tagged | Outstanding Balance: “**Prospective method** (present value of future payments):” |
| The number of remaining payments after the k-th payment on an n-payment loan is n minus k, and payment timing in months requires converting… | procedure | tagged | Outstanding Balance: “$$OB_k = P \cdot a_{\overline{n-k}\\|i}$$” |
| In refinancing, the new loan amount equals the outstanding balance of the old loan at the time of refinancing. | fact | tagged | Refinancing: “The new loan's principal is the old loan's [[Outstanding Balance\\|outstanding balance]] at the refi…” |
| The interest portion of a loan payment equals the periodic interest rate times the outstanding balance at the start of that period, so the … | fact | tagged | Refinancing: “After refinancing, the new loan is amortized from scratch: interest in its first payment is $i' L'$…” |

</details>

<details><summary><code>fm-370</code> · answerable</summary>

Tagged pages: Nominal Interest Rate, Loan Amortization, Effective Rate, Payment Period

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible m times per year, j, corresponds to an effective rate of j/m per conversion period. | definition | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| The present value of an ordinary level annuity-immediate of n payments is the payment times a_{n\|i} = (1 - v^n)/i, and the loan amount equ… | formula | tagged | Loan Amortization: “the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rat…” |
| To find the periodic interest rate from a known loan amount and level payment, set the payment times the annuity factor equal to the loan a… | procedure | tagged | Payment Period: “$$L = P \cdot a_{\overline{mT}\\|\,j}$$” |
| Match the number of payments to the payment frequency: payments made quarterly for T years give 4T payments, and the effective rate per pay… | procedure | tagged | Payment Period: “Every annuity factor is computed per payment period, so $i$ must be the effective rate for that int…” |
| Effective rates over different compounding periods are equivalent when they give the same accumulation over the same time span, so (1 + j/1… | fact | tagged | Payment Period: “$$j = \left(1 + \frac{i^{(k)}}{k}\right)^{k/m} - 1$$” |

</details>

<details><summary><code>fm-371</code> · gap</summary>

Tagged pages: Yield Curve, Spot Rate, Spot Rates and Forward Rates

| Item | Kind | Status | Where |
|---|---|---|---|
| A zero-coupon bond pays a single amount (its face amount) at maturity and no other payments, so its price is the present value of that sing… | definition | tagged | Spot Rate: “The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exa…” |
| The price of a zero-coupon bond with face amount F and term t is F(1+s_t)^(-t), where s_t is the spot rate (yield rate) for term t. | formula | missing |  |
| The yield curve (spot rate curve) is the relationship between spot rates and their terms to maturity. | definition | tagged | Yield Curve: “The **yield curve** is a graph plotting the [[Spot Rate]] $s_t$ — the yield rate on a zero-coupon b…” |
| A flat yield curve means the spot rate is the same for every term; if all zero-coupon prices imply the same annual rate, the yield curve is… | fact | tagged | Yield Curve: “A **flat** yield curve has the same rate at all maturities” |
| To determine the yield curve shape from zero-coupon bond prices, solve for the implied spot rate at each term as s_t = (F/P)^(1/t) - 1 and … | procedure | missing |  |

</details>

<details><summary><code>fm-372</code> · untagged</summary>

Tagged pages: Duration, Macaulay Duration, Bond Price, Increasing Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average of the times of a bond's cash flows, i.e. the sum of t times PV of cash flow at t, … | definition | tagged | Macaulay Duration: “$$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$” |
| The present value of an n-year annuity-immediate paying 1 at the end of each year is a_angle_n = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The present value of an increasing annuity-immediate paying t at time t for t = 1..n is (Ia)_angle_n = (ä_angle_n - n v^n)/i. | formula | tagged | Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |
| To compute a coupon bond's Macaulay duration, the coupons (coupon rate times face) contribute coupon times (Ia)_n to the numerator, the red… | procedure | tagged | Macaulay Duration: “D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_t …” |
| A bond's annual coupon equals the coupon rate times the face amount, paid at the end of each year, with the face amount repaid at maturity. | definition | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |

</details>

<details><summary><code>fm-373</code> · untagged</summary>

Tagged pages: Loan Amortization, Outstanding Balance, Drop Payment, Nominal Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The monthly effective interest rate for a nominal annual rate convertible monthly is the nominal rate divided by 12. | formula | tagged | Nominal Interest Rate: “The monthly periodic rate is $6\%/12 = 0.5\%$” |
| The outstanding loan balance at any time equals the present value of the remaining scheduled payments, discounted at the loan's interest ra… | fact | tagged | Outstanding Balance: “$$OB_k = P \cdot a_{\overline{n-k}\\|i}$$” |
| The present value of an n-period level annuity-immediate with payment 1 per period is a_{n\|i} = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To find the number of level payments needed to repay a balance, set payment times a_{n\|i} equal to the balance and solve for n using v^n =… | procedure | linked | Term of Loan: “$5000 = 900\,a_{\overline{n}\\|8\%}$, so $a_{\overline{n}\\|} = 5.555556$” |
| When the solved n is not an integer, the loan is repaid by the integer part of n full payments plus a smaller final drop payment one period… | procedure | tagged | Drop Payment: “A **drop payment** is a final loan payment that is **smaller** than the regular payment, made one p…” |

</details>

<details><summary><code>fm-374</code> · untagged</summary>

Tagged pages: Loan Amortization, Term of Loan, Nominal Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate compounded m times per year corresponds to an effective rate per period of the nominal rate divided by m. | definition | tagged | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| The present value of an n-period annuity-immediate of 1 per period is a_angle_n = (1 - v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| For a level-payment loan, the payment is found by setting the loan amount equal to the payment times the annuity-immediate factor at the lo… | procedure | linked | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |
| To find the number of payments for a loan with known payment, rate and amount, solve the equation of value for v^n and take logarithms to g… | procedure | tagged | Term of Loan: “$5000 = 900\,a_{\overline{n}\\|8\%}$, so $a_{\overline{n}\\|} = 5.555556$:” |
| When the computed number of payments is not an integer, the loan is repaid by the full level payments plus a smaller final payment made one… | fact | tagged | Term of Loan: “If it is paid one period after the last regular payment, it is a separate payment smaller than the …” |

</details>

<details><summary><code>fm-375</code> · answerable</summary>

Tagged pages: Duration, Modified Duration, Macaulay Duration

| Item | Kind | Status | Where |
|---|---|---|---|
| Modified duration equals Macaulay duration divided by (1+i), where i is the annual effective yield rate. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |
| When the effective yield rate is positive, a bond's modified duration is less than its Macaulay duration, since it is the Macaulay duration… | fact | tagged | Modified Duration: “Modified duration is less than [[Macaulay Duration]] whenever $j > 0$ (since then $1+j > 1$)” |
| Given two bonds with the same yield rate, match a known modified duration to its bond by comparing it to the Macaulay durations, then solve… | procedure | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-376</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Modified Duration, Increasing Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration of a cash flow stream is the present-value-weighted average of the payment times, i.e. sum of t·v^t·CF_t divided by the p… | definition | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| Modified duration equals the Macaulay duration divided by (1+i), and measures the negative relative sensitivity of price to the yield. | definition | tagged | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The Macaulay duration of a zero-coupon bond equals its time to maturity, since there is a single payment at maturity. | fact | elsewhere | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| The Macaulay duration of an n-year level annuity-immediate is (Ia)_{n\|} / a_{n\|}, since the payments at times 1..n have present values pr… | formula | missing |  |

</details>

<details><summary><code>fm-377</code> · untagged</summary>

Tagged pages: Loan Repayment Comparison, Loan Amortization, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| Two loans of the same amount have equal present values of their payment streams at their respective interest rates, so the loan amount equa… | fact | tagged | Loan Amortization: “whose present value at the loan rate equals the amount lent” |
| The present value of a level n-period annuity-immediate with payment P at periodic rate i is P times a_{n\|i} = P(1 - v^n)/i, where v = 1/(… | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To find the number of payments n of a level annuity given its present value factor a_{n\|i}, solve a_{n\|i} = (1 - v^n)/i for v^n and then … | procedure | elsewhere | Term of Annuity: “$$= \frac{-\ln(1 - i \cdot \text{PV}/P)}{\ln(1+i)}$$” |

</details>

<details><summary><code>fm-378</code> · gap</summary>

Tagged pages: Bond Price, Callable Bond, Coupon Rate, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons (coupon rate times face amount, as an annuity-immediate) plus the present value… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A bond with a coupon rate (Fr/F) greater than the yield rate sells at a premium, with price above redemption value. | definition | tagged | Bond Price: “When $Fr > Cj$ the bond sells at a **premium** ($P > C$)” |
| Solve for the unknown annual coupon by setting the observed price equal to the bond's present value at the given yield and isolating the co… | procedure | missing |  |
| For a callable bond bought at a premium, the earliest call date is worst for the investor (lowest yield for a given price), so the guarante… | fact | tagged | Callable Bond: “If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified c…” |
| The maximum price guaranteeing at least a given yield for a callable bond is the price at that yield assuming redemption at the worst-case … | procedure | tagged | Callable Bond: “To guarantee a yield of at least $j$ per period, the most the investor will pay is the **smallest**…” |

</details>

<details><summary><code>fm-379</code> · gap</summary>

Tagged pages: Equation of Value, Effective Discount Rate, Net Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Under an annual effective discount rate d, the present value of an amount due t years later is obtained by multiplying by the discount fact… | formula | tagged | Effective Discount Rate: “Under compound discount, $1$ today accumulates to $\frac{1}{1-d}$ after one period and to $(1-d)^{-…” |
| Set up an equation of value by equating the present values of all deposits and withdrawals (net present value of cash flows is zero) at a c… | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| Place periodic withdrawals at their correct times (here every two years at t = 2k for k = 1 to n, where n is the number of withdrawals with… | procedure | linked | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| A balance remaining immediately after a withdrawal at the end of the horizon is equivalent to an additional final cash outflow of that amou… | fact | missing |  |

</details>

<details><summary><code>fm-380</code> · untagged</summary>

Tagged pages: Loan Amortization, Drop Payment, Term of Loan

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a level annuity-immediate of 1 per period for n periods at effective rate i is a_{n\|i} = (1 - v^n)/i, where v = 1/(1+… | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| A loan's amount at origination equals the present value of its repayment payments, discounted at the loan's effective interest rate (equati… | fact | tagged | Loan Amortization: “the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rat…” |
| To find the number of level payments a loan supports, solve payment × a_{n\|i} = loan amount for n (using logarithms), which is generally n… | procedure | tagged | Term of Loan (collapsed): “$5000 = 900\,a_{\overline{n}\\|8\%}$, so $a_{\overline{n}\\|} = 5.555556$:” |
| A drop payment is a final smaller payment made one period after the last full level payment when the loan cannot be repaid by an integer nu… | definition | tagged | Drop Payment: “A **drop payment** is a final loan payment that is **smaller** than the regular payment, made one p…” |
| To find a drop payment, set the loan amount equal to the PV of the full level payments plus the PV of the drop payment discounted from its … | procedure | tagged | Drop Payment: “$$\text{Drop Payment} = B_n(1+i)$$” |

</details>

<details><summary><code>fm-381</code> · answerable</summary>

Tagged pages: Bond Price, Callable Bond, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a coupon bond equals the present value of its coupons (coupon rate times face amount, paid as an annuity-immediate) plus the p… | formula | tagged | Bond Price: “P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n” |
| The annual coupon equals the coupon rate times the face amount, and the redemption amount is the amount paid at maturity or call (here equa… | definition | tagged | Bond Price: “Here $F$ is the face value, $r$ is the coupon rate per period (so $Fr$ is the periodic coupon amoun…” |
| A bond is bought at a premium when its price exceeds its redemption amount, which happens when the coupon rate exceeds the yield rate. | fact | tagged | Yield Rate: “A **premium bond** ($P > C$) has $Fr > Cj$ — when $C = F$, as it is unless stated otherwise, the co…” |
| For a callable bond bought at a premium, the investor's yield is lowest under the earliest call date; for a bond bought at a discount the l… | fact | tagged | Callable Bond: “If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified c…” |
| To find the yield rate of a bond, set the price equal to the present value of coupons and redemption at the assumed redemption date and sol… | procedure | tagged | Yield Rate: “the yield rate is the $j$ that solves this equation.” |

</details>

<details><summary><code>fm-382</code> · untagged</summary>

Tagged pages: Immunization, Full Immunization, Duration, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Full immunization of a single liability requires that the present value of assets equals the present value of the liability, the duration o… | fact | tagged | Full Immunization: “1. $PV(\text{assets}) = PV(\text{liability})$ at the current rate $i$ 2. The [[Duration]] of the as…” |
| Compute the present value of a set of cash flows by discounting each cash flow at the effective interest rate, PV = sum of C_t * v^t with v… | procedure | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| Macaulay duration of a set of cash flows is the present-value-weighted average of the payment times: D = sum(t * C_t * v^t) / sum(C_t * v^t… | formula | linked | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| The Macaulay duration of a single cash flow equals its time of payment. | fact | elsewhere | 1st-Order Macaulay Approximation: “by treating the whole stream as if it were a single payment due at time $D_{Mac}$.” |

</details>

<details><summary><code>fm-383</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Modified Duration, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average of the times of the cash flows, i.e. the sum of t times the present value of the ca… | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| Given a Macaulay duration and the cash flow amounts and times, set up the duration formula as an equation in v = 1/(1+i) and solve it to re… | procedure | missing |  |
| A cash flow occurring at time 0 has a time weight of 0 and a present value equal to its face amount, so it contributes to the denominator b… | fact | missing |  |
| Modified duration equals Macaulay duration divided by (1+i), where i is the effective annual yield rate. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-384</code> · gap</summary>

Tagged pages: Bond Amortization, Amortization of Premium, Book Value, Redemption Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The periodic coupon equals the face amount times the coupon rate per period, and the yield rate per period equals the nominal annual rate c… | formula | linked | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The price (book value) of a bond with n coupons remaining is the present value of the coupons plus the present value of the redemption valu… | formula | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |
| The amount for amortization of premium in a coupon payment is the decrease in the bond's book value over that period (the coupon minus the … | definition | tagged | Bond Amortization: “$$PR_t = Fr - I_t = (Fr - Cj)\,v^{\,n-t+1}$$” |
| To find the premium amortization in the k-th coupon, compute the book value just after coupon k-1 minus the book value just after coupon k,… | procedure | tagged | Bond Amortization: “One row can be found without the rest of the table: value $B_{t-1}$ at the original yield from the …” |
| The difference of consecutive annuity-immediate values satisfies a_{n\|} − a_{n-1\|} = v^n, and v^n − v^{n-1} = −i·v^n. | fact | missing |  |

</details>

<details><summary><code>fm-385</code> · untagged</summary>

Tagged pages: Bond Price, Coupon, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Convert a nominal annual rate convertible m times per year to the effective rate per period by dividing by m, and set the number of periods… | procedure | elsewhere | Nominal Interest Rate (collapsed): “The monthly periodic rate is $6\%/12 = 0.5\%$, so:” |
| The price of a bond at a given yield equals the present value of its coupons plus the present value of its redemption value, discounted at … | fact | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| The present value of a level coupon stream of n payments at rate i per period is the coupon times the annuity-immediate factor a_{n\|i} = (… | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| At the same yield rate, changing the coupon amount changes the bond price only through the present value of the coupon annuity, while the p… | fact | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |

</details>

<details><summary><code>fm-386</code> · gap</summary>

Tagged pages: Geometric Increasing Annuity, Deferred Annuity, Nominal Interest Rate, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate compounded m times per year converts to an effective rate per period by dividing the nominal rate by m (i = … | formula | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| An annuity with geometrically increasing payments has each payment equal to the previous payment multiplied by (1+g), so the k-th payment a… | definition | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |
| Count the number of payments from the timing of the first and last payments (last time minus first time, divided by the payment interval, p… | procedure | missing |  |
| Present value of a deferred payment stream is found by discounting each payment at v^t to its payment time, and a stream beginning at time … | procedure | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| The present value of a geometric annuity reduces to a geometric series with ratio (1+g)/(1+i), summed as the first term times (r^n − 1)/(r … | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |

</details>

<details><summary><code>fm-387</code> · untagged</summary>

Tagged pages: Duration, Modified Duration, Macaulay Duration, Geometric Increasing Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of an infinite geometric series with first term a and common ratio r (\|r\|<1) is a/(1-r). | formula | tagged | Geometric Increasing Perpetuity: “when $g < i$ the ratio $\left(\tfrac{1+g}{1+i}\right)^n$ goes to zero” |
| The price of a geometrically changing perpetuity-due is the present value of its payments, with each payment discounted by (1+i)^-t, giving… | procedure | elsewhere | Geometric Progression: “$$\text{PV} = \frac{1}{1+i} \cdot \frac{1-\left(\frac{1+g}{1+i}\right)^n}{1 - \frac{1+g}{1+i}}$$” |
| Modified duration of a cash flow stream is the negative of the derivative of price with respect to the interest rate divided by the price, … | definition | tagged | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| Macaulay duration equals modified duration multiplied by (1+i), so modified duration equals Macaulay duration divided by (1+i), for an annu… | fact | tagged | Modified Duration: “$$= \frac{D_{Mac}}{1+j}$$” |

</details>

<details><summary><code>fm-388</code> · answerable</summary>

Tagged pages: Loan Amortization, Equation of Value, Deferred Annuity, Nominal Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate compounded m times per year corresponds to an effective rate per period of i^(m)/m. | formula | tagged | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| An annuity-immediate pays at the end of each period, and its present value is a_{n\|i} = (1 - v^n)/i, valued one period before the first pa… | definition | linked | Annuity Immediate: “The present value, valued one period before the first payment, is $a_{\overline{n}\\|}$” |
| To value a deferred annuity, compute the annuity's present value at the point one period before its first payment, then discount it back to… | procedure | tagged | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| The deferral period of each later payment block equals the total number of periods in all earlier blocks (e.g., sum of preceding block leng… | fact | tagged | Deferred Annuity: “A **deferred annuity** ${}_{k\\|}a_{\overline{n}\\|}$ is an [[Annuity Immediate\\|annuity-immediate]] …” |
| The loan amount equals the present value of all loan payments at the loan interest rate (equation of value), so a payment stream with diffe… | fact | linked | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |

</details>

<details><summary><code>fm-389</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Modified Duration

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average of the payment times of a set of cash flows. | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| Modified duration is the negative of the derivative of present value with respect to the interest rate divided by present value, -P'(i)/P(i… | definition | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |
| Macaulay duration equals (1+i) times modified duration, for an effective annual rate i. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |
| Deferring all payments of a cash flow set by k years increases its Macaulay duration by exactly k years, since every payment time shifts by… | fact | missing |  |
| A payment at time 0 contributes its amount to present value but contributes nothing to the derivative of present value with respect to the … | fact | missing |  |
| To find the duration of a combined or altered set of cash flows, add the present values and the present value derivatives of the components… | procedure | missing |  |

</details>

<details><summary><code>fm-390</code> · untagged</summary>

Tagged pages: Convexity, Perpetuity, Geometric Increasing Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Convexity (in terms of the effective interest rate i) of a cash flow stream is the second derivative of its present value with respect to i… | definition | tagged | Convexity: “$$C_{Mod} = \frac{1}{P} \cdot \frac{d^2P}{dj^2}$$” |
| The present value of a zero-coupon bond paying a redemption value C at time n is C(1+i)^(-n). | formula | elsewhere | Present Value: “$$PV = FV \cdot (1+i)^{-n}$$” |
| The present value of a level perpetuity-immediate with payment C is C/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The present value of a geometrically increasing perpetuity-immediate with first payment C and growth rate g is C/(i-g), for i > g. | formula | tagged | Geometric Increasing Perpetuity: “For a first payment $P$, multiply by $P$.” |
| To compute convexity of an investment, write the present value as a function of i, differentiate it twice with respect to i, and divide the… | procedure | tagged | Convexity: “$$C_{Mod} = \frac{1}{P} \cdot \frac{d^2P}{dj^2}$$” |

</details>

<details><summary><code>fm-391</code> · gap</summary>

Tagged pages: Net Present Value, Cash Flow, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The discount factor v equals 1/(1+i) for an annual effective interest rate i, and a payment at time t has present value equal to the paymen… | definition | linked | Present Value: “future cash flows are multiplied by the discount factor $v = (1+i)^{-1}$ raised to the number of pe…” |
| To find the present value of a series of cash flows, discount each cash flow to time 0 and sum them, counting receipts as positive and paym… | procedure | tagged | Net Present Value: “The **net present value** (NPV) is the sum of the present values of all cash flows associated with …” |
| When cash flows occur at even times, the equation of value can be written as a quadratic in v^2 (a substitution such as w = v^2), after div… | procedure | missing |  |
| The quadratic formula gives the roots of ax^2 + bx + c = 0 as x = (-b ± sqrt(b^2 - 4ac)) / (2a). | formula | missing |  |
| Since v = 1/(1+i), the interest rate is recovered by inverting the solved value of v^2 to get (1+i)^2, taking the square root to get 1+i, a… | fact | missing |  |

</details>

<details><summary><code>fm-392</code> · gap</summary>

Tagged pages: Fund Accumulation, Accumulated Value, Increasing Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| For an investment where each beginning-of-year payment earns simple interest at rate i paid at year end and the interest is reinvested at a… | procedure | missing |  |
| The total fund at the end of the term equals the sum of the payments plus the accumulated value of the reinvested interest payments, where … | procedure | tagged | Fund Accumulation: “A common Exam FM scenario: amounts withdrawn from one fund are immediately deposited into and accum…” |
| The accumulated value at time n of an increasing annuity-immediate with payments 1, 2, ..., n is (Is)_{n\|j} = (s̈_{n\|j} − n)/j. | formula | tagged | Increasing Annuity: “(Is)_{\overline{n}\\|} = \frac{\ddot{s}_{\overline{n}\\|} - n}{i}” |
| The accumulated value of an annuity-due is s̈_{n\|j} = ((1+j)^n − 1)/d, where d = j/(1+j). | formula | linked | Annuity Due: “= \frac{(1+i)^n - 1}{d}…Here $d = i/(1+i)$ is the effective annual [[Discount Rate]].” |

</details>

<details><summary><code>fm-393</code> · untagged</summary>

Tagged pages: Perpetuity, Annuity Due, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| An annuity-due makes payments at the beginning of each period (times 0, 1, ..., n-1), and its present value is denoted ä. | definition | tagged | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |
| The present value of an n-year annuity-due is ä_n = (1 - v^n)/d, where d = i/(1+i) and v = 1/(1+i). | formula | tagged | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| The present value of a perpetuity-due of 1 per period at effective rate i is ä_∞ = 1/d = (1+i)/i. | formula | tagged | Perpetuity: “$$\ddot{a}_{\overline{\infty}\\|} = \frac{1}{d}$$” |
| When the interest rate changes over time, split the cash flows into segments, value each segment at its own rate as of the segment's start,… | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| A perpetuity-due whose payments begin at time n has its value at time n equal to the payment times ä_∞ (payment at time n included), so its… | fact | linked | Deferred Annuity: “$${}_{k\\|}\ddot{a}_{\overline{n}\\|} = v^k \cdot \ddot{a}_{\overline{n}\\|}$$” |

</details>

<details><summary><code>fm-394</code> · gap</summary>

Tagged pages: Force of Interest, Variable Force of Interest, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation factor from time a to time b under a force of interest δ_t equals exp(∫_a^b δ_t dt). | formula | tagged | Variable Force of Interest: “$$\frac{a(t)}{a(s)} = \exp\!\left(\int_s^t \delta(u)\,du\right)$$” |
| The effective rate of interest during the n-th year is i_n = (A(n) − A(n−1)) / A(n−1), so 1 + i_n equals the accumulation factor from time … | definition | tagged | Variable Force of Interest: “\frac{a(t)}{a(s)} = \exp\!\left(\int_s^t \delta(u)\,du\right)” |
| The n-th year of an investment corresponds to the time interval from t = n−1 to t = n. | fact | missing |  |

</details>

<details><summary><code>fm-395</code> · answerable</summary>

Tagged pages: Increasing Annuity, Perpetuity, Annuity Due

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an increasing perpetuity-immediate with payments 1, 2, 3, ... at effective rate i per period is (Ia)_∞ = 1/i + 1/i^2 (… | formula | tagged | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| A perpetuity-due makes payments at the start of each period, whereas a perpetuity-immediate makes payments at the end of each period. | definition | tagged | Perpetuity: “For a **perpetuity-immediate** (payments at end of each period)” |
| An annuity-due or perpetuity-due has present value equal to (1+i) times the present value of the corresponding immediate annuity or perpetu… | fact | tagged | Perpetuity: “For a **perpetuity-due** (payments at the start of each period), each payment comes one period earl…” |

</details>

<details><summary><code>fm-396</code> · untagged</summary>

Tagged pages: Perpetuity, Annuity Due, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-due paying 1 per period at effective rate j per period is 1 + 1/j (equivalently d-based form 1/d, where d… | formula | tagged | Perpetuity: “The relationship $\ddot{a}_{\overline{\infty}\\|} = 1 + a_{\overline{\infty}\\|}$ holds because the p…” |
| A perpetuity-due is a series of level payments made at the start of each period forever, with the first payment made immediately at time 0. | definition | tagged | Perpetuity: “For a **perpetuity-due** (payments at the start of each period)” |
| When payments occur at a frequency different from annual, treat the payment period as the interest period and solve for the effective rate … | procedure | elsewhere | Payment Period: “Every annuity factor is computed per payment period, so $i$ must be the effective rate for that int…” |
| An annual effective rate i is obtained from an effective rate j per 1/m-year period by i = (1 + j)^m - 1. | formula | linked | Nominal Interest Rate: “$$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$” |

</details>

<details><summary><code>fm-397</code> · gap</summary>

Tagged pages: Increasing Annuity, Annuity Due, Nominal Interest Rate, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The increasing annuity-immediate (Ia) at rate i pays 1, 2, ..., n at the ends of periods 1 through n, and its present value is (Ia)_{n\|i} … | definition | tagged | Increasing Annuity: “$(Ia)_{\overline{n}\\|}$ values payments $1, 2, \ldots, n$ at the ends of periods $1$ to $n$, one pe…” |
| A nominal annual rate i^(m) convertible m times per year corresponds to an effective rate per period of i^(m)/m. | formula | tagged | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| The effective annual rate equivalent to a nominal rate i^(m) convertible m times per year is i = (1 + i^(m)/m)^m - 1. | formula | tagged | Effective Rate: “$$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$” |
| To value a repeating pattern of payments within each year, first compute the present value of one year's pattern at the start of that year … | procedure | missing |  |
| Level payments made at the start of each year for n years, with the first at time 0, have present value given by an annuity-due ä_{n\|i}. | fact | tagged | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |

</details>

<details><summary><code>fm-398</code> · gap</summary>

Tagged pages: Increasing Annuity, Perpetuity, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an increasing perpetuity-immediate paying 1, 2, 3, ... at times 1, 2, 3, ... is (Ia)_∞ = 1/i + 1/i^2 (equivalently 1/(… | formula | tagged | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| A deferred or delayed increasing perpetuity starting after time n has present value v^n (Ia)_∞, because shifting the payment stream n perio… | procedure | linked | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| Decompose a payment pattern with changing slopes into a sum of increasing perpetuities started at different times, with each multiple (e.g.… | procedure | missing |  |
| The discount factor v = 1/(1+i), so v^n = (1+i)^(-n) is the present value at time 0 of 1 paid at time n. | definition | tagged | Present Value: “future cash flows are multiplied by the discount factor $v = (1+i)^{-1}$ raised to the number of pe…” |

</details>

<details><summary><code>fm-399</code> · untagged</summary>

Tagged pages: Reinvestment of Coupons, Bond Price, Yield Rate, Accumulated Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The coupon payment of a bond equals the coupon rate times the face amount (for a bond redeemed at par, the redemption value equals the face… | formula | tagged | Reinvestment of Coupons: “Coupon $= Fr = 1000 \times 0.07 = \$70$ per year.” |
| The accumulated value at time n of level payments of 1 at the end of each period, with interest rate i, is s_{n\|i} = ((1+i)^n - 1)/i. | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When coupons are reinvested at a rate different from the bond's yield, accumulate the reinvested coupons at the reinvestment rate to the en… | procedure | tagged | Reinvestment of Coupons: “When coupons are reinvested at a rate $r_i$ per period, the **accumulated value** at the end of $n$…” |
| The annual effective yield over a period is the rate i at which the initial investment accumulated for n years equals the total accumulated… | definition | tagged | Reinvestment of Coupons (collapsed): “The realized yield $r$ satisfies $1000(1+r)^4 = 1297.25$, giving $(1+r)^4 = 1.29725$, so $r = 1.297…” |

</details>

<details><summary><code>fm-400</code> · answerable</summary>

Tagged pages: Fund Accumulation, Loan Amortization, Nominal Interest Rate, Yield Rate, Rate of Return

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate compounded monthly, i^(12), corresponds to an effective monthly rate of i^(12)/12. | definition | tagged | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| The level payment of a loan equals the loan amount divided by the annuity-immediate present value factor a_{n\|i} = (1 - v^n)/i at the loan… | formula | linked | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The accumulated value at time n of level end-of-period payments is the payment times the annuity-immediate accumulation factor s_{n\|j} = (… | formula | tagged | Fund Accumulation: “$\sum_t C_t(1+i)^{n-t}$ reduces to $C\cdot s_{\overline{n}\\|i}$” |
| When loan repayments are reinvested at a rate different from the loan rate, compute the lender's accumulated value by accumulating each rep… | procedure | tagged | Fund Accumulation: “amounts withdrawn from one fund are immediately deposited into and accumulate within a **second** f…” |
| The lender's annual effective yield is the rate j that solves (amount lent)(1+j)^n = accumulated value of reinvested repayments at time n. | procedure | tagged | Rate of Return: “$C_t$ is the net cash flow at time $t$ (outflows negative) and $v = 1/(1+i)$; the IRR is the $i$ th…” |

</details>

<details><summary><code>fm-401</code> · answerable</summary>

Tagged pages: Loan Amortization, Amortization Schedule, Principal, Payment Amount

| Item | Kind | Status | Where |
|---|---|---|---|
| In a loan repaid with level payments P at the end of each year for n years, the interest portion of payment t equals P(1 - v^(n-t+1)), wher… | formula | tagged | Payment Amount: “$$I_k = i \cdot OB_{k-1} = P\left(1 - v^{\,n-k+1}\right)$$” |
| In the final payment of an amortized loan, the principal repaid equals the outstanding balance, which is the payment discounted one period … | fact | tagged | Payment Amount: “$$PR_k = P\,v^{\,n-k+1}$$” |
| The interest in the first payment of a loan is the effective rate times the original amount borrowed, since the outstanding balance at time… | fact | tagged | Principal: “It is the basis on which interest is computed in the first period ($\text{Interest}_1 = L \times i$…” |
| Each level loan payment splits into interest (rate times beginning outstanding balance) and principal repaid (payment minus interest). | definition | tagged | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |

</details>

<details><summary><code>fm-402</code> · answerable</summary>

Tagged pages: Real Rate of Interest, Inflation

| Item | Kind | Status | Where |
|---|---|---|---|
| The real rate of interest is the effective interest rate adjusted for inflation, i.e., the rate at which purchasing power grows after remov… | definition | tagged | Real Rate of Interest: “The **real rate of interest** $i_r$ adjusts the nominal [[Interest Rate]] $i$ for the effect of [[I…” |
| The real rate i' relates to the nominal effective rate i and inflation rate r by 1 + i' = (1 + i)/(1 + r), equivalently (1 + i) = (1 + i')(… | formula | tagged | Real Rate of Interest: “$$1 + i_r = \frac{1+i}{1+r}$$” |

</details>

<details><summary><code>fm-403</code> · gap</summary>

Tagged pages: Fund Accumulation, Nominal Interest Rate, Accumulated Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible m times per year, i^(m), earns i^(m)/m effective interest per 1/m-year period. | definition | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| The annual effective rate equivalent to a nominal rate i^(m) convertible m times per year is (1 + i^(m)/m)^m - 1. | formula | tagged | Nominal Interest Rate: “\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i” |
| If the accumulated interest is withdrawn each year, the fund principal stays constant, so each year's withdrawal equals the annual effectiv… | fact | tagged | Fund Accumulation (collapsed): “Since the \$$500$ principal stays in Fund A, it earns level interest of $500(0.05) = \$25$ per year…” |
| A series of equal end-of-year deposits into a fund earning effective rate i has an accumulated value immediately after the last deposit equ… | procedure | tagged | Fund Accumulation: “When the deposits are a level $C$ at the end of each period — times $t = 1, \ldots, n$ — $\sum_t C_…” |
| The accumulated value factor of an n-year annuity-immediate is s_{n\|i} = ((1+i)^n - 1)/i. | formula | linked | Annuity Immediate: “s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}” |
| To find an unknown interest rate from a given annuity accumulated value, set deposit times s_{n\|i} equal to the value and solve numericall… | procedure | missing |  |

</details>

<details><summary><code>fm-404</code> · answerable</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Yield Rate, Bond Price

| Item | Kind | Status | Where |
|---|---|---|---|
| The market value (price) of a bond is the sum of its coupon and redemption payments, each discounted at the spot rate matching its time to … | procedure | tagged | Spot Rate: “A coupon bond is priced by discounting each cash flow at the spot rate for that maturity:” |
| A spot rate for term t is the annual effective rate of return on a zero-coupon investment held from time 0 to time t, used to discount a si… | definition | tagged | Spot Rates and Forward Rates: “The [[Spot Rate]] $s_t$ is the annual effective rate earned on an investment made now and repaid in…” |
| A bond's yield to maturity is the single constant effective interest rate at which the present value of the bond's payments equals its mark… | definition | tagged | Yield Rate: “The **yield rate** $j$ (also called the yield to maturity) is the internal rate of return of a bond…” |
| A bond's price at yield i equals the coupon (face times coupon rate) times the annuity-immediate factor a_n\|i plus the redemption value ti… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A bond's annual coupon equals its coupon rate times its face amount, and the final payment at maturity is the last coupon plus the redempti… | formula | linked | Coupon Rate: “The **coupon rate** $r$ is the rate applied to the face value $F$ of a bond to determine each perio…” |

</details>

<details><summary><code>fm-405</code> · untagged</summary>

Tagged pages: Loan Amortization, Geometric Increasing Annuity, Principal

| Item | Kind | Status | Where |
|---|---|---|---|
| A geometrically increasing payment loan has payments that each grow by a constant percentage over the previous payment, so payment t equals… | definition | tagged | Geometric Increasing Annuity: “For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (…” |
| The loan amount equals the present value of all payments discounted at the effective periodic interest rate. | fact | tagged | Loan Amortization: “whose present value at the loan rate equals the amount lent” |
| The effective periodic interest rate equals the nominal annual rate convertible m times per year divided by m. | formula | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| When the payment growth rate equals the interest rate, each payment's present value equals the first payment divided by (1+i), so the total… | fact | tagged | Geometric Increasing Annuity: “When $i = g$, $\text{PV} = n \cdot v = n/(1+i)$.” |
| Interest in a payment period equals the periodic interest rate times the outstanding balance at the start of the period, and the principal … | procedure | tagged | Loan Amortization: “$$I_k = i\,B_{k-1}$$” |

</details>

<details><summary><code>fm-406</code> · answerable</summary>

Tagged pages: Real Rate of Interest, Inflation

| Item | Kind | Status | Where |
|---|---|---|---|
| The real interest rate is the rate of return after removing the effect of inflation, measuring growth in purchasing power rather than in no… | definition | tagged | Real Rate of Interest: “The **real rate of interest** $i_r$ adjusts the nominal [[Interest Rate]] $i$ for the effect of [[I…” |
| The real effective rate i' satisfies 1 + i' = (1 + i)/(1 + r), where i is the nominal effective annual rate and r is the annual inflation r… | formula | tagged | Real Rate of Interest: “$$1 + i_r = \frac{1+i}{1+r}$$” |

</details>

<details><summary><code>fm-407</code> · untagged</summary>

Tagged pages: Loan Amortization, Nominal Interest Rate, Drop Payment

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible monthly, i^(12), corresponds to an effective monthly rate of i^(12)/12. | definition | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| With interest-only payments, each payment equals the periodic interest on the outstanding balance, so the principal balance stays unchanged. | fact | tagged | Loan Amortization: “A payment equal to the interest due repays no principal and leaves the balance unchanged;” |
| The outstanding loan balance at any time equals the present value of the remaining payments at the loan's current interest rate, so a new r… | fact | linked | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments, and the interest i…” |
| The present value of an n-period level annuity-immediate with payment P at periodic rate i is P·a_{n\|i} = P(1 − v^n)/i, where v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To find the number of level payments needed to repay a loan, set the loan amount equal to the present value of the payments, solve for v^n,… | procedure | linked | Term of Loan (collapsed): “$5000 = 900\,a_{\overline{n}\\|8\%}$, so $a_{\overline{n}\\|} = 5.555556$:” |
| When the solved n is not an integer, the loan is repaid by the integer number of full payments plus one smaller final payment, so the numbe… | fact | tagged | Drop Payment: “It arises when level payments continue for as long as necessary and the [[Term of Loan]] is not a w…” |

</details>

<details><summary><code>fm-408</code> · gap</summary>

Tagged pages: Spot Rates and Forward Rates, Spot Rate, Yield Rate, Annuity Immediate

| Item | Kind | Status | Where |
|---|---|---|---|
| A spot rate is the annual effective yield for a zero-coupon investment of a given length, used to discount a single cash flow at that time. | definition | tagged | Spot Rates and Forward Rates: “The [[Spot Rate]] $s_t$ is the annual effective rate earned on an investment made now and repaid in…” |
| The present value of a series of payments under spot rates is the sum of each payment discounted at the spot rate for its own time t, i.e. … | procedure | tagged | Spot Rates and Forward Rates (collapsed): “Discount each payment by its own factor:” |
| The equivalent (single) annual effective interest rate for a set of payments is the constant rate i at which the present value of the payme… | definition | missing |  |
| The present value of a level n-year annuity-immediate of 1 per year at effective rate i is a_angle(n) = (1 - v^n)/i, where v = 1/(1+i). | formula | tagged | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To find the unknown rate i from a given annuity present value, set payment times a_angle(n)\|i equal to the PV and solve for i (e.g., by ca… | procedure | tagged | Yield Rate (collapsed): “Bracket the root by pricing at two trial rates:” |

</details>

<details><summary><code>fm-409</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Increasing Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the average of the cash flow times weighted by the present values of the cash flows, i.e. sum of t times PV of cash fl… | definition | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| A loan repaid with level end-of-year payments has cash flows forming a level annuity-immediate, with the payment amount the same each perio… | fact | linked | Annuities: “an [[Annuity Immediate\\|annuity-immediate]] pays at the end of each period” |
| When cash flows are level, the payment amount cancels in the numerator and denominator of the Macaulay duration, so duration does not depen… | fact | missing |  |
| The Macaulay duration of an n-year level annuity-immediate at interest rate i equals (Ia)_{n\|i} / a_{n\|i}. | formula | missing |  |
| The present value of an n-year increasing annuity-immediate with payments 1, 2, ..., n is (Ia)_{n\|i} = (ä_{n\|i} − n v^n)/i, and a_{n\|i} … | formula | tagged | Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |

</details>

<details><summary><code>fm-410</code> · untagged</summary>

Tagged pages: Effective Rate, Nominal Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The annual effective interest rate is the percentage by which an account balance grows over a full year, regardless of how often interest i… | definition | elsewhere | Interest Rate: “The **effective annual interest rate** is the interest earned over a year per unit invested at the …” |
| A nominal annual interest rate convertible m times per year is an annual quoted rate whose per-period rate is the nominal rate divided by m… | definition | tagged | Nominal Interest Rate: “The **nominal interest rate** $i^{(m)}$ is a quoted annual rate convertible (compounded) $m$ times …” |
| The nominal rate convertible m times per year equivalent to an effective annual rate i is i^(m) = m[(1+i)^(1/m) - 1]. | formula | tagged | Nominal Interest Rate: “$$i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$$” |
| For the same effective annual rate, the nominal rate convertible more than once per year is lower than the effective rate, because of intra… | fact | tagged | Nominal Interest Rate: “For a fixed effective rate, $i^{(m)}$ is a decreasing function of $m$ — more frequent compounding r…” |
| The force of interest, the annual discount rate, and the simple interest rate are distinct rate measures (instantaneous compounding intensi… | definition | linked | Force of Interest: “The **force of interest** $\delta$ is the continuously compounded [[Interest Rate]] — the limiting …” |

</details>

<details><summary><code>fm-411</code> · answerable</summary>

Tagged pages: Duration, Modified Duration, Macaulay Duration, Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Modified duration is the negative of the derivative of price with respect to the interest rate divided by price, D_mod = -P'(i)/P(i). | definition | tagged | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The present value of a perpetuity-immediate paying 1 per year at annual effective rate i is 1/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The modified duration of a level perpetuity-immediate equals 1/i. | fact | tagged | Modified Duration: “$$= \frac{D_{Mac}}{1+j}$$” |
| Macaulay duration equals modified duration multiplied by (1+i), i.e. D_mac = D_mod (1+i), for an annual effective rate i. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-412</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Force of Interest

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the average of the cash flow times weighted by the present values of the cash flows, divided by the total present valu… | definition | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| Under a constant force of interest delta, the present value of 1 due at time t is e^(-delta*t). | formula | tagged | Force of Interest: “$$a(t) = e^{\delta t}$$” |
| An annuity-immediate with level payments pays the same amount at the end of each period (times 1, 2, ..., n). | definition | elsewhere | Annuity Immediate: “An **annuity-immediate** is a series of $n$ level payments of 1 made at the **end** of each period.” |
| In the Macaulay duration of a level-payment stream, the common payment amount cancels from numerator and denominator, so only the discount … | fact | missing |  |

</details>

<details><summary><code>fm-413</code> · gap</summary>

Tagged pages: Outstanding Balance, Loan Amortization, Nominal Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible monthly, j, gives an effective monthly rate of j/12. | definition | tagged | Nominal Interest Rate: “The monthly periodic rate is $6\%/12 = 0.5\%$” |
| The original loan amount equals the present value of the level payments: L = P * a_angle(n) at the periodic rate i, where a_angle(n) = (1 -… | formula | linked | Amortization: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| Under the retrospective method, the outstanding loan balance at time t equals the loan accumulated with interest to time t minus the accumu… | procedure | tagged | Outstanding Balance: “$$OB_k = L(1+i)^k - P \cdot s_{\overline{k}\\|i}$$” |
| The accumulated value at the time of the last payment of n level end-of-period payments is P * s_angle(n) = P * ((1+i)^n - 1)/i. | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When scheduled payments are missed, compute the balance by taking the accumulated value of the full payment schedule and subtracting the ac… | procedure | missing |  |

</details>

<details><summary><code>fm-414</code> · answerable</summary>

Tagged pages: Effective Discount Rate, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The effective interest rate for a period is the interest earned during the period divided by the account balance at the beginning of the pe… | definition | linked | Interest Rate: “The **effective annual interest rate** is the interest earned over a year per unit invested at the …” |
| The effective discount rate for a period is the interest (discount) earned during the period divided by the account balance at the end of t… | definition | tagged | Effective Discount Rate: “it is the amount of discount during the period divided by the amount at the end of the period.” |
| The beginning balance equals the ending balance minus the interest earned during the period (with no other deposits or withdrawals). | fact | tagged | Effective Discount Rate (collapsed): “The discount of $0.06 \times 5000 = 300$ is taken upfront, so the borrower receives $5000 - 300 = 4…” |

</details>

<details><summary><code>fm-415</code> · untagged</summary>

Tagged pages: Loan Repayment Comparison, Annuity Immediate, Annuity Due, Deferred Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| A loan's amount (initial principal) equals the present value of its scheduled payments, discounted at the loan's interest rate. | fact | linked | Amortization: “Whatever the payment pattern, the loan equals the present value of its payments” |
| Convert a nominal annual interest rate compounded m times per year to the effective rate per period by dividing the nominal rate by m. | procedure | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| The present value of an n-period level annuity-immediate with payments of 1 is a_{n\|i} = (1 - v^n)/i, and for an annuity-due is ä_{n\|i} =… | formula | tagged | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| Value a deferred payment stream by taking the present value of the annuity as of the start of its payment block and discounting it by v^k f… | procedure | tagged | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |

</details>

<details><summary><code>fm-416</code> · gap</summary>

Tagged pages: Bond Price, Coupon Rate, Yield Rate, Face Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of an annual-coupon bond equals the present value of its coupons plus the present value of the redemption: P = F·r·a_{n\|i} + C·v… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The present value of an n-year annuity-immediate is a_{n\|i} = (1 - v^n)/i, so i·a_{n\|i} = 1 - v^n. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The coupon rate is the annual coupon divided by the face amount, so the coupon equals face amount times coupon rate, and a bond's yield rat… | definition | tagged | Coupon Rate: “$$r = \frac{\text{Coupon}}{F}$$” |
| When the coupon rate is a fixed fraction k of the yield rate and face equals redemption, the bond price simplifies to F[k + (1-k)v^n], so t… | procedure | missing |  |

</details>

<details><summary><code>fm-417</code> · answerable</summary>

Tagged pages: Bond Price, Callable Bond, Non-Callable Bond, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| When a bond's yield rate exceeds its coupon rate, the bond sells at a discount (price below redemption value). | fact | tagged | Bond Price: “when $Fr < Cj$ it sells at a **discount** ($P < C$)” |
| For a bond bought at a discount, an earlier redemption yields a higher return to the investor, so the investor's worst case (lowest yield) … | fact | tagged | Callable Bond: “If the bond is at a **discount** (price $<$ redemption value): assume the **latest** possible redem…” |
| To find the price guaranteeing at least a given yield on a callable bond, compute the price under the call date that gives the investor the… | procedure | tagged | Callable Bond: “To guarantee a yield of at least $j$ per period, the most the investor will pay is the **smallest**…” |

</details>

<details><summary><code>fm-418</code> · gap</summary>

Tagged pages: Equation of Value, Force of Interest, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| An equation of value sets the present value (at a common time) of all charges/inflows equal to the present value of all payments/outflows; … | fact | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| Under a constant force of interest δ (continuous compounding at nominal rate δ), the present value of an amount at time t is multiplied by … | formula | linked | Accumulation Function: “\\| Constant [[Force of Interest]] $\delta$ \\| $e^{\delta t}$ \\|” |
| Place each cash flow at its correct time in years: an immediate purchase at t=0, annual fees at t=1 and t=2, monthly end-of-month payments … | procedure | missing |  |
| Combine a series of level periodic payments by discounting each payment individually, giving a sum X·Σ e^{-δ·k/12} (equivalently e^{-δk/12}… | procedure | tagged | Force of Interest: “$$a(t) = e^{\delta t}$$” |

</details>

<details><summary><code>fm-419</code> · untagged</summary>

Tagged pages: Bond Price, Coupon Rate, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Price a zero-coupon bond as face amount times v^n, and solve for the periodic interest rate from the price, face amount and number of perio… | procedure | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| Convert a time horizon in years to the number of coupon periods and use the periodic (e.g. quarterly) effective rate consistent with the co… | procedure | elsewhere | Nominal Interest Rate Convertible m-thly: “$$i^{(m)} = m\!\left[(1+i)^{1/m} - 1\right]$$” |
| A bond's price equals the present value of its coupons plus the present value of its redemption value: P = F*r*a_{n\|j} + C*v^n, where the … | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The coupon rate is the coupon per period divided by the face amount; the coupon is based on face amount, not price. | definition | tagged | Coupon Rate: “$$r = \frac{\text{Coupon}}{F}$$” |
| The present value of a level annuity-immediate of n payments is a_{n\|j} = (1 - v^n)/j. | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| Convert a periodic coupon rate to an annual nominal coupon rate by multiplying by the number of coupons per year. | procedure | elsewhere | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |

</details>

<details><summary><code>fm-420</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Annuity Due, Level Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| An annuity-due makes payments at the beginning of each period (times 0, 1, ..., n-1), while an annuity-immediate pays at the end of each pe… | definition | tagged | Annuity Due: “An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period.” |
| The present value of an n-payment annuity-due whose payments grow geometrically at rate k with first payment P at interest rate i is P(1+i)… | formula | tagged | Geometric Increasing Annuity: “$$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$” |
| The present value of a level perpetuity-immediate with payment R at interest rate i is R/i, valued one period before the first payment. | formula | tagged | Level Perpetuity: “The present value of a perpetuity-immediate (payments at end of period) paying $1$ per period at ra…” |
| To value a cash flow stream with changing payment patterns, split it into segments (e.g., an initial growing annuity and a later level perp… | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| Discount a perpetuity's value at its valuation date back to time 0 by multiplying by v^t, where t is the number of years between time 0 and… | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |

</details>

<details><summary><code>fm-421</code> · answerable</summary>

Tagged pages: Premium, Redemption Value, Bond Price

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond is purchased at a premium when its purchase price is greater than its redemption value, and the premium is the excess of the price o… | definition | tagged | Premium: “A **premium** bond is a [[Bonds\\|bond]] whose price $P$ is above its [[Redemption Value\\|redemption…” |
| The face (par) amount of a bond is the amount on which coupons are calculated (coupon rate times face amount), and it is distinct from the … | definition | tagged | Redemption Value: “For most bonds, the redemption value equals the [[Face Value]] ($C = F$, called redemption **at par…” |
| Whether a bond is at a premium depends only on the purchase price versus the redemption value; it does not determine the relationship betwe… | fact | tagged | Premium: “When $C \neq F$, compare the price with $C$ and the yield with $g$, not with $F$ and $r$.” |

</details>

<details><summary><code>fm-422</code> · answerable</summary>

Tagged pages: Loan Repayment Comparison, Loan Amortization, Nominal Interest Rate, Annuity Due, Payment Amount

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible monthly equals 12 times the effective monthly rate, so the monthly rate is the nominal rate divi… | fact | tagged | Nominal Interest Rate (collapsed): “The monthly periodic rate is $6\%/12 = 0.5\%$, so:” |
| The present value of a level annuity-immediate of n payments of 1 at periodic rate j is a_{n\|j} = (1 - v^n)/j, where v = 1/(1+j). | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| The present value of a level annuity-due of n payments of 1 at periodic rate j is ä_{n\|j} = (1 - v^n)/d = (1+j)·a_{n\|j}, where d = j/(1+j… | formula | tagged | Annuity Due: “$$\ddot{a}_{\overline{n}\\|} = (1+i)\,a_{\overline{n}\\|}$$” |
| A loan amount equals the present value of its level payments at the loan interest rate, so the unknown rate or payment is found by setting … | procedure | tagged | Loan Amortization: “the borrower makes a series of payments $K_1, K_2, \ldots, K_n$ whose present value at the loan rat…” |
| Two repayment options for the same loan at the same interest rate share the rate; solve the rate from the fully specified option, then use … | procedure | tagged | Loan Repayment Comparison: “The two can be tied together by setting their total payments or total interest equal and solving fo…” |

</details>

<details><summary><code>fm-423</code> · untagged</summary>

Tagged pages: Duration, Macaulay Duration, Modified Duration, Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of a bond's cash flows. | definition | tagged | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| The Macaulay duration of a zero coupon bond equals its time to maturity. | fact | elsewhere | Term of Bond: “for a zero-coupon bond the [[Macaulay Duration\\|Macaulay duration]] equals the term” |
| Modified duration is the negative of the derivative of price with respect to the yield rate divided by price, -P'(i)/P(i). | definition | tagged | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| Macaulay duration equals modified duration times (1+i), where i is the effective annual yield. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The price of a perpetuity paying 1 at the end of each year is 1/i, where i is the annual effective yield. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |

</details>

<details><summary><code>fm-424</code> · gap</summary>

Tagged pages: Geometric Increasing Perpetuity, Perpetuity, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an annual perpetuity-immediate with first payment P and payments growing by a factor (1+g) each year is P/(i-g), valid… | formula | tagged | Geometric Increasing Perpetuity: “For a first payment $P$, multiply by $P$.” |
| A payment that is a given percentage less than the previous payment corresponds to a negative growth rate g (e.g., 2% less means g = -0.02,… | fact | missing |  |
| To find a corrected payment when the price is fixed, compute the price as the present value using the erroneous rate and payment, then set … | procedure | missing |  |

</details>

<details><summary><code>fm-425</code> · gap</summary>

Tagged pages: Immunization, Duration Matching, Duration, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a stream of cash flows at an annual effective interest rate i is the sum of each payment times (1+i) raised to the neg… | definition | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| Asset-liability matching (Redington-style immunization) requires the present value of the assets to equal the present value of the liabilit… | procedure | linked | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| When present values of assets and liabilities are equal, matching durations is equivalent to matching the derivatives of the present values… | fact | missing |  |
| The derivative of a present value term C(1+i)^(-t) with respect to i is -tC(1+i)^(-t-1); this gives the dollar-weighted time measure underl… | formula | linked | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-426</code> · answerable</summary>

Tagged pages: Immunization, Redington Immunization, Duration Matching, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization requires that the asset and liability present values are equal, their durations (first derivatives of present value … | definition | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| When asset and liability present values are equal, matching Macaulay durations is equivalent to matching the time-weighted present values (… | fact | tagged | Redington Immunization (collapsed): “**Condition 2** ($D_{Mac}(A) = D_{Mac}(L) = 4$), multiplying through by the common present value:” |
| Macaulay duration equals the sum of t times the present value of the cash flow at time t, divided by the total present value of the cash fl… | formula | linked | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| Asset cash flows falling on both sides of a single liability date (earlier and later) ensure the asset convexity exceeds the liability conv… | fact | linked | Full Immunization: “3. There is an asset cash flow before the liability date and one after it” |
| Set up two equations from equal present value and equal time-weighted present value of assets and liability, then solve the resulting syste… | procedure | tagged | Redington Immunization: “Subtracting twice Condition 1 from Condition 2 gives $4Yv^6 = 20{,}000v^4$, so each bond carries ha…” |
| The present value of a cash flow at time t is the amount times v^t, where v = (1+i)^(-1) and i is the annual effective interest rate. | formula | tagged | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |

</details>

<details><summary><code>fm-427</code> · untagged</summary>

Tagged pages: Reinvestment of Coupons, Yield Rate, Bond Price, Accumulated Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The coupon amount of a bond equals the face amount times the coupon rate (Fr). | formula | tagged | Bond Price: “$r$ is the coupon rate per period (so $Fr$ is the periodic coupon amount)” |
| The accumulated value at the time of the last payment of a level n-period annuity-immediate with payment R at rate j is R times s_{n\|j} = … | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| When bond coupons are reinvested at a given rate, the accumulated value at maturity is the accumulated value of the coupons as an annuity a… | procedure | tagged | Reinvestment of Coupons: “When coupons are reinvested at a rate $r_i$ per period, the **accumulated value** at the end of $n$…” |
| The yield earned on an original investment is the rate at which the investment accumulated for the term equals the total final accumulated … | definition | tagged | Reinvestment of Coupons (collapsed): “The realized yield $r$ satisfies $1000(1+r)^4 = 1297.25$, giving $(1+r)^4 = 1.29725$, so $r = 1.297…” |
| The price of a bond at yield i is the present value of its coupons and redemption value: P = Fr·a_{n\|i} + C·v^n. | formula | tagged | Yield Rate: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| To find the yield rate of a bond given its price, set the price formula equal to the price and solve numerically for i (e.g., with a financ… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |

</details>

<details><summary><code>fm-428</code> · untagged</summary>

Tagged pages: Perpetuity, Level Perpetuity, Effective Rate, Present Value, Payment Period

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-immediate paying a level amount each period is the payment divided by the effective interest rate per per… | formula | tagged | Perpetuity: “a_{\overline{\infty}\\|} = \frac{1}{i}” |
| The present value of a perpetuity-due paying a level amount each period is the payment divided by the effective rate per period plus one ex… | formula | tagged | Perpetuity: “The relationship $\ddot{a}_{\overline{\infty}\\|} = 1 + a_{\overline{\infty}\\|}$ holds because the p…” |
| Convert an annual effective rate to an effective rate for a period of different length by compounding: the rate for a period of t years is … | procedure | tagged | Payment Period: “The same conversion works when payments are *less* frequent than compounding: annual payments at $6…” |
| To value a perpetuity whose first payment is not one period after the valuation date, value it as a perpetuity-immediate as of one period b… | procedure | elsewhere | Geometric Increasing Perpetuity (collapsed): “Value the growing part at time 3, one period before its first payment, then discount it to time 0:” |
| Two cash flow streams have equal present value when their values at the same date at the same interest rate are equal, so one can set the p… | fact | elsewhere | Time Value of Money: “An [[Equation of Value]] equates the values of two sets of payments at one comparison date.” |

</details>

<details><summary><code>fm-429</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Modified Duration, Increasing Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration of a bond is the present-value-weighted average of the times of its cash flows, i.e. the sum of t times the PV of the pay… | definition | tagged | Macaulay Duration: “$$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$” |
| Modified duration equals Macaulay duration divided by (1+i), where i is the annual effective yield rate. | formula | tagged | Modified Duration: “$$= \frac{D_{Mac}}{1+j}$$” |
| The price of an annual coupon bond per unit face (redeemed at par) is the coupon rate times the annuity-immediate value a_n at the yield ra… | formula | elsewhere | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The present value of level payments of 1 at times 1 to n weighted by time is the increasing annuity (Ia)_n = (ä_n − n v^n)/i. | formula | linked | Arithmetic Increasing Annuity: “$$(Ia)_{\overline{n}\\|} = \frac{\ddot{a}_{\overline{n}\\|} - nv^n}{i}$$” |
| To compute the duration of a coupon bond, the numerator is the coupon rate times (Ia)_n plus n times v^n (for the redemption payment at tim… | procedure | missing |  |

</details>

<details><summary><code>fm-430</code> · gap</summary>

Tagged pages: Bond Price, Face Value, Coupon Rate, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a zero-coupon bond equals its redemption (face) value discounted at the yield rate over the term: P = F v^n = F/(1+i)^n. | formula | elsewhere | Term of Bond: “The time factor in the present value formula: $v^n = (1+j)^{-n}$” |
| The price of a coupon bond is the present value of its coupons plus the present value of its redemption value: P = F r a_{n\|i} + C v^n, wh… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A bond's coupon amount equals the coupon rate times the face value, paid each period (annual coupons here), and the coupon rate is distinct… | definition | tagged | Coupon Rate: “The coupon rate determines the size of the coupon cash flows; the yield rate determines how those c…” |
| The present value of an n-period annuity-immediate at effective rate i is a_{n\|i} = (1 - v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| When two bonds share the same price, term, and yield, the quantity v^n found from one bond's price equation can be substituted into the oth… | procedure | missing |  |

</details>

<details><summary><code>fm-431</code> · untagged</summary>

Tagged pages: Bond Amortization, Amortization of Premium, Book Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a bond with semiannual coupons, the coupon per period is the face amount times the coupon rate per period (annual coupon rate divided b… | procedure | linked | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The effective periodic rate equivalent to an annual effective rate i for a period of 1/m year is j = (1+i)^(1/m) - 1. | formula | elsewhere | Effective Rate (collapsed): “The nominal monthly rate equivalent to 7% semi-annually is $12\left[(1.071225)^{1/12} - 1\right] = …” |
| The book value of a bond immediately after a coupon with n coupons remaining is the present value of the remaining redemption value and cou… | formula | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |
| For a bond bought at a premium, the amortization of premium in a coupon equals the decrease in book value from just after the previous coup… | fact | tagged | Bond Amortization: “$PR_t > 0$ when the bond was bought at a [[Premium\\|premium]]: the book value is written down each …” |
| To identify the book value just after the k-th coupon of an n-period bond, use n−k remaining coupons; the amortization in the k-th coupon i… | procedure | tagged | Bond Amortization: “$B_t$ is the book value just after the $t$-th coupon, starting at $B_0 = P$ and ending at $B_n = C$.” |

</details>

<details><summary><code>fm-432</code> · answerable</summary>

Tagged pages: Redington Immunization, Full Immunization, Convexity, Cash Flow Matching

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization protects the surplus (present value of assets minus present value of liabilities) against small, parallel changes in… | definition | tagged | Redington Immunization: “**Redington immunization** is a strategy for protecting a portfolio's surplus $S = V_A - V_L$ again…” |
| Redington immunization requires the present value of assets to equal the present value of liabilities. | fact | tagged | Redington Immunization: “$PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| Redington immunization requires the duration of assets to equal the duration of liabilities. | fact | tagged | Redington Immunization: “$D_{Mac}(A) = D_{Mac}(L)$ — asset and liability [[Macaulay Duration\\|Macaulay durations]] are equal” |
| Redington immunization requires the convexity of assets to be greater than the convexity of liabilities, which makes the surplus nonnegativ… | fact | tagged | Redington Immunization: “$\text{Convexity}(A) > \text{Convexity}(L)$ — asset [[Convexity]] exceeds liability convexity” |
| A Redington-immunized portfolio generally requires periodic rebalancing, more frequent than a cash-flow matched portfolio, which needs no r… | fact | tagged | Cash Flow Matching: “Unlike [[Redington Immunization]], which only protects against small parallel rate shifts and needs…” |

</details>

<details><summary><code>fm-433</code> · answerable</summary>

Tagged pages: Outstanding Balance, Loan Amortization, Deferred Annuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The outstanding loan balance at any time (prospective method) equals the present value, at the loan's effective interest rate, of all remai… | fact | tagged | Outstanding Balance: “**Prospective method** (present value of future payments):” |
| The present value of an n-year annuity-immediate of 1 per period is a_angle_n = (1 - v^n)/i, where v = 1/(1+i). | formula | linked | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To value a deferred annuity, take the present value of the annuity at the start of its payment period and discount it back by v raised to t… | procedure | tagged | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| Identify which payments remain after a given time (skipping any periods with no payments) and value only those payments to get the balance … | procedure | tagged | Loan Amortization (collapsed): “Balance just after the 4th payment, retrospectively, with $(1.05)^4 = 1.21550625$ and $s_{\overline…” |

</details>

<details><summary><code>fm-434</code> · gap</summary>

Tagged pages: Bond Price, Yield Rate, Nominal Interest Rate, Coupon Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond's price equals the present value of its coupons and redemption value discounted at the bond's yield rate per coupon period. | fact | tagged | Bond Price: “The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the…” |
| The price of a bond with face amount F, coupon rate r per period, redemption C and n periods at periodic yield j is P = F·r·a_{n\|j} + C·v^… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A nominal annual rate convertible semiannually, i^(2), corresponds to an effective rate per half-year of j = i^(2)/2, and the number of per… | definition | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| When the yield rate cannot be solved algebraically from a bond price equation, solve for it numerically using a financial calculator (N, PV… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |
| A bond whose coupon rate changes part-way through is priced by splitting its coupons into level annuity segments, with the later segment va… | procedure | elsewhere | Deferred Annuity: “$${}_{k\\|}a_{\overline{n}\\|} = v^k \cdot a_{\overline{n}\\|}$$” |
| Two bonds yielding the same annual nominal rate share the same periodic yield rate, so the yield found from one bond can be used to price t… | fact | missing |  |

</details>

<details><summary><code>fm-435</code> · untagged</summary>

Tagged pages: Callable Bond, Call Price, Bond Price, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond at a given yield equals the present value of its coupons (coupon times the annuity-immediate factor) plus the present v… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The coupon per period equals the face amount times the coupon rate per period, which is the nominal annual coupon rate divided by the numbe… | definition | linked | Coupon Rate: “For a bond paying semi-annually with a $6\%$ annual coupon rate, the per-period coupon rate is $r =…” |
| Convert a nominal annual yield rate convertible m times per year to an effective rate per period by dividing it by m, and use the number of… | procedure | elsewhere | Nominal Interest Rate Convertible m-thly: “Each period, interest at rate $i^{(m)}/m$ is credited.” |
| A callable bond may be redeemed at any call date or at maturity, so the price that guarantees a given minimum yield is the minimum of the p… | fact | tagged | Callable Bond: “To guarantee a yield of at least $j$ per period, the most the investor will pay is the **smallest**…” |
| To price a bond redeemed at a call date, use the call price as the redemption amount and the number of coupon periods up to the call date. | procedure | tagged | Call Price: “In bond pricing problems, the call price replaces the [[Redemption Value]] $C$ in the bond formula …” |

</details>

<details><summary><code>fm-436</code> · answerable</summary>

Tagged pages: Increasing Annuity, Perpetuity, Annuity Due, Present Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of an increasing perpetuity-immediate with first payment P at the end of period 1 and payments increasing by Q each perio… | formula | linked | Arithmetic Progression: “With $P, Q > 0$ and no end date, the [[Perpetuity\\|perpetuity]]-immediate is worth $P/i + Q/i^2$.” |
| An annuity-due (payments at the start of each period) has present value equal to (1+i) times the present value of the corresponding annuity… | fact | tagged | Annuity Due: “Because each payment is received one period earlier than in an [[Annuity Immediate\\|annuity-immedia…” |
| To find the present value of a payment stream at a later date immediately after a payment, value only the remaining future payments at that… | procedure | tagged | Perpetuity: “The relationship $\ddot{a}_{\overline{\infty}\\|} = 1 + a_{\overline{\infty}\\|}$ holds because the p…” |
| In a payment stream increasing by a fixed amount Q each year, the n-th payment equals the first payment plus (n-1)Q. | fact | linked | Arithmetic Progression: “starting from a first payment $P$, the payments are $P,\ P+Q,\ P+2Q,\ \ldots,\ P+(n-1)Q$.” |

</details>

<details><summary><code>fm-437</code> · gap</summary>

Tagged pages: Accumulation of Discount, Book Value, Redemption Value, Bond Amortization

| Item | Kind | Status | Where |
|---|---|---|---|
| For a bond bought at a discount, the amount for accumulation of discount grows by the factor (1+i) from one coupon period to the next, so t… | fact | tagged | Bond Amortization: “The principal adjustments form a geometric progression with ratio $1 + j$ and add up to the premium…” |
| The book value of a discount bond just after coupon t equals the purchase price plus the accumulated discount, which is the first-period di… | formula | missing |  |
| The accumulated value annuity-immediate factor is s_{n\|i} = ((1+i)^n - 1)/i. | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| Solve for the unknown effective yield rate i from an equation of the form s_{n\|i} = k, using a financial calculator or numerical methods. | procedure | linked | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |
| At maturity (just after the final coupon) the bond's book value equals its redemption value, so the redemption value equals the price plus … | fact | tagged | Book Value: “At time 0, $BV_0 = P$ (the purchase price). At time $n$, $BV_n = C$ (the redemption value).” |

</details>

<details><summary><code>fm-438</code> · untagged</summary>

Tagged pages: Equation of Value, Yield Rate, Discount Factor

| Item | Kind | Status | Where |
|---|---|---|---|
| Two payment streams are equivalent when their present values at a common comparison date, computed at the same interest rate, are equal (eq… | fact | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| To find the implied yield of delaying a payment, set the discounted price of the early-payment option equal to the value at that date of th… | procedure | tagged | Equation of Value: “An **equation of value** sets the value of all payments in equal to the value of all payments out, …” |
| With an effective annual rate i, the present value of an amount paid t years later is the amount times v^t = (1+i)^(-t), where t may be fra… | formula | linked | Compound Interest: “$v^n = (1+i)^{-n}$ is the present value of 1 due in $n$ periods, where $v = (1+i)^{-1}$ is the [[Di…” |
| Convert a time interval in days into years by dividing the number of days by 365 when a 365-day year is assumed. | procedure | elsewhere | Effective Discount Rate (collapsed): “i &= \left(\frac{10000}{9898.89}\right)^{365/91} - 1” |
| A percentage discount on a price means the amount paid is the price times (1 minus the discount rate). | definition | elsewhere | Effective Discount Rate (collapsed): “Discount $= 10000 \times 0.04 \times (91/360) = 101.11$. Price $= 10000 - 101.11 = 9898.89$.” |

</details>

<details><summary><code>fm-439</code> · untagged</summary>

Tagged pages: Refinancing, Loan Amortization, Outstanding Balance

| Item | Kind | Status | Where |
|---|---|---|---|
| The level payment of an n-year loan of amount L at effective rate i per period is L divided by the annuity-immediate present value factor a… | formula | linked | Payment Amount: “$$P = \frac{L}{a_{\overline{n}\\|i}}$$” |
| The present value of an annuity-immediate (level payments at the end of each period) is the payment times a_{n\|i}, discounted at the effec… | fact | elsewhere | Level Payment Annuity: “$$\text{PV} = P \cdot a_{\overline{n}\\|i}$$” |
| Using the prospective method, the outstanding loan balance immediately after the k-th payment equals the present value, at the loan's inter… | procedure | tagged | Refinancing: “$$OB_k = P\,a_{\overline{n-k}\\|\,i}$$” |
| When a loan balance is refinanced by a new loan, the new loan's principal equals the outstanding balance and its level payment is computed … | procedure | tagged | Refinancing: “The new loan's principal is the old loan's [[Outstanding Balance\\|outstanding balance]] at the refi…” |

</details>

<details><summary><code>fm-440</code> · gap</summary>

Tagged pages: Duration, Modified Duration, 1st-Order Linear Approximation, Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a level perpetuity-due paying 1 per period at effective rate i is (1+i)/i, i.e., 1/d. | formula | tagged | Perpetuity: “$$\ddot{a}_{\overline{\infty}\\|} = \frac{1}{d}$$” |
| Modified duration is the negative of the derivative of price with respect to the interest rate divided by the price: D_MOD = -P'(i)/P(i). | definition | tagged | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The first-order modified approximation of price at rate i near initial rate i0 is P(i) ≈ P(i0)[1 − (i − i0)·D_MOD(i0)]. | formula | elsewhere | 1st-Order Macaulay Approximation: “$P(i) \approx P(i_0)\left[1 - (i - i_0)\,D_{Mod}\right]$” |
| Immediately before a payment of a perpetuity-due, the remaining payments (including that one) form a new perpetuity-due identical to the or… | fact | missing |  |
| Compute the relative error of an approximation as (approximate price − actual price)/actual price, where the actual price is the exact pres… | procedure | missing |  |

</details>

<details><summary><code>fm-441</code> · answerable</summary>

Tagged pages: Perpetuity, Annuity Due, Discount Factor, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-due paying a level amount X each period is X/d = X/(1-v), where v is the per-period discount factor. | formula | tagged | Perpetuity: “$$\ddot{a}_{\overline{\infty}\\|} = \frac{1}{d}$$” |
| If v is the discount factor for one period, then v^n is the discount factor for a period n times as long, so a perpetuity-due paying every … | fact | tagged | Discount Factor: “The $n$-period discount factor is $v^n = (1+i)^{-n}$.” |
| Convert a periodic (monthly) discount factor to an annual effective interest rate by raising it to the number of periods per year (v_annual… | procedure | linked | Discount Rate: “$\left(1 - \frac{d^{(m)}}{m}\right)^m = 1 - d = v$” |

</details>

<details><summary><code>fm-442</code> · gap</summary>

Tagged pages: Force of Interest, Effective Rate, Accumulation Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The accumulation factor from time a to time b under a force of interest δ(t) is exp(∫ from a to b of δ(t) dt). | formula | elsewhere | Variable Force of Interest: “$$\frac{a(t)}{a(s)} = \exp\!\left(\int_s^t \delta(u)\,du\right)$$” |
| The equivalent annual effective rate of interest for a given year is the rate i such that 1+i equals the accumulation factor over that year… | definition | linked | Interest Rate: “The **effective annual interest rate** is the interest earned over a year per unit invested at the …” |
| Map a calendar year to a time interval measured from the stated time origin: the year beginning n years after the origin runs from t=n to t… | procedure | missing |  |
| The antiderivative of 1/(c+t) with respect to t is ln(c+t), so the integral of the force of interest 1/(c+t) from a to b equals ln((c+b)/(c… | fact | missing |  |

</details>

<details><summary><code>fm-443</code> · gap</summary>

Tagged pages: Geometric Increasing Annuity, Annuity Due, Nominal Interest Rate, Accumulated Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Given a nominal annual interest rate compounded m times per year, the periodic rate is i^(m)/m and the annual effective rate is (1 + i^(m)/… | formula | tagged | Nominal Interest Rate: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| The present value of an annuity-due of n level payments of 1 at periodic rate i is a-double-dot_{n\|i} = (1 - v^n)/d, where d = i/(1+i). | formula | tagged | Annuity Due: “$$= \frac{1-v^n}{d}$$” |
| The present value of an annuity-immediate whose payments grow geometrically at rate g, with interest rate i, over n periods is [1 - ((1+g)/… | formula | missing |  |
| For payments made monthly with annual step increases, value each year's level monthly payments as an annuity-due at the monthly rate to get… | procedure | missing |  |
| To convert a geometric annuity-immediate present value to an annuity-due, multiply by (1+i); to find the accumulated value at time n, multi… | procedure | tagged | Annuity Due: “Because each payment is received one period earlier than in an [[Annuity Immediate\\|annuity-immedia…” |
| If deposits increase by a constant percentage each year, the deposit in year k equals the year-1 deposit times (1+g)^(k-1). | fact | tagged | Geometric Increasing Annuity: “payments are $1, (1+g), (1+g)^2, \ldots, (1+g)^{n-1}$” |

</details>

<details><summary><code>fm-444</code> · gap</summary>

Tagged pages: Bond Price, Coupon Rate, Yield Rate, Nominal Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| When the coupon rate per period equals the yield rate per period, a bond's price equals its redemption value (par), so the price equals fac… | fact | tagged | Bond Price: “when $Fr = Cj$ it sells at **par** ($P = C$).” |
| The price of a bond is the present value of its coupons (coupon annuity-immediate) plus the present value of the redemption amount: P = Fr·… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A nominal annual rate convertible m times per year, i^(m), has effective rate i^(m)/m per period, and the annual effective rate is (1+i^(m)… | definition | tagged | Nominal Interest Rate: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| To value coupons paid at a frequency different from the yield's conversion frequency, convert the yield to an equivalent effective rate for… | procedure | tagged | Nominal Interest Rate: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| Solve for an unknown number of periods in a bond price equation (price, coupon, redemption, and rate known) by using a financial calculator… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |
| Solve for an unknown coupon amount by setting the bond price equal to the coupon annuity PV plus redemption PV and isolating the coupon. | procedure | missing |  |

</details>

<details><summary><code>fm-445</code> · gap</summary>

Tagged pages: Duration, 1st-Order Macaulay Approximation, Macaulay Duration, Modified Duration

| Item | Kind | Status | Where |
|---|---|---|---|
| The first-order Macaulay approximation of a present value at a new interest rate i from current rate i0 is P(i) ≈ P(i0)·((1+i0)/(1+i))^(D_M… | formula | tagged | 1st-Order Macaulay Approximation: “$$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{D_{Mac}}$$” |
| Macaulay duration equals (1+i) times modified duration, i.e., D_MAC = (1+i)·D_MOD. | formula | tagged | Modified Duration: “$$= \frac{D_{Mac}}{1+j}$$” |
| Modified duration is the negative of the relative rate of change of present value with respect to the interest rate, and Macaulay duration … | definition | tagged | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| When the current rate is unknown, use one bond's known approximated present value to solve for the common rate-ratio factor (1+i0)/(1+i) ra… | procedure | missing |  |

</details>

<details><summary><code>fm-446</code> · gap</summary>

Tagged pages: Increasing Annuity, Annuity Due, Nominal Interest Rate, Arithmetic Progression

| Item | Kind | Status | Where |
|---|---|---|---|
| The effective rate over a longer period is obtained from a nominal rate compounded m times per year by compounding the periodic rate i^(m)/… | formula | tagged | Nominal Interest Rate: “i = \left(1 + \frac{0.06}{12}\right)^{12} - 1 = (1.005)^{12} - 1 \approx 6.168\%” |
| The present value of an arithmetically increasing annuity-immediate with first payment P and increase Q per period for n periods is P*a_n +… | formula | tagged | Arithmetic Progression: “PV = P\,a_{\overline{n}\\|} + Q\,\frac{a_{\overline{n}\\|} - nv^n}{i}” |
| A payment stream with repeated payments can be split into several interleaved sub-streams (e.g. payments every two periods) and each is val… | procedure | missing |  |
| To value an annuity-immediate formula result at an earlier or later date, accumulate (or discount) the formula's value by the number of per… | procedure | linked | Annuities (collapsed): “Check: $1{,}000\,a_{\overline{8}\\|}(1.04)^3 = 1{,}000(6.73274)(1.124864) = 7{,}573.42$ — the value …” |
| The present value of an annuity-immediate of 1 per period for n periods is a_n = (1 - v^n)/i, where v = 1/(1+i). | formula | linked | Annuity Immediate: “a_{\overline{n}\\|} = \frac{1-v^n}{i}” |

</details>

<details><summary><code>fm-447</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, Modified Duration, Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| Macaulay duration is the present-value-weighted average time of cash flows: the sum of t times the present value of the payment at time t, … | definition | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| Scaling all cash flows by a constant factor (e.g., changing the level payment amount) does not change the Macaulay or modified duration, si… | fact | missing |  |
| The present value of a perpetuity-immediate of 1 per year is 1/i, and the present value of a perpetuity-due of 1 per year is 1/d = (1+i)/i. | formula | tagged | Perpetuity: “$$a_{\overline{\infty}\\|} = \frac{1}{i}$$” |
| The present value of an increasing perpetuity-immediate with payments 1, 2, 3, ... at times 1, 2, 3, ... is (Ia)∞ = 1/i + 1/i², which equal… | formula | elsewhere | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| The effective discount rate d relates to the effective interest rate i by d = i/(1+i), equivalently i = d/(1−d), and 1/d = (1+i)/i. | fact | elsewhere | Effective Discount Rate: “$$d = \frac{i}{1+i}$$” |
| For a perpetuity-due, the payment at time 0 has weight 0 in the time-weighted present value, so the numerator is the same as for the perpet… | procedure | missing |  |
| Modified duration equals Macaulay duration divided by (1+i), where i is the annual effective interest rate. | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |

</details>

<details><summary><code>fm-448</code> · untagged</summary>

Tagged pages: Bond Amortization, Accumulation of Discount, Book Value, Yield Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The quarterly coupon of a bond equals the face amount times the annual coupon rate divided by the number of payments per year (Fr per perio… | formula | linked | Bonds: “**[[Coupon]]** — Periodic interest payment = Face Value × Coupon Rate / payments per year” |
| The book value of a bond at any time equals the present value, at the yield rate, of the remaining coupons plus the present value of the fu… | fact | tagged | Book Value: “It equals the present value of all remaining cash flows (coupons and redemption) discounted at $j$,…” |
| Solve for the periodic yield rate by setting the book value at an earlier time equal to the PV of the coupons and later book value over the… | procedure | tagged | Bond Amortization: “One row can be found without the rest of the table: value $B_{t-1}$ at the original yield from the …” |
| The amount for accumulation of discount in a coupon equals the coupon minus interest on prior book value, in magnitude: interest earned (yi… | formula | tagged | Bond Amortization: “$$I_t = j\,B_{t-1}$$” |
| The amounts for accumulation of discount (or amortization of premium) in successive coupons grow geometrically by the factor (1+j), where j… | fact | tagged | Bond Amortization: “The principal adjustments form a geometric progression with ratio $1 + j$ and add up to the premium…” |
| The total number of coupons of a bond equals the term in years times the number of coupons per year, and the last coupon is the final-numbe… | fact | elsewhere | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |

</details>

<details><summary><code>fm-449</code> · untagged</summary>

Tagged pages: Bond Amortization, Book Value, Yield Rate, Nominal Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| The book value of a bond immediately after a coupon is the present value of the remaining coupons and redemption value, discounted at the o… | definition | tagged | Book Value: “It equals the present value of all remaining cash flows (coupons and redemption) discounted at $j$,…” |
| A change in market yield rate after purchase does not affect the bond's book value, which continues to use the original purchase yield rate. | fact | tagged | Book Value: “The **book value** of a bond at time $k$ (immediately after the $k$-th coupon is paid) is the amort…” |
| The coupon per period equals the face amount times the coupon rate per period (annual nominal coupon rate divided by the number of payments… | formula | linked | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| A nominal annual rate convertible m times per year corresponds to an effective rate per period of the nominal rate divided by m. | fact | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| To value a deferred level annuity (payments starting after a delay), discount the annuity-immediate value by the deferral period with a fac… | procedure | elsewhere | Deferred Annuity: “$v = (1+i)^{-1}$ discounts the annuity-immediate value back over the $k$-period deferral.” |
| The present value of a level annuity-immediate of n payments at rate i per period is a_n = (1 - v^n)/i, and the redemption value is discoun… | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| Determine the number of remaining coupon periods after the k-th coupon by subtracting k from the total number of coupon periods (term in ye… | procedure | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |

</details>

<details><summary><code>fm-450</code> · answerable</summary>

Tagged pages: Immunization, Redington Immunization, Duration, Convexity

| Item | Kind | Status | Where |
|---|---|---|---|
| Redington immunization requires that the present value of assets equals the present value of liabilities, that the (Macaulay) durations of … | fact | tagged | Redington Immunization: “1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)” |
| The Macaulay duration of a cash flow set is the present-value-weighted average of the payment times: sum of t*PV_t divided by total PV. | formula | linked | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| Convexity (in the sense used for Redington) is proportional to the present-value-weighted average of squared payment times, sum of t^2*PV_t… | formula | tagged | Convexity: “$$C_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t^2 \cdot C_t \cdot v^{t}}{P}$$” |
| A zero-coupon bond is a single payment, so its duration equals its term to maturity and its weighted average squared time equals the term s… | fact | tagged | Convexity: “For a single cash flow at time $t$, $C_{Mac} = t^2$ and $C_{Mod} = t(t+1)/(1+j)^2$” |
| For a portfolio of assets, the portfolio duration and average squared time are the weighted averages of the components' values using fracti… | procedure | tagged | Redington Immunization: “a portfolio's convexity is the present-value-weighted average of its pieces'.” |

</details>

<details><summary><code>fm-451</code> · untagged</summary>

Tagged pages: Geometric Increasing Annuity, Annuity Due, Accumulated Value, Nominal Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| Convert a nominal annual interest rate compounded m times per year to the effective rate per period by dividing the nominal rate by m. | procedure | tagged | Nominal Interest Rate: “the year is divided into $m$ sub-periods each earning a periodic rate of $i^{(m)}/m$.” |
| The accumulated value at the end of n periods of an annuity-due of level payments of 1 is s-double-dot_n = ((1+i)^n - 1)/d, where d = i/(1+… | formula | tagged | Annuity Due: “$$= \frac{(1+i)^n - 1}{d}$$” |
| To accumulate a stream of payments to a later date, accumulate the annuity value to the end of its term and then carry that value forward f… | procedure | tagged | Accumulated Value: “Under [[Compound Interest]] at rate $i$, $a(t) = (1+i)^t$, so $AV = PV \cdot (1+i)^t$.” |
| Split a payment stream into a level portion and a geometrically increasing portion, value each separately at the same date, and add the res… | procedure | elsewhere | Increasing Annuity: “A first payment $P$ rising by $Q$ a period is a level annuity of $P - Q$ plus $Q\,(Ia)_{\overline{n…” |
| When payments grow at rate g per period and interest is i per period, the accumulated values of successive payments form a geometric series… | procedure | elsewhere | Geometric Progression: “$$\text{PV} = \frac{1}{1+i} \cdot \frac{1-\left(\frac{1+g}{1+i}\right)^n}{1 - \frac{1+g}{1+i}}$$” |
| The sum of a finite geometric series with first term a, ratio r, and n terms is a(1 - r^n)/(1 - r). | formula | elsewhere | Geometric Progression: “$$\text{PV} = \frac{1}{1+i} \cdot \frac{1-\left(\frac{1+g}{1+i}\right)^n}{1 - \frac{1+g}{1+i}}$$” |

</details>

<details><summary><code>fm-452</code> · untagged</summary>

Tagged pages: Yield Rate, Net Present Value, Cash Flow, Rate of Return

| Item | Kind | Status | Where |
|---|---|---|---|
| The annual effective yield rate of a set of cash flows is the interest rate at which the net present value of the cash flows equals zero. | definition | tagged | Rate of Return: “the IRR is the $i$ that makes the [[Net Present Value\\|net present value]] zero” |
| If a cash flow stream changes sign only once (all outflows precede all inflows), then by Descartes' rule of signs there is at most one posi… | fact | tagged | Rate of Return: “It is unique when the cash flows change sign only once — all outlays before all receipts; with seve…” |
| The present value of a cash flow C at time t at effective annual rate i is C/(1+i)^t, so the net present value is the sum of discounted inf… | formula | tagged | Net Present Value: “$$NPV = \sum_t C_t\, v^t$$” |
| To compare a yield rate with a given rate, compute the net present value of the cash flows at that given rate and check its sign. | procedure | elsewhere | Internal Rate of Return: “The NPV at $r$ is then positive exactly when $j > r$, and the NPV and IRR give the same decision.” |
| For a cash flow stream with outflows followed by inflows, the net present value is a decreasing function of the interest rate, so a negativ… | fact | elsewhere | Internal Rate of Return: “When the signature is negative at issue and positive afterward, the NPV falls steadily as the rate …” |

</details>

<details><summary><code>fm-453</code> · gap</summary>

Tagged pages: Bond Amortization, Accumulation of Discount, Book Value, Redemption Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a bond bought at a premium or discount, the amortization of premium or accumulation of discount in each successive coupon grows geometr… | fact | tagged | Bond Amortization: “The principal adjustments form a geometric progression with ratio $1 + j$ and add up to the premium…” |
| The book value of a bond just after a coupon payment is the amount the bond's price has been adjusted to, equal to the purchase price plus … | definition | tagged | Bond Amortization: “$B_t = B_{t-1} - PR_t$” |
| The total accumulation of discount over the first t coupons equals the first-period accumulation times the accumulated value annuity-immedi… | formula | missing |  |
| To find the yield rate from two cumulative accumulation amounts at times t and 2t, divide the two expressions and use (1+i)^{2t}-1 = [(1+i)… | procedure | missing |  |
| Just after the final coupon payment, a bond's book value equals its redemption value. | fact | tagged | Bond Amortization: “$B_t$ is the book value just after the $t$-th coupon, starting at $B_0 = P$ and ending at $B_n = C$.” |

</details>

<details><summary><code>fm-454</code> · answerable</summary>

Tagged pages: Bond Amortization, Accumulation of Discount, Book Value, Geometric Progression

| Item | Kind | Status | Where |
|---|---|---|---|
| The book value of a bond is the amortized value of the purchase price, equal to the present value of the remaining payments at the yield ra… | definition | tagged | Bond Amortization: “$$B_t = B_{t-1} - PR_t$$” |
| For a bond bought at a discount, the amount for accumulation of discount (the yearly increase in book value) grows geometrically from perio… | fact | tagged | Bond Amortization: “The principal adjustments form a geometric progression with ratio $1 + j$ and add up to the premium…” |
| Immediately after the final coupon is paid (before the redemption payment is counted), the book value equals the redemption value, so the f… | fact | tagged | Book Value: “At time 0, $BV_0 = P$ (the purchase price). At time $n$, $BV_n = C$ (the redemption value).” |
| To find the yield rate from two book values at consecutive coupon dates, compute the successive book value changes (accumulation of discoun… | procedure | tagged | Bond Amortization: “The principal adjustments form a geometric progression with ratio $1 + j$ and add up to the premium…” |

</details>

<details><summary><code>fm-455</code> · untagged</summary>

Tagged pages: Bond Price, Coupon Rate, Yield Rate, Effective Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A bond whose coupon rate per period equals the yield rate per period sells at par, so its price equals its face (redemption) amount. | fact | tagged | Coupon Rate: “When the coupon rate equals the yield rate ($r = j$ for $F = C$), the bond prices at par.” |
| The price of a bond is the present value of its coupons (coupon amount times an annuity-immediate factor at the per-period yield) plus the … | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| Convert a nominal annual rate convertible m times per year to an effective rate for another period length (e.g. semiannual or annual) by co… | procedure | elsewhere | Nominal Interest Rate Convertible m-thly: “$$\left(1 + \frac{i^{(m)}}{m}\right)^m = 1 + i$$” |
| Solve for an unknown number of periods in a bond price equation (given price, coupon, redemption, yield) using a financial calculator's N f… | procedure | tagged | Yield Rate (collapsed): “Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives…” |
| Match the coupon frequency of each bond to a yield rate of the same period length: a bond paying coupons every period is priced using the e… | procedure | elsewhere | Term of Bond: “The number of [[Coupon]] payments: $n = \text{term} \times m$ where $m$ = payments per year” |

</details>

<details><summary><code>fm-456</code> · untagged</summary>

Tagged pages: Bond Amortization, Amortization of Premium, Book Value, Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| The price of a bond equals the present value of its coupons plus the present value of the redemption amount, discounted at the yield rate: … | formula | elsewhere | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| The coupon per period equals the coupon rate per period times the face amount, and the yield rate per period is the nominal annual yield co… | definition | linked | Coupon: “For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot…” |
| The premium at purchase is the bond price minus the redemption value (here, face amount); a bond is bought at a premium when the price exce… | definition | tagged | Premium: “A **premium** bond is a [[Bonds\\|bond]] whose price $P$ is above its [[Redemption Value\\|redemption…” |
| Cumulative premium amortization through a given time equals the initial price minus the current book value, and book value decreases toward… | fact | tagged | Book Value: “For a **premium bond** ($P > C$), the book value decreases from $P$ toward $C$ over time (amortizat…” |
| Book value of a bond immediately after a coupon is found prospectively as the present value of the remaining coupons and redemption value a… | procedure | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |
| The present value of an n-period annuity-immediate is a_{n\|i} = (1 − v^n)/i, with v = 1/(1+i). | formula | elsewhere | Annuity Immediate: “$$a_{\overline{n}\\|} = \frac{1-v^n}{i}$$” |
| To find when a threshold is first crossed, solve for the (possibly non-integer) number of periods using logarithms, then take the next whol… | procedure | elsewhere | Number of Periods: “Under compound interest $n$ need not be a whole number — $(1+i)^t$ is defined for every real $t$.” |

</details>

<details><summary><code>fm-457</code> · answerable</summary>

Tagged pages: Bond Amortization, Book Value, Bond Price

| Item | Kind | Status | Where |
|---|---|---|---|
| The book value of a bond immediately after a coupon payment equals the present value of the remaining coupons plus the present value of the… | definition | tagged | Book Value: “$$BV_k = Fr \cdot a_{\overline{n-k}\\|j} + C \cdot v^{n-k}$$” |
| The price of a bond is the present value of its coupons (coupon times annuity-immediate factor a_{n\|i}) plus the present value of the rede… | formula | tagged | Bond Price: “$$P = Fr \cdot a_{\overline{n}\\|j} + C \cdot v^n$$” |
| A bond with coupons paid m times per year and a nominal annual yield compounded m times per year has a per-period yield rate of the nominal… | fact | tagged | Bond Price: “Per-period values: $F = C = 1000$, $r = 4\% = 0.04$, $j = 3\% = 0.03$, $n = 20$.” |
| The price of a bond can be split at an intermediate time: the price equals the present value of coupons up to that time plus the present va… | procedure | tagged | Book Value: “$$BV_k = P(1+j)^k - Fr \cdot s_{\overline{k}\\|j}$$” |

</details>

<details><summary><code>fm-458</code> · gap</summary>

Tagged pages: Duration, Modified Duration, Cash Flow

| Item | Kind | Status | Where |
|---|---|---|---|
| Modified duration of a cash flow stream is the negative of the derivative of the present value with respect to the interest rate divided by… | definition | missing |  |
| The present value of a set of cash flows is the sum of each cash flow times (1+i)^(-t), where t is its time of payment. | formula | linked | Present Value: “For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = …” |
| Differentiate the present value with respect to i term by term, so each cash flow C at time t contributes -t*C*(1+i)^(-t-1) to P'(i), and t… | procedure | linked | Convexity: “$$C_{Mod} = \frac{\displaystyle\sum_{t=1}^{n} t(t+1) \cdot C_t \cdot v^{t+2}}{P}$$” |
| Given a target modified duration, set -P'(i)/P(i) equal to the target and solve for the unknown cash flow amount. | procedure | missing |  |
| Once the unknown cash flow is found, apply it to the second investment's timing, compute its present value and -P'(i), and divide to get it… | procedure | missing |  |

</details>

<details><summary><code>fm-459</code> · untagged</summary>

Tagged pages: Duration, Modified Duration, 1st-Order Linear Approximation, Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a perpetuity-due paying a level amount each year is the payment times 1/d, equivalently payment/i times (1+i), i.e. th… | formula | tagged | Perpetuity: “each payment comes one period earlier than under the perpetuity-immediate, so its value is $(1+i)\,…” |
| Macaulay duration is the present-value-weighted average time of the cash flows: the sum of t times the PV of the payment at time t, divided… | definition | linked | Macaulay Duration: “**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, whe…” |
| The present value of a perpetuity-immediate with payments increasing 1, 2, 3, ... is (Ia) = 1/(i·d) = 1/i + 1/i^2 for the perpetuity-due fo… | formula | elsewhere | Increasing Annuity: “With no end date, the increasing [[Perpetuity\\|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(…” |
| Modified duration equals Macaulay duration divided by (1+i), i.e. D_mod = D_mac/(1+i), and equals the negative relative derivative of price… | formula | tagged | Duration: “$$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The first-order modified duration approximation estimates the new price as P(i') ≈ P(i)[1 − (i' − i)·D_mod]. | formula | elsewhere | 1st-Order Macaulay Approximation: “$P(i) \approx P(i_0)\left[1 - (i - i_0)\,D_{Mod}\right]$” |
| Bond/annuity present values move inversely to interest rates, so a decrease in the interest rate raises the estimated present value (positi… | fact | linked | Yield Rate: “Bond prices and yields move in opposite directions: if the yield rises, the price falls, and vice v…” |

</details>

<details><summary><code>fm-460</code> · gap</summary>

Tagged pages: Duration, Modified Duration, 1st-Order Linear Approximation, Geometric Increasing Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a geometric perpetuity-immediate with first payment K and payments growing at rate r per period is K/(i - r), valid fo… | formula | tagged | Geometric Increasing Perpetuity: “For a first payment $P$, multiply by $P$.” |
| Modified duration is the negative of the derivative of the price with respect to the interest rate divided by the price: D_MOD(i) = -P'(i)/… | definition | tagged | Modified Duration: “$$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$” |
| The first-order modified approximation of price at interest rate i from initial rate i0 is P(i) ≈ P(i0)[1 - (i - i0) D_MOD(i0)]. | formula | tagged | 1st-Order Linear Approximation: “$$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j = -\frac{D_{Mac}}{1+j} \cdot \Delta j$$” |
| The percentage error of an estimate E of the true value P is (E - P)/P. | definition | missing |  |

</details>

<details><summary><code>fm-461</code> · gap</summary>

Tagged pages: Duration, Macaulay Duration, 1st-Order Macaulay Approximation, Geometric Increasing Perpetuity

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a geometric perpetuity-due with first payment 1 and payment growth rate r at effective rate i is (1+i)/(i−r), i.e., th… | formula | tagged | Geometric Increasing Perpetuity: “Paid at the start of each period (a perpetuity-due, first payment now), each payment comes one peri…” |
| Macaulay duration of a cash-flow stream is D_MAC = (1+i)(−P'(i))/P(i), i.e., the present-value-weighted average time of the payments, expre… | formula | tagged | Macaulay Duration: “$$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_…” |
| The first-order Macaulay approximation estimates the price at rate i from the price at initial rate i0 as P(i0)·((1+i0)/(1+i))^{D_MAC(i0)},… | formula | tagged | 1st-Order Macaulay Approximation: “$$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{D_{Mac}}$$” |
| The percentage error of an estimate E of a true value P is (E−P)/P. | definition | missing |  |

</details>

<details><summary><code>fm-462</code> · untagged</summary>

Tagged pages: Loan Amortization, Outstanding Balance, Nominal Interest Rate

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal annual interest rate convertible m times per year corresponds to an effective rate per period equal to the nominal rate divided b… | definition | tagged | Nominal Interest Rate: “Rather than crediting interest once at year-end, the year is divided into $m$ sub-periods each earn…” |
| The outstanding loan balance immediately after a payment is the amount of principal still owed, which can be computed prospectively or retr… | definition | tagged | Outstanding Balance: “**Outstanding balance** (or outstanding loan balance) is the amount still owed on a loan at a given…” |
| Using the retrospective method, the outstanding balance after k payments equals the original loan accumulated with interest for k periods m… | procedure | tagged | Outstanding Balance: “$$OB_k = L(1+i)^k - P \cdot s_{\overline{k}\\|i}$$” |
| The accumulated value at the time of the last payment of an n-period level annuity-immediate with payment 1 is s_angle(n) = ((1+i)^n - 1)/i. | formula | elsewhere | Annuity Immediate: “$$s_{\overline{n}\\|} = \frac{(1+i)^n - 1}{i}$$” |
| The retrospective method does not require knowing the total number of payments, whereas the prospective method does, because it discounts t… | fact | tagged | Outstanding Balance: “The prospective method needs only the remaining payments; the retrospective method needs only the o…” |

</details>

<details><summary><code>fm-an-001</code> · answerable</summary>

Tagged pages: Time Value of Money, Time Value of Money Equations

| Item | Kind | Status | Where |
|---|---|---|---|
| The present value of a single future payment FV due in n years at annual effective rate i is PV = FV / (1+i)^n. | formula | linked | Interest Rate: “$$\text{PV} = \frac{\text{FV}}{(1+i)^n}$$” |
| An annual effective interest rate is the percentage growth of money over one year, with interest compounding annually so that n years of ac… | definition | linked | Interest Rate: “The **effective annual interest rate** is the interest earned over a year per unit invested at the …” |
| The discount factor v = 1/(1+i) converts a payment due n years from now to its present value by multiplying by v^n. | definition | linked | Present Value: “future cash flows are multiplied by the discount factor $v = (1+i)^{-1}$ raised to the number of pe…” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
