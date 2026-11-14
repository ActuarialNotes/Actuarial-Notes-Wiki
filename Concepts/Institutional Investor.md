---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b37ab014253525b179f9477d901d9de5b081c122547f3cfb8bff592d0254e998
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Institutional Investor.md
---

An **Institutional Investor** is an organization that invests a large pool of assets for the benefit of others, such as a defined benefit pension plan, an endowment or foundation, an insurer, a bank or a sovereign wealth fund. Each type has its own return objective, risk tolerance and constraints, set by what its assets must pay for, and these are what its [[Investment Policy Statement|investment policy statement]] (IPS) records and what its [[Asset Allocation|asset allocation]] must serve.

The CFA Institute's framework for an IPS has two objectives and five constraints:

1. **Return objective.** The return the investor needs or wants.
2. **Risk tolerance.** The ability to bear risk, from the investor's finances and liabilities, combined with its willingness to bear it, from its board's attitude. When the two disagree, the IPS usually follows the lower.
3. **Liquidity.** The cash the investor must be able to raise.
4. **Time horizon.**
5. **Legal and regulatory factors.**
6. **Taxes.**
7. **Unique circumstances**, such as ethical restrictions or a concentrated holding of the sponsor's own stock.

| Investor | Return objective | Risk tolerance | Liquidity | Horizon | Regulation | Tax |
|---|---|---|---|---|---|---|
| DB pension plan | Fund the liabilities | Depends on funded status and sponsor | Benefits less contributions | Long, shortening as the plan matures | Pension standards law | Exempt |
| Endowment | Spending plus inflation plus costs | High | Spending | Perpetual | Light | Usually exempt |
| Life insurer | Spread over liability crediting rates | Low | Moderate | Long | Strict, capital-based | Taxable |
| P&C insurer | Support pricing and surplus growth | Low to moderate | High | Short to medium | Strict, capital-based | Taxable |
| Bank | Spread over deposit costs | Low | Very high | Short | Strict, capital and liquidity | Taxable |
| Sovereign wealth fund | Depends on purpose | Depends on purpose | Depends on purpose | Short to perpetual | Set by its government | Usually exempt |

> [!example]- Why should an endowment and a life insurer with similar assets invest differently? {Example}
> - The endowment has a perpetual horizon and its only liquidity need is its annual spending, so it can hold large amounts of illiquid assets such as [[Private Equity|private equity]] and [[Hedge Fund|hedge funds]].
> - The life insurer has long, often guaranteed liabilities, so it invests mainly in bonds matched to them through [[Asset-Liability Management|asset-liability management]].
> - The insurer is taxable and its [[Risk-Based Capital|risk-based capital]] requirements raise the cost of holding risky assets, while the endowment is lightly regulated and usually tax-exempt.
> - The difference comes from the liabilities, the liquidity needs and the regulation, not from the size of the assets.

## Defined benefit pension plans

A defined benefit plan's return objective is to fund the promised benefits at an acceptable cost to the sponsor, so it is set against the liabilities rather than in absolute terms. Risk tolerance is higher when the plan is well funded, the sponsor is financially strong, the members are young and the sponsor's business does not fall at the same time as the markets. Liquidity needs are the benefits paid less contributions received, and they grow as the plan matures. The plan is tax-exempt and regulated by pension standards law, such as ERISA in the United States.

## Endowments and foundations

Endowments and foundations usually have a perpetual horizon. They aim to support spending today while preserving the fund's purchasing power for future generations, which is called intergenerational equity. A U.S. private foundation must pay out a minimum share of its assets each year, about 5%, while an endowment sets its own spending rule. A smoothed spending rule sets the amount spent in year $t$ at

> $$S_t = s \times \frac{1}{n}\sum_{k=1}^{n} V_{t-k}$$

- $s$ is the spending rate.
- $V_{t-k}$ is the market value at the end of each of the last $n$ years.

To spend at rate $s$ and keep its real value after inflation $\pi$ and investment costs $c$, the fund needs a nominal return $r^{*}$ given by

> $$1 + r^{*} = (1 + s)(1 + \pi)(1 + c)$$

Adding the three rates is a common approximation, but it slightly understates what compounding requires.

> [!example]- What does this endowment spend this year, and what return does it need to keep its real value? {Example}
> A university endowment spends 5% of the average of its market values at the last three year-ends, which were $\$95$ million, $\$100$ million and $\$110$ million. Expected inflation is 2.5% and investment costs are 0.5% a year.
>
> > [!answer]-
> > - The average value is $(95 + 100 + 110)/3 = 101.667$ million.
> > - The spending is $0.05 \times 101.667 = \$5.083$ million.
> > - That is $5.083/110 = 4.62\%$ of today's value, less than 5% because the average still includes the lower values of earlier years.
> > - The required return is $(1.05)(1.025)(1.005) - 1 = 8.16\%$, against 8.0% from adding the rates.
> > - An 8.16% target is high, which is why endowments hold large equity and alternative allocations and accept their volatility.

## Insurers and banks

An insurer invests the reserves backing its policies and its surplus. A [[Life Insurance Company|life insurer]] has long, often guaranteed liabilities and invests mainly in bonds matched to them. A property and casualty insurer has shorter, less certain liabilities and needs liquidity for catastrophe claims. Both are taxable and tightly regulated through risk-based capital requirements.

A bank's liabilities are mostly deposits, which are short and can be withdrawn on demand, and its main assets are loans. Its securities portfolio is held for liquidity and to manage the interest rate mismatch between the two, so it is mostly high-quality bonds. Banks are taxable, and capital and liquidity rules limit how much risk the portfolio can take.

## Sovereign wealth funds

A sovereign wealth fund is government-owned, and its objectives depend on its purpose. A stabilization fund that cushions the budget against a fall in commodity revenue needs liquidity and a short horizon. A savings fund that turns resource wealth into financial wealth for future generations can invest for the very long term. Reserve, development and pension reserve funds lie between the two.

> [!trap] Treating every institution as a long-horizon investor
> A maturing pension plan, a stabilization fund and a bank all have short or shortening horizons, whatever their size. Giving them a long horizon overstates their capacity for illiquid and volatile assets.
