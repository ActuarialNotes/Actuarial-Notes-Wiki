---
aliases:
  - Deterministic Profit Testing
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0118e361c0d7e5fd9e51f7b7bf335f37e62e35b60a56f450a3d3ea3cace8ad81
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit Testing.md
---

**Profit Testing** projects the cash flows of a long-term insurance or annuity policy year by year, on the insurer's best-estimate basis, to find the profit expected to emerge at the end of each year. The yearly profits per policy in force form the [[Profit Vector|profit vector]], the same profits per policy issued form the [[Profit Signature|profit signature]], and the signature is summarized by its [[Net Present Value|net present value]] at the risk discount rate, its [[Internal Rate of Return|internal rate of return]], its [[Profit Margin|profit margin]] and its [[Discounted Payback Period|discounted payback period]]. The insurer uses the test to set premiums and reserves and to see how sensitive the policy's profit is to each assumption.

> $$\begin{aligned} \mathrm{Pr}_t = {} & \left({}_{t-1}V + P - E_t\right)(1+i) \\ & - q_{x+t-1}\,S - p_{x+t-1}\,{}_tV \end{aligned}$$

> $$\Pi_t = {}_{t-1}p_x\,\mathrm{Pr}_t$$

> $$\text{NPV} = \sum_{t=0}^{n} \Pi_t\,(1+r)^{-t}$$

- **Symbols:** Following Dickson, Hardy & Waters, ${}_{t-1}V$ and ${}_tV$ are the [[Reserve|reserves]] per policy in force at the start and end of year $t$, $P$ is the premium, $E_t$ the expenses paid at the start of year $t$, $i$ the rate the insurer earns on its assets, and $S$ the sum insured. $\mathrm{Pr}_0 = \Pi_0$ is minus the expenses paid at issue, and $r$ is the risk discount rate, the return the shareholders require. A survival benefit $B_t$ adds $-p_{x+t-1}B_t$ to the first block.
- **The cash flows:** Each year the insurer starts with the reserve released from the year before, receives the premium, pays the expenses and earns interest on the balance. It then pays the expected death benefit and sets up the reserve required for each policy still in force.
- **Setting premiums and reserves:** A premium meets a profit criterion when it makes the NPV at $r$ zero, which is an IRR of $r$, or gives a target profit margin. When the reserves do not depend on the premium, each $\mathrm{Pr}_t$ is linear in $P$, so the premium solves a linear equation. **Zeroization** works backward from the last year to set the smallest reserves that remove every negative profit after time 0.
- **Deterministic and stochastic tests:** A deterministic test uses one set of assumptions, and a stress test repeats it on an adverse set. A stochastic test simulates one or more assumptions, most often the investment return, so that the NPV becomes a random variable whose mean, spread and probability of a loss can be reported.

> [!example]- Profit Test of a 5-Year Term Insurance {Example}
> A 5-year term insurance issued to $(60)$ pays \$100,000 at the end of the year of death. The premium is \$500 a year, paid in advance. Initial expenses of \$250 are paid at issue, and expenses of 3% of each premium are paid with the premium. The insurer earns 6% on its assets, and mortality follows the SULT at 5%: $q_{60}$ to $q_{64}$ are $0.003398$, $0.003792$, $0.004234$, $0.004730$ and $0.005288$. Reserves of 84, 134, 140 and 100 per policy in force are held at the end of years 1 to 4. Using a risk discount rate of 10%, find the profit vector, the profit signature and the NPV.
>
> > [!answer]-
> > Each year, $P - E_t = 485$, the interest is 6% of ${}_{t-1}V + 485$, the expected death benefit is $100{,}000\,q_{60+t-1}$, and the expected cost of the year-end reserve is $p_{60+t-1}\,{}_tV$. Before the first premium, $\mathrm{Pr}_0 = -250$.
> >
> > | $t$ | ${}_{t-1}V$ | $P - E_t$ | Interest | Death benefit | ${}_tV$ cost | $\mathrm{Pr}_t$ |
> > |---|---|---|---|---|---|---|
> > | 1 | 0 | 485 | 29.10 | 339.80 | 83.71 | 90.59 |
> > | 2 | 84 | 485 | 34.14 | 379.20 | 133.49 | 90.45 |
> > | 3 | 134 | 485 | 37.14 | 423.40 | 139.41 | 93.33 |
> > | 4 | 140 | 485 | 37.50 | 473.00 | 99.53 | 89.97 |
> > | 5 | 100 | 485 | 35.10 | 528.80 | 0 | 91.30 |
> >
> > The probabilities ${}_{t-1}p_{60}$ that a policy is still in force at the start of each year are $1$, $0.996602$, $0.992823$, $0.988619$ and $0.983943$. Multiplying gives the signature $(-250,\ 90.59,\ 90.14,\ 92.66,\ 88.95,\ 89.83)$.
> > $$
> > \begin{align*}
> > \text{NPV} &= -250 + 90.59v + 90.14v^2 + 92.66v^3 \\
> > &\quad + 88.95v^4 + 89.83v^5 \\
> > &= -250 + 82.35 + 74.50 + 69.62 + 60.75 + 55.78 \\
> > &= 93.00
> > \end{align*}
> > $$
> > Here $v = 1/1.1$. The NPV is positive, so the policy earns more than the 10% the shareholders require.

