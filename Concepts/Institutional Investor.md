---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:04f86e9918492f3bfb17392451c926291a44191eddd96a7f18b71235ba0b9bf6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Institutional Investor.md
---

An **institutional investor** is an organization that invests a large pool of assets for the benefit of others, such as a defined benefit pension plan, an endowment or foundation, an insurer, a bank or a sovereign wealth fund. Each type has its own return objective, risk tolerance and constraints, set by what its assets must pay for, and these are what its [[Investment Policy Statement|investment policy statement]] (IPS) records and what its [[Asset Allocation|asset allocation]] must serve.

> $$S_t = s \times \frac{1}{n}\sum_{k=1}^{n} V_{t-k}$$

> $$1 + r^{*} = (1 + s)(1 + \pi)(1 + c)$$

- **Symbols:** The first line is a smoothed spending rule for an endowment. $S_t$ is the amount spent in year $t$, $s$ the spending rate and $V_{t-k}$ the market value at the end of each of the last $n$ years. In the second line, $r^{*}$ is the nominal return the fund needs to spend at rate $s$ and keep its real value after inflation $\pi$ and investment costs $c$.
- **Defined benefit pension plans:** The return objective is to fund the promised benefits at an acceptable cost to the sponsor, so it is set against the liabilities rather than in absolute terms. Risk tolerance is higher when the plan is well funded, the sponsor is financially strong, the members are young and the sponsor's business does not fall at the same time as the markets. Liquidity needs are the benefits paid less contributions received, and they grow as the plan matures. The plan is tax-exempt and regulated by pension standards law, such as ERISA in the United States.
- **Endowments and foundations:** These usually have a perpetual horizon and aim to support spending today while preserving the fund's purchasing power for future generations, which is called intergenerational equity. Their liquidity needs are the annual spending, so they can hold large amounts of illiquid assets such as [[Private Equity|private equity]] and [[Hedge Fund|hedge funds]]. A U.S. private foundation must pay out a minimum share of its assets each year, about 5%, while an endowment sets its own spending rule.
- **Insurers:** An insurer invests the reserves backing its policies and its surplus. A [[Life Insurance Company|life insurer]] has long, often guaranteed liabilities, so it invests mainly in bonds matched to them through [[Asset-Liability Management|asset-liability management]]. A property and casualty insurer has shorter, less certain liabilities and needs liquidity for catastrophe claims. Both are taxable, and both are tightly regulated through [[Risk-Based Capital|risk-based capital]] requirements, which raise the cost of holding risky assets.
- **Banks:** A bank's liabilities are mostly deposits, which are short and can be withdrawn on demand, and its main assets are loans. Its securities portfolio is held for liquidity and to manage the interest rate mismatch between them, so it is mostly high-quality bonds. Banks are taxable, and capital and liquidity rules limit how much risk the portfolio can take.
- **Sovereign wealth funds:** These are government-owned funds, and their objectives depend on their purpose. A stabilization fund that cushions the budget against a fall in commodity revenue needs liquidity and a short horizon. A savings fund that turns resource wealth into financial wealth for future generations can invest for the very long term. Reserve, development and pension reserve funds lie between the two.
- **What every IPS must say:** The CFA Institute's framework has two objectives and five constraints. The return objective and the risk tolerance, which combines the ability and the willingness to bear risk, come first. The constraints are liquidity, time horizon, legal and regulatory factors, taxes and any unique circumstances, such as ethical restrictions or a concentrated holding of the sponsor's own stock.

| Investor | Return objective | Risk tolerance | Liquidity | Horizon | Regulation | Tax |
|---|---|---|---|---|---|---|
| DB pension plan | Fund the liabilities | Depends on funded status and sponsor | Benefits less contributions | Long, shortening as the plan matures | Pension standards law | Exempt |
| Endowment | Spending plus inflation plus costs | High | Spending | Perpetual | Light | Usually exempt |
| Life insurer | Spread over liability crediting rates | Low | Moderate | Long | Strict, capital-based | Taxable |
| P&C insurer | Support pricing and surplus growth | Low to moderate | High | Short to medium | Strict, capital-based | Taxable |
| Bank | Spread over deposit costs | Low | Very high | Short | Strict, capital and liquidity | Taxable |
| Sovereign wealth fund | Depends on purpose | Depends on purpose | Depends on purpose | Short to perpetual | Set by its government | Usually exempt |

