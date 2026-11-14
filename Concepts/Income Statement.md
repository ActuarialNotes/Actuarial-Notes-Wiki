---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:337bc7e925b1be68c2df380c341f13513efd1427528a752cc9fc6db92ea781d3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Income Statement.md
---

The **Income Statement** reports an insurer's profit for a period. The statutory version, page 4 of the [[NAIC Annual Statement]], builds net income from three blocks, underwriting, investment and other income, then deducts policyholder dividends and federal income tax. The lower half of the same page is the [[Capital and Surplus]] account.

**Underwriting income** ([[Underwriting Profit]]) is [[Earned Premium|premiums earned]] less losses, LAE and other underwriting expenses incurred, all net of reinsurance:

> $$\text{UW income} = \text{EP} - \text{Losses} - \text{LAE} - \text{UW expenses}$$

- $\text{EP}$ is premiums earned.
- $\text{Losses}$ and $\text{LAE}$ are losses and loss adjustment expenses incurred.
- $\text{UW expenses}$ is other underwriting expenses incurred.

Losses incurred are **calendar-year** amounts: the current accident year's losses *plus* development on prior years' reserves. A reserve strengthening therefore lands entirely in the year it is recognised.

> [!example]- An insurer earned $\$1{,}000$M and incurred $\$620$M of losses, $\$580$M of them for the current accident year. What are its calendar-year and accident-year loss ratios? {Example}
> - Prior-year development is $620 - 580 = \$40$M of adverse development.
> - The calendar-year loss ratio is $620/1{,}000 = 62.0\%$.
> - The current-accident-year loss ratio is $580/1{,}000 = 58.0\%$.
> - Four points of the reported loss ratio are about business written in earlier years. The income statement alone cannot show that, and [[Schedule P]] Part 2's development by accident year can.
> - A reader judging current pricing should use the accident-year figure, and one judging reserve adequacy should ask why the prior years moved.

## Net income

Statutory net income is

> $$\begin{aligned} \text{Net income} = {} & \text{UW income} + \text{Net investment gain} \\ & + \text{Other income} - \text{PH dividends} \\ & - \text{Federal income tax} \end{aligned}$$

- $\text{PH dividends}$ is dividends to policyholders.

**Net investment gain** is net investment income earned plus net realised capital gains, the latter shown **net of capital gains tax**. Unrealised gains and losses never pass through statutory income. They go straight to surplus.

**Other income** collects finance and service charges, agents' balances charged off, and write-ins such as a retroactive reinsurance gain.

**Federal income tax** on the statement is **current** tax only. The change in deferred tax is a direct entry to surplus.

> [!example]- What is this insurer's statutory net income, and where does the unrealised gain go? {Example}
> For the year, in $\$$ millions:
>
> | Item | Amount |
> | :--- | ---: |
> | Premiums earned | 1,000 |
> | Losses incurred | 620 |
> | LAE incurred | 110 |
> | Other underwriting expenses | 290 |
> | Net investment income | 90 |
> | Realised capital gains | 19 |
> | Capital gains tax on them | 4 |
> | Finance and service charges | 2 |
> | Policyholder dividends | 7 |
> | Current federal income tax | 12 |
>
> Common stocks also appreciated by $25$ after tax, unrealised.
>
> > [!answer]-
> > - Underwriting income is $1{,}000 - 620 - 110 - 290 = -20$.
> > - Net investment gain is $90 + (19 - 4) = 105$.
> > - Income before dividends and tax is $-20 + 105 + 2 = 87$.
> > - Net income is $87 - 7 - 12 = \$68$M. A $102\%$ combined ratio on earned premium was rescued by investment income.
> > - The $\$25$M unrealised gain bypasses the income statement and is credited directly to surplus in the capital and surplus account.

The ratios built on the income statement, the [[Loss Ratio|loss]], [[Expense Ratio|expense]] and [[Combined Ratio|combined ratios]] and the operating ratio, are the core [[Key Financial Measures]]. The [[Insurance Expense Exhibit]] allocates the same income by line of business.

## The income statement under GAAP and IFRS

[[GAAP]] amortises acquisition costs through DAC instead of expensing them. It runs fair-value changes on equity securities through net income and unrealised gains on available-for-sale bonds through other comprehensive income, and it includes deferred tax in tax expense. [[IFRS]] 17 replaces premium with insurance revenue and separates the insurance service result from insurance finance income or expense.

> [!trap] Putting unrealised gains in statutory net income
> Statutory net income includes realised capital gains, net of capital gains tax, and nothing unrealised. An unrealised gain on common stocks is credited directly to surplus. Under GAAP the same fair-value change on equity securities does run through net income.