> [!example]- The Premium That Just Meets the Hurdle Rate {Example}
> For the term insurance above, find the premium that makes the NPV zero at 10%. The reserves do not depend on the premium.
>
> > [!answer]-
> > One more dollar of premium adds $0.97$ to $P - E_t$, so each $\mathrm{Pr}_t$ rises by $0.97(1.06) = 1.0282$ and each $\Pi_t$ by $1.0282\,{}_{t-1}p_{60}$. At 10%, $\ddot{a}_{60:\overline{5}|} = 4.1413$, so the NPV rises by $1.0282(4.1413)/1.1 = 3.8710$ for each dollar.
> > $$
> > \begin{align*}
> > 0 &= 93.00 + 3.8710\,(P - 500) \\
> > P &= 500 - 24.02 \\
> > &= 475.98
> > \end{align*}
> > $$
> > A premium of \$475.98 gives an IRR of exactly 10%, and any higher premium earns more than the shareholders require.

> [!example]- Zeroized Reserves for the Term Insurance {Example}
> Suppose the insurer holds no reserves for the same policy. Find the profit vector, then find the zeroized reserves.
>
> > [!answer]-
> > Without reserves, $\mathrm{Pr}_t = 485(1.06) - 100{,}000\,q_{60+t-1} = 514.10 - 100{,}000\,q_{60+t-1}$, which gives $(-250,\ 174.30,\ 134.90,\ 90.70,\ 41.10,\ -14.70)$. The level premium no longer covers the rising cost of death benefits in year 5, so a reserve is needed at time 4 to make $\mathrm{Pr}_5 = 0$.
> > $$
> > \begin{align*}
> > \left({}_4V + 485\right)(1.06) &= 528.80 \\
> > {}_4V &= 498.87 - 485 \\
> > &= 13.87 \\
> > \mathrm{Pr}_4 &= 514.10 - 473.00 - 0.995270(13.87) \\
> > &= 27.30
> > \end{align*}
> > $$
> > Year 4 stays positive after paying for the reserve, so ${}_3V = 0$ and the zeroized reserves are $(0, 0, 0, 13.87, 0)$. The profit vector becomes $(-250,\ 174.30,\ 134.90,\ 90.70,\ 27.30,\ 0)$, which changes sign only once. The NPV at 10% moves only from 105.99 with no reserves to 105.65, because the reserve is small and held for a single year.

> [!tip]- How it appears on the exam
> - **ALTAM** gives a premium, an expense basis, mortality or a multiple decrement table, reserves, an earned rate and a risk discount rate, and asks for the profit vector and signature, followed by the NPV, IRR, profit margin or discounted payback period.
> - **Premiums and reserves:** Questions then ask for the premium that meets a stated profit objective, or for the reserves found by zeroization, as the Profit Analysis objectives require.
> - **Universal life and equity-linked policies:** The same projection is applied to a [[Universal Life Insurance|universal life]] policy, where the reserve is often the account value, and to [[Equity-Linked Insurance|equity-linked]] cash flows, under best-estimate or stress-test assumptions.

> [!warning]- Exam traps
> - **Vector before signature:** The profit vector is per policy in force at the start of the year. Discounting it directly, without the survival factor ${}_{t-1}p_x$, overstates the NPV.
> - **Two different rates:** Interest within the year is earned at $i$, while the NPV is taken at the risk discount rate $r$. Swapping the two rates changes every answer.
> - **The reserve at the end of the year:** The cost of the year-end reserve is $p_{x+t-1}\,{}_tV$, because only the policies still in force need one. Charging the full ${}_tV$ treats the policies that ended in a death as if they still needed a reserve.
> - **Time 0:** Expenses incurred before the policy is in force, such as underwriting and issue costs, sit at time 0 as $\mathrm{Pr}_0$ and earn no interest. Expenses paid with the first premium belong in $E_1$ and reduce the balance on which year 1's interest is earned.
