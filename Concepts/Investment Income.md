---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d93a4fdc2f4693be4110f1a5d407dd8b3e35b46fb14318dbd8272b507a18d2ed
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Investment Income.md
---

**Investment Income** is what an [[Insurer|insurer]] earns on its invested assets: interest on bonds and mortgages, dividends on stocks and rent on real estate, net of investment expenses, with gains realized on the sale of assets reported beside it. Premiums are collected before claims are paid, and reserves are held until the claims fall due, so the insurer invests money that it will later pay to policyholders.

The net investment income for a period is

> $$I = \text{Int} + \text{Div} + \text{Rent} - \text{Exp}$$

- $\text{Int}$, $\text{Div}$ and $\text{Rent}$ are the interest, dividends and rent earned in the period.
- $\text{Exp}$ is the investment expenses.

Under [[Statutory Accounting Principles|statutory accounting]] the [[Income Statement|income statement]] shows net investment income and realized capital gains, net of tax, together as the net investment gain, beside underwriting income. Unrealized gains go straight to [[Capital and Surplus|surplus]] and never pass through statutory [[Net Income|net income]].

## Investment income in a cash flow projection

A projection of premiums, claims, expenses and commissions also projects the income on the assets in each period. When the year's cash flows are spread evenly through it, they are invested for half a year on average, and the investment income for year $t$ is

> $$I_t = i_t \left(A_{t-1} + \tfrac{1}{2}\left(P_t - C_t\right)\right)$$

- In the projection, $A_{t-1}$ is the assets at the start of year $t$, $P_t$ the premiums received and $C_t$ the claims, expenses and commissions paid during the year, and $i_t$ the earned rate.

The projection needs the earned rate on assets held, a reinvestment rate for new cash and the timing of each cash flow. When the reinvestment rate falls, the income falls with it ([[Reinvestment Risk|reinvestment risk]]), which is what [[Asset Adequacy Analysis|asset adequacy analysis]] and [[Asset-Liability Management|asset-liability management]] test.

The reserve grows each year with interest at the valuation rate, and that interest is an increase in the liability, not income. The insurer's gain from investments is the spread between the rate the assets earn and the rate credited to the reserve.

> [!example]- What are this block's investment income and its gain from investments for the year? {Example}
> A block of long-term care policies holds assets equal to its reserves. At the start of the year the assets are $\$48{,}000{,}000$. During the year the block receives premiums of $\$9{,}000{,}000$ and pays claims, expenses and commissions of $\$6{,}500{,}000$, both spread evenly through the year. The assets earn an illustrative 4.5%, and the reserve is valued at an illustrative 3.5%.
>
> > [!answer]-
> > - The net cash flow of $\$2{,}500{,}000$ is invested for half a year on average, so the average invested balance is $48{,}000{,}000 + 1{,}250{,}000 = \$49{,}250{,}000$.
> > - The investment income is $0.045 \times 49{,}250{,}000 = \$2{,}216{,}250$.
> > - The interest credited to the reserve on the same balance is $0.035 \times 49{,}250{,}000 = \$1{,}723{,}750$.
> > - The block gains $2{,}216{,}250 - 1{,}723{,}750 = \$492{,}500$ from investments this year.

## Investment yield

The yield divides the income by the average assets that earned it. With invested assets $A$ at the start of the year and $B$ at the end, the investment yield is

> $$i = \frac{2I}{A + B - I}$$

The end-of-year assets $B$ already include the year's income, so $B - I$ removes it and $\tfrac{1}{2}(A + B - I)$ approximates the average invested balance. This is the yield a rating agency or regulator compares across insurers.

> [!example]- The long-term care block above ends the year with assets of $\$52{,}716{,}250$. What investment yield does its income represent? {Example}
> - The block started with $A = 48{,}000{,}000$ and earned $I = 2{,}216{,}250$.
> - The yield is $2 \times 2{,}216{,}250 / (48{,}000{,}000 + 52{,}716{,}250 - 2{,}216{,}250) = 4{,}432{,}500/98{,}500{,}000 = 4.5\%$.
> - The formula recovers the 4.5% earned rate, because the cash flows really were spread evenly.

## Investment income in pricing

In P&C pricing, investment income on the [[Unearned Premium|unearned premium]] and loss reserves lets a line accept a lower underwriting profit and still earn its target return. The [[Profit and Contingency Provision|profit and contingency provision]] is set after that income is credited, which is why [[Long Tail Lines|long-tail lines]] can price to an underwriting loss.

A long-duration health contract, such as [[Long-Term Care Insurance|long-term care]] or [[Disability Income Insurance|disability income]], charges a level premium that exceeds claims in the early years. The excess builds a [[Reserve|reserve]], and the interest earned on the assets backing it pays part of the later claims. The interest rate is therefore a pricing assumption, and a lower rate raises the premium. Short-duration medical coverage pays claims within months, so its investment income is small and is usually credited only on the claim reserve and on premium received in advance.

## Investment income ratio and operating ratio

The investment income ratio divides net investment income by [[Earned Premium|earned premium]]. The operating ratio is the [[Combined Ratio|combined ratio]] less the investment income ratio, and a value below 100% means the insurer made money before capital gains and tax. The operating ratio is

> $$\text{Operating Ratio} = \text{Combined Ratio} - \frac{I}{\text{Earned Premium}}$$

> [!example]- A P&C insurer has earned premium of $\$1{,}000$ million, a combined ratio of 103% and net investment income of $\$90$ million. What is its operating ratio? {Example}
> - The investment income ratio is $90/1{,}000 = 9.0\%$.
> - The operating ratio is $103\% - 9.0\% = 94.0\%$.
> - The insurer lost 3 points of premium on underwriting but made 6 points overall before capital gains and tax.

> [!trap] Applying the rate to the opening assets
> Cash received or paid during the year earns interest for only part of it. Applying the rate to the opening assets alone overstates the income when claims exceed premiums and understates it when premiums exceed claims.
