# Answerability: Exam FM-2 (SOA)

Run `answerability-20261025-fm` · 51 questions checked of 51 attempted · cost $7.90

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away or on a prerequisite exam's page | 13 | 25% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 17 | 33% |
| **Gap** — something the solution uses is taught on no page | 20 | 39% |
| No requirements listed | 1 | |

Requirements: 226 — tagged 130 (58%), linked 33 (15%), prerequisite 0 (0%), elsewhere 36 (16%), missing 27 (12%)
Not checked: 1 off syllabus.

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 51 | 13 | 17 | 20 (39%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Annuity Due.md` — 2 question(s)

- `fm-002` (procedure): To find the accumulated value of level deposits made at the start of each k-year period, accumulate each deposit at the effective rate for its remaining time and sum the resulting terms, which form a geometric series with ratio (1+i)^k.
- `fm-015` (formula): The annuity-due present value factor is ä_{n\|i} = (1 − v^n)/d = (1 − v^n)·(1+i)/i, where v = 1/(1+i). — *the locator quoted text that isn't on the page:* “> $$= \frac{1-v^n}{d}$$”

### `Concepts/Compound Interest.md` — 2 question(s)

- `fm-003` (procedure): Interest earned during a single period equals the balance at the end of the previous period times the periodic rate (equivalently, the difference of consecutive accumulated values).
- `fm-014` (fact): Powers of the accumulation factor combine multiplicatively: if (1+i)^n = k, then (1+i)^{jn} = k^j.

### `Concepts/Macaulay Duration.md` — 2 question(s)

- `fm-030` (formula): Macaulay duration equals the negative of the derivative of price with respect to yield, divided by price, times one plus the effective annual yield: D = -(dP/di)/P × (1+i).
- `fm-050` (fact): For a bond bought at par (coupon rate equals yield rate), the Macaulay duration in periods equals the annuity-due value ä_{n\|} at the yield rate.

### `Concepts/Perpetuity.md` — 2 question(s)

- `fm-008` (procedure): The value of a perpetuity immediately after a payment is the same as its value at time zero, because the remaining payments form an identical perpetuity-immediate starting one period later.
- `fm-024` (procedure): For a perpetuity with payments every k years, treat it as a sum of payments discounted by v^k, 2k, 3k,... and sum the geometric series to get payment times v^k/(1-v^k), then solve for v^k.

### **no page for Amount of Interest Earned in a Period** — 1 question(s)

- `fm-022` (definition): The interest earned during the nth year equals the accumulated value at time n minus the accumulated value at time n-1, i.e., A(n) - A(n-1).

### **no page for Effective Rate of Discount** — 1 question(s)

- `fm-023` (definition): The effective discount rate d equals 1 − v (equivalently i·v), the relationship used to rewrite 1 − v as d. — *the locator quoted text that isn't on the page:* “$$= 1 - v$$”

### **no page for Interest Earned** — 1 question(s)

- `fm-010` (definition): Interest earned over a period equals the fund balance at the end of the period minus the balance at the start of the period (including any deposits made at the start, but excluding deposits made during the period).

### **no page for Life Annuity Income Conversion** — 1 question(s)

- `fm-035` (procedure): To find the fund needed at retirement, divide the desired periodic income by the income rate per unit of fund (e.g. income per 1000 of fund) and scale up by the unit size.

### **no page for Loan Refinancing** — 1 question(s)

- `fm-049` (procedure): When a loan is refinanced, the outstanding balance at the refinancing date becomes the principal of the new loan, which is repaid using the new rate and new term.

### **no page for Solving for the Interest Rate** — 1 question(s)

- `fm-002` (procedure): A polynomial equation in a power of (1+i), such as x^2 - 5x + 4 = 0 with x = (1+i)^n, is solved by substitution and factoring; reject non-positive or non-meaningful roots (e.g., x = 1 giving i = 0, which fails the stated condition) and recover i from the valid root.

### **no page for Time Periods and Timeline** — 1 question(s)

- `fm-003` (procedure): The last 6 months of the 8th year is the 16th semiannual period, so interest in it is earned on the balance after 15 semiannual periods.

### `Concepts/Annuity Immediate.md` — 1 question(s)

- `fm-014` (procedure): Decompose a payment stream with a step increase in level into a sum of level annuities covering different time spans (e.g., a stream of 2P over a later period equals P over the whole period plus P over the later period).

### `Concepts/Decreasing Annuity.md` — 1 question(s)

- `fm-005` (fact): When a loan or fund earning interest is reduced by a level principal amount each period, the interest paid each period forms an arithmetic decreasing sequence, falling by the interest rate times the principal reduction each period.

### `Concepts/Discount Factor.md` — 1 question(s)

- `fm-016` (fact): Powers of the discount factor combine by exponent rules, so v^(2n) = (v^n)^2, allowing known v^n to determine v^(2n).

### `Concepts/Effective Rate.md` — 1 question(s)

- `fm-022` (formula): With a deposit P at time 0 and annual effective rate i, the interest earned in year n equals P(1+i)^(n-1) * i.
- `fm-022` (procedure): To find an unknown effective rate from two equations that share the same unknown quantity, divide one equation by the other to eliminate the common amount, then solve for (1+i) by taking a root and subtract 1 to obtain i.

### `Concepts/Equation of Value.md` — 1 question(s)

- `fm-010` (procedure): To find an unknown deposit, set up an equation of value in which the interest earned over a period, computed as the opening balance (prior deposits accumulated plus the new deposit) times [a(t2)/a(t1) - 1], equals the stated amount, then solve for the unknown.

### `Concepts/Force of Interest.md` — 1 question(s)

- `fm-046` (fact): When the integrand is a constant multiple of f'(r)/f(r), its integral is that multiple times ln f(r), so the integral from 0 to t equals the multiple times ln(f(t)/f(0)).

### `Concepts/Forward Rate.md` — 1 question(s)

- `fm-039` (procedure): To fund a liability at time 3 using a bond maturing at time 2, the proceeds at time 2 are reinvested at the forward rate for one year, so the needed amount at time 2 is the liability divided by (1 + forward rate).

### `Concepts/Geometric Increasing Annuity.md` — 1 question(s)

- `fm-032` (procedure): For cash flows growing at a constant rate g discounted at rate i, rewrite the discount factor as the product v(1+g) = 1/(1+j), giving an equivalent level-payment problem at modified rate j = (i-g)/(1+g).

### `Concepts/Increasing Annuity.md` — 1 question(s)

- `fm-026` (procedure): When payments grow with inflation from today's level, the first payment at time 1 equals the current amount times (1 + inflation rate), and payment t equals the current amount times (1 + inflation rate)^t.

### `Concepts/Level Payment Annuity.md` — 1 question(s)

- `fm-002` (procedure): Payments made every k years can be treated as an annuity whose effective rate per k-year period is (1+i)^k - 1, so the accumulated value equals the payment times s_angle(n)/a_angle(k) evaluated at the annual rate i (for payments at the start of each k-year period).

### `Concepts/Loan Amortization.md` — 1 question(s)

- `fm-006` (procedure): When each payment is a fixed multiple m of the interest due, the balance is reduced by the factor (1 - (m-1)i) each period, so the balance after n periods is the original loan times (1 - (m-1)i)^n.

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

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Yield Rate | 2 | To find the yield of a bond whose price was computed from spot rates, set the p…; Solve for an unknown periodic interest rate from a given annuity accumulated va… |
| Arithmetic Increasing Annuity | 1 | A payment stream that increases by a constant amount each period, starting at t… |
| Cash Flow Matching | 1 | To match a liability with a zero-coupon bond, choose the bond amount so its mat…; The total purchase cost of the matching portfolio is the sum of the prices of t… |
| Economic Value | 1 | The reinvestment rate and the NPV discount rate can differ; reinvestment rate i… |
| Geometric Increasing Perpetuity | 1 | The present value of a perpetuity with a payment pattern that changes over time…; A deferred cash flow stream is valued by computing its present value as of the … |
| Loan Amortization | 1 | For payments whose pattern changes partway, split the payment stream into segme… |
| Principal | 1 | The interest portion of a loan payment equals the interest rate times the outst… |
| Reinvestment of Coupons | 1 | When coupons are reinvested at a different rate, the investor's overall yield i… |

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

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