> [!example]- An Endowment's Spending Rule and Required Return {Example}
> A university endowment spends 5% of the average of its market values at the last three year-ends, which were \$95 million, \$100 million and \$110 million. Expected inflation is 2.5% and investment costs are 0.5% a year. Find this year's spending, the spending as a share of the current value, and the nominal return the endowment needs to keep its real value.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > S &= 0.05 \times \frac{95 + 100 + 110}{3} \\
> > &= 0.05(101.667) \\
> > &= 5.083 \\
> > \frac{S}{V_{\text{current}}} &= \frac{5.083}{110} \\
> > &= 4.62\%
> > \end{align*}
> > $$
> > The endowment spends \$5.08 million, which is less than 5% of today's value because the average still includes the lower values of earlier years. Smoothing makes spending steadier than the market, at the cost of spending a little less after a rise and a little more after a fall.
> > $$
> > \begin{align*}
> > 1 + r^{*} &= (1.05)(1.025)(1.005) \\
> > &= 1.08163 \\
> > r^{*} &= 8.16\%
> > \end{align*}
> > $$
> > Adding the three rates gives 8.0%, which slightly understates what compounding requires. An 8.16% target return is high, which is why endowments hold large equity and alternative allocations and accept the volatility that comes with them.

> [!example]- The Return a Pension Plan Needs to Close Its Deficit {Example}
> A defined benefit plan has assets of \$900 million and liabilities of \$1,000 million, valued at a discount rate of 4%. The sponsor plans to pay contributions equal to the new benefits earned each year, and benefit payments are small for the next ten years. What annual return must the assets earn to reach full funding in ten years without extra contributions?
>
> > [!answer]-
> > With new contributions offsetting new benefits, the liabilities grow at the discount rate, so the assets must grow from 900 to $1{,}000(1.04)^{10}$.
> > $$
> > \begin{align*}
> > 900(1 + r)^{10} &= 1{,}000(1.04)^{10} \\
> > 1 + r &= 1.04 \times \left(\frac{1{,}000}{900}\right)^{0.1} \\
> > &= 1.04 \times 1.01059 \\
> > r &= 5.10\%
> > \end{align*}
> > $$
> > The plan needs to beat the liability discount rate by about 1.1% a year. Its IPS would set this as the return objective, and its risk tolerance, which falls if the sponsor is weak, decides how much equity risk it can take to try for it.

> [!tip]- How it appears on the exam
> - **INV-101, learning objective 2b:** Candidates develop an investment policy statement for an institutional investor, based on the reading on the elements of an IPS for institutional investors. Expect a case describing a pension plan, endowment, foundation, insurer, bank or sovereign wealth fund, and a written answer setting out its return objective, risk tolerance and each constraint, with reasons.
> - **Comparisons:** Questions may ask why two institutions with similar assets should invest differently, such as an endowment against a life insurer. The answer usually turns on the liabilities, liquidity needs and regulation.
> - **Supporting calculations:** A short calculation often supports the IPS, such as a spending rule, a required return or a liquidity need.

> [!warning]- Exam traps
> - **Willingness is not ability:** Risk tolerance combines the ability to bear risk, from the investor's finances and liabilities, and the willingness to bear it, from its board's attitude. When they disagree, the IPS usually follows the lower of the two, and an answer that uses only one misses the point.
> - **Additive versus multiplicative targets:** The return that preserves real value is $(1 + s)(1 + \pi)(1 + c) - 1$. Adding the rates is a common approximation, but an exact answer must compound them.
> - **A smoothed rule doesn't spend the stated rate of today's value:** A 5% rule on a three-year average spends less than 5% of today's value after a rise and more after a fall. Applying the rate to the current value gives the wrong spending.
> - **Horizon is not always long:** A maturing pension plan, a stabilization fund and a bank all have short or shortening horizons, whatever their size. Treating every institution as a long-horizon investor overstates its capacity for illiquid and volatile assets.
