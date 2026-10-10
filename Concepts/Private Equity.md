---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:385914eae6d1caf2ca7ea1971b256d0493d87eadc8eec999330fff0475be6c33
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Private Equity.md
---

**Private equity** is equity in companies that are not traded on a public exchange, bought mostly through limited partnership funds that invest for a fixed term and return the proceeds as investments are sold. Its main strategies are venture capital, growth equity and buyouts, and its place in a [[Portfolio|portfolio]] is a higher expected return in exchange for illiquidity, long commitments and returns that are measured with stale valuations.

> $$\text{DPI} = \frac{\text{Distributions}}{\text{Paid-in capital}}$$

> $$\text{TVPI} = \frac{\text{Distributions} + \text{NAV}}{\text{Paid-in capital}}$$

> $$\sum_{t=0}^{T} \frac{CF_t}{(1 + \text{IRR})^t} + \frac{\text{NAV}_T}{(1 + \text{IRR})^T} = 0$$

- **Symbols:** Paid-in capital is what the limited partners have contributed through capital calls so far, and distributions are what the fund has returned to them. NAV is the net asset value of the investments the fund still holds, as the manager values them. $CF_t$ is the net cash flow to the limited partners at time $t$, negative for a call and positive for a distribution, and the residual value TVPI less DPI is often reported as RVPI.
- **Venture capital:** Venture funds buy minority stakes in young companies, in stages, so that each round of financing depends on milestones being met. Most investments fail or return little, and a fund's result depends on a few large successes.
- **Growth equity and buyouts:** Growth equity buys minority stakes in established, growing companies with little debt. A buyout buys control of a mature company financed largely with debt, the leveraged buyout, and earns its return from paying down the debt, improving operations, and selling at a higher multiple through a sale to another company, a sale to another fund, or an initial public offering.
- **Fund structure:** The general partner (GP) manages the fund and the limited partners (LPs) supply most of the money. An LP commits an amount at the start, the GP calls it as investments are found over the first several years, and the fund then harvests and winds down, commonly over about ten years with extensions. The LP must keep enough liquidity to meet calls it does not control.
- **Fees and carried interest:** The GP charges a management fee, usually a percentage of committed capital during the investment period, and takes carried interest, a share of the fund's profit. Carry is usually paid only after the LPs have received their capital back plus a preferred return, the hurdle, often followed by a catch-up that restores the GP's full share of the profit.
- **The J-curve:** Fees and early write-downs come before gains, so the LP's cumulative net cash flow and the fund's interim IRR are negative in the early years and turn up only as investments are sold. Comparing a young fund's IRR with a mature one's mistakes a stage of the J-curve for performance.
- **Return measures:** The IRR is a money-weighted return, appropriate because the GP controls the timing of the cash flows, but it rewards early distributions and can be raised by delaying calls. The multiples DPI and TVPI ignore time entirely, so they are read together with the IRR, and only DPI counts money actually returned. See [[Internal Rate of Return]] and [[Performance Measurement]].
- **Illiquidity and stale valuations:** NAVs are the GP's appraisals, updated quarterly and anchored on the last value, so reported private equity returns are smoothed in the same way as appraisal-based [[Real Estate|real estate]] returns. They understate volatility and correlation with public equity, and an allocation built on them overweights the asset class.

> [!example]- IRR, DPI and TVPI Four Years into a Fund {Example}
> An LP commits \$100 million to a buyout fund. The fund calls \$40 million at time 0, \$30 million at time 1 and \$20 million at time 2, and distributes \$25 million at time 3 and \$45 million at time 4. Immediately after the time-4 distribution, the LP's share of the fund's NAV is \$70 million. Find the DPI, TVPI and IRR at time 4, and trace the LP's cumulative net cash flow.
>
> > [!answer]-
> > Paid-in capital is $40 + 30 + 20 = 90$ (\$ millions) and distributions are $25 + 45 = 70$.
> > $$
> > \begin{align*}
> > \text{DPI} &= \frac{70}{90} \\
> > &= 0.78 \\
> > \text{TVPI} &= \frac{70 + 70}{90} \\
> > &= 1.56
> > \end{align*}
> > $$
> > The IRR treats the NAV as if it were received at time 4, so the time-4 flow is $45 + 70 = 115$.
> > $$
> > -40 - \frac{30}{1+j} - \frac{20}{(1+j)^2} + \frac{25}{(1+j)^3} + \frac{115}{(1+j)^4} = 0
> > $$
> > Solving numerically gives $j = 15.4\%$. The cumulative net cash flow is $-40$, $-70$, $-90$, $-65$ and $-20$, the J-curve: the LP is \$90 million out of pocket after three years and still \$20 million short in cash at time 4. Half of the TVPI is the GP's valuation of companies not yet sold.

> [!example]- Carried Interest on a Whole-Fund Waterfall {Example}
> The fund in the first example is eventually wound up, having called \$90 million in total and returned \$160 million before carried interest. The GP's carry is $20\%$ of the profit under a whole-fund waterfall with a full catch-up, and the fund has comfortably cleared its hurdle. Find the carry and the LP's net multiple.
>
> > [!answer]-
> > Once the hurdle is cleared and the catch-up is complete, the GP has $20\%$ of the whole profit.
> > $$
> > \begin{align*}
> > \text{Profit} &= 160 - 90 \\
> > &= 70 \\
> > \text{Carry} &= 0.20 \times 70 \\
> > &= 14 \\
> > \text{Net multiple} &= \frac{160 - 14}{90} \\
> > &= 1.62
> > \end{align*}
> > $$
> > The gross multiple of $160/90 = 1.78$ falls to $1.62$ for the LP. Management fees are already inside the \$90 million paid in, which is why net returns to LPs sit well below the gross returns on the companies themselves.

> [!tip]- How it appears on the exam
> - **INV-101, asset classes:** The asset-classes objective asks for the distinguishing investment characteristics and potential contributions of private equity, read in Anson, Fabozzi and Jones's chapters on venture capital funds and leveraged buyouts and the CFA Institute's primer on alternative investments. Questions ask how venture capital and buyouts differ, how a fund's fees and waterfall work, and how to compute and interpret IRR, DPI and TVPI.
> - **INV-101, contributions to a portfolio:** The same objective asks what private equity adds to a portfolio. Expect to weigh its higher expected return against illiquidity and the need to meet capital calls, and to explain why returns built on the GP's valuations understate its risk and its correlation with public equity.

> [!warning]- Exam traps
> - **TVPI includes unrealized value:** TVPI counts the NAV as if it were cash. Only DPI measures money actually returned, and a high TVPI with a low DPI rests on the GP's valuations.
> - **Committed is not invested:** Fees early in a fund are charged on committed capital, not on the smaller amount called so far, so the fee as a share of invested capital is high early in the fund's life.
> - **Reading the J-curve as failure:** A negative IRR in a fund's first years is normal. Interim IRRs are compared only between funds of the same vintage year.
> - **IRR versus multiple:** A quick distribution can give a high IRR on a small multiple, and a long hold a high multiple on a modest IRR. Neither measure alone ranks two funds.
