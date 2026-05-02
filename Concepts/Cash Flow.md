A **cash flow** is a payment of money at a specific point in time. Cash flows can be positive (inflows/receipts) or negative (outflows/disbursements). Financial mathematics analyzes streams of cash flows by computing their [[Present Value]], [[Accumulated Value]], or [[Net Present Value]] at a given [[Interest Rate]].

A cash flow stream is denoted $\{(C_t, t)\}$ where $C_t$ is the cash flow at time $t$. Its present value is:
$$\text{PV} = \sum_t C_t \cdot v^t$$

Cash flow analysis forms the basis for [[Loans]], [[Bonds]], [[Annuity Immediate|annuities]], and [[Cash Flow Matching]] for liability management.

> [!example]- Valuing an Irregular Cash Flow Stream {💡 Example}
> A project pays $500$ at time 1, $-200$ at time 2 (an outflow), and $1{,}000$ at time 3. Find the PV at $i = 8\%$.
>
> > [!answer]- Answer
> > $$\text{PV} = \frac{500}{1.08} + \frac{-200}{1.08^2} + \frac{1000}{1.08^3} = 462.96 - 171.47 + 793.83 = 1085.32$$
