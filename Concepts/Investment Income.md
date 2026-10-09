---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8a7d4e76d28892c6e8ee31a0da9e347115b8a0247f757064fdb5be317be790dd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Investment Income.md
---

**Investment income** is what an [[Insurer|insurer]] earns on its invested assets: interest on bonds and mortgages, dividends on stocks and rent on real estate, net of investment expenses, with gains realized on the sale of assets reported beside it. Premiums are collected before claims are paid, and reserves are held until the claims fall due, so the insurer invests money that it will later pay to policyholders. The income on those funds is part of the price of the coverage and part of the profit on it.

> $$I = \text{Int} + \text{Div} + \text{Rent} - \text{Exp}$$

> $$I_t = i_t \left(A_{t-1} + \tfrac{1}{2}\left(P_t - C_t\right)\right)$$

> $$i = \frac{2I}{A + B - I}$$

- **Symbols:** $I$ is net investment income for the period: interest, dividends and rent less investment expenses. In the projection, $A_{t-1}$ is the assets at the start of year $t$, $P_t$ the premiums received and $C_t$ the claims, expenses and commissions paid during the year, and $i_t$ the earned rate. Cash flows spread evenly through the year are invested for half a year on average, which is where the $\tfrac{1}{2}$ comes from. In the last formula $A$ and $B$ are the invested assets at the start and end of the year, and $i$ is the investment yield the income represents.
- **Investment yield:** The yield divides the income by the average assets that earned it. The end-of-year assets $B$ already include the year's income, so $B - I$ removes it and $\tfrac{1}{2}(A + B - I)$ approximates the average invested balance. This is the yield a rating agency or regulator compares across insurers.
- **On the income statement:** Under [[Statutory Accounting Principles|statutory accounting]] the [[Income Statement|income statement]] shows net investment income and realized capital gains, net of tax, together as the net investment gain, beside underwriting income. Unrealized gains go straight to [[Capital and Surplus|surplus]] and never pass through statutory [[Net Income|net income]].
- **In health and life pricing:** A long-duration health contract, such as [[Long-Term Care Insurance|long-term care]] or [[Disability Income Insurance|disability income]], charges a level premium that exceeds claims in the early years. The excess builds a [[Reserve|reserve]], and the interest earned on the assets backing it pays part of the later claims. The interest rate is therefore a pricing assumption, and a lower rate raises the premium. Short-duration medical coverage pays claims within months, so its investment income is small and is usually credited only on the claim reserve and on premium received in advance.
- **In P&C pricing:** Investment income on the [[Unearned Premium|unearned premium]] and loss reserves lets a line accept a lower underwriting profit and still earn its target return. The [[Profit and Contingency Provision|profit and contingency provision]] is set after that income is credited, which is why [[Long Tail Lines|long-tail lines]] can price to an underwriting loss.
- **P&C ratios:** The investment income ratio divides net investment income by [[Earned Premium|earned premium]]. The operating ratio is the [[Combined Ratio|combined ratio]] less the investment income ratio, and a value below 100% means the insurer made money before capital gains and tax.
- **In cash flow projections:** A projection of premiums, claims, expenses and commissions also projects the income on the assets in each period. It needs the earned rate on assets held, a reinvestment rate for new cash and the timing of each cash flow. When the reinvestment rate falls, the income falls with it ([[Reinvestment Risk|reinvestment risk]]), which is what [[Asset Adequacy Analysis|asset adequacy analysis]] and [[Asset-Liability Management|asset-liability management]] test.
- **Earned rate and valuation rate:** The reserve grows each year with interest at the valuation rate, and that interest is an increase in the liability, not income. The insurer's gain from investments is the spread between the rate the assets earn and the rate credited to the reserve.

> [!example]- Investment Income on the Assets Backing a Block's Reserves {Example}
> A block of long-term care policies holds assets equal to its reserves. At the start of the year the assets are \$48,000,000. During the year the block receives premiums of \$9,000,000 and pays claims, expenses and commissions of \$6,500,000, both spread evenly through the year. The assets earn an illustrative 4.5%, and the reserve is valued at an illustrative 3.5%. Find the investment income, the assets at the end of the year, the yield the income represents, and the interest margin.
>
> > [!answer]-
> > The net cash flow is invested for half a year on average, so the average invested balance is \$49,250,000.
> > $$
> > \begin{align*}
> > I &= 0.045\left(48{,}000{,}000 + \tfrac{1}{2}(9{,}000{,}000 - 6{,}500{,}000)\right) \\
> > &= 0.045 \times 49{,}250{,}000 \\
> > &= 2{,}216{,}250 \\
> > B &= 48{,}000{,}000 + 2{,}500{,}000 + 2{,}216{,}250 \\
> > &= 52{,}716{,}250 \\
> > i &= \frac{2 \times 2{,}216{,}250}{48{,}000{,}000 + 52{,}716{,}250 - 2{,}216{,}250} \\
> > &= \frac{4{,}432{,}500}{98{,}500{,}000} \\
> > &= 0.045
> > \end{align*}
> > $$
> > The yield formula recovers the 4.5% earned rate, because the cash flows really were spread evenly. Interest credited to the reserve on the same balance is $0.035 \times 49{,}250{,}000 = 1{,}723{,}750$.
> > $$
> > \begin{align*}
> > \text{Margin} &= 2{,}216{,}250 - 1{,}723{,}750 \\
> > &= 492{,}500
> > \end{align*}
> > $$
> > The block gains \$492,500 from investments this year. If the assets earned only 3.5%, all of the investment income would be needed to fund the interest credited to the reserve, and the block would gain nothing from investments.

> [!example]- The Investment Income Offset in a P&C Result {Example}
> A P&C insurer has earned premium of \$1,000 million, a combined ratio of 103% and net investment income of \$90 million. Find the investment income ratio and the operating ratio.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Investment income ratio} &= \frac{90}{1{,}000} \\
> > &= 9.0\% \\
> > \text{Operating ratio} &= 103\% - 9.0\% \\
> > &= 94.0\%
> > \end{align*}
> > $$
> > The insurer lost 3 points of premium on underwriting but made 6 points overall before capital gains and tax. That is the result a reserve-heavy line is priced for when its profit provision credits investment income.

> [!tip]- How it appears on the exam
> - **CP-321:** The Manual Rates section asks candidates to apply actuarial best practices in evaluating and projecting cash flows, naming investment income beside premiums, claims, expenses and commissions, together with liabilities and required capital. In a calculation, that means crediting the earned rate to the assets held through each period, with the year's cash flows invested for part of it, as in the first example. The Asset Adequacy section asks candidates to describe cash flow projections and the interactions between asset and liability cash flows, which is where the reinvestment rate and the spread over the valuation rate matter.

> [!warning]- Exam traps
> - **Average assets, not opening assets:** Cash received or paid during the year earns interest for only part of it. Applying the rate to the opening assets alone overstates the income when claims exceed premiums and understates it when premiums exceed claims.
> - **Income in the yield's denominator:** The end-of-year assets include the year's investment income, so averaging $A$ and $B$ without subtracting $I$ understates the yield. Use $2I/(A + B - I)$.
> - **Gains are not net investment income:** Realized capital gains are reported separately, and statutory unrealized gains never enter net income. Adding a market value increase to investment income overstates the earned rate.
> - **Interest credited is not income:** The growth of a reserve at the valuation rate is a liability increase. Only the spread between the earned rate and the valuation rate is a gain from investments.
> - **Two denominators:** The investment yield divides by invested assets, and the P&C investment income ratio divides by earned premium. Mixing them makes a long-tail line look far more profitable than it is.
