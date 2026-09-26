---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:da788600a11b4d0e1666ade5b7c5016aca3bc61eb966e070789f3187e12fea7e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Income Statement.md
---

**The Income Statement** reports an insurer's profit for a period. The statutory version — page 4 of the [[NAIC Annual Statement]] — builds net income from three blocks, underwriting, investment and other income, then deducts policyholder dividends and federal income tax; the lower half of the same page is the [[Capital and Surplus]] account.

> $$\text{UW income} = \text{EP} - \text{Losses} - \text{LAE} - \text{UW expenses}$$

> $$\begin{aligned} \text{Net income} = {} & \text{UW income} + \text{Net investment gain} \\ & + \text{Other income} - \text{PH dividends} \\ & - \text{Federal income tax} \end{aligned}$$

- **Underwriting income** ([[Underwriting Profit]]) is [[Earned Premium|premiums earned]] less losses, LAE and other underwriting expenses incurred, all net of reinsurance. Losses incurred are **calendar-year** amounts: the current accident year's losses *plus* development on prior years' reserves, so a reserve strengthening lands entirely in the year it is recognised.
- **Net investment gain** is net investment income earned plus net realised capital gains, the latter shown **net of capital gains tax**. Unrealised gains and losses never pass through statutory income; they go straight to surplus.
- **Other income** collects finance and service charges, agents' balances charged off, and write-ins such as a retroactive reinsurance gain.
- **Federal income tax** on the statement is **current** tax only; the change in deferred tax is a direct entry to surplus.
- **Across regimes.** [[GAAP]] amortises acquisition costs through DAC instead of expensing them, runs fair-value changes on equity securities through net income and unrealised gains on available-for-sale bonds through other comprehensive income, and includes deferred tax in tax expense. [[IFRS]] 17 replaces premium with insurance revenue and separates the insurance service result from insurance finance income or expense.
- The ratios built on it — [[Loss Ratio|loss]], [[Expense Ratio|expense]] and [[Combined Ratio|combined ratios]], the operating ratio — are the core [[Key Financial Measures]]; the [[Insurance Expense Exhibit]] allocates the same income by line of business.

> [!example]- Building Statutory Net Income {Example}
> For the year ($\$$ millions): premiums earned $1{,}000$; losses incurred $620$; LAE incurred $110$; other underwriting expenses $290$; net investment income $90$; realised capital gains $19$, less capital gains tax of $4$; finance and service charges $2$; policyholder dividends $7$; current federal income tax $12$. Common stocks also appreciated by $25$ after tax, unrealised.
>
> Compute statutory net income and say where the unrealised gain goes.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{UW income} &= 1{,}000 - 620 - 110 - 290 \\
> > &= -20 \\
> > \text{Net investment gain} &= 90 + (19 - 4) \\
> > &= 105 \\
> > \text{Pre-dividend, pre-tax} &= -20 + 105 + 2 \\
> > &= 87 \\
> > \text{Net income} &= 87 - 7 - 12 \\
> > &= 68
> > \end{align*}
> > $$
> >
> > Statutory net income is $\$68$M: a $102\%$ combined ratio on earned premium was rescued by investment income. The $\$25$M unrealised gain bypasses the income statement and is credited directly to surplus in the capital and surplus account. Under GAAP, fair-value changes on equity securities run through net income, so GAAP income would include it.

> [!example]- Calendar-Year Losses Hide Reserve Development {Example}
> Of the $\$620$M of losses incurred above, $\$580$M relates to the current accident year and the rest is adverse development on prior accident years. Compare the calendar-year and current-accident-year loss ratios.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Prior-year development} &= 620 - 580 \\
> > &= 40 \\
> > \text{CY loss ratio} &= \frac{620}{1{,}000} \\
> > &= 62.0\% \\
> > \text{AY loss ratio} &= \frac{580}{1{,}000} \\
> > &= 58.0\%
> > \end{align*}
> > $$
> >
> > Four points of the reported loss ratio are about business written in earlier years. The income statement alone cannot show that; [[Schedule P]] Part 2's development by accident year can. A reader judging current pricing should use the accident-year figure, while one judging reserve adequacy should ask why the prior years moved.
