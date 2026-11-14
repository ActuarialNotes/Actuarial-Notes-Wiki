---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8c456a021758aa78096cfc1de8ee411ff6335832511efb974fba51376147a091
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Expense Exhibit.md
---

The **Insurance Expense Exhibit** (IEE) is a supplement to the [[NAIC Annual Statement]], filed by every P&C insurer by April 1, that allocates the company's expenses to expense groups and then allocates premiums, losses, loss adjustment expenses, underwriting expenses and investment gain to lines of business. It shows a pre-tax profit or loss for each line, both net of reinsurance and on a direct basis.

For each line, the pre-tax underwriting result is

> $$\text{UW result} = \text{EP} - \text{Div} - \text{Losses} - \text{DCC} - \text{AO} - \text{UW exp} + \text{OI}$$

- $\text{EP}$ is earned premium.
- $\text{Div}$ is policyholder dividends.
- $\text{Losses}$ is incurred losses.
- $\text{DCC}$ and $\text{AO}$ are the incurred defense and cost containment and adjusting and other expenses.
- $\text{UW exp}$ is the four underwriting expense groups: commission and brokerage; taxes, licenses and fees; other acquisition, field supervision and collection; and general.
- $\text{OI}$ is other income less other expenses.

Adding the investment gain gives the line's total pre-tax profit, which is

> $$\text{Total profit} = \text{UW result} + I_{\text{ins}} + I_{\text{C\&S}}$$

- $I_{\text{ins}}$ is the investment gain on funds attributable to insurance transactions.
- $I_{\text{C\&S}}$ is the investment gain attributable to capital and surplus.

> [!example]- What are the three profit measures for this line, and what do they show? {Example}
> IEE Part II, commercial auto liability ($\$000$):
>
> | Item | Amount |
> | :--- | ---: |
> | Earned premium | $100{,}000$ |
> | Dividends | $0$ |
> | Incurred losses | $68{,}000$ |
> | DCC | $7{,}000$ |
> | AO | $6{,}000$ |
> | Commission and brokerage | $12{,}000$ |
> | Taxes, licenses and fees | $2{,}500$ |
> | Other acquisition | $5{,}000$ |
> | General | $6{,}000$ |
> | Other income less other expenses | $-500$ |
> | Investment gain on insurance funds | $9{,}500$ |
> | Investment gain on capital and surplus | $4{,}000$ |
>
> > [!answer]-
> > - Losses with DCC and AO are $68{,}000 + 7{,}000 + 6{,}000 = 81{,}000$.
> > - Underwriting expenses are $12{,}000 + 2{,}500 + 5{,}000 + 6{,}000 = 25{,}500$.
> > - The underwriting result is $100{,}000 - 81{,}000 - 25{,}500 - 500 = -7{,}000$, a combined ratio of $107\%$ to earned premium.
> > - After investment gain on insurance funds, profit is $-7{,}000 + 9{,}500 = 2{,}500$.
> > - Total profit is $2{,}500 + 4{,}000 = 6{,}500$.
> > - The line loses money on underwriting and is rescued by investment income on its long-tailed reserves. Only $\$2.5$ million is earned from the insurance operation once its own funds are credited. The remaining $\$4.0$ million is income on surplus allocated by formula, which the NAIC cautions against reading as line profitability.

## The three parts of the exhibit

1. **Part I, allocation to expense groups.** It splits the company's other underwriting expenses into acquisition, field supervision and collection; general; and taxes, licenses and fees, alongside loss adjustment and investment expenses, following the NAIC's Uniform Classification of Expenses.
2. **Part II, lines of business net of reinsurance.** For each line it gives premiums written and earned, dividends, incurred losses, DCC and AO, unpaid losses and LAE, unearned premium, agents' balances, the four expense groups and other income. It then gives pre-tax profit excluding all investment gain, profit after investment gain on insurance funds, and total profit after investment gain on capital and surplus.
3. **Part III, lines of business direct.** It gives the same underwriting elements before reinsurance, which the instructions describe as simulating results without the effect of reinsurance. Comparing Parts II and III shows what reinsurance did to each line.

## Allocation of investment gain

Investment gain is allocated by a prescribed formula. A line's insurance funds are its mean loss and LAE reserves, plus mean unearned premium less the prepaid acquisition expense within it, plus ceded premiums payable, less agents' balances. Surplus is allocated in proportion to reserves plus earned premium. The instructions warn that the allocation of investment income from capital and surplus by line may not accurately reflect a line's profitability for ratemaking.

## Uses of the exhibit

Regulators build industry profitability by line and state from it. Analysts use it to find lines subsidised by others and to judge [[Insurance Profitability|profitability]] beyond the company-wide [[Combined Ratio|combined ratio]]. Actuaries use it for the [[Expense Ratio|expense ratios]] by line behind the [[Expense Provisions|expense provisions]] in a rate filing.

Each expense category is divided by the premium it relates to. Acquisition costs are incurred as policies are written, so they are related to written premium. General expenses are incurred through the policy term, so they are related to earned premium. Ratios are computed by year to see any trend before a future ratio is selected for each category. Direct (Part III) data are the natural base, because rates are charged on direct business.

> [!example]- What are the three-year ratios of other acquisition expense and of general expense? {Example}
> IEE Part III, other liability ($\$000$):
>
> | Year | Written | Earned | Other acquisition | General |
> | :--- | ---: | ---: | ---: | ---: |
> | $2023$ | $50{,}000$ | $48{,}000$ | $2{,}600$ | $3{,}000$ |
> | $2024$ | $54{,}000$ | $52{,}000$ | $2{,}750$ | $3{,}250$ |
> | $2025$ | $58{,}000$ | $56{,}500$ | $3{,}000$ | $3{,}450$ |
>
> > [!answer]-
> > - Other acquisition expense is incurred as policies are written, so it is divided by written premium.
> > - Its ratio is $(2{,}600 + 2{,}750 + 3{,}000)/(50{,}000 + 54{,}000 + 58{,}000) = 8{,}350/162{,}000 = 5.15\%$.
> > - General expense is incurred through the policy term, so it is divided by earned premium.
> > - Its ratio is $(3{,}000 + 3{,}250 + 3{,}450)/(48{,}000 + 52{,}000 + 56{,}500) = 9{,}700/156{,}500 = 6.20\%$.
> > - The selected ratios then feed the fixed and variable expense provisions of the indicated rate.

> [!trap] Allocated surplus income is not line profit
> Total profit includes investment gain on capital and surplus allocated to the line by formula. Judge a line on its result after investment gain on insurance funds, which in the example is $\$2.5$ million rather than $\$6.5$ million.
