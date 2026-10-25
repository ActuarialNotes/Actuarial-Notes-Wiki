# Answerability: Exam FM-2 (SOA)

Run `answerability-20261025-fm` · 133 questions checked of 133 attempted · cost $22.66

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away or on a prerequisite exam's page | 30 | 23% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 48 | 36% |
| **Gap** — something the solution uses is taught on no page | 54 | 41% |
| No requirements listed | 1 | |

Requirements: 620 — tagged 347 (56%), linked 83 (13%), prerequisite 0 (0%), elsewhere 113 (18%), missing 77 (12%)
Not checked: 1 off syllabus.

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 133 | 30 | 48 | 54 (41%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Macaulay Duration.md` — 5 question(s)

- `fm-030` (formula): Macaulay duration equals the negative of the derivative of price with respect to yield, divided by price, times one plus the effective annual yield: D = -(dP/di)/P × (1+i).
- `fm-050` (fact): For a bond bought at par (coupon rate equals yield rate), the Macaulay duration in periods equals the annuity-due value ä_{n\|} at the yield rate.
- `fm-053` (fact): For a bond bought at par (coupon rate equals yield rate), the price equals par and the Macaulay duration equals the annuity-due present value factor at the yield rate for the remaining term.
- `fm-053` (procedure): Just before a coupon is paid, the remaining cash flows are those of the bond one period earlier, each occurring one year sooner, so the Macaulay duration equals the earlier duration minus one year (yield unchanged).
- `fm-100` (procedure): Given a known Macaulay duration, solve the duration equation for the discount factor v (and hence the yield rate), then reuse that same v when computing the duration of another cash flow stream at the same yield rate.
- `fm-102` (fact): For a perpetuity-due paying 1 per year, the Macaulay duration (starting at time 0) equals 1/i, so the interest rate can be found as the reciprocal of the duration.

### `Concepts/Equation of Value.md` — 4 question(s)

- `fm-010` (procedure): To find an unknown deposit, set up an equation of value in which the interest earned over a period, computed as the opening balance (prior deposits accumulated plus the new deposit) times [a(t2)/a(t1) - 1], equals the stated amount, then solve for the unknown.
- `fm-075` (procedure): When cash flows occur at times t and 2t, substitute x = v^t so that the equation of value becomes a quadratic in x, then solve it with the quadratic formula and take the positive root.
- `fm-083` (fact): The account balance just before the first withdrawal equals the accumulated value of all prior deposits at that time, which also equals the present value at that time of all future withdrawals.
- `fm-117` (procedure): To solve for an unknown quantity defined by two equivalent expressions, set the expressions equal and solve for the common term (here (1+i)^n - 1) without needing to determine n itself.

### `Concepts/Loan Amortization.md` — 4 question(s)

- `fm-006` (procedure): When each payment is a fixed multiple m of the interest due, the balance is reduced by the factor (1 - (m-1)i) each period, so the balance after n periods is the original loan times (1 - (m-1)i)^n.
- `fm-069` (procedure): To reamortize a loan at a new interest rate, treat the current outstanding balance as a new loan over the remaining number of payments (maturity unchanged) and compute the new level payment as balance divided by the annuity factor at the new rate.
- `fm-089` (procedure): Convert a count of end-of-month payment periods to a calendar date by counting forward from the first payment date, with the k-th payment occurring k-1 months after the first payment date.
- `fm-092` (procedure): To find the interest rate from two pieces of amortization information, divide the two expressions to eliminate the payment P, solve for v^n (or v^5) from the ratio, then obtain i from v = 1/(1+i).

### **no page for Varying Interest Rates** — 3 question(s)

- `fm-078` (procedure): When the interest rate changes over time, split the deposits by rate regime: accumulate each segment's annuity to the time of the rate change using that segment's rate, then accumulate that value forward at the later rate, and add the contributions of the remaining deposits.
- `fm-080` (procedure): To value an annuity under a rate change, take the annuity-due at the initial rate for the payments before the change and add the annuity-due at the later rate for the remaining payments, discounted to time 0 using the initial rate for the years before the change.
- `fm-130` (procedure): When the interest rate changes over time, split the timeline at the rate change: accumulate the earlier payments to the change date at the first rate, then accumulate that value at the new rate for the remaining period.
- `fm-130` (procedure): Payments made after the rate change are accumulated separately as their own annuity at the new rate, and the two accumulated values are added to get the total balance.

### `Concepts/Force of Interest.md` — 3 question(s)

- `fm-046` (fact): When the integrand is a constant multiple of f'(r)/f(r), its integral is that multiple times ln f(r), so the integral from 0 to t equals the multiple times ln(f(t)/f(0)).
- `fm-086` (fact): The integral of 1/(t+1) is ln(t+1), so exp of the integral from a to b equals (b+1)/(a+1).
- `fm-115` (procedure): To solve for an unknown interest rate from an annuity equation, substitute X = e^{-kδ} (a power of the discount factor) so that e^{-2kδ} = X^2 and the equation becomes a polynomial in X, then cancel the common factor (1 - X) since X ≠ 1 when the interest rate is positive.

### `Concepts/Perpetuity.md` — 3 question(s)

- `fm-008` (procedure): The value of a perpetuity immediately after a payment is the same as its value at time zero, because the remaining payments form an identical perpetuity-immediate starting one period later.
- `fm-024` (procedure): For a perpetuity with payments every k years, treat it as a sum of payments discounted by v^k, 2k, 3k,... and sum the geometric series to get payment times v^k/(1-v^k), then solve for v^k.
- `fm-117` (procedure): For payments made every n years (not every year), find the present value of the perpetuity-immediate by using the effective rate per n-year period, (1+i)^n - 1, so PV = payment / ((1+i)^n - 1) = payment * v^n/(1 - v^n).

### **no page for Bond Valuation** — 2 question(s)

- `fm-053` (fact): Immediately after a coupon is paid, the bond is a par bond with one fewer period remaining, and its duration is computed from the remaining cash flows only (the paid coupon is excluded).
- `fm-098` (procedure): To find the term of a bond, solve the prospective book value equation for the remaining number of periods using logarithms, then add the elapsed periods and convert periods to years (divide by the number of periods per year).

### **no page for Geometric Series** — 2 question(s)

- `fm-116` (formula): The sum of a finite geometric series with first term a, ratio r and n terms is a(1 - r^n)/(1 - r).
- `fm-121` (formula): The sum of a finite geometric series with first term 1, ratio r and n+1 terms is (1 - r^(n+1))/(1 - r).

### `Concepts/Annuity Due.md` — 2 question(s)

- `fm-002` (procedure): To find the accumulated value of level deposits made at the start of each k-year period, accumulate each deposit at the effective rate for its remaining time and sum the resulting terms, which form a geometric series with ratio (1+i)^k.
- `fm-015` (formula): The annuity-due present value factor is ä_{n\|i} = (1 − v^n)/d = (1 − v^n)·(1+i)/i, where v = 1/(1+i). — *the locator quoted text that isn't on the page:* “> $$= \frac{1-v^n}{d}$$”

### `Concepts/Annuity Immediate.md` — 2 question(s)

- `fm-014` (procedure): Decompose a payment stream with a step increase in level into a sum of level annuities covering different time spans (e.g., a stream of 2P over a later period equals P over the whole period plus P over the later period).
- `fm-077` (procedure): Count only the level payments that occur on or before the valuation date (complete periods elapsed), so payments falling after the evaluation date are excluded from the equation.

### `Concepts/Compound Interest.md` — 2 question(s)

- `fm-003` (procedure): Interest earned during a single period equals the balance at the end of the previous period times the periodic rate (equivalently, the difference of consecutive accumulated values).
- `fm-014` (fact): Powers of the accumulation factor combine multiplicatively: if (1+i)^n = k, then (1+i)^{jn} = k^j.

### `Concepts/Discount Factor.md` — 2 question(s)

- `fm-016` (fact): Powers of the discount factor combine by exponent rules, so v^(2n) = (v^n)^2, allowing known v^n to determine v^(2n).
- `fm-128` (fact): Powers of the discount factor are related by v^16 = (v^8)^2, so an equation in v^8 and v^16 becomes a quadratic in v^8 that can be solved with the quadratic formula.

### `Concepts/Geometric Increasing Annuity.md` — 2 question(s)

- `fm-032` (procedure): For cash flows growing at a constant rate g discounted at rate i, rewrite the discount factor as the product v(1+g) = 1/(1+j), giving an equivalent level-payment problem at modified rate j = (i-g)/(1+g).
- `fm-083` (formula): The accumulated value at the end of n periods of a geometrically increasing annuity-immediate with first payment P is P[(1+i)^n-(1+g)^n]/(i-g).

### **no page for Amortization with Rounded Payments** — 1 question(s)

- `fm-090` (procedure): Rounding a payment up to the next multiple of a given amount means taking the smallest multiple of that amount that is at least the computed payment.

### **no page for Amount of Interest Earned in a Period** — 1 question(s)

- `fm-022` (definition): The interest earned during the nth year equals the accumulated value at time n minus the accumulated value at time n-1, i.e., A(n) - A(n-1).

### **no page for Annuity Payable More Frequently Than Interest Is Convertible** — 1 question(s)

- `fm-074` (procedure): Payments that are level within each year but step up annually can be grouped into annual blocks, each valued as a single payment at year-end (its accumulated value at the end of the year) and discounted at the effective annual rate.

### **no page for Bond Pricing** — 1 question(s)

- `fm-095` (procedure): Solve the bond price equation for the coupon rate to get r = (P/F)(1/a_{n\|}) − v^n/a_{n\|}, showing r is a linear function of 1/F when price, term and yield are held fixed.
- `fm-095` (procedure): When bonds share the same term, price and yield, the slope and intercept constants in the linear relation r = x(1/F) + y are the same for all bonds, so they can be determined from two bonds and then applied to a third.

### **no page for Bond Pricing (Prospective Book Value)** — 1 question(s)

- `fm-097` (procedure): To find the number of remaining periods of a bond from a known book value, substitute the known coupon, redemption value and yield into the prospective formula and solve for the discount factor v^(n−t), then take logarithms to get the remaining term; add the elapsed periods t to get total term n.

### **no page for Effective Rate of Discount** — 1 question(s)

- `fm-023` (definition): The effective discount rate d equals 1 − v (equivalently i·v), the relationship used to rewrite 1 − v as d. — *the locator quoted text that isn't on the page:* “$$= 1 - v$$”

### **no page for Geometric Annuity** — 1 question(s)

- `fm-121` (fact): When 1+i = (1+g)^2, the ratio (1+g)/(1+i) equals 1/(1+g), so a growing annuity with growth rate g reduces to a level annuity-due-type sum discounted at rate g.

### **no page for Interest Credited at Conversion Dates** — 1 question(s)

- `fm-062` (fact): When interest is credited only at the end of each conversion period, the account value is a step function, so a threshold is first met at the next conversion date at or after the continuous-time solution, which is the next multiple of the conversion period length.

### **no page for Interest Earned** — 1 question(s)

- `fm-010` (definition): Interest earned over a period equals the fund balance at the end of the period minus the balance at the start of the period (including any deposits made at the start, but excluding deposits made during the period).

### **no page for Leveraged Investment (Borrowing to Invest)** — 1 question(s)

- `fm-094` (procedure): Compute the investor's net periodic cash flow when borrowing to invest by subtracting the interest-only loan payment from the investment income, and compute the net terminal cash flow by subtracting loan principal repayment from the investment's redemption proceeds.

### **no page for Life Annuity Income Conversion** — 1 question(s)

- `fm-035` (procedure): To find the fund needed at retirement, divide the desired periodic income by the income rate per unit of fund (e.g. income per 1000 of fund) and scale up by the unit size.

### **no page for Loan Balance** — 1 question(s)

- `fm-130` (fact): With no repayments, the loan balance equals the accumulated value of all borrowed amounts, including the final amount received at that time; the interest-free wait after year four is irrelevant to the balance at that date.

### **no page for Loan Refinancing** — 1 question(s)

- `fm-049` (procedure): When a loan is refinanced, the outstanding balance at the refinancing date becomes the principal of the new loan, which is repaid using the new rate and new term.

### **no page for Perpetuities** — 1 question(s)

- `fm-066` (formula): The present value of a perpetuity-immediate paying 1 every k periods (first payment at time k) at effective rate i per period is 1/((1+i)^k - 1).

### **no page for Present Value of Cash Flows** — 1 question(s)

- `fm-056` (formula): The derivative with respect to i of a cash flow C at time distance t from the focal date, valued as C(1+i)^(-t), is -tC(1+i)^(-t-1), so a payment before the focal date (negative t) contributes with the opposite sign to a payment after it.

### **no page for Solving for Time Using Logarithms** — 1 question(s)

- `fm-111` (procedure): To solve for an unknown number of periods in an equation involving v^n, isolate the discount factor (1+i)^(-n) and take logarithms of both sides.

### **no page for Solving for the Interest Rate** — 1 question(s)

- `fm-002` (procedure): A polynomial equation in a power of (1+i), such as x^2 - 5x + 4 = 0 with x = (1+i)^n, is solved by substitution and factoring; reject non-positive or non-meaningful roots (e.g., x = 1 giving i = 0, which fails the stated condition) and recover i from the valid root.

### **no page for Time Measurement in Interest Problems** — 1 question(s)

- `fm-077` (procedure): Measure the time between two calendar dates in months and use the matching period rate (months with the monthly rate) when discounting a balance, e.g. Jan 1 to May 1 ten years later is 124 months.

### **no page for Time Periods and Timeline** — 1 question(s)

- `fm-003` (procedure): The last 6 months of the 8th year is the 16th semiannual period, so interest in it is earned on the balance after 15 semiannual periods.

### **no page for Timing of Payments** — 1 question(s)

- `fm-066` (fact): A payment due at the beginning of year two occurs at time 1, so a perpetuity paying every three years starting then has payments at times 1, 4, 7, ...

### **no page for Zero-Coupon Bond** — 1 question(s)

- `fm-091` (fact): A zero-coupon bond bought at a price expressed as a fraction of redemption value grows to a redemption value equal to the reciprocal of that price per unit invested.
- `fm-091` (procedure): A deposit made at the beginning of month k is invested in a bond maturing at the end of the accumulation horizon, so its term is the remaining months and its price is the one for that maturity (e.g., the first deposit uses the longest maturity, the last deposit uses a 1-month bond).

### `Concepts/Accumulation Function.md` — 1 question(s)

- `fm-086` (procedure): For a period with changing interest (a different rate in each period), the overall accumulation factor is the product of the accumulation factors for each consecutive period.

### `Concepts/Cash Flow Matching.md` — 1 question(s)

- `fm-109` (procedure): Express the total cost of the portfolio as a function of one bond's face amount using the matching constraints, and minimize it by taking the bond with the lowest cost per unit of cash flow as large as feasible (non-negativity bounds the quantities).
- `fm-109` (fact): Profit is the initial deposit minus the cost of the matching portfolio.

### `Concepts/Decreasing Annuity.md` — 1 question(s)

- `fm-005` (fact): When a loan or fund earning interest is reduced by a level principal amount each period, the interest paid each period forms an arithmetic decreasing sequence, falling by the interest rate times the principal reduction each period.

### `Concepts/Effective Rate.md` — 1 question(s)

- `fm-022` (formula): With a deposit P at time 0 and annual effective rate i, the interest earned in year n equals P(1+i)^(n-1) * i.
- `fm-022` (procedure): To find an unknown effective rate from two equations that share the same unknown quantity, divide one equation by the other to eliminate the common amount, then solve for (1+i) by taking a root and subtract 1 to obtain i.

### `Concepts/Forward Rate.md` — 1 question(s)

- `fm-039` (procedure): To fund a liability at time 3 using a bond maturing at time 2, the proceeds at time 2 are reinvested at the forward rate for one year, so the needed amount at time 2 is the liability divided by (1 + forward rate).

### `Concepts/Geometric Increasing Perpetuity.md` — 1 question(s)

- `fm-085` (formula): A continuous perpetuity whose payment rate grows geometrically as (1+g)^s has present value 1/(δ - ln(1+g)) at its start, obtained from the integral of e^{-(δ-ln(1+g))s} over 0 to infinity (requires δ > ln(1+g)).

### `Concepts/Immunization.md` — 1 question(s)

- `fm-103` (fact): The need for immunization does not depend on the shape or slope of the yield curve (e.g., long-term rates being lower than short-term rates does not reduce the need), since interest rate changes can still affect asset and liability values.

### `Concepts/Increasing Annuity.md` — 1 question(s)

- `fm-026` (procedure): When payments grow with inflation from today's level, the first payment at time 1 equals the current amount times (1 + inflation rate), and payment t equals the current amount times (1 + inflation rate)^t.

### `Concepts/Level Payment Annuity.md` — 1 question(s)

- `fm-002` (procedure): Payments made every k years can be treated as an annuity whose effective rate per k-year period is (1+i)^k - 1, so the accumulated value equals the payment times s_angle(n)/a_angle(k) evaluated at the annual rate i (for payments at the start of each k-year period).

### `Concepts/Present Value.md` — 1 question(s)

- `fm-105` (formula): The derivative with respect to (1+i) of a cash flow term C(1+i)^k is k·C(1+i)^(k−1), used to obtain the slope condition P'(i)=0.

### `Concepts/Redington Immunization.md` — 1 question(s)

- `fm-104` (procedure): To find unknown asset cash flows, define the net present value function P(i) as assets minus liabilities and solve P(i0)=0 and P'(i0)=0 simultaneously at the valuation interest rate.
- `fm-104` (fact): If the second derivative of the asset-minus-liability present value at the valuation rate is negative (a local maximum rather than minimum), the full immunization (Redington) conditions fail because a rate change need not leave assets exceeding liabilities.

### `Concepts/Time Value of Money.md` — 1 question(s)

- `fm-075` (fact): Delaying deposits reduces their accumulated value at a fixed future date, so the largest n meeting the accumulation requirement is the floor of the solved n.

### `Concepts/Yield Rate.md` — 1 question(s)

- `fm-078` (procedure): To find the yield rate for a deposit annuity with a known accumulated value, set the annuity accumulation s-double-dot_{n\|j} times the deposit equal to the final fund value and solve for j numerically or by iteration, then convert j to the annual effective rate via (1+j)^(1/k) - 1.

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

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Loan Amortization | 5 | For payments whose pattern changes partway, split the payment stream into segme…; Value a payment stream with a level portion followed by an arithmetically decre…; When the interest rate changes over time, split the payments into periods by ra… |
| Geometric Increasing Perpetuity | 4 | The present value of a perpetuity with a payment pattern that changes over time…; A deferred cash flow stream is valued by computing its present value as of the …; When the interest rate changes over time, value a perpetuity by splitting it at… |
| Cash Flow Matching | 3 | To match a liability with a zero-coupon bond, choose the bond amount so its mat…; The total purchase cost of the matching portfolio is the sum of the prices of t…; A bond selling at par with coupon rate c pays coupons of c times face at each p… |
| Yield Rate | 3 | To find the yield of a bond whose price was computed from spot rates, set the p…; Solve for an unknown periodic interest rate from a given annuity accumulated va…; To find an unknown periodic interest rate from a known annuity value a_{n\|j}, … |
| Arithmetic Increasing Annuity | 2 | A payment stream that increases by a constant amount each period, starting at t…; Present value is linear: the present value of a stream that is a multiple of a … |
| Term of Annuity | 2 | The smaller final payment is found by the equation of value: fund value at the …; Find the drop payment by setting the present value of the level payments plus t… |
| Term of Loan | 2 | To find the number of level payments n, solve payment × a_n = loan balance for …; To find the number of payments n when the loan amount, payment and rate are kno… |
| Capital Budgeting | 1 | Compare two projects by taking the difference of their cash flows and discounti… |
| Coupon | 1 | A bond's periodic coupon equals the coupon rate times the par (face) value, wit… |
| Economic Value | 1 | The reinvestment rate and the NPV discount rate can differ; reinvestment rate i… |
| Effective Rate | 1 | The equivalent effective monthly rate for an annual effective rate i is j = (1+… |
| Interest Rate | 1 | To evaluate a balance from v^n, recover i from v^n = (1+i)^{-n} by taking the n… |
| Level Payment Annuity | 1 | To find the first payment of a perpetuity from its price, set the price equal t… |
| Principal | 1 | The interest portion of a loan payment equals the interest rate times the outst… |
| Redington Immunization | 1 | To find the amounts invested in two zero-coupon bonds that match a target prese… |
| Reinvestment of Coupons | 1 | When coupons are reinvested at a different rate, the investor's overall yield i… |
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

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
